require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios = require('axios');
const { search } = require('./controllers/auth');
const apikey = process.env.API_KEY;
const db = require('./models');

const SECRET_SESSION = process.env.SECRET_SESSION;
// console.log(SECRET_SESSION);

// MIDDLEWARE

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(session({
  secret: SECRET_SESSION,    // What we give the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));

app.use(flash());            // flash middleware

app.use(passport.initialize());      // Initialize passport
app.use(passport.session());         // Add a session

// lines 30 and 31 need to be placed before the app.use that includes req.flash()

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});


// GET ROUTES

// Renders Mainpage
app.get('/', (req, res) => {
  res.render('index');
});


// Renders Homepage
app.get('/home', (req, res) => {
  db.post.findAll()
  .then( foundPosts => {
    let allPosts = [];
    foundPosts.forEach(post =>{
      allPosts.push(post.dataValues)
    })
    res.render('home', {allPosts});
  })
});


// Renders Info on a Specific Post to the Page
app.get('/home/:title', (req,res) => {
  db.post.findOne({
    where: 
    {title: req.params.title},
    include: [db.comment]
  })
  .then(thisPost => {
    let postData = thisPost.dataValues
    let allComments = thisPost.dataValues.comments
    res.render('show', {postData, allComments});
  })
});


// Renders Search Page
app.get('/search', (req,res) => {
  res.render('search');
})

// Renders Search Results Page
app.get('/books/:title', function(req, res) {
  let input = req.query.titleSearch;
  // console.log(input);
  let googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${input}`;
  // sets a variable equal to the API path + search terms
  axios.get(googleBooksUrl).then(response => {
    // uses axios to request the JSON data from the googleBooksURL and returns it as "response"
    let searchReturn = response.data.items;
    let bookData = [];
    searchReturn.forEach( e => {
        bookData.push(e.volumeInfo)
    });
    res.render('results', {bookData});
    // console.log(bookData)
    // renders the books return page 
  });
});

// Renders User Profile (aka bookshelf)
app.get('/profile', isLoggedIn, (req, res) => {
  // const { id, name, email } = req.user.get(); 
  res.render('profile');
});


app.use('/auth', require('./controllers/auth'));




const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
