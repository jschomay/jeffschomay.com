var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function() {
  var Game, getTime;

  getTime = function() {
    var currentTime, hours, minutes;

    currentTime = new Date();
    hours = currentTime.getHours();
    minutes = currentTime.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return "(" + hours + ":" + minutes + ")";
  };
  Game = (function() {
    function Game() {
      this.animate = __bind(this.animate, this);
    }

    Game.prototype.start = function() {
      var _this = this;

      console.log("game started ", getTime());
      this.$stage = $('#about');
      return this.delay(1000, function() {
        var cb;

        cb = function() {
          return console.log('DONE');
        };
        return _this.animate(_this.sequence1, 0, cb);
      });
    };

    Game.prototype.animate = function(sequence, step, cb) {
      var _this = this;

      this.render(sequence[step].s);
      if (step < sequence.length - 1) {
        step++;
        return this.delay(sequence[step].d, function() {
          return _this.animate(sequence, step, cb);
        });
      } else {
        return cb();
      }
    };

    Game.prototype.render = function(data) {
      return this.$stage.append(data);
    };

    Game.prototype.sequence1 = [
      {
        d: 200,
        s: '<br/>' + new Date() + ' - <span style="color: red;">ERROR (42): site interrupt - User pressed the wrong button</span>'
      }, {
        d: 200,
        s: '<br/>&nbsp; &nbsp; &nbsp; &nbsp; Button id: #dont-push (index.html:32:17)'
      }, {
        d: 200,
        s: '<br/>&nbsp; &nbsp; &nbsp; &nbsp; Event type: click ([object Object])<br/><br/>'
      }, {
        d: 800,
        s: new Date() + ' - Attempting to relaunch page'
      }, {
        d: 250,
        s: " . "
      }, {
        d: 250,
        s: " . "
      }, {
        d: 250,
        s: " . "
      }, {
        d: 250,
        s: " . "
      }, {
        d: 250,
        s: " . "
      }, {
        d: 250,
        s: " . "
      }, {
        d: 250,
        s: " . "
      }, {
        d: 250,
        s: " . "
      }, {
        d: 250,
        s: " . "
      }, {
        d: 250,
        s: 'FAILED: (24) Image assets keys corrupted'
      }, {
        d: 400,
        s: '<br/><br/>Switching to manual override mode. . . . . .'
      }, {
        d: 400,
        s: '<br/><span style="color:green;">[MANUAL OVERRIDE MODE ACTIVE]</span>'
      }, {
        d: 1500,
        s: '<br/><br/>Incoming network message:'
      }, {
        d: 1000,
        s: '<br/><span style="color:yellow;"> &nbsp;' + getTime() + 'jschomay: </span>Oh, hi there.  You pressed the button, didn\'t you.'
      }, {
        d: 1000,
        s: '<br/><span style="color:yellow;"> &nbsp;' + getTime() + 'jschomay: </span>I <em>knew </em>you were going to press that button!!'
      }, {
        d: 4000,
        s: '<br/><span style="color:yellow;"> &nbsp;' + getTime() + 'jschomay: </span>It\'s ok, we can fix this.  I just need a little help from you to reconnect my image assets to their database keys.  Think of it as a game...'
      }, {
        d: 400,
        s: ''
      }, {
        d: 400,
        s: ''
      }, {
        d: 400,
        s: ''
      }
    ];

    Game.prototype.delay = function(delay, fn) {
      return setTimeout(fn, delay);
    };

    return Game;

  })();
  return $(document).ready(function() {
    var game;

    game = new Game;
    return game.start();
  });
})();
