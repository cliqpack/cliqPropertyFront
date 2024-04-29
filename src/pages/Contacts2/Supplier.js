import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
// import Autocomplete from "react-google-autocomplete";
import {
  Card,
  Alert,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Label,
  Modal,
  Input,
  Button,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

//common
// import TextualInputs from "./TextualInputs"
import { addContact, contactList, showContactFresh } from "../../store/Contacts2/actions";

import { Link, useHistory, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { propTypes } from "react-bootstrap-editable";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Supplier = props => {
  const history = useHistory();
  const [state, setState] = useState({});
  const [selectedData, setSelectedData] = useState({ selectedId: undefined, supplier: undefined });
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [optionGroup, setOptionGroup] = useState();
  const [optionGroupState, setOptionGroupState] = useState(true);
  const [forCheck, setForCheck] = useState({
    smsCheck: false,
    emailCheck: false,
    printCheck: false,
  });
  const [checkState, setCheckState] = useState([]);
  document.title = "Contacts | My Day";

  const [show, setShow] = useState(false);
  const [postalAddForm, setPostalAddForm] = useState(false);
  const [physicalAddForm, setPhysicalAddForm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.contacts_list_loading === false) {
      props.contactList();
    }
    if (props.contacts_add_loading == "Success") {
      history.push("/contactList");
      toastr.success("Success");
    }
  }, [props.contacts_list_loading, props.contacts_add_loading]);

  console.log(props.contacts_add_loading);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePostalAddForm = () => {
    setPostalAddForm(prev => !prev);
  };

  const handlePhysicalAddForm = () => {
    setPhysicalAddForm(prev => !prev);
  };

  const tog_standard = route => {
    setTogState(prevTogState => !prevTogState);
    setRoute(route);
  };
  const handleSelectGroup = e => {
    setSelectedGroup(e);
    setSelectedData({ selectedId: e.value, supplier: e.supplier });
  }
  console.log(props.contacts_list_data);
  let option;
  if (props.contacts_list_data && optionGroupState) {
    option = props.contacts_list_data.data.map(item => ({
      options: [{ label: item.reference, value: item.id, supplier: item.supplier }],
    }));

    setOptionGroup(option);
    setOptionGroupState(false);
  }

  const handlePushData = () => {
    if (selectedData.supplier !== 1) {
      toastr.error("This contact is already assigned as a supplier.")
      return;
    }
    props.showContactFresh();
    history.push("/contact/set", { id: selectedData.selectedId });
  }

  const checkTrueHandler = (boolean, value) => {
    setForCheck({
      ...forCheck,
      [boolean]: true,
    })
    let val = [...checkState];
    val.push(value);
    setCheckState(val);
  }

  const checkFalseHandler = (boolean, value) => {
    setForCheck({
      ...forCheck,
      [boolean]: false,
    })
    let val = [...checkState];
    val = val.filter(item => item !== value);
    setCheckState(val);
  }

  const mobilePhoneHandler = (e) => {
    setPhone({
      ...phone,
      mobile_phone: e,
    })
    if (e === '') {
      if (forCheck.smsCheck === false) {
        return;
      } else {
        checkFalseHandler('smsCheck', 'SMS');
      }
    } else {
      if (forCheck.smsCheck === true) {
        return;
      } else {
        checkTrueHandler('smsCheck', 'SMS');
      }
    }
  }

  const emailHandler = (e) => {
    setState({
      ...state,
      email: e.target.value
    });
    if (e.target.value === '') {
      if (forCheck.emailCheck === false) {
        return;
      } else {
        checkFalseHandler('emailCheck', 'Email');
      }
    } else {
      if (forCheck.emailCheck === true) {
        return;
      } else {
        checkTrueHandler('emailCheck', 'Email');
      }
    }
  }

  const communicationHandler = (e) => {
    let val = e.target.value, checked = e.target.checked;
    if (val === 'Print' && checked === true) {
      checkTrueHandler('printCheck', 'Print');
    } else if (val === 'Print' && checked === false) {
      checkFalseHandler('printCheck', 'Print');
    } else if (val === 'Email' && checked === true) {
      checkTrueHandler('emailCheck', 'Email');
    } else if (val === 'Email' && checked === false) {
      checkFalseHandler('emailCheck', 'Email');
    } else if (val === 'SMS' && checked === true) {
      checkTrueHandler('smsCheck', 'SMS');
    } else if (val === 'SMS' && checked === false) {
      checkFalseHandler('smsCheck', 'SMS');
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <div className="d-flex flex-column justify-content-start">
            <CardTitle className="mb-2">
              <h3 className="text-primary">New Supplier</h3>
            </CardTitle>

            <div className="py-2 ps-3">
              <div>
                <div className="mb-3">
                  {props.error ? (
                    <Alert color="danger">
                      {JSON.stringify(props.error.response.data.message)}
                    </Alert>
                  ) : null}
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      reference: (state && state.reference) || "",
                      type: true,
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
                      postal_number: (state && state.postal_number) || "",
                      postal_street: (state && state.postal_street) || "",
                      postal_suburb: (state && state.postal_suburb) || "",
                      postal_postcode: (state && state.postal_postcode) || "",
                      postal_state: (state && state.postal_state) || "",
                      postal_country: (state && state.postal_country) || "",

                      physical_building_name:
                        (state && state.physical_building_name) || "",
                      physical_unit: (state && state.physical_unit) || "",
                      physical_number: (state && state.physical_number) || "",
                      physical_street: (state && state.physical_street) || "",
                      physical_suburb: (state && state.physical_suburb) || "",
                      physical_postcode:
                        (state && state.physical_postcode) || "",
                      physical_state: (state && state.physical_state) || "",
                      physical_country: (state && state.physical_country) || "",

                      check: checkState ? checkState : [],

                      abn: (state && state.abn) || "",

                      notes: (state && state.notes) || "",
                    }}
                    validationSchema={Yup.object().shape({
                      reference: Yup.string().required(
                        "Please Enter Reference"
                      ),
                      first_name: Yup.string().required(
                        "Please Enter Reference"
                      ),
                      last_name: Yup.string().required(
                        "Please Enter Reference"
                      ),
                      salutation: Yup.string().required(
                        "Please Enter Reference"
                      ),
                      company_name: Yup.string().required(
                        "Please Enter Reference"
                      ),
                      mobile_phone: Yup.string().required(
                        "Please Enter Reference"
                      ),
                      work_phone: Yup.string().required(
                        "Please Enter Reference"
                      ),
                      home_phone: Yup.string().required(
                        "Please Enter Reference"
                      ),
                      email: Yup.string().required("Please Enter Reference"),

                      postal_building_name: Yup.string().required(
                        "Please Enter Building"
                      ),
                      postal_unit: Yup.string().required("Please Enter Unit"),
                      postal_number: Yup.string().required(
                        "Please Enter Number"
                      ),
                      postal_street: Yup.string().required(
                        "Please Enter Street"
                      ),
                      postal_suburb: Yup.string().required(
                        "Please Enter Suburb"
                      ),
                      postal_postcode: Yup.string().required(
                        "Please Enter Postcode"
                      ),
                      postal_state: Yup.string().required("Please Enter State"),
                      postal_country: Yup.string().required(
                        "Please Enter Country"
                      ),

                      physical_building_name: Yup.string().required(
                        "Please Enter Building"
                      ),
                      physical_unit: Yup.string().required("Please Enter Unit"),
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

                      abn: Yup.string().required("Please Enter ABN"),
                      notes: Yup.string().required("Please Enter Notes"),
                    })}
                    onSubmit={(values, onSubmitProps) => {
                      console.log(values);
                      dispatch(addContact(values));
                      onSubmitProps.resetForm();
                    }}
                  >
                    {({ errors, status, touched }) => (
                      <div>
                        <Row className="d-flex justify-content-between g-5 mb-2">
                          <Col>
                            <div className="border-bottom">
                              <CardTitle className="w-100 mb-3 text-primary">
                                <span className="mb-4">1. Contact</span>
                                <div className="w-25 border-bottom border-primary"></div>
                              </CardTitle>
                            </div>
                          </Col>
                        </Row>

                        <Form className="form-horizontal">
                          <div
                            style={{ height: "60vh" }}
                            className="overflow-auto w-100"
                          >
                            <Card>
                              <CardBody>
                                <div className="w-75 d-flex justify-content-between align-items-center border-bottom border-primary pb-1">
                                  <div>
                                    <h4 className="mb-3">
                                      <h4 className="text-primary">
                                        New Supplier Contact
                                      </h4>
                                    </h4>

                                  </div>

                                  <div>
                                    <div>
                                      <button
                                        type="button"
                                        onClick={handleShow}
                                        className="btn btn-info"
                                        data-toggle="modal"
                                        data-target="#myModal"
                                      >
                                        <i className="fa fa-regular fa-user me-1" />
                                        Select Contact
                                      </button>

                                      <Modal isOpen={show} toggle={handleShow}>
                                        <div className="modal-header">
                                          <h5
                                            className="modal-title mt-0"
                                            id="myModalLabel"
                                          >
                                            <h4 className="text-primary">
                                              Select Contact
                                            </h4>
                                          </h5>
                                          <button
                                            type="button"
                                            onClick={handleClose}
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                          >
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                        </div>
                                        <div className="modal-body">
                                          <div className="mb-3 select2-container">
                                            <Label>Single Select</Label>
                                            <Select
                                              value={selectedGroup}
                                              onChange={handleSelectGroup}
                                              options={optionGroup}
                                              classNamePrefix="select2-selection"
                                            />
                                          </div>
                                        </div>
                                        <div className="modal-footer">
                                          <button
                                            type="button"
                                            onClick={handleClose}
                                            className="btn btn-secondary"
                                            data-dismiss="modal"
                                          >
                                            Close
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-info"
                                            onClick={handlePushData}
                                          >
                                            OK
                                          </button>
                                        </div>
                                      </Modal>
                                    </div>
                                  </div>
                                </div>
                                <div className="my-3 w-75">
                                  <Row className="d-flex justify-content-evenly align-items-center">
                                    <Col md={2}>
                                      <Label for="reference" className="form-label">
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
                                          (errors.reference && touched.reference
                                            ? " is-invalid"
                                            : "")
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
                              </CardBody>
                            </Card>
                            <CardTitle className="text-primary mb-3">
                              People
                              <div className="w-25 mb-2 border-bottom border-primary"></div>
                            </CardTitle>
                            <div className="mb-3 w-75">
                              <Row className="mt-2 mb-3 justify-content-evenly align-items-center">
                                <Col md={2}>
                                  <Label for="building" className="form-label">
                                    First Name
                                  </Label>
                                </Col>

                                <Col md={8}>
                                  <Field
                                    name="first_name"
                                    type="text"
                                    className={
                                      "form-control" +
                                      (errors.first_name && touched.first_name
                                        ? " is-invalid"
                                        : "")
                                    }
                                    value={state.first_name}
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
                                  <Label for="last_name" className="form-label">
                                    Last Name
                                  </Label>
                                </Col>

                                <Col md={8}>
                                  <Field
                                    name="last_name"
                                    type="text"
                                    className={
                                      "form-control" +
                                      (errors.last_name && touched.last_name
                                        ? " is-invalid"
                                        : "")
                                    }
                                    value={state.last_name}
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
                                  <Label for="building" className="form-label">
                                    Salutation
                                  </Label>
                                </Col>

                                <Col md={8}>
                                  <Field
                                    name="salutation"
                                    type="text"
                                    className={
                                      "form-control" +
                                      (errors.salutation && touched.salutation
                                        ? " is-invalid"
                                        : "")
                                    }
                                    value={state.salutation}
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
                                      (errors.work_phone && touched.work_phone
                                        ? " is-invalid"
                                        : "")
                                    }
                                    value={state.work_phone}
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
                                  <Label for="building" className="form-label">
                                    Home phone
                                  </Label>
                                </Col>

                                <Col md={8}>
                                  <Field
                                    name="home_phone"
                                    type="text"
                                    className={
                                      "form-control" +
                                      (errors.home_phone && touched.home_phone
                                        ? " is-invalid"
                                        : "")
                                    }
                                    value={state.home_phone}
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
                                  <Label for="email" className="form-label">
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
                                    onChange={e => emailHandler(e)}
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
                                  <Label for="address" className="form-label">
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
                                            value={state.postal_building_name}
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
                                            value={state.postal_number}
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
                                            value={state.postal_street}
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
                                            value={state.postal_suburb}
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
                                            value={state.postal_postcode}
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
                                            value={state.postal_country}
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
                                  <Label for="address" className="form-label">
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
                                        onClick={handlePhysicalAddForm}
                                        className="d-flex justify-content-evenly align-items-center"
                                      >
                                        Details{" "}
                                        <i className="fa fa-solid fa-caret-down" />
                                      </Button>
                                    ) : (
                                      <Button
                                        color="secondary"
                                        onClick={handlePhysicalAddForm}
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
                                            value={state.physical_building_name}
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
                                            value={state.physical_unit}
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
                                            value={state.physical_number}
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
                                            value={state.physical_street}
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
                                            value={state.physical_suburb}
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
                                            value={state.physical_postcode}
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
                                            value={state.physical_state}
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
                                            value={state.physical_country}
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

                              {/* Communication value added */}
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
                                      Print statements and notices for this
                                      person
                                    </Label>
                                    <Field
                                      name="check"
                                      type="checkbox"
                                      className={"form-check-input"}
                                      value={"Print"}
                                      id="defaultCheck1"
                                      checked={forCheck.printCheck === true ? true : false}
                                      onClick={e => communicationHandler(e)}
                                    />

                                  </div>
                                  <div className="form-check mb-3">
                                    <Label
                                      for="defaultCheck2"
                                      className="form-check-label"
                                    >
                                      Send email communications to this person
                                    </Label>
                                    <Field
                                      name="check"
                                      type="checkbox"
                                      className={"form-check-input"}
                                      value={"Email"}
                                      id="defaultCheck2"
                                      onClick={e => communicationHandler(e)}
                                      checked={forCheck.emailCheck === true ? true : false}
                                    />
                                  </div>
                                  <div className="form-check mb-3">
                                    <Label
                                      for="defaultCheck3"
                                      className="form-check-label"
                                    >
                                      Send SMS communications to this person
                                    </Label>
                                    <Field
                                      name="check"
                                      type="checkbox"
                                      className={"form-check-input"}
                                      value={"Sms"}
                                      id="defaultCheck3"
                                      checked={forCheck.smsCheck === true ? true : false}
                                      onClick={e => communicationHandler(e)}
                                    />
                                  </div>
                                  <Button color="danger">Delete Person</Button>
                                </Col>
                              </Row>
                            </div>
                            <CardTitle className="text-primary mb-3">
                              ABN
                              <div className="w-25 mb-3 border-bottom border-primary"></div>
                            </CardTitle>{" "}
                            <div className="mb-3 w-75">
                              <Row>
                                <Col md={2}>
                                  <Label for="abn" className="form-label">
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
                                  <Label for="notes" className="form-label">
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
                          <div className="w-75">
                            <div className="mt-2 d-flex justify-content-end g-4">
                              <button
                                className="btn btn-secondary w-md ms-5"
                                type="submit"
                              >
                                Close
                              </button>
                              <button
                                className="btn btn-info w-md ms-2"
                                type="submit"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </Form>
                      </div>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    contacts_list_data,
    contacts_list_loading,

    contacts_add_loading,
  } = gstate.Contacts2;
  return {
    contacts_list_data,
    contacts_list_loading,

    contacts_add_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addContact,
    contactList,
    showContactFresh,
  })(Supplier)
);
