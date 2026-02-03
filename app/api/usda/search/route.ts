import { NextResponse } from 'next/server';

const USDA_URL = 'https://api.nal.usda.gov/fdc/v1/foods/search';

export async function POST(req: Request) {
  const apiKey = req.headers.get('x-usda-key');
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing USDA key' }, { status: 401 });
  }

  const { query } = await req.json();

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
    return NextResponse.json({ error: 'USDA request failed' }, { status: res.status });
  }

  return NextResponse.json(await res.json());
}
