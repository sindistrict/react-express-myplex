const Axios = require('axios')
const XML2JS = require('xml2js')

module.exports = (DB, server) => {

  server.get('/api/plex-genres', (req, res) => {

    const _res = res
    const Owner = DB.get('users').filter({isOwner: true}).value()[0]
    const Server = DB.get('server').value()

    Axios.get(`http://${Server.address}:${Server.port}/library/sections/1/genre`, {

      headers: { 'X-Plex-Token': Owner.authToken }

    }).then(response => {

      _res.json(response.data)

    }).catch(error => {

      console.error('API Error:', error)
      _res.end()

    })
  
  })

}