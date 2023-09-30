import React, { useState } from "react";
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
import "./../../Pages/PanCard/Pancard.css";
import { rcBookExtract } from "../../../../core/Apis/Profile/lipi";
import OcrNavbar from "../OCR/OcrNavbar";

const Rcbook = () => {
  const [selectedFile, setSelectedFile] = useState({
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const [apiData, setApiData] = useState({});

  const handleFileSelect = (event) => {
    // const file = event.target.files;
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
    if (selectedFile.image === null) {
      alert("Please select a file");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile.image);

    rcBookExtract(formData)
      .then((res) => {
        console.log(res.data.Response);
        setLoading(false);
        setApiData(res.data.Response);
        setIsVisible(!isVisible);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="section1">
      <div className="container-fluid">
        <div className="row p-0 py-3 pl-0 pl-lg-5" id="main_text">
          <div className="pagetitle bg-white p-1 px-3">
            <h1 className="mt-1">Rc Book</h1>
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
                          name="image"
                          id="file-upload-input"
                          className="file-upload-input"
                          onChange={handleFileSelect}
                        />
                        <h4>Choose a RC Book Document</h4>
                        <p>Upload Word, PDF, Excel, CSV ,Custom XML files</p>

                        <span>
                          {selectedFile.image ? (
                            selectedFile.image["name"]
                          ) : (
                            <>
                              <FontAwesomeIcon
                                icon={faCloudUploadAlt}
                                className="file-upload-icon"
                              />
                              <span>Drag & Drop or Browse</span>
                            </>
                          )}
                        </span>
                      </label>
                      {/* <div className="file-upload-text">
                        {selectedFile.image
                          ? selectedFile.image["name"]
                          : "Drag & Drop or Browse"}
                      </div> */}
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
                  </div>
                </div>
              </div>
            </div>

            <div className="row icon-container justify-content-center mt-1 p-2">
              <div className="col-md-6 text-md-end d-flex flex-wrap">
                <div className="col-sm-6 align-self-center"></div>

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
                        Regn Number
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="First name"
                        value={apiData["Regn Number"][0]}
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Regn Name
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Regn Name"][0]}
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        S/W/D
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["S/W/D"][0]}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Regn Date
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="First name"
                        value={apiData["Regn Date"][0]}
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Regn validity
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="First name"
                        value={apiData["Regn validity"][0]}
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        MGF Date
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["MGF Date"][0]}
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        PurPose
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="First name"
                        value={apiData["Purpose"][0]}
                      />
                    </div>

                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Color
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="First name"
                        value={apiData["colour"][0]}
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Chassis No
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["chassis No"][0]}
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Engine No
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Engine No"][0]}
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Model No
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="First name"
                        value={apiData["Model No"][0]}
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Fuel Type
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Fuel Type"][0]}
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Body Type
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Body Type"][0]}
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Seat Capacity
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Seat Capacity"][0]}
                      />
                    </div>
                    <div class="col-lg-4  col-sm-12 p-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Stand Capacity
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        aria-label="Last name"
                        value={apiData["Stand Capacity"][0]}
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

export default Rcbook;
