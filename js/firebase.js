import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdmF4zDEB-QPu7ABzsjSX-39zj4CIHhpc",
  authDomain: "novabank-prod.firebaseapp.com",
  projectId: "novabank-prod",
  storageBucket: "novabank-prod.firebasestorage.app",
  messagingSenderId: "419423769358",
  appId: "1:419423769358:web:67c2f7ab8f5f60222dbd5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
