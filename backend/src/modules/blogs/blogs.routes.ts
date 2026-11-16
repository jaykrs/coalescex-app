import { Router } from "express";
import { Role } from "@prisma/client";
import { requireAuth, requireRole } from "@/middleware/auth";
import {
  createBlogSchema,
  updateBlogSchema,
  blogQuerySchema,
} from "./blogs.schema";
import * as blogService from "./blogs.service";

const router = Router();

// ============================================================================
// PUBLIC ROUTES
// ============================================================================

/**
 * GET /api/blogs/public
 * Returns paginated list of published blogs with optional search and category filters.
 */
router.get("/public", async (req, res) => {
  const query = blogQuerySchema.parse(req.query);
  const result = await blogService.listBlogs(query, true);
  res.json(result);
});

/**
 * GET /api/blogs/public/categories
 * Returns distinct categories from published blogs.
 */
router.get("/public/categories", async (_req, res) => {
  const categories = await blogService.getBlogCategories(true);
  res.json({ categories });
});

/**
 * GET /api/blogs/public/:slug
 * Returns a single published blog by its unique slug.
 */
router.get("/public/:slug", async (req, res) => {
  const blog = await blogService.getBlogBySlug(req.params.slug, true);
  res.json({ blog });
});

// ============================================================================
// ADMIN ROUTES (Protected with requireAuth and requireRole(Role.ADMIN))
// ============================================================================

/**
 * GET /api/blogs
 * Admin: List all blogs (both Draft and Published) with filters and pagination.
 */
router.get("/", requireAuth, requireRole(Role.ADMIN), async (req, res) => {
  const query = blogQuerySchema.parse(req.query);
  const result = await blogService.listBlogs(query, false);
  res.json(result);
});

/**
 * GET /api/blogs/stats
 * Admin: Summary statistics (total, published, draft, categories).
 */
router.get("/stats", requireAuth, requireRole(Role.ADMIN), async (_req, res) => {
  const stats = await blogService.getBlogStats();
  res.json({ stats });
});

/**
 * GET /api/blogs/categories
 * Admin: Distinct categories from all blogs.
 */
router.get("/categories", requireAuth, requireRole(Role.ADMIN), async (_req, res) => {
  const categories = await blogService.getBlogCategories(false);
  res.json({ categories });
});

/**
 * POST /api/blogs
 * Admin: Create a new blog post.
 */
router.post("/", requireAuth, requireRole(Role.ADMIN), async (req, res) => {
  const input = createBlogSchema.parse(req.body);
  const blog = await blogService.createBlog(input);
  res.status(201).json({ blog, message: "Blog post created successfully" });
});

/**
 * GET /api/blogs/:id
 * Admin: Fetch a single blog by ID for editing or previewing.
 */
router.get("/:id", requireAuth, requireRole(Role.ADMIN), async (req, res) => {
  const blog = await blogService.getBlogById(req.params.id);
  res.json({ blog });
});

/**
 * PUT /api/blogs/:id
 * Admin: Update an existing blog.
 */
router.put("/:id", requireAuth, requireRole(Role.ADMIN), async (req, res) => {
  const input = updateBlogSchema.parse(req.body);
  const blog = await blogService.updateBlog(req.params.id, input);
  res.json({ blog, message: "Blog post updated successfully" });
});

/**
 * DELETE /api/blogs/:id
 * Admin: Delete a blog post.
 */
router.delete("/:id", requireAuth, requireRole(Role.ADMIN), async (req, res) => {
  const result = await blogService.deleteBlog(req.params.id);
  res.json(result);
});

export default router;
