const { JWT_SECRET } = require('./config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            msg:"Please send authenciation in headers"
        })
    }
    const token = authHeader.split(' ')[1];
    console.log(token);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded Token Payload:', decoded);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err.message);
        return res.status(403).json({
            msg:"authenciation verfication failed"
        })
    };

    
}

module.exports = {
    authMiddleware
}