import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
import { QueryProvider } from "@/lib/query-provider";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Northfield — Learn something that sticks",
  description: "Courses built by working practitioners, with real assessments and real progress.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">{children}</main>
            </CartProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
