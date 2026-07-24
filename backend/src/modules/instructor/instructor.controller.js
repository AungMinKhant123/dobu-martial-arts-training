import { getAllInstructors, getInstructorById } from "./instructor.service.js";

export const getInstructorsController = async (req, res, next) => {
  try {
    const result = await getAllInstructors();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getInstructorController = async (req, res, next) => {
  try {
    const result = await getInstructorById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
