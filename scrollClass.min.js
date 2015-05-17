/*!
 * scrollClass jQuery Plugin v1.0
 *
 * Author: Virgiliu Diaconu
 * http://www.virgiliu.com
 * Licensed under the MIT license.
 */
!function(o,l,t){"use strict";o.scrollClass=function(n,i){var s=this;s.$el=o(n),s.el=n,s.$win=o(l),s.$doc=o(t);var e,r=!1;s.init=function(){s.options=o.extend({},o.scrollClass.defaultOptions,i)},s.scrollHandler=function(){r||(s.options.delay&&0!==s.options.delay?(l.clearTimeout(e),e=l.setTimeout(s.onScroll,s.options.delay)):s.onScroll())},s.onScroll=function(){if(s.inViewport()){var o=s.$el.data("scrollClass");return s.$el.addClass(o),"function"==typeof s.options.callback&&s.options.callback.call(n),void(r=!0)}},s.inViewport=function(){var o=s.el.getBoundingClientRect(),l=s.$win.height(),t=s.options.threshold;l<o.height&&(t=50);var n=t/100*o.height;return o.top+n<=l&&o.bottom-n>=0+s.options.offsetTop},s.init(),s.$win.on("scroll ready",s.scrollHandler)},o.scrollClass.defaultOptions={delay:20,threshold:50,offsetTop:0},o.fn.scrollClass=function(l){return this.each(function(){new o.scrollClass(this,l)})}}(jQuery,window,document);