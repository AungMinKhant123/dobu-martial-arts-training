import express from "express";
import {
  generateAdminEnquiryReplyController,
  getAdminEnquiriesController,
  getAdminEnquiryByIdController,
  getAdminEnquiryStatisticsController,
  markAdminEnquiryAsReadController,
  replyAdminEnquiryController,
} from "./admin.enquiry.controller.js";
import { authenticate } from "../../middleware/authenticate.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Enquiries
 *   description: Admin enquiry management endpoints
 */

/**
 * @swagger
 * /api/admin/enquiries:
 *   get:
 *     summary: Get all enquiries for admin
 *     tags: [Admin Enquiries]
 *     responses:
 *       200:
 *         description: List of enquiries
 *       500:
 *         description: Server error
 */
router.get("/", getAdminEnquiriesController);

/**
 * @swagger
 * /api/admin/enquiries/statistics:
 *   get:
 *     summary: Get enquiry statistics
 *     tags: [Admin Enquiries]
 *     responses:
 *       200:
 *         description: Enquiry statistics
 *       500:
 *         description: Server error
 */
router.get("/statistics", getAdminEnquiryStatisticsController);

/**
 * @swagger
 * /api/admin/enquiries/{id}:
 *   get:
 *     summary: Get an enquiry by id
 *     tags: [Admin Enquiries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enquiry found
 *       404:
 *         description: Enquiry not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getAdminEnquiryByIdController);

/**
 * @swagger
 * /api/admin/enquiries/{id}/read:
 *   patch:
 *     summary: Mark an enquiry as read
 *     tags: [Admin Enquiries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enquiry marked as read
 *       500:
 *         description: Server error
 */
router.patch("/:id/read", markAdminEnquiryAsReadController);

/**
 * @swagger
 * /api/admin/enquiries/{id}/reply:
 *   post:
 *     summary: Reply to an enquiry
 *     tags: [Admin Enquiries]
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
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reply sent
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/:id/reply", authenticate, replyAdminEnquiryController);

/**
 * @swagger
 * /api/admin/enquiries/{id}/generate-reply:
 *   post:
 *     summary: Generate an AI suggested reply for an enquiry
 *     tags: [Admin Enquiries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Generated reply
 *       500:
 *         description: Server error
 */
router.post("/:id/generate-reply", generateAdminEnquiryReplyController);

export default router;
