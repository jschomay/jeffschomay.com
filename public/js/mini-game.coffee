(->
  class Game
    start: ->
      console.log "game started ", @getTime(), @sequence1

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


    render: (data) ->
      @$stage.append data

    sequence1: [
      d: 500, s: "one"
    ,
      d: 200, s: " . "
    ,
      d: 200, s: " . "
    ,
      d: 200, s: " . "
    ,
      d: 200, s: " . "
      ] 

    getTime: ->
        currentTime = new Date()
        hours = currentTime.getHours()
        minutes = currentTime.getMinutes()
        if minutes < 10
          minutes = "0" + minutes
        "(" + hours + ":" + minutes + ")"

    # run the passed function after a delay
    # mostly just a convinience method to make setTimeout easier in coffeescript
    delay: (delay, fn) ->
      setTimeout fn, delay


  $(document).ready ->
    game = new Game
    game.start()

)()