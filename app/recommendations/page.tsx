// app/recommendations/page.tsx
"use client";

import { useEffect, useState } from "react";
import { initDB, updateDB, getDB } from "@/lib/db";
import { getResolvedRecommendations } from "@/lib/recommendationResolver";
import { getUserProfile } from "@/lib/userProfile";

type StandardId = "fda_dv_2024" | "usda_dri";
type Sex = "male" | "female";


type Row = {
  id: string;
  unit: string;
  recommended: number;
  value: number;
  overridden: boolean;
};

export default function RecommendationsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [standard, setStandard] = useState<StandardId>("fda_dv_2024");
  const [sex, setSex] = useState<Sex>("female");
  const [age, setAge] = useState<number>(30);

  useEffect(() => {
    (async () => {
      await initDB();
      const db = getDB();
      const profile = getUserProfile();

      setStandard(db.userProfile?.standard ?? "fda_dv_2024");
      setSex(profile.sex ?? "female");
      setAge(profile.age ?? 30);

      setRows(getResolvedRecommendations());
    })();
  }, []);

  async function changeStandard(next: StandardId) {
    await updateDB(db => {
      db.userProfile ??= {};
      db.userProfile.standard = next;
    });
    setStandard(next);
    setRows(getResolvedRecommendations());
  }

  async function changeSex(next: Sex) {
    await updateDB(db => {
      db.userProfile ??= {};
      db.userProfile.sex = next;
    });
    setSex(next);
    setRows(getResolvedRecommendations());
  }
  async function changeAge(next: number) {
    await updateDB(db => {
      db.userProfile ??= {};
      db.userProfile.age = next;
    });
    setAge(next);
    setRows(getResolvedRecommendations());
  }


  async function updateValue(id: string, value: number) {
    await updateDB(db => {
      db.nutrientOverrides[id] = value;
    });
    setRows(getResolvedRecommendations());
  }

  async function resetAll() {
    await updateDB(db => {
      db.nutrientOverrides = {};
    });
    setRows(getResolvedRecommendations());
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold">Recommended Intake</h1>

      {/* Controls */}
      <div className="flex gap-3">
        <select
          value={standard}
          onChange={e => changeStandard(e.target.value as StandardId)}
          className="p-2 rounded bg-neutral-900"
        >
          <option value="fda_dv_2024">FDA Daily Values</option>
          <option value="usda_dri">USDA DRI (Age / Sex)</option>
        </select>
        <select
          value={sex}
          onChange={e => changeSex(e.target.value as Sex)}
          className="p-2 rounded bg-neutral-900"
        >
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>

        <input
          type="number"
          min={1}
          max={120}
          value={age}
          onChange={e => changeAge(Number(e.target.value))}
          className="p-2 w-20 rounded bg-neutral-900 text-right"
        />
      </div>

      {/* Nutrients */}
      <div className="space-y-3">
        {rows.map(r => (
          <div
            key={r.id}
            className="flex items-center justify-between gap-3 bg-neutral-900 p-3 rounded"
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
              onChange={e => updateValue(r.id, Number(e.target.value))}
              className="w-24 p-2 rounded bg-neutral-800 text-right"
            />
          </div>
        ))}
      </div>

      <button
        onClick={resetAll}
        className="w-full p-3 rounded bg-neutral-700 text-sm"
      >
        Restore Defaults
      </button>
    </div>
  );
}
