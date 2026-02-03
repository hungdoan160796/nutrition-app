// lib/addUsdaFood.ts (unchanged API, now auto-assigns group)
export async function addUsdaFood({
  food,
  measurement,
  term,
}: {
  food: any;
  measurement: string;
  term: string;
}) {
  const res = await fetch('/api/foods/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ food, measurement, term }),
  });

  if (!res.ok) {
    throw new Error('Failed to save food');
  }
}
