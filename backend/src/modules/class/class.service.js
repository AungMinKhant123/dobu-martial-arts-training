import prisma from "../../config/prisma.js";

export const getClassService = async () => {
  const classes = await prisma.class.findMany({
    include: { instructor: true },
    orderBy: {
      createdAt: "desc",
    },
  });
  return classes;
};
