// app/api/foods/add/route.ts
import { NextResponse } from "next/server";
import { adminDb, verifyAuth } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  const { fdcId } = await req.json();
  if (!fdcId) {
    return NextResponse.json({ error: "Missing fdcId" }, { status: 400 });
  }

  const user = await verifyAuth(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.USDA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "USDA API key missing" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${apiKey}`
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch USDA food" },
      { status: 500 }
    );
  }

  const data = await res.json();

  // normalize nutrients → per 100g
  const nutrients: Record<string, number> = {};
  for (const n of data.foodNutrients || []) {
    if (!n.nutrient?.id || typeof n.amount !== "number") continue;
    nutrients[String(n.nutrient.id)] = n.amount;
  }

  const foodDoc = {
    term: data.description.toLowerCase(),
    name: data.description,
    nutrientsPer100g: nutrients,
    createdAt: new Date(),
  };

  await adminDb
    .collection("users")
    .doc(user.uid)
    .collection("foods")
    .doc(String(fdcId))
    .set(foodDoc);

  return NextResponse.json({ ok: true });
}
