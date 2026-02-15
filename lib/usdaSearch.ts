//app/api/foods/search/route.ts
export type UsdaFood = {
  fdcId: number;
  description: string;
  brandName?: string | null;
  foodNutrients?: any[];
};

export async function searchUsdaFoods(term: string): Promise<UsdaFood[]> {
  const words = term.trim().toLowerCase().split(/\s+/).filter(Boolean);

  const res = await fetch(`/api/foods/search?q=${encodeURIComponent(term)}`);

  if (!res.ok) throw new Error('USDA search failed');

  const data = await res.json();

  return (data.foods ?? []).filter((food: any) =>
    words.some((w: string) => food.description?.toLowerCase().includes(w))
  ) as UsdaFood[];
}
