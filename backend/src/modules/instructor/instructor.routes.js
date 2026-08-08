import express from "express";
import {
  getInstructorController,
  getInstructorsController,
} from "./instructor.controller.js";

const router = express.Router();

router.get("/", getInstructorsController);
router.get("/:id", getInstructorController);

export default router;
