const bcrypt = require('bcryptjs');

async function generateRandomToken() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }

    return new Promise((resolve, reject) => {
        bcrypt.hash(token, 10, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

module.exports = generateRandomToken;
