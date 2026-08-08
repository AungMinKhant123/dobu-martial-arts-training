import { getAuthHeaders } from "./authService.js";

const handleResponse = async (response) => {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.message || payload?.error || "Request failed";
    throw new Error(message);
  }
  return payload;
};

export const getAdminBlogs = async ({
  page = 1,
  limit = 10,
  search = "",
  isPublished,
  sortBy = "createdAt",
  sortOrder = "desc",
} = {}) => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sortBy,
    sortOrder,
  });
  if (search) query.set("search", search);
  if (isPublished !== undefined) query.set("isPublished", String(isPublished));

  const response = await fetch(`/api/admin/blogs?${query.toString()}`, {
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
    },
  });
  return await handleResponse(response);
};

export const getAdminBlogStatistics = async () => {
  const response = await fetch(`/api/admin/blogs/statistics`, {
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
    },
  });
  return await handleResponse(response);
};

export const getAdminBlogById = async (id) => {
  const response = await fetch(`/api/admin/blogs/${id}`, {
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
    },
  });
  return await handleResponse(response);
};

export const createAdminBlog = async ({
  title,
  summary,
  content,
  isPublished,
  imageFile,
}) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("summary", summary || "");
  formData.append("isPublished", String(isPublished));
  if (imageFile) {
    formData.append("image", imageFile);
  }

  const response = await fetch(`/api/admin/blogs`, {
    method: "POST",
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
    },
    body: formData,
  });
  const payload = await handleResponse(response);
  return payload.data;
};

export const updateAdminBlog = async (
  id,
  { title, summary, content, isPublished, imageFile },
) => {
  const formData = new FormData();
  if (title !== undefined) formData.append("title", title);
  if (content !== undefined) formData.append("content", content);
  if (summary !== undefined) formData.append("summary", summary);
  if (isPublished !== undefined)
    formData.append("isPublished", String(isPublished));
  if (imageFile) {
    formData.append("image", imageFile);
  }

  const response = await fetch(`/api/admin/blogs/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
    },
    body: formData,
  });
  const payload = await handleResponse(response);
  return payload.data;
};

export const deleteAdminBlog = async (id) => {
  const response = await fetch(`/api/admin/blogs/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });
  return await handleResponse(response);
};

export const publishAdminBlog = async (id) => {
  const response = await fetch(`/api/admin/blogs/${id}/publish`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });
  const payload = await handleResponse(response);
  return payload.data;
};

export const unpublishAdminBlog = async (id) => {
  const response = await fetch(`/api/admin/blogs/${id}/unpublish`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });
  const payload = await handleResponse(response);
  return payload.data;
};

export default {
  getAdminBlogs,
  getAdminBlogStatistics,
  getAdminBlogById,
  createAdminBlog,
  updateAdminBlog,
  deleteAdminBlog,
  publishAdminBlog,
  unpublishAdminBlog,
};
