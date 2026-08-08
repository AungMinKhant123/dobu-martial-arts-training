import { createEnquiry } from "./enquiry.service.js";

export const submitEnquiry = async (req, res, next) => {
  try {
    const enquiry = await createEnquiry(req.body);
    res.status(201).json({
      message: "Feedback submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};
