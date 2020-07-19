import express = require('express')
import path = require('path')
import ejs = require('ejs')
import lru = require('lru-cache')

const server = express()

server.set('views', path.join(__dirname, '/views')) //faz o servidor sempre buscar por arquivos para 'render' na pasta /views

server.use(express.static(path.join(__dirname, '/public'), { //faz o servidor sempre buscar por arquivos estáticos na pasta /public
    cacheControl: true,// configura o cache
    etag: false,
    maxAge: '30d' //cache será apagado da máquina do usuário após trinta dias
}))

server.use(express.json())
server.use(express.urlencoded({ extended: true }));

ejs.cache = lru(200)
// configura o servidor para o usa da view engine 'ejs'
server.set('view engine', 'ejs') 
server.use(require('express-ejs-layouts'))

server.use((req, res, next) => {
    res.header('Cache-Control', "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    next();
})

server.use('/', require('./routes/home')) // quando a url for apenas / (página inicial) o arquivo a ser lido se encontra em './routes/home'
server.use('/api/conta', require('./routes/api/conta')) // quando a url for  /api/conta o arquivo a ser lido se encontra em './routes/api/conta'

const porta = (parseInt(process.env.PORT) || 8000) //abre o servidor na porta 8000

server.listen(porta, () => {
    console.log('Executando o servidor na porta:' + porta) //log de inicialização do servidor 
})