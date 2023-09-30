import React from "react";
import { Link } from "react-router-dom";
import {
  RiTwitterLine,
  RiFacebookLine,
  RiInstagramLine,
  RiSkypeLine,
  RiLinkedinLine,
} from "react-icons/ri";

import { BsArrowRight } from "react-icons/bs";
import "./assets/css/style.css";
import logo from "./images/33.png";

const Footer = () => {
  return (
    <footer class="nk-footer">
      <section class="section bg-light section-0 has-mask">
        <div class="nk-mask bg-darker top-50"></div>
        <div class="container container-xl">
          <div class="section-wrap bg-dark is-dark rounded-4 has-shape overflow-hidden" >
            <div class="nk-shape bg-shape-blur-b start-50 top-50 translate-middle"></div>
            <div class="section-content p-4 p-sm-5 p-xl-7" style={{backgroundColor:"#121a2f !important"}}>
              <div class="row justify-content-between align-items-center g-5">
                <div class="col-xl-5 col-lg-6">
                  <div class="block-text">
                    <h6 class="overline-title text-primary">
                      Artificial intelligence will help everyone succeed
                    </h6>
                    <h2 class="title">Making AI is Easy and Safe</h2>
                    <p>
                     Abha technologies can help businesses increase profits
                      by improving their content marketing strategy. By
                      leveraging the power of artificial intelligence a faster
                      rate than ever before.
                    </p>

                    <ul class="btn-list btn-list-inline gy-0">
                      <li>
                        <Link
                          to="#"
                          class="btn btn-lg btn-primary rounded-pill"
                        >
                          <span>Start free Trial</span>
                          <BsArrowRight className="icon" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 align-self-end">
                  <div class="bg-white rounded-top-4">
                    <div class="rounded-top-4 bg-gradient-primary bg-opacity-70 p-5 pb-0 mb-n4 mb-sm-n5 mb-xl-n7">
                      <div class="block-gfx">
                        <img
                          class="w-100 rounded-top-3 shadow-sm"
                          src="https://img.freepik.com/premium-photo/artificial-intelligence-3d-rendering-concept-generative-ai_887552-4396.jpg?w=826"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section bg-darker is-dark">
        <div class="container">
          <div class="row g-5">
            <div class="col-xl-4 col-lg-7 col-md-9 me-auto order-xl-first">
              <div class="block-text">
                <Link to="#" class="logo-link mb-4">
                  <div class="logo-wrap">
                    <img
                      className="logo-img logo-light"
                      src={logo}
                      alt=""
                      style={{ maxHeight: "35px" }}
                    />
                  </div>
                </Link>

                <h4 class="title" style={{ color: "#4154f1" }}>
                  Save time. Get inspired.
                </h4>
                <p>
                  Raheja Plaza, A-101, Lal Bahadur Shastri Marg, next to
                  Kalpataru Society, Nityanand Nagar, Ghatkopar West, Mumbai
                </p>
                <ul class="btn-list btn-list-inline g-1">
                  <li>
                    <Link class="link-base footericon" to="#">
                      {" "}
                      <RiTwitterLine />
                    </Link>
                  </li>
                  <li>
                    <Link class="link-base footericon" to="#">
                      {" "}
                      <RiFacebookLine />
                    </Link>
                  </li>
                  <li>
                    <Link class="link-base footericon" to="#">
                      <RiInstagramLine />
                    </Link>
                  </li>
                  <li>
                    <Link class="link-base footericon" to="#">
                      <RiLinkedinLine />
                    </Link>
                  </li>
                </ul>
                <p class="text-heading mt-4">
                  © 2023 Abha. All Rights Reserved{" "}
                  {/* <a target="_blank" href="https://softnio.com">
                    Softnio
                  </a>{" "} */}
                </p>
              </div>
            </div>

            <div class="col-xl-2 col-lg col-md-3 col-6">
              <div class="wgs">
                <h6 class="wgs-title">Company</h6>
                <ul class="list gy-2 list-link-base">
                  <li>
                    <Link class="link-base" to="#">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link class="link-base" to="#about">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link class="link-base" to="#service">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link class="link-base" to="#features">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link class="link-base" to="#faq">
                      FAQ's
                    </Link>
                  </li>
                  {/* <li><Link class="link-base" to="#">Contact Us</Link></li> */}
                </ul>
              </div>
            </div>
            <div class="col-xl-2 col-lg col-md-3 col-6">
              <div class="wgs">
                <h6 class="wgs-title">Use Case</h6>
                <ul class="list gy-2 list-link-base">
                  <li>
                    <Link class="link-base" to="#">
                      Text Translator
                    </Link>
                  </li>
                  <li>
                    <Link class="link-base" to="#">
                      Summerizer
                    </Link>
                  </li>
                  <li>
                    <Link class="link-base" to="#">
                      OCR
                    </Link>
                  </li>
                  <li>
                    <Link class="link-base" to="#">
                      Content Writter
                    </Link>
                  </li>
                  <li>
                    <Link class="link-base" to="#">
                      Cipher
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-xl-3 col-lg col-md-3 col-6">
              <div class="wgs">
                <h6 class="wgs-title">Support</h6>
                <ul class="list gy-2 list-link-base">
                  <li>
                    <Link class="link-base" to="/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link class="link-base" to="/signup">
                      Sign up
                    </Link>
                  </li>
                  <li>
                    <Link class="link-base" to="#">
                      Privacy Statement
                    </Link>
                  </li>
                  <li>
                    <Link class="link-base" to="#">
                      Terms of use
                    </Link>
                  </li>
                  <li>
                    <Link class="link-base" to="#">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
