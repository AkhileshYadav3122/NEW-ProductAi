import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Register/Signup";
import Navigation from "./components/LandingPage/navigation";
import Services from "./components/LandingPage/Services";
import About from "./components/LandingPage/About";
import Footer from "./components/LandingPage/Footer";
import AdminLayout from "./components/ProductAi/Layout/AdminLayout";
import Features from "./components/LandingPage/Features";
import FAQ from "./components/LandingPage/FAQ";
import CaseStudy from "./components/LandingPage/CaseStudy";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </div>
  );
};

const LandingPage = () => {
  return (
    
    <div class="nk-app-root  bg-darkerk" data-menu-collapse="lg">
      {/* <div class="nk-app-root has-mask">
        <div class="nk-mask bg-pattern-dot-white-sm"></div> */}
        <Navigation />
        {/* <Header /> */}
        < main class="nk-pages">
        <Services />

          <About />

          <Features />
          <CaseStudy/>
          <FAQ />
        </main>
        <Footer />

       
    
      </div>
  );
};

export default App;
