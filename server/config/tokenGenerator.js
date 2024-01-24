const crypto = require('crypto');

async function generateRandomToken(user_id) {
    const todaysDateFormatted = new Date().toISOString().slice(0, 10);
    const randomBytes = await crypto.randomBytes(25).toString('hex');
    const token = todaysDateFormatted + randomBytes + user_id;
    return token;
}

module.exports = generateRandomToken;