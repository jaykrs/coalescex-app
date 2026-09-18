import { RequireRole } from "@/components/RequireRole";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireRole role="ADMIN">
      <div className="mx-auto  px-6 py-10">{children}</div>
    </RequireRole>
  );
}
