import express from "express";
import { submitEnquiry } from "./enquiry.controller.js";

const router = express.Router();

router.post("/", submitEnquiry);

export default router;
