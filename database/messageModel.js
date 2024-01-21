const pool = require('./dbConfig');

// Create a message in the database
async function createMessage(message_obj) {
    const client = await pool.connect();
    console.log(client + "client")
    const { channel_id, user_id, message } = message_obj;
    const query = 'INSERT INTO messages (channel_id, user_id, message) VALUES ($1, $2, $3) RETURNING *';
    const values = [channel_id, user_id, message];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error creating message', err);
        throw err;
    } finally {
        client.release();
    }
}

// Create a private message in the database
async function createPrivateMessage(message_obj) {
    const client = await pool.connect();
    const { user_id1, user_id2, message } = message_obj;
    const query = 'INSERT INTO private_messages (user_id1, user_id2, message) VALUES ($1, $2, $3) RETURNING *';
    const values = [user_id1, user_id2, message];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error creating message', err);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = {createMessage, createPrivateMessage};