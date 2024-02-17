var express = require('express');
var router = express.Router();
const {getServersByUser, addUserToServer, removeUserFromServer, addUserModerator, 
    removeUserModerator, changeChannelOwner, getModStatus} = require('../api/serverModel');

// Get all servers a user is a member of
router.get('/get-user-servers', async (req, res) => {
    try {
        const user_id = req.query.user_id;
        const servers = await getServersByUser(user_id);
        res.status(200).json(servers);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Add a user to a server
router.post('/add-user-to-server', async (req, res) => {
    try {
        const server = await addUserToServer(req.body);
        res.status(200).json(server);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Remove a user from a server
router.delete('/remove-user-from-server', async (req, res) => {
    try {
        const server = await removeUserFromServer(req.body);
        res.status(200).json(server);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Add a user as a moderator of a channel
router.post('/add-user-moderator', async (req, res) => {
    try {
        const server = await addUserModerator(req.body);
        res.status(200).json(server);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Remove a user as a moderator of a channel
router.delete('/remove-user-moderator', async (req, res) => {
    try {
        const server = await removeUserModerator(req.body);
        res.status(200).json(server);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Change the owner of a channel
router.put('/change-channel-owner', async (req, res) => {
    try {
        const server = await changeChannelOwner(req.body);
        res.status(200).json(server);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Get mod status of a user in a channel
router.get('/get-mod-status', async (req, res) => {
    try {
        const isMod = await getModStatus(req.body);
        res.status(200).json(isMod);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;
