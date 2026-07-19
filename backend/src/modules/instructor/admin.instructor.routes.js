import express from "express";
import { authenticate } from "../../middleware/authenticate.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";
import { getInstructorOptionsController } from "./admin.instructor.controller.js";

const router = express.Router();

router.get(
  "/options",
  authenticate,
  authorize("ADMIN"),
  getInstructorOptionsController,
);

export default router;
