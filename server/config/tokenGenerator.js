const jwt = require('jsonwebtoken');

async function generateWebToken(user) {
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(user, secretKey, { expiresIn: '30d' });
    return token;
}

module.exports = generateWebToken;