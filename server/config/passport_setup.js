const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const config = require('../../credentials.json')

passport.use(
    new GoogleStrategy({
        // options for the google start
        callbackURL: '/auth/google/redirect',
        clientID: config.web.client_id,
        clientSecret: config.web.client_secret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function 
        console.log('passport has been fired', done)
    })
)
