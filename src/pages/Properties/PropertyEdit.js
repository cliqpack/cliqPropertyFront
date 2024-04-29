import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
  UncontrolledAlert,
} from "reactstrap";

import {
  addProperty,
  getUser,
  getPropertyEditInfo,
  updatePropertyInfo,
  getPropertyType,
  getStrataManager,
  propertyUpdateFresh,
  getPropertyInfo,
  getPropertyEditInfoFresh,
  checkUniqueKeyNumber,
  checkUniqueKeyNumberFresh,
  propertyListFresh,
} from "../../store/Properties/actions";
import { contactList } from "store/actions";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { Link, useHistory, useParams, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { propTypes } from "react-bootstrap-editable";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const LoadingContainer = () => <div>Loading...</div>;
import Select from "react-select";

const Properties = props => {
  const style = {
    width: "90%",
    height: "60%",
    borderRadius: "0 0 5px 5px",
  };
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {};
  const history = useHistory();
  const params = useParams();
  const id = params.id;
  const [editPropertyState, setEditPropertyState] = useState({});
  const [description, setDescription] = useState({});
  // console.log(editPropertyState);
  const [addressState, setAddressState] = useState({});
  const [refInv, setRefInv] = useState(false);

  const [inspectionButtonState, setInspectionButtonState] = useState({
    routine_inspections_frequency_type: "Weekly",
    first_routine_frequency_type: "Weekly",
  });
  const [disabledState, setDisabledState] = useState(false);
  const [inspectionWeeklylyBtn, setInspectionWeeklyBtn] = useState(false);
  const [inspectionMonthlyBtn, setInspectionMonthlyBtn] = useState(false);
  const [inspectionFirstRoutineWeeklyBtn, setInspectionFirstRoutineWeeklyBtn] =
    useState(true);
  const [
    inspectionFirstRoutineMonthlyBtn,
    setInspectionFirstRoutineMonthlyBtn,
  ] = useState(false);
  const [propertyEditState, setPropertyEditState] = useState(true);
  document.title = "CliqProperty";
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
  });
  console.log(state);
  const [state2, setState2] = useState({
    location: undefined,
  });

  console.log(state2.location);
  const [mapToggle, setMapToggle] = useState(false);
  const dispatch = useDispatch();

  const [fullAddress, setFullAddress] = useState("");
  const [addressShow, setAddressShow] = useState(false);

  const toggle = () => setAddressShow(prev => !prev);

  const [defaultProps, setDefaultProps] = useState({
    lat: -33.8675,
    lng: 151.2072,
  });

  const dateHandler = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    setEditPropertyState({
      ...editPropertyState,
      ["routine_inspection_due_date"]: dateStr,
    });
  };

  console.log("-----------------");
  console.log(props.property_edit_info_data?.data?.data);
  //react select - design style
  const colourStyles = {
    background: "#023950",
  }

  useEffect(() => {
    if (props.property_update_info_loading === "Success") {
      toastr.success("Updated Successfully");
      props.getPropertyInfo(id);
      props.propertyUpdateFresh();
      props.propertyListFresh();
      props.checkUniqueKeyNumberFresh();
      history.push("/propertyInfo/" + id);
    }

    let optionManager;
    if (props.user_list_data) {
      optionManager = props.user_list_data?.data?.map(item => ({
        label: item.first_name + " " + item.last_name,
        value: item.id,
      }));
      setState(prev => ({ ...prev, optionManager: optionManager }));
    }

    let optionType;
    if (props.property_type_data) {
      optionType = props.property_type_data?.data?.data?.map(item => ({
        label: item.type,
        value: item.id,
      }));
      setState(prev => ({
        ...prev,
        optionType: optionType,
      }));
    }

    let optionStrataManager;

    if (props.property_strata_manager_data) {
      optionStrataManager = props.property_strata_manager_data?.data?.data?.map(item => ({
        label: item.reference + '( ' + item.supplier_details?.folio_code + ' )',
        value: item.id,
      }));
      setState(prev => ({ ...prev, optionStrataManager: optionStrataManager }));
    }

    if (props.property_edit_info_data) {
      setEditPropertyState({
        ...editPropertyState,
        reference: props.property_edit_info_data?.data?.data?.reference,
        // manager: props.property_edit_info_data.data.data.manager_id,
        primaryType: props.property_edit_info_data?.data?.data?.primary_type,
        property_type: props.property_edit_info_data?.data?.data?.property_type,
        bedroom: props.property_edit_info_data?.data?.data?.bedroom,
        bathroom: props.property_edit_info_data?.data?.data?.bathroom,
        car_space: props.property_edit_info_data?.data?.data?.car_space,
        subject: props.property_edit_info_data?.data?.data?.subject,
        floorArea: props.property_edit_info_data?.data?.data?.floor_area,
        address: props.property_edit_info_data?.data?.data?.address,
        floorSize: props.property_edit_info_data?.data?.data?.floor_size,
        landSize: props.property_edit_info_data?.data?.data?.land_size,
        landArea: props.property_edit_info_data?.data?.data?.land_area,
        keyNumber: props.property_edit_info_data?.data?.data?.key_number,
        strataManager:
          props.property_edit_info_data?.data?.data?.strata_manager_id,
        routine_inspections_frequency: Number(
          props.property_edit_info_data?.data?.data
            ?.routine_inspections_frequency
        ),
        first_routine: props.property_edit_info_data?.data?.data?.first_routine,
        routine_inspections_frequency_type:
          props.property_edit_info_data?.data?.data
            ?.routine_inspections_frequency_type,
        note: props.property_edit_info_data?.data?.data?.note,
        youtube_link: props.property_edit_info_data?.data?.data?.youtube_link,
        vr_link: props.property_edit_info_data?.data?.data?.vr_link,
        routine_inspection_due_date:
          props.property_edit_info_data?.data?.data
            ?.routine_inspection_due_date,
      });
      setState(prev => ({
        ...prev,
        selectedManager: {
          label: props.property_edit_info_data?.data.data.manager_name,
          value: props.property_edit_info_data?.data.data.manager_id,
        },
        selectedStrataManager: {
          label: props.property_edit_info_data?.data.data.stata_manager_name,
          value: props.property_edit_info_data?.data.data.strata_manager_id,
        },
        selectedType: {
          label: props.property_edit_info_data?.data?.data?.property_type?.type,
          value: props.property_edit_info_data?.data?.data?.property_type?.id,
        },
        selectedFloorArea: {
          label: props.property_edit_info_data?.data?.data?.floor_area,
          value: props.property_edit_info_data?.data?.data?.floor_area,
        },
        selectedLandArea: {
          label: props.property_edit_info_data?.data?.data?.land_area,
          value: props.property_edit_info_data?.data?.data?.land_area,
        },
      }));
      setAddressState({
        building_name:
          props.property_edit_info_data.data.addressData.building_name,
        country: props.property_edit_info_data.data.addressData.country,
        number: props.property_edit_info_data.data.addressData.number,
        postcode: props.property_edit_info_data.data.addressData.postcode,
        property_id: props.property_edit_info_data.data.addressData.property_id,
        state: props.property_edit_info_data.data.addressData.state,
        street: props.property_edit_info_data.data.addressData.street,
        suburb: props.property_edit_info_data.data.addressData.suburb,
        unit: props.property_edit_info_data.data.addressData.unit,
      });
      setAddressShow(true);

      let building = props.property_edit_info_data.data.addressData
        ?.building_name
        ? props.property_edit_info_data.data.addressData.building_name + " "
        : "";
      let unit = props.property_edit_info_data.data.addressData?.unit
        ? props.property_edit_info_data.data.addressData.unit + "/"
        : "";
      let number = props.property_edit_info_data.data.addressData?.number
        ? props.property_edit_info_data.data.addressData.number + " "
        : "";
      let street = props.property_edit_info_data.data.addressData?.street
        ? props.property_edit_info_data.data.addressData.street + ", "
        : "";
      let suburb = props.property_edit_info_data.data.addressData?.suburb
        ? props.property_edit_info_data.data.addressData.suburb + ", "
        : "";
      let state = props.property_edit_info_data.data.addressData?.state
        ? props.property_edit_info_data.data.addressData.state + " "
        : "";
      let postcode = props.property_edit_info_data.data.addressData?.postcode
        ? props.property_edit_info_data.data.addressData.postcode + " "
        : "";
      let country = props.property_edit_info_data.data.addressData?.country
        ? props.property_edit_info_data.data.addressData.country
        : "";
      setFullAddress(
        building + unit + number + street + suburb + state + postcode + country
      );

      setState2({
        ...state2,
        location: props.property_edit_info_data.data.data.location,
      });

      setDescription(
        props.property_edit_info_data.data.data.description
          ? props.property_edit_info_data.data.data.description
          : " "
      );

      if (props.property_edit_info_data?.data?.data?.location) {
        let arr =
          props.property_edit_info_data?.data?.data?.location.split(",");
        setDefaultProps({
          lat: arr[0],
          lng: arr[1],
        });
      }

      if (
        props.property_edit_info_data.data.data
          .routine_inspections_frequency_type === "Monthly"
      ) {
        setInspectionMonthlyBtn(true);
        setInspectionWeeklyBtn(false);
      } else {
        setInspectionMonthlyBtn(false);
        setInspectionWeeklyBtn(true);
      }
      if (
        props.property_edit_info_data.data.data.first_routine_frequency_type ===
        "Monthly"
      ) {
        setInspectionFirstRoutineMonthlyBtn(true);
        setInspectionFirstRoutineWeeklyBtn(false);
      } else {
        setInspectionFirstRoutineMonthlyBtn(false);
        setInspectionFirstRoutineWeeklyBtn(true);
      }
    }
    if (propertyEditState) {
      props.getPropertyEditInfo(id);
      props.getUser();
      props.getPropertyType();
      props.getStrataManager();
      setPropertyEditState(false);
    }


    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log({ place });
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
      let u = unitN ? unitN + "/ " : "";
      let c = country ? country + " " : "";
      let st = statename ? statename + " " : "";
      let pc = postal_codeN ? postal_codeN + " " : "";
      let sn = suburbN ? suburbN + ", " : "";
      let s = streetN ? streetN + ", " : "";
      let n = street_numberN ? street_numberN + " " : "";

      let reference = streetN + ", " + u + n;
      setEditPropertyState({ ...editPropertyState, reference });
      setMapToggle(false);
      setFullAddress(u + n + s + sn + st + pc + c);
      setAddressState({
        building_name: "",
        unit: unitN,
        number: street_numberN,
        suburb: suburbN,
        street: streetN,
        postcode: postal_codeN,
        state: statename,
        country: country,
      });
      setState2({
        ...state2,
        location:
          place.geometry.location.lat() + `,` + place.geometry.location.lng(),
      });
      setDefaultProps({
        ...defaultProps,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    });
  }, [
    // props,editPropertyState.routine_inspections_frequency,
    props.user_list_data,
    props.property_type_data,
    props.user_list_data,
    props.user_list_loading,
    props.property_type_loading,
    props.property_update_info_loading,
    props.property_edit_info_data,
    props.property_strata_manager_data
  ]);

  function goBack() {
    window.history.back();
  }

  // const saveHandler = e => {
  //   e.preventDefault();
  //   props.updatePropertyInfo(id, editPropertyState, state2, description, state, addressState)
  // }

  const saveHandler = e => {
    e.preventDefault();
    if (
      editPropertyState.reference == undefined ||
      editPropertyState.reference?.length == 0
    ) {
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
      props.updatePropertyInfo(
        id,
        editPropertyState,
        state2,
        description,
        state,
        addressState
      );
    }

    // console.log(Object.keys(state.reference).length);
    // if (state.reference) {
    //   props.addProperty(
    //     state,
    //     state2,
    //     description,
    //     inspectionButtonState,
    //     addressState
    //   );
    // } else {
    //   setRefInv(true);
    //   toastr.warning("Reference cannot be emplty");
    // }
  };

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
    console.log(e);
    setState({ ...state, selectedStrataManager: e });
  };

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

  if (props.user_list_data != null) {
    if (typeof props.user_list_data.data != "undefined") {
      userData = props.user_list_data.data.map((item, key) => (
        <option key={key} value={item.id}>
          {item.first_name + " " + item.last_name}
        </option>
      ));
    }
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
  // console.log('----------');
  // console.log(userData, propertyType);

  // console.log(props.property_edit_info_data);

  const toggleInspectionMonthlyBtn = () => {
    setInspectionButtonState({
      ...inspectionButtonState,
      routine_inspections_frequency_type: "Monthly",
    });
    setInspectionMonthlyBtn(true);
    setInspectionWeeklyBtn(false);
  };
  const toggleInspectionWeeklyBtn = () => {
    setInspectionButtonState({
      ...inspectionButtonState,
      routine_inspections_frequency_type: "Weekly",
    });
    setInspectionWeeklyBtn(true);
    setInspectionMonthlyBtn(false);
  };

  const toggleInspectionFristRoutineMonthlyBtn = () => {
    setInspectionButtonState({
      ...inspectionButtonState,
      first_routine_frequency_type: "Monthly",
    });
    setInspectionFirstRoutineMonthlyBtn(true);
    setInspectionFirstRoutineWeeklyBtn(false);
  };
  const toggleInspectionFirstRoutineWeeklyBtn = () => {
    setInspectionButtonState({
      ...inspectionButtonState,
      first_routine_frequency_type: "Weekly",
    });
    setInspectionFirstRoutineWeeklyBtn(true);
    setInspectionFirstRoutineMonthlyBtn(false);
  };

  const handleRoutineType = e => {
    // let value = editPropertyState.routine_inspections_frequency;
    let value = e.target.value;
    console.log(value);
    // setEditPropertyState(prev => ({
    //   ...prev,
    //   ["routine_inspections_frequency"]: e.target.value,
    // }));
    setEditPropertyState({
      ...editPropertyState,
      ["routine_inspections_frequency"]: e.target.value,
    });
    // if (value) {
    //   setDisabledState(false);
    //   calcRotine();
    // } else {
    //   console.log('-------------yay');
    //   setDisabledState(true);
    //   setEditPropertyState({ ...editPropertyState, routine_inspection_due_date: '' });
    //   // calcRotine();
    // }

    if (value) {
      setDisabledState(false);
    } else {
      setDisabledState(true);
    }
    if (
      e.target.name == "routine_inspections_frequency" &&
      e.target.value !== ""
    ) {
      console.log("-=-=-=-=-=-");
      calcRotine(value);
    } else {
      setEditPropertyState(prev => ({
        ...prev,
        routine_inspection_due_date: "",
      }));
    }
  };

  const calcRotine = async value => {
    let check;
    if (
      inspectionButtonState.routine_inspections_frequency_type === "Weekly" &&
      value
    ) {
      var date = new Date();
      var days = Number(value) * Number("7");
      var date_t = date.addDays(days);
      // date_get(date_t);
      let dtat = "routine_inspection_due_date";
      check = await date_get(date_t);
      await setEditPropertyState(prev => ({
        ...prev,
        ["routine_inspection_due_date"]: check,
      }));
    } else if (
      inspectionButtonState.routine_inspections_frequency_type === "Monthly" &&
      value
    ) {
      var date = new Date();
      //var days = Number(state.routine_inspections_frequency) * 30;
      var days = date.setMonth(date.getMonth() + Number(value));

      let dtat = "routine_inspection_due_date";
      check = await date_get(days);
      await setEditPropertyState(prev => ({ ...prev, [dtat]: check }));
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

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const onMapClickHandler = e => {
    console.log(e);
    // setState2({...state2, location: e.center.lat});
  };

  const moveMarker = (props, marker, e) => {
    console.log(e.latLng.lat(), e.latLng.lng());
    setDefaultProps({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setState2({
      ...state2,
      location: e.latLng.lat() + "," + e.latLng.lng(),
    });
  };
  // console.log(state2);

  const onMarkerClick = e => {
    console.log(e.google.maps.LatLng());
  };

  const addresshandler = (e, statename) => {
    let b = addressState.building_name ? addressState.building_name + " " : "";
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
      sb = e.target.value + ", ";
    } else if (statename === "postcode") {
      pc = e.target.value + " ";
    } else if (statename === "state") {
      s = e.target.value + " ";
    } else if (statename === "country") {
      c = e.target.value;
    }
    let address = b + u + n + st + sb + s + pc + c;
    let reference = st + u + n;
    setEditPropertyState({ ...editPropertyState, reference });
    setFullAddress(address);
    setAddressState({
      ...addressState,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(state2);
  const handleFloorSize = e => {
    setEditPropertyState({
      ...editPropertyState,
      ["floorSize"]: e.target.value,
    });
  };

  const handlePropertyFormValues = e => {
    setEditPropertyState({
      ...editPropertyState,
      [e.target.name]: e.target.value,
    });
    if (e.target.name == "reference" || e.target.value.length > 0) {
      setRefInv(false);
    }
  };

  const handleKeyNumber = e => {
    // setState({ ...state, [e.target.name]: e.target.value });
    setEditPropertyState(prev => ({ ...prev, keyNumber: e.target.value }));
    props.checkUniqueKeyNumber(e.target.value);
  };

  const handleSelectFloorArea = e => {
    setState({ ...state, selectedFloorArea: e });
  };
  const handleSelectLandArea = e => {
    setState({ ...state, selectedLandArea: e });
  };

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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Edit Property" breadcrumbItem="Properties" /> */}
          <h4 className="ms-2 text-primary">Edit Property</h4>
          {/* <h4 className="ms-2 text-primary">Edit {props.property_edit_info_data?.data?.data?.reference}</h4> */}

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
                    reference:
                      (editPropertyState && editPropertyState.reference) || "",
                    manager:
                      (editPropertyState && editPropertyState.manager) || "",

                    building_name:
                      (addressState && addressState.building_name) || "",
                    country: (addressState && addressState.country) || "",
                    number: (addressState && addressState.number) || "",
                    postcode: (addressState && addressState.postcode) || "",
                    property_id:
                      (editPropertyState && editPropertyState.property_id) ||
                      "",
                    state: (addressState && addressState.state) || "",
                    street: (addressState && addressState.street) || "",
                    suburb: (addressState && addressState.suburb) || "",
                    unit: (addressState && addressState.unit) || "",
                    primaryType:
                      (editPropertyState && editPropertyState.primaryType) ||
                      "",
                    property_type:
                      (editPropertyState && editPropertyState.property_type) ||
                      "",
                    bedroom:
                      (editPropertyState && editPropertyState.bedroom) || "",
                    bathroom:
                      (editPropertyState && editPropertyState.bathroom) || "",
                    car_space:
                      (editPropertyState && editPropertyState.car_space) || "",
                    subject:
                      (editPropertyState && editPropertyState.subject) || "",
                    floorSize:
                      (editPropertyState && editPropertyState.floorSize) || "",
                    floorArea:
                      (editPropertyState && editPropertyState.floorArea) || "",
                    // floor_area_UoM: (editPropertyState && editPropertyState.floor_area_UoM) || "",
                    landSize:
                      (editPropertyState && editPropertyState.landSize) || "",
                    landArea:
                      (editPropertyState && editPropertyState.landArea) || "",
                    keyNumber:
                      (editPropertyState && editPropertyState.keyNumber) || "",
                    strataManager:
                      (editPropertyState && editPropertyState.strataManager) ||
                      "",
                    // routine_inspections_UoM: (editPropertyState && editPropertyState.routine_inspections_UoM) || "",
                    first_routine:
                      (editPropertyState && editPropertyState.first_routine) ||
                      "",
                    first_routine_frequency_type:
                      (inspectionButtonState &&
                        inspectionButtonState.first_routine_frequency_type) ||
                      "",
                    routine_inspections_frequency:
                      (editPropertyState &&
                        editPropertyState.routine_inspections_frequency) ||
                      "",
                    routine_inspections_frequency_type:
                      (inspectionButtonState &&
                        inspectionButtonState.routine_inspections_frequency_type) ||
                      "",
                    note: (editPropertyState && editPropertyState.note) || "",
                    youtube_link:
                      (editPropertyState && editPropertyState.youtube_link) ||
                      "",
                    vr_link:
                      (editPropertyState && editPropertyState.vr_link) || "",
                    // first_routine: (editPropertyState && editPropertyState.first_routine) || "",
                    routine_inspection_due_date:
                      (editPropertyState &&
                        editPropertyState.routine_inspection_due_date) ||
                      "",
                  }}
                  validationSchema={Yup.object().shape({
                    reference: Yup.string().required("Please Enter Reference"),
                    manager: Yup.string().required("Manager Name Redquired"),

                    // building_name: Yup.string().required(
                    //   "Please Enter Building"
                    // ),
                    // unit: Yup.string().required("Please Enter Unit"),
                    // number: Yup.string().required("Please Enter Number"),
                    // street: Yup.string().required("Please Enter Street"),
                    // suburb: Yup.string().required("Please Enter Suburb"),
                    // postcode: Yup.string().required("Please Enter Postcode"),
                    // state: Yup.string().required("Please Enter State"),
                    // country: Yup.string().required("Please Enter Country"),

                    // floorSize: Yup.string().required("Floor Size required"),
                    // landSize: Yup.string().required("Land Size Required"),

                    primaryType: Yup.string().required(
                      "Please Enter Primary Type"
                    ),
                    // floorArea: Yup.string().required("Floor Area Required"),
                    // landArea: Yup.string().required("Land Area Required"),
                    // keyNumber: Yup.string().required("Key Number Required"),
                    // strataManager: Yup.string().required(
                    //   "Starta Manager Required"
                    // ),
                    // routine_inspections_frequency:
                    //   Yup.string().required("Required"),
                    // note: Yup.string().required("Please Enter Note"),
                  })}
                  onSubmit={(values, onSubmitProps) => {
                    // dispatch(
                    //   updatePropertyInfo(id, values, state2, description)
                    // );
                  }}
                >
                  {({ errors, status, touched }) => (
                    <Form className="form-horizontal">
                      <div style={{ display: "flex", gap: "20px" }}>
                        <Col md={6}>
                          <Card style={{
                            borderRadius: "15px",
                            backgroundColor: "#F2F6FA",
                            border: "8px solid white",
                            height: "200px"
                          }}>
                            <Row>


                              <div className="w-100">
                                <Row>
                                  <Col
                                    md={1}
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


                                  <Col md={11}>
                                    <CardBody style={{ paddingLeft: "10px" }}>
                                      <CardTitle tag="h5">Name</CardTitle>
                                      <div className="w-100 mt-3">
                                        <Row>
                                          <Col md={11}>
                                            <div className="form-group-new">
                                              <Field
                                                name="reference"
                                                type="text"

                                                onChange={handlePropertyFormValues}
                                                className={
                                                  "form-control" +
                                                  (refInv
                                                    ? " is-invalid"
                                                    : "")
                                                }
                                                style={{ backgroundColor: "#F2F6FA" }}
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

                                      <div className="mb-3 w-100">
                                        <Row>
                                          {/* <Col md={2}>
                                   <Label for="manager" className="form-label">
                                     Manager
                                   </Label>
                                 </Col> */}

                                          <Col md={11} >

                                            <div className="form-group-new">
                                              <Select
                                                value={state.selectedManager}
                                                onChange={handleSelectGroupManager}
                                                options={state.optionManager}
                                                classNamePrefix="select2-selection"
                                                styles={colourStyles}
                                              />
                                              <label htmlFor="usr">Manager</label>
                                            </div>
                                          </Col>
                                        </Row>
                                      </div>
                                    </CardBody>
                                  </Col>
                                </Row>
                              </div>


                            </Row>
                          </Card>


                          <Card style={{
                            borderRadius: "15px",
                            backgroundColor: "#F2F6FA",
                            border: "8px solid white",
                            minHeight: mapToggle ? "1000px" : "200px"

                          }}>
                            <Row>
                              <Col
                                md={1}
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
                              <Col md={11} >

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
                                      {/* <Col md={2}>
                                       <Label for="address" className="form-label">
                                         Address
                                       </Label>
                                     </Col> */}
                                      <Col md={11} style={{ display: "flex" }}>
                                        <div
                                          className="form-group"
                                          style={{ width: "100%" }}
                                        >
                                          <input
                                            name="address"
                                            type="text"
                                            className={
                                              "form-control" +
                                              (errors.address && touched.address
                                                ? " is-invalid"
                                                : "")
                                            }
                                            value={fullAddress}
                                            onChange={e => {
                                              setFullAddress(e.target.value);
                                            }}
                                            ref={inputRef}
                                            style={{ backgroundColor: "#F2F6FA" }}
                                          />
                                          <label htmlFor="usr">
                                            Address
                                          </label>
                                        </div>
                                        <div style={{ marginLeft: "-80px" }} >
                                          {!addressShow ? (
                                            <button
                                              //color="primary"
                                              onClick={toggle}
                                              className="d-flex justify-content-evenly align-items-center"
                                              style={{ backgroundColor: "#F0F0F0", color: "#000 !important", border: "1px solid gray", padding: "3px 10px", border: "none", position: "absolute", marginTop: "5px" }}
                                            >
                                              Details{" "}
                                              <i className="fa fa-solid fa-caret-down ms-1" />
                                            </button>
                                          ) : (
                                            <button
                                              //color="primary"
                                              onClick={toggle}
                                              className="d-flex justify-content-evenly align-items-center"
                                              style={{ backgroundColor: "#F0F0F0", color: "#000 !important", border: "1px solid gray", padding: "3px 10px", border: "none", position: "absolute", marginTop: "5px" }}
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
                                          {/* <Col md={2}>
                                           <Label
                                             for="building"
                                             className="form-label"
                                           >
                                             Building Name
                                           </Label>
                                         </Col> */}

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
                                                <Field
                                                  name="building_name"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.building_name &&
                                                      touched.building_name
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={addressState.building_name}
                                                  onChange={e => {
                                                    addresshandler(e, "building");
                                                  }}
                                                  style={{ backgroundColor: "#F2F6FA" }}
                                                />
                                                <label htmlFor="usr">
                                                  Building Name
                                                </label>
                                              </div>
                                              <ErrorMessage
                                                name="building_name"
                                                component="div"
                                                className="invalid-feedback"
                                              />


                                            </Col>
                                            <Col md={5}>
                                              <div className="form-group">
                                                <Field
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

                                                  style={{ backgroundColor: "#F2F6FA" }}
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

                                        {/* <Row className="mt-2">
                                         <Col md={2}>
                                           <Label
                                             for="unit"
                                             className="form-label"
                                           >
                                             Unit
                                           </Label>
                                         </Col>

                                         <Col>
                                           <Field
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
                                           <ErrorMessage
                                             name="unit"
                                             component="div"
                                             className="invalid-feedback"
                                           />
                                         </Col>
                                       </Row> */}

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
                                            {/* <Col md={2}>
                                           <Label
                                             for="number"
                                             className="form-label"
                                           >
                                             Number
                                           </Label>
                                         </Col> */}

                                            <Col md={5}>
                                              <div className="form-group">
                                                <Field
                                                  name="number"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.number && touched.number
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={addressState.number}
                                                  onChange={e => {
                                                    addresshandler(e, "number");
                                                  }}
                                                  style={{ backgroundColor: "#F2F6FA" }}
                                                />
                                                <label htmlFor="usr">
                                                  Number
                                                </label>
                                              </div>
                                            </Col>

                                            <Col md={5}>
                                              <div className="form-group">
                                                <Field
                                                  name="street"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.street && touched.street
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={addressState.street}
                                                  onChange={e => {
                                                    addresshandler(e, "street");
                                                  }}
                                                  style={{ backgroundColor: "#F2F6FA" }}
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

                                            <ErrorMessage
                                              name="number"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                        </Row>

                                        {/* <Row className="mt-2">
                                         <Col md={2}>
                                           <Label
                                             for="street"
                                             className="form-label"
                                           >
                                             Street
                                           </Label>
                                         </Col>

                                         <Col>
                                           <Field
                                             name="street"
                                             type="text"
                                             className={
                                               "form-control" +
                                               (errors.street && touched.street
                                                 ? " is-invalid"
                                                 : "")
                                             }
                                             value={addressState.street}
                                             onChange={e => {
                                               addresshandler(e, "street");
                                             }}
                                           />

                                           <ErrorMessage
                                             name="street"
                                             component="div"
                                             className="invalid-feedback"
                                           />
                                         </Col>
                                       </Row> */}

                                        <Row className="mt-2">
                                          {/* <Col md={2}>
                                           <Label
                                             for="suburb"
                                             className="form-label"
                                           >
                                             Suburb
                                           </Label>
                                         </Col> */}

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
                                                <Field
                                                  name="suburb"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.suburb && touched.suburb
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={addressState.suburb}
                                                  onChange={e => {
                                                    addresshandler(e, "suburb");
                                                  }}
                                                  style={{ backgroundColor: "#F2F6FA" }}
                                                />
                                                <label htmlFor="usr">
                                                  Suburb
                                                </label>
                                              </div>
                                            </Col>

                                            <ErrorMessage
                                              name="suburb"
                                              component="div"
                                              className="invalid-feedback"
                                            />

                                            <Col md={5}>
                                              <div className="form-group">
                                                <Field
                                                  name="postcode"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.postcode && touched.postcode
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={addressState.postcode}
                                                  onChange={e => {
                                                    addresshandler(e, "postcode");
                                                  }}
                                                  style={{ backgroundColor: "#F2F6FA" }}
                                                />
                                                <label htmlFor="usr">
                                                  Postcode
                                                </label>
                                              </div>
                                            </Col>

                                            <ErrorMessage
                                              name="postcode"
                                              component="div"
                                              className="invalid-feedback"
                                            />
                                          </Col>
                                        </Row>

                                        {/* <Row className="mt-2">
                                         <Col md={2}>
                                           <Label
                                             for="postcode"
                                             className="form-label"
                                           >
                                             Postcode
                                           </Label>
                                         </Col>

                                         <Col>
                                           <Field
                                             name="postcode"
                                             type="text"
                                             className={
                                               "form-control" +
                                               (errors.postcode && touched.postcode
                                                 ? " is-invalid"
                                                 : "")
                                             }
                                             value={addressState.postcode}
                                             onChange={e => {
                                               addresshandler(e, "postcode");
                                             }}
                                           />
                                         </Col>

                                         <ErrorMessage
                                           name="postcode"
                                           component="div"
                                           className="invalid-feedback"
                                         />
                                       </Row> */}

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
                                            {/* <Col md={2}>
                                           <Label
                                             for="state"
                                             className="form-label"
                                           >
                                             State
                                           </Label>
                                         </Col> */}

                                            <Col md={5}>
                                              <div className="form-group">
                                                <Field
                                                  name="state"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.state && touched.state
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={addressState.state}
                                                  onChange={e => {
                                                    addresshandler(e, "state");
                                                  }}
                                                  style={{ backgroundColor: "#F2F6FA" }}
                                                />
                                                <label htmlFor="usr">
                                                  State
                                                </label>
                                              </div>
                                            </Col>

                                            <ErrorMessage
                                              name="state"
                                              component="div"
                                              className="invalid-feedback"
                                            />

                                            <Col md={5}>
                                              <div className="form-group">
                                                <Field
                                                  name="country"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.country && touched.country
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={addressState.country}
                                                  onChange={e => {
                                                    addresshandler(e, "country");
                                                  }}
                                                  style={{ backgroundColor: "#F2F6FA" }}
                                                />
                                                <label htmlFor="usr">
                                                  Country
                                                </label>
                                              </div>
                                            </Col>
                                            <ErrorMessage
                                              name="country"
                                              component="div"
                                              className="invalid-feedback"
                                            />

                                          </Col>
                                        </Row>

                                        {/* <Row className="mt-2">
                                         <Col md={2}>
                                           <Label
                                             for="country"
                                             className="form-label"
                                           >
                                             Country
                                           </Label>
                                         </Col>

                                         <Col>
                                           <Field
                                             name="country"
                                             type="text"
                                             className={
                                               "form-control" +
                                               (errors.country && touched.country
                                                 ? " is-invalid"
                                                 : "")
                                             }
                                             value={addressState.country}
                                             onChange={e => {
                                               addresshandler(e, "country");
                                             }}
                                           />
                                         </Col>
                                         <ErrorMessage
                                           name="country"
                                           component="div"
                                           className="invalid-feedback"
                                         />
                                       </Row> */}
                                      </div>
                                    )}
                                  </div>

                                  <div className="mb-3 w-100">
                                    <Row>
                                      {/* <Col md={2}>
                                       <Label for="location" className="form-label">
                                         Location
                                       </Label>
                                     </Col> */}

                                      <Col md={11} className="mb-3" style={{ display: "flex", marginTop: "15px" }}>
                                        <div
                                          className="form-group-new"
                                          style={{ width: "92%" }}
                                        >
                                          <input
                                            type="text"
                                            className={
                                              "form-control" +
                                              (errors.location && touched.location
                                                ? " is-invalid"
                                                : "")
                                            }
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

                                            style={{ backgroundColor: "#F2F6FA" }}
                                          />
                                          <label
                                            htmlFor="usr"
                                            style={{ marginTop: "3px" }}
                                          >
                                            Location
                                          </label>
                                        </div>
                                        <div style={{ width: "8%" }}>
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

                                        <ErrorMessage
                                          name="location"
                                          component="div"
                                          className="invalid-feedback"
                                        />

                                      </Col>
                                    </Row>
                                  </div>
                                  <div >
                                    {mapToggle ? (
                                      <div
                                        style={{
                                          height: "300px ",
                                          width: "90% ",
                                          overflow: "hidden",
                                          marginTop: "-50px"

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


                          <Card style={{
                            borderRadius: "15px",
                            backgroundColor: "#F2F6FA",
                            border: "8px solid white",

                          }}>
                            <Row style={{ marginBottom: addressShow ? "130px" : "0px" }}>
                              <Col
                                md={1}
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

                              <Col md={11} style={{ padding: "0px" }}>
                                <CardBody style={{ paddingLeft: "10px" }}>
                                  <CardTitle tag="h5">Inspection</CardTitle>

                                  <div
                                    className="w-100 mt-3"
                                    style={{ marginBottom: "-15px" }}
                                  >
                                    <Row className="mb-3 w-100">
                                      {/* <Col md={2}>
                                       <Label
                                         for="routine_inspections_frequency"
                                         className="form-label"
                                       >
                                         Routine Inspection Frequency
                                       </Label>
                                     </Col> */}
                                      <Col md={6}>
                                        <div className="form-group">
                                          <Field
                                            name="routine_inspections_frequency"
                                            type="number"
                                            className={
                                              "form-control" +
                                              (errors.routine_inspections_frequency &&
                                                touched.routine_inspections_frequency
                                                ? " is-invalid"
                                                : "")
                                            }
                                            value={
                                              editPropertyState.routine_inspections_frequency
                                            }
                                            onChange={handleRoutineType}
                                            style={{ backgroundColor: "#F2F6FA" }}
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
                                      <Col md={6}>
                                        <div className="btn-group btn-group-justified">
                                          <div className="btn-group">
                                            <Button
                                              color={
                                                inspectionWeeklylyBtn
                                                  ? "switchButtonColor"
                                                  : "switchButtonOppsiteColor"
                                              }
                                              onClick={toggleInspectionWeeklyBtn}
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
                                              onClick={toggleInspectionMonthlyBtn}
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
                                    className="w-100 mt-3"
                                    style={{ marginBottom: "-15px" }}
                                  >
                                    <Row className="mb-3 w-100">
                                      {/* <Col md={2}>
                                       <Label for="first_routine" className="form-label">
                                         First Routine (Optional)
                                       </Label>
                                     </Col> */}
                                      <Col md={6}>
                                        <div className="form-group-new">
                                          <Field
                                            disabled={disabledState}
                                            name="first_routine"
                                            type="number"
                                            className={
                                              "form-control" +
                                              (errors.first_routine && touched.first_routine
                                                ? " is-invalid"
                                                : "")
                                            }
                                            value={editPropertyState.first_routine}
                                            onChange={event => {
                                              setEditPropertyState(prevEditState => ({
                                                ...prevEditState,
                                                first_routine: event.target.value,
                                              }));
                                            }}
                                            style={{ backgroundColor: "#F2F6FA" }}
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
                                    className="w-100 mt-3"
                                    style={{ marginBottom: "-15px" }}
                                  >
                                    <Row className="mb-3 w-100">
                                      {/* <Col md={2}>
                                       <Label
                                         for="routine_inspection_due_date"
                                         className="form-label"
                                       >
                                         Routine inspection due
                                       </Label>
                                     </Col> */}
                                      <Col md={10}>
                                        {/* <Field
                               name="routine_inspection_due_date"
                               type="date"
                               disabled={disabledState}
                               className={
                                 "form-control" +
                                 (errors.routine_inspection_due_date &&
                                   touched.routine_inspection_due_date
                                   ? " is-invalid"
                                   : "")
                               }
                               onChange={event => {
                                 setEditPropertyState(prevEditState => ({
                                   ...prevEditState,
                                   routine_inspection_due_date:
                                     event.target.value,
                                 }));
                               }}
                             /> */}
                                        <div className="form-group-new">
                                          <Flatpickr
                                            className="form-control d-block"
                                            placeholder="Pick a date..."
                                            value={editPropertyState.routine_inspection_due_date}
                                            // disabled={disabledState}
                                            // onChange={() => dateHandler()}
                                            options={{
                                              altInput: true,
                                              format: "d/m/Y",
                                              altFormat: "d/m/Y",
                                              onChange: dateHandler
                                            }}
                                            style={{ backgroundColor: "#F2F6FA" }}
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
                                    </Row>
                                  </div>
                                  <div className="mb-3 w-100">
                                    <Row>
                                      {/* <Col md={2}>
                                       <Label for="note" className="form-label">
                                         Notes
                                       </Label>
                                     </Col> */}
                                      <Col md={10}>
                                        <div className="form-group-new">
                                          <input
                                            //as="textarea"
                                            type="textarea"
                                            id="textarea"
                                            name="note"
                                            maxLength="225"
                                            rows="3"
                                            cols="90"
                                            placeholder="This text area has a limit of 225 chars."
                                            value={editPropertyState.note}
                                            //   onChange={handlePropertyFormValues}
                                            className="form-control"
                                            onChange={event => {
                                              setEditPropertyState(prevEditState => ({
                                                ...prevEditState,
                                                note: event.target.value,
                                              }));
                                            }}
                                            style={{ height: "65px", backgroundColor: "#F2F6FA" }}

                                          />
                                          <label
                                            htmlFor="usr"
                                            style={{
                                              height: "-90px",
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

                        </Col>

                        {/* =============details start====== */}
                        <Col md={6}>
                          <Card style={{
                            borderRadius: "15px",
                            backgroundColor: "#F2F6FA",
                            border: "8px solid white",
                          }}>
                            <Row>
                              <Col
                                md={1}
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
                                      height: "940px",
                                      position: "absolute",
                                      left: "17px",
                                      top: "28px",
                                      background:
                                        "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)",
                                    }}
                                  ></div>
                                </div>
                              </Col>
                              <Col md={11} style={{ padding: "0px" }}>
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
                                      {/* <Col md={2}>
                                       <Label for="subject" className="form-label">
                                         Subject
                                       </Label>
                                     </Col> */}

                                      <Col md={11}>
                                        <div className="form-group-new">
                                          <Field
                                            name="reference"
                                            type="text"
                                            value={editPropertyState.subject}
                                            onChange={event => {
                                              setEditPropertyState(prevEditState => ({
                                                ...prevEditState,
                                                subject: event.target.value,
                                              }));
                                            }}
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
                                      {/* <Col md={2}>
                                       <Label for="description" className="form-label">
                                         Description
                                       </Label>
                                     </Col> */}
                                      <Col md={11} >
                                        <div className="form-group-desc" style={{ height: "425px", overflowY: "scroll" }}>
                                          <CKEditor
                                            editor={DecoupledEditor}
                                            data={description}
                                            config={editorConfiguration}
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
                                              // console.log({ event, editor, data });
                                              setDescription(data);
                                            }}
                                          // onBlur={(event, editor) => {
                                          //   console.log('Blur.', editor);
                                          // }}
                                          // onFocus={(event, editor) => {
                                          //   console.log('Focus.', editor);
                                          // }}
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
                                  <div className="w-100" style={{ marginTop: "40px" }}>
                                    <Row>
                                      {/* <Col md={2}>
                                       <Label for="primaryType" className="form-label">
                                         Primary Type
                                       </Label>
                                     </Col> */}
                                      <Col md={11}>

                                        <div className="form-group-new">
                                          <Select
                                            value={state.selectedPrimaryType}
                                            onChange={handleSelectGroupPrimaryType}
                                            options={state.optionPrimaryType}
                                            classNamePrefix="select2-selection"
                                          />
                                          <label htmlFor="usr">
                                            Primary Type
                                          </label>
                                        </div>
                                        <ErrorMessage
                                          name="primayType"
                                          component="div"
                                          className="invalid-feedback"
                                        />
                                      </Col>
                                    </Row>
                                  </div>

                                  <div className="mb-3 w-100">
                                    <Row>
                                      {/* <Col md={2}>
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
                                            classNamePrefix="select2-selection"
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
                                        {/* <Col md={2}>
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
                                                (errors.bedroom && touched.bedroom
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              placeholder="0"
                                              value={editPropertyState.bedroom}
                                              onChange={event => {
                                                setEditPropertyState(prevEditState => ({
                                                  ...prevEditState,
                                                  bedroom: event.target.value,
                                                }));
                                              }}
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
                                              className={
                                                "form-control" +
                                                (errors.bathroom && touched.bathroom
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              value={editPropertyState.bathroom}
                                              onChange={event => {
                                                setEditPropertyState(prevEditState => ({
                                                  ...prevEditState,
                                                  bathroom: event.target.value,
                                                }));
                                              }}
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
                                              className={
                                                "form-control" +
                                                (errors.car_space && touched.car_space
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              value={editPropertyState.car_space}
                                              onChange={event => {
                                                setEditPropertyState(prevEditState => ({
                                                  ...prevEditState,
                                                  car_space: event.target.value,
                                                }));
                                              }}
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

                                      </Row>
                                    </div>
                                  </Col>


                                  <Col md={11} style={{ marginTop: "-15px" }}>
                                    <div className="mb-3 w-100">
                                      <Row>
                                        {/* <Col md={2} mb-3>
                                       <Label for="floorArea" className="form-label">
                                         Floor Area
                                       </Label>
                                     </Col> */}
                                        <Col md={6}>
                                          <div className="form-group-new">
                                            <Field
                                              name="floorSize"
                                              type="text"
                                              onChange={handleFloorSize}
                                              placeholder="0.00"

                                              value={editPropertyState.floorSize}
                                              className={
                                                "form-control" +
                                                (errors.floorSize && touched.floorSize
                                                  ? " is-invalid"
                                                  : "")
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

                                    <div className="mb-3 w-100">
                                      <Row>
                                        {/* <Col md={2}>
                                       <Label for="landArea" className="form-label">
                                         Land Area
                                       </Label>
                                     </Col> */}
                                        <Col md={6}>
                                          <div className="form-group-new">
                                            <Field
                                              name="landSize"
                                              type="number"
                                              placeholder="0.00"

                                              value={editPropertyState.landSize}
                                              className={
                                                "form-control" +
                                                (errors.landSize && touched.landSize
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              onChange={event => {
                                                setEditPropertyState(prevEditState => ({
                                                  ...prevEditState,
                                                  landSize: event.target.value,
                                                }));
                                              }}
                                            />
                                            <label htmlFor="usr">
                                              Land Area
                                            </label>
                                          </div>
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
                                        {/* <Col md={2}>
                                         <Label for="keyNumber" className="form-label">
                                           Key Number
                                         </Label>
                                       </Col> */}
                                        <Col md={12}>
                                          <div className="form-group-new">
                                            <Field
                                              name="keyNumber"
                                              type="text"
                                              className={
                                                "form-control" +
                                                (errors.keyNumber && touched.keyNumber
                                                  ? " is-invalid"
                                                  : "")
                                              }
                                              value={editPropertyState.keyNumber}
                                              // onChange={event => {
                                              //   setEditPropertyState(prevEditState => ({
                                              //     ...prevEditState,
                                              //     keyNumber: event.target.value,
                                              //   }));
                                              // }}
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
                                          {props.check_unique_key_loading === 'Failed' &&
                                            <UncontrolledAlert
                                              color="danger"
                                              className="alert-dismissible fade show my-2"
                                              role="alert"
                                            >
                                              <i className="mdi mdi-block-helper me-2"></i>Key number already is in use.Please try an unique number
                                            </UncontrolledAlert>
                                          }
                                        </Col>
                                      </Row>
                                    </div>

                                  </Col>


                                  <Col
                                    md={11}
                                    style={{
                                      marginTop: "-15px",
                                      marginBottom: "-22px",
                                    }}
                                  >
                                    <div className="mb-3 w-100">
                                      <Row>
                                        {/* <Col md={2}>
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
                                              value={state.selectedStrataManager}
                                              onChange={handleSelectGroupStrataManager}
                                              options={state.optionStrataManager}
                                              classNamePrefix="select2-selection"
                                            />
                                            <label htmlFor="usr">
                                              Strata Manager
                                            </label>
                                          </div>
                                        </Col>
                                      </Row>
                                    </div>
                                  </Col>
                                </CardBody>
                              </Col>
                            </Row>

                          </Card>

                          <Card style={{
                            borderRadius: "15px",
                            backgroundColor: "#F2F6FA",
                            border: "8px solid white",
                          }}>
                            <Row>
                              <Col
                                md={1}
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

                              <Col md={11} style={{ padding: "0px" }}>
                                <CardBody style={{ paddingLeft: "10px" }}>
                                  <CardTitle tag="h5">Links</CardTitle>

                                  <div
                                    className="mb-3 w-100"
                                    style={{
                                      marginBottom: "-50px",
                                      marginTop: "20px",
                                    }}
                                  >



                                    <Row>
                                      {/* <Col md={2}>
                                       <Label for="vr_link" className="form-label">
                                         VR Link
                                       </Label>
                                     </Col> */}

                                      <Col md={10}>
                                        <div className="form-group-new">
                                          <Field
                                            name="vr_link"
                                            type="text"
                                            value={editPropertyState.vr_link}
                                            onChange={event => {
                                              setEditPropertyState(prevEditState => ({
                                                ...prevEditState,
                                                vr_link: event.target.value,
                                              }));
                                            }}
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
                                  <div className="mb-1 w-100">
                                    <Row>
                                      {/* <Col md={2}>
                                       <Label
                                         for="youtube_link"
                                         className="form-label"
                                       >
                                         Youtube
                                       </Label>
                                     </Col> */}

                                      <Col md={10}>
                                        <div className="form-group-new" style={{ marginTop: "-20px" }}>
                                          <Field
                                            name="youtube_link"
                                            type="text"
                                            value={editPropertyState.youtube_link}
                                            onChange={event => {
                                              setEditPropertyState(prevEditState => ({
                                                ...prevEditState,
                                                youtube_link: event.target.value,
                                              }));
                                            }}
                                            className={
                                              "form-control" +
                                              (errors.youtube_link && touched.youtube_link
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
                        {/* =============details ends====== */}

                      </div>

                      <Row>
                        <Col md={12} className="mt-1 d-flex justify-content-end">
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
                            onClick={saveHandler}
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

    user_list_data,
    user_list_error,
    user_list_loading,

    property_edit_info_data,
    property_edit_info_error,
    property_edit_info_loading,

    property_update_info_data,
    property_update_info_error,
    property_update_info_loading,

    property_type_data,
    property_type_error,
    property_type_loading,

    property_strata_manager_data,
    property_strata_manager_error,
    property_strata_manager_loading,

    check_unique_key_loading,
    check_unique_key_data,
  } = gstate.property;
  return {
    property_list_data,
    property_list_error,
    property_list_loading,

    property_add_loading,

    user_list_data,
    user_list_error,
    user_list_loading,

    property_edit_info_data,
    property_edit_info_error,
    property_edit_info_loading,

    property_update_info_data,
    property_update_info_error,
    property_update_info_loading,

    property_type_data,
    property_type_error,
    property_type_loading,

    property_strata_manager_data,
    property_strata_manager_error,
    property_strata_manager_loading,

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
    getUser,
    getPropertyEditInfo,
    updatePropertyInfo,
    getPropertyType,
    getStrataManager,
    propertyUpdateFresh,
    getPropertyInfo,
    getPropertyEditInfoFresh,
    checkUniqueKeyNumber,
    checkUniqueKeyNumberFresh,
    propertyListFresh,
  })(
    GoogleApiWrapper({
      apiKey: "AIzaSyD0FeNTACOETan6R_fJ18o5kSgTyoAFabk",
      LoadingContainer: LoadingContainer,
      v: "3",
    })(Properties)
  )
);