const Axios = require('axios')
const XML2JS = require('xml2js')

module.exports = (DB, server) => {

  server.get('/api/plex-servers', (req, res) => {

    const _res = res
    let servers = []

    const Owner = DB.get('users').filter({isOwner: true}).value()[0]

    Axios.get('https://plex.tv/pms/servers', {

      headers: { 'X-Plex-Token': Owner.authToken }

    }).then(response => {

      const parser = new XML2JS.Parser()
      parser.parseStringPromise(response.data).then(data => {

        for(let [key, server] of Object.entries(data.MediaContainer.Server)) {

          servers.push(server.$)

        }

        _res.json(servers) 

      })

    })
  
  })

}