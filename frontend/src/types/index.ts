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

export interface Course {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  description: string;
  thumbnailUrl?: string | null;
  price: string;
  discountPrice?: string | null;
  status: CourseStatus;
  level?: string | null;
  language: string;
  category: { name: string; slug: string };
  instructor: { firstName: string; lastName: string; id?: string; avatarUrl?: string | null };
  sections?: CourseSection[];
  isEnrolled?: boolean;
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
