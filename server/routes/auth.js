const express = require('express');
const router = express.Router();
const checkLogin = require('../config/checkLogin');
const generateWebToken = require('../config/tokenGenerator');
const {createUser} = require('../api/userModel');


// Login POST request
router.post('/login', function(req, res) {
    console.log('login request');
    async function login() {
        try {
            const {username, password} = req.body;
            const user = await checkLogin(username, password);
            if (user.success) {
                const token = await generateWebToken(user.user_id);
                return res.status(200).json({ message: 'Login successful', user: user.user, token: token});
            } else {
                return res.status(500).json({ error: user.message, message: 'Login failed'});
            }
        } catch (err) {
            return res.status(500).json({ error: err.message, message: 'Login failed'});
        }
    }
    login();
});
    
// Register POST request
router.post('/register', (req, res) => {
    console.log('register request');
    const user_obj = req.body;
    async function register() {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await createUser({ ...user_obj, password: hashedPassword});
            const token = await generateWebToken(user.user_id);
            const returnUser = { user_id: user.user_id, username: user.username, email: user.email, 
            avatar_url: user.avatar_url, bio: user.bio, created_at: user.created_at, 
            github_url: user.github_url, twitter_url: user.twitter_url, linkedin_url: user.linkedin_url};
            return res.status(200).json({ message: 'Registration successful', user: returnUser, token: token});
        } catch (err) {
            return res.status(500).json({ error: err.message, 
                message: 'Registration failed or user already exists'});
        }
    }
    register();
});

// Login with cookie present
router.get('/login', (req, res) => {
    console.log('login request');
    const user = req.user;
    if (user) {
        return res.status(200).json({ message: 'Login successful', user: user});
    } else {
        return res.status(500).json({ error: 'No user logged in', message: 'Login failed'});
    }
});


module.exports = router;
