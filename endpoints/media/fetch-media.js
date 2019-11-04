const Axios = require('axios')
const XML2JS = require('xml2js')

module.exports = (DB, server) => {

  server.post('/api/plex-media', (req, res) => {

    const _res = res
    const Owner = DB.get('users').filter({isOwner: true}).value()[0]
    const Server = DB.get('server').value()

    Axios.get(`http://${Server.address}:${Server.port}${req.body.key}`, {

      headers: { 'X-Plex-Token': Owner.authToken }

    }).then(response => {

      _res.json(response.data.MediaContainer)

    }).catch(error => {

      console.error('API Error:', error)
      _res.end()

    })
  
  })

}