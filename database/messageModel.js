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

// Get all messages from the database by channel
async function getMessagesByChannel(channel_id) {
    const client = await pool.connect();
    const query = 'SELECT * FROM messages WHERE channel_id = $1';
    const values = [channel_id];
    try {
        const res = await client.query(query, values);
        return res.rows;
    } catch (err) {
        console.error('Error getting messages', err);
        throw err;
    } finally {
        client.release();
    }
}

// Get private messages from the database by users
async function getPrivateMessages(user_id_1, user_id_2) {
    const client = await pool.connect();
    const query = 'SELECT * FROM messages WHERE (user_id1 = $1 AND user_id2 = $2) OR (user_id1 = $2 AND user_id2 = $1)';
    const values = [user_id_1, user_id_2];
    try {
        const res = await client.query(query, values);
        return res.rows;
    } catch (err) {
        console.error('Error getting messages', err);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = {createMessage, createPrivateMessage, getMessagesByChannel, getPrivateMessages};