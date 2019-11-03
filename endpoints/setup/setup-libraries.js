module.exports = (DB, server) => {

  server.post('/api/setup-libraries', (req, res) => {

    const libraries = req.body

    DB.set('libraries', libraries)
      .write()
  
    res.end()
  
  })

}