const pool = require('./dbConfig');


// Create a session token in the database for a user
async function createSessionToken(user_id, sessionToken) {
    const client = await pool.connect();
    const query = 'INSERT INTO session (user_id, sessionToken)  VALUES ($1) RETURNING *';
    const values = [user_id, sessionToken];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error creating session token', err);
        throw err;
    } finally {
        client.release();
    }
}

// Remove a session token from the database
async function removeSessionToken(sessionToken) {
    const client = await pool.connect();
    const query = 'DELETE FROM session WHERE sessionToken = $1 RETURNING *';
    const values = [sessionToken];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error removing session token', err);
        throw err;
    } finally {
        client.release();
    }
}

// Get a user session by the userid
async function getUserSessionById(user_id) {
    const client = await pool.connect();
    const query = 'SELECT * FROM session WHERE user_id = $1';
    const values = [user_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error getting user session', err);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = { createSessionToken, removeSessionToken, getUserSessionById };