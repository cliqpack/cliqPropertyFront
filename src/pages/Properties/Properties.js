import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes, { number } from "prop-types";
import { useDispatch } from "react-redux";
import {
  Card,
  Alert,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Label,
  Input,
  Button,
  CardHeader,
  InputGroup,
  UncontrolledAlert,
} from "reactstrap";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import Select from "react-select";

//common
// import TextualInputs from "./TextualInputs"
import {
  addProperty,
  getUser,
  getPropertyType,
  getStrataManager,
  propertyListFresh,
  propertyAddFresh,
  PropertyKey,
  PropertyKeyValueFresh,
  checkUniqueKeyNumber,
  checkUniqueKeyNumberFresh,
} from "../../store/Properties/actions";

// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

import { Link, useHistory, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { propTypes } from "react-bootstrap-editable";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import "./property.css";
import { logDOM } from "@testing-library/react";

const LoadingContainer = () => <div>Loading...</div>;
const AnyReactComponent = props => (
  <div>
    {props.state === false ? (
      <i className="bx bxs-map text-danger font-size-24"></i>
    ) : (
      <i className="bx bxs-map text-success font-size-24"></i>
    )}
  </div>
);

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "underline",
    "fontFamily",
    "fontSize",
    "fontColor",
    "fontBackgroundColor",
    "alignment",
    "|",
    "blockQuote",
    "|",
    "indent",
    "outdent",
    "|",
    "|",
    "numberedList",
    "bulletedList",
    "insertTable",
    "mergeTableCells",
    "mediaEmbed",
    "|",
    "undo",
    "redo",
  ],
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
};

const Properties = props => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  const style = {
    width: "90%",
    height: "60%",
    borderRadius: "0 0 5px 5px",
  };
  const history = useHistory();
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  console.log(inputRef.current?.value);
  const options = {};
  const [show, setShow] = useState(true);
  const [state, setState] = useState({
    optionManager: [],
    optionType: [],
    selectedPrimaryType: { label: "Residential", value: "Residential" },
    optionPrimaryType: [
      { label: "Residential", value: "Residential" },
      { label: "Commercial", value: "Commercial" },
    ],
    optionStrataManager: [],
    optionFloorArea: [
      { label: "m2", value: "m2" },
      { label: "square", value: "square" },
    ],
    optionLandArea: [
      { label: "ac", value: "ac" },
      { label: "ha", value: "ha" },
      { label: "m2", value: "m2" },
      { label: "square", value: "square" },
    ],
    // selectedFloorArea: {}
  });
  const [description, setDescription] = useState("");
  const [autoRefState, setAutoRefState] = useState(false);
  const [fullAddress, setFullAddress] = useState("");
  const [addressState, setAddressState] = useState({});
  const [inspectionButtonState, setInspectionButtonState] = useState({
    routine_inspections_frequency_type: "Weekly",
    first_routine_frequency_type: "Weekly",
  });
  const [disabledState, setDisabledState] = useState(true);
  const [inspectionWeeklylyBtn, setInspectionWeeklyBtn] = useState(true);
  const [inspectionMonthlyBtn, setInspectionMonthlyBtn] = useState(false);

  const [inspectionFirstRoutineWeeklyBtn, setInspectionFirstRoutineWeeklyBtn] =
    useState(true);
  const [
    inspectionFirstRoutineMonthlyBtn,
    setInspectionFirstRoutineMonthlyBtn,
  ] = useState(false);
  document.title = "CliqProperty";
  const [state2, setState2] = useState({
    location: undefined,
  });
  const [mapToggle, setMapToggle] = useState(false);
  const [addressShow, setAddressShow] = useState(false);
  const dispatch = useDispatch();

  const [defaultProps, setDefaultProps] = useState({
    lat: -33.8675,
    lng: 151.2072,
  });

  const handleSelectGroupManager = e => {
    setState({ ...state, selectedManager: e });
  };
  const handleSelectGroupType = e => {
    setState({ ...state, selectedType: e });
  };
  const handleSelectGroupPrimaryType = e => {
    setState({ ...state, selectedPrimaryType: e });
  };
  const handleSelectGroupStrataManager = e => {
    setState({ ...state, selectedStrataManager: e });
  };
  const [refInv, setRefInv] = useState(false);
  const [init, setInit] = useState(true);

  if (init) {
    props.getUser();
    props.getPropertyType();
    props.getStrataManager();
    setInit(false);
  }

  const handleSave = e => {
    e.preventDefault();
    console.log(state.reference);
    if (state.reference == undefined || state.reference?.length == 0) {
      toastr.warning("Reference cannot be empty");
      setRefInv(true);
    } else if (
      addressState.street == undefined ||
      addressState.street?.length == 0
    ) {
      toastr.warning("Street cannot be empty");
      setAddressShow(true);
    } else if (
      addressState.suburb == undefined ||
      addressState.suburb?.length == 0
    ) {
      toastr.warning("Suburb cannot be empty");
      setAddressShow(true);
    } else {
      props.addProperty(
        state,
        state2,
        description,
        inspectionButtonState,
        addressState
      );
    }
  };

  const dateHandler = (selectedDates, dateStr, instance) => {
    setState({ ...state, ["routine_inspection_due_date"]: dateStr });
  };

  useEffect(() => {
    if (props.check_unique_key_loading === 'Failed') {
      toastr.error('Key number already is in use');
      props.checkUniqueKeyNumberFresh();
    }
    if (props.property_key_value_loading === false) {
      props.PropertyKey();
    }
    if (authUser?.user?.id) {
      setState(prev => ({
        ...prev,
        selectedManager: {
          label: authUser?.user?.first_name + " " + authUser?.user?.last_name,
          value: authUser?.user?.id,
        },
      }));
    }

    if (props.property_add_loading == "Success") {
      toastr.success("Success");
      dispatch(propertyAddFresh());
      props.propertyListFresh();

      if (props.property_add_data.propertyId !== undefined) {
        history.push(`/propertyInfo/${props.property_add_data.propertyId}`);
      }
    }

    if (inspectionButtonState.routine_inspections_frequency_type) {
      calcRotine();
    }

    let optionManager;
    if (props.user_list_data) {
      optionManager = props.user_list_data?.data.map(item => ({
        label: item.full_name,
        value: item.id,
      }));
      setState(prev => ({ ...prev, optionManager: optionManager }));
    }

    let optionType;
    if (props.property_type_data) {
      optionType = props.property_type_data?.data?.data.map(item => ({
        label: item.type,
        value: item.id,
      }));
      setState(prev => ({
        ...prev,
        optionType: optionType,
        selectedType: optionType[0],
      }));
    }

    let optionStrataManager;
    if (props.property_strata_manager_data) {
      optionStrataManager = props.property_strata_manager_data?.data?.data.map(item => ({
        label: item.reference + '( ' + item.supplier_details?.folio_code + ' )',
        value: item.id,
      }));
      setState(prev => ({ ...prev, optionStrataManager: optionStrataManager }));
    }

    if (props.property_key_value) {
      let key = props.property_key_value?.data?.key + 1;
      setState(prev => ({ ...prev, keyNumber: key }));
    }
  }, [
    // props,
    props.property_key_value_loading,
    props.user_list_loading,
    props.property_add_loading,
    props.property_type_loading,
    state.routine_inspections_frequency,
    props.user_list_data,
    inspectionButtonState.routine_inspections_frequency,
    inspectionButtonState.routine_inspections_frequency_type,
    props.property_type_data,
    authUser?.user?.id,
    props.property_key_value,
    fullAddress
  ]);

  useEffect(() => {
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
      let u = unitN ? unitN + "/" : "";
      let n = street_numberN ? street_numberN + " " : "";

      let c = country ? country + " " : "";
      let st = statename ? statename + " " : "";
      let pc = postal_codeN ? postal_codeN + " " : "";
      let sn = suburbN ? suburbN + ", " : "";
      let s = streetN ? streetN + ", " : "";
      let reference = s + n;
      setState(prev => ({ ...prev, reference }));
      if (streetN || street_numberN) {
        setAutoRefState(true);
      }
      setMapToggle(false);
      setAddressShow(true);
      setFullAddress(u + n + s + sn + st + pc + c);
      setAddressState({
        building: "",
        unit: unitN,
        country: country,
        state: statename,
        postcode: postal_codeN,
        suburb: suburbN,
        street: streetN,
        number: street_numberN,
      });
      setState2(prev => ({
        ...prev,
        location:
          place.geometry.location.lat() + `,` + place.geometry.location.lng(),
      }));
      setDefaultProps({
        ...defaultProps,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    });
  }, [])


  if (autoRefState) {
    let reference = `${addressState.street}, ${addressState.unit ? `${addressState.unit}/` : ""
      }${addressState.number}`;

    setState(prev => ({ ...prev, reference }));
    setRefInv(false);
    setAutoRefState(false);
  }

  function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }
  let userData = undefined;
  let propertyType = undefined;
  let strataManager = undefined;
  if (props.user_list_data) {
    userData = props.user_list_data?.data?.map((item, key) => (
      <option key={key} value={item.id}>
        {item.first_name + " " + item.last_name}
      </option>
    ));
  }

  if (props.property_type_loading == "Success") {
    propertyType = props.property_type_data.data.data.map((item, key) => (
      <option key={key} value={item.id}>
        {item.type}
      </option>
    ));
  }

  if (props.property_strata_manager_loading == "Success") {
    strataManager = props.property_strata_manager_data?.data?.data?.map((item, key) => (
      <option key={key} value={item.id}>
        {item.reference}
      </option>
    ));
  }

  const handlePropertyFormValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
    if (e.target.name == "reference" || e.target.value.length > 0) {
      setRefInv(false);
    }
  };

  const handleKeyNumber = e => {
    // setState({ ...state, [e.target.name]: e.target.value });
    setState(prev => ({ ...prev, keyNumber: e.target.value }));
    props.checkUniqueKeyNumber(e.target.value);
  };

  const toggleInspectionMonthlyBtn = () => {
    setInspectionButtonState({
      ...inspectionButtonState,
      routine_inspections_frequency_type: "Monthly",
    });
    setInspectionMonthlyBtn(true);
    setInspectionWeeklyBtn(false);
    calcRotine();
  };

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const toggleInspectionWeeklyBtn = () => {
    setInspectionButtonState({
      ...inspectionButtonState,
      routine_inspections_frequency_type: "Weekly",
    });
    setInspectionWeeklyBtn(true);
    setInspectionMonthlyBtn(false);
    calcRotine();
  };

  const toggleInspectionFirstRoutineWeeklyBtn = () => {
    setInspectionButtonState({
      ...inspectionButtonState,
      first_routine_frequency_type: "Weekly",
    });
    setInspectionFirstRoutineWeeklyBtn(true);
    setInspectionFirstRoutineMonthlyBtn(false);
  };
  const toggleInspectionFristRoutineMonthlyBtn = () => {
    setInspectionButtonState({
      ...inspectionButtonState,
      first_routine_frequency_type: "Monthly",
    });
    setInspectionFirstRoutineMonthlyBtn(true);
    setInspectionFirstRoutineWeeklyBtn(false);
  };

  const handleRoutineType = e => {
    let value = e.target.value;
    if (value != "0") {
      setState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    if (value) {
      setDisabledState(false);
    } else {
      setDisabledState(true);
    }

    if (
      e.target.name == "routine_inspections_frequency" &&
      e.target.value !== "" &&
      e.target.value != "0"
    ) {
      calcRotine();
    } else {
      setState(prev => ({ ...prev, routine_inspection_due_date: "" }));
    }
  };

  const calcRotine = async () => {
    let check;
    if (
      inspectionButtonState.routine_inspections_frequency_type === "Weekly" &&
      state.routine_inspections_frequency
    ) {
      var date = new Date();
      var days = Number(state.routine_inspections_frequency) * Number("7");
      var date_t = date.addDays(days);
      let dtat = "routine_inspection_due_date";
      check = await date_get(date_t);
      await setState({ ...state, routine_inspection_due_date: check });
    } else if (
      inspectionButtonState.routine_inspections_frequency_type === "Monthly" &&
      state.routine_inspections_frequency
    ) {
      var date = new Date();
      var days = date.setMonth(
        date.getMonth() + Number(state.routine_inspections_frequency)
      );

      let dtat = "routine_inspection_due_date";
      check = await date_get(days);
      await setState({ ...state, [dtat]: check });
    }
  };

  const date_get = dTime => {
    var today = undefined;
    var td = new Date(dTime);
    var dd = String(td.getDate()).padStart(2, "0");
    var mm = String(td.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = td.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: "Hello World!",
    });
    return marker;
  };

  const onMapClickHandler = e => {
    // console.log(e);
  };

  const moveMarker = (props, marker, e) => {
    setDefaultProps({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setState2({
      ...state2,
      location: e.latLng.lat() + "," + e.latLng.lng(),
    });
  };
  const onMarkerClick = e => {
    // console.log(e.google.maps.LatLng());
  };

  const addresshandler = (e, statename) => {
    let b = addressState.building ? addressState.building + " " : "";
    let u = addressState.unit ? addressState.unit + "/" : "";
    let n = addressState.number ? addressState.number + " " : "";
    let st = addressState.street ? addressState.street + ", " : "";
    let sb = addressState.suburb ? addressState.suburb + ", " : "";
    let pc = addressState.postcode ? addressState.postcode + " " : "";
    let s = addressState.state ? addressState.state + " " : "";
    let c = addressState.country ? addressState.country + " " : "";
    if (statename === "building") {
      b = e.target.value + " ";
    } else if (statename === "unit") {
      u =
        e.target.value && addressState.number
          ? `${e.target.value}/`
          : e.target.value;
    } else if (statename === "number") {
      n = e.target.value + " ";
    } else if (statename === "street") {
      st = e.target.value + ", ";
    } else if (statename === "suburb") {
      sb = e.target.value + " ";
    } else if (statename === "postcode") {
      pc = e.target.value + " ";
    } else if (statename === "state") {
      s = e.target.value + " ";
    } else if (statename === "country") {
      c = e.target.value;
    }
    let address = b + u + n + st + sb + s + pc + c;
    let reference = st + u + n;
    setFullAddress(address);
    setState({ ...state, reference });
    setAddressState({
      ...addressState,
      [e.target.name]: e.target.value,
    });
  };

  function goBack() {
    window.history.back();
  }

  const handleSelectFloorArea = e => {
    setState({ ...state, selectedFloorArea: e });
  };
  const handleSelectLandArea = e => {
    setState({ ...state, selectedLandArea: e });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <h4 className="ms-2 text-primary">Add property</h4>

          <Row>
            <Col>
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
                    building: (addressState && addressState.building) || "",
                    unit: (addressState && addressState.unit) || "",
                    number: (addressState && addressState.number) || "",
                    street: (addressState && addressState.street) || "",
                    suburb: (addressState && addressState.suburb) || "",
                    postcode: (addressState && addressState.postcode) || "",
                    state: (addressState && addressState.state) || "",
                    country: (addressState && addressState.country) || "",
                    bedroom: (state && state.bedroom) || "",
                    bathroom: (state && state.bathroom) || "",
                    car_space: (state && state.car_space) || "",
                    subject: (state && state.subject) || "",
                    floorSize: (state && state.floorSize) || "",
                    floorArea: (state && state.floorArea) || "",
                    landSize: (state && state.landSize) || "",
                    landArea: (state && state.landArea) || "",
                    keyNumber: (state && state.keyNumber) || "",
                    routine_inspections_frequency:
                      (state && state.routine_inspections_frequency) || "",
                    routine_inspections_frequency_type:
                      (inspectionButtonState &&
                        inspectionButtonState.routine_inspections_frequency_type) ||
                      "",
                    first_routine: (state && state.first_routine) || "",
                    first_routine_frequency_type:
                      (inspectionButtonState &&
                        inspectionButtonState.first_routine_frequency_type) ||
                      "",
                    routine_inspection_due_date:
                      (state && state.routine_inspection_due_date) || "",
                    note: (state && state.note) || "",
                    youtube_link: (state && state.youtube_link) || "",
                    vr_link: (state && state.vr_link) || "",
                  }}
                  validationSchema={Yup.object().shape({
                    reference: Yup.string().required("Please Enter Reference"),
                    manager: Yup.string().required("Manager Name Required"),

                    type: Yup.string().typeError("Please Enter Type"),
                    primaryType: Yup.string().typeError(
                      "Primary type is required"
                    ),
                    primaryType: Yup.string().required(
                      "Please Enter Primary Type"
                    ),
                    type: Yup.string().required("Please Enter Property Type"),
                  })}
                  onSubmit={(values, onSubmitProps) => {
                    console.log(values);
                  }}
                >
                  {({ errors, status, touched }) => (
                    <Form className="form-horizontal">
                      <div style={{ display: "flex", gap: "20px" }}>
                        <Row>
                          <Col sm={12} md={12} lg={6}>
                            <Card style={{
                              borderRadius: "15px",
                              backgroundColor: "#F2F6FA",
                              border: "8px solid white",
                              height: "200px"
                            }}>
                              <Row>
                                <Col
                                  xs={2} sm={3} md={1} lg={1}
                                  style={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                    padding: "0px",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginTop: "15px",
                                      display: "flex",
                                      flexDirection: "column",
                                      position: "absolute",
                                      left: "15px",
                                    }}
                                  >
                                    <i
                                      className="far fa-user-circle ms-1"
                                      style={{ fontSize: "30px" }}
                                    />

                                    <div
                                      className="vr"
                                      style={{
                                        width: "3px",
                                        height: "100px",
                                        position: "absolute",
                                        left: "17px",
                                        top: "28px",
                                        background:
                                          "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)",
                                      }}
                                    ></div>
                                  </div>
                                </Col>
                                <Col xs={10} sm={9} md={11} lg={11} style={{ padding: "0px" }}>
                                  <CardBody style={{ paddingLeft: "10px" }}>
                                    <CardTitle tag="h5">Name</CardTitle>
                                    <div className="w-100 mt-3">
                                      <Row>
                                        <Col md={11}>
                                          <div className="form-group-new">
                                            <input
                                              name="reference"
                                              type="text"
                                              className="form-control"
                                              required
                                              value={state.reference}
                                              onChange={handlePropertyFormValues}
                                            />
                                            <label htmlFor="usr">Reference</label>
                                          </div>

                                          {refInv ? (
                                            <div className="invalid-feedback">
                                              Please Enter Reference
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </Col>
                                      </Row>
                                    </div>

                                    <div className="w-100">
                                      <Row>
                                        <Col md={11}>
                                          <div className="form-group-new">
                                            <Select
                                              value={state?.selectedManager}
                                              onChange={e => {
                                                handleSelectGroupManager(e);
                                              }}
                                              options={state?.optionManager}
                                              //classNamePrefix="select2-selection"
                                              className="form-control-new"
                                              style={{ border: "none" }}
                                            />
                                            <label htmlFor="usr">Manager</label>
                                          </div>
                                          <ErrorMessage
                                            name="manager"
                                            component="div"
                                            className="invalid-feedback"
                                          />
                                        </Col>
                                      </Row>
                                    </div>
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>

                            <Card style={{
                              borderRadius: "15px",
                              backgroundColor: "#F2F6FA",
                              border: "8px solid white",
                              minHeight: "200px"
                            }}>
                              <Row>
                                <Col
                                  xs={2} sm={3} md={1} lg={1}
                                  style={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                    padding: "0px",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginTop: "15px",
                                      display: "flex",
                                      flexDirection: "column",
                                      position: "absolute",
                                      left: "15px",
                                    }}
                                  >
                                    <i
                                      className="far fa-pause-circle ms-1"
                                      style={{ fontSize: "30px" }}
                                    />

                                    <div
                                      className="vr"
                                      style={{
                                        width: "3px",
                                        height: addressShow
                                          ? mapToggle
                                            ? addressShow && mapToggle
                                              ? "800px"
                                              : "500px"
                                            : "400px"
                                          : "120px",
                                        position: "absolute",
                                        left: "17px",
                                        top: "28px",
                                        background:
                                          "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)",
                                      }}
                                    ></div>
                                  </div>
                                </Col>
                                <Col xs={10} sm={9} md={11} lg={11} style={{ padding: "0px" }}>
                                  <CardBody style={{ paddingLeft: "10px" }}>
                                    <CardTitle
                                      tag="h5"
                                      style={{ marginBottom: "20px" }}
                                    >
                                      Address
                                    </CardTitle>
                                    <div
                                      className="w-100 mt-3"
                                      style={{ marginBottom: "-15px" }}
                                    >
                                      <Row>
                                        <Col md={11} style={{ display: "flex" }}>
                                          <div
                                            className="form-group"
                                            style={{ width: "100%" }}
                                          >
                                            <input
                                              name="address"
                                              type="text"
                                              placeholder=""
                                              className="form-control"
                                              ref={inputRef}
                                              onChange={e => {
                                                setFullAddress(e.target.value);
                                                if (e.target.value === "") {
                                                  setAddressState({});
                                                }
                                              }}
                                              value={fullAddress}
                                            />
                                            <label htmlFor="usr">
                                              Enter a location
                                            </label>
                                          </div>
                                          <div style={{ marginLeft: "-80px" }}>
                                            {show && !addressShow ? (
                                              <button
                                                //color="#000000"
                                                style={{ backgroundColor: "#F0F0F0", color: "#000 !important", border: "1px solid gray", padding: "3px 8px", border: "none", position: "absolute", marginTop: "5px" }}
                                                onClick={() =>
                                                  setAddressShow(true)
                                                }
                                              >
                                                Details{" "}
                                                <i className="fa fa-solid fa-caret-down ms-1" />
                                              </button>
                                            ) : (
                                              <button
                                                //color="primary"
                                                style={{ backgroundColor: "#F0F0F0", color: "#000 !important", border: "1px solid gray", padding: "3px 10px", border: "none", position: "absolute", marginTop: "5px" }}
                                                onClick={() =>
                                                  setAddressShow(false)
                                                }
                                              // className="d-flex justify-content-evenly align-items-center"
                                              >
                                                Close
                                                <i className="fas fa-times ms-1"></i>
                                              </button>
                                            )}
                                          </div>
                                        </Col>
                                      </Row>
                                    </div>

                                    <div style={{ width: "100%" }}>
                                      {addressShow && (
                                        <div>
                                          <Row className="mt-2">
                                            <Col
                                              md={10}
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "20px",
                                              }}
                                            >
                                              <Col md={5}>
                                                <div className="form-group">
                                                  <input
                                                    name="building"
                                                    type="text"
                                                    className={
                                                      "form-control" +
                                                      (errors.building &&
                                                        touched.building
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    value={addressState.building}
                                                    onChange={e => {
                                                      addresshandler(
                                                        e,
                                                        "building"
                                                      );
                                                    }}
                                                  />
                                                  <label htmlFor="usr">
                                                    Building Name
                                                  </label>
                                                </div>

                                                <ErrorMessage
                                                  name="building"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                              <Col md={5}>
                                                <div className="form-group">
                                                  <input
                                                    name="unit"
                                                    type="text"
                                                    className={
                                                      "form-control" +
                                                      (errors.unit && touched.unit
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    value={addressState.unit}
                                                    onChange={e => {
                                                      addresshandler(e, "unit");
                                                    }}
                                                  />
                                                  <label htmlFor="usr">
                                                    Unit
                                                  </label>
                                                </div>
                                                <ErrorMessage
                                                  name="unit"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Col>
                                          </Row>

                                          <Row className="mt-2">
                                            <Col
                                              md={10}
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "20px",
                                              }}
                                            >
                                              <Col md={5}>
                                                <div className="form-group">
                                                  <input
                                                    name="number"
                                                    type="text"
                                                    className={
                                                      "form-control" +
                                                      (errors.number &&
                                                        touched.number
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    value={addressState.number}
                                                    onChange={e => {
                                                      addresshandler(e, "number");
                                                    }}
                                                  />
                                                  <label htmlFor="usr">
                                                    Number
                                                  </label>
                                                </div>
                                                <ErrorMessage
                                                  name="number"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                              <Col md={5}>
                                                <div className="form-group">
                                                  <input
                                                    name="street"
                                                    type="text"
                                                    className={
                                                      "form-control" +
                                                      (errors.street &&
                                                        touched.street
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    value={addressState.street}
                                                    onChange={e => {
                                                      addresshandler(e, "street");
                                                    }}
                                                  />
                                                  <label htmlFor="usr">
                                                    Street
                                                  </label>
                                                </div>

                                                <ErrorMessage
                                                  name="street"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Col>
                                          </Row>

                                          <Row className="mt-2">
                                            <Col
                                              md={10}
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "20px",
                                              }}
                                            >
                                              <Col md={5}>
                                                <div className="form-group">
                                                  <input
                                                    name="suburb"
                                                    type="text"
                                                    className={
                                                      "form-control" +
                                                      (errors.suburb &&
                                                        touched.suburb
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    value={addressState.suburb}
                                                    onChange={e => {
                                                      addresshandler(e, "suburb");
                                                    }}
                                                  />
                                                  <label htmlFor="usr">
                                                    Suburb
                                                  </label>
                                                </div>
                                                <ErrorMessage
                                                  name="suburb"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                              <Col md={5}>
                                                <div className="form-group">
                                                  <input
                                                    name="state"
                                                    type="text"
                                                    className={
                                                      "form-control" +
                                                      (errors.state &&
                                                        touched.state
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    value={addressState.state}
                                                    onChange={e => {
                                                      addresshandler(e, "state");
                                                    }}
                                                  />
                                                  <label htmlFor="usr">
                                                    State
                                                  </label>
                                                </div>
                                                <ErrorMessage
                                                  name="state"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Col>
                                          </Row>

                                          <Row className="mt-2">
                                            <Col
                                              md={10}
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "20px",
                                              }}
                                            >
                                              <Col md={5}>
                                                <div className="form-group">
                                                  <input
                                                    name="postcode"
                                                    type="text"
                                                    className={
                                                      "form-control" +
                                                      (errors.postcode &&
                                                        touched.postcode
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    value={addressState.postcode}
                                                    onChange={e => {
                                                      addresshandler(
                                                        e,
                                                        "postcode"
                                                      );
                                                    }}
                                                  />
                                                  <label htmlFor="usr">
                                                    Postcode
                                                  </label>
                                                </div>
                                                <ErrorMessage
                                                  name="postcode"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                              <Col md={5}>
                                                <div className="form-group">
                                                  <input
                                                    name="country"
                                                    type="text"
                                                    className={
                                                      "form-control" +
                                                      (errors.country &&
                                                        touched.country
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    value={addressState.country}
                                                    onChange={e => {
                                                      addresshandler(
                                                        e,
                                                        "country"
                                                      );
                                                    }}
                                                  />
                                                  <label htmlFor="usr">
                                                    Country
                                                  </label>
                                                </div>
                                                <ErrorMessage
                                                  name="country"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Col>
                                          </Row>
                                        </div>
                                      )}
                                    </div>

                                    <div
                                      className="w-100 mt-3"
                                      style={{ marginBottom: "-10px" }}
                                    >
                                      <Row>
                                        <Col md={11} style={{ display: "flex" }}>
                                          <Col md={11}>
                                            <div
                                              className="form-group-new"
                                            //style={{ width: "92%" }}
                                            >
                                              <input
                                                type="text"
                                                className="form-control"
                                                onClick={() =>
                                                  mapToggle == true
                                                    ? setMapToggle(false)
                                                    : setMapToggle(true)
                                                }
                                                id="inputGroupFile04"
                                                aria-describedby="inputGroupFileAddon04"
                                                placeholder={
                                                  state2.location
                                                    ? "Geographic location found"
                                                    : "No geographic location."
                                                }
                                                readOnly
                                              />
                                              <label
                                                htmlFor="usr"
                                                style={{ marginTop: "3px" }}
                                              >
                                                Location
                                              </label>
                                            </div>
                                          </Col>
                                          <Col md={1}>
                                            <div>
                                              <Button
                                                onClick={() =>
                                                  mapToggle == true
                                                    ? setMapToggle(false)
                                                    : setMapToggle(true)
                                                }
                                                color="light"
                                                type="button"
                                                id="inputGroupFileAddon04"
                                              >
                                                {state2.location ? (
                                                  <i className="fas fa-map-marker-alt text-success font-size-18"></i>
                                                ) : (
                                                  <i className="fas fa-map-marker-alt text-danger font-size-18"></i>
                                                )}
                                              </Button>
                                            </div>
                                          </Col>
                                          <ErrorMessage
                                            name="location"
                                            component="div"
                                            className="invalid-feedback"
                                          />
                                        </Col>
                                      </Row>
                                    </div>
                                    <div>
                                      {mapToggle ? (
                                        <div
                                          style={{
                                            minHeight: "300px",
                                            width: "100%",
                                            overflow: "hidden",
                                          }}
                                        >
                                          <Map
                                            style={style}
                                            google={props.google}
                                            initialCenter={defaultProps}
                                            zoom={12}
                                            onClick={e => onMapClickHandler(e)}
                                          >
                                            <Marker
                                              position={defaultProps}
                                              draggable={true}
                                              onDragend={moveMarker}
                                              onClick={e => {
                                                onMarkerClick(e);
                                              }}
                                            />
                                          </Map>
                                        </div>
                                      ) : null}
                                    </div>
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>

                            {/* ============details ========== */}

                            {/* ============details end========== */}
                            <Card style={{
                              borderRadius: "15px",
                              backgroundColor: "#F2F6FA",
                              border: "8px solid white",
                              marginBottom: "20px",
                              height: { md: "380px" }
                            }} >
                              <Row style={{ marginBottom: "20px" }}>
                                <Col
                                  xs={2} sm={3} md={1} lg={1}
                                  style={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                    padding: "0px",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginTop: "15px",
                                      display: "flex",
                                      flexDirection: "column",
                                      position: "absolute",
                                      left: "15px",
                                    }}
                                  >
                                    <i
                                      className="fab fa-creative-commons-share ms-1"
                                      style={{ fontSize: "30px" }}
                                    />

                                    <div
                                      className="vr"
                                      style={{
                                        width: "3px",
                                        height: "270px",
                                        position: "absolute",
                                        left: "17px",
                                        top: "28px",
                                        background:
                                          "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)",
                                      }}
                                    ></div>
                                  </div>
                                </Col>
                                <Col xs={10} sm={9} md={11} lg={11} style={{ padding: "0px" }}>
                                  <CardBody style={{ paddingLeft: "10px" }}>
                                    <CardTitle tag="h5">Inspection</CardTitle>

                                    <div
                                      className="w-100 mt-3 custom-space-creation"
                                    //style={{ marginBottom: "-15px" }}
                                    >
                                      <Row className="mb-3 w-100">

                                        <Col xs={12} sm={12} md={6}>
                                          <div className="form-group mt-1">
                                            <input
                                              name="routine_inspections_frequency"
                                              type="text"
                                              className={
                                                "form-control" +
                                                (errors.routine_inspections_frequency &&
                                                  touched.routine_inspections_frequency
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              value={
                                                state.routine_inspections_frequency
                                              }
                                              onChange={handleRoutineType}
                                            />
                                            <label htmlFor="usr">
                                              Routine Inspection Frequency
                                            </label>
                                          </div>

                                          <ErrorMessage
                                            name="routine_inspections_frequency"
                                            component="div"
                                            className="invalid-feedback"
                                          />
                                        </Col>
                                        <Col xs={12} sm={12} md={6}>
                                          <div className="btn-group btn-group-justified">
                                            <div className="btn-group">
                                              <Button
                                                color={
                                                  inspectionWeeklylyBtn
                                                    ? "switchButtonColor"
                                                    : "switchButtonOppsiteColor"
                                                }
                                                onClick={
                                                  toggleInspectionWeeklyBtn
                                                }
                                                style={{ border: "1px solid #BCBEBE" }}
                                              >
                                                {inspectionWeeklylyBtn ? (
                                                  <i className="bx bx-comment-check"></i>
                                                ) : null}
                                                <span> Weekly</span>
                                              </Button>
                                            </div>
                                            <div className="btn-group">
                                              <Button
                                                color={
                                                  inspectionMonthlyBtn
                                                    ? "switchButtonColor"
                                                    : "switchButtonOppsiteColor"
                                                }
                                                onClick={
                                                  toggleInspectionMonthlyBtn
                                                }
                                                style={{ border: "1px solid #BCBEBE" }}
                                              >
                                                {inspectionMonthlyBtn ? (
                                                  <i className="bx bx-comment-check"></i>
                                                ) : null}
                                                <span> Monthly</span>
                                              </Button>
                                            </div>
                                          </div>
                                        </Col>
                                      </Row>
                                    </div>
                                    <div
                                      className="w-100 mt-3 custom-space-creation"
                                    //style={{ marginBottom: "-15px" }}
                                    >
                                      <Row className="mb-3 w-100">

                                        <Col md={6}>
                                          <div className="form-group-new">
                                            <input
                                              name="first_routine"
                                              type="text"
                                              className={
                                                "form-control" +
                                                (errors.first_routine &&
                                                  touched.first_routine
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              value={state.first_routine}
                                              disabled={disabledState}
                                              onChange={handlePropertyFormValues}
                                            />
                                            <label
                                              htmlFor="usr"
                                              style={{ marginTop: "2px" }}
                                            >
                                              First Routine (Optional)
                                            </label>
                                          </div>
                                          <ErrorMessage
                                            name="first_routine"
                                            component="div"
                                            className="invalid-feedback"
                                          />
                                        </Col>
                                        <Col md={6}>
                                          <div className="btn-group btn-group-justified">
                                            <div className="btn-group">
                                              <Button
                                                color={
                                                  inspectionFirstRoutineWeeklyBtn
                                                    ? "switchButtonColor"
                                                    : "switchButtonOppsiteColor"
                                                }
                                                onClick={
                                                  toggleInspectionFirstRoutineWeeklyBtn
                                                }
                                                disabled={disabledState}
                                                style={{ border: "1px solid #BCBEBE" }}
                                              >
                                                {inspectionFirstRoutineWeeklyBtn ? (
                                                  <i className="bx bx-comment-check"></i>
                                                ) : null}
                                                <span> Weekly</span>
                                              </Button>
                                            </div>
                                            <div className="btn-group">
                                              <Button
                                                color={
                                                  inspectionFirstRoutineMonthlyBtn
                                                    ? "switchButtonColor"
                                                    : "switchButtonOppsiteColor"
                                                }
                                                onClick={
                                                  toggleInspectionFristRoutineMonthlyBtn
                                                }
                                                disabled={disabledState}
                                                style={{ border: "1px solid #BCBEBE" }}
                                              >
                                                {inspectionFirstRoutineMonthlyBtn ? (
                                                  <i className="bx bx-comment-check"></i>
                                                ) : null}
                                                <span> Monthly</span>
                                              </Button>
                                            </div>
                                          </div>
                                        </Col>
                                      </Row>
                                    </div>
                                    <div
                                      className="w-100 mt-3 custom-space-creation"
                                    // style={{ marginBottom: "-15px" }}
                                    >
                                      <Row className="mb-3 w-100">
                                        {/* <Col md={3}>
                                      <Label
                                        for="routine_inspection_due_date"
                                        className="form-label"
                                      >
                                        Routine inspection due
                                      </Label>
                                    </Col> */}
                                        <Col md={6}>
                                          <div className="form-group-new">
                                            <Flatpickr
                                              className="form-control d-block"
                                              placeholder="Pick a date..."
                                              value={
                                                state.routine_inspection_due_date
                                              }
                                              // disabled={disabledState}
                                              // onChange={() => dateHandler()}
                                              options={{
                                                altInput: true,
                                                format: "d/m/Y",
                                                altFormat: "d/m/Y",
                                                onChange: dateHandler,
                                              }}
                                            />
                                            <label
                                              htmlFor="usr"
                                              style={{ marginTop: "2px" }}
                                            >
                                              Routine inspection due
                                            </label>
                                          </div>

                                          <ErrorMessage
                                            name="routine_inspection_due_date"
                                            component="div"
                                            className="invalid-feedback"
                                          />
                                        </Col>
                                        <Col md={5}>
                                          <div>
                                            <span>
                                              Date is updated when tenant move-in
                                              date is added
                                            </span>
                                            <span>
                                              <i className="fas fa-info-circle" />
                                            </span>
                                          </div>
                                        </Col>
                                      </Row>
                                    </div>
                                    <div
                                      className="w-100 mt-3"
                                      style={{ marginBottom: "-15px" }}
                                    >
                                      <Row className="mb-3 w-100">
                                        <Col md={12}>
                                          <div className="form-group-new">
                                            <input
                                              //as="textarea"
                                              type="textarea"
                                              id="textarea"
                                              name="note"
                                              maxLength="225"
                                              rows="3"
                                              // placeholder="This textarea has a limit of 225 chars."
                                              value={state.note}
                                              onChange={handlePropertyFormValues}
                                              className={
                                                "form-control" +
                                                (errors.note && touched.note
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              style={{ height: "65px" }}
                                            />
                                            <label
                                              htmlFor="usr"
                                              style={{
                                                height: "-105px",
                                                position: "absolute",
                                                left: "30px",
                                              }}
                                            >
                                              Notes
                                            </label>
                                          </div>

                                          <ErrorMessage
                                            name="note"
                                            component="div"
                                            className="invalid-feedback"
                                          />
                                        </Col>
                                      </Row>
                                    </div>
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>

                            <Card style={{
                              borderRadius: "15px",
                              backgroundColor: "#F2F6FA",
                              border: "8px solid white",
                              height: "220px"

                            }}>
                              <Row>
                                <Col
                                  xs={2} sm={3} md={1} lg={1}
                                  style={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                    padding: "0px",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginTop: "15px",
                                      display: "flex",
                                      flexDirection: "column",
                                      position: "absolute",
                                      left: "15px",
                                    }}
                                  >
                                    <i
                                      className="fab fa-periscope ms-1"
                                      style={{ fontSize: "30px" }}
                                    />

                                    <div
                                      className="vr"
                                      style={{
                                        width: "3px",
                                        height: "120px",
                                        position: "absolute",
                                        left: "17px",
                                        top: "28px",
                                        background:
                                          "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)",
                                      }}
                                    ></div>
                                  </div>
                                </Col>
                                <Col xs={10} sm={9} md={11} lg={11} style={{ padding: "0px" }}>
                                  <CardBody style={{ paddingLeft: "10px" }}>
                                    <CardTitle tag="h5">Links</CardTitle>

                                    <div
                                      className="mb-3 w-100"
                                      style={{
                                        marginBottom: "-50px",
                                        marginTop: "20px",
                                      }}
                                    >
                                      <Row style={{ marginBottom: "-20px" }}>
                                        {/* <Col md={3}>
                                        <Label for="vr_link" className="form-label">
                                          VR Link
                                        </Label>
                                      </Col> */}

                                        <Col md={11}>
                                          <div className="form-group-new">
                                            <Field
                                              name="vr_link"
                                              type="text"
                                              value={state.vr_link}
                                              onChange={handlePropertyFormValues}
                                              className={
                                                "form-control" +
                                                (errors.vr_link && touched.vr_link
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                            />
                                            <label
                                              htmlFor="usr"
                                              style={{ marginTop: "2px" }}
                                            >
                                              VR Link
                                            </label>
                                          </div>
                                          <ErrorMessage
                                            name="vr_link"
                                            component="div"
                                            className="invalid-feedback"
                                          />
                                        </Col>
                                      </Row>
                                    </div>
                                    <div className="w-100">
                                      <Row>
                                        {/* <Col md={3}>
                                        <Label
                                          for="youtube_link"
                                          className="form-label"
                                        >
                                          Youtube
                                        </Label>
                                      </Col> */}

                                        <Col md={11}>
                                          <div className="form-group-new">
                                            <Field
                                              name="youtube_link"
                                              type="text"
                                              value={state.youtube_link}
                                              onChange={handlePropertyFormValues}
                                              className={
                                                "form-control" +
                                                (errors.youtube_link &&
                                                  touched.youtube_link
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                            />
                                            <label
                                              htmlFor="usr"
                                              style={{ marginTop: "2px" }}
                                            >
                                              Youtube
                                            </label>
                                          </div>
                                          <ErrorMessage
                                            name="youtube_link"
                                            component="div"
                                            className="invalid-feedback"
                                          />
                                        </Col>
                                      </Row>
                                    </div>
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>
                          </Col>

                          <Col sm={12} md={12} lg={6}>
                            <Card style={{
                              borderRadius: "15px",
                              backgroundColor: "#F2F6FA",
                              border: "8px solid white",
                              marginBottom: "20px",
                              //height: "1060px"
                            }}>
                              <Row>
                                <Col
                                  xs={2} sm={3} md={1} lg={1}
                                  style={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                    padding: "0px",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginTop: "15px",
                                      display: "flex",
                                      flexDirection: "column",
                                      position: "absolute",
                                      left: "15px",
                                    }}
                                  >
                                    <i
                                      className="fab fa-gitkraken ms-1"
                                      style={{ fontSize: "30px" }}
                                    />

                                    <div
                                      className="vr"
                                      style={{
                                        width: "3px",
                                        height: "945px",
                                        position: "absolute",
                                        left: "17px",
                                        top: "28px",
                                        background:
                                          "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)",
                                      }}
                                    ></div>
                                  </div>
                                </Col>
                                <Col xs={10} sm={9} md={11} lg={11} style={{ padding: "0px" }}>
                                  <CardBody>
                                    <CardTitle tag="h5">Details</CardTitle>

                                    <div
                                      className="mb-3 w-100"
                                      style={{
                                        marginBottom: "-50px",
                                        marginTop: "20px",
                                      }}
                                    >
                                      <Row>
                                        {/* <Col md={3}>
                                        <Label for="refernce" className="form-label">
                                          Subject
                                        </Label>
                                      </Col> */}

                                        <Col md={11}>
                                          <div className="form-group-new">
                                            <input
                                              name="subject"
                                              type="text"
                                              value={state.subject}
                                              onChange={handlePropertyFormValues}
                                              className={
                                                "form-control" +
                                                (errors.subject && touched.subject
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                            />
                                            <label
                                              htmlFor="usr"
                                              style={{ marginTop: "2px" }}
                                            >
                                              Subject
                                            </label>
                                          </div>
                                          <ErrorMessage
                                            name="subject"
                                            component="div"
                                            className="invalid-feedback"
                                          />
                                        </Col>
                                      </Row>
                                    </div>

                                    <div
                                      className="mb-3 w-100"
                                      style={{ marginTop: "-15px" }}
                                    >
                                      <Row>
                                        {/* <Col md={3}>
                                        <Label for="description" className="form-label">
                                          Description
                                        </Label>
                                      </Col> */}
                                        <Col md={11} >
                                          <div className="form-group-desc" style={{ height: "425px", overflowY: "scroll" }}>
                                            <CKEditor
                                              style={{ marginTop: "10px", border: "none" }}
                                              className="form-control-desc"
                                              editor={DecoupledEditor}
                                              config={editorConfiguration}
                                              // data="<p>Hello from CKEditor 5!</p>"
                                              onReady={editor => {
                                                console.log(
                                                  "Editor is ready to use!",
                                                  editor
                                                );

                                                // Insert the toolbar before the editable area.
                                                if (editor) {
                                                  editor.ui
                                                    .getEditableElement()
                                                    .parentElement.insertBefore(
                                                      editor.ui.view.toolbar
                                                        .element,
                                                      editor.ui.getEditableElement()
                                                    );
                                                }
                                              }}
                                              onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setDescription(data);
                                              }}
                                            />
                                            <label
                                              htmlFor="usr"
                                              style={{
                                                position: "absolute",
                                                marginTop: "-200px",
                                              }}
                                            >
                                              Description
                                            </label>
                                          </div>
                                        </Col>
                                      </Row>
                                    </div>

                                    {/* <div className="mb-3 w-100">
                                    <Row>
                                      <Col md={3}>
                                        <Label for="description" className="form-label">
                                          Description
                                        </Label>
                                      </Col>
                                      <Col md={9} style={{ height: "425px" }}>
                                        <div>
                                          <CKEditor

                                            editor={DecoupledEditor}
                                            // config={editorConfiguration}
                                            // data="<p>Hello from CKEditor 5!</p>"
                                            onReady={editor => {
                                              console.log(
                                                "Editor is ready to use!",
                                                editor
                                              );

                                              // Insert the toolbar before the editable area.
                                              if (editor) {
                                                editor.ui
                                                  .getEditableElement()
                                                  .parentElement.insertBefore(
                                                    editor.ui.view.toolbar.element,
                                                    editor.ui.getEditableElement()
                                                  );
                                              }
                                            }}
                                            onChange={(event, editor) => {
                                              const data = editor.getData();
                                              setDescription(data);
                                            }}

                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                  </div> */}
                                    <div
                                      className="mb-3 w-100"

                                    >
                                      <Row className="mt-2">
                                        {/* <Col md={3}>
                                        <Label for="primaryType" className="form-label">
                                          Primary Type
                                        </Label>
                                      </Col> */}

                                        <Col md={11}>
                                          <div className="form-group-new">
                                            <Select
                                              value={state.selectedPrimaryType}
                                              onChange={
                                                handleSelectGroupPrimaryType
                                              }
                                              options={state.optionPrimaryType}
                                              //classNamePrefix="select2-selection"
                                              className="form-control-new"
                                              style={{ border: "none" }}
                                            />
                                            <label htmlFor="usr">
                                              Primary Type
                                            </label>
                                          </div>
                                          <ErrorMessage
                                            name="primaryType"
                                            component="div"
                                            className="invalid-feedback"
                                          />
                                        </Col>
                                      </Row>
                                    </div>

                                    <div
                                      className="mb-3 w-100"
                                      style={{ marginTop: "-15px" }}
                                    >
                                      <Row>
                                        {/* <Col md={3}>
                                        <Label for="type" className="form-label">
                                          Type
                                        </Label>
                                      </Col> */}

                                        <Col md={11}>
                                          <div className="form-group-new">
                                            <Select
                                              value={state.selectedType}
                                              onChange={handleSelectGroupType}
                                              options={state.optionType}
                                              //classNamePrefix="select2-selection"
                                              className="form-control-new"
                                              style={{ border: "none" }}
                                            />
                                            <label htmlFor="usr">Type</label>
                                          </div>
                                          <ErrorMessage
                                            name="type"
                                            component="div"
                                            className="invalid-feedback"
                                          />
                                        </Col>
                                      </Row>
                                    </div>
                                    <Col md={11} style={{ marginTop: "-15px" }}>
                                      <div className="mb-3 w-100">
                                        <Row>
                                          {/* <Col md={3}>
                                        <Label for="bedroom" className="form-label">
                                          Number Of
                                        </Label>
                                      </Col> */}

                                          <Col md={4}>
                                            <div className="form-group-new">
                                              <Field
                                                name="bedroom"
                                                type="text"
                                                className={
                                                  "form-control" +
                                                  (errors.bedroom &&
                                                    touched.bedroom
                                                    ? " is-invalid"
                                                    : "")
                                                }
                                                placeholder="0"
                                                value={state.bedroom}
                                                onChange={
                                                  handlePropertyFormValues
                                                }
                                              />
                                              <label
                                                htmlFor="usr"
                                                style={{ marginTop: "2px" }}
                                              >
                                                Bedrooms
                                              </label>
                                            </div>
                                            <ErrorMessage
                                              name="bedroom"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                          {/* <Col md={2}>Bedrooms</Col> */}
                                          <Col md={4}>
                                            <div className="form-group-new">
                                              <Field
                                                name="bathroom"
                                                type="text"
                                                placeholder="0"
                                                className={
                                                  "form-control" +
                                                  (errors.bathroom &&
                                                    touched.bathroom
                                                    ? " is-invalid"
                                                    : "")
                                                }
                                                value={state.bathroom}
                                                onChange={
                                                  handlePropertyFormValues
                                                }
                                              />
                                              <label
                                                htmlFor="usr"
                                                style={{ marginTop: "2px" }}
                                              >
                                                Bathrooms
                                              </label>
                                            </div>
                                            <ErrorMessage
                                              name="bathroom"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                          {/* <Col md={2}>Bathrooms</Col> */}
                                          <Col md={4}>
                                            <div className="form-group-new">
                                              <Field
                                                name="car_space"
                                                type="text"
                                                placeholder="0"
                                                className={
                                                  "form-control" +
                                                  (errors.car_space &&
                                                    touched.car_space
                                                    ? " is-invalid"
                                                    : "")
                                                }
                                                value={state.car_space}
                                                onChange={
                                                  handlePropertyFormValues
                                                }
                                              />
                                              <label
                                                htmlFor="usr"
                                                style={{ marginTop: "2px" }}
                                              >
                                                Car Space
                                              </label>
                                            </div>
                                            <ErrorMessage
                                              name="car_space"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                          {/* <Col md={2}>Car Space</Col> */}
                                        </Row>
                                      </div>
                                    </Col>
                                    <Col md={11} style={{ marginTop: "-15px" }}>
                                      <div className="mb-3 w-100 ">
                                        <Row>
                                          {/* <Col md={3} mb-3>
                                        <Label for="floorArea" className="form-label">
                                          Floor Area
                                        </Label>
                                      </Col> */}
                                          <Col md={6}>
                                            <div className="form-group-new ">
                                              <Field
                                                name="floorSize"
                                                type="text"
                                                placeholder="0.00"
                                                className={
                                                  "form-control" +
                                                  (errors.floorSize &&
                                                    touched.floorSize
                                                    ? " is-invalid"
                                                    : "")
                                                }
                                                value={state.floorSize}
                                                onChange={
                                                  handlePropertyFormValues
                                                }
                                              />
                                              <label
                                                htmlFor="usr"
                                                style={{ marginTop: "2px" }}
                                              >
                                                Floor Area
                                              </label>
                                            </div>
                                            <ErrorMessage
                                              name="floorSize"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                          <Col md={6}>
                                            <div className="form-group-new">
                                              <Select
                                                value={state.selectedFloorArea}
                                                onChange={handleSelectFloorArea}
                                                options={state.optionFloorArea}
                                                classNamePrefix="select2-selection"
                                              />
                                              <label htmlFor="usr">
                                                Floor Area Type
                                              </label>
                                            </div>
                                            <ErrorMessage
                                              name="floorArea"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                        </Row>
                                      </div>
                                    </Col>

                                    <Col md={11} style={{ marginTop: "-15px" }}>
                                      <div className="mb-3 w-100 ">
                                        <Row>
                                          {/* <Col md={3}>
                                        <Label for="landSize" className="form-label">
                                          Land Area
                                        </Label>
                                      </Col> */}
                                          <Col md={6}>
                                            <div className="form-group-new">
                                              <Field
                                                name="landSize"
                                                type="text"
                                                placeholder="0.00"
                                                className={
                                                  "form-control" +
                                                  (errors.landSize &&
                                                    touched.landSize
                                                    ? " is-invalid"
                                                    : "")
                                                }
                                                value={state.landSize}
                                                onChange={
                                                  handlePropertyFormValues
                                                }
                                              />
                                              <label htmlFor="usr">
                                                Land Area
                                              </label>
                                            </div>
                                            <ErrorMessage
                                              name="landSize"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                          <Col md={6}>
                                            <div className="form-group-new">
                                              <Select
                                                value={state.selectedLandArea}
                                                onChange={handleSelectLandArea}
                                                options={state.optionLandArea}
                                                classNamePrefix="select2-selection"
                                              />
                                              <label htmlFor="usr">
                                                Land Area Type
                                              </label>
                                            </div>
                                          </Col>
                                        </Row>
                                      </div>
                                    </Col>
                                    <Col md={11} style={{ marginTop: "-15px" }}>
                                      <div className="mb-3 w-100">
                                        <Row>
                                          {/* <Col md={3}>
                                        <Label for="keyNumber" className="form-label">
                                          Key Number
                                        </Label>
                                      </Col> */}
                                          <Col md={12}>
                                            {props.check_unique_key_loading ===
                                              "Failed" && (
                                                <UncontrolledAlert
                                                  color="danger"
                                                  className="alert-dismissible fade show my-2"
                                                  role="alert"
                                                >
                                                  <i className="mdi mdi-block-helper me-2"></i>
                                                  Key number already is in
                                                  use.Please try an unique number
                                                </UncontrolledAlert>
                                              )}
                                            <div className="form-group-new">
                                              <Field
                                                name="keyNumber"
                                                type="text"
                                                className={
                                                  "form-control" +
                                                  (errors.keyNumber &&
                                                    touched.keyNumber
                                                    ? " is-invalid"
                                                    : "")
                                                }
                                                value={state.keyNumber}
                                                onChange={handleKeyNumber}
                                              />
                                              <label htmlFor="usr">
                                                Key Number
                                              </label>
                                            </div>
                                            <ErrorMessage
                                              name="keyNumber"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                            {props.check_unique_key_loading ===
                                              "Failed" && (
                                                <UncontrolledAlert
                                                  color="danger"
                                                  className="alert-dismissible fade show my-2"
                                                  role="alert"
                                                >
                                                  <i className="mdi mdi-block-helper me-2"></i>
                                                  Key number already is in
                                                  use.Please try an unique number
                                                </UncontrolledAlert>
                                              )}
                                          </Col>
                                        </Row>
                                      </div>
                                    </Col>
                                    <Col
                                      md={11}
                                      style={{
                                        marginTop: "-15px",
                                        //marginBottom: "18px",
                                      }}
                                    >
                                      <div className="mb-3 w-100">
                                        <Row>
                                          {/* <Col md={3}>
                                        <Label
                                          for="strataManager"
                                          className="form-label"
                                        >
                                          Strata Manager
                                        </Label>
                                      </Col> */}
                                          <Col md={12}>
                                            <div className="form-group-new">
                                              <Select
                                                value={
                                                  state.selectedStrataManager
                                                }
                                                onChange={
                                                  handleSelectGroupStrataManager
                                                }
                                                options={
                                                  state.optionStrataManager
                                                }
                                                classNamePrefix="select2-selection"
                                              />
                                              <label htmlFor="usr">
                                                Strata Manager
                                              </label>
                                            </div>
                                            <ErrorMessage
                                              name="strataManager"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                        </Row>
                                      </div>
                                    </Col>
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        </Row>
                      </div>

                      <Row>
                        <Col
                          md={12}
                          className="mt-1 d-flex justify-content-end"
                        >
                          <button
                            className="w-md"
                            onClick={goBack}
                            style={{
                              backgroundColor: "#FF8170",
                              border: "none",
                              borderRadius: "4px",
                              padding: "5px 23px",
                            }}
                          >
                            <i className="fas fa-times me-1"></i> Cancel
                          </button>
                          <button
                            className="w-md ms-2"
                            type="submit"
                            // onClick={() => setAddressShow(true)}
                            onClick={handleSave}
                            style={{
                              backgroundColor: "#A9F4E0",
                              border: "none",
                              borderRadius: "4px",
                              padding: "5px 23px",
                            }}
                          >
                            <i className="fas fa-file-alt me-1"></i> Save
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    property_list_data,
    property_list_error,
    property_list_loading,

    property_add_loading,
    property_add_data,

    user_list_data,
    user_list_error,
    user_list_loading,

    property_type_data,
    property_type_error,
    property_type_loading,

    property_strata_manager_data,
    property_strata_manager_error,
    property_strata_manager_loading,

    // property key latest value
    property_key_value,
    property_key_value_error,
    property_key_value_loading,

    check_unique_key_loading,
    check_unique_key_data,
  } = gstate.property;
  return {
    property_list_data,
    property_list_error,
    property_list_loading,

    property_add_loading,
    property_add_data,

    user_list_data,
    user_list_error,
    user_list_loading,

    property_type_data,
    property_type_error,
    property_type_loading,

    property_strata_manager_data,
    property_strata_manager_error,
    property_strata_manager_loading,

    property_key_value,
    property_key_value_error,
    property_key_value_loading,

    check_unique_key_loading,
    check_unique_key_data,
  };
};

Properties.propTypes = {
  google: PropTypes.object,
};

export default withRouter(
  connect(mapStateToProps, {
    addProperty,
    PropertyKey,
    getUser,
    getPropertyType,
    getStrataManager,
    propertyListFresh,
    propertyAddFresh,
    PropertyKeyValueFresh,
    checkUniqueKeyNumber,
    checkUniqueKeyNumberFresh,
  })(
    GoogleApiWrapper({
      apiKey: "AIzaSyD0FeNTACOETan6R_fJ18o5kSgTyoAFabk",
      LoadingContainer: LoadingContainer,
      v: "3",
    })(Properties)
  )
);
