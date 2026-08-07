const AUTH_STORAGE_KEY = "authState";

const defaultState = () => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
});

const getStorage = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage;
  }

  if (typeof globalThis !== "undefined" && globalThis.localStorage) {
    return globalThis.localStorage;
  }

  return null;
};

const readStoredState = () => {
  const storage = getStorage();
  if (!storage) {
    return defaultState();
  }

  try {
    const rawState = storage.getItem(AUTH_STORAGE_KEY);
    if (!rawState) {
      return defaultState();
    }

    const parsed = JSON.parse(rawState);
    return {
      ...defaultState(),
      ...parsed,
      isAuthenticated: Boolean(parsed?.accessToken || parsed?.user),
    };
  } catch {
    return defaultState();
  }
};

export const getStoredAuthState = () => readStoredState();

export const persistAuthState = ({ accessToken, refreshToken, user }) => {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  const nextState = {
    accessToken,
    refreshToken,
    user,
    isAuthenticated: Boolean(accessToken || user),
  };

  storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextState));
};

export const clearStoredAuthState = () => {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  storage.removeItem(AUTH_STORAGE_KEY);
};

export const isAuthenticated = () => getStoredAuthState().isAuthenticated;

export const getAccessToken = () => getStoredAuthState().accessToken;

export const getCurrentUser = () => getStoredAuthState().user;
