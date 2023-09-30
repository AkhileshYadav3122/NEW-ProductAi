import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
// import { BsArrowRight } from "react-icons/fi";
import "./assets/css/style.css";
// import about from "./assets/img/about.jpg";

import img from "./images/Img_7.png";

const About = () => {
  return (
   
    <section class="section section-bottom-0 bg-white rounded-top-6" id="about">
    <div class="container">
        <div class="section-head">
            <div class="row justify-content-center text-center">
                <div class="col-lg-9 col-xl-8 col-xxl-5">
                    <div class="badge text-bg-primary-soft-outline text-uppercase text-tracking-1 rounded-pill px-3 py-2 mb-3">About Us</div>
                    <h2 class="title">Empowering the Future with AI Innovation </h2>
                    <p class="lead">Cloudstrats is enhancing productivity through AI synergy, which
  integrates language, audio, and vision solutions.</p>
                </div>
            </div>
        </div>
        <div class="section-content">
            <div class="row gy-3 justify-content-center">
                <div class="col-xxl-12">
                    <div class="bg-primary bg-opacity-10 p-5 p-lg-6 rounded-4">
                        <div class="row g-gs flex-lg-row-reverse justify-content-between align-items-center">
                            <div class="col-lg-6 col-xl-5">
                                <div class="rounded-4 bg-gradient-primary  bg-opacity-50 p-5 pb-0">
                                    <div class="block-gfx"><img class="w-100 rounded-top-3 shadow-sm" src="https://zoko-react.hibootstrap.com/images/about-img-2.jpg" alt=""/></div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-xxl-5">
                                <div class="block-text pe-xl-5"><img class="h-3rem mb-3" src="https://copygen.themenio.com/images/icon/paper.svg" alt=""/>
                                    <h3 class="title">Enabling Transformation across Industries through Advanced
               Technologies.</h3>
                                    <p>
                                    We are an Indian AI product company driving exponential
                technology growth. Our platforms harness computer vision,
                speech, and text solutions to solve real-world problems.
                Leveraging Deep Learning, NLP, and ML, we accelerate digital
                transformation in industries like Citizen Services, Public
                Safety, Education, Health, and Transport. From Command Control
                Centers to Fraud Detection, our innovations fuel sustainable
                development goals.
                                    </p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
</section>
  );
};

export default About;
