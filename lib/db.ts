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

  return snap.data() as DBState;
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
