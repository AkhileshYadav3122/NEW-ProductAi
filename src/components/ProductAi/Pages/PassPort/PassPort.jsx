import React, { useEffect, useRef, useState } from "react";
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
import { passportExtrct } from "../../../../core/Apis/Profile/lipi";
import loadermage from "../GifLoader/output-onlinegiftools.gif";
import OcrNavbar from "../OCR/OcrNavbar";

const Passport = () => {
  const [selectedFile, setSelectedFile] = useState({
    image1: null,
    image2: null,
  });
  const [loading, setLoading] = useState(false);

  const [apiData, setApiData] = useState({});

  const handleFileSelect = (event) => {
    event.preventDefault();
    console.log("clicked");

    // const file = event.target.files[0];
    const name = event.target.name;
    const file = event.target.files[0];

    setSelectedFile((prevState) => ({
      ...prevState,
      [name]: file,
    }));
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
    if (selectedFile.image1 === null && selectedFile.image2 === null) {
      alert("Please select a file");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("image_front", selectedFile.image1);
    formData.append("image_back", selectedFile.image2);

    console.log(formData);

    passportExtrct(formData)
      .then((res) => {
        console.log(res.data.Response);
        setApiData(res.data.Response);
        setIsVisible(!isVisible);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <section className="section1">
      <div className="container-fluid " id="main_text">
        <div className="row p-0 py-3 pl-0 pl-lg-5" id="main_text">
          <div className="pagetitle bg-white p-1 px-3">
            <h1 className="mt-1">Passport</h1>
            <OcrNavbar />
          </div>
        </div>
      </div>

      <div id="text">
        <div className="main-wrapper">
          <div className="container-fluid">
            <div className="row justify-content-center mt-3">
              <div className="col-lg-6 col-md-6 col-sm-12 p-3">
                <div className="card">
                  <div className="file-upload-container">
                    <div
                      className="file-upload-area "
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <label
                        htmlFor="file-upload-input"
                        // className="file-upload-label"
                      >
                        <input
                          type="file"
                          name="image1"
                          id="file-upload-input"
                          className="file-upload-input"
                          onChange={handleFileSelect}
                        />
                        <h4>Choose a Passport Document</h4>
                        <h4>Front</h4>
                        <p>Upload Word, PDF, Excel, CSV, Custom XML files</p>
                        <span>
                          {selectedFile.image1 ? (
                            selectedFile.image1["name"]
                          ) : (
                            <>
                              <FontAwesomeIcon
                                icon={faCloudUploadAlt}
                                className="file-upload-icon"
                              />
                              <span> Drag & Drop or Browse</span>
                            </>
                          )}
                        </span>
                      </label>
                      {/* <div className="file-upload-text">
                        {selectedFile.image1
                          ? selectedFile.image1["name"]
                          : "Drag & Drop or Browse"}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 p-3">
                <div className="card">
                  <div className="file-upload-container">
                    <div
                      className="file-upload-area "
                      // onDragOver={handleDragOver}
                      // onDrop={handleDrop2}
                    >
                      <label
                        htmlFor="file-upload"
                        // className="file-upload-label"
                      >
                        <input
                          type="file"
                          name="image2"
                          id="file-upload"
                          onChange={handleFileSelect}
                          className="file-upload-input"
                        />

                        <h4>Choose a Passport Document</h4>
                        <h4>Back</h4>
                        <p>Upload Word, PDF, Excel, CSV, Custom XML files</p>
                        <span>
                          {selectedFile.image2 ? (
                            selectedFile.image2["name"]
                          ) : (
                            <>
                              <FontAwesomeIcon
                                icon={faCloudUploadAlt}
                                className="file-upload-icon"
                              />
                              <span> Drag & Drop or Browse</span>
                            </>
                          )}
                        </span>
                      </label>
                      {/* <div className="file-upload-text">
                        {selectedFile.image2
                          ? selectedFile.image2["name"]
                          : "Drag & Drop or Browse"}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              {loading && (
                <div className=" justify-content-center align-items-center text-center ">
                  <div className="Loader  mb-3  p-0  ">
                    <div class="loading">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="row icon-container justify-content-center ">
              <div className=" col-md-12 text-end d-flex flex-wrap  ">
                <div class="col-sm-12 text-center mb-3 ">
                  <Button
                    onClick={() => {
                      toggleVisibility();
                    }}
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
                        Name
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="First name"
                        value={apiData["Front Side Result"]["Name"]}
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        SurName
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Front Side Result"]["Surname"]}
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Code
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Front Side Result"]["Code"]}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Passport No
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="First name"
                        value={apiData["Front Side Result"]["Passport No"]}
                      />
                    </div>
                    <div class="col-lg-6  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Date of Issue
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Front Side Result"]["Date of Issue"]}
                      />
                    </div>
                    <div class="col-lg-6  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Date of Expiry
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Front Side Result"]["Date of Expiry"]}
                      />
                    </div>
                    <div class="col-lg-6  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Type
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Front Side Result"]["Type"]}
                      />
                    </div>
                    <div class="col-lg-6  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Gender
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Front Side Result"]["Gender"]}
                      />
                    </div>
                    <div class="col-lg-6  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        MRZ1
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Front Side Result"]["MRZ1"]}
                      />
                    </div>
                    <div class="col-lg-6  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        MRZ2
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Front Side Result"]["MRZ2"]}
                      />
                    </div>
                    <div class="col-lg-6  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Father Name
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Back Side Result"]["Father Name"][0]}
                      />
                    </div>
                    <div class="col-lg-6  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Mother Name
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Back Side Result"]["Mother Name"][0]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row icon-container justify-content-center  p-2">
              <div className=" col-md-12 text-end d-flex flex-wrap  ">
                <div class="col-sm-12 align-self-center">
                  {/* <button className="btn play-button px-3" title="Copy">
                    <FontAwesomeIcon icon={faCopy} />
                  </button>

                  <button class="btn play-button px-3" title="Edit">
                    <FontAwesomeIcon icon={faEdit} />
                  </button> */}
                  <div class="btn-group ">
                    <button
                      type="button"
                      class="btn btn-primary  btn-sm  dropdown-toggle"
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

export default Passport;
