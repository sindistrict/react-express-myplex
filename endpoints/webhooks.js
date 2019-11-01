const Axios = require('axios')
const multer  = require('multer')

module.exports = (server) => {

  const upload = multer({ dest: '/tmp/' })

  server.post('/api/webhooks-plex', upload.single('thumb'), (req, res, next) => {

    const payload = JSON.parse(req.body.payload)

    Axios.post('https://discordapp.com/api/webhooks/639878507563843597/N-_JK6PsH-EHSV5YegdEvmqSgia5yWyrsL6ToevSonGPlWjMqaVQqclq7TmqskYISTmt', {

      content: payload
      
    })

  })

}