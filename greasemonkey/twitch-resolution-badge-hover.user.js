// ==UserScript==
// @name         Twitch Resolution Badge (Auto Quality Helper, Hover Only)
// @namespace    qute.twitch.resbadge
// @version      1.2
// @description  Tiny on-player badge showing the current video resolution on Twitch, only on mouse hover.
// @match        https://www.twitch.tv/*
// @match        https://m.twitch.tv/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const BADGE_ID = 'qute-res-badge';
  const STYLE_ID = 'qute-res-badge-style';

  // Add minimal styles once
  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const css = `
      #${BADGE_ID}{
        position:absolute;
        top:8px;
        left:8px;
        z-index: 2147483647;
        font: 600 12px/1.2 system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
        color:#fff;
        background:rgba(0,0,0,.55);
        border:1px solid rgba(255,255,255,.18);
        border-radius:10px;
        padding:3px 8px;
        pointer-events:none;
        -webkit-backdrop-filter: blur(2px);
        backdrop-filter: blur(2px);
        opacity:0;
        transition:opacity .2s ease;
      }
      .qute-video-container:hover #${BADGE_ID} {
        opacity:1;
      }
    `.trim();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css;
    document.documentElement.appendChild(style);
  }

  // Create (or reuse) a badge within the given container
  function getOrCreateBadge(container) {
    let badge = container.querySelector('#' + BADGE_ID);
    if (!badge) {
      badge = document.createElement('div');
      badge.id = BADGE_ID;
      container.appendChild(badge);
    }
    return badge;
  }

  // Find the best container around a <video> to anchor an absolute element
  function getVideoContainer(video) {
    // Prefer a relatively positioned ancestor to keep the badge in the player
    let el = video;
    for (let i = 0; i < 5 && el && el.parentElement; i++) {
      el = el.parentElement;
      const style = getComputedStyle(el);
      if (style.position !== 'static') return el;
    }
    // fallback: use the video’s parent and force relative positioning
    const parent = video.parentElement || document.body;
    if (getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative';
    }
    return parent;
  }

  function formatResolution(video) {
    const w = video.videoWidth || 0;
    const h = video.videoHeight || 0;
    if (!w || !h) return '';
    return `${w}x${h}`;
  }

  function attachToVideo(video) {
    if (!video || video.dataset.quteResBadgeAttached === '1') return;
    video.dataset.quteResBadgeAttached = '1';

    const container = getVideoContainer(video);
    container.classList.add('qute-video-container');
    const badge = getOrCreateBadge(container);

    let last = '';
    const update = () => {
      const txt = formatResolution(video);
      if (txt && txt !== last) {
        badge.textContent = txt;
        badge.style.display = 'block';
        last = txt;
      } else if (!txt) {
        badge.style.display = 'none';
        last = '';
      }
    };

    ['loadedmetadata', 'playing', 'pause', 'ratechange', 'resize', 'emptied'].forEach(ev =>
      video.addEventListener(ev, update, { passive: true })
    );

    const poll = setInterval(() => {
      if (!document.contains(video)) {
        clearInterval(poll);
        if (badge && badge.parentElement) badge.parentElement.removeChild(badge);
        return;
      }
      update();
    }, 500);

    update();
  }

  function watchForVideos() {
    document.querySelectorAll('video').forEach(v => attachToVideo(v));

    const mo = new MutationObserver(muts => {
      for (const m of muts) {
        if (m.type === 'childList') {
          m.addedNodes.forEach(node => {
            if (!(node instanceof Element)) return;
            if (node.tagName === 'VIDEO') attachToVideo(node);
            node.querySelectorAll?.('video').forEach(v => attachToVideo(v));
          });
        }
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  injectStyles();
  const start = () => watchForVideos();
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(start, 800);
  } else {
    window.addEventListener('DOMContentLoaded', () => setTimeout(start, 800), { once: true });
  }
})();
