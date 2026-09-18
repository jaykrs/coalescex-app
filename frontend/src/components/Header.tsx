"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        {/* Brand Logo */}
        <Link href="/" onClick={closeMenu} className="font-display tracking-tight text-brand-700 shrink-0">
          <img
            src="/images/logo/logo_final.png"
            alt="Coalescex Logo"
            className="h-10 sm:h-12 md:h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/courses" className="text-ink hover:text-brand-600 transition font-medium">
            Courses
          </Link>

          {user?.role === "STUDENT" && (
            <>
              <Link href="/dashboard" className="text-ink hover:text-brand-600 transition font-medium">
                My Learning
              </Link>
              <Link href="/cart" className="relative text-ink hover:text-brand-600 transition font-medium">
                Cart
                {items.length > 0 && (
                  <span className="absolute -right-3 -top-2 rounded-full bg-accent px-1.5 py-0.2 text-[10px] font-bold text-white shadow-xs">
                    {items.length}
                  </span>
                )}
              </Link>
            </>
          )}

          {user?.role === "INSTRUCTOR" && (
            <Link href="/instructor/courses" className="text-ink hover:text-brand-600 transition font-medium">
              Instructor Panel
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <Link href="/admin" className="text-ink hover:text-brand-600 transition font-medium">
              Admin Panel
            </Link>
          )}

          {user ? (
            <button
              onClick={() => {
                closeMenu();
                logout();
              }}
              className="rounded-md border border-line px-3.5 py-1.5 text-sm font-medium hover:bg-paper transition cursor-pointer text-ink"
            >
              Sign out
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-ink hover:text-brand-600 transition font-medium">
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-brand-700 transition active:scale-98"
              >
                Get started
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Quick Cart on Mobile if user is logged in or items exist */}
          <Link
            href="/cart"
            onClick={closeMenu}
            className="relative p-2 text-ink hover:text-brand-600 transition"
            aria-label="View shopping cart"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {items.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                {items.length}
              </span>
            )}
          </Link>

          {/* Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-ink hover:bg-paper focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-line bg-surface px-4 pt-3 pb-6 md:hidden shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium">
            <Link
              href="/courses"
              onClick={closeMenu}
              className="rounded-md px-3 py-2.5 text-ink hover:bg-paper hover:text-brand-600 transition"
            >
              📚 Browse Courses
            </Link>

            {user?.role === "STUDENT" && (
              <>
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="rounded-md px-3 py-2.5 text-ink hover:bg-paper hover:text-brand-600 transition"
                >
                  🎓 My Learning Dashboard
                </Link>
                <Link
                  href="/cart"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-md px-3 py-2.5 text-ink hover:bg-paper hover:text-brand-600 transition"
                >
                  <span>🛒 Shopping Cart</span>
                  {items.length > 0 && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-white">
                      {items.length} items
                    </span>
                  )}
                </Link>
              </>
            )}

            {user?.role === "INSTRUCTOR" && (
              <Link
                href="/instructor/courses"
                onClick={closeMenu}
                className="rounded-md px-3 py-2.5 text-ink hover:bg-paper hover:text-brand-600 transition"
              >
                👨‍🏫 Instructor Panel
              </Link>
            )}

            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                onClick={closeMenu}
                className="rounded-md px-3 py-2.5 text-ink hover:bg-paper hover:text-brand-600 transition"
              >
                ⚡ Admin Panel
              </Link>
            )}

            <div className="pt-3 border-t border-line">
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    logout();
                  }}
                  className="w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-center text-sm font-semibold text-ink hover:bg-line/40 transition"
                >
                  Sign out ({user.firstName ? `${user.firstName} ${user.lastName}`.trim() : user.email})
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="rounded-lg border border-line bg-paper px-4 py-2.5 text-center text-sm font-semibold text-ink hover:bg-line/40 transition"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="rounded-lg bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-brand-700 transition"
                  >
                    Get started
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

