const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};

const handleResponse = async (response) => {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.message || payload?.error || "Request failed";
    throw new Error(message);
  }
  return payload;
};

export const getAdminEnquiries = async ({
  page = 1,
  limit = 10,
  search = "",
  status,
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
  if (status) query.set("status", status);

  const response = await fetch(`/api/admin/enquiries?${query.toString()}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

  return await handleResponse(response);
};

export const getAdminEnquiryStatistics = async () => {
  const response = await fetch(`/api/admin/enquiries/statistics`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  return await handleResponse(response);
};

export const getAdminEnquiryById = async (id) => {
  const response = await fetch(`/api/admin/enquiries/${id}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  return await handleResponse(response);
};

export const markAdminEnquiryAsRead = async (id) => {
  const response = await fetch(`/api/admin/enquiries/${id}/read`, {
    method: "PATCH",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });
  return await handleResponse(response);
};

export const replyAdminEnquiry = async (id, { subject, message }) => {
  const response = await fetch(`/api/admin/enquiries/${id}/reply`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subject, message }),
  });
  return await handleResponse(response);
};

export const generateAdminEnquiryReply = async (id) => {
  const response = await fetch(`/api/admin/enquiries/${id}/generate-reply`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });
  return await handleResponse(response);
};

export default {
  getAdminEnquiries,
  getAdminEnquiryStatistics,
  getAdminEnquiryById,
  markAdminEnquiryAsRead,
  replyAdminEnquiry,
  generateAdminEnquiryReply,
};
