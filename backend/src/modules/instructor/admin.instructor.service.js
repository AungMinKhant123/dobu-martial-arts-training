import { BeltLevel } from "@prisma/client";
import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";
import { isValidEmail, isValidPhone } from "../../utils/validators.js";

// for dropdown
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

export const getAdminInstructorsService = async ({
  page,
  limit,
  search,
  beltLevel,
  sortBy,
  sortOrder,
}) => {
  console.log(sortBy);
  const skip = (page - 1) * limit;
  let where = {
    ...(search && {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          email: {
            contains: search,
          },
        },
      ],
    }),
    ...(beltLevel && { beltLevel }),
  };

  const [instructors, total] = await Promise.all([
    prisma.instructor.findMany({
      where,
      take: limit,
      skip,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        _count: {
          select: {
            classes: true,
          },
        },
        qualifications: {
          select: {
            title: true,
          },
        },
        certifications: {
          select: {
            name: true,
          },
        },
        achievements: {
          select: {
            title: true,
          },
        },
        specialties: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.instructor.count({
      where,
    }),
  ]);
  return {
    data: instructors,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const createAdminInstructorService = async (data, file) => {
  const {
    name,
    email,
    phone,
    biography,
    beltLevel,
    experienceYears,
    qualifications,
    certifications,
    achievements,
    specialties,
  } = data;

  if (!name || !email || !biography) {
    throw new AppError("Please provide all required fields.", 400);
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPhone = phone?.trim();
  const years = Number(experienceYears);

  if (isNaN(years) || years < 0) {
    throw new AppError("Invalid experience years", 400);
  }

  if (!isValidEmail(cleanEmail)) {
    throw new AppError("Invalid email address.", 400);
  }
  if (!isValidPhone(cleanPhone)) {
    throw new AppError("Invalid phone number.", 400);
  }

  const existingInstructor = await prisma.instructor.findUnique({
    where: {
      email: cleanEmail,
    },
  });
  if (existingInstructor) {
    throw new AppError("Instructor email already exists", 400);
  }
  if (!file) {
    throw new AppError("Instructor image is required.", 400);
  }

  const uploadedImage = await uploadToCloudinary(
    file.buffer,
    "dobu/instructors",
  );

  try {
    const instructor = await prisma.$transaction(async (tx) => {
      const createdInstructor = await prisma.instructor.create({
        data: {
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          biography: biography.trim(),
          beltLevel,
          experienceYears: years,
          imageUrl: uploadedImage.secure_url,
          imagePublicId: uploadedImage.public_id,
          qualifications: {
            create:
              qualifications?.map((item) => ({
                title: item.title.trim(),
              })) || [],
          },
          certifications: {
            create:
              certifications?.map((item) => ({
                name: item.name.trim(),
              })) || [],
          },
          achievements: {
            create:
              achievements?.map((item) => ({
                title: item.title.trim(),
              })) || [],
          },
          specialties: {
            create:
              specialties?.map((item) => ({
                name: item.name.trim(),
              })) || [],
          },
        },
        include: {
          qualifications: {
            select: {
              title: true,
            },
          },
          certifications: {
            select: {
              name: true,
            },
          },
          achievements: {
            select: {
              title: true,
            },
          },
          specialties: {
            select: {
              name: true,
            },
          },
        },
      });
      return createdInstructor;
    });
    return instructor;
  } catch (error) {
    await deleteFromCloudinary(uploadedImage.public_id);

    throw error;
  }
};

export const getAdminInstructorByIdService = async (id) => {
  const instructor = await prisma.instructor.findUnique({
    where: {
      id: id,
    },

    include: {
      qualifications: {
        select: {
          id: true,
          title: true,
        },
      },

      certifications: {
        select: {
          id: true,
          name: true,
        },
      },

      achievements: {
        select: {
          id: true,
          title: true,
        },
      },

      specialties: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!instructor) {
    throw new AppError("Instructor not found.", 404);
  }

  return instructor;
};

export const updateAdminInstructorService = async (id, data, file) => {
  const {
    name,
    email,
    phone,
    biography,
    beltLevel,
    experienceYears,
    qualifications,
    certifications,
    achievements,
    specialties,
  } = data;

  const existingInstructor = await prisma.instructor.findUnique({
    where: {
      id,
    },
  });
  if (!existingInstructor) {
    throw new AppError("Instructor not found.", 404);
  }

  const cleanName = name?.trim();
  const cleanEmail = email?.trim().toLowerCase();
  const cleanPhone = phone?.trim();
  const years = Number(experienceYears);

  if (cleanEmail && !isValidEmail(cleanEmail)) {
    throw new AppError("Invalid email address.", 400);
  }
  if (cleanPhone && !isValidPhone(cleanPhone)) {
    throw new AppError("Invalid phone number.", 400);
  }
  if (experienceYears !== undefined && (isNaN(years) || years < 0)) {
    throw new AppError("Invalid experience years.", 400);
  }
  if (
    beltLevel !== undefined &&
    !Object.values(BeltLevel).includes(beltLevel)
  ) {
    throw new AppError("Invalid belt level.", 400);
  }
  if (cleanEmail && cleanEmail !== existingInstructor.email) {
    const duplicateInstructor = await prisma.instructor.findUnique({
      where: {
        email: cleanEmail,
      },
    });
    if (duplicateInstructor) {
      throw new AppError("Instructor email already exists.", 400);
    }
  }
  let uploadedImage = null;
  if (qualifications !== undefined && !Array.isArray(qualifications)) {
    throw new AppError("Qualifications must be an array.", 400);
  }
  if (certifications !== undefined && !Array.isArray(certifications)) {
    throw new AppError("Certifications must be an array.", 400);
  }
  if (achievements !== undefined && !Array.isArray(achievements)) {
    throw new AppError("Achievements must be an array.", 400);
  }
  if (specialties !== undefined && !Array.isArray(specialties)) {
    throw new AppError("Specialties must be an array.", 400);
  }

  if (file) {
    uploadedImage = await uploadToCloudinary(file.buffer, "dobu/instructors");
  }
  try {
    const instructor = await prisma.$transaction(async (tx) => {
      await Promise.all(
        [
          qualifications !== undefined &&
            tx.instructorQualification.deleteMany({
              where: { instructorId: id },
            }),

          certifications !== undefined &&
            tx.instructorCertification.deleteMany({
              where: { instructorId: id },
            }),

          achievements !== undefined &&
            tx.instructorAchievement.deleteMany({
              where: { instructorId: id },
            }),

          specialties !== undefined &&
            tx.instructorSpecialty.deleteMany({
              where: { instructorId: id },
            }),
        ].filter(Boolean),
      );

      const updatedInstructor = await tx.instructor.update({
        where: {
          id,
        },
        data: {
          ...(cleanName !== undefined && {
            name: cleanName,
          }),

          ...(cleanEmail !== undefined && {
            email: cleanEmail,
          }),

          ...(cleanPhone !== undefined && {
            phone: cleanPhone,
          }),

          ...(biography !== undefined && {
            biography: biography?.trim(),
          }),

          ...(beltLevel !== undefined && {
            beltLevel,
          }),

          ...(experienceYears !== undefined && {
            experienceYears: years,
          }),

          ...(uploadedImage && {
            imageUrl: uploadedImage.secure_url,
            imagePublicId: uploadedImage.public_id,
          }),

          ...(qualifications !== undefined && {
            qualifications: {
              create: qualifications.map((item) => ({
                title: item.title.trim(),
              })),
            },
          }),

          ...(certifications !== undefined && {
            certifications: {
              create: certifications.map((item) => ({
                name: item.name?.trim(),
              })),
            },
          }),

          ...(achievements !== undefined && {
            achievements: {
              create: achievements.map((item) => ({
                title: item.title.trim(),
              })),
            },
          }),

          ...(specialties !== undefined && {
            specialties: {
              create: specialties.map((item) => ({
                name: item.name.trim(),
              })),
            },
          }),
        },
        include: {
          qualifications: {
            select: {
              title: true,
            },
          },
          certifications: {
            select: {
              name: true,
            },
          },
          achievements: {
            select: {
              title: true,
            },
          },
          specialties: {
            select: {
              name: true,
            },
          },
        },
      });
      return updatedInstructor;
    });
    if (uploadedImage && existingInstructor.imagePublicId) {
      await deleteFromCloudinary(existingInstructor.imagePublicId);
    }
    return instructor;
  } catch (error) {
    if (uploadedImage) {
      await deleteFromCloudinary(uploadedImage.public_id);
    }
    throw error;
  }
};

export const deleteAdminInstructorService = async (id) => {
  const instructor = await prisma.instructor.findUnique({
    where: { id },
  });

  if (!instructor) {
    throw new AppError("Instructor not found", 404);
  }

  await prisma.$transaction([
    prisma.instructorQualification.deleteMany({
      where: { instructorId: id },
    }),

    prisma.instructorCertification.deleteMany({
      where: { instructorId: id },
    }),

    prisma.instructorAchievement.deleteMany({
      where: { instructorId: id },
    }),

    prisma.instructorSpecialty.deleteMany({
      where: { instructorId: id },
    }),

    prisma.instructor.delete({
      where: { id },
    }),
  ]);
};
