const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

// Hardcoded test users
const users = [
  { email: "admin@novabank.com", password: "Admin123!", role: "admin" },
  { email: "user1@novabank.com", password: "User123!", role: "client" },
  { email: "user2@novabank.com", password: "User456!", role: "client" }
];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    errorMessage.textContent = "Invalid email or password.";
    return;
  }

  if (user.role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "dashboard.html";
  }
});
