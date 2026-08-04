import express from "express";
import {
  getClassController,
  getClassesController,
} from "./class.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Public class listing endpoints
 */

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: List of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */
router.get("/", getClassesController);

/**
 * @swagger
 * /api/classes/{id}:
 *   get:
 *     summary: Get a class by id
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Class id
 *     responses:
 *       200:
 *         description: Class found
 *       404:
 *         description: Class not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getClassController);

export default router;
