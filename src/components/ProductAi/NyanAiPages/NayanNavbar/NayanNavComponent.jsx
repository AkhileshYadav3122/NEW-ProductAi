import React from "react";
import { Link } from "react-router-dom";

const NayanNavComponent = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-white ">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link " aria-current="page" to="#">
                  <span className="ps-2">
                    <i class="bi bi-house-check"> </i>
                    Home
                  </span>
                </Link>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className=" d-md-block dropdown-toggle ps-2">
                    <i class="bi bi-image px-1"> </i>
                    Image Analytics
                  </span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" to="/admin/precord">
                      Create a person's record
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/admin/Imageidentify">
                      Upload Image & Identify
                    </Link>
                  </li>
                  {/* <li>
                    <Link class="dropdown-item" to="/admin/Similarface">
                      FInd Similar Faces
                    </Link>
                  </li> */}
                  <li>
                    <Link class="dropdown-item" to="/admin/Imgenhancement">
                      Image Enhancement
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/admin/Finddifferences">
                      Find Differences
                    </Link>
                  </li>
                </ul>
              </li>
              {/* ............................. Video Analytics........................................ */}
              <li class="nav-item">
                <Link class="nav-link" to="/admin/Videoanalytics">
                  <span className=" d-md-block ps-2">
                    <i class="bi bi-film"> </i>
                    Video Analytics
                  </span>
                </Link>
              </li>
              {/* <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className=" d-md-block dropdown-toggle ps-2">
                    <i class="bi bi-film"> </i>
                    Video Analytics
                  </span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/admin/Captureandanalyze"
                    >
                      Upload Video, Capture and Analyze
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/Getoverview">
                      Get Overview
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/Analyzefeatures">
                      Analyze features in video
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      demo
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Find Differe
                    </Link>
                  </li>
                </ul>
              </li> */}
              {/* ................................ Object Detection.................................... */}
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className=" d-md-block dropdown-toggle ps-2">
                    <i class="bi bi-border-all"> </i>
                    Object Detection
                  </span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/admin/Vehicaldetection"
                    >
                      Vehicle Detection
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/admin/Instentdetection"
                    >
                      Instance Detection
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/admin/Shipaeroplanedetection"
                    >
                      Ship Aeroplane Detection
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/Weapondetection">
                      Weapon Detection
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/Firedetection">
                      Fire Detection
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NayanNavComponent;
