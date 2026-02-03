import { getClientKeys } from './getClientKeys';

export async function searchUsdaFoods(term: string) {
  const keys = getClientKeys();
  if (!keys?.usdaApiKey) {
    throw new Error('USDA API key not set');
  }

  const words = term.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const query = words.join(' ');

  const res = await fetch('/api/usda/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-usda-key': keys.usdaApiKey,
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error('USDA search failed');

  const data = await res.json();

  return (data.foods ?? []).filter((food: any) =>
    words.some((w) => food.description?.toLowerCase().includes(w))
  );
}
