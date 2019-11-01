const express = require('express')
const parser = require('body-parser')
const path = require('path')

const server = express()

server.use(parser.urlencoded({ extended: false }))
server.use(parser.json())

server.use(express.static(path.join(__dirname, 'client/build')))

require('./endpoints/GET/servers')(server)
require('./endpoints/GET/libraries')(server)
require('./endpoints/GET/users')(server)

require('./endpoints/HOOKS/plex')(server)

server.get('*', (req, res) => {

  res.sendFile(path.join(__dirname, 'client/build/index.html'))

})

server.listen(process.env.PORT || 5000, () => {

  console.log(`The server is listening at :${process.env.PORT || 5000}`)

})