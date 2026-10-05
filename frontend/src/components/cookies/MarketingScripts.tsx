"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { useCookieConsent } from "@/lib/cookie-consent-context";

export const DEFAULT_GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-N33YSJTGY6";

/**
 * ConsentModeInit:
 * Sets up Google Consent Mode v2 default 'denied' state in <head>
 * before any marketing or analytics tags execute.
 * Also loads the official Google tag (gtag.js) via Next.js Script.
 */
export function ConsentModeInit({
  gaId = DEFAULT_GA_ID,
}: {
  gaId?: string;
}) {
  const initScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'functionality_storage': 'denied',
      'personalization_storage': 'denied',
      'security_storage': 'granted',
      'wait_for_update': 500
    });
    gtag('js', new Date());
    ${gaId ? `gtag('config', '${gaId}', { 'debug_mode': true });` : ""}
  `;

  return (
    <>
      <script
        id="coalescex-consent-mode-init"
        dangerouslySetInnerHTML={{ __html: initScript }}
      />
      {gaId && (
        <Script
          id="coalescex-ga4-script"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        />
      )}
    </>
  );
}

/**
 * MarketingScriptsLoader:
 * Conditionally loads and triggers marketing & advertising pixels
 * (e.g. Meta / Facebook Pixel, Google Ads, GTM, LinkedIn) ONLY
 * when marketing consent is explicitly granted by the user.
 */
export function MarketingScriptsLoader({
  gtmId = process.env.NEXT_PUBLIC_GTM_ID,
  gaId = DEFAULT_GA_ID,
  metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID,
}: {
  gtmId?: string;
  gaId?: string;
  metaPixelId?: string;
}) {
  const { preferences, isMarketingAllowed } = useCookieConsent();

  // Send pageview to GA4 once user has allowed analytics or marketing
  useEffect(() => {
    if (!gaId) return;
    const canTrack = preferences?.analytics || preferences?.marketing;
    if (!canTrack) return;

    const win = window as any;
    if (typeof win.gtag === "function") {
      win.gtag("event", "page_view", {
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [preferences, gaId]);

  // Load Meta (Facebook) Pixel when marketing consent is granted
  useEffect(() => {
    if (!isMarketingAllowed || !metaPixelId) return;

    const win = window as any;
    if (win.fbq) return; // already loaded

    (function (f: any, b: any, e: any, v: any) {
      if (f.fbq) return;
      const n: any = (f.fbq = function (...args: any[]) {
        n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      const t = b.createElement(e);
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s?.parentNode?.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    win.fbq("init", metaPixelId);
    win.fbq("track", "PageView");
  }, [isMarketingAllowed, metaPixelId]);

  // Load Google Tag Manager container when either marketing or analytics is granted
  useEffect(() => {
    if (!gtmId) return;
    const canLoadGtm = preferences?.marketing || preferences?.analytics;
    if (!canLoadGtm) return;

    const win = window as any;
    if (win.__gtm_loaded) return;
    win.__gtm_loaded = true;

    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(script);
  }, [preferences, gtmId]);

  return null;
}
