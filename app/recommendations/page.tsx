"use client";

import { useEffect, useState } from "react";
import { initDB, updateDB, getDB } from "@/lib/db";
import { getResolvedRecommendations } from "@/lib/recommendationResolver";
import BottomNav from "@/components/BottomNav";

type StandardId = "fda_dv_2024" | "usda_dri";
type Sex = "male" | "female";

type UserProfile = {
  recommendationSet?: "fda_dv_2024" | "usda_dri";
  sex?: "male" | "female";
  age?: number;
};

type Row = {
  id: string;
  unit: string;
  recommended: number;
  value: number;
  overridden: boolean;
};

export default function RecommendationsPage() {

  function getUserProfile(): UserProfile | undefined {
    const db = getDB();
    return db.userProfile;
  }

  useEffect(() => {
    (async () => {
      await initDB();
      const profile = getUserProfile();
      if (
        profile?.recommendationSet &&
        profile?.sex &&
        typeof profile.age === "number"
      ) {
        setStandard(profile.recommendationSet);
        setSex(profile.sex);
        setAge(profile.age);
        setRows(getResolvedRecommendations());
        setProfileReady(true);
      }
    })();
  }, []);
  const [rows, setRows] = useState<Row[]>([]);
  const [standard, setStandard] = useState<StandardId | null>(null);
  const [sex, setSex] = useState<Sex | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [profileReady, setProfileReady] = useState(false);
  const [toast, setToast] = useState(false);

  function saved() {
    setToast(true);
    setTimeout(() => setToast(false), 1200);
  }

  useEffect(() => {
    (async () => {
      await initDB();
      const profile = getUserProfile();

      if (
        profile?.recommendationSet &&
        profile?.sex &&
        typeof profile.age === "number"
      ) {
        setStandard(profile.recommendationSet);
        setSex(profile.sex);
        setAge(profile.age);
        setRows(getResolvedRecommendations());
        setProfileReady(true);
      }
    })();
  }, []);
  async function saveProfile(next: {
    recommendationSet: StandardId;
    sex: Sex;
    age: number;
  }) {
    await updateDB(db => {
      db.userProfile = next;
    });

    setStandard(next.recommendationSet);
    setSex(next.sex);
    setAge(next.age);
    setRows(getResolvedRecommendations());
    setProfileReady(true);
    saved();
  }


  async function updateValue(id: string, value: number) {
    await updateDB(db => {
      db.nutrientOverrides ??= {};
      db.nutrientOverrides[id] = value;
    });
    setRows(getResolvedRecommendations());
    saved();
  }

  async function resetAll() {
    await updateDB(db => {
      db.nutrientOverrides = {};
    });
    setRows(getResolvedRecommendations());
    saved();
  }
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold">Recommended Intake</h1>

      {/* PROFILE CONTROLS */}
      <div className="space-y-3 rounded-lg border border-muted p-3">
        <select
          value={standard ?? ""}
          onChange={e => {
            const next = e.target.value as StandardId;
            setStandard(next);
            if (sex && age)
              saveProfile({ recommendationSet: next, sex, age });
          }}
          className="p-2 rounded bg-[var(--muted)] w-full"
        >
          <option value="" disabled>
            Select standard
          </option>
          <option value="fda_dv_2024">FDA Daily Values</option>
          <option value="usda_dri">USDA DRI</option>
        </select>

        <select
          value={sex ?? ""}
          onChange={e => {
            const next = e.target.value as Sex;
            setSex(next);
            if (standard && age)
              saveProfile({ recommendationSet: standard, sex: next, age });
          }}
          className="p-2 rounded bg-[var(--muted)] w-full"
        >
          <option value="" disabled>
            Select sex
          </option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>

        <input
          type="number"
          min={1}
          max={120}
          placeholder="Age"
          value={age ?? ""}
          onChange={e => {
            const next = Number(e.target.value);
            setAge(next);
            if (standard && sex)
              saveProfile({ recommendationSet: standard, sex, age: next });
          }}
          className="p-2 rounded bg-[var(--muted)] w-full"
        />

        {!profileReady && (
          <p className="text-sm text-muted-foreground">
            Complete your profile to see recommendations
          </p>
        )}
      </div>

      {/* RECOMMENDATIONS */}
      {profileReady && (
        <>
          <div className="space-y-3">
            {rows.map(r => (
              <div
                key={r.id}
                className="flex items-center justify-between gap-3 bg-[var(--muted)] p-3 rounded"
              >
                <div>
                  <div className="font-medium capitalize">
                    {r.id.replace("_", " ")}
                  </div>
                  <div className="text-xs text-neutral-400">
                    Default: {r.recommended} {r.unit}
                  </div>
                </div>

                <input
                  type="number"
                  value={r.value}
                  onChange={e =>
                    updateValue(r.id, Number(e.target.value))
                  }
                  className="w-24 p-2 rounded bg-[var(--muted)] text-right"
                />
              </div>
            ))}
          </div>

          <button
            onClick={resetAll}
            className="w-full p-3 rounded bg-[var(--muted)] text-sm"
          >
            Restore Defaults
          </button>
        </>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/80 px-4 py-2 text-sm text-white z-50">
          Saved!
        </div>
      )}
    <BottomNav />
    </div>
  );

}
