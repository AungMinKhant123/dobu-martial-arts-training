import prisma from "../../config/prisma.js";

// For home page
export const getFeaturedInstructors = async () => {
  const instructors = await prisma.instructor.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return instructors;
};
