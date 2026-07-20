import { getInstructorOptionsService } from "./admin.instructor.service.js";

export const getInstructorOptionsController = async (req, res, next) => {
  try {
    const result = await getInstructorOptionsService();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
