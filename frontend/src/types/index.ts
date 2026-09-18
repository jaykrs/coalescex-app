export type Role = "STUDENT" | "INSTRUCTOR" | "ADMIN";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatarUrl?: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  iconUrl?: string | null;
  _count?: { courses: number };
}

export type CourseStatus = "DRAFT" | "PENDING_APPROVAL" | "PUBLISHED" | "REJECTED" | "ARCHIVED";
export type CourseType = "ONLINE" | "OFFLINE" | "BOOTCAMP";

export interface CourseSeo {
  id?: string;
  courseId?: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImageUrl?: string | null;
  ogType?: string | null;
  twitterCard?: string | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImageUrl?: string | null;
  structuredData?: any;
  createdAt?: string;
  updatedAt?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  description: string;
  thumbnailUrl?: string | null;
  outcomeImageUrl?: string | null;
  accessoryImageUrl?: string | null;
  price: string;
  discountPrice?: string | null;
  status: CourseStatus;
  type: CourseType;
  level?: string | null;
  language: string;
  heroHtml?: string | null;
  outcomesHtml?: string | null;
  accessoriesHtml?: string | null;
  faqs?: { question: string; answer: string }[] | null;
  category: { name: string; slug: string };
  instructor: { firstName: string; lastName: string; id?: string; avatarUrl?: string | null };
  sections?: CourseSection[];
  seo?: CourseSeo | null;
  isEnrolled?: boolean;
  isDeleted?: boolean;
  _count?: { enrollments: number };
}

export type LessonContentType = "VIDEO" | "ARTICLE" | "PDF" | "ASSESSMENT";

export interface Lesson {
  id: string;
  title: string;
  order: number;
  contentType: LessonContentType;
  contentUrl?: string | null;
  durationSec?: number | null;
  isPreview: boolean;
  assessment?: { id: string } | null;
}

export interface CourseSection {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface CartItem {
  id: string;
  course: Course;
  addedAt: string;
}

export type QuestionType = "SINGLE_SELECT" | "MULTI_SELECT" | "TRUE_FALSE" | "FILL_BLANK";

export interface QuestionOption {
  id: string;
  text: string;
  order: number;
}

export interface AssessmentQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  order: number;
  points: number;
  options: QuestionOption[];
}

export interface Assessment {
  id: string;
  title: string;
  passPercent: number;
  questions: AssessmentQuestion[];
}

export interface DashboardEntry {
  course: { id: string; title: string; slug: string; thumbnailUrl?: string | null };
  enrolledAt: string;
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
}
