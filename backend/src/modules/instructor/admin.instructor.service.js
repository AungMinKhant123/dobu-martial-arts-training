import prisma from "../../config/prisma.js";

export const getInstructorOptionsService = async () => {
  const instructors = await prisma.instructor.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  return instructors;
};
