const { DEVELOPMENT } = require('./env')

if (DEVELOPMENT) {
  require('dotenv').config()
}

const { env } = process
module.exports = {
  port: env.PORT || 3006,
  clientId: env.CLIENT_ID || null,
  clientSecret: env.CLIENT_SECRET || null
}
