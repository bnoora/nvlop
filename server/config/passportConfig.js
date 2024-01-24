const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const {getUserByUsername} = require('../api/userModel');
const {generateToken, validateToken, getStoredTokenOnLogin, removeToken} = require('./tokenModules');

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
                        return done(err);
                    }
                    if (res) {
                        const token = getStoredTokenOnLogin(user.user_id);
                        return done(null, user, { message: "Logged in successfully", token: token });
                    } else {
                        return done(null, false, { message: "Incorrect password" });
                    }
                });
            } catch (err) {
                return done(err);
            }
        }
    ));

};

module.exports = initializePassport;