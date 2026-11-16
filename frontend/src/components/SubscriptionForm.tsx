"use client";

import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { api } from "@/lib/api-client";

// Production reCAPTCHA v2 site key
const PRODUCTION_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  "6Lc9LhAuAAAAAKaT8xBl2lyq3xHLtHFRcbKhDvUa";

// Google's official reCAPTCHA test key (guaranteed to work on localhost without domain errors)
const LOCALHOST_TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

interface SubscriptionFormProps {
  className?: string;
  onSuccess?: () => void;
}

export function SubscriptionForm({ className = "", onSuccess }: SubscriptionFormProps) {
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [activeSiteKey, setActiveSiteKey] = useState<string>(PRODUCTION_SITE_KEY);
  const [isMounted, setIsMounted] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Automatically use localhost test key when running locally to avoid Google's "Invalid domain" error on localhost
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const isLocal =
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname.endsWith(".local");

      // If on localhost and NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not explicitly set, use the localhost test key
      if (isLocal && !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        setActiveSiteKey(LOCALHOST_TEST_SITE_KEY);
      } else {
        setActiveSiteKey(PRODUCTION_SITE_KEY);
      }
    }
  }, []);

  const validateEmail = (val: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setInfoMessage(null);

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!captchaToken) {
      setErrorMessage("Please complete the verification checkbox above.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/subscriptions", {
        email: trimmedEmail,
        captchaToken,
      });

      const data = response.data;

      if (data.alreadySubscribed) {
        setInfoMessage(data.message || "This email is already subscribed to our newsletter.");
      } else {
        setSuccessMessage(
          data.message || "Thank you for subscribing! Your subscription has been received."
        );
      }

      // Reset form on success
      setEmail("");
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      // Log technical error details to console only — never leak raw backend errors to public users
      console.error("[Newsletter Subscription Error]:", err);

      const serverMsg = err?.response?.data?.error?.message;
      if (serverMsg && typeof serverMsg === "string" && !serverMsg.includes("internal") && !serverMsg.includes("secret")) {
        setErrorMessage(serverMsg);
      } else {
        setErrorMessage("Unable to process subscription right now. Please try again later.");
      }

      // Reset CAPTCHA on failure
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
        {/* 1. EMAIL INPUT (First) */}
        <div>
          <label htmlFor="newsletter-email" className="block text-xs font-semibold text-gray-700 mb-1.5">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder="name@example.com"
            disabled={loading}
            required
            className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition shadow-xs disabled:opacity-60"
            aria-label="Email address for subscription"
          />
        </div>

        {/* 2. RECAPTCHA WIDGET (Before the subscribe button) */}
        <div className="pt-0.5 pb-1">
          <div className="overflow-x-auto flex justify-start min-h-[78px]">
            {isMounted ? (
              <ReCAPTCHA
                key={activeSiteKey}
                ref={recaptchaRef}
                sitekey={activeSiteKey}
                onChange={(token) => {
                  setCaptchaToken(token);
                  if (token && errorMessage === "Please complete the verification checkbox above.") {
                    setErrorMessage(null);
                  }
                }}
                onExpired={() => setCaptchaToken(null)}
                onErrored={() => {
                  console.warn("[reCAPTCHA] Widget encountered a loading or network issue.");
                }}
              />
            ) : (
              <div className="h-[78px] w-[304px] rounded-md bg-paper border border-line flex items-center justify-center text-xs text-muted">
                Loading verification...
              </div>
            )}
          </div>
        </div>

        {/* 3. CLEAN INLINE FEEDBACK MESSAGES (Subtle and non-intrusive) */}
        {errorMessage && (
          <p className="text-xs font-medium text-danger flex items-center gap-1.5" role="alert">
            <span aria-hidden="true">•</span>
            <span>{errorMessage}</span>
          </p>
        )}

        {successMessage && (
          <div className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-900 flex items-center gap-2">
            <span aria-hidden="true">✓</span>
            <span>{successMessage}</span>
          </div>
        )}

        {infoMessage && (
          <div className="rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 text-xs text-blue-900 flex items-center gap-2">
            <span aria-hidden="true">ℹ</span>
            <span>{infoMessage}</span>
          </div>
        )}

        {/* 4. SUBSCRIBE BUTTON (Placed AFTER the reCAPTCHA widget) */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 active:scale-[0.99] transition shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <span>Subscribing…</span>
            </>
          ) : (
            <span>Subscribe to Newsletter</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default SubscriptionForm;
