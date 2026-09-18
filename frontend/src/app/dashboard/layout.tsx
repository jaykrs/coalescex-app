import { RequireRole } from "@/components/RequireRole";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireRole role="STUDENT">
      <div className="mx-auto px-6 py-10">{children}</div>
    </RequireRole>
  );
}
