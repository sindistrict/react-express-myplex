const Axios = require('axios')
const XML2JS = require('xml2js')

module.exports = (server) => {

  server.get('/api/users', (req, res) => {

    const _res = res
    let users = []

    Axios.get('https://plex.tv/pms/friends/all', {

      headers: { 'X-Plex-Token': 'RUKesxLwTSu52XSqKRnd' }

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