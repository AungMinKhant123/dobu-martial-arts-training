import express from "express";
import { submitFeedback } from "./feedback.controller.js";

const router = express.Router();
router.post("/", submitFeedback);

export default router;
