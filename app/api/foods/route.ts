import { NextResponse } from "next/server";
import { adminDb, verifyAuth } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    // require authenticated user
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = new URL(req.url);
    const group = url.searchParams.get("group");
    const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
    const limit = Math.max(1, Math.min(200, Number(url.searchParams.get("limit") ?? "50")));

    // Build Firestore query. Prefer server-side filtered query, but fall back
    // to an in-memory filter if Firestore requires a composite index (helps
    // development when indexes aren't yet deployed).
    let foods: any[] = [];

    try {
      let query: FirebaseFirestore.Query = adminDb.collection("foods");
      if (group) query = query.where("group", "==", group);

      // order by name for stable pagination
      query = query.orderBy("name").limit(limit).offset((page - 1) * limit);

      const snapshot = await query.get();

      snapshot.forEach((doc) => {
        const data = doc.data();
        foods.push({
          id: doc.id,
          term: data.term ?? null,
          name: data.name ?? data.description ?? null,
          group: data.group ?? null,
          nutrients: data.nutrients ?? {},
          defaultPortionGrams: data.defaultPortionGrams ?? data.measurement ?? null,
        });
      });
    } catch (err: any) {
      // If Firestore complains about a missing index, fall back to a full
      // collection scan and do filtering + pagination in-memory. This is
      // less efficient but avoids a hard failure while developing.
      const msg = String(err?.message ?? err);
      if (msg.includes("requires an index") || msg.includes("FAILED_PRECONDITION")) {
        const snapshotAll = await adminDb.collection("foods").get();
        const all: any[] = [];
        snapshotAll.forEach((doc) => {
          const data = doc.data();
          all.push({
            id: doc.id,
            term: data.term ?? null,
            name: data.name ?? data.description ?? null,
            group: data.group ?? null,
            nutrients: data.nutrients ?? {},
            defaultPortionGrams: data.defaultPortionGrams ?? data.measurement ?? null,
          });
        });

        // filter by group if requested
        const filtered = group ? all.filter((f) => f.group === group) : all;

        // sort by name for stable pagination
        filtered.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));

        const start = (page - 1) * limit;
        foods = filtered.slice(start, start + limit);
      } else {
        throw err;
      }
    }

    return NextResponse.json({ page, limit, count: foods.length, foods });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch foods", detail: err?.message ?? String(err) }, { status: 500 });
  }
}
