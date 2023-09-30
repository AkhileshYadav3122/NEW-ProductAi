import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const DownloadComponent = (file) => {
  const [filename, setFilename] = useState();

    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

   const handleShow = (data) => {
    setShow(true);

 
  };

  const handleFilenameChange = (event) => {
    setFilename(event.target.value);
  };

  const handleDownload = () => {
    console.log(file);
    if (filename) {
      let text;
      if (Array.isArray(file)) {
        text = file.file.map((item) => item);
      } else {
        text = file.file;
      }

      const blob = new Blob([text], {
        type: "text/plain",
      });

      // Create a download link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      
    } else {
      alert("Please enter a filename before downloading.");
    }
  };

  return (
    <div>

      {/* <Modal  onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Save File</Modal.Title>
          </Modal.Header> */}

          {/* <DownloadComponent file={fileData} /> */}
           <Modal.Header closeButton>
            <Modal.Title>Save File</Modal.Title>
          </Modal.Header> 
      <Modal.Body >
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Enter File Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={filename}
            onChange={handleFilenameChange}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer >
        <Button variant="primary" onClick={handleDownload} >
          DownLoad
        </Button>

      </Modal.Footer>
        {/* </Modal> */}
    </div>
  );
};

export default DownloadComponent;