// app/settings/page.tsx
'use client';

import { useEffect, useState } from 'react';

type Keys = {
  usdaApiKey: string;
  openaiApiKey: string;
};

const STORAGE_KEY = 'nutrition_app_api_keys';

export default function SettingsPage() {
  const [keys, setKeys] = useState<Keys>({
    usdaApiKey: '',
    openaiApiKey: '',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setKeys(JSON.parse(stored));
    }
  }, []);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          USDA API Key
        </label>
        <input
          type="password"
          className="border rounded px-3 py-2 w-full"
          value={keys.usdaApiKey}
          onChange={(e) =>
            setKeys({ ...keys, usdaApiKey: e.target.value })
          }
          placeholder="Enter USDA API key"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          OpenAI API Key
        </label>
        <input
          type="password"
          className="border rounded px-3 py-2 w-full"
          value={keys.openaiApiKey}
          onChange={(e) =>
            setKeys({ ...keys, openaiApiKey: e.target.value })
          }
          placeholder="Enter OpenAI API key"
        />
      </div>

      <button
        onClick={save}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Save Keys
      </button>

      {saved && (
        <p className="text-sm text-green-600">
          Keys saved locally
        </p>
      )}

      <p className="text-xs text-gray-500">
        Keys are stored locally in your browser only.
      </p>
    </div>
  );
}
