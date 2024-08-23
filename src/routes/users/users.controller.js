const {getAllUsers,
    updateUser,
    deleteUser} = require('../../repository/users.repo');
const logger = require('../../utils/logger');

async function httpGetUsers(req,res){
    try {
        const users = await getAllUsers();
        return res.status(200).json({
            status : true,
            message : 'successfully retrived users',
            data : users
        });
    } catch (error) {
        logger.error("Error in httpGetUsers",error)
        return res.status(500).json({
            status : false,
            message : error.message,
            data : []
        })
    }
}

async function httpUpdateUser(req,res){
    try {
        //Todo: Add validations for the req body.
        const emailId = req.params.id;
        const user = req.body;

        await updateUser({email:emailId,name: user.name});
        return res.status(200).json({
            status : true,
            message : 'successfully updated user',
            data : user
        })
    } catch (error) {
        logger.error("Error in httpUpdateUser",error)
        return res.status(500).json({
            status : false,
            message : error.message,
            data : []
        })
    }
}

async function httpDeleteUser(req,res){
    try {
        //Todo: Add validations for the req params.
        const emailId = req.params.id;
        await deleteUser(emailId);
        return res.status(200).json({
            status : true,
            message : 'successfully deleted user',
            data : emailId
        })
    } catch (error) {
        logger.error("Error in httpDeleteUser",error)
        return res.status(500).json({
            status : false,
            message : error.message,
            data : []
        })
    }
}

module.exports = {
    httpGetUsers,
    httpUpdateUser,
    httpDeleteUser
}