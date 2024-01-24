var express = require('express');
var router = express.Router();
const {getFriends, createFriend, deleteFriend, createFriendRequest, 
    deleteFriendRequest, getSentFriendRequests, getReceivedFriendRequests} = require('../api/userFriendModel');

// Get all friends of a user
router.get('/get-friends', async (req, res) => {
    try {
        const friends = await getFriends(req.body);
        res.status(200).json(friends);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Create a friend relationship
router.post('/create-friend', async (req, res) => {
    try {
        const friend = await createFriend(req.body);
        res.status(200).json(friend);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Delete a friend relationship
router.delete('/delete-friend', async (req, res) => {
    try {
        const friend = await deleteFriend(req.body);
        res.status(200).json(friend);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Create a friend request
router.post('/create-friend-request', async (req, res) => {
    try {
        const friendRequest = await createFriendRequest(req.body);
        res.status(200).json(friendRequest);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Delete a friend request
router.delete('/delete-friend-request', async (req, res) => {
    try {
        const friendRequest = await deleteFriendRequest(req.body);
        res.status(200).json(friendRequest);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Get all friend requests sent by a user
router.get('/get-sent-friend-requests', async (req, res) => {
    try {
        const friendRequests = await getSentFriendRequests(req.body);
        res.status(200).json(friendRequests);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Get all friend requests received by a user
router.get('/get-received-friend-requests', async (req, res) => {
    try {
        const friendRequests = await getReceivedFriendRequests(req.body);
        res.status(200).json(friendRequests);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;
