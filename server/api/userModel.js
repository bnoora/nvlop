const pool = require('./dbConfig');

// Create a user in the database
async function createUser(user_obj) {
    const client = await pool.connect();
    const { username, password, email } = user_obj;
    const query = 'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) *';
    const values = [username, password, email];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error creating user', err);
        throw err;
    } finally {
        client.release();
    }
}

// Get a user from the database by username
async function getUserByUsername(username) {
    const client = await pool.connect();
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error getting user by username', err);
        throw err;
    } finally {
        client.release();
    }
}

// Get a user from the database by user_id
async function getUserById(user_id) {
    const client = await pool.connect();
    const query = 'SELECT * FROM users WHERE user_id = $1';
    const values = [user_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error getting user by id', err);
        throw err;
    } finally {
        client.release();
    }
}


module.exports = {createUser, getUserByUsername, getUserById};