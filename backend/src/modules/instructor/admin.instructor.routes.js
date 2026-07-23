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
router.get("/", getAdminInstructorsController);
router.get("/:id", getAdminInstructorByIdController);
router.post("/", upload.single("image"), createAdminInstructorController);
router.patch("/:id", upload.single("image"), updateAdminInstructorController);
router.delete("/:id", deleteAdminInstructorController);

export default router;
