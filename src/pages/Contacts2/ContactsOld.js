import React, { useState, useEffect, useRef } from "react";
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

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

//common
// import TextualInputs from "./TextualInputs"
import {
  addContact,
  contactList,
  showContactFresh,
  ContactListFresh,
} from "../../store/Contacts2/actions";

import { Link, useHistory, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { propTypes } from "react-bootstrap-editable";

const Contacts = props => {
  const history = useHistory();
  const [state, setState] = useState({
    reference: "",
    last_name: "",
    first_name: "",
    salutation: "",
    company_name: "",
    work_phone: "",
    mobile_phone: "",
    home_phone: "",
    email: "",
    abn: "",
    notes: "",
  });
  const [addressState, setAddressState] = useState(true);
  const [selectedId, setSelectedId] = useState();
  const [optionGroup, setOptionGroup] = useState();
  const [optionGroupState, setOptionGroupState] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [phone, setPhone] = useState({
    mobile_phone: null,
    work_phone: null,
    home_phone: null,
  });

  // Autocomplete address
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {};

  const inputRefPostal = useRef();
  const autoCompletePostalRef = useRef();
  // ------------------------

  document.title = "Contacts | My Day";

  const [show, setShow] = useState(false);
  const [postalAddForm, setPostalAddForm] = useState(false);
  const [physicalAddForm, setPhysicalAddForm] = useState(false);

  const handlePropertyFormValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (props.contacts_list_loading === false) {
      props.contactList();
    }
    // Autocomplete address
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log({ place });
      let country = '';
      let statename = '';
      let postal_codeN = ''
      let suburbN = ''
      let streetN = ''
      let street_numberN = ''




      place.address_components.forEach(element => {
        let checkCountry = inArray('country', element.types)

        if (checkCountry == true) {
          country = element.long_name

        }

        let administrative_area_level_1 = inArray('administrative_area_level_1', element.types)
        if (administrative_area_level_1 == true) {
          statename = element.long_name

        }

        let postal_code = inArray('postal_code', element.types)
        if (postal_code == true) {
          postal_codeN = element.long_name

        }


        let suburb = inArray('locality', element.types)
        if (suburb == true) {
          suburbN = element.long_name

        }

        let street = inArray('route', element.types)
        if (street == true) {
          streetN = element.long_name

        }


        let street_number = inArray('street_number', element.types)
        if (street_number == true) {
          street_numberN = element.long_name

        }



      });
      setState({ ...state, physical_country: country, physical_state: statename, physical_postcode: postal_codeN, physical_suburb: suburbN, physical_street: streetN, physical_number: street_numberN });
      setPhysicalAddForm(true);
    });

    autoCompletePostalRef.current = new window.google.maps.places.Autocomplete(
      inputRefPostal.current,
      options
    );
    autoCompletePostalRef.current.addListener("place_changed", async function () {
      const place = await autoCompletePostalRef.current.getPlace();
      console.log({ place });
      let country = '';
      let statename = '';
      let postal_codeN = ''
      let suburbN = ''
      let streetN = ''
      let street_numberN = ''




      place.address_components.forEach(element => {
        let checkCountry = inArray('country', element.types)

        if (checkCountry == true) {
          country = element.long_name

        }

        let administrative_area_level_1 = inArray('administrative_area_level_1', element.types)
        if (administrative_area_level_1 == true) {
          statename = element.long_name

        }

        let postal_code = inArray('postal_code', element.types)
        if (postal_code == true) {
          postal_codeN = element.long_name

        }


        let suburb = inArray('locality', element.types)
        if (suburb == true) {
          suburbN = element.long_name

        }

        let street = inArray('route', element.types)
        if (street == true) {
          streetN = element.long_name

        }


        let street_number = inArray('street_number', element.types)
        if (street_number == true) {
          street_numberN = element.long_name

        }



      });
      setState({ ...state, postal_country: country, postal_state: statename, postal_postcode: postal_codeN, postal_suburb: suburbN, postal_street: streetN, postal_number: street_numberN });
      setPostalAddForm(true);
    });
    //--------------------------------
  }, [props.contacts_list_loading]);

  // Autocomplete address
  function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }
  // -----------------------

  const handlePostalAddForm = () => {
    setPostalAddForm(prev => !prev);
  };

  const handlePhysicalAddForm = () => {
    setPhysicalAddForm(prev => !prev);
  };

  const dispatch = useDispatch();

  const defaultProps = {
    center: {
      lat: 22.99835602,
      lng: 91.7832,
    },
    zoom: 11,
  };

  const refreshStateHandler = () => {
    setState({
      reference: "",
      last_name: "",
      first_name: "",
      salutation: "",
      company_name: "",
      work_phone: "",
      mobile_phone: "",
      home_phone: "",
      email: "",
      abn: "",
      notes: "",
      check: "",
      postal_building_name: "",
      postal_country: "",
      postal_number: "",
      postal_postcode: "",
      postal_street: "",
      postal_suburb: "",
      postal_unit: "",
      postal_state: "",
      physical_building_name: "",
      physical_country: "",
      physical_number: "",
      physical_postcode: "",
      physical_state: "",
      physical_street: "",
      physical_suburb: "",
      physical_unit: "",
    });
  };

  const checkAddressHandler = () => {
    if (addressState) {
      setState({
        ...state,
        physical_building_name: state.postal_building_name,
        physical_country: state.postal_country,
        physical_number: state.postal_number,
        physical_postcode: state.postal_postcode,
        physical_state: state.postal_state,
        physical_street: state.postal_street,
        physical_suburb: state.postal_suburb,
        physical_unit: state.postal_unit,
      });
      setPhysicalAddForm(true);
    } else {
      setState({
        ...state,
        physical_building_name: "",
        physical_country: "",
        physical_number: "",
        physical_postcode: "",
        physical_state: "",
        physical_street: "",
        physical_suburb: "",
        physical_unit: "",
      });
    }
    setAddressState(prev => !prev);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <div className="d-flex flex-column justify-content-start">

            <Card>
              <CardBody>
                <h4 className="text-primary">Contact</h4>
                <div className="my-3" style={{
                  borderBottom:
                    "1.2px dotted #c9c7c7",
                }}></div>
              </CardBody>
            </Card>

            <div className="">
              <div>
                <div className="">
                  {props.error ? (
                    <Alert color="danger">
                      {JSON.stringify(props.error.response.data.message)}
                    </Alert>
                  ) : null}
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      reference: (state && state.reference) || "",
                      first_name: (state && state.first_name) || "",

                      last_name: (state && state.last_name) || "",
                      salutation: (state && state.salutation) || "",
                      company_name: (state && state.company_name) || "",
                      // mobile_phone: (state && state.mobile_phone) || "",
                      // work_phone: (state && state.work_phone) || "",
                      // home_phone: (state && state.home_phone) || "",
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

                      check: (state && state.print_check) || [],

                      abn: (state && state.abn) || "",

                      notes: (state && state.notes) || "",
                    }}
                    validationSchema={Yup.object().shape({
                      reference: Yup.string().required(
                        "Please Enter Reference"
                      ),
                      first_name: Yup.string()
                        .required("Please Enter First Name")
                        .matches(
                          /^[aA-zZ\s]+$/,
                          "Only alphabets are allowed for this field "
                        ),
                      last_name: Yup.string()
                        .required("Please Enter Last Name")
                        .matches(
                          /^[aA-zZ\s]+$/,
                          "Only alphabets are allowed for this field "
                        ),
                      salutation: Yup.string().required(
                        "Please Enter Salutation"
                      ),
                      company_name: Yup.string().required(
                        "Please Enter Company Name"
                      ),
                      //   mobile_phone: Yup.string().required(
                      //     "Please Enter Mobile Phone"
                      // ).matches(phoneRegExp, 'Phone number is not valid'),
                      // work_phone: Yup.string().required(
                      //     "Please Enter Work Phone"
                      // ).matches(phoneRegExp, 'Phone number is not valid'),
                      // home_phone: Yup.string().required(
                      //     "Please Enter Home Phone"
                      // ).matches(phoneRegExp, 'Phone number is not valid'),
                      email: Yup.string()
                        .email("Field should contain a valid e-mail")
                        .max(255)
                        .required("E-mail is required"),

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
                      dispatch(addContact(values, phone));
                      props.ContactListFresh();
                      onSubmitProps.resetForm();
                      history.push("/contactList/");
                    }}
                  >
                    {({ errors, status, touched }) => (
                      <div>


                        <Form className="form-horizontal mt-2">
                          <div>


                            <Card>
                              <CardBody>
                                <h4 className="text-primary mt-2 my-2">
                                  New Contact
                                </h4>
                                <div className="w-75" style={{
                                  borderBottom:
                                    "1.2px dotted #c9c7c7",
                                }}></div>
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
                                        onChange={handlePropertyFormValues}
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

                            <Card>
                              <CardBody>
                                <h4 className="text-primary mb-3">
                                  People

                                </h4>
                                <div className="w-75" style={{
                                  borderBottom:
                                    "1.2px dotted #c9c7c7",
                                }}></div>
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
                                        value={state.first_name}
                                        className={
                                          "form-control" +
                                          (errors.first_name && touched.first_name
                                            ? " is-invalid"
                                            : "")
                                        }
                                        onChange={handlePropertyFormValues}
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
                                        value={state.last_name}
                                        className={
                                          "form-control" +
                                          (errors.last_name && touched.last_name
                                            ? " is-invalid"
                                            : "")
                                        }
                                        onChange={handlePropertyFormValues}
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
                                        value={state.salutation}
                                        type="text"
                                        className={
                                          "form-control" +
                                          (errors.salutation && touched.salutation
                                            ? " is-invalid"
                                            : "")
                                        }
                                        onChange={handlePropertyFormValues}
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
                                        value={state.company_name}
                                        className={
                                          "form-control" +
                                          (errors.company_name &&
                                            touched.company_name
                                            ? " is-invalid"
                                            : "")
                                        }
                                        onChange={handlePropertyFormValues}
                                      />

                                      <ErrorMessage
                                        name="company_name"
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

                                      <PhoneInput
                                        country={"au"}
                                        value={phone.mobile_phone}
                                        onChange={value =>
                                          setPhone({
                                            ...phone,
                                            mobile_phone: value,
                                          })
                                        }
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

                                      <PhoneInput
                                        country={"au"}
                                        value={phone.work_phone}
                                        onChange={value =>
                                          setPhone({ ...phone, work_phone: value })
                                        }
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
                                      <PhoneInput
                                        country={"au"}
                                        value={phone.home_phone}
                                        onChange={value =>
                                          setPhone({ ...phone, home_phone: value })
                                        }
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
                                        value={state.email}
                                        className={
                                          "form-control" +
                                          (errors.email && touched.email
                                            ? " is-invalid"
                                            : "")
                                        }
                                        onChange={handlePropertyFormValues}
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
                                            color="info"
                                            onClick={handlePostalAddForm}
                                            className="d-flex justify-content-evenly align-items-center"
                                          >
                                            Details{" "}
                                            <i className="fa fa-solid fa-caret-down ms-1" />

                                          </Button>
                                        ) : (
                                          <Button
                                            color="info"
                                            onClick={handlePostalAddForm}
                                            className="d-flex justify-content-evenly align-items-center"
                                          >
                                            Close
                                            <i className="fas fa-times ms-1"></i>

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
                                                onChange={handlePropertyFormValues}
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
                                                onChange={handlePropertyFormValues}
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
                                                onChange={handlePropertyFormValues}
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
                                                onChange={handlePropertyFormValues}
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
                                                onChange={handlePropertyFormValues}
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
                                                onChange={handlePropertyFormValues}
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
                                                onChange={handlePropertyFormValues}
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
                                                onChange={handlePropertyFormValues}
                                              />
                                            </Col>
                                            <ErrorMessage
                                              name="postal_country"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Row>
                                          <Row>
                                            <Col md={6} className="mt-3">
                                              <input
                                                type="checkbox"
                                                className="form-check-input mr-3"
                                                id="sameaddress"
                                                onClick={checkAddressHandler}
                                              />
                                              &nbsp; &nbsp;
                                              <Label
                                                for="sameaddress"
                                                className="form-check-label"
                                              >
                                                Same as postal address
                                              </Label>
                                            </Col>
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
                                            color="info"
                                            onClick={handlePhysicalAddForm}
                                            className="d-flex justify-content-evenly align-items-center"
                                          >
                                            Details{" "}
                                            <i className="fa fa-solid fa-caret-down ms-1" />

                                          </Button>
                                        ) : (
                                          <Button
                                            color="info"
                                            onClick={handlePhysicalAddForm}
                                            className="d-flex justify-content-evenly align-items-center"
                                          >
                                            Close
                                            <i className="fas fa-times ms-1"></i>

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
                                                onChange={handlePropertyFormValues}
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
                                                onChange={handlePropertyFormValues}
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
                                                onChange={handlePropertyFormValues}
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
                                                onChange={handlePropertyFormValues}
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
                                                onChange={handlePropertyFormValues}
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
                                                onChange={handlePropertyFormValues}
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
                                                onChange={handlePropertyFormValues}
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
                                                onChange={handlePropertyFormValues}
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
                                          value="Print"
                                          type="checkbox"
                                          className="form-check-input"
                                          id="defaultCheck1"
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
                                          value="Email"
                                          type="checkbox"
                                          className="form-check-input"
                                          id="defaultCheck2"
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
                                          value="Sms"
                                          type="checkbox"
                                          className="form-check-input"
                                          id="defaultCheck3"
                                        />
                                      </div>
                                      <Button color="danger">Delete Person</Button>
                                    </Col>
                                  </Row>
                                </div>
                              </CardBody>
                            </Card>

                            <Card>
                              <CardBody>
                                <h4 className="text-primary mb-3">
                                  ABN

                                </h4>
                                <div className="w-75" style={{
                                  borderBottom:
                                    "1.2px dotted #c9c7c7",
                                }}></div>
                                <div className="mb-3 w-75">
                                  <Row className="mt-3">
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
                                        onChange={handlePropertyFormValues}
                                      />
                                      <ErrorMessage
                                        name="abn"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </Col>
                                  </Row>
                                </div>
                              </CardBody>
                            </Card>

                            <Card>
                              <CardBody>
                                <h4 className="text-primary mb-3">
                                  Notes

                                </h4>
                                <div className="w-75" style={{
                                  borderBottom:
                                    "1.2px dotted #c9c7c7",
                                }}></div>
                                <div className="mb-3 w-75">
                                  <Row className="mt-3">
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
                                        onChange={handlePropertyFormValues}
                                      />
                                      <ErrorMessage
                                        name="notes"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </Col>
                                  </Row>
                                </div>
                              </CardBody>
                            </Card>

                          </div>

                          <div className="w-75">
                            <div className="mt-2 d-flex justify-content-end g-4">
                              <button
                                className="btn btn-secondary w-md ms-5"
                                onClick={refreshStateHandler}
                                type="button"
                              >
                                <i className="fas fa-times me-1"></i>Close
                              </button>
                              <button
                                className="btn btn-info w-md ms-2"
                                type="submit"
                              >
                                <i className="fas fa-file-alt me-1"></i> Save
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
    ContactListFresh,
  })(Contacts)
);
