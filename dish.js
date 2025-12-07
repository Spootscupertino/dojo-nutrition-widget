// -----------------------------
// Dish list logic
// -----------------------------

// LocalStorage key
const DISHES_KEY = "dojo_dishes";

function getDishes() {
  const stored = localStorage.getItem(DISHES_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (err) {
    console.warn("Corrupt dishes data, resetting", err);
    localStorage.removeItem(DISHES_KEY);
    return [];
  }
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
  } else {
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
  }
}

// Auto render
document.addEventListener("DOMContentLoaded", () => {
  const createBtn = document.getElementById("createDishBtn");
  const nameInput = document.getElementById("newDishName");
  const err = document.getElementById("dishError");

  function setError(msg) {
    if (!err) return;
    if (!msg) {
      err.classList.add("hidden");
      err.textContent = "";
    } else {
      err.classList.remove("hidden");
      err.textContent = msg;
    }
  }

  function createDish() {
    const name = nameInput?.value.trim();
    if (!name) {
      setError("Please enter a recipe name.");
      return;
    }
    const list = getDishes();
    if (list.some(d => (d.name || "").toLowerCase() === name.toLowerCase())) {
      setError("A dish with that name already exists.");
      return;
    }

    const id = Date.now().toString();
    list.push({ id, name, ingredients: [] });
    saveDishes(list);
    if (nameInput) nameInput.value = "";
    setError("");
    renderList();
  }

  if (createBtn) createBtn.addEventListener("click", createDish);
  if (nameInput) nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      createDish();
    }
  });

  renderList();
});

