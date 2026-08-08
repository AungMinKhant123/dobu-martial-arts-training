import prisma from "../../config/prisma.js";

export const getMembershipsService = async () => {
  return prisma.membership.findMany({
    orderBy: { price: "asc" },
  });
};
