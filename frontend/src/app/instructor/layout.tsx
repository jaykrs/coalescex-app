import { RequireRole } from "@/components/RequireRole";

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  return <RequireRole role="INSTRUCTOR">{children}</RequireRole>;
}
