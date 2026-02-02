import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "nutrition_app_db";

export async function loadLocalDB<T>(): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn("Failed to load local DB:", err);
    return null;
  }
}

export async function saveLocalDB<T>(data: T): Promise<void> {
  try {
    const serialized = JSON.stringify(data);
    await AsyncStorage.setItem(KEY, serialized);
  } catch (err) {
    console.warn("Failed to save local DB:", err);
  }
}
