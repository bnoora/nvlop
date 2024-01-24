var express = require('express');
var router = express.Router();
const {createMessage, getMessagesByChannel, deleteMessage} = require('../api/messageModel');

router.post('/create-message', async (req, res) => {
    try {
        const message = await createMessage(req.body);
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

router.get('/get-messages', async (req, res) => {
    try {
        const messages = await getMessagesByChannel(req.body);
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

router.delete('/delete-message', async (req, res) => {
    try {
        const message = await deleteMessage(req.body.message_id);
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;