import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  setDoc
} from "./firebase.js";

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");

registerBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if(!email||!password) return alert("Enter email & password");
  try{
    const userCred = await createUserWithEmailAndPassword(auth,email,password);
    await setDoc(doc(db,"users",userCred.user.uid),{
      email: email,
      balance: 5000,
      transactions: [],
      createdAt: new Date()
    });
    window.location.href="dashboard.html";
  }catch(err){
    errorMsg.innerText = err.message;
  }
});

loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if(!email||!password) return alert("Enter email & password");
  try{
    await signInWithEmailAndPassword(auth,email,password);
    window.location.href="dashboard.html";
  }catch(err){
    errorMsg.innerText = err.message;
  }
});
