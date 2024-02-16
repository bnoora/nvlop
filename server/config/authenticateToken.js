const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify); // Convert verify to use promises

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const secretKey = process.env.SECRET_KEY;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.sendStatus(401); 
    }

    const token = authHeader.split(' ')[1]; // Extract the token

    try {
        const user = await verify(token, secretKey);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token is not valid" });
    }
}

module.exports = authenticateToken;