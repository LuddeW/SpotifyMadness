const log = require('../../log')(__filename)

module.exports = async function checkApi404(ctx, next) {
  const apiRegex = /^\/api/i
  if (apiRegex.test(ctx.path) !== true) {
    log.info('Not api request, go to next middleware')
    next()
  } else {
    log.info('Api request, throw 404')
  }
}
