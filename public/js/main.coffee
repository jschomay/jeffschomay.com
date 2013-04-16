$(document).ready ->
  # masonry
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
      if ($body.hasClass('technical') && e.pageX > document.width/2 )|| ($body.hasClass('creative') && e.pageX < document.width/2)
        $body.toggleClass 'technical creative'

  # do not push button
  $('#dont-push').on 'click', ->
    game.start()