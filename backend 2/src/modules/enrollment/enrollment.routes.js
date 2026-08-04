import express from "express";
import { createEnrollment } from "./enrollment.controller.js";

const router = express.Router();
router.post("/", createEnrollment);

export default router;
