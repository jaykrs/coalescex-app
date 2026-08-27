"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { ProgressRing } from "@/components/ProgressRing";
import type { DashboardEntry } from "@/types";

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => (await api.get<{ dashboard: DashboardEntry[] }>("/progress/dashboard")).data.dashboard,
  });

  if (isLoading) return <p className="text-muted">Loading your courses…</p>;

  if (!data || data.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted">You haven't enrolled in any courses yet.</p>
        <Link href="/courses" className="mt-3 inline-block text-brand-600 underline">
          Browse the catalog
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl">My Learning</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((entry) => (
          <Link
            key={entry.course.id}
            href={`/dashboard/${entry.course.slug}`}
            className="flex items-center gap-4 rounded-lg border border-line bg-surface p-5 hover:border-brand-400"
          >
            <ProgressRing percent={entry.progressPercent} />
            <div>
              <h3 className="font-medium">{entry.course.title}</h3>
              <p className="text-sm text-muted">
                {entry.completedLessons} / {entry.totalLessons} lessons complete
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
