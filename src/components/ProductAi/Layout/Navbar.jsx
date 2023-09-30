import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Homepage/img/22.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Layout/SideToggle.css";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle("toggle-sidebar");
  };

  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOffcanvasOpen(false); // Close the Offcanvas when a link is clicked
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link to="/" className="logos d-flex align-items-center px-2">
          <img src={logo} alt="" />{" "}
        </Link>
      </div>

      <nav className="ms-auto  header-nav ">
        <ul className=" d-flex align-items-center px-4">
          <li>
            <Link
              to="/admin/home"
              className="nav-link  nav-profile nav-item scrollto pe-3"
            >
              <span className="d-none d-md-block  ps-2">
                <i className="bi bi-translate px-2"></i>
                Translation
              </span>
            </Link>
          </li>

          <li className="nav-item dropdown pe-3">
            <Link
              className="nav-link  nav-profile d-flex align-items-center pe-0"
              to="#"
              data-bs-toggle="dropdown"
            >
              <span className="d-none d-md-block dropdown-toggle ps-2">
                <i className="bi bi-file-earmark-font  px-2"></i>
                Summarization
              </span>
            </Link>
            <ul className="dropdown-menu dropdown-menu-center dropdown-menu-arrow profile">
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/admin/Abstract"
                >
                  <i className="bi bi-file-earmark"></i>
                  <span>Abstract Text</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/admin/Extract"
                >
                  <i className="bi bi-file-earmark-text"></i>{" "}
                  <span>Extract Text</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown pe-3">
            <Link
              className="nav-link  nav-profile d-flex align-items-center pe-0"
              to="#"
              data-bs-toggle="dropdown"
            >
              <span className="d-none d-md-block dropdown-toggle ps-2">
                <i className="bi bi-gear px-2"></i>
                Tools
              </span>
            </Link>
            <ul className="dropdown-menu dropdown-menu-center dropdown-menu-arrow profile">
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/admin/Scan"
                >
                  <i className="bi bi-person"></i>
                  <span>Scan</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/admin/Cipher"
                >
                  <i className="bi bi-lock"></i>
                  <span>Cipher</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/admin/ContentWriting"
                >
                  <i className="bi bi-pencil"></i> <span>Content Writting</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
            </ul>
          </li>
          <li>
            <Link to="Documents" className="nav-link nav-profile scrollto pe-3">
              <span className="d-none d-md-block  ps-2">
                {" "}
                <i className="bi bi-boxes  px-2"></i>
                OCR
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/Nayanhome"
              className="nav-link  nav-profile nav-item scrollto pe-3"
            >
              <span className="d-none d-md-block  ps-2">
                <i className="bi bi-eye px-2"></i>
              Vision
              </span>
            </Link>
          </li>
          <li className="nav-item dropdown pe-3 ">
            <Link
              className="nav-link nav-profile d-flex align-items-center pe-0"
              to="#"
              data-bs-toggle="dropdown"
            >
              {/* <img src={ProfileImg} alt="Profile" className="rounded-circle" /> */}
              <span className="d-none d-md-block dropdown-toggle ps-2">
                Profile
              </span>
            </Link>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              {/* <li className="dropdown-header">
                <h6>Kevin Anderson</h6>
                <span>Web Designer</span>
              </li> */}
              {/* <li>
                <hr className="dropdown-divider" />
              </li> */}

              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="Profile"
                >
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/login"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </Link>
              </li>
            </ul>
          </li>

          <i
            className="bi bi-list toggle-sidebar-btn"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          ></i>
        </ul>
      </nav>

      {/* SideToggle Bar */}

      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel ">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAA0CAMAAAAUjyCdAAAAdVBMVEUAAABBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPFBVPF13w9vAAAAJnRSTlMA5ug59iGwkrLLzfp3Vu+/p5ZpKAy0fmVhSxbz69+gbwHW1IyKGU5/excAAAEBaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyI/PjxyOlJERiB4bWxuczpyPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cjpEZXNjcmlwdGlvbiB4bWxuczp4PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj48eDpDcmVhdGVEYXRlPjIwMjEtMDUtMDRUMTM6MzQ6MDkrMDM6MDA8L3g6Q3JlYXRlRGF0ZT48L3I6RGVzY3JpcHRpb24+PC9yOlJERj48P3hwYWNrZXQgZW5kPSJyIj8+f9gwJQAAAOlJREFUSMft0MmOwjAQhOGCMAkzntjZyMa+9fs/IsECjIWSqITEif9Y0teHRgw2vWXFSjJSTEQyWkgNvyp0zf0WiRUq9kUq/S078UqiATHthCOM6AgrZJazQoLPipQW5W1aR482alAURmyJm9rZoEB7sFPolp8RgXzNCgSaFWgUK1DRAqXMSYHEsKKod5SwfcWYaApWbBJWRFLSQipaqIYVogNWyCRnhezbEfF08iQ2UwyL9P+RuU89or8FLcK3hGLFeckKxIoQjhDCkSn0+HcdscL8PffrdYRfbcUORNlVABxZgWyrwRZfAOrTnmyCT1ScAAAAAElFTkSuQmCC "
              alt=""
              style={{ height: 23 }}
            ></img>

            <span className="px-2">Product AI</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item nav-items">
              <Link
                to="/admin/home"
                class="nav-link active"
                aria-current="page"
              >
                <i className="bi bi-translate px-2"></i>
                Translation
              </Link>
            </li>

            <li class="nav-item  nav-items dropdown">
              <a
                class="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-file-earmark-font  px-2"></i>
                Summarization
              </a>
              <ul className="dropdown-menu dropdown-menu-center dropdown-menu-arrow profile D_menu ">
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to="/admin/Abstract"
                  >
                    <i className="bi bi-file-earmark"></i>
                    <span>Abstract Text</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to="/admin/Extract"
                  >
                    <i className="bi bi-file-earmark-text"></i>{" "}
                    <span>Extract Text</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li class="nav-item nav-items dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-gear px-2"></i>
                Tools
              </a>
              <ul className="dropdown-menu dropdown-menu-center dropdown-menu-arrow profile D_menu">
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to="/admin/Scan"
                  >
                    <i className="bi bi-person"></i>
                    <span>Scan</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to="/admin/Cipher"
                  >
                    <i className="bi bi-lock"></i>
                    <span>Cipher</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to="/admin/ContentWriting"
                  >
                    <i className="bi bi-pencil"></i>{" "}
                    <span>Content Writting</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li class="nav-item nav-items">
              <Link
                to="Documents"
                class="nav-link active"
                aria-current="page"
                href="#"
              >
                <i className="bi bi-boxes  px-2"></i>
                OCR
              </Link>
            </li>
            {/* <li class="nav-item nav-items">
              <Link
                to="#about"
                class="nav-link active"
                aria-current="page"
                href="#"
              >
                <i className="bi bi-envelope  px-2"></i>
                Write With AI
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
