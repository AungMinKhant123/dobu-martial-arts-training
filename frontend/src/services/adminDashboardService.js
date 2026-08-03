const handleResponse = async (response) => {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.message || payload?.error || "Request failed";
    throw new Error(message);
  }
  return payload;
};

export const getAdminDashboard = async () => {
  const response = await fetch("/api/admin/dashboard", {
    credentials: "include",
  });

  const payload = await handleResponse(response);
  return payload.data || payload;
};

export default {
  getAdminDashboard,
};
