import { EnrollmentStatus } from "@prisma/client";
import {
  ALLOWED_ENROLLMENT_SORT_FIELDS,
  ALLOWED_ENROLLMENT_SORT_ORDERS,
} from "../../constants/enrollment.constants.js";
import {
  approveAdminEnrollmentService,
  deleteAdminEnrollmentService,
  getAdminEnrollmentByIdService,
  getAdminEnrollmentsService,
  getAdminEnrollmentStatisticsService,
  rejectAdminEnrollmentService,
} from "./admin.enrollment.service.js";

export const getAdminEnrollmentsController = async (req, res, next) => {
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
    const safeSearch = search.trim();

    const safeStatus = Object.values(EnrollmentStatus).includes(status)
      ? status
      : undefined;

    const safeSortBy = ALLOWED_ENROLLMENT_SORT_FIELDS.includes(sortBy)
      ? sortBy
      : "createdAt";

    const safeSortOrder = ALLOWED_ENROLLMENT_SORT_ORDERS.includes(sortOrder)
      ? sortOrder
      : "desc";
    const result = await getAdminEnrollmentsService({
      page: safePage,
      limit: safeLimit,
      search: safeSearch,
      status: safeStatus,
      sortBy: safeSortBy,
      sortOrder: safeSortOrder,
    });
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const getAdminEnrollmentStatisticsController = async (
  req,
  res,
  next,
) => {
  try {
    const result = await getAdminEnrollmentStatisticsService();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAdminEnrollmentByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getAdminEnrollmentByIdService(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const approveAdminEnrollmentController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await approveAdminEnrollmentService(id);
    res.status(200).json({
      success: true,
      message: "Enrollment approved successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const rejectAdminEnrollmentController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await rejectAdminEnrollmentService(id);
    res.status(200).json({
      success: true,
      message: "Enrollment rejected successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAdminEnrollmentController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteAdminEnrollmentService(id);
    res.status(200).json({
      success: true,
      message: "Enrollment deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
