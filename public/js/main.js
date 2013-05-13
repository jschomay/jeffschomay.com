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
    $body.toggleClass('technical creative');
    return _gaq.push(['_trackEvent', 'interaction', 'flip switch', $body.attr('class')]);
  });
  $('#dont-push').on('click', function() {
    game.start();
    return _gaq.push(['_trackEvent', 'start game']);
  });
  $('.about .jump').on('click', function() {
    var projectsLocation;

    projectsLocation = $(this).parent().parent().find('.projects').offset().top;
    return $('body').animate({
      scrollTop: projectsLocation
    }, 'normal');
  });
  return $('.projects .jump').on('click', function() {
    return $('body').animate({
      scrollTop: 0
    }, 'normal');
  });
});
