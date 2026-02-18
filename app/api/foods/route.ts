import { NextResponse } from "next/server";
import { adminDb, verifyAuth } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
    const limit = Math.max(1, Math.min(200, Number(url.searchParams.get("limit") ?? "50")));
    const start = (page - 1) * limit;

    let foods: any[] = [];

    try {
      const snapshot = await adminDb
        .collection("foods")
        .limit(limit)
        .offset(start)
        .get();

      snapshot.forEach((doc) => {
        const f = doc.data();

        foods.push({
          id: doc.id,
          fdcId: f.fdcId ?? null,
          description: f.description ?? f.term ?? null,
          brandName: f.brandOwner ?? f.brandName ?? null,
          group: f.group,
          nutrients: f.nutrients,
          servingSize:
            typeof f.servingSize === "number"
              ? f.servingSize
              : Number(f.servingSize) || 100,
          servingSizeUnit: f.servingSizeUnit ?? "grams",
        });
      });
    } catch (err: any) {
      const msg = String(err?.message ?? err);

      if (msg.includes("requires an index") || msg.includes("FAILED_PRECONDITION")) {
        const snapshotAll = await adminDb.collection("foods").get();
        const all: any[] = [];

        snapshotAll.forEach((doc) => {
          const f = doc.data();

          all.push({
            id: doc.id,
            fdcId: f.fdcId ?? null,
            description: f.description ?? null,
            brandName: f.brandOwner ?? f.brandName ?? null,
            term: f.description ?? null,
            name: f.brandOwner ?? f.brandName ?? null,
            group: f.group,
            nutrients: f.nutrients,
            servingSize:
              typeof f.servingSize === "number"
                ? f.servingSize
                : Number(f.servingSize) || 100,
            servingSizeUnit: f.servingSizeUnit ?? "grams",
          });
        });

        all.sort((a, b) =>
          (a.description ?? "").localeCompare(b.description ?? "")
        );

        foods = all.slice(start, start + limit);
      } else {
        throw err;
      }
    }

    return NextResponse.json({
      page,
      limit,
      count: foods.length,
      foods,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to fetch foods", detail: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
