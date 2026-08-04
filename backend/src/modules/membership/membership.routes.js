import express from "express";
import { getMembershipsController } from "./membership.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Memberships
 *   description: Membership plans endpoints
 */

/**
 * @swagger
 * /api/memberships:
 *   get:
 *     summary: Get all membership plans
 *     tags: [Memberships]
 *     responses:
 *       200:
 *         description: List of membership plans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */
router.get("/", getMembershipsController);

export default router;
