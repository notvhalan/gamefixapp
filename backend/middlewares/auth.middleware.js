const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    if (req.accepts('html')) {
        return res.redirect('/'); // For browser requests, redirect to home
    }
    res.status(401).json({ error: 'Unauthorized access' }); // For API requests
};

module.exports = ensureAuthenticated;
