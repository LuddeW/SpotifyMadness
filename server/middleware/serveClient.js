const { readFile } = require('fs')
const { join, extname } = require('path')
const { promisify } = require('util')
const { DEVELOPMENT } = require('../../config/env')

const isFile = url => extname(url) !== ''
const readFileAsync = promisify(readFile)

const clientIndexFile = join(__dirname, '../../client/build/index.html')

if (DEVELOPMENT) {
  module.exports = function redirectToDevServer(ctx) {
    let redirectUrl = `http://localhost:3005${ctx.path}`
    if (ctx.querystring) {
      redirectUrl += `?${ctx.querystring}`
    }
    ctx.response.redirect(redirectUrl)
  }
} else {
  module.exports = async function serveSPA(ctx, next) {
    if (isFile(ctx.url)) {
      return next()
    }

    ctx.body = await readFileAsync(clientIndexFile, 'utf8')
  }
}
