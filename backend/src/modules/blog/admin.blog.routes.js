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
router.get("/", authenticate, authorize("ADMIN"), getAdminBlogsController);
router.get(
  "/statistics",
  authenticate,
  authorize("ADMIN"),
  getAdminBlogStatisticsController,
);
router.get(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  getAdminBlogByIdController,
);
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  upload.single("image"),
  createAdminBlogController,
);
router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  upload.single("image"),
  updateAdminBlogController,
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteAdminBlogController,
);

router.patch(
  "/:id/publish",
  authenticate,
  authorize("ADMIN"),
  publishAdminBlogController,
);
router.patch(
  "/:id/unpublish",
  authenticate,
  authorize("ADMIN"),
  unpublishAdminBlogController,
);

export default router;
