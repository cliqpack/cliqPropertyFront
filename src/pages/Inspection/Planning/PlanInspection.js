import React, { useState, useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";
import Select from "react-select";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import "./PlanInspection.css";
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
  UncontrolledAlert,
  FormGroup,
} from "reactstrap";

import {
  getUser,
  geographicLocationData,
  geographicLocationFresh,
  filteredInspectionData,
  filterFresh,
} from "store/actions";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import makeAnimated from "react-select/animated";

//common
// import TextualInputs from "./TextualInputs"

import { Link, useHistory, withRouter } from "react-router-dom";
import * as Yup from "yup";
import toastr from "toastr";

//Import Breadcrumb
import { propTypes } from "react-bootstrap-editable";

import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import Breadcrumbs from "components/Common/Breadcrumb";

const LoadingContainer = () => <div>Loading...</div>;

const animatedComponents = makeAnimated();

const date_get = dTime => {
  var today = undefined;
  var td = new Date(dTime);
  var dd = String(td.getDate()).padStart(2, "0");
  var mm = String(td.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = td.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  return today;
};

var date = new Date();
var days = date.setMonth(date.getMonth() + Number(1));

var days = date_get(days);

// console.log(days);
document.title = "CliqProperty";

const PlanInspection = props => {
  const history = useHistory();
  const [state, setState] = useState({
    manager: "All",
    inspection_due_to_date: days,

  });
  const [gmapState, setGmapState] = useState({
    selectedPlace: {},
  });
  const [selectedState, setSelectedState] = useState([]);
  const [propertyState, setPropertyState] = useState([
    { propertyName: "Property 1" },
    { propertyName: "Property 2" },
    { propertyName: "Property 3" },
    { propertyName: "Property 4" },
    { propertyName: "Property 5" },
    { propertyName: "Property 6" },
  ]);
  const [optionGroup, setOptionGroup] = useState();
  const [init, setInit] = useState(true);
  const [start, setStart] = useState(true);
  const [property, setProperty] = useState([]);
  const [index, setIndex] = useState(0);
  const [location, setLocation] = useState({ lat: "", lng: "" });

  const [check, setCheck] = useState({
    inspections: false, inspectionDue: false, agreementEnding: false, agreementEndingBetween: false
  });

  const handlePropertyFormValues = async e => {
    if (e.target.name == 'inspection_due_from_date') {
      setCheck({ ...check, inspectionDue: true })
      setState({ ...state, [e.target.name]: e.target.value });

    } else
      if (e.target.name == 'agreement_ending_from_date') {
        setCheck({ ...check, agreementEnding: true })
        setState({ ...state, [e.target.name]: e.target.value });

      }
    if (e.target.name == 'agreement_ending_to_date') {
      setCheck({ ...check, agreementEndingBetween: true })
      setState({ ...state, [e.target.name]: e.target.value });

    }
    else {

      setState({ ...state, [e.target.name]: e.target.value });
    }
    // console.log("====================================");
    // console.log("pros 1");
    // console.log(e.target.value);
    // console.log(state);
    // console.log("====================================");
    // await handleStateAction(state);
  };

  const handleStateAction = async state => {
    // console.log("====================================");
    // console.log("pros 2");
    // console.log(state);
    // console.log("====================================");
    props.filteredInspectionData(state);
  };
  // handleStateAction(state);
  const onMarkerClick = (id, ref, item) => {
    //alert("You clicked in this marker"+id+" "+ref);

    setSelectedState([...selectedState, { label: ref, value: id }]);
    setProperty([
      ...property,
      {
        item: item,
        id: index,
        i: index,
        description: "card" + index,
        title: "title" + index,
      },
    ]);
    const i = index + 1;
    setIndex(i);
  };
  const handleIDate = value => {
    console.log(value);
    setState({ ...state, inspection_date: value });
    setStart(false);
    setCheck({ ...check, inspections: true })
  };

  const setSchedule = () => {
    history.push({
      pathname: "/inspectionDay/" + state.inspection_date,
      state: {
        property: selectedState,
        selectedProp: property,
        locations: props.filter_data,
      },
    });
    // console.log("====================================");
    // console.log(property);
    // console.log("====================================");
  };

  const handleMulti3 = e => {
    let myPromise = new Promise(resolve => {
      setSelectedState(e);
      console.log(e);
      resolve();
    });
    myPromise.then(() => {
      reduce(e);
    });
  };

  const reduce = data => {
    var props = "";
    var select = "";
    var final = [];

    var bar = new Promise((resolve, reject) => {
      props = property;
      select = data;
      console.log("====================================");
      console.log(props);
      console.log(select);
      console.log("====================================");
      resolve();
    });
    bar.then(() => {
      select.forEach((item, key) => {
        props.forEach((item1, key1) => {
          if (item1.item.id == item.value) {
            final.push({
              item: item1.item,
              id: key,
              i: key,
              description: "card" + key,
              title: "title" + key,
            });
            // console.log(final);
          }
        });
      });
    });
    bar.then(() => {
      // console.log(final);
      setProperty(final);
      // return final;
    });
  };

  const dateHandler = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    // setState({ ...state, ['inspection_date']: dateStr });
    handleIDate(dateStr)
  }

  const inspectionDueBetweenDateHandler = (selectedDates, dateStr, instance) => {
    setState({ ...state, ['inspection_due_from_date']: dateStr });
  }

  const inspectionDueBetweenToDateHandler = (selectedDates, dateStr, instance) => {
    setState({ ...state, ['inspection_due_to_date']: dateStr });
  }
  const agreementEndingBetweenDateHandler = (selectedDates, dateStr, instance) => {
    setState({ ...state, ['agreement_ending_from_date']: dateStr });
  }
  const agreementEndingBetweenToDateHandler = (selectedDates, dateStr, instance) => {
    setState({ ...state, ['agreement_ending_to_date']: dateStr });
  }

  useEffect(() => {
    if (props.user_list_loading == false) {
      props.getUser();
    } else if (props.geographic_loading === false) {
      props.geographicLocationData();
      // props.geographicLocationFresh();
    }
    let userDatas = JSON.parse(localStorage.getItem("authUser"));
    let address = userDatas.user?.address;
    var lat = undefined;
    var lng = undefined;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        address: address,
      },
      function (results, status) {
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        setLocation({ ...location, lat: lat, lng: lng });
      }
    );

    handleStateAction(state);
  }, [props.user_list_loading, state]);

  if (init) {
    props.filteredInspectionData(state);
    setInit(false);
  }

  const dispatch = useDispatch();

  const mapProperties = propertyState.map((item, idx) => {
    return (
      <Col md={6} key={idx}>
        <UncontrolledAlert
          color="info"
          className="alert-dismissible fade show mb-0"
          role="alert"
        >
          <i className="mdi mdi-alert-circle-outline me-2"></i>
          {item.propertyName}
        </UncontrolledAlert>
      </Col>
    );
  });

  let userData = undefined;
  if (props.user_list_data) {
    userData = props.user_list_data?.data?.map((item, key) => (
      <option key={key} value={item.id}>
        {item.first_name + " " + item.last_name}
      </option>
    ));
  }
  let propertyDataLength, propertyLocationData;
  if (props.geographic_data) {
    propertyDataLength = props.geographic_data?.data?.data.length;
    propertyLocationData = props.geographic_data?.data?.data.map(
      (item, idx) => (
        <>
          <span className="link_underline" key={idx}>
            <Link to={"/propertyEdit/" + item.id}>{item.reference}</Link>
          </span>
          , &nbsp;
        </>
      )
    );
  }

  // console.log(props.filter_data);

  return (
    <React.Fragment>

      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Plan Inspections" breadcrumbItem="Inspections" /> */}
          <h4 className="ms-2 text-primary">Plan Inspections</h4>
          <div className="d-flex flex-column justify-content-start">
            <div className="py-2 ps-3">
              <Row className="p-0">
                <Col md={6} xs={12} className="mb-3 p-0">
                  <Card className="custom_card_border_design me-2" >
                    <CardBody>
                      <form className="form-horizontal mt-2">
                        <Row className="pr-2">

                          <Col md={8}>
                            <div className="form-group-new">
                              <Flatpickr
                                className="form-control d-block"
                                placeholder="Pick a Date..."
                                value={state.inspection_date}
                                // onChange={() => dateHandler()}
                                options={{
                                  altInput: true,
                                  format: "d/m/Y",
                                  altFormat: "d/m/Y",
                                  onChange: dateHandler
                                }}
                              />
                              <label htmlFor="usr">Inspection Date</label>
                            </div>
                          </Col>
                          <Col md={4}>
                            <button
                              className="btn btn-buttonColor"
                              disabled={start}
                              onClick={() => {
                                setSchedule();
                              }}
                              type="button"
                            >
                              Start Planning
                            </button>
                          </Col>
                        </Row>

                        <Row className="mt-2">
                          <Col md={11}>
                            <div className="form-group-new">
                              <select
                                className="form-select custom-bg-color-form-field"
                                type="select"
                                name="manager"
                                id="manager"
                                onChange={e => {
                                  handlePropertyFormValues(e);
                                  // await handleStateAction(state);
                                }}


                              >
                                <option value="All">All</option>
                                {userData}
                              </select>
                              <label htmlFor="usr">Property manager</label>
                            </div>

                          </Col>
                        </Row>
                        <Row className="mb-3 mb-3 justify-content-evenly align-items-center">
                          <Col md={3}>
                            <Label for="data_set" className="form-label">
                              No date set
                            </Label>
                          </Col>
                          <Col md={9}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="data_set"
                              id="data_set"
                              onChange={e => {
                                handlePropertyFormValues(e);
                                // handleStateAction(state);
                              }}
                            />
                            &nbsp; Show properties with no due inspection date set
                          </Col>

                        </Row>

                        <Row className="mt-2 mb-3 mb-3 justify-content-left align-items-top">
                          <Col md={12}>
                            <Label for="inspection_due_date" className="form-label" style={{ color: "#159B9C" }}>
                              Inspection date between
                            </Label>
                          </Col>
                        </Row>
                        <Row className="mt-2 align-items-top">

                          <Col md={5}>

                            <div className="form-group-new">
                              <Flatpickr
                                className="form-control d-block"
                                placeholder="Pick a Date..."
                                value={state.inspection_due_from_date
                                }

                                options={{
                                  altInput: true,
                                  format: "d/m/Y",
                                  altFormat: "d/m/Y",
                                  onChange: inspectionDueBetweenDateHandler
                                }}
                              />
                              <label htmlFor="usr">Date</label>
                            </div>
                          </Col>
                          <Col md={1}>To</Col>
                          <Col md={5}>
                            <div className="form-group-new">
                              <Flatpickr
                                className="form-control d-block"
                                placeholder="Pick a Date..."
                                value={state.inspection_due_to_date
                                }
                                // onChange={() => dateHandler()}
                                options={{
                                  altInput: true,
                                  format: "d/m/Y",
                                  altFormat: "d/m/Y",
                                  onChange: inspectionDueBetweenToDateHandler
                                }}
                              />
                              <label htmlFor="usr">Date</label>
                            </div>
                          </Col>
                        </Row>
                        <Row className="mb-3 justify-content-left align-items-top">
                          <Col md={12}>
                            <Label for="inspection_due_date" className="form-label" style={{ color: "#159B9C" }}>
                              Agreement ending between
                            </Label>
                          </Col>
                        </Row>
                        <Row className="mt-2 align-items-top">

                          <Col md={5}>

                            <div className="form-group-new">
                              <Flatpickr
                                className="form-control d-block"
                                placeholder="Pick a Date..."
                                value={state.agreement_ending_from_date
                                }
                                // onChange={() => dateHandler()}
                                options={{
                                  altInput: true,
                                  format: "d/m/Y",
                                  altFormat: "d/m/Y",
                                  onChange: agreementEndingBetweenDateHandler
                                }}
                              />
                              <label htmlFor="usr">Date</label>
                            </div>
                          </Col>
                          <Col md={1}>To</Col>
                          <Col md={5}>
                            <div className="form-group-new">
                              <Flatpickr
                                className="form-control d-block"
                                placeholder="Pick a Date..."
                                value={state.agreement_ending_to_date
                                }
                                // onChange={() => dateHandler()}
                                options={{
                                  altInput: true,
                                  format: "d/m/Y",
                                  altFormat: "d/m/Y",
                                  onChange: agreementEndingBetweenToDateHandler
                                }}
                              />
                              <label htmlFor="usr">Date</label>
                            </div>
                          </Col>
                        </Row>
                      </form>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={6} className="mb-3 p-0">
                  <Card className="custom_card_border_design me-2" >
                    <CardBody>
                      <FormGroup className="mb-3 mt-3 mt-lg-0 templating-select select2-container">
                        <Select
                          value={selectedState}
                          isMulti={true}
                          onChange={handleMulti3}
                          options={optionGroup}
                          classNamePrefix="select2-selection"
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                        />
                      </FormGroup>
                      {/* <Card className="mt-3 p-1 card_bg_color">
                        <CardBody> */}
                      <div className="card_text my-3">
                        {propertyDataLength ? propertyDataLength : 0} properties
                        are missing geographic data
                      </div>
                      <div style={{ height: "320px", overflowY: "scroll" }}>
                        {propertyLocationData ? propertyLocationData : null}
                      </div>
                      {/* </CardBody>
                      </Card> */}

                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="mb-3 p-0">
                  <Card className="custom_card_border_design">
                    <CardBody>
                      <div
                        id="gmaps-markers"
                        className="gmaps"
                        style={{ position: "relative" }}
                      >
                        <Map
                          google={props.google}
                          center={{
                            lat: location.lat,
                            lng: location.lng,
                          }}
                          style={{ width: "100%", height: "100%" }}
                          zoom={8}
                        >
                          {props.filter_data?.data?.map((item, key) => (
                            <Marker
                              title={item.reference}
                              name={item.reference}
                              position={item.location}
                              key={key}
                              onClick={() => {
                                onMarkerClick(item.id, item.reference, item);
                              }}
                            />
                          ))}
                          <InfoWindow>
                            <div>
                              <h1>{gmapState.selectedPlace.name}</h1>
                            </div>
                          </InfoWindow>
                        </Map>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const { } = gstate.Contacts2;
  const { user_list_loading, user_list_data } = gstate.property;
  const {
    geographic_data,
    geographic_error,
    geographic_loading,
    filter_data,
    filter_error,
    filter_loading,
  } = gstate.Inspections;
  return {
    user_list_loading,
    user_list_data,

    geographic_data,
    geographic_error,
    geographic_loading,

    filter_data,
    filter_error,
    filter_loading,
  };
};
PlanInspection.propTypes = {
  google: PropTypes.object,
};
export default withRouter(
  connect(mapStateToProps, {
    getUser,
    geographicLocationData,
    geographicLocationFresh,
    filteredInspectionData,
    filterFresh,
  })(
    GoogleApiWrapper({
      apiKey: "AIzaSyD0FeNTACOETan6R_fJ18o5kSgTyoAFabk",
      LoadingContainer: LoadingContainer,
      v: "3",
    })(PlanInspection)
  )
);
