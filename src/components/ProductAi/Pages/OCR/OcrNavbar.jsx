import React from 'react'
import { Link } from "react-router-dom";


const OcrNavbar = () => {
  return (
    <>
      <nav>
        <ol className="breadcrumb mt-1">
          <li className="breadcrumb-item">
            <Link to="/admin/Documents/">
              <i className="bi bi-house-door"></i>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/admin/Aadhar/">Aadhar</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/admin/Pancard/">Pancard</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/admin/Passport/">Passport</Link>
          </li>
          {/* <li className="breadcrumb-item">
            <Link to="/admin/Cheque/">Cheque</Link>
          </li> */}
          <li className="breadcrumb-item">
            <Link to="/admin/Invoice/">Invoice</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to="/admin/Driving/">Driving License</Link>
          </li>
          {/* <li className="breadcrumb-item">
            <Link to="/admin/Multicropping/">Multicropping</Link>
          </li> */}
          <li className="breadcrumb-item">
            <Link to="/admin/Textscanner/">Textscanner</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/admin/RcBook/">RcBook</Link>
          </li>
        </ol>
      </nav>
    </>
  );
}

export default OcrNavbar