import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const getTokenFromCookie = (req) => {
  const rawCookies = req.headers.cookie || "";
  const cookies = rawCookies.split(";").reduce((acc, cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    if (name) {
      acc[name] = rest.join("=");
    }
    return acc;
  }, {});

  return cookies.accessToken;
};

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies?.accessToken ||
      getTokenFromCookie(req) ||
      authHeader?.split(" ")[1];

    if (!token) {
      throw new AppError("Authentication required", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Access token expired", 401));
    }
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token", 401));
    }
    next(error);
  }
};
