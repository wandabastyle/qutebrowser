// ==UserScript==
// @name         Twitch Auto Collapse Chat + Theatre Mode (Stable, Debounced, Respects Manual Toggle)
// @namespace    qute.twitch.autoui
// @version      1.2
// @description  Collapse chat once and enable Theatre Mode on channel load. If preroll ads disable Theatre, re-enable it gently (debounced) during a short window—unless you turn it off yourself.
// @match        https://www.twitch.tv/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==
(function () {
  'use strict';

  // --- Settings ---
  const AUTO_COLLAPSE_CHAT = true;
  const AUTO_THEATRE_MODE  = true;

  const START_DELAY_MS            = 1200;   // wait for Twitch SPA to mount
  const ENFORCE_WINDOW_MS         = 120000; // during the first 2 min after navigation
  const OFF_STABLE_MS             = 3000;   // Theatre must stay OFF for 3s before we re-enable
  const REENABLE_COOLDOWN_MS      = 15000;  // don't try to re-enable more often than every 15s

  let didCollapseOnce      = false;
  let didTheatreOnce       = false;
  let userOptedOutTheatre  = false; // set true if user turns theatre off
  let clickingTheatre      = false; // guard to ignore our own clicks
  let lastPath             = location.pathname;
  let navStart             = Date.now();
  let pendingTimer         = null;
  let lastReenableTs       = 0;

  // Helpers
  const qs = (sel, root = document) => root.querySelector(sel);

  function findTheatreBtn() {
    return qs('[data-a-target="player-theatre-mode-button"]') ||
           qs('button[aria-label*="heatre" i]');
  }
  function isTheatreOn() {
    const btn = findTheatreBtn();
    return !!(btn && btn.getAttribute('aria-pressed') === 'true');
  }
  function setTheatreOn() {
    const btn = findTheatreBtn();
    if (!btn) return;
    if (!isTheatreOn()) {
      clickingTheatre = true;
      btn.click();
      setTimeout(() => { clickingTheatre = false; }, 400);
    }
  }

  function watchTheatreUserToggle() {
    const btn = findTheatreBtn();
    if (!btn || btn.dataset.quteWatch === '1') return;
    btn.dataset.quteWatch = '1';

    const onAttr = () => btn.getAttribute('aria-pressed') === 'true';

    // Observe attribute changes to detect OFF transitions
    const mo = new MutationObserver(() => {
      if (clickingTheatre) return; // ignore our own click cycle
      const on = onAttr();
      // If user turned Theatre off, opt out until next channel
      if (!on) {
        userOptedOutTheatre = true;
        // cancel any pending re-enable
        if (pendingTimer) { clearTimeout(pendingTimer); pendingTimer = null; }
      }
    });
    mo.observe(btn, { attributes: true, attributeFilter: ['aria-pressed'] });

    // Also catch direct clicks
    btn.addEventListener('click', () => {
      if (clickingTheatre) return;
      const on = onAttr();
      userOptedOutTheatre = !on ? true : false;
      if (userOptedOutTheatre && pendingTimer) {
        clearTimeout(pendingTimer); pendingTimer = null;
      }
    }, { capture: true });
  }

  // Chat collapse logic
  function findChatToggleBtn() {
    return qs('[data-a-target="right-column__toggle-collapse-btn"]');
  }
  function isChatCollapsed() {
    return !!qs('.right-column--collapsed, .right-column--is-collapsed');
  }
  function ensureChatCollapsedOnce() {
    if (!AUTO_COLLAPSE_CHAT || didCollapseOnce) return;
    const btn = findChatToggleBtn();
    if (!btn) return;
    if (!isChatCollapsed()) btn.click();
    didCollapseOnce = true;
  }

  // Initial Theatre enable (once)
  function ensureTheatreOnOnce() {
    if (!AUTO_THEATRE_MODE || didTheatreOnce) return;
    if (!userOptedOutTheatre) setTheatreOn();
    didTheatreOnce = true;
  }

  // Debounced enforcement (prevents "jumping in and out")
  function scheduleReenableIfNeeded() {
    if (!AUTO_THEATRE_MODE) return;
    const withinWindow = (Date.now() - navStart) < ENFORCE_WINDOW_MS;
    if (!withinWindow || userOptedOutTheatre) return;
    if (isTheatreOn()) return;

    // Cooldown to avoid rapid toggles
    if (Date.now() - lastReenableTs < REENABLE_COOLDOWN_MS) return;

    if (pendingTimer) clearTimeout(pendingTimer);
    pendingTimer = setTimeout(() => {
      pendingTimer = null;
      // Re-check conditions after OFF_STABLE_MS
      if (!userOptedOutTheatre && !isTheatreOn()) {
        lastReenableTs = Date.now();
        setTheatreOn();
      }
    }, OFF_STABLE_MS);
  }

  function applyInitial() {
    ensureChatCollapsedOnce();
    ensureTheatreOnOnce();
    watchTheatreUserToggle();
  }

  // Observe DOM for player controls and react to Theatre OFF states
  const mo = new MutationObserver((muts) => {
    // If theatre got turned off by Twitch (e.g., ad), schedule a gentle re-enable
    for (const m of muts) {
      if (m.type === 'attributes' && m.attributeName === 'aria-pressed') {
        // handled by watchTheatreUserToggle observer
        continue;
      }
    }
    applyInitial();
    // If theatre is off and not opted out, schedule re-enable
    if (!isTheatreOn()) scheduleReenableIfNeeded();
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });

  // Kickoff after delay
  setTimeout(() => {
    applyInitial();
    if (!isTheatreOn()) scheduleReenableIfNeeded();
  }, START_DELAY_MS);

  // Reset on SPA navigation (channel change)
  setInterval(() => {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      didCollapseOnce = false;
      didTheatreOnce  = false;
      userOptedOutTheatre = false;
      navStart = Date.now();
      if (pendingTimer) { clearTimeout(pendingTimer); pendingTimer = null; }
      setTimeout(() => {
        applyInitial();
        if (!isTheatreOn()) scheduleReenableIfNeeded();
      }, START_DELAY_MS);
    }
  }, 700);

  // When tab gains visibility again (after ads), try a debounced check
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) scheduleReenableIfNeeded();
  });
})();
