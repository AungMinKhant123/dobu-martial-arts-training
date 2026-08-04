import express from "express";
import {
  createAdminClassController,
  deleteAdminClassController,
  getAdminClassByIdController,
  getAdminClassesController,
  getAdminClassStatisticsController,
  publishAdminClassController,
  unpublishAdminClassController,
  updateAdminClassController,
} from "./admin.class.controller.js";
import { authenticate } from "../../middleware/authenticate.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";
import upload from "../../middleware/cloudinary.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Classes
 *   description: Admin class management endpoints
 */

/**
 * @swagger
 * /api/admin/classes:
 *   get:
 *     summary: Get all classes for admin
 *     tags: [Admin Classes]
 *     responses:
 *       200:
 *         description: List of classes
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new class
 *     tags: [Admin Classes]
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
 *               description:
 *                 type: string
 *               schedule:
 *                 type: string
 *               duration:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Class created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - requires admin role
 *       500:
 *         description: Server error
 */
router.get("/", getAdminClassesController);

/**
 * @swagger
 * /api/admin/classes/statistics:
 *   get:
 *     summary: Get class statistics
 *     tags: [Admin Classes]
 *     responses:
 *       200:
 *         description: Class statistics
 *       500:
 *         description: Server error
 */
router.get("/statistics", getAdminClassStatisticsController);

/**
 * @swagger
 * /api/admin/classes/{id}:
 *   get:
 *     summary: Get a class by id
 *     tags: [Admin Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class found
 *       404:
 *         description: Class not found
 *       500:
 *         description: Server error
 *   patch:
 *     summary: Update a class
 *     tags: [Admin Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               schedule:
 *                 type: string
 *               duration:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Class updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - requires admin role
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a class
 *     tags: [Admin Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - requires admin role
 *       500:
 *         description: Server error
 */
router.get(
  "/:id",
  //   authenticate,
  //   authorize("ADMIN"),
  getAdminClassByIdController,
);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  upload.single("image"),
  createAdminClassController,
);
router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  upload.single("image"),
  updateAdminClassController,
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteAdminClassController,
);

/**
 * @swagger
 * /api/admin/classes/{id}/publish:
 *   patch:
 *     summary: Publish a class
 *     tags: [Admin Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class published
 *       500:
 *         description: Server error
 */
router.patch("/:id/publish", publishAdminClassController);

/**
 * @swagger
 * /api/admin/classes/{id}/unpublish:
 *   patch:
 *     summary: Unpublish a class
 *     tags: [Admin Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class unpublished
 *       500:
 *         description: Server error
 */
router.patch("/:id/unpublish", unpublishAdminClassController);

export default router;
