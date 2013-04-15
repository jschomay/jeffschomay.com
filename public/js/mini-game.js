var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function() {
  var Game;

  Game = (function() {
    function Game() {
      this.animate = __bind(this.animate, this);
    }

    Game.prototype.start = function() {
      var _this = this;

      console.log("game started ", this.getTime(), this.sequence1);
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
        d: 500,
        s: "one"
      }, {
        d: 200,
        s: " . "
      }, {
        d: 200,
        s: " . "
      }, {
        d: 200,
        s: " . "
      }, {
        d: 200,
        s: " . "
      }
    ];

    Game.prototype.getTime = function() {
      var currentTime, hours, minutes;

      currentTime = new Date();
      hours = currentTime.getHours();
      minutes = currentTime.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return "(" + hours + ":" + minutes + ")";
    };

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
