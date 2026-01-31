// lib/localStore.ts
// Cross-platform local persistence:
// - Web: localStorage
// - Mobile (React Native / Expo): AsyncStorage

let AsyncStorage: any = null;

const isWeb =
  typeof window !== "undefined" &&
  typeof window.localStorage !== "undefined";

if (!isWeb) {
  try {
    AsyncStorage =
      require("@react-native-async-storage/async-storage").default;
  } catch {
    AsyncStorage = null;
  }
}

const KEY = "nutrition_app_db";

export async function loadLocalDB<T>(): Promise<T | null> {
  if (isWeb) {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  }

  if (AsyncStorage) {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  }

  return null;
}

export async function saveLocalDB<T>(data: T): Promise<void> {
  const serialized = JSON.stringify(data);

  if (isWeb) {
    window.localStorage.setItem(KEY, serialized);
    return;
  }

  if (AsyncStorage) {
    await AsyncStorage.setItem(KEY, serialized);
  }
}
