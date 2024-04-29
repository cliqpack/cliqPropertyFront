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
  addCompanyRegister,
  companyListRegister,
  companyAddFreshRegister,
  companyListFreshRegister,
} from "../../store/actions";

// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";
import toastr from "toastr";
import Select from "react-select";

const Register = props => {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirm_password: "",
    fname: "",
    lname: "",
    work_phone: "",
    mobile_phone: "",
    user_type: "",
    company_name: "",
  });
  const {
    email,
    password,
    confirm_password,
    fname,
    lname,
    work_phone,
    mobile_phone,
    user_type,
    company_name,
  } = state;
  const ref = useRef();
  const [companyForm, setCompanyForm] = useState(false);
  const [togState, setTogState] = useState(false);
  const [route, setRoute] = useState();
  const [selectedGroup, setSelectedGroup] = useState();

  useEffect(() => {
    console.log(props);
    if (props.loading === "Success") {
      toastr.success(props.user.data.message);
      props.registerStatusClear();
      props.history.push("/login");
    } else if (props.loading === "Faild") {
      toastr.error(props.registrationError.message);
      props.registerStatusClear();
    }
  }, [props]);

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
    //  console.log(state);
    if (e.target.name == "user_type" && e.target.value == "Property Manager") {
      setCompanyForm(true);
      props.companyListRegister();
    } else if (
      e.target.name == "user_type" &&
      e.target.value != "Property Manager"
    ) {
      setCompanyForm(false);
    }
  };

  var companyData = undefined;
  var optionGroup = [];
  if (props.company_list_data) {
    let option = [];
    companyData = props.company_list_data.data.data.companies.map(
      (item, key) => {
        let menuObj = {
          label: item.company_name,
          value: item.id,
        };

        option.push(menuObj);
      }
    );
    optionGroup = [
      {
        options: option,
      },
    ];
  }

  const tog_standard = route => {
    setTogState(prevTogState => !prevTogState);
    setRoute(route);
  };
  const handleSelectGroup = selectedGroup => {
    setSelectedGroup(selectedGroup);
    console.log(selectedGroup);
    setState({ ...state, company_name: selectedGroup.value });
  };

  if (props.company_add_loading === "Success") {
    toastr.success("Your Company Added Successfully");
    props.companyAddFreshRegister();
    props.companyListRegister();
  } else if (props.company_add_loading === "Success") {
    toastr.error("Your Company Added Failed");
    props.companyAddFreshRegister();
  }

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
                            className="rounded-circle"
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
                        email: (state && state.email) || "",
                        password: (state && state.password) || "",
                        confirm_password:
                          (state && state.confirm_password) || "",
                        fname: (state && state.fname) || "",
                        lname: (state && state.lname) || "",
                        work_phone: (state && state.work_phone) || "",
                        mobile_phone: (state && state.mobile_phone) || "",
                        user_type: (state && state.user_type) || "",
                        company_name: (state && state.company_name) || "",
                      }}
                      validationSchema={Yup.object().shape({
                        email: Yup.string()
                          .email("Invalid Email Formet")
                          .required("Please Enter Your Email"),
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
                        props.registerUser(values);
                      }}
                    >
                      {({ errors, status, touched }) => (
                        <Form className="form-horizontal">
                          <Row>
                            <Col md={6} lg={6} xl={6}>
                              <div className="mb-3">
                                <Label for="fname" className="form-label">
                                  First Name
                                </Label>
                                <Field
                                  name="fname"
                                  type="text"
                                  className={
                                    "form-control" +
                                    (errors.fname && touched.fname
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="fname"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </Col>
                            <Col md={6} lg={6} xl={6}>
                              <div className="mb-3">
                                <Label for="lname" className="form-label">
                                  Last Name
                                </Label>
                                <Field
                                  name="lname"
                                  type="text"
                                  className={
                                    "form-control" +
                                    (errors.lname && touched.lname
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="lname"
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
                                  Email
                                </Label>
                                <Field
                                  name="email"
                                  type="email"
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
                            </Col>
                            <Col md={6} lg={6} xl={6}>
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
                                  {/* <option value={"Property Manager"}>
                                    Property Manager
                                  </option> */}
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
                          {companyForm ? (
                            <Row>
                              <Col md={6} lg={6} xl={6}>
                                <div className="mb-3">
                                  <Label
                                    for="company_name"
                                    className="form-label"
                                  >
                                    Company Name
                                  </Label>
                                  {optionGroup != [] ? (
                                    <Select
                                      value={selectedGroup}
                                      onChange={handleSelectGroup}
                                      options={optionGroup}
                                      classNamePrefix="select2-selection"
                                    />
                                  ) : null}
                                  <ErrorMessage
                                    name="company_name"
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </div>
                              </Col>
                              <Col md={6} lg={6} xl={6}>
                                <div className="mt-4">
                                  <button
                                    className="btn btn-info w-md"
                                    type="button"
                                    onClick={tog_standard}
                                  >
                                    Add Company
                                  </button>
                                </div>
                              </Col>
                            </Row>
                          ) : null}
                          <Row>
                            <Col md={6} lg={6} xl={6}>
                              <div className="mb-3">
                                <Label for="email" className="form-label">
                                  Mobile Phone
                                </Label>
                                <Field
                                  name="mobile_phone"
                                  type="number"
                                  className={
                                    "form-control" +
                                    (errors.mobile_phone && touched.mobile_phone
                                      ? " is-invalid"
                                      : "")
                                  }
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
                                  className={
                                    "form-control" +
                                    (errors.work_phone && touched.work_phone
                                      ? " is-invalid"
                                      : "")
                                  }
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
                                  className={
                                    "form-control" +
                                    (errors.password && touched.password
                                      ? " is-invalid"
                                      : "")
                                  }
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
                                  className={
                                    "form-control" +
                                    (errors.confirm_password &&
                                    touched.confirm_password
                                      ? " is-invalid"
                                      : "")
                                  }
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
                              By registering you agree to the Skote{" "}
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
          <Modal isOpen={togState} toggle={tog_standard}>
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myModalLabel">
                Module Routes
              </h5>
              <button
                type="button"
                onClick={() => setTogState(false)}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Row>
                <Col lg={12}>
                  <div className="p-2">
                    {props.error ? (
                      <Alert color="danger">
                        {JSON.stringify(props.error.response.data.message)}
                      </Alert>
                    ) : null}
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        company: (state && state.company) || "",
                        address: (state && state.address) || "",
                        phone: (state && state.phone) || "",
                      }}
                      validationSchema={Yup.object().shape({
                        company: Yup.string().required("Please Enter Company"),
                        address: Yup.string().required("Please Enter Address"),
                        phone: Yup.string().required("Please Enter Phone"),
                      })}
                      onSubmit={(values, onSubmitProps) => {
                        props.addCompanyRegister(values);
                        onSubmitProps.resetForm();
                        setTogState(false);
                      }}
                    >
                      {({ errors, status, touched }) => (
                        <Form className="form-horizontal">
                          <div className="mb-3">
                            <Label for="company" className="form-label">
                              Company
                            </Label>
                            <Field
                              name="company"
                              type="text"
                              className={
                                "form-control" +
                                (errors.company && touched.company
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="company"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="mb-3">
                            <Label for="address" className="form-label">
                              Address
                            </Label>
                            <Field
                              name="address"
                              type="text"
                              className={
                                "form-control" +
                                (errors.address && touched.address
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="address"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="mb-3">
                            <Label for="phone" className="form-label">
                              Phone
                            </Label>
                            <Field
                              name="phone"
                              type="text"
                              className={
                                "form-control" +
                                (errors.phone && touched.phone
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="mt-3">
                            <button
                              className="btn btn-info w-md"
                              type="submit"
                            >
                              Submit
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={tog_standard}
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

Register.propTypes = {
  apiError: PropTypes.any,
  registerUser: PropTypes.func,
  registerUserFailed: PropTypes.any,
  registrationError: PropTypes.any,
  user: PropTypes.object,
};

const mapStateToProps = state => {
  const {
    user,
    registrationError,
    loading,
    company_list_data,
    company_list_loading,
    company_add_loading,
    company_delete_loading,
    company_delete_data,
  } = state.Account;
  return {
    user,
    registrationError,
    loading,
    company_list_data,
    company_list_loading,
    company_add_loading,
    company_delete_loading,
    company_delete_data,
  };
};

export default connect(mapStateToProps, {
  registerUser,
  apiError,
  registerUserFailed,
  registerStatusClear,
  addCompanyRegister,
  companyAddFreshRegister,
  companyListRegister,
  companyListFreshRegister,
})(Register);
