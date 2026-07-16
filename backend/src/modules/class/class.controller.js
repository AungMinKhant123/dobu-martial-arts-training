import { getClassById, getPublishedClasses } from "./class.service.js";

export const getClassesController = async (req, res, next) => {
  try {
    const result = await getPublishedClasses();
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
