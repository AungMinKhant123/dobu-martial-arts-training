import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";

export const getPublishedClasses = async () => {
  const classes = await prisma.class.findMany({
    where: {
      isActive: true,
    },
    include: {
      instructor: true,
      timetables: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return classes;
};

export const getClassById = async (id) => {
  const classData = await prisma.class.findUnique({
    include: {
      instructor: {
        include: {
          qualifications: true,
          certifications: true,
          achievements: true,
          specialties: true,
        },
      },
      timetables: true,
      learningOutcomes: {
        orderBy: { order: "asc" },
      },
    },
    where: {
      id: id,
    },
  });
  if (!classData) {
    throw new AppError("Class not found.", 404);
  }
  return classData;
};

// For home page
export const getFeaturedClasses = async () => {
  const classes = await prisma.class.findMany({
    where: {
      isPublished: true,
    },
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });
  return classes;
};
