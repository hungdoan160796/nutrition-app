export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import OpenAI from 'openai';

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

    let foods: any[] = [];

    try {
      const res = await fetch(
        `https://blob.vercel-storage.com/${BLOB_KEY}`,
        { cache: 'no-store' }
      );

      if (res.ok) {
        const text = await res.text();
        const parsed = JSON.parse(text || '[]');
        if (Array.isArray(parsed)) foods = parsed;
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
Return ONLY valid JSON with this schema.
Missing values must be 0.

${JSON.stringify(EMPTY_NUTRIENTS, null, 2)}
          `.trim(),
        },
        { role: 'user', content: JSON.stringify(foodNutrients) },
      ],
    });

    const raw = res.choices[0]?.message?.content;
    if (!raw) return EMPTY_NUTRIENTS;

    const parsed = JSON.parse(raw);

    return { ...EMPTY_NUTRIENTS, ...parsed };
  } catch {
    return EMPTY_NUTRIENTS;
  }
}
