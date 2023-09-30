import Nayannavbar from "../NayanNavbar/Nayannavbar";
import NayanNavComponent from "../NayanNavbar/NayanNavComponent";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../PersonsRecord/Precord.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faCopy,
  faDownload,
  faCloudUploadAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
// import "./../../Pages/PanCard/Pancard.css";
// import OcrNavbar from "../OCR/OcrNavbar";

const Precord = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    console.log(e.target.files);
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <section className="section1">
        <div className="container-fluid">
          <div className=" p-0 py-3 pl-0 pl-lg-5 P_record" id="main_text">
            <div
              className="pagetitle bg-white p-1"
              style={{ boxShadow: "0px 2px 20px rgba(1, 41, 112, 0.1)" }}
            >
              <NayanNavComponent />
            </div>
          </div>
          <div id="text">
            <div className="main-wrapper">
              <div className="col-12 col-md-6 col-sm-6 ">
                <h6 className="px-3">
                  <span style={{ fontWeight: "500" }}>
                    Create a Person's Records{" "}
                  </span>
                  {/* <i className="bi bi-question-circle px-2"></i> */}
                </h6>
              </div>

              <div className="row justify-content-center  ">
                <div className="col-lg-12 col-md-6 p-4">
                  <div className="card ">
                    <div className="file-upload-container">
                      <div
                        className="file-upload-area"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <label
                          htmlFor="file-upload-input"
                          // className="file-upload-label"
                        >
                          <input
                            type="file"
                            id="file-upload-input"
                            className="file-upload-input"
                            onChange={handleFileSelect}
                          />
                          <div
                            className=""
                            style={{ maxWidth: "230px", height: "auto" }}
                          >
                            <img src={selectedFile} />
                          </div>
                          {/* <div className="upload_img">
                            <img src={selectedFile} />
                          </div> */}

                          {selectedFile ? null : (
                            <>
                              <h4>Upload Images in Database</h4>
                              <p>JPG, PNG, SVG, CSV ,GIF, PIP files</p>

                              <span>
                                <FontAwesomeIcon
                                  icon={faCloudUploadAlt}
                                  className="file-upload-icon"
                                />
                                <span> Upload Image</span>
                              </span>
                            </>
                          )}
                        </label>

                        {/* <div className="file-upload-text">
                        {selectedFile
                          ? selectedFile.name
                          : "Drag & Drop or Browse"}
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 d-flex icon-container justify-content-center mt-1 p-2">
                {/* <div className="  text-center flex-wrap"> */}
                <div className="col-md-4 align-self-center mb-2">
                  <i class="bi bi-person" style={{ fontSize: "25px" }}></i>
                  <input
                    type="text"
                    placeholder="Name"
                    className=" "
                    style={{
                      border: "none",
                      borderBottom: " 0.5px solid gray",
                    }}
                  />
                </div>

                {/* </div> */}
                <div class="col-md-5  P_button ">
                  <Button
                    onClick={toggleVisibility}
                    type="submit"
                    style={{ fontSize: "14px" }}
                    className="btn convert btn-primary   "
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          {isVisible && (
            <div id="text">
              <div className="main-wrapper mt">
                <div className="row  col-lg-12 ">
                  <div className=" row col-lg-4   p-5">
                    <div class="col-lg-12 col-md-12 col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Photo
                      </label>
                      <div>
                        <img
                          src="https://fastly.picsum.photos/id/789/200/200.jpg?hmac=7x3gF1b3I8Yu8nItiG1H2GYq6GcipkMPET8y2sqov5s"
                          class="img-thumbnail"
                          alt="..."
                        ></img>
                      </div>
                    </div>
                  </div>
                  <div className=" row col-lg-8   p-5">
                    <div class="col-lg-12 col-md-12 col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Person Name
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                      />
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Predicted Age
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row icon-container justify-content-center  p-2">
                <div className=" col-md-12 text-end d-flex flex-wrap  ">
                  <div class="col-sm-4 align-self-center text-start px-2">
                    <button className="btn btn-primary  text-start ">
                      Back
                    </button>
                  </div>
                  <div class="col-sm-8 align-self-center">
                    <button className="btn play-button px-3" title="Copy">
                      <FontAwesomeIcon icon={faCopy} />
                    </button>

                    <div class="btn-group ">
                      <button
                        type="button"
                        class="btn play-button   dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <FontAwesomeIcon icon={faDownload} />
                      </button>
                      <ul class="dropdown-menu dropdown-menu-light">
                        <li>
                          <href class="dropdown-item " to="/admin/Aadhar">
                            PDF
                          </href>
                        </li>
                        <li>
                          <hr class="dropdown-divider" />
                        </li>
                        <li>
                          <href class="dropdown-item" to="/admin/Driving">
                            CSV
                          </href>
                        </li>
                        <li>
                          <hr class="dropdown-divider" />
                        </li>
                        <li>
                          <href class="dropdown-item" to="">
                            Excel
                          </href>
                        </li>
                        <li>
                          <hr class="dropdown-divider" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Precord;
