"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export default function AdminPage() {
  const queryClient = useQueryClient();

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => (await api.get("/admin/users/stats/summary")).data,
  });

  const { data: pending } = useQuery({
    queryKey: ["admin-pending-courses"],
    queryFn: async () => (await api.get("/courses/admin/pending")).data.courses,
  });

  async function approve(id: string) {
    await api.post(`/courses/${id}/approve`);
    queryClient.invalidateQueries({ queryKey: ["admin-pending-courses"] });
  }

  async function reject(id: string) {
    await api.post(`/courses/${id}/reject`);
    queryClient.invalidateQueries({ queryKey: ["admin-pending-courses"] });
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl">Admin Panel</h1>

      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats &&
          [
            ["Students", stats.totalStudents],
            ["Instructors", stats.totalInstructors],
            ["Published courses", stats.publishedCourses],
            ["Revenue", `$${Number(stats.totalRevenue).toFixed(2)}`],
          ].map(([label, value]) => (
            <div key={label as string} className="rounded-lg border border-line bg-surface p-4">
              <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
              <p className="mt-1 font-mono text-2xl">{value}</p>
            </div>
          ))}
      </div>

      <h2 className="mb-3 text-xl">Pending course approvals</h2>
      <div className="divide-y divide-line rounded-lg border border-line">
        {pending?.map((course: any) => (
          <div key={course.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{course.title}</p>
              <p className="text-sm text-muted">
                {course.instructor.firstName} {course.instructor.lastName} · {course.instructor.email}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => approve(course.id)}
                className="rounded bg-brand-600 px-3 py-1.5 text-sm text-white hover:bg-brand-700"
              >
                Approve
              </button>
              <button
                onClick={() => reject(course.id)}
                className="rounded border border-line px-3 py-1.5 text-sm hover:bg-paper"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
        {pending?.length === 0 && <p className="p-4 text-muted">Nothing pending review.</p>}
      </div>
    </div>
  );
}
