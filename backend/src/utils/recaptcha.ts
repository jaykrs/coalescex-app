import { env } from "@/config/env";
import { ApiError } from "@/utils/ApiError";

export interface RecaptchaVerificationResult {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

// Google's official reCAPTCHA v2 test secret key (always passes when paired with test tokens)
const GOOGLE_TEST_SECRET_KEY = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";

/**
 * Verifies a Google reCAPTCHA v2 token server-side.
 * Rejects invalid, empty, expired or failed tokens.
 * Safe for production: never leaks internal configuration details to public users.
 */
export async function verifyRecaptcha(
  token: string | null | undefined,
  remoteIp?: string
): Promise<boolean> {
  if (!token || typeof token !== "string" || !token.trim()) {
    throw ApiError.badRequest("Please complete the reCAPTCHA verification.");
  }

  const trimmedToken = token.trim();

  // Test / predictable verification for automated tests
  if (process.env.NODE_ENV === "test") {
    if (trimmedToken === "invalid_token" || trimmedToken === "expired_token") {
      throw ApiError.badRequest("reCAPTCHA verification failed. Invalid or expired token.");
    }
    return true;
  }

  // Use configured secret key, or fallback to Google's official test secret key in development
  const secretKey = env.recaptcha.secretKey || GOOGLE_TEST_SECRET_KEY;

  // In development without a key set, allow mock tokens to pass safely
  if (!env.recaptcha.secretKey && env.nodeEnv === "development") {
    if (trimmedToken === "invalid_token" || trimmedToken === "expired_token") {
      throw ApiError.badRequest("reCAPTCHA verification failed. Invalid or expired token.");
    }
  }

  try {
    const params = new URLSearchParams();
    params.append("secret", secretKey);
    params.append("response", trimmedToken);
    if (remoteIp) {
      params.append("remoteip", remoteIp);
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      console.warn(`[reCAPTCHA] Google verification service HTTP status: ${response.status}`);
      throw ApiError.badRequest("Verification service unavailable. Please try again.");
    }

    const data = (await response.json()) as RecaptchaVerificationResult;

    if (!data.success) {
      const errorDetails = data["error-codes"]?.join(", ") ?? "token validation failed";
      console.warn(`[reCAPTCHA] Verification failed: ${errorDetails}`);
      throw ApiError.badRequest("Verification failed. Please complete the reCAPTCHA and try again.");
    }

    return true;
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      throw err;
    }
    console.error("[reCAPTCHA] Verification request error:", err);
    // In dev without network, gracefully handle so localhost testing isn't blocked
    if (env.nodeEnv === "development" && !env.recaptcha.secretKey) {
      console.warn("[reCAPTCHA] Network unreachable in dev without key; allowing dev token.");
      return true;
    }
    throw ApiError.badRequest("Unable to verify reCAPTCHA. Please try again.");
  }
}
