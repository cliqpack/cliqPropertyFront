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

import classnames from "classnames";
import {
  editInspectionSchedule,
  editInspectionScheduleFresh,
  getScheduleListFresh,
} from "../../store/Inspections/actions";
import { arrayPush } from "redux-form";
import Board, { moveCard, removeCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import Address from "common/Address/Address";
import Loder from "components/Loder/Loder";

const LoadingContainer = () => <div>Loading...</div>;

let inspectionInfoData;

const data = [
  { id: 1, text: "46 Hall St, Bondi Beach, NSW 2026 Australia" },
  { id: 2, text: "46 Hall St, Bondi Beach, NSW 2026 Australia" },
  { id: 3, text: "46 Hall St, Bondi Beach, NSW 2026 Australia" },
  { id: 4, text: "46 Hall St, Bondi Beach, NSW 2026 Australia" },
];
const InspectionDayEdit = props => {
  // console.log(editInspectionSchedule);

  const history = useHistory();
  const location = useLocation();
  console.log(location.state.duration);

  const { InsDate } = useParams();
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [state3, setState3] = useState();
  const [init, setInit] = useState(true);
  const [loader, setLoader] = useState(false);

  let propertyName = "New Property";

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
  const [duration, setDuration] = useState([]);
  const [durationTime, setDurationTime] = useState(15);
  const [subDuration, setSubDuration] = useState(0);
  const [controlledBoard, setBoard] = useState();
  const [allDu, setAllDu] = useState(0);
  const [subtractTime, setSubtractTime] = useState(0);

  const [fullAddress, setFullAddress] = useState("");
  const [addressState, setAddressState] = useState({});
  console.log(addressState);
  const [show, setShow] = useState(true);
  const [addressShow, setAddressShow] = useState(false);
  const inputRef = useRef();
  const autoCompleteRef = useRef();
  const options = {};
  const [showAddress, setShowAddress] = useState(false);
  const showToggleAddress = () => setShowAddress(prev => !prev);
  let start = moment(startTime, "hh:mm:ss A").format("hh:mm a");
  let end = moment(endTime, "hh:mm:ss A");
  let topDate = moment(InsDate).format("dddd MMMM Do YYYY");
  let userData = JSON.parse(localStorage.getItem("authUser"));

  let name = userData.user.first_name + " " + userData.user.last_name;
  let address = userData.user?.address;
  let updated_address = addressState?.country
    ? `${addressState?.building_name || ""} ${addressState?.unit || ""}/${
        addressState?.number || ""
      } ${addressState?.street || ""},${addressState?.suburb || ""} ${
        addressState?.state || ""
      } ${addressState?.postcode || ""} ${addressState?.country || ""}`
    : location.state?.address?.country
    ? `${location.state?.address?.building_name || ""} ${
        location.state?.address?.unit || ""
      }/${location.state?.address?.number || ""} ${
        location.state?.address?.street || ""
      },${location.state?.address?.suburb || ""} ${
        location.state?.address?.state || ""
      } ${location.state?.address?.postcode || ""} ${
        location.state?.address?.country || ""
      }`
    : address;
  // if (show) {
  // setDurationTime(Number(location.state.duration));
  // if (Number(location.state.duration) == 15) {
  //   setSixtyMinsBtn(false);
  //   setFourtyFiveMinsBtn(false);
  //   setThirtyMinsBtnBtn(false);
  //   setFifteenMinsBtn(true);
  // } else if (Number(location.state.duration) == 30) {
  //   setSixtyMinsBtn(false);
  //   setFourtyFiveMinsBtn(false);
  //   setThirtyMinsBtnBtn(true);
  //   setFifteenMinsBtn(false);
  // } else if (Number(location.state.duration) == 45) {
  //   setSixtyMinsBtn(false);
  //   setFourtyFiveMinsBtn(true);
  //   setThirtyMinsBtnBtn(false);
  //   setFifteenMinsBtn(false);
  // } else if (Number(location.state.duration) == 60) {
  //   setSixtyMinsBtn(true);
  //   setFourtyFiveMinsBtn(false);
  //   setThirtyMinsBtnBtn(false);
  //   setFifteenMinsBtn(false);
  // }
  //   setShow(false);
  // }

  useEffect(() => {
    if (props.inspection_schedule_edit_loading == "Success") {
      setLoader(false);
      toastr.success("Inspection Re Schedule Successful");
      props.editInspectionScheduleFresh();
      props.getScheduleListFresh();
      history.push("/inspections");
    }
    setDurationTime(Number(location.state.duration));
    if (Number(location.state.duration) == 15) {
      setSixtyMinsBtn(false);
      setFourtyFiveMinsBtn(false);
      setThirtyMinsBtnBtn(false);
      setFifteenMinsBtn(true);
    } else if (Number(location.state.duration) == 30) {
      setSixtyMinsBtn(false);
      setFourtyFiveMinsBtn(false);
      setThirtyMinsBtnBtn(true);
      setFifteenMinsBtn(false);
    } else if (Number(location.state.duration) == 45) {
      setSixtyMinsBtn(false);
      setFourtyFiveMinsBtn(true);
      setThirtyMinsBtnBtn(false);
      setFifteenMinsBtn(false);
    } else if (Number(location.state.duration) == 60) {
      setSixtyMinsBtn(true);
      setFourtyFiveMinsBtn(false);
      setThirtyMinsBtnBtn(false);
      setFifteenMinsBtn(false);
    }

    asClc();
  }, [props]);

  useEffect(() => {
    calculateRoute();
  }, [updated_address]);

  // useEffect(() => {
  //   if (location.state.address) {
  //     setAddressState(location.state.address);
  //     console.log(location.state);
  //   }
  // }, [])

  function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }

  // useEffect(() => {

  // }, [])

  const asClc = async () => {
    await calculateRoute();
    // await setDT(startTime ? startTime : location.state.start_time);
    hanleStartTime(startTime ? startTime : location.state.start_time);
    var data_arr = [];
    await location.state.selectedProp.map((item, index) => {
      var data = {
        item: item.item,
        id: index,
        i: index,
        description: "card" + index,
        title: "title" + index,
      };
      data_arr.push(data);
    });
    const data = {
      columns: [{ id: 1, title: "", cards: data_arr }],
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
  };

  const toogleFifteenMinsBtn = async () => {
    setFifteenMinsBtn(true);
    setThirtyMinsBtnBtn(false);
    setFourtyFiveMinsBtn(false);
    setSixtyMinsBtn(false);
    setDurationTime(15);
    setDT(startTime ? startTime : location.state.start_time);
  };

  const toogleThirtyMinsBtn = async () => {
    setThirtyMinsBtnBtn(true);
    setFifteenMinsBtn(false);
    setFourtyFiveMinsBtn(false);
    setSixtyMinsBtn(false);
    setDurationTime(30);
    setDT(startTime ? startTime : location.state.start_time);
  };

  const toogleFourtyFiveMinsBtn = async () => {
    setFourtyFiveMinsBtn(true);
    setThirtyMinsBtnBtn(false);
    setFifteenMinsBtn(false);
    setSixtyMinsBtn(false);
    setDurationTime(45);
    setDT(startTime ? startTime : location.state.start_time);
  };

  const toogleSixtyMinsBtn = async () => {
    setSixtyMinsBtn(true);
    setFourtyFiveMinsBtn(false);
    setThirtyMinsBtnBtn(false);
    setFifteenMinsBtn(false);
    setDurationTime(60);
    setDT(startTime ? startTime : location.state.start_time);
  };

  let allTime1 = 0;
  let allTime = 0;

  function handleCardMove(_card, source, destination) {
    console.log(_card);
    console.log(source);
    console.log(destination);
    const updatedBoard = moveCard(controlledBoard, source, destination);
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
    console.log(data_arr);
    location.state.selectedProp = data_arr;
    const data = {
      columns: [{ id: 1, title: "", cards: location.state.selectedProp }],
    };
    setBoard(data);
    console.log(updatedBoard.columns[0].cards);
    calculateRoute();
    let timeStart=startTime?startTime:location.state.duration;
    setDT(timeStart);
  }

  function handleCardRemove(index) {
    location.state.selectedProp.splice(index, 1);
    console.log(location.state.selectedProp);
    asClc();
  }

  let addTime = moment(startTime, "hh:mm A")
    .add(2, "minutes")
    .format("hh:mm A");

  let timeDuration = fifteenMinsBtn
    ? 15
    : thirtyMinsBtnBtn
    ? 30
    : fourtyFiveMinsBtn
    ? 45
    : sixtyMinsBtn
    ? 60
    : "";

  const hanleStartTime = time => {
    setStartTime(time);
    setSubDis(false);
    setDT(time);
  };

  var setDT = async time => {
    var data = [];
    for (var i = 0; i < location.state.selectedProp.length; i++) {
      var timel = "";
      console.log(duration);
      duration?.map((res, key) => {
        if (i == key) {
          let du = 0;
          const dura = key > 0 ? Number(durationTime) : 0;
          const def = key > 0 ? Number(15) : 0;
          console.log("hello");
          if (i > 0) {
            du = Number(res.duration.value) / 60;
            allTime1 = Number(allTime1) + Number(res.duration.value);
            timel = moment(time, "hh:mm")
              .add(dura * key, "minutes")
              .add(def * key, "minutes")
              .add(Number(allTime1), "seconds");
          } else if (i == 0) {
            timel = time;
            var dur = Number(res.duration.value) / 60;
            console.log(dur);
            const subtrTime = moment(
              startTime ? startTime : location.state.start_time,
              "hh:mm A"
            )
              .subtract(Number(parseFloat(dur).toFixed(2)) + 15, "minutes")
              .format("hh:mm A");
            setSubtractTime(subtrTime);
            console.log("hi");
          }
        }
      });

      var now = new Date(timel);
      var date = now.toLocaleDateString();
      var timed = now.toLocaleTimeString();

      await data.push({
        property_id: location.state.selectedProp[i].item.property_id,
        schedule_date:
          now == "Invalid Date" ? InsDate : moment(date).format("YYYY-MM-DD"),
        schedule_time:
          now == "Invalid Date"
            ? moment(timel, "h:mm:ss A").format("HH:mm")
            : moment(timed, "h:mm:ss A").format("HH:mm"),
        lat: location.state.selectedProp[i].item.lat,
        long: location.state.selectedProp[i].item.long,
        index: i,
        propertyScheduleId: location.state.selectedProp[i].item.id,
        propertyScheduleDate: location.state.selectedProp[i].item.schedule_date,
      });
    }
    console.log(data);
    setState3(data);
  };

  const setDT2 = async time => {
    var dur = Number(time[0].duration.value) / 60;

    const subtrTime = moment(
      startTime ? startTime : location.state.start_time,
      "hh:mm A"
    )
      .subtract(Number(parseFloat(dur).toFixed(2)) + 15, "minutes")
      .format("hh:mm A");
    setSubtractTime(subtrTime);
  };
  
  const handleScheduleForm = async () => {
    var property = state3.length;
    var manager_id = userData.user.id;
    var ins_date = InsDate;
    var starttime = startTime;
    var schedule_id = location.state.insId;
    var data = {
      manager_id: userData.user.id,
      ins_date: InsDate,
      start_time: startTime,
      duration: durationTime,
      properties: state3.length,
      property: state3,
      schedule_id: schedule_id,
    };
    // console.log(data);
    setLoader(true);
    await props.editInspectionSchedule(data, addressState);
  };

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
          " " +
          item.item.address.street +
          ", " +
          item.item.address.suburb +
          ", " +
          item.item.address.state +
          " " +
          item.item.address.postcode +
          ", " +
          item.item.address.country,
        stopover: true,
      };
      (destinationF =
        item.item.address.unit +
        " " +
        item.item.address.street +
        ", " +
        item.item.address.suburb +
        ", " +
        item.item.address.state +
        " " +
        item.item.address.postcode +
        ", " +
        item.item.address.country),
        waypointsA.push(waypointsAdd);
    });

    const results = await directionsService.route(
      {
        origin: updated_address,
        destination: destinationF,
        waypoints: waypointsA,
        provideRouteAlternatives: true,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      function (response, status) {
        if (status === "OK") {
          directionsDisplay.setDirections(response);
        } else {
          // console.clear();
          console.log("Directions request failed due to " + status);
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
    console.log("====================================");
    console.log(results);
    console.log("====================================");
    setDirectionsResponse(results);
    setDuration(results.routes[0].legs);
    setDT2(results.routes[0].legs);
  }

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
            {/* </div> */}
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
                      {start !== "Invalid date" && subtractTime != 0
                        ? subtractTime
                        : "not Seleted"}
                    </span>{" "}
                    <i className="bx bx-store font-size-16" />
                  </div>
                  <div
                    style={{ backgroundColor: "#ADD8E6", cursor: "pointer" }}
                    className="py-1 px-1 mt-3 d-flex justify-content-start align-items-center w-100"
                  >
                    {showAddress == false && (
                      <div onClick={showToggleAddress}>
                        <i className="fw-bold">
                          {" "}
                          {location.state?.address?.country
                            ? `${
                                location.state?.address?.building_name || ""
                              } ${location.state?.address?.unit || ""}/${
                                location.state?.address?.number || ""
                              } ${location.state?.address?.street || ""},${
                                location.state?.address?.suburb || ""
                              } ${location.state?.address?.state || ""} ${
                                location.state?.address?.postcode || ""
                              } ${location.state?.address?.country || ""}`
                            : address}
                        </i>{" "}
                        <i className="fas fa-pen ms-1"></i>
                      </div>
                    )}

                    {/* address start */}
                    {showAddress && (
                      <Address
                        addressState={addressState}
                        setAddressState={setAddressState}
                        data={data}
                        showToggleAddress={showToggleAddress}
                      />
                    )}
                  </div>
                </div>
              </Card>

              {/* {location.state.selectedProp?.map((item, i) => {
                console.log(item.item);
                return (
                  <Card key={i} style={{ border: "2px dotted #C0C0C0" }}>
                    <div>
                      <div className="py-1 px-2 d-flex justify-content-between">
                        <span>
                          {duration?.map((res, key) => {
                            if (i == key) {
                              let du = 0;
                              if (i > 0) {
                                du = Number(res.duration.value) / 60;
                              }
                              var mom = moment(
                                startTime ? startTime : item.item.start_time,
                                "hh:mm A"
                              )
                                .add(
                                  (i == 0 ? 0 : durationTime) + du,
                                  "minutes"
                                )
                                .format("hh:mm A");
                              return (
                                <>
                                  <p
                                    style={{
                                      display: "inline-block",
                                      paddingRight: "20px",
                                    }}
                                  >
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
                                </>
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
                          {item.item.address?.unit +
                            ", " +
                            item.item.address?.street +
                            ", " +
                            item.item.address?.suburb +
                            ", " +
                            item.item.address?.state +
                            "    (" +
                            durationTime +
                            " min) "}
                        </i>{" "}
                        <i className="fas fa-times text-danger"></i>
                      </div>
                    </div>
                  </Card>
                );
              })} */}
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
                                const dura = key > 0 ? Number(durationTime) : 0;
                                const def = key > 0 ? Number(15) : 0;

                                if (i > 0) {
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
                                var mom = moment(
                                  startTime ? startTime : item.start_time,
                                  "hh:mm A"
                                )
                                  .add(dura * key, "minutes")
                                  .add(def * key, "minutes")
                                  .add(Number(allTime), "seconds")
                                  .format("hh:mm A");
                                console.log(mom);
                                return (
                                  <>
                                    <p
                                      style={{
                                        display: "inline-block",
                                        paddingRight: "20px",
                                      }}
                                    >
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
                                  </>
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
                            <i className="fw-bold">
                              {" "}
                              {item.address?.unit}
                              {item.address.unit ? "/ " : null}
                              {item.address?.number}
                              {item.address.number ? " " : null}
                              {item.address?.street}
                              {item.address.street ? ", " : null}
                              {item.address?.suburb}
                              {item.address.suburb ? " " : null}
                              {item.address?.state}
                              {item.address.state ? " " : null}
                              {item.address?.postcode}
                              {item.address.postcode ? ", " : null}
                              {item.address?.country}
                              {"    (" + durationTime + " min) "}
                            </i>{" "}
                          </i>{" "}
                          <i
                            className="fas fa-times text-danger"
                            onClick={() => handleCardRemove(id)}
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
                    history.push("/inspections");
                  }}
                >
                  Back
                </button>
                <button
                  className="btn btn-info w-md ms-2"
                  type="button"
                  disabled={subDis}
                  onClick={() => {
                    handleScheduleForm();
                  }}
                >
                  <i className="fas fa-file-alt me-1"></i> Re Schedule
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
      {loader && <Loder status={loader} />}
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    inspection_schedule_edit_data,
    inspection_schedule_edit_error,
    inspection_schedule_edit_loading,
  } = gstate.Inspections;

  return {
    inspection_schedule_edit_data,
    inspection_schedule_edit_error,
    inspection_schedule_edit_loading,
  };
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

InspectionDayEdit.propTypes = {
  google: PropTypes.object,
};

export default withRouter(
  connect(mapStateToProps, {
    editInspectionSchedule,
    editInspectionScheduleFresh,
    getScheduleListFresh,
  })(
    GoogleApiWrapper({
      apiKey: "AIzaSyD0FeNTACOETan6R_fJ18o5kSgTyoAFabk",
      LoadingContainer: LoadingContainer,
      v: "3",
    })(InspectionDayEdit)
  )
);
