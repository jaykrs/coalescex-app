import { RequireRole } from "@/components/RequireRole";

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireRole role="INSTRUCTOR">
      <div className="mx-auto px-6 py-10">{children}</div>
    </RequireRole>
  );
}
