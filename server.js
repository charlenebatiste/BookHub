require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios = require('axios');
const apikey = process.env.API_KEY;
const db = require('./models');
const methodOverride = require('method-override')

const SECRET_SESSION = process.env.SECRET_SESSION;
// console.log(SECRET_SESSION);

// MIDDLEWARE

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(methodOverride(`_method`));

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

app.use('/auth', require('./controllers/auth'));

// GET ROUTES

// Renders Mainpage
app.get('/', (req, res) => {
  res.render('index');
});


// Renders Homepage
app.get('/home', isLoggedIn, (req, res) => {
  db.post.findAll()
  .then( foundPosts => {
    let allPosts = [];
    foundPosts.forEach(post =>{
      allPosts.push(post.dataValues)
    })
    res.render('home', {allPosts});
  })
});

// Renders Page to Create a New Post
app.get('/new', isLoggedIn, (req,res) => {
  const user = req.user.get()
  res.render('new', {user})
})

// Renders Info on a Specific Post to the Page
app.get('/home/:title', isLoggedIn, (req,res) => {
  const user = req.user.get()
  db.post.findOne({
    where: 
    {title: req.params.title},
    include: [db.comment]
  })
  .then(thisPost => {
    let postData = thisPost.dataValues
    let allComments = thisPost.dataValues.comments
    res.render('show', {postData, allComments, user});
  })
});


// Renders Search Page
app.get('/search', isLoggedIn, (req,res) => {
  res.render('search');
})

// Renders Search Results Page
app.get('/books/:title', isLoggedIn, (req, res) => {
  const user = req.user.get()
  let input = req.query.titleSearch;
  let googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${input}`;
  // sets a variable equal to the API path + search terms
  axios.get(googleBooksUrl).then(response => {
    // uses axios to request the JSON data from the googleBooksURL and returns it as "response"
    let searchReturn = response.data.items;
    let bookData = [];
    searchReturn.forEach( e => {
        bookData.push(e.volumeInfo)
    });
    res.render('results', {bookData, user});
    // renders the books return page 
  });
});

// Renders User Profile (aka bookshelf)
app.get('/profile', isLoggedIn, (req, res) => {
  const user = req.user.get()
  db.book.findAll()
  .then(favoriteBooks => {
    res.render('profile', {favoriteBooks, user});
  })
  
});

// POST ROUTES

// Add a post to database
app.post('/articles', isLoggedIn, (req, res) => {
  db.post.create({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    userId: req.body.userId
  })
  .then(post => {
    res.redirect('/home')
  })
})

// Add comments to a post
app.post('/comments', isLoggedIn, (req,res)=> {
  db.comment.create({
    author: req.body.author,
    content: req.body.content,
    userId: req.body.userId,
    postId: req.body.postId,
  })
  .then(comment => {
    console.log(comment)
    res.redirect('/home/:title')
  })
})

// Add a book to favorites list
app.post('/addtofavorites', isLoggedIn, function(req, res) {
  db.book.create(req.body)
  .then( b =>{
    res.redirect('/profile')
    // profile page is bookshelf
  })
})

// Remove a book from favorites list
app.delete("/remove/:id", (req, res) => {
  db.book.destroy({
    where: {id: req.params.id },
  });
  res.redirect("/profile");
});


// Edit a comment
app.put('/edit', (req,res) => {
  db.comment.update(
    {content: req.body.content},
    {
    where: {id: req.body.commentId}
  })
  .then( updatedComment => {
    console.log(`-----successfully updated comment-----`)
    res.redirect(`/home/` + req.body.postTitle)
  })
})






const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
