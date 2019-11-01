const express = require('express')
const parser = require('body-parser')
const path = require('path')

const server = express()


/**
 * Parse JSON HTTP requests.
 */

server.use(parser.urlencoded({ extended: false }))
server.use(parser.json())


/**
 * Use the React build folder as the static path for assets.
 */

server.use(express.static(path.join(__dirname, 'client/build')))


/**
 * Listen to specific API endpoints.
 */

require('./endpoints/webhooks')(server)
require('./endpoints/servers')(server)
require('./endpoints/libraries')(server)
require('./endpoints/users')(server)


/**
 * Send all other GET requests to the rendered index file.
 */

server.get('*', (req, res) => {

  res.sendFile(path.join(__dirname, 'client/build/index.html'))

})


/**
 * Start the Express server and have it listen on port 5000.
 */

server.listen(process.env.PORT || 5000, () => {

  console.log(`The server is listening at :${process.env.PORT || 5000}`)

})