// ==UserScript==
// @name         Twitch Hide Scrollbars (No Gutter)
// @namespace    qute.twitch.nogutter
// @version      1.0
// @description  Hide all scrollbars on Twitch with no reserved gutter; scrolling still works.
// @match        https://www.twitch.tv/*
// @match        https://m.twitch.tv/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';
  const STYLE_ID = 'qute-twitch-hide-scrollbars-no-gutter';
  const css = `
    /* Hide all scrollbars, no gutter (scroll still works) */
    :root, html, body, #root {
      scrollbar-gutter: auto !important;   /* don't reserve space */
    }
    html, body {
      overflow-y: auto !important;         /* don't force scrollbars */
    }
    /* Chromium / QtWebEngine */
    *::-webkit-scrollbar,
    *::-webkit-scrollbar-thumb,
    *::-webkit-scrollbar-track {
      width: 0 !important;
      height: 0 !important;
      background: transparent !important;
      border: none !important;
    }
    /* Firefox / legacy (harmless elsewhere) */
    * {
      scrollbar-width: none !important;        /* Firefox */
      -ms-overflow-style: none !important;     /* IE/Edge Legacy */
    }
  `;
  function inject() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }
  if (document.documentElement) inject();
  else window.addEventListener('DOMContentLoaded', inject, { once: true });
})();