import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import OCRIMG from "./media-OCR.png";
import "./../OCR/Documents.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faCopy,
  faExchangeAlt,
  faDownload,
  faFileLines,
  faStop,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Documents = () => {
  // onclick translate button progress bar start
  const [stepValue, setStepValue] = useState(0);

  const handleMove = () => {
    let id = setInterval(frame, 500);

    function frame() {
      if (stepValue >= 100) {
        clearInterval(id);
      } else {
        setStepValue((prevStepValue) => {
          const updatedStepValue = prevStepValue + 10;
          return updatedStepValue > 100 ? 100 : updatedStepValue;
        });
      }
    }
  };

  //   Onclick of the convert button, the document translation button is toggled
  const [isVisiblecon, setIsVisiblecon] = useState(false);
  const [isVisibleconhide, setIsVisibleconhide] = useState(true);
  const toggleVisibilitycon = () => {
    setIsVisiblecon(!isVisiblecon);
    setIsVisibleconhide(!isVisibleconhide);
  };

  // selectedFromLanguage

  const [selectedFromLanguage, setSelectedFromLanguage] = useState("");
  const [selectedToLanguage, setSelectedToLanguage] = useState("");
  const handleLanguageChange = (e, isFromLanguage) => {
    const selectedLanguage = e.target.value;
    if (isFromLanguage) {
      setSelectedFromLanguage(selectedLanguage);
    } else {
      setSelectedToLanguage(selectedLanguage);
    }
  };

  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const handleExchangeLanguages = () => {
    const tempText = fromText;
    const tempLang = selectedFromLanguage;
    setFromText(toText);
    setToText(tempText);
    setSelectedFromLanguage(selectedToLanguage);
    setSelectedToLanguage(tempLang);
  };

  // Audio play
  const [volume, setVolume] = useState(50);
  const audioRef = useRef(null);
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
  };
  const handlePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  // copy textarea
  const textareaRef = useRef(null);
  const handleCopy = () => {
    textareaRef.current.select();
    document.execCommand("copy");
  };

  const handleDownload = () => {
    const content = textareaRef.current.value;
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.to = URL.createObjectURL(file);
    element.download = "textfile.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Upload File
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

  return (
    <div>
      <div className="text-center mt-4 mb-3">
        <h2 style={{ color: "#012970" }}>
          The world’s most powerful{" "}
          <span style={{ color: "#546fff" }}>online OCR</span>{" "}
        </h2>
        <p>
          Thousands of developers convert images and PDFs to actionable text
          with Product AI.
        </p>
      </div>
      <div id="text" className="mt-2">
        <form>
          <div className="main-wrapper">
            <>
              <div className="file-upload-container border-0 ">
                <div
                  className="file-upload-area "
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {/* <FontAwesomeIcon icon={faFileLines} /> */}
                  <div className="icon">
                    <i class="fa fa-files-o" aria-hidden="true"></i>

                    {/* <i className="fa fa-globe"></i> */}
                  </div>
                  <h4>OCR PDF</h4>
                  <p style={{ color: "slateg" }}>
                    Use our online OCR to recognize text from images.
                  </p>

                  <div class="Dropdown">
                    <button
                      type="button"
                      class="btn btn btn-primary   p-2  px-2 mb-3 mt-2  dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      SELECT OPTIONS
                    </button>
                    <ul class="dropdown-menu dropdown-menu-light  menu_dd">
                      <li>
                        <Link class="dropdown-item " to="/admin/Aadhar">
                          <i class="bi bi-person-rolodex"></i> Aadhar Card
                        </Link>
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/admin/Driving">
                          <i className="bi bi-card-text"></i>
                          Driving License
                        </Link>
                      </li>
                      {/* <li>
                        <hr class="dropdown-divider" />
                      </li> */}
                      {/* <li>
                        <Link class="dropdown-item" to="/admin/Textscanner">
                          <i className="bi bi-card-text"></i>
                          Text Scanner
                        </Link>
                      </li> */}
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/admin/Pancard">
                          <i className="bi bi-credit-card"></i>
                          Pan Card
                        </Link>
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/admin/Passport">
                          <i class="bi bi-person-vcard"></i> Passport
                        </Link>
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/admin/RcBook">
                          <i class="bi bi-journal"></i>
                          RC Book
                        </Link>
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      {/* <li>
                        <Link class="dropdown-item" to="/admin/Multicropping">
                          <i className="bi bi-image"></i>
                          Multicropping
                        </Link>
                      </li> */}
                      {/* <li>
                        <hr class="dropdown-divider" />
                      </li> */}
                      <li>
                        <Link class="dropdown-item" to="/admin/Invoice">
                          <i className="bi bi-file-earmark-text"> </i>
                          Invoice
                        </Link>
                      </li>
                      
                      {/* <li>
                        <Link class="dropdown-item" to="/admin/Cheque">
                          <i className="bi bi-file-earmark-check"></i>
                          Cheque Extraction
                        </Link>
                      </li> */}
                    </ul>
                  </div>

                  {/* <div className="file-upload-text">
                    <p>Or drop files here</p>
                  </div> */}
                </div>
              </div>
            </>
          </div>
        </form>
      </div>

      <div class="container about mt-5" id="about">
        <div class="row">
          <div
            class="col-lg-6 order-1 order-lg-2"
            data-aos="zoom-in"
            data-aos-delay="150"
          >
            <img src={OCRIMG} class="img-fluid" alt="" />
          </div>
          <div
            class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content"
            data-aos="fade-right"
          >
            <h3 style={{ fontSize: "30px", fontWeight: "600" }}>
              How to use online OCR
            </h3>

            <ul>
              <li>
                <i class="bi bi-check-circle"></i> Drag and drop or upload the
                file that you want to scan
              </li>
              <li>
                <i class="bi bi-check-circle"></i> Review the scanned contents
                and edit your file as needed.
              </li>
              <li>
                <i class="bi bi-check-circle"></i> Save your scanned PDF file to
                your device.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
