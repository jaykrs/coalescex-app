"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import type { Role } from "@/types";

export function RequireRole({ role, children }: { role: Role | Role[]; children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const allowed = Array.isArray(role) ? role : [role];

  useEffect(() => {
    if (!isLoading && (!user || !allowed.includes(user.role))) {
      router.replace(user ? "/courses" : "/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, user]);

  if (isLoading || !user || !allowed.includes(user.role)) {
    return <p className="text-muted">Loading…</p>;
  }

  return <>{children}</>;
}
