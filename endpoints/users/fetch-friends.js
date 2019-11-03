const Axios = require('axios')
const XML2JS = require('xml2js')

module.exports = (DB, server) => {

  server.get('/api/plex-friends', (req, res) => {

    const _res = res
    let users = []

    const Owner = DB.get('users').filter({isOwner: true}).value()[0]

    Axios.get('https://plex.tv/pms/friends/all', {

      headers: { 'X-Plex-Token': Owner.authToken }

    }).then(response => {

      const parser = new XML2JS.Parser()
      parser.parseStringPromise(response.data).then(data => {

        for(let [key, user] of Object.entries(data.MediaContainer.User)) {

          users.push(user.$)

        }

        _res.json(users) 

      })

    })
  
  })

}