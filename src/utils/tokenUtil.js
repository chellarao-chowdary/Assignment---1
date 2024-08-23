const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

function signJwtToken(data){
    const token = jwt.sign(data,jwtSecret,{
        expiresIn: '2h'
    })
    return token;
}

function verifyToken(token){
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
}
module.exports = {
    signJwtToken,
    verifyToken
}