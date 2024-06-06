// ==UserScript==
// @name         doki
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove video window, reset scrolling and click “Continue” button and “I am not a robot”
// @author       niki
// @match        https://exeo.app/*
// @grant        none
// ==/UserScript==

/** Note: This script is solely intended for the use of educational purposes only and not to abuse any website. **/

(function() {
    'use strict';

    function removeModalAndRestoreScroll() {
        var modalRoot = document.querySelector('.fc-message-root');
        if (modalRoot) {
            modalRoot.parentNode.removeChild(modalRoot);
        }

        document.body.style.overflow = 'auto';

        var containers = document.querySelectorAll('.fc-monetization-dialog-container, .fc-dialog-overlay');
        containers.forEach(function(container) {
            container.style.overflow = 'auto';
            container.style.position = 'static';
        });
    }

    function clickContinueButton() {
        var continueButton = document.querySelector('.flex .button.link-button');
        if (continueButton) {
            continueButton.click();
        }
    }

    function clickInvisibleCaptchaButton() {
        var invisibleCaptchaButton = document.getElementById('invisibleCaptchaShortlink');
        if (invisibleCaptchaButton) {
            invisibleCaptchaButton.click();
        }
    }

    function init() {
        removeModalAndRestoreScroll();
        clickContinueButton();
        clickInvisibleCaptchaButton();
    }

    document.addEventListener('DOMContentLoaded', init);

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            init();
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
