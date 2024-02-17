const jwt = require('jsonwebtoken');

async function generateWebToken(user) {
    const secretKey = process.env.SECRET_KEY;
    const payload = {
        userId: user, 
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '30d' });
    return token;
}

module.exports = generateWebToken;
