export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

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

type Nutrients = {
  vitamin_a: number;
  fat: number;
  carbohydrate: number;
  calories: number;
  calcium: number;
  potassium: number;
  zinc: number;
  protein: number;
  iron: number;
  magnesium: number;
  sodium: number;
  vitamin_c: number;
  folate: number;
  vitamin_b12: number;
  vitamin_d: number;
};

const EMPTY_NUTRIENTS: Nutrients = {
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

/* ---------------- FIREBASE INIT ---------------- */

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

/* ---------------- ROUTE ---------------- */

export async function POST(req: Request) {
  try {
    // prefer an incoming per-user key (sent by client from user profile) via header
    const openaiKey = req.headers.get('x-openai-key') ?? process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!openaiKey) {
      return NextResponse.json({ error: 'Missing OpenAI key' }, { status: 401 });
    }

    // Quick Content-Type check to help catch non-JSON requests early
    const contentType = req.headers.get('content-type') ?? '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid Content-Type: expected application/json' },
        { status: 400 }
      );
    }

    // Safe JSON parsing with useful error message on failure
    let body: any;
    try {
      body = await req.json();
    } catch (parseErr: any) {
      return NextResponse.json(
        { error: 'Invalid JSON body', detail: parseErr?.message ?? String(parseErr) },
        { status: 400 }
      );
    }

    let { food, measurement, term, fdcId } = body ?? {};

    // If client only sent an fdcId (older client code), fetch full food details
    // from the USDA API server-side so we have `food.foodNutrients` available.
    if (!food && fdcId) {
      const usdaKey = process.env.USDA_API_KEY;
      if (!usdaKey) {
        return NextResponse.json({ error: 'USDA API key missing' }, { status: 500 });
      }

      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/food/${encodeURIComponent(String(fdcId))}?api_key=${usdaKey}`
      );

      if (!res.ok) {
        return NextResponse.json({ error: 'Failed to fetch USDA food details' }, { status: 500 });
      }

      try {
        food = await res.json();
      } catch (e) {
        return NextResponse.json({ error: 'Invalid USDA response' }, { status: 500 });
      }
    }

    // More detailed validation feedback so the client knows what's missing
    const missing: string[] = [];
    if (!food) missing.push('food');
    else {
      if (!food.fdcId) missing.push('food.fdcId');
      if (!food.description) missing.push('food.description');
      // NOTE: we do NOT require `food.foodNutrients` here because search results
      // (and some USDA responses) may not include that array. We'll coerce or
      // fetch nutrients below before calling the normalizer. The OpenAI
      // normalization step will still run and return EMPTY_NUTRIENTS if no
      // usable nutrients are available.
    }

    if (missing.length) {
      return NextResponse.json(
        { error: 'Invalid payload', missing },
        { status: 400 }
      );
    }

    const openai = new OpenAI({ apiKey: openaiKey });

    // Coerce various USDA shapes into an array the normalizer expects.
    let nutrientsSource: any[] = [];
    if (Array.isArray(food.foodNutrients)) {
      nutrientsSource = food.foodNutrients;
    } else if (food.labelNutrients && typeof food.labelNutrients === 'object') {
      // Convert labelNutrients object -> [{ nutrient: { name }, amount }]
      nutrientsSource = Object.entries(food.labelNutrients).map(([k, v]: any) => ({
        nutrient: { name: k },
        amount: v?.value ?? v,
      }));
    } else if (food.foodNutrient && typeof food.foodNutrient === 'object') {
      nutrientsSource = [food.foodNutrient];
    } else {
      nutrientsSource = [];
    }

    const [group, nutrients] = await Promise.all([
      classifyFoodGroup(openai, food.description),
      normalizeNutrients(openai, nutrientsSource),
    ]);

    const entry = {
      id: String(food.fdcId),
      group,
      term: term ?? null,
      measurement: measurement ?? null,
      name: food.description,
      nutrients,
      createdAt: new Date(),
    };

    await db
      .collection('foods')
      .doc(entry.id)
      .set(entry, { merge: true });

    return NextResponse.json({ success: true, id: entry.id });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to add food', detail: err?.message ?? 'Unknown error' },
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

    const value =
      res.choices[0]?.message?.content?.trim().toLowerCase() ?? '';

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
): Promise<Nutrients> {
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
  } catch {
    return EMPTY_NUTRIENTS;
  }
}
