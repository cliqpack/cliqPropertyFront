import PropTypes from "prop-types";
import React, { Component } from "react";
import { Alert, Card, CardBody, Col, Container, Label, Row } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// action
import { userForgetPassword, forgotPassword } from "../../store/actions";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/Myday.png";
//import logoDark from "../../assets/images/Asset-col.png";
import logoDark from "../../assets/images/new_myday_image.svg";
import animation from "../../assets/images/Animation.gif";
import property from "../../assets/images/property.png";
import logoDarkNew from "../../assets/images/my_day_logo.png";

class ForgetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    console.log(this.props.password_success_loading);
    return (
      <React.Fragment>
        <div className="account-pages my-5 pt-sm-5">
          <Container style={{ backgroundColor: "#F2F6FA" }}>
            <Row className="justify-content-center gap-0" style={{ height: "600px" }}>
              <Col md={6} className="p-0 m-0">
                <div style={{ height: "100%", width: "100%", backgroundColor: "#153D58" }}>
                  <img src={property} height="100%" width="100%" style={{ objectFit: "contain" }} />
                </div>
              </Col>
              <Col md={6} className="p-0 m-0 my-auto" style={{ backgroundColor: "#F2F6FA", alignItems: "center", justifyContent: "center" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className="avatar-lg profile-user-wid mb-2 " >
                    <img
                      src={logoDarkNew}
                      alt=""
                      className="p-1"
                      style={{ width: "100%", height: "100%", marginTop: "-30px", objectFit: "contain" }}
                      height={50}
                    />

                  </div>

                </div>
                <div className="pt-0 align-items-center" style={{ backgroundColor: "#F2F6FA", padding: "0px 70px 0px 70px" }}>
                  <p style={{ fontSize: "25px" }}>Forgot Password</p>

                  <div className="p-2">
                    {this.props.forgetError && this.props.forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {this.props.forgetError}
                      </Alert>
                    ) : null}
                    {this.props.forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {this.props.forgetSuccessMsg}
                      </Alert>
                    ) : null}

                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        email: (this.state && this.state.email) || "",
                      }}
                      validationSchema={Yup.object().shape({
                        email: Yup.string().required(
                          "Please Enter Your Email"
                        ),
                      })}
                      onSubmit={values => {
                        // this.props.userForgetPassword(
                        //   values,
                        //   this.props.history
                        // );
                        this.props.forgotPassword(values);
                      }}
                    >
                      {({ errors, status, touched }) => (
                        <Form className="form-horizontal">
                          <div className="mb-3">
                            <Label for="email" className="form-label">
                              Email
                            </Label>
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
                          </div>
                          <div className="text-end">
                            <button
                              className="btn btn-info w-100"
                              type="submit"
                            >
                              Reset
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <p>
                    Go back to{" "}
                    <Link to="login" className="fw-medium text-primary">
                      Login
                    </Link>{" "}
                  </p>
                  <p>
                    © {new Date().getFullYear()} myday. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger" /> by CliqPack
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

ForgetPasswordPage.propTypes = {
  forgetError: PropTypes.func,
  forgetSuccessMsg: PropTypes.string,
  history: PropTypes.object,
  userForgetPassword: PropTypes.any,
};

const mapStateToProps = state => {
  const { forgetError, forgetSuccessMsg } = state.ForgetPassword;
  const { password_success_details, password_success_loading } = state.Login;

  return { forgetError, forgetSuccessMsg, password_success_details, password_success_loading };
};

export default withRouter(
  connect(mapStateToProps, { userForgetPassword, forgotPassword })(ForgetPasswordPage)
);
