const pool = require('./dbConfig');

// Get all friends from the database by user_id
async function getFriends(user_id) {
    const client = await pool.connect();
    const query = 'SELECT * FROM friends WHERE user_id1 = $1';
    const values = [user_id];
    try {
        const res = await client.query(query, values);
        return res.rows;
    } catch (err) {
        console.error('Error getting friends', err);
        throw err;
    } finally {
        client.release();
    }
}

// Create a friend in the database
async function createFriend(data) {
    const client = await pool.connect();
    const { user_id1, user_id2 } = data;
    const query = 'INSERT INTO friends (user_id1, user_id2) VALUES ($1, $2) RETURNING *';
    const values = [user_id1, user_id2];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error creating friend', err);
        throw err;
    } finally {
        client.release();
    }
}

// Delete a friend in the database
async function deleteFriend(data) {
    const client = await pool.connect();
    const { user_id1, user_id2 } = data;
    const query = `DELETE FROM friends WHERE (user_id1 = $1 AND user_id2 = $2) 
                OR (user_id1 = $2 AND user_id2 = $1)`;
    const values = [user_id1, user_id2];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error deleting friend', err);
        throw err;
    } finally {
        client.release();
    }
}

async function createFriendRequest(data) {
    const client = await pool.connect();
    const { user_id1, user_id2 } = data;
    const query = 'INSERT INTO friend_requests (user_id1, user_id2) VALUES ($1, $2) RETURNING *';
    const values = [user_id1, user_id2];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error creating friend request', err);
        throw err;
    } finally {
        client.release();
    }
}

async function deleteFriendRequest(data) {
    const client = await pool.connect();
    const { user_id1, user_id2 } = data;
    const query = `DELETE FROM friend_requests WHERE (user_id1 = $1 AND user_id2 = $2) 
                OR (user_id1 = $2 AND user_id2 = $1)`;
    const values = [user_id1, user_id2];
    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error deleting friend request', err);
        throw err;
    } finally {
        client.release();
    }
}

async function getSentFriendRequests(user_id) {
    const client = await pool.connect();
    const query = 'SELECT * FROM friend_requests WHERE user_id1 = $1';
    const values = [user_id];
    try {
        const res = await client.query(query, values);
        return res.rows;
    } catch (err) {
        console.error('Error getting sent friend requests', err);
        throw err;
    } finally {
        client.release();
    }
}

async function getReceivedFriendRequests(user_id) {
    const client = await pool.connect();
    const query = 'SELECT * FROM friend_requests WHERE user_id2 = $1';
    const values = [user_id];
    try {
        const res = await client.query(query, values);
        return res.rows;
    } catch (err) {
        console.error('Error getting received friend requests', err);
        throw err;
    } finally {
        client.release();
    }
}

module.exports = {getFriends, createFriend, deleteFriend, createFriendRequest, deleteFriendRequest, getSentFriendRequests, getReceivedFriendRequests};