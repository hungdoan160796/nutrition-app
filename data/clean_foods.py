import json
from pathlib import Path

# ---------- CONFIG ----------
RAW_FOOD_FILE = "/Users/hung.doan/Documents/GitHub/nutrition_app/nutrition/data/raw_food.json"          # your USDA file
NUTRIENTS_FILE = "/Users/hung.doan/Documents/GitHub/nutrition_app/nutrition/data/nutrients.json"    # app nutrient registry
OUTPUT_FILE = "food.json"

# ---------- LOAD FILES ----------
print("Loading nutrient registry...")
with open(NUTRIENTS_FILE, "r", encoding="utf-8") as f:
    nutrient_data = json.load(f)["nutrients"]

print("Loading raw food data...")
with open(RAW_FOOD_FILE, "r", encoding="utf-8") as f:
    raw_food_data = json.load(f)["SRLegacyFoods"]

# ---------- BUILD USDA NAME → NUTRIENT ID MAP ----------
usda_name_to_id = {}

for n in nutrient_data:
    for usda_name in n["usda_names"]:
        usda_name_to_id[usda_name] = {
            "id": n["id"],
            "unit": n["unit"]
        }

print(f"Tracking {len(usda_name_to_id)} USDA nutrient names")

# ---------- CLEAN FOODS ----------
clean_foods = []
skipped_foods = 0

for food in raw_food_data:
    food_id = str(food.get("fdcId"))
    name = food.get("description")

    if not food_id or not name:
        skipped_foods += 1
        continue

    nutrients = {}

    for fn in food.get("foodNutrients", []):
        nutrient = fn.get("nutrient")
        amount = fn.get("amount")

        if not nutrient or amount is None:
            continue

        usda_name = nutrient.get("name")
        if usda_name not in usda_name_to_id:
            continue

        nutrient_id = usda_name_to_id[usda_name]["id"]

        # Prefer kcal over kJ for calories
        if nutrient_id == "calories":
            unit = nutrient.get("unitName")
            if unit != "kcal":
                continue

        nutrients[nutrient_id] = round(float(amount), 3)

    # Skip foods with no relevant nutrients
    if not nutrients:
        skipped_foods += 1
        continue

    clean_foods.append({
        "id": food_id,
        "name": name,
        "nutrients": nutrients
    })

# ---------- WRITE OUTPUT ----------
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(clean_foods, f, ensure_ascii=False, indent=2)

# ---------- SUMMARY ----------
print("Done.")
print(f"Foods kept: {len(clean_foods)}")
print(f"Foods skipped: {skipped_foods}")
print(f"Output file: {OUTPUT_FILE}")
print(f"Approx size: {Path(OUTPUT_FILE).stat().st_size / 1024:.1f} KB")
