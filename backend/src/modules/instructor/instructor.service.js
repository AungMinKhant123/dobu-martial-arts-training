import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";

export const getAllInstructors = async () => {
  const instructors = await prisma.instructor.findMany({
    include: {
      qualifications: true,
      certifications: true,
      achievements: true,
      specialties: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return instructors;
};

export const getInstructorById = async (id) => {
  const instructor = await prisma.instructor.findUnique({
    where: { id },
    include: {
      qualifications: true,
      certifications: true,
      achievements: true,
      specialties: true,
    },
  });

  if (!instructor) {
    throw new AppError("Instructor not found.", 404);
  }

  return instructor;
};

// For home page
export const getFeaturedInstructors = async () => {
  const instructors = await prisma.instructor.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return instructors;
};
