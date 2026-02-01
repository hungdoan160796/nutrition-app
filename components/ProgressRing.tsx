type Props = {
  value: number;
};

export default function ProgressRing({ value }: Props) {
  return (
    <div className="w-40 h-40 rounded-full border-8 border-[var(--border)] flex items-center justify-center">
      <div className="text-center">
        <div className="text-3xl font-bold text-[var(--foreground)]">{value}%</div>
        <div className="text-xs text-[var(--foreground)]">weekly</div>
      </div>
    </div>
  );
}
