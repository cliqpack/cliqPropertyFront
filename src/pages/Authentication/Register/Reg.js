import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Label,
  Modal,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// action
import {
  apiError,
  registerUser,
  registerUserFailed,
  registerStatusClear,
  registerOwnerTenant,
  registerOwnerTenantFresh,
} from "../../../store/actions";

// Redux
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";

// import images
import profileImg from "../../../assets/images/profile-img.png";
import logoImg from "../../../assets/images/Asset-col.png";
import toastr from "toastr";
import logoCliqProperty from '../../../assets/images/logo_purple 2-svg.svg';
import circle from '../../../assets/images/circle.svg';
import moment from "moment";

const Reg = props => {
  const { id } = useParams();
  const [state, setState] = useState({});
  const ref = useRef();
  const history = useHistory();

  useEffect(() => {
    if (props.user_tenant_loading === 'Success') {
      toastr.success('Registration Successful');
      props.registerOwnerTenantFresh();
      history.push('/owner-tenant-login');
    }
  }, [props.user_tenant_loading]);

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  console.log(props.user_tenant_loading);

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
            <div>
              <p style={{ color: "#FFF", fontSize: "14px", fontStyle: "normal", fontWeight: "400" }}>© {moment().year()} All right reserved. Developed by <span style={{ color: "#FFC233", fontSize: "14px", fontStyle: "normal", fontWeight: "400" }}>CliqPack Limited</span></p>
            </div>
          </div>
        </Col>
        <Col md={6} className="p-4 m-0 my-auto" style={{ backgroundColor: "#F2F6FA", alignItems: "center", justifyContent: "center" }}>
          {/* <Card className="overflow-hidden"> */}
          <div>
            {/* <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">CliqProperty Register</h5>
                        <p>Get your account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row> */}
          </div>
          {/* <CardBody className="pt-0"> */}
          {/* <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            // className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div> */}
          <div className="p-2 ">
            <Formik
              innerRef={ref}
              enableReinitialize={true}
              initialValues={{
                password: (state && state.password) || "",
                confirm_password:
                  (state && state.confirm_password) || "",
                fname: (state && state.fname) || "",
                lname: (state && state.lname) || "",
                work_phone: (state && state.work_phone) || "",
                mobile_phone: (state && state.mobile_phone) || "",
                user_type: (state && state.user_type) || "",
              }}
              validationSchema={Yup.object().shape({
                password: Yup.string().required(
                  "Please Enter Valid Password"
                ),
                confirm_password: Yup.string()
                  .oneOf(
                    [Yup.ref("password"), ""],
                    "Password Must Match"
                  )
                  .required("Please Confirm Your Password"),
                fname: Yup.string().required(
                  "Please Enter Valid First Name"
                ),
                lname: Yup.string().required(
                  "Please Enter Valid Last Name"
                ),
                user_type: Yup.string().required(
                  "Please Select User Type"
                ),
              })}
              onSubmit={values => {
                props.registerOwnerTenant(values, id);
              }}
            >
              {({ errors, status, touched }) => (
                <Form className="form-horizontal">
                  <Row>
                    <Col md={4} lg={4} xl={4}>
                      <div className="form-group-new">

                        <Field
                          name="fname"
                          type="text"
                          placeholder='First Name'
                          className={
                            "form-control" +
                            (errors.fname && touched.fname
                              ? " is-invalid"
                              : "")
                          }
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="fname"
                          component="div"
                          className="invalid-feedback"
                        />
                        <Label for="fname" className="form-label">
                          First Name
                        </Label>
                      </div>
                    </Col>
                    <Col md={4} lg={4} xl={4}>
                      <div className="form-group-new">

                        <Field
                          name="lname"
                          type="text"
                          placeholder='Last Name'

                          className={
                            "form-control" +
                            (errors.lname && touched.lname
                              ? " is-invalid"
                              : "")
                          }
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="lname"
                          component="div"
                          className="invalid-feedback"
                        />
                        <Label for="lname" className="form-label">
                          Last Name
                        </Label>
                      </div>
                    </Col>
                    <Col md={4} lg={4} xl={4}>
                      <div className="form-group-new">
                        <select
                          name="user_type"
                          className={
                            "form-control" +
                            (errors.user_type && touched.user_type
                              ? " is-invalid"
                              : "")
                          }
                          onChange={e => {
                            handleChange(e);
                          }}
                        >
                          <option value={""}>Select User</option>
                          <option value={"Owner"}>Owner</option>
                          <option value={"Tenant"}>Tenant</option>
                        </select>
                        <ErrorMessage
                          name="user_type"
                          component="div"
                          className="invalid-feedback"
                        />
                        <label className="form-label">
                          Customer Type
                        </label>
                      </div>

                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} lg={6} xl={6}>
                      <div className="form-group-new">
                        <Field
                          name="mobile_phone"
                          type="text"
                          placeholder='Mobile Phone'
                          className={
                            "form-control" +
                            (errors.mobile_phone && touched.mobile_phone
                              ? " is-invalid"
                              : "")
                          }
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="mobile_phone"
                          component="div"
                          className="invalid-feedback"
                        />
                        <Label for="email" className="form-label">
                          Mobile Phone
                        </Label>
                      </div>
                    </Col>
                    <Col md={6} lg={6} xl={6}>
                      <div className="form-group-new">
                        <Field
                          name="work_phone"
                          type="text"
                          placeholder='Work Phone'

                          className={
                            "form-control" +
                            (errors.work_phone && touched.work_phone
                              ? " is-invalid"
                              : "")
                          }
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="work_phone"
                          component="div"
                          className="invalid-feedback"
                        />
                        <Label for="email" className="form-label">
                          Work Phone
                        </Label>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} lg={6} xl={6}>
                      <div className="form-group-new">
                        <Field
                          name="password"
                          autoComplete="true"
                          type="password"
                          placeholder='********'

                          className={
                            "form-control" +
                            (errors.password && touched.password
                              ? " is-invalid"
                              : "")
                          }
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                        <Label for="password" className="form-label">
                          Password
                        </Label>
                      </div>
                    </Col>
                    <Col md={6} lg={6} xl={6}>
                      <div className="form-group-new">

                        <Field
                          name="confirm_password"
                          autoComplete="true"
                          type="password"
                          placeholder='********'
                          className={
                            "form-control" +
                            (errors.confirm_password &&
                              touched.confirm_password
                              ? " is-invalid"
                              : "")
                          }
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="confirm_password"
                          component="div"
                          className="invalid-feedback"
                        />
                        <Label
                          for="confirm_password"
                          className="form-label"
                        >
                          Confirm Password
                        </Label>
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-2 d-grid">
                    <button
                      className="btn btn-info btn-block"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>

                  {/* <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the My Day{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div> */}
                </Form>
              )}
            </Formik>
          </div>
          {/* </CardBody>
              </Card> */}
          <div className="mt-3 text-center">
            <p>
              Already have an account ?{" "}
              <Link to="/login" className="fw-medium text-primary">
                {" "}
                Login
              </Link>{" "}
            </p>
            {/* <p>
                  © {new Date().getFullYear()} CliqProperty. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by CliqTech
                </p> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = state => {
  const {
    user_tenant_loading,
    user_tenant_user,
    user_tenant_registrationError,
  } = state.Account;
  return {
    user_tenant_loading,
    user_tenant_user,
    user_tenant_registrationError,
  };
};

export default connect(mapStateToProps, {
  registerUser,
  apiError,
  registerUserFailed,
  registerStatusClear,
  registerOwnerTenant,
  registerOwnerTenantFresh,
})(Reg);
