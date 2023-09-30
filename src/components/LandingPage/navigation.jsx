import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./assets/css/style.css";
// import "./assets/js/scripts.js"
import logo from "./images/33.png";
import Homeimg from "./images/homeimg.png";
import translate from "./images/iconhero/trans.png";
import summerizer from "./images/iconhero/summ.png";
import Ocr from "./images/iconhero/ocr.png";
import Const from "./images/iconhero/cont.png";

const Navigation = () => {
  const [navbarMobile, setNavbarMobile] = useState(false);

  const handleNavToggle = () => {
    setNavbarMobile(!navbarMobile);
  };

  // const handleNavLinkClick = (hash) => {
  //   if (document.querySelector(hash)) {
  //     if (navbarMobile) {
  //       setNavbarMobile(false);
  //     }
  //     scrollto(hash);
  //   }
  // };
  const handleNavLinkClick = (targetSection) => {
    let hash;

    if (targetSection === "about") {
      hash = "#hero"; // Scroll to the "Hero" section
    } else if (targetSection === "services") {
      hash = "#about"; // Scroll to the "About" section
    } else {
      hash = targetSection; // Scroll to other sections as usual
    }

    if (document.querySelector(hash)) {
      if (navbarMobile) {
        setNavbarMobile(false);
      }
      scrollto(hash);
    }
  };

  const scrollto = (hash) => {
    const target = document.querySelector(hash);
    window.scrollTo({
      top: target.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <header class="nk-header bg-darker is-dark has-mask">
      <div class="nk-shape bg-shape-blur-q mt-n20p ms-10p start-50 translate-middle-x"></div>
      <div class="nk-shape bg-shape-blur-r mt-n10p ms-n10p start-50 translate-middle-x"></div>
      <div class="nk-shape bg-shape-border-a mt-n10 ms-40p start-50 top-100 translate-middle-x"></div>
      <div class="nk-shape bg-shape-border-b mt-n9 ms-30p start-50 translate-middle-x"></div>
      <div class="nk-shape bg-shape-border-c mt-12 ms-n40p start-50 translate-middle-x"></div>
      <div class="nk-header-main nk-menu-main will-shrink is-transparent ignore-mask"></div>
      <div class="nk-mask bg-pattern-dot-white-sm bg-blend-bottom"></div>
       <div class="nk-header-main nk-menu-main is-transparent will-shrink on-dark ignore-mask">
        <div class="container">
          <div class="nk-header-wrap">
            <div class="nk-header-logo">
              <Link to="/" class="logo-link">
                <div class="logo-wrap">
                  <img
                    className="logo-img logo-light"
                    src={logo}
                    alt=""
                    style={{ maxHeight: "35px" }}
                  />
                </div>
              </Link>
            </div>

            <div class="nk-header-toggle">
              <button class="btn btn-light btn-icon header-menu-toggle">
                <i class="bi bi-list"></i>
              </button>
            </div>
            <nav class="nk-header-menu nk-menu">
              <ul class="nk-menu-list mx-auto">
                <li class="nk-menu-item has-dropdown">
                  <Link to="#hero" class="nk-menu-link">
                    <span class="nk-menu-text">Home</span>
                  </Link>
                </li>
                <li class="nk-menu-item">
                  <Link
                    to="#about"
                    class="nk-menu-link"
                    onClick={() => handleNavLinkClick("#about")}
                  >
                    <span class="nk-menu-text">About</span>
                  </Link>
                </li>
                <li class="nk-menu-item">
                  <Link
                    to="#caseStudy"
                    class="nk-menu-link"
                    onClick={() => handleNavLinkClick("#caseStudy")}
                  >
                    <span class="nk-menu-text">Services</span>
                  </Link>
                </li>
                <li class="nk-menu-item">
                  <Link
                    to="#features"
                    class="nk-menu-link"
                    onClick={() => handleNavLinkClick("#features")}
                  >
                    <span class="nk-menu-text">Features</span>
                  </Link>
                </li>
                <li class="nk-menu-item">
                  <Link
                    to="#faq"
                    class="nk-menu-link"
                    onClick={() => handleNavLinkClick("#faq")}
                  >
                    <span class="nk-menu-text">FAQ's</span>
                  </Link>
                </li>
              </ul>
              <ul class="nk-menu-buttons flex-lg-row-reverse">
                <li>
                  <Link
                    to="/login"
                    class="btn btn-outline-primary rounded-pill px-4"
                  >
                    Login
                  </Link>
                </li>
                {/* <li><Link   to="/signup" class="link link-light" >Sign in </Link></li> */}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div class="nk-hero py-xl-5 overflow-hidden has-shape mb-5" id="#hero">
        <div class="nk-shape bg-shape-blur-b mt-n5 start-50 top-50 translate-middle"></div>
        <div class="container">
          <div class="row justify-content-center text-center">
            <div class="col-lg-11 col-xl-10 col-xxl-9">
              <div class="nk-hero-content py-5 py-lg-6">
                <h1 class="title mb-3 mb-lg-4 display-6">
                  {" "}
                  Language, Audio, and Vision
                  <div class="text-gradient-primary">
                    <span
                      class="type-init"
                      data-strings='"  Transformed ", "by AI"'
                    ></span>
                  </div>
                </h1>
                <p class="lead px-md-8 px-lg-6 px-xxl-12 mb-4 mb-lg-5">
                  Experience Seamless Language Translation, Audio Solutions,
                  OCR, and Computer Vision - Harness the Potential of AI for
                  Enhanced Communication, Productivity, and Visual Intelligence.
                </p>
              
              </div>
              <div class="nk-hero-gfx position-relative">
                <img class="w-100 rounded-4" src={Homeimg} alt="" />
                <div class="d-none d-md-block position-absolute top-0 end-100 me-5 me-lg-8 me-xl-12 mt-n3">
                  <div class="media media-2xl rounded-pill mx-auto">
                    <img src={translate} alt="" />
                  </div>
                  <div class="badge bg-dark p-2 mt-2 fw-normal text-white text-opacity-75">
                    Translation
                  </div>
                </div>
                <div class="d-none d-md-block position-absolute top-50 end-100 me-3 me-lg-4 mt-n5">
                  <div class="media media-2xl rounded-pill mx-auto">
                    <img src={summerizer} alt="" />
                  </div>
                  <div class="badge bg-dark p-2 mt-2 fw-normal text-white text-opacity-75">
                  Summarization
                  </div>
                </div>
                <div class="d-none d-md-block position-absolute top-0 start-100 ms-5 ms-lg-7 ms-xl-10 mt-n7">
                  <div class="media media-2xl rounded-pill mx-auto">
                    <img src={Ocr} alt="" />
                  </div>
                  <div class="badge bg-dark p-2 mt-2 fw-normal text-white text-opacity-75">
                    OCR
                  </div>
                </div>
                <div class="d-none d-md-block position-absolute top-50 start-100 ms-4 ms-lg-5 mt-n2">
                  <div class="media media-2xl rounded-pill mx-auto">
                    <img src={Const} alt="" />
                  </div>
                  <div class="badge bg-dark p-2 mt-2 fw-normal text-white text-opacity-75">
                    Content Writting
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
