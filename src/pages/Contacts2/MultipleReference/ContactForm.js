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

import { Link, useHistory, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

const ContactForm = props => {
  const history = useHistory();
  const [postalAddress, setPostalAddress] = useState({});
  const [physicalAddress, setPhysicalAddress] = useState({});
  const [addressState, setAddressState] = useState(true);
  const [selectedId, setSelectedId] = useState();
  const [optionGroup, setOptionGroup] = useState();
  const [optionGroupState, setOptionGroupState] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);

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
  const [fullpostal, setFullPostal] = useState("");
  const [fullphysical, setFullphysical] = useState("");
  const [autocompletePhysicalState, setAutocompletePhysicalState] =
    useState(false);
  const [autocompletePostalState, setAutocompletePostalState] = useState(false);
  const [addAditionalEmail, setAddAditionalEmail] = useState(0);

  const handlePostalFormValues = e => {
    setPostalAddress({ ...postalAddress, [e.target.name]: e.target.value });
  };
  const handlePhysicalFormValues = e => {
    setPhysicalAddress({ ...physicalAddress, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Autocomplete address
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      setAutocompletePhysicalState(true);
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

      setPhysicalAddress({
        ...physicalAddress,
        physical_building_name: "",
        physical_unit: unitN,
        physical_country: country,
        physical_state: statename,
        physical_postcode: postal_codeN,
        physical_suburb: suburbN,
        physical_street: streetN,
        physical_number: street_numberN,
      });

      let u = unitN ? unitN + "/" : "";
      let n = street_numberN ? street_numberN + " " : "";

      let c = country ? country + " " : "";
      let st = statename ? statename + " " : "";
      let pc = postal_codeN ? postal_codeN + " " : "";
      let sn = suburbN ? suburbN + ", " : "";
      let s = streetN ? streetN + " " : "";
      setFullphysical(u + n + s + sn + st + pc + c);

      setPhysicalAddForm(true);
    });

    autoCompletePostalRef.current = new window.google.maps.places.Autocomplete(
      inputRefPostal.current,
      options
    );
    autoCompletePostalRef.current.addListener(
      "place_changed",
      async function () {
        setAutocompletePostalState(true);
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

        setPostalAddress({
          ...postalAddress,
          postal_building_name: "",
          postal_unit: unitN,
          postal_country: country,
          postal_state: statename,
          postal_postcode: postal_codeN,
          postal_suburb: suburbN,
          postal_street: streetN,
          postal_number: street_numberN,
        });

        let u = unitN ? unitN + "/" : "";
        let n = street_numberN ? street_numberN + " " : "";

        let c = country ? country + " " : "";
        let st = statename ? statename + " " : "";
        let pc = postal_codeN ? postal_codeN + " " : "";
        let sn = suburbN ? suburbN + ", " : "";
        let s = streetN ? streetN + " " : "";
        setFullPostal(u + n + s + sn + st + pc + c);

        setPostalAddForm(true);
      }
    );
    //--------------------------------
  }, [props.contacts_list_loading, props.contacts_add_loading]);

  useEffect(() => {
    if (props.physicalAddress) {
      const {
        physical_building_name,
        physical_unit,
        physical_number,
        physical_street,
        physical_suburb,
        physical_postcode,
        physical_state,
        physical_country,
      } = props.physicalAddress;

      let b = physical_building_name ? physical_building_name + " " : "";
      let u = physical_unit ? physical_unit + "/" : "";
      let n = physical_number ? physical_number + " " : "";
      let s = physical_street ? physical_street + " " : "";
      let su = physical_suburb ? physical_suburb + ", " : "";
      let st = physical_state ? physical_state + " " : "";
      let pt = physical_postcode ? physical_postcode + " " : "";
      let c = physical_country ? physical_country : "";
      setFullphysical(b + u + n + s + su + st + pt + c);
    }
    if (props.postalAddress) {
      const {
        postal_building_name,
        postal_unit,
        postal_number,
        postal_street,
        postal_suburb,
        postal_postcode,
        postal_state,
        postal_country,
      } = props.postalAddress;

      let b = postal_building_name ? postal_building_name + " " : "";
      let u = postal_unit ? postal_unit + "/" : "";
      let n = postal_number ? postal_number + " " : "";
      let s = postal_street ? postal_street + " " : "";
      let su = postal_suburb ? postal_suburb + ", " : "";
      let st = postal_state ? postal_state + " " : "";
      let pt = postal_postcode ? postal_postcode + " " : "";
      let c = postal_country ? postal_country : "";

      setFullPostal(b + u + n + s + su + st + pt + c);
    }
  }, [props.physicalAddress, props.postalAddress]);

  useEffect(() => {
    console.log(addAditionalEmail);
    if (addAditionalEmail == 1) {
      props.handleAddAditionalEmail(props.idx, "email1_status");
    }
    if (addAditionalEmail == 2) {
      props.handleAddAditionalEmail(props.idx, "email2_status");
    }
    if (addAditionalEmail == 3) {
      props.handleAddAditionalEmail(props.idx, "email3_status");
    }
  }, [addAditionalEmail]);

  // Autocomplete address
  function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }
  // -----------------------

  if (
    autocompletePhysicalState &&
    (physicalAddress.physical_country ||
      physicalAddress.physical_state ||
      physicalAddress.physical_postcode ||
      physicalAddress.physical_suburb ||
      physicalAddress.physical_street ||
      physicalAddress.physical_number ||
      physicalAddress.physical_unit ||
      physicalAddress.physical_building_name)
  ) {
    props.autoPhysicalFormValues(
      props.idx,
      physicalAddress.physical_country,
      physicalAddress.physical_state,
      physicalAddress.physical_postcode,
      physicalAddress.physical_suburb,
      physicalAddress.physical_street,
      physicalAddress.physical_number,
      physicalAddress.physical_unit,
      physicalAddress.physical_building_name
    );
    setAutocompletePhysicalState(false);
  }

  if (
    autocompletePostalState &&
    (postalAddress.postal_country ||
      postalAddress.postal_state ||
      postalAddress.postal_postcode ||
      postalAddress.postal_suburb ||
      postalAddress.postal_street ||
      postalAddress.postal_number ||
      postalAddress.postal_unit ||
      postalAddress.postal_building_name)
  ) {
    console.log("in");
    props.autoPostalFormValues(
      props.idx,
      postalAddress.postal_country,
      postalAddress.postal_state,
      postalAddress.postal_postcode,
      postalAddress.postal_suburb,
      postalAddress.postal_street,
      postalAddress.postal_number,
      postalAddress.postal_unit,
      postalAddress.postal_building_name
    );
    setAutocompletePostalState(false);
  }

  const handlePostalAddForm = () => {
    setPostalAddForm(prev => !prev);
  };

  const handlePhysicalAddForm = () => {
    setPhysicalAddForm(prev => !prev);
  };

  const checkAddressHandler = () => {
    if (addressState) {
      props.handleSameAddress(
        props.idx,
        props.postalAddress.postal_country,
        props.postalAddress.postal_number,
        props.postalAddress.postal_postcode,
        props.postalAddress.postal_state,
        props.postalAddress.postal_street,
        props.postalAddress.postal_suburb,
        props.postalAddress.postal_unit,
        props.postalAddress.postal_building_name
      );
      let b = props.postalAddress.postal_building_name
        ? props.postalAddress.postal_building_name + " "
        : "";
      let u = props.postalAddress.postal_unit
        ? props.postalAddress.postal_unit + "/"
        : "";
      let n = props.postalAddress.postal_number
        ? props.postalAddress.postal_number + " "
        : "";
      let s = props.postalAddress.postal_street
        ? props.postalAddress.postal_street + " "
        : "";
      let su = props.postalAddress.postal_suburb
        ? props.postalAddress.postal_suburb + ", "
        : "";
      let st = props.postalAddress.postal_state
        ? props.postalAddress.postal_state + " "
        : "";
      let pt = props.postalAddress.postal_postcode
        ? props.postalAddress.postal_postcode + " "
        : "";
      let c = props.postalAddress.postal_country
        ? props.postalAddress.postal_country
        : "";
      setFullphysical(b + u + n + s + su + st + pt + c);
      setPhysicalAddForm(true);
    } else {
      props.handleSameAddress(props.idx);
    }
    setAddressState(prev => !prev);
  };

  return (
    <React.Fragment>
      <form className="form-horizontal mt-2">
        <div className="mb-3">
          {props.state.deleted && (
            <Alert color="warning" role="alert">
              This person has been deleted and will disappear when you hit save.
              <br />
              <Button
                color="light"
                onClick={e => {
                  props.handleUndoContact(props.idx);
                }}
              >
                {" "}
                <i className="fas fa-undo-alt"></i> Undo
              </Button>
            </Alert>
          )}
          <Row className="mt-2 justify-content-evenly align-items-center">
            <Col md={12}>
              <div className="form-group-new">
                <input
                  name="first_name"
                  type="text"
                  value={props.state.first_name}
                  className="form-control"
                  onChange={e => {
                    props.handleContactFormValues(
                      e.target.name,
                      e.target.value,
                      props.idx
                    );
                    props.handleContactReference(e, "first_name", props.idx);
                  }}
                  disabled={props.state.deleted ? true : false}
                  required
                />
                <label htmlFor="usr">First Name</label>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-evenly align-items-center">
            {/* <Col md={2}>
              <Label for="last_name" className="form-label">
                Last Name
              </Label>
            </Col> */}

            <Col md={12}>
              <div className="form-group-new">
                <input
                  name="last_name"
                  type="text"
                  value={props.state.last_name}
                  className="form-control"
                  onChange={e => {
                    props.handleContactFormValues(
                      e.target.name,
                      e.target.value,
                      props.idx
                    );
                    props.handleContactReference(e, "last_name", props.idx);
                  }}
                  disabled={props.state.deleted ? true : false}
                  required
                />
                <label htmlFor="usr">Last Name</label>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-evenly align-items-center">
            {/* <Col md={2}>
              <Label for="building" className="form-label">
                Salutation
              </Label>
            </Col> */}

            <Col md={12}>
              <div className="form-group-new">
                <input
                  name="salutation"
                  value={props.state.salutation}
                  type="text"
                  className="form-control"
                  onChange={e =>
                    props.handleContactFormValues(
                      e.target.name,
                      e.target.value,
                      props.idx
                    )
                  }
                  disabled={props.state.deleted ? true : false}
                />
                <label htmlFor="usr">Salutation</label>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-evenly align-items-center">
            <Col md={12}>
              <div className="form-group-new">
                <input
                  name="company_name"
                  type="text"
                  value={props.state.company_name}
                  className="form-control"
                  disabled={props.state.deleted ? true : false}
                  onChange={e => {
                    props.handleContactFormValues(
                      e.target.name,
                      e.target.value,
                      props.idx
                    );
                    props.handleContactReference(e, "company_name", props.idx);
                  }}
                />
                <label htmlFor="usr">Company name</label>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-evenly align-items-center">
            <Col md={12}>
              <div className="form-group-new">
                <input
                  name="mobile_phone"
                  type="text"
                  value={props.state.mobile_phone}
                  className="form-control"
                  disabled={props.state.deleted ? true : false}
                  onChange={e => {
                    props.handleContactFormValues(
                      e.target.name,
                      e.target.value,
                      props.idx
                    );
                  }}
                />
                <label htmlFor="usr">Mobile phone</label>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-evenly align-items-center">
            <Col md={12}>
              <div className="form-group-new">
                <input
                  name="work_phone"
                  type="text"
                  value={props.state.work_phone}
                  className="form-control"
                  disabled={props.state.deleted ? true : false}
                  onChange={e => {
                    props.handleContactFormValues(
                      e.target.name,
                      e.target.value,
                      props.idx
                    );
                  }}
                />
                <label htmlFor="usr">Work phone</label>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-evenly align-items-center">
            <Col md={12}>
              <div className="form-group-new">
                <input
                  name="home_phone"
                  type="text"
                  value={props.state.home_phone}
                  className="form-control"
                  disabled={props.state.deleted ? true : false}
                  onChange={e => {
                    props.handleContactFormValues(
                      e.target.name,
                      e.target.value,
                      props.idx
                    );
                  }}
                />
                <label htmlFor="usr">Home phone</label>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-evenly align-items-center">
            <Col md={10} xs={8}>
              <div className="form-group-new">
                <input
                  name="email"
                  type="text"
                  value={props.state.email}
                  className="form-control"
                  onChange={e => {
                    props.checkHandler(
                      e.target.value,
                      props.idx,
                      "emailCheck",
                      "Email"
                    );
                    props.handleContactFormValues(
                      e.target.name,
                      e.target.value,
                      props.idx
                    );
                  }}
                  disabled={props.state.deleted ? true : false}
                  required
                />
                <label htmlFor="usr">Email</label>
              </div>
            </Col>
            <Col md={2} xs={4}>
              <div className="form-group-new">
                <Button
                  className="d-flex justify-content-evenly align-items-start"
                  style={{ marginTop: -30, backgroundColor: "#564BC6" }}
                  onClick={e => setAddAditionalEmail(prev => prev + 1)}
                  disabled={addAditionalEmail < 3 ? false : true}
                >
                  Add
                </Button>
              </div>
            </Col>
          </Row>
          {props.state.email1_status && (
            <Row className="justify-content-evenly align-items-center">
              <Col md={6}>
                <div className="form-group-new">
                  <input
                    name="email1"
                    type="text"
                    value={props.state.email1}
                    className="form-control"
                    onChange={e => {
                      props.handleContactFormValues(
                        e.target.name,
                        e.target.value,
                        props.idx
                      );
                    }}
                    disabled={props.state.deleted ? true : false}
                    required
                  />
                  <label htmlFor="usr">Aditional Email 1</label>
                </div>
              </Col>
              <Col md={4}>
                <div className="form-group-new" style={{ marginTop: -30 }}>
                  <Select
                    value={props.state.email1_send_type}
                    onChange={e => { props.handleSelectGroupEmail1(e, props.idx) }}
                    options={props.state.optionEmail}
                    className="form-control-new"
                    style={{ border: "none" }}
                  />
                </div>
              </Col>
              <Col md={2}>
                <div className="form-group-new">
                  <Button
                    className="d-flex justify-content-evenly align-items-start"
                    style={{ marginTop: -30 }}
                    onClick={e =>
                      props.handleDeletedAditionalEmail(
                        props.idx,
                        "email1_status"
                      )
                    }
                  >
                    Delete
                  </Button>
                </div>
              </Col>
            </Row>
          )}

          {props.state.email2_status && (
            <Row className="justify-content-evenly align-items-center">
              <Col md={6}>
                <div className="form-group-new">
                  <input
                    name="email2"
                    type="text"
                    value={props.state.email2}
                    className="form-control"
                    onChange={e => {
                      props.handleContactFormValues(
                        e.target.name,
                        e.target.value,
                        props.idx
                      );
                    }}
                    disabled={props.state.deleted ? true : false}
                  />
                  <label htmlFor="usr">Aditional Email 2</label>
                </div>
              </Col>
              <Col md={4}>
                <div className="form-group-new" style={{ marginTop: -30 }}>
                  <Select
                    value={props.state.email2_send_type}
                    onChange={e => { props.handleSelectGroupEmail2(e, props.idx) }}
                    options={props.state.optionEmail}
                    className="form-control-new"
                    style={{ border: "none" }}
                  />
                </div>
              </Col>
              <Col md={2}>
                <div className="form-group">
                  <Button
                    className="d-flex justify-content-evenly align-items-start"
                    style={{ marginTop: -30 }}
                    onClick={e =>
                      props.handleDeletedAditionalEmail(
                        props.idx,
                        "email2_status"
                      )
                    }
                  >
                    Delete
                  </Button>
                </div>
              </Col>
            </Row>
          )}

          {props.state.email3_status && (
            <Row className="justify-content-evenly align-items-center">
              <Col md={6}>
                <div className="form-group-new">
                  <input
                    name="email3"
                    type="text"
                    value={props.state.email3}
                    className="form-control"
                    onChange={e => {
                      props.handleContactFormValues(
                        e.target.name,
                        e.target.value,
                        props.idx
                      );
                    }}
                    disabled={props.state.deleted ? true : false}
                  />
                  <label htmlFor="usr">Aditional Email 3</label>
                </div>
              </Col>
              <Col md={4}>
                <div className="form-group-new" style={{ marginTop: -30 }}>
                  {console.log(props.state)}
                  <Select
                    value={props.state.email3_send_type}
                    onChange={e => { props.handleSelectGroupEmail3(e, props.idx) }}
                    options={props.state.optionEmail}
                    className="form-control-new"
                    style={{ border: "none" }}
                  />
                </div>
              </Col>
              <Col md={2}>
                <div className="form-group-new" style={{ marginTop: -30 }}>
                  <Button
                    className="d-flex justify-content-evenly align-items-start"
                    style={{ marginTop: -30 }}
                    onClick={e =>
                      props.handleDeletedAditionalEmail(
                        props.idx,
                        "email3_status"
                      )
                    }
                  >
                    Delete
                  </Button>
                </div>
              </Col>
            </Row>
          )}

          {props.state.deleted === false && (
            <Row className="justify-content-evenly align-items-start">
              {/* <Col md={2}>
                <Label for="address" className="form-label">
                  Postal Address
                </Label>
              </Col> */}
              <Col md={12}>
                <div className="d-flex w-100">
                  <Col md={12} xs={12} style={{ display: "flex" }}>
                    <div className="form-group-new" style={{ width: "100%" }}>
                      <input
                        name="postal_address"
                        type="text"
                        className="form-control"
                        value={fullpostal}
                        onChange={e => {
                          setFullPostal(e.target.value);
                          // if (e.target.value === "") {
                          //   setFullPostal({});
                          // }
                        }}
                        ref={inputRefPostal}
                      />
                      <label htmlFor="usr"> Postal Address</label>
                    </div>
                    <div
                      style={{ marginLeft: postalAddForm ? "-80px" : "-90px" }}
                    >
                      {!postalAddForm ? (
                        <button
                          onClick={handlePostalAddForm}
                          className="d-flex justify-content-evenly align-items-center"
                          style={{
                            backgroundColor: "#F0F0F0",
                            color: "#000 !important",
                            border: "1px solid gray",
                            padding: "3px 10px",
                            border: "none",
                            position: "absolute",
                            marginTop: "5px",
                          }}
                        >
                          Details{" "}
                          <i className="fa fa-solid fa-caret-down ms-1" />
                        </button>
                      ) : (
                        <Button
                          color="#000"
                          onClick={handlePostalAddForm}
                          className="d-flex justify-content-evenly align-items-center"
                          style={{
                            backgroundColor: "#F0F0F0",
                            border: "1px solid gray",
                            padding: "3px 10px",
                            border: "none",
                            position: "absolute",
                            marginTop: "5px",
                          }}
                        >
                          Close
                          <i className="fas fa-times ms-1"></i>
                        </Button>
                      )}
                    </div>
                  </Col>
                </div>

                {postalAddForm && (
                  <div className="bg-soft">
                    <Row>
                      <Col
                        md={10}
                        className="d-flex gap-3"
                        style={{ margin: "auto" }}
                      >
                        <Col md={6} style={{ margin: "auto" }}>
                          <div className="form-group-new">
                            <input
                              name="postal_building_name"
                              type="text"
                              className="form-control"
                              value={props.postalAddress.postal_building_name}
                              onChange={e =>
                                props.handlePostalFormFieldValues(e, props.idx)
                              }
                            />
                            <label htmlFor="usr"> Building Name</label>
                          </div>
                        </Col>
                        <Col md={6} style={{ margin: "auto" }}>
                          <div className="form-group-new">
                            <input
                              name="postal_unit"
                              type="text"
                              className="form-control"
                              value={props.postalAddress.postal_unit}
                              onChange={e =>
                                props.handlePostalFormFieldValues(e, props.idx)
                              }
                            />
                            <label htmlFor="usr"> Unit</label>
                          </div>
                        </Col>
                      </Col>
                    </Row>

                    <Row>
                      <Col
                        md={10}
                        className="d-flex gap-3"
                        style={{ margin: "auto" }}
                      >
                        <Col md={6}>
                          <div className="form-group-new">
                            <input
                              name="postal_number"
                              type="text"
                              className="form-control"
                              value={props.postalAddress.postal_number}
                              onChange={e =>
                                props.handlePostalFormFieldValues(e, props.idx)
                              }
                            />
                            <label htmlFor="usr"> Number</label>
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="form-group-new">
                            <input
                              name="postal_street"
                              type="text"
                              className="form-control"
                              value={props.postalAddress.postal_street}
                              onChange={e =>
                                props.handlePostalFormFieldValues(e, props.idx)
                              }
                            />
                            <label htmlFor="usr"> Street</label>
                          </div>
                        </Col>
                      </Col>
                    </Row>

                    <Row>
                      <Col
                        md={10}
                        className="d-flex gap-3"
                        style={{ margin: "auto" }}
                      >
                        {/* <Col md={2}>
                        <Label for="postal_suburb" className="form-label">
                          Suburb
                        </Label>
                      </Col> */}

                        <Col md={6}>
                          <div className="form-group-new">
                            <input
                              name="postal_suburb"
                              type="text"
                              className="form-control"
                              value={props.postalAddress.postal_suburb}
                              onChange={e =>
                                props.handlePostalFormFieldValues(e, props.idx)
                              }
                            />
                            <label htmlFor="usr">District</label>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form-group-new">
                            <input
                              name="postal_postcode"
                              type="text"
                              className="form-control"
                              value={props.postalAddress.postal_postcode}
                              onChange={e =>
                                props.handlePostalFormFieldValues(e, props.idx)
                              }
                            />
                            <label htmlFor="usr">Postcode</label>
                          </div>
                        </Col>
                      </Col>
                    </Row>

                    <Row>
                      <Col
                        md={10}
                        className="d-flex gap-3"
                        style={{ margin: "auto" }}
                      >
                        <Col md={6}>
                          <div className="form-group-new">
                            <input
                              name="postal_state"
                              type="text"
                              className="form-control"
                              value={props.postalAddress.postal_state}
                              onChange={e =>
                                props.handlePostalFormFieldValues(e, props.idx)
                              }
                            />
                            <label htmlFor="usr">Division</label>
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className="form-group-new">
                            <input
                              name="postal_country"
                              type="text"
                              className="form-control"
                              value={props.postalAddress.postal_country}
                              onChange={e =>
                                props.handlePostalFormFieldValues(e, props.idx)
                              }
                            />
                            <label htmlFor="usr">Country</label>
                          </div>
                        </Col>
                      </Col>
                    </Row>
                    <Row className="my-3">
                      <Col md={6} className="mt-3">
                        <input
                          type="checkbox"
                          className="form-check-input mr-3"
                          id="sameaddress"
                          onClick={checkAddressHandler}
                        />
                        &nbsp; &nbsp;
                        <Label for="sameaddress" className="form-check-label">
                          Same as postal address
                        </Label>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
            </Row>
          )}
          {props.state.deleted === false && (
            <Row className="mt-2 justify-content-evenly align-items-start">
              <Col md={12}>
                <div className="d-flex w-100">
                  <Col md={12} xs={12} style={{ display: "flex" }}>
                    <div className="form-group-new" style={{ width: "100%" }}>
                      <input
                        name="physical_address"
                        type="text"
                        className="form-control"
                        value={fullphysical}
                        onChange={e => {
                          setFullphysical(e.target.value);
                        }}
                        ref={inputRef}
                      />
                      <label htmlFor="usr"> Physical Address</label>
                    </div>
                    <div
                      style={{
                        marginLeft: physicalAddForm ? "-80px" : "-90px",
                      }}
                    >
                      {!physicalAddForm ? (
                        <button
                          color="info"
                          onClick={handlePhysicalAddForm}
                          style={{
                            backgroundColor: "#F0F0F0",
                            color: "#000 !important",
                            border: "1px solid gray",
                            padding: "3px 10px",
                            border: "none",
                            position: "absolute",
                            marginTop: "5px",
                          }}
                        >
                          Details{" "}
                          <i className="fa fa-solid fa-caret-down ms-1" />
                        </button>
                      ) : (
                        <Button
                          color="#000"
                          onClick={handlePhysicalAddForm}
                          style={{
                            backgroundColor: "#F0F0F0",
                            color: "#000 !important",
                            border: "1px solid gray",
                            padding: "3px 10px",
                            border: "none",
                            position: "absolute",
                            marginTop: "5px",
                          }}
                        >
                          Close
                          <i className="fas fa-times ms-1"></i>
                        </Button>
                      )}
                    </div>
                  </Col>
                </div>

                {physicalAddForm && (
                  <div>
                    <Row>
                      <Col
                        md={10}
                        className="d-flex gap-3"
                        style={{ margin: "auto" }}
                      >
                        <Col md={6}>
                          <div className="form-group-new">
                            <input
                              name="physical_building_name"
                              type="text"
                              className="form-control"
                              value={
                                props.physicalAddress.physical_building_name
                              }
                              onChange={e =>
                                props.handlePhysicalFormFieldValues(
                                  e,
                                  props.idx
                                )
                              }
                            />
                            <label htmlFor="usr"> Building Name</label>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form-group-new">
                            <input
                              name="physical_unit"
                              type="text"
                              className="form-control"
                              value={props.physicalAddress.physical_unit}
                              onChange={e =>
                                props.handlePhysicalFormFieldValues(
                                  e,
                                  props.idx
                                )
                              }
                            />
                            <label htmlFor="usr"> Unit</label>
                          </div>
                        </Col>
                      </Col>
                    </Row>

                    <Row>
                      <Col
                        md={10}
                        className="d-flex gap-3"
                        style={{ margin: "auto" }}
                      >
                        <Col md={6}>
                          <div className="form-group-new">
                            <input
                              name="physical_number"
                              type="text"
                              className="form-control"
                              value={props.physicalAddress.physical_number}
                              onChange={e =>
                                props.handlePhysicalFormFieldValues(
                                  e,
                                  props.idx
                                )
                              }
                            />
                            <label htmlFor="usr"> Number</label>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form-group-new">
                            <input
                              name="physical_street"
                              type="text"
                              className="form-control"
                              value={props.physicalAddress.physical_street}
                              onChange={e =>
                                props.handlePhysicalFormFieldValues(
                                  e,
                                  props.idx
                                )
                              }
                            />
                            <label htmlFor="usr">Street</label>
                          </div>
                        </Col>
                      </Col>
                    </Row>

                    <Row>
                      <Col
                        md={10}
                        className="d-flex gap-3"
                        style={{ margin: "auto" }}
                      >
                        <Col md={6}>
                          <div className="form-group-new">
                            <input
                              name="physical_suburb"
                              type="text"
                              className="form-control"
                              value={props.physicalAddress.physical_suburb}
                              onChange={e =>
                                props.handlePhysicalFormFieldValues(
                                  e,
                                  props.idx
                                )
                              }
                            />
                            <label htmlFor="usr">District</label>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form-group-new">
                            <input
                              name="physical_postcode"
                              type="text"
                              className="form-control"
                              value={props.physicalAddress.physical_postcode}
                              onChange={e =>
                                props.handlePhysicalFormFieldValues(
                                  e,
                                  props.idx
                                )
                              }
                            />
                            <label htmlFor="usr"> Postcode</label>
                          </div>
                        </Col>
                      </Col>
                    </Row>

                    <Row>
                      <Col
                        md={10}
                        className="d-flex gap-3"
                        style={{ margin: "auto" }}
                      >
                        <Col md={6}>
                          <div className="form-group-new">
                            <input
                              name="physical_state"
                              type="text"
                              className="form-control"
                              value={props.physicalAddress.physical_state}
                              onChange={e =>
                                props.handlePhysicalFormFieldValues(
                                  e,
                                  props.idx
                                )
                              }
                            />
                            <label htmlFor="usr"> Division</label>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="form-group-new">
                            <input
                              name="physical_country"
                              type="text"
                              className="form-control"
                              value={props.physicalAddress.physical_country}
                              onChange={e =>
                                props.handlePhysicalFormFieldValues(
                                  e,
                                  props.idx
                                )
                              }
                            />
                            <label htmlFor="usr"> Country</label>
                          </div>
                        </Col>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
            </Row>
          )}
          {/* Communication value added */}
          {props.state.deleted === false && (
            <Row className="justify-content-evenly align-items-start g-4">
              <div>
                {" "}
                <Label for="building" className="form-label ps-2">
                  Communication
                </Label>
              </div>

              <Col md={12} className="ms-4">
                <div className="form-check mb-3">
                  <Label
                    for={"defaultCheck" + props.idx}
                    className="form-check-label"
                  >
                    Print statements and notices for this person
                  </Label>

                  <input
                    name="check"
                    value="Print"
                    type="checkbox"
                    className="form-check-input"
                    id={"defaultCheck" + props.idx}
                    checked={
                      props.forCheck[props.idx]?.printCheck === true
                        ? true
                        : false
                    }
                    onClick={e => props.communicationHandler(e, props.idx)}
                  />
                </div>
                <div className="form-check mb-3">
                  <Label
                    for={"defaultCheck" + props.idx + 1}
                    className="form-check-label"
                  >
                    Send email communications to this person
                  </Label>
                  <input
                    name="check"
                    value="Email"
                    type="checkbox"
                    className="form-check-input"
                    id={"defaultCheck" + props.idx + 1}
                    onClick={e => props.communicationHandler(e, props.idx)}
                    checked={
                      props.forCheck[props.idx]?.emailCheck === true
                        ? true
                        : false
                    }
                  />
                </div>
                <div className="form-check mb-3">
                  <Label
                    for={"defaultCheck" + props.idx + 2}
                    className="form-check-label"
                  >
                    Send SMS communications to this person
                  </Label>
                  <input
                    name="check"
                    value="SMS"
                    type="checkbox"
                    className="form-check-input"
                    id={"defaultCheck" + props.idx + 2}
                    checked={
                      props.forCheck[props.idx]?.smsCheck === true ? true : false
                    }
                    onClick={e => props.communicationHandler(e, props.idx)}
                  />
                </div>
                <Button
                  color="danger"
                  disabled={props.countDelete > 1 ? false : true}
                  onClick={e => {
                    props.handleDeletedContact(props.idx);
                  }}
                >
                  Delete Person
                </Button>{" "}
                &nbsp;
                {props.idx !== 0 ? (
                  <Button
                    color="secondary"
                    onClick={e => props.setPrimaryHandler(props.idx)}
                  >
                    {" "}
                    <i className="fas fa-star"></i> Set Primary
                  </Button>
                ) : null}
              </Col>
            </Row>
          )}
        </div>
      </form>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const { } = gstate.Contacts2;
  return {};
};

export default withRouter(connect(mapStateToProps, {})(ContactForm));
