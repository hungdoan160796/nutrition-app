import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

function logoutHandler () {
  signOut(auth);
  window.location.href = "/"; // Redirect to login page
}

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t border-[var(--border)]">
      <div className="max-w-md mx-auto flex justify-around py-3">
        <Link href="/">Home</Link>
        <Link href="/log">Log</Link>
        <Link href="/history">History</Link>
        <Link href="/recommendations">Recommendations</Link>
        <Link href="/add">Add</Link>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </nav>
  );
}
