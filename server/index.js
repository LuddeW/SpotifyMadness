const Koa = require('koa')
const api = require('./api')
const checkApi404 = require('./middleware/checkApi404')
const serveClient = require('./middleware/serveClient')
const serveClientAssets = require('./middleware/serveClientAssets')
const logRequest = require('./middleware/logRequest')

const app = new Koa()

app.use(logRequest)

app.use(api.routes())
app.use(api.allowedMethods())
app.use(checkApi404)

app.use(serveClient)
app.use(serveClientAssets)

module.exports = app
