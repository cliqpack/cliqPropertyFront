import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";

import "./InspectionInfo.css";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  withRouter,
} from "react-router-dom";

import toastr from "toastr";

import { GoogleApiWrapper, InfoWindow, Map } from "google-maps-react";
import { connect } from "react-redux";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import {
  Card,
  CardBody,
  Col,
  Row,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  CardHeader,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroup,
} from "reactstrap";

import { Formik, Field, ErrorMessage, useFormik } from "formik";

import classnames from "classnames";
import {
  addInspectionSchedule,
  addInspectionScheduleFresh,
  getScheduleListFresh,
} from "../../store/Inspections/actions";
import { arrayPush } from "redux-form";
import Board, { moveCard, removeCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";

const LoadingContainer = () => <div>Loading...</div>;

const InspectionDay = props => {
  const history = useHistory();
  const location = useLocation();
  const { InsDate } = useParams();
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [state3, setState3] = useState();
  const [init, setInit] = useState(true);
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const [addressShow, setAddressShow] = useState(false);
  const [addressState, setAddressState] = useState({});
  const [fullAddress, setFullAddress] = useState("");
  const [editAddress, setEditAddress] = useState(false);

  const toggle = () => setAddressShow(prev => !prev);

  const [state, setState] = useState({
    customIconActiveTab: "1",
    customIconActiveTab: "2",
  });

  const [googleState, setGoogleState] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  });

  const [fifteenMinsBtn, setFifteenMinsBtn] = useState(true);
  const [thirtyMinsBtnBtn, setThirtyMinsBtnBtn] = useState(false);
  const [fourtyFiveMinsBtn, setFourtyFiveMinsBtn] = useState(false);
  const [sixtyMinsBtn, setSixtyMinsBtn] = useState(false);
  const [subDis, setSubDis] = useState(true);
  const [duration, setDuration] = useState();
  const [durationTime, setDurationTime] = useState(15);
  const [subDuration, setSubDuration] = useState(0);
  const [controlledBoard, setBoard] = useState();
  const [allDu, setAllDu] = useState(0);
  const [subTractTime, setSubTractTime] = useState();

  console.log(duration);
  const toogleFifteenMinsBtn = () => {
    setFifteenMinsBtn(true);
    setThirtyMinsBtnBtn(false);
    setFourtyFiveMinsBtn(false);
    setSixtyMinsBtn(false);
    setDurationTime(15);
  };

  const toogleThirtyMinsBtn = () => {
    setThirtyMinsBtnBtn(true);
    setFifteenMinsBtn(false);
    setFourtyFiveMinsBtn(false);
    setSixtyMinsBtn(false);
    setDurationTime(30);
  };

  const toogleFourtyFiveMinsBtn = () => {
    setFourtyFiveMinsBtn(true);
    setThirtyMinsBtnBtn(false);
    setFifteenMinsBtn(false);
    setSixtyMinsBtn(false);
    setDurationTime(45);
  };

  const toogleSixtyMinsBtn = () => {
    setSixtyMinsBtn(true);
    setFourtyFiveMinsBtn(false);
    setThirtyMinsBtnBtn(false);
    setFifteenMinsBtn(false);
    setDurationTime(60);
  };

  let start = moment(startTime, "hh:mm:ss A").format("hh:mm a");
  let end = moment(endTime, "hh:mm:ss A");
  let topDate = moment(InsDate).format("dddd MMMM Do YYYY");
  let userData = JSON.parse(localStorage.getItem("authUser"));

  let name = userData.user.first_name + " " + userData.user.last_name;
  let address = userData.user?.address;
  // setFullAddress(userData.user?.address);
  let allTime1 = 0;

  const formSubmitHandler = () => {};

  let addTime = moment(startTime, "hh:mm A")
    .add(2, "minutes")
    .format("hh:mm A");

  if (!subTractTime) {
    if (startTime) {
      let subtractTime = moment(startTime, "hh:mm A")
        .subtract(Number(durationTime) + Number(subDuration), "minutes")
        .format("hh:mm A");
      setSubTractTime(subtractTime);
    }
  }
  let timeDuration = fifteenMinsBtn
    ? 15
    : thirtyMinsBtnBtn
    ? 30
    : fourtyFiveMinsBtn
    ? 45
    : sixtyMinsBtn
    ? 60
    : "";

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    // props.swapTask(_card.id, source.fromColumnId, destination.toColumnId);
    // props.getAllTask()
    location.state.selectedProp = "";
    var data_arr = [];
    updatedBoard.columns[0].cards.map((item, index) => {
      var data = {
        item: item.item,
        id: index,
        i: index,
        description: "card" + index,
        title: "title" + index,
      };
      data_arr.push(data);
    });
    location.state.selectedProp = data_arr;
    const data = {
      columns: [{ id: 1, title: "", cards: location.state.selectedProp }],
    };
    setBoard(data);
    calculateRoute();
  }
  function handleCardRemove(index) {
    location.state.selectedProp.splice(index, 1);
    setInit(true);
    calculateRoute();
  }
  if (init) {
    const data = {
      columns: [{ id: 1, title: "", cards: location.state.selectedProp }],
    };
    setBoard(data);
    setTimeout(() => {
      var x = document.getElementsByClassName("react-kanban-column");
      for (var i = 0; i < x.length; i++) {
        x[i].style = "width:590px";
        x[i].style = "background-color: #F8F8FB !important";
      }
      var y = document.getElementsByClassName("drg");
      for (var j = 0; j < y.length; j++) {
        y[j].parentElement.style.width = "560px";
      }
    }, 2000);

    setInit(false);
  }

  console.log(startTime);

  const hanleStartTime = time => {
    // if (!startTime) {

    // }
    setStartTime(time);
    setSubDis(false);

    var data = [];
    for (var i = 0; i < location.state.selectedProp.length; i++) {
      var timel = "";
      duration?.map((res, key) => {
        if (i == key) {
          let du = 0;
          if (i > 0) {
            du = Number(res.duration.value) / 60;
            allTime1 = Number(allTime1) + Number(res.duration.value);
            timel = moment(time, "hh:mm")
              .add(i > 0 && Number(durationTime), "minutes")
              .add(i > 0 && 15, "minutes")
              .add(Number(allTime1), "seconds");
          } else if (i == 0) {
            timel = time;
            var dur = Number(res.duration.value) / 60;
            setSubDuration(parseFloat(dur).toFixed(2));
          }
        }
      });
      // var timel = moment(time, "hh:mm")
      //   .add(i * duration, "minutes")
      //   .format("hh:mm");

      var now = new Date(timel);
      var date = now.toLocaleDateString();
      var timed = now.toLocaleTimeString();

      data.push({
        property_id: location.state.selectedProp[i].item.property_id,
        schedule_date:
          now == "Invalid Date" ? InsDate : moment(date).format("YYYY/MM/DD"),
        schedule_time:
          now == "Invalid Date"
            ? timel
            : moment(timed, "hh:mm").format("hh:mm"),
        lat: location.state.selectedProp[i].item.location.lat,
        long: location.state.selectedProp[i].item.location.lng,
        index: i,
        propertyScheduleId: location.state.selectedProp[i].item.id,
        propertyScheduleDate: location.state.selectedProp[i].item.schedule_date,
      });
    }
    console.log(data);
    setState3(data);
  };

  const handleScheduleForm = async () => {
    var property = state3.length;
    var manager_id = userData.user.id;
    var ins_date = InsDate;
    var starttime = startTime;
    var data = {
      manager_id: userData.user.id,
      ins_date: InsDate,
      start_time: startTime,
      properties: state3.length,
      property: state3,
    };

    await props.addInspectionSchedule(data);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD0FeNTACOETan6R_fJ18o5kSgTyoAFabk",
  });

  const center = { lat: 48.8584, lng: 2.2945 };

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  async function calculateRoute() {
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: "red",
      },
    });

    let waypointsA = [];
    let destinationF = undefined;
    await location.state.selectedProp?.map((item, i) => {
      let waypointsAdd = {
        location:
          item.item.address.unit +
          ", " +
          item.item.address.street +
          ", " +
          item.item.address.suburb +
          ", " +
          item.item.address.state,
        stopover: true,
      };
      (destinationF =
        item.item.address.unit +
        ", " +
        item.item.address.street +
        ", " +
        item.item.address.suburb +
        ", " +
        item.item.address.state),
        waypointsA.push(waypointsAdd);
    });

    const results = await directionsService.route(
      {
        origin: "australia",
        destination: destinationF,
        waypoints: waypointsA,
        provideRouteAlternatives: true,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      function (response, status) {
        if (status === "OK") {
          directionsDisplay.setDirections(response);
        } else {
          //alert("Origin and Destination is too Far");
          let text = "Origin and Destination is too Far.";
          if (confirm(text) == true) {
            history.push("/planinspections");
          } else {
            history.push("/planinspections");
          }
        }
      }
    );
    console.log(results);
    setDirectionsResponse(results);
    setDuration(results.routes[0].legs);
    // setDistance(results.routes[0].legs[0].distance.text)
    // setDuration(results.routes[0].legs[0].duration.text)
  }

  useEffect(() => {
    if (props.inspection_schedule_loading == "Success") {
      toastr.success("Inspection Schedule Successful");
      props.addInspectionScheduleFresh();
      props.getScheduleListFresh();
      history.push("/inspections");
    }

    // autoCompleteRef.current = new window.google.maps.places.Autocomplete(
    //   inputRef.current,
    //   options
    // );
    // autoCompleteRef.current.addListener("place_changed", async function () {
    //   const place = await autoCompleteRef.current.getPlace();
    //   console.log({ place });
    //   let unitN = "";
    //   let country = "";
    //   let statename = "";
    //   let postal_codeN = "";
    //   let suburbN = "";
    //   let streetN = "";
    //   let street_numberN = "";

    //   place.address_components.forEach(element => {
    //     let checkCountry = inArray("country", element.types);

    //     if (checkCountry == true) {
    //       country = element.long_name;
    //     }

    //     let administrative_area_level_1 = inArray(
    //       "administrative_area_level_1",
    //       element.types
    //     );
    //     if (administrative_area_level_1 == true) {
    //       statename = element.long_name;
    //     }

    //     let postal_code = inArray("postal_code", element.types);
    //     if (postal_code == true) {
    //       postal_codeN = element.long_name;
    //     }

    //     let unit = inArray("subpremise", element.types);
    //     if (unit == true) {
    //       unitN = element.long_name;
    //     }

    //     let suburb = inArray("locality", element.types);
    //     if (suburb == true) {
    //       suburbN = element.long_name;
    //     }

    //     let street = inArray("route", element.types);
    //     if (street == true) {
    //       streetN = element.long_name;
    //     }

    //     let street_number = inArray("street_number", element.types);
    //     if (street_number == true) {
    //       street_numberN = element.long_name;
    //     }
    //   });
    //   let u = unitN ? unitN + "/ " : "";
    //   let c = country ? country + " " : "";
    //   let st = statename ? statename + " " : "";
    //   let pc = postal_codeN ? postal_codeN + " " : "";
    //   let sn = suburbN ? suburbN + ", " : "";
    //   let s = streetN ? streetN + ", " : "";
    //   let n = street_numberN ? street_numberN + " " : "";

    //   setFullAddress(u + n + s + sn + st + pc + c);
    //   setAddressState({
    //     building_name: "",
    //     unit: unitN,
    //     number: street_numberN,
    //     suburb: suburbN,
    //     street: streetN,
    //     postcode: postal_codeN,
    //     state: statename,
    //     country: country,
    //   });

    // });

    // calculateRoute();
  }, [props]);
  let allTime = 0;

  console.log(duration);
  return (
    <React.Fragment>
      <div className="page-content">
        <h4 className="card-title">
          <span className="text-primary">Inspection Day</span> - {topDate} - for{" "}
          {name}
        </h4>
        <div
          className=""
          style={{
            borderBottom: "1.2px dotted #c9c7c7",
          }}
        ></div>

        <div className="d-flex">
          <p className="bg-soft p-1 mx-2">Inspections</p>
          <p className="bg-soft p-1">Plan Inspections</p>
        </div>
        <div>
          {/* <button type="button" className="btn btn-secondary mx-2">
            <i className="fas fa-print font-size-10 align-middle me-2"></i>
            Itenary
          </button>
          <button type="button" className="btn btn-secondary">
            <i className="fas fa-paper-plane font-size-10 align-middle me-2"></i>
            Message
            <i className="fas fa-chevron-down font-size-10 align-middle ms-2"></i>
          </button> */}
        </div>
        <Row>
          <Col md={6}>
            <div className="my-3 ps-3">
              <h3 className="card-title text-primary">Recalculate Schedule</h3>
            </div>

            <Row>
              <Col md={12}>
                <div className="ps-3">
                  <Row className="mb-3">
                    <FormGroup row>
                      <Label for="exampleFile" md={4}>
                        Start Time
                      </Label>
                      <Col md={5}>
                        <Input
                          id="exampleFile"
                          name="start"
                          value={startTime ?? ""}
                          type="time"
                          required={true}
                          onChange={e => hanleStartTime(e.target.value)}
                          //defaultValue="07:30:00"
                        />
                      </Col>
                      <Col md={3}>of first inspection</Col>
                    </FormGroup>
                  </Row>
                  <Row className="mb-3">
                    <Col md={5}>
                      <label htmlFor="rent" className="form-label text-dark">
                        Inspection duration
                      </label>
                    </Col>

                    <Col md={5}>
                      <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                          <Button
                            color={fifteenMinsBtn ? "secondary" : "light"}
                            onClick={e => {
                              toogleFifteenMinsBtn(e);
                            }}
                          >
                            <span> 15</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={thirtyMinsBtnBtn ? "secondary" : "light"}
                            onClick={e => {
                              toogleThirtyMinsBtn(e);
                            }}
                          >
                            <span> 30</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={fourtyFiveMinsBtn ? "secondary" : "light"}
                            onClick={e => {
                              toogleFourtyFiveMinsBtn(e);
                            }}
                          >
                            <span> 45</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={sixtyMinsBtn ? "secondary" : "light"}
                            onClick={e => {
                              toogleSixtyMinsBtn(e);
                            }}
                          >
                            <span> 60</span>
                          </Button>
                        </div>
                      </div>
                    </Col>
                    <Col md={2}>minutes</Col>
                  </Row>
                </div>
              </Col>
            </Row>

            <GoogleMap
              zoom={15}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={map => setMap(map)}
            >
              <Marker position={center} />
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </Col>
          <Col md={6}>
            <div className="my-3 ps-3">
              <h3 className="card-title text-primary">Current Schedule</h3>
            </div>
            <div>
              {start !== "Invalid date" ? (
                <Card>
                  <div className="text-primary my-2 px-3">
                    Selected start time for the first inspection.
                  </div>
                </Card>
              ) : (
                <Card>
                  <div className="text-primary my-2 px-3">
                    Choose a start time for the first inspection.
                  </div>
                </Card>
              )}

              <Card
                style={{
                  border: "1px solid #C0C0C0",
                  width: "560px",
                  marginLeft: "25px",
                  marginBottom: "-15px",
                }}
              >
                <div>
                  <div className="py-1 px-2 d-flex justify-content-between">
                    <span>
                      {start !== "Invalid date"
                        ? subTractTime
                        : " Not Selected"}
                    </span>{" "}
                    <i className="bx bx-store font-size-16" />
                  </div>
                  <div
                    style={{ backgroundColor: "#ADD8E6" }}
                    className="py-1 px-2 mt-3 d-flex justify-content-between"
                  >
                    <i className="fw-bold"> {userData.user?.address}</i>{" "}
                    {/* <i className="fas fa-times me-1 text-danger"></i> */}
                    {/* {addressShow && (
                      <div>
                        <Row className="mt-2">
                          <Col md={2}>
                            <Label for="building" className="form-label">
                              Building Name
                            </Label>
                          </Col>

                          <Col>
                            <Field
                              name="building_name"
                              type="text"
                              className={"form-control"}
                              value={addressState.building_name}
                              onChange={e => {
                                addresshandler(e, "building");
                              }}
                            />

                            <ErrorMessage
                              name="building_name"
                              component="div"
                              className="invalid-feedback"
                            />
                          </Col>
                        </Row>

                        <Row className="mt-2">
                          <Col md={2}>
                            <Label for="unit" className="form-label">
                              Unit
                            </Label>
                          </Col>

                          <Col>
                            <Field
                              name="unit"
                              type="text"
                              className={"form-control"}
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
                        </Row>

                        <Row className="mt-2">
                          <Col md={2}>
                            <Label for="number" className="form-label">
                              Number
                            </Label>
                          </Col>

                          <Col>
                            <Field
                              name="number"
                              type="text"
                              className={"form-control"}
                              value={addressState.number}
                              onChange={e => {
                                addresshandler(e, "number");
                              }}
                            />
                          </Col>
                          <ErrorMessage
                            name="number"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Row>

                        <Row className="mt-2">
                          <Col md={2}>
                            <Label for="street" className="form-label">
                              Street
                            </Label>
                          </Col>

                          <Col>
                            <Field
                              name="street"
                              type="text"
                              className={"form-control"}
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
                        </Row>

                        <Row className="mt-2">
                          <Col md={2}>
                            <Label for="suburb" className="form-label">
                              Suburb
                            </Label>
                          </Col>

                          <Col>
                            <Field
                              name="suburb"
                              type="text"
                              className={"form-control"}
                              value={addressState.suburb}
                              onChange={e => {
                                addresshandler(e, "suburb");
                              }}
                            />
                          </Col>

                          <ErrorMessage
                            name="suburb"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Row>

                        <Row className="mt-2">
                          <Col md={2}>
                            <Label for="postcode" className="form-label">
                              Postcode
                            </Label>
                          </Col>

                          <Col>
                            <Field
                              name="postcode"
                              type="text"
                              className={"form-control"}
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
                        </Row>

                        <Row className="mt-2">
                          <Col md={2}>
                            <Label for="state" className="form-label">
                              State
                            </Label>
                          </Col>

                          <Col>
                            <Field
                              name="state"
                              type="text"
                              className={"form-control"}
                              value={addressState.state}
                              onChange={e => {
                                addresshandler(e, "state");
                              }}
                            />
                          </Col>

                          <ErrorMessage
                            name="state"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Row>

                        <Row className="mt-2">
                          <Col md={2}>
                            <Label for="country" className="form-label">
                              Country
                            </Label>
                          </Col>

                          <Col>
                            <Field
                              name="country"
                              type="text"
                              className={"form-control"}
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
                        </Row>
                      </div>
                    )} */}
                  </div>
                </div>
              </Card>

              {controlledBoard ? (
                <Board
                  style={{ width: "590px !important" }}
                  renderCard={(
                    { item, id, tile, description, i },
                    { removeCard, dragging }
                  ) => (
                    <Card
                      className="drg"
                      style={{ border: "1px solid #C0C0C0" }}
                    >
                      <div>
                        <div className="py-1 px-2 d-flex justify-content-between w-100">
                          <span>
                            {duration?.map((res, key) => {
                              if (i == key) {
                                let du = 0;
                                {
                                  /* var mom =''; */
                                }
                                const dura = key > 0 ? Number(durationTime) : 0;
                                const def = key > 0 ? Number(15) : 0;

                                if (key > 0) {
                                  du = Number(res.duration.value) / 60;
                                  allTime =
                                    Number(allTime) +
                                    Number(res.duration.value);

                                  if (allDu != allTime) {
                                    {
                                      /* setAllDu(allTime); */
                                    }
                                  }
                                }

                                const mom = moment(
                                  startTime ? startTime : item.start_time,
                                  "hh:mm A"
                                )
                                  .add(dura * key, "minutes")
                                  .add(def * key, "minutes")
                                  .add(Number(allTime), "seconds")
                                  .format("hh:mm A");
                                console.log(startTime);
                                console.log(dura * key);
                                console.log(def * key);
                                console.log(allTime);
                                return (
                                  <div key={key}>
                                    <p
                                      style={{
                                        display: "inline-block",
                                        paddingRight: "20px",
                                      }}
                                    >
                                      {/* {mom} ,{key},{Number(allTime)/60}, {durationTime} */}
                                      {mom}
                                    </p>
                                    {"  "}
                                    <p
                                      style={{
                                        display: "inline-block",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {"  "}
                                      {res.distance.text} , {res.duration.text}
                                    </p>
                                  </div>
                                );
                              }
                            })}
                          </span>
                        </div>
                        <div
                          style={{ backgroundColor: "#ADD8E6" }}
                          className="py-1 px-2 mt-1 d-flex justify-content-between"
                        >
                          <i className="fw-bold">
                            {" "}
                            {item.address?.unit}
                            {item.address.unit ? ", " : null}
                            {item.address?.street}
                            {item.address.street ? ", " : null}
                            {item.address?.suburb}
                            {item.address.suburb ? ", " : null}
                            {item.address?.state}
                            {"    (" + durationTime + " min) "}
                          </i>{" "}
                          <i
                            className="fas fa-times text-danger"
                            onClick={() => handleCardRemove(i)}
                          ></i>
                        </div>
                      </div>
                    </Card>
                  )}
                  onCardDragEnd={handleCardMove}
                  disableColumnDrag
                >
                  {controlledBoard}
                </Board>
              ) : null}
            </div>
            <div className="px-2 d-flex justify-content-between">
              {/* <p className="bg-secondary p-1 text-light">
                <i className="fas fa-plus"></i> Add properties
              </p> */}
              <div>
                <button
                  className="btn btn-info w-md ms-2"
                  type="button"
                  onClick={() => {
                    history.push("/planinspections");
                  }}
                >
                  back
                </button>
                <button
                  className="btn btn-info w-md ms-2"
                  type="button"
                  disabled={subDis}
                  onClick={() => {
                    handleScheduleForm();
                  }}
                >
                  <i className="fas fa-file-alt me-1"></i> Schedule
                </button>
              </div>
            </div>

            <Card className="mt-3">
              <div className="p-2" style={{ backgroundColor: "#87CEEB" }}>
                <p>
                  <i className="fas fa-lightbulb me-2 text-primary"></i> Initial
                  Route
                </p>
                <ul className="ms-2">
                  <li>The initial route is the calculated best route</li>
                  <li>
                    Routes are calculated by the average travel time between
                    properties including average traffic
                  </li>
                  <li>
                    For 20 or more properties the calculation is an estimate
                    only
                  </li>
                </ul>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const { inspection_schedule_loading } = gstate.Inspections;

  // const {} = gstate.property;

  return { inspection_schedule_loading };
};

// export default connect(
//     null,
//     {}
// )(
//     GoogleApiWrapper({
//         apiKey: "AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE",
//         LoadingContainer: LoadingContainer,
//         v: "3",
//     })(InspectionDay)
// );

InspectionDay.propTypes = {
  google: PropTypes.object,
};

export default withRouter(
  connect(mapStateToProps, {
    addInspectionSchedule,
    addInspectionScheduleFresh,
    getScheduleListFresh,
  })(
    GoogleApiWrapper({
      apiKey: "AIzaSyD0FeNTACOETan6R_fJ18o5kSgTyoAFabk",
      LoadingContainer: LoadingContainer,
      v: "3",
    })(InspectionDay)
  )
);
