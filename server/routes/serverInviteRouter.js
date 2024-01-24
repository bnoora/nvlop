var express = require('express');
var router = express.Router();
const {createServerInvite, deleteServerInvite, getServerInviteById, getServerInvitesByServerId} = require('../api/serverInviteModel');

// Create a server invite
router.post('/create-server-invite', async (req, res) => {
    try {
        const invite = await createServerInvite(req.body.server_id);
        res.status(200).json(invite);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Delete a server invite
router.delete('/delete-server-invite', async (req, res) => {
    try {
        const invite = await deleteServerInvite(req.body.invite_id);
        res.status(200).json(invite);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Get a server invite by id
router.get('/get-server-invite', async (req, res) => {
    try {
        const invite = await getServerInviteById(req.body.invite_id);
        res.status(200).json(invite);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Get server invites by server id
router.get('/get-server-invites', async (req, res) => {
    try {
        const invites = await getServerInvitesByServerId(req.body.server_id);
        res.status(200).json(invites);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;