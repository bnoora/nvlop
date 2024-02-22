const express = require('express');
const router = express.Router();
const checkLogin = require('../config/checkLogin');
const generateWebToken = require('../config/tokenGenerator');
const {createUser, getUserById} = require('../api/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {createSessionToken, deleteUserSession} = require('../api/sessionModel');


// Login POST request
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate request body
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await checkLogin(username, password);
        if (user.success) {
            const token = await generateWebToken(user.user.user_id);
            // Set the token as a cookie 
            res.cookie('token', token, {
                httpOnly: false, // TODO: Change to true in production
                secure: false, // TODO: Change to true in production
                sameSite: 'none', // TODO: Change to 'strict' in production
                maxAge: 24 * 60 * 60 * 10000 
            });

            return res.status(200).json({ message: 'Login successful', user: user.user });
        } else {
            // Use 401 for unauthorized access
            return res.status(401).json({ message: 'Login failed', error: user.message });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Login failed due to server error', error: err.message });
    }
});
    


router.post('/register', async (req, res) => {
    const user_obj = req.body;
    try {
        const password = user_obj.password;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = createUser({ ...user_obj, password: hashedPassword});
        const token = generateWebToken(user.user_id);
        const returnUser = { user_id: user.user_id, username: user.username, email: user.email,
            avatar_url: user.avatar_url, bio: user.bio, created_at: user.created_at,
            github_url: user.github_url, twitter_url: user.twitter_url, linkedin_url: user.linkedin_url};
        // Set the token as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, 
            sameSite: 'strict', 
            maxAge: 24 * 60 * 60 * 10000 
        });

        return res.status(200).json({ message: 'Registration successful', user: returnUser});
    } catch (err) {
        return res.status(500).json({ error: err.message, message: 'Registration failed or user already exists'});
    }
});


router.post('/check-login', async (req, res) => {
    let token = null;
    let userId = null;
    if (req.cookies.token) {
        token = req.cookies.token;
    } else {
        return res.status(401).json({ message: "No authentication token found" });
    }
    if (!token) {
        return res.status(200).json({ isLoggedIn: false });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            // Token is invalid or expired
            return res.status(401).json({ isLoggedIn: false, message: "Invalid or expired token" });
        }
        userId = decoded.userId;
    });
    if (!userId) {
        return res.status(200).json({ isLoggedIn: false });
    }

    const user = await getUserById(userId);
    if (!user) {
        return res.status(200).json({ isLoggedIn: false });
    }
    return res.status(200).json({ isLoggedIn: true, user: user });
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out' });
});


router.post('/socket-auth', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "No authentication token found" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        const sessionToken = crypto.randomBytes(64).toString('hex');
        const userId = decoded.userId;
        deleteUserSession(userId);
        createSessionToken(userId, sessionToken);
        return res.status(200).json({ message: "Socket authenticated", sessionToken: sessionToken });
    });
});

module.exports = router;
