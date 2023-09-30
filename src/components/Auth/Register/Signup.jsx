import React, { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import { registerAdd } from "../../../core/Apis/auth/registerApis";
import { ColorRing } from "react-loader-spinner";
import logo from "../22.png"


const Signup = () => {
  const [register, setRegister] = useState({});
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRegister((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // registrtation
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("api hit ");
    setLoader(true);
    registerAdd(register)
      .then((data) => {
        console.log(data);
        setLoader(false);
        toast.success("Registered Successfully", {
          onClose: () => {
            navigate("/login");
          },
        });
      })
      .catch((e) => {
        console.log(e.response.data.error);
        setLoader(false);
        toast.error(e.response.data.error);
      });
  };
  return (
    <>
    <div className="container">
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
      <section className="section1 register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <Container>
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center py-4">
                <Link
                  to="/"
                  className="logo-login d-flex align-items-center w-auto"
                >
                  <img
                    src={logo}
                    alt=""
                  />
                  {/* <span className="d-none d-lg-block">ProductAI</span> */}
                </Link>
              </div>

              <div className="card-login mb-3">
                <div className="card-body-login">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title-login text-center pb-0 fs-4">
                      Create an Account
                    </h5>
                  </div>
                  <Form className="row g-3 needs-validation" noValidate>
                    <Form.Group className="col-12" controlId="yourName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        onChange={onChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your name!
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="col-12" controlId="yourEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        onChange={onChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid email address!
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="col-12" controlId="yourPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        onChange={onChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your password!
                      </Form.Control.Feedback>
                    </Form.Group>
                    {/* 
                    <Col md={12}>
                      <Form.Check>
                        <Form.Check.Input
                          type="checkbox"
                          name="remember"
                          value="true"
                          id="rememberMe"
                        />
                        <Form.Check.Label htmlFor="rememberMe">
                          <span>
                            I agree and accept the{" "}
                            <Link to="#">terms and conditions</Link>
                          </span>{" "}
                        </Form.Check.Label>
                      </Form.Check>
                    </Col> */}
                    <div className="col-12">
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
                        <Button
                          variant="primary"
                          className="w-100"
                          type="submit"
                          onClick={handlesubmit}
                        >
                          Create Account
                        </Button>
                      )}
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">
                        Already have an account? <Link to="/login">Log in</Link>
                      </p>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
    </div>
    <Container fluid>
      <footer id="footer" class="footerAdmin ">
        <div class="copyright">
          &copy; Copyright
          <strong>
            <span> ABHA AI</span>
          </strong>
          . All Rights Reserved
        </div>
        <div class="credits">
          {/* Designed by <Link to="https://cloudstrats.com/">Cloudstrats</Link> */}
        </div>
      </footer>
      </Container>
    </>
  );
};

export default Signup;
