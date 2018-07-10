// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20');
// const config = require('../../credentials.json');
// import user model
// http://www.passportjs.org/docs/google/

// // serialize a user when they are logged in
// passport.serializeUser((user, done) => {
//     done(null, user.id)
// })

// passport.deserializeUser((id, done) => {
//     // find user by id
//     done(null, user)
// })

// deserialize user when they log out

// passport.use(
//     new GoogleStrategy({
//         // options for google strategy
//         clientid: config.web.client_id,
//         clientSecret: config.web.client_secret,
//         callbackURL: '/auth/google/redirect'
//     }, (accessToken, refreshToken, profile, cb) => {
//         // passport callback function
//         console.log('passport callback function fired:');
//         console.log(profile);
//     })
// );
