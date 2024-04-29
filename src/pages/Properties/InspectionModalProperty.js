import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Card,
  Alert,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Input,
  Button,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText,
} from "reactstrap";
import { connect } from "react-redux";

import {
  addInspectionInfo,
  addInspectionFresh,
  InspectionListFresh,
  getUser,
  PropertyAllActivity,
} from "store/actions";

import toastr from "toastr";
import { useHistory } from "react-router-dom";
import Loder from "components/Loder/Loder";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import './property.css'

function InspectionModalProperty(props) {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const history = useHistory();
  const [inspectionModal, setInspectionModal] = useState(false);
  const toggle = () => setInspectionModal(!inspectionModal);
  const [type, setType] = useState("Routine");
  const [date, setDate] = useState({});
  console.log(date);
  const [startTime, setStartTime] = useState();
  // console.log(startTime);
  const [endTime, setEndTime] = useState();
  const [summary, setSummary] = useState();
  const [manager, setManager] = useState(authUser.user.id);
  const [only, setOnly] = useState(true);
  const [contactIds, setContactIds] = useState();
  const [showModal, setShowModal] = useState(false);
  //console.log(props.data.data.id);
  const [dateCheck, setDateCheck] = useState(false);

  const dateHandler = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    setDate(dateStr);
  };

  useEffect(() => {
    if (props.user_list_loading == false) {
      props.getUser();
    }
    if (props.inspection_add_loading === "Success") {
      toastr.success("Added Successfully");
      props.InspectionListFresh();
      props.PropertyAllActivity(id);

      props.toggle();
      if (only) {
        saveAndShow();
      } else {
        setOnly(true);
        props.InspectionListFresh();
        props.addInspectionFresh();
      }
    }
    if (props.inspection_add_loading === "Failed") {
      toastr.error("Failed");
      props.addInspectionFresh();
      props.toggle();
    }
  }, [props.user_list_loading, props.inspection_add_loading]);

  const saveAndShow = async () => {
    await history.push(
      "/inspectionInfo/" + props.inspection_add_data.inspection_id
    );
    console.log("re");
    setOnly(true);
    await props.InspectionListFresh();
    await props.addInspectionFresh();
  };
  // console.log(props.inspection_add_data);
  // console.log(props.inspection_add_loading);
  let start = moment(startTime, "hh:mm:ss a");
  let end = moment(endTime, "hh:mm:ss a");
  let dif = moment.duration(end.diff(start));
  const duration = dif.hours() * 60 + dif.minutes();
  console.log(duration);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const [isHover, setIsHover] = useState(false);

  const id = props.data?.data?.id;
  const handleSubmit = e => {
    e.preventDefault();
    if (Object.keys(date).length == 0) {
      toastr.warning("Please Select a date");
    } else if (manager == undefined) {
      toastr.warning("Please select manager");
    } else if (duration <= 0) {
      toastr.warning("Please check start and end time");
    } else if (summary == undefined) {
      toastr.warning("Please write a summary");
    } else {
      setShowModal(true);
      console.log(type, date, startTime, endTime, summary, manager);
      props.addInspectionInfo(
        {
          property_id: id,
          inspection_type: type,
          inspection_date: date,
          start_time: startTime,
          end_time: endTime,
          duration: duration,
          summery: summary,
          manager_id: manager,
        },
        contactIds
      );
      setType();
      setDate();
      setStartTime();
      setEndTime();
      setSummary();
      setManager();
    }
  };

  let userData = undefined;
  if (props.user_list_data) {
    userData = props.user_list_data?.data?.map((item, key) => (
      <option key={key} value={item.id}>
        {item.first_name + " " + item.last_name}
      </option>
    ));
  }

  useEffect(() => {
    if (props.data) {
      setContactIds({
        owner_contact_id: props.data?.data.owner_id
          ? props.data.data.owner_id
          : null,
        tenant_contact_id: props.data?.data.tenant_id
          ? props.data.data.tenant_id
          : null,
      });
    }
  }, [props.data]);

  // const handleSchedule = (e) => {
  //   e.preventDefault();

  //   setShowModal(true);
  // }

  return (
    <>
      <Loder status={showModal} />
      {/* ===============Inspection modal start from here ================*/}

      <Modal isOpen={props.inspectionModal} toggle={props.toggle} >
        <ModalHeader style={{ backgroundColor: "#153D58" }} >
          <div style={{ display: "flex", justifyContent: "space-between", width: "460px", marginTop: "10px" }}>
            <div>
              {/* <i className="bx bx-task me-1 text-white"></i> */}
              <span style={{ color: '#FFF' }}> New Inspection</span>
            </div>
            <div style={{ cursor: "pointer" }}>
              <i className="mdi mdi-close-thick font-size-20 text-white" onClick={props.toggle}></i>
            </div>
          </div>
        </ModalHeader>

        <ModalBody style={{ backgroundColor: "#F2F6FA" }}>
          <Form className="form p-3" onSubmit={handleSubmit}>
            {/* <FormGroup row>
              <Col sm={12}>
                
                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                  <input
                    type="text"
                    className="form-control"
                    id="usr"
                    required
                    value={props.data ? props.data.data.reference : null}
                  />
                  <label htmlFor="usr">Property</label>
                </div>
              </Col>
            </FormGroup> */}
            <FormGroup row>
              <Label for="exampleSelect" md={4} className="">
                Property
              </Label>
              <Col md={8} className="d-flex align-items-center">

                <div onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className={`text-primary`}
                  style={{ textDecoration: isHover ? 'underline' : '', cursor: 'pointer', color: "#003786 !important" }}>{props.data ? props.data.data.reference : null}
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              {/* <Label for="exampleSelect" sm={3}>
                Type
              </Label> */}
              <Col sm={12}>
                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                  <Input
                    id="exampleSelect"
                    name="type"
                    value={type}
                    onChange={e => setType(e.target.value)}
                    type="select"
                    required={true}
                    style={{ backgroundColor: "#F2F6FA" }}
                  >
                    <option>Select a Type</option>
                    <option>Routine</option>
                    <option>Entry</option>
                    <option>Exit</option>
                  </Input>
                  <label htmlFor="usr">Type</label>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* <Label for="exampleSelect" md={3}>
                Date
              </Label> */}
              <Col md={12}>
                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                  <Flatpickr
                    className="form-control d-block"
                    placeholder="Pick a Date..."
                    value={date}
                    options={{
                      altInput: true,
                      format: "d/m/Y",
                      altFormat: "d/m/Y",
                      onChange: dateHandler,
                    }}
                  />

                  <label htmlFor="usr">Date</label>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* <Label for="exampleFile" sm={3}>
                Start Time
              </Label> */}
              <Col sm={6}>
                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                  <Input
                    id="exampleFile"
                    name="start"
                    value={startTime ?? ""}
                    type="time"
                    required={true}
                    onChange={e => setStartTime(e.target.value)}
                  />
                  <label htmlFor="usr">Start Time</label>
                </div>
              </Col>
              <Col sm={6}>
                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                  <Input
                    id="exampleFile"
                    name="end"
                    value={endTime ?? ""}
                    type="time"
                    required={true}
                    onChange={e => setEndTime(e.target.value)}
                  />
                  <label htmlFor="usr">End Time</label>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* <Label for="property" sm={3}>
                Duration
              </Label> */}
              <Col sm={12}>
                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                  {/* <p fontSize="18px">{isNaN(duration) ? 0 : duration} min</p> */}
                  <input
                    type="text"
                    className="form-control"
                    id="usr"
                    required
                    value={isNaN(duration) ? 0 : duration} min


                  />
                  <label htmlFor="usr">Duration</label>
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              {/* <Label for="exampleText" sm={3}>
                Summary
              </Label> */}
              <Col sm={12}>
                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                  <Input
                    id="exampleText"
                    name="summary"
                    value={summary}
                    //type="textarea"
                    type="text"
                    required={true}
                    onChange={e => setSummary(e.target.value)}
                  //className="form-control-new-summary"
                  />
                  <label htmlFor="usr">Summary</label>
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              {/* <Label for="exampleSelect" sm={3}>
                Manager
              </Label> */}
              <Col sm={12}>
                <div className="form-group-new" >
                  <Input
                    id="exampleSelect"
                    name="manager"
                    value={manager}
                    required={true}
                    onChange={e => setManager(e.target.value)}
                    type="select"
                    style={{ backgroundColor: "#F2F6FA" }}
                  >
                    <option>Choose...</option>
                    {userData}
                  </Input>
                  <label htmlFor="usr">Manager</label>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="button" sm={3}></Label>
              <Col sm={9} className="gap-3">
                <Button color="buttonColor" onClick={props.toggle}>
                  <i className="fa-solid fa-xmark"></i>Cancel
                </Button>{" "}
                <Button color="buttonColor" type="submit">
                  Schedule & Open
                </Button>{" "}
                <Button
                  color="buttonColor"
                  type="submit"
                  onClick={e => {
                    setOnly(false);
                  }}
                >
                  Schedule
                </Button>{" "}
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>

      </Modal>

      {/* ===============Inspection modal ends here ================*/}
    </>
  );
}
const mapStateToProps = gstate => {
  const { user_list_data, user_list_error, user_list_loading } =
    gstate.property;

  const { inspection_add_data, inspection_add_error, inspection_add_loading } =
    gstate.Inspections;

  return {
    inspection_add_data,
    inspection_add_error,
    inspection_add_loading,

    user_list_data,
    user_list_error,
    user_list_loading,
  };
};
export default connect(mapStateToProps, {
  addInspectionInfo,
  addInspectionFresh,
  InspectionListFresh,
  getUser,
  PropertyAllActivity,
})(InspectionModalProperty);
