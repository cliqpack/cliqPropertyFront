import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Label,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  InputGroup,
  Progress, Tooltip,

} from "reactstrap";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import {
  editProfile,
  editPassword,
  resetProfileFlag,
  editProfileFresh,
  editPasswordFresh,
  profileDetails,
  addProPic,
  addProPicFresh,
  uploadImagePercentageFresh, addNotificationProfile, addNotificationProfileFresh, getSettingsNotification, getSettingsNotificationFresh
} from "../../store/actions";
import classnames from "classnames";
import toastr from "toastr";
import Loder from "components/Loder/Loder";

let counter = 0;


const UserProfile = props => {
  const [status, setStatus] = useState(false)
  const [tabState, setTabState] = useState({ activeTab: "1" });
  const [button, setButton] = useState(false)
  const [state, setState] = useState({
    email: "",
    password: "",
    confirm_password: "",
    fname: "",
    lname: "",
    work_phone: "",
    mobile_phone: "",
    user_type: "",
    idx: "",
    profile_pic: "",
    address: "",
    facebook_link: "",
    linked_in_link: "",
    twitter_link: "",
  });

  const [state5, setState5] = useState({
    jobNoBtn: false,
    jobYesBtn: true,
    emailYesBtn: true,
    emailNoBtn: false,
    allBtn: true,
    personalBtn: false,
    unassignedBtn: false,
    mentionYesBtn: true,
    mentionNoBtn: false,
    sensitiveYesBtn: true,
    sensitiveNoBtn: false,
    deviceYesBtn: true,
    deviceNoBtn: false
  });

  const [uploadStatus, setUploadStatus] = useState(false);
  const {
    email,
    password,
    confirm_password,
    fname,
    lname,
    work_phone,
    mobile_phone,
    facebook_link,
    linked_in_link,
    twitter_link,
    user_type,
    idx,
    profile_pic,
    address,
  } = state;

  const toggleButton = () => setState(prev => !prev)

  const FILE_SIZE = 5000000;
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  // Autocomplete address
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {};

  useEffect(() => {
    if (props.notification_loading == "Success") {
      props.getSettingsNotificationFresh()

      setState5(prev => ({
        ...prev,
        jobYesBtn: props.notification_data?.data?.data?.new_job_added == 1 ? true : false,
        jobNoBtn: props.notification_data?.data?.data?.new_job_added == 1 ? false : true,

        emailNoBtn: props.notification_data?.data?.data?.unread_emails == 1 ? false : true,
        emailYesBtn: props.notification_data?.data?.data?.unread_emails == 1 ? true : false,

        unassignedBtn: props.notification_data?.data?.data?.notification_preference == 'unassigned' ? true : false,
        allBtn: props.notification_data?.data?.data?.notification_preference == 'All' ? true : false,
        personalBtn: props.notification_data?.data?.data?.notification_preference == 'Personal' ? true : false,
        emailData: props.notification_data?.data?.data?.notification_preference,

        mentionYesBtn: props.notification_data?.data?.data?.mention_by_team == 1 ? true : false,
        mentionNoBtn: props.notification_data?.data?.data?.mention_by_team == 1 ? false : true,

      }))
    }

    if (props.add_notification_loading == 'Success') {
      toastr.success('Success');
      props.addNotificationProfileFresh();
      setStatus(false)
      props.getSettingsNotification();

    }
    if (props.add_notification_loading == 'Failed') {
      toastr.error('Failed');
      props.addNotificationProfileFresh()
      setStatus(false)
    }
    if (props.profile_details == undefined) {
      props.profileDetails();
    }
    if (props.pro_pic_status == "Success") {
      props.profileDetails();
      setState({ ...state, ["profile_pic"]: "" });
      setUploadStatus(false);
      props.addProPicFresh();
    }
    if (props.pro_pic_status == "Failed") {
      toastr.error("Image upload Failed");
      props.addProPicFresh();
    }
    if (props.percentage_loading === "Success" && props.percentage === 100) {
      toastr.success("Uploaded successfully");
      props.uploadImagePercentageFresh();
    }
    setState({
      ...state,
      email: props.profile_details ? props.profile_details.email : "",
      fname: props.profile_details ? props.profile_details.first_name : "",
      lname: props.profile_details ? props.profile_details.last_name : "",
      work_phone: props.profile_details ? props.profile_details.work_phone : "",
      mobile_phone: props.profile_details
        ? props.profile_details.mobile_phone
        : "",
      facebook_link: props.profile_details
        ? props.profile_details.facebook_link
        : "",
      linked_in_link: props.profile_details
        ? props.profile_details.linked_in_link
        : "",
      twitter_link: props.profile_details
        ? props.profile_details.twitter_link
        : "",
      user_type: props.profile_details ? props.profile_details.user_type : "",
      address: props.profile_details ? props.profile_details.address : "",
      idx: props.profile_details ? props.profile_details.id : "",
      profile_pic: props.profile_details
        ? props.profile_details.profile
          ? process.env.REACT_APP_IMAGE + props.profile_details.profile
          : ""
        : "",
    });

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      let unitN = "";
      let country = "";
      let statename = "";
      let postal_codeN = "";
      let suburbN = "";
      let streetN = "";
      let street_numberN = "";
      place.address_components.forEach(element => {
        let checkCountry = inArray("country", element.types);

        if (checkCountry == true) {
          country = element.long_name;
        }

        let administrative_area_level_1 = inArray(
          "administrative_area_level_1",
          element.types
        );
        if (administrative_area_level_1 == true) {
          statename = element.long_name;
        }

        let unit = inArray("subpremise", element.types);
        if (unit == true) {
          unitN = element.long_name;
        }

        let postal_code = inArray("postal_code", element.types);
        if (postal_code == true) {
          postal_codeN = element.long_name;
        }

        let suburb = inArray("locality", element.types);
        if (suburb == true) {
          suburbN = element.long_name;
        }

        let street = inArray("route", element.types);
        if (street == true) {
          streetN = element.long_name;
        }

        let street_number = inArray("street_number", element.types);
        if (street_number == true) {
          street_numberN = element.long_name;
        }
      });
      let u = unitN ? unitN + "/ " : "";
      let c = country ? country + " " : "";
      let st = statename ? statename + " " : "";
      let pc = postal_codeN ? postal_codeN + ", " : "";
      let sn = suburbN ? suburbN + " " : "";
      let s = streetN ? streetN + " " : "";
      let n = street_numberN ? street_numberN + " " : "";
      // setFullPhysicalAddress(u + n + s + sn + pc + st + c);
      setState(prev => {
        return {
          ...prev,
          email: prev.email,
          fname: prev.fname,
          lname: prev.lname,
          work_phone: prev.work_phone,
          mobile_phone: prev.mobile_phone,
          facebook_link: prev.facebook_link,
          linked_in_link: prev.linked_in_link,
          twitter_link: prev.twitter_link,
          user_type: prev.user_type,
          address: prev.address,
          idx: prev.idx,
          profile_pic: prev.profile,
          address: u + n + s + sn + pc + st + c,
        };
      });
    });
  }, [props.add_notification_loading, props.profile_details, props.pro_pic_status, props.percentage_loading, props.profile_details, props.notification_data?.data?.data]);


  const handleFormValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const fileHandle = e => {
    if (e.target.files[0].size / 1024 < 2048) {
      setUploadStatus(true);
      props.addProPic(e.target.files[0]);
      document.getElementById("profile_pic").value = "";
    } else {
      toastr.warning("Select a image below 2MB");
    }
  };
  console.log(props.profile_edit_data);
  const toggle = tab => {
    if (tabState.activeTab !== tab) {
      setTabState({ activeTab: tab });
    }
    if (tab == 5) {
      props.getSettingsNotification();
    }
  };
  if (props.profile_edit_status == "Success") {
    let authUser = JSON.parse(localStorage.getItem('authUser'))
    authUser = { ...authUser, user: { ...props.profile_edit_data?.user } }
    localStorage.removeItem('authUser')
    localStorage.setItem('authUser', JSON.stringify(authUser))
    toastr.success("User Profile Edit Successfull");
    props.editProfileFresh();
  } else if (props.profile_edit_status == "Failed") {
    toastr.error("User Profile Edit Failed");
    props.editProfileFresh();
  }
  if (props.password_update_status == "Success") {
    toastr.success("User Profile Edit Successfull");
    props.editPasswordFresh();
  } else if (props.password_update_status == "Failed") {
    toastr.error("User Profile Edit Failed");
    props.editPasswordFresh();
  }

  function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }

  const toggleJobBtn = () => {
    setState5(prev => ({
      ...prev,
      jobYesBtn: !prev.jobYesBtn, jobNoBtn: !prev.jobNoBtn
    }))
  };

  const toggleEmailBtn = () => {
    setState5(prev => ({
      ...prev,
      emailYesBtn: !prev.emailYesBtn, emailNoBtn: !prev.emailNoBtn
    }))
  };

  const toggleEmailDataBtn = (data) => {
    setState5({
      ...state5,
      allBtn: data == 'All' ? true : false,
      personalBtn: data == 'Personal' ? true : false,
      unassignedBtn: data == 'unassigned' ? true : false,
      emailData: data
    })
  };

  const toggleMentionBtn = () => {
    setState5(prev => ({
      ...prev,
      mentionYesBtn: !prev.mentionYesBtn, mentionNoBtn: !prev.mentionNoBtn
    }))
  };

  const toggleSensitiveBtn = () => {
    setState5(prev => ({ ...prev, sensitiveYesBtn: !prev.sensitiveYesBtn, sensitiveNoBtn: !prev.sensitiveNoBtn }))
  };

  const toggleDeviceBtn = () => {
    setState5(prev => ({ ...prev, deviceYesBtn: !prev.deviceYesBtn, deviceNoBtn: !prev.deviceNoBtn }))
  };

  const handlerNotification = () => {

    props.addNotificationProfile(state5)
    setStatus(true)
  }

  const cancelHandler = () => history.push('/dashboard')


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Profile" breadcrumbItem="" />

          <Row>
            <Col lg="12">
              {props.error && props.error ? (
                <Alert color="danger">{props.error}</Alert>
              ) : null}
              {props.success && props.success ? (
                <Alert color="success">{props.success}</Alert>
              ) : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="me-3">
                      <img
                        src={
                          state.profile_pic != "" ? state.profile_pic : avatar
                        }
                        alt=""
                        className="avatar-lg rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="align-self-center flex-1">
                      <div className="text-muted">
                        <h5>
                          {state.fname} {state.lname}
                        </h5>
                        <p className="mb-1">{state.email}</p>
                        <p className="mb-0">Id no: #{state.idx}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Profile</h4>

          <Card>
            <CardBody>
              <Row>
                <Col md={8}>
                  <Nav tabs className="">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: tabState.activeTab === "1",
                        })}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        Profile
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: tabState.activeTab === "2",
                        })}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        Password
                      </NavLink>
                    </NavItem>
                    {/* <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: tabState.activeTab === "3",
                  })}
                  onClick={() => {
                    toggle("3");
                  }}
                >
                  Security
                </NavLink>
              </NavItem> */}
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: tabState.activeTab === "4",
                        })}
                        onClick={() => {
                          toggle("4");
                        }}
                      >
                        Profile Picture
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: tabState.activeTab === "5",
                        })}
                        onClick={() => {
                          toggle("5");
                        }}
                      >
                        Notification Settings
                      </NavLink>
                    </NavItem>
                  </Nav>


                  <TabContent
                    activeTab={tabState.activeTab}
                    className="p-3 text-muted"
                  >
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <h5 className="mt-3">Manage your account</h5>

                          <div
                            className="mb-3"
                            style={{
                              borderBottom: "1.2px dotted #c9c7c7",
                            }}
                          ></div>
                          <Formik
                            enableReinitialize={true}
                            initialValues={{
                              email: (state && state.email) || "",
                              fname: (state && state.fname) || "",
                              lname: (state && state.lname) || "",
                              work_phone: (state && state.work_phone) || "",
                              mobile_phone: (state && state.mobile_phone) || "",
                              facebook_link: (state && state.facebook_link) || "",
                              linked_in_link: (state && state.linked_in_link) || "",
                              twitter_link: (state && state.twitter_link) || "",
                              address: (state && state.address) || "",
                              user_type: (state && state.user_type) || "",
                              id: (state && state.idx) || "",
                            }}
                            validationSchema={Yup.object().shape({
                              email: Yup.string()
                                .email("Invalid Email Format")
                                .required("Please Enter Your Email"),
                              fname: Yup.string().required(
                                "Please Enter Valid First Name"
                              ),
                              lname: Yup.string().required(
                                "Please Enter Valid Last Name"
                              ),
                              address: Yup.string().required(
                                "Please Enter address"
                              ),
                              user_type: Yup.string().required(
                                "Please Select User Type"
                              ),
                            })}
                            onSubmit={values => {
                              props.editProfile(values);
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
                                        value={state.fname}
                                        onChange={handleFormValues}
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
                                        value={state.lname}
                                        onChange={handleFormValues}
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
                                        disabled={true}
                                        value={state.email}
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
                                        value={state.user_type}
                                        disabled={true}
                                      >
                                        <option value={""}>Select User</option>
                                        <option value={"Property Manager"}>
                                          Property Manager
                                        </option>
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
                                      <InputGroup>
                                        <div className="input-group-text">+880</div>
                                        <Field
                                          name="mobile_phone"
                                          type="text"
                                          className={
                                            "form-control" +
                                            (errors.mobile_phone &&
                                              touched.mobile_phone
                                              ? " is-invalid"
                                              : "")
                                          }
                                          value={state.mobile_phone}
                                          onChange={handleFormValues}
                                        />
                                        <ErrorMessage
                                          name="mobile_phone"
                                          component="div"
                                          className="invalid-feedback"
                                        />
                                      </InputGroup>
                                    </div>
                                  </Col>
                                  <Col md={6} lg={6} xl={6}>
                                    <div className="mb-3">
                                      <Label for="email" className="form-label">
                                        Work Phone
                                      </Label>
                                      <InputGroup>
                                        <div className="input-group-text">+61</div>
                                        <Field
                                          name="work_phone"
                                          type="text"
                                          className={
                                            "form-control" +
                                            (errors.work_phone && touched.work_phone
                                              ? " is-invalid"
                                              : "")
                                          }
                                          value={state.work_phone}
                                          onChange={handleFormValues}
                                        />
                                        <ErrorMessage
                                          name="work_phone"
                                          component="div"
                                          className="invalid-feedback"
                                        />
                                      </InputGroup>
                                    </div>
                                  </Col>
                                  <Col md={6} lg={6} xl={6}>
                                    <div className="mb-3">
                                      <Label for="email" className="form-label">
                                        Facebook link
                                      </Label>
                                      <InputGroup>
                                        <Field
                                          name="facebook_link"
                                          type="text"
                                          className={
                                            "form-control" +
                                            (errors.facebook_link &&
                                              touched.facebook_link
                                              ? " is-invalid"
                                              : "")
                                          }
                                          value={state.facebook_link}
                                          onChange={handleFormValues}
                                        />
                                        <ErrorMessage
                                          name="facebook_link"
                                          component="div"
                                          className="invalid-feedback"
                                        />
                                      </InputGroup>
                                    </div>
                                  </Col>
                                  <Col md={6} lg={6} xl={6}>
                                    <div className="mb-3">
                                      <Label for="email" className="form-label">
                                        Linked In link
                                      </Label>
                                      <InputGroup>
                                        <Field
                                          name="linked_in_link"
                                          type="text"
                                          className={
                                            "form-control" +
                                            (errors.linked_in_link &&
                                              touched.linked_in_link
                                              ? " is-invalid"
                                              : "")
                                          }
                                          value={state.linked_in_link}
                                          onChange={handleFormValues}
                                        />
                                        <ErrorMessage
                                          name="linked_in_link"
                                          component="div"
                                          className="invalid-feedback"
                                        />
                                      </InputGroup>
                                    </div>
                                  </Col>
                                  <Col md={6} lg={6} xl={6}>
                                    <div className="mb-3">
                                      <Label for="email" className="form-label">
                                        twitter link
                                      </Label>
                                      <InputGroup>
                                        <Field
                                          name="twitter_link"
                                          type="text"
                                          className={
                                            "form-control" +
                                            (errors.twitter_link &&
                                              touched.twitter_link
                                              ? " is-invalid"
                                              : "")
                                          }
                                          value={state.twitter_link}
                                          onChange={handleFormValues}
                                        />
                                        <ErrorMessage
                                          name="twitter_link"
                                          component="div"
                                          className="invalid-feedback"
                                        />
                                      </InputGroup>
                                    </div>
                                  </Col>
                                  <Col md={6} lg={6} xl={6}>
                                    <div className="mb-3">
                                      <Label for="address" className="form-label">
                                        Address
                                      </Label>
                                      <input
                                        name="address"
                                        type="text"
                                        className="form-control"
                                        onChange={handleFormValues}
                                        value={state.address}
                                        ref={inputRef}
                                      />
                                    </div>
                                  </Col>
                                </Row>

                                <div className="mt-4">
                                  <button
                                    className="btn btn-info w-md"
                                    type="submit"
                                  >
                                    Update Profile
                                  </button>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </Col>
                      </Row>
                    </TabPane>

                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <h5 className="mt-3">Manage your password</h5>

                          <div
                            className="mb-3"
                            style={{
                              borderBottom: "1.2px dotted #c9c7c7",
                            }}
                          ></div>
                          <Formik
                            enableReinitialize={true}
                            initialValues={{
                              password: (state && state.password) || "",
                              confirm_password:
                                (state && state.confirm_password) || "",
                            }}
                            validationSchema={Yup.object().shape({
                              password: Yup.string().required(
                                "Please Enter Valid Password"
                              ),
                              confirm_password: Yup.string().required(
                                "Please Enter Valid Password"
                              ),
                            })}
                            onSubmit={values => {
                              props.editPassword(values);
                            }}
                          >
                            {({ errors, status, touched }) => (
                              <Form className="form-horizontal">
                                <Row>
                                  <Col md={6} lg={6} xl={6}>
                                    <div className="mb-3">
                                      <Label for="password" className="form-label">
                                        Current Password
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
                                  <Col md={6} lg={6} xl={6}></Col>
                                </Row>

                                <Row>
                                  <Col md={6} lg={6} xl={6}>
                                    <div className="mb-3">
                                      <Label
                                        for="confirm_password"
                                        className="form-label"
                                      >
                                        New Password
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
                                  <Col md={6} lg={6} xl={6}></Col>
                                </Row>

                                <div className="mt-4">
                                  <button
                                    className="btn btn-info w-md"
                                    type="submit"
                                  >
                                    Update Password
                                  </button>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </Col>
                      </Row>
                    </TabPane>

                    {/* its use when two factor auth enabelaed */}
                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">

                          <Row>
                            <Col md={6} lg={6} xl={6}>
                              <div className="mb-3">
                                <Row>
                                  <Col md={6} lg={6} xl={6}>
                                    <Label for="password" className="form-label">
                                      Two-factor authentication
                                    </Label>
                                  </Col>
                                  <Col md={6} lg={6} xl={6}>
                                    <div className="mb-3">
                                      <button
                                        className="btn btn-info w-md"
                                        type="submit"
                                      >
                                        Enable
                                      </button>
                                    </div>
                                    <div className="mb-3">Enabled</div>
                                  </Col>
                                </Row>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6} lg={6} xl={6}>
                              <div className="mb-3">
                                <Row>
                                  <Col md={6} lg={6} xl={6}>
                                    <Label for="password" className="form-label">
                                      Recently used devices
                                    </Label>
                                  </Col>
                                  <Col md={6} lg={6} xl={6}>
                                    <a className="mb-3">View</a>
                                  </Col>
                                </Row>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </TabPane>
                    {/* end */}

                    <TabPane tabId="4">
                      <h5 className="mt-3">Upload your picture</h5>

                      <div
                        className="mb-3"
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      ></div>
                      <Row>
                        <Col sm="6">
                          <div className="mb-3">
                            <Label for="profile_pic" className="form-label">
                              Profile Picture
                            </Label>
                            <input
                              name="profile_pic"
                              id="profile_pic"
                              type="file"
                              className={"form-control"}
                              accept="image/*"
                              onChange={e => {
                                fileHandle(e);
                              }}
                            />
                          </div>
                          <div className="mt-4 text-left">
                            * Please Update Image Below 2MB
                          </div>
                        </Col>
                        <Col sm="6"></Col>
                      </Row>
                      <Row>
                        <Col sm="6">
                          <div className="mb-3 mt-4">
                            {props.percentage >= 0 && props.percentage != null ? (
                              <div className="mt-3">
                                <Progress
                                  striped
                                  color="info"
                                  value={props.percentage}
                                ></Progress>
                                <p style={{ textAlign: "center" }}>
                                  {props.percentage_detail}
                                </p>
                              </div>
                            ) : null}
                          </div>
                        </Col>
                        <Col sm="6"></Col>
                      </Row>
                    </TabPane>

                    <TabPane tabId='5'>
                      <Row>
                        <Col sm='12'>
                          <Row>
                            <Col md={12}>
                              <h4 className="pb-1">Notification Settings</h4>
                              <div
                                style={{
                                  borderBottom: "1.2px dotted #c9c7c7",
                                }}
                              ></div>
                              <h4 className="mt-5">Notify me about</h4>

                              <div
                                style={{
                                  borderBottom: "1.2px dotted #c9c7c7",
                                }}
                              ></div>

                              <div className="py-3">
                                <Row className="pb-3">
                                  <Col md={4} className="ps-5">
                                    New jobs added <br /> via the tenant <br /> portal
                                  </Col>
                                  <Col md={8} className="d-flex align-items-center">
                                    <div className="btn-group btn-group-justified">
                                      <div className="btn-group">
                                        <Button
                                          className=''
                                          color={state5.jobYesBtn ? "secondary" : "light"}
                                          onClick={toggleJobBtn}
                                        >
                                          {state5.jobYesBtn ? (
                                            <i className="bx bx-comment-check"></i>
                                          ) : null}
                                          <span> Yes</span>
                                        </Button>
                                      </div>
                                      <div className="btn-group">
                                        <Button
                                          className=''
                                          color={state5.jobNoBtn ? "secondary" : "light"}
                                          onClick={toggleJobBtn}
                                        >
                                          {state5.jobNoBtn ? (
                                            <i className="bx bx-comment-check"></i>
                                          ) : null}
                                          <span> No</span>
                                        </Button>
                                      </div>

                                    </div>

                                    <Tooltip
                                      placement="right"
                                      isOpen={state5.ttright}
                                      target="TooltipRight"
                                      toggle={() =>
                                        setState5({ ...state5, ttright: !state5.ttright })
                                      }
                                    >
                                      {`You’ll see a badge next to your message Inbox`}
                                    </Tooltip>
                                    <div
                                      id="TooltipRight"
                                    >
                                      <i className="fas fa-info-circle ms-2" />

                                    </div>
                                  </Col>
                                </Row>

                                <Row className="py-3">
                                  <Col md={4} className="ps-5">
                                    Unread emails
                                  </Col>
                                  <Col md={8}>
                                    <div className="btn-group btn-group-justified">
                                      <div className="btn-group">
                                        <Button
                                          color={state5.emailYesBtn ? "secondary" : "light"}
                                          onClick={toggleEmailBtn}
                                        >
                                          {state5.emailYesBtn ? (
                                            <i className="bx bx-comment-check"></i>
                                          ) : null}
                                          <span> Yes</span>
                                        </Button>
                                      </div>
                                      <div className="btn-group">
                                        <Button
                                          color={state5.emailNoBtn ? "secondary" : "light"}
                                          onClick={toggleEmailBtn}
                                        >
                                          {state5.emailNoBtn ? (
                                            <i className="bx bx-comment-check"></i>
                                          ) : null}
                                          <span> No</span>
                                        </Button>
                                      </div>

                                    </div>

                                    {/* <div className="d-flex align-items-center">
                                      <div className="btn-group btn-group-justified mt-1">
                                        <div className="btn-group">
                                          <Button
                                            color={state5.allBtn ? "secondary" : "light"}
                                            onClick={e => toggleEmailDataBtn('All')}
                                          >

                                            <span> All</span>
                                          </Button>
                                        </div>
                                        <div className="btn-group">
                                          <Button
                                            color={state5.personalBtn ? "secondary" : "light"}
                                            onClick={e => toggleEmailDataBtn('Personal')}
                                          >

                                            <span> Personal only</span>
                                          </Button>
                                        </div>
                                        <div className="btn-group">
                                          <Button
                                            color={state5.unassignedBtn ? "secondary" : "light"}
                                            onClick={e => toggleEmailDataBtn('unassigned')}
                                          >

                                            <span> Personal and unassigned</span>
                                          </Button>
                                        </div>

                                      </div>
                                      <Tooltip
                                        placement="right"
                                        isOpen={state5.ttbottom}
                                        target="TooltipBottom"
                                        toggle={() =>
                                          setState5({ ...state5, ttbottom: !state5.ttbottom })
                                        }
                                      >
                                        {`You’ll see a badge next to your message Inbox`}

                                      </Tooltip>
                                      <div
                                        id="TooltipBottom"
                                      >
                                        <i className="fas fa-info-circle ms-2" />

                                      </div>
                                    </div> */}
                                  </Col>
                                </Row>

                                <Row className="py-3">
                                  <Col md={4} className="ps-5">
                                    Mentions by <br /> team members in <b /> comments
                                  </Col>
                                  <Col md={3}>
                                    <div className="btn-group btn-group-justified">
                                      <div className="btn-group">
                                        <Button
                                          color={state5.mentionYesBtn ? "secondary" : "light"}
                                          onClick={toggleMentionBtn}
                                        >
                                          {state5.mentionYesBtn ? (
                                            <i className="bx bx-comment-check"></i>
                                          ) : null}
                                          <span> Yes</span>
                                        </Button>
                                      </div>
                                      <div className="btn-group">
                                        <Button
                                          color={state5.mentionNoBtn ? "secondary" : "light"}
                                          onClick={toggleMentionBtn}
                                        >
                                          {state5.mentionNoBtn ? (
                                            <i className="bx bx-comment-check"></i>
                                          ) : null}
                                          <span> No</span>
                                        </Button>
                                      </div>

                                    </div>

                                  </Col>
                                  <Col md={5}>
                                    <span>{`You'll see a badge on your desktop panel when team members mention you in comments. These are always on.`}</span>
                                  </Col>
                                </Row>

                                {/* <h4 className="mt-5">Security</h4>

                                <div
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                ></div>
                                <Row className="py-3">
                                  <Col md={4} className="ps-5">
                                    Sensitive changes
                                  </Col>
                                  <Col md={8}>
                                    <div className="btn-group btn-group-justified">
                                      <div className="btn-group">
                                        <Button
                                          color={state5.sensitiveYesBtn ? "secondary" : "light"}
                                          onClick={toggleSensitiveBtn}
                                        >
                                          {state5.sensitiveYesBtn ? (
                                            <i className="bx bx-comment-check"></i>
                                          ) : null}
                                          <span> Yes</span>
                                        </Button>
                                      </div>
                                      <div className="btn-group">
                                        <Button
                                          color={state5.sensitiveNoBtn ? "secondary" : "light"}
                                          onClick={toggleSensitiveBtn}
                                        >
                                          {state5.sensitiveNoBtn ? (
                                            <i className="bx bx-comment-check"></i>
                                          ) : null}
                                          <span> No</span>
                                        </Button>
                                      </div>

                                    </div>
                                    <i className="fas fa-info-circle ms-1" />
                                  </Col>
                                </Row>

                                <Row className="py-3">
                                  <Col md={4} className="ps-5">
                                    Sign-ins from new devices
                                  </Col>
                                  <Col md={8}>
                                    <div className="btn-group btn-group-justified">
                                      <div className="btn-group">
                                        <Button
                                          color={state5.deviceYesBtn ? "secondary" : "light"}
                                          onClick={toggleDeviceBtn}
                                        >
                                          {state5.deviceYesBtn ? (
                                            <i className="bx bx-comment-check"></i>
                                          ) : null}
                                          <span> Yes</span>
                                        </Button>
                                      </div>
                                      <div className="btn-group">
                                        <Button
                                          color={state5.deviceNoBtn ? "secondary" : "light"}
                                          onClick={toggleDeviceBtn}
                                        >
                                          {state5.deviceNoBtn ? (
                                            <i className="bx bx-comment-check"></i>
                                          ) : null}
                                          <span> No</span>
                                        </Button>
                                      </div>

                                    </div>
                                    <i className="fas fa-info-circle ms-1" />
                                  </Col>
                                </Row> */}

                                <div className="d-flex justify-content-end mt-4">
                                  <Button color="danger" className="me-1" onClick={cancelHandler}><i className="fas fa-times me-1"
                                  />Cancel</Button>
                                  <Button color="info" onClick={e => handlerNotification()}><i className="fas fa-save me-1"
                                  />Save</Button>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
            </CardBody>

          </Card>
        </Container>
      </div>
      {status && <Loder status={status} />}
    </React.Fragment>
  );
};

UserProfile.propTypes = {
  editProfile: PropTypes.func,
  editPassword: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any,
  profile_edit_status: PropTypes.any,
  password_update_status: PropTypes.any,
  resetProfileFlag: PropTypes.func,
};

const mapStateToProps = state => {
  const { percentage, percentage_loading, percentage_detail } = state.property;
  const {
    error,
    success,
    profile_edit_status,
    profile_edit_data,
    password_update_status,
    profile_details,
    pro_pic,
    pro_pic_status, add_notification_loading, notification_data, notification_loading
  } = state.Profile;

  return {
    error,
    success,
    profile_edit_status,
    profile_edit_data,
    password_update_status,
    profile_details,
    pro_pic,
    pro_pic_status,
    percentage,
    percentage_loading,
    percentage_detail, add_notification_loading, notification_data, notification_loading
  };
};

export default withRouter(
  connect(mapStateToProps, {
    editProfile,
    editPassword,
    editProfileFresh,
    editPasswordFresh,
    resetProfileFlag,
    profileDetails,
    addProPic,
    addProPicFresh,
    uploadImagePercentageFresh, addNotificationProfile, addNotificationProfileFresh, getSettingsNotification, getSettingsNotificationFresh
  })(UserProfile)
);
