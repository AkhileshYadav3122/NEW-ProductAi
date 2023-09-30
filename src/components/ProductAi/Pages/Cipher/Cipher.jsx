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
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { encrDecr } from "../../../../core/Apis/cypher/cypher";
import { ColorRing } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import DownloadComponent from "../FileDownload/DownloadComponent";

const Cipher = () => {
  const [operation, setOperation] = useState();
  const [operationAns, setOperationAns] = useState();
  const [loader, setLoader] = useState();

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setOperation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [fileData, setFileData] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (data) => {
    setShow(true);

    setFileData(data);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("api hit");
    setLoader(true);
    encrDecr(operation)
      .then((data) => {
        console.log(data);
        setLoader(false);
        setOperationAns(data.data.result);
      })
      .catch((e) => {
        setLoader(false);
        console.log(e);
      });
  };

  // copy
  const textareaRef = useRef(null);
  const handleCopy = () => {
    toast.success("copy text");
    navigator.clipboard.writeText(operationAns);
  };

  const handleDownload = () => {
    const blob = new Blob([operationAns], { type: "text/plain" });
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
        <div className=" row justify-content-center mainURl  g-3  pb-2"></div>
        <div id="text">
          <div className="main-wrapper">
            <div class="container-flued">
              <div className=" d-flex p-0">
                <div className="col-5 col-md-5 col-sm-5  p-0">
                  <span className="px-2 mt-2" style={{ fontWeight: "400" }}>
                    <i className="bi bi-lock"> </i>
                    Cipher
                  </span>
                </div>
              </div>
              <div className="wrapper mt-3">
                <div className="text-input d-flex trans-text-icon" >
                  <div className=" col-lg-6 col-md-12 text-input text-input-summ d-flex "                 style={{ borderRight: "1px solid #cccccc7d" }}
>
                    <textarea
                      spellCheck="false"
                      className="from-text form-control"
                      placeholder="Input"
                      name="message"
                      onChange={onChange}
                    />
                  </div>
                  <div className=" col-lg-6 col-md-12 text-input text-input-summ d-flex justify-content-center align-items-center ">
                    {loader ? (
                      <div>
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
                        readOnly
                        disabled
                        value={operationAns}
                        className="to-text form-control"
                        placeholder="Output"
                      />
                    )}
                  </div>
                </div>

                <div className=" row   icon-container justify-content-center mt-1 p-2 ">
                  <div class="col-lg-10 trans-text1  d-flex flex-wrap gap-2">
                    <div class="col-sm-2 text-center">
                      <select
                        className="form-select text-center"
                        name="operation"
                        onChange={onChange}
                      >
                        <option>Select </option>

                        <option value="encrypt">
                          <span>Encrypt</span>
                        </option>
                        <option value="decrypt">
                          <span>Decrypt</span>
                        </option>
                      </select>
                    </div>
                    <div class="col-sm-3 text-center ">
                      <input
                        class="form-control"
                        type="text"
                        placeholder=" Enter key"
                        name="key"
                        onChange={onChange}
                      />
                    </div>

                    <div class="col-sm-2 text-center ">
                      <Button
                        className="btn convert btn-primary "
                        type="submit"
                        onClick={handleSubmit}
                        style={{ fontSize: "13px" }}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>

                  <div className=" col-lg-2 text-end  ">
                    <div class=" justify-content-end d-flex gap-2 ">
                      <button
                        className="btn btn-primary  btn-sm"
                        onClick={handleCopy}
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </button>
                      <button
                        className="btn btn-primary  btn-sm"
                        onClick={() => {
                          handleShow(operationAns);
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

export default Cipher;
