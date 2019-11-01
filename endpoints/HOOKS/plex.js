module.exports = (server) => {

  server.post('/api/webhooks/plex', (req, res) => {

    console.log(req.body)
    res.send(req.body)
  
  })

}