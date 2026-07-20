import express from "express";
import {
  createAdminBlogController,
  deleteAdminBlogController,
  getAdminBlogByIdController,
  getAdminBlogsController,
  getAdminBlogStatisticsController,
  publishAdminBlogController,
  unpublishAdminBlogController,
  updateAdminBlogController,
} from "./admin.blog.controller.js";
import upload from "../../middleware/cloudinary.middleware.js";
import { authenticate } from "../../middleware/authenticate.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

const router = express.Router();
router.get("/", getAdminBlogsController);
router.get("/:id", getAdminBlogByIdController);
router.get("/statistics", getAdminBlogStatisticsController);
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  upload.single("image"),
  createAdminBlogController,
);
router.patch("/:id", upload.single("image"), updateAdminBlogController);
router.delete("/:id", deleteAdminBlogController);

router.patch("/:id/publish", publishAdminBlogController);
router.patch("/:id/unpublish", unpublishAdminBlogController);

export default router;
