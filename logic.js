// -----------------------------
// Dojo Global Logic
// -----------------------------

// nutrition endpoint
const API_URL = "https://api.api-ninjas.com/v1/nutrition?query=";

// 🔥 hard-coded API KEY
const API_KEY = "4UJbz31NSzJfjYDaoZrQoA==3TxTMrMleysCSEAp";

// -----------------------------
// FETCH NUTRITION
// -----------------------------
async function fetchNutrition(query) {
  const res = await fetch(API_URL + encodeURIComponent(query), {
    headers: { "X-Api-Key": API_KEY },
  });
  const json = await res.json();
  return json[0]; // first food result
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
// CONVERT UNITS TO GRAMS
// -----------------------------
// g exact
// oz/lb approximate
// cup/tbsp/tsp vary by ingredient
function toGrams(amount, unit) {
  const n = parseFloat(amount);

  switch (unit) {
    case "g": return n;
    case "oz": return n * 28.35;
    case "lb": return n * 453.59;
    case "cup": return n * 240;   // generic density
    case "tbsp": return n * 15;
    case "tsp": return n * 5;
    default: return n;
  }
}

// -----------------------------
// SCALE PER 100G → YOUR AMOUNT
// -----------------------------
function scaleNutrition(nutrition, grams) {
  if (!nutrition) return null;

  const factor = grams / 100;

  return {
    calories: (nutrition.calories || 0) * factor,
    protein_g: (nutrition.protein_g || 0) * factor,
    carbohydrates_total_g: (nutrition.carbohydrates_total_g || 0) * factor,
    fat_total_g: (nutrition.fat_total_g || 0) * factor,
    calories:  (nutrition.calories  * factor).toFixed(1),
    protein:   (nutrition.protein   * factor).toFixed(1),
    carbs:     (nutrition.carbohydrates_total_g * factor).toFixed(1),
    fat:       (nutrition.fat_total_g * factor).toFixed(1),
  };
}

// export for other pages
window.DojoNutrition = {
  fetchNutrition,
  toGrams,
  scaleNutrition,
};
