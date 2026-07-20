import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

export const getAdminClassesService = async ({
  page = page || 1,
  limit = limit || 10,
  search,
  isActive,
  level,
  martialArt,
  instructorId,
  sortBy,
  sortOrder,
}) => {
  const skip = (page - 1) * limit;

  const where = {};

  if (search) {
    where.title = {
      contains: search,
    };
  }

  if (isActive !== undefined) {
    where.isActive = isActive;
  }

  if (level) {
    where.level = level;
  }
  if (martialArt) {
    where.martialArt = martialArt;
  }

  if (instructorId) {
    where.instructorId = instructorId;
  }

  const [classes, total] = await Promise.all([
    prisma.class.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
    prisma.class.count({
      where,
    }),
  ]);

  return {
    data: classes,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// For class edit page
export const getAdminClassByIdService = async (id) => {
  const classData = await prisma.class.findUnique({
    where: {
      id,
    },
    include: {
      instructor: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  if (!classData) {
    throw new AppError("Class not found.", 404);
  }
  return classData;
};

export const createAdminClassService = async (data, file) => {
  const {
    title,
    description,
    martialArt,
    level,
    minAge,
    duration,
    overview,
    capacity,
    beltRequirement,
    instructorId,
  } = data;

  // Validate required fields
  if (
    !title ||
    !description ||
    !martialArt ||
    !level ||
    !minAge ||
    !duration ||
    !capacity ||
    !instructorId
  ) {
    throw new AppError("Please provide all required fields.", 400);
  }

  // Validate image
  if (!file) {
    throw new AppError("Image is required.", 400);
  }

  // Check instructor exists
  const instructor = await prisma.instructor.findUnique({
    where: {
      id: instructorId,
    },
  });

  if (!instructor) {
    throw new AppError("Instructor not found.", 404);
  }

  // Upload image to Cloudinary
  const uploadedImage = await uploadToCloudinary(file.buffer, "dobu/classes");
  console.log(uploadedImage);

  // Create class
  const newClass = await prisma.class.create({
    data: {
      title,
      description,
      martialArt,
      level,
      imageUrl: uploadedImage.secure_url,
      imagePublicId: uploadedImage.public_id,
      minAge: Number(minAge),
      duration: Number(duration),
      overview,
      capacity: Number(capacity),
      beltRequirement,
      instructorId,
    },
    include: {
      instructor: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return newClass;
};

export const updateAdminClassService = async (id, data, file) => {
  const existingClass = await prisma.class.findUnique({
    where: {
      id,
    },
  });
  if (!existingClass) {
    throw new AppError("Class not found.", 404);
  }

  let imageUrl = existingClass.imageUrl;
  let imagePublicId = existingClass.imagePublicId;

  if (file) {
    if (existingClass.imagePublicId) {
      await deleteFromCloudinary(existingClass.imagePublicId);
    }
    const uploadImage = await uploadToCloudinary(file.buffer, "dobu/classes");
    imageUrl = uploadImage.secure_url;
    imagePublicId = uploadImage.public_id;
  }
  if (data.instructorId !== undefined) {
    const instructor = await prisma.instructor.findUnique({
      where: {
        id: data.instructorId,
      },
    });
    if (!instructor) {
      throw new AppError("Instructor not found.", 404);
    }
  }

  const updatedClass = await prisma.class.update({
    where: {
      id,
    },
    data: {
      title: data.title ?? existingClass.title,
      description: data.description ?? existingClass.description,
      martialArt: data.martialArt ?? existingClass.martialArt,
      level: data.level ?? existingClass.level,
      imageUrl,
      imagePublicId,
      minAge:
        data.minAge !== undefined ? Number(data.minAge) : existingClass.minAge,
      duration:
        data.duration !== undefined
          ? Number(data.duration)
          : existingClass.duration,
      overview: data.overview ?? existingClass.overview,
      capacity:
        data.capacity !== undefined
          ? Number(data.capacity)
          : existingClass.capacity,
      beltRequirement: data.beltRequirement ?? existingClass.beltRequirement,
      isActive:
        data.isActive !== undefined
          ? data.isActive === "true" || data.isActive === true
          : existingClass.isActive,
      instructorId: data.instructorId ?? existingClass.instructorId,
    },
    include: {
      instructor: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return updatedClass;
};

export const deleteAdminClassService = async (id) => {
  const existingClass = await prisma.class.findUnique({
    where: {
      id,
    },
  });
  if (!existingClass) {
    throw new AppError("Class not found.", 404);
  }

  if (existingClass.imagePublicId) {
    await deleteFromCloudinary(existingClass.imagePublicId);
  }

  await prisma.class.delete({
    where: {
      id,
    },
  });

  return;
};
