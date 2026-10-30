
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const pages = [
  {
    slug: "terms",
    title: "Terms & Conditions",
    lastUpdated: "October 2026",
    content: [
      {
        heading: "1. About These Terms",
        paragraphs: [
          "These Terms & Conditions explain the general rules for accessing and using the Coalescex website and its learning services.",
          "By using the website, you agree to follow the applicable terms, policies, and instructions presented to you."
        ]
      },
      {
        heading: "2. Accounts and Responsibilities",
        paragraphs: [
          "Keep your account information accurate and protect your login credentials. You are responsible for activity performed through your account, subject to applicable law."
        ]
      },
      {
        heading: "3. Learning Content",
        paragraphs: [
          "Course descriptions, availability, prices, and learning materials may change. Do not copy, redistribute, or commercially use protected content without permission."
        ]
      },
      {
        heading: "4. Payments and Refunds",
        paragraphs: [
          "Payment terms and any applicable refund conditions are presented through the relevant purchase process and policies. Review those terms before completing a purchase."
        ]
      },
      {
        heading: "5. Acceptable Use",
        paragraphs: [
          "Do not misuse the platform, interfere with its security, attempt unauthorised access, or use the service in a way that violates applicable law."
        ]
      },
      {
        heading: "6. Contact",
        paragraphs: [
          "For questions about these terms, contact support through the Contact page."
        ]
      }
    ]
  },
  {
    slug: "press",
    title: "Press",
    lastUpdated: "October 2026",
    content: [
      {
        heading: "About Coalescex",
        paragraphs: [
          "Coalescex provides a digital learning experience designed to help learners explore skills, courses, and professional development opportunities."
        ]
      },
      {
        heading: "Press Enquiries",
        paragraphs: [
          "Journalists and media representatives can contact our team with questions about the platform, its services, or potential media coverage."
        ]
      },
      {
        heading: "Media Information",
        paragraphs: [
          "For accurate company descriptions, brand assets, or interview requests, contact the Coalescex team before publishing information that requires confirmation."
        ]
      }
    ]
  },
  {
    slug: "investors",
    title: "Investors",
    lastUpdated: "October 2026",
    content: [
      {
        heading: "About Our Platform",
        paragraphs: [
          "Coalescex is a digital learning platform focused on making educational and professional development resources accessible online."
        ]
      },
      {
        heading: "Investor Enquiries",
        paragraphs: [
          "Parties interested in business information or potential investment discussions may contact the company to request further details."
        ]
      },
      {
        heading: "Company Information",
        paragraphs: [
          "No financial results, investment offers, or company disclosures are made by this page. Any such information must be separately verified through authorised company communications."
        ]
      }
    ]
  },
  {
    slug: "help",
    title: "Help Centre",
    lastUpdated: "October 2026",
    content: [
      {
        heading: "Getting Started",
        paragraphs: [
          "Browse the course catalogue to discover learning opportunities. Course pages provide available descriptions, pricing, and other relevant details."
        ]
      },
      {
        heading: "Account Help",
        paragraphs: [
          "Use the available account sign-in and registration options to access your account. Keep your credentials private and use the account recovery options if available."
        ]
      },
      {
        heading: "Payments and Orders",
        paragraphs: [
          "Check your order details and payment confirmation when a transaction is completed. For payment concerns, review the Payment Protection Policy."
        ]
      },
      {
        heading: "Still Need Help?",
        paragraphs: [
          "Visit the Contact page to find the available way to submit your question."
        ]
      }
    ]
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    lastUpdated: "October 2026",
    content: [
      {
        heading: "Our Approach",
        paragraphs: [
          "Coalescex aims to make its website and learning experience usable by people with a range of access needs and abilities."
        ]
      },
      {
        heading: "Accessibility Features",
        paragraphs: [
          "We aim to support clear navigation, readable content, meaningful headings, and compatibility with common assistive technologies where reasonably practicable."
        ]
      },
      {
        heading: "Report an Accessibility Issue",
        paragraphs: [
          "If you encounter a barrier while using the website, contact our team and describe the page, the issue, and any assistive technology involved, if you are comfortable sharing that information."
        ]
      },
      {
        heading: "Ongoing Improvements",
        paragraphs: [
          "Accessibility is an ongoing process. Feedback helps us identify areas that may need review or improvement."
        ]
      }
    ]
  },
  {
    slug: "contact",
    title: "Contact Us",
    lastUpdated: "October 2026",
    content: [
      {
        heading: "Get in Touch",
        paragraphs: [
          "Contact Coalescex if you have a question about the website, learning services, your account, or a general enquiry."
        ]
      },
      {
        heading: "Learning and Account Questions",
        paragraphs: [
          "When asking for help, describe the issue clearly. Do not include your password, one-time password, full payment card number, or other sensitive credentials."
        ]
      },
      {
        heading: "Payment Questions",
        paragraphs: [
          "For payment-related concerns, include a relevant order reference when appropriate, but never share banking passwords, PINs, or one-time passwords."
        ]
      },
      {
        heading: "Contact Options",
        paragraphs: [
          "Use the contact or support options published on the Coalescex website. This page does not confirm a specific response time."
        ]
      }
    ]
  },
  {
    slug: "articles",
    title: "Articles",
    lastUpdated: "October 2026",
    content: [
      {
        heading: "Explore Learning Articles",
        paragraphs: [
          "Articles can help learners explore topics, understand concepts, and discover practical ideas related to professional development."
        ]
      },
      {
        heading: "Topics to Explore",
        paragraphs: [
          "Learning topics may include technology, data, business, digital skills, career development, and other areas represented in the course catalogue."
        ]
      },
      {
        heading: "Find Learning Resources",
        paragraphs: [
          "Visit the course catalogue to explore available courses and related learning opportunities."
        ]
      }
    ]
  },
  {
    slug: "directory",
    title: "Directory",
    lastUpdated: "October 2026",
    content: [
      {
        heading: "Explore Coalescex",
        paragraphs: [
          "Use this directory as a starting point for exploring the main areas of the Coalescex website."
        ]
      },
      {
        heading: "Courses",
        paragraphs: [
          "Browse the course catalogue to discover available learning options and course details."
        ]
      },
      {
        heading: "Policies and Support",
        paragraphs: [
          "Review the Privacy Policy, Terms & Conditions, GDPR & Data Protection page, and Payment Protection Policy for relevant information."
        ]
      },
      {
        heading: "Help and Contact",
        paragraphs: [
          "Visit the Help Centre or Contact page if you need assistance navigating the platform."
        ]
      }
    ]
  },
  {
    slug: "affiliates",
    title: "Affiliates",
    lastUpdated: "October 2026",
    content: [
      {
        heading: "Affiliate Enquiries",
        paragraphs: [
          "Coalescex welcomes enquiries about potential promotional and partnership opportunities related to learning and professional development."
        ]
      },
      {
        heading: "Working Together",
        paragraphs: [
          "Any proposed collaboration should clearly describe the organisation, audience, promotional approach, and expected arrangement."
        ]
      },
      {
        heading: "Contact Our Team",
        paragraphs: [
          "Use the Contact page to enquire about potential affiliate opportunities. This page does not confirm that an affiliate programme is currently active."
        ]
      }
    ]
  },
  {
    slug: "modern-slavery",
    title: "Modern Slavery Statement",
    lastUpdated: "October 2026",
    content: [
      {
        heading: "Our Commitment",
        paragraphs: [
          "Coalescex recognises the importance of respecting human rights and preventing forced labour, human trafficking, and other forms of modern slavery."
        ]
      },
      {
        heading: "Responsible Practices",
        paragraphs: [
          "We aim to conduct business responsibly and expect professional conduct in business relationships, subject to applicable requirements and the arrangements in place."
        ]
      },
      {
        heading: "Concerns and Reporting",
        paragraphs: [
          "Anyone wishing to raise a concern related to this subject can contact the company through the available Contact options."
        ]
      },
      {
        heading: "Review",
        paragraphs: [
          "This statement provides a general description of our approach. It should not be interpreted as a claim that a particular audit, certification, or statutory reporting obligation has been completed."
        ]
      }
    ]
  }
];

async function main() {
  for (const item of pages) {
    const page = await prisma.legalPage.upsert({
      where: { slug: item.slug },
      create: {
        slug: item.slug,
        title: item.title,
        lastUpdated: item.lastUpdated,
        content: item.content as Prisma.InputJsonValue
      },
      update: {
        title: item.title,
        lastUpdated: item.lastUpdated,
        content: item.content as Prisma.InputJsonValue
      }
    });

    console.log(`Saved page: ${page.slug}`);
  }

  console.log("All 10 additional pages have been seeded.");
}

main()
  .catch((error) => {
    console.error("Failed to seed additional pages:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
