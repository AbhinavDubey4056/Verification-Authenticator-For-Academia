// server/app.js
const express = require('express');
const path = require('path');
const uploadRouter = require('./routes/upload');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Upload route
app.use('/upload', uploadRouter);

// Optional: Serve frontend files (index.html, result.html) from web folder
app.use(express.static(path.join(__dirname, '..', 'web')));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
