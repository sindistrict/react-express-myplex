const Axios = require('axios')

module.exports = (DB, server) => {

  server.post('/api/user-login', (req, res) => {
  
    Axios({

      method: 'post',
      url: 'https://plex.tv/users/sign_in.json',
      data: {user: req.body},
      headers: {'X-Plex-Client-Identifier': 'react-express-myplex'}

    }).then(response => {

      const user = response.data.user

      DB.set(`users.${user.id}`, {
        uuid: user.uuid,
        email: user.email,
        username: user.username,
        avatar: user.thumb,
        authToken: user.authToken,
        loggedIn: true
      }).write()

      res.json(user)

    }).catch((error, ) => {

      res.json('API REQUEST ERROR:', error)

    })
  
  })

}