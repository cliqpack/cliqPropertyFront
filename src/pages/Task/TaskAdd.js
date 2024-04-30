import moment from "moment";
import React, { useEffect, useState } from "react";
import Select from "react-select";
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
import "./TaskShow.css";

import {
  getUser,
  propertyList,
  contactList,
  addTask,
  addTaskFresh,
  getAllTask,
  getAllTaskFresh,
  PropertyAllActivity,
  allDueTaskFresh,
  allActiveTaskFresh,
  getAllDueTask,
  getAllActiveTask,
  getAllDueLaterTask,
  ContactsAllActivity
} from "store/actions";

import toastr from "toastr";
import { Link, useHistory } from "react-router-dom";
import Loder from "components/Loder/Loder";

import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

function TaskAdd(props) {
  const history = useHistory();
  const [taskModal, setTaskModal] = useState(false);
  const [scheduleNOpenState, setScheduleNOpenState] = useState(false);

  const [propertyGroup, setPropertyGroup] = useState();
  const [propertyOptionGroup, setPropertyOptionGroup] = useState([]);
  const [forSelectedProperty, setForSelectedProperty] = useState(true);

  const [contactGroup, setContactGroup] = useState();
  const [contactOptionGroup, setContactOptionGroup] = useState([]);
  const [forSelectedContact, setForSelectedContact] = useState(true);

  const [managerGroup, setManagerGroup] = useState();
  const [managerOptionGroup, setManagerOptionGroup] = useState([]);
  const [forManagerContact, setForManagerContact] = useState(true);

  const [state, setState] = useState({});
  console.log(state);
  const [showModal, setShowModal] = useState(false);

  const dateHandler = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    handleState(dateStr, "duedate")
  }

  var authUser = JSON.parse(localStorage.getItem("authUser"));
  console.log(authUser?.user?.id);

  useEffect(() => {
    if (taskModal == true) {
      setManagerGroup({
        label: authUser?.user?.first_name + " " + authUser?.user?.last_name,
        value: authUser?.user?.id,
      });

      setState(prev => ({ ...prev, 'manager': authUser?.user?.id }))
    }
    if (props.property_list_loading === false) {
      props.propertyList();
    } else if (props.contacts_list_loading === false) {
      props.contactList();
    } else if (props.user_list_loading === false) {
      props.getUser();
    }

    if (props.add_task_loading === "Success" && !scheduleNOpenState) {
      toastr.success("Task added successfully");

      props.addTaskFresh();
      setShowModal(false);
      // props.allDueTaskFresh();
      // props.allActiveTaskFresh();
      props.getAllActiveTask('1',
        '10',
        null,
        "summary",
        "desc");
      // props.getAllDueTask();
      // props.getAllDueLaterTask();
      // props.getAllTask();
      setContactGroup('')
    }

    if (props.add_task_loading === "Success" && scheduleNOpenState) {
      props.addTaskFresh();
      setContactGroup('')

      history.push(`/task/show/${props.add_task.tasks_id}`);
    }
  }, [
    props.property_list_loading,
    props.contacts_list_loading,
    props.user_list_loading,
    props.add_task_loading,
    scheduleNOpenState, taskModal,

  ]);

  console.log(props.contactRef, props.contact_id);

  const handleState = (value, name = "", label = "") => {
    setState({ ...state, [name]: value });
    if (name === "property") {
      setPropertyGroup({ label: label, value: value });
    } else if (name === "contact") {
      setContactGroup({ label: label, value: value });
    } else if (name === "manager") {
      setManagerGroup({ label: label, value: value });
    }
  };

  const toggle = () => {
    setTaskModal(!taskModal);
    setState({});
    setPropertyGroup({});
  };

  const handleSave = () => {
    setShowModal(true);
    props.addTask(state, props.property_id, props.contact_id);
    props.getAllTask();
    props.PropertyAllActivity(props.property_id);
    props.ContactsAllActivity(props.contact_id);

    toggle();
  };

  const handleScheduleNOpenSubmit = () => {
    props.addTask(state, props.property_id, props.contact_id);
    props.PropertyAllActivity(props.property_id);
    props.ContactsAllActivity(props.contact_id);
    props.getAllTask();
    setScheduleNOpenState(true);
  };

  // if (props.add_task_loading === "Success" && !scheduleNOpenState) {
  //   toastr.success("Task added successfully");

  //   props.addTaskFresh();
  //   setShowModal(false);
  //   // props.allDueTaskFresh();
  //   // props.allActiveTaskFresh();
  //   props.getAllActiveTask();
  //   props.getAllDueTask();
  //   props.getAllDueLaterTask();
  //   props.getAllTask();

  // }

  // if (props.add_task_loading === "Success" && scheduleNOpenState) {
  //   props.addTaskFresh();
  //   history.push(`/task/show/${props.add_task.tasks_id}`);
  // }


  let propertyData = [];
  if (props.property_list_data) {
    propertyData = props.property_list_data?.data?.map((item, key) => ({
      label: item.reference,
      value: item.id,
    }));
  }
  if (propertyData?.length > 0 && forSelectedProperty) {
    setForSelectedProperty(false);
    setPropertyOptionGroup(propertyData);
  }

  let contactData = [];
  if (props.contacts_list_data) {
    contactData = props.contacts_list_data?.data?.map((item, key) => ({
      label: item.reference,
      value: item.id,
    }));
  }
  if (contactData?.length > 0 && forSelectedContact) {
    setForSelectedContact(false);
    setContactOptionGroup(contactData);
  }

  let userData = [];
  if (props.user_list_data) {
    userData = props.user_list_data?.data?.map((item, key) => ({
      label: item.first_name + " " + item.last_name,
      value: item.id,
    }));
  }
  if (userData.length > 0 && forManagerContact) {
    setForManagerContact(false);
    setManagerOptionGroup(userData);
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-info w-100" style={{
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "5px",
          backgroundColor: taskModal ? "#6E62E5" : "#6E62E5"
        }} onClick={toggle} >

        New Task <i className="bx bx-plus-circle font-size-18 align-middle ms-1" />

      </button>
      <Loder status={showModal} />
      <Modal isOpen={taskModal} >
        <ModalHeader style={{ backgroundColor: "#6E62E5" }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "460px", marginTop: "10px" }}>
            <div>
              {/* <i className="bx bx-task text-white"></i>&nbsp; */}
              <span className="text-white">New Task</span>
            </div>
            <i className="mdi mdi-close-thick font-size-20 text-white" onClick={toggle} style={{ cursor: "pointer" }}></i>
          </div>
        </ModalHeader>

        <ModalBody style={{ backgroundColor: "#F2F6FA" }}>
          <Form className="form p-3">
            <FormGroup row style={{ position: "relative", zIndex: "8" }}>
              <Col sm={12}>
                <div className="form-group-new" style={{ marginBottom: "-20px" }} >
                  {props.propertyName ? (
                    <Link>
                      <span className="underlined">{props.propertyName}</span>
                    </Link>
                  ) : (
                    <Select
                      value={propertyGroup}
                      options={propertyOptionGroup}
                      onChange={e => handleState(e.value, "property", e.label)}
                      placeholder="Property..."
                      classNamePrefix="select2-selection"
                    />

                  )}
                  <label htmlFor="usr">Property</label>
                </div>
              </Col>
            </FormGroup>


            <FormGroup row style={{ position: "relative", zIndex: "7" }}>
              <Col sm={12}>

                {props.contactRef ? (
                  <div style={{ marginBottom: props.contactRef ? "20px" : "0px" }}>
                    <Link>
                      <span
                        className="underlined"
                        onClick={() => window.location.reload()}
                        color="#003786"
                        style={{ fontWeight: "bold" }}
                      >
                        {props.contactRef}
                      </span>
                    </Link>
                  </div>
                ) : (
                  <div className="form-group-new" style={{ marginBottom: "-15px" }} >
                    <Select
                      value={contactGroup}
                      options={contactOptionGroup}
                      onChange={e => handleState(e.value, "contact", e.label)}
                      placeholder="Contact"
                      classNamePrefix="select2-selection"
                    />
                    <label htmlFor="usr">Contact</label>
                  </div>
                )}

              </Col>
            </FormGroup>

            <FormGroup row style={{ position: "relative", zIndex: "6" }}>
              <Col sm={12}>
                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                  <Select
                    value={managerGroup}
                    options={managerOptionGroup}
                    onChange={e => handleState(e.value, "manager", e.label)}
                    classNamePrefix="select2-selection"
                  />
                  <label htmlFor="usr">Manager</label>
                </div>
              </Col>
            </FormGroup>


            <FormGroup row>
              <Col md={12}>
                <div className="form-group-new" style={{ marginBottom: "-15px" }}>
                  <Flatpickr
                    className="form-control d-block"
                    placeholder="Pick a Date..."
                    value={state.date}
                    // onChange={() => dateHandler()}
                    options={{
                      altInput: true,
                      format: "d/m/Y",
                      altFormat: "d/m/Y",
                      onChange: dateHandler
                    }}
                  />
                  <label htmlFor="usr">Due by</label>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm={12}>
                <div className="form-group-new" style={{ marginBottom: "-25px" }}>
                  <Input
                    id="summary"
                    name="summary"
                    type="text"
                    //placeholder="Summary"
                    value={state.summary}
                    onChange={e => handleState(e.target.value, "summary")}
                  />
                  <label htmlFor="usr">Summary</label>
                </div>

              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelect " className="form-group-new-desc-label" style={{ marginBottom: "-10px", zIndex: "3", width: "85px", padding: "0px 3px 0px 3px", }}>
                Description
              </Label>
              <Col sm={12}>
                <div className="form-group-new-desc" style={{ marginBottom: "-15px" }}>
                  <Input
                    type="textarea"
                    id="textarea"
                    name="description"
                    rows="3"
                    // placeholder="Description"
                    value={state.description}
                    onChange={e => handleState(e.target.value, "description")}
                    className="form-control-new-desc"

                  />

                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="button" sm={3}></Label>
              <Col sm={9} className="d-flex justify-content-end gap-2 mt-3">
                <Button color="buttonCancelColor" onClick={toggle}>
                  <i className="fa-solid fa-xmark"></i>Cancel
                </Button>{" "}
                <Button
                  color="buttonColor"
                  disabled={
                    (state.property || props.property_id) && state.summary
                      ? false
                      : true
                  }
                  onClick={handleScheduleNOpenSubmit}
                >
                  <i className="far fa-save"></i> &nbsp; Save & Open
                </Button>{" "}
                <Button
                  color="buttonColor"
                  disabled={
                    (state.property || props.property_id) && state.summary
                      ? false
                      : true
                  }
                  onClick={handleSave}
                >
                  <i className="far fa-save"></i> &nbsp; Save
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
  const {
    property_list_data,
    property_list_loading,

    user_list_data,
    user_list_loading,
  } = gstate.property;

  const { contacts_list_data, contacts_list_loading } = gstate.Contacts2;

  const { add_task, add_task_loading, all_due_task_loading } = gstate.tasks;

  return {
    property_list_data,
    property_list_loading,

    contacts_list_data,
    contacts_list_loading,

    user_list_data,
    user_list_loading,

    add_task,
    add_task_loading,
    all_due_task_loading,
  };
};
export default connect(mapStateToProps, {
  propertyList,
  contactList,
  getUser,
  addTask,
  addTaskFresh,
  getAllTask,
  getAllTaskFresh,
  PropertyAllActivity,
  ContactsAllActivity,
  allDueTaskFresh,
  allActiveTaskFresh,
  getAllDueTask,
  getAllActiveTask,
  getAllDueLaterTask,
})(TaskAdd);
