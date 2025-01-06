const express = require('express');
const passport = require('passport');

const router = express.Router();

// Start Google OAuth flow
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/home'); // Redirect to the home page after successful login
});

// Check if the user is authenticated and return session data
router.get('/session', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ user: req.user }); // Return user data if authenticated
    }
    res.status(401).json({ error: 'Not authenticated' }); // Return 401 if not authenticated
});

// Logout the user
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/'); // Redirect to home page after logout
    });
});

module.exports = router;
