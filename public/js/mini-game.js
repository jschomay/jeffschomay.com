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
      this.render = __bind(this.render, this);
      this.runSequence = __bind(this.runSequence, this);
      this.checkKey = __bind(this.checkKey, this);
      this.renderImageFragment = __bind(this.renderImageFragment, this);
    }

    Game.prototype.start = function() {
      var _this = this;

      console.log("game started ", getTime());
      this.$stage = $('#about');
      this.currentImageFragmentNumber = 0;
      this.remainingKeys = this.keys;
      return this.delay(1000, function() {
        return _this.runSequence(_this.introSequence, 0, function() {
          return _this.delay(6000, _this.renderImageFragment(function() {
            return _this.delay(1000, function() {
              return _this.runSequence(_this.sequence2, 0);
            });
          }));
        });
      });
    };

    Game.prototype.renderImageFragment = function(cb) {
      var f, k, key, output, _i, _len, _ref,
        _this = this;

      f = this.images[this.currentImageFragmentNumber];
      output = [
        {
          s: '<br/><br/><span style="color:green;">[LOADING IMAGE FRAGMENT ' + (this.currentImageFragmentNumber + 1) + ']</span>'
        }, {
          d: 1000,
          s: '<br/><div class="fragment" style="background: url(images/' + f.src + '); background-position: ' + f.backgroundPosition + '">' + f.key + '</div><br/>Asset keys:'
        }
      ];
      _ref = this.remainingKeys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        k = $('<span class="key" id="' + key + '">["' + key + '"]</span>');
        k.on('click', function(e) {
          return _this.checkKey(e.target.id);
        });
        output.push({
          d: 0,
          s: [' ', k]
        });
      }
      return this.runSequence(output, 0, cb);
    };

    Game.prototype.checkKey = function(id) {
      if (id === this.images[this.currentImageFragmentNumber].key) {
        console.log("right");
        return $('.key').off();
      } else {
        return console.log("try again");
      }
    };

    Game.prototype.runSequence = function(sequence, step, cb) {
      var _this = this;

      this.render(sequence[step].s);
      if (step < sequence.length - 1) {
        step++;
        return this.delay(sequence[step].d, function() {
          return _this.runSequence(sequence, step, cb);
        });
      } else {
        return typeof cb === "function" ? cb() : void 0;
      }
    };

    Game.prototype.render = function(data) {
      return this.linefeed(data);
    };

    Game.prototype.linefeed = function(data) {
      this.$stage.append(data);
      return $(window).scrollTop($(document).height());
    };

    Game.prototype.introSequence = [
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
        d: 1900,
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
        d: 1600,
        s: '<br/><br/>Switching to manual override mode. . . . . .'
      }, {
        d: 1100,
        s: '<br/><span style="color:green;">[MANUAL OVERRIDE MODE ACTIVE]</span>'
      }, {
        d: 1500,
        s: '<br/><br/>Incoming network message:'
      }, {
        d: 1000,
        s: '<br/><span style="color:yellow;"> &nbsp;' + getTime() + 'jschomay: </span>Oh, hi there.  You pressed the button, didn\'t you.'
      }, {
        d: 3000,
        s: '<br/><span style="color:yellow;"> &nbsp;' + getTime() + 'jschomay: </span>I <em>knew </em>you were going to press that button!!'
      }, {
        d: 3500,
        s: '<br/><span style="color:yellow;"> &nbsp;' + getTime() + 'jschomay: </span>It\'s ok, we can fix this.  I just need a little help from you to reconnect my image assets to their database keys.  Think of it as a game.  Just follow along.  One second...'
      }
    ];

    Game.prototype.sequence2 = [
      {
        d: 2000,
        s: '<br/><br/><span style="color:yellow;"> &nbsp;' + getTime() + 'jschomay - </span>Ok, it\'s your turn.  Click on the asset key you think this image fragment fits with.'
      }, {
        d: 400,
        s: '<br/><br/>Waiting for user input...'
      }
    ];

    Game.prototype.images = [
      {
        src: 'images/unicycle.jpg',
        backgroundPosition: '-20px -50px',
        key: 'unicycle',
        info: 'Yup, I ride a 6 foot tall unicycle for fun and professionally :)'
      }, {
        src: 'images/juggler.jpg',
        backgroundPosition: '-20px -50px',
        key: 'juggler',
        info: 'I was a professional juggler for many years'
      }, {
        src: 'images/eagle_scout.jpg',
        backgroundPosition: '-20px -50px',
        key: 'eagle_scout',
        info: 'Many people don\'t know I\'m an Eagle Scout.'
      }, {
        src: 'images/origami.jpg',
        backgroundPosition: '-20px -50px',
        key: 'origami',
        info: 'I\'ve made origami since I was 7 years old'
      }, {
        src: 'images/travel.jpg',
        key: 'travel',
        backgroundPosition: '-20px -50px',
        info: 'I lived in Europe for 5 years when I was young, and have traveled around the world'
      }
    ];

    Game.prototype.keys = ["origami", "juggler", "scuba_dive", "eagle_scout", "unicycle", "travel", "sky_diving"];

    Game.prototype.delay = function(delay, fn) {
      return setTimeout(fn, 0);
    };

    return Game;

  })();
  return $(document).ready(function() {
    var game;

    game = new Game;
    return game.start();
  });
})();
