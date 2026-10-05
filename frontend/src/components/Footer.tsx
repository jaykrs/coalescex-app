"use client";

import Link from "next/link";
import footerData from "@/data/footer-data.json";
import { useCookieConsent } from "@/lib/cookie-consent-context";

export function Footer() {
  const { openPreferences } = useCookieConsent();
  return (
    <footer className="bg-[#F5F7FA] text-gray-700 border-t border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        {/* ROW 1: TOP 4 COLUMNS (Skills, Certificates, Courses, Career Resources) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 sm:pb-12 border-b border-gray-200">
          {footerData.topSections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-gray-700 hover:text-blue-700 hover:underline transition-colors block leading-snug"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ROW 2: BOTTOM 4 COLUMNS (Coursera, Community, More, App Badges) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10 pt-8 sm:pt-10 pb-8">
          {footerData.bottomSections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    {link.href === "#cookies" ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          openPreferences();
                        }}
                        className="text-[13px] text-gray-700 hover:text-blue-700 hover:underline transition-colors block leading-snug text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[13px] text-gray-700 hover:text-blue-700 hover:underline transition-colors block leading-snug"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* COLUMN 4: APP DOWNLOAD BUTTONS */}
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <h3 className="text-sm font-bold text-gray-900 tracking-tight sr-only">
              {footerData.appDownloads.title}
            </h3>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              {/* Apple App Store Badge */}
              <a
                href={footerData.appDownloads.appStore.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center sm:justify-start gap-3 bg-black text-white px-4 py-2.5 rounded-md hover:bg-neutral-800 transition-colors shadow-xs w-full sm:w-fit sm:min-w-[170px]"
                aria-label="Download on the App Store"
              >
                <svg
                  className="h-6 w-6 fill-current text-white shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.95 2.76 1.01.08 2.05-.51 2.67-1.26z" />
                </svg>
                <div className="text-left">
                  <span className="block text-[10px] text-neutral-300 leading-none font-normal">
                    {footerData.appDownloads.appStore.title}
                  </span>
                  <span className="block text-[14px] font-semibold text-white tracking-tight leading-tight mt-0.5">
                    {footerData.appDownloads.appStore.storeName}
                  </span>
                </div>
              </a>

              {/* Google Play Store Badge */}
              <a
                href={footerData.appDownloads.googlePlay.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center sm:justify-start gap-3 bg-black text-white px-4 py-2.5 rounded-md hover:bg-neutral-800 transition-colors shadow-xs w-full sm:w-fit sm:min-w-[170px]"
                aria-label="Get it on Google Play"
              >
                <svg
                  className="h-6 w-6 shrink-0"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#4285F4"
                    d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"
                  />
                  <path
                    fill="#34A853"
                    d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"
                  />
                  <path
                    fill="#FBBC04"
                    d="M471.1 230.3l-85.7-49.1-60.1 60.1 60.1 60.1 85.7-49.1c11.9-6.8 19.3-19.2 19.3-33.5s-7.4-26.7-19.3-33.5z"
                  />
                  <path
                    fill="#EA4335"
                    d="M325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z"
                  />
                </svg>
                <div className="text-left">
                  <span className="block text-[9px] uppercase tracking-wider text-neutral-300 leading-none font-medium">
                    {footerData.appDownloads.googlePlay.title}
                  </span>
                  <span className="block text-[14px] font-semibold text-white tracking-tight leading-tight mt-0.5">
                    {footerData.appDownloads.googlePlay.storeName}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ROW 3: BOTTOM COPYRIGHT & SOCIAL LINKS */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="text-center md:text-left">
            {footerData.bottomBar.copyright}
          </p>

          <div className="flex items-center gap-4">
            {footerData.bottomBar.socialLinks.map((social, sIdx) => (
              <a
                key={sIdx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors"
                aria-label={social.name}
              >
                {social.name === "Facebook" && (
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                  </svg>
                )}
                {social.name === "LinkedIn" && (
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                  </svg>
                )}
                {social.name === "Twitter" && (
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )}
                {social.name === "YouTube" && (
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                )}
                {social.name === "Instagram" && (
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
