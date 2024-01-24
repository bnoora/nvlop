const pool = require('./dbConfig');

// Create a message in the database
async function createMessage(data) {
    const client = await pool.connect();
    const { channel_id, user_id, message } = data;
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


// Get 50 messages from the database by channel_id after a given message_id
async function getMessagesByChannel(data) {
    const client = await pool.connect();
    const { channel_id, message_id = 0 } = data;
    const query = 'SELECT * FROM messages WHERE channel_id = $1 AND message_id > $2 ORDER BY message_id ASC LIMIT 50';
    const values = [channel_id, message_id];
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

// Delete a message from the database
async function deleteMessage(message_id) {
    const client = await pool.connect();
    const query = 'DELETE FROM messages WHERE message_id = $1';
    const values = [message_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error deleting message', err);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = {createMessage, getMessagesByChannel, deleteMessage};