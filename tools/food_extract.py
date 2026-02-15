import json
import csv
import os
import streamlit as st

DATA_JSON_PATH = "/Users/hung.doan/Documents/GitHubPersonal/nutrition-app/data/foods_clean.json"
EXPORTED_JSON_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "foods_selected.json"
)

st.set_page_config(page_title="CSV → foods_clean matcher", layout="wide")
st.title("CSV → foods_clean.json Matcher")

@st.cache_data
def load_foods():
    with open(DATA_JSON_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

@st.cache_data
def load_exported():
    if not os.path.exists(EXPORTED_JSON_PATH):
        return []
    with open(EXPORTED_JSON_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

foods = load_foods()
exported = load_exported()
exported_terms = {obj.get("term", "").lower() for obj in exported}

uploaded_file = st.file_uploader("Upload CSV (English,Vietnamese)", type=["csv"])

selected_objects = []

def matches_any_word(ingredient_name: str, food_name: str) -> bool:
    words = ingredient_name.lower().split()
    food_name = food_name.lower()
    return any(word in food_name for word in words)

if uploaded_file:
    decoded = uploaded_file.read().decode("utf-8").splitlines()
    reader = csv.DictReader(decoded)

    for idx, row in enumerate(reader):
        eng = row["English"].strip()
        vie = row.get("Vietnamese", "").strip()

        if eng.lower() in exported_terms:
            st.subheader(f"{eng} — {vie}")
            st.caption("Already exported, skipped")
            continue

        matches = [
            obj for obj in foods
            if matches_any_word(eng, obj.get("name", ""))
        ]

        st.subheader(f"{eng} — {vie}")

        if matches:
            options = {
                f'{m.get("name")} (id={m.get("id", "n/a")})': m
                for m in matches
            }
            chosen = st.multiselect(
                label="Matches",
                options=list(options.keys()),
                key=f"select_{idx}"
            )
            for c in chosen:
                base = options[c].copy()
                base["term"] = eng
                selected_objects.append(base)
        else:
            st.caption("No matches found")

if selected_objects:
    st.divider()
    st.write(f"Selected objects (new): {len(selected_objects)}")

    if st.button("Export JSON"):
        merged = exported + selected_objects
        with open(EXPORTED_JSON_PATH, "w", encoding="utf-8") as f:
            json.dump(merged, f, ensure_ascii=False, indent=2)

        st.success(f"Exported to {EXPORTED_JSON_PATH}")
