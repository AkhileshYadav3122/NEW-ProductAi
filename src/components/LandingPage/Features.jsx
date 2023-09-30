import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./assets/css/style.css";

const Features = () => {
  return (
    <section  class="section bg-white has-mask" id="features">
                        <div class="nk-mask bg-pattern-dot-sm bg-blend-around"></div>

      <div class="container">
        <div class="section-head">
          <div class="row justify-content-center text-center">
            <div class="col-lg-9 col-xl-8 col-xxl-7">
              <div class="badge text-bg-primary-soft-outline text-uppercase text-tracking-1 rounded-pill px-3 py-2 mb-3">
              Feature 
              </div>
              <h2 class="title h1">Our Featured Solutions
</h2>
              <p class="lead px-xl-6">
                Our platform utilizes advanced technologies like NLP, Computer
                Vision, and Speech Technology to provide an exceptional user
                experience.
              </p>
            </div>
          </div>
        </div>

        <div class="section-content">
          <div class="row gy-gs gx-xxl-9">
            <div class="col-lg-6">
              <div class="feature feature-inline">
                <div class="feature-media">
                  <div class="text-gradient-primary fs-2 d-inline-flex">
                    {" "}
                    <i class="bi bi-bug fs-1"></i>{" "}
                  </div>
                </div>
                <div class="feature-text">
                  <h4 class="title">NLP(Natural Language Processing)</h4>
                  <p>
                    {" "}
                    Effortless Communication - Machines understand and interpret
                    human language for seamless communication. No more manual
                    data entry, just effortless interactions through speech
                    input text processing.
                  </p>
                </div>
              </div>
              <div class="feature feature-inline">
                <div class="feature-media">
                  <div class="text-gradient-primary fs-2 d-inline-flex">
                    {" "}
                    <i className="bi-mic fs-1"></i>
                  </div>
                </div>
                <div class="feature-text">
                  <h4 class="title">Speech Technology</h4>
                  <p>
                    
                    Intuitive Voice Interactions - Interact with our platform
                    intuitively through Speech Technology. Enjoy voice commands,
                    transcription services, and voice-enabled interfaces for
                    effortless engagement and efficient navigation.
                  </p>
                </div>
              </div>
              <div class="feature feature-inline">
                <div class="feature-media">
                  <div class="text-gradient-primary fs-2 d-inline-flex">
                    {" "}
                    <i className="bi-cpu fs-1"></i>
                  </div>
                </div>
                <div class="feature-text">
                  <h4 class="title">Computer Vision</h4>
                  <p>
                    Visual Insights Unleashed - Unlock valuable information from
                    images and videos with our Computer Vision. Detect objects,
                    recognize faces, and revolutionize industries like
                    e-commerce, security, and healthcare.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="nk-hero-gfx me-xxl-n7">
                <div class="p-1 rounded-3 ">
                  <img
                    class="w-100 rounded-3"
                    src="https://show.moxcreative.com/centrix/wp-content/uploads/sites/26/2021/12/img_1.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
