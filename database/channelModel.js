const pool = require('./dbConfig');

// Create a channel in the database
async function createChannel(channel_obj) {
    const client = await pool.connect();
    const { channel_name, description } = channel_obj;
    const query = 'INSERT INTO channels (channel_name, description) VALUES ($1, $2) RETURNING *';
    const values = [channel_name, description];
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

// Get channels that a user is a member of
async function getChannelsByUser(user_id) {
    const client = await pool.connect();
    const query = `SELECT * FROM channels 
                    JOIN channel_membership ON channels.channel_id = channel_membership.channel_id
                    WHERE channel_membership.user_id = $1`;
    const values = [user_id];
    try {
        const res = await client.query(query, values);
        return res.rows;
    } catch (err) {
        console.error('Error getting channels by user', err);
        throw err;
    } finally {
        client.release();
    }
}

// Add a user to a channel
async function addUserToChannel(channel_id, user_id) {
    const client = await pool.connect();
    const query = 'INSERT INTO channel_membership (channel_id, user_id) VALUES ($1, $2) RETURNING *';
    const values = [channel_id, user_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error adding user to channel', err);
        throw err;
    } finally {
        client.release();
    }
}

// Remove a user from a channel
async function removeUserFromChannel(channel_id, user_id) {
    const client = await pool.connect();
    const query = 'DELETE FROM channel_membership WHERE channel_id = $1 AND user_id = $2';
    const values = [channel_id, user_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error removing user from channel', err);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = {createChannel, deleteChannel, getChannelById, getChannelsByUser, addUserToChannel, removeUserFromChannel};