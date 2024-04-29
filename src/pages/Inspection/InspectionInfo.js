import React, { useEffect, useRef, useState } from "react";
import "./InspectionInfo.css";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  withRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import Select from "react-select";
import toastr from "toastr";
import dummyImage from "../../assets/images/house.jpg";
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
  Input,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormGroup,
} from "reactstrap";

import classnames from "classnames";
import {
  InspectionInfoData,
  getUser,
  updateInspectionInfo,
  InspectionUpdateFresh,
  InspectionInfoFresh,
  InspectionListFresh,
  addInspectionFresh,
  getPropertyRoomFresh,
  InspectionDetailsInfoDataFresh,
  updatePictureIns,
  lebelInsert,
  insComplete,
  inspected,
  markAsScheduled,
  insDelete,
  InspectionStatusFresh,
  getScheduleListFresh,
  storeInspectionTaskJobDocument,
  storeInspectionTaskJobDocumentFresh,
  AllInspectionDocument,
  addComment,
  addCommentFresh,
  getMessageInspection,
  inspectionAllActivity,
  getAllDataForMsgTemplates,
} from "../../store/actions";
import { TagsInput } from "react-tag-input-component";
import Aos from "aos";
import "aos/dist/aos.css";
import Comment from "pages/Activity/Comment";
import ShowActivityData from "pages/Properties/Activity/ShowActivityData";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import MessagesModal from "./MessagesModal/MessagesModal";
import Breadcrumbs from "components/Common/Breadcrumb";
import CommentData from "pages/Activity/CommentData";
import TooltipVisibility from "pages/Properties/Documents/TooltipVisibility";


let inspectionInfoData = false;
const InspectionInfo = props => {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const inputFile = useRef(null);
  const [file, setFile] = useState(dummyImage);
  const [level, setLevel] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [showDropZone, setShowDropZone] = useState(false);
  const [message, setMessage] = useState("");
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  let propertyName = "New Property";

  const [state, setState] = useState({
    customIconActiveTab: "1",
    customIconActiveTab: "2",
  });

  const [insTabState, setInsTabState] = useState({
    activeTab: "1",
  });

  const [editState, setEditState] = useState({});
  const [propertyID, setPropertyID] = useState();
  const [propInit, setPropInit] = useState(true);
  const [actionState, setActionState] = useState({ btnsecondary1: false });
  const [msgShow, setMsgShow] = useState(false);

  const [msgModal, setMsgModal] = useState(false);

  const [due, setDue] = useState(0);

  const toggleMsgModal = () => {
    setMsgModal(prev => !prev);
    props.getAllDataForMsgTemplates();
  };

  const dateHandler = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    setEditState({ ...editState, ["inspection_date"]: dateStr });
    var given = moment(dateStr, "YYYY-MM-DD");
    var current = moment().startOf("day");

    //Difference in number of days
    var date = moment.duration(current.diff(given)).asDays();
    setDue(date);
  };

  // activity modal declare
  const [activitymodal, setActivityModal] = useState(false);
  const activityToggle = () => {
    console.log(activitymodal);
    if (activitymodal == false) {
      //props.PropertyAllActivity(property_id);
      setActivityModal(prev => !prev)
    } else {
      setActivityModal(prev => !prev)
    }
  }

  // comment modal declare
  const [commentmodal, setCommentModal] = useState(false);
  const commentToggle = () => setCommentModal(!commentmodal);

  // document modal declare
  const [documentModal, setDocumentModal] = useState(false);
  const documentToggle = () => setDocumentModal(prev => !prev);



  useEffect(() => {

    let optionManager;
    if (props.user_list_data) {
      optionManager = props.user_list_data?.data.map(item => ({
        label: item.full_name,
        value: item.id,
      }));
      setEditState(prev => ({ ...prev, optionManager: optionManager }));
    }


    if (props.store_inspection_task_job_document_loading === "Success") {
      toastr.success("Uploaded successfully");
      props.AllInspectionDocument(id);
      props.storeInspectionTaskJobDocumentFresh();
    }
    if (props.inspection_info_details_loading === "Success") {
      props.InspectionDetailsInfoDataFresh();
    }
    if (props.property_room_list_loading === "Success") {
      props.getPropertyRoomFresh();
    }
    if (props.user_list_loading == false) {
      props.getUser();
    }
    if (props.inspection_update_loading === "Success") {
      toastr.success("Updated");
      props.InspectionUpdateFresh();
      setPropInit(true);
    }
    if (props.inspection_add_loading === "Success") {
      props.addInspectionFresh();
    }



    if (props.inspection_info_data) {
      setEditState(prev => ({
        ...prev,
        duration: props.inspection_info_data.data.data.duration,
        end_time: props.inspection_info_data.data.data.end_time,
        inspection_date: props.inspection_info_data.data.data.inspection_date,
        inspection_type: props.inspection_info_data.data.data.inspection_type,
        manager_id: props.inspection_info_data.data.data.manager_id,
        property_id: props.inspection_info_data.data.data.property_id,
        start_time: props.inspection_info_data.data.data.start_time,
        status: props.inspection_info_data.data.data.status,
        summery: props.inspection_info_data.data.data.summery,
        first_name: props.inspection_info_data.data.data.first_name,
        selectedManager: { label: props.inspection_info_data.data.data.manager, value: props.inspection_info_data.data.data.manager_id }
      }));



      var given = moment(
        props.inspection_info_data.data.data.inspection_date,
        "YYYY-MM-DD"
      );
      var current = moment().startOf("day");

      //Difference in number of days
      var date = moment.duration(current.diff(given)).asDays();
      setDue(date);

      setStartTime(props.inspection_info_data.data.data.start_time);
      setEndTime(props.inspection_info_data.data.data.end_time);
      setPropertyID(props.inspection_info_data.data.data.property_id);
      let insLvl = [];
      if (props.inspection_info_data.data.data.inspection_level != []) {
        props.inspection_info_data.data.data.inspection_level?.map(
          async (item, key) => insLvl.push(item.labels)
        );
        setSelectedLevel(insLvl);
      }
    }

    if (props.inspection_status_loading === "Completed") {
      toastr.success("Inspection Completed");
      props.InspectionListFresh();
      props.InspectionStatusFresh();
      props.InspectionInfoData(id);
      props.AllInspectionDocument(id)
      // history.push("/inspections");
    }
    if (props.inspection_status_loading === "Inspected") {
      toastr.success("Inspected");
      props.InspectionInfoData(id);
      props.InspectionStatusFresh();
    }
    if (props.inspection_status_loading === "Scheduled") {
      toastr.success("Scheduled");
      props.InspectionInfoData(id);
      props.getScheduleListFresh();
      props.InspectionStatusFresh();
    }
    if (props.inspection_status_loading === "Deleted") {
      toastr.success("Inspection Deleted");
      props.InspectionListFresh();
      props.InspectionStatusFresh();
      history.push("/inspections");
    }

    if (props.inspection_message_data_loading === false) {
      props.getMessageInspection(id);
    }

    if (props.inspection_all_activity_loading === false) {
      props.inspectionAllActivity(id);
    }
    if (propInit) {
      props.InspectionInfoData(id);
      props.AllInspectionDocument(id);
      props.getMessageInspection(id);
      props.inspectionAllActivity(id);
      setPropInit(false);
    }
    Aos.init({ duration: 2000 });
  }, [
    props.inspection_info_loading,
    props.user_list_loading,
    props.inspection_info_data,
    props.inspection_update_loading,
    props.inspection_add_loading,
    props.inspection_info_details_loading,
    props.inspection_status_loading,
    props.inspection_message_data_loading,
    props.store_inspection_task_job_document_loading,
    props.inspection_all_activity_loading, props.user_list_data
  ]);

  const activityData = props.inspection_all_activity?.data?.data;

  const toggle = tab => {
    if (insTabState.activeTab !== tab) {
      setInsTabState(prev => {
        return {
          ...prev,
          activeTab: tab,
        };
      });
    }
  };

  const msgToggle = () => setMsgShow(prev => !prev);

  const handleChange = async e => {
    e.preventDefault();
    props.storeInspectionTaskJobDocument(
      e.target.files,
      editState.property_id,
      null,
      id
    );
  };

  if (props.inspection_info_data) {
    inspectionInfoData = props.inspection_info_data.data.data;
  }
  let inspectionReportURL;
  if (inspectionInfoData) {
    if (inspectionInfoData.inspection_type === "Entry") {
      inspectionReportURL =
        "/inspectionEntryReport/" +
        inspectionInfoData.id +
        "/" +
        inspectionInfoData.property_id;
    } else if (inspectionInfoData.inspection_type === "Routine") {
      inspectionReportURL =
        "/inspectionRoutineReport/" +
        inspectionInfoData.id +
        "/" +
        inspectionInfoData.property_id;
    } else if (inspectionInfoData.inspection_type === "Exit") {
      inspectionReportURL =
        "/inspectionExitReport/" +
        inspectionInfoData.id +
        "/" +
        inspectionInfoData.property_id;
    }
  }

  let userData = undefined;
  if (props.user_list_data) {
    userData = props.user_list_data?.data?.map((item, key) => (
      <option key={key} value={item.id}>
        {item.first_name + " " + item.last_name}
      </option>
    ));
  }

  let start = moment(startTime, "hh:mm:ss a");
  let end = moment(endTime, "hh:mm:ss a");
  let dif = moment.duration(end.diff(start));
  const duration = dif.hours() * 60 + dif.minutes();

  const formSubmitHandler = () => {
    props.updateInspectionInfo(id, editState, duration);
    props.InspectionInfoFresh();
    props.InspectionListFresh();
  };

  let docData = undefined;
  const docFiles = () => {
    if (inspectionInfoData != undefined) {
      if (inspectionInfoData) {
        if (typeof inspectionInfoData.inspection_docs !== "undefined") {
          docData = inspectionInfoData.inspection_docs.map((item, key) => (
            <Row className="mt-2" key={key}>
              <Col md={2}>
                <i className="bx bx-store" style={{ fontSize: 24 }} />
              </Col>
              <Col md={8}>
                <h6>
                  <a
                    href={process.env.REACT_APP_IMAGE + item.doc_path}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.doc_path}
                  </a>
                </h6>
                <br />
                <p>{inspectionInfoData && inspectionInfoData.reference}</p>
              </Col>

              <Col>
                <i className="bx bx-show" style={{ fontSize: 24 }} />
              </Col>

              <hr />
            </Row>
            // <option key={key} value={item.id}>{ item.first_name + ' ' + item.last_name }</option>
          ));
        }
      }
    }
  };

  docFiles();

  const handleMulti3 = e => {
    //setSelectedState(e);
    setSelectedLevel(e);
    props.lebelInsert(id, e);
    console.log(e);
  };

  const msgHandlerSubmit = e => {
    e.preventDefault();
    if (message.length === 0) {
      return;
    } else {
      props.addComment(
        message,
        props.inspection_info_data?.data?.data?.property_id,
        null,
        null,
        id
      );
      msgToggle();
    }
  };

  const enable = () => {
    setLevel(false);
  };
  const disable = () => {
    let insLvl = [];
    if (inspectionInfoData.inspection_level != []) {
      inspectionInfoData.inspection_level?.map(async (item, key) =>
        insLvl.push(item.labels)
      );
      setSelectedLevel(insLvl);
    }
    setLevel(true);
  };

  const dropFile = e => {
    e.preventDefault();
    setShowDropZone(false);
  };

  const drag = e => {
    e.preventDefault();
    setShowDropZone(true);
  };

  const dragend = e => {
    e.preventDefault();
    setShowDropZone(false);
  };

  const handleDocument = e => {
    e.preventDefault();
    props.storeInspectionTaskJobDocument(
      e.dataTransfer.files,
      editState.property_id,
      null,
      id
    );
  };

  const msgData = props.inspection_message_data?.data?.data;
  var authUserData = JSON.parse(localStorage.getItem("authUser"));
  const managerNameData = authUserData?.user?.first_name;

  const handleSelectGroupManager = e => {
    setEditState({ ...editState, selectedManager: e });
  };

  return (
    <React.Fragment>
      <div
        className="page-content"
        onDragOver={drag}
        onDragLeave={dragend}
        onDrop={dropFile}
      >
        <h4 className="ms-2 text-primary">Inspections info</h4>
        <Row>
          <Col lg={2}>
            <Card style={{ borderRadius: "15px" }}>
              <CardBody>
                <Row>
                  <div className="button-items mt-0 p-0" style={{ textAlign: "center" }}>
                    {editState?.inspection_type &&
                      props.inspection_info_data?.data?.data?.reference ? (
                      <h4 className="text-primary py-1">
                        {" "}
                        {editState?.inspection_type} -{" "}
                        {props.inspection_info_data?.data?.data?.reference.slice(
                          0,
                          40
                        )}
                      </h4>
                    ) : (
                      ""
                    )}
                    <div className="borderBottom mb-4" />
                    {editState.status == "complete" && (
                      <div className="w-100">
                        <Alert color="info">
                          <Row className="d-flex align-items-center">
                            <Col md={6} className="d-flex justify-content-end">
                              <i className="fas fa-check-circle fs-2x me-2"></i>
                              Closed on {editState?.status}
                            </Col>
                            <Col md={6} className="d-flex justify-content-start">
                              <Button
                                color="info"
                                onClick={() => {
                                  props.markAsScheduled(id);
                                  props.inspectionAllActivity(id);
                                }}
                              >
                                <i className="fas fa-undo me-2"></i>
                                Reopen
                              </Button>
                            </Col>
                          </Row>
                        </Alert>
                      </div>
                    )}
                    <Row>
                      <Col md={12}>
                        {/* <div className="d-flex gap-2 flex-wrap justify-content-center"> */}
                        <div className="button-items mt-0 p-0">
                          {editState.status == "inspected" ? (
                            <button
                              type="button"
                              className="btn btn-info custom-button-side-row-font-size"

                              onClick={() => {
                                props.insComplete(id);
                              }}
                            >
                              Complete <i className="fas fa-check me-1"></i>
                            </button>
                          ) : null}
                          <Link
                            to={inspectionReportURL ? inspectionReportURL : null}
                          >
                            <button
                              type="button"
                              className="btn btn-info custom-button-side-row-font-size"

                            >
                              Edit Report <i className="bx bxs-wrench me-1 font-size-16"></i>
                            </button>
                          </Link>

                          <button
                            type="button"
                            className="btn btn-info custom-button-side-row-font-size"
                            onClick={toggleMsgModal}
                          >

                            Message
                            <i className="fas fa-angle-right me-1 font-size-16" />
                          </button>
                          <Dropdown
                            isOpen={actionState.btnsecondary1}
                            toggle={() =>
                              setActionState({
                                btnsecondary1: !actionState.btnsecondary1,
                              })
                            }
                          >
                            <DropdownToggle
                              tag="button"
                              className="btn btn-info custom-button-side-row-font-size"
                            >
                              Action <i className="fas fa-angle-down me-1 font-size-16 "></i>
                            </DropdownToggle>
                            <DropdownMenu>
                              {editState.status == "inspected" && (
                                <DropdownItem>
                                  {" "}
                                  <a
                                    onClick={() => {
                                      props.insComplete(id);
                                      props.inspectionAllActivity(id);
                                    }}
                                  >
                                    Complete
                                  </a>
                                </DropdownItem>
                              )}
                              {editState.status == "Scheduled" && (
                                <DropdownItem>
                                  {" "}
                                  <a
                                    onClick={() => {
                                      props.inspected(id);
                                      props.inspectionAllActivity(id);
                                    }}
                                  >
                                    Mark as Inspected
                                  </a>
                                </DropdownItem>
                              )}
                              {editState.status == "Scheduled" ? null : (
                                <DropdownItem>
                                  {" "}
                                  <a
                                    onClick={() => {
                                      props.markAsScheduled(id);
                                      props.inspectionAllActivity(id);
                                    }}
                                  >
                                    Make as Scheduled
                                  </a>
                                </DropdownItem>
                              )}
                              <DropdownItem>
                                {" "}
                                <a
                                  onClick={() => {
                                    props.insDelete(id);
                                    props.inspectionAllActivity(id);
                                  }}
                                >
                                  Delete
                                </a>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </Col>
                      <Col md={12}>
                        {due > 0 ? (
                          <div className="bg-light p-3 d-flex mb-3 rounded">
                            <div className="flex-grow-1">
                              <h3 className="font-size-18 mb-2">
                                <span className="badge bg-danger">
                                  <b>{due} Day</b>
                                </span>
                              </h3>
                              <p className="mb-0 text-muted">
                                <i className="fas fa-clock"></i>
                                {"  "}OverDue
                              </p>
                            </div>
                          </div>
                        ) : null}
                      </Col>
                    </Row>
                  </div>
                </Row>
              </CardBody>
            </Card>

            <Card style={{ borderRadius: "15px" }}>
              <CardBody>

                <Row className="mt-3">

                  <div className="button-items mt-0 p-0">
                    <button
                      type="button"
                      className="btn btn-info custom-button-side-row-font-size"
                      //color={activityModal ? "modalButtonColor" : "labelColor"}
                      onClick={activityToggle}

                    >

                      Activity
                      <i className="fas fa-list font-size-12 align-middle me-2"></i>{" "}
                    </button>

                    <button
                      type="button"
                      className="btn btn-info custom-button-side-row-font-size"
                      //color={documentModal ? "modalButtonColor" : "labelColor"}
                      onClick={documentToggle}
                    >
                      Documents
                      <i className="fas fa-list font-size-12 align-middle me-2"></i>{" "}
                    </button>
                  </div>

                </Row>

              </CardBody>
            </Card>
          </Col>
          <Col md={12} lg={10} xs={12} className="p-0">
            <Card data-aos="fade-right" data-aos-once={true} className="custom_card_border_design me-2">
              <CardBody>
                {/* <Row className="justify-content-center">
                  <Col md={11}> */}
                <Row>
                  <Col md={9}>
                    <h3 className="text-primary">Inspection</h3>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <input
                      type="file"
                      onChange={handleChange}
                      ref={inputFile}
                      style={{ display: "none" }}
                    />
                    <Button className="me-1"
                      color="labelColor">
                      <i className="fas fa-cloud-upload-alt font-size-16 text-white"></i>
                    </Button>
                    <Button
                      className="me-1"
                      color="labelColor"
                      onClick={() => inputFile.current.click()}
                    >
                      {" "}
                      <i className="fas fa-paperclip font-size-16 text-white"></i>
                    </Button>
                  </Col>
                </Row>

                {showDropZone ? (
                  <div
                    style={{
                      position: "relative",
                      height: "400px",
                      width: "100%",
                      border: "4px dashed grey",
                      borderRadius: "5px",
                    }}
                    onDrop={e => handleDocument(e)}
                  >
                    <div
                      className="dz-message needsclick"
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div className="mb-3">
                        <i className="display-4 text-muted bx bxs-cloud-upload" />
                      </div>
                      <h4>Add document to Inspection</h4>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {!showDropZone && (
                  <>
                    <Row >
                      <Col md={6}>
                        <Row className="mt-3">
                          {/* <Col className="text-primary">Date</Col> */}
                          <Col>
                            <div className="form-group-new">
                              <Flatpickr
                                className="form-control d-block"
                                placeholder="Pick a Date..."
                                value={editState.inspection_date}
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

                        </Row>
                        <Row>
                          <Col>
                            <div className="form-group-new">
                              <Input
                                id="exampleFile"
                                name="start"
                                type="time"
                                required={true}
                                value={editState.start_time}
                                onChange={e => {
                                  setEditState({
                                    ...editState,
                                    start_time: e.target.value,
                                  });
                                  setStartTime(e.target.value);
                                }}
                              />
                              <label htmlFor="usr">Start Time</label>
                            </div>
                          </Col>

                        </Row>
                        <Row >
                          {/* <Col className="text-primary">End Time</Col> */}
                          <Col>
                            <div className="form-group-new">
                              <Input
                                id="exampleFile"
                                name="end"
                                type="time"
                                required={true}
                                value={editState.end_time}
                                onChange={e => {
                                  setEditState({
                                    ...editState,
                                    end_time: e.target.value,
                                  });
                                  setEndTime(e.target.value);
                                }}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row style={{ marginTop: "24px" }} className="d-flex align-items-center">

                          <Col>
                            <div className="form-group-new">
                              <Select
                                value={editState.selectedManager}
                                onChange={handleSelectGroupManager}
                                options={editState.optionManager}
                                classNamePrefix="select2-selection"
                                placeholder='Select a manager...'
                              />
                              <label htmlFor="usr">Manager</label>
                            </div>
                          </Col>

                        </Row>
                      </Col>

                      <Col md={6}>
                        <Row style={{ marginTop: "19px" }}>
                          <Col md={4}>
                            <p className="text-primary">Type</p>
                          </Col>
                          <Col md={8}>
                            <p className="badge square-pill bg-primary justify-content-center align-items-center p-2">
                              {editState?.inspection_type}
                            </p>
                          </Col>
                          <div className="borderBottom mt-2" />
                        </Row>
                        <Row style={{ marginTop: "15px" }}>
                          <Col md={4}>
                            <p className="text-primary">Duration</p>
                          </Col>
                          <Col md={8}>
                            <p className="badge square-pill bg-success justify-content-center align-items-center p-2 m-1">
                              {duration ? duration : editState?.duration}{" "}
                              min
                            </p>
                          </Col>
                          <div className="borderBottom mt-2" />
                        </Row>
                        <Row style={{ marginTop: "15px" }}>
                          <Col md={4}>
                            <p className="text-primary">Labels</p>
                          </Col>
                          <Col md={8}>
                            {level
                              ? selectedLevel.map((item, key) => {
                                return (
                                  <span
                                    className="font-size-12 badge rounded-pill bg-primary float-start"
                                    key={key}
                                  >
                                    {item}
                                  </span>
                                );
                              })
                              : null}{" "}
                            {level ? (
                              <a
                                onClick={() => {
                                  enable();
                                }}
                              >
                                <i className="fas fa-pencil-alt"></i>
                              </a>
                            ) : (
                              <>
                                <TagsInput
                                  value={selectedLevel}
                                  onChange={e => {
                                    handleMulti3(e);
                                  }}
                                  name="level"
                                  placeHolder="enter Level"
                                />
                                <a
                                  onClick={() => {
                                    disable();
                                  }}
                                >
                                  X
                                </a>
                              </>
                            )}
                          </Col>
                          <div className="borderBottom mt-2" />
                        </Row>
                        <Row style={{ marginTop: "15px" }}>
                          <Col md={4} className="text-primary">
                            Property
                          </Col>
                          <Col md={8}>
                            <Link to={"/propertyInfo/" + propertyID}>
                              {
                                props.inspection_info_data?.data?.data
                                  ?.reference
                              }
                            </Link>
                          </Col>
                          <div className="borderBottom mt-3" />
                        </Row>
                      </Col>
                    </Row>



                    <Row>

                      <Col md={6}>
                        <h3 className="text-primary">Owner</h3>
                        <Row>

                          <Col md={9}>
                            {/* <Row className="my-2">
                              {typeof inspectionInfoData?.owner != "undefined"
                                ? inspectionInfoData?.owner[0]
                                  ? inspectionInfoData?.owner[0]?.first_name +
                                  " " +
                                  inspectionInfoData?.owner[0]?.last_name
                                  : null
                                : null}
                            </Row> */}
                            <Row className="my-1 ">
                              <Col md={4} className="text-primary">
                                Name
                              </Col>

                              <Col md={8}>
                                {typeof inspectionInfoData?.owner != "undefined"
                                  ? inspectionInfoData?.owner[0]
                                    ? inspectionInfoData?.owner[0]?.first_name +
                                    " " +
                                    inspectionInfoData?.owner[0]?.last_name
                                    : null
                                  : null}
                              </Col>

                              <div className="borderBottom m-3" />
                            </Row>

                            <Row className="my-1">
                              <Col md={4} className="text-primary">
                                phone
                              </Col>

                              <Col md={8}>
                                {typeof inspectionInfoData?.owner !=
                                  "undefined"
                                  ? inspectionInfoData?.owner[0]
                                    ? inspectionInfoData?.owner[0]
                                      ?.mobile_phone
                                    : null
                                  : null}
                              </Col>

                              <div className="borderBottom m-3" />
                            </Row>
                            <Row className="my-1">
                              <Col md={4} className="text-primary">
                                email
                              </Col>
                              <Col md={8}>
                                {typeof inspectionInfoData?.owner !=
                                  "undefined"
                                  ? inspectionInfoData.owner[0]
                                    ? inspectionInfoData.owner[0]?.email
                                    : null
                                  : null}
                              </Col>
                              <div className="borderBottom m-3" />
                            </Row>
                          </Col>

                        </Row>
                      </Col>
                      <Col md={6}>
                        <h3 className="text-primary">Tenant</h3>

                        <Row>

                          <Col md={9}>

                            <Row className="my-1 ">
                              <Col md={4} className="text-primary">
                                Name
                              </Col>

                              <Col md={8}>
                                {typeof inspectionInfoData?.tenant !=
                                  "undefined"
                                  ? inspectionInfoData?.tenant[0]
                                    ? inspectionInfoData?.tenant[0]
                                      ?.first_name +
                                    " " +
                                    inspectionInfoData?.tenant[0]?.last_name
                                    : null
                                  : null}
                              </Col>

                              <div className="borderBottom m-3" />
                            </Row>
                            <Row className="my-1">
                              <Col md={4} className="text-primary">
                                phone
                              </Col>

                              <Col md={8}>
                                {typeof inspectionInfoData?.tenant !=
                                  "undefined"
                                  ? inspectionInfoData?.tenant[0]
                                    ? inspectionInfoData?.tenant[0]
                                      ?.mobile_phone
                                    : null
                                  : null}
                              </Col>
                              <div className="borderBottom m-3" />
                            </Row>
                            <Row className="my-1">
                              <Col md={4} className="text-primary">
                                email
                              </Col>
                              <Col md={8}>
                                {typeof inspectionInfoData?.tenant !=
                                  "undefined"
                                  ? inspectionInfoData?.tenant[0]
                                    ? inspectionInfoData?.tenant[0]?.email
                                    : null
                                  : null}
                              </Col>

                              <div className="borderBottom m-3" />
                            </Row>
                          </Col>

                        </Row>
                      </Col>

                    </Row>
                    <Row>
                      <Col md={12}>
                        {/* <Row className="my-3">
                        
                          <Col md={11}>
                            <div className="form-group-new-desc">
                              <Input
                                id="exampleFile"
                                name="summary"
                                type="text"
                                required={true}
                                value={editState.summery}
                                onChange={e => {
                                  setEditState({
                                    ...editState,
                                    summery: e.target.value,
                                  });
                                }}
                                style={{ height: "65px" }}
                              />
                              <label htmlFor="usr">Summary</label>
                            </div>
                          </Col>
                          <div className="borderBottom mt-3" />
                        </Row> */}

                        <Row md={12}>
                          <Col md={12} style={{ marginTop: "-10px" }}>
                            <FormGroup row>
                              <Label for="exampleSelect " className="form-group-new-desc-label" style={{ marginBottom: "-10px", zIndex: "10", width: "85px", padding: "0px 3px 0px 3px", }}>
                                {('Summary')}
                              </Label>
                              <div className="form-group-new">
                                <Input
                                  name="summary"
                                  type="textarea"
                                  rows="3"
                                  //placeholder="Summary"
                                  className="form-control"
                                  value={editState.summery}

                                  onChange={e => {
                                    setEditState({
                                      ...editState,
                                      summery: e.target.value,
                                    });
                                  }}

                                />

                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>

                    </Row>
                  </>
                )}
                <div className="d-flex justify-content-end my-3">
                  <button
                    className="btn btn-buttonColor"
                    onClick={formSubmitHandler}
                    disabled={editState.summery ? false : true}
                  >
                    <i
                      className="bx bx-save"
                      style={{ fontSize: "16px" }}
                    ></i>{" "}
                    Save
                  </button>
                </div>
                {/* </Col>
                </Row> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Row className="justify-content-center">
         
        </Row> */}

        {/* <Row className="justify-content-center">
          <Col md={10}>
            <Row>
              <Col md={12}>
                <Card data-aos="fade-right" data-aos-once={true}>
                  <CardBody>
                    <div className="">
                      <Nav className="nav-tabs-custom nav-tabs-custom justify-content-evenly ">
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: insTabState.activeTab === "1",
                            })}
                            onClick={() => {
                              toggle("1");
                            }}
                          >
                            <span className="font-size-14">
                              <i className="fa fa-solid fa-bars me-1" />
                              Activity
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: insTabState.activeTab === "2",
                            })}
                            onClick={() => {
                              toggle("2");
                            }}
                          >
                            <span className="font-size-14">
                              <i className="fas fa-file me-1" />
                              Documents
                            </span>
                          </NavLink>
                        </NavItem>

                        {insTabState.activeTab === "1" && (
                          <div className="d-flex justify-content-end align-items-center ms-5">
                            <NavItem>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                onClick={msgToggle}
                              >
                                
                                <div className="badge badge-soft-secondary d-flex align-items-start p-2">
                                
                                  <i className="bx bxs-comment-detail me-1 font-size-20 text-secondary" />
                                  <i className="fas fa-angle-down font-size-14 text-secondary" />
                                </div>
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink style={{ cursor: "pointer" }}>
                                <Link to={`/all-inspection-activity/${id}`}>
                                  <span className="font-size-14 text-dark">
                                    All
                                  </span>
                                </Link>
                              </NavLink>
                            </NavItem>
                          </div>
                        )}

                        {insTabState.activeTab === "2" && (
                          <div className="ms-5 ps-5">
                            <NavItem>
                              <NavLink style={{ cursor: "pointer" }}>
                                <Link to="/all-inspection-document">
                                  <span className="font-size-14 text-dark">
                                    All
                                  </span>
                                </Link>
                              </NavLink>
                            </NavItem>
                          </div>
                        )}
                      </Nav>
                    </div>

                    <div>
                      <TabContent
                        activeTab={insTabState.activeTab}
                        className="p-3 text-muted"
                      >
                        <TabPane tabId="1">
                          <Row>
                            <Col sm="12">
                              {msgShow && (
                                <Comment
                                  msgToggle={msgToggle}
                                  msgHandlerSubmit={msgHandlerSubmit}
                                  setMessage={setMessage}
                                  inspec_id={id}
                                />
                              )}

                              <p
                                className="fw-bold ps-2 font-size-16"
                                style={{
                                  borderBottom: "1.2px dotted #c9c7c7",
                                }}
                              >
                                Active
                              </p>
                              <div
                                style={{
                                  padding: "10px",
                                  maxHeight: "600px",
                                  overflowY: "auto",
                                  overflowX: "hidden",
                                }}
                                className="pb-2"
                              >
                                {activityData?.map((data, i) => (
                                  <ShowActivityData key={i} data={data} />
                                ))}
                              </div>

                              <p
                                className="fw-bold ps-2 pt-5 font-size-15"
                                style={{
                                  borderBottom: "1.2px dotted #c9c7c7",
                                }}
                              >
                                Comments
                              </p>
                              <CommentData data={msgData} />

                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="2">
                          <Row>
                            <Col sm="12">
                              <CardText className="mb-0">
                                <div
                                  style={{
                                    maxHeight: "380px",
                                    overflowY: "auto",
                                    overflowX: "hidden",
                                  }}
                                >
                                  <Row>
                                    {props.all_inspection_document?.data?.data.map(
                                      (element, idx) => {
                                        return (
                                          <Col md={4} key={element.id}>
                                            <Card>
                                              <CardBody>
                                                <div className="d-flex justify-content-between">
                                                  <div className="align-items-start">
                                                    <a
                                                      href={
                                                        process.env
                                                          .REACT_APP_DOCUMENT_2 +
                                                        element.doc_path
                                                      }
                                                      target="_blank"
                                                      rel="noreferrer noopener"
                                                    >
                                                     
                                                      {element.name == null
                                                        ? element.doc_path.slice(
                                                          0,
                                                          13
                                                        ) + "..."
                                                        : element.name}
                                                    </a>
                                                    <br />
                                                    <span>
                                                      <i className="fas fa-house-user me-2"></i>
                                                      {
                                                        element.property
                                                          .reference
                                                      }
                                                    </span>
                                                    <br />
                                                    <span>
                                                      <i className="fas fa-file me-2"></i>
                                                      {(
                                                        Number(
                                                          element.file_size
                                                        ) / 1024
                                                      ).toFixed(2) +
                                                        " " +
                                                        "kb"}
                                                    </span>
                                                    <br />
                                                    <i className="fa fa-solid fa-clock me-2" />{" "}
                                                    {moment(
                                                      element?.created_at
                                                    ).format("DD-MM-YYYY")}
                                                  </div>
                                                </div>
                                              </CardBody>
                                            </Card>
                                          </Col>
                                        );
                                      }
                                    )}
                                  </Row>
                                </div>
                              </CardText>
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row> */}

        {/* ================= activity modal start ===================*/}
        <Modal
          isOpen={activitymodal}
          toggle={activityToggle}
          size="lg"
          style={{
            border: "5px solid #153D58 !important",
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          <ModalHeader style={{ backgroundColor: "#153D58", height: "70px" }}>
            <div
              className="custom-modal-width"
            >
              <div>
                <p
                  className="fw-bold ps-2 font-size-16"
                  style={{ color: "white" }}
                >
                  Activity
                </p>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                    justifyContent: "flex-end",
                    gap: "10px",
                  }}
                >

                  <div
                    style={{
                      cursor: "pointer",
                      width: "50px",
                      backgroundColor: "#3C627B",
                      borderRadius: "8px",
                    }}
                    //onClick={msgToggle}
                    onClick={commentToggle}

                  >
                    <div className="badge badge-soft-secondary d-flex align-items-start p-2">
                      {/* <i className="far fa-comment-alt me-2 font-size-16 text-primary" /> */}
                      <i className="bx bxs-comment-detail me-1 font-size-16 text-white" />
                      <i className="fas fa-angle-down font-size-16 text-white" />
                    </div>
                  </div>

                  {/* </NavItem> */}
                  {/* <NavItem> */}
                  <div
                    style={{
                      cursor: "pointer",
                      width: "50px",
                      backgroundColor: "#3C627B",
                      borderRadius: "8px",
                    }}
                  >
                    <Link to={`/all-inspection-activity/${id}`}>
                      {/* <span className="font-size-14 text-dark">
                                All
                              </span> */}
                      <div className="badge badge-soft-secondary d-flex align-items-start px-3 py-2 font-size-16 text-white">
                        All
                      </div>
                    </Link>
                  </div>
                  {/* </NavItem> */}
                  <div onClick={activityToggle} style={{ cursor: "pointer" }}>
                    <i className="mdi mdi-close-thick font-size-20 text-white"></i>
                  </div>
                </div>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <Row style={{ padding: "10px" }}>
              <p
                className="fw-bold px-4 font-size-15"
                style={{
                  borderBottom: "1.2px dotted #c9c7c7",
                }}
              >
                Active
              </p>
              <Col sm="12">
                {msgShow && (
                  <CommentData data={msgData} />
                )}

                <div
                  style={{
                    padding: "10px",
                    maxHeight: "600px",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                  className="pb-2"
                >
                  {activityData?.map((data, i) => (
                    <ShowActivityData key={i} data={data} />
                  ))}
                </div>
                {activityData?.length > 0 && (
                  <div className="w-100 mt-2 d-flex justify-content-end">
                    <Link to={`/all-inspection-activity/${id}`}>
                      <Button color="labelColor">
                        <i className="fas fa-external-link-alt me-1" />
                        View All
                      </Button>
                    </Link>
                  </div>
                )}
                <p
                  className="fw-bold ps-2 pt-2 font-size-15 px-4"
                  style={{
                    borderBottom: "1.2px dotted #c9c7c7",
                  }}
                >
                  Comments
                </p>
                <CommentData data={msgData} />
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        {/* ================= activity modal end   ===================*/}

        {/* ================= comment modal start ===================*/}
        <Modal isOpen={commentmodal} toggle={commentToggle} size="lg">
          <ModalHeader
            //toggle={commentToggle}
            style={{ backgroundColor: "#153D58", height: "70px" }}
          >
            <div
              className="custom-modal-width"
            >
              <div>
                <p
                  className="fw-bold ps-2 font-size-16"
                  style={{ color: "white" }}
                >
                  Activity
                </p>
              </div>
              <div>

                <div
                  style={{
                    cursor: "pointer",
                    height: "50px",
                    width: "50px",
                    display: "flex",

                  }}
                >

                  <div
                    onClick={commentToggle}
                    style={{ cursor: "pointer", marginLeft: "15px", textAlign: "right" }}
                  >
                    <i className="mdi mdi-close-thick font-size-20 text-white"></i>
                  </div>
                </div>
              </div>
            </div>

          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
                <Comment
                  msgToggle={commentToggle}
                  msgHandlerSubmit={msgHandlerSubmit}
                  setMessage={setMessage}
                  inspec_id={id}
                />

              </Col>
            </Row>
          </ModalBody>
        </Modal>
        {/* ================= comment modal end   ===================*/}

        {/* ================= documents modal start   ===================*/}

        <Modal isOpen={documentModal} toggle={documentToggle} centered>
          <ModalHeader style={{ backgroundColor: "#153D58", height: "60px" }}>
            <div
              className="custom-modal-width-document-modal"
            >
              <div>
                <p
                  className="fw-bold ps-2 font-size-16"
                  style={{ color: "white" }}
                >
                  Documents
                </p>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                    justifyContent: "flex-end",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      cursor: "pointer",
                      width: "50px",
                      backgroundColor: "#3C627B",
                      borderRadius: "8px",
                    }}
                  >
                    <Link to={`/all-inspection-document/${id}`}>
                      {/* <span className="font-size-14 text-dark">
                                All
                              </span> */}
                      <div className="badge badge-soft-secondary d-flex align-items-start px-3 py-2 font-size-16 text-white">
                        All
                      </div>
                    </Link>
                  </div>
                  {/* </NavItem> */}
                  <div onClick={documentToggle} style={{ cursor: "pointer" }}>
                    <i className="mdi mdi-close-thick font-size-20 text-white"></i>
                  </div>
                </div>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12">
                <CardText className="mb-0">
                  <div
                    style={{
                      maxHeight: "380px",
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    <Row>
                      {props.all_inspection_document?.data?.data.map(
                        (element, idx) => {
                          return (
                            <Col md={12} key={element.id}>
                              <Card>
                                <CardBody>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "60%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                      }}
                                    >
                                      <div style={{ fontSize: "35px" }}>
                                        <i className="bx bxs-file-pdf me-2 font-size-25" />
                                      </div>
                                      <div>
                                        <div>
                                          <a
                                            href={
                                              process.env.REACT_APP_IMAGE +
                                              element.doc_path
                                            }
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            style={{ fontSize: "14px" }}
                                          >
                                            {element.name == null
                                              ? element.doc_path.slice(0, 13) +
                                              "..."
                                              : element.name}
                                          </a>
                                        </div>
                                        <div
                                          style={{ display: "flex", gap: "20px" }}
                                        >
                                          <div className="d-flex align-items-center">
                                            <i className="far fa-clock me-2" />
                                            {moment(element?.created_at).format(
                                              "DD MMM YYYY"
                                            )}
                                          </div>
                                          <div className="d-flex align-items-center">
                                            <i className="fas fa-file me-2"></i>
                                            {(
                                              Number(element.file_size) / 1024
                                            ).toFixed(2) +
                                              " " +
                                              "kb"}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {element.owner_id && (
                                      <TooltipVisibility
                                        visibility={"visible"}
                                        text="to owner"
                                        placement="right"
                                        direction="TooltipRight"
                                      />
                                    )}
                                    {element.tenant_id && (
                                      <TooltipVisibility
                                        visibility={"visible"}
                                        text="to tenant"
                                        placement="bottom"
                                        direction="TooltipBottom"
                                      />
                                    )}
                                    {/* <div style={{ fontSize: "25px" }}>
                                    <i className="fas fa-eye me-2"></i>
                                  </div> */}
                                  </div>
                                </CardBody>
                              </Card>
                            </Col>
                          );
                        }
                      )}
                    </Row>
                  </div>
                </CardText>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        {/* ================= documents modal ends    ===================*/}
        {msgModal && (
          <MessagesModal
            toggle={toggleMsgModal}
            msgModal={msgModal}
            inspectionId={id}
          />
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    inspection_info_data,
    inspection_info_error,
    inspection_info_loading,

    inspection_update_loading,

    inspection_add_loading,
    property_room_list_loading,

    inspection_info_details_loading,

    inspection_status,
    inspection_status_error,
    inspection_status_loading,
  } = gstate.Inspections;

  const { user_list_data, user_list_error, user_list_loading } =
    gstate.property;

  const {
    all_inspection_document,
    all_inspection_document_error,
    all_inspection_document_loading,

    store_inspection_task_job_document_loading,
  } = gstate.Document;

  const {
    inspection_message_data,
    inspection_message_data_error,
    inspection_message_data_loading,

    add_message_data_loading,

    inspection_all_activity,
    inspection_all_activity_error,
    inspection_all_activity_loading,
  } = gstate.Activity;

  return {
    inspection_info_data,
    inspection_info_error,
    inspection_info_loading,

    inspection_update_loading,

    inspection_add_loading,

    user_list_data,
    user_list_error,
    user_list_loading,

    property_room_list_loading,

    inspection_info_details_loading,

    inspection_status,
    inspection_status_error,
    inspection_status_loading,

    inspection_message_data,
    inspection_message_data_error,
    inspection_message_data_loading,

    all_inspection_document,
    all_inspection_document_error,
    all_inspection_document_loading,

    store_inspection_task_job_document_loading,

    add_message_data_loading,

    inspection_all_activity,
    inspection_all_activity_error,
    inspection_all_activity_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    InspectionInfoData,
    getUser,
    updateInspectionInfo,
    InspectionUpdateFresh,
    InspectionInfoFresh,
    InspectionListFresh,
    addInspectionFresh,
    getPropertyRoomFresh,
    InspectionDetailsInfoDataFresh,
    updatePictureIns,
    lebelInsert,
    insComplete,
    inspected,
    markAsScheduled,
    insDelete,
    InspectionStatusFresh,
    getScheduleListFresh,
    storeInspectionTaskJobDocument,
    storeInspectionTaskJobDocumentFresh,
    AllInspectionDocument,
    addComment,
    addCommentFresh,
    getMessageInspection,
    inspectionAllActivity,
    getAllDataForMsgTemplates,
  })(InspectionInfo)
);
