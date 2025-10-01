const express = require('express');
const router = express.Router();
const multer = require('multer');
const { execFile } = require('child_process');
const path = require('path');
const db = require('../services/db'); 

// File upload setup
const upload = multer({ dest: path.join(global.appRoot, 'uploads') });

router.post('/', upload.single('certificate'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded');

    // The uploaded file's absolute path
    const filePath = req.file.path;

    // The Python OCR script's absolute path, using our new stable root
    const pythonScript = path.join(global.appRoot, 'python', 'ocr_extract.py');

    // Run Python OCR
    execFile('python3', [pythonScript, filePath], (err, stdout) => {
        if (err) {
            console.error('OCR Error:', err);
            return res.status(500).send('OCR error');
        }

        // Clean OCR text
        let extractedText = stdout.toString().trim();
        console.log("Extracted Text:", extractedText);
        

        let cleanText = extractedText
            .replace(/\s+/g, " ")                // multiple spaces → single
            .replace(/[^\w\s.()%]/g, "")         // remove unwanted chars
            .toUpperCase();

        // Roll number fix: O → 0
        cleanText = cleanText.replace(/O/g, "0");

        // Extract certificate ID
        const certIdMatch = cleanText.match(/ITJHR\d{3}/);
        if (!certIdMatch) {
            return res.send("Certificate INVALID ❌ (ID not found)");
        }

        const certificate_id = certIdMatch[0];
        console.log("Detected Certificate ID:", certificate_id);

        // Query DB for that certificate ID
        db.query("SELECT * FROM Students WHERE certificate_id = ?", [certificate_id], (err, results) => {
            if (err) {
                console.error("DB Error:", err);
                return res.status(500).send("DB error");
            }

            if (results.length === 0) {
                return res.send("Certificate INVALID ❌ (not in DB)");
            }

            const record = results[0];

            // Clean DB fields
            const dbName = record.name.toUpperCase().trim();
            const dbRoll = record.roll_number.toUpperCase().trim().replace(/O/g, "0");
            const dbBranch = record.branch.toUpperCase().trim();
            const dbCgpa = record.cgpa.toString().trim();

            // Check all fields exist in OCR text
            let isValid =
                cleanText.includes(dbName) &&
                cleanText.includes(dbRoll) &&
                cleanText.includes(dbBranch) &&
                cleanText.includes(dbCgpa);

            if (isValid) {
                res.send("Certificate VALID ✅");
            } else {
                res.send("Certificate INVALID ❌ (details mismatch)");
            }
        });
    });
});

module.exports = router;
