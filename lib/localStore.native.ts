import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "nutrition_app_db";

export async function loadLocalDB<T>() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function saveLocalDB<T>(data: T) {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
}
