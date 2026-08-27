"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();

  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl tracking-tight text-brand-700">
          Northfield<span className="text-accent">.</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/courses" className="hover:text-brand-600">Courses</Link>

          {user?.role === "STUDENT" && (
            <>
              <Link href="/dashboard" className="hover:text-brand-600">My Learning</Link>
              <Link href="/cart" className="relative hover:text-brand-600">
                Cart
                {items.length > 0 && (
                  <span className="absolute -right-3 -top-2 rounded-full bg-accent px-1.5 text-[10px] text-white">
                    {items.length}
                  </span>
                )}
              </Link>
            </>
          )}

          {user?.role === "INSTRUCTOR" && (
            <Link href="/instructor/courses" className="hover:text-brand-600">Instructor Panel</Link>
          )}

          {user?.role === "ADMIN" && (
            <Link href="/admin" className="hover:text-brand-600">Admin Panel</Link>
          )}

          {user ? (
            <button onClick={() => logout()} className="rounded border border-line px-3 py-1.5 hover:bg-paper">
              Sign out
            </button>
          ) : (
            <>
              <Link href="/login" className="hover:text-brand-600">Sign in</Link>
              <Link href="/register" className="rounded bg-brand-600 px-3 py-1.5 text-white hover:bg-brand-700">
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
