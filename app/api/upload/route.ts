import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.arrayBuffer();

    const blob = await put('file.txt', body, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Upload failed', detail: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
