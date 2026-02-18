// app/api/foods/search/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ foods: [] });
  }

  const apiKey = process.env.USDA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "USDA API key missing" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
      q
    )}&pageSize=20&api_key=${apiKey}`
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch USDA" },
      { status: 500 }
    );
  }

  const data = await res.json();

  return NextResponse.json({
    foods: (data.foods || []).map((f: any) => ({
      fdcId: f.fdcId,
      description: f.description,
      brandName: f.brandOwner ?? f.brandName ?? null,
      nutrients: f.nutrients ?? [],
      servingSize: f.servingSize ?? 100,
      servingSizeUnit: f.servingSizeUnit ?? "grams"
    })),
  });
}
