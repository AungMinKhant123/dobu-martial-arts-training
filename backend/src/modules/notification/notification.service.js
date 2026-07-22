import prisma from "../../config/prisma.js";

export const createEnquiryNotification = async (enquiry) => {
  const admins = await prisma.user.findMany({
    where: {
      role: "ADMIN",
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (admins.length === 0) {
    return {
      admins: [],
    };
  }

  const notification = await prisma.notification.create({
    data: {
      title: "New Enquiry Received",
      message: `${enquiry.name} submitted an enquiry.`,
      type: "ENQUIRY",
      entityId: enquiry.id,
      entityType: "ENQUIRY",
    },
  });

  await prisma.notificationRecipient.createMany({
    data: admins.map((admin) => ({
      notificationId: notification.id,
      userId: admin.id,
    })),
  });

  return { admins };
};

export const createEnrollmentNotification = async (enrollment) => {
  const admins = await prisma.user.findMany({
    where: {
      role: "ADMIN",
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  if (admins.length === 0) {
    return [];
  }

  const notification = await prisma.notification.create({
    data: {
      title: "New Enrollment Request",
      message: `${enrollment.firstName} ${enrollment.lastName} submitted an enrollment request.`,
      type: "ENROLLMENT",
      entityId: enrollment.id,
      entityType: "ENROLLMENT",
    },
  });

  await prisma.notificationRecipient.createMany({
    data: admins.map((admin) => ({
      notificationId: notification.id,
      userId: admin.id,
    })),
  });

  return admins;
};
