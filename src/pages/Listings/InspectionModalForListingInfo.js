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
  getListInspectionModalInfo,
  addInspectionInfo,
  getUser,
  InspectionListFresh,
  ListingListInspectionInfoFresh,
  addInspectionFresh,
} from "store/actions";

import { getPropertyInfo } from "store/actions";
import Select from "react-select";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import Loder from "components/Loder/Loder";

function InspectionModalForListingInfo(props) {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState();
  console.log(data);
  const [inspectionModal, setInspectionModal] = useState(false);
  const toggle = () => setInspectionModal(!inspectionModal);
  const [type, setType] = useState("Routine");
  console.log(type);
  const [date, setDate] = useState({});
  const [startTime, setStartTime] = useState();
  // console.log(startTime);
  const [endTime, setEndTime] = useState();
  const [summary, setSummary] = useState();
  const [manager, setManager] = useState();
  const [contactIds, setContactIds] = useState();
  const [init, setInit] = useState(true);
  const [initProps, setInitProps] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const options = [
    { value: 'Routine', label: 'Routine' },
    { value: 'Entry', label: 'Entry' },
    { value: 'Exit', label: 'Exit' },
  ];

  //console.log(props.data.data.id);

  // if (props.p_id == !undefined) {
  //     const property_id = p_id;
  // }
  const property_id = props.p_id;
  // console.log(property_id);

  const dateHandler = (selectedDates, dateStr, instance) => {
    // console.log(dateStr);
    setDate(dateStr);
  };

  useEffect(() => {
    // if (props.inspection_info_modal_loading == false) {
    //     if (property_id !== undefined) {
    //         props.getListInspectionModalInfo(property_id);
    //     }

    // }
    if (props.user_list_loading == false) {
      props.getUser();
    }
    if (props.inspection_add_loading === "Success") {
      setShowModal(false);
      toastr.success("Added Successfully");
      props.addInspectionFresh();
      props.ListingListInspectionInfoFresh();
      props.loader();

      if (data) {
        setData();
        history.push(
          "/inspectionInfo/" + props.inspection_add_data.inspection_id
        );
      }

      toggle(false);
    }
    if (props.property_info_data) {
      // property_data = props.property_info_data?.data;
      setContactIds({
        owner_contact_id: props.property_info_data?.data?.data?.owner_id
          ? props.property_info_data?.data.data?.owner_id
          : null,
        tenant_contact_id: props.property_info_data?.data?.data?.tenant_id
          ? props.property_info_data?.data.data?.tenant_id
          : null,
      });
    }
  }, [
    props.inspection_info_modal_loading,
    props.user_list_loading,
    props.inspection_add_loading,
    props.property_info_data,
  ]);

  if (init) {
    if (props.p_id) {
      props.getPropertyInfo(props.p_id);
      setInit(false);
    }
  }
  // console.log('Inspection info modal---------');
  // console.log(props.inspection_info_modal_data);
  // console.log(props.inspection_info_modal_data?.data.property.reference);

  // console.log(props.inspection_add_data);
  // console.log(props.inspection_add_loading);
  let start = moment(startTime, "hh:mm:ss a");
  let end = moment(endTime, "hh:mm:ss a");
  let dif = moment.duration(end.diff(start));
  const duration = dif.hours() * 60 + dif.minutes();
  // console.log([dif.hours(), dif.minutes(), dif.seconds()].join(':'));
  // console.log('dif in Mins: ', (dif.hours() * 60) + dif.minutes());
  //console.log(mins);
  // const id = props.data?.data?.id;
  let property_data = undefined;
  // let dueDate = undefined;


  const submitHandler = text => {
    if (Object.keys(date).length == 0) {
      toastr.warning("Please Select a date");
    } else if (duration <= 0 || isNaN(duration)) {
      toastr.warning("Please check start and end time");
    } else if (summary == undefined) {
      toastr.warning("Please write a summary");
    } else if (manager == undefined) {
      toastr.warning("Please select manager");
    } else {
      setShowModal(true);
      console.log(type, date, startTime, endTime, duration, summary, manager);
      console.log(contactIds);
      props.addInspectionInfo(
        {
          property_id: property_id,
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
      props.loader();
      setType();
      setDate();
      setStartTime();
      setEndTime();
      setSummary();
      setManager();
      if (text) {
        setData(text);
      }
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
  const handleTypeChange = (val) => {
    console.log(val);
  }
  return (
    <>
      <Loder status={showModal} />
      <Button className="btn w-md m-1" color="info" onClick={toggle}>
        Add
      </Button>

      <Modal isOpen={inspectionModal} toggle={toggle}>
        <ModalHeader style={{ backgroundColor: "#153D58" }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "460px", marginTop: "10px" }}>
            <div>
              <span className="text-white">New Inspection</span>
            </div>
            <i className="mdi mdi-close-thick font-size-20 text-white" onClick={toggle} style={{ cursor: "pointer" }}></i>
          </div>
        </ModalHeader>

        <ModalBody style={{ backgroundColor: "#F2F6FA" }}>
          <Form
            className="form p-3"
          >
            <FormGroup row>
              <Label for="property" sm={3}>
                Property
              </Label>
              <Col sm={9}>
                <div className="p-2">
                  <p fontSize="18px" color="#003786">{props.reference}</p>
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={12}>
                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                  <Input
                    id="exampleSelect"
                    name="type"
                    // value={type}
                    onChange={e => setType(e.target.value)}
                    type="select"
                    required={true}
                    style={{ backgroundColor: "#F2F6FA" }}
                  >
                    <option>Routine</option>
                    <option>Entry</option>
                    <option>Exit</option>
                  </Input>

                  {/* <Select
                    defaultValue={type}
                    //onChange={e => setType(e.target.value)}
                    onChange={setType}
                    options={options}
                    style={{ backgroundColor: "#F2F6FA" }}
                  /> */}
                  <label htmlFor="usr">Type</label>
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={12}>
                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                  <Flatpickr
                    className="form-control d-block"
                    placeholder="Pick a Date..."
                    value={date}
                    options={{
                      altInput: true,
                      format: "d-m-Y",
                      altFormat: "d-m-Y",
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
                  //defaultValue="07:30:00"
                  />
                  <label htmlFor="usr"> Start Time</label>
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
                  // defaultValue="08:00:00"
                  />
                  <label htmlFor="usr"> End Time</label>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm={12}>
                {/* <div className="p-2">
                  <p fontSize="18px">{isNaN(duration) ? 0 : duration} min</p>
                </div> */}

                <div className="form-group-new" style={{ marginBottom: "-25px" }}>
                  <Input
                    id="exampleFile"
                    value={isNaN(duration) ? 0 : duration} min

                  />
                  <label htmlFor="usr"> Duration</label>
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelect " className="form-group-new-desc-label" style={{ marginBottom: "-10px", zIndex: "10", width: "80px", padding: "0px 3px 0px 3px" }}>
                Summary
              </Label>
              <Col sm={12}>
                <Input
                  id="exampleText"
                  name="summary"
                  value={summary}
                  type="textarea"
                  required={true}
                  onChange={e => setSummary(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              {/* <Label for="exampleSelect" sm={3}>
                Manager
              </Label> */}
              <Col sm={12}>
                <div className="form-group-new" style={{ marginTop: "15px" }}>
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


                  {/* <Select
                    value={manager}
                    onChange={e => setManager(e.target.value)}
                    options={userData}
                    classNamePrefix="select2-selection"
                    placeholder='Select a manager...'
                  /> */}
                  <label htmlFor="usr">Manager</label>
                </div>





              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter style={{ backgroundColor: "#F2F6FA" }}>
          <Row>
            <Col md={12} className="d-flex align-items-top">
              <Button color="buttonCancelColor" className="" onClick={toggle}>
                <i className="fa-solid fa-xmark"></i>Cancel
              </Button>{" "}
              <Button
                color="buttonColor"
                className="mx-2"
                type="submit"
                onClick={() => submitHandler("open")}
              >
                Schedule & Open
              </Button>{" "}
              <Button
                color="buttonColor"
                className=""
                type="submit"
                onClick={() => submitHandler("")}
              >
                Schedule
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>

      {/* ===============Inspection modal ends here ================*/}
    </>
  );
}
const mapStateToProps = gstate => {
  const {
    property_info_data,
    property_info_loading,
    user_list_data,
    user_list_error,
    user_list_loading,
  } = gstate.property;

  const { inspection_add_data, inspection_add_error, inspection_add_loading } =
    gstate.Inspections;

  const { inspection_info_modal_loading, inspection_info_modal_data } =
    gstate.Listing;

  return {
    property_info_data,
    property_info_loading,

    inspection_add_data,
    inspection_add_error,
    inspection_add_loading,

    user_list_data,
    user_list_error,
    user_list_loading,

    inspection_info_modal_loading,
    inspection_info_modal_data,
  };
};
export default connect(mapStateToProps, {
  getListInspectionModalInfo,
  addInspectionInfo,
  InspectionListFresh,
  getUser,
  getPropertyInfo,
  ListingListInspectionInfoFresh,
  addInspectionFresh,
})(InspectionModalForListingInfo);
