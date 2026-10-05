export interface CookieConsentPreferences {
  necessary: boolean; // Always true
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

export type CookieCategoryKey = "necessary" | "functional" | "analytics" | "marketing";

export interface CookieDetailItem {
  name: string;
  provider: string;
  purpose: string;
  expiry: string;
  type: string;
}

export interface CookieCategoryDefinition {
  id: CookieCategoryKey;
  title: string;
  shortDesc: string;
  fullDesc: string;
  required: boolean;
  marketingNote?: string;
  sampleCookies: CookieDetailItem[];
}

export interface CookieConsentContextType {
  preferences: CookieConsentPreferences | null;
  hasDecided: boolean;
  showBanner: boolean;
  isPreferencesOpen: boolean;
  isMarketingAllowed: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (prefs: {
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
  }) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  resetConsent: () => void;
}
