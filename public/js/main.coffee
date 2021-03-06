$(document).ready ->
  # fastclick
  new FastClick(document.body)

  # switch
  $switch = $ '#switch'
  $body = $('body')
  $switch.on 'click', (e) ->
    $body.toggleClass 'technical creative'
    # track event on google analytics
    _gaq.push(['_trackEvent', 'interaction', 'flip switch', $body.attr('class')])


  # do not push button
  $('#dont-push').on 'click', ->
    game.start()
    _gaq.push(['_trackEvent', 'start game'])


  # jump links
  $('.about .jump').on 'click', ->
    projectsLocation = $(this).parent().parent().find('.projects').offset().top
    $('body').animate({scrollTop : projectsLocation},'normal')

  $('.projects .jump').on 'click', ->
    $('body').animate({scrollTop : 0},'normal')