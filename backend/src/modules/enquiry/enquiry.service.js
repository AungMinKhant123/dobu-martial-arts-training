import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";
import { isValidEmail, isValidPhone } from "../../utils/validators.js";

export const createEnquiry = async (data) => {
  const name = data.name?.trim();
  const email = data.email?.trim().toLowerCase();
  const phone = data.phone?.trim();
  const subject = data.subject?.trim();
  const message = data.message?.trim();

  // Required fields
  if (!name || !email || !phone || !subject || !message) {
    throw new AppError("All fields are required", 400);
  }

  // Name validation
  if (name.length < 2 || name.length > 100) {
    throw new AppError("Name must be between 2 and 100 characters", 400);
  }

  // Email validation
  if (!isValidEmail(email)) {
    throw new AppError("Invalid email address.", 400);
  }

  // Phone validation
  if (!isValidPhone(phone)) {
    throw new AppError("Invalid phone number.", 400);
  }

  // Subject validation
  if (subject.length < 3 || subject.length > 150) {
    throw new AppError("Subject must be between 3 and 150 characters", 400);
  }

  // Message validation
  if (message.length < 10 || message.length > 1000) {
    throw new AppError("Message must be between 10 and 1000 characters", 400);
  }

  const enquiry = await prisma.enquiry.create({
    data: {
      name,
      email,
      phone,
      subject,
      message,
    },
  });

  return enquiry;
};
