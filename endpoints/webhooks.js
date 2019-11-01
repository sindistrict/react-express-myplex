const Axios = require('axios')

module.exports = (server) => {

  server.post('/api/webhooks', (req, res) => {

    Axios.post('https://discordapp.com/api/webhooks/639878507563843597/N-_JK6PsH-EHSV5YegdEvmqSgia5yWyrsL6ToevSonGPlWjMqaVQqclq7TmqskYISTmt', {

      content: JSON.stringify(req.body)
      
    })

    res.status(200)
    res.send()
  
  })

}