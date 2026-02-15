"use client";

import { useState } from "react";
import { useProfile } from "@/app/providers/ProfileProvider";
import BottomNav from "@/components/BottomNav";

type Row = {
  id: string;
  unit: string;
  recommended: number;
  value: number;
  overridden: boolean;
};

export default function RecommendationsPage() {
  const { rows, profileReady, updateValue: ctxUpdateValue, resetAll: ctxResetAll } = useProfile();
  const [toast, setToast] = useState(false);

  function saved() {
    setToast(true);
    setTimeout(() => setToast(false), 1200);
  }

  async function updateValue(id: string, value: number) {
    await ctxUpdateValue(id, value);
    saved();
  }

  async function resetAll() {
    await ctxResetAll();
    saved();
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold">Recommendations</h1>

      {!profileReady && (
        <p className="text-sm text-muted-foreground">Complete your profile to edit recommendations</p>
      )}

      {profileReady && (
        <>
          <div className="space-y-3">
            {rows.map((r: Row) => (
              <div
                key={r.id}
                className="flex items-center justify-between gap-3 bg-[var(--muted)] p-3 rounded"
              >
                <div>
                  <div className="font-medium capitalize">{r.id.replace("_", " ")}</div>
                  <div className="text-xs text-neutral-400">Default: {r.recommended} {r.unit}</div>
                </div>

                <input
                  type="number"
                  value={r.value}
                  onChange={(e) => updateValue(r.id, Number(e.target.value))}
                  className="w-24 p-2 rounded bg-[var(--muted)] text-right"
                />
              </div>
            ))}
          </div>

          <button onClick={resetAll} className="w-full p-3 rounded bg-[var(--muted)] text-sm">
            Restore Defaults
          </button>
        </>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/80 px-4 py-2 text-sm text-white z-50">Saved!</div>
      )}

      <BottomNav />
    </div>
  );
}
