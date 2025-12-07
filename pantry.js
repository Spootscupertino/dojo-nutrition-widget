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

// Add ingredient flow
function addPantryItem() {
  const nameEl = document.getElementById("pantryName");
  const amountEl = document.getElementById("pantryAmount");
  const unitEl = document.getElementById("pantryUnit");

  // modal inputs (take precedence if visible)
  const modalNameEl = document.getElementById("modalPantryName");
  const modalAmountEl = document.getElementById("modalPantryAmount");
  const modalUnitEl = document.getElementById("modalPantryUnit");

  const name = nameEl?.value.trim();
  const amount = amountEl?.value.trim() || "1";
  const unit = unitEl?.value.trim() || "g";

  const modalName = modalNameEl?.value.trim();
  const modalAmount = modalAmountEl?.value.trim();
  const modalUnit = modalUnitEl?.value.trim();

  // Prefer modal values if provided
  const useModal = modalName || modalAmount || modalUnit;

  const finalName = useModal ? modalName : name;
  const finalAmount = useModal ? (modalAmount || "1") : amount;
  const finalUnit = useModal ? (modalUnit || "g") : unit;

  if (!finalName) return;

  const id = Date.now().toString();

  const list = getPantry();
  list.push({ id, name: finalName, amount: finalAmount, unit: finalUnit });
  savePantry(list);
  renderPantry();

  if (nameEl) nameEl.value = "";
  if (amountEl) amountEl.value = "";
  if (unitEl) unitEl.value = "";

  if (modalNameEl) modalNameEl.value = "";
  if (modalAmountEl) modalAmountEl.value = "";
  if (modalUnitEl) modalUnitEl.value = "";

  hidePantryModal();
}

// Render list
function renderPantry() {
  const container = document.getElementById("pantryList");
  container.innerHTML = "";

  const items = getPantry();

  if (items.length === 0) {
    container.innerHTML = `<p class="mt-4 text-white">Your pantry is empty.</p>`;
  } else {
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
  }
}

// Auto render
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addPantryBtn");
  if (addBtn) addBtn.addEventListener("click", addPantryItem);

  const addFab = document.getElementById("addPantryFab");
  if (addFab) addFab.addEventListener("click", showPantryModal);

  const saveModal = document.getElementById("savePantryModal");
  const cancelModal = document.getElementById("cancelPantryModal");
  const closeModal = document.getElementById("closePantryModal");

  if (saveModal) saveModal.addEventListener("click", addPantryItem);
  if (cancelModal) cancelModal.addEventListener("click", hidePantryModal);
  if (closeModal) closeModal.addEventListener("click", hidePantryModal);

  renderPantry();
});

// Modal helpers
function showPantryModal() {
  const modal = document.getElementById("pantryModal");
  if (modal) modal.style.display = "flex";
}

function hidePantryModal() {
  const modal = document.getElementById("pantryModal");
  if (modal) modal.style.display = "none";
}

