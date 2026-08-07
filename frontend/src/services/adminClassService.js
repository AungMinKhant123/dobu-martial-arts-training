import { getAuthHeaders } from "./authService.js";

const handleResponse = async (response) => {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.message || payload?.error || "Request failed";
    throw new Error(message);
  }
  return payload;
};

const buildClassFormData = ({
  title,
  description,
  martialArt,
  level,
  imageFile,
  minAge,
  duration,
  overview,
  capacity,
  beltRequirement,
  instructorId,
  isActive,
}) => {
  const formData = new FormData();

  if (title !== undefined) formData.append("title", title);
  if (description !== undefined) formData.append("description", description);
  if (martialArt !== undefined) formData.append("martialArt", martialArt);
  if (level !== undefined) formData.append("level", level);
  if (minAge !== undefined) formData.append("minAge", String(minAge));
  if (duration !== undefined) formData.append("duration", String(duration));
  if (overview !== undefined) formData.append("overview", overview);
  if (capacity !== undefined) formData.append("capacity", String(capacity));
  if (beltRequirement !== undefined)
    formData.append("beltRequirement", beltRequirement);
  if (instructorId !== undefined) formData.append("instructorId", instructorId);
  if (isActive !== undefined) formData.append("isActive", String(isActive));
  if (imageFile) formData.append("image", imageFile);

  return formData;
};

export const getAdminClasses = async ({
  page = 1,
  limit = 100,
  search = "",
  level,
  isActive,
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
  if (level) query.set("level", level);
  if (isActive !== undefined) query.set("isActive", String(isActive));

  const response = await fetch(`/api/admin/classes?${query.toString()}`, {
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
    },
  });

  return await handleResponse(response);
};

export const getAdminClassStatistics = async () => {
  const response = await fetch(`/api/admin/classes/statistics`, {
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
    },
  });

  return await handleResponse(response);
};

export const getAdminClassById = async (id) => {
  const response = await fetch(`/api/admin/classes/${id}`, {
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
    },
  });
  const payload = await handleResponse(response);
  return payload.data || payload;
};

export const createAdminClass = async (payload) => {
  const response = await fetch(`/api/admin/classes`, {
    method: "POST",
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
    },
    body: buildClassFormData(payload),
  });
  const result = await handleResponse(response);
  return result.data || result;
};

export const updateAdminClass = async (id, payload) => {
  const response = await fetch(`/api/admin/classes/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
    },
    body: buildClassFormData(payload),
  });
  const result = await handleResponse(response);
  return result.data || result;
};

export const deleteAdminClass = async (id) => {
  const response = await fetch(`/api/admin/classes/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
    },
  });
  return await handleResponse(response);
};

export const publishAdminClass = async (id) => {
  const response = await fetch(`/api/admin/classes/${id}/publish`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
    },
  });
  const result = await handleResponse(response);
  return result.data || result;
};

export const unpublishAdminClass = async (id) => {
  const response = await fetch(`/api/admin/classes/${id}/unpublish`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
    },
  });
  const result = await handleResponse(response);
  return result.data || result;
};

export default {
  getAdminClasses,
  getAdminClassStatistics,
  getAdminClassById,
  createAdminClass,
  updateAdminClass,
  deleteAdminClass,
  publishAdminClass,
  unpublishAdminClass,
};
