import express = require('express')
import wrap = require('express-async-error-wrapper')
import Transaction = require('../models/conta')

const router = express.Router()

//configura para q a primeira renderize o arquivo 'mytransactions.ejs'
router.get('/', (req, res) => {
    res.render('mytransactions')
})

export = router