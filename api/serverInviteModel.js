const pool = require('./dbConfig');

// Create a server invite in the database for a server
async function createServerInvite(server_id) {
    const client = await pool.connect();
    const query = 'INSERT INTO server_invites (server_id) VALUES ($1) RETURNING *';
    const values = [server_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error creating server invite', err);
        throw err;
    } finally {
        client.release();
    }
}

// Delete a server invite from the database
async function deleteServerInvite(invite_id) {
    const client = await pool.connect();
    const query = 'DELETE FROM server_invites WHERE invite_id = $1';
    const values = [invite_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error deleting server invite', err);
        throw err;
    } finally {
        client.release();
    }
}

// Get a server invite from the database by invite_id
async function getServerInviteById(invite_id) {
    const client = await pool.connect();
    const query = 'SELECT * FROM server_invites WHERE invite_id = $1';
    const values = [invite_id];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error getting server invite by id', err);
        throw err;
    } finally {
        client.release();
    }
}

// Get a server invites from the database by server_id
async function getServerInvitesByServerId(server_id) {
    const client = await pool.connect();
    const query = 'SELECT * FROM server_invites WHERE server_id = $1';
    const values = [server_id];
    try {
        const res = await client.query(query, values);
        return res.rows;
    } catch (err) {
        console.error('Error getting server invites by server id', err);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = {createServerInvite, deleteServerInvite, getServerInviteById, getServerInvitesByServerId};

