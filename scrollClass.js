/*
 * ScrollClass JS Utility v2.0
 *
 * Author: Virgiliu Diaconu
 * http://www.virgiliudiaconu.com
 * Licensed under the MIT license.
 */

class ScrollClass {

  // Default options for the ScrollClass
  static defaultOptions = {
    delay: 10,
    threshold: 50,
    reset: false,
    offsetTop: 0,
    throttle: 50,
  };

  // Constructor to initialize the plugin
  constructor(el, options = {}) {
    this.el = el;
    this.win = window;
    this.viewed = false;
    this.timer = null;
    this.throttleDelay = null;

    // Merge default and user-provided options
    this.options = Object.assign({}, ScrollClass.defaultOptions, options);

    // Handle data attributes and set properties
    this.delay = this.el.dataset.scrollDelay !== undefined 
      ? Number(this.el.dataset.scrollDelay) 
      : this.options.delay;
    this.threshold = this.el.dataset.scrollThreshold !== undefined
      ? Number(this.el.dataset.scrollThreshold) 
      : this.options.threshold;
    this.offsetTop = this.el.dataset.scrollOffsetTop !== undefined 
      ? Number(this.el.dataset.scrollOffsetTop) 
      : this.options.offsetTop;
    this.reset = this.el.hasAttribute('data-scroll-reset') 
      ? (this.el.dataset.scrollReset === "" || this.el.dataset.scrollReset.toLowerCase() === 'true')
      : this.options.reset;

      // Initialize scroll event
    this.init();
  }

  // Initialize event listeners and handle scroll
  init() {
    this.onScroll();
    this.win.addEventListener('scroll', () => {
      this.throttle(this.scrollHandler.bind(this), this.options.throttle);
    });
  }

  // Handler for scrolling event
  scrollHandler() {
    if (this.viewed && !this.reset) {
      return;
    }

    this.onScroll();
  }

  // Check if element is in viewport & apply necessary logic
  onScroll() {
    if (this.inViewport()) {
      if (this.viewed && this.reset) {
        return;
      }

      if (typeof this.options.callback === 'function') {
        this.options.callback.call(this.el);
      }

      window.clearTimeout(this.timer);
      this.timer = window.setTimeout(() => {
        this.toggleScrollClass();
      }, this.delay);

      this.viewed = true;
    } else if (this.reset) {
      if (this.viewed && typeof this.options.resetCallback === 'function') {
        this.options.resetCallback.call(this.el);
      }

      this.toggleScrollClass();
      this.viewed = false;
    }
  }

  // Toggle classes based on visibility state
  toggleScrollClass() {
    const dataAttr = this.el.getAttribute("data-scroll-class");
    if (!dataAttr) return;
    const classes = dataAttr.split(' ');

    if (this.viewed) {
        classes.forEach(cls => this.el.classList.add(cls));
    } else {
        classes.forEach(cls => this.el.classList.remove(cls));
    }
  }

  // Check if element is visible in the viewport
  inViewport() {
    const elRect = this.el.getBoundingClientRect();
    const winHeight = this.win.innerHeight;
    let elThreshold = this.threshold;

    if (winHeight < elRect.height) {
      elThreshold = 50;
    }

    let thresholdPx = (elThreshold / 100) * elRect.height;
    thresholdPx = (this.viewed === false) ? thresholdPx : 1;

    return (
      elRect.top + thresholdPx <= winHeight && elRect.bottom - thresholdPx >= this.offsetTop
    );
  }

  // Throttle function to optimize scroll performance
  throttle(callback, delay) {
    if (this.throttleDelay) {
      return;
    }

    this.throttleDelay = true;

    setTimeout(() => {
      callback();
      this.throttleDelay = false;
    }, delay);
  }
}

window.ScrollClass = ScrollClass;
