// lib/usdaSearch.ts
export async function searchUsdaFoods(term: string) {
  const words = term.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const query = words.length <= 2 ? words.join(' ') : words.join(' ');

  const res = await fetch('/api/usda/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error('USDA proxy failed');
  }

  const data = await res.json();

  return (data.foods ?? []).filter((food: any) =>
    words.some((w) =>
      food.description?.toLowerCase().includes(w)
    )
  );
}
