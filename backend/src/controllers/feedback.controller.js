import { createFeedback } from "../services/feedback.service.js";

export const submitFeedback = async (req, res, next) => {
  try {
    const feedback = await createFeedback(req.body);
    res.status(201).json({
      message: "Feedback submitted successfully",
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};
