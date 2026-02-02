const DB_NAME = "nutrition_app";
const DB_VERSION = 1;

const STORE_INTAKE = "intake_log";
// db.ts (replace in-memory-only logic)

import { loadLocalDB, saveLocalDB } from "./localStore.native";

export type DBState = {
  foodLog: Record<string, any[]>;
  userProfile: any;
  nutrientOverrides: Record<string, number>;
};

let db: DBState = {
  foodLog: {},
  userProfile: {},
  nutrientOverrides: {},
};
export async function initDB() {
  const stored = await loadLocalDB<Partial<DBState>>();

  if (stored) {
    db = {
      foodLog: stored.foodLog ?? {},
      userProfile: stored.userProfile ?? null,
      nutrientOverrides: stored.nutrientOverrides ?? {},
    };
  }
}


export function getDB() {
  return db;
}
export async function updateDB(mutator: (db: DBState) => void) {
  await initDB();          // 🔑 ensure DB is hydrated
  mutator(db);
  await saveLocalDB(db);
}


let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_INTAKE)) {
        db.createObjectStore(STORE_INTAKE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return dbPromise;
}

// ---------- Public API ----------

export async function addIntake(entry: any) {
  const db = await openDB();
  const tx = db.transaction(STORE_INTAKE, "readwrite");
  tx.objectStore(STORE_INTAKE).add(entry);

  return tx.oncomplete;
}

export async function getAllIntake(): Promise<any[]> {
  const db = await openDB();
  const tx = db.transaction(STORE_INTAKE, "readonly");
  const store = tx.objectStore(STORE_INTAKE);

  return new Promise(resolve => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
  });
}
