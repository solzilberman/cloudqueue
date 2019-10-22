const LastFM = require('last-fm')
const lastfm = new LastFM('167b49e553088a17a4e801b8e70a362b', { userAgent: 'MyApp/1.0.0 (http://example.com)' })
 
lastfm.trackSearch({ q: 'the greatest', limit:1 }, (err, data) => {
  if (err) console.error(err)
  else console.log(data)
})