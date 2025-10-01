// server/app.js
const express = require('express');
const path = require('path');
global.appRoot = path.resolve(__dirname, '..');
const uploadRouter = require('./routes/upload');

// This is the project root directory


const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Upload route
app.use('/upload', uploadRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(global.appRoot, 'web', 'login.html'));
});

// Serve frontend files (index.html, etc.) from the web folder
app.use(express.static(path.join(global.appRoot, 'web')));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});