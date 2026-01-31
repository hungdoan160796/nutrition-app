// components/FoodRow.tsx
"use client";

type FoodRowProps = {
  food: {
    name: string;
    quantity?: number;
  };
};

export default function FoodRow({ food }: FoodRowProps) {
  return (
    <div className="flex justify-between text-sm">
      <span>{food.name}</span>
      {food.quantity && (
        <span className="text-muted-foreground">{food.quantity}</span>
      )}
    </div>
  );
}
