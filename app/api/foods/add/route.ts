// app/api/foods/add/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import OpenAI from 'openai';

const DATA_PATH =
  '/Users/hung.doan/Documents/GitHubPersonal/nutrition-app/data/foods_selected.json';

const FOOD_GROUPS = [
  'starch',
  'meat',
  'fish',
  'seafood',
  'vegetables',
  'legumes',
  'fruits',
  'condiments',
  'seasonings',
] as const;

type FoodGroup = (typeof FOOD_GROUPS)[number];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { food, measurement, term } = await req.json();

  if (!food?.fdcId || !food?.description || !food?.foodNutrients) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const [group, nutrients] = await Promise.all([
    classifyFoodGroup(food.description),
    normalizeNutrients(food.foodNutrients),
  ]);

  const entry = {
    id: String(food.fdcId),
    group,
    term,
    measurement,
    name: food.description,
    nutrients,
  };

  const file = await fs.readFile(DATA_PATH, 'utf-8');
  const data = JSON.parse(file);
  data.push(entry);

  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));

  return NextResponse.json({ success: true });
}

async function classifyFoodGroup(name: string): Promise<FoodGroup> {
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0,
    messages: [
      {
        role: 'system',
        content:
          'Classify the food into exactly one category. Respond with ONLY one word.',
      },
      {
        role: 'user',
        content: `Food: "${name}"
Categories: ${FOOD_GROUPS.join(', ')}`,
      },
    ],
  });

  const value = res.choices[0].message.content?.trim().toLowerCase();
  return FOOD_GROUPS.includes(value as FoodGroup)
    ? (value as FoodGroup)
    : 'seasonings';
}

async function normalizeNutrients(foodNutrients: any[]) {
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0,
    messages: [
      {
        role: 'system',
        content: `
You map raw USDA nutrients into a fixed schema.
Return ONLY valid JSON matching this shape:

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
- Use best matching USDA nutrients
- Convert units if needed
- Missing nutrients = 0
- No extra keys
        `.trim(),
      },
      {
        role: 'user',
        content: JSON.stringify(foodNutrients),
      },
    ],
  });

  return JSON.parse(res.choices[0].message.content || '{}');
}
