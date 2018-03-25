const server = require('./server')
const config = require('./config')
const log = require('./log')(__filename)

log.info({ config }, 'starting spotify-madness app')

server.listen(config.port, () => {
  log.info({ port: config.port }, 'spotify-madness server started')
})
