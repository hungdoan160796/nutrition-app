// lib/getClientKeys.ts
export function getClientKeys() {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('nutrition_app_api_keys');
  return raw ? JSON.parse(raw) : null;
}
