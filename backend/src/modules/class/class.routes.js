import express from "express";
import { getClassController } from "./class.controller.js";
import { authenticate } from "../../middleware/authenticate.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

const router = express.Router();

router.get("/", authenticate, authorize("ADMIN"), getClassController);

export default router;
