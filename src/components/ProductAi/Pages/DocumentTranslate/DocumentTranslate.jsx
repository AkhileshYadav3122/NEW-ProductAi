import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faCopy,
  faExchangeAlt,
  faDownload,
  faMicrophone,
  faStop,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const contries = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
};

const DocumentTranslate = () => {
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
    element.href = URL.createObjectURL(file);
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

  // submenu
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [nestedSubmenuOpen, setNestedSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const toggleNestedSubmenu = () => {
    setNestedSubmenuOpen(!nestedSubmenuOpen);
  };

  const closeSubmenu = () => {
    setSubmenuOpen(false);
  };

  const handleTranslateClick = () => {
    closeSubmenu();
  };

  return (
    <>
      <div className="row justify-content-start g-20  pb-2">
        <div className="dropdown col-md-5 ">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="submenuDropdownButton"
            onClick={toggleSubmenu}
          >
            {" "}
            <i class="bi bi-translate px-1"></i>
            Translation Option
          </button>
          <ul
            className={`dropdown-menu${submenuOpen ? " show" : ""}`}
            aria-labelledby="submenuDropdownButton"
          >
            <li>
              <Link
                className="dropdown-item"
                to="/admin/home/"
                onClick={handleTranslateClick}
              >
                <i class="bi bi-translate"></i>
                Translate
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to="/admin/Diarization"
                onClick={handleTranslateClick}
              >
                <i class="bi bi-translate"></i>
                Diaziration
              </Link>
            </li>
            <li className="dropend">
              {/* <div class="btn-group dropend"> */}
              <Link
                className="dropdown-item dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="nestedSubmenuDropdownButton"
                onClick={toggleNestedSubmenu}
                dropend
              >
                <i class="fa fa-files-o" aria-hidden="true"></i>
                Upload
              </Link>
              <ul
                className={`dropdown-menu${nestedSubmenuOpen ? " show" : ""}`}
                aria-labelledby="nestedSubmenuDropdownButton"
              >
                <li>
                  <Link className="dropdown-item" to="/admin/AudioToText/">
                    Audio To Text
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/admin/DocumentTranslate">
                    File To Text
                  </Link>
                </li>
              </ul>
              {/* </div> */}
            </li>
          </ul>
        </div>
      </div>

      <div id="text">
        <form>
          <div className="main-wrapper">
            {isVisibleconhide && (
              <>
                <div className="px-5 documentupload">
                  <div className="col">
                    <select
                      className="form-select text-center border-0"
                      style={{ width: "auto" }}
                      value={selectedFromLanguage}
                      onChange={(e) => handleLanguageChange(e, true)}
                    >
                      <option>Select language</option>
                      {Object.entries(contries).map(([code, name]) => (
                        <option key={code} value={code}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div class=" col drop-zone">
                    <span class="drop-zone__prompt ">
                      <input
                        type="file"
                        id="file-upload-input"
                        className="file-upload-input"
                        onChange={handleFileSelect}
                      />

                      <label
                        htmlFor="file-upload-input"
                        className="file-upload-label"
                      >
                        <div class="icon">
                          <i class="bi bi-cloud-arrow-up-fill"></i>
                          <p>Upload Word, PDF, Excel, CSV ,Custom XML filess</p>
                        </div>
                        <div className="file-upload-text">
                          {selectedFile
                            ? selectedFile.name
                            : "Drag & Drop or Browse"}
                        </div>
                      </label>
                    </span>
                  </div>
                  <div className="text-center d-flex g-2 mt-3">
                    <div className="col">
                      <button
                        className="btn btn-primary mb-5 convert "
                        onClick={toggleVisibilitycon}
                      >
                        Convert
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {isVisiblecon && (
              <>
                <div className=" text-input wrapper pb-4 ">
                  <div
                    className="textarea-container "
                    style={{ width: "100%" }}
                  >
                    <textarea
                      spellCheck="false"
                      className="to-text1 p-3"
                      // placeholder="Translation"
                      ref={textareaRef}
                    />
                  </div>

                  <div className=" row   icon-container ">
                    <div className="col-md-8 lign-self-start trans-text1  d-flex flex-wrap">
                      <div>
                        <p className="px-2">Words:133 </p>
                      </div>

                      <div>
                        <p> Language: Hindi</p>{" "}
                      </div>
                    </div>

                    <div className=" col-md-2 lign-self-end ms-md-auto">
                      <div className=" d-flex text-end gap-2 ">
                        <Link
                          className="btn play-button"
                          onClick={handleCopy}
                          title="Copy Text"
                        >
                          <FontAwesomeIcon icon={faCopy} />
                        </Link>
                        <Link
                          className="btn play-button"
                          onClick={handleDownload}
                          title="Download"
                        >
                          <FontAwesomeIcon icon={faDownload} />
                        </Link>

                        <Link
                          to="#"
                          className="btn  btn-light play-button"
                          title="Play"
                          onClick={handlePlay}
                        >
                          <audio
                            ref={audioRef}
                            src="http://mainline.i3s.unice.fr/mooc/LaSueur.mp3"
                          />
                          <FontAwesomeIcon icon={faVolumeUp} />
                        </Link>
                      </div>
                    </div>
                    <div
                      className=" col-md-2 ms-md-auto  lign-self-end  text-end "
                      // id="doc_btn"
                    >
                      <button
                        type="button"
                        style={{ fontSize: "13px" }}
                        className="btn convert btn-primary d-flex"
                      >
                        {/* <i className="fa fa-play" aria-hidden="true"></i> */}
                        Convert to speech
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default DocumentTranslate;
