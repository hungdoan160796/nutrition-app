"use client";

import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useProfile } from "@/app/providers/ProfileProvider";
import BottomNav from "@/components/BottomNav";

type StandardId = "fda_dv_2024" | "usda_dri";
type Sex = "male" | "female";

type UserProfile = {
  recommendationSet?: "fda_dv_2024" | "usda_dri";
  sex?: "male" | "female";
  age?: number;
  openaiApiKey?: string;
};

type Row = {
  id: string;
  unit: string;
  recommended: number;
  value: number;
  overridden: boolean;
};

export default function SettingsPage() {

  const [openaiApiKey, setOpenaiApiKey] = useState<string>("");

  const { profile, rows, profileReady, saveProfile: ctxSaveProfile, saveOpenaiApiKey: ctxSaveOpenaiApiKey, updateValue: ctxUpdateValue, resetAll: ctxResetAll } = useProfile();
  const [standard, setStandard] = useState<StandardId | null>(null);
  const [sex, setSex] = useState<Sex | null>(null);
  const [age, setAge] = useState<number | null>(null);
  
  const [toast, setToast] = useState(false);

  // Theme management
  const [theme, setTheme] = useState<string>("");
  const [themes, setThemes] = useState<string[]>([]);
  const THEME_REGEX = /data[-–]theme\s*=\s*"([^"]+)"/g;

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (!theme) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("theme");
      return;
    }

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const res = await fetch('/themes.md');
        if (!res.ok) return;

        const text = await res.text();
        const found = new Set<string>();
        let match: RegExpExecArray | null;

        while ((match = THEME_REGEX.exec(text))) {
          found.add(match[1]);
        }

        setThemes(Array.from(found).sort());
      } catch {}
    };

    loadThemes();
  }, []);

  function logoutHandler() {
    signOut(auth);
    window.location.href = "/";
  }

  function saved() {
    setToast(true);
    setTimeout(() => setToast(false), 1200);
  }
  // sync profile -> local state
  useEffect(() => {
    if (profile) {
      setStandard(profile.recommendationSet ?? null);
      setSex(profile.sex ?? null);
      setAge(typeof profile.age === "number" ? profile.age : null);
      setOpenaiApiKey(profile.openaiApiKey ?? "");
    }
  }, [profile]);

  async function saveProfile(next: { recommendationSet: StandardId; sex: Sex; age: number; }) {
    await ctxSaveProfile(next);
    saved();
  }

  async function saveOpenaiApiKey(next: string) {
    await ctxSaveOpenaiApiKey(next);
    setOpenaiApiKey(next);
    saved();
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
      <h1 className="text-xl font-semibold">Settings</h1>

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

        {/* OpenAI API key (stored on your profile) */}
        <input
          type="password"
          placeholder="OpenAI API key (sk-...)"
          value={openaiApiKey}
          onChange={e => setOpenaiApiKey(e.target.value)}
          onBlur={() => saveOpenaiApiKey(openaiApiKey)}
          className="p-2 rounded bg-[var(--muted)] w-full"
        />

        {/* Theme selector (moved from Home) */}
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="p-2 rounded bg-[var(--muted)] w-full"
        >
          <option value="">System</option>
          {themes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => saveOpenaiApiKey(openaiApiKey)}
            className="flex-1 p-2 rounded bg-[var(--muted)] text-sm"
          >
            Save OpenAI API Key
          </button>
          <button
            onClick={logoutHandler}
            className="flex-1 p-2 rounded bg-[var(--muted)] text-sm"
          >
            Logout
          </button>
        </div>

        {!profileReady && (
          <p className="text-sm text-muted-foreground">
            Complete your profile to see recommendations
          </p>
        )}
      </div>


      {/* Settings page — per-user profile is above. Recommendations editing removed from settings UI. */}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/80 px-4 py-2 text-sm text-white z-50">
          Saved!
        </div>
      )}
    <BottomNav />
    </div>
  );

}
