const {createUserToken, getUserToken, deleteUserToken, checkTokenValid}= require('../api/userTokenModel');
const generateRandomToken = require('../modules/tokenGenerator');

async function generateToken(user_id) {
    await removeToken(user_id);
    const token = await generateRandomToken(user_id);
    await storeToken(token, user_id);
    return token;
}

async function storeToken(token, user_id) {
    try {
        await createUserToken(user_id, token);
    } catch (err) {
        console.error('Error storing token', err);
        throw err;
    }
}

async function validateToken(token, user_id) {
    try {
        const valid = await checkTokenValid(token, user_id);
        return valid;
    }
    catch (err) {
        console.error('Error validating token', err);
        throw err;
    }
}

async function getStoredTokenOnLogin(user_id) {
    const token = getUserToken(user_id);
    const valid = await validateToken(token, user_id);
    if (valid) {
        return token;
    } else {
        const newtoken = generateToken(user_id);
        return newtoken;
    }
}

async function removeToken(user_id) {
    deleteUserToken(user_id);
}

module.exports = {generateToken, validateToken, getStoredTokenOnLogin, removeToken, storeToken};
