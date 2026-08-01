const API_BASE = "/api/auth";

const handleResponse = async (response) => {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.message || payload?.error || "Request failed";
    throw new Error(message);
  }
  return payload;
};

export const login = async ({ email, password }) => {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  return await handleResponse(response);
};

export const logout = async () => {
  try {
    await fetch(`${API_BASE}/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    // Ignore logout errors and still clear the client session state.
  } finally {
    localStorage.removeItem("authSession");
  }
};

export const isAuthenticated = () => {
  return Boolean(localStorage.getItem("authSession"));
};

export default {
  login,
  logout,
  isAuthenticated,
};
