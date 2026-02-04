// lib/types/food.ts
export type Food = {
  id: string;
  term: string;
  name: string;
  nutrients: Record<string, number>;
};
