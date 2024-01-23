const pool = require('./dbConfig');

// Create a channel in the database
async function createChannel(data) {
    const client = await pool.connect();
    const {channel_name, description, server_id} = data;
    const query = 'INSERT INTO channels (channel_name, description, server_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [channel_name, description, server_id];
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

// Delete a channel from the database
async function deleteChannel(channel_id) {
    const client = await pool.connect();
    const query = 'DELETE FROM channels WHERE channel_id = $1';
    const values = [channel_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error deleting channel', err);
        throw err;
    } finally {
        client.release();
    }
}

// Get a channel from the database by channel_id
async function getChannelById(channel_id) {
    const client = await pool.connect();
    const query = 'SELECT * FROM channels WHERE channel_id = $1';
    const values = [channel_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error getting channel by id', err);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = {createChannel, deleteChannel, getChannelById};