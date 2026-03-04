"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("from") ?? "/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push(returnTo);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0C0F] px-6">
      {/* Logo */}
      <Link
        href="/"
        className="text-[#F0EDE8] font-bold text-xl tracking-tight hover:text-[#C49A6C] transition-colors mb-12"
      >
        EAST FREMONT DISTRICT
      </Link>

      {/* Login Card */}
      <div className="w-full max-w-sm">
        <div className="bg-[#14161B] border border-[#2A2D33] rounded-lg p-8 shadow-xl shadow-black/30">
          <h1 className="text-[#F0EDE8] text-lg font-semibold mb-1 text-center">
            Client Portal
          </h1>
          <p className="text-[#6B6760] text-sm text-center mb-8">
            Sign in to access the full district platform.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-medium uppercase tracking-wider text-[#9B978F] mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] placeholder-[#6B6760] focus:border-[#C49A6C] focus:outline-none focus:ring-1 focus:ring-[#C49A6C] transition-colors"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium uppercase tracking-wider text-[#9B978F] mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-[#24272E] border border-[#2A2D33] rounded-md px-4 py-3 text-sm text-[#F0EDE8] placeholder-[#6B6760] focus:border-[#C49A6C] focus:outline-none focus:ring-1 focus:ring-[#C49A6C] transition-colors"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-semibold bg-[#C49A6C] text-[#0F1115] rounded-md hover:bg-[#D4AA7C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-[#6B6760] text-xs mt-6">
          Need access?{" "}
          <a
            href="mailto:events@eastfremontdistrict.com"
            className="text-[#C49A6C] hover:text-[#D4AA7C] transition-colors"
          >
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}
