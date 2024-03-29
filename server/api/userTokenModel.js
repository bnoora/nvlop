const pool = require('./dbConfig');

// Create new user token in the database
async function createUserToken(user_id, token) {
    const client = await pool.connect();
    const query = 'INSERT INTO user_token (user_id, token) VALUES ($1, $2) RETURNING *';
    const values = [user_id, token];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error creating user token', err);
        throw err;
    } finally {
        client.release();
    }
}

// Get user token from the database by user_id
async function getUserToken(user_id) {
    const client = await pool.connect();
    const query = 'SELECT * FROM user_token WHERE user_id = $1';
    const values = [user_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error getting user token', err);
        throw err;
    } finally {
        client.release();
    }
}

// Delete user token from the database by token
async function deleteUserToken(token) {
    const client = await pool.connect();
    const query = 'DELETE FROM user_token WHERE token = $1';
    const values = [token];
    try {
        await client.query(query, values);
    } catch (err) {
        console.error('Error deleting user token', err);
        throw err;
    } finally {
        client.release();
    }
}

// Get user from the database by token
async function getUserByToken(token) {
    const client = await pool.connect();
    const query = 'SELECT * FROM users INNER JOIN user_token ON users.user_id = user_token.user_id WHERE token = $1';
    const values = [token];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error getting user by token', err);
        throw err;
    } finally {
        client.release();
    }
}

// Check token and expire time in the database, return true if token is valid
async function checkTokenValid(token, userId) {
    const client = await pool.connect();
    const query = 'SELECT * FROM user_token WHERE token = $1 AND user_id = $2';
    const values = [token, userId];
    const now = new Date();
    try {
        const res = await client.query(query, values);
        if (res.rows[0]) {
            const expire = new Date(res.rows[0].expires_at);
            if (expire > now) {
                return true;
            } else {
                return res.rows[0];
            }
        } else {
            return false;
        }
    } catch (err) {
        console.error('Error checking token', err);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = {createUserToken, getUserToken, deleteUserToken, getUserByToken, checkTokenValid};