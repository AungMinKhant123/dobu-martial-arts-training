import { Routes, Route } from "react-router";
import Footer from "../components/admin/Footer";
import Header from "../components/admin/Header";
import Dashbord from "../pages/admin/Dashbord.jsx";
import Courses from "../pages/admin/Courses.jsx";

const AdminLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Dashbord />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AdminLayout;
