import express from "express";
import {
  getInstructorController,
  getInstructorsController,
} from "./instructor.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Instructors
 *   description: Public instructor listing endpoints
 */

/**
 * @swagger
 * /api/instructors:
 *   get:
 *     summary: Get all instructors
 *     tags: [Instructors]
 *     responses:
 *       200:
 *         description: List of instructors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */
router.get("/", getInstructorsController);

/**
 * @swagger
 * /api/instructors/{id}:
 *   get:
 *     summary: Get an instructor by id
 *     tags: [Instructors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Instructor id
 *     responses:
 *       200:
 *         description: Instructor found
 *       404:
 *         description: Instructor not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getInstructorController);

export default router;
