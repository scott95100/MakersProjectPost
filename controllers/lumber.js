const { request } = require('express')
let express = require('express')
let db = require('../models')
let router = express.Router()
const axios = require('axios')

// GET /lumber search page 
router.get('/new', (req, res) => {
    res.render('lumber/new')
})


router.get('/results', (req, res)=>{
    let q = req.query.q
    var qs = {
        params: {
            s: q,
            apikey: process.env.API_KEY
        }
    };
    axios.get('https://trefle.io', qs)
        .then(function (response) {
            let data = response.data.Search
            res.render('results', {data})
        })
})


router.get('/api/v1/species', (req, res)=> {
    let plant_id = req.params.plant_id
    var qs = {
        params: {
            i: plant_id,
            apikey: process.env.API_KEY
        }
    };
    axios.get('https://trefle.io', qs)
        .then(function (response) {
            let data = response.data
            console.log(data)
            res.render('lumber/detail', {data})
        })
})




module.exports = router