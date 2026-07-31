import {
  loginService,
  logoutService,
  refreshTokenService,
  registerService,
} from "./auth.service.js";

const isProduction = process.env.NODE_ENV === "production";

const getCookieValue = (req, cookieName) => {
  const rawCookies = req.headers.cookie || "";
  const cookies = rawCookies.split(";").reduce((acc, cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    if (name) {
      acc[name] = rest.join("=");
    }
    return acc;
  }, {});

  return cookies[cookieName];
};

const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", { path: "/" });
  res.clearCookie("refreshToken", { path: "/" });
};

export const register = async (req, res, next) => {
  try {
    const user = await registerService(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await loginService(req.body);
    setAuthCookies(res, accessToken, refreshToken);
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshTokenValue =
      getCookieValue(req, "refreshToken") || req.body?.refreshToken;
    const tokens = await refreshTokenService(refreshTokenValue);
    setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
    res.status(200).json({
      message: "Token refreshed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshTokenValue =
      getCookieValue(req, "refreshToken") || req.body?.refreshToken;
    const data = await logoutService(refreshTokenValue);
    clearAuthCookies(res);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
