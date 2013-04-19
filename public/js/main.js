$(document).ready(function() {
  var $body, $container, $switch;

  new FastClick(document.body);
  if (!$('html').hasClass('ie7')) {
    $container = $('.projects-wrapper');
    $container.imagesLoaded(function() {
      return $container.masonry({
        itemSelector: '.project',
        columnWidth: $container.width() / 2
      });
    });
  }
  $switch = $('#switch');
  $body = $('body');
  $switch.on('click', function(e) {
    return $body.toggleClass('technical creative');
  });
  return $('#dont-push').on('click', function() {
    return game.start();
  });
});
