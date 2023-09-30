import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../Pages/Content Writing/ContentWritting.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColorRing } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import DownloadComponent from "../FileDownload/DownloadComponent";
import {
  faCopy,
  faDownload,
  faSearch,
  faUndo,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { writing } from "../../../../core/Apis/content_writing/content_writing";

const ContentWriting = () => {
  const [cont, setCont] = useState("");
  const [content, setContent] = useState("");
  const [loader, setLoader] = useState(false);

  const onChnage = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCont((prevState) => ({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    writing(cont)
      .then((data) => {
        console.log(data);
        console.log(data.data.Response);
        setLoader(false);
        setContent(data.data.Response);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };
  const handleCopy = () => {
    toast.success("copy text");
    navigator.clipboard.writeText(content);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "textFile.txt";
    link.click();

    // Clean up the temporary URL
    window.URL.revokeObjectURL(url);

    toast.info("Text file downloaded");
  };

  const handleRefresh = () => {
    setEditorHtml("");
  };

  const [editorHtml, setEditorHtml] = useState("");
  const [theme, setTheme] = useState("snow");
  const quillRef = useRef(null);

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const handleThemeChange = (newTheme) => {
    if (newTheme === "core") newTheme = null;
    setTheme(newTheme);
  };

  // useEffect(() => {
  //   const quill = quillRef.current.getEditor();
  //   quill.on("text-change", () => {
  //     const newContent = quill.root.innerHTML;
  //     setEditorHtml(newContent);
  //   });
  // }, []);

  // const modules = {
  //   toolbar: [
  //     [{ header: "1" }, { header: "2" }, { font: [] }],
  //     [{ size: [] }],
  //     ["bold", "italic", "underline", "strike", "blockquote"],
  //     [
  //       { list: "ordered" },
  //       { list: "bullet" },
  //       { indent: "-1" },
  //       { indent: "+1" },
  //     ],
  //     ["link", "image", "video"],
  //     ["clean"],
  //   ],
  //   clipboard: {
  //     matchVisual: false,
  //   },
  // };

  // const formats = [
  //   "header",
  //   "font",
  //   "size",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "blockquote",
  //   "list",
  //   "bullet",
  //   "indent",
  //   "link",
  //   "image",
  //   "video",
  // ];
  const handleReset = () => {
    // Reset the editor's content to an empty state
    setEditorHtml("");
  };
  // Function to count words in a given text
  const countWords = (text) => {
    const words = text.trim().split(/\s+/);
    return words.length;
  };

  // WordCounter component

  return (
    <div>
      {/* <div id="text" className="mt-2">
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
        <div className="main-wrapper ">
          <div className="card-body">
            <div className="  d-flex px-3   ">
              <div className="  mt-2">
                <h6 className="px-2 span_icon">
                  <span style={{ fontWeight: "400" }}>
                    <i className="bi bi-pencil"> </i>
                    Content
                  </span>
                </h6>
              </div>
              <div className="col ">
                <div className="icons justify-content-end  px-4 ">
                  <div className=" px-3 col-lg-6 ">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      name="content"
                      onChange={onChnage}
                      placeholder="Enter Contetnt"
                    />
                  </div>
                  <Button
                    className="btn convert btn-primary text-center search_btn  "
                    type="submit"
                    onClick={handleSubmit}
                    style={{ fontSize: "13px" }}
                  >
                    <FontAwesomeIcon icon={faSearch} /> Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className=" justify-content-center  mt-3  d-flex gap-2">
            <div className="col-lg-10 ">
              {loader ? (
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
              ) : (
                // <ReactQuill
                //   className="quill-editor-full"
                //   ref={quillRef}
                //   theme={theme}
                //   onChange={handleChange}
                //   defaultValue={content}
                //   // defaultValue={content}
                //   modules={modules}
                //   formats={formats}
                //   bounds={".app"}
                //   placeholder={"Write something... "}
                // />

                <textarea
                  spellCheck="false"
                  className="from-text form-control"
                  placeholder="Enter or paste your text and press 'Summarize.'"
                  name="text"
                  onChange={handleChange}
                />
              )}
            </div>

            <div className="col-lg-2 mt-4  px-4 side_buttons justify-content-center pb-2">
              <div className="mt-3">
                <Button
                  className="btn btn-primary mb-2"
                  onClick={handleDownload}
                >
                  <FontAwesomeIcon icon={faDownload} />
                </Button>
              </div>

              <div className="mt-3">
                <Button className="btn btn-primary mb-2" onClick={handleCopy}>
                  <FontAwesomeIcon icon={faCopy} />
                </Button>
              </div>
              <div className="mt-3">
                <Button className="btn btn-danger mb-2" onClick={handleReset}>
                  <FontAwesomeIcon icon={faUndo} />
                </Button>
              </div>
              <div className="mt-3">
                <Button className="btn btn-danger mb-2" onClick={""}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
              </div>
             
              
            </div>
          </div>
        </div>
      </div> */}
      <div id="text" className="mt-2">
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
        <div className="wrapper mt-1">
          <div className="card-body mb-2">
            <div className="  d-flex px-3   ">
              <div className="  mt-2">
                <h6 className="px-2 span_icon">
                  <span style={{ fontWeight: "400" }}>
                    <i className="bi bi-pencil"> </i>
                    Content
                  </span>
                  {/* <i className="bi bi-question-circle px-2"></i> */}
                </h6>
              </div>
              <div className="col ">
                <div className="icons justify-content-end  px-4 ">
                  <div className=" px-3 col-lg-6 ">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      name="content"
                      onChange={onChnage}
                      placeholder="Enter Content"
                    />
                  </div>
                  <Button
                    className="btn convert btn-primary text-center search_btn  "
                    type="submit"
                    onClick={handleSubmit}
                    style={{ fontSize: "13px" }}
                  >
                    <FontAwesomeIcon icon={faSearch} /> Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
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
                placeholder="Output "
                defaultValue={content}
              />
            )}
          </div>

          <div className=" row   icon-container justify-content-end mt-1 p-2 ">
            {/* <div class="col-md-6 trans-text1  d-flex flex-wrap"></div> */}

            <div className=" col-md-12 trans-text1  ">
              <div class=" d-flex flex-wrap">
                <div className="px-2">
                  <Button
                    className="btn btn-primary  btn-sm mb-2"
                    onClick={() => {
                      handleShow(content);
                    }}
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </Button>
                </div>
                <div className="px-2">
                  <Button className="btn btn-primary  btn-sm mb-2" onClick={handleCopy}>
                    <FontAwesomeIcon icon={faCopy} />
                  </Button>
                </div>
                {/* <div className="px-2">
                  <Button className="btn btn-danger mb-2" onClick={handleReset}>
                    <FontAwesomeIcon icon={faUndo} />
                  </Button>
                </div> */}
                {/* <div className="px-2">
                  <Button className="btn btn-danger mb-2" onClick={""}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </div> */}
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
    </div>
  );
};

export default ContentWriting;
