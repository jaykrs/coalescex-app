"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { CookieConsentContextType, CookieConsentPreferences } from "@/types/cookie-consent";
import {
  getStoredPreferences,
  storePreferences,
  clearStoredPreferences,
  applyConsentSignals,
} from "./cookie-consent-utils";

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookieConsentPreferences | null>(null);
  const [hasDecided, setHasDecided] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState<boolean>(false);

  // Initialize consent state on client mount
  useEffect(() => {
    const existing = getStoredPreferences();
    if (existing) {
      setPreferences(existing);
      setHasDecided(true);
      setShowBanner(false);
      applyConsentSignals(existing);
    } else {
      // Delay banner display slightly so it doesn't jarringly pop during initial paint
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for custom trigger to open preferences modal (e.g. from footer link or anywhere)
  useEffect(() => {
    const handleOpen = () => setIsPreferencesOpen(true);
    window.addEventListener("coalescex:open-cookie-preferences", handleOpen);

    // Also listen to hash change for #cookies
    const handleHash = () => {
      if (window.location.hash === "#cookies" || window.location.hash === "#cookie-preferences") {
        setIsPreferencesOpen(true);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);

    return () => {
      window.removeEventListener("coalescex:open-cookie-preferences", handleOpen);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  const acceptAll = useCallback(() => {
    const updated = storePreferences({
      functional: true,
      analytics: true,
      marketing: true,
    });
    setPreferences(updated);
    setHasDecided(true);
    setShowBanner(false);
    setIsPreferencesOpen(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    const updated = storePreferences({
      functional: false,
      analytics: false,
      marketing: false,
    });
    setPreferences(updated);
    setHasDecided(true);
    setShowBanner(false);
    setIsPreferencesOpen(false);
  }, []);

  const savePreferences = useCallback(
    (prefs: { functional: boolean; analytics: boolean; marketing: boolean }) => {
      const updated = storePreferences(prefs);
      setPreferences(updated);
      setHasDecided(true);
      setShowBanner(false);
      setIsPreferencesOpen(false);
    },
    []
  );

  const openPreferences = useCallback(() => {
    setIsPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
  }, []);

  const resetConsent = useCallback(() => {
    clearStoredPreferences();
    setPreferences(null);
    setHasDecided(false);
    setShowBanner(true);
    setIsPreferencesOpen(false);
  }, []);

  const isMarketingAllowed = Boolean(preferences?.marketing);

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        hasDecided,
        showBanner,
        isPreferencesOpen,
        isMarketingAllowed,
        acceptAll,
        rejectNonEssential,
        savePreferences,
        openPreferences,
        closePreferences,
        resetConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextType {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return ctx;
}

export function useMarketingConsent(): boolean {
  const ctx = useCookieConsent();
  return ctx.isMarketingAllowed;
}
