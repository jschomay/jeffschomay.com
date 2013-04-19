$(document).ready ->
  # fastclick
  new FastClick(document.body)

  # masonry (doesn't work nice on ie7)
  unless $('html').hasClass 'ie7'
    $container = $ '.projects-wrapper'
    $container.imagesLoaded ->
      $container.masonry
        itemSelector: '.project'
        columnWidth: $container.width()/2

  # switch
  $switch = $ '#switch'
  $body = $('body')
  $switch.on 'click', (e) ->
    $body.toggleClass 'technical creative'

  # do not push button
  $('#dont-push').on 'click', ->
    game.start()

  # jump links
  $('.about .jump').on 'click', ->
    projectsLocation = $(this).parent().parent().find('.projects').offset().top
    $('body').animate({scrollTop : projectsLocation},'normal')

  $('.projects .jump').on 'click', ->
    $('body').animate({scrollTop : 0},'normal')