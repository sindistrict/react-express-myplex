const Axios = require('axios')

module.exports = (server) => {

  server.post('/api/webhooks-plex', async (req, res, next) => {

    const payload = JSON.parse(req.body.payload)

    Axios.post('https://discordapp.com/api/webhooks/639878507563843597/N-_JK6PsH-EHSV5YegdEvmqSgia5yWyrsL6ToevSonGPlWjMqaVQqclq7TmqskYISTmt', {

      content: payload
      
    })

  })

}