const { request } = require('express')
let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /lumber search page 
router.get('/new', (req, res) => {
    res.render('lumber/new')
})


router.get('/results', (req, res)=>{
    request({
        url: 'https://trefle.io/',
        qs: {
            s: req.query.searchTerm
        }
    }, function(error, response, body) {
        if(!error && response.statusCode === 200) {
            const plantData = JSON.parse(body);
            res.render('results.ejs', { Plant : plantData.Search });
        }else {
            res.send('Error');
        }
    })
})


router.get('/plant/:trefleId', (req, res)=> {
    let trefleId = req.params.trefleId;
    request({
        url: 'https://trefle.io/',
        qs: {
            i: trefleId,
            tomatoes: true
        }
    }, function (error, response, body) {
        if(!error && response.statusCode ===200) {
            const plantData = JSON.parse(body);
            res.render('tree.ejs', { tree: plantData });
        }else {
            res.send('error');
        }
    })
})


module.exports = router