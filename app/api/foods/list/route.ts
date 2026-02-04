// app/api/foods/list/route.ts
import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

const BLOB_KEY = 'foods/foods_selected.json';

export async function GET() {
  const blobs = await list({ prefix: BLOB_KEY });

  if (!blobs.blobs.length) {
    return NextResponse.json([]);
  }

  const res = await fetch(blobs.blobs[0].url);
  const data = await res.json();

  return NextResponse.json(data);
}
