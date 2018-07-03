const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const config = require('../../credentials.json')
// import user model
passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: config.web.client_id,
        clientSecret: config.web.client_secret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, cb) => {
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile);
    })
);