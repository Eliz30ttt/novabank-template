import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// Grab form and error message container
const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

// Admin email (change to your actual admin)
const ADMIN_EMAIL = "admin@novabank.com";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    errorMessage.textContent = "Please enter email and password.";
    return;
  }

  try {
    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userEmail = userCredential.user.email;

    // Redirect based on role
    if (userEmail === ADMIN_EMAIL) {
      window.location.href = "admin.html";
    } else {
      window.location.href = "dashboard.html";
    }
  } catch (error) {
    // Display Firebase error
    errorMessage.textContent = error.message;
  }
});
