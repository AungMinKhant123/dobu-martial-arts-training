import { createEnrollmentService } from "./enrollment.service.js";

export const createEnrollment = async (req, res, next) => {
  try {
    const result = await createEnrollmentService(req.body);
    res.status(201).json({
      message: "Enrollment submitted successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
