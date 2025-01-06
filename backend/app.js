const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const authRoutes = require('./routes/auth.routes');
const homeRoutes = require('./routes/home.routes');
require('dotenv').config(); // Load environment variables
require('./config/passport.config'); // Load Passport strategies

const app = express();

// Middleware
app.use(express.json());
// CORS Configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? [process.env.PRODUCTION_FRONTEND_URL]
    : [process.env.FRONTEND_URL];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret', // Use strong secret from env
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Secure cookies in production
        httpOnly: true, // Prevent JavaScript access to cookies
        maxAge: 1000 * 60 * 60 * 24, // 1-day expiration
    },
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/', homeRoutes); // Main app routes

// Catch-all for 404 errors
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
