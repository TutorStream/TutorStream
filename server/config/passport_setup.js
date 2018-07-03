const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const config = require('../../credentials.json')
// import user model



passport.use(
    new GoogleStrategy({
        // options for the google start
        callbackURL: '/auth/google/redirect',
        clientID: config.web.client_id,
        clientSecret: config.web.client_secret
    }, () => {
        // passport callback function 
        console.log('passport has been fired')

        // check if user already exists in our db 
            // if so
        // do nothing, otherwise
        // insert into to our database
    })
)
