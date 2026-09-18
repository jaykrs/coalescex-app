/**
 * Course Hero & Outcomes Template Generator
 * 
 * Supports dynamic course data (Title, Subtitle, Category, Instructor, Pricing, Lessons)
 * and responsive layout positions for Course Hero:
 * - none: Pure dark Coursera gradient banner (exact screenshot match)
 * - right: Featured course image on the right (above/beside Tuition Card)
 * - left: Featured course image on the left, copy in center, Tuition Card on right
 * - center: Prominent featured image in the center
 * - bg: Full-bleed cover image with dark cinematic gradient overlay
 */

export type TemplatePosition = "none" | "left" | "right" | "center" | "bg";

export interface TemplateOption {
  id: TemplatePosition;
  label: string;
  description: string;
  html: string;
}

export interface DynamicHeroData {
  title?: string;
  subtitle?: string;
  categoryName?: string;
  level?: string;
  language?: string;
  price?: string | number;
  discountPrice?: string | number;
  instructorName?: string;
  instructorInitials?: string;
  lessonCount?: number;
  enrollmentCount?: number;
  imageUrl?: string;
  position?: TemplatePosition;
}

/**
 * Builds a dynamic, fully responsive, dark Coursera-style Hero HTML string
 * incorporating the Tuition & Enrollment card and the chosen image position.
 */
export function buildDynamicHeroHtml(data: DynamicHeroData): string {
  const position = data.position || "none";
  const title = data.title || "AI & Software Engineering Masterclass";
  const subtitle =
    data.subtitle ||
    "Master practical full-stack architectures, real-world deployment, and system design.";
  const categoryName = data.categoryName || "CATO";
  const level = data.level || "Advanced";
  const language = data.language?.toUpperCase() || "EN";
  const price = data.price ? String(data.price) : "230";
  const discountPrice = data.discountPrice ? String(data.discountPrice) : "199.97";
  const instructorName = data.instructorName || "Dev Nishant";
  const instructorInitials =
    data.instructorInitials ||
    instructorName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    "DN";
  const lessonCount = data.lessonCount ?? 0;
  const enrollmentCount = data.enrollmentCount ?? 0;
  const imageUrl =
    data.imageUrl ||
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80";

  // Calculate discount percent
  let discountBadge = "";
  if (discountPrice && price && Number(price) > Number(discountPrice)) {
    const percent = Math.round(
      ((Number(price) - Number(discountPrice)) / Number(price)) * 100
    );
    discountBadge = `<span style="background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: 700; font-family: sans-serif;">${percent}% OFF</span>`;
  }

  // Common Tuition Card HTML
  const tuitionCardHtml = `
    <div style="background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(51, 65, 85, 0.8); border-radius: 18px; padding: 28px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6); backdrop-filter: blur(12px); color: #ffffff; width: 100%; box-sizing: border-box;">
      <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; display: block; margin-bottom: 8px;">
        COURSE TUITION
      </span>
      <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
        ${
          discountPrice
            ? `
          <span style="font-size: 36px; font-weight: 800; font-family: monospace; color: #ffffff; letter-spacing: -0.02em;">₹${discountPrice}</span>
          <span style="font-size: 18px; color: #94a3b8; text-decoration: line-through; font-family: monospace;">₹${price}</span>
          ${discountBadge}
        `
            : `
          <span style="font-size: 36px; font-weight: 800; font-family: monospace; color: #ffffff; letter-spacing: -0.02em;">₹${price}</span>
        `
        }
      </div>
      <a href="#enroll" style="display: block; width: 100%; text-align: center; background: #2563eb; color: #ffffff; padding: 14px 20px; border-radius: 12px; font-size: 16px; font-weight: 700; text-decoration: none; box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.4); margin-bottom: 22px; box-sizing: border-box; transition: background 0.2s;">
        Enroll / Add to cart
      </a>
      <div style="border-top: 1px solid #1e293b; padding-top: 18px; display: flex; flex-direction: column; gap: 12px; font-size: 13px; color: #cbd5e1;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 16px;">♾️</span>
          <span>Full lifetime access to curriculum</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 16px;">📱</span>
          <span>Access on mobile, tablet, and desktop</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 16px;">📜</span>
          <span>Verified Certificate of Completion</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 16px;">🛡️</span>
          <span>Direct instructor mentorship &amp; community</span>
        </div>
      </div>
    </div>
  `;

  // Badges Header
  const badgesHtml = `
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 18px;">
      <span style="background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(96, 165, 250, 0.3); color: #93c5fd; padding: 4px 14px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
        🏷️ ${categoryName}
      </span>
      <span style="background: rgba(30, 41, 59, 0.8); border: 1px solid #334155; color: #cbd5e1; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 500;">
        📶 ${level}
      </span>
      <span style="background: rgba(30, 41, 59, 0.8); border: 1px solid #334155; color: #cbd5e1; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 500;">
        🌐 ${language}
      </span>
    </div>
  `;

  // Metadata Footer Line
  const metadataHtml = `
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 14px; font-size: 14px; color: #cbd5e1; border-top: 1px solid rgba(30, 41, 59, 0.8); padding-top: 18px;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 32px; height: 32px; border-radius: 9999px; background: #2563eb; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; text-transform: uppercase;">
          ${instructorInitials}
        </div>
        <span style="font-weight: 600; color: #ffffff;">Taught by ${instructorName}</span>
      </div>
      <span style="color: #64748b;">•</span>
      <span>📚 <strong>${lessonCount}</strong> Lessons</span>
      <span style="color: #64748b;">•</span>
      <span>👥 <strong>${enrollmentCount}</strong> Learners Enrolled</span>
      <span style="color: #64748b;">•</span>
      <span>📜 Shareable Certificate</span>
    </div>
  `;

  // --- 1. NONE: Pure Dark Gradient (Exact screenshot match) ---
  if (position === "none") {
    return `<div data-hero-position="none" style="background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%); padding: 52px 36px; border-radius: 20px; border: 1px solid #1e293b; color: #ffffff; box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);">
  <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 36px;">
    <div style="flex: 1 1 540px; min-width: 300px;">
      ${badgesHtml}
      <h1 style="font-size: 44px; font-weight: 800; color: #ffffff; line-height: 1.15; margin: 0 0 16px 0; letter-spacing: -0.02em;">
        ${title}
      </h1>
      <p style="font-size: 18px; color: #cbd5e1; line-height: 1.6; margin: 0 0 24px 0; max-width: 680px;">
        ${subtitle}
      </p>
      ${metadataHtml}
    </div>
    <div style="flex: 0 1 380px; width: 100%; max-width: 400px;">
      ${tuitionCardHtml}
    </div>
  </div>
</div>`;
  }

  // --- 2. RIGHT: Image Right (above/beside Tuition Card) ---
  if (position === "right") {
    return `<div data-hero-position="right" style="background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%); padding: 52px 36px; border-radius: 20px; border: 1px solid #1e293b; color: #ffffff; box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);">
  <div style="display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 36px;">
    <div style="flex: 1 1 520px; min-width: 300px;">
      ${badgesHtml}
      <h1 style="font-size: 42px; font-weight: 800; color: #ffffff; line-height: 1.15; margin: 0 0 16px 0; letter-spacing: -0.02em;">
        ${title}
      </h1>
      <p style="font-size: 18px; color: #cbd5e1; line-height: 1.6; margin: 0 0 24px 0; max-width: 680px;">
        ${subtitle}
      </p>
      ${metadataHtml}
    </div>
    <div style="flex: 0 1 380px; width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
      <div style="border-radius: 16px; overflow: hidden; border: 1px solid rgba(51, 65, 85, 0.8); box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);">
        <img src="${imageUrl}" alt="${title}" style="width: 100%; height: 210px; object-fit: cover; display: block;" />
      </div>
      ${tuitionCardHtml}
    </div>
  </div>
</div>`;
  }

  // --- 3. LEFT: Image Left (Image on left, copy center, Tuition right) ---
  if (position === "left") {
    return `<div data-hero-position="left" style="background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%); padding: 52px 36px; border-radius: 20px; border: 1px solid #1e293b; color: #ffffff; box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);">
  <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 32px;">
    <div style="flex: 0 1 320px; width: 100%; max-width: 340px;">
      <div style="border-radius: 16px; overflow: hidden; border: 1px solid rgba(51, 65, 85, 0.8); box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5);">
        <img src="${imageUrl}" alt="${title}" style="width: 100%; height: 280px; object-fit: cover; display: block;" />
      </div>
    </div>
    <div style="flex: 1 1 380px; min-width: 280px;">
      ${badgesHtml}
      <h1 style="font-size: 38px; font-weight: 800; color: #ffffff; line-height: 1.15; margin: 0 0 14px 0; letter-spacing: -0.02em;">
        ${title}
      </h1>
      <p style="font-size: 16px; color: #cbd5e1; line-height: 1.6; margin: 0 0 20px 0;">
        ${subtitle}
      </p>
      ${metadataHtml}
    </div>
    <div style="flex: 0 1 360px; width: 100%; max-width: 380px;">
      ${tuitionCardHtml}
    </div>
  </div>
</div>`;
  }

  // --- 4. CENTER: Image Center (Hero Title, Center Image, Tuition split) ---
  if (position === "center") {
    return `<div data-hero-position="center" style="background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%); padding: 52px 36px; border-radius: 20px; border: 1px solid #1e293b; color: #ffffff; box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);">
  <div style="text-align: center; max-width: 800px; margin: 0 auto 28px;">
    <div style="display: flex; justify-content: center;">
      ${badgesHtml}
    </div>
    <h1 style="font-size: 44px; font-weight: 800; color: #ffffff; line-height: 1.15; margin: 0 0 16px 0; letter-spacing: -0.02em;">
      ${title}
    </h1>
    <p style="font-size: 18px; color: #cbd5e1; line-height: 1.6; margin: 0 auto; max-width: 680px;">
      ${subtitle}
    </p>
  </div>
  <div style="max-width: 820px; margin: 0 auto 36px; border-radius: 16px; overflow: hidden; border: 1px solid rgba(51, 65, 85, 0.8); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);">
    <img src="${imageUrl}" alt="${title}" style="width: 100%; height: 320px; object-fit: cover; display: block;" />
  </div>
  <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 32px; max-width: 960px; margin: 0 auto;">
    <div style="flex: 1 1 420px; min-width: 280px;">
      ${metadataHtml}
    </div>
    <div style="flex: 0 1 380px; width: 100%; max-width: 400px;">
      ${tuitionCardHtml}
    </div>
  </div>
</div>`;
  }

  // --- 5. BG: Full Cover Background Image with Dark Overlay ---
  return `<div data-hero-position="bg" style="position: relative; background: linear-gradient(rgba(2, 6, 23, 0.88), rgba(15, 23, 42, 0.94)), url('${imageUrl}') center/cover no-repeat; padding: 56px 36px; border-radius: 20px; border: 1px solid #334155; color: #ffffff; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
  <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 36px;">
    <div style="flex: 1 1 540px; min-width: 300px;">
      ${badgesHtml}
      <h1 style="font-size: 44px; font-weight: 800; color: #ffffff; line-height: 1.15; margin: 0 0 16px 0; letter-spacing: -0.02em;">
        ${title}
      </h1>
      <p style="font-size: 18px; color: #e2e8f0; line-height: 1.6; margin: 0 0 24px 0; max-width: 680px;">
        ${subtitle}
      </p>
      ${metadataHtml}
    </div>
    <div style="flex: 0 1 380px; width: 100%; max-width: 400px;">
      ${tuitionCardHtml}
    </div>
  </div>
</div>`;
}

/**
 * Pre-rendered default HERO_TEMPLATES for instant selection in the Instructor Editor
 */
export const HERO_TEMPLATES: Record<TemplatePosition, TemplateOption> = {
  none: {
    id: "none",
    label: "Pure Dark Gradient (Default Coursera Style)",
    description: "Matches the sleek dark navy gradient with badges, typography, instructor initials, and right-side tuition card.",
    html: buildDynamicHeroHtml({ position: "none" }),
  },
  right: {
    id: "right",
    label: "Image Position: Right (Featured Image Above Tuition Card)",
    description: "Displays your course image prominently above the Tuition & Enrollment card on the right side.",
    html: buildDynamicHeroHtml({ position: "right" }),
  },
  left: {
    id: "left",
    label: "Image Position: Left (Course Image on Left, Tuition on Right)",
    description: "Presents a 3-part layout: Course preview image on the left, copy & details in the center, and Tuition card on the right.",
    html: buildDynamicHeroHtml({ position: "left" }),
  },
  center: {
    id: "center",
    label: "Image Position: Center (Prominent Center Showcase)",
    description: "Centers the course headline with a wide preview image banner, with metadata and Tuition card positioned below.",
    html: buildDynamicHeroHtml({ position: "center" }),
  },
  bg: {
    id: "bg",
    label: "Image Position: Background (Full-Bleed Cover with Dark Overlay)",
    description: "Uses your course image as a full background banner with an elegant dark gradient overlay.",
    html: buildDynamicHeroHtml({ position: "bg" }),
  },
};

export const OUTCOME_TEMPLATES: Record<TemplatePosition, TemplateOption> = {
  center: {
    id: "center",
    label: "Image Center (Centered Outcomes)",
    description: "Centered learning outcomes header, key checklist badges, and central outcome illustration.",
    html: `<div data-outcome-position="center" style="text-align: center; padding: 42px 24px; background: #fcfcfd; border: 1px solid #e2e8f0; border-radius: 16px; margin: 16px 0;">
  <span style="display: inline-block; padding: 4px 14px; background: #fef3c7; color: #b45309; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
    🎯 Course Outcomes
  </span>
  <h2 style="font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0;">
    What You Will Accomplish by the End of this Course
  </h2>
  <p style="font-size: 16px; color: #64748b; max-width: 620px; margin: 0 auto 28px; line-height: 1.6;">
    Clear, measurable learning achievements designed to boost your professional portfolio and technical confidence.
  </p>
  <div style="max-width: 640px; margin: 0 auto 32px; border-radius: 12px; overflow: hidden; box-shadow: 0 12px 24px rgba(0, 0, 0, 0.07); border: 1px solid #e2e8f0;">
    <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&auto=format&fit=crop&q=80" alt="Course Outcome Center Preview" style="width: 100%; height: auto; display: block;" />
  </div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; text-align: left; max-width: 780px; margin: 0 auto;">
    <div style="padding: 16px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px;">
      <strong style="color: #0f172a; display: block; margin-bottom: 4px;">✅ Full Stack Mastery</strong>
      <span style="font-size: 14px; color: #64748b;">Build and deploy complete end-to-end full-stack applications autonomously.</span>
    </div>
    <div style="padding: 16px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px;">
      <strong style="color: #0f172a; display: block; margin-bottom: 4px;">✅ Production Deployment</strong>
      <span style="font-size: 14px; color: #64748b;">Implement CI/CD, containerization, and cloud database migrations with zero downtime.</span>
    </div>
    <div style="padding: 16px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px;">
      <strong style="color: #0f172a; display: block; margin-bottom: 4px;">✅ Clean Architecture</strong>
      <span style="font-size: 14px; color: #64748b;">Master scalable folder patterns, authentication, API security, and state management.</span>
    </div>
    <div style="padding: 16px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px;">
      <strong style="color: #0f172a; display: block; margin-bottom: 4px;">✅ Verified Certificate</strong>
      <span style="font-size: 14px; color: #64748b;">Earn an industry-accredited certificate upon completing assignments and assessments.</span>
    </div>
  </div>
</div>`,
  },

  left: {
    id: "left",
    label: "Image Left (Outcomes Checklist)",
    description: "Outcome graphic/certificate on the left, clear checklist of skills and competencies on the right.",
    html: `<div data-outcome-position="left" style="display: flex; flex-wrap: wrap; align-items: center; gap: 32px; padding: 36px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; margin: 16px 0;">
  <div style="flex: 1 1 320px; max-width: 440px;">
    <div style="border-radius: 14px; overflow: hidden; box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
      <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80" alt="Course Outcomes Left Preview" style="width: 100%; height: auto; display: block;" />
    </div>
  </div>
  <div style="flex: 1 1 360px;">
    <span style="display: inline-block; padding: 4px 12px; background: #ecfdf5; color: #047857; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
      Key Learning Outcomes
    </span>
    <h2 style="font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 16px 0; line-height: 1.3;">
      Real Skills You Will Take Away
    </h2>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 15px; color: #334155; line-height: 1.5;">
        <span style="color: #10b981; font-weight: 700; font-size: 18px;">✓</span>
        <span><strong>Architect scalable systems</strong> from database models to responsive frontend interfaces.</span>
      </li>
      <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 15px; color: #334155; line-height: 1.5;">
        <span style="color: #10b981; font-weight: 700; font-size: 18px;">✓</span>
        <span><strong>Write secure, production-grade code</strong> adhering to industry best practices and lint standards.</span>
      </li>
      <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 15px; color: #334155; line-height: 1.5;">
        <span style="color: #10b981; font-weight: 700; font-size: 18px;">✓</span>
        <span><strong>Build hands-on portfolio capstones</strong> that stand out in technical interviews and code screenings.</span>
      </li>
      <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 15px; color: #334155; line-height: 1.5;">
        <span style="color: #10b981; font-weight: 700; font-size: 18px;">✓</span>
        <span><strong>Gain verified certification</strong> to display on your LinkedIn and engineering resume.</span>
      </li>
    </ul>
  </div>
</div>`,
  },

  right: {
    id: "right",
    label: "Image Right (Outcomes Checklist)",
    description: "Checklist of skills and competencies on the left, outcome graphic/diagram on the right.",
    html: `<div data-outcome-position="right" style="display: flex; flex-wrap: wrap; align-items: center; gap: 32px; padding: 36px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; margin: 16px 0;">
  <div style="flex: 1 1 360px;">
    <span style="display: inline-block; padding: 4px 12px; background: #eff6ff; color: #1d4ed8; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
      Skills &amp; Deliverables
    </span>
    <h2 style="font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 16px 0; line-height: 1.3;">
      Tangible Results from Day One
    </h2>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 15px; color: #334155; line-height: 1.5;">
        <span style="color: #3b82f6; font-weight: 700; font-size: 18px;">✓</span>
        <span><strong>Practical Problem Solving:</strong> Tackle real-world engineering challenges with confidence.</span>
      </li>
      <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 15px; color: #334155; line-height: 1.5;">
        <span style="color: #3b82f6; font-weight: 700; font-size: 18px;">✓</span>
        <span><strong>Full-Stack Fluency:</strong> Integrate RESTful APIs, database schemas, and modern UI components seamlessly.</span>
      </li>
      <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 15px; color: #334155; line-height: 1.5;">
        <span style="color: #3b82f6; font-weight: 700; font-size: 18px;">✓</span>
        <span><strong>Testing &amp; Deployment:</strong> Ship bug-free features with automated tests and zero-downtime deployment pipelines.</span>
      </li>
      <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 15px; color: #334155; line-height: 1.5;">
        <span style="color: #3b82f6; font-weight: 700; font-size: 18px;">✓</span>
        <span><strong>Career Acceleration:</strong> Unlock higher paying positions and senior engineering career tracks.</span>
      </li>
    </ul>
  </div>
  <div style="flex: 1 1 320px; max-width: 440px;">
    <div style="border-radius: 14px; overflow: hidden; box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
      <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80" alt="Course Outcomes Right Preview" style="width: 100%; height: auto; display: block;" />
    </div>
  </div>
</div>`,
  },

  bg: {
    id: "bg",
    label: "Background Image (Milestones Banner)",
    description: "Milestone achievements displayed on a background cover banner.",
    html: `<div data-outcome-position="bg" style="position: relative; background: linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.92)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80') center/cover no-repeat; padding: 48px 24px; border-radius: 16px; text-align: center; color: #ffffff; margin: 16px 0;">
  <span style="display: inline-block; padding: 4px 14px; background: rgba(59, 130, 246, 0.25); border: 1px solid rgba(96, 165, 250, 0.4); color: #93c5fd; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
    Milestone Outcomes
  </span>
  <h2 style="font-size: 28px; font-weight: 800; color: #ffffff; margin: 0 0 12px 0;">
    Skills &amp; Capabilities You Will Graduate With
  </h2>
  <p style="font-size: 16px; color: #e2e8f0; max-width: 600px; margin: 0 auto 32px; line-height: 1.6;">
    Engineered for high-performing tech careers, team leadership, and autonomous problem-solving.
  </p>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; text-align: left; max-width: 820px; margin: 0 auto;">
    <div style="padding: 16px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 10px;">
      <span style="font-size: 20px; display: block; margin-bottom: 6px;">⚡</span>
      <strong style="color: #ffffff; display: block; margin-bottom: 4px;">High-Performance Code</strong>
      <span style="font-size: 13px; color: #cbd5e1;">Optimize bottlenecks, database indexes, and frontend render loops.</span>
    </div>
    <div style="padding: 16px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 10px;">
      <span style="font-size: 20px; display: block; margin-bottom: 6px;">🛡️</span>
      <strong style="color: #ffffff; display: block; margin-bottom: 4px;">Enterprise Security</strong>
      <span style="font-size: 13px; color: #cbd5e1;">Implement JWT, RBAC, encrypted sessions, and OWASP protections.</span>
    </div>
    <div style="padding: 16px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 10px;">
      <span style="font-size: 20px; display: block; margin-bottom: 6px;">📦</span>
      <strong style="color: #ffffff; display: block; margin-bottom: 4px;">Cloud Infrastructure</strong>
      <span style="font-size: 13px; color: #cbd5e1;">Deploy to Vercel, Docker, AWS, and serverless edge runtimes.</span>
    </div>
    <div style="padding: 16px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 10px;">
      <span style="font-size: 20px; display: block; margin-bottom: 6px;">🎓</span>
      <strong style="color: #ffffff; display: block; margin-bottom: 4px;">Verifiable Credentials</strong>
      <span style="font-size: 13px; color: #cbd5e1;">Receive digital badges and verifiable PDF completion certificates.</span>
    </div>
  </div>
</div>`,
  },
  none: {
    id: "none",
    label: "Centered Text Checklist",
    description: "Standard text checklist without image requirement.",
    html: `<div data-outcome-position="none" style="text-align: center; padding: 36px 20px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; margin: 16px 0;">
  <span style="display: inline-block; padding: 4px 14px; background: #ecfdf5; color: #047857; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
    🎯 Learning Outcomes
  </span>
  <h2 style="font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0;">
    What You Will Learn &amp; Master
  </h2>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; text-align: left; max-width: 800px; margin: 24px auto 0;">
    <div style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;">
      <strong style="color: #0f172a; display: block; margin-bottom: 4px;">✅ End-to-End Projects</strong>
      <span style="font-size: 14px; color: #64748b;">Build complete production apps from scratch to cloud deployment.</span>
    </div>
    <div style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;">
      <strong style="color: #0f172a; display: block; margin-bottom: 4px;">✅ Best Industry Practices</strong>
      <span style="font-size: 14px; color: #64748b;">Write clean, maintainable, and thoroughly tested software.</span>
    </div>
  </div>
</div>`,
  },
};

export function buildDynamicOutcomeHtml({
  position,
  imageUrl,
}: {
  position: TemplatePosition;
  imageUrl?: string;
}): string {
  if (!position || !OUTCOME_TEMPLATES[position]) return "";
  let html = OUTCOME_TEMPLATES[position].html;
  if (imageUrl && imageUrl.trim()) {
    html = html.replace(/src="https:\/\/images\.unsplash\.com\/[^"]+"/g, `src="${imageUrl.trim()}"`);
    html = html.replace(/url\('https:\/\/images\.unsplash\.com\/[^']+'\)/g, `url('${imageUrl.trim()}')`);
  }
  return html;
}

export function detectHeroPosition(html?: string | null): TemplatePosition | "" {
  if (!html) return "";
  const match = html.match(/data-hero-position="(none|right|left|center|bg)"/);
  if (match) return match[1] as TemplatePosition;
  if (html.includes("COURSE TUITION")) {
    if (html.includes("max-width: 820px")) return "center";
    if (html.includes("flex: 0 1 320px")) return "left";
    if (html.includes("flex: 0 1 380px") && html.includes("object-fit: cover")) return "right";
    if (html.includes("center/cover")) return "bg";
    return "none";
  }
  return "";
}

export function detectOutcomePosition(html?: string | null): TemplatePosition | "" {
  if (!html) return "";
  const match = html.match(/data-outcome-position="(none|center|left|right|bg)"/);
  if (match) return match[1] as TemplatePosition;
  if (html.includes("Course Outcomes Right Preview") || html.includes("Skills &amp; Deliverables")) return "right";
  if (html.includes("Course Outcomes Left Preview") || html.includes("Key Learning Outcomes")) return "left";
  if (html.includes("Course Outcome Center Preview") || html.includes("What You Will Accomplish")) return "center";
  if (html.includes("Milestone Outcomes") || html.includes("center/cover")) return "bg";
  if (html.includes("🎯 Learning Outcomes") || html.includes("Centered Text Checklist")) return "none";
  return "";
}

/**
 * Course Accessories / Kit Templates
 */
export const ACCESSORY_TEMPLATES: Record<TemplatePosition, TemplateOption> = {
  center: {
    id: "center",
    label: "Image Center (Included Kit & Gear)",
    description: "Centered accessory kit showcase with highlighted physical or digital inclusions.",
    html: `<div data-accessory-position="center" style="padding: 36px 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; margin: 16px 0; text-align: center;">
  <span style="display: inline-block; padding: 4px 14px; background: #fdf2f8; color: #db2777; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
    🎁 Course Accessories &amp; Perks
  </span>
  <h2 style="font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0;">
    What Comes Included With Your Course
  </h2>
  <p style="font-size: 15px; color: #64748b; max-width: 620px; margin: 0 auto 28px; line-height: 1.6;">
    Everything you need to succeed — from curated hardware toolkits to exclusive software access and project assets.
  </p>
  <div style="max-width: 640px; margin: 0 auto 32px; border-radius: 14px; overflow: hidden; box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
    <img src="https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=1000&auto=format&fit=crop&q=80" alt="Course Accessories Center Preview" style="width: 100%; height: auto; display: block;" />
  </div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; text-align: left; max-width: 800px; margin: 0 auto;">
    <div style="padding: 16px; background: #fdf2f8; border: 1px solid #fbcfe8; border-radius: 10px;">
      <span style="font-size: 20px; display: block; margin-bottom: 6px;">📦</span>
      <strong style="color: #9d174d; display: block; margin-bottom: 4px;">Hardware &amp; Starter Kit</strong>
      <span style="font-size: 13px; color: #475569;">Hands-on component package delivered right to your address.</span>
    </div>
    <div style="padding: 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px;">
      <span style="font-size: 20px; display: block; margin-bottom: 6px;">🔑</span>
      <strong style="color: #1e40af; display: block; margin-bottom: 4px;">Pro Software Licenses</strong>
      <span style="font-size: 13px; color: #475569;">Free 1-year premium access to developer IDEs and cloud hosting credits.</span>
    </div>
    <div style="padding: 16px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px;">
      <span style="font-size: 20px; display: block; margin-bottom: 6px;">📚</span>
      <strong style="color: #065f46; display: block; margin-bottom: 4px;">Exclusive Study Guides</strong>
      <span style="font-size: 13px; color: #475569;">Detailed physical manuals, quick reference cheat sheets, and architecture blueprints.</span>
    </div>
  </div>
</div>`,
  },

  left: {
    id: "left",
    label: "Image Left (Accessories Inclusions)",
    description: "Kit photograph on the left, bulleted list of inclusions and accessories on the right.",
    html: `<div data-accessory-position="left" style="display: flex; flex-wrap: wrap; align-items: center; gap: 32px; padding: 36px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; margin: 16px 0;">
  <div style="flex: 1 1 320px; max-width: 440px;">
    <div style="border-radius: 14px; overflow: hidden; box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
      <img src="https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=800&auto=format&fit=crop&q=80" alt="Course Accessories Left Preview" style="width: 100%; height: auto; display: block;" />
    </div>
  </div>
  <div style="flex: 1 1 360px;">
    <span style="display: inline-block; padding: 4px 12px; background: #fdf2f8; color: #db2777; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
      Package Inclusions
    </span>
    <h2 style="font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 16px 0; line-height: 1.3;">
      Complete Learner Kit &amp; Inclusions
    </h2>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 15px; color: #334155; line-height: 1.5;">
        <span style="color: #db2777; font-weight: 700; font-size: 18px;">✓</span>
        <span><strong>Official Course Kit:</strong> High-grade hardware and practice accessories dispatched upon enrollment.</span>
      </li>
      <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 15px; color: #334155; line-height: 1.5;">
        <span style="color: #db2777; font-weight: 700; font-size: 18px;">✓</span>
        <span><strong>Pro Software Toolkit:</strong> Cloud credits, premium IDE licenses, and starter code repositories.</span>
      </li>
      <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 15px; color: #334155; line-height: 1.5;">
        <span style="color: #db2777; font-weight: 700; font-size: 18px;">✓</span>
        <span><strong>Printed Workbook:</strong> Comprehensive step-by-step project guides and reference handbook.</span>
      </li>
      <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 15px; color: #334155; line-height: 1.5;">
        <span style="color: #db2777; font-weight: 700; font-size: 18px;">✓</span>
        <span><strong>VIP Community Access:</strong> Lifetime entrance to private student discussion cohorts and mentor office hours.</span>
      </li>
    </ul>
  </div>
</div>`,
  },

  right: {
    id: "right",
    label: "Image Right (Accessories Inclusions)",
    description: "Bulleted list of inclusions on the left, accessory kit image on the right.",
    html: `<div data-accessory-position="right" style="display: flex; flex-wrap: wrap; align-items: center; gap: 32px; padding: 36px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; margin: 16px 0;">
  <div style="flex: 1 1 360px;">
    <span style="display: inline-block; padding: 4px 12px; background: #eff6ff; color: #1d4ed8; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
      Bonus Gear &amp; Materials
    </span>
    <h2 style="font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 16px 0; line-height: 1.3;">
      Included Tools &amp; Accessories
    </h2>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 15px; color: #334155; line-height: 1.5;">
        <span style="color: #3b82f6; font-weight: 700; font-size: 18px;">✓</span>
        <span><strong>Comprehensive Starter Pack:</strong> All essential development kits and materials included.</span>
      </li>
      <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 15px; color: #334155; line-height: 1.5;">
        <span style="color: #3b82f6; font-weight: 700; font-size: 18px;">✓</span>
        <span><strong>Digital Asset Library:</strong> Royalty-free UI templates, Figma files, and vector icons.</span>
      </li>
      <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 15px; color: #334155; line-height: 1.5;">
        <span style="color: #3b82f6; font-weight: 700; font-size: 18px;">✓</span>
        <span><strong>Full Equipment Access:</strong> Hands-on access to lab equipment and classroom workstation setups.</span>
      </li>
    </ul>
  </div>
  <div style="flex: 1 1 320px; max-width: 440px;">
    <div style="border-radius: 14px; overflow: hidden; box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
      <img src="https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=800&auto=format&fit=crop&q=80" alt="Course Accessories Right Preview" style="width: 100%; height: auto; display: block;" />
    </div>
  </div>
</div>`,
  },

  bg: {
    id: "bg",
    label: "Background Image (Accessories Banner)",
    description: "Accessories showcase displayed across a stylish background cover.",
    html: `<div data-accessory-position="bg" style="position: relative; background: linear-gradient(rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.94)), url('https://images.unsplash.com/photo-1581291518655-9523c932edcf?w=1600&auto=format&fit=crop&q=80') center/cover no-repeat; padding: 48px 24px; border-radius: 16px; text-align: center; color: #ffffff; margin: 16px 0;">
  <span style="display: inline-block; padding: 4px 14px; background: rgba(219, 39, 119, 0.25); border: 1px solid rgba(244, 114, 182, 0.4); color: #f472b6; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
    Kit &amp; Inclusions
  </span>
  <h2 style="font-size: 28px; font-weight: 800; color: #ffffff; margin: 0 0 12px 0;">
    Premium Accessories Included in Tuition
  </h2>
  <p style="font-size: 16px; color: #e2e8f0; max-width: 600px; margin: 0 auto 32px; line-height: 1.6;">
    Accelerate your learning curve with our customized toolkit and exclusive resources.
  </p>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; text-align: left; max-width: 820px; margin: 0 auto;">
    <div style="padding: 16px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 10px;">
      <span style="font-size: 20px; display: block; margin-bottom: 6px;">🎒</span>
      <strong style="color: #ffffff; display: block; margin-bottom: 4px;">Hardware Kit</strong>
      <span style="font-size: 13px; color: #cbd5e1;">High quality components and test accessories.</span>
    </div>
    <div style="padding: 16px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 10px;">
      <span style="font-size: 20px; display: block; margin-bottom: 6px;">💻</span>
      <strong style="color: #ffffff; display: block; margin-bottom: 4px;">Pro Software</strong>
      <span style="font-size: 13px; color: #cbd5e1;">Industry standard tooling with included license keys.</span>
    </div>
    <div style="padding: 16px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 10px;">
      <span style="font-size: 20px; display: block; margin-bottom: 6px;">📖</span>
      <strong style="color: #ffffff; display: block; margin-bottom: 4px;">Curated Guides</strong>
      <span style="font-size: 13px; color: #cbd5e1;">Offline reading handbook and reference checklists.</span>
    </div>
  </div>
</div>`,
  },

  none: {
    id: "none",
    label: "Centered Text Inclusions",
    description: "Text-only checklist of included course accessories.",
    html: `<div data-accessory-position="none" style="text-align: center; padding: 36px 20px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; margin: 16px 0;">
  <span style="display: inline-block; padding: 4px 14px; background: #fdf2f8; color: #db2777; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
    🎁 Course Accessories
  </span>
  <h2 style="font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0;">
    Everything Included in This Program
  </h2>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; text-align: left; max-width: 800px; margin: 24px auto 0;">
    <div style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;">
      <strong style="color: #0f172a; display: block; margin-bottom: 4px;">✅ Specialized Hardware Kit</strong>
      <span style="font-size: 14px; color: #64748b;">Shipped directly to registered students.</span>
    </div>
    <div style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;">
      <strong style="color: #0f172a; display: block; margin-bottom: 4px;">✅ Cloud &amp; Tool Licenses</strong>
      <span style="font-size: 14px; color: #64748b;">Free premium accounts throughout the training duration.</span>
    </div>
  </div>
</div>`,
  },
};

export function buildDynamicAccessoryHtml({
  position,
  imageUrl,
}: {
  position: TemplatePosition;
  imageUrl?: string;
}): string {
  if (!position || !ACCESSORY_TEMPLATES[position]) return "";
  let html = ACCESSORY_TEMPLATES[position].html;
  if (imageUrl && imageUrl.trim()) {
    html = html.replace(/src="https:\/\/images\.unsplash\.com\/[^"]+"/g, `src="${imageUrl.trim()}"`);
    html = html.replace(/url\('https:\/\/images\.unsplash\.com\/[^']+'\)/g, `url('${imageUrl.trim()}')`);
  }
  return html;
}

export function detectAccessoryPosition(html?: string | null): TemplatePosition | "" {
  if (!html) return "";
  const match = html.match(/data-accessory-position="(none|center|left|right|bg)"/);
  if (match) return match[1] as TemplatePosition;
  if (html.includes("Course Accessories Right Preview") || html.includes("Bonus Gear &amp; Materials")) return "right";
  if (html.includes("Course Accessories Left Preview") || html.includes("Package Inclusions")) return "left";
  if (html.includes("Course Accessories Center Preview") || html.includes("What Comes Included")) return "center";
  if (html.includes("Kit &amp; Inclusions") || html.includes("Premium Accessories Included")) return "bg";
  if (html.includes("🎁 Course Accessories") || html.includes("Centered Text Inclusions")) return "none";
  return "";
}

