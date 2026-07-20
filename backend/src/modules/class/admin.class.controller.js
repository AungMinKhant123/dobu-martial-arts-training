import {
  ALLOWED_CLASS_SORT_FIELDS,
  ALLOWED_CLASS_SORT_ORDERS,
  CLASS_LEVELS,
  MARTIAL_ARTS,
} from "../../constants/class.constants.js";
import {
  createAdminClassService,
  deleteAdminClassService,
  getAdminClassByIdService,
  getAdminClassesService,
  publishAdminClassService,
  unpublishAdminClassService,
  updateAdminClassService,
} from "./admin.class.service.js";
export const getAdminClassesController = async (req, res, next) => {
  try {
    const {
      page = "1",
      limit = "10",
      search = "",
      isActive,
      level,
      martialArt,
      instructorId,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const safePage = Math.max(Number.parseInt(page, 10) || 1, 1);

    const safeLimit = Math.min(
      Math.max(Number.parseInt(limit, 10) || 10, 1),
      100,
    );

    const safeSortBy = ALLOWED_CLASS_SORT_FIELDS.includes(sortBy)
      ? sortBy
      : "createdAt";

    const safeSortOrder = ALLOWED_CLASS_SORT_ORDERS.includes(sortOrder)
      ? sortOrder
      : "desc";

    const safeMartialArt = MARTIAL_ARTS.includes(martialArt)
      ? martialArt
      : undefined;

    const safeLevel = CLASS_LEVELS.includes(level) ? level : undefined;

    const safeIsActive =
      isActive === "true" ? true : isActive === "false" ? false : undefined;

    const safeSearch = typeof search === "string" ? search.trim() : "";

    const safeInstructorId =
      typeof instructorId === "string" && instructorId.trim()
        ? instructorId.trim()
        : undefined;

    const result = await getAdminClassesService({
      page: safePage,
      limit: safeLimit,
      search: safeSearch,
      isActive: safeIsActive,
      level: safeLevel,
      martialArt: safeMartialArt,
      instructorId: safeInstructorId,
      sortBy: safeSortBy,
      sortOrder: safeSortOrder,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAdminClassByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getAdminClassByIdService(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createAdminClassController = async (req, res, next) => {
  try {
    const {
      title,
      description,
      martialArt,
      level,
      minAge,
      duration,
      overview,
      capacity,
      beltRequirement,
      instructorId,
      isActive = true,
    } = req.body;
    if (
      !title ||
      !description ||
      !martialArt ||
      !level ||
      !minAge ||
      !duration ||
      !capacity ||
      !instructorId
    ) {
      throw new AppError("Missing required fields.", 400);
    }
    if (!MARTIAL_ARTS.includes(martialArt)) {
      throw new AppError("Invalid martial art.", 400);
    }

    if (!CLASS_LEVELS.includes(level)) {
      throw new AppError("Invalid class level.", 400);
    }
    const createdClass = await createAdminClassService(
      {
        title: title.trim(),
        description: description.trim(),
        martialArt,
        level,
        minAge: Number(minAge),
        duration: Number(duration),
        overview,
        capacity: Number(capacity),
        beltRequirement,
        instructorId,
        isActive,
      },
      req.file,
    );

    res.status(201).json({
      success: true,
      message: "Class created successfully.",
      data: createdClass,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdminClassController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      martialArt,
      level,
      imageUrl,
      minAge,
      duration,
      overview,
      capacity,
      beltRequirement,
      isActive,
      instructorId,
    } = req.body;

    if (martialArt && !MARTIAL_ARTS.includes(martialArt)) {
      throw new AppError("Invalid martial art.", 400);
    }

    if (level && !CLASS_LEVELS.includes(level)) {
      throw new AppError("Invalid class level.", 400);
    }

    const result = await updateAdminClassService(
      id,
      {
        title,
        description,
        martialArt,
        level,
        imageUrl,
        minAge,
        duration,
        overview,
        capacity,
        beltRequirement,
        isActive,
        instructorId,
      },
      req.file,
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteAdminClassController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteAdminClassService(id);
    res.status(200).json({
      success: true,
      message: "Class deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const publishAdminClassController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await publishAdminClassService(id);

    res.status(200).json({
      message: "Class published successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const unpublishAdminClassController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await unpublishAdminClassService(id);

    res.status(200).json({
      message: "Class unpublished successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
