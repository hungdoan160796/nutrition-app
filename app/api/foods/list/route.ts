import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const BLOB_KEY = 'foods/foods_selected.json';

export async function GET() {
  const { blobs } = await list({ prefix: BLOB_KEY });

  if (!blobs.length) {
    return NextResponse.json([]);
  }

  const res = await fetch(blobs[0].url, { cache: 'no-store' });
  const data = await res.json();

  return NextResponse.json(data);
}
