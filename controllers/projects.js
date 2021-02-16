let express = require('express')
let db = require('../models')
let router = express.Router()
const cloudinary = require('cloudinary');
const multer = require('multer'); 
const uploads = multer({ dest: './uploads'});




// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
    res.render('projects/new')
})

router.get('/allPosted', (req, res)=> {
    res.render('projects/allPosted')
})
  
//get route that creates the view of the new project and 
router.get('/projects/new', (req, res)=> {
    res.render('/allPosted')
})
  
router.get('/images', (req, res)=> {
    res.render('/allPosted')
})

//need to build the forms post route
router.post('/images', uploads.single('inputFile'), (req, res)=> {
    const image = req.file.path
    console.log(image)
    cloudinary.uploader.upload(image, (result)=> {
        //this should be the return from cloudinary
        console.log(result)
        res.render('/allPosted', { image: result.url })
    })
})
  
module.exports = router