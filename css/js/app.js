function loadDashboard() {
  // Get balance from localStorage
  let balance = parseFloat(localStorage.getItem("balance") || 0);
  document.getElementById("balance").innerText = "$" + balance.toFixed(2);

  // Get transactions from localStorage
  const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
  const container = document.getElementById("transactions");
  container.innerHTML = "";

  transactions.forEach(tx => {
    const div = document.createElement("div");
    div.innerText = tx;
    container.appendChild(div);
  });
}
