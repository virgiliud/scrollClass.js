/*
 * scrollClass JS Plugin v2.0
 *
 * Author: Virgiliu Diaconu
 * http://www.virgiliudiaconu.com
 * Licensed under the MIT license.
 */

class ScrollClass {
  static defaultOptions = {
    delay: 10,
    threshold: 50,
    reset: false,
    offsetTop: 0,
    throttle: 50,
  };

  constructor(el, options = {}) {
    this.el = el;
    this.win = window;
    this.viewed = false;
    this.timer = null;
    this.throttleDelay = null;

    this.options = Object.assign({}, ScrollClass.defaultOptions, options);
    this.delay = this.el.dataset.scrollDelay ?? this.options.delay;
    this.threshold = this.el.dataset.scrollThreshold ?? this.options.threshold;
    this.offsetTop = this.el.dataset.scrollOffsetTop ?? this.options.offsetTop;
    this.reset = this.el.dataset.scrollReset ?? this.options.reset;

    this.init();
  }

  init() {
    this.onScroll();
    this.win.addEventListener('scroll', () => {
      this.throttle(this.scrollHandler.bind(this), this.options.throttle);
    });
  }

  scrollHandler() {
    if (this.viewed === true && this.reset === false) {
      return;
    }

    this.onScroll();
  }

  onScroll() {
    if (this.inViewport()) {
      if (this.viewed === true && this.reset === true) {
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
    } else if (this.reset === true) {
      if (this.viewed === true && typeof this.options.resetCallback === 'function') {
        this.options.resetCallback.call(this.el);
      }

      this.toggleScrollClass();
      this.viewed = false;
    }
  }

  toggleScrollClass() {
    const dataAttr = this.el.getAttribute("data-scroll-class");
    const classes = dataAttr.split(' ');

    if (this.viewed === true) {
        classes.forEach(cls => this.el.classList.add(cls));
    } else {
        classes.forEach(cls => this.el.classList.remove(cls));
    }
  }

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
