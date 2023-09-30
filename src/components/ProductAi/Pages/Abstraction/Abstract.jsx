import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
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
import { abstract } from "../../../../core/Apis/abstract/abstract";
import { keyword } from "../../../../core/Apis/keyword/keywords";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import DownloadComponent from "../FileDownload/DownloadComponent";

const Abstract = () => {
  // const canvasRef = useRef(null);
  const [stepValue, setStepValue] = useState(0);
  const [fileData, setFileData] = useState();
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
  const [isVisible, setIsVisible] = useState(false);

  // Text convert end

  //document conver
  const [isVisibleone, setIsVisibleone] = useState(false);
  const toggleVisibilityone = () => {
    setIsVisibleone(!isVisibleone);
  };

  // document hide and show

  const [isVisiblecon, setIsVisiblecon] = useState(false);
  const [isVisibleconhide, setIsVisibleconhide] = useState(true);

  const toggleVisibilitycon = () => {
    setIsVisiblecon(!isVisiblecon);
    setIsVisibleconhide(!isVisibleconhide);
  };

  // const [fromText, setFromText] = useState("");
  // const [toText, setToText] = useState("");
  // const [selectedFromLanguage, setSelectedFromLanguage] = useState("");
  // const [selectedToLanguage, setSelectedToLanguage] = useState("");

  // const handleFromTextChange = (e) => {
  //   const text = e.target.value.trim();
  //   setFromText(text);
  //   if (!text) {
  //     setToText("");
  //   }
  // };

  // const handleExchangeLanguages = () => {
  //   const tempText = fromText;
  //   const tempLang = selectedFromLanguage;
  //   setFromText(toText);
  //   setToText(tempText);
  //   setSelectedFromLanguage(selectedToLanguage);
  //   setSelectedToLanguage(tempLang);
  // };

  const [abstractText, setAbstractText] = useState();
  const [ans, setAns] = useState("");
  const [length, setLenght] = useState("");
  const [sentences, setSentences] = useState("");
  const [words, setWords] = useState("");
  const [keywords, setKeywords] = useState("");
  const [keywordsans, setKeywordsAns] = useState([]);
  const [loader, setloder] = useState(false);
  const [keyLoader, setkeyLoader] = useState(false);
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAbstractText((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setKeywords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (data) => {
    setShow(true);

    // console.log("opnend model");

    setFileData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloder(true);
    abstract(abstractText)
      .then((data) => {
        console.log(data);
        console.log(data.data.Response.Summarize_data);
        setloder(false);
        setAns(data.data.Response.Summarize_data);
        setLenght(data.data.Response.Input_text_length);
        setSentences(data.data.Response.Number_of_Sentences);
        setWords(data.data.Response.Number_of_Words);
      })
      .catch((e) => {
        console.log(e);
        setloder(false);
      });
  };

  const keysubmit = async (e) => {
    e.preventDefault();
    console.log("api hit ");
    setkeyLoader(true);
    keyword(keywords)
      .then((data) => {
        console.log(data);
        console.log(data.data.Keywords_list);
        setkeyLoader(false);
        setKeywordsAns(data.data.Keywords_list);
      })
      .catch((e) => {
        console.log(e);
        setkeyLoader(false);
      });
  };

  // Audio
  const [volume, setVolume] = useState(50);
  const audioRef = useRef(null);
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
  };

  // copy

  const handleCopy = () => {
    toast.success("copy text");
    navigator.clipboard.writeText(ans);
  };

  const handleKeyCopy = () => {
    toast.success("copy text");
    navigator.clipboard.writeText(keywordsans);
  };

  const handleDownload = (e) => {
    e.preventDefault();
    const blob = new Blob([ans], {
      type: "text/plain",
    });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "textFile.txt";
    link.click();

    // Clean up the temporary URL
    window.URL.revokeObjectURL(url);

    toast.info("Text file downloaded");
  };

  const handleKeyDownload = (e) => {
    e.preventDefault();
    const blob = new Blob([keywordsans], {
      type: "text/plain",
    });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "textFile.txt";
    link.click();

    // Clean up the temporary URL
    window.URL.revokeObjectURL(url);

    toast.info("Text file downloaded");
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // refresh button
  const [isAnimating, setIsAnimating] = useState(false);
  const handleReloadClick = () => {
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
      window.location.reload(true);
    }, 1000);
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
        <div id="text">
          <div className="main-wrapper">
            {isVisibleconhide && (
              <div class="container-flued">
                <div className=" d-flex p-0">
                  <div className="col-6 col-md-6 col-sm-6">
                    <h6 className="px-2 mt-2">
                      <i className="bi bi-file-earmark"> </i>

                      <span style={{ fontWeight: "400" }}>Abstract Text</span>
                      {/* <i className="bi bi-question-circle px-2"></i> */}
                    </h6>
                  </div>
                  <div className="col-6 col-md-6 col-sm-6 ">
                    <div className="audio-player justify-content-end px-3">
                     
                      <Button
                        variant="outline-light"
                        href="home#"
                        size="sm "
                        className="Homebutton"
                      >
                        Translate
                      </Button>
                     
                    </div>
                  </div>
                </div>
                <div className="wrapper mt-3">
                  <div
                    className="text-input d-flex trans-text-icon"
                    style={{ borderBottom: "1px solid #cccccc7d" }}
                  >
                    <div
                      className="col-lg-6 col-md-12 d-flex flex-wrap "
                      style={{ borderRight: "1px solid #cccccc7d" }}
                    >
                      <textarea
                        spellCheck="false"
                        className="from-text form-control"
                        placeholder="Enter or paste your text and press 'Summarize.'"
                        name="text"
                        onChange={onChange}
                      />
                    </div>
                    <div className="col-lg-6 col-md-12 d-flex flex-wrap justify-content-center align-items-center ">
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
                          readOnly
                          disabled
                          value={ans}
                          className="to-text form-control"
                          placeholder="Summarize text"
                        />
                      )}
                    </div>
                  </div>

                  <div className=" row   icon-container justify-content-center mt-1 p-2 ">
                    <div class="col-md-4 trans-text1  d-flex flex-wrap">
                      <div>
                        <p className="px-2">Length:{length} </p>
                      </div>
                      <div>
                        <p className="px-2">Sentences:{sentences} </p>
                      </div>
                      <div>
                        <p className="px-2">Words:{words} </p>
                      </div>
                    </div>
                    <div class="col-md-4 justify-content-center     d-flex gap-2">
                      <Button
                        type="submit"
                        style={{ fontSize: "13px" }}
                        onClick={handleSubmit}
                        className="btn convert btn-primary  "
                      >
                        Summarize
                      </Button>
                      <Button
                        className="btn convert btn-primary "
                        style={{ fontSize: "13px" }}
                        onClick={toggleVisibility}
                      >
                        Keywords
                      </Button>
                    </div>
                    <div className=" col-md-4  justify-content-end  d-flex gap-2  text-end  ">
                    <button
                        className={`btn btn-primary  btn-sm ${
                          isAnimating ? "animating" : ""
                        }`}
                        onClick={handleReloadClick}
                      >
                        <FontAwesomeIcon
                          icon={faUndo}
                          className={`icon ${isAnimating ? "rotate" : ""}`}
                        />
                      </button>
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
                          handleShow(ans);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faDownload}
                          // onClick={handleDownload}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isVisible && (
        <div className=" " id="text">
          <div className="main-wrapper   " style={{ display: "contents" }}>
            <div className="  d-flex p-0">
              <div className="col-6 col-md-5 col-sm-6 ">
                <h6 className="px-2 mt-2">
                  <span style={{ fontWeight: "400" }}>Keywords </span>
                  {/* <i className="bi bi-question-circle px-2"></i> */}
                </h6>
              </div>
            </div>
            <div className=" text-center align-items-center pt-2">
              <div className=" text-input wrapper ">
                <div
                  className="text-input d-flex trans-text-icon"
                  style={{ borderBottom: "1px solid #cccccc7d" }}
                >
                  <div
                    className="col-lg-6 col-md-12 d-flex flex-wrap "
                    style={{ borderRight: "1px solid #cccccc7d" }}
                  >
                    <textarea
                      spellCheck="false"
                      className="from-text form-control"
                      placeholder="Enter or paste your text and press 'Summarize.'"
                      name="summarized_text"
                      onChange={onChange}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 d-flex flex-wrap justify-content-center align-items-center">
                    {keyLoader ? (
                      <div className="Loader mb-3 p-0">
                        <div className="loading">
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
                    ) : (
                      <textarea
                        spellCheck="false"
                        readOnly
                        disabled
                        value={keywordsans}
                        className="to-text form-control"
                        placeholder="Summarize text"
                      />
                    )}
                  </div>
                </div>

                <div className=" row   icon-container align-items-center  pt-2">
                  <div class="col-md-8 trans-text1  d-flex flex-wrap">
                    {/* <div>
                      <p className="px-2">Words:133 </p>
                    </div>

                    <div>
                      <p> Language: Hindi</p>
                    </div> */}
                  </div>

                  <div className="row col-lg-6">
                    <div className=" icons justify-content-start px-4  ">
                      <div className="dropdown  ">
                        <select
                          class="form-select border"
                          aria-label="Default select example"
                          name="character_count"
                          onChange={onChange}
                        >
                          <option>Word Length</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                      </div>
                      <div className=" px-3 ">
                        <input
                          type="text"
                          name="top_word"
                          onChange={onChange}
                          class="form-control border"
                          id="inputEmail4"
                          placeholder=" Enter Words Count"
                        />
                      </div>

                      <div
                        className="  text-end "
                        // id="doc_btn"
                      >
                        <button
                          type="submit"
                          style={{ fontSize: "13px" }}
                          className="btn convert btn-primary d-flex"
                          onClick={keysubmit}
                        >
                          {/* <i className="fa fa-play" aria-hidden="true"></i> */}
                          Convert
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className=" col-6  text-end ">
                    <button
                      className="btn btn-primary  btn btn-primary"
                      title="Copy"
                      onClick={handleKeyCopy}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                    <button
                      className="btn btn-primary  btn btn-primary"
                      title="Download"
                      onClick={() => {
                        handleShow(keywordsans);
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
      )}

      <>
        <Modal show={show} onHide={handleClose} centered>
          <DownloadComponent file={fileData} />
        </Modal>
      </>
    </section>
  );
};

export default Abstract;
