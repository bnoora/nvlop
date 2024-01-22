async function generateRandomToken() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }
    return token;
}

module.exports = generateRandomToken;