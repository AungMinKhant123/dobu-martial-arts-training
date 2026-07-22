import { Routes, Route } from "react-router";
import "./App.css";
import UserLayout from "./layouts/UserLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import LogIn from "./pages/admin/LogIn.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<UserLayout />} />
        <Route path="/admin/*" element={<LogIn />} />
        <Route path="/admin/dashboard/*" element={<AdminLayout />} />
      </Routes>
    </>
  );
};

export default App;
