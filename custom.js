$(document).ready(function() {
  $('.example').scrollClass({
    reset: false,
    delay: 0,
    offsetTop: 120,
    callback: function () {
      console.log('Callback fired!');
      $(this).addClass('extra');
    },
    resetCallback: function () {
      console.log('Reset callback fired!');
      $(this).removeClass('extra');
    }
  });
});
