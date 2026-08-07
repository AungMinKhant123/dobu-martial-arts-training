import express from "express";
import { authenticate } from "../../middleware/authenticate.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";
import {
  createAdminInstructorController,
  deleteAdminInstructorController,
  getAdminInstructorByIdController,
  getAdminInstructorsController,
  getInstructorOptionsController,
  updateAdminInstructorController,
} from "./admin.instructor.controller.js";
import upload from "../../middleware/cloudinary.middleware.js";

const router = express.Router();

router.get(
  "/options",
  authenticate,
  authorize("ADMIN"),
  getInstructorOptionsController,
);
router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  getAdminInstructorsController,
);
router.get(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  getAdminInstructorByIdController,
);
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  upload.single("image"),
  createAdminInstructorController,
);
router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  upload.single("image"),
  updateAdminInstructorController,
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteAdminInstructorController,
);

export default router;
