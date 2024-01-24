var express = require('express');
var router = express.Router();
const {createUser, getUserByUsername, getUserById} = require('../api/userModel');

// Create a user
router.post('/create-user', async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Get a user by username
router.get('/get-user-by-username', async (req, res) => {
    try {
        const user = await getUserByUsername(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Get a user by user_id
router.get('/get-user-by-id', async (req, res) => {
    try {
        const user = await getUserById(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;