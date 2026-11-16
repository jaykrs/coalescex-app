export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalPageData = {
  slug: string;
  title: string;
  lastUpdated: string;
  badge?: string;
  intro: string;
  sections: LegalSection[];
};

export const legalPagesData: Record<string, LegalPageData> = {
  privacy: {
    slug: "privacy",
    title: "Privacy & Cookie Policy",
    lastUpdated: "November 2026",
    badge: "GDPR & Data Protection Compliant",
    intro:
      "This policy explains how Coalescex collects, uses, and safeguards your personal data, and describes your rights under applicable privacy regulations including GDPR, CCPA/CPRA, and ePrivacy standards.",
    sections: [
      {
        heading: "1. Information We Collect",
        paragraphs: [
          "We collect personal information that you provide voluntarily when creating an account, enrolling in courses, submitting assignments, subscribing to newsletters, or contacting our support team.",
          "The categories of information we collect include:",
        ],
        bullets: [
          "Account & Profile Data: Full name, email address, password hash, role, and profile details.",
          "Course & Assessment Records: Enrollment history, lecture completion, practice compiler submissions, quiz scores, and certificates.",
          "Payment & Transaction Data: Order IDs, PayU transaction references, amount paid, and status (we do not store raw credit/debit card numbers).",
          "Technical & Device Information: IP address, browser type, operating system, session duration, and device identifiers.",
        ],
      },
      {
        heading: "2. How We Use Your Data",
        paragraphs: [
          "We process your data only for legitimate educational and service delivery purposes, including:",
        ],
        bullets: [
          "Delivering, maintaining, and personalizing courses, video lectures, and live code practice compilers.",
          "Managing student accounts, verifying role permissions (Student, Instructor, Admin), and issuing certificates of completion.",
          "Processing payments securely and sending transactional receipts and enrollment confirmations.",
          "Communicating platform updates, masterclass notifications, and newsletter insights (subject to your consent preferences).",
          "Detecting fraudulent transactions, mitigating automated bot traffic via reCAPTCHA, and securing our infrastructure.",
        ],
      },
      {
        heading: "3. Cookie & Tracking Technologies",
        paragraphs: [
          "Coalescex uses cookies and local storage tokens to provide essential authentication, remember your preferences, analyze platform usage, and measure educational reach.",
        ],
        bullets: [
          "Strictly Necessary Cookies: Essential for maintaining your authenticated session, CSRF security, and shopping cart persistence.",
          "Functional Cookies: Remember volume preferences, transcript language settings, and interface customizations.",
          "Analytics Cookies: Help us understand which lessons learners engage with most and improve curriculum structure.",
          "Marketing Cookies: Placed only with explicit opt-in consent to introduce relevant professional development programs.",
        ],
      },
      {
        heading: "4. Data Security & Storage",
        paragraphs: [
          "We enforce industry-standard technical and operational safeguards to protect your personal data against unauthorized access, loss, alteration, or disclosure.",
          "All data transmitted between your browser and our servers is encrypted using Transport Layer Security (TLS 1.3). Sensitive credentials such as passwords are encrypted using bcrypt hashing before database persistence.",
        ],
      },
      {
        heading: "5. Your Privacy Rights",
        paragraphs: [
          "Depending on your geographic jurisdiction, you have statutory rights concerning your personal information, including:",
        ],
        bullets: [
          "Right of Access: Request a copy of the personal information we hold about you.",
          "Right to Rectification: Request correction of outdated or inaccurate personal details.",
          "Right to Erasure ('Right to be Forgotten'): Request deletion of your account and personal data subject to legal audit retention.",
          "Right to Restrict or Object: Opt out of non-essential processing, newsletter subscriptions, or marketing communications.",
          "Right to Withdraw Consent: Revoke cookie or marketing consent at any time through our Cookie Preference Center.",
        ],
      },
      {
        heading: "6. Data Retention & Third Parties",
        paragraphs: [
          "We retain personal data only for as long as necessary to fulfill the educational purposes outlined in this policy or to satisfy statutory accounting and regulatory requirements.",
          "We do not sell, rent, or trade your personal information. Data may be shared with trusted service providers strictly bound by confidentiality (e.g. payment processors like PayU and cloud infrastructure providers).",
        ],
      },
      {
        heading: "7. Contact Our Data Protection Team",
        paragraphs: [
          "If you have questions, concerns, or wish to exercise any of your privacy rights, please reach out to our privacy team at privacy@coalescex.com.",
        ],
      },
    ],
  },

  "payment-protection-policy": {
    slug: "payment-protection-policy",
    title: "Payment Protection Policy",
    lastUpdated: "October 2026",
    badge: "Secure Transactions & Payment Safety",
    intro:
      "Coalescex is dedicated to providing a transparent, safe, and dependable payment experience. This policy explains our security standards, payment verification, dispute handling, and transaction safety guidelines.",
    sections: [
      {
        heading: "1. Purpose and Scope",
        paragraphs: [
          "This policy applies to all monetary transactions made through Coalescex, including course enrollments, masterclass passes, certification exam fees, and offline bootcamp registrations.",
          "By completing a purchase on our platform, you agree to the payment and protection terms set forth herein.",
        ],
      },
      {
        heading: "2. Payment Security and Encryption",
        paragraphs: [
          "All checkout operations are encrypted using bank-grade SSL/TLS 256-bit encryption. Coalescex does not capture, store, or view your sensitive payment card numbers or net banking passwords.",
          "Payment processing is handled through regulated, PCI-DSS compliant payment gateways (including PayU). All authentication steps (including 3D Secure OTP checks) are handled directly between your issuing bank and the payment processor.",
        ],
        bullets: [
          "Always verify that checkout takes place on our secure domain (https://coalescex.com).",
          "Never disclose OTPs, banking passwords, or card PINs to anyone claiming to be a Coalescex representative.",
          "Coalescex staff will never ask for your card details or banking credentials over email, chat, or phone.",
        ],
      },
      {
        heading: "3. Order Confirmation and Invoicing",
        paragraphs: [
          "Upon successful transaction authorization, your enrolled course is immediately attached to your student account dashboard.",
          "A formal digital receipt including Order ID, Transaction Reference, and breakdown of fees is dispatched to your registered email address.",
          "Please retain your Order ID and transaction confirmation for future reference and support queries.",
        ],
      },
      {
        heading: "4. Failed, Pending, or Duplicate Payments",
        paragraphs: [
          "Occasionally, banking networks experience temporary communication interruptions. If your account has been debited but your enrollment status remains pending:",
        ],
        bullets: [
          "Payment Gateway Reconciliation: Gateways routinely reconcile pending transactions within 24 to 48 hours.",
          "Automatic Auto-Reversal: If the transaction is declined by our payment gateway, the debited amount is automatically reversed to your original payment method by your issuing bank within 3 to 7 working days.",
          "Duplicate Charges: If you were debited twice for a single order due to a network glitch, contact our billing team with your bank statement reference, and the excess charge will be refunded promptly.",
        ],
      },
      {
        heading: "5. Refunds and Cancellations Guidelines",
        paragraphs: [
          "We offer transparent refund and cancellation options in accordance with our published Refund Policy.",
          "Eligible refund requests must be initiated within the designated window. Once approved, refunds are credited back to the original source account used during checkout.",
        ],
      },
      {
        heading: "6. Unrecognised or Suspicious Transactions",
        paragraphs: [
          "If you notice an unfamiliar charge labeled 'Coalescex' or 'Teqto Education' on your bank statement that you did not authorize:",
        ],
        bullets: [
          "Immediately contact your bank or card issuer to secure your payment instrument.",
          "Notify our security and compliance team at billing@coalescex.com with the transaction date, amount, and reference code.",
          "We will investigate the transaction log and cooperate with banking authorities to resolve the unauthorized activity.",
        ],
      },
      {
        heading: "7. Third-Party Payment Providers",
        paragraphs: [
          "When you choose payment options such as UPI, net banking, or digital wallets, you interact directly with your chosen financial institution or provider under their respective terms and service agreements.",
        ],
      },
      {
        heading: "8. Billing Support Contact",
        paragraphs: [
          "For any transaction status updates or payment verification questions, please contact billing@coalescex.com or support@coalescex.com.",
        ],
      },
    ],
  },

  "refund-policy": {
    slug: "refund-policy",
    title: "Refund & Cancellation Policy",
    lastUpdated: "November 2026",
    badge: "100% Transparent Refund Guarantee",
    intro:
      "At Coalescex, we stand behind the quality of our professional learning programs. This policy details our clear, student-friendly refund terms, cancellation windows, and reimbursement procedures.",
    sections: [
      {
        heading: "1. Overview & Satisfaction Guarantee",
        paragraphs: [
          "We want you to be completely satisfied with your educational investment. If a program does not meet your expectations, we offer structured refund options based on the course format and enrollment timeline.",
        ],
      },
      {
        heading: "2. Self-Paced Online Courses (7-Day Money-Back Guarantee)",
        paragraphs: [
          "For self-paced online courses, you are eligible for a 100% full refund if requested within 7 calendar days from the date of purchase, provided that:",
        ],
        bullets: [
          "You have accessed or completed less than 25% of the course curriculum or video modules.",
          "You have not attempted or submitted final course assessments or certification exams.",
          "You have not requested or received a formal Certificate of Completion for the course.",
        ],
      },
      {
        heading: "3. Live Bootcamps & Virtual Cohort Programs",
        paragraphs: [
          "Because live cohort programs have limited seats and dedicated instructor allocation, the following cancellation schedule applies:",
        ],
        bullets: [
          "Cancellation 7 or more days prior to cohort kickoff: 100% refund of tuition fees paid.",
          "Cancellation between 3 to 6 days prior to cohort kickoff: 80% refund (20% covers administrative setup and seat reservation).",
          "Cancellation less than 3 days prior to kickoff or after cohort commencement: Tuition is non-refundable; however, you may request a free transfer of your enrollment to the subsequent cohort.",
        ],
      },
      {
        heading: "4. Non-Refundable Items & Conditions",
        paragraphs: [
          "The following items and circumstances are non-refundable under any conditions:",
        ],
        bullets: [
          "Completed courses where a Certificate of Completion has already been generated or claimed.",
          "Courses with more than 25% progress logged in your student learning portal.",
          "Digital cheat sheets, offline course slides, or downloadable proprietary source code packs once downloaded.",
          "Discounted bundle purchases or promotional coupon licenses explicitly designated as final sale at checkout.",
        ],
      },
      {
        heading: "5. How to Request a Refund",
        paragraphs: [
          "Requesting a refund is simple and requires no complicated paperwork:",
        ],
        bullets: [
          "Step 1: Send an email to billing@coalescex.com from your registered account email.",
          "Step 2: Include your Order ID, Course Title, and a brief explanation of why you are requesting a refund.",
          "Step 3: Our student support team will review your account progress within 1 to 2 business days and issue an approval notification.",
        ],
      },
      {
        heading: "6. Reimbursement Method & Processing Timelines",
        paragraphs: [
          "All approved refunds are credited exclusively to the original payment method used during checkout (credit card, debit card, UPI, or net banking).",
          "Once processed by our finance team, banking gateways (PayU / partner banks) typically reflect the credit in your account within 5 to 7 business days.",
        ],
      },
      {
        heading: "7. Course Transfers & Credit Options",
        paragraphs: [
          "If you are unable to continue a course due to personal or professional schedule changes, you may elect to convert your enrollment into store credit or transfer your seat to another course of equal value at zero penalty.",
        ],
      },
      {
        heading: "8. Billing & Refund Support",
        paragraphs: [
          "If you have questions regarding an existing refund request or need billing clarification, our team is available at billing@coalescex.com and support@coalescex.com.",
        ],
      },
    ],
  },
};

// Aliases for slug flexibility
legalPagesData["privacy-policy"] = legalPagesData["privacy"];
legalPagesData["payment-policy"] = legalPagesData["payment-protection-policy"];
legalPagesData["refund"] = legalPagesData["refund-policy"];

export function getLegalPage(slug: string): LegalPageData | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return legalPagesData[normalized];
}

export function getAllLegalSlugs(): string[] {
  return Object.keys(legalPagesData);
}
