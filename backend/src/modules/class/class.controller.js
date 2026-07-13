import { getClassService } from "./class.service.js";

export const getClassController = async (req, res, next) => {
  try {
    const result = await getClassService();
    res.status(200).json(result);
  } catch (error) {
    next();
  }
};
