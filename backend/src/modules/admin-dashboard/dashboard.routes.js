import express from "express";
import { getDashboardController } from "./dashboard.controller.js";
import { authenticate } from "../../middleware/authenticate.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

const router = express.Router();
router.use("/", authenticate, authorize("ADMIN"), getDashboardController);

export default router;
