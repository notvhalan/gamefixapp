const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/auth.middleware');

// Home route
router.get('/', (req, res) => {
    res.send('<h1>Welcome to GameFix</h1><a href="/auth/google">Login with Google</a>');
});

// Protected home route
router.get('/home', ensureAuthenticated, (req, res) => {
    res.send(`Welcome ${req.user.displayName}`);
});

// Logout route
router.get('/logout', (req, res) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;
