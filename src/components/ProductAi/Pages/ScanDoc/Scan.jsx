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
  faUpload,
  faPercentage,
  faPercent,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DownloadComponent from "../FileDownload/DownloadComponent";
import { Link } from "react-router-dom";
import { scanImage } from "../../../../core/Apis/imagetotext/Scan";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";

const Scan = () => {
  const [selectedFileName, setSelectedFileName] = useState(
    "Select Text File or upload"
  );

  const [fileData, setFileData] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (data) => {
    setShow(true);

    setFileData(data);
  };

  const [imageUpload, setImageUpload] = useState({
    file: null,
  });
  const [extract, setExtract] = useState();
  const [loader, setLoader] = useState(false);

  //  fileupload

  const onChnage = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    setImageUpload((prevState) => ({
      ...prevState,
      [name]: file,
    }));
  };

  const uploadSubmit = async (e) => {
    e.preventDefault();
    console.log("api hit");
    console.log(setImageUpload);
    setLoader(true);
    const formdataToSend = new FormData();
    formdataToSend.append("file", imageUpload.file);
    scanImage(formdataToSend)
      .then((data) => {
        console.log(data);
        setLoader(false);
        setExtract(data.data.extracted_text);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };

  // copy

  const handleCopy = () => {
    toast.success("copy text");
    navigator.clipboard.writeText(extract);
  };

  // download
  const handleDownload = () => {
    const blob = new Blob([extract], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "textFile.txt";
    link.click();

    // Clean up the temporary URL
    window.URL.revokeObjectURL(url);

    toast.info("Text file downloaded");
  };

  return (
    <section class="section1">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="p-0 py-3 pl-0 pl-lg-5" id="main_text">
        <div className=" row justify-content-center mainURl  g-3  pb-2">
          <div class="col-md-10 ">
            {/* <div className="uploadFile1 p-2">
              <FontAwesomeIcon icon={faUpload} className="px-2" />
              <span className="filename1">{selectedFileName}</span>
              <input
                type="file"
                id="formFile "
                class="form-control inputfile  "
                placeholder="file"
                name="file"
                onChange={onChnage}
                style={{ border: " 1px dotted #6c757d42 " }}
              />
            </div> */}
            <div className="input-group mb-3 ">
              {/* <label className="input-group-text" htmlFor="formFile">
                <FontAwesomeIcon icon={faUpload} className="px-2" />
              </label>
              */}

              <input
                type="file"
                id="formFile "
                class="form-control inputfile"
                placeholder="file"
                name="file"
                onChange={onChnage}
                style={{ border: " 1px dotted #6c757d42 " }}
              />
            </div>
          </div>

          <div class="col-md-2">
            <button
              type="submit"
              onClick={uploadSubmit}
              style={{ fontSize: "14px" }}
              className="btn convert btn-primary d-flex"
            >
              Upload
            </button>
          </div>
        </div>

        <div id="text">
          <div className="main-wrapper">
            <div class="container-flued">
              <div className=" d-flex p-0">
                <div className="col-5 col-md-5 col-sm-5  p-0 ">
                  <span className="px-2 mt-2" style={{ fontWeight: "400" }}>
                    <i className="bi bi-person"> </i>
                    Scan
                    {/* <i className="bi bi-question-circle px-2"></i> */}
                  </span>
                </div>
                <div className="col-7 col-md-7 col-sm-7  ">
                  <div className="icons justify-content-end ">
                    <div className=" px-3 ">
                      <Button
                        variant="outline-light"
                        className="Homebutton"
                        href="home#"
                        size="sm"
                      >
                        Translate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="wrapper mt-3">
                <div className="text-input text-input-sum  justify-content-center align-items-center">
                  {loader ? (
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
                  ) : (
                    <textarea
                      spellCheck="false"
                      className="from-text form-control"
                      placeholder="Output Text"
                      value={extract}
                    />
                  )}
                </div>

                <div className=" row   icon-container justify-content-center mt-1 p-2 ">
                  <div class="col-md-6 trans-text1  d-flex flex-wrap"></div>

                  <div className=" col-md-6 text-end d-flex flex-wrap  ">
                    <div class="col-sm-12 d-flex gap-2 justify-content-end">
                      <button
                        className="btn btn-primary  btn-sm"
                        title="Copy"
                        onClick={handleCopy}
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </button>
                      <button
                        className="btn btn-primary  btn-sm"
                        title="Download"
                        onClick={() => {
                          handleShow(extract);
                        }}
                      >
                        <FontAwesomeIcon icon={faDownload} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <>
        <Modal show={show} onHide={handleClose}>
          <DownloadComponent file={fileData} />
        </Modal>
      </>
    </section>
  );
};

export default Scan;
