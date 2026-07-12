import {
  loginService,
  logoutService,
  refreshTokenService,
  registerService,
} from "./auth.service.js";

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
    const user = await loginService(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await refreshTokenService(refreshToken);
    res.status(200).json({
      message: "Token refreshed successfully",
      data: tokens,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body || {};
    const data = await logoutService(refreshToken);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
