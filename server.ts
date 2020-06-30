import express = require('express')
import path = require('path')
import { appendFile } from 'fs'

const server = express()

server.set("views", path.join(__dirname, "/views"))

server.use(express.static(path.join(__dirname, "/public"), {
    cacheControl: true,
    etag: false,
    maxAge: "30d"
}))

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/mytransactions.html'))
})

const porta = (parseInt(process.env.PORT) || 8000)

server.listen(porta, () => {
    console.log('Executando o servidor na porta:' + porta)
})