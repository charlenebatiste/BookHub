const db = require("./models");


function findAllUsers(){
    db.user.findAll().then(allUsers=> {
        console.log(allUsers);
    })
}

// findAllUsers();

function seeAUsersPosts(){
    db.user.findOne({
        where: {name: 'Billy'},
        include: [db.post]
    })
    .then (thisUser => {
        console.log(thisUser.dataValues.name);
        console.log(thisUser.dataValues.posts[0].dataValues.title);
        // is the user has more than 1 post you would need to loop through the posts to get each bit of data you wanted
    })
    .catch(err => {
        console.log(err)
    })
}

// seeAUsersPosts()

function findComments(){
    db.comment.findAll({
        where:{postId: 2}
    })
    .then( allComments => {
        console.log(allComments)
    })
    .catch(err => {
        console.log(err)
    })
}

// findComments()

function findPostAndComments(){
    db.post.findOne({
        where: {userId:4},
        include: [db.comment]
    })
    .then(postWithComments => {
        console.log(postWithComments.title)
        console.log(postWithComments.comments[0].content)
    })
    .catch(err => {
        console.log(err)
    })
}

// findPostAndComments()

function findAllPosts(){
    db.post.findAll()
    .then(foundPosts => {
        foundPosts.forEach( post => {
            console.log(post)
        })
    })
    .catch(err => {
        console.log(err)
    })
}

findAllPosts()

function addAuthor(){
    db.post.update({
        author: 'Charlene'
      }, {
        where: {
            title: `Where does Lorem Ipsum come from?`
        }
    }).then(numRowsChanged=>{
        console.log(numRowsChanged)
    });
}

// addAuthor()

function findAllComments(){
    db.comment.findAll({
        where: {userId: 1}
    })
    .then(comments => {
        comments.forEach( comment => {
            console.log(comment.dataValues)
        })
    })
    .catch(err => {
        console.log(err)
    })
}

// findAllComments()