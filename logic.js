// -----------------------------
// Dojo Global Logic
// -----------------------------

// nutrition endpoint (the one your index.html hits)
const API_URL = "https://api.api-ninjas.com/v1/nutrition?query=";

// API KEY is already handled in index.html fetch headers.
// We're just factoring logic here so multiple pages can reuse it.

async function fetchNutrition(query) {
  const key = localStorage.getItem("dojo_api_key");  // optional future setting

  const res = await fetch(API_URL + encodeURIComponent(query), {
    headers: key
      ? { "X-Api-Key": key }
      : { },
  });

  if (!res.ok) throw new Error("Nutrition API failed");
  const data = await res.json();
  return data[0]; // API returns array
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
    calories: ((nutrition.calories || 0) * factor).toFixed(1),
    protein: ((nutrition.protein_g || 0) * factor).toFixed(1),
    carbs: ((nutrition.carbohydrates_total_g || 0) * factor).toFixed(1),
    fat: ((nutrition.fat_total_g || 0) * factor).toFixed(1)
  };
}

