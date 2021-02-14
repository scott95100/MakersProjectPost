let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /lumber search page 
router.get('/new', (req, res) => {
    res.render('lumber/new')
})

module.exports = router