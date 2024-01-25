const express = require('express');
const passport = require('passport');
const router = express.Router();
import { createUser } from '../api/userModel';

// Login POST request
router.post('/login', function(req, res, next) {
    console.log('login request');
    async function login() {
        passport.authenticate('local', function(err, user, info) {
            if (err !== null) { 
                return res.status(500).json({ error: err.message });
            }
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            req.logIn(user, function(err) {
                if (err) { 
                    return res.status(500).json({ error: err.message });
                }
                return res.status(200).json({ message: 'Login successful', user: user });
            });
        })(req, res, next);
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
            const returnUser = { user_id: user.user_id, username: user.username, email: user.email, 
            avatar_url: user.avatar_url, bio: user.bio, created_at: user.created_at, 
            github_url: user.github_url, twitter_url: user.twitter_url, linkedin_url: user.linkedin_url};
            return res.status(200).json({ message: 'Registration successful', user: returnUser });
        } catch (err) {
            return res.status(500).json({ error: err.message, 
                message: 'Registration failed or user already exists'});
        }
    }
    register();
});

module.exports = router;
