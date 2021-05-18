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
        console.log(thisUser.name);
        console.log(thisUser.posts);
    })
    .catch(err => {
        console.log(err)
    })
}

seeAUsersPosts()

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