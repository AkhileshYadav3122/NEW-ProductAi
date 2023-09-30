import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faCopy,
  faDownload,
  faCloudUploadAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import "./../../Pages/PanCard/Pancard.css";
import OcrNavbar from "../OCR/OcrNavbar";

const Cheque = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
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
    <section className="section1">
      <div className="container-fluid">
        <div className="row p-0 py-3 pl-0 pl-lg-5" id="main_text">
          <div className="pagetitle bg-white p-1 px-3">
            <h1 className="mt-1">Cheque</h1>
            <OcrNavbar />
          </div>
        </div>
        <div id="text">
          <div className="main-wrapper">
            <div className="row justify-content-center mt-3">
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
                        <h4>Choose a Cheque Document</h4>
                        <p>Upload Word, PDF, Excel, CSV ,Custom XML files</p>
                        <span>
                        <FontAwesomeIcon
                          icon={faCloudUploadAlt}
                          className="file-upload-icon"
                        />
                        <span> Upload and translate</span>
                        </span>
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

            <div className="row icon-container justify-content-center mt-1 p-2">
              {/* <div className="col-md-6 trans-text1 d-flex flex-wrap">
            <div>
              <p className="px-2">Words:133 </p>
            </div>

            <div>
              <p> Language: Hindi</p>{" "}
            </div>
          </div> */}

              <div className="col-md-6 text-md-end d-flex flex-wrap">
                <div className="col-sm-6 align-self-center">
                  {/* <button className="btn btn-primary  btn-sm px-3">
                <FontAwesomeIcon icon={faCopy} />
              </button>{" "}
              <button className="btn btn-primary  btn-sm px-3">
                <FontAwesomeIcon icon={faDownload} />
              </button>{" "}
              <button className="btn btn-primary  btn-sm px-3" title="Play">
                <FontAwesomeIcon icon={faVolumeUp} />
              </button> */}
                </div>
                <div class="col-sm-12 text-center mb-3 ">
                  <Button
                    onClick={toggleVisibility}
                    type="submit"
                    style={{ fontSize: "14px" }}
                    className="btn convert btn-primary   "
                  >
                    Generate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {isVisible && (
          <div id="text">
            <div className="main-wrapper mt">
              <div className="row justify-content-center">
                <div className="col-lg-12 col-md-6 col-sm-12 p-5">
                  <div class="row">
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Account Number
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="First name"
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Name
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Bank Name
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Amount
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="First name"
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Date Of Issue
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="First name"
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Type
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                      />
                    </div>
                  </div>
                  <div class="row ">
                    {/* <div class="col-lg-4  col-sm-12 p-3">
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
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Qr code
                      </label>
                      <div>
                        <img
                          src="https://fastly.picsum.photos/id/789/200/200.jpg?hmac=7x3gF1b3I8Yu8nItiG1H2GYq6GcipkMPET8y2sqov5s"
                          class="img-thumbnail"
                          alt="..."
                        ></img>
                      </div>
                    </div> */}
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        IFSC
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Sign
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
            </div>
            <div className="row icon-container justify-content-center  p-2">
              <div className=" col-md-12 text-end d-flex flex-wrap  ">
                <div class="col-sm-12 align-self-center">
                  <button className="btn btn-primary  btn-sm px-3" title="Copy">
                    <FontAwesomeIcon icon={faCopy} />
                  </button>

                  <button class="btn btn-primary  btn-sm px-3" title="Edit">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <div class="btn-group ">
                    <button
                      type="button"
                      class="btn btn-primary  btn-sm   dropdown-toggle"
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
  );
};

export default Cheque;
