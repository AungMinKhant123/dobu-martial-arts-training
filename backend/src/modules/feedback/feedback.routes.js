import express from "express";
import { submitFeedback } from "./feedback.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Feedbacks
 *   description: Feedback submission endpoints
 */

/**
 * @swagger
 * /api/feedbacks:
 *   post:
 *     summary: Submit a feedback
 *     tags: [Feedbacks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - rating
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Feedback submitted successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", submitFeedback);

export default router;
