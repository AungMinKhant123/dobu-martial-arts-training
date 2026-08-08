import express from "express";
import {
  approveAdminEnrollmentController,
  deleteAdminEnrollmentController,
  getAdminEnrollmentByIdController,
  getAdminEnrollmentsController,
  getAdminEnrollmentStatisticsController,
  rejectAdminEnrollmentController,
} from "./admin.enrollment.controller.js";
import { authorize } from "../../middleware/authorize.middleware.js";
import { authenticate } from "../../middleware/authenticate.middleware.js";

const router = express.Router();
router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  getAdminEnrollmentsController,
);
router.get(
  "/statistics",
  authenticate,
  authorize("ADMIN"),
  getAdminEnrollmentStatisticsController,
);
router.get(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  getAdminEnrollmentByIdController,
);
router.patch(
  "/:id/approve",
  authenticate,
  authorize("ADMIN"),
  approveAdminEnrollmentController,
);
router.patch(
  "/:id/reject",
  authenticate,
  authorize("ADMIN"),
  rejectAdminEnrollmentController,
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteAdminEnrollmentController,
);

export default router;
