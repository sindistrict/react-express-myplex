module.exports = (DB, server) => {

  server.post('/api/setup-finish', (req, res) => {

    if(req.body.authToken) {

      const Owner = DB.get('users').filter({isOwner: true}).value()[0]

      if(Owner.authToken === req.body.authToken) {

        DB.set('configured', true).write()
        res.status(200)

      }else{

        res.status(401)

      }

    }else{

      res.status(401)

    }
  
    res.end()
  
  })

}