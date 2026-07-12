import express from "express";
import cors from "cors";
import enquiryRoutes from "./modules/enquiry/enquiry.routes.js";
import feedbackRoutes from "./modules/feedback/feedback.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import classRoutes from "./modules/class/class.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.json({ message: "Do bu martial arts api is running" });
});

app.use("/api/enquiries", enquiryRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/class", classRoutes);

app.use(errorHandler);

export default app;
