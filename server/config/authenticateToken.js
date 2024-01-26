const jwt = require('jsonwebtoken');

// Middleware to validate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const secretKey = process.env.SECRET_KEY;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401); 

    jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
});
}

module.exports = authenticateToken;