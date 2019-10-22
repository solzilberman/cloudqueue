const textModel = require('./textModel');
const Songs = require('./Songs');
const LastFM = require('last-fm');
const lastfm = new LastFM('167b49e553088a17a4e801b8e70a362b', { userAgent: '/sms' })
const http = require('http');
var prevUrl; 
const exphbs = require('express-handlebars');
const express = require('express');
const redirectUri = 'http://4e8ddfc8.ngrok.io/sms'
const app = express();
var SpotifyWebApi = require('spotify-web-api-node');
var s = new SpotifyWebApi();

var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
      foo: function () { return 'FOO!'; },
      bar: function () { return 'BAR!'; }
  }
});

// The API object we'll use to interact with the API
var spotifyApi = new SpotifyWebApi({
  clientId : '45e1351a8c4649aab77d40d90571b79e',
  clientSecret : '8be69496f6da4c7c81511674e1d268bc'
  
});

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
  
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });




//mongoDB connect
var mongoose = require('mongoose');
var uri = 'mongodb+srv://solzilberman:Sokol417@cluster0-odfgk.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser: true});

//Handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  //connected
});




const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
    songSave = new textModel({title: req.body.Body});
    songSave.save();
    //switch to spotify
      // Search for a track!
      spotifyApi.searchTracks(req.body.Body, {limit: 1})
        .then(function(data) {
          Songs.push(data.body.tracks.items[0].name);
          prevUrl = data.body.tracks.items[0].preview_url;
          console.log(data.body.tracks.items[0].name);
          }, function(err) {
          console.error(err);
      });
    });
    
    
app.get('/sms', (req,res)=>{
  res.render('index',{
      Songs
  });
  
})


  app.listen(1337, () => console.log(`Example app listening on port ` + 1337))




