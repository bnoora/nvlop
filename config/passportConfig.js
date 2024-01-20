const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const initializePassport = () => {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            // TODO: Find the user in the database and return it
        }
    ));

    passport.serializeUser((user, done) => {
        // TODO
    });

    passport.deserializeUser((id, done) => {
        // TODO
    });
};

module.exports = initializePassport;