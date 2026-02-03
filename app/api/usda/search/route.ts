// app/api/usda/search/route.ts
import { NextResponse } from 'next/server';

const USDA_URL = 'https://api.nal.usda.gov/fdc/v1/foods/search';

export async function POST(req: Request) {
  const { query } = await req.json();

  if (!query) {
    return NextResponse.json({ foods: [] }, { status: 400 });
  }

  const apiKey = process.env.USDA_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'USDA_API_KEY missing' },
      { status: 500 }
    );
  }

  const res = await fetch(`${USDA_URL}?api_key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      pageSize: 10,
      dataType: ['Branded', 'Foundation', 'SR Legacy'],
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'USDA request failed' },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
