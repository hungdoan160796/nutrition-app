const KEY = "nutrition_app_db";

export async function loadLocalDB<T>() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function saveLocalDB<T>(data: T) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
