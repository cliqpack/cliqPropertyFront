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
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={8}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">CliqProperty Register</h5>
                        <p>Get your account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
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
                  </div>
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
                              <div className="mb-3">
                                <Label for="fname" className="form-label">
                                  First Name
                                </Label>
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
                              </div>
                            </Col>
                            <Col md={4} lg={4} xl={4}>
                              <div className="mb-3">
                                <Label for="lname" className="form-label">
                                  Last Name
                                </Label>
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
                              </div>
                            </Col>
                            <Col md={4} lg={4} xl={4}>
                              <div className="mb-3">
                                <label className="form-label">
                                  Customer Type
                                </label>

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
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6} lg={6} xl={6}>
                              <div className="mb-3">
                                <Label for="email" className="form-label">
                                  Mobile Phone
                                </Label>
                                <Field
                                  name="mobile_phone"
                                  type="number"
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
                              </div>
                            </Col>
                            <Col md={6} lg={6} xl={6}>
                              <div className="mb-3">
                                <Label for="email" className="form-label">
                                  Work Phone
                                </Label>
                                <Field
                                  name="work_phone"
                                  type="number"
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
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6} lg={6} xl={6}>
                              <div className="mb-3">
                                <Label for="password" className="form-label">
                                  Password
                                </Label>
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
                              </div>
                            </Col>
                            <Col md={6} lg={6} xl={6}>
                              <div className="mb-3">
                                <Label
                                  for="confirm_password"
                                  className="form-label"
                                >
                                  Confirm Password
                                </Label>
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
                              </div>
                            </Col>
                          </Row>

                          <div className="mt-4 d-grid">
                            <button
                              className="btn btn-info btn-block"
                              type="submit"
                            >
                              Register
                            </button>
                          </div>

                          <div className="mt-4 text-center">
                            <p className="mb-0">
                              By registering you agree to the My Day{" "}
                              <Link to="#" className="text-primary">
                                Terms of Use
                              </Link>
                            </p>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="fw-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} CliqProperty. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by CliqTech
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
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
