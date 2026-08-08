import { BeltLevel } from "@prisma/client";
import {
  ALLOWED_INSTRUCTOR_SORT_FIELDS,
  ALLOWED_INSTRUCTOR_SORT_ORDERS,
} from "../../constants/instructor.constants.js";
import {
  createAdminInstructorService,
  deleteAdminInstructorService,
  getAdminInstructorByIdService,
  getAdminInstructorsService,
  getInstructorOptionsService,
  updateAdminInstructorService,
} from "./admin.instructor.service.js";

export const getInstructorOptionsController = async (req, res, next) => {
  try {
    const result = await getInstructorOptionsService();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAdminInstructorsController = async (req, res, next) => {
  try {
    const { page, limit, search, beltLevel, sortBy, sortOrder } = req.query;
    const safePage = Math.max(Number.parseInt(page, 10) || 1, 1);
    const safeLimit = Math.min(
      Math.max(Number.parseInt(limit, 10) || 10, 1),
      100,
    );
    const safeSortBy = ALLOWED_INSTRUCTOR_SORT_FIELDS.includes(sortBy)
      ? sortBy
      : "createdAt";
    const safeSortOrder = ALLOWED_INSTRUCTOR_SORT_ORDERS.includes(sortOrder)
      ? sortOrder
      : "desc";
    const safeBeltLevel = Object.values(BeltLevel).includes(beltLevel)
      ? beltLevel
      : undefined;
    const result = await getAdminInstructorsService({
      page: safePage,
      limit: safeLimit,
      search,
      beltLevel: safeBeltLevel,
      sortBy: safeSortBy,
      sortOrder: safeSortOrder,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createAdminInstructorController = async (req, res, next) => {
  try {
    req.body.qualifications = req.body.qualifications
      ? JSON.parse(req.body.qualifications)
      : [];

    req.body.certifications = req.body.certifications
      ? JSON.parse(req.body.certifications)
      : [];

    req.body.achievements = req.body.achievements
      ? JSON.parse(req.body.achievements)
      : [];

    req.body.specialties = req.body.specialties
      ? JSON.parse(req.body.specialties)
      : [];
    const result = await createAdminInstructorService(req.body, req.file);
    res.status(201).json({
      success: true,
      message: "Instructor created successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminInstructorByIdController = async (req, res, next) => {
  try {
    const result = await getAdminInstructorByIdService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateAdminInstructorController = async (req, res, next) => {
  try {
    if (req.body.qualifications !== undefined) {
      req.body.qualifications = JSON.parse(req.body.qualifications);
    }

    if (req.body.certifications !== undefined) {
      req.body.certifications = JSON.parse(req.body.certifications);
    }

    if (req.body.achievements !== undefined) {
      req.body.achievements = JSON.parse(req.body.achievements);
    }

    if (req.body.specialties !== undefined) {
      req.body.specialties = JSON.parse(req.body.specialties);
    }

    const result = await updateAdminInstructorService(
      req.params.id,
      req.body,
      req.file,
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteAdminInstructorController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteAdminInstructorService(id);
    res.status(200).json({
      success: true,
      message: "Class deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
