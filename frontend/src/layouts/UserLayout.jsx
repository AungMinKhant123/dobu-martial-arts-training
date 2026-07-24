import { Routes, Route } from "react-router";
import React from "react";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import Home from "../pages/user/Home";
import AboutUs from "../pages/user/AboutUs";
import ClassDetail from "../pages/user/ClassDetail";
import Contact from "../pages/user/Contact.jsx";
import Blog from "../pages/user/Blog";
import Payment from "../pages/user/Payment";
import InstructorDetail from "../pages/user/InstructorDetail";
import ChatbaseWidget from "../components/user/ChatbaseWidget.jsx";

const UserLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="classes" element={<ClassDetail />} />
          <Route path="instructors/:id" element={<InstructorDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="payment" element={<Payment />} />
        </Routes>
      </main>
      <ChatbaseWidget />
      <Footer />
    </>
  );
};

export default UserLayout;
