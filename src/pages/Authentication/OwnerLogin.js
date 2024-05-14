import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Alert, Card, CardBody, Col, Container, Row, Label } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

//Import config
import { facebook, google } from "../../config";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// actions
import {
  apiError,
  loginUser,
  socialLogin,
  loginStatusClear,
} from "../../store/actions";
import { menuListDataFresh } from "store/Menu/action";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import lightlogo from "../../assets/images/Asset-light.png";
import toastr from "toastr";
//import logoDark from "../../assets/images/Asset-col.png";
import logoDark from "../../assets/images/new_myday_image.svg";
import property from "../../assets/images/property.png";
import logoDarkNew from "../../assets/images/my_day_logo.png";
import logoCliqProperty from '../../assets/images/logo_purple_large.png';

const OwnerLogin = props => {
  const [state, setState] = useState();
  const [show, setShow] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (props.loading === "Success") {
      toastr.success("Successfully Login");
      localStorage.setItem("I18N_LANGUAGE", 'en');

      var authUser = JSON.parse(localStorage.getItem("authUser"));
      console.log(authUser.user.user_type);
      if (authUser.user.user_type == "Property Manager") {
        history.push("/dashboard");
      } else if (authUser.user.user_type == "Owner" || authUser.user.user_type == "Tenant") {
        history.push("/owner-tenant-dashboard");
      }
      props.menuListDataFresh();
    }
  }, [props.loading]);
  console.log(props.loading);

  return (
    <React.Fragment>
      <div className="my-5 pt-sm-5">
        <Container style={{ backgroundColor: "#F2F6FA" }}>
          <Row className="justify-content-center gap-0" style={{ height: "600px" }}>
            {/* <Col md={6} className="p-0 m-0">
              <div style={{ height: "100%", width: "100%", backgroundColor: "#153D58" }}>
                <img src={property} height="100%" width="100%" style={{ objectFit: "contain" }} />
              </div>
            </Col> */}
            <Col md={6} className="backgroundImageLogin p-0 m-0" style={{ height: "600px" }}>
              <div style={{ margin: "30px 0px 0px 30px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "550px" }}>
                <div>
                  <img src={logoCliqProperty} />
                  <p style={{ color: "#FFF", fontSize: "46px", fontStyle: "normal", fontWeight: "600", lineHeight: "132%", marginTop: "50px" }}>Welcome to</p>
                  <p style={{ color: "#FAB446", fontSize: "46px", fontStyle: "normal", fontWeight: "600", lineHeight: "132%", marginTop: "-15px" }}>CliqProperty</p>
                </div>
                <div>
                  <p style={{ color: "#FFF", fontSize: "14px", fontStyle: "normal", fontWeight: "400" }}>© 2024 All right reserved. Developed by <span style={{ color: "#FFC233", fontSize: "14px", fontStyle: "normal", fontWeight: "400" }}>CliqPack Limited</span></p>
                </div>
              </div>
            </Col>
            <Col md={6} className="p-0 m-0 my-auto" style={{ backgroundColor: "#F2F6FA", alignItems: "center", justifyContent: "center" }}>

              <div style={{ display: "flex", justifyContent: "center" }}>

                {/* <div className="avatar-lg profile-user-wid mb-2 " >

                  <img
                    src={logoDarkNew}
                    alt=""
                    className="p-1"
                    style={{ width: "100%", height: "100%", objectFit: "contain", marginTop: "10px" }}
                    height={50}
                  />

                </div> */}

              </div>
              <div className="pt-0 align-items-center" style={{ backgroundColor: "#F2F6FA", padding: "0px 70px 0px 70px" }}>
                <p style={{ fontSize: "25px" }}>Sign In</p>
                <div className="p-2">
                </div>
                <div className="p-2">
                  {props.error ? (
                    <Alert color="danger">
                      {JSON.stringify(props.error.response?.data?.message)}
                    </Alert>
                  ) : null}
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      email: (state && state.email) || "",
                      password: (state && state.password) || "",
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string().required("Please Enter Your Email"),
                      password: Yup.string().required(
                        "Please Enter Valid Password"
                      ),
                    })}
                    onSubmit={values => {
                      props.loginUser(values);
                    }}
                  >
                    {({ errors, status, touched }) => (
                      <Form className="form-horizontal">
                        <div className="form-group-new">

                          <Field
                            name="email"
                            type="text"
                            className={
                              "form-control" +
                              (errors.email && touched.email
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                          <Label for="email" className="form-label">
                            Email
                          </Label>
                        </div>


                        <Row>
                          <Col md={12} style={{ display: "flex", }}>
                            <Col md={11}>
                              <div className="form-group-new">
                                <Field
                                  name="password"
                                  type={show ? "password" : "text"}
                                  autoComplete="true"
                                  className={
                                    "form-control" +
                                    (errors.password && touched.password
                                      ? " is-invalid"
                                      : "")
                                  }
                                />



                                <Label for="password" className="form-label">
                                  Password
                                </Label>
                                <ErrorMessage
                                  name="password"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </Col>
                            <Col md={1}>
                              <button
                                className="btn btn-light "
                                type="button"
                                id="password-addon"
                                onClick={() => setShow(prev => !prev)}
                                style={{ border: "1px solid #ced4da" }}
                              >
                                <i className="mdi mdi-eye-outline"></i>
                              </button>
                            </Col>
                          </Col>
                        </Row>

                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customControlInline"
                          >
                            Remember me
                          </label>
                        </div>

                        <div className="mt-3 d-grid">
                          <button
                            className="btn btn-info btn-block"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>
                        <div className="mt-4 text-center">
                          Dont have an acccout? &nbsp;
                          <Link to="/check-email">Sign up</Link>
                        </div>
                        <div className="mt-4 text-center">
                          <Link to="/forgot-password" className="text-muted">
                            <i className="mdi mdi-lock me-1" /> Forgot your
                            password?
                          </Link>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>

              {/* <div className="mt-5 text-center">
               
                <p>
                  © {new Date().getFullYear()} myday. Crafted with
                  <i className="mdi mdi-heart text-danger" /> by CliqPack
                </p>
              </div> */}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

OwnerLogin.propTypes = {
  apiError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
};

const mapStateToProps = state => {
  const { error, loading } = state.Login;
  return { error, loading };
};

export default withRouter(
  connect(mapStateToProps, {
    loginUser,
    apiError,
    socialLogin,
    loginStatusClear,
    menuListDataFresh,
  })(OwnerLogin)
);
