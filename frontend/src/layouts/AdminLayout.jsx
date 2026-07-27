import { Routes, Route } from "react-router";
import Dashbord from "../pages/admin/Dashbord.jsx";
import Courses from "../pages/admin/Courses.jsx";
import NavBar from "../components/admin/NavBar.jsx";
import Schedule from "../pages/admin/Schedule.jsx";

const AdminLayout = () => {
  return (
    <>
      <NavBar />
      <main className="w-5xl ml-56 p-7">
        <Routes>
          <Route index element={<Dashbord />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/schedules" element={<Schedule />} />
        </Routes>
      </main>
    </>
  );
};

export default AdminLayout;
