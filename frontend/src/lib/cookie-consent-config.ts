import { CookieCategoryDefinition } from "@/types/cookie-consent";

export const COOKIE_CONSENT_KEY = "coalescex_cookie_consent";
export const COOKIE_CONSENT_VERSION = "1.0.0";
export const COOKIE_EXPIRY_DAYS = 365;

export const COOKIE_CATEGORIES: CookieCategoryDefinition[] = [
  {
    id: "necessary",
    title: "Strictly Necessary Cookies",
    shortDesc: "Essential for the website to function properly and cannot be switched off.",
    fullDesc:
      "These cookies are strictly required to provide you with basic services available through our website, such as user login, secure authentication, shopping cart items, session maintenance, and CSRF protection. Without these, core platform features would not work.",
    required: true,
    sampleCookies: [
      {
        name: "token",
        provider: "Coalescex",
        purpose: "Maintains your authenticated session and secure account login",
        expiry: "7 days",
        type: "HTTP Cookie",
      },
      {
        name: "coalescex_cookie_consent",
        provider: "Coalescex",
        purpose: "Stores your cookie consent preferences and consent choices",
        expiry: "1 year",
        type: "HTTP Cookie",
      },
      {
        name: "cart_session",
        provider: "Coalescex",
        purpose: "Keeps track of items in your learning checkout basket",
        expiry: "Session",
        type: "Local Storage / Cookie",
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing & Advertising Cookies",
    shortDesc: "Used to show relevant ads, measure marketing campaigns, and personalize course recommendations.",
    fullDesc:
      "Marketing cookies are set through our site by advertising partners (such as Google Ads, Meta / Facebook Pixel, LinkedIn Insight Tag, and marketing automation tools). They uniquely identify your browser and device to build a profile of your interests, deliver targeted promotions, measure ad performance, prevent repetitive ads, and offer personalized course discounts. If you do not allow these cookies, you will experience less targeted advertising.",
    required: false,
    marketingNote: "Enables personalized learning course promotions, retargeting campaigns, and ad effectiveness measurement.",
    sampleCookies: [
      {
        name: "_gcl_au / _gcl_aw",
        provider: "Google Ads",
        purpose: "Conversion linker cookie used by Google to attribute ad clicks and conversions",
        expiry: "90 days",
        type: "Third-party Cookie",
      },
      {
        name: "_fbp / fr",
        provider: "Meta (Facebook)",
        purpose: "Used to deliver advertisements and track conversion events from Facebook / Instagram ads",
        expiry: "90 days",
        type: "Third-party Cookie",
      },
      {
        name: "li_sugr / bcookie",
        provider: "LinkedIn",
        purpose: "Used to track conversions and serve relevant professional education ads on LinkedIn",
        expiry: "90 days",
        type: "Third-party Cookie",
      },
      {
        name: "ide / test_cookie",
        provider: "Google DoubleClick",
        purpose: "Used to register and report user actions after viewing or clicking ads",
        expiry: "1 year",
        type: "Third-party Cookie",
      },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Performance Cookies",
    shortDesc: "Help us understand how visitors interact with the website to improve user experience.",
    fullDesc:
      "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our courses and platform. They help us know which pages are the most and least popular, and see how visitors move around the site. All information these cookies collect is aggregated and anonymous.",
    required: false,
    sampleCookies: [
      {
        name: "_ga / _ga_*",
        provider: "Google Analytics 4",
        purpose: "Distinguishes unique users and tracks page interaction metrics",
        expiry: "2 years",
        type: "First-party Cookie",
      },
      {
        name: "_gid",
        provider: "Google Analytics",
        purpose: "Stores and updates a unique value for each page visited",
        expiry: "24 hours",
        type: "First-party Cookie",
      },
    ],
  },
  {
    id: "functional",
    title: "Functional & Preference Cookies",
    shortDesc: "Enable enhanced functionality, video player settings, and personalization.",
    fullDesc:
      "These cookies enable the website to provide enhanced functionality and personalization, such as remembering your language, country selection, video playback speed, and UI preferences. If you do not allow these cookies, some or all of these features may not function properly.",
    required: false,
    sampleCookies: [
      {
        name: "video_player_prefs",
        provider: "Coalescex",
        purpose: "Remembers video playback speed and volume level across lectures",
        expiry: "1 year",
        type: "Local Storage",
      },
      {
        name: "preferred_lang",
        provider: "Coalescex",
        purpose: "Remembers language preference across pages",
        expiry: "1 year",
        type: "First-party Cookie",
      },
    ],
  },
];
