import prisma from "../../config/prisma.js";
import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary.js";
import { ALLOWED_BLOG_SORT_FIELDS } from "../../constants/blog.constants.js";

export const getAdminBlogsService = async ({
  page = 1,
  limit = 10,
  search = "",
  isPublished,
  sortBy = "createdAt",
  sortOrder = "desc",
}) => {
  page = Math.max(Number(page) || 1, 1);
  limit = Math.max(Number(limit) || 10, 1);
  const skip = (page - 1) * limit;
  const where = {};

  if (search) {
    where.title = {
      contains: search,
    };
  }
  if (isPublished !== undefined) {
    where.isPublished = isPublished === "true";
  }

  const safeSortBy = ALLOWED_BLOG_SORT_FIELDS.includes(sortBy)
    ? sortBy
    : "createdAt";

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [safeSortBy]: sortOrder,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
    prisma.blog.count({
      where,
    }),
  ]);
  return {
    data: blogs,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const getAdminBlogByIdService = async (id) => {
  const blog = await prisma.blog.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  if (!blog) {
    throw new AppError("Blog not found", 404);
  }
  return blog;
};

export const getAdminBlogStatisticsService = async () => {
  const [totalBlogs, publishedBlogs, draftBlogs] = await Promise.all([
    prisma.blog.count(),
    prisma.blog.count({
      where: {
        isPublished: true,
      },
    }),
    prisma.blog.count({
      where: {
        isPublished: false,
      },
    }),
  ]);
  return {
    totalBlogs,
    publishedBlogs,
    draftBlogs,
  };
};

export const createAdminBlogService = async (
  { title, summary, content, isPublished, authorId },
  file,
) => {
  if (!title?.trim()) {
    throw new AppError("Blog title is required", 400);
  }
  if (!content?.trim()) {
    throw new AppError("Blog content is required", 400);
  }
  const slug = await generateUniqueSlug(title);

  if (!file) {
    throw new AppError("Blog image is required.", 400);
  }
  const uploadImage = await uploadToCloudinary(file.buffer, "dobu/blogs");

  const published = String(isPublished).toLowerCase() === "true";

  const blog = await prisma.blog.create({
    data: {
      title,
      slug,
      summary,
      content,
      imageUrl: uploadImage.secure_url,
      imagePublicId: uploadImage.public_id,
      isPublished: published,
      publishedAt: published ? new Date() : null,
      authorId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return blog;
};

// to create slug for create blog
const generateUniqueSlug = async (title) => {
  const baseSlug = slugify(title, {
    strict: true,
    lower: true,
  });
  let slug = baseSlug;
  let counter = 1;

  while (
    await prisma.blog.findUnique({
      where: {
        slug,
      },
    })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
};

export const updateAdminBlogService = async (
  id,
  { title, content, summary, isPublished },
  file,
) => {
  const existingBlog = await prisma.blog.findUnique({
    where: {
      id,
    },
  });
  if (!existingBlog) {
    throw new AppError("Blog not found", 404);
  }
  const updateData = {};
  if (title !== undefined) {
    if (!title.trim()) {
      throw new AppError("Title is required", 400);
    }
    updateData.title = title;
    if (title !== existingBlog.title) {
      updateData.slug = await generateUniqueSlug(title);
    }
  }
  if (content !== undefined) {
    if (!content.trim()) {
      throw new AppError("Content is required", 400);
    }

    updateData.content = content;
  }
  if (summary !== undefined) {
    updateData.summary = summary;
  }
  if (isPublished !== undefined) {
    const published = String(isPublished).toLowerCase() === "true";
    updateData.isPublished = published;
    updateData.publishedAt = isPublished
      ? existingBlog.publishedAt || new Date()
      : null;
  }
  if (file) {
    if (existingBlog.imagePublicId) {
      await deleteFromCloudinary(existingBlog.imagePublicId);
    }
    const uploadedImage = await uploadToCloudinary(file.buffer, "dobu/blogs");
    updateData.imageUrl = uploadedImage.secure_url;
    updateData.imagePublicId = uploadedImage.public_id;
  }

  const updatedBlog = await prisma.blog.update({
    where: { id },
    data: updateData,
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return updatedBlog;
};

export const deleteAdminBlogService = async (id) => {
  const existingBlog = await prisma.blog.findUnique({
    where: {
      id,
    },
  });
  if (!existingBlog) {
    throw new AppError("Blog not found", 404);
  }
  if (existingBlog.imagePublicId) {
    await deleteFromCloudinary(existingBlog.imagePublicId);
  }
  await prisma.blog.delete({
    where: {
      id,
    },
  });
  return;
};

export const publishAdminBlogService = async (id) => {
  const blog = await prisma.blog.findUnique({
    where: {
      id,
    },
  });

  if (!blog) {
    throw new AppError("Blog not found", 404);
  }

  if (blog.isPublished) {
    throw new AppError("Blog is already published", 400);
  }

  return prisma.blog.update({
    where: {
      id,
    },
    data: {
      isPublished: true,
      publishedAt: blog.publishedAt || new Date(),
    },
  });
};

export const unpublishAdminBlogService = async (id) => {
  const blog = await prisma.blog.findUnique({
    where: {
      id,
    },
  });

  if (!blog) {
    throw new AppError("Blog not found", 404);
  }

  if (!blog.isPublished) {
    throw new AppError("Blog is already unpublished", 400);
  }

  return prisma.blog.update({
    where: {
      id,
    },
    data: {
      isPublished: false,
      publishedAt: null,
    },
  });
};
