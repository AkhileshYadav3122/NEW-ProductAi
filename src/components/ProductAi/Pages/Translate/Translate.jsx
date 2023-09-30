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
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

const Translate = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [micText, setMicText] = useState("");
  const [micToText, setMicToText] = useState("");
  const [showmic, setShowMic] = useState(false);

  // selectedFromLanguage
  const [selectedFromLanguage, setSelectedFromLanguage] = useState("");
  const [selectedToLanguage, setSelectedToLanguage] = useState("");
  const [text, setText] = useState("");
  const [showText, setShowText] = useState("");
  const [fileupload, setFileUpload] = useState({
    audio: null,
    // output_language:'',
    input_language: "",
  });

  const [audioAns, setAudioAns] = useState([]);
  const [loader, setLoader] = useState(false);
  const [lang, setLang] = useState();
  const [fileLoader, setFileLoader] = useState(false);
  const [getProfileId, setGetProfileId] = useState();
  const [recognizedText, setRecognizedText] = useState();

  const navigate = useNavigate();

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

  /// MIc
  const socket = io("http://192.168.1.145");
  const [isListening, setIsListening] = useState(false);
  const mediaStream = useRef(null);
  const recordAudio = useRef(null);

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

  const toggleMicrophone = () => {
    if (!isListening) {
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
          let media = stream;
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
          setIsListening(true);
        },
        function (error) {
          console.error(JSON.stringify(error));
        }
      );
    } else {
      // Stop listening
      if (mediaStream.current) {
        mediaStream.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
      if (recordAudio.current) {
        recordAudio.current.stopRecording(function () {
          setIsListening(false);
        });
      }
    }
  };

  // const onMiceStart = () => {
  //   socket.on("on_transcript", function (msg) {
  //     console.log(msg);
  //     var element = document.getElementById("trans");
  //     element.textContent += msg.data;
  //   });
  //   navigator.getUserMedia(
  //     {
  //       audio: true,
  //     },
  //     function (stream) {
  //       media = stream;
  //       let recordAudio = RecordRTC(stream, {
  //         type: "audio",
  //         mimeType: "audio/webm",
  //         sampleRate: 44100,
  //         desiredSampRate: 16000,
  //         recorderType: StereoAudioRecorder,
  //         numberOfAudioChannels: 1,
  //         timeSlice: 5000,
  //         ondataavailable: function (blob) {
  //           console.log(blob);
  //           socket.emit("transcript", blob);
  //         },
  //       });
  //       recordAudio.startRecording();
  //     },
  //     function (error) {
  //       console.error(JSON.stringify(error));
  //     }
  //   );
  // };

  // let media;

  // const offMiceStart = () => {
  //   console.log("condition run");
  //   console.log(media);
  //   if (media) {
  //     console.log(media);
  //     media.getTracks().forEach(function (track) {
  //       track.stop();
  //       console.log("hit condition");
  //     });
  //   }
  // };

  // copy textarea
  const handleCopy = () => {
    toast.success("copy text");
    navigator.clipboard.writeText(showText);
  };

  const handleDownload = () => {
    const blob = new Blob([showText], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "textFile.txt";
    link.click();
    // Clean up the temporary URL
    window.URL.revokeObjectURL(url);
    toast.info("Text file downloaded");
  };

  const handleSpeechRecognitionResult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");
    setRecognizedText(transcript);
    console.log(transcript, "hit trans");
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

  // refresh button
  const [isAnimating, setIsAnimating] = useState(false);
  const handleReloadClick = () => {
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
      window.location.reload(true);
    }, 1000);
  };

  /////submenuOpen
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
            <li>
              <Link
                className="dropdown-item"
                to="/admin/Diarization"
                onClick={handleTranslateClick}
              >
                <i className="bi bi-volume-up"> </i>
                Diarization
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
              <div className="audio-player justify-content-end px-3 p-0   ">
                <audio
                  ref={audioRef}
                  src="http://mainline.i3s.unice.fr/mooc/LaSueur.mp3"
                />
                <button
                  class="btn btn-primary mb-2 btn-sm"
                  title="Play"
                  onClick={handlePlay}
                >
                  <FontAwesomeIcon icon={faVolumeUp} />
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
                      className={`btn rounded-circle ${
                        isListening ? "btn-danger" : "btn-success"
                      }`}
                      onClick={toggleMicrophone}
                    >
                      <FontAwesomeIcon
                        icon={isListening ? faStop : faMicrophone}
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
                      <option value="af">
                        <span>Afrikaans</span>
                      </option>
                      <option value="ak">
                        <span>Akan</span>
                      </option>
                      <option value="sq">
                        <span>Albanian</span>
                      </option>
                      <option value="am">
                        <span>Amharic</span>
                      </option>
                      <option value="ar">
                        <span>Arabic</span>
                      </option>
                      <option value="hy">
                        <span>Armenian</span>
                      </option>
                      <option value="az">
                        <span>Azerbaijani</span>
                      </option>
                      <option value="eu ">
                        <span>Basque</span>
                      </option>
                      <option value="be">
                        <span>Belarusian</span>
                      </option>
                      <option value="bem">
                        <span>Bemba</span>
                      </option>
                      <option value="bn          ">
                        <span>Bengali</span>
                      </option>
                      <option value="bh          ">
                        <span>Bihari</span>
                      </option>
                      <option value="xx-bork">
                        <span>Bork, bork, bork!</span>
                      </option>
                      <option value="bs          ">
                        <span>Bosnian</span>
                      </option>
                      <option value="br          ">
                        <span>Breton</span>
                      </option>
                      <option value="bg          ">
                        <span>Bulgarian</span>
                      </option>
                      <option value="km          ">
                        <span>Cambodian</span>
                      </option>
                      <option value="ca          ">
                        <span>Catalan</span>
                      </option>
                      <option value="chr         ">
                        <span>Cherokee</span>
                      </option>
                      <option value="ny          ">
                        <span>Chichewa</span>
                      </option>
                      <option value="zh-CN ">
                        <span>Chinese (Simplified) </span>
                      </option>
                      <option value="zh-TW  ">
                        <span> Chinese (Traditional)</span>
                      </option>
                      <option value="co          ">
                        <span>Corsican</span>
                      </option>
                      <option value="hr          ">
                        <span>Croatian</span>
                      </option>
                      <option value="cs          ">
                        <span>Czech</span>
                      </option>
                      <option value="da          ">
                        <span>Danish</span>
                      </option>
                      <option value="nl          ">
                        <span>Dutch</span>
                      </option>
                      <option value="xx-elmer ">
                        <span>Elmer Fudd</span>
                      </option>
                      <option value="en          ">
                        <span>English</span>
                      </option>
                      <option value="eo          ">
                        <span>Esperanto</span>
                      </option>
                      <option value="et          ">
                        <span>Estonian</span>
                      </option>
                      <option value="ee          ">
                        <span>Ewe</span>
                      </option>
                      <option value="fo          ">
                        <span>Faroese</span>
                      </option>
                      <option value="tl          ">
                        <span>Filipino</span>
                      </option>
                      <option value="fi          ">
                        <span>Finnish</span>
                      </option>
                      <option value="fr          ">
                        <span>French</span>
                      </option>
                      <option value="fy          ">
                        <span>Frisian</span>
                      </option>
                      <option value="gaa         ">
                        <span>Ga</span>
                      </option>
                      <option value="gl          ">
                        <span>Galician</span>
                      </option>
                      <option value="ka          ">
                        <span>Georgian</span>
                      </option>
                      <option value="de          ">
                        <span>German</span>
                      </option>
                      <option value="el          ">
                        <span>Greek</span>
                      </option>
                      <option value="gn">
                        <span>Guarani</span>
                      </option>
                      <option value="gu">
                        <span>Gujarati</span>
                      </option>
                      <option value="xx-hacker">
                        <span>Hacker</span>
                      </option>
                      <option value="ht">
                        <span>Haitian Creole</span>
                      </option>
                      <option value="ha">
                        <span>Hausa</span>
                      </option>
                      <option value="haw">
                        <span>Hawaiian</span>
                      </option>
                      <option value="iw          ">
                        <span>Hebrew</span>
                      </option>
                      <option value="hi">
                        <span>Hindi</span>
                      </option>
                      <option value="hu">
                        <span>Hungarian</span>
                      </option>
                      <option value="is">
                        <span>Icelandic</span>
                      </option>
                      <option value="ig">
                        <span>Igbo</span>
                      </option>
                      <option value="id">
                        <span>Indonesian</span>
                      </option>
                      <option value="ia">
                        <span>Interlingua</span>
                      </option>
                      <option value="ga ">
                        <span>Irish</span>
                      </option>
                      <option value="it ">
                        <span>Italian</span>
                      </option>
                      <option value="ja  ">
                        <span>Japanese</span>
                      </option>
                      <option value="jw">
                        <span>Javanese</span>
                      </option>
                      <option value="kn">
                        <span>Kannada</span>
                      </option>
                      <option value="kk">
                        <span>Kazakh</span>
                      </option>
                      <option value="rw">
                        <span>Kinyarwanda</span>
                      </option>
                      <option value="rn">
                        <span>Kirundi</span>
                      </option>
                      <option value="xx-klingon">
                        <span>Klingon</span>
                      </option>
                      <option value="kg ">
                        <span>Kongo</span>
                      </option>
                      <option value="ko ">
                        <span>Korean</span>
                      </option>
                      <option value="kri ">
                        <span>Krio (Sierra Leone)</span>
                      </option>
                      <option value="ku">
                        <span>Kurdish</span>
                      </option>
                      <option value="ckb">
                        <span> Kurdish (Soranî)</span>
                      </option>
                      <option value="ky ">
                        <span>Kyrgyz</span>
                      </option>
                      <option value="lo">
                        <span>Laothian</span>
                      </option>
                      <option value="la">
                        <span>Latin</span>
                      </option>
                      <option value="lv">
                        <span>Latvian</span>
                      </option>
                      <option value="ln          ">
                        <span>Lingala</span>
                      </option>
                      <option value="lt">
                        <span>Lithuanian</span>
                      </option>
                      <option value="loz">
                        <span>Lozi</span>
                      </option>
                      <option value="lg">
                        <span>Luganda</span>
                      </option>
                      <option value="ach">
                        <span>Luo</span>
                      </option>
                      <option value="mk">
                        <span>Macedonian</span>
                      </option>
                      <option value="mg ">
                        <span>Malagasy</span>
                      </option>
                      <option value="ms">
                        <span>Malay</span>
                      </option>
                      <option value="ml">
                        <span>Malayalam</span>
                      </option>
                      <option value="mt">
                        <span>Maltese</span>
                      </option>
                      <option value="mi">
                        <span>Maori</span>
                      </option>
                      <option value="mr">
                        <span>Marathi</span>
                      </option>
                      <option value="mfe">
                        <span> Mauritian Creole</span>
                      </option>
                      <option value="mo">
                        <span>Moldavian</span>
                      </option>
                      <option value="mn">
                        <span>Mongolian</span>
                      </option>
                      <option value="sr-ME ">
                        <span>Montenegrin</span>
                      </option>
                      <option value="ml">
                        <span>Malayalam</span>
                      </option>
                      <option value="ne">
                        <span>Nepali</span>
                      </option>
                      <option value="pcm">
                        <span>Nigerian Pidgin</span>
                      </option>
                      <option value="nso">
                        <span> Northern Sotho</span>
                      </option>
                      <option value="no">
                        <span>Norwegian</span>
                      </option>
                      <option value="nn">
                        <span>Norwegian (Nynorsk)</span>
                      </option>
                      <option value="oc">
                        <span>Occitan</span>
                      </option>
                      <option value="or">
                        <span>Oriya</span>
                      </option>
                      <option value="om">
                        <span>Oromo</span>
                      </option>
                      <option value="ps">
                        <span>Pashto</span>
                      </option>
                      <option value="fa">
                        <span>Persian</span>
                      </option>
                      <option value="xx-pirate">
                        <span>Pirate</span>
                      </option>
                      <option value="pl">
                        <span>Polish</span>
                      </option>
                      <option value="pt-BR ">
                        <span>Portuguese (Brazil)</span>
                      </option>
                      <option value="pt-PT">
                        <span>Portuguese (Portugal)</span>
                      </option>
                      <option value="pa">
                        <span>Punjabi</span>
                      </option>
                      <option value="qu">
                        <span>Quechua</span>
                      </option>
                      <option value="rm">
                        <span>Romansh</span>
                      </option>
                      <option value="nyn">
                        <span>Runyakitara</span>
                      </option>
                      <option value="ru          ">
                        <span>Russian</span>
                      </option>
                      <option value="gd   ">
                        <span>Scots Gaelic</span>
                      </option>
                      <option value="sr">
                        <span>Serbian</span>
                      </option>{" "}
                      <option value="sh">
                        <span>Serbo-Croatian</span>
                      </option>
                      <option value="st ">
                        <span>Sesotho</span>
                      </option>
                      <option value="tn ">
                        <span>Setswana</span>
                      </option>{" "}
                      <option value="crs">
                        <span> Seychellois Creole</span>
                      </option>
                      <option value="sn ">
                        <span>Shona</span>
                      </option>
                      <option value="sd">
                        <span>Sindhi</span>
                      </option>{" "}
                      <option value="si">
                        <span>Sinhalese</span>
                      </option>
                      <option value="sk">
                        <span>Slovak</span>
                      </option>
                      <option value="so ">
                        <span>Slovenian</span>
                      </option>{" "}
                      <option value="es">
                        <span>Spanish</span>
                      </option>
                      <option value="es-419">
                        <span>Spanish (Latin American)</span>
                      </option>
                      <option value="su">
                        <span>Sundanese</span>
                      </option>
                      <option value="sw">
                        <span>Swahili</span>
                      </option>
                      <option value="sw">
                        <span>Swahili</span>
                      </option>
                      <option value="sv ">
                        <span>Swedish</span>
                      </option>
                      <option value="tg">
                        <span>Tajik</span>
                      </option>
                      <option value="ta">
                        <span>Tamil</span>
                      </option>
                      <option value="tt ">
                        <span>Tatar</span>
                      </option>{" "}
                      <option value="te">
                        <span>Telugu</span>
                      </option>
                      <option value="th">
                        <span>Thai</span>
                      </option>{" "}
                      <option value="ti">
                        <span>Tigrinya</span>
                      </option>
                      <option value="to ">
                        <span>Tonga</span>
                      </option>{" "}
                      <option value="sw">
                        <span>Tshiluba</span>
                      </option>
                      <option value="tum ">
                        <span>Tumbuka</span>
                      </option>{" "}
                      <option value="tr">
                        <span>Turkish</span>
                      </option>
                      <option value="tk">
                        <span>Turkmen</span>
                      </option>{" "}
                      <option value="tw ">
                        <span>Twi</span>
                      </option>
                      <option value="ug">
                        <span>Uighur</span>
                      </option>{" "}
                      <option value="uk">
                        <span>Ukrainian</span>
                      </option>
                      <option value="ur">
                        <span>Urdu</span>
                      </option>{" "}
                      <option value="uz">
                        <span>Uzbek</span>
                      </option>
                      <option value="vi">
                        <span>Vietnamese</span>
                      </option>{" "}
                      <option value="cy">
                        <span>Welsh</span>
                      </option>
                      <option value="wo">
                        <span>Wolof</span>
                      </option>
                      <option value="xh">
                        <span>Xhosa</span>
                      </option>
                      <option value="yi">
                        <span>Yiddish</span>
                      </option>
                      <option value="yo">
                        <span>Yoruba</span>
                      </option>
                      <option value="zu">
                        <span>Swahili</span>
                      </option>
                      <option value="sw">
                        <span>Zulu</span>
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
                  >
                    {/* <select
                        className="form-select text-center"
                        value={selectedToLanguage}
                      >
                        {" "}
                        <option>Select language</option>
                       
                          <option >
                            
                          </option>
                       
                      </select> */}
                  </li>
                  <div className="icons d-flex align-items-start pl-2 gap-2 ">
                    <div className="audio-player justify-content-end  ">
                      <button
                        className={`btn btn-primary btn-sm ${
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

                    <button
                      className="btn btn-primary mb-2 btn-sm"
                      onClick={handleCopy}
                      title="Copy Text"
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                    <button
                      className="btn btn-primary mb-2 btn-sm "
                      onClick={() => {
                        handleShow(showText);
                      }}
                      title="Download"
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </button>

                    {/* <button
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
                    </button> */}
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
