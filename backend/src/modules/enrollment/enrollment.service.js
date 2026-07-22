import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";
import { isValidEmail, isValidPhone } from "../../utils/validators.js";
import { sendCustomerEnrollmentEmail } from "../email/email.service.js";
import { createEnrollmentNotification } from "../notification/notification.service.js";

export const createEnrollmentService = async (body) => {
  let {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    address,
    membershipId,
    classId,
  } = body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !address ||
    !membershipId
  ) {
    throw new AppError("All required fields must be provided.", 400);
  }

  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim().toLowerCase();
  phone = phone.trim();
  address = address.trim();
  membershipId = membershipId.trim();

  if (classId) {
    classId = classId.trim();
  }

  if (!isValidEmail(email)) {
    throw new AppError("Invalid email address.", 400);
  }

  if (!isValidPhone(phone)) {
    throw new AppError("Invalid phone number.", 400);
  }

  const dateOfBirth = new Date(dob);

  if (isNaN(dateOfBirth.getTime())) {
    throw new AppError("Invalid date of birth.", 400);
  }

  const membership = await prisma.membership.findUnique({
    where: {
      id: membershipId,
    },
  });

  if (!membership) {
    throw new AppError("Membership not found.", 404);
  }

  if (membership.allowsAllClasses) {
    classId = null;
  } else {
    if (!classId) {
      throw new AppError(
        "Please select a class for the Basic membership.",
        400,
      );
    }
  }

  if (classId) {
    const martialClass = await prisma.class.findUnique({
      where: {
        id: classId,
      },
    });

    if (!martialClass) {
      throw new AppError("Class not found.", 404);
    }
  }

  const existingEnrollment = await prisma.enrollment.findFirst({
    where: {
      email,
      status: "PENDING",
    },
  });

  if (existingEnrollment) {
    throw new AppError("You already have a pending enrollment.", 409);
  }

  const enrollment = await prisma.enrollment.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      dob: dateOfBirth,
      gender,
      address,
      membershipId,
      classId: classId || null,
    },
    include: {
      membership: true,
      class: true,
    },
  });

  await createEnrollmentNotification(enrollment);
  await sendCustomerEnrollmentEmail({
    firstName,
    email,
    membership: enrollment.membership.name,
    className: enrollment.class?.title,
  });
  return enrollment;
};
