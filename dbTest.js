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
        console.log(thisUser);
        console.log(thisUser.dataValues.posts);
    })
    .catch(err => {
        console.log(err)
    })
}

// seeAUsersPosts()