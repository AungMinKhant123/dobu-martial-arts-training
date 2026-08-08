import express from "express";
import {
  generateAdminEnquiryReplyController,
  getAdminEnquiriesController,
  getAdminEnquiryByIdController,
  getAdminEnquiryStatisticsController,
  markAdminEnquiryAsReadController,
  replyAdminEnquiryController,
} from "./admin.enquiry.controller.js";
import { authenticate } from "../../middleware/authenticate.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

const router = express.Router();
router.get("/", authenticate, authorize("ADMIN"), getAdminEnquiriesController);
router.get(
  "/statistics",
  authenticate,
  authorize("ADMIN"),
  getAdminEnquiryStatisticsController,
);
router.get(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  getAdminEnquiryByIdController,
);
router.patch(
  "/:id/read",
  authenticate,
  authorize("ADMIN"),
  markAdminEnquiryAsReadController,
);
router.post(
  "/:id/reply",
  authenticate,
  authorize("ADMIN"),
  replyAdminEnquiryController,
);
router.post(
  "/:id/generate-reply",
  authenticate,
  authorize("ADMIN"),
  generateAdminEnquiryReplyController,
);

export default router;
