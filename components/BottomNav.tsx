import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t border-[var(--border)]">
      <div className="max-w-md mx-auto flex justify-around py-3">
        <Link href="/">Home</Link>
        <Link href="/log">Log</Link>
        <Link href="/history">History</Link>
        <Link href="/recommendations">Recommendations</Link>
        <Link href="/add">Add</Link>
        <Link href="/settings">Settings</Link>
      </div>
    </nav>
  );
}
