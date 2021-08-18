// Ingresamos credenciales por consola o usamos nuestras credenciales por defecto del archivo .env
const FACEBOOK_CLIENT_ID = process.argv[3] || process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.argv[4] || process.env.FACEBOOK_CLIENT_SECRET;

const passport = require('passport'); //Definimos en passport nuestras estrategias de login y signup
const FacebookStrategy = require('passport-facebook').Strategy;

// configuramos passport para usar facebook
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: '/login/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    scope: ['email']
  }, function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    let userProfile = profile;
    return done(null, userProfile);
  }));
  
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  module.exports = passport;