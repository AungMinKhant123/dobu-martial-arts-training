import {
  ALLOWED_BLOG_SORT_FIELDS,
  ALLOWED_BLOG_SORT_ORDERS,
} from "../../constants/blog.constants.js";
import {
  createAdminBlogService,
  deleteAdminBlogService,
  getAdminBlogByIdService,
  getAdminBlogsService,
  getAdminBlogStatisticsService,
  publishAdminBlogService,
  unpublishAdminBlogService,
  updateAdminBlogService,
} from "./admin.blog.service.js";

export const getAdminBlogsController = async (req, res, next) => {
  try {
    const safePage = Math.max(Number.parseInt(page, 10) || 1, 1);
    const safeLimit = Math.min(
      Math.max(Number.parseInt(limit, 10) || 10, 1),
      100,
    );
    const { page, limit, search, isPublished, sortBy, sortOrder } = req.query;
    const safeSortBy = ALLOWED_BLOG_SORT_FIELDS.includes(sortBy)
      ? sortBy
      : "createdAt";
    const safeSortOrder = ALLOWED_BLOG_SORT_ORDERS.includes(sortOrder)
      ? sortOrder
      : "desc";
    const result = await getAdminBlogsService({
      page: safePage,
      limit: safeLimit,
      search,
      isPublished,
      sortBy: safeSortBy,
      sortOrder: safeSortOrder,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAdminBlogByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getAdminBlogByIdService(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAdminBlogStatisticsController = async (req, res, next) => {
  try {
    const result = await getAdminBlogStatisticsService();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createAdminBlogController = async (req, res, next) => {
  try {
    const { title, summary, content, isPublished } = req.body;
    const result = await createAdminBlogService(
      {
        title,
        summary,
        content,
        isPublished,
        authorId: req.user.id,
      },
      req.file,
    );
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdminBlogController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, summary, content, isPublished } = req.body;
    const result = await updateAdminBlogService(
      id,
      { title, summary, content, isPublished },
      req.file,
    );
    res.status(200).json({
      message: "Blog updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAdminBlogController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteAdminBlogService(id);
    res.status(200).json({
      success: true,
      message: "Class deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const publishAdminBlogController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await publishAdminBlogService(id);

    res.status(200).json({
      message: "Blog published successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const unpublishAdminBlogController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await unpublishAdminBlogService(id);

    res.status(200).json({
      message: "Blog unpublished successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
