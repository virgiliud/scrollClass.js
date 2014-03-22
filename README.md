# scrollClass.js

A simple jQuery plugin for adding classes to elements when they are scrolled into view.

The plugin was created as a simple way to add animation effects to elements on scroll by passing classes with CSS3 properties. The goal of the plugin is to take advantage of CSS3 awesomeness and eliminate the use of traditional script-driven animation techniques. 

Feel free to use the plugin for any purpose other than that stated here. 

## Usage

### Initialization

Pass a class name to the selector to initialize the plugin. Elements with the chosen class name will be targeted on scroll. 

```js
$(document).ready(function() {
  $('.example').scrollClass();
});
```

### Set classes to elements

Add the `data-scroll-class` attribute to any element/elements that you wish to target and set a class name as the value.

```html
<div class="example" data-scroll-class="my-class"></div>
```

In the example above, `my-class` will be added to the class attribute of the element when it enters the viewport. (Multiple class names can be added to the data attribute.)

##Plugin Options

- `delay`: Target an element after x number of milliseconds. Adding a delay is recommended for better performance. `20` is set by default. Set to `false` or `0` to disable.
- `threshold`: Target an element when x percent of it is visible in the viewport. Works when scrolling down or up. `50` is set by default. Do not add a percentage sign when setting the threshold.
- `offsetTop`: Number of pixels to offset elements from the top of the window. Useful when a page has a fixed top navigation bar. `0` is set by default. 
- `callback`: Fire a callback after an element is targeted.

Initialization example with all options set:

```js
$(document).ready(function() {
  $('.example').scrollClass({
    delay: 20, //set class after 20 milliseconds delay
    threshold: 50, //set class when 50% of element enters the viewport
    offsetTop: 80, //height in pixels of a fixed top navbar
    callback: function () { //fire a callback
      console.log('Callback fired!');
    }
  });
});
```

##Contributions

Feel free to fork the repo. All pull requests that improve the plugin are welcomed! 
