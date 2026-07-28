export const getAllBlogs = async ({ page = 1, limit = 6 } = {}) => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const res = await fetch(`/api/blogs?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch blogs");

  return await res.json();
};

export const getBlogBySlug = async (slug) => {
  const res = await fetch(`/api/blogs/${slug}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch blog post");
  }

  return await res.json();
};

export default {
  getAllBlogs,
  getBlogBySlug,
};
