import bcrypt from "bcrypt";
import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

export const registerService = async (data) => {
  const { name, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existingEmail) {
    throw new AppError("Email is already registered", 409);
  }
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });
  return user;
};

export const loginService = async (data) => {
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid credentials", 401);
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      userId: user.id,
    },
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 401);
  }
  const storedToken = await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken,
    },
  });
  if (!storedToken) {
    throw new AppError("Invalid refresh token", 401);
  }

  if (storedToken.expiresAt < new Date()) {
    await prisma.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });
    throw new AppError("Refresh token expired", 401);
  }

  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    await prisma.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });
    if (error.name === "TokenExpiredError") {
      throw new AppError("Refresh token expired", 401);
    }

    throw new AppError("Invalid refresh token", 401);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: storedToken.userId,
    },
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  await prisma.$transaction([
    prisma.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    }),

    prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId: user.id,
      },
    }),
  ]);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const logoutService = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 401);
  }
  await prisma.refreshToken.deleteMany({
    where: {
      token: refreshToken,
    },
  });
  return {
    message: "Logged out successfully",
  };
};
