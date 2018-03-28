const { join } = require('path')
const serve = require('koa-static')

module.exports = serve(join(__dirname, '../../client/build'))
