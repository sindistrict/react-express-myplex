const Axios = require('axios')
const XML2JS = require('xml2js')

module.exports = (DB, server) => {

  server.post('/api/plex-library', (req, res) => {

    const _res = res
    const Owner = DB.get('users').filter({isOwner: true}).value()[0]
    const Server = DB.get('server').value()

    Axios.get(`http://${Server.address}:${Server.port}/library/sections/${req.body.key}/all`, {

      headers: { 'X-Plex-Token': Owner.authToken }

    }).then(response => {

      console.log(response.data)
      _res.json(response.data.MediaContainer.Metadata)

    }).catch(error => {

      console.error('API Error:', error)
      _res.end()

    })
  
  })

}