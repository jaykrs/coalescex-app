import type { Metadata } from "next";

type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

const API_BASE_URL =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000/api";

async function fetchCourseData(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/courses/${slug}`, {
      // Revalidate cache every 60 seconds, or fetch on demand
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.course;
  } catch (error) {
    console.error(`Failed to fetch course data for SEO [${slug}]:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const course = await fetchCourseData(slug);

  if (!course) {
    return {
      title: "Course Details | Coalescex",
      description: "Explore our industry-focused courses and training programs at Coalescex.",
    };
  }

  const seo = course.seo;
  const cleanDescription = (text?: string | null) =>
    (text || "").replace(/<[^>]*>?/gm, "").trim().slice(0, 160);

  const title =
    seo?.metaTitle?.trim() ||
    `${course.title} | Coalescex`;

  const description =
    seo?.metaDescription?.trim() ||
    course.subtitle?.trim() ||
    cleanDescription(course.description) ||
    "Master high-demand skills with professional certification at Coalescex.";

  const canonical =
    seo?.canonicalUrl?.trim() ||
    `https://coalescex.com/courses/${slug}`;

  const keywords = seo?.metaKeywords
    ? seo.metaKeywords
        .split(",")
        .map((k: string) => k.trim())
        .filter(Boolean)
    : [course.category?.name, course.level, course.type, "online training", "certification"].filter(Boolean);

  const defaultImage =
    "https://coalescex.com/wp-content/uploads/elementor/thumbs/a_student_enrolling_for_a_career_institute-qtdjrw1xr0xhzwjggjhajkbu5ecknwxvrttpl9q8q4.jpeg";

  const ogTitle = seo?.ogTitle?.trim() || title;
  const ogDescription = seo?.ogDescription?.trim() || description;
  const ogImage = seo?.ogImageUrl?.trim() || course.thumbnailUrl || defaultImage;
  const ogType = (seo?.ogType?.trim() || "website") as "website" | "article";

  const twitterCard = (seo?.twitterCard?.trim() || "summary_large_image") as
    | "summary"
    | "summary_large_image";
  const twitterTitle = seo?.twitterTitle?.trim() || ogTitle;
  const twitterDescription = seo?.twitterDescription?.trim() || ogDescription;
  const twitterImage = seo?.twitterImageUrl?.trim() || ogImage;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: "Coalescex",
      locale: "en_US",
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      images: [twitterImage],
    },
  };
}

export default async function DynamicCourseLayout({ children, params }: Props) {
  const { slug } = params;
  const course = await fetchCourseData(slug);

  let structuredDataJson: string | null = null;

  if (course) {
    if (course.seo?.structuredData) {
      structuredDataJson =
        typeof course.seo.structuredData === "string"
          ? course.seo.structuredData
          : JSON.stringify(course.seo.structuredData);
    } else {
      // Fallback default Schema.org Course definition
      const defaultCourseSchema = {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.title,
        description: course.subtitle || course.description?.slice(0, 250),
        provider: {
          "@type": "Organization",
          name: "Coalescex",
          sameAs: "https://coalescex.com",
        },
        image: course.thumbnailUrl || undefined,
        offers: {
          "@type": "Offer",
          price: course.discountPrice || course.price || "0",
          priceCurrency: "INR",
        },
      };
      structuredDataJson = JSON.stringify(defaultCourseSchema);
    }
  }

  return (
    <>
      {structuredDataJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
      )}
      {children}
    </>
  );
}
