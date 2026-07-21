import { Routes, Route } from "react-router";
import React from "react";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import Home from "../pages/user/Home";
import AboutUs from "../pages/user/AboutUs";
import ClassDetail from "../pages/user/ClassDetail";
import ChatbaseWidget from "../components/user/ChatbaseWidget";

const UserLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="classes" element={<ClassDetail />} />
        </Routes>
      </main>
      <ChatbaseWidget />
      <Footer />
    </>
  );
};

export default UserLayout;
