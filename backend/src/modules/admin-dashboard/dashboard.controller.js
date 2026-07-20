import { getDashboardService } from "./dashboard.service.js";

export const getDashboardController = async (req, res, next) => {
  try {
    const result = await getDashboardService();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
