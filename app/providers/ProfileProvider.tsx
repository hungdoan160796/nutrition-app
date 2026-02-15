"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProviders";
import { initDB, getDB, updateDB } from "@/lib/db";
import { getResolvedRecommendations } from "@/lib/recommendationResolver";

type StandardId = "fda_dv_2024" | "usda_dri";
type Sex = "male" | "female";

export type UserProfile = {
  recommendationSet?: StandardId;
  sex?: Sex;
  age?: number;
  openaiApiKey?: string;
  theme: string;
};

type Row = {
  id: string;
  unit: string;
  recommended: number;
  value: number;
  overridden: boolean;
};

type ProfileContextType = {
  profile?: UserProfile;
  rows: Row[];
  loading: boolean;
  profileReady: boolean;
  load: () => Promise<void>;
  saveProfile: (next: { recommendationSet: StandardId; sex: Sex; age: number; theme: string }) => Promise<void>;
  saveOpenaiApiKey: (key: string) => Promise<void>;
  updateValue: (id: string, value: number) => Promise<void>;
  resetAll: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType>({
  rows: [],
  loading: true,
  profileReady: false,
  load: async () => {},
  saveProfile: async () => {},
  saveOpenaiApiKey: async () => {},
  updateValue: async () => {},
  resetAll: async () => {},
});

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | undefined>(undefined);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileReady, setProfileReady] = useState(false);
async function load() {
  if (!user) {
    setProfile(undefined);
    setRows([]);
    setProfileReady(false);
    setLoading(false);
    return;
  }

  setLoading(true);
  await initDB();
  const db = await getDB();

  const stored = db.userProfile;
  const normalized: UserProfile | undefined = stored
    ? {
        recommendationSet: stored.recommendationSet,
        sex: stored.sex,
        age: stored.age,
        openaiApiKey: stored.openaiApiKey,
        theme: stored.theme ?? "",
      }
    : undefined;

  setProfile(normalized);
  setRows(await getResolvedRecommendations());

  setProfileReady(
    !!(
      normalized?.recommendationSet &&
      normalized?.sex &&
      typeof normalized?.age === "number"
    )
  );

  setLoading(false);
}

  useEffect(() => {
    // load when auth becomes available
    (async () => {
      if (!authLoading) {
        await load();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.uid]);

async function saveProfile(next: {
  recommendationSet: StandardId;
  sex: Sex;
  age: number;
  theme: string;
}) {
  await updateDB((db) => {
    db.userProfile = {
      ...(db.userProfile ?? {}),
      ...next,
    };
  });

  setProfile((prev) => ({
    ...(prev ?? {}),
    ...next,
  }));

  setRows(await getResolvedRecommendations());
  setProfileReady(true);
}

async function saveOpenaiApiKey(key: string) {
  await updateDB((db) => {
    db.userProfile ??= { theme: "" };
    db.userProfile.openaiApiKey = key;
  });

  setProfile((prev) => ({
    recommendationSet: prev?.recommendationSet,
    sex: prev?.sex,
    age: prev?.age,
    theme: prev?.theme ?? "",
    openaiApiKey: key,
  }));
}
  async function updateValue(id: string, value: number) {
    await updateDB((db) => {
      db.nutrientOverrides ??= {};
      db.nutrientOverrides[id] = value;
    });
    setRows(await getResolvedRecommendations());
  }

  async function resetAll() {
    await updateDB((db) => {
      db.nutrientOverrides = {};
    });
    setRows(await getResolvedRecommendations());
  }

  return (
    <ProfileContext.Provider
      value={{ profile, rows, loading, profileReady, load, saveProfile, saveOpenaiApiKey, updateValue, resetAll }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}

export default ProfileProvider;
