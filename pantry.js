// -----------------------------
// Pantry List Logic
// -----------------------------

// Storage key
const PANTRY_KEY = "dojo_pantry";

// Helpers
function getPantry() {
  const stored = localStorage.getItem(PANTRY_KEY);
  return stored ? JSON.parse(stored) : [];
}

function savePantry(list) {
  localStorage.setItem(PANTRY_KEY, JSON.stringify(list));
}

// Render list
function renderPantry() {
  const container = document.getElementById("pantryList");
  container.innerHTML = "";

  const items = getPantry();

  if (items.length === 0) {
    container.innerHTML = `<p class="mt-4 text-white">Your pantry is empty.</p>`;
    return;
  }

  items.forEach(item => {
    const div = document.createElement("div");

    div.className =
      "p-3 my-2 bg-white rounded shadow cursor-pointer hand-font text-xl";

    div.textContent = `${item.name}  (${item.amount} ${item.unit})`;

    div.addEventListener("click", () => {
      window.location.href = `pantry-detail.html?id=${encodeURIComponent(item.id)}`;
    });

    container.appendChild(div);
  });

  const addBtn = document.createElement("button");
  addBtn.className =
    "mt-4 bg-white px-4 py-2 rounded shadow hand-font block mx-auto";
  addBtn.textContent = "➕ Add Ingredient";

  addBtn.addEventListener("click", () => {
    const name = prompt("Ingredient?");
    if (!name) return;

    const amount = prompt("Amount?") || "1";
    const unit = prompt("Unit (g, oz, ml etc)?") || "";

    const id = Date.now().toString();

    const list = getPantry();
    list.push({ id, name, amount, unit });
    savePantry(list);
    renderPantry();
  });

  container.appendChild(addBtn);
}

// Auto render
document.addEventListener("DOMContentLoaded", () => {
  renderPantry();
});

