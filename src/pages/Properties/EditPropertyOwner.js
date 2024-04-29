import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Alert,
  Container,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Modal,
  Input,
  Button,
  CardHeader,
  //   Form,
  FormGroup,
} from "reactstrap";
import classnames from "classnames";
import { Formik, Field, Form, ErrorMessage, useFormik, date } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

import {
  addOwner,
  propertyOwnerInfoFresh,
} from "../../store/Properties/actions";
import {
  addEditContact,
  contactList,
  showContactFresh,
} from "../../store/Contacts2/actions";

import {
  Link,
  useHistory,
  withRouter,
  useParams,
  useLocation,
} from "react-router-dom";

const EditPropertyOwnerAdd = props => {
  const location = useLocation();
  // Form Tab State
  const [tabState, setTabState] = useState({
    activeTab: 1,
    passedSteps: [1],
  });
  // ---------

  let { id } = useParams(); // Property ID
  const history = useHistory();

  const [formSubmitBtnState, setFormSubmitBtnState] = useState(1); // Form Submit Button State

  const [selectedId, setSelectedId] = useState();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [optionGroup, setOptionGroup] = useState([
    {
      options: [
        { label: "Mustard", value: "Mustard" },
        { label: "Ketchup", value: "Ketchup" },
        { label: "Relish", value: "Relish" },
      ],
    },
  ]);
  const [optionGroupState, setOptionGroupState] = useState(true);

  const [selectedId2, setSelectedId2] = useState();
  const [selectedGroup2, setSelectedGroup2] = useState(null);
  const [optionGroup2, setOptionGroup2] = useState([
    {
      options: [
        { label: "Relish", value: "Relish" },
        { label: "Mustard", value: "Mustard" },
        { label: "Ketchup", value: "Ketchup" },
      ],
    },
  ]);
  const [optionGroupState2, setOptionGroupState2] = useState(true);

  const [selectedId3, setSelectedId3] = useState();
  const [selectedGroup3, setSelectedGroup3] = useState(null);
  const [optionGroup3, setOptionGroup3] = useState([
    {
      options: [
        { label: "Ketchup", value: "Ketchup" },
        { label: "Mustard", value: "Mustard" },
        { label: "Relish", value: "Relish" },
      ],
    },
  ]);
  const [optionGroupState3, setOptionGroupState3] = useState(true);
  const [state, setState] = useState({}); // Form 1 State
  const [state2, setState2] = useState({ owner_access: 1 }); // Form 2 State

  const [show, setShow] = useState(false);
  const [postalAddForm, setPostalAddForm] = useState(false);
  const [physicalAddForm, setPhysicalAddForm] = useState(false);

  const [inspectionEnableBtn, setInspectionEnableBtn] = useState(true);
  const [inspectionDisableBtn, setInspectionDisableBtn] = useState(false);
  const [splitEnableBtn, setSplitEnableBtn] = useState(true);
  const [splitDisableBtn, setSplitDisableBtn] = useState(false);

  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [rows3, setRows3] = useState([]);
  const [state3, setState3] = useState({});
  const [state4, setState4] = useState({});

  const [selectedId4, setSelectedId4] = useState();
  const [selectedGroup4, setSelectedGroup4] = useState(null);
  const [optionGroup4, setOptionGroup4] = useState([
    {
      options: [{ label: "Admin", value: "Admin" }],
    },
  ]);
  const [optionGroupState4, setOptionGroupState4] = useState(true);
  const [tableInfoShow, setTableInfoShow] = useState(false);

  const [selectedId5, setSelectedId5] = useState();
  const [selectedGroup5, setSelectedGroup5] = useState(null);
  const [optionGroup5, setOptionGroup5] = useState([
    {
      options: [
        { label: "Commercial fee", value: "Commercial fee" },
        { label: "Letting fee", value: "Letting fee" },
      ],
    },
  ]);
  const [optionGroupState5, setOptionGroupState5] = useState(true);
  const [tableInfoShow2, setTableInfoShow2] = useState(false);

  const [selectedId6, setSelectedId6] = useState();
  const [selectedGroup6, setSelectedGroup6] = useState(null);
  const [optionGroup6, setOptionGroup6] = useState([
    {
      options: [
        { label: "None", value: "None" },
        { label: "Check", value: "Check" },
        { label: "EFT", value: "EFT" },
      ],
    },
  ]);
  const [optionGroupState6, setOptionGroupState6] = useState(true);
  const [tableInfoShow3, setTableInfoShow3] = useState(false);

  const handleAddRow = () => {
    const item = {
      name: "",
    };
    setRows([...rows, item]);
  };

  const handleRemoveRow = (e, idx) => {
    if (idx === "01") {
      document.getElementById("addr" + idx).style.display = "block";
    } else if (typeof idx != "undefined") {
      document.getElementById("addr" + idx).style.display = "none";
    }
  };

  const handleAddRow2 = () => {
    const item = {
      name: "",
    };
    setRows2([...rows2, item]);
  };
  const handleAddRow3 = () => {
    const item = {
      name: "",
    };
    setRows3([...rows3, item]);
  };

  const handleRemoveRow2 = (e, idx) => {
    if (idx === "01") {
      document.getElementById("addr" + idx).style.display = "block";
    } else if (typeof idx != "undefined") {
      document.getElementById("addr" + idx).style.display = "none";
    }
  };
  const handleRemoveRow3 = (e, idx) => {
    if (idx === "01") {
      document.getElementById("addr" + idx).style.display = "block";
    } else if (typeof idx != "undefined") {
      document.getElementById("addr" + idx).style.display = "none";
    }
  };

  const date = new Date();
  const futureDate = date.getDate();
  date.setDate(futureDate);
  const defaultValue = date.toLocaleDateString("en-CA");

  const handlePushData = () => {
    history.push("/contact/set", { id: selectedId });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePropertyFormValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handlePropertyFormValues2 = e => {
    setState2({ ...state2, [e.target.name]: e.target.value });
  };

  const handlePropertyFormValues3 = e => {
    setState3({ ...state3, [e.target.name]: e.target.value });
  };
  // console.log(state3);

  const handlePropertyFormValues4 = e => {
    setState4({ ...state4, [e.target.name]: e.target.value });
  };
  // console.log(state4);

  const handlePostalAddForm = () => {
    setPostalAddForm(prev => !prev);
  };

  const handlePhysicalAddForm = () => {
    setPhysicalAddForm(prev => !prev);
  };

  const toggleInspectionDisableBtn = () => {
    setState2({ ...state2, owner_access: 0 });
    setInspectionDisableBtn(true);
    setInspectionEnableBtn(false);
  };
  const toggleInspectionEnableBtn = () => {
    setOptionGroupState2({
      ...state2,
      owner_access: 1,
    });
    setInspectionEnableBtn(true);
    setInspectionDisableBtn(false);
  };

  const toggleSplitDisableBtn = () => {
    setState4({ ...state4, owner_access: "%" });
    setSplitDisableBtn(true);
    setSplitEnableBtn(false);
  };
  const toggleSplitEnableBtn = () => {
    setState4({
      ...state4,
      owner_access: "৳",
    });
    setSplitEnableBtn(true);
    setSplitDisableBtn(false);
  };

  const handleSelectGroup = e => {
    setSelectedGroup(e);
    setSelectedId(e.value);
  };
  const handleSelectGroup2 = e => {
    //  console.log(e);
    setState2({ ...state2, regular_intervals: e.value });
    setSelectedGroup2(e);
    setSelectedId2(e.value);
  };
  const handleSelectGroup3 = e => {
    setState2({ ...state2, gained_reason: e.value });
    setSelectedGroup3(e);
    setSelectedId3(e.value);
  };

  const handleSelectGroup4 = e => {
    setState3({ ...state3, temp_fee1: e.value });
    setSelectedGroup4(e);
    setSelectedId4(e.value);
    setTableInfoShow(true);
  };

  const handleSelectGroup5 = e => {
    setState3({ ...state3, temp_fee2: e.value });
    setSelectedGroup5(e);
    setSelectedId5(e.value);
    setTableInfoShow2(true);
  };

  const handleSelectGroup6 = e => {
    setState4({ ...state4, method: e.value });
    setSelectedGroup6(e.value);
    setSelectedId6(e.value);
    setTableInfoShow3(true);
  };

  const toggleTab = tab => {
    if (tabState.activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        let modifiedSteps = [...tabState.passedSteps, tab];
        setTabState({
          activeTab: tab,
          passedSteps: modifiedSteps,
        });
      }
    }
  };

  useEffect(() => {
    // if (inspectionEnableBtn) {
    //   setState({ ...state, routine_inspections_frequency_type: "Enable" });
    // }
  });
  // console.log(state, state2);
  return (
    <div className="mt-5 pt-5 ps-3">
      <CardTitle className="mb-3">
        <h3 className="text-primary">Edit Assign owner - Name</h3>
      </CardTitle>{" "}
      <div className="wizard clearfix">
        <div className="steps clearfix">
          <ul>
            <NavItem
              className={classnames({
                current: tabState.activeTab === 1,
              })}
            >
              <NavLink
                className={classnames({
                  active: tabState.activeTab === 1,
                })}
                onClick={() => {
                  toggleTab(1);
                  setFormSubmitBtnState(1);
                }}
              >
                <span className="number">1.</span> Contact
              </NavLink>
            </NavItem>
            <NavItem
              className={classnames({
                current: tabState.activeTab === 2,
              })}
            >
              <NavLink
                disabled={!(tabState.passedSteps || []).includes(2)}
                className={classnames({
                  active: tabState.activeTab === 2,
                })}
                onClick={() => {
                  toggleTab(2);
                  setFormSubmitBtnState(2);
                }}
              >
                <span className="number">2.</span> <span>Folios</span>
              </NavLink>
            </NavItem>
            {/* <NavItem
              className={classnames({
                current: tabState.activeTab === 3,
              })}
            >
              <NavLink
                disabled={!(tabState.passedSteps || []).includes(3)}
                className={
                  (classnames({
                    active: tabState.activeTab === 3,
                  }),
                  "done")
                }
                onClick={() => {
                  toggleTab(3);
                  setFormSubmitBtnState(3)
                }}
              >
                <span className="number">3.</span> Fees
              </NavLink>
            </NavItem>
            <NavItem
              className={classnames({
                current: tabState.activeTab === 4,
              })}
            >
              <NavLink
                disabled={!(tabState.passedSteps || []).includes(4)}
                className={
                  (classnames({
                    active: tabState.activeTab === 4,
                  }),
                  "done")
                }
                onClick={() => {
                  toggleTab(4);
                  setFormSubmitBtnState(4)
                }}
              >
                <span className="number">4.</span> Payment Methods
              </NavLink>
            </NavItem> */}
          </ul>
        </div>
        <div className="content clearfix">
          <TabContent activeTab={tabState.activeTab} className="body">
            <TabPane tabId={1}>
              <Row>
                <Col sm="12">
                  <div className="d-flex flex-column justify-content-start">
                    <div className="py-2 ps-3">
                      <div>
                        <div className="mb-3">
                          {/* {props.error ? (
                          <Alert color="danger">
                            {JSON.stringify(props.error.response.data.message)}
                          </Alert>
                        ) : null} */}
                          <Formik
                            enableReinitialize={true}
                            initialValues={{
                              reference: (state && state.reference) || "",
                              first_name: (state && state.first_name) || "",

                              last_name: (state && state.last_name) || "",
                              salutation: (state && state.salutation) || "",
                              company_name: (state && state.company_name) || "",
                              mobile_phone: (state && state.mobile_phone) || "",
                              work_phone: (state && state.work_phone) || "",
                              home_phone: (state && state.home_phone) || "",
                              email: (state && state.email) || "",

                              postal_building_name:
                                (state && state.postal_building_name) || "",
                              postal_unit: (state && state.postal_unit) || "",
                              postal_number:
                                (state && state.postal_number) || "",
                              postal_street:
                                (state && state.postal_street) || "",
                              postal_suburb:
                                (state && state.postal_suburb) || "",
                              postal_postcode:
                                (state && state.postal_postcode) || "",
                              postal_state: (state && state.postal_state) || "",
                              postal_country:
                                (state && state.postal_country) || "",

                              physical_building_name:
                                (state && state.physical_building_name) || "",
                              physical_unit:
                                (state && state.physical_unit) || "",
                              physical_number:
                                (state && state.physical_number) || "",
                              physical_street:
                                (state && state.physical_street) || "",
                              physical_suburb:
                                (state && state.physical_suburb) || "",
                              physical_postcode:
                                (state && state.physical_postcode) || "",
                              physical_state:
                                (state && state.physical_state) || "",
                              physical_country:
                                (state && state.physical_country) || "",

                              abn: (state && state.abn) || "",

                              notes: (state && state.notes) || "",
                              // communication:
                              //   (state && state.communication) || "",
                            }}
                            validationSchema={Yup.object().shape({
                              reference: Yup.string().required(
                                "Please Enter Reference"
                              ),
                              first_name: Yup.string().required(
                                "Please Enter First name"
                              ),
                              last_name: Yup.string().required(
                                "Please Enter Last name"
                              ),
                              salutation: Yup.string().required(
                                "Please Enter Reference"
                              ),
                              company_name: Yup.string().required(
                                "Please Enter Salutation"
                              ),
                              mobile_phone: Yup.string().required(
                                "Please Enter Mobile phone"
                              ),
                              work_phone: Yup.string().required(
                                "Please Enter Reference"
                              ),
                              home_phone: Yup.string().required(
                                "Please Enter Work phone"
                              ),
                              email:
                                Yup.string().required("Please Enter Email"),

                              // postal_building_name: Yup.string().required(
                              //   "Please Enter Building name"
                              // ),
                              // postal_unit:
                              //   Yup.string().required("Please Enter Unit"),
                              // postal_number: Yup.string().required(
                              //   "Please Enter Number"
                              // ),
                              // postal_street: Yup.string().required(
                              //   "Please Enter Street"
                              // ),
                              // postal_suburb: Yup.string().required(
                              //   "Please Enter Suburb"
                              // ),
                              // postal_postcode: Yup.string().required(
                              //   "Please Enter Postcode"
                              // ),
                              // postal_state:
                              //   Yup.string().required("Please Enter State"),
                              // postal_country:
                              //   Yup.string().required("Please Enter State"),

                              physical_building_name: Yup.string().required(
                                "Please Enter Building name"
                              ),
                              physical_unit:
                                Yup.string().required("Please Enter Unit"),
                              physical_number: Yup.string().required(
                                "Please Enter Number"
                              ),
                              physical_street: Yup.string().required(
                                "Please Enter Street"
                              ),
                              physical_suburb: Yup.string().required(
                                "Please Enter Suburb"
                              ),
                              physical_postcode: Yup.string().required(
                                "Please Enter Postcode"
                              ),
                              physical_state:
                                Yup.string().required("Please Enter State"),
                              physical_country: Yup.string().required(
                                "Please Enter Country"
                              ),

                              // communication: Yup.string().required(
                              //   "Please Enter Communication"
                              // ),
                              abn: Yup.string().required("Please Enter ABN"),
                              notes:
                                Yup.string().required("Please Enter Notes"),
                            })}
                            onSubmit={(values, onSubmitProps) => {
                              setState(values);
                              toggleTab(tabState.activeTab + 1);
                              setFormSubmitBtnState(formSubmitBtnState + 1);
                            }}
                          >
                            {({ errors, status, touched }) => (
                              <div>
                                <div>
                                  <Form
                                    className="form-horizontal"
                                    id="owner-form-1"
                                  >
                                    <div>
                                      <div className="w-75 d-flex justify-content-between align-items-center border-bottom border-primary pb-1">
                                        <div>
                                          <CardTitle className="mb-3">
                                            <h4 className="text-primary">
                                              Owner Contact
                                            </h4>
                                          </CardTitle>
                                        </div>
                                      </div>
                                      <div className="my-3 w-75">
                                        <Row className="d-flex justify-content-evenly align-items-center">
                                          <Col md={2}>
                                            <Label
                                              for="reference"
                                              className="form-label"
                                            >
                                              Reference
                                            </Label>
                                          </Col>

                                          <Col md={8}>
                                            <Field
                                              name="reference"
                                              type="text"
                                              value={state.reference}
                                              className={
                                                "form-control" +
                                                (errors.reference &&
                                                  touched.reference
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              onChange={
                                                handlePropertyFormValues
                                              }
                                            />
                                            <ErrorMessage
                                              name="reference"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                        </Row>
                                      </div>
                                      <CardTitle className="text-primary mb-3">
                                        People
                                        <div className="w-25 mb-2 border-bottom border-primary"></div>
                                      </CardTitle>
                                      <div className="mb-3 w-75">
                                        <Row className="mt-2 mb-3 justify-content-evenly align-items-center">
                                          <Col md={2}>
                                            <Label
                                              for="building"
                                              className="form-label"
                                            >
                                              First Name
                                            </Label>
                                          </Col>

                                          <Col md={8}>
                                            <Field
                                              name="first_name"
                                              type="text"
                                              className={
                                                "form-control" +
                                                (errors.first_name &&
                                                  touched.first_name
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              value={state.first_name}
                                              onChange={
                                                handlePropertyFormValues
                                              }
                                            />

                                            <ErrorMessage
                                              name="first_name"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                        </Row>
                                        <Row className="mt-2 mb-3 mb-3 justify-content-evenly align-items-center">
                                          <Col md={2}>
                                            <Label
                                              for="last_name"
                                              className="form-label"
                                            >
                                              Last Name
                                            </Label>
                                          </Col>

                                          <Col md={8}>
                                            <Field
                                              name="last_name"
                                              type="text"
                                              className={
                                                "form-control" +
                                                (errors.last_name &&
                                                  touched.last_name
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              value={state.last_name}
                                              onChange={
                                                handlePropertyFormValues
                                              }
                                            />

                                            <ErrorMessage
                                              name="last_name"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                        </Row>
                                        <Row className="mt-2 mb-3 mb-3 justify-content-evenly align-items-center">
                                          <Col md={2}>
                                            <Label
                                              for="building"
                                              className="form-label"
                                            >
                                              Salutation
                                            </Label>
                                          </Col>

                                          <Col md={8}>
                                            <Field
                                              name="salutation"
                                              type="text"
                                              className={
                                                "form-control" +
                                                (errors.salutation &&
                                                  touched.salutation
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              value={state.salutation}
                                              onChange={
                                                handlePropertyFormValues
                                              }
                                            />

                                            <ErrorMessage
                                              name="salutation"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                        </Row>
                                        <Row className="mt-2 mb-3 mb-3 justify-content-evenly align-items-center">
                                          <Col md={2}>
                                            <Label
                                              for="company_name"
                                              className="form-label"
                                            >
                                              Company name
                                            </Label>
                                          </Col>

                                          <Col md={8}>
                                            <Field
                                              name="company_name"
                                              type="text"
                                              className={
                                                "form-control" +
                                                (errors.company_name &&
                                                  touched.company_name
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              value={state.company_name}
                                              onChange={
                                                handlePropertyFormValues
                                              }
                                            />

                                            <ErrorMessage
                                              name="mobile_phone"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                        </Row>
                                        <Row className="mt-2 mb-3 mb-3 justify-content-evenly align-items-center">
                                          <Col md={2}>
                                            <Label
                                              for="mobile_phone"
                                              className="form-label"
                                            >
                                              Mobile phone
                                            </Label>
                                          </Col>

                                          <Col md={8}>
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
                                              onChange={
                                                handlePropertyFormValues
                                              }
                                            />

                                            <ErrorMessage
                                              name="mobile_phone"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                        </Row>
                                        <Row className="mt-2 mb-3 mb-3 justify-content-evenly align-items-center">
                                          <Col md={2}>
                                            <Label
                                              for="work_phone"
                                              className="form-label"
                                            >
                                              Work phone
                                            </Label>
                                          </Col>

                                          <Col md={8}>
                                            <Field
                                              name="work_phone"
                                              type="text"
                                              className={
                                                "form-control" +
                                                (errors.work_phone &&
                                                  touched.work_phone
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              value={state.work_phone}
                                              onChange={
                                                handlePropertyFormValues
                                              }
                                            />

                                            <ErrorMessage
                                              name="work_phone"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                        </Row>
                                        <Row className="mt-2 mb-3 mb-3 justify-content-evenly align-items-center">
                                          <Col md={2}>
                                            <Label
                                              for="building"
                                              className="form-label"
                                            >
                                              Home phone
                                            </Label>
                                          </Col>

                                          <Col md={8}>
                                            <Field
                                              name="home_phone"
                                              type="text"
                                              className={
                                                "form-control" +
                                                (errors.home_phone &&
                                                  touched.home_phone
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              value={state.home_phone}
                                              onChange={
                                                handlePropertyFormValues
                                              }
                                            />

                                            <ErrorMessage
                                              name="home_phone"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                        </Row>

                                        <Row className="mt-2 mb-3 mb-3 justify-content-evenly align-items-center">
                                          <Col md={2}>
                                            <Label
                                              for="email"
                                              className="form-label"
                                            >
                                              Email
                                            </Label>
                                          </Col>

                                          <Col md={8}>
                                            <Field
                                              name="email"
                                              type="text"
                                              className={
                                                "form-control" +
                                                (errors.email && touched.email
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              value={state.email}
                                              onChange={
                                                handlePropertyFormValues
                                              }
                                            />

                                            <ErrorMessage
                                              name="email"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                        </Row>

                                        <Row className="mt-3 mb-3 justify-content-evenly align-items-start">
                                          <Col md={2}>
                                            <Label
                                              for="address"
                                              className="form-label"
                                            >
                                              Postal Address
                                            </Label>
                                          </Col>
                                          <Col md={8}>
                                            <div className="d-flex">
                                              <input
                                                name="postal_address"
                                                type="text"
                                                className={
                                                  "form-control" +
                                                  (errors.postal_address &&
                                                    touched.postal_address
                                                    ? " is-invalid"
                                                    : "")
                                                }
                                                value={
                                                  state.postal_building_name &&
                                                    state.postal_unit &&
                                                    state.postal_number &&
                                                    state.postal_street &&
                                                    state.postal_suburb &&
                                                    state.postal_state &&
                                                    state.postal_postcode &&
                                                    state.postal_country
                                                    ? state.postal_building_name +
                                                    "," +
                                                    state.postal_unit +
                                                    "," +
                                                    state.postal_number +
                                                    "," +
                                                    state.postal_street +
                                                    "," +
                                                    state.postal_suburb +
                                                    "," +
                                                    state.postal_state +
                                                    "," +
                                                    state.postal_postcode +
                                                    "," +
                                                    state.postal_country
                                                    : ""
                                                }
                                              />
                                              {!postalAddForm ? (
                                                <Button
                                                  color="secondary"
                                                  onClick={handlePostalAddForm}
                                                  className="d-flex justify-content-evenly align-items-center"
                                                >
                                                  Details{" "}
                                                  <i className="fa fa-solid fa-caret-down" />
                                                </Button>
                                              ) : (
                                                <Button
                                                  color="secondary"
                                                  onClick={handlePostalAddForm}
                                                  className="d-flex justify-content-evenly align-items-center"
                                                >
                                                  Close
                                                  <i className="fa-regular fa-circle-xmark" />
                                                </Button>
                                              )}
                                            </div>

                                            {postalAddForm && (
                                              <div className="bg-soft">
                                                <Row className="mt-3">
                                                  <Col md={2}>
                                                    <Label
                                                      for="building"
                                                      className="form-label"
                                                    >
                                                      Building Name
                                                    </Label>
                                                  </Col>

                                                  <Col md={6}>
                                                    <Field
                                                      name="postal_building_name"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.postal_building_name &&
                                                          touched.postal_building_name
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state.postal_building_name
                                                      }
                                                      onChange={
                                                        handlePropertyFormValues
                                                      }
                                                    />

                                                    <ErrorMessage
                                                      name="postal_building_name"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </Col>
                                                </Row>

                                                <Row className="mt-3">
                                                  <Col md={2}>
                                                    <Label
                                                      for="postal_unit"
                                                      className="form-label"
                                                    >
                                                      Unit
                                                    </Label>
                                                  </Col>

                                                  <Col md={6}>
                                                    <Field
                                                      name="postal_unit"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.postal_unit &&
                                                          touched.postal_unit
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={state.postal_unit}
                                                      onChange={
                                                        handlePropertyFormValues
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="postal_unit"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </Col>
                                                </Row>

                                                <Row className="mt-3">
                                                  <Col md={2}>
                                                    <Label
                                                      for="number"
                                                      className="form-label"
                                                    >
                                                      Number
                                                    </Label>
                                                  </Col>

                                                  <Col md={6}>
                                                    <Field
                                                      name="postal_number"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.postal_number &&
                                                          touched.postal_number
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state.postal_number
                                                      }
                                                      onChange={
                                                        handlePropertyFormValues
                                                      }
                                                    />
                                                  </Col>
                                                  <ErrorMessage
                                                    name="postal_number"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </Row>

                                                <Row className="mt-3">
                                                  <Col md={2}>
                                                    <Label
                                                      for="postal_street"
                                                      className="form-label"
                                                    >
                                                      Street
                                                    </Label>
                                                  </Col>

                                                  <Col md={6}>
                                                    <Field
                                                      name="postal_street"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.postal_street &&
                                                          touched.postal_street
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state.postal_street
                                                      }
                                                      onChange={
                                                        handlePropertyFormValues
                                                      }
                                                    />

                                                    <ErrorMessage
                                                      name="postal_street"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </Col>
                                                </Row>

                                                <Row className="mt-3">
                                                  <Col md={2}>
                                                    <Label
                                                      for="postal_suburb"
                                                      className="form-label"
                                                    >
                                                      Suburb
                                                    </Label>
                                                  </Col>

                                                  <Col md={6}>
                                                    <Field
                                                      name="postal_suburb"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.postal_suburb &&
                                                          touched.postal_suburb
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state.postal_suburb
                                                      }
                                                      onChange={
                                                        handlePropertyFormValues
                                                      }
                                                    />
                                                  </Col>

                                                  <ErrorMessage
                                                    name="postal_suburb"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </Row>

                                                <Row className="mt-3">
                                                  <Col md={2}>
                                                    <Label
                                                      for="postal_postcode"
                                                      className="form-label"
                                                    >
                                                      Postcode
                                                    </Label>
                                                  </Col>

                                                  <Col md={6}>
                                                    <Field
                                                      name="postal_postcode"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.postal_postcode &&
                                                          touched.postal_postcode
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state.postal_postcode
                                                      }
                                                      onChange={
                                                        handlePropertyFormValues
                                                      }
                                                    />
                                                  </Col>

                                                  <ErrorMessage
                                                    name="postal_postcode"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </Row>

                                                <Row className="mt-3">
                                                  <Col md={2}>
                                                    <Label
                                                      for="state"
                                                      className="form-label"
                                                    >
                                                      State
                                                    </Label>
                                                  </Col>

                                                  <Col md={6}>
                                                    <Field
                                                      name="postal_state"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.postal_state &&
                                                          touched.postal_state
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={state.postal_state}
                                                      onChange={
                                                        handlePropertyFormValues
                                                      }
                                                    />
                                                  </Col>

                                                  <ErrorMessage
                                                    name="postal_state"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </Row>

                                                <Row className="mt-3">
                                                  <Col md={2}>
                                                    <Label
                                                      for="postal_country"
                                                      className="form-label"
                                                    >
                                                      Country
                                                    </Label>
                                                  </Col>

                                                  <Col md={6}>
                                                    <Field
                                                      name="postal_country"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.postal_country &&
                                                          touched.postal_country
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state.postal_country
                                                      }
                                                      onChange={
                                                        handlePropertyFormValues
                                                      }
                                                    />
                                                  </Col>
                                                  <ErrorMessage
                                                    name="postal_country"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </Row>
                                              </div>
                                            )}
                                          </Col>
                                        </Row>

                                        <Row className="mt-3 justify-content-evenly align-items-start">
                                          <Col md={2}>
                                            <Label
                                              for="address"
                                              className="form-label"
                                            >
                                              Physical Address
                                            </Label>
                                          </Col>
                                          <Col md={8}>
                                            <div className="d-flex">
                                              {" "}
                                              <input
                                                name="physical_address"
                                                type="text"
                                                className={
                                                  "form-control" +
                                                  (errors.physical_address &&
                                                    touched.physical_address
                                                    ? " is-invalid"
                                                    : "")
                                                }
                                                value={
                                                  state.physical_building_name &&
                                                    state.physical_unit &&
                                                    state.physical_number &&
                                                    state.physical_street &&
                                                    state.physical_suburb &&
                                                    state.physical_state &&
                                                    state.physical_postcode &&
                                                    state.physical_country
                                                    ? state.physical_building_name +
                                                    "," +
                                                    state.physical_unit +
                                                    "," +
                                                    state.physical_number +
                                                    "," +
                                                    state.physical_street +
                                                    "," +
                                                    state.physical_suburb +
                                                    "," +
                                                    state.physical_state +
                                                    "," +
                                                    state.physical_postcode +
                                                    "," +
                                                    state.physical_country
                                                    : ""
                                                }
                                              />
                                              {!physicalAddForm ? (
                                                <Button
                                                  color="secondary"
                                                  onClick={
                                                    handlePhysicalAddForm
                                                  }
                                                  className="d-flex justify-content-evenly align-items-center"
                                                >
                                                  Details{" "}
                                                  <i className="fa fa-solid fa-caret-down" />
                                                </Button>
                                              ) : (
                                                <Button
                                                  color="secondary"
                                                  onClick={
                                                    handlePhysicalAddForm
                                                  }
                                                  className="d-flex justify-content-evenly align-items-center"
                                                >
                                                  Close
                                                  <i className="fa fa-light fa-xmark" />
                                                </Button>
                                              )}
                                            </div>

                                            {physicalAddForm && (
                                              <div>
                                                <Row className="my-3 mb-3">
                                                  <Col md={2}>
                                                    <Label
                                                      for="building"
                                                      className="form-label"
                                                    >
                                                      Building Name
                                                    </Label>
                                                  </Col>

                                                  <Col md={6}>
                                                    <Field
                                                      name="physical_building_name"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.physical_building_name &&
                                                          touched.physical_building_name
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state.physical_building_name
                                                      }
                                                      onChange={
                                                        handlePropertyFormValues
                                                      }
                                                    />

                                                    <ErrorMessage
                                                      name="physical_building_name"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </Col>
                                                </Row>

                                                <Row className="mt-2 mb-3">
                                                  <Col md={2}>
                                                    <Label
                                                      for="unit"
                                                      className="form-label"
                                                    >
                                                      Unit
                                                    </Label>
                                                  </Col>

                                                  <Col md={6}>
                                                    <Field
                                                      name="physical_unit"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.physical_unit &&
                                                          touched.physical_unit
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state.physical_unit
                                                      }
                                                      onChange={
                                                        handlePropertyFormValues
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="physical_unit"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </Col>
                                                </Row>

                                                <Row className="mt-3 mb-3">
                                                  <Col md={2}>
                                                    <Label
                                                      for="number"
                                                      className="form-label"
                                                    >
                                                      Number
                                                    </Label>
                                                  </Col>

                                                  <Col md={6}>
                                                    <Field
                                                      name="physical_number"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.physical_number &&
                                                          touched.physical_number
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state.physical_number
                                                      }
                                                      onChange={
                                                        handlePropertyFormValues
                                                      }
                                                    />
                                                  </Col>
                                                  <ErrorMessage
                                                    name="physical_number"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </Row>

                                                <Row className="mt-3 mb-3">
                                                  <Col md={2}>
                                                    <Label
                                                      for="physical_street"
                                                      className="form-label"
                                                    >
                                                      Street
                                                    </Label>
                                                  </Col>

                                                  <Col md={6}>
                                                    <Field
                                                      name="physical_street"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.physical_street &&
                                                          touched.physical_street
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state.physical_street
                                                      }
                                                      onChange={
                                                        handlePropertyFormValues
                                                      }
                                                    />

                                                    <ErrorMessage
                                                      name="physical_street"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </Col>
                                                </Row>

                                                <Row className="mt-3 mb-3">
                                                  <Col md={2}>
                                                    <Label
                                                      for="suburb"
                                                      className="form-label"
                                                    >
                                                      Suburb
                                                    </Label>
                                                  </Col>

                                                  <Col md={6}>
                                                    <Field
                                                      name="physical_suburb"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.physical_suburb &&
                                                          touched.physical_suburb
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state.physical_suburb
                                                      }
                                                      onChange={
                                                        handlePropertyFormValues
                                                      }
                                                    />
                                                  </Col>

                                                  <ErrorMessage
                                                    name="physical_suburb"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </Row>

                                                <Row className="mt-3 mb-3">
                                                  <Col md={2}>
                                                    <Label
                                                      for="postcode"
                                                      className="form-label"
                                                    >
                                                      Postcode
                                                    </Label>
                                                  </Col>

                                                  <Col md={6}>
                                                    <Field
                                                      name="physical_postcode"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.physical_postcode &&
                                                          touched.physical_postcode
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state.physical_postcode
                                                      }
                                                      onChange={
                                                        handlePropertyFormValues
                                                      }
                                                    />
                                                  </Col>

                                                  <ErrorMessage
                                                    name="physical_postcode"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </Row>

                                                <Row className="mt-3 mb-3">
                                                  <Col md={2}>
                                                    <Label
                                                      for="state"
                                                      className="form-label"
                                                    >
                                                      State
                                                    </Label>
                                                  </Col>

                                                  <Col md={6}>
                                                    <Field
                                                      name="physical_state"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.physical_state &&
                                                          touched.physical_state
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state.physical_state
                                                      }
                                                      onChange={
                                                        handlePropertyFormValues
                                                      }
                                                    />
                                                  </Col>

                                                  <ErrorMessage
                                                    name="physical_state"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </Row>

                                                <Row className="mt-3 mb-3">
                                                  <Col md={2}>
                                                    <Label
                                                      for="country"
                                                      className="form-label"
                                                    >
                                                      Country
                                                    </Label>
                                                  </Col>

                                                  <Col md={6}>
                                                    <Field
                                                      name="physical_country"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        (errors.physical_country &&
                                                          touched.physical_country
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state.physical_country
                                                      }
                                                      onChange={
                                                        handlePropertyFormValues
                                                      }
                                                    />
                                                  </Col>
                                                  <ErrorMessage
                                                    name="physical_country"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </Row>
                                              </div>
                                            )}
                                          </Col>
                                        </Row>
                                        <Row className="mt-3 justify-content-evenly align-items-start g-4">
                                          <Col md={2}>
                                            {" "}
                                            <Label
                                              for="building"
                                              className="form-label ps-2"
                                            >
                                              Communication
                                            </Label>
                                          </Col>
                                          <Col md={8} className="ms-4">
                                            <div className="form-check mb-3">
                                              <Label
                                                for="defaultCheck1"
                                                className="form-check-label"
                                              >
                                                Print statements and notices for
                                                this person
                                              </Label>
                                              <Field
                                                name="communication"
                                                type="checkbox"
                                                className="form-check-input"
                                                value="print"
                                                id="defaultCheck1"
                                              />
                                            </div>
                                            <div className="form-check mb-3">
                                              <Label
                                                for="defaultCheck2"
                                                className="form-check-label"
                                              >
                                                Send email communications to
                                                this person
                                              </Label>
                                              <Field
                                                name="communication"
                                                type="checkbox"
                                                className="form-check-input"
                                                value="Email"
                                                id="defaultCheck2"
                                              />
                                            </div>
                                            <div className="form-check mb-3">
                                              <Label
                                                for="defaultCheck3"
                                                className="form-check-label"
                                              >
                                                Send SMS communications to this
                                                person
                                              </Label>
                                              <Field
                                                name="communication"
                                                type="checkbox"
                                                className="form-check-input"
                                                value="SMS"
                                                id="defaultCheck3"
                                              />
                                            </div>
                                            <Button color="danger">
                                              Delete Person
                                            </Button>
                                          </Col>
                                        </Row>
                                      </div>
                                      <CardTitle className="text-primary mb-3">
                                        Commercial
                                        <div className="w-25 mb-2 border-bottom border-primary"></div>
                                      </CardTitle>
                                      <div className="border-bottom"></div>
                                      <div className="mb-3 w-75">
                                        <Row>
                                          <Col md={2}>
                                            <Label
                                              for="abn"
                                              className="form-label"
                                            >
                                              ABN
                                            </Label>
                                          </Col>

                                          <Col md={8}>
                                            <Field
                                              name="abn"
                                              type="text"
                                              value={state.abn}
                                              className={
                                                "form-control" +
                                                (errors.abn && touched.abn
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              onChange={
                                                handlePropertyFormValues
                                              }
                                            />
                                            <ErrorMessage
                                              name="abn"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                        </Row>
                                      </div>
                                      <CardTitle className="text-primary mb-3">
                                        Notes
                                        <div className="w-25 mb-3 border-bottom border-primary"></div>
                                      </CardTitle>{" "}
                                      <div className="mb-3 w-75">
                                        <Row>
                                          <Col md={2}>
                                            <Label
                                              for="notes"
                                              className="form-label"
                                            >
                                              Notes
                                            </Label>
                                          </Col>

                                          <Col md={8}>
                                            <Field
                                              name="notes"
                                              type="text"
                                              value={state.notes}
                                              className={
                                                "form-control" +
                                                (errors.notes && touched.notes
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              onChange={
                                                handlePropertyFormValues
                                              }
                                            />
                                            <ErrorMessage
                                              name="notes"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                        </Row>
                                      </div>
                                    </div>
                                    <div className="w-100 mb-2 border-top border-primary"></div>
                                  </Form>
                                </div>
                              </div>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId={2}>
              <Row>
                <Col sm={12}>
                  {" "}
                  <Row>
                    <Col md={12}>
                      <div className="d-flex flex-column justify-content-start">
                        <div className="py-2 ps-3">
                          <div>
                            <div className="mb-3">
                              {/* {props.error ? (
                                <Alert color="danger">
                                  {JSON.stringify(props.error.response.data.message)}
                                </Alert>
                              ) : null} */}
                              <Formik
                                enableReinitialize={true}
                                initialValues={{
                                  total_money:
                                    (state2 && state2.total_money) || "",
                                  balance: (state2 && state2.balance) || "",
                                  regular_intervals:
                                    (state2 && state2.regular_intervals) || "",
                                  next_disburse_date:
                                    (state2 && state2.next_disburse_date) || "",
                                  withhold_amount:
                                    (state2 && state2.withhold_amount) || "",
                                  withold_reason:
                                    (state2 && state2.withold_reason) || "",
                                  agreement_start:
                                    (state2 && state2.agreement_start) || "",
                                  gained_reason:
                                    (state2 && state2.gained_reason) || "",
                                  comment: (state2 && state2.comment) || "",
                                  agreement_end:
                                    (state2 && state2.agreement_end) || "",
                                  owner_access:
                                    (state2 && state2.owner_access) || "",
                                }}
                                validationSchema={Yup.object().shape({
                                  total_money: Yup.string().required(
                                    "Please Enter total money"
                                  ),
                                  balance: Yup.string().required(
                                    "Please Enter balance"
                                  ),
                                  regular_intervals: Yup.string().required(
                                    "Please Enter regular intervals"
                                  ),
                                  next_disburse_date: Yup.string().required(
                                    "Please Enter next disburse date"
                                  ),
                                  withhold_amount: Yup.string().required(
                                    "Please Enter withhold amount"
                                  ),
                                  withold_reason: Yup.string().required(
                                    "Please Enter withhold reason"
                                  ),
                                  agreement_start: Yup.string().required(
                                    "Please Enter agreement start date"
                                  ),
                                  gained_reason: Yup.string().required(
                                    "Please Enter gained reason"
                                  ),
                                  comment: Yup.string().required(
                                    "Please Enter comment"
                                  ),
                                  agreement_end: Yup.string().required(
                                    "Please Enter agreement end date"
                                  ),
                                })}
                                onSubmit={(values, onSubmitProps) => {
                                  setState2(values);
                                  props.addOwner(state, id, state2);
                                  props.propertyOwnerInfoFresh();
                                  // toggleTab(tabState.activeTab + 1);
                                  // setFormSubmitBtnState(formSubmitBtnState+1);
                                  history.push("/propertyInfo/" + id, {
                                    id: id,
                                  });
                                }}
                              >
                                {({ errors, status, touched }) => (
                                  <div>
                                    <Form
                                      className="form-horizontal"
                                      id="owner-form-2"
                                    >
                                      <div
                                        style={{ height: "60vh" }}
                                        className="overflow-auto w-100"
                                      >
                                        <div className="mb-3 w-75">
                                          <CardTitle className="mb-2">
                                            <h3 className="text-primary">
                                              Disburse
                                            </h3>
                                          </CardTitle>
                                          <div className="w-25 border-bottom border-primary" />
                                          <Row>
                                            <Col md={10}>
                                              <div className="d-flex justify-content-center align-items-center my-3">
                                                <p className="text-muted">
                                                  A new folio will be created
                                                  for this property
                                                </p>
                                              </div>
                                              <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                <Col md={4}>
                                                  <Label
                                                    for="building"
                                                    className="form-label"
                                                  >
                                                    When should this folio be
                                                    disbursed?
                                                  </Label>
                                                </Col>

                                                <Col md={8}>
                                                  <Row className="d-flex mb-2">
                                                    <Col md={5}>
                                                      <p>
                                                        {" "}
                                                        When total money in is
                                                      </p>
                                                    </Col>
                                                    <Col md={3}>
                                                      {" "}
                                                      <Field
                                                        name="total_money"
                                                        type="number"
                                                        placeholder="0.00৳"
                                                        className={
                                                          "form-control" +
                                                          (errors.total_money &&
                                                            touched.total_money
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        value={
                                                          state2.total_money
                                                        }
                                                        onChange={
                                                          handlePropertyFormValues2
                                                        }
                                                      />
                                                      <ErrorMessage
                                                        name="total_money"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Col>
                                                    <Col md={3}>
                                                      <p>or more</p>
                                                    </Col>
                                                  </Row>
                                                  <Row className="d-flex mb-2">
                                                    <Col md={5}>
                                                      <p> When balance is</p>
                                                    </Col>
                                                    <Col md={3}>
                                                      {" "}
                                                      <Field
                                                        name="balance"
                                                        type="number"
                                                        placeholder="0.00৳"
                                                        className={
                                                          "form-control" +
                                                          (errors.balance &&
                                                            touched.balance
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        value={state2.balance}
                                                        onChange={
                                                          handlePropertyFormValues2
                                                        }
                                                      />
                                                      <ErrorMessage
                                                        name="balance"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Col>
                                                    <Col md={3}>
                                                      <p>or more</p>
                                                    </Col>
                                                  </Row>
                                                  <Row className="d-flex">
                                                    <Col className="d-flex">
                                                      <i className="fa fa-solid fa-check text-success" />
                                                      <p>
                                                        {" "}
                                                        At regular intervals
                                                      </p>
                                                    </Col>
                                                    <Col>
                                                      <div className="mb-3 select2-container">
                                                        <Select
                                                          value={selectedGroup2}
                                                          onChange={
                                                            handleSelectGroup2
                                                          }
                                                          options={optionGroup2}
                                                          className={
                                                            "form-select" +
                                                            (errors.regular_intervals &&
                                                              touched.regular_intervals
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          name="regular_intervals"
                                                        />{" "}
                                                        <ErrorMessage
                                                          name="regular_intervals"
                                                          component="div"
                                                          className="invalid-feedback"
                                                        />
                                                      </div>
                                                    </Col>
                                                  </Row>
                                                  <Row>
                                                    <Col>
                                                      <p>Next disburse date</p>
                                                    </Col>
                                                    <Col>
                                                      <div className="mb-3 row">
                                                        <div className="col-md-10">
                                                          <Field
                                                            name="next_disburse_date"
                                                            type="date"
                                                            className={
                                                              "form-control" +
                                                              (errors.next_disburse_date &&
                                                                touched.next_disburse_date
                                                                ? " is-invalid"
                                                                : "")
                                                            }
                                                            value={
                                                              state2.next_disburse_date
                                                            }
                                                            onChange={
                                                              handlePropertyFormValues2
                                                            }
                                                          />
                                                          <ErrorMessage
                                                            name="next_disburse_date"
                                                            component="div"
                                                            className="invalid-feedback"
                                                          />
                                                        </div>
                                                      </div>
                                                    </Col>
                                                  </Row>
                                                </Col>
                                              </Row>
                                              <CardTitle className="mb-2">
                                                <h3 className="text-primary">
                                                  Withhold
                                                </h3>
                                              </CardTitle>
                                              <div className="w-25 border-bottom border-primary" />
                                              <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                <Col md={4}>
                                                  <Label
                                                    for="building"
                                                    className="form-label"
                                                  >
                                                    Withhold amount
                                                  </Label>
                                                </Col>

                                                <Col md={8}>
                                                  <Row className="d-flex">
                                                    <Col>
                                                      {" "}
                                                      <Field
                                                        name="withhold_amount"
                                                        type="text"
                                                        placeholder="0.00৳"
                                                        className={
                                                          "form-control" +
                                                          (errors.withhold_amount &&
                                                            touched.withhold_amount
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        value={
                                                          state2.withhold_amount
                                                        }
                                                        onChange={
                                                          handlePropertyFormValues2
                                                        }
                                                      />
                                                      <ErrorMessage
                                                        name="withhold_amount"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Col>
                                                    <Col></Col>

                                                    <Col></Col>
                                                  </Row>
                                                  <p className="text-muted">
                                                    {" "}
                                                    At the time of disbursement,
                                                    this amount will be
                                                    discounted from the funds
                                                    disbursed to the owner and
                                                    withheld. If there is less
                                                    than this amount available
                                                    to be disbursed no funds
                                                    will be disbursed and the
                                                    amount will stay in the
                                                    owner folio.
                                                  </p>
                                                </Col>
                                              </Row>
                                              <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                <Col md={4}>
                                                  <Label
                                                    for="building"
                                                    className="form-label"
                                                  >
                                                    Withhold reason
                                                  </Label>
                                                </Col>

                                                <Col md={8}>
                                                  <Row className="d-flex">
                                                    <Col>
                                                      {" "}
                                                      <Field
                                                        name="withold_reason"
                                                        type="text"
                                                        className={
                                                          "form-control" +
                                                          (errors.withold_reason &&
                                                            touched.withold_reason
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        value={
                                                          state2.withold_reason
                                                        }
                                                        onChange={
                                                          handlePropertyFormValues2
                                                        }
                                                      />
                                                      <ErrorMessage
                                                        name="withold_reason"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Col>
                                                  </Row>
                                                </Col>
                                              </Row>
                                              <CardTitle className="mb-2">
                                                <h3 className="text-primary">
                                                  Agreement
                                                </h3>
                                              </CardTitle>
                                              <div className="w-25 border-bottom border-primary" />

                                              <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                <Col md={4}>
                                                  <Label
                                                    for="building"
                                                    className="form-label"
                                                  >
                                                    Agreement start
                                                  </Label>
                                                </Col>

                                                <Col md={8}>
                                                  <Row className="d-flex">
                                                    <Col>
                                                      <div className="mb-3 row">
                                                        <div className="col-md-10">
                                                          <Field
                                                            name="agreement_start"
                                                            type="date"
                                                            className={
                                                              "form-control" +
                                                              (errors.agreement_start &&
                                                                touched.agreement_start
                                                                ? " is-invalid"
                                                                : "")
                                                            }
                                                            value={
                                                              state2.agreement_start
                                                            }
                                                            onChange={
                                                              handlePropertyFormValues2
                                                            }
                                                          />
                                                          <ErrorMessage
                                                            name="agreement_start"
                                                            component="div"
                                                            className="invalid-feedback"
                                                          />
                                                        </div>
                                                      </div>
                                                    </Col>
                                                    <Col></Col>
                                                    <Col></Col>
                                                  </Row>
                                                </Col>
                                              </Row>
                                              <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                <Col md={4}>
                                                  <Label
                                                    for="building"
                                                    className="form-label"
                                                  >
                                                    Gained reason
                                                  </Label>
                                                </Col>

                                                <Col md={8}>
                                                  <Row className="d-flex">
                                                    <Col>
                                                      <div>
                                                        <div className="mb-3 select2-container">
                                                          <Select
                                                            value={
                                                              selectedGroup3
                                                            }
                                                            onChange={
                                                              handleSelectGroup3
                                                            }
                                                            options={
                                                              optionGroup3
                                                            }
                                                            className={
                                                              "form-select" +
                                                              (errors.gained_reason &&
                                                                touched.gained_reason
                                                                ? " is-invalid"
                                                                : "")
                                                            }
                                                            name="gained_reason"
                                                          />
                                                          <ErrorMessage
                                                            name="gained_reason"
                                                            component="div"
                                                            className="invalid-feedback"
                                                          />
                                                        </div>
                                                      </div>
                                                    </Col>
                                                  </Row>
                                                </Col>
                                              </Row>

                                              <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                <Col md={4}>
                                                  <Label
                                                    for="building"
                                                    className="form-label"
                                                  >
                                                    Comment (gained)
                                                  </Label>
                                                </Col>

                                                <Col md={8}>
                                                  <Row className="d-flex">
                                                    <Col>
                                                      <Field
                                                        name="comment"
                                                        type="text"
                                                        className={
                                                          "form-control" +
                                                          (errors.comment &&
                                                            touched.comment
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        value={state2.comment}
                                                        onChange={
                                                          handlePropertyFormValues2
                                                        }
                                                      />
                                                      <ErrorMessage
                                                        name="comment"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Col>
                                                  </Row>
                                                </Col>
                                              </Row>
                                              <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                <Col md={4}>
                                                  <Label
                                                    for="building"
                                                    className="form-label"
                                                  >
                                                    Agreement ends
                                                  </Label>
                                                </Col>

                                                <Col md={8}>
                                                  <Row className="d-flex">
                                                    <Col>
                                                      <div className="mb-3 row">
                                                        <div className="col-md-10">
                                                          <Field
                                                            name="agreement_end"
                                                            type="date"
                                                            className={
                                                              "form-control" +
                                                              (errors.agreement_end &&
                                                                touched.agreement_end
                                                                ? " is-invalid"
                                                                : "")
                                                            }
                                                            value={
                                                              state2.agreement_end
                                                            }
                                                            onChange={
                                                              handlePropertyFormValues2
                                                            }
                                                          />
                                                          <ErrorMessage
                                                            name="agreement_end"
                                                            component="div"
                                                            className="invalid-feedback"
                                                          />
                                                        </div>
                                                      </div>
                                                    </Col>
                                                    <Col></Col>
                                                    <Col></Col>
                                                  </Row>
                                                </Col>
                                              </Row>

                                              <CardTitle className="mb-2">
                                                <h3 className="text-primary">
                                                  Client Access
                                                </h3>
                                              </CardTitle>
                                              <div className="w-25 border-bottom border-primary" />
                                              <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                <Col md={4}>
                                                  <Label
                                                    for="building"
                                                    className="form-label"
                                                  >
                                                    Owner Access
                                                  </Label>
                                                </Col>

                                                <Col md={8}>
                                                  <Row className="d-flex">
                                                    <Col>
                                                      <div className="btn-group btn-group-justified">
                                                        <div className="btn-group">
                                                          <Button
                                                            className="d-flex align-items-center"
                                                            color={
                                                              inspectionEnableBtn
                                                                ? "secondary"
                                                                : "light"
                                                            }
                                                            onClick={
                                                              toggleInspectionEnableBtn
                                                            }
                                                          >
                                                            {inspectionEnableBtn ? (
                                                              <i className="bx bx-comment-check"></i>
                                                            ) : null}
                                                            <span> Enable</span>
                                                          </Button>
                                                        </div>
                                                        <div className="btn-group">
                                                          <Button
                                                            className="d-flex align-items-center"
                                                            color={
                                                              inspectionDisableBtn
                                                                ? "secondary"
                                                                : "light"
                                                            }
                                                            onClick={
                                                              toggleInspectionDisableBtn
                                                            }
                                                          >
                                                            {inspectionDisableBtn ? (
                                                              <i className="bx bx-comment-check"></i>
                                                            ) : null}
                                                            <span>
                                                              {" "}
                                                              Disable
                                                            </span>
                                                          </Button>
                                                        </div>
                                                      </div>
                                                    </Col>
                                                    <Col></Col>
                                                  </Row>
                                                </Col>
                                              </Row>
                                            </Col>
                                          </Row>
                                        </div>
                                      </div>
                                      <div className="w-100 mb-2 border-top border-primary"></div>
                                    </Form>
                                  </div>
                                )}
                              </Formik>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId={3}>
              {/* <div>
                <Row>
                  <Col xs="12">
                    <Card>
                      <CardBody>
                        <CardTitle className="mb-4">
                          Folio - Alif Borhan - aa (OWN00016)
                        </CardTitle>
                        <table style={{ width: "100%" }}>
                          <tbody>
                            {rows.map((item, idx) => (
                              <tr id={"addr" + idx} key={idx}>
                                <td>
                                  <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                      temp_fee1:
                                        (state3 && state3.temp_fee1) || "",
                                      temp_fee1_amount:
                                        (state3 && state3.temp_fee1_amount) ||
                                        "",
                                    }}
                                    validationSchema={Yup.object().shape({
                                      temp_fee1: Yup.string().required(
                                        "Please Enter admin fee"
                                      ),
                                      temp_fee1_amount: Yup.string().required(
                                        "Please Enter admin fee amount"
                                      ),
                                    })}
                                    onSubmit={(values, onSubmitProps) => {
                                      console.log(values);
                                      setState3(values);
                                      toggleTab(tabState.activeTab + 1);
                                      setFormSubmitBtnState(formSubmitBtnState+1);
                                    }}
                                  >
                                    {({ errors, status, touched }) => (
                                      <div>
                                        <Form
                                          className="repeater mt-3"
                                          encType="multipart/form-data"
                                          id="owner-form-"
                                        >
                                          <div data-repeater-list="group-a">
                                            <Row data-repeater-item>
                                              <Col lg="2" className="mb-3">
                                                <Label htmlFor="name">
                                                  Fee Template
                                                </Label>
                                                <div>
                                                  <div className="mb-3 select2-container">
                                                    
                                                    <Select
                                                      value={selectedGroup4}
                                                      onChange={
                                                        handleSelectGroup4
                                                      }
                                                      options={optionGroup4}
                                                      classNamePrefix="select2-selection"
                                                    />
                                                    <ErrorMessage
                                                      name="gained_reason"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </div>
                                                </div>
                                              </Col>

                                              <Col lg="2" className="mb-3">
                                                <Label htmlFor="email">
                                                  Income account
                                                </Label>
                                                {tableInfoShow && (
                                                  <p>
                                                    Administration fee (inc.
                                                    tax)
                                                  </p>
                                                )}
                                              </Col>

                                              <Col lg="2" className="mb-3">
                                                <Label htmlFor="subject">
                                                  Fee trigger
                                                </Label>
                                                {tableInfoShow && (
                                                  <p>Each statement period</p>
                                                )}
                                              </Col>

                                              <Col lg="2" className="mb-3">
                                                <Label htmlFor="resume">
                                                  Notes
                                                </Label>
                                                <p></p>
                                              </Col>

                                              <Col
                                                lg="2"
                                                className="mb-3 d-flex flex-column align-items-center"
                                              >
                                                <Label htmlFor="message">
                                                  Amount
                                                </Label>
                                                {tableInfoShow && (
                                                  <>
                                                    <Field
                                                      name="temp_fee1_amount"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        "w-50" +
                                                        (errors.temp_fee1_amount &&
                                                        touched.temp_fee1_amount
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state3.temp_fee1_amount
                                                      }
                                                      onChange={
                                                        handlePropertyFormValues3
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="temp_fee1_amount"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </>
                                                )}
                                              </Col>
                                              <Col
                                                lg="2"
                                                className="form-group align-self-center"
                                              >
                                                <Button
                                                  onClick={e =>
                                                    handleRemoveRow(e, idx)
                                                  }
                                                  color="danger"
                                                  className="mt-3"
                                                  style={{ width: "100%" }}
                                                >
                                                  Delete
                                                </Button>
                                              </Col>
                                            </Row>
                                          </div>
                                        </Form>
                                      </div>
                                    )}
                                  </Formik>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="d-flex justify-content-end">
                          {" "}
                          <Button
                            onClick={handleAddRow}
                            color="secondary"
                            className="mt-3 mt-lg-0"
                          >
                            Add{" "}
                          </Button>{" "}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col xs="12">
                    <Card>
                      <CardBody>
                        <table style={{ width: "100%" }}>
                          <tbody>
                            {rows2.map((item, idx) => (
                              <tr id={"addr" + idx} key={idx}>
                                <td>
                                  <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                      temp_fee2:
                                        (state3 && state3.temp_fee2) || "",
                                      temp_fee2_amount:
                                        (state3 && state3.temp_fee2_amount) ||
                                        "",
                                    }}
                                    validationSchema={Yup.object().shape({
                                      temp_fee2: Yup.string().required(
                                        "Please Enter admin fee"
                                      ),
                                      temp_fee2_amount: Yup.string().required(
                                        "Please Enter admin fee amount"
                                      ),
                                    })}
                                    onSubmit={(values, onSubmitProps) => {
                                      console.log(values);
                                      
                                    }}
                                  >
                                    {({ errors, status, touched }) => (
                                      <div>
                                        <Form
                                          className="repeater mt-3"
                                          encType="multipart/form-data"
                                        >
                                          <div data-repeater-list="group-a">
                                            <Row data-repeater-item>
                                              <Col lg="2" className="mb-3">
                                                <Label htmlFor="name">
                                                  Fee Template
                                                </Label>
                                                <div>
                                                  <div className="mb-3 select2-container">
                                                    
                                                    <Select
                                                      value={selectedGroup5}
                                                      onChange={
                                                        handleSelectGroup5
                                                      }
                                                      options={optionGroup5}
                                                      classNamePrefix="select2-selection"
                                                    />
                                                    <ErrorMessage
                                                      name="gained_reason"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </div>
                                                </div>
                                              </Col>

                                              <Col lg="2" className="mb-3">
                                                <Label htmlFor="email">
                                                  Income account
                                                </Label>
                                                {tableInfoShow2 && (
                                                  <p>
                                                    Commercial Management fee
                                                    (inc. tax)
                                                  </p>
                                                )}
                                              </Col>

                                              <Col lg="2" className="mb-3">
                                                <Label htmlFor="subject">
                                                  Fee trigger
                                                </Label>
                                                {tableInfoShow2 && (
                                                  <p>Rental receipt</p>
                                                )}
                                              </Col>

                                              <Col lg="2" className="mb-3">
                                                <Label htmlFor="resume">
                                                  Notes
                                                </Label>
                                                <p></p>
                                              </Col>

                                              <Col
                                                lg="2"
                                                className="mb-3 d-flex flex-column align-items-center"
                                              >
                                                <Label htmlFor="message">
                                                  Amount
                                                </Label>
                                                {tableInfoShow2 && (
                                                  <>
                                                    <Field
                                                      name="temp_fee2_amount"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        "w-50" +
                                                        (errors.temp_fee2_amount &&
                                                        touched.temp_fee2_amount
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state3.temp_fee2_amount
                                                      }
                                                      onChange={
                                                        handlePropertyFormValues3
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="temp_fee2_amount"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </>
                                                )}
                                              </Col>
                                              <Col
                                                lg="2"
                                                className="form-group align-self-center"
                                              >
                                                <Button
                                                  onClick={e =>
                                                    handleRemoveRow2(e, idx)
                                                  }
                                                  color="danger"
                                                  className="mt-3"
                                                  style={{ width: "100%" }}
                                                >
                                                  Delete
                                                </Button>
                                              </Col>
                                            </Row>
                                          </div>
                                        </Form>
                                      </div>
                                    )}
                                  </Formik>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="d-flex justify-content-end">
                          {" "}
                          <Button
                            onClick={handleAddRow2}
                            color="secondary"
                            className="mt-3 mt-lg-0"
                          >
                            Add{" "}
                          </Button>{" "}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div> */}
            </TabPane>
            <TabPane tabId={4}>
              {/* <Row>
                <Col xs="12">
                  <div>
                    <div>
                      <CardTitle className="mb-4">
                        Folio - Alif Borhan - aa (OWN00016)
                      </CardTitle>
                      <table style={{ width: "100%" }}>
                        <tbody>
                          {rows3.map((item, idx) => (
                            <tr id={"addr" + idx} key={idx}>
                              <td>
                                <Formik
                                  enableReinitialize={true}
                                  initialValues={{
                                    method: (state4 && state4.method) || "",
                                    payee: (state4 && state4.payee) || "",
                                    bsb: (state4 && state4.bsb) || "",
                                    account: (state4 && state4.account) || "",
                                  }}
                                  validationSchema={Yup.object().shape({
                                    method: Yup.string().required(
                                      "Please Enter method"
                                    ),
                                    payee:
                                      Yup.string().required(
                                        "Please Enter payee"
                                      ),
                                    bsb: Yup.string().required(
                                      "Please Enter bsb"
                                    ),
                                    account: Yup.string().required(
                                      "Please Enter account"
                                    ),
                                  })}
                                  onSubmit={(values, onSubmitProps) => {
                                    console.log(values);
                                    //   dispatch(addContact(values));
                                    //   onSubmitProps.resetForm();
                                  }}
                                >
                                  {({ errors, status, touched }) => (
                                    <div>
                                      <Form
                                        className="repeater mt-3"
                                        encType="multipart/form-data"
                                      >
                                        <div data-repeater-list="group-a">
                                          <Row data-repeater-item>
                                            <Col lg="2" className="mb-3">
                                              <Label htmlFor="name">
                                                Method
                                              </Label>
                                              <div>
                                                <div className="mb-3 select2-container">
                                                  
                                                  <Select
                                                    value={selectedGroup6}
                                                    onChange={
                                                      handleSelectGroup6
                                                    }
                                                    options={optionGroup6}
                                                    classNamePrefix="select2-selection"
                                                  />
                                                  <ErrorMessage
                                                    name="gained_reason"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </div>
                                              </div>
                                            </Col>

                                            <Col lg="2" className="mb-3">
                                              <Label htmlFor="email">
                                                Payee
                                              </Label>
                                              {tableInfoShow3 &&
                                                selectedGroup6 === "None" && (
                                                  <p></p>
                                                )}
                                              {tableInfoShow3 &&
                                                selectedGroup6 === "Check" && (
                                                  <>
                                                    <Field
                                                      name="payee"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        "w-50" +
                                                        (errors.payee &&
                                                        touched.payee
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={state3.payee}
                                                      onChange={
                                                        handlePropertyFormValues4
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="payee"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </>
                                                )}
                                              {tableInfoShow3 &&
                                                selectedGroup6 === "EFT" && (
                                                  <>
                                                    <Field
                                                      name="payee"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        "w-50" +
                                                        (errors.payee &&
                                                        touched.payee
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={state3.payee}
                                                      onChange={
                                                        handlePropertyFormValues4
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="payee"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </>
                                                )}
                                            </Col>

                                            <Col lg="2" className="mb-3">
                                              <Label htmlFor="subject">
                                                BSB
                                              </Label>
                                              {tableInfoShow3 &&
                                                selectedGroup6 === "none" && (
                                                  <p></p>
                                                )}
                                              {tableInfoShow3 &&
                                                selectedGroup6 === "Check" && (
                                                  <></>
                                                )}
                                              {tableInfoShow3 &&
                                                selectedGroup6 === "EFT" && (
                                                  <>
                                                    <Field
                                                      name="bsb"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        "w-50" +
                                                        (errors.bsb &&
                                                        touched.bsb
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={state3.bsb}
                                                      onChange={
                                                        handlePropertyFormValues4
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="bsb"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </>
                                                )}
                                            </Col>

                                            <Col lg="2" className="mb-3">
                                              <Label htmlFor="resume">
                                                Account#
                                              </Label>
                                              {tableInfoShow3 &&
                                                selectedGroup6 === "none" && (
                                                  <p></p>
                                                )}
                                              {tableInfoShow3 &&
                                                selectedGroup6 === "Check" && (
                                                  <></>
                                                )}
                                              {tableInfoShow3 &&
                                                selectedGroup6 === "EFT" && (
                                                  <>
                                                    <Field
                                                      name="account"
                                                      type="text"
                                                      className={
                                                        "form-control" +
                                                        "w-50" +
                                                        (errors.account &&
                                                        touched.account
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={state3.account}
                                                      onChange={
                                                        handlePropertyFormValues4
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="account"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </>
                                                )}
                                            </Col>

                                            <Col
                                              lg="2"
                                              className="mb-3 d-flex flex-column align-items-center"
                                            >
                                              <Label htmlFor="message">
                                                Split
                                              </Label>
                                              {tableInfoShow3 &&
                                                selectedGroup6 === "EFT" && (
                                                  <>
                                                    <Row className="d-flex flex-column">
                                                      <Col md={3}>
                                                        <div className="btn-group btn-group-justified">
                                                          <div className="btn-group">
                                                            <Button
                                                              className="d-flex align-items-center"
                                                              color={
                                                                splitEnableBtn
                                                                  ? "secondary"
                                                                  : "light"
                                                              }
                                                              onClick={
                                                                toggleSplitEnableBtn
                                                              }
                                                            >
                                                              {splitEnableBtn ? (
                                                                <i className="bx bx-comment-check"></i>
                                                              ) : null}
                                                              <span> $</span>
                                                            </Button>
                                                          </div>
                                                          <div className="btn-group">
                                                            <Button
                                                              className="d-flex align-items-center"
                                                              color={
                                                                splitDisableBtn
                                                                  ? "secondary"
                                                                  : "light"
                                                              }
                                                              onClick={
                                                                toggleSplitDisableBtn
                                                              }
                                                            >
                                                              {splitDisableBtn ? (
                                                                <i className="bx bx-comment-check"></i>
                                                              ) : null}
                                                              <span> %</span>
                                                            </Button>
                                                          </div>
                                                        </div>
                                                      </Col>
                                                      <Col md={3}>
                                                        <Field
                                                          name="bsb"
                                                          type="text"
                                                          placeholder="100%"
                                                          className={
                                                            "form-control" +
                                                            "w-50" +
                                                            (errors.bsb &&
                                                            touched.bsb
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={state3.bsb}
                                                          onChange={
                                                            handlePropertyFormValues4
                                                          }
                                                          disabled={true}
                                                        />
                                                        <ErrorMessage
                                                          name="bsb"
                                                          component="div"
                                                          className="invalid-feedback"
                                                        />
                                                      </Col>
                                                    </Row>
                                                  </>
                                                )}
                                            </Col>
                                            <Col
                                              lg="2"
                                              className="form-group align-self-center"
                                            >
                                              <Button
                                                onClick={e =>
                                                  handleRemoveRow3(e, idx)
                                                }
                                                color="danger"
                                                className="mt-3"
                                                style={{ width: "50%" }}
                                              >
                                                Remove
                                              </Button>
                                            </Col>
                                          </Row>
                                        </div>
                                      </Form>
                                    </div>
                                  )}
                                </Formik>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="d-flex justify-content-end">
                        {" "}
                        <Button
                          onClick={handleAddRow3}
                          color="secondary"
                          className="mt-3 mt-lg-0"
                        >
                          Add{" "}
                        </Button>{" "}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row> */}
            </TabPane>
          </TabContent>
        </div>
        <div className="actions clearfix">
          <ul>
            <li
              className={
                tabState.activeTab === 1 ? "previous disabled" : "previous"
              }
            >
              <Link
                to="#"
                onClick={() => {
                  toggleTab(tabState.activeTab - 1);
                  setFormSubmitBtnState(formSubmitBtnState - 1);
                }}
              >
                Previous
              </Link>
            </li>
            <li className={tabState.activeTab === 4 ? "next disabled" : "next"}>
              <button
                type="submit"
                form={"owner-form-" + formSubmitBtnState}
                className="btn btn-info"
              >
                Save & Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = gstate => {
  const {
    contacts_list_data,
    contacts_list_error,
    contacts_list_loading,

    contacts_add_loading,

    user_list_data,
    user_list_error,
    user_list_loading,
  } = gstate.Contacts2;
  const { property_owner_add_loading } = gstate.property;
  return {
    contacts_list_data,
    contacts_list_error,
    contacts_list_loading,

    contacts_add_loading,

    user_list_data,
    user_list_error,
    user_list_loading,

    property_owner_add_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addOwner,
    propertyOwnerInfoFresh,
  })(EditPropertyOwnerAdd)
);
