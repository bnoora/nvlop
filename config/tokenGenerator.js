function generateToken(user) {
    storeToken(token, user.id);
}

function storeToken(token, userId) {
    // TODO: Store the token in memory or in a database
}

function validateToken(token, userId) {
    const storedToken = getStoredToken(userId);

    if (storedToken && storedToken === token) {
        removeToken(userId);
        return true;
    }
    return false;
}

function getStoredToken(userId) {
    // TODO: Get the token from memory or from a database
}

function removeToken(userId) {
    // TODO: Remove the token from memory or from a database
}


