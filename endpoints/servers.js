const Axios = require('axios')
const XML2JS = require('xml2js')

module.exports = (server) => {

  server.get('/api/servers', (req, res) => {

    const _res = res
    let servers = []

    Axios.get('https://plex.tv/pms/servers', {

      headers: { 'X-Plex-Token': 'RUKesxLwTSu52XSqKRnd' }

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