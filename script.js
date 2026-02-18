// ================= INIT =================
function initApp() {
  if (!localStorage.getItem("balance") || isNaN(localStorage.getItem("balance"))) {
    localStorage.setItem("balance", "4820.55");
  }

  if (!localStorage.getItem("transactions")) {
    localStorage.setItem(
      "transactions",
      JSON.stringify([
        "Received $120.00 from Alice",
        "Sent $50.00 to Bob"
      ])
    );
  }

  updateLastLogin();
  updateNotifications();
  loadDashboard();
  setupInputValidation();
}

// ================= LAST LOGIN =================
function updateLastLogin() {
  const now = new Date();
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };

  const el = document.getElementById("lastLogin");
  if (el) {
    el.innerText = "Last login: " + now.toLocaleString("en-US", options);
  }
}

// ================= DASHBOARD =================
function loadDashboard() {
  const balance = parseFloat(localStorage.getItem("balance")) || 0;
  const balanceEl = document.getElementById("balance");

  if (balanceEl) {
    balanceEl.innerText = "$" + balance.toFixed(2);
  }

  const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
  const container = document.getElementById("transactions");
  if (!container) return;

  container.innerHTML = "";

  transactions.forEach(tx => {
    const div = document.createElement("div");
    div.classList.add("transaction-card");

    const lower = tx.toLowerCase();

    if (lower.includes("sent")) {
      div.innerHTML = "🔴 " + tx;
      div.style.color = "#ff4d4d";
    } else if (lower.includes("received")) {
      div.innerHTML = "🟢 " + tx;
      div.style.color = "#00b894";
    } else {
      div.innerHTML = "🟡 " + tx;
      div.style.color = "#ffa500";
    }

    container.appendChild(div);
  });
}

// ================= SECTION SWITCHING =================
function showSection(id) {
  const sections = [
    "sendSection",
    "receiveSection",
    "addSection",
    "requestSection"
  ];

  sections.forEach(section => {
    const el = document.getElementById(section);
    if (el) {
      el.style.display = section === id ? "block" : "none";
    }
  });

  const dash = document.getElementById("dashboardSection");
  const header = document.getElementById("headerSection");

  if (dash) dash.style.display = id ? "none" : "block";
  if (header) header.style.display = id ? "none" : "flex";

  loadDashboard();
}

function showSend() { showSection("sendSection"); }
function showReceive() { showSection("receiveSection"); }
function showAdd() { showSection("addSection"); }
function showRequest() { showSection("requestSection"); }

function showDashboard() {
  showSection("");
  loadDashboard();
}

function goProfile() {
  window.location.href = "profile.html";
}

// ================= INPUT VALIDATION =================
function setupInputValidation() {
  const inputs = [
    "amount",
    "recipient",
    "receiveAmount",
    "sender",
    "addAmount",
    "requestAmount",
    "requestName"
  ];

  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("input", () => {
      const value = el.value.trim();

      if (id.includes("Amount") || id === "amount") {
        const num = parseFloat(value);
        if (!isNaN(num) && num > 0) {
          el.classList.add("valid");
          el.classList.remove("invalid");
        } else {
          el.classList.add("invalid");
          el.classList.remove("valid");
        }
      }

      if (
        id === "recipient" ||
        id === "sender" ||
        id === "requestName"
      ) {
        if (value.length > 0) {
          el.classList.add("valid");
          el.classList.remove("invalid");
        } else {
          el.classList.add("invalid");
          el.classList.remove("valid");
        }
      }
    });
  });
}

// ================= TOAST =================
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerText = message;
  toast.className = "toast show";

  setTimeout(() => {
    toast.className = "toast";
  }, 2500);
}

// ================= ACTIONS =================
document.addEventListener("DOMContentLoaded", function () {

  initApp();

  const sendBtn = document.getElementById("sendBtn");
  if (sendBtn) {
    sendBtn.addEventListener("click", function () {
      const amount = parseFloat(document.getElementById("amount").value) || 0;
      const recipient = document.getElementById("recipient").value || "Unknown";
      let balance = parseFloat(localStorage.getItem("balance")) || 0;

      if (amount <= 0) {
        alert("Enter a valid amount");
        return;
      }

      if (amount > balance) {
        alert("Insufficient funds");
        return;
      }

      balance -= amount;
      localStorage.setItem("balance", balance.toFixed(2));

      const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
      transactions.unshift(`Sent $${amount.toFixed(2)} to ${recipient}`);
      localStorage.setItem("transactions", JSON.stringify(transactions));

      showToast(`$${amount.toFixed(2)} sent to ${recipient}`);
      showDashboard();
    });
  }

});
