module.exports = (DB, server) => {

  server.post('/api/setup-owner', (req, res) => {

    const user = req.body

    DB.get(`users.${user.id}`)
      .assign({isAdmin: true, isOwner: true})
      .write()
  
    res.end()
  
  })

}