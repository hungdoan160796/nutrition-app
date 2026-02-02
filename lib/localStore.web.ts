const KEY = "nutrition_app_db";

export async function loadLocalDB<T>(): Promise<T | null> {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function saveLocalDB<T>(data: T): Promise<void> {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}
