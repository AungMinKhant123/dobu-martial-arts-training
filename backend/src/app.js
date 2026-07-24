import express from "express";
import cors from "cors";
import enquiryRoutes from "./modules/enquiry/enquiry.routes.js";
import feedbackRoutes from "./modules/feedback/feedback.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import classRoutes from "./modules/class/class.routes.js";
import enrollmentRoutes from "./modules/enrollment/enrollment.routes.js";
import blogRoutes from "./modules/blog/blog.routes.js";
import homeRoutes from "./modules/home/home.routes.js";
import instructorRoutes from "./modules/instructor/instructor.routes.js";
import adminDashboardRoutes from "./modules/admin-dashboard/dashboard.routes.js";
import adminClassesRoutes from "./modules/class/admin.class.routes.js";
import adminBlogsRoutes from "./modules/blog/admin.blog.routes.js";
import adminInstructorsRoutes from "./modules/instructor/admin.instructor.routes.js";
import adminEnquiriesRoutes from "./modules/enquiry/admin.enquiry.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.json({ message: "Do bu martial arts api is running" });
});

app.use("/api/home", homeRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/blogs", blogRoutes);

app.use("/api/auth", authRoutes);

// admin
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/admin/classes", adminClassesRoutes);
app.use("/api/admin/instructors", adminInstructorsRoutes);
app.use("/api/admin/blogs", adminBlogsRoutes);
app.use("/api/admin/enquiries", adminEnquiriesRoutes);

app.use(errorHandler);

export default app;
