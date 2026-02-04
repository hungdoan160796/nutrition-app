export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import OpenAI from 'openai';
import { Food } from '@/lib/types/food';

/**
 * IMPORTANT:
 * This must be a BLOB PATH, NOT a signed URL.
 */
const BLOB_KEY = 'foods/foods_selected.json';

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

const EMPTY_NUTRIENTS = {
  vitamin_a: 0,
  fat: 0,
  carbohydrate: 0,
  calories: 0,
  calcium: 0,
  potassium: 0,
  zinc: 0,
  protein: 0,
  iron: 0,
  magnesium: 0,
  sodium: 0,
  vitamin_c: 0,
  folate: 0,
  vitamin_b12: 0,
  vitamin_d: 0,
};

export async function POST(req: Request) {
  try {
    const openaiKey = req.headers.get('x-openai-key');
    if (!openaiKey) {
      return NextResponse.json({ error: 'Missing OpenAI key' }, { status: 401 });
    }

    const openai = new OpenAI({ apiKey: openaiKey });

    const { food, measurement, term } = await req.json();

    if (!food?.fdcId || !food?.description || !food?.foodNutrients) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const [group, nutrients] = await Promise.all([
      classifyFoodGroup(openai, food.description),
      normalizeNutrients(openai, food.foodNutrients),
    ]);

    const entry = {
      id: String(food.fdcId),
      group,
      term,
      measurement,
      name: food.description,
      nutrients,
    };

    /* ---------------- READ EXISTING BLOB ---------------- */

let foods: Food[] = [];

try {
  const res = await fetch(
    `https://blob.vercel-storage.com/${BLOB_KEY}`,
    { cache: 'no-store' }
  );

  if (res.ok) {
    const text = await res.text();
    const parsed: unknown = JSON.parse(text || '[]');
    if (Array.isArray(parsed)) {
      foods = parsed as Food[];
    }
  }
} catch {
  foods = [];
}


    /* ---------------- APPEND ---------------- */

    foods.push(entry);

    /* ---------------- WRITE ---------------- */

    const result = await put(
      BLOB_KEY,
      JSON.stringify(foods, null, 2),
      {
        access: 'public',
        contentType: 'application/json',
        allowOverwrite: true
      }
    );

    console.log('BLOB WRITE OK:', result.url);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('ADD FOOD ERROR:', err);
    return NextResponse.json(
      { error: 'Failed to add food', detail: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}

/* ---------------- HELPERS ---------------- */

async function classifyFoodGroup(
  openai: OpenAI,
  name: string
): Promise<FoodGroup> {
  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0,
      messages: [
        { role: 'system', content: 'Return ONE category only.' },
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
  } catch {
    return 'seasonings';
  }
}

async function normalizeNutrients(
  openai: OpenAI,
  foodNutrients: any[]
) {
  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0,
      messages: [
        {
          role: 'system',
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
        { role: 'user', content: JSON.stringify(foodNutrients) },
      ],
    });

    const raw = res.choices[0]?.message?.content;
    if (!raw) return EMPTY_NUTRIENTS;

    const parsed = JSON.parse(raw);

    return {
      vitamin_a: Number(parsed.vitamin_a) || 0,
      fat: Number(parsed.fat) || 0,
      carbohydrate: Number(parsed.carbohydrate) || 0,
      calories: Number(parsed.calories) || 0,
      calcium: Number(parsed.calcium) || 0,
      potassium: Number(parsed.potassium) || 0,
      zinc: Number(parsed.zinc) || 0,
      protein: Number(parsed.protein) || 0,
      iron: Number(parsed.iron) || 0,
      magnesium: Number(parsed.magnesium) || 0,
      sodium: Number(parsed.sodium) || 0,
      vitamin_c: Number(parsed.vitamin_c) || 0,
      folate: Number(parsed.folate) || 0,
      vitamin_b12: Number(parsed.vitamin_b12) || 0,
      vitamin_d: Number(parsed.vitamin_d) || 0,
    };
  } catch (err) {
    console.error('NORMALIZE NUTRIENTS FAILED:', err);  
    throw err;
  }
}
