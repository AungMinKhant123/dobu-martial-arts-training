import { getMembershipsService } from "./membership.service.js";

export const getMembershipsController = async (req, res, next) => {
  try {
    const memberships = await getMembershipsService();
    res.status(200).json(memberships);
  } catch (error) {
    next(error);
  }
};
