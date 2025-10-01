 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCIHBvjaftGl81SHQgFPc4HVirQSABYcKw",
    authDomain: "ocr-sih.firebaseapp.com",
    projectId: "ocr-sih",
    storageBucket: "ocr-sih.firebasestorage.app",
    messagingSenderId: "801633620183",
    appId: "1:801633620183:web:613116a341e3d425fe2092"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const submitButton = document.getElementById('submit');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const errorDisplay = document.getElementById('error-message');


submitButton.addEventListener("click", function(event) {
    event.preventDefault(); // Stop the form from submitting normally
    errorDisplay.textContent = ''; // Clear previous error

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        errorDisplay.textContent = "Please enter both email and password.";
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully
            console.log("User signed in:", userCredential.user.uid);
            // SUCCESS: Redirect the user to the main page
            window.location.href = "index.html"; 
        })
        .catch((error) => {
            // Login failed
            const errorMessage = error.message;
            console.error("Login failed:", errorMessage);
            
            // Provide user-friendly feedback
            let message = "Login failed. Please check your credentials.";
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                message = "Invalid Email or Password. Please try again.";
            } else if (error.code === 'auth/invalid-email') {
                message = "The email address is not valid.";
            }

            errorDisplay.textContent = message;
        });
});