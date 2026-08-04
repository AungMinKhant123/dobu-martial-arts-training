import express from "express";
import { getHomeController } from "./home.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Home page data endpoint
 */

/**
 * @swagger
 * /api/home:
 *   get:
 *     summary: Get home page data
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: Home page data
 *       500:
 *         description: Server error
 */
router.get("/", getHomeController);

export default router;
