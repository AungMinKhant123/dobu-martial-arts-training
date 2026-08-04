import express from "express";
import { submitEnquiry } from "./enquiry.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Enquiries
 *   description: Contact and enquiry submission endpoints
 */

/**
 * @swagger
 * /api/enquiries:
 *   post:
 *     summary: Submit an enquiry
 *     tags: [Enquiries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Enquiry submitted successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", submitEnquiry);

export default router;
