var express = require('express');
var router = express.Router();
const {createPrivateChannel, createPrivateMessage, getPrivateMessages, deletePrivateMessage, getPrivateChannelById} = require('../api/privateChatModel');

// Create a private channel
router.post('/create-private-channel', async (req, res) => {
    try {
        const channel = await createPrivateChannel(req.body);
        res.status(200).json(channel);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Create a private message
router.post('/create-private-message', async (req, res) => {
    try {
        const message = await createPrivateMessage(req.body);
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Get private messages by channel
router.get('/get-private-messages', async (req, res) => {
    try {
        const messages = await getPrivateMessages(req.body);
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Delete a private message
router.delete('/delete-private-message', async (req, res) => {
    try {
        const message = await deletePrivateMessage(req.body.message_id);
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Get a private channel by id
router.get('/get-private-channel', async (req, res) => {
    try {
        const channel = await getPrivateChannelById(req.body.channel_id);
        res.status(200).json(channel);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;
