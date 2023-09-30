import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import OCRIMG from "./media-OCR.png";
// import "../../ProductAi/Pages/OCR/Documents.css";
// import Nayanailogo from "../Auth/Nayanailogo.png";
// import Nayanailogo from "../../Auth/Nayanailogo.png";
// import a2 from "../../Auth/a2";
// import a2 from "../../Auth/a2.png"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faCopy,
  faExchangeAlt,
  faDownload,
  faFileLines,
  faStop,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import videoSource from "../../Homepage/7-2-label-blur-shopping-mall-people-detection.mp4"; // Adjust the path to your video file
import AboutVideo from "../../Homepage/viso-suite-landing-video.mp4";
import Face from "../../Homepage/face.png";
import impre from "../../Homepage/impression.png";
import reco from "../../Homepage/recognition.png";
import fasttime from "../../Homepage/fast-time.png";

const Nayanhome = () => {
  return (
    <div>
      <section id="hero" class="d-flex align-items-center ">
        <video autoPlay muted loop playsInline>
          <source src={videoSource} type="video/mp4" />
        </video>
        <div className="gradient-overlay"></div>

        <div
          class="container position-relative"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-10 text-center">
              <h1 className="text-white">Annotate image and video data</h1>
              <p className="text-white">
                Unlock new opportunities for industrial efficiency with a
                cutting-edge Industrial AI platform
              </p>
            </div>
            <div class="text-center">
              <Link to="/admin/Precord" class="btn-get-started scrollto">
                Explore <i class="bi bi-arrow-right-circle-fill"> </i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="what-we-do" class="what-we-do">
        <div class="container">
          <div class="section-title text-center">
            <h2>What We Do</h2>
            <p>Magnam dolores commodi suscipit consequatur ex aliquid</p>
          </div>

          <div class="row">
            <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
              <div class="icon-box">
                <div class="icon">
                  <img src={Face} class="img-fluid" alt="" />{" "}
                </div>
                <h4>
                  <a href="">Facial Recognition </a>
                </h4>
                <p>
                  Identify & recognize with facial features in live video,images
                  or recordings.
                </p>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
              <div class="icon-box">
                <div class="icon">
                  <img src={impre} class="img-fluid" alt="" />{" "}
                </div>
                <h4>
                  <a href="">Video Analytics</a>
                </h4>
                <p>
                  Derive actionable & quantifiable insights from live or video
                  recordings
                </p>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
              <div class="icon-box">
                <div class="icon">
                  <img src={reco} class="img-fluid" alt="" />{" "}
                </div>
                <h4>
                  <a href="">Object Detection</a>
                </h4>
                <p>
                  Detect, classify and analyse objects in live feed,images or
                  videos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="about">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <img
                src="https://viso.ai/wp-content/uploads/2021/01/face-detection-visoai.jpg"
                class="img-fluid"
                alt=""
              />
            </div>
            <div class="col-lg-6 pt-4 pt-lg-0">
              <div class="section-title ">
                <h3>About Us</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <ul>
                <li>
                <i class="bi bi-check-all"></i>
 Ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </li>
                <li>
                <i class="bi bi-check-all"></i>
 Duis aute irure dolor in
                  reprehenderit in voluptate velit.
                </li>
              </ul>
              <div class="row icon-boxes">
                <div class="col-md-6">
                <i class="bi bi-joystick"></i>
                  <h4>Corporis voluptates sit</h4>
                  <p>
                    Consequuntur sunt aut quasi enim aliquam quae harum pariatur
                    laboris nisi ut aliquip
                  </p>
                </div>
                <div class="col-md-6 mt-4 mt-md-0">
                <i class="bi bi-joystick"></i>
                  <h4>Ullamco laboris nisi</h4>
                  <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nayanhome;
