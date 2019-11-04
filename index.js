const express = require('express')
const parser = require('body-parser')
const path = require('path')
const cors = require('cors')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const ENV = process.env.NODE_ENV || 'dev'
 
const Adapter = ENV !== 'dev' ? new FileSync(path.join(__dirname, 'database.json'), {
  serialize: (obj) => JSON.stringify(obj),
  deserialize: (data) => JSON.parse(data)
}) : new FileSync(path.join(__dirname, 'database.json'))

const DB = low(Adapter)

DB.defaults({ 
  users: {}, 
  server: {}, 
  libraries: {}, 
  media: {}, 
  settings: {}, 
  configured: false 
}).write()

/** Create the server. */
const server = express()

server.use(cors())

/** Parse JSON HTTP requests. */
server.use(parser.urlencoded({ extended: false }))
server.use(parser.json())

/** Use the React build folder as the static path for assets. */
server.use(express.static(path.join(__dirname, 'client/build')))

/** GET endpoints. */
require('./endpoints/servers/fetch-servers')(DB, server)
require('./endpoints/libraries/fetch-libraries')(DB, server)
require('./endpoints/libraries/fetch-library')(DB, server)
require('./endpoints/media/fetch-media')(DB, server)
require('./endpoints/users/fetch-friends')(DB, server)

/** POST endpoints. */
require('./endpoints/users/user-login')(DB, server)
require('./endpoints/setup/setup-owner')(DB, server)
require('./endpoints/setup/setup-server')(DB, server)
require('./endpoints/setup/setup-libraries')(DB, server)
require('./endpoints/setup/setup-finish')(DB, server)
require('./endpoints/users/authenticate')(DB, server)

/** Send all other GET requests to the rendered index file. */
server.get('*', (req, res) =>  res.sendFile(path.join(__dirname, 'client/build/index.html')) )

/** Start the server on port 5000. */
server.listen(process.env.PORT || 5000)