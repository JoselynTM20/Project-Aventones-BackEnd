const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Reemplaza con el modelo de usuario adecuado

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Verifica si el usuario ya existe en tu base de datos
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        // Si no existe, crea un nuevo usuario en la base de datos
        user = new User({
          googleId: profile.id,
          firstName: profile.name.givenName,
          Lastname: profile.name.familyName,
          email: profile.emails[0].value
          
        });
        await user.save();
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
