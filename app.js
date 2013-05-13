/*
 * Module dependencies
 */
var express = require('express'),
  stylus = require('stylus'),
  nib = require('nib'),
  bootstrap = require('bootstylus'),
  coffeescript = require('connect-coffee-script'),
  app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib())
    .use(bootstrap());
}
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware(
  { src: __dirname + '/public',
    compile: compile
  }
));

app.use(coffeescript({
  src: __dirname + '/public',
  bare: true
}));


app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  );
});

app.use(express.static(__dirname + '/public'));


port = 8000
app.listen(port);
console.log("Express server listening on "+port);