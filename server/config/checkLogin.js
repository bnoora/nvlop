const bcrypt = require('bcryptjs');
const {getUserByUsername} = require('../api/userModel');

const checkLogin = async (username, password) => {
    try {
        const user = await getUserByUsername(username);
        if (!user) {
            return {success: false, message: 'Incorrect username'};
        }

        const res = await bcrypt.compare(password, user.password);
        if (res) {
            const returnUser = {user_id: user.user_id, username: user.username, email: user.email, 
                avatar_url: user.avatar_url, bio: user.bio, created_at: user.created_at, 
                github_url: user.github_url, twitter_url: user.twitter_url, website_url: user.website_url};
            return {success: true, message: "Succses", user: returnUser};
        } else {
            return {success: false, message: "Incorrect Password"};
        }
    } catch (err) {
        return {success: false, message: "Error"};
    }
};

module.exports = checkLogin;
