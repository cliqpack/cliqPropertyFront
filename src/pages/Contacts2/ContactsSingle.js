import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
// import Autocomplete from "react-google-autocomplete";
import Breadcrumbs from "../../components/Common/Breadcrumb";

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

import {
  addContact,
  addContactFresh,
  contactList,
  showContactFresh,
  ContactListFresh, emailValidationCheck, emailValidationCheckFresh
} from "../../store/Contacts2/actions";

import { Link, useHistory, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const ContactsSingle = props => {
  const history = useHistory();
  const [state, setState] = useState({});
  const [uniqueEmail, setUniqueEmail] = useState(false)
  const [postalAddress, setPostalAddress] = useState({});
  const [physicalAddress, setPhysicalAddress] = useState({});
  const [fullPhysicalAddress, setFullPhysicalAddress] = useState("");
  const [fullPostalAddress, setFullPostalAddress] = useState("");
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

  document.title = "CliqProperty";

  const [show, setShow] = useState(false);
  const [forRef, setForRef] = useState(false);
  const [forCheck, setForCheck] = useState({
    smsCheck: false,
    emailCheck: false,
    printCheck: false,
  });
  const [checkState, setCheckState] = useState([]);
  const [postalAddForm, setPostalAddForm] = useState(false);
  const [physicalAddForm, setPhysicalAddForm] = useState(false);

  const handlePropertyFormValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handlePostalFormValues = e => {
    setPostalAddress({ ...postalAddress, [e.target.name]: e.target.value });
  };
  const handlePhysicalFormValues = e => {
    setPhysicalAddress({ ...physicalAddress, [e.target.name]: e.target.value });
  };
  useEffect(() => {

    if (props.contacts_add_loading === "Success") {
      toastr.success("Contact added successfully");
      // props.contactList();
      history.push("/contactsInfo/" + props.contact_add_id.contact_id);
    }

    // Autocomplete address
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

        let postal_code = inArray("postal_code", element.types);
        if (postal_code == true) {
          postal_codeN = element.long_name;
        }

        let unit = inArray("subpremise", element.types);
        if (unit == true) {
          unitN = element.long_name;
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
      let u = unitN ? unitN + "/" : "";
      let c = country ? country + " " : "";
      let st = statename ? statename + " " : "";
      let pc = postal_codeN ? postal_codeN + " " : "";
      let sn = suburbN ? suburbN + ", " : "";
      let s = streetN ? streetN + ", " : "";
      let n = street_numberN ? street_numberN + " " : "";
      setFullPhysicalAddress(u + n + s + sn + st + pc + c);
      // setPhysicalAddressState({ ...physicalAddressState, postal_country: country, postal_state: statename, postal_postcode: postal_codeN, postal_suburb: suburbN, postal_street: streetN, postal_number: street_numberN });
      setPhysicalAddress({
        ...physicalAddress,
        physical_unit: unitN,
        physical_country: country,
        physical_state: statename,
        physical_postcode: postal_codeN,
        physical_suburb: suburbN,
        physical_street: streetN,
        physical_number: street_numberN,
      });

      setPhysicalAddForm(true);
    });

    autoCompletePostalRef.current = new window.google.maps.places.Autocomplete(
      inputRefPostal.current,
      options
    );
    autoCompletePostalRef.current.addListener(
      "place_changed",
      async function () {
        const place = await autoCompletePostalRef.current.getPlace();
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

          let postal_code = inArray("postal_code", element.types);
          if (postal_code == true) {
            postal_codeN = element.long_name;
          }

          let unit = inArray("subpremise", element.types);
          if (unit == true) {
            unitN = element.long_name;
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
        let u = unitN ? unitN + "/" : "";
        let c = country ? country + " " : "";
        let st = statename ? statename + " " : "";
        let pc = postal_codeN ? postal_codeN + " " : "";
        let sn = suburbN ? suburbN + ", " : "";
        let s = streetN ? streetN + ", " : "";
        let n = street_numberN ? street_numberN + " " : "";

        setFullPostalAddress(u + n + s + sn + st + pc + c);
        // setPostalAddressState({ ...postalAddressState, physical_country: country, physical_state: statename, physical_postcode: postal_codeN, physical_suburb: suburbN, physical_street: streetN, physical_number: street_numberN });
        setPostalAddress({
          ...postalAddress,
          postal_unit: unitN,
          postal_country: country,
          postal_state: statename,
          postal_postcode: postal_codeN,
          postal_suburb: suburbN,
          postal_street: streetN,
          postal_number: street_numberN,
        });

        setPostalAddForm(true);
      }
    );
    //--------------------------------
  }, [props.contacts_list_loading, props.contacts_add_loading,]);

  console.log(props.email_validation_check_data?.data?.status);

  const addresshandler = (e, statename) => {
    let b = postalAddress.postal_building_name ? postalAddress.postal_building_name + " " : "";
    let u = postalAddress.postal_unit ? postalAddress.postal_unit + "/" : "";
    let n = postalAddress.postal_number ? postalAddress.postal_number + " " : "";
    let st = postalAddress.postal_street ? postalAddress.postal_street + ", " : "";
    let sb = postalAddress.postal_suburb ? postalAddress.postal_suburb + ", " : "";
    let pc = postalAddress.postal_postcode ? postalAddress.postal_postcode + " " : "";
    let s = postalAddress.postal_state ? postalAddress.postal_state + " " : "";
    let c = postalAddress.postal_country ? postalAddress.postal_country + " " : "";
    if (statename === "postal_building_name") {
      b = e.target.value + " ";
    } else if (statename === "postal_unit") {
      u = e.target.value && postalAddress.postal_number ? `${e.target.value}/` : e.target.value;
    } else if (statename === "postal_number") {
      n = e.target.value + " ";
    } else if (statename === "postal_street") {
      st = e.target.value + ", ";
    } else if (statename === "postal_suburb") {
      sb = e.target.value + ", ";
    } else if (statename === "postal_postcode") {
      pc = e.target.value + " ";
    } else if (statename === "postal_state") {
      s = e.target.value + " ";
    } else if (statename === "postal_country") {
      c = e.target.value;
    }
    let address = b + u + n + st + sb + s + pc + c;
    // let reference = st + u + n;
    setFullPostalAddress(address);
    // setState({ ...state, reference });
    setPostalAddress({
      ...postalAddress,
      [e.target.name]: e.target.value,
    });
  };

  const addresshandlerPhysical = (e, statename) => {
    let b = physicalAddress.physical_building_name ? physicalAddress.physical_building_name + " " : "";
    let u = physicalAddress.physical_unit ? physicalAddress.physical_unit + "/" : "";
    let n = physicalAddress.physical_number ? physicalAddress.physical_number + " " : "";
    let st = physicalAddress.physical_street ? physicalAddress.physical_street + ", " : "";
    let sb = physicalAddress.physical_suburb ? physicalAddress.physical_suburb + ", " : "";
    let pc = physicalAddress.physical_postcode ? physicalAddress.physical_postcode + " " : "";
    let s = physicalAddress.physical_state ? physicalAddress.physical_state + " " : "";
    let c = physicalAddress.physical_country ? physicalAddress.physical_country + " " : "";
    if (statename === "physical_building_name") {
      b = e.target.value + " ";
    } else if (statename === "physical_unit") {
      u = e.target.value && physicalAddress.physical_number ? `${e.target.value}/` : e.target.value;
    } else if (statename === "physical_number") {
      n = e.target.value + " ";
    } else if (statename === "physical_street") {
      st = e.target.value + ", ";
    } else if (statename === "physical_suburb") {
      sb = e.target.value + ", ";
    } else if (statename === "physical_postcode") {
      pc = e.target.value + " ";
    } else if (statename === "physical_state") {
      s = e.target.value + " ";
    } else if (statename === "physical_country") {
      c = e.target.value;
    }
    let address = b + u + n + st + sb + s + pc + c;
    // let reference = st + u + n;
    setFullPhysicalAddress(address);
    // setState({ ...state, reference });
    setPhysicalAddress({
      ...physicalAddress,
      [e.target.name]: e.target.value,
    });
  };
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
    });
    setFullPhysicalAddress("");
    setFullPostalAddress("");
    setPhysicalAddress({
      physical_building_name: "",
      physical_country: "",
      physical_number: "",
      physical_postcode: "",
      physical_state: "",
      physical_street: "",
      physical_suburb: "",
      physical_unit: "",
    });
    setPostalAddress({
      postal_building_name: "",
      postal_country: "",
      postal_number: "",
      postal_postcode: "",
      postal_street: "",
      postal_suburb: "",
      postal_unit: "",
      postal_state: "",
    });
    setPhone({
      mobile_phone: "",
      work_phone: "",
      home_phone: "",
    });
  };

  function goBack() {
    window.history.back();
  }

  const checkAddressHandler = () => {
    if (addressState) {
      let building = postalAddress.postal_building_name
        ? postalAddress.postal_building_name + " "
        : "";
      let unit = postalAddress.postal_unit
        ? postalAddress.postal_unit + "/ "
        : "";
      let number = postalAddress.postal_number
        ? postalAddress.postal_number + " "
        : "";
      let street = postalAddress.postal_street
        ? postalAddress.postal_street + ", "
        : "";
      let suburb = postalAddress.postal_suburb
        ? postalAddress.postal_suburb + ", "
        : "";
      let pstate = postalAddress.postal_state
        ? postalAddress.postal_state + " "
        : "";
      let postcode = postalAddress.postal_postcode
        ? postalAddress.postal_postcode + " "
        : "";
      let country = postalAddress.postal_country
        ? postalAddress.postal_country
        : "";
      setFullPhysicalAddress(
        building + unit + number + street + suburb + pstate + postcode + country
      );
      setPhysicalAddress({
        ...physicalAddress,
        physical_building_name: postalAddress.postal_building_name,
        physical_country: postalAddress.postal_country,
        physical_number: postalAddress.postal_number,
        physical_postcode: postalAddress.postal_postcode,
        physical_state: postalAddress.postal_state,
        physical_street: postalAddress.postal_street,
        physical_suburb: postalAddress.postal_suburb,
        physical_unit: postalAddress.postal_unit,
      });
      setPhysicalAddForm(true);
    } else {
      setFullPhysicalAddress("");
      setPhysicalAddress({
        ...physicalAddress,
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

  const checkTrueHandler = (boolean, value) => {
    setForCheck({
      ...forCheck,
      [boolean]: true,
    });
    let val = [...checkState];
    val.push(value);
    setCheckState(val);
  };

  const checkFalseHandler = (boolean, value) => {
    setForCheck({
      ...forCheck,
      [boolean]: false,
    });
    let val = [...checkState];
    val = val.filter(item => item !== value);
    setCheckState(val);
  };

  const mobilePhoneHandler = e => {
    setPhone({
      ...phone,
      mobile_phone: e.target.value,
    });
    if (e.target.value === "") {
      if (forCheck.smsCheck === false) {
        return;
      } else {
        checkFalseHandler("smsCheck", "SMS");
      }
    } else {
      if (forCheck.smsCheck === true) {
        return;
      } else {
        checkTrueHandler("smsCheck", "SMS");
      }
    }
  };


  const emailHandler = e => {
    console.log('email');
    setState({
      ...state,
      email: e.target.value,
    });
    if (e.target.value === "") {
      if (forCheck.emailCheck === false) {
        return;
      } else {
        checkFalseHandler("emailCheck", "Email");
      }
    } else {
      if (forCheck.emailCheck === true) {
        return;
      } else {
        checkTrueHandler("emailCheck", "Email");
      }
    }

  };

  const onBlurEmailHandler = (e) => {
    props.emailValidationCheck(e.target.value, 'contact')
  }

  const communicationHandler = e => {
    let val = e.target.value,
      checked = e.target.checked;
    if (val === "Print" && checked === true) {
      checkTrueHandler("printCheck", "Print");
    } else if (val === "Print" && checked === false) {
      checkFalseHandler("printCheck", "Print");
    } else if (val === "Email" && checked === true) {
      checkTrueHandler("emailCheck", "Email");
    } else if (val === "Email" && checked === false) {
      checkFalseHandler("emailCheck", "Email");
    } else if (val === "SMS" && checked === true) {
      checkTrueHandler("smsCheck", "SMS");
    } else if (val === "SMS" && checked === false) {
      checkFalseHandler("smsCheck", "SMS");
    }
  };

  const referenceHandler = (e, stateName) => {
    let fName = state.first_name ? state.first_name + " " : "";
    let lName = state.last_name ? state.last_name + " " : "";
    let cName = state.company_name ? "- " + state.company_name : "";

    if (stateName === "first_name") {
      fName = e.target.value + " ";
    }
    if (stateName === "last_name") {
      lName = e.target.value + " ";
    }
    if (stateName === "company_name") {
      cName = "- " + e.target.value;
    }

    let reference = fName + lName + cName;
    setState({ ...state, [stateName]: e.target.value, reference });
  };

  // if (forRef) {
  //     referenceHandler('', '');
  //     setForRef(false);
  // }

  const handleReferenceValues = e => {
    setState({ ...state, reference: e.target.value });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Add Contact" breadcrumbItem="Contacts" />

          <div className="d-flex flex-column justify-content-start">
            {/* <CardTitle className="mb-2">
              <h4 className="ms-2 text-primary">New Contact</h4>
            </CardTitle> */}

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
                      first_name: (state && state.first_name) || "",

                      last_name: (state && state.last_name) || "",
                      salutation: (state && state.salutation) || "",
                      company_name: (state && state.company_name) || "",
                      mobile_phone: (phone && phone.mobile_phone) || "",
                      work_phone: (phone && phone.work_phone) || "",
                      home_phone: (phone && phone.home_phone) || "",
                      email: (state && state.email) || "",

                      postal_building_name:
                        (postalAddress && postalAddress.postal_building_name) ||
                        "",
                      postal_unit:
                        (postalAddress && postalAddress.postal_unit) || "",
                      postal_number:
                        (postalAddress && postalAddress.postal_number) || "",
                      postal_street:
                        (postalAddress && postalAddress.postal_street) || "",
                      postal_suburb:
                        (postalAddress && postalAddress.postal_suburb) || "",
                      postal_postcode:
                        (postalAddress && postalAddress.postal_postcode) || "",
                      postal_state:
                        (postalAddress && postalAddress.postal_state) || "",
                      postal_country:
                        (postalAddress && postalAddress.postal_country) || "",

                      physical_building_name:
                        (physicalAddress &&
                          physicalAddress.physical_building_name) ||
                        "",
                      physical_unit:
                        (physicalAddress && physicalAddress.physical_unit) ||
                        "",
                      physical_number:
                        (physicalAddress && physicalAddress.physical_number) ||
                        "",
                      physical_street:
                        (physicalAddress && physicalAddress.physical_street) ||
                        "",
                      physical_suburb:
                        (physicalAddress && physicalAddress.physical_suburb) ||
                        "",
                      physical_postcode:
                        (physicalAddress &&
                          physicalAddress.physical_postcode) ||
                        "",
                      physical_state:
                        (physicalAddress && physicalAddress.physical_state) ||
                        "",
                      physical_country:
                        (physicalAddress && physicalAddress.physical_country) ||
                        "",

                      check: checkState ? checkState : [],

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
                      // salutation: Yup.string().required(
                      //     "Please Enter Salutation"
                      // ),
                      // mobile_phone: Yup.string().required(
                      //     "Please Enter Mobile phone"
                      // ),
                      // work_phone: Yup.string().required(
                      //     "Please Enter Work Phone"
                      // ),
                      // home_phone: Yup.string().required(
                      //     "Please Enter Home Phone"
                      // ),
                      // company_name: Yup.string().required(
                      //     "Please Enter Company Name"
                      // ),
                      email: Yup.string()
                        .email("Field should contain a valid e-mail")
                        .max(255)
                        .required("E-mail is required"),

                      // postal_building_name: Yup.string().required(
                      //   "Please Enter Building"
                      // ),
                      // postal_unit: Yup.string().required("Please Enter Unit"),
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
                      // postal_state: Yup.string().required("Please Enter State"),
                      // postal_country: Yup.string().required(
                      //   "Please Enter Country"
                      // ),

                      // physical_building_name: Yup.string().required(
                      //   "Please Enter Building"
                      // ),
                      // physical_unit: Yup.string().required("Please Enter Unit"),
                      // physical_number: Yup.string().required(
                      //   "Please Enter Number"
                      // ),
                      // physical_street: Yup.string().required(
                      //   "Please Enter Street"
                      // ),
                      // physical_suburb: Yup.string().required(
                      //   "Please Enter Suburb"
                      // ),
                      // physical_postcode: Yup.string().required(
                      //   "Please Enter Postcode"
                      // ),
                      // physical_state:
                      //   Yup.string().required("Please Enter State"),
                      // physical_country: Yup.string().required(
                      //   "Please Enter Country"
                      // ),

                      // abn: Yup.string().required("Please Enter ABN"),
                      // notes: Yup.string().required("Please Enter Notes"),
                    })}
                    onSubmit={(values, onSubmitProps) => {
                      dispatch(addContact(values, phone));
                      props.ContactListFresh();
                      onSubmitProps.resetForm();
                    }}
                  >
                    {({ errors, status, touched }) => (
                      <div>
                        <Form className="form-horizontal mt-2">
                          <div>
                            <Card>
                              <CardBody>
                                <div className="w-75 d-flex justify-content-between align-items-center pb-1">
                                  <h4 className="text-primary mt-2 my-2">
                                    New Contact
                                  </h4>
                                </div>
                                <div
                                  className="w-75"
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                ></div>
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
                                          (errors.reference && touched.reference
                                            ? " is-invalid"
                                            : "")
                                        }
                                        onChange={handleReferenceValues}
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
                                {/* <CardTitle className="text-primary mb-3">
                                  People
                                </CardTitle> */}
                                <h4 className="text-primary mt-2 my-2">
                                  People
                                </h4>
                                <div
                                  className="w-75"
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                ></div>
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
                                        onChange={e =>
                                          referenceHandler(e, "first_name")
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
                                          (errors.last_name && touched.last_name
                                            ? " is-invalid"
                                            : "")
                                        }
                                        value={state.last_name}
                                        onChange={e =>
                                          referenceHandler(e, "last_name")
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
                                        value={state.salutation}
                                        type="text"
                                        className={
                                          "form-control" +
                                          (errors.salutation &&
                                            touched.salutation
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
                                        className={
                                          "form-control" +
                                          (errors.company_name &&
                                            touched.company_name
                                            ? " is-invalid"
                                            : "")
                                        }
                                        value={state.company_name}
                                        onChange={e =>
                                          referenceHandler(e, "company_name")
                                        }
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
                                        onChange={mobilePhoneHandler}
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
                                        onChange={e => {
                                          setPhone({
                                            ...phone,
                                            work_phone: e.target.value,
                                          });
                                        }}
                                      />

                                      <ErrorMessage
                                        name="work_phone"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </Col>
                                  </Row>
                                  <Row className="mt-2 mb-3 justify-content-evenly align-items-center">
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
                                        onChange={e => {
                                          setPhone({
                                            ...phone,
                                            home_phone: e.target.value,
                                          });
                                        }}
                                      />

                                      <ErrorMessage
                                        name="home_phone"
                                        component="div"
                                        className="invalid-feedback"
                                      />
                                    </Col>

                                  </Row>

                                  <Row className="mt-2 mb-3 justify-content-evenly align-items-center">
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
                                        onChange={e => emailHandler(e)}
                                        onBlur={e => onBlurEmailHandler(e)}
                                      />

                                      <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="invalid-feedback"
                                      />

                                    </Col>

                                  </Row>
                                  {props.email_validation_check_data?.data?.status == 'Warning' &&
                                    <Row>
                                      <Col md={3}></Col>
                                      <Col md={8}>
                                        <div className="ps-3">

                                          <Alert color="danger" role="alert">
                                            Email already in use. Try another!
                                          </Alert>
                                        </div>
                                      </Col>
                                    </Row>
                                  }


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
                                      <div className="input-group d-flex">
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
                                          value={fullPostalAddress}
                                          onChange={e => {
                                            setFullPostalAddress(
                                              e.target.value
                                            );
                                          }}
                                          ref={inputRefPostal}
                                        />

                                        {!postalAddForm ? (
                                          <Button
                                            color="info"
                                            onClick={
                                              handlePostalAddForm
                                            }
                                            className="d-flex justify-content-evenly align-items-center"
                                          >
                                            Details{" "}
                                            <i className="fa fa-solid fa-caret-down ms-1" />
                                          </Button>
                                        ) : (
                                          <Button
                                            color="primary"
                                            onClick={
                                              handlePostalAddForm
                                            }
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
                                                value={
                                                  postalAddress.postal_building_name
                                                }
                                                // onChange={
                                                //   handlePostalFormValues
                                                // }
                                                onChange={e => {
                                                  addresshandler(e, "postal_building_name");
                                                }}
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
                                                value={
                                                  postalAddress.postal_unit
                                                }
                                                // onChange={
                                                //   handlePostalFormValues
                                                // }
                                                onChange={e => {
                                                  addresshandler(e, "postal_unit");
                                                }}
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
                                                  postalAddress.postal_number
                                                }
                                                // onChange={
                                                //   handlePostalFormValues
                                                // }
                                                onChange={e => {
                                                  addresshandler(e, "postal_number");
                                                }}
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
                                                  postalAddress.postal_street
                                                }
                                                // onChange={
                                                //   handlePostalFormValues
                                                // }
                                                onChange={e => {
                                                  addresshandler(e, "postal_street");
                                                }}
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
                                                  postalAddress.postal_suburb
                                                }
                                                // onChange={
                                                //   handlePostalFormValues
                                                // }
                                                onChange={e => {
                                                  addresshandler(e, "postal_suburb");
                                                }}
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
                                                  postalAddress.postal_postcode
                                                }
                                                // onChange={
                                                //   handlePostalFormValues
                                                // }
                                                onChange={e => {
                                                  addresshandler(e, "postal_postcode");
                                                }}
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
                                                value={
                                                  postalAddress.postal_state
                                                }
                                                // onChange={
                                                //   handlePostalFormValues
                                                // }
                                                onChange={e => {
                                                  addresshandler(e, "postal_state");
                                                }}
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
                                                  postalAddress.postal_country
                                                }
                                                // onChange={
                                                //   handlePostalFormValues
                                                // }
                                                onChange={e => {
                                                  addresshandler(e, "postal_country");
                                                }}
                                              />
                                            </Col>
                                            <ErrorMessage
                                              name="postal_country"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Row>
                                          <Row>
                                            <Col
                                              md={6}
                                              className="mt-3"
                                            >
                                              <input
                                                type="checkbox"
                                                className="form-check-input mr-3"
                                                id="sameaddress"
                                                onClick={
                                                  checkAddressHandler
                                                }
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
                                      <Label
                                        for="address"
                                        className="form-label"
                                      >
                                        Physical Address
                                      </Label>
                                    </Col>
                                    <Col md={8}>
                                      <div className="input-group d-flex">
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
                                          value={fullPhysicalAddress}
                                          onChange={e => {
                                            setFullPhysicalAddress(
                                              e.target.value
                                            );
                                          }}
                                          ref={inputRef}
                                        />
                                        {!physicalAddForm ? (
                                          <Button
                                            color="info"
                                            onClick={
                                              handlePhysicalAddForm
                                            }
                                            className="d-flex justify-content-evenly align-items-center"
                                          >
                                            Details{" "}
                                            <i className="fa fa-solid fa-caret-down ms-1" />
                                          </Button>
                                        ) : (
                                          <Button
                                            color="primary"
                                            onClick={
                                              handlePhysicalAddForm
                                            }
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
                                                value={
                                                  physicalAddress.physical_building_name
                                                }
                                                onChange={e => {
                                                  addresshandlerPhysical(e, "physical_building_name");
                                                }}
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
                                                  physicalAddress.physical_unit
                                                }
                                                onChange={e => {
                                                  addresshandlerPhysical(e, "physical_unit");
                                                }}
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
                                                  physicalAddress.physical_number
                                                }
                                                onChange={e => {
                                                  addresshandlerPhysical(e, "physical_number");
                                                }}
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
                                                  physicalAddress.physical_street
                                                }
                                                onChange={e => {
                                                  addresshandlerPhysical(e, "physical_street");
                                                }}
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
                                                  physicalAddress.physical_suburb
                                                }
                                                onChange={e => {
                                                  addresshandlerPhysical(e, "physical_suburb");
                                                }}
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
                                                  physicalAddress.physical_postcode
                                                }
                                                onChange={e => {
                                                  addresshandlerPhysical(e, "physical_postcode");
                                                }}
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
                                                  physicalAddress.physical_state
                                                }
                                                onChange={e => {
                                                  addresshandlerPhysical(e, "physical_state");
                                                }}
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
                                                  physicalAddress.physical_country
                                                }
                                                onChange={e => {
                                                  addresshandlerPhysical(e, "physical_country");
                                                }}
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
                                          checked={
                                            forCheck.printCheck === true
                                              ? true
                                              : false
                                          }
                                          onClick={e => communicationHandler(e)}
                                        />
                                      </div>
                                      <div className="form-check mb-3">
                                        <Label
                                          for="defaultCheck2"
                                          className="form-check-label"
                                        >
                                          Send email communications to this
                                          person
                                        </Label>
                                        <Field
                                          name="check"
                                          value="Email"
                                          type="checkbox"
                                          className="form-check-input"
                                          id="defaultCheck2"
                                          onClick={e => communicationHandler(e)}
                                          checked={
                                            forCheck.emailCheck === true
                                              ? true
                                              : false
                                          }
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
                                          value="SMS"
                                          type="checkbox"
                                          className="form-check-input"
                                          id="defaultCheck3"
                                          checked={
                                            forCheck.smsCheck === true
                                              ? true
                                              : false
                                          }
                                          onClick={e => communicationHandler(e)}
                                        />
                                      </div>
                                      {/* <Button color="danger">Delete Person</Button> */}
                                    </Col>
                                  </Row>
                                </div>
                              </CardBody>
                            </Card>
                            <Card>
                              <CardBody>
                                <h4 className="text-primary mb-3">ABN</h4>
                                <div
                                  className="w-75"
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                ></div>
                                <div className="mb-3 w-75">
                                  <Row className="mt-3 d-flex justify-content-evenly align-items-center">
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
                                <h4 className="text-primary mb-3">Notes</h4>
                                <div
                                  className="w-75"
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                ></div>
                                <div className="mb-3 w-75">
                                  <Row className="mt-3 d-flex justify-content-evenly align-items-center">
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
                          {/* <div className="w-100" style={{
                            borderBottom:
                              "1.2px dotted #c9c7c7",
                          }}></div> */}
                          <div className="w-75">
                            <div className="mt-2 d-flex justify-content-end g-4">
                              <button
                                className="btn btn-info w-md ms-5"
                                onClick={goBack}
                                type="button"
                              >
                                <i className="fas fa-times me-1"></i>Cancel
                              </button>
                              <button
                                className="btn btn-info w-md ms-2"
                                type="submit"
                                disabled={props.email_validation_check_data?.data?.status == 'Warning' ? true : false}
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

    contact_add_id,
    contacts_add_loading, email_validation_check_loading, email_validation_check_data
  } = gstate.Contacts2;
  return {
    contacts_list_data,
    contacts_list_loading,

    contact_add_id,
    contacts_add_loading, email_validation_check_loading, email_validation_check_data
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addContact,
    addContactFresh,
    contactList,
    showContactFresh,
    ContactListFresh, emailValidationCheck, emailValidationCheckFresh
  })(ContactsSingle)
);
