// Import required modules
const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const path = require('path');

// Create an instance of an Express application
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files (e.g., CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Define a port
const PORT = process.env.PORT || 3000;

// Routes
app.get('/', (req, res) => {
    res.sendFile('main.html', { root: "."});
});

app.get('/other', (req, res) => {
    res.sendFile('other.html', { root: "."});
});
app.post('/api/data', (req, res) => {
    const data = req.body;
    res.json({ message: 'Data received!', receivedData: data });
});

// 404 Handler
app.use((req, res, next) => {
    res.status(404).send('Page not found!');
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
