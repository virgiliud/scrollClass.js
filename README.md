# scrollClass.js

A simple JavaScript utility for adding classes to elements when they are scrolled into view. Use it to add custom CSS3 animations on scroll or to invoke callbacks. This utility is designed to be user-friendly, flexible, and lightweight.

[View Demo](http://www.virgiliudiaconu.com/work/scroll-class/)

## Usage

### Initialization

Initialize the utility by targeting elements with the `data-scroll-class` attribute. Elements with this attribute will be targeted on scroll.

```js
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-scroll-class]').forEach(function(element) {
    new ScrollClass(element);
  });
});
```

### Set classes to be added to elements

Add the `data-scroll-class` attribute to any element or multiple elements that you wish to target. Set a class name (or more) for the value.

```html
<div class="example" data-scroll-class="awesome-animation"></div>
```

In the example above, `awesome-animation` will be added to the class attribute of the element when it enters the viewport. Multiple class names can be added to the `data-scroll-class` attribute.

## Plugin Options

- `delay`: Target an element after x number of milliseconds.
- `threshold`: Target an element when x percent of it is visible in the viewport. The option works when scrolling up or down. `50` is set by default.
- `offsetTop`: The number of pixels to offset elements from the top of the page. Use this option when a page has a fixed top navigation bar. `0` is set by default.
- `reset`: Reset the element after it leaves the viewport. The given class name will be removed. Reset is set to `false` by default.
- `callback`: Invoke a callback after an element is targeted.
- `callbackReset`: Invoke a callback after an element is reset. The reset option must be set to true.
- `throttle`: The frequency at which the script runs while scrolling the page. Throttle improves your site's scrolling performance. `50` is set by default.

### Initialization in JS with basic options set:

```js
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.example').forEach(function(element) {
    new ScrollClass(element, {
      delay: 100, // set the class after 100 milliseconds delay
      threshold: 50, // set the class when 50% of the element enters the viewport
      offsetTop: 80, // the height in pixels of a fixed top navigation bar
      callback: function () { // run a custom function when an element enters the viewport
        console.log('Element has entered the viewport');
      },
      resetCallback: function() {  // run a custom function when an element is reset
        console.log("Exited viewport:", this);
      }
    });
  });
});
```

### Set options in HTML using the `data-scroll` attribute:

Options set with `data-scroll` attributes take precedence over initialization options set in JS. Below is an example with all the available `data-scroll` attributes:

```html
<div
  data-scroll-class="awesome-animation"
  data-scroll-delay="100"
  data-threshold="50"
  data-scroll-offset-top="80"
  data-scroll-reset="true"
>
</div>
```

## Demo
[View Demo](http://www.virgiliudiaconu.com/work/scroll-class/)
