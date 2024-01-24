var express = require('express');
var router = express.Router();
const {createChannel, deleteChannel, getChannelById} = require('../api/channelModel');

// Create a channel
router.post('/create-channel', async (req, res) => {
    try {
        const channel = await createChannel(req.body);
        res.status(200).json(channel);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Delete a channel
router.delete('/delete-channel', async (req, res) => {
    try {
        const channel = await deleteChannel(req.body.channel_id);
        res.status(200).json(channel);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Get a channel by id
router.get('/get-channel', async (req, res) => {
    try {
        const channel = await getChannelById(req.body.channel_id);
        res.status(200).json(channel);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;