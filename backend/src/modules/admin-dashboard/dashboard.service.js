import prisma from "../../config/prisma.js";

export const getDashboardService = async () => {
  const [
    pendingEnrollments,
    totalActiveClasses,
    recentPendingEnrollments,
    recentEnquiries,
  ] = await Promise.all([
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
    prisma.enquiry.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    statistics: {
      pendingEnrollments,
      totalActiveClasses,
      recentPendingEnrollments,
      recentEnquiries,
    },
  };
};
