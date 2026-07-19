import prisma from "../../config/prisma.js";

export const getDashboardService = async () => {
  const [pendingEnrollments, totalActiveClasses, recentPendingEnrollments] =
    await Promise.all([
      prisma.enrollment.count({
        where: {
          status: "PENDING",
        },
      }),
      prisma.class.count({
        where: {
          isActive: true,
        },
      }),
      prisma.enrollment.findMany({
        take: 2,
        where: {
          status: "PENDING",
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          email: true,
          membership: {
            select: {
              name: true,
            },
          },
          class: {
            select: {
              title: true,
            },
          },
        },
      }),
    ]);

  return {
    statistics: {
      pendingEnrollments,
      totalActiveClasses,
      recentPendingEnrollments,
    },
  };
};
