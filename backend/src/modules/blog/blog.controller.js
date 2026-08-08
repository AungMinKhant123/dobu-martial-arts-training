import { getBlogBySlugService, getBlogService } from "./blog.service.js";

export const getBlogController = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await getBlogService({ page, limit });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlugController = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await getBlogBySlugService(slug);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
