import nutrientData from "@/data/nutrients.json";

export type NutrientDef = {
  id: string;
  label: string;
  unit: string;
  usda_names: string[];
};

const nutrients: NutrientDef[] = nutrientData.nutrients;

// Map USDA name → nutrient ID
const usdaNameToId = new Map<string, NutrientDef>();

for (const n of nutrients) {
  for (const name of n.usda_names) {
    usdaNameToId.set(name, n);
  }
}

export function getNutrientByUsdaName(name: string): NutrientDef | undefined {
  return usdaNameToId.get(name);
}

export function getNutrientById(id: string): NutrientDef | undefined {
  return nutrients.find(n => n.id === id);
}

export function getAllNutrients(): NutrientDef[] {
  return nutrients;
}
