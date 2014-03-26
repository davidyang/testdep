
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();


var mongoose = require("mongoose");
  
if (process.env.NODE_ENV === "production") {
  mongoose.connect("mongodb://heroku_app23410640:iaaltidd77ecvio269dqdvgppl@ds045907.mongolab.com:45907/heroku_app23410640");
} else { 
  mongoose.connect('mongodb://localhost/catsDb');
}

db = mongoose.connection;

db.once('open', function callback () {
  // yay!
});

var kittySchema = mongoose.Schema({
    name: String
})
var Kitten = mongoose.model('Puppy', kittySchema)


var fluffy = new Kitten({ name: 'fluffy' });

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
});


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
