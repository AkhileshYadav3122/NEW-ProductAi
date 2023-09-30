import React from "react";
import "./assets/css/style.css";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  return (
   

    <section class="section bg-darker is-dark section-top-0 has-shape" id="#service">
      <div class="nk-shape bg-shape-blur-a start-50 top-50 translate-middle"></div>
      <div class="container " >
        <div class="section-head">
          <div class="row justify-content-center text-center">
            <div class="col-lg-9 col-xl-6 col-xxl-5">
              <h2 class="title">Our Services</h2>
              <p class="lead">
              Explore the Wide Range of Features and Capabilities in Our Integrated Language, Audio and Vision Toolbox.
              </p>
            </div>
          </div>
        </div>
        <div class="section-content ">
          <div class="row g-gs text-white">
            <div class="col-md-6 col-xl-4 mb-3">
              <div class="cardlanding rounded-4 border-0 h-100">
                <div class="cardlanding-body">
                  <div class="feature">
                    <div class="feature-media">
                      <div class="media media-middle media-xl text-indigo bg-indigo bg-opacity-20 rounded-3">
                      {/* <i class="bi bi-translate"></i>     */}
                      <i class="fa fa-language fa-2x" ></i>
        
                                </div>
                    </div>
                    <div class="feature-text">
                      <h4 class="title text-white">Translation</h4>
                       <p>Translate text from any source and get audio translations for language learners, visually impaired, and audio preference users. </p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-4 mb-3">
              <div class="cardlanding rounded-4 border-0 h-100">
                <div class="cardlanding-body">
                  <div class="feature">
                    <div class="feature-media">
                      <div class="media media-middle media-xl text-indigo bg-indigo bg-opacity-20 rounded-3">
                      <i class="fa fa-files-o fa-2x"></i>                      </div>
                    </div>
                    <div class="feature-text">
                      <h4 class="title">Summarization</h4>
                        <p>Provides fast, accurate and concise document summarization. Ideal for summarizing lectures, interviews, and podcasts. </p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-4 mb-3">
              <div class="cardlanding rounded-4 border-0 h-100">
                <div class="cardlanding-body">
                  <div class="feature">
                    <div class="feature-media">
                      <div class="media media-middle media-xl text-indigo bg-indigo bg-opacity-20 rounded-3">
                      <i class="fa fa-address-card-o fa-2x" aria-hidden="true"></i>                      </div>
                    </div>
                    <div class="feature-text">
                      <h4 class="title">Lipi</h4>
                    <p>Streamline data extraction from Aadhar cardlandings, PAN cardlandings, passports, checks, and more. Save details for efficient data management. </p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-4 mb-3">
              <div class="cardlanding rounded-4 border-0 h-100">
                <div class="cardlanding-body">
                  <div class="feature">
                    <div class="feature-media">
                      <div class="media media-middle media-xl text-indigo bg-indigo bg-opacity-20 rounded-3">
                      <i class="fa fa-globe fa-2x"></i>                      </div>
                    </div>
                    <div class="feature-text">
                      <h4 class="title">OCR</h4>
                 <p>Users to translate extracted text into various languages. This functionality is particularly useful for translating text from images. </p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-4 mb-3">
              <div class="cardlanding rounded-4 border-0 h-100">
                <div class="cardlanding-body">
                  <div class="feature">
                    <div class="feature-media">
                      <div class="media media-middle media-xl text-indigo bg-indigo bg-opacity-20 rounded-3">
                        <div class=" d-flex align-items-end">
                        <i class="fa fa-venus-mars fa-2x" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                    <div class="feature-text">
                      <h4 class="title">Gender Identification</h4>
                        <p>Our platform provides transcriptions with speaker gender identification, enabling voice analytics, sentiment analysis. </p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-4 mb-3">
              <div class="cardlanding rounded-4 border-0 h-100">
                <div class="cardlanding-body">
                  <div class="feature">
                    <div class="feature-media">
                      <div class="media media-middle media-xl text-indigo bg-indigo bg-opacity-20 rounded-3">
                      <i class="fa fa-clock-o  fa-2x"></i>
                      </div>
                    </div>
                    <div class="feature-text">
                      <h4 class="title">Real-Time Translation</h4>
                       <p>Facilitates seamless communication, enhances inclusivity, and improves the overall experience for participants in live events, conferences. </p>

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

export default ServicesSection;
