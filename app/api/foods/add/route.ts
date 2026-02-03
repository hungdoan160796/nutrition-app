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

export async function POST(req: Request) {
  const openaiKey = req.headers.get('x-openai-key');
  if (!openaiKey) {
    return NextResponse.json({ error: 'Missing OpenAI key' }, { status: 401 });
  }

  const openai = new OpenAI({ apiKey: openaiKey });

  const { food, measurement, term } = await req.json();

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

  const data = JSON.parse(await fs.readFile(DATA_PATH, 'utf-8'));
  data.push(entry);

  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));

  return NextResponse.json({ success: true });
}

async function classifyFoodGroup(openai: OpenAI, name: string) {
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
  return FOOD_GROUPS.includes(value as any) ? value : 'seasonings';
}

async function normalizeNutrients(openai: OpenAI, nutrients: any[]) {
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0,
    messages: [
      {
        role: 'system',
        content: `
Return ONLY JSON in this shape:
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
Missing = 0`.trim(),
      },
      { role: 'user', content: JSON.stringify(nutrients) },
    ],
  });

  return JSON.parse(res.choices[0].message.content || '{}');
}
