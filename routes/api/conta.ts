import express = require('express')
import wrap = require('express-async-error-wrapper')
import Sql = require('../../infra/sql')
import Transaction = require('../../models/conta')

const router = express.Router()

router.get('/listar', wrap(async (req, res) => {

    let transactions = await Transaction.list()
    res.json(transactions)
}))

router.get('/excluir/:id', wrap(async (req, res) => {

    const id = parseInt(req.params['id'])

    if (isNaN(id)) {
        res.status(400).json('Id inválido')
        return
    }

    let err = await Transaction.delete(id)

    if (err) {
        res.status(400).json(err)
        return
    }

    res.sendStatus(204)
}))

router.post('/criar', wrap(async (req, res) => {

    let transaction = req.body as Transaction

    let err = await Transaction.create(transaction)

    if (err) {
        res.status(400).json(err)
        return
    }

    res.json(transaction.id)
}))

export = router