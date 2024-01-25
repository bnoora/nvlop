const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const {getUserByUsername} = require('../api/userModel');

const initializePassport = () => {
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await getUserByUsername(username);
                if (!user) {
                    return done(null, false, { message: 'Incorrect username' });
                }
    
                bcrypt.compare(password, user.password, (err, res) => {
                    if (err) {
                        return done(err, false, { message: "Error" });
                    }
                    if (res) {
                        const returnUser = {user_id: user.user_id, username: user.username, email: user.email, 
                            avatar_url: user.avatar_url, bio: user.bio, created_at: user.created_at, 
                            github_url: user.github_url, twitter_url: user.twitter_url, website_url: user.website_url};
                        return done(null, returnUser, { message: "Succses"});
                    } else {
                        return done(null, false, { message: "IncorrectPassword" });
                    }
                });
            } catch (err) {
                return done(err);
            }
        }
    ));
};

module.exports = initializePassport;