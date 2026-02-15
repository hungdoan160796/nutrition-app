// lib/db.ts — Firebase-backed DB (Firestore)

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { auth } from "@/lib/firebase";

export type DBState = {
  foodLog: Record<string, any[]>;
  userProfile: any;
  nutrientOverrides: Record<string, number>;
};

const db = getFirestore();

/**
 * Helpers
 */
function requireUser() {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  return user;
}

function userDocRef(uid: string) {
  return doc(db, "users", uid);
}

function intakeColRef(uid: string) {
  return collection(db, "users", uid, "intake");
}

/**
 * User DB (profile + settings)
 */
export async function initDB(): Promise<DBState> {
  const user = requireUser();
  const ref = userDocRef(user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const initial: DBState = {
      foodLog: {},
      userProfile: {},
      nutrientOverrides: {},
    };

    await setDoc(ref, {
      ...initial,
      createdAt: serverTimestamp(),
    });

    return initial;
  }

  // Normalize data read from Firestore so the app always sees a stable
  // shape: nutrient maps have numeric values or null (no `undefined`), and
  // numeric fields are coerced where possible. This prevents serialization
  // issues (RSC inserting "$undefined") and protects UI logic.
  const raw = snap.data() as DBState;

  const normalizeMap = (obj: any): Record<string, number | null> => {
    const out: Record<string, number | null> = {};
    if (!obj || typeof obj !== "object") return out;
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === "number") {
        out[k] = Number.isFinite(v) ? v : null;
      } else if (v == null) {
        out[k] = null;
      } else {
        const n = Number(v);
        out[k] = Number.isFinite(n) ? n : null;
      }
    }
    return out;
  };

  const sanitizeFood = (f: any) => {
    if (!f || typeof f !== "object") return f;
    const copy: any = { ...f };
    if (copy.nutrientsPer100g) copy.nutrientsPer100g = normalizeMap(copy.nutrientsPer100g);
    if (copy.nutrients) copy.nutrients = normalizeMap(copy.nutrients);
    if (copy.grams !== undefined) {
      const g = typeof copy.grams === "number" ? copy.grams : Number(copy.grams);
      copy.grams = Number.isFinite(g) ? g : copy.grams == null ? null : null;
    }
    return copy;
  };

  const data: DBState = {
    foodLog: {},
    userProfile: raw.userProfile ?? {},
    nutrientOverrides: raw.nutrientOverrides ?? {},
  };

  try {
    const rawFoodLog = raw.foodLog ?? {};
    for (const [date, foods] of Object.entries(rawFoodLog)) {
      if (!Array.isArray(foods)) continue;
      data.foodLog[date] = foods.map((f) => sanitizeFood(f));
    }
  } catch (e) {
    // If normalization fails for any reason, fall back to returning the
    // raw snapshot to avoid blocking the app. This should be rare.
    // eslint-disable-next-line no-console
    console.warn("initDB: failed to normalize foodLog", e);
    return raw;
  }

  return data;
}

export async function getDB(): Promise<DBState> {
  return initDB();
}

export async function updateDB(mutator: (db: DBState) => void) {
  const user = requireUser();
  const ref = userDocRef(user.uid);
  const current = await initDB();

  mutator(current);

  await updateDoc(ref, {
    foodLog: current.foodLog,
    userProfile: current.userProfile,
    nutrientOverrides: current.nutrientOverrides,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Intake log (collection)
 */
export async function addIntake(entry: any) {
  const user = requireUser();
  await addDoc(intakeColRef(user.uid), {
    ...entry,
    createdAt: serverTimestamp(),
  });
}

export async function getAllIntake(): Promise<any[]> {
  const user = requireUser();
  const snap = await getDocs(intakeColRef(user.uid));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
