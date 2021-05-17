const db = require("./models");


function findAllUsers(){
    db.user.findAll().then(allUsers=> {
        console.log(allUsers);
    })
}

// findAllUsers();