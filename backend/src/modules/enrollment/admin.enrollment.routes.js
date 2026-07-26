import express from "express";
import {
  approveAdminEnrollmentController,
  deleteAdminEnrollmentController,
  getAdminEnrollmentByIdController,
  getAdminEnrollmentsController,
  getAdminEnrollmentStatisticsController,
  rejectAdminEnrollmentController,
} from "./admin.enrollment.controller.js";

const router = express.Router();
router.get("/", getAdminEnrollmentsController);
router.get("/statistics", getAdminEnrollmentStatisticsController);
router.get("/:id", getAdminEnrollmentByIdController);
router.patch("/:id/approve", approveAdminEnrollmentController);
router.patch("/:id/reject", rejectAdminEnrollmentController);
router.delete("/:id", deleteAdminEnrollmentController);

export default router;
