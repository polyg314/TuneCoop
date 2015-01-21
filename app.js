var express 	  = require('express');
var app			  = express();
var	express 	  = require('ejs'); 
var path		  = require('path');
var bodyParser 	  = require('body-parser');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var passport	  = require('passport');
var pg			  = require('pg');
var LocalStrategy = require('passport-local').Strategy;
var passport      = require('passport');
var methodOverride= require('method-override');
var pg = require('pg');
var db = {};


app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':true}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));


db.config = {
  database: "tunecoop",
  port: 5432,
  host: "localhost"
};


db.connect = function(runAfterConnecting) {
  pg.connect(db.config, function(err, client, done){
    if (err) {
      console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
    }
    runAfterConnecting(client);
    done();
  });
};

db.query = function(statement, params, callback){
  db.connect(function(client){
    client.query(statement, params, callback);
  });
};



app.get('/', function(req, res){
	res.render('home')
});

app.listen(process.env.PORT || 3000);