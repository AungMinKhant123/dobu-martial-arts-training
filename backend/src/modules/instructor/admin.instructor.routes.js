import express from "express";
import { authenticate } from "../../middleware/authenticate.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";
import {
  createAdminInstructorController,
  deleteAdminInstructorController,
  getAdminInstructorByIdController,
  getAdminInstructorsController,
  getInstructorOptionsController,
  updateAdminInstructorController,
} from "./admin.instructor.controller.js";
import upload from "../../middleware/cloudinary.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Instructors
 *   description: Admin instructor management endpoints
 */

/**
 * @swagger
 * /api/admin/instructors/options:
 *   get:
 *     summary: Get instructor options (for forms)
 *     tags: [Admin Instructors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of instructor options
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - requires admin role
 *       500:
 *         description: Server error
 */
router.get(
  "/options",
  authenticate,
  authorize("ADMIN"),
  getInstructorOptionsController,
);

/**
 * @swagger
 * /api/admin/instructors:
 *   get:
 *     summary: Get all instructors for admin
 *     tags: [Admin Instructors]
 *     responses:
 *       200:
 *         description: List of instructors
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new instructor
 *     tags: [Admin Instructors]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               specialty:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Instructor created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.get("/", getAdminInstructorsController);
router.post("/", upload.single("image"), createAdminInstructorController);

/**
 * @swagger
 * /api/admin/instructors/{id}:
 *   get:
 *     summary: Get an instructor by id
 *     tags: [Admin Instructors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Instructor found
 *       404:
 *         description: Instructor not found
 *       500:
 *         description: Server error
 *   patch:
 *     summary: Update an instructor
 *     tags: [Admin Instructors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               specialty:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Instructor updated successfully
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete an instructor
 *     tags: [Admin Instructors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Instructor deleted successfully
 *       500:
 *         description: Server error
 */
router.get("/:id", getAdminInstructorByIdController);
router.patch("/:id", upload.single("image"), updateAdminInstructorController);
router.delete("/:id", deleteAdminInstructorController);

export default router;
