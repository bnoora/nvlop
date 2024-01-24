const express = require('express');
const passport = require('passport');
const router = express.Router();

// Login POST request
router.post('/login',
    passport.authenticate('local', { 
        // TODO: Add success and failure 
    })
);

// Logout POST request
router.post('/logout', (req, res) => {
    // TODO: Logout the user
});

// Register POST request
router.post('/register', (req, res) => {
    // TODO: Register the user
});

module.exports = router;
