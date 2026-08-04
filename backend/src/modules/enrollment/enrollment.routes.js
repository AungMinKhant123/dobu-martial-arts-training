import express from "express";
import { createEnrollment } from "./enrollment.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Enrollments
 *   description: Enrollment submission endpoints
 */

/**
 * @swagger
 * /api/enrollments:
 *   post:
 *     summary: Submit a new enrollment
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - dob
 *               - gender
 *               - address
 *               - membershipId
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE, OTHER]
 *               address:
 *                 type: string
 *               membershipId:
 *                 type: string
 *               classId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Enrollment submitted successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Membership or class not found
 *       409:
 *         description: Pending enrollment already exists
 *       500:
 *         description: Server error
 */
router.post("/", createEnrollment);

export default router;
