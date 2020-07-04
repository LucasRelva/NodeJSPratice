import express = require('express')
import path = require('path')
import ejs = require('ejs')
import lru = require('lru-cache')

const server = express()

server.set('views', path.join(__dirname, '/views'))

server.use(express.static(path.join(__dirname, '/public'), {
    cacheControl: true,
    etag: false,
    maxAge: '30d'
}))

server.use(express.json())
server.use(express.urlencoded({ extended: true }));

ejs.cache = lru(200)

server.set('view engine', 'ejs')
server.use(require('express-ejs-layouts'))

server.use((req, res, next) => {
    res.header('Cache-Control', "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    next();
})

server.use('/', require('./routes/home'))
server.use('/api/conta', require('./routes/api/conta'))

const porta = (parseInt(process.env.PORT) || 8000)

server.listen(porta, () => {
    console.log('Executando o servidor na porta:' + porta)
})