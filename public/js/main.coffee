$(document).ready ->
  # masonry (doesn't work nice on ie7)
  unless $('html').hasClass 'ie7'
    $container = $ '.projects'
    $container.imagesLoaded ->
      $container.masonry
        itemSelector: '.project'
        columnWidth: $container.width()/2


  # switch
  $switch = $ '#switch'
  $body = $('body')
  $switch.on 'click', (e) ->
    # only switch if you click the right part of the switch
    if ($body.hasClass('technical') && e.pageX > document.body.clientWidth/2 )|| ($body.hasClass('creative') && e.pageX < document.body.clientWidth/2)
      $body.toggleClass 'technical creative'

  # do not push button
  $('#dont-push').on 'click', ->
    game.start()