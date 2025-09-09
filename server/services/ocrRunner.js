// server/services/ocrRunner.js
const { execFile } = require('child_process');
const path = require('path');

function runOCR(filePath) {
    return new Promise((resolve, reject) => {
        const pythonPath = path.join(__dirname, '..', 'python', 'ocr_extract.py');
        execFile('python3', [pythonPath, filePath], (err, stdout) => {
            if (err) reject(err);
            else resolve(stdout.trim());
        });
    });
}

module.exports = runOCR;
