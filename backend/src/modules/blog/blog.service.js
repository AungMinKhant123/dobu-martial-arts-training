import prisma from "../../config/prisma.js";

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
