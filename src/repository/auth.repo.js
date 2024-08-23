const usersDatabase = require('../models/users.mongo');


async function isAdminExists(){
    const user = await usersDatabase.findOne({
        role : 'admin'
    })

    if(user && user.email){
        return true;
    }

    return false;
}

async function getUser(email){
    const user = await usersDatabase.findOne({
        email : email
    })

    return user;
}

async function addUser(user){
    const newUser = new usersDatabase({
        email: user.email,
        name : user.name,
        role : user.role
      });
    
    newUser.password = newUser.generateHash(user.password);
    await newUser.save();
}
module.exports = {
    isAdminExists,
    addUser,
    getUser
}