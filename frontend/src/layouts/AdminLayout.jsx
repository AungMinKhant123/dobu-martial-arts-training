import { Routes, Route, Navigate } from "react-router";
import Dashbord from "../pages/admin/Dashbord.jsx";
import Courses from "../pages/admin/Courses.jsx";
import NavBar from "../components/admin/NavBar.jsx";
import Schedule from "../pages/admin/Schedule.jsx";
import ScheduleAddUpdate from "../pages/admin/ScheduleAddUpdate.jsx";
import Blogs from "../pages/admin/Blogs.jsx";
import BlogAddUpdate from "../pages/admin/BlogAddUpdate.jsx";
import Instructors from "../pages/admin/Instructors.jsx";
import InstructorAddUpdate from "../pages/admin/InstructorAddUpdate.jsx";
import { isAuthenticated } from "../services/authService.js";
import Enquiries from "../pages/admin/Enquiries.jsx";
import EnquiryDetail from "../pages/admin/EnquiryDetail.jsx";

const AdminLayout = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <>
      <NavBar />
      <main className="w-5xl ml-56 p-7">
        <Routes>
          <Route index element={<Dashbord />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/schedules" element={<Schedule />} />
          <Route path="/schedules/new" element={<ScheduleAddUpdate />} />
          <Route path="/schedules/:id" element={<ScheduleAddUpdate />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/new" element={<BlogAddUpdate />} />
          <Route path="/blogs/:id" element={<BlogAddUpdate />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/instructors/new" element={<InstructorAddUpdate />} />
          <Route path="/instructors/:id" element={<InstructorAddUpdate />} />
          <Route path="/enquiries" element={<Enquiries />} />
          <Route path="/enquiries/:id" element={<EnquiryDetail />} />
        </Routes>
      </main>
    </>
  );
};

export default AdminLayout;
