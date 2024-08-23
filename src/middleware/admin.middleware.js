const {isAdmin} = require('../repository/users.repo');
const {getUser} = require('../repository/auth.repo');
const {verifyToken} = require('../utils/tokenUtil');
const logger = require('../utils/logger');

async function authMiddleware(req, res, next){
  try {
    if(!req.headers?.authorization){
      throw new Error('Token is missing')
    }
    const theJwtToken = req.headers.authorization.substring(7);
    if(!theJwtToken){
      throw new Error('Invalid token');
    }

    const decoded = verifyToken(theJwtToken);
    req.user = await getUser(decoded.email);
    next();
  } catch (error) {
    logger.error("Error in authMiddleware",error)
    return res.status(401).json({
      success: false,
      message: error.message,
      data : ''
    });
  }
  
};

function isAdminRole(req, res, next){
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied',data:'' });
  }
  next();
};



module.exports = {
  authMiddleware,
  isAdminRole
}