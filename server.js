require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig'); //
const flash = require('connect-flash');
const methodOverride = require('method-override');
// const cloudinary = require('cloudinary');
// const multer = require('multer');
// const uploads = multer({ dest: './uploads'});


const app = express();
app.set('view engine', 'ejs');
0
///SESSION///
const SECRET_SESSION = process.env.SECRET_SESSION;
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');

///MIDDLEWARE///
app.use(methodOverride('_method'));
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

///SESSION MIDDLEWARE///
const sessionObject = {
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}
app.use(session(sessionObject));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

///CONTROLLERS///
app.use('/auth', require('./controllers/auth'));

app.use('/projects', require('./controllers/projects'))

app.use('/lumber', require('./controllers/lumber'))




app.get('/', (req, res) => {
  res.render('index');
});



app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('profile', { id, name, email });
});






const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
