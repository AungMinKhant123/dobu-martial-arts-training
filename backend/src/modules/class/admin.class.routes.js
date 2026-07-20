import express from "express";
import {
  createAdminClassController,
  deleteAdminClassController,
  getAdminClassByIdController,
  getAdminClassesController,
  publishAdminClassController,
  unpublishAdminClassController,
  updateAdminClassController,
} from "./admin.class.controller.js";
import { authenticate } from "../../middleware/authenticate.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";
import upload from "../../middleware/cloudinary.middleware.js";

const router = express.Router();

router.get("/", getAdminClassesController);
router.get(
  "/:id",
  //   authenticate,
  //   authorize("ADMIN"),
  getAdminClassByIdController,
);
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  upload.single("image"),
  createAdminClassController,
);
router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  upload.single("image"),
  updateAdminClassController,
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteAdminClassController,
);

router.patch("/:id/publish", publishAdminClassController);

router.patch("/:id/unpublish", unpublishAdminClassController);

export default router;
