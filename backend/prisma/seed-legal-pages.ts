
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const legalPages = [
  {
    slug: "gdpr",
    title: "GDPR & Data Protection",
    lastUpdated: "October 2026",
    content: [
      {
        heading: "1. What Is GDPR?",
        paragraphs: [
          "The General Data Protection Regulation (GDPR) is a European Union data protection law governing the processing of personal data within its scope. It establishes rules for handling personal information and provides rights to individuals whose data is covered by the regulation.",
        ],
      },
      {
        heading: "2. Personal Data We May Process",
        paragraphs: [
          "Depending on how you use our services, personal data may include:",
          "The information actually collected depends on the services and features you use.",
        ],
        bullets: [
          "Contact information, such as your name and email address.",
          "Account and learning activity information.",
          "Transaction and payment-related records.",
          "Technical information, such as device, browser, and website usage data.",
          "Cookie and analytics information, subject to applicable consent requirements.",
        ],
      },
      {
        heading: "3. Why Personal Data May Be Used",
        paragraphs: [
          "Personal data may be processed to provide and maintain services, manage accounts, process transactions, respond to enquiries, protect platform security, meet legal obligations, and improve website performance. Where required, consent is requested before processing data for optional analytics or marketing purposes.",
        ],
      },
      {
        heading: "4. Your Data Protection Rights",
        paragraphs: [
          "Depending on your location and applicable law, you may have the right to:",
          "These rights are subject to applicable legal conditions and exceptions.",
        ],
        bullets: [
          "Request access to your personal data.",
          "Request correction of inaccurate information.",
          "Request deletion of personal data in applicable circumstances.",
          "Request restriction of or object to certain processing.",
          "Request a portable copy of certain data.",
          "Withdraw consent where processing relies on consent.",
          "Lodge a complaint with a competent data protection authority.",
        ],
      },
      {
        heading: "5. Cookies and Consent",
        paragraphs: [
          "Our website may use cookies and similar technologies for essential functionality, preferences, analytics, and marketing. Where required, optional technologies should only be activated after appropriate consent has been obtained. You can review the website's cookie information and available preferences on our Privacy & Cookie Policy page.",
          "Read Privacy & Cookie Policy: /privacy",
        ],
      },
      {
        heading: "6. Data Retention and Security",
        paragraphs: [
          "Personal data should be retained only for as long as necessary for the relevant purposes or as required by law. Appropriate technical and organisational safeguards should be used to help protect personal data against unauthorised access, loss, or misuse. No method of storage or transmission can be guaranteed to be completely secure.",
        ],
      },
      {
        heading: "7. Contact About Your Data",
        paragraphs: [
          "To ask a question or submit a request concerning your personal data, contact privacy@coalescex.com.",
          "Please avoid including passwords, payment card details, or other sensitive information in your initial email.",
        ],
      },
    ],
  },
  {
    slug: "payment-protection-policy",
    title: "Payment Protection Policy",
    lastUpdated: "October 2026",
    content: [
      {
        heading: "1. Purpose of This Policy",
        paragraphs: [
          "Coalescex aims to provide a clear and reliable payment experience for users purchasing its products or services. This policy describes general payment safety practices and the steps users can take if a payment is delayed, unsuccessful, duplicated, or appears unfamiliar.",
        ],
      },
      {
        heading: "2. Payment Security",
        paragraphs: [
          "When making a payment, use the official Coalescex website and follow the instructions displayed during checkout. If a payment is handled by an external payment provider, its payment page and applicable security and privacy terms may also apply.",
        ],
        bullets: [
          "Keep your account credentials and one-time passwords private.",
          "Check the payment amount and order details before confirming.",
          "Do not share card details, banking passwords, PINs, or OTPs with anyone claiming to provide support.",
          "Use only payment links and instructions obtained through official Coalescex channels.",
        ],
      },
      {
        heading: "3. Payment Confirmation",
        paragraphs: [
          "After completing a transaction, check the checkout result and any confirmation provided by Coalescex or your payment provider. Keep your transaction reference, order details, and payment receipt until the transaction has been resolved.",
          "A debit shown by your bank does not always mean that an order has been successfully confirmed. If the payment status is unclear, verify it before attempting another payment.",
        ],
      },
      {
        heading: "4. Failed, Pending, or Duplicate Payments",
        paragraphs: [
          "If your payment fails, remains pending, or you believe you were charged more than once, first check your order status and bank or payment-provider statement.",
          "Resolution times depend on the payment method, provider, bank, and circumstances of the transaction.",
        ],
        bullets: [
          "Save the transaction reference and relevant payment details.",
          "Check whether the original order has been confirmed before retrying.",
          "Contact the appropriate payment provider or bank if the transaction remains unresolved.",
          "Contact Coalescex through its official support channel with your order reference if the issue relates to your order.",
        ],
      },
      {
        heading: "5. Refunds and Cancellations",
        paragraphs: [
          "Refund eligibility, cancellation conditions, and processing timelines depend on the applicable product or service terms and Coalescex's published refund policy. Please review those terms before requesting a refund.",
          "If you need help with a refund, keep your order number and payment reference available. Any approved refund may take additional time to appear in your account, depending on your payment provider or bank.",
        ],
      },
      {
        heading: "6. Unrecognised or Suspicious Transactions",
        paragraphs: [
          "If you notice a payment you do not recognise, contact your bank or payment provider promptly using its official contact details. Follow its instructions to secure your account or dispute the transaction, where appropriate.",
          "You may also notify Coalescex through its official support channel if you believe the transaction is connected to your Coalescex account or order. Never send passwords, PINs, or OTPs in a support request.",
        ],
      },
      {
        heading: "7. Third-Party Payment Providers",
        paragraphs: [
          "Some payment services may be provided by external payment processors, banks, or other financial service providers. Their own terms, privacy notices, security procedures, and dispute processes may apply to the services they provide.",
        ],
      },
      {
        heading: "8. Policy Updates",
        paragraphs: [
          "This policy may be updated when payment processes, services, or applicable requirements change. The published version should be reviewed for the latest information.",
        ],
      },
      {
        heading: "9. Questions or Payment Support",
        paragraphs: [
          "For payment-related questions, use the official Coalescex support contact published on the website. Include your order reference when relevant, but do not send full card numbers, passwords, PINs, or one-time passwords.",
        ],
      },
    ],
  },
];

async function main() {
  for (const item of legalPages) {
    const page = await prisma.legalPage.upsert({
      where: { slug: item.slug },
      create: {
        slug: item.slug,
        title: item.title,
        lastUpdated: item.lastUpdated,
        content: item.content as Prisma.InputJsonValue,
      },
      update: {
        title: item.title,
        lastUpdated: item.lastUpdated,
        content: item.content as Prisma.InputJsonValue,
      },
    });

    console.log(`Saved legal page: ${page.slug} — ${page.title}`);
  }

  console.log("Legal page seed completed.");
}

main()
  .catch((error) => {
    console.error("Failed to seed legal pages:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
