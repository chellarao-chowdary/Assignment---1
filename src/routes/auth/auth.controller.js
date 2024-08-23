const {isAdminExists,addUser,getUser} = require('../../repository/auth.repo');
const { signJwtToken } = require('../../utils/tokenUtil');

async function signUp(req,res){
    try {
        const { name, email, password } = req.body;
        //Todo: Add validations for the req body.

        //Check if user has already signed up
        const existingUser = await getUser(email);
        if(existingUser && existingUser.email){
            return res.status(400).json({
                status : false,
                message : 'User already exists',
                data : email
            })
        }

        //Check if the admin already exists
        const isAdminAlreadyExists = await isAdminExists();

        const role = isAdminAlreadyExists ? 'user' : 'admin';

        await addUser({
            name : name,
            email : email,
            password : password,
            role : role
        })

        const token = signJwtToken({
            name : name,
            email : email,
            role : role
        })

        return res.status(201).header('Authorization',`Bearer ${token}`).json({
            status : true,
            message : 'successfully signed up',
            data : email
        })
    } catch (error) {
        logger.error("Error in signUp",error)
        return res.status(500).json({
            status : false,
            message : error.message,
            data : ''
        })
    }

}

async function signIn(req,res){
    try {
        const {email,password} = req.body;
        //Todo: Add validations for the req body.

        const user = await getUser(email);
        
        if(!(user &&(user.validPassword(password)))){
            return res.status(401).json({
                status : false,
                message : 'Invalid credentials',
                data : ''
            })
        }

        const token = signJwtToken({
            name : user.name,
            email : user.email,
            role : user.role
        })

        return res.status(200).header('Authorization',`Bearer ${token}`).json({
            status : true,
            message : 'successfully signed in',
            data : email
        })

    } catch (error) {
        logger.error("Error in signIn",error)
        return res.status(500).json({
            status : false,
            message : error.message,
            data : ''
        })
    }
}


module.exports = {
    signIn,
    signUp
}