const express = require('express');
const router = express.Router();
const checkLogin = require('../config/checkLogin');
const generateWebToken = require('../config/tokenGenerator');
const {createUser} = require('../api/userModel');
const bcrypt = require('bcryptjs');
const {getUserByUsername} = require('../api/userModel');
const jwt = require('jsonwebtoken');


// Login POST request
router.post('/login', async (req, res) => {
    console.log('login request');
    try {
        const { username, password } = req.body;

        // Validate request body
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await checkLogin(username, password);
        if (user.success) {
            const token = await generateWebToken(user.user_id);
            return res.status(200).json({ message: 'Login successful', user: user.user, token });
        } else {
            // Use 401 for unauthorized access
            return res.status(401).json({ message: 'Login failed', error: user.message });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Login failed due to server error', error: err.message });
    }
});
    


router.post('/register', (req, res) => {
    console.log('Register Req')
    const user_obj = req.body;
    try {
        const password = user_obj.password;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = createUser({ ...user_obj, password: hashedPassword});
        const token = generateWebToken(user.user_id);
        const returnUser = { user_id: user.user_id, username: user.username, email: user.email,
            avatar_url: user.avatar_url, bio: user.bio, created_at: user.created_at,
            github_url: user.github_url, twitter_url: user.twitter_url, linkedin_url: user.linkedin_url};
        return res.status(200).json({ message: 'Registration successful', user: returnUser, token: token});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message, message: 'Registration failed or user already exists'});
    }
});


router.post('/validate-and-refresh-token', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Token is valid; issue a new one
        const newToken = jwt.sign({ userId: decoded.userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token: newToken });
    });
});

module.exports = router;
