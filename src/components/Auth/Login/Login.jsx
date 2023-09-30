import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";
import { loginAdd } from "../../../core/Apis/auth/registerApis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import { useEffect } from "react";
import logo from "../22.png"

const Login = () => {
  const [user, setuser] = useState();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const onChnage = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setuser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginsubmit = async (e) => {
    e.preventDefault();
    console.log("work on");
    setLoader(true);
    loginAdd(user)
      .then((data) => {
        console.log(data);
        localStorage.setItem("access_token", data.data.access_token);
        localStorage.setItem("refresh_token", data.data.refresh_token);
        localStorage.setItem("user_id", data.data.user_id);
        setLoader(false);
        toast.success("Login Successfully", {
          onClose: () => {
            navigate("/admin");
          },
        });
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
        toast.error(e.response.data.error);
      });
  };

  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <>
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={1000}
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
          <Row className="justify-content-center">
            <Col
              lg={5}
              md={6}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <div className="d-flex justify-content-center py-4">
                <Link
                  to="/"
                  className="logo-login d-flex align-items-center w-auto"
                >
                  <img
                    src={logo}
                    alt=""
                  />
                  {/* <span className="d-nne d-lg-block">ProductAI</span> */}
                </Link>
              </div>

              <div className="card-login mb-3">
                <div className="card-body-login">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title-login text-center pb-0 fs-4">
                      Login to Your Account
                    </h5>
                    <p className="text-center small">
                      Enter your username & password to login
                    </p>
                  </div>
                  <Form className="row g-3 needs-validation" noValidate>
                    <Col md={12}>
                      <Form.Label htmlFor="yourUsername">Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        id="yourUsername"
                        onChange={onChnage}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your username.
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={12}>
                      <Form.Label htmlFor="yourPassword">Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        onChange={onChnage}
                        id="yourPassword"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your password!
                      </Form.Control.Feedback>
                    </Col>

                    {/* <Col md={12}>
                      <Form.Check>
                        <Form.Check.Input
                          type="checkbox"
                          name="remember"
                          value="true"
                          id="rememberMe"
                        />
                        <Form.Check.Label htmlFor="rememberMe">
                          Remember me
                        </Form.Check.Label>
                      </Form.Check>
                    </Col> */}
                    <Col md={12}>
                      {loader ?  (
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
                      )
                      : (
                      <Button
                        variant="primary"
                        className="w-100"
                        onClick={loginsubmit}
                        type="submit"
                      >
                        Login
                      </Button>
                      )}
                    </Col>
                    <Col md={12}>
                      <p className="small mb-0">
                        Don't have an account?{" "}
                        <Link to="/signup">Create an account</Link>
                      </p>
                    </Col>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
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

export default Login;
