import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";
import {
  sendEnrollmentApprovedEmail,
  sendEnrollmentRejectedEmail,
} from "../email/email.service.js";

export const getAdminEnrollmentsService = async ({
  page,
  limit,
  search,
  status,
  sortBy,
  sortOrder,
}) => {
  const skip = (page - 1) * limit;
  const where = {};
  if (search) {
    where.OR = [
      { firstName: { contains: search } },
      { lastName: { contains: search } },
      { email: { contains: search } },
      { phone: { contains: search } },
    ];
  }
  if (status) {
    where.status = status;
  }
  const [enrollments, total] = await Promise.all([
    prisma.enrollment.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        membership: {
          select: {
            id: true,
            name: true,
          },
        },
        class: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    }),
    prisma.enrollment.count({ where }),
  ]);
  return {
    enrollments,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getAdminEnrollmentStatisticsService = async () => {
  const [
    totalEnrollments,
    pendingEnrollments,
    approvedEnrollments,
    rejectedEnrollments,
  ] = await Promise.all([
    prisma.enrollment.count(),
    prisma.enrollment.count({
      where: {
        status: "PENDING",
      },
    }),
    prisma.enrollment.count({
      where: {
        status: "APPROVED",
      },
    }),
    prisma.enrollment.count({
      where: {
        status: "REJECTED",
      },
    }),
  ]);
  return {
    totalEnrollments,
    pendingEnrollments,
    approvedEnrollments,
    rejectedEnrollments,
  };
};

export const getAdminEnrollmentByIdService = async (id) => {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      id: id,
    },
    include: {
      membership: {
        select: {
          id: true,
          name: true,
        },
      },
      class: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  if (!enrollment) {
    throw new AppError("Enrollment not found", 404);
  }
  return enrollment;
};

export const approveAdminEnrollmentService = async (id) => {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      id,
    },
  });
  if (!enrollment) {
    throw new AppError("Enrollment not found", 404);
  }
  if (enrollment.status === "APPROVED") {
    throw new AppError("Enrollment is already approved", 400);
  }
  if (enrollment.status === "REJECTED") {
    throw new AppError("Enrollment is already rejected", 400);
  }

  const updatedEnrollment = await prisma.$transaction(async (tx) => {
    const existingMember = await tx.member.findUnique({
      where: {
        enrollmentId: enrollment.id,
      },
    });

    if (existingMember) {
      throw new AppError("This enrollment has already been approved.", 400);
    }

    const existingEmail = await tx.member.findUnique({
      where: {
        email: enrollment.email,
      },
    });

    if (existingEmail) {
      throw new AppError("A member with this email already exists.", 400);
    }

    const approvedEnrollment = await tx.enrollment.update({
      where: {
        id,
      },
      data: {
        status: "APPROVED",
      },
      include: {
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
    });

    await tx.member.create({
      data: {
        firstName: enrollment.firstName,
        lastName: enrollment.lastName,
        email: enrollment.email,
        phone: enrollment.phone,
        dob: enrollment.dob,
        gender: enrollment.gender,
        address: enrollment.address,
        joinedAt: new Date(),
        membershipId: enrollment.membershipId,
        classId: enrollment.classId,
        enrollmentId: enrollment.id,
      },
    });

    return approvedEnrollment;
  });
  await sendEnrollmentApprovedEmail({ enrollment: updatedEnrollment });

  return updatedEnrollment;
};

export const rejectAdminEnrollmentService = async (id) => {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      id,
    },
  });

  if (!enrollment) {
    throw new AppError("Enrollment not found", 404);
  }

  if (enrollment.status === "REJECTED") {
    throw new AppError("Enrollment is already rejected", 400);
  }

  if (enrollment.status === "APPROVED") {
    throw new AppError("Enrollment is already approved", 400);
  }

  const updatedEnrollment = await prisma.enrollment.update({
    where: {
      id,
    },
    data: {
      status: "REJECTED",
    },
    include: {
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
  });

  await sendEnrollmentRejectedEmail({
    enrollment: updatedEnrollment,
  });

  return updatedEnrollment;
};

export const deleteAdminEnrollmentService = async (id) => {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      id,
    },
  });
  if (!enrollment) {
    throw new AppError("Enrollment not found", 404);
  }
  if (enrollment.status === "APPROVED") {
    throw new AppError("Approved enrollments cannot be deleted.", 400);
  }
  await prisma.$transaction(async (tx) => {
    await tx.member.deleteMany({
      where: {
        enrollmentId: id,
      },
    });
    await tx.enrollment.delete({
      where: {
        id,
      },
    });
  });
  return;
};
