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

const router = express.Router();
router.get("/", getAdminEnquiriesController);
router.get("/statistics", getAdminEnquiryStatisticsController);
router.get("/:id", getAdminEnquiryByIdController);
router.patch("/:id/read", markAdminEnquiryAsReadController);
router.post("/:id/reply", authenticate, replyAdminEnquiryController);
router.post("/:id/generate-reply", generateAdminEnquiryReplyController);

export default router;
