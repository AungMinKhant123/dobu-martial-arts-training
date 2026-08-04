import express from "express";
import {
  approveAdminEnrollmentController,
  deleteAdminEnrollmentController,
  getAdminEnrollmentByIdController,
  getAdminEnrollmentsController,
  getAdminEnrollmentStatisticsController,
  rejectAdminEnrollmentController,
} from "./admin.enrollment.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Enrollments
 *   description: Admin enrollment management endpoints
 */

/**
 * @swagger
 * /api/admin/enrollments:
 *   get:
 *     summary: Get all enrollments for admin
 *     tags: [Admin Enrollments]
 *     responses:
 *       200:
 *         description: List of enrollments
 *       500:
 *         description: Server error
 */
router.get("/", getAdminEnrollmentsController);

/**
 * @swagger
 * /api/admin/enrollments/statistics:
 *   get:
 *     summary: Get enrollment statistics
 *     tags: [Admin Enrollments]
 *     responses:
 *       200:
 *         description: Enrollment statistics
 *       500:
 *         description: Server error
 */
router.get("/statistics", getAdminEnrollmentStatisticsController);

/**
 * @swagger
 * /api/admin/enrollments/{id}:
 *   get:
 *     summary: Get an enrollment by id
 *     tags: [Admin Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollment found
 *       404:
 *         description: Enrollment not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete an enrollment
 *     tags: [Admin Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollment deleted successfully
 *       500:
 *         description: Server error
 */
router.get("/:id", getAdminEnrollmentByIdController);
router.delete("/:id", deleteAdminEnrollmentController);

/**
 * @swagger
 * /api/admin/enrollments/{id}/approve:
 *   patch:
 *     summary: Approve an enrollment
 *     tags: [Admin Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollment approved
 *       500:
 *         description: Server error
 */
router.patch("/:id/approve", approveAdminEnrollmentController);

/**
 * @swagger
 * /api/admin/enrollments/{id}/reject:
 *   patch:
 *     summary: Reject an enrollment
 *     tags: [Admin Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollment rejected
 *       500:
 *         description: Server error
 */
router.patch("/:id/reject", rejectAdminEnrollmentController);

export default router;
