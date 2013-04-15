(->

  # convinience function
  getTime = ->
    currentTime = new Date()
    hours = currentTime.getHours()
    minutes = currentTime.getMinutes()
    if minutes < 10
      minutes = "0" + minutes
    "(" + hours + ":" + minutes + ")"

  # main game code
  class Game
    start: ->
      console.log "game started ", getTime()

      @$stage = $ '#about'

      # kick off animation sequence after delay
      # run callback function when done
      @delay 1000, =>
        cb = -> console.log 'DONE'
        @animate @sequence1, 0, cb

    # run render function on each step in the animation sequence,
    # and call the next step in line with it's dely
    animate: (sequence, step, cb) =>
      @render sequence[step].s
      if step < sequence.length - 1
        step++
        @delay sequence[step].d, =>
          @animate sequence, step, cb
      else
        cb()

    # this render function just appends the current string to the 
    # end of the page and scrolls to the bottom if needed
    render: (data) ->
      @$stage.append data
      # scroll page to bottom
      $(window).scrollTop($(document).height())

    # first animation sequence with delay and string
    sequence1: [
      d: 200, s: '<br/>' + new Date() + ' - <span style="color: red;">ERROR (42): site interrupt - User pressed the wrong button</span>'
    ,
      d: 200, s: '<br/>&nbsp; &nbsp; &nbsp; &nbsp; Button id: #dont-push (index.html:32:17)'
    ,
      d: 200, s: '<br/>&nbsp; &nbsp; &nbsp; &nbsp; Event type: click ([object Object])<br/><br/>'
    ,
      d: 1900, s: new Date() + ' - Attempting to relaunch page'
    ,
      d: 250, s: " . "
    ,
      d: 250, s: " . "
    ,
      d: 250, s: " . "
    ,
      d: 250, s: " . "
    ,
      d: 250, s: " . "
    ,
      d: 250, s: " . "
    ,
      d: 250, s: " . "
    ,
      d: 250, s: " . "
    ,
      d: 250, s: " . "
    ,
      d: 250, s: 'FAILED: (24) Image assets keys corrupted'
    ,
      d: 1600, s: '<br/><br/>Switching to manual override mode. . . . . .'
    ,
      d: 1100, s: '<br/><span style="color:green;">[MANUAL OVERRIDE MODE ACTIVE]</span>'
    ,
      d: 1500, s: '<br/><br/>Incoming network message:'
    ,
      d: 1000, s: '<br/><span style="color:yellow;"> &nbsp;' + getTime() + 'jschomay: </span>Oh, hi there.  You pressed the button, didn\'t you.'
    ,
      d: 3000, s: '<br/><span style="color:yellow;"> &nbsp;' + getTime() + 'jschomay: </span>I <em>knew </em>you were going to press that button!!'
    ,
      d: 3500, s: '<br/><span style="color:yellow;"> &nbsp;' + getTime() + 'jschomay: </span>It\'s ok, we can fix this.  I just need a little help from you to reconnect my image assets to their database keys.  Think of it as a game.  Just follow along.  One second...'
    ,
      d: 6000, s: '<br/><br/><span style="color:green;">[LOADING IMAGE FRAGMENT 1]</span>'
    ,
      d: 1000, s: '<br/><img with="100" height="100" src="" border="1" alt="img here"/><br/>Asset keys: <span style="color:gray;">["origami"], ["juggler"], ["eagle_scout"], ["unicycle"], ["travel"]</span>'
    ,
      d: 2000, s: '<br/><br/><span style="color:yellow;"> &nbsp;' + getTime() + 'jschomay - </span>Ok, it\'s your turn.  Click on the asset key you think this image fragment fits with.'
    ,
      d: 400, s: '<br/><br/>Waiting for user input...'
    ] 


    # run the passed function after a delay
    # mostly just a convinience method to make setTimeout easier in coffeescript
    delay: (delay, fn) ->
      setTimeout fn, delay


  # start game
  $(document).ready ->
    game = new Game
    game.start()

)()