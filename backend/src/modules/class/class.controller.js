import { getClassById, getPublishedClasses } from "./class.service.js";

export const getClassesController = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);

    const result = await getPublishedClasses(page, limit);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getClassController = async (req, res, next) => {
  try {
    const result = await getClassById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
