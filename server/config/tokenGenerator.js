const jwt = require('jsonwebtoken');

async function generateWebToken(user) {
    const secretKey = process.env.SECRET_KEY;
    const token = await jwt.sign(user, secretKey);
    return token;
}