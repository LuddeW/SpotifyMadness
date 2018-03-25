const Router = require('koa-router')

const spotifyRouter = new Router()

spotifyRouter.get('/search/:query', require('./searchArtists'))

module.exports = spotifyRouter
