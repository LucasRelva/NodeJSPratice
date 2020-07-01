import express = require('express')
import wrap = require('express-async-error-wrapper')
import transaction = require('../models/conta')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('mytransactions')
})

export = router