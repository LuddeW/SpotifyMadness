const fetch = require('node-fetch')
const config = require('../../../config')

module.exports = async function searchArtists(ctx) {
  const { query } = ctx.params
  const accessToken = await getAccessToken()
  const artists = await getArtists(query, accessToken)
  ctx.body = `You searched for ${artists}`
}

getAccessToken().then(console.log)
function getAccessToken() {
  var token = config.clientId + ':' + config.clientSecret
  var hashToken = Buffer.from(token).toString('base64')
  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: 'Basic ' + hashToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(res => res.json())
    .then(function(json) {
      return json.access_token
    })
}

function getArtists(query, accessToken) {
  var artists = []
  return fetch(
    'https://api.spotify.com/v1/search?q=' + query + '&type=artist&limit=10',
    {
      headers: { Authorization: 'Bearer ' + accessToken }
    }
  )
    .then(res => res.json())
    .then(function(json) {
      for (var i = 0; i < json.artists.items.length; i++) {
        artists.push(json.artists.items[i].name)
      }
      return artists
    })
}
