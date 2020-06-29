import express = require('express')
import path = require('path')

const server = express()

server.get('/', (req, res) => {
    res.sendfile(path.join(__dirname, '/views/index.html'))
})

 const porta = (parseInt(process.env.PORT) || 8000)

 server.listen(porta, () => {
     console.log('Executando o servidor na porta:' +porta)
 })