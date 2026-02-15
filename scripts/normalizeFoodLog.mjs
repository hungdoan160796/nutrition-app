#!/usr/bin/env node
/*
  scripts/normalizeFoodLog.mjs

  Lightweight migration script that normalizes the `foodLog` field for all
  user documents in Firestore. It coerces nutrient maps to number|null and
  grams to number|null. Requires the following env vars to be set for admin
  credentials:

  FIREBASE_PROJECT_ID
  FIREBASE_CLIENT_EMAIL
  FIREBASE_PRIVATE_KEY

  Run with:
    node scripts/normalizeFoodLog.mjs
*/
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function ensureAdmin() {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
      console.error('Missing FIREBASE_* env vars. Aborting.');
      process.exit(1);
    }

    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
  }
}

function normalizeMap(obj) {
  const out = {};
  if (!obj || typeof obj !== 'object') return out;
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'number') {
      out[k] = Number.isFinite(v) ? v : null;
    } else if (v == null) {
      out[k] = null;
    } else {
      const n = Number(v);
      out[k] = Number.isFinite(n) ? n : null;
    }
  }
  return out;
}

function sanitizeFood(f) {
  if (!f || typeof f !== 'object') return f;
  const copy = { ...f };
  if (copy.nutrientsPer100g) copy.nutrientsPer100g = normalizeMap(copy.nutrientsPer100g);
  if (copy.nutrients) copy.nutrients = normalizeMap(copy.nutrients);
  if (copy.grams !== undefined) {
    const g = typeof copy.grams === 'number' ? copy.grams : Number(copy.grams);
    copy.grams = Number.isFinite(g) ? g : null;
  }
  return copy;
}

async function main() {
  ensureAdmin();
  const db = getFirestore();

  // CLI args: --dry-run (no writes), --limit=N (process only N users), --user=UID (process single user)
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const limitArg = args.find((a) => a.startsWith('--limit='));
  const userArg = args.find((a) => a.startsWith('--user='));
  const limit = limitArg ? Number(limitArg.split('=')[1]) : undefined;
  const singleUser = userArg ? userArg.split('=')[1] : undefined;

  const usersRef = db.collection('users');
  console.log('Fetching user documents...');
  let snap;
  if (singleUser) {
    const doc = await usersRef.doc(singleUser).get();
    if (!doc.exists) {
      console.error(`User ${singleUser} not found`);
      return;
    }
    snap = { docs: [doc], size: 1 };
  } else {
    snap = await usersRef.get();
  }

  console.log(`Found ${snap.size} users`);

  let processed = 0;
  let updated = 0;
  for (const doc of snap.docs) {
    if (limit !== undefined && processed >= limit) break;
    processed++;

    const data = doc.data();
    const rawFoodLog = data.foodLog ?? {};
    const out = {};
    let changed = false;
    for (const [date, foods] of Object.entries(rawFoodLog)) {
      if (!Array.isArray(foods)) continue;
      const sanitized = foods.map((f) => sanitizeFood(f));
      out[date] = sanitized;
      // simple shallow comparison to detect potential changes
      if (JSON.stringify(sanitized) !== JSON.stringify(foods)) changed = true;
    }

    if (changed) {
      console.log(`User ${doc.id} would be updated` + (dryRun ? ' (dry-run)' : ''));
      if (!dryRun) {
        await doc.ref.update({ foodLog: out });
        updated++;
        console.log(`Updated user ${doc.id}`);
      }
    }
  }

  console.log(`Migration complete. Processed ${processed} users. Updated ${updated} documents.${dryRun ? ' (dry-run)' : ''}`);
}

main().catch((err) => {
  console.error('Migration failed', err);
  process.exit(1);
});
