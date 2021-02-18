let express = require('express')

let router = express.Router()
const cloudinary = require('cloudinary');
const multer = require('multer'); 
const project = require('../models/project');
const uploads = multer({ dest: './uploads'});

const db = require('../models');



// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
    
    res.render('projects/new')
})

router.get('/allPosted', (req, res)=> {
    db.project.findAll({ 
        where: {
            userId: res.locals.currentUser.get().id
        }
    })
    .then(projectsArr => {
        console.log(projectsArr);
        res.render('projects/allPosted', { projectsArr })
    })
})
  
//get route that creates the view of the new project and 
// router.get('/projects/new', (req, res)=> {
//     res.render('/allPosted')
// })
  
router.get('/images', (req, res)=> {
    res.render('/allPosted')
})


//need to build the forms post route
router.post('/new', uploads.single('inputFile'), (req, res)=> {
    const image = req.file.path
    const { title, description } = req.body;
    cloudinary.uploader.upload(image, (result) => {
        console.log(result); // object
        profileUrl = result.url; // string
        db.project.create({
            title,
            description,
            profilePic: profileUrl,
            userId: res.locals.currentUser.get().id
        })
        .then(newProject => {
            console.log(newProject.get());
            res.redirect('/projects/allPosted');
        })
    })
})

// router.post('/new', (req, res)=> {
//     console.log(req.body);
//     db.project.create({
//         userId: req.params.id,
//         title: req.body.title,
//         description: req.body.description
    
// })
// .then((creatProject)=> {
//     console.log('**Created**');
//     res.redirect('/allPosted')
// }).catch((error)=>{
//     console.log(error)
// })
// })

  
module.exports = router