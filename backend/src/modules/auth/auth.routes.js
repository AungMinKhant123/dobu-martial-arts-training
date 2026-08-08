import express from "express";
import { login, logout, refreshToken, register } from "./auth.controller.js";
import { authenticate } from "../../middleware/authenticate.middleware.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", authenticate, refreshToken);
router.post("/logout", authenticate, logout);

export default router;
