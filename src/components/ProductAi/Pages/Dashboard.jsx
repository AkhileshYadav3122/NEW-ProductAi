import { BsTranslate } from "react-icons/bs";

import React from "react";

const Dashboard = () => {
  return (
    <>
      {/* <div class="pagetitle">
        <h1>Tabs</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li class="breadcrumb-item">Components</li>
            <li class="breadcrumb-item active">Tabs</li>
          </ol>
        </nav>
      </div> */}
      <section class="section1">
        <div class="row">
          <div class="col-lg-12">
            <div class="cardtab">
              <div class="card-body">
                <ul
                  class="nav nav-tabs nav-tabs-bordered d-flex"
                  id="borderedTabJustified"
                  role="tablist"
                >
                  <li class="nav-item flex-fill" role="presentation">
                    <button
                      class="nav-link w-100 active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#bordered-justified-home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      All
                    </button>
                  </li>
                  <li class="nav-item flex-fill" role="presentation">
                    <button
                      class="nav-link w-100"
                      id="Text-translate"
                      data-bs-toggle="tab"
                      data-bs-target="#bordered-justified-profile"
                      type="button"
                      role="tab"
                      aria-controls="Texttranslate"
                      aria-selected="false"
                    >
                      Text translate
                    </button>
                  </li>
                  <li class="nav-item flex-fill" role="presentation">
                    <button
                      class="nav-link w-100"
                      id="Translate-files"
                      data-bs-toggle="tab"
                      data-bs-target="#bordered-justified-contact"
                      type="button"
                      role="tab"
                      aria-controls="Translatefiles"
                      aria-selected="false"
                    >
                      Translate files
                    </button>
                  </li>
                  <li class="nav-item flex-fill" role="presentation">
                    <button
                      class="nav-link w-100"
                      id="Write-with-AI"
                      data-bs-toggle="tab"
                      data-bs-target="#bordered-justified-contact"
                      type="button"
                      role="tab"
                      aria-controls="WritewithAI"
                      aria-selected="false"
                    >
                      Write with AI
                    </button>
                  </li>
                  <li class="nav-item flex-fill" role="presentation">
                    <button
                      class="nav-link w-100"
                      id="Speech"
                      data-bs-toggle="tab"
                      data-bs-target="#bordered-justified-contact"
                      type="button"
                      role="tab"
                      aria-controls="Speech"
                      aria-selected="false"
                    >
                      Speech{" "}
                    </button>
                  </li>
                  <li class="nav-item flex-fill" role="presentation">
                    <button
                      class="nav-link w-100"
                      id="Assets"
                      data-bs-toggle="tab"
                      data-bs-target="#bordered-justified-contact"
                      type="button"
                      role="tab"
                      aria-controls="Assets"
                      aria-selected="false"
                    >
                      Assets
                    </button>
                  </li>
                </ul>
                <div class="tab-content pt-2" id="borderedTabJustifiedContent">
                  <div
                    class="tab-pane fade show active"
                    id="bordered-justified-home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <section class="section1">
                      <div className="container-flued ">
                        <div class="row align-items-top mt-4">
                          <div class="col-md-4">
                            <div class="card card-dashbord">
                              <div>
                                <i
                                  class="fa fa-language fa-2x"
                                  aria-hidden="true"
                                ></i>
                                <h5 class="card-title">Translation</h5>
                              </div>
                              <div class="card-body1">
                                Card description with lots of great facts and
                                interesting details
                              </div>

                              <div className="go-corner" href="home">
                                <div className="go-arrow">→</div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="card card-dashbord">
                              <div>
                                <i
                                  class="fa fa-files-o fa-2x"
                                  aria-hidden="true"
                                ></i>
                                <h5 class="card-title">Summerization</h5>
                              </div>
                              <div class="card-body1">
                                Card description with lots of great facts and
                                interesting details
                              </div>

                              <div className="go-corner" href="/">
                                <div className="go-arrow">→</div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="card card-dashbord">
                              <div>
                                <i
                                  class="fa fa-file-text fa-2x"
                                  aria-hidden="true"
                                ></i>

                                <h5 class="card-title">Content Creation</h5>
                              </div>
                              <div class="card-body1">
                                Card description with lots of great facts and
                                interesting details
                              </div>

                              <div className="go-corner" href="/">
                                <div className="go-arrow">→</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row align-items-top mt-4">
                          <div class="col-md-4">
                            <div class="card card-dashbord">
                              <div>
                                <i
                                  class="fa fa-venus-mars fa-2x"
                                  aria-hidden="true"
                                ></i>

                                <h5 class="card-title">
                                  Gender Indentification
                                </h5>
                              </div>
                              <div class="card-body1">
                                Card description with lots of great facts and
                                interesting details
                              </div>

                              <div className="go-corner" href="/">
                                <div className="go-arrow">→</div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="card card-dashbord">
                              <div>
                                <i
                                  class="fa fa-lock fa-2x"
                                  aria-hidden="true"
                                ></i>
                                <h5 class="card-title">Cipher</h5>
                              </div>
                              <div class="card-body1">
                                Card description with lots of great facts and
                                interesting details
                              </div>

                              <div className="go-corner" href="/">
                                <div className="go-arrow">→</div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="card card-dashbord">
                              <div>
                                <i
                                  class="fa fa-globe fa-2x"
                                  aria-hidden="true"
                                ></i>

                                <h5 class="card-title">Noice Cancellation</h5>
                              </div>
                              <div class="card-body1">
                                Card description with lots of great facts and
                                interesting details
                              </div>

                              <div className="go-corner" href="/">
                                <div className="go-arrow">→</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="bordered-justified-profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  ></div>
                  <div
                    class="tab-pane fade"
                    id="bordered-justified-contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
