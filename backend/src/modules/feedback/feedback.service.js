import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";
import { isValidEmail } from "../../utils/validators.js";

export const createFeedback = async (data) => {
  let { name, email, rating, message } = data;

  name = name?.trim();
  email = email?.trim();
  message = message?.trim();
  rating = Number(rating);

  if (!isValidEmail(email)) {
    throw new AppError("Invalid email address", 400);
  }

  if (Number.isNaN(rating) || rating < 1 || rating > 5) {
    throw new AppError("Rating must be between 1 and 5", 400);
  }

  const feedback = await prisma.feedback.create({
    data: {
      name: name || null,
      email: email || null,
      rating,
      message: message || null,
    },
  });

  return feedback;
};
