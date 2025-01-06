require("dotenv").config();
const cors = require('cors')
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.use(session ({
    secret: "secret",
    resave: false,
    saveUninitialized: true,

}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'},
    (accessToken, refreshToken, profile, done) => {
    return done(null, profile)
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user))

app.get("/", (req, res) => {
    res.send("<a href='/auth/google'> login with google </a>")
})

app.get("/auth/google", passport.authenticate('google', {scope: ['profile', 'email']}))
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile');
    }
);


app.get('/profile', (req, res) => {
    res.send(`welcome ${req.user.displayName} `)
})

app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/')
})
app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  return res.json({ username: username, secret: "sha256..." });
});

app.listen(3000);