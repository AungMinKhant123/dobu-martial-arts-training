import { getHomeData } from "./home.service.js";

export const getHomeController = async (req, res, next) => {
  try {
    const data = await getHomeData();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
