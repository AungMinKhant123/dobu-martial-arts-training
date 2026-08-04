import express from "express";
import {
  createAdminBlogController,
  deleteAdminBlogController,
  getAdminBlogByIdController,
  getAdminBlogsController,
  getAdminBlogStatisticsController,
  publishAdminBlogController,
  unpublishAdminBlogController,
  updateAdminBlogController,
} from "./admin.blog.controller.js";
import upload from "../../middleware/cloudinary.middleware.js";
import { authenticate } from "../../middleware/authenticate.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Blogs
 *   description: Admin blog management endpoints
 */

/**
 * @swagger
 * /api/admin/blogs:
 *   get:
 *     summary: Get all blogs for admin
 *     tags: [Admin Blogs]
 *     responses:
 *       200:
 *         description: List of blogs
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new blog
 *     tags: [Admin Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - requires admin role
 *       500:
 *         description: Server error
 */
router.get("/", getAdminBlogsController);
router.get("/:id", getAdminBlogByIdController);
router.get("/statistics", getAdminBlogStatisticsController);
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  upload.single("image"),
  createAdminBlogController,
);
router.patch("/:id", upload.single("image"), updateAdminBlogController);
router.delete("/:id", deleteAdminBlogController);

/**
 * @swagger
 * /api/admin/blogs/{id}/publish:
 *   patch:
 *     summary: Publish a blog
 *     tags: [Admin Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog published
 *       500:
 *         description: Server error
 */
router.patch("/:id/publish", publishAdminBlogController);

/**
 * @swagger
 * /api/admin/blogs/{id}/unpublish:
 *   patch:
 *     summary: Unpublish a blog
 *     tags: [Admin Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog unpublished
 *       500:
 *         description: Server error
 */
router.patch("/:id/unpublish", unpublishAdminBlogController);

export default router;
