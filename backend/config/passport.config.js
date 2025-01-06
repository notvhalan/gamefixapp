const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Google OAuth strategy setup
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production'
        ? 'https://gamefix.link/auth/google/callback' // Production URL
        : 'http://localhost:3000/auth/google/callback', // Development URL
}, (accessToken, refreshToken, profile, done) => {
    // Process the user's profile
    return done(null, profile);
}));

// Serialize and deserialize user for session handling
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
