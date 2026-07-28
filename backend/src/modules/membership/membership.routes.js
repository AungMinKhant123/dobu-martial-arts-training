import express from "express";
import { getMembershipsController } from "./membership.controller.js";

const router = express.Router();

router.get("/", getMembershipsController);

export default router;
