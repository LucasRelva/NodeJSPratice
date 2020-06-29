import express = require('express')
import path = require('path')

const server = express()

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/mytransactions.html'))
})

 const porta = (parseInt(process.env.PORT) || 8000)

 server.listen(porta, () => {
     console.log('Executando o servidor na porta:' +porta)
 })