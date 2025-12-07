// -----------------------------
// Dish list logic
// -----------------------------

// LocalStorage key
const DISHES_KEY = "dojo_dishes";

function getDishes() {
  const stored = localStorage.getItem(DISHES_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveDishes(list) {
  localStorage.setItem(DISHES_KEY, JSON.stringify(list));
}

function renderList() {
  const container = document.getElementById("dishList");
  container.innerHTML = "";

  const dishes = getDishes();

  if (dishes.length === 0) {
    container.innerHTML = `<p class="mt-4 text-white">No dishes yet.</p>`;
    return;
  }

  dishes.forEach(dish => {
    const div = document.createElement("div");

    div.className =
      "p-3 my-2 bg-white rounded shadow cursor-pointer hand-font text-xl";

    div.textContent = dish.name || "Unnamed Dish";

    div.addEventListener("click", () => {
      window.location.href = `dish-detail.html?dish=${encodeURIComponent(dish.id)}`;
    });

    container.appendChild(div);
  });

  const addBtn = document.createElement("button");
  addBtn.className =
    "mt-4 bg-white px-4 py-2 rounded shadow hand-font block mx-auto";
  addBtn.textContent = "➕ Create Dish";

  addBtn.addEventListener("click", () => {
    const name = prompt("Name this new dish:");
    if (!name) return;

    const id = Date.now().toString();

    const list = getDishes();
    list.push({ id, name, ingredients: [] });
    saveDishes(list);
    renderList();
  });

  container.appendChild(addBtn);
}

// Auto render
document.addEventListener("DOMContentLoaded", () => {
  renderList();
});

