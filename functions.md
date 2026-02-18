
async function classifyFoodGroup(openai: OpenAI, name: string): Promise<FoodGroup> {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0,
    messages: [
      { role: "system", content: "Return ONE category only." },
      {
        role: "user",
        content: `Food: "${name}"
Categories: ${FOOD_GROUPS.join(", ")}`,
      },
    ],
  });

  const value = res.choices[0].message.content?.trim().toLowerCase();
  return FOOD_GROUPS.includes(value as FoodGroup)
    ? (value as FoodGroup)
    : "seasonings";
}

async function normalizeNutrients(openai: OpenAI, nutrients: any[]) {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `
You are a nutrition data normalizer.

Map USDA nutrient entries into the EXACT JSON schema below.
Return ONLY valid JSON. No markdown. No explanations.

Schema:
{
  "vitamin_a": number,
  "fat": number,
  "carbohydrate": number,
  "calories": number,
  "calcium": number,
  "potassium": number,
  "zinc": number,
  "protein": number,
  "iron": number,
  "magnesium": number,
  "sodium": number,
  "vitamin_c": number,
  "folate": number,
  "vitamin_b12": number,
  "vitamin_d": number
}

Rules:
- Use the closest matching USDA nutrient names
- Convert units if needed
- If a nutrient is missing or null, set it to 0
- Do not include extra keys
`.trim(),
      },
      { role: "user", content: JSON.stringify(nutrients) },
    ],
  });

  const content = res.choices[0].message.content || "{}";
  return extractJson(content);

}

function extractJson(text: string) {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
  return JSON.parse(cleaned);
}