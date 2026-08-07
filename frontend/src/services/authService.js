import {
  clearStoredAuthState,
  getAccessToken,
  getCurrentUser,
  isAuthenticated,
  persistAuthState,
} from "./authStorage.js";

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

  const payload = await handleResponse(response);
  persistAuthState({
    accessToken: payload.accessToken ?? null,
    refreshToken: payload.refreshToken ?? null,
    user: payload.user ?? null,
  });

  return payload;
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
    clearStoredAuthState();
  }
};

export const getAuthHeaders = () => {
  const accessToken = getAccessToken();
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};

export const getCurrentAuthUser = () => getCurrentUser();

export { isAuthenticated };

export default {
  login,
  logout,
  isAuthenticated,
  getAuthHeaders,
  getCurrentAuthUser,
};
