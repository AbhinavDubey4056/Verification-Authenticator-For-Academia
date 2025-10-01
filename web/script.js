// Get HTML elements
const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('certificate');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const file = fileInput.files[0];
    if (!file) {
        resultDiv.innerText = "Please select a file.";
        return;
    }

    // Show a loading message to the user
    resultDiv.innerText = "Processing certificate on server... This may take a moment.";
    
    try {
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('certificate', file);

        // Send the file to your backend /upload route
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const responses = await response.text();
        resultDiv.innerText = `Result:\n\n${responses}`;

    } catch (error) {
        console.error("Upload Error:", error);
        resultDiv.innerText = "Error: Unable to process the file. Please try again.";
    }
});