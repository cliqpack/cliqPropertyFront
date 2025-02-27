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
  loginStatusClear, getNotification, notificationRead, notificationReadFresh
} from "../../store/actions";
import { menuListDataFresh } from "store/Menu/action";

// import images
import profile from "../../assets/images/profile-img.png";
import lightlogo from "../../assets/images/Asset-light.png";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import logo from "../../assets/images/logo.svg";
//import logoDark from "../../assets/images/Asset-col.png";
import logoDark from "../../assets/images/new_myday_image.svg";
import logoDarkNew from "../../assets/images/my_day_logo.png";
import animation from "../../assets/images/Animation.gif";
import property from "../../assets/images/property.png";
import propertyNew from "../../assets/images/newProperty.png";
import logoCliqProperty from '../../assets/images/logo_purple 2-svg.svg';
import logoLongCliqProperty from '../../assets/images/color_long.png'
import circle from '../../assets/images/circle.svg';
import moment from "moment";


const Login = props => {
  const [state, setState] = useState();
  const [show, setShow] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (props.loading === "Success") {
      toastr.success("Successfully Login");
      props.getNotification();
      localStorage.setItem("I18N_LANGUAGE", 'en');
      localStorage.removeItem("owner_property_id");

      var authUser = JSON.parse(localStorage.getItem("authUser"));
      localStorage.removeItem("owner_property_id");

      console.log(authUser.user.user_type);
      if (authUser.user.user_type == "Property Manager") {
        history.push("/dashboard");
        props.loginStatusClear();
      } else if (authUser.user.user_type == "Owner" || authUser.user.user_type == "Tenant") {
        history.push("/owner-tenant-dashboard");
        props.loginStatusClear();
      }
      props.menuListDataFresh();
    }
  }, [props.loading]);

  const signIn = (res, type) => {
    const { socialLogin } = props;
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      };
      socialLogin(postData, props.history, type);
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      };
      socialLogin(postData, props.history, type);
    }
  };

  //handleGoogleLoginResponse
  const googleResponse = response => {
    props.signIn(response, "google");
  };

  //handleTwitterLoginResponse
  const twitterResponse = () => { };

  //handleFacebookLoginResponse
  const facebookResponse = response => {
    signIn(response, "facebook");
  };

  return (
    <Container style={{ backgroundColor: "#F2F6FA", overflowX: 'hidden' }} fluid>
      <Row className="justify-content-center gap-0" >
        <Col md={6} className="backgroundImageLogin p-0 m-0">
          {/* <img src={circle} className="cliqCircle" /> */}
          <div style={{ padding: "50px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh",backgroundColor:"#5c51c8" }}>
            <div>
              <div style={{ width: '80px' }}>
                <img src={logoCliqProperty} style={{ width: '100%' }} />
              </div>
              <p style={{ color: "#FFF", fontSize: "46px", fontStyle: "normal", fontWeight: "600", lineHeight: "132%", marginTop: "50px" }}>Welcome to</p>
              <p style={{ color: "#FAB446", fontSize: "46px", fontStyle: "normal", fontWeight: "600", lineHeight: "132%", marginTop: "-15px" }}>CliqProperty</p>
            </div>
            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "flex-end" }}>
              <p style={{ color: "#FFF", fontSize: "14px", fontStyle: "normal", fontWeight: "400" }}>© {moment().year()} All right reserved. Developed by <span style={{ color: "#FFC233", fontSize: "14px", fontStyle: "normal", fontWeight: "400" }}>CliqPack Limited</span></p>
            </div>
          </div>
        </Col>
        <Col md={6} className="p-0 m-0 my-auto" style={{ backgroundColor: "#F2F6FA", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="avatar-lg profile-user-wid mb-2" style={{ width: '200vw' }} >
            </div>
          </div>
          <div className="pt-0 align-items-center" style={{ backgroundColor: "#F2F6FA", padding: "0px 70px 0px 70px" }}>
            <p style={{ fontSize: "25px" }}>Sign In</p>
            <div className="p-2">
              {props.error ? (
                <Alert color="danger">
                  {JSON.stringify(props.error?.response?.data?.message)}
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

                      <Label for="email" className="form-label">
                        Email
                      </Label>

                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <Row>
                      <Col md={12} style={{ display: "flex", }}>
                        <Col md={11}>
                          <div className="form-group-new">
                            {/* <div className="input-group auth-pass-inputgroup"> */}

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

                          {/* </div> */}
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
                    {/* <div className="mt-4 text-center">
                            <Link to="/forgot-password" className="text-muted">
                              <i className="mdi mdi-lock me-1" /> Forgot your
                              password?
                            </Link>
                          </div> */}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          {/* </Card> */}

        </Col>
      </Row>
    </Container>
  );
};

Login.propTypes = {
  apiError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func,
};

const mapStateToProps = state => {
  const { error, loading, read_notification_loading } = state.Login;
  return { error, loading, read_notification_loading };
};

export default withRouter(
  connect(mapStateToProps, {
    loginUser,
    apiError,
    socialLogin,
    loginStatusClear,
    menuListDataFresh, getNotification, notificationRead, notificationReadFresh
  })(Login)
);
