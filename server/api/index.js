const Router = require('koa-router')
const spotifyRouter = require('./spotify')

const router = new Router({
  prefix: '/api'
})

router.use('/spotify', spotifyRouter.routes(), spotifyRouter.allowedMethods())

module.exports = router
