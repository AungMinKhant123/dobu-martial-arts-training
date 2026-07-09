import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";

export const createFeedback = async (data) => {
  let { name, email, rating, message } = data;

  name = name?.trim();
  email = email?.trim();
  message = message?.trim();
  rating = Number(rating);

  // Email validation
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new AppError("Invalid email format", 400);
    }
  }

  // Rating validation
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
