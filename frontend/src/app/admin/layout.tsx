"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RequireRole } from "@/components/RequireRole";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/admin", label: "Overview & Courses" },
    { href: "/admin/blogs", label: "Blog Management" },
    { href: "/admin/subscriptions", label: "Email Subscriptions" },
  ];

  return (
    <RequireRole role="ADMIN">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ink">Admin Dashboard</h1>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Manage platform courses, blog publications, and newsletter subscribers.
            </p>
          </div>
          <nav className="flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition ${
                    isActive
                      ? "bg-brand-600 text-white shadow-xs"
                      : "bg-surface text-muted hover:text-ink hover:bg-paper border border-line"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        {children}
      </div>
    </RequireRole>
  );
}
