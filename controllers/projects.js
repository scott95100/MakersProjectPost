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
  

  
router.get('/images', (req, res)=> {
    res.render('/allPosted')
})

//new show route for individual project
router.get('/:id', async(req, res)=> {
    try {
      const foundProject = await db.project.findByPk(req.params.id)
      res.render('projects/show.ejs', {
        project: foundProject,
      });
    }catch(e) {
      console.log(e)
    }
  });



//PUT route
router.put('/allPosted/:id', (req, res) => {
    db.project.update({ 
        profilePic: req.body.profilePic,
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId
    }, {
        where: {
            id: req.params.id
        }
    })
    .then((updatedProject)=> {
        console.log('Updated project= ',updatedProject);
        res.redirect('/allPosted');
    })
})

//DELETE Projects route
router.delete('/:id', (req, res)=> {
    db.project.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(project => {
        console.log(project)
        res.redirect('allposted')
    })
})

//get route from new project form, makes a new project and posts the created project to the all projects page
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


module.exports = router