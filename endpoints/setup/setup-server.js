module.exports = (DB, server) => {

  server.post('/api/setup-server', (req, res) => {

    const server = req.body

    DB.set('server', server)
      .write()
  
    res.end()
  
  })

}