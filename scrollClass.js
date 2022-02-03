/*
 * scrollClass jQuery Plugin v1.2.0
 *
 * Author: Virgiliu Diaconu
 * http://www.virgiliudiaconu.com
 * Licensed under the MIT license.
 */
;(function($, window, document, undefined) {
  'use strict';
  $.scrollClass = function(el, options) {
    var base = this;

    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;

    // Cached objects
    base.$win = $(window);

    var viewed = false,
      timer,
      throttleDelay;

    // Initialize
    base.init = function() {
      base.options = $.extend({}, $.scrollClass.defaultOptions, options);

      // Set options
      base.delay = base.$el.data("scrollDelay") ?? base.options.delay;
      base.threshold = base.$el.data("scrollThreshold") ?? base.options.threshold;
      base.offsetTop = base.$el.data("scrollOffsetTop") ?? base.options.offsetTop;
      base.reset = base.$el.data("scrollReset") ?? base.options.reset;

      base.onScroll();
    };

    // Scroll handler
    base.scrollHandler = function() {

      // Stop execution if the element was viewed and reset is set to false
      if (viewed === true && base.reset === false) {
        return;
      }

      // Init onScroll on load
      base.onScroll();
    };

    // On scroll
    base.onScroll = function() {
      // Add callback and class when the element enters the viewport
      if (base.inViewport()) {
        // Stop execution if the element was viewed and reset is set to true
        if (viewed === true && base.reset === true) {
          return;
        }

        // Callback
        if (typeof base.options.callback === 'function') {
          base.options.callback.call(el);
        }

        // Add class
        window.clearTimeout(timer);
        timer = window.setTimeout(function() {
          base.toggleScrollClass();
        }, base.delay);

        viewed = true;

        // Remove class and run the reset callback when the element leaves the viewport
      } else if (base.reset === true) {
        // Reset callback
        if (viewed === true && typeof base.options.resetCallback === 'function') {
          base.options.resetCallback.call(el);
        }

        // Remove class
        base.toggleScrollClass();

        viewed = false;
      }
    };

    // Add or remove scroll class
    base.toggleScrollClass = function() {
      var dataAttr = base.$el.data("scrollClass");

      if (viewed === true) {
        base.$el.addClass(dataAttr);
      } else {
        base.$el.removeClass(dataAttr);
      }
    }

    // Check if the element is visible in the viewport
    base.inViewport = function() {
      var elRect = base.el.getBoundingClientRect(),
        winHeight = base.$win.height(),
        elThreshold = base.threshold;

      // If the window height is smaller than the element height use 50% threshold
      if (winHeight < elRect.height) {
        elThreshold = 50;
      }

      // Convert threshold percent to px of the element's height
      var thresholdPx = (elThreshold / 100) * elRect.height,
        thresholdPx = (viewed === false) ? thresholdPx : 1;

      // Return true if the element is in the viewport
      return (
        elRect.top + thresholdPx <= winHeight && elRect.bottom - thresholdPx >= base.offsetTop
      );
    };

    // Run initializer
    base.init();

    // Throttle for better performance on scroll
    function throttle(callback, delay) {
      if (throttleDelay) {
        return;
      }

      throttleDelay = true;

      setTimeout(function() {
        callback();
        throttleDelay = false;
      }, delay);
    }

    // On scroll listener with throttling
    base.$win.on('scroll', function() {
      throttle(base.scrollHandler, base.options.throttle);
    });
  };

  $.scrollClass.defaultOptions = {
    delay: 10,
    threshold: 50,
    reset: false,
    offsetTop: 0,
    throttle: 50
  };

  $.fn.scrollClass = function(options) {
    return this.each(function() {
      (new $.scrollClass(this, options));
    });
  };
})(jQuery, window, document);
