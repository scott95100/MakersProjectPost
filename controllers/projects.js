let express = require('express')
let db = require('../models')
let router = express.Router()



// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
    res.render('projects/new')
})

router.get('/allPosted', (req, res)=> {
    res.render('projects/allPosted')
})
  
  
  
module.exports = router