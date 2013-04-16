var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function() {
  var Game;

  Game = (function() {
    function Game() {
      this.checkKey = __bind(this.checkKey, this);
      this.linefeed = __bind(this.linefeed, this);
      this.render = __bind(this.render, this);
      this.runSequence = __bind(this.runSequence, this);
      this.renderImageFragment = __bind(this.renderImageFragment, this);
    }

    Game.prototype.start = function() {
      var i, img, _i, _len, _ref, _results,
        _this = this;

      console.log("game started ", this.getTime());
      this.$stage = $('#about');
      this.currentImageFragmentNumber = 0;
      this.remainingKeys = this.keys;
      this.delay(1000, function() {
        return _this.runSequence(_this.introSequence, 0, function() {
          return _this.delay(6000, function() {
            return _this.renderImageFragment(function() {
              return _this.delay(1000, function() {
                return _this.runSequence(_this.sequence2, 0);
              });
            });
          });
        });
      });
      _ref = this.images;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        img = _ref[_i];
        i = new Image();
        i.src = img.src;
        _results.push(i = null);
      }
      return _results;
    };

    Game.prototype.getTime = function() {
      var currentTime, hours, minutes, seconds;

      currentTime = new Date();
      hours = currentTime.getHours();
      minutes = currentTime.getMinutes();
      seconds = currentTime.getSeconds();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return "(" + hours + ":" + minutes + ":" + seconds + ")";
    };

    Game.prototype.renderImageFragment = function(cb) {
      var f, k, key, output, _i, _len, _ref,
        _this = this;

      f = this.images[this.currentImageFragmentNumber];
      output = [
        {
          s: '<br/><br/><span style="color:lightgreen;">[LOADING IMAGE FRAGMENT ' + (this.currentImageFragmentNumber + 1) + ']</span>'
        }, {
          d: 2000,
          s: '<br/><div class="fragment" style="background: url(' + f.src + '); background-position: ' + f.backgroundPosition + '"></div><br/>Asset keys:'
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
      output.push({
        d: 400,
        s: '<br/><br/>Waiting for user input...'
      });
      return this.runSequence(output, 0, cb);
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

    Game.prototype.delay = function(delay, fn) {
      return setTimeout(fn, delay / 1);
    };

    Game.prototype.render = function(data) {
      return this.linefeed(data);
    };

    Game.prototype.linefeed = function(data) {
      if (typeof data === 'string') {
        data = data.replace('getTime', this.getTime());
        data = data.replace('getDate', new Date());
      }
      this.$stage.append(data);
      return $(window).scrollTop($(document).height());
    };

    Game.prototype.checkKey = function(id) {
      var $image, $imageWrapper, i, output,
        _this = this;

      if (id === this.images[this.currentImageFragmentNumber].key) {
        $('.key').off();
        i = $.inArray(id, this.remainingKeys);
        this.remainingKeys.splice(i, 1);
        $image = $('<div class="full-image"></div>');
        $image.css({
          'background-image': 'url(' + this.images[this.currentImageFragmentNumber].src + ')',
          width: this.images[this.currentImageFragmentNumber].width,
          height: 0
        });
        $imageWrapper = $('<div class="full-image-wrapper"></div>');
        $imageWrapper.css({
          height: this.images[this.currentImageFragmentNumber].height
        });
        $imageWrapper.append($image);
        this.delay(1200, function() {
          return $image.animate({
            height: _this.images[_this.currentImageFragmentNumber].height
          }, 2000);
        });
        output = [
          {
            s: '<br/><br/>User input: ' + id + '<br/><span style="color: lightgreen;">Success: Valid asset key match.  Relinking image.'
          }, {
            d: 1200,
            s: ['<br/><br/>', $imageWrapper]
          }, {
            d: 2800,
            s: '<br/><br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay: </span>' + this.correctResponses[Math.floor(Math.random() * this.correctResponses.length)] + ' ' + this.images[this.currentImageFragmentNumber].info
          }
        ];
        return this.runSequence(output, 0, function() {
          if (_this.currentImageFragmentNumber !== (_this.images.length - 1)) {
            _this.currentImageFragmentNumber++;
            return _this.delay(3000, _this.renderImageFragment);
          } else {
            return _this.delay(2000, function() {
              return _this.runSequence(_this.finalSequence, 0, function() {
                console.log("now back to your regularly scheduled programe...", _this.getTime());
                return _this.delay(6000, function() {
                  return _this.$stage.remove();
                });
              });
            });
          }
        });
      } else {
        output = [
          {
            s: '<br/><br/>User input: ' + id + '<br/><span style="color: red;">Error:</span> Non-matching key, unable to link asset'
          }, {
            d: 800,
            s: '<br/><br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay: </span>' + this.missResponses[Math.floor(Math.random() * this.missResponses.length)]
          }
        ];
        return this.runSequence(output, 0);
      }
    };

    Game.prototype.introSequence = [
      {
        d: 200,
        s: '<br/>' + 'getDate' + ' - <span style="color: red;">ERROR (42): GUI crashed - User pressed the wrong button</span>'
      }, {
        d: 200,
        s: '<br/>&nbsp; &nbsp; &nbsp; &nbsp; Button id: #dont-push (index.html:32:17)'
      }, {
        d: 200,
        s: '<br/>&nbsp; &nbsp; &nbsp; &nbsp; Event type: click ([object Object])<br/><br/>'
      }, {
        d: 1900,
        s: 'getDate' + ' - Attempting to relaunch GUI'
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
        s: '<br/><span style="color:lightgreen;">[MANUAL OVERRIDE MODE ACTIVE]</span>'
      }, {
        d: 1500,
        s: '<br/><br/>Incoming network message:'
      }, {
        d: 1000,
        s: '<br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay: </span>Oh, hi there.  You pressed the button, didn\'t you.'
      }, {
        d: 3000,
        s: '<br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay: </span>I <em>knew </em>you were going to press that button!!'
      }, {
        d: 3500,
        s: '<br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay: </span>It\'s ok, we can fix this.  I just need a little help from you to reconnect my image assets to their database keys.  Think of it as a game.  And you\'ll learn some less known facts about me along the way.  One second...'
      }
    ];

    Game.prototype.sequence2 = [
      {
        s: '<br/><br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay - </span>Ok, it\'s your turn.  Click on the asset key you think this image fragment fits with.'
      }
    ];

    Game.prototype.finalSequence = [
      {
        s: '<br/><br/><span style="color:lightgreen;">[IMAGE ASSET KEYS SUCCESSFULLY REBUILT]</span>'
      }, {
        d: 500,
        s: '<br/>' + 'getDate' + ' - Asset keys varified.  OK to relaunch GUI'
      }, {
        d: 3500,
        s: '<br/><br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay - </span>Nice!  Looks like you fixed all the image asset keys, thanks for your help!'
      }, {
        d: 4500,
        s: '<br/><span style="color:yellow;"> &nbsp;' + " getTime " + 'jschomay - </span>I\'ll send  you back to the main site in just a second... bye!'
      }
    ];

    Game.prototype.images = [
      {
        src: 'images/unicycle.jpg',
        width: 588,
        height: 588,
        backgroundPosition: '-275px -440px',
        key: 'unicycle',
        info: 'Yup, I ride a 6 foot tall unicycle for fun and professionally :)'
      }, {
        src: 'images/origami.jpg',
        width: 500,
        height: 462,
        backgroundPosition: '-208px -315px',
        key: 'origami',
        info: 'I\'ve made origami since I was 7 years old'
      }, {
        src: 'images/juggler.jpg',
        width: 300,
        height: 450,
        backgroundPosition: '-67px -43px',
        key: 'juggler',
        info: 'I was a professional juggler for many years'
      }, {
        src: 'images/eagle_scout.jpg',
        width: 250,
        height: 320,
        backgroundPosition: '-135px -90px',
        key: 'eagle_scout',
        info: 'Many people don\'t know I\'m an Eagle Scout.'
      }, {
        src: 'images/travel.jpg',
        width: 545,
        height: 409,
        backgroundPosition: '-94px -117px',
        key: 'travel',
        info: 'I lived in Europe for 5 years when I was young, and have traveled around the world'
      }
    ];

    Game.prototype.keys = ["origami", "juggler", "scuba_dive", "eagle_scout", "unicycle", "travel", "sky_diving"];

    Game.prototype.correctResponses = ['Nice, you got it.', 'That\'s right!', 'That\'s a match.', 'Correct.', 'Well done.'];

    Game.prototype.missResponses = ['Looks like you didn\'t find the right match, try again.', 'Wrong one.  Try again.', 'That\'s not it, try again.', 'Try a different one.'];

    return Game;

  })();
  return $(document).ready(function() {
    var game;

    game = new Game;
    return game.start();
  });
})();
