const { join } = require('path')
const serve = require('koa-static')
const { DEVELOPMENT } = require('../config/env')

if (DEVELOPMENT) {
  module.exports = function redirectToDevServer(ctx) {
    let redirectUrl = `http://localhost:3005${ctx.path}`
    if (ctx.querystring) {
      redirectUrl += `?${ctx.querystring}`
    }
    ctx.response.redirect(redirectUrl)
  }
} else {
  const serveClient = serve(join(__dirname, '../../client/build'))
  module.exports = serveClient
}
