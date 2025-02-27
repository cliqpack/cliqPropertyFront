import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Alert, Card, CardBody, Col, Container, Row, Label } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// actions
import { ownerTenantLogin, ownerTenantEmailFresh } from "../../store/actions";
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import lightlogo from "../../assets/images/Asset-light.png";
import toastr from "toastr";
//import logoDark from "../../assets/images/Asset-col.png";
import animation from "../../assets/images/Animation.gif";
import logoDark from "../../assets/images/new_myday_image.svg";
import logoDarkNew from "../../assets/images/my_day_logo.png";
import property from "../../assets/images/property.png";
// import logoCliqProperty from '../../assets/images/logo_purple_large.png';
import logoCliqProperty from '../../assets/images/logo_purple 2-svg.svg';
import circle from '../../assets/images/circle.svg';
import moment from "moment";

const OwnerTenantLogin = props => {
  const [state, setState] = useState();
  console.log(state);
  const [mailStatus, setMailStatus] = useState(1);

  useEffect(() => {
    if (props.email_loading === "Success") {
      toastr.success(props.email_userDetails.message);
      setMailStatus(3);
      props.ownerTenantEmailFresh();
    }

    if (props.email_loading === "Failed") {
      toastr.error('Email already in use. Try another!');
      props.ownerTenantEmailFresh();
      setMailStatus(1);
    }

  }, [props.email_loading]);
  console.log(props.email_loading);



  return (

    <Container style={{ backgroundColor: "#F2F6FA", overflowX: 'hidden' }} fluid>
      <Row className="justify-content-center gap-0">
        <Col md={6} className="backgroundImageLogin p-0 m-0" style={{ backgroundColor: "#F2F6FA", alignItems: "center", justifyContent: "center" }}>
          {/* <img src={circle} className="cliqCircle" /> */}
          <div style={{ padding: "50px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" ,backgroundColor:"#5c51c8"}}>
            <div>
            <div style={{ width: '80px' }}>
                <img src={logoCliqProperty} style={{ width: '100%' }}/>
              </div>
              <p style={{ color: "#FFF", fontSize: "46px", fontStyle: "normal", fontWeight: "600", lineHeight: "132%", marginTop: "50px" }}>Welcome to</p>
              <p style={{ color: "#FAB446", fontSize: "46px", fontStyle: "normal", fontWeight: "600", lineHeight: "132%", marginTop: "-15px" }}>CliqProperty</p>
            </div>
            <div>
              <p style={{ color: "#FFF", fontSize: "14px", fontStyle: "normal", fontWeight: "400" }}>© { moment().year() } All right reserved. Developed by <span style={{ color: "#FFC233", fontSize: "14px", fontStyle: "normal", fontWeight: "400" }}>CliqPack Limited</span></p>
            </div>
          </div>
        </Col>
        <Col md={6} className="p-0 m-0 my-auto" style={{ backgroundColor: "#F2F6FA", alignItems: "center", justifyContent: "center" }}>

          <CardBody className="pt-0">
            <div style={{ display: "flex", justifyContent: "center" }}>
            </div>
            <div className="pt-0 align-items-center" style={{ backgroundColor: "#F2F6FA", padding: "0px 70px 0px 70px" }}>
              <p style={{ fontSize: "25px" }}>Sign Up</p>
              {props.error ? (
                <Alert color="danger">
                  {JSON.stringify(props.error.response.data.message)}
                </Alert>
              ) : null}
              <Formik
                enableReinitialize={true}
                initialValues={{
                  email: (state && state.email) || "",
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().required("Please Enter Your Email"),
                })}
                onSubmit={(values, actions) => {
                  setMailStatus(2);
                  props.ownerTenantLogin(values);
                  // actions.resetForm({ values: '' });

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

                    <div className="d-grid">
                      {mailStatus == 1 && (
                        <>
                          <button
                            className="btn btn-info btn-block"
                            type="submit"
                          >
                            Verify Email
                          </button>
                          <div className="d-flex justify-content-center align-items-center">
                            {/* <div className="mb-4 card-title"> */}
                            <div className="mb-4 mt-3">
                              {/* Please Check Your Email */}
                              <Link
                                to="/owner-tenant-login"
                                className="text-info"
                              >
                                {" "}
                                <div className="d-flex justify-content-center align-items-center text-secondary">
                                  <i className="fas fa-chevron-circle-left font-size-18 me-1" /> Back
                                </div>
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                      {mailStatus == 2 && (
                        <div className="d-flex justify-content-center">
                          <div
                            className="spinner-border text-primary m-1"
                            role="status"
                            id="loader_1"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      )}
                      {mailStatus == 3 && (
                        <>
                          <div className="d-flex justify-content-center">
                            {/* <div className="mb-4 card-title"> */}
                            <div className="mb-4">
                              Please Check Your Email
                              <Link
                                to="/owner-tenant-login"
                                className="text-info"
                              >
                                {" "}
                                Goto Login
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            {/* <div className="mb-4 card-title"> */}
                            <div className="mb-4 mt-3">
                              {/* Please Check Your Email */}
                              <Link
                                to="/owner-tenant-login"
                                className="text-info"
                              >
                                {" "}
                                <div className="d-flex justify-content-center align-items-center text-secondary">
                                  <i className="fas fa-chevron-circle-left font-size-18 me-1" /> Back
                                </div>
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </CardBody>

          {/* <div className="mt-5 text-center">
                <p>
                  © {new Date().getFullYear()} myday. Crafted with
                  <i className="mdi mdi-heart text-danger" /> by CliqPack
                </p>
              </div> */}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = state => {
  const { email_userDetails, email_loading } = state.Login;
  return { email_userDetails, email_loading };
};

export default withRouter(
  connect(mapStateToProps, { ownerTenantLogin, ownerTenantEmailFresh })(
    OwnerTenantLogin
  )
);
