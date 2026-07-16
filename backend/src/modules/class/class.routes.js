import express from "express";
import {
  getClassController,
  getClassesController,
} from "./class.controller.js";

const router = express.Router();

router.get("/", getClassesController);
router.get("/:id", getClassController);

export default router;
