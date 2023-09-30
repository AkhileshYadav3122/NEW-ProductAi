import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loadermage from "../GifLoader/output-onlinegiftools.gif";
import {
  faVolumeUp,
  faCopy,
  faDownload,
  faCloudUploadAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { Adharboth } from "../../../../core/Apis/Profile/lipi";
import OcrNavbar from "../OCR/OcrNavbar";
import { Link } from "react-router-dom";

const Aadhar = () => {
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
    formData.append("front_image", selectedFile.image1);
    formData.append("back_image", selectedFile.image2);

    console.log(formData);

    Adharboth(formData)
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
        <div className="row p-0  pl-0 pl-lg-5" id="main_text">
          <div className="pagetitle bg-white p-1 px-3">
            <h1 className="mt-1">Adhar Card</h1>
            <OcrNavbar />
          </div>
        </div>
      </div>
      <div class="dropdown">
        <button
          class="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {/* <i class="bi bi-option"> </i> */}
          Option
        </button>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <Link class="dropdown-item" to="/admin/Front/">
              <i class="bi bi-credit-card-2-front"></i>
              Front
            </Link>
          </li>

          <hr class="dropdown-divider" />

          <li>
            <Link class="dropdown-item" to="/admin/Back/">
              <i class="bi bi-credit-card-2-back"></i>
              Back
            </Link>
          </li>

          {/* <hr class="dropdown-divider" /> */}

          {/*

          <li>

            <a class="dropdown-item" href="#">

              Both Side

            </a>

          </li> */}
        </ul>
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
                        <h4>Choose a Aadhar Document</h4>
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
                      {" "}
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

                        <h4>Choose a Aadhar Document</h4>
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
                      {/* <h6>loading....</h6> */}
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
                        Aadhar Number
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="First name"
                        value={apiData["Front Response"]["Adhar Number"]}
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
                        value={apiData["Front Response"]["Name"]}
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Gender
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Front Response"].Gender}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Date Of Birth
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="First name"
                        value={apiData["Front Response"]["Date Of Birth"]}
                      />
                    </div>
                    <div class="col-lg-6  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Address
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Back Response"]["Address"]}
                      />
                    </div>
                  </div>
                  {/* <div class="row ">
                    <div class="col-lg-4  col-sm-12 p-3">
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
                    </div>
                  </div> */}
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
                      class="btn btn-primary  btn-sm dropdown-toggle"
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

export default Aadhar;
