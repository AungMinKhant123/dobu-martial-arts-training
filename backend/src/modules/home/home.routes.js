import express from "express";
import { getHomeController } from "./home.controller.js";

const router = express.Router();
router.get("/", getHomeController);

export default router;
