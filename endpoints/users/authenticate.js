module.exports = (DB, server) => {

  server.post('/api/authenticate', (req, res) => {

    const Configured = DB.get('configured').value() || false

    if(req.body.authToken) {

      const Authenticated = DB.get('users').filter({authToken: req.body.authToken}).value()

      if(Configured && Authenticated.length) {

        res.status(200).json({user: Authenticated[0], configured: Configured})

      }else{

        res.status(200).json({user: false, configured: Configured})

      }

    }else{

      res.status(200).json({user: false, configured: Configured})

    }
  
    res.end()
  
  })

}