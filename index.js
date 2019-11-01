const express = require('express')
const path = require('path')

const server = express()

server.use(express.static(path.join(__dirname, 'client/build')))

server.get('/api/customers', (req, res) => {

  const customers = [
    {id: 0, fname: 'Franklin', lname: 'Roosevelt'},
    {id: 1, fname: 'Samuel',   lname: 'Adams'},
    {id: 3, fname: 'Benjamin', lname: 'Franklin'}
  ]

  res.json(customers)

})

server.get('*', (req, res) => {

  res.sendFile(path.join(__dirname, 'client/build/index.html'))

})

server.listen(process.env.PORT || 5000, () => {

  console.log(`The server is listening at :${process.env.PORT || 5000}`)

})