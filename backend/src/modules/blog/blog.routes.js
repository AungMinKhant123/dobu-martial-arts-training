import express from "express";
import {
  getBlogBySlugController,
  getBlogController,
} from "./blog.controller.js";

const router = express.Router();
router.get("/", getBlogController);
router.get("/:slug", getBlogBySlugController);

export default router;
