import React from "react";

const FAQ = () => {
  return (
    <>
      
      <section class="section section-lg has-shape " id="faq">
        <div class="nk-shape bg-shape-border-e ms-n25p mt-2 start-50 translate-middle-x"></div>
        <div class="container">
          {/* <div class="nk-shape bg-shape-wormhole-a mt-n45p mt-xl-n40p mt-xxl-n35p ms-2 start-50 top-100 translate-middle-x"></div> */}
          <div class="section-head">
            <div class="row justify-content-center text-center">
              <div class="col-xl-8">
                <h2 class="title">Frequently Asked Questions</h2>
                <p class="lead">
                  If you have any questions not answered in the FAQ, please do
                  not hesitate to contac us.
                </p>
              </div>
            </div>
          </div>
          <div class="section-content">
            <div class="row g-gs justify-content-center">
              <div class="col-xl-9 col-xxl-8">
                <div class="accordion accordion-separated" id="faq-1">
                  <div class="accordion-item border-0 bg-gradient-light">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-1-1"
                      >
                        {" "}
                        What does your company specialize in?{" "}
                      </button>
                    </h2>
                    <div
                      id="faq-1-1"
                      class="accordion-collapse collapse show"
                      data-bs-parent="#faq-1"
                    >
                      <div class="accordion-body">
                        {" "}
                        We specialize in developing AI-powered solutions and
                        platforms that drive exponential technological growth.
                        Our expertise lies in harnessing computer vision, speech
                        recognition, and text analysis to solve real-world
                        problems across various industries.{" "}
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item border-0 bg-gradient-light">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-1-2"
                      >
                        How do your platforms accelerate digital transformation?{" "}
                      </button>
                    </h2>
                    <div
                      id="faq-1-2"
                      class="accordion-collapse collapse"
                      data-bs-parent="#faq-1"
                    >
                      <div class="accordion-body">
                        {" "}
                        Our platforms utilize cutting-edge technologies such as
                        Deep Learning, Natural Language Processing (NLP), and
                        Machine Learning (ML) to accelerate digital
                        transformation in industries like Citizen Services,
                        Public Safety, Education, Health, and Transport. These
                        technologies enable us to provide innovative and
                        efficient solutions that enhance operational processes
                        and user experiences.{" "}
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item border-0 bg-gradient-light">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-1-3"
                      >
                        {" "}
                        Which industries do you focus on for implementing your
                        solutions?{" "}
                      </button>
                    </h2>
                    <div
                      id="faq-1-3"
                      class="accordion-collapse collapse"
                      data-bs-parent="#faq-1"
                    >
                      <div class="accordion-body">
                        {" "}
                        We focus on a wide range of industries, including
                        Citizen Services, Public Safety, Education, Health, and
                        Transport. Our goal is to address challenges and bring
                        about positive changes in these sectors through the
                        application of AI-driven solutions.{" "}
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item border-0 bg-gradient-light">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq-1-4"
                      >
                        {" "}
                        How do you integrate Deep Learning, NLP, and ML into
                        your solutions?{" "}
                      </button>
                    </h2>
                    <div
                      id="faq-1-4"
                      class="accordion-collapse collapse"
                      data-bs-parent="#faq-1"
                    >
                      <div class="accordion-body">
                        {" "}
                        Deep Learning, Natural Language Processing, and Machine
                        Learning are integral components of our solutions. Deep
                        Learning enables us to develop sophisticated models that
                        understand and process complex data, while NLP empowers
                        us to analyze and understand human language. ML
                        algorithms allow our platforms to learn and adapt based
                        on data, enhancing their performance over time.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
