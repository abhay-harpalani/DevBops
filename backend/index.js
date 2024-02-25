let express = require('express');
let request = require('request'); // Consider using a more modern library like axios for promises support
let querystring = require('querystring');
require('dotenv').config(); //remember to include this!

let app = express();

let redirect_uri =
  process.env.REDIRECT_URI ||
  'http://localhost:8888/callback';

app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }));
});

app.get('/callback', function(req, res) {
  let code = req.query.code || null;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    if (error) {
      console.error('Error requesting access token', error);
      return res.send('An error occurred');
    }
    var access_token = body.access_token;
    let uri = 'http://localhost:3000/playlists';
    res.redirect(uri + '?access_token=' + access_token);
  });
});

let port = process.env.PORT || 8888;
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`);
app.listen(port);
