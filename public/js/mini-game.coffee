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
      @currentImageFragmentNumber = 0
      @remainingKeys = @keys

      # kick off animation sequence after 1s...
      @delay 1000, =>
        @runSequence @introSequence, 0, =>
          # then run renderImageFragment callback when done (wait 6s first)...
          @delay 6000, @renderImageFragment =>
            # then run sequence2 after 1s
            @delay 1000, =>
              @runSequence @sequence2, 0
              # then do nothing (wait for click event)


    # queues up the proper image and keys and renders them
    renderImageFragment: (cb) =>
      f = @images[@currentImageFragmentNumber]

      output = [
        s: '<br/><br/><span style="color:green;">[LOADING IMAGE FRAGMENT ' + ( @currentImageFragmentNumber + 1 ) + ']</span>'
      ,
        d: 1000, s: '<br/><div class="fragment" style="background: url(images/'+f.src+'); background-position: '+f.backgroundPosition+'">'+f.key+'</div><br/>Asset keys:'
      ]

      # add keys to output
      # jquery objects, prebound with click event
      for key in @remainingKeys
        k = $ '<span class="key" id="'+key+'">["'+key+'"]</span>'
        k.on 'click', (e) => @checkKey e.target.id
        output.push 
          d: 0
          s: [' ', k]

      @runSequence output, 0, cb

    checkKey: (id) =>
      if id is @images[@currentImageFragmentNumber].key
        #correct
        console.log "right"
        # unbind events on finished line feeds
        $('.key').off()

        # linefeed congratulations and info
        #...

        # send up next image fragment
        # or go to end state if we are finished
        #...
      else
        #wrong
        console.log "try again"
        # linefeed miss notice
        #...

    # run render function on each step in the animation sequence,
    # and call the next step in line with it's dely
    runSequence: (sequence, step, cb) =>
      @render sequence[step].s
      if step < sequence.length - 1
        step++
        @delay sequence[step].d, =>
          @runSequence sequence, step, cb
      else
        cb?()


    # render() is just a proxy, so you could switch out render functions
    render: (data) =>
      # defaults to @linefeed
      @linefeed data

    # this render function just appends the current string to the 
    # end of the page and scrolls to the bottom if needed
    linefeed: (data) ->
      @$stage.append data
      # scroll page to bottom
      $(window).scrollTop($(document).height())

    # first animation sequence with delay and string
    introSequence: [
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
    ]

    # plays afterfirst image fragment is displayed
    sequence2:[
      d: 2000, s: '<br/><br/><span style="color:yellow;"> &nbsp;' + getTime() + 'jschomay - </span>Ok, it\'s your turn.  Click on the asset key you think this image fragment fits with.'
    ,
      d: 400, s: '<br/><br/>Waiting for user input...'
    ]

    # images used in matching
    images: [
      src: 'images/unicycle.jpg'
      backgroundPosition: '-20px -50px'
      key: 'unicycle'
      info: 'Yup, I ride a 6 foot tall unicycle for fun and professionally :)'
    ,
      src: 'images/juggler.jpg'
      backgroundPosition: '-20px -50px'
      key: 'juggler'
      info: 'I was a professional juggler for many years'
    ,
      src: 'images/eagle_scout.jpg'
      backgroundPosition: '-20px -50px'
      key: 'eagle_scout'
      info: 'Many people don\'t know I\'m an Eagle Scout.'
    ,
      src: 'images/origami.jpg'
      backgroundPosition: '-20px -50px'
      key: 'origami'
      info: 'I\'ve made origami since I was 7 years old'
    ,
      src: 'images/travel.jpg'
      key: 'travel'
      backgroundPosition: '-20px -50px'
      info: 'I lived in Europe for 5 years when I was young, and have traveled around the world'
    ]

    # asset keys
    keys: [
      "origami", "juggler", "scuba_dive", "eagle_scout", "unicycle", "travel", "sky_diving"
    ]
    # a.splice(a.indexOf('four'),1)


    # run the passed function after a delay
    # mostly just a convinience method to make setTimeout easier in coffeescript
    delay: (delay, fn) ->
      setTimeout fn, 0#delay


  # start game
  $(document).ready ->
    game = new Game
    game.start()

)()