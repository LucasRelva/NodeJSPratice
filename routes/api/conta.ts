import express = require('express')
import wrap = require('express-async-error-wrapper')
import Sql = require('../../infra/sql')
import Transaction = require('../../models/conta')//importa a classe modelo pra q seus métodos posso ser lidos nesse documento

const router = express.Router()
//quando a url for /listar executa a função list e responde o vetor obtido em formato json
router.get('/listar', wrap(async (req, res) => {

    let transactions = await Transaction.list()
    res.json(transactions)
}))
//executa o método delete com o id variável obtido pela url
router.get('/excluir/:id', wrap(async (req, res) => {

    const id = parseInt(req.params['id'])// pega o id da url com o 'req' e salva na const 'id' como um inteiro

    if (isNaN(id)) {// caso o id obtido não seja um número 
        res.status(400).json('Id inválido')
        return //para de executar a função
    }

    let err = await Transaction.delete(id)//executa o método delete com parâmetro 'id' e salva seu retorno na let 'err'

    if (err) {
        res.status(400).json(err)//caso o let 'err' não seja nulo envia como resposta o erro 400
        return
    }

    res.sendStatus(204)// caso tudo ocorrá como esperado envia como res do servidor o status 204(sucesso)
}))
//método create 
router.post('/criar', wrap(async (req, res) => {

    let transaction = req.body as Transaction //pega o json postado pelo formulário no script do arquivo 'layout.ejs'

    let err = await Transaction.create(transaction)// executa o método create

    if (err) {
        res.status(400).json(err) //caso o retorno do método seja diferente de nulo retorna erro e para a função
        return
    }

    res.json(transaction.id)//responde ao servidor o id da transação criada
}))

export = router