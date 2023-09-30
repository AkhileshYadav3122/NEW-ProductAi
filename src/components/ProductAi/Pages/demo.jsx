import React, { useEffect, useRef, useState } from "react";
import "../../Pages/Translate/Translate.css";

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
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import {
  mictranslate,
  translate,
} from "../../../../core/Apis/translate/translate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ColorRing } from "react-loader-spinner";
import {
  AddProfile,
  getProfile,
} from "../../../../core/Apis/Profileuser/profileApi";
// import { socket } from "../../../../core/Apis/serverIo/socket";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
import { io } from "socket.io-client";
import DownloadComponent from "../FileDownload/DownloadComponent";

const Translate = () => {
  // selectedFromLanguage

  const [text, setText] = useState("");
  const [showText, setShowText] = useState("");
  const [fileupload, setFileUpload] = useState({
    audio: null,
    // output_language:'',
    input_language: "",
  });

  // const [audioAns, setAudioAns] = useState([]);
  const [loader, setLoader] = useState(false);
  const [lang, setLang] = useState();
  const navigate = useNavigate();

  const socket = io("http://192.168.1.145");

  const onChnage = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setText((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (lang == "output_language") {
      setLang((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    setFileUpload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [show, setShow] = useState(false);
  const [fileData, setFileData] = useState();

  const handleClose = () => setShow(false);

  const handleShow = (data) => {
    setShow(true);

    // console.log("opnend model");

    setFileData(data);
  };

  useEffect(() => {
    profileid();

    socket.on("my_response", () => {
      console.log("connect");
    });
    socket.on("disconnect", () => {
      console.log("diConnect");
    });
  }, []);

  const profileid = async () => {
    const id = localStorage.getItem("user_id");

    if (id == null) {
      navigate("/login");
    }

    getProfile(id)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("apihit");
    setLoader(true);
    translate(text)
      .then((data) => {
        console.log(data.data.translated_text);
        setLoader(false);
        setShowText(data.data.translated_text);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
        toast.error(e);
      });

    console.log(text);
  };

  const audioRef = useRef(null);
  const handlePlay = () => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(showText);
      console.log(utterance);
      const voices = window.speechSynthesis.getVoices();
      const indianEnglish = voices.find((voice) => voice.lang === "hi-IN");
      if (indianEnglish) {
        utterance.voice = indianEnglish;
      }
      window.speechSynthesis.speak = indianEnglish;
    }
  };

  const onMiceStart = () => {
    socket.on("on_transcript", function (msg) {
      console.log(msg);
      var element = document.getElementById("trans");
      element.textContent += msg.data;
    });
    navigator.getUserMedia(
      {
        audio: true,
      },
      function (stream) {
        media = stream;
        let recordAudio = RecordRTC(stream, {
          type: "audio",
          mimeType: "audio/webm",
          sampleRate: 44100,
          desiredSampRate: 16000,
          recorderType: StereoAudioRecorder,
          numberOfAudioChannels: 1,
          timeSlice: 5000,
          ondataavailable: function (blob) {
            console.log(blob);
            socket.emit("transcript", blob);
          },
        });
        recordAudio.startRecording();
      },
      function (error) {
        console.error(JSON.stringify(error));
      }
    );
  };
  let media;
  const offMiceStart = () => {
    console.log("condition run");
    console.log(media);
    if (media) {
      console.log(media);
      media.getTracks().forEach(function (track) {
        track.stop();
        console.log("hit condition");
      });
    }
  };

  // copy textarea
  const handleCopy = () => {
    toast.success("copy text");
    navigator.clipboard.writeText(showText);
  };

  const handleDownload = () => {
    const blob = new Blob([showText], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.to = url;
    link.download = "textFile.txt";
    link.click();

    // Clean up the temporary URL
    window.URL.revokeObjectURL(url);

    toast.info("Text file downloaded");
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  //  SpeechRecognition.startListening({ continuous: true })

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const [audioAns, setAudioAns] = useState([]);

  // refresh button
  const [isAnimating, setIsAnimating] = useState(false);
  const handleReloadClick = () => {
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
      window.location.reload(true);
    }, 1000);
  };

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

  // ////////////
  let mediaStream; // Define mediaStream variable here

  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);

    socket.on("on_transcript", function (msg) {
      console.log(msg);
      var element = document.getElementById("trans");
      element.textContent += msg.data;
    });

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        let recordAudio = RecordRTC(stream, {
          type: "audio",
          mimeType: "audio/webm",
          sampleRate: 44100,
          desiredSampRate: 16000,
          recorderType: StereoAudioRecorder,
          numberOfAudioChannels: 1,
          timeSlice: 5000,
          ondataavailable: function (blob) {
            console.log(blob);
            socket.emit("transcript", blob);
          },
        });
        recordAudio.startRecording();
      })
      .catch(function (error) {
        console.error(JSON.stringify(error));
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaStream) {
      mediaStream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
  };

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  return (
    <div>
      <div class="container-flued">
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

        <div className="dropdown ">
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
                to=""
                onClick={handleTranslateClick}
              >
                <i class="bi bi-translate"></i>
                Translate
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
        <div id="text">
          <div className=" d-flex  ">
            <div className="col-6 col-md-6 col-sm-6">
              <h6 className="px-2">
                <span style={{ fontWeight: "400" }}>Translator </span>
                {/* <i className="bi bi-question-circle px-2"></i> */}
              </h6>
            </div>
            <div className="col-6 col-md-6 col-sm-6 ">
              <div className="audio-player justify-content-end px-3 p-0 ">
                <button
                  className={`btn-light btn-sm  play-button ${
                    isAnimating ? "animating" : ""
                  }`}
                  onClick={handleReloadClick}
                >
                  <FontAwesomeIcon
                    icon={faUndo}
                    className={`icon ${isAnimating ? "rotate" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="wrapper mt-3 container-fluid">
            <div className="text-input trans-text-icon row">
              <div
                className="col-lg-6 col-md-12 d-flex flex-wrap"
                style={{ borderRight: "1px solid #cccccc7d" }}
              >
                <textarea
                  spellCheck="false"
                  className="from-text form-control"
                  placeholder="Type To Translate"
                  name="text"
                  id="trans"
                  defaultValue={audioAns.join("")}
                  onChange={onChnage}
                />
              </div>
              <div className="col-lg-6 col-md-12 d-flex flex-wrap justify-content-center align-items-center">
                {loader ? (
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
                    className="to-text form-control"
                    placeholder="Translation"
                    value={showText}
                  />
                )}
              </div>
            </div>

            <div class=" trans-text">
              <ul className="controls list-unstyled d-flex flex-wrap">
                <div class="col-lg-4 gap-2 d-flex ">
                  <div>
                    {/* <button
                      className={`btn play-button ${
                        isListening ? "listening" : ""
                      }`}
                      onClick={toggleListening}
                      title="Voice"
                    >
                      <FontAwesomeIcon
                        icon={isListening ? faStop : faMicrophone}
                      />
                    </button> */}
                    <button
                      className={`btn play-button ${
                        isRecording ? "listening" : ""
                      }`}
                      onClick={() => setIsRecording(!isRecording)}
                      title={isRecording ? "Stop Recording" : "Start Recording"}
                    >
                      <FontAwesomeIcon
                        icon={isRecording ? faStop : faMicrophone}
                      />
                    </button>
                  </div>
                  <li
                    className="rowControls from "
                    // style={{ float: "right" }}
                  >
                     <select
                      className="form-select text-center"
                      // value={selectedFromLanguage}
                      name="output_language"
                      onChange={onChnage}
                      // onChange={(e) => handleLanguageChange(e, true)}
                    >
                      <option>Select Language</option>

                      <option value="mr">
                        <span>Marathi</span>
                      </option>
                      <option value="hi">
                        <span>Hindi</span>
                      </option>
                    </select>
                  </li>
                </div>

                <div class="col-lg-4">
                  <li
                    className="exchange align-items-center justify-content-center row from"
                    // onClick={handleExchangeLanguages}
                  >
                    <button
                      class="btn btn-primary "
                      onClick={handlesubmit}
                      style={{ width: "auto" }}
                    >
                      Translate
                    </button>
                  </li>
                </div>
                <div class="col-lg-4  gap-2 d-flex">
                  <li
                    className="rowControls to flex-grow-1"
                    style={{ float: "left" }}
                  ></li>
                  <div className="icons d-flex align-items-start pl-2 gap-2">
                    <div className="audio-player justify-content-end   ">
                      <audio
                        ref={audioRef}
                        src="http://mainline.i3s.unice.fr/mooc/LaSueur.mp3"
                      />
                      <button
                        class="btn-light btn-sm  play-button"
                        title="Play"
                        onClick={handlePlay}
                      >
                        <FontAwesomeIcon icon={faVolumeUp} />
                      </button>
                    </div>
                    <button
                      className="btn-light btn-sm  play-button "
                      onClick={handleCopy}
                      title="Copy Text"
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                    <button
                      className="btn-light btn-sm  play-button "
                      onClick={() => {
                        handleShow(showText);
                      }}
                      title="Download"
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </button>

                    <button
                      className="btn btn-success rounded-circle"
                      onClick={() => {
                        onMiceStart();
                      }}
                    >
                      <FontAwesomeIcon icon={faMicrophone} />
                    </button>

                    <button
                      className="btn btn-danger rounded-circle"
                      onClick={() => {
                        offMiceStart();
                      }}
                    >
                      <FontAwesomeIcon icon={faStop} />
                    </button>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <>
        <Modal show={show} onHide={handleClose} centered>
          <DownloadComponent file={fileData} />
        </Modal>
      </>
    </div>
  );
};

export default Translate;
