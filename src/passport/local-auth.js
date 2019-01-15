const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');

passport.use('local-login', new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  const user = await User.findOne({email});
  if(!user) {
    return done(null, false, {message: 'User no found.'});
  }
  const match = user.comparePassword(password);
  if(!match) {
    return done(null, false, {message: 'The Password no match.'});
  }
  done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});