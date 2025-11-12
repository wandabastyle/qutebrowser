// ==UserScript==
// @name         Twitch auto-clickrrr
// @namespace    https://techygrrrl.stream
// @version      0.1
// @description  Auto-click the rewards
// @author       techygrrrl
// @match        https://*.twitch.tv/*
// @match        https://*.twitch.com/*
// @icon         https://techygrrrl.stream/images/icons/channel-clickrrr.png
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Check and click in milliseconds
  const CHECK_INTERVAL = 5000
  const CLICK_DELAY = 3000

  setInterval(() => {
    twitchRewardFindAndClick()
  }, CHECK_INTERVAL)
  
  function twitchRewardFindAndClick() {
//     console.log('🕵🏻‍♀️ Looking for rewards button')
    
    const selector = '[aria-label="Claim Bonus"]'
    const element = document.querySelector(selector)
    
    if (!element) return

    element.style.background = '#E400DB'
    
    setTimeout(() => {
      element.click()
    }, CLICK_DELAY)
  }
})();