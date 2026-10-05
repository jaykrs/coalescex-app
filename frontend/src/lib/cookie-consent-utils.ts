import Cookies from "js-cookie";
import { CookieConsentPreferences } from "@/types/cookie-consent";
import { COOKIE_CONSENT_KEY, COOKIE_CONSENT_VERSION, COOKIE_EXPIRY_DAYS } from "./cookie-consent-config";

// Read consent from cookie (falling back to localStorage)
export function getStoredPreferences(): CookieConsentPreferences | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = Cookies.get(COOKIE_CONSENT_KEY) || localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;

    const parsed: CookieConsentPreferences = JSON.parse(raw);

    // Validate essential structure
    if (typeof parsed.marketing !== "boolean" || typeof parsed.analytics !== "boolean") {
      return null;
    }

    return parsed;
  } catch (err) {
    console.error("Error reading cookie consent:", err);
    return null;
  }
}

// Save consent preferences to both cookie and localStorage
export function storePreferences(
  prefs: Omit<CookieConsentPreferences, "necessary" | "timestamp" | "version">
): CookieConsentPreferences {
  const fullPrefs: CookieConsentPreferences = {
    necessary: true,
    functional: Boolean(prefs.functional),
    analytics: Boolean(prefs.analytics),
    marketing: Boolean(prefs.marketing),
    timestamp: new Date().toISOString(),
    version: COOKIE_CONSENT_VERSION,
  };

  if (typeof window !== "undefined") {
    const serialized = JSON.stringify(fullPrefs);
    try {
      Cookies.set(COOKIE_CONSENT_KEY, serialized, {
        expires: COOKIE_EXPIRY_DAYS,
        sameSite: "Lax",
        path: "/",
      });
      localStorage.setItem(COOKIE_CONSENT_KEY, serialized);
    } catch (err) {
      console.error("Error saving cookie consent:", err);
    }

    // Apply consent signals (Google Consent Mode v2 & custom events)
    applyConsentSignals(fullPrefs);
  }

  return fullPrefs;
}

// Remove stored consent (for reset / testing)
export function clearStoredPreferences(): void {
  if (typeof window === "undefined") return;
  try {
    Cookies.remove(COOKIE_CONSENT_KEY, { path: "/" });
    localStorage.removeItem(COOKIE_CONSENT_KEY);
  } catch (err) {
    console.error("Error clearing cookie consent:", err);
  }
}

// Push Google Consent Mode v2 updates and dispatch custom events
export function applyConsentSignals(prefs: CookieConsentPreferences): void {
  if (typeof window === "undefined") return;

  try {
    // 1. Update Google Consent Mode v2
    const win = window as any;
    win.dataLayer = win.dataLayer || [];

    const consentState = {
      ad_storage: prefs.marketing ? "granted" : "denied",
      ad_user_data: prefs.marketing ? "granted" : "denied",
      ad_personalization: prefs.marketing ? "granted" : "denied",
      analytics_storage: prefs.analytics ? "granted" : "denied",
      functionality_storage: prefs.functional ? "granted" : "denied",
      personalization_storage: prefs.functional ? "granted" : "denied",
      security_storage: "granted",
    };

    function gtag(...args: any[]) {
      win.dataLayer.push(arguments);
    }

    if (typeof win.gtag === "function") {
      win.gtag("consent", "update", consentState);
    } else {
      gtag("consent", "update", consentState);
      win.gtag = gtag;
    }

    // Push event to dataLayer for GTM triggers
    win.dataLayer.push({
      event: "cookie_consent_update",
      consent_marketing: prefs.marketing,
      consent_analytics: prefs.analytics,
      consent_functional: prefs.functional,
    });

    if (typeof win.gtag === "function") {
      win.gtag("event", "cookie_consent_decision", {
        marketing: prefs.marketing ? "accepted" : "rejected",
        analytics: prefs.analytics ? "accepted" : "rejected",
        functional: prefs.functional ? "accepted" : "rejected",
      });

      // If user accepted analytics or marketing, trigger page_view immediately
      if (prefs.analytics || prefs.marketing) {
        win.gtag("event", "page_view", {
          page_location: window.location.href,
          page_title: document.title,
        });
      }
    }

    // 2. Dispatch custom DOM event for custom scripts & marketing integrations
    window.dispatchEvent(
      new CustomEvent("coalescex:cookie-consent-updated", {
        detail: prefs,
      })
    );
  } catch (err) {
    console.warn("Could not dispatch consent signals:", err);
  }
}

// Helper to check if marketing cookies are currently permitted
export function isMarketingPermitted(): boolean {
  const prefs = getStoredPreferences();
  return Boolean(prefs?.marketing);
}
