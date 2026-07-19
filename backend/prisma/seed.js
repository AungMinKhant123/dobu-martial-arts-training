import prisma from "../src/config/prisma.js";

import { memberships } from "./seeds/memberships.seed.js";
import { users } from "./seeds/users.seed.js";
import { instructors } from "./seeds/instructors.seed.js";
import { classes } from "./seeds/classes.seed.js";
import { learningOutcomes } from "./seeds/learningOutcomes.seed.js";
import { timetables } from "./seeds/timetables.seed.js";
import { blogs } from "./seeds/blogs.seed.js";
import { enquiries } from "./seeds/enquiries.seed.js";
import { enrollments } from "./seeds/enrollments.seed.js";
import { members } from "./seeds/members.seed.js";
import { feedbacks } from "./seeds/feedbacks.seed.js";

async function main() {
  console.log("🌱 Start seeding...");

  await prisma.feedback.deleteMany();
  await prisma.member.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.timetable.deleteMany();
  await prisma.learningOutcome.deleteMany();
  await prisma.class.deleteMany();
  await prisma.instructorSpecialty.deleteMany();
  await prisma.instructorAchievement.deleteMany();
  await prisma.instructorCertification.deleteMany();
  await prisma.instructorQualification.deleteMany();
  await prisma.instructor.deleteMany();
  await prisma.enquiry.deleteMany();
  await prisma.notificationRecipient.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.membership.deleteMany();

  // Memberships
  await prisma.membership.createMany({
    data: memberships,
    skipDuplicates: true,
  });

  // Users
  await prisma.user.createMany({
    data: await users(),
    skipDuplicates: true,
  });

  // Instructors
  await prisma.instructor.createMany({
    data: instructors,
    skipDuplicates: true,
  });

  // Classes
  for (const item of classes) {
    const instructor = await prisma.instructor.findUnique({
      where: {
        email: item.instructorEmail,
      },
    });

    if (!instructor) continue;

    await prisma.class.create({
      data: {
        title: item.title,
        description: item.description,
        martialArt: item.martialArt,
        level: item.level,
        imageUrl: item.imageUrl,
        minAge: item.minAge,
        duration: item.duration,
        overview: item.overview,
        capacity: item.capacity,
        beltRequirement: item.beltRequirement,
        isActive: item.isActive,
        isPublished: item.isPublished,
        instructorId: instructor.id,
      },
    });
  }

  // Learning Outcomes
  for (const item of learningOutcomes) {
    const classData = await prisma.class.findFirst({
      where: { title: item.classTitle },
    });

    if (!classData) continue;

    await prisma.learningOutcome.create({
      data: {
        content: item.content,
        order: item.order,
        classId: classData.id,
      },
    });
  }

  // Timetables
  for (const item of timetables) {
    const classData = await prisma.class.findFirst({
      where: { title: item.classTitle },
    });

    if (!classData) continue;

    await prisma.timetable.create({
      data: {
        classId: classData.id,
        dayOfWeek: item.dayOfWeek,
        startTime: item.startTime,
        endTime: item.endTime,
        room: item.room,
      },
    });
  }

  // Blogs
  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  for (const item of blogs) {
    await prisma.blog.create({
      data: {
        title: item.title,
        slug: item.slug,
        summary: item.summary,
        content: item.content,
        imageUrl: item.imageUrl,
        isPublished: item.isPublished,
        publishedAt: item.isPublished ? new Date() : null,
        authorId: admin.id,
      },
    });
  }

  // Enquiries
  await prisma.enquiry.createMany({
    data: enquiries,
  });

  // Enrollments
  for (const item of enrollments) {
    const membership = await prisma.membership.findUnique({
      where: { name: item.membership },
    });

    let classId = null;

    if (item.classTitle) {
      const classData = await prisma.class.findFirst({
        where: { title: item.classTitle },
      });

      classId = classData?.id;
    }

    await prisma.enrollment.create({
      data: {
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        phone: item.phone,
        dob: item.dob,
        gender: item.gender,
        address: item.address,
        status: item.status,
        membershipId: membership.id,
        classId,
      },
    });
  }

  // Members
  for (const item of members) {
    const membership = await prisma.membership.findUnique({
      where: { name: item.membership },
    });

    let classId = null;

    if (item.classTitle) {
      const classData = await prisma.class.findFirst({
        where: { title: item.classTitle },
      });

      classId = classData?.id;
    }

    await prisma.member.create({
      data: {
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        phone: item.phone,
        dob: item.dob,
        gender: item.gender,
        address: item.address,
        status: item.status,
        membershipId: membership.id,
        classId,
      },
    });
  }

  // Feedback
  for (const item of feedbacks) {
    let classId = null;

    if (item.classTitle) {
      const classData = await prisma.class.findFirst({
        where: { title: item.classTitle },
      });

      classId = classData?.id;
    }

    await prisma.feedback.create({
      data: {
        name: item.name,
        email: item.email,
        rating: item.rating,
        message: item.message,
        isApproved: item.isApproved,
        classId,
      },
    });
  }

  console.log("✅ Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
