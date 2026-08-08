import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";

export const getBlogService = async ({ page, limit }) => {
  page = Math.max(Number(page) || 1, 1);
  limit = Math.max(Number(limit) || 6, 1);
  const skip = (page - 1) * limit;

  const where = {
    isPublished: true,
  };

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      take: limit,
      skip,
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        imageUrl: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.blog.count({
      where,
    }),
  ]);

  return {
    data: blogs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getBlogBySlugService = async (slug) => {
  const blog = await prisma.blog.findUnique({
    where: {
      slug: slug,
      isPublished: true,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      summary: true,
      imageUrl: true,
      createdAt: true,
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

// For home page
export const getFeaturedBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    where: {
      isPublished: true,
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });
  return blogs;
};
