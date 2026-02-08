// This file search food on usda fetched data

import { buildFoodIndex } from "./foodIndex-1";

function intersect(a: number[], b: number[]) {
  const set = new Set(a);
  return b.filter(x => set.has(x));
}

export function searchFoods(
  query: string,
  limit = 50
) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const index = buildFoodIndex();
  const tokens = q.split(" ");

  let results: number[] | null = null;

  for (const token of tokens) {
    const matches = index.tokenMap.get(token);
    if (!matches) return [];

    results = results
      ? intersect(results, matches)
      : matches;
  }

  if (!results) return [];

  return results
    .slice(0, limit)
    .map(i => index.foods[i]);
}
