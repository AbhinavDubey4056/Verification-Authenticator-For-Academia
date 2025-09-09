const form = document.getElementById('uploadForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('certificate');
    const formData = new FormData();
    formData.append('certificate', fileInput.files[0]);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });

    const text = await response.text();
    resultDiv.innerText = `Result: ${text}`;
});


