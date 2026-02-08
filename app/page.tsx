"use client";

import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/home");
      } else {
        setCheckingAuth(false);
      }
    });

    return () => unsub();
  }, [router]);

  async function login() {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  async function signup() {
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  async function loginWithGoogle() {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  if (checkingAuth) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Welcome back
        </h1>

        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {error && (
          <p className="mt-3 text-sm text-destructive text-center">{error}</p>
        )}

        <div className="mt-6 space-y-3">
          <button
            onClick={login}
            disabled={loading}
            className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            Log in
          </button>

          <button
            onClick={signup}
            disabled={loading}
            className="w-full rounded-lg border py-2 text-sm font-medium disabled:opacity-60"
          >
            Create account
          </button>
        </div>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          onClick={loginWithGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium disabled:opacity-60"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.07 1.53 7.47 2.8l5.45-5.45C33.64 3.95 29.3 2 24 2 14.73 2 6.78 7.3 2.96 14.96l6.64 5.16C11.2 13.36 17.1 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.5 24c0-1.57-.14-3.08-.4-4.5H24v9h12.7c-.55 2.96-2.18 5.47-4.64 7.18l7.18 5.58C43.73 37.36 46.5 31.2 46.5 24z"
            />
            <path
              fill="#4A90E2"
              d="M9.6 28.12a14.5 14.5 0 010-8.24l-6.64-5.16A23.94 23.94 0 000 24c0 3.9.94 7.6 2.96 10.88l6.64-5.16z"
            />
            <path
              fill="#FBBC05"
              d="M24 46c5.3 0 9.75-1.75 13-4.74l-7.18-5.58c-1.99 1.34-4.53 2.13-5.82 2.13-6.9 0-12.8-3.86-14.4-9.38l-6.64 5.16C6.78 40.7 14.73 46 24 46z"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
}
