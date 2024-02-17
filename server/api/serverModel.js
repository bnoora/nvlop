const pool = require('./dbConfig');

// Get servers that a user is a member of
async function getServersByUser(user_id) {
    const client = await pool.connect();
    const query = `SELECT * FROM servers 
                    JOIN server_membership ON servers.server_id = server_membership.server_id
                    WHERE server_membership.user_id = $1`;
    const values = [user_id];
    try {
        const res = await client.query(query, values);
        return res.rows;
    } catch (err) {
        console.error('Error getting servers by user', err);
        throw err;
    } finally {
        client.release();
    }
}

// Add a user to a channel
async function addUserToServer(data) {
    const client = await pool.connect();
    const {server_id, user_id} = data;
    const query = 'INSERT INTO server_membership (server_id, user_id) VALUES ($1, $2) RETURNING *';
    const values = [server_id, user_id];
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
async function removeUserFromServer(data) {
    const client = await pool.connect();
    const {server_id, user_id} = data;
    const query = 'DELETE FROM server_membership WHERE server_id = $1 AND user_id = $2 RETURNING *';
    const values = [server_id, user_id];
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

// Make a user a moderator of a channel
async function addUserModerator(data) {
    const client = await pool.connect();
    const {server_id, user_id} = data;
    const query = 'UPDATE server_membership SET is_mod = true WHERE server_id = $1 AND user_id = $2 RETURNING *';
    const values = [server_id, user_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error making user a moderator', err);
        throw err;
    } finally {
        client.release();
    }
}

// Remove a user as a moderator of a channel
async function removeUserModerator(data) {
    const client = await pool.connect();
    const {server_id, user_id} = data;
    const query = 'UPDATE server_membership SET is_mod = false WHERE server_id = $1 AND user_id = $2 RETURNING *';
    const values = [server_id, user_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error removing user as moderator', err);
        throw err;
    } finally {
        client.release();
    }
}

// Change the owner of a channel
async function changeChannelOwner(data) {
    const client = await pool.connect();
    const {server_id, user_id} = data;
    const query = 'UPDATE servers SET owner_id = $1 WHERE server_id = $2 RETURNING *';
    const values = [user_id, server_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error changing channel owner', err);
        throw err;
    } finally {
        client.release();
    }
}

// Get mod status of a user in a channel
async function getModStatus(data) {
    const client = await pool.connect();
    const {server_id, user_id} = data;
    const query = 'SELECT is_mod FROM server_membership WHERE server_id = $1 AND user_id = $2';
    const values = [server_id, user_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0].is_mod;
    } catch (err) {
        console.error('Error getting mod status', err);
        throw err;
    } finally {
        client.release();
    }
}

async function addNewServer(data) {
    const client = await pool.connect();
    const {server_name, user_id} = data;
    const query = 'INSERT INTO servers (server_name, owner_id) VALUES ($1, $2) RETURNING *';
    const values = [server_name, user_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error adding new server', err);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = {getServersByUser, addUserToServer, removeUserFromServer, addUserModerator, 
    removeUserModerator, changeChannelOwner, getModStatus, addNewServer};