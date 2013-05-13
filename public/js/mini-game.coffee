# main game code
class Game
  start: ->
    console.log "game started ", @getTime()

    $('body').addClass 'game-mode'
    $('#page').css("height": 0)
    $('body').append('<div id="stage"></div>')

    @$stage = $ '#stage'
    @currentImageFragmentNumber = 0
    @remainingKeys = @keys

    # kick off animation sequence after 1s...
    @delay 1000, =>
      @runSequence @introSequence, 0, =>
        # then run renderImageFragment callback when done (wait 6s first)...
        @delay 6000, =>
          @renderImageFragment =>
            # then run sequence2 after 1s
            @delay 1000, =>
              @runSequence @sequence2, 0
              # then do nothing (wait for click event)

    # preload images while the sequence is running
    for img in @images
      i = new Image()
      i.src = img.src
      i = null

  getTime: ->
    currentTime = new Date()
    hours = currentTime.getHours()
    minutes = currentTime.getMinutes()
    seconds = currentTime.getSeconds()
    if minutes < 10
      minutes = "0" + minutes
    if seconds < 10
      seconds = "0" + seconds
    "(" + hours + ":" + minutes + ":" + seconds + ")"


  # queues up the proper image and keys and renders them
  renderImageFragment: (cb) =>
    f = @images[@currentImageFragmentNumber]

    output = [
      s: '<br/><br/><span style="color:lightgreen;">[LOADING IMAGE FRAGMENT ' + ( @currentImageFragmentNumber + 1 ) + ']</span>'
    ,
      d: 1000, s: '<br/><div class="fragment" style="background: url('+f.src+'); background-position: '+f.backgroundPosition+'"></div><br/>Asset keys:'
    ]

    # add keys to output
    # jquery objects, prebound with click event
    for key in @remainingKeys
      k = $ '<span class="key" id="'+key+'">["'+key+'"]</span>'
      k.on 'click', (e) => @checkKey e.target.id
      output.push 
        d: 0
        s: [' ', k]

    output.push 
        d: 400, s: '<br/><br/>Waiting for user input...'

    @runSequence output, 0, cb

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

  # run the passed function after a delay
  # mostly just a convinience method to make setTimeout easier in coffeescript
  delay: (delay, fn) ->
    setTimeout fn, (delay/1) # divide by more or less than 1 for faster/slower

  # render() is just a proxy, so you could switch out render functions
  render: (data) =>
    # defaults to @linefeed
    @linefeed data

  # this render function just appends the current string to the 
  # end of the page and scrolls to the bottom if needed
  linefeed: (data) =>
    # replace "getTime" and "getDate" with correct time/date at render
    if typeof data is 'string'
      data = data.replace 'getTime', @getTime()
      data = data.replace 'getDate', new Date()

    @$stage.append data
    # scroll page to bottom
    $(window).scrollTop($(document).height())


  checkKey: (id) =>
    if id is @images[@currentImageFragmentNumber].key
      # unbind events on finished line feeds
      $('.key').off()

      # remove key from @remainingKeys
      i = $.inArray id, @remainingKeys
      @remainingKeys.splice i, 1

      # prep the image so we can animate it
      $image = $('<div class="full-image"></div>')
      $image.css
        'background-image': 'url(' + @images[@currentImageFragmentNumber].src+ ')'
        width: @images[@currentImageFragmentNumber].width
        height: 0
     
      $imageWrapper = $('<div class="full-image-wrapper"></div>')
      # if the image gets scaled (on mobile), need to scale height too
      imageHeight = @images[@currentImageFragmentNumber].height
      imageWidth = @images[@currentImageFragmentNumber].width
      screenWidth = $('#stage').width() - 20 #padding
      scaledHight = imageHeight * (screenWidth/imageWidth)
      displayHight = if (screenWidth < imageWidth) then scaledHight else imageHeight

      $imageWrapper.css
        height: displayHight
      $imageWrapper.append $image

      # animate the image height as soon as it is put on screen
      @delay 1200, =>
        $image.animate({height: displayHight}, 2000)
      
      # linefeed success message, image and info
      output = [
        s: '<br/><br/>User input: '+id+'<br/><span style="color: lightgreen;">Success: Valid asset key match.  Relinking image.'
      ,
        d: 1200, s: ['<br/><br/>', $imageWrapper]
      ,
        d: 2300, s: '<br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay: </span>' + @correctResponses[Math.floor(Math.random()*@correctResponses.length)] + ' ' + @images[@currentImageFragmentNumber].info
      ]

      @runSequence output, 0, =>
        unless @currentImageFragmentNumber is (@images.length - 1)
          # send up next image fragment
          @currentImageFragmentNumber++
          @delay 4000, @renderImageFragment
        else
          # we are done
          @delay 3500, =>
            @runSequence @finalSequence, 0, @tearDown

    else
      # linefeed miss notice
      output = [
        s: '<br/><br/>User input: '+id+'<br/><span style="color: red;">Error:</span> Non-matching key, unable to link asset'
      , 
        d: 800, s: '<br/><br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay: </span>' + @missResponses[Math.floor(Math.random()*@missResponses.length)]
      ]

      @runSequence output, 0

  # tear down this view, put back the main one
  tearDown: =>
      console.log "now back to your regularly scheduled programe...", @getTime()
      @delay 6500, =>
        @$stage.remove()
        $('body').removeClass 'game-mode'
        $('#page').css("height": 'auto')
        $(window).scrollTop(0)
        # track even with google analytics
        _gaq.push(['_trackEvent', 'finish game'])



  # first animation sequence with delay and string
  introSequence: [
    s: '<br/>' + 'getDate' + ' - <span style="color: red;">ERROR (42): GUI crashed - User pressed the wrong button</span>'
  ,
    d: 2000, s: '<br/>&nbsp; &nbsp; &nbsp; &nbsp; Button id: #dont-push (index.html:32:17)'
  ,
    d: 100, s: '<br/>&nbsp; &nbsp; &nbsp; &nbsp; Event type: click ([object Object])<br/><br/>'
  ,
    d: 2500, s: 'getDate' + ' - Attempting to relaunch GUI'
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
    d: 1100, s: '<br/><span style="color:lightgreen;">[MANUAL OVERRIDE MODE ACTIVE]</span>'
  ,
    d: 1500, s: '<br/><br/>Incoming network message:'
  ,
    d: 1800, s: '<br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay: </span>Oh, hi there.'
  ,
    d: 1300, s: '<br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay: </span>You pressed the button, didn\'t you.'
  ,
    d: 3000, s: '<br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay: </span>I <em>knew </em>you were going to press that button!!'
  ,
    d: 3500, s: '<br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay: </span>It\'s ok, we can fix this.  I just need a little help from you to reconnect my image assets to their database keys.  Think of it as a game.  And you\'ll learn some less known facts about me along the way.  One second...'
  ]

  # plays after first image fragment is displayed
  sequence2:[
    s: '<br/><br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay - </span>Ok, it\'s your turn.  Click on the asset key you think this image fragment fits with.'
  ]

  # plays after all fragments have been correctly matched
  finalSequence:[
    s: '<br/><br/><span style="color:lightgreen;">[IMAGE ASSET KEYS SUCCESSFULLY REBUILT]</span>'
  ,
    d: 500, s: '<br/>' + 'getDate' + ' - Asset keys varified.  OK to relaunch GUI'
  ,
    d: 3500, s: '<br/><br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay - </span>Nice!  Looks like you fixed all the image asset keys, thanks for your help!'
  ,
    d: 4500, s: '<br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay - </span>I\'ll send  you back to the main site in just a second... bye!'
  ]

  # images used in matching
  images: [
    src: 'images/juggler.jpg'
    width: 300
    height: 450
    backgroundPosition: '-67px -43px'
    key: 'juggler'
    info: 'I was a professional juggler for many years'
  ,
    src: 'images/origami.jpg'
    width: 500
    height: 462
    backgroundPosition: '-208px -315px'
    key: 'origami'
    info: 'I\'ve made origami since I was 7 years old'
  ,
    src: 'images/unicycle.jpg'
    width: 588
    height: 588
    backgroundPosition: '-275px -440px'
    key: 'unicycle'
    info: 'Yup, I ride a 6 foot tall unicycle for fun and professionally :)'
  ,
    src: 'images/eagle_scout.jpg'
    width: 250
    height: 320
    backgroundPosition: '-135px -90px'
    key: 'eagle_scout'
    info: 'Many people don\'t know I\'m an Eagle Scout.'
  ,
    src: 'images/travel.jpg'
    width: 545
    height: 409
    backgroundPosition: '-94px -117px'
    key: 'travel'
    info: 'I lived in Europe for 5 years when I was young, and have traveled around the world.'
  ]

  # asset keys
  keys: [
    "origami", "juggler", "scuba_dive", "eagle_scout", "unicycle", "travel", "sky_diving"
  ]

  correctResponses: [
    'Nice, you got it.'
    'That\'s right!'
    'That\'s a match.'
    'Correct.'
    'Well done.'
  ]

  missResponses: [
    'Looks like you didn\'t find the right match, try again.'
    'Wrong one.  Try again.'
    'That\'s not it, try again.'
    'Try a different one.'
  ]


game = new Game

