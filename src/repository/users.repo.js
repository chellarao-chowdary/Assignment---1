const usersDatabase = require('../models/users.mongo');

async function isAdmin(email){
    const user = await usersDatabase.findOne({
        email : email
    });

    if (user && user.role === 'admin') {
        return true;
    }
    return false;
}

async function getAllUsers(){
    return await usersDatabase.find({
        isDeleted : false
    },{
        '_id':0,
        '__v':0,
        'isDeleted': 0,
        'password': 0
    })
}

async function updateUser(user){
    await usersDatabase.findOneAndUpdate({
        email : user.email
    },user)
}

async function deleteUser(emailId){
    await usersDatabase.findOneAndUpdate({
        email : emailId
    },{
        isDeleted : true
    })
}

module.exports = {
    isAdmin,
    getAllUsers,
    updateUser,
    deleteUser
};
