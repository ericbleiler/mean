var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/employees');

mongoose.createConnection('mongodb://localhost/loginapp');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});



app.use('/', routes);
app.use('/users', users);






var mongojs = require('mongojs');
var db1 = mongojs('employees', ['employees']);
var db2 = mongojs('playlists', ['playlists']);
var db3 = mongojs('genres', ['genres']);
var db4 = mongojs('charts', ['charts']);
var db5 = mongojs('music', ['music']);
var db6 = mongojs('artists', ['artists']);
var db7 = mongojs('albums', ['albums']);
var db8 = mongojs('related', ['related']);
var db9 = mongojs('savedAlbums', ['savedAlbums']);
var db10 = mongojs('savedArtists', ['savedArtists']);
var db11 = mongojs('radio', ['radio']);
var db12 = mongojs('artistRating', ['artistRating']);
var db13 = mongojs('artistComments', ['artistComments']);




app.use(bodyParser.json());


var Employee = mongoose.model('Employee', mongoose.Schema({
  name:String,
  album:String,
  artist:String,
  length:String,
  playlist:String,
  user:String
}));
var Music = mongoose.model('Music', mongoose.Schema({
  name:String,
  album:String,
  artist:String,
  length:String
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.get('/api/employees', function(req, res){
  Employee.find(function(err, employees){
    if(err)
      res.send(err);
    res.json(employees);
  });
  
});
app.get('/playlists', function (req, res) {
  db2.playlists.find( function (err, docs) {
    res.json(docs);
  });
});
app.get('/genres', function (req, res) {
  db3.genres.find( function (err, g) {
    res.json(g);
  });
});
app.get('/charts', function (req, res) {
  db4.charts.find( function (err, c) {
    res.json(c);
  });
});

app.get('/api/employees/savedAlbums', function (req, res) {
  db9.savedAlbums.find( function (err, savedAlbums) {
    res.json(savedAlbums);
  });
});
app.get('/api/employees/savedArtists', function (req, res) {
  db10.savedArtists.find( function (err, savedAlbums) {
    res.json(savedAlbums);
  });
});
app.get('/related/:artist' , function(req, res){
  db8.related.findOne({'artist': req.params.artist},function(err, related){
    res.json(related); 
  });    
});
app.get('/artistRating/:artist' , function(req, res){
  db12.artistRating.findOne({  'artist': req.params.artist}, function(err, rating){
    res.json(rating);  
  }); 
    
});
app.get('/artistComments/:artist' , function(req, res){
  db13.artistComments.find({'artist': req.params.artist}, function(err, Comments){
    res.json(Comments);  
  }); 
    
});
app.get('/api/employees/:playlist', function(req, res){
  Employee.find({'playlist': req.params.playlist}, function(err, employees){
    res.json(employees);  

  });    
});

app.get('/music/:artist' , function(req, res){
db5.music.aggregate(
   [ { $sample: { size: 5 } } ],function(err, music){
    res.json(music); 
  });    
});
app.get('/artists/:artist' , function(req, res){
  db6.artists.findOne({'artist': req.params.artist}, function(err, a){
    res.json(a);  
  });    
});
app.get('/albums/:artist' , function(req, res){
  db7.albums.find({'artist': req.params.artist},function(err, album){
    res.json(album); 
  });    
});
app.get('/radio/:artist' , function(req, res){
db11.radio.aggregate(
   [ { $sample: { size: 5 } } ],function(err, radio){
    res.json(radio); 
  });    
});
app.get('/music/albums/:name' , function(req, res){
  db7.albums.find({'name': req.params.name},function(err, album){
    res.json(album); 
  });    
});
app.get('/music/music/:album' , function(req, res){
  db5.music.find({'album': req.params.album},function(err, m){
    res.json(m); 
  });    
});

app.post('/api/employees', function(req, res){

  Employee.create( req.body, function(err, employees){
    if(err)
      res.send(err);
    console.log(employees);
    res.json(employees);
  });
});
app.post('/employees/playlists', function(req, res){
  db2.playlists.insert( req.body, function(err, play){
    console.log(req.body);
    if(err)
      res.send(err);
    res.json(play);
  });
});
app.post('/genres', function(req, res){
  db3.genres.insert( req.body, function(err, g){
    if(err)
      res.send(err);
    res.json(g);
  });
});
app.post('/charts', function(req, res){
  db4.charts.insert( req.body, function(err, c){
    if(err)
      res.send(err);
    res.json(c);
  });
});
app.post('/music', function(req, res){

  db5.music.insert( req.body, function(err, m){
    if(err)
      res.send(err);
    res.json(m);
  });
});

app.post('/artists', function(req, res){
  db6.artists.insert( req.body, function(err, a){
    if(err)
      res.send(err);
    res.json(a);
  });
});
app.post('/albums', function(req, res){
  db7.albums.insert( req.body, function(err, a){
    if(err)
      res.send(err);
    res.json(a);
  });
});
app.post('/playlists', function(req, res){
  db2.playlists.insert( req.body, function(err, a){
    if(err)
      res.send(err);
    res.json(a);
  });
});
app.post('/artistComments/:artist/:user/:comment', function(req, res){
  db13.artistComments.insert( {'artist': req.params.artist, 'user': req.params.user, 'comment': req.params.comment}, function(err, a){
    if(err)
      res.send(err);
    res.json(a);
  });
});
app.post('/savedAlbums/:user/:name', function(req, res){
  db9.savedAlbums.insert( {'user': req.params.user, 'name': req.params.name}, function(err, a){
    if(err)
      res.send(err);
    res.json(a);
  });
});
app.post('/savedArtists/:user/:artist', function(req, res){
  db10.savedArtists.insert( {'user': req.params.user, 'artist': req.params.artist}, function(err, a){
    if(err)
      res.send(err);
    res.json(a);
  });
});
app.post('/api/employees/:name/:album/:artist/:length/:playlist', function(req, res){

  Employee.create({'name' :req.params.name, 'album':req.params.album, 'artist':req.params.artist, 'length':req.params.length, 'playlist': req.params.playlist}, function(err, employees){
    if(err)
      res.send(err);
    console.log(employees);
    res.json(employees);
  });
});
app.delete('/api/employees/:id', function(req, res){
  Employee.findOneAndRemove({_id:req.params.id}, function(err, employee){
    if(err)
      res.send(err);
    res.json(employee);
  });
});
app.put('/api/employees/:id', function(req, res){
  var query = {
    name:req.body.name,
    album:req.body.album,
    length:req.body.length,
    artist:req.body.artist
  };

  Employee.findOneAndUpdate({_id:req.params.id}, query, function(err, employee){
    if(err)
      res.send(err);
    res.json(employee);
  });
});
app.listen(3000, function(){
  console.log('server is running on port 3000..');
});