import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { Food } from '@/lib/types/food';

const BLOB_KEY = 'foods/foods_selected.json';

export async function GET() {
  const blobs = await list({ prefix: BLOB_KEY });

  if (!blobs.blobs.length) {
    return NextResponse.json([] as Food[]);
  }

  const res = await fetch(blobs.blobs[0].url, { cache: 'no-store' });
  const data = (await res.json()) as Food[];

  return NextResponse.json(data);
}
