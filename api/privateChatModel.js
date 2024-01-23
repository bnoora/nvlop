const pool = require('./dbConfig');

// Create a private channel in the database
async function createPrivateChannel(data) {
    const client = await pool.connect();
    const { user_id_1, user_id_2 } = data;
    const query = 'INSERT INTO private_channels (user_id1, user_id2) VALUES ($1, $2) RETURNING *';
    const values = [user_id_1, user_id_2];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error creating channel', err);
        throw err;
    } finally {
        client.release();
    }
}

// Create a private message in the database
async function createPrivateMessage(message_obj) {
    const client = await pool.connect();
    const { user_id, channel_id, message } = message_obj;
    const query = 'INSERT INTO private_messages (user_id, channel_id, message) VALUES ($1, $2, $3) RETURNING *';
    const values = [user_id, channel_id, message];
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

// Get 50 private messages from the database by channel_id and either user_id
async function getPrivateMessages(data) {
    const client = await pool.connect();
    const { user_id_1, user_id_2, channel_id } = data;
    const query = `SELECT * FROM private_messages 
                    WHERE (user_id = $1 AND channel_id = $3) 
                    OR (user_id = $2 AND channel_id = $3) 
                    ORDER BY message_id ASC LIMIT 50`
    const values = [user_id_1, user_id_2, channel_id];
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

// Delete a private message from the database
async function deletePrivateMessage(message_id) {
    const client = await pool.connect();
    const query = 'DELETE FROM private_messages WHERE message_id = $1';
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

// get private channel by id
async function getPrivateChannelById(channel_id) {
    const client = await pool.connect();
    const query = 'SELECT * FROM private_channels WHERE channel_id = $1';
    const values = [channel_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error getting channel', err);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = {createPrivateChannel, createPrivateMessage, getPrivateMessages, deletePrivateMessage, getPrivateChannelById};