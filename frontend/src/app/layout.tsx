import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
import { QueryProvider } from "@/lib/query-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsentProvider } from "@/lib/cookie-consent-context";
import {
  CookieConsentBanner,
  CookiePreferencesModal,
  FloatingCookieButton,
  ConsentModeInit,
  MarketingScriptsLoader,
} from "@/components/cookies";

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://coalescex.com/#website",
      url: "https://coalescex.com/",
      name: "Coalescex",
      publisher: { "@id": "https://coalescex.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": "https://coalescex.com/#organization",
      name: "Coalescex",
      alternateName: "Teqto Education Pvt Ltd",
      url: "https://coalescex.com/",
      logo: {
        "@type": "ImageObject",
        inLanguage: "en-US",
        "@id": "https://coalescex.com/#/schema/logo/image/",
        url: "https://coalescex.com/wp-content/uploads/2024/08/logo_final.png",
        contentUrl: "https://coalescex.com/wp-content/uploads/2024/08/logo_final.png",
        width: 278,
        height: 183,
        caption: "Coalescex",
      },
      image: { "@id": "https://coalescex.com/#/schema/logo/image/" },
      sameAs: [
        "https://www.facebook.com/profile.php?id=61563415919821",
        "https://www.linkedin.com/company/103750350/admin/dashboard/",
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://coalescex.com/",
      url: "https://coalescex.com/",
      name: "Professional Development Programs | Offline & Virtual Learning at Coalescex",
      isPartOf: { "@id": "https://coalescex.com/#website" },
      about: { "@id": "https://coalescex.com/#organization" },
      description:
        "Coalescex provides a variety of professional training programs in technology, finance, animation, and management across classrooms in India and over 55 campuses",
      inLanguage: "en-US",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://coalescex.com"),
  title: {
    default: "Professional Development Programs | Offline & Virtual Learning at Coalescex",
    template: "%s | Coalescex",
  },
  description:
    "Coalescex provides a variety of professional training programs in technology, finance, animation, and management across classrooms in India and over 55 campuses",
  alternates: {
    canonical: "https://coalescex.com/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Professional Development Programs | Offline & Virtual Learning at Coalescex",
    description:
      "Coalescex provides a variety of professional training programs in technology, finance, animation, and management across classrooms in India and over 55 campuses",
    url: "https://coalescex.com/",
    siteName: "Coalescex",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://coalescex.com/wp-content/uploads/elementor/thumbs/a_student_enrolling_for_a_career_institute-qtdjrw1xr0xhzwjggjhajkbu5ecknwxvrttpl9q8q4.jpeg",
        width: 1200,
        height: 630,
        alt: "Professional Development Programs at Coalescex",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Development Programs | Offline & Virtual Learning at Coalescex",
    description:
      "Coalescex provides a variety of professional training programs in technology, finance, animation, and management across classrooms in India and over 55 campuses",
    images: [
      "https://coalescex.com/wp-content/uploads/elementor/thumbs/a_student_enrolling_for_a_career_institute-qtdjrw1xr0xhzwjggjhajkbu5ecknwxvrttpl9q8q4.jpeg",
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ConsentModeInit />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </head>
      <body>
        <QueryProvider>
          <AuthProvider>
            <CartProvider>
              <CookieConsentProvider>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <CookieConsentBanner />
                <CookiePreferencesModal />
                <FloatingCookieButton />
                <MarketingScriptsLoader />
              </CookieConsentProvider>
            </CartProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
