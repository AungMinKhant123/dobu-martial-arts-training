import { EnquiryStatus } from "@prisma/client";
import {
  ALLOWED_ENQUIRY_SORT_FIELDS,
  ALLOWED_ENQUIRY_SORT_ORDERS,
} from "../../constants/enquiry.constants.js";
import {
  generateAdminEnquiryReplyService,
  getAdminEnquiriesService,
  getAdminEnquiryByIdService,
  getAdminEnquiryStatisticsService,
  markAdminEnquiryAsReadService,
  replyAdminEnquiryService,
} from "./admin.enquiry.service.js";

export const getAdminEnquiriesController = async (req, res, next) => {
  try {
    const {
      page = "1",
      limit = "10",
      search = "",
      status,
      sortBy,
      sortOrder,
    } = req.query;

    const safePage = Math.max(Number.parseInt(page, 10) || 1, 1);
    const safeLimit = Math.min(
      Math.max(Number.parseInt(limit, 10) || 10, 1),
      100,
    );

    const safeStatus = Object.values(EnquiryStatus).includes(status)
      ? status
      : undefined;

    const safeSortBy = ALLOWED_ENQUIRY_SORT_FIELDS.includes(sortBy)
      ? sortBy
      : "createdAt";

    const safeSortOrder = ALLOWED_ENQUIRY_SORT_ORDERS.includes(sortOrder)
      ? sortOrder
      : "desc";

    const result = await getAdminEnquiriesService({
      page: safePage,
      limit: safeLimit,
      search,
      status: safeStatus,
      sortBy: safeSortBy,
      sortOrder: safeSortOrder,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAdminEnquiryStatisticsController = async (req, res, next) => {
  try {
    const result = await getAdminEnquiryStatisticsService();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAdminEnquiryByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getAdminEnquiryByIdService(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const markAdminEnquiryAsReadController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await markAdminEnquiryAsReadService(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const replyAdminEnquiryController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subject, message } = req.body;
    const adminId = req.user.id;
    const result = await replyAdminEnquiryService({
      id,
      subject,
      message,
      adminId,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const generateAdminEnquiryReplyController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reply = await generateAdminEnquiryReplyService(id);
    res.status(200).json({
      success: true,
      message: "AI reply generated successfully",
      data: reply,
    });
  } catch (error) {
    next(error);
  }
};
