import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../Pages/Content Writing/ContentWritting.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faDownload, faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { writing } from "../../../../core/Apis/content_writing/content_writing";

const ContentWriting = () => {
  // const handleDownload = () => {
  //   const content = quillEditorRef.current.root.innerHTML;
  //   const file = new Blob([content], { type: "text/html" });
  //   const url = URL.createObjectURL(file);

  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "quill_content.html";
  //   document.body.appendChild(a);
  //   a.click();

  //   // Clean up
  //   URL.revokeObjectURL(url);
  //   document.body.removeChild(a);
  // };

  // const handleCopy = () => {
  //   const content = quillEditorRef.current.root.innerHTML;

  //   // Create a temporary textarea to copy the content to the clipboard
  //   const tempTextArea = document.createElement("textarea");
  //   tempTextArea.value = content;
  //   document.body.appendChild(tempTextArea);
  //   tempTextArea.select();
  //   document.execCommand("copy");
  //   document.body.removeChild(tempTextArea);
  // };

  // const handleRefresh = () => {
  //   // Clear the editor's content
  //   setEditorHtml("");
  // };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   const keywords = e.target.elements.keywords.value;
  //   // Perform search based on the keywords
  //   console.log("Keywords:", keywords);
  // };

  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     const fileContent = event.target.result;
  //     // Update the editor content with the uploaded file content
  //     setEditorHtml(fileContent);
  //   };
  //   reader.readAsText(file);
  // };

  const [cont, setCont] = useState("");
  const [content, setContent] = useState("");

  const onChnage = (e) => {
    const name = e.target.name;
    const value = e.target.value;


    setCont((prevState) => ({
         ...prevState,
         [name]:value
    }))
  };

  const handleSubmit = (e) => {
       e.preventDefault();
       writing(cont)
       .then((data) => {
         console.log(data)
         console.log(data.data.Response);
         setContent(data.data.Response);
       })
       .catch((e) => {
        console.log(e)
       })
  }

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

  useEffect(() => {
    const quill = quillRef.current.getEditor();
    quill.on("text-change", () => {
      const newContent = quill.root.innerHTML;
      setEditorHtml(newContent);
    });
  }, []);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
      <div id="text" className="mt-2">
        <form>
          <div className="main-wrapper">
            <div className="col-lg-12">
              <div className="card-body">
                <div className="  d-flex px-3   ">
                  <div className="col-5 col-md-5 col-sm-5  p-0">
                    <h6 className="px-2">
                      <span style={{ fontWeight: "400" }}>Keywords </span>
                      <i className="bi bi-question-circle px-2"></i>
                    </h6>
                  </div>
                  <div className="col-7 col-md-7 col-sm-7 ">
                    <div className="icons justify-content-end ">
                      <div className=" px-3 ">
                        <input
                          type="email"
                          className="form-control"
                          id="inputEmail4"
                          name="content"
                          onChange={onChnage}
                          placeholder="Enter Words Count"
                        />
                      </div>
                      <Button
                        className="btn convert btn-primary text-center"
                        type="submit"
                        onClick={handleSubmit}
                        style={{ fontSize: "13px" }}
                      >
                        content
                        {/* <FontAwesomeIcon icon={faSearch} /> Search */}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="app">
                  <ReactQuill
                    className="quill-editor-full"
                    ref={quillRef}
                    theme={theme}
                    onChange={handleChange}
                    value={content}
                    modules={modules}
                    formats={formats}
                    bounds={".app"}
                    placeholder={"Write something... "}
                  />  
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentWriting;
