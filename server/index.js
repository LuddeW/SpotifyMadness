const Koa = require('koa')
const api = require('./api')
const serveClient = require('./serveClient')
const checkApi404 = require('./middleware/checkApi404')
const logRequest = require('./middleware/logRequest')

const app = new Koa()

app.use(logRequest)

app.use(api.routes())
app.use(api.allowedMethods())
app.use(checkApi404)

app.use(serveClient)

module.exports = app
