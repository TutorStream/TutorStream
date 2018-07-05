const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require('../../credentials.json');
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

// { "id": '104688600378769499827',
//   "displayName": 'Michael Cortez',
//   "name": {
//       "familyName": 'Cortez',
//       "givenName": 'Michael'
//     },
//   "photos":
//    [ { "value": 'https://lh5.googleusercontent.com/-NxaxtxB-jY0/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3FN7DyqIRVCzAhmdppB1c3_P8SaQ/mo/photo.jpg?sz=50' } ],
//   "gender": 'male',
//   provider: 'google',
//   _raw: '{\n "kind": "plus#person",\n "etag": "\\"RKS4-q7QGL10FxltAebpjqjKQR0/J8owKtrBrMFtclzEH5z_JyIoQoY\\"",\n "gender": "male",\n "objectType": "person",\n "id": "104688600378769499827",\n "displayName": "Michael Cortez",\n "name": {\n  "familyName": "Cortez",\n  "givenName": "Michael"\n },\n "url": "https://plus.google.com/104688600378769499827",\n "image": {\n  "url": "https://lh5.googleusercontent.com/-NxaxtxB-jY0/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3FN7DyqIRVCzAhmdppB1c3_P8SaQ/mo/photo.jpg?sz=50",\n  "isDefault": true\n },\n "isPlusUser": true,\n "language": "en",\n "circledByCount": 1,\n "verified": false,\n "cover": {\n  "layout": "banner",\n  "coverPhoto": {\n   "url": "https://lh3.googleusercontent.com/PaNulOitB2e2bqC9DRcCi03_izIITH3IxHoB2gJsQoH7u_s_9V2ZGLodWNDlynrAEHFak8wcGPw=s630-fcrop64=1,000017c2ffffffff",\n   "height": 585,\n   "width": 940\n  },\n  "coverInfo": {\n   "topImageOffset": 0,\n   "leftImageOffset": 0\n  }\n }\n}\n',
//   _json:
//    { kind: 'plus#person',
//      etag: '"RKS4-q7QGL10FxltAebpjqjKQR0/J8owKtrBrMFtclzEH5z_JyIoQoY"',
//      gender: 'male',
//      objectType: 'person',
//      id: '104688600378769499827',
//      displayName: 'Michael Cortez',
//      name: { familyName: 'Cortez', givenName: 'Michael' },
//      url: 'https://plus.google.com/104688600378769499827',
//      image:
//       { url: 'https://lh5.googleusercontent.com/-NxaxtxB-jY0/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3FN7DyqIRVCzAhmdppB1c3_P8SaQ/mo/photo.jpg?sz=50',
//         isDefault: true },
//      isPlusUser: true,
//      language: 'en',
//      circledBy
// Count: 1,
//      verified: false,
//      cover: { layout: 'banner', coverPhoto: [Object], coverInfo: [Object] } } }

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: config.web.client_id,
      clientSecret: config.web.client_secret,
      callbackURL: '/auth/google/redirect'
    },
    (accessToken, refreshToken, profile, cb) => {
      // passport callback function
      console.log('passport callback function fired:');
      console.log(profile);
    }
  )
);
