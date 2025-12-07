// -----------------------------
// Dojo Global Logic
// -----------------------------

// Offline dataset loader
let OFFLINE_CACHE = (typeof OFFLINE_NUTRITION !== "undefined" && Array.isArray(OFFLINE_NUTRITION))
  ? OFFLINE_NUTRITION
  : null;

async function ensureOfflineData() {
  if (OFFLINE_CACHE) return OFFLINE_CACHE;
  if (typeof OFFLINE_NUTRITION !== "undefined" && Array.isArray(OFFLINE_NUTRITION)) {
    OFFLINE_CACHE = OFFLINE_NUTRITION;
    return OFFLINE_CACHE;
  }
  try {
    const res = await fetch("data/offline_nutrition.json");
    if (res.ok) {
      OFFLINE_CACHE = await res.json();
      return OFFLINE_CACHE;
    }
  } catch {}
  OFFLINE_CACHE = [];
  return OFFLINE_CACHE;
}

function findOfflineFood(query, data) {
  if (!query || !Array.isArray(data)) return null;
  const q = query.toLowerCase();
  const exact = data.find(f => f.name.toLowerCase() === q);
  if (exact) return exact;
  return data.find(f => f.name.toLowerCase().includes(q)) || null;
}

// Fetch nutrition data (offline)
async function fetchNutrition(query) {
  const data = await ensureOfflineData();
  const match = findOfflineFood(query, data);
  if (!match) {
    return { error: 'No matching food found offline' };
  }
  return match;
}

// Lightweight search using offline dataset
async function searchFoods(query, limit = 6) {
  const data = await ensureOfflineData();
  if (!query || !Array.isArray(data)) return [];
  const q = query.toLowerCase();
  return data
    .filter(f => f.name.toLowerCase().includes(q))
    .slice(0, limit);
}

// -----------------------------
// UNIT CONVERSION
// -----------------------------

// g = exact, oz/lb approximate, cups/tbsp vary by ingredient.
// We default approximate but allow overrides later.
function toGrams(amount, unit) {
  const n = parseFloat(amount);

  switch (unit) {
    case "g": return n;
    case "oz": return n * 28.35;
    case "lb": return n * 453.59;
    case "cup": return n * 240;   // generic density
    case "tbsp": return n * 15;
    case "tsp": return n * 5;
    default: return n; // assume already grams
  }
}

// -----------------------------
// MACRO SCALING
// nutrition API returns values per 100g
// we scale using grams
// -----------------------------
function scaleNutrition(nutrition, grams) {
  if (!nutrition) return null;

  const factor = grams / 100;

  return {
    calories: (nutrition.calories || 0) * factor,
    protein_g: (nutrition.protein_g || 0) * factor,
    carbohydrates_total_g: (nutrition.carbohydrates_total_g || 0) * factor,
    fat_total_g: (nutrition.fat_total_g || 0) * factor,
  };
}

