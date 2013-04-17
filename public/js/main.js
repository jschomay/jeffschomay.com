$(document).ready(function() {
  var $body, $container, $switch;

  if (!$('html').hasClass('ie7')) {
    $container = $('.projects');
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
    if (($body.hasClass('technical') && e.pageX > document.body.clientWidth / 2) || ($body.hasClass('creative') && e.pageX < document.body.clientWidth / 2)) {
      return $body.toggleClass('technical creative');
    }
  });
  return $('#dont-push').on('click', function() {
    return game.start();
  });
});
