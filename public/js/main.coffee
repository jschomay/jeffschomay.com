$(document).ready ->
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