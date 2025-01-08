import React, { useEffect, useRef, useState } from "react";
// import "./InspectionInfo.css";
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
import DeleteModal from "components/Common/DeleteModal";
import dummyImage from "../../assets/images/house.jpg";
import "./TaskShow.css";
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
  Progress,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";

import classnames from "classnames";
import {
  getUser,
  getAllTask,
  getTaskInfo,
  editTask,
  getTaskInfoFresh,
  editTaskFresh,
  editTaskStatus,
  editTaskStatusFresh,
  taskLebelInsert,
  getTaskLabelInfo,
  getTaskLabelInfoFresh,
  updateTaskFile,
  deleteTask,
  getMessageTask,
  addComment,
  addCommentFresh,
  storeInspectionTaskJobDocument,
  AllTaskDocument,
  storeInspectionTaskJobDocumentFresh,
  getTaskAllActivity,
  deleteTaskFresh,
  getAllActiveTask,
} from "store/actions";
import { TagsInput } from "react-tag-input-component";

import Aos from "aos";
import "aos/dist/aos.css";
import Comment from "pages/Activity/Comment";
import ShowActivityData from "pages/Properties/Activity/ShowActivityData";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import Breadcrumbs from "components/Common/Breadcrumb";
import CommentData from "pages/Activity/CommentData";
import PropertyDocs from "pages/Properties/PropertyDocs";
import DragAndDrop from "common/DragAndDrop/DragAndDrop";

const TaskShow = props => {
  let date;
  const history = useHistory();
  const [show, setShow] = useState(false)

  const { id } = useParams();












  // activity modal declare
  const [activitymodal, setActivityModal] = useState(false);
  const activityToggle = () => {

    if (activitymodal == false) {
      console.log('1');
      // props.PropertyAllActivity(property_id);
      setActivityModal(prev => !prev)
    } else {
      console.log('2');

      setActivityModal(prev => !prev)
    }
  }

  // comment modal declare
  const [commentmodal, setCommentModal] = useState(false);
  const commentToggle = () => setCommentModal(!commentmodal);














  const [documentModal, setDocumentModal] = useState(false);
  const documentToggle = () => setDocumentModal(prev => !prev);
  const inputFile = useRef(null);
  const [file, setFile] = useState(dummyImage);
  const [level, setLevel] = useState(true);
  const [init, setInit] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState([]);

  const [completeStatusDate, setCompleteStatusDate] = useState("");
  const [showDropZone, setShowDropZone] = useState(false);

  const [managerGroup, setManagerGroup] = useState({});
  const [managerOptionGroup, setManagerOptionGroup] = useState([]);
  const [forManagerContact, setForManagerContact] = useState(true);

  const [state, setState] = useState({
    activeTab: "1",
  });

  const [editState, setEditState] = useState({});
  const [actionState, setActionState] = useState({ btnsecondary1: false });
  const [deleteState, setDeleteState] = useState(false);

  const [msgShow, setMsgShow] = useState(false);
  const [message, setMessage] = useState("");

  const msgToggle = () => setMsgShow(prev => !prev);

  const msgHandlerSubmit = e => {
    e.preventDefault();
    if (message.length === 0) {
      return;
    } else {
      props.addComment(message, taskdata.property_id, null, id);
      msgToggle();
    }
  };

  const dateHandler = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    handleState(dateStr, "due_by");
  };

  useEffect(() => {

    if (props.store_inspection_task_job_document_loading === "Success") {
      toastr.success("Uploaded successfully");
      props.storeInspectionTaskJobDocumentFresh();
      props.AllTaskDocument(id);
      setShow(false)
    }
    if (props.edit_task_loading === "Success") {
      toastr.success("Task updated successfully");
      props.getTaskInfoFresh();
      props.editTaskFresh();
      props.getTaskInfo(id);
    }
    // if (props.user_list_loading == false) {
    //   props.getUser();
    // }
    // if (props.get_task_info_loading === false) {
    //   props.getTaskInfo(id);
    //   props.AllTaskDocument(id);
    // }
    // if (props.get_task_label_info_loading === false) {
    //   props.getTaskLabelInfo(id);
    // }
    if (props.get_task_info_loading == "Success") {
      setEditState({
        property: props.get_task_info.data.data.property_id,
        contact: props.get_task_info.data.data.contact_id,
        manager: props.get_task_info.data.data.manager_id,
        due_by: props.get_task_info.data.data.due_by,
        summary: props.get_task_info.data.data.summary,
        description: props.get_task_info.data.data.description,
      });
      if (props.get_task_info.data.data.manager_id) {
        let manager_name = props.get_task_info.data.data.manager_first_name
          ? props.get_task_info.data.data.manager_first_name
          : null + " " + props.get_task_info.data.data.manager_last_name
            ? props.get_task_info.data.data.manager_last_name
            : null;
        setManagerGroup({
          label: manager_name,
          value: props.get_task_info.data.data.manager_id,
        });
      }
      date = new Date(props.get_task_info.data.data.created_at);
      setCompleteStatusDate(
        new Date(props.get_task_info.data.data.complete_date)
      );
    }
    let taskD = [];
    if (props.get_task_label_info) {
      let labelD = props.get_task_label_info?.data?.taskLabel;
      labelD.map(async (item, key) => taskD.push(item.label));
      setSelectedLevel(taskD);
    }
    if (props.edit_task_status_loading === "Success") {
      toastr.success("Task updated successfully");
      props.editTaskStatusFresh();
      setInit(true);
    }
    // if (props.task_message_data_loading === false) {
    //   props.getMessageTask(id);
    // }
  }, [
    props.edit_task_loading,
    props.get_task_info_loading,
    props.store_inspection_task_job_document_loading,
    props.edit_task_status_loading,
    props.get_task_label_info
  ]);

  if (init) {
    props.getTaskAllActivity(id);
    props.getTaskInfo(id);
    props.getTaskLabelInfo(id);
    props.getMessageTask(id);
    props.getUser();

    setInit(false);
  }


  const msgData = props.task_message_data?.data?.data;

  var authUserData = JSON.parse(localStorage.getItem("authUser"));
  const managerNameData = authUserData?.user?.first_name;

  let taskdata, activityData;
  if (props.get_task_info) {
    taskdata = props.get_task_info.data.data;
    activityData = props.get_task_info.data.data.taskdoc;
  }

  console.log(props.get_task_info);
  console.log(taskdata);

  let userData = [];
  if (props.user_list_data) {
    userData = props.user_list_data?.data?.map((item, key) => ({
      label: item.first_name + " " + item.last_name,
      value: item.id,
    }));
  }
  if (userData?.length > 0 && forManagerContact) {
    setForManagerContact(false);
    setManagerOptionGroup(userData);
  }
  const handleChange = async e => {
    setShow(true)
    props.storeInspectionTaskJobDocument(
      e.target.files,
      taskdata.property_id,
      id
    );
  };

  // const formSubmitHandler = () => {
  //     props.updateInspectionInfo(id, editState, duration);
  //     props.InspectionInfoFresh();
  //     props.InspectionListFresh();
  // };

  let docData = undefined;
  const docFiles = () => {
    if (taskdata != undefined) {
      if (taskdata) {
        if (typeof taskdata.taskdoc !== "undefined") {
          docData = taskdata.taskdoc.map((item, key) => (
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
                {/* <p>{taskdata && inspectionInfoData.reference}</p> */}
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

  let labelData = [];
  if (props.get_task_label_info) {
    let labelData = props.get_task_label_info.data.taskLabel;
  }

  const handleMulti3 = e => {
    //setSelectedState(e);
    setSelectedLevel(e);
    props.taskLebelInsert(id, e);
    props.getTaskLabelInfoFresh();
  };

  const listEnable = () => {
    setLevel(false);
  };
  const disable = () => {
    let taskLvl = [];
    if (labelData.length > 0) {
      labelData.map(async (item, key) => taskLvl.push(item.labels));
      setSelectedLevel(taskLvl);
    }
    setLevel(true);
    props.getTaskLabelInfoFresh();
  };

  const formSubmitHandler = () => {
    props.editTask(editState, taskdata.id);
    props.getAllTask();
  };

  const handleState = (value, name = "", label = "") => {
    setEditState({ ...editState, [name]: value });
    if (name === "manager") {
      setManagerGroup({ label: label, value: value });
    }
  };

  const onClickDelete = () => {
    setDeleteState(true);
  };
  const handleDeleteProject = () => {
    props.deleteTask(id);
    setDeleteState(false);
  };

  if (props.task_delete_loading === "Success") {
    toastr.success("Task deleted successfully");
    props.getAllActiveTask();

    history.push("/tasks");
  }
  if (props.task_delete_loading === "Failed") {
    toastr.error("Something went wrong");
    props.deleteTaskFresh();
  }

  const toggle = tab => {
    if (state.activeTab !== tab) {
      setState({
        ...state,
        activeTab: tab,
      });
      if (tab == 2) {
        props.AllTaskDocument(id);

        documentToggle()
      }
    }

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
    setShow(true)
    props.storeInspectionTaskJobDocument(
      e.dataTransfer.files,
      taskdata.property_id,
      id
    );
  };

  var complete_date = new Date();

  var year = complete_date.toLocaleString("default", { year: "numeric" });
  var month = complete_date.toLocaleString("default", { month: "2-digit" });
  var day = complete_date.toLocaleString("default", { day: "2-digit" });

  var complete_date = year + "-" + month + "-" + day;

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteState}
        onDeleteClick={handleDeleteProject}
        onCloseClick={() => setDeleteState(false)}
      />
      <div
        className="page-content"
        onDragOver={drag}
        onDragLeave={dragend}
        onDrop={dropFile}
      >
        {/* <Breadcrumbs title="Tasks info" breadcrumbItem="Tasks" /> */}
        <h4 className="ms-2 text-primary">Tasks info</h4>

        <Row>
          <Col lg={2}>

            <Card style={{ borderRadius: "15px" }}>
              <CardBody style={{ padding: "20px" }}>
                <h5 className="text-primary py-1">
                  {" "}
                  Tasks -{" "}
                  {editState.summary && editState.summary.slice(0, 40)}
                </h5>
                <div className="borderBottom mb-4" />

                <Row>
                  <Col md={12}>
                    {taskdata?.status === "Closed" ? (
                      <div className="w-100">
                        <Alert color="info">
                          <Row className="d-flex justify-content-between flex-column gap-2">
                            <Col className="p-3">
                              {" "}
                              Completed <i className="fas fa-check"></i>&nbsp;
                              on{" "}
                              {completeStatusDate
                                ? completeStatusDate.toDateString()
                                : null}
                            </Col>
                            <Col>
                              <Button
                                type="button"
                                className="btn w-100 m-1 d-flex justify-content-between"
                                color="info"
                                onClick={() => {
                                  props.editTaskStatus(
                                    "pending",
                                    complete_date,
                                    id
                                  );
                                  props.getTaskInfoFresh();
                                  props.editTaskFresh();
                                  props.getAllTask();
                                }}
                              >

                                Reopen  <i className="fas fa-undo-alt me-1"></i>
                              </Button>
                            </Col>
                          </Row>
                        </Alert>
                      </div>
                    ) : null}
                    <Col md={12}>
                      {/* <div className="d-flex gap-2 flex-wrap w-100"> */}
                      {taskdata?.status === "pending" ||
                        taskdata?.status === "due" ||
                        taskdata?.status === "due_later" ? (
                        <Button
                          type="button"
                          className="btn w-100 mb-2 d-flex justify-content-between"
                          color="info"
                          onClick={() => {
                            props.editTaskStatus(
                              "Closed",
                              complete_date,
                              id
                            );
                            props.getTaskInfoFresh();
                            props.editTaskFresh();
                            props.getAllTask();
                          }}
                        >
                          Complete <i className="fas fa-check me-1"></i>
                        </Button>
                      ) : null}

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
                          className="btn btn-labelColor w-100 d-flex justify-content-between"
                        >
                          Action{" "}
                          {actionState.btnsecondary1 ? (
                            <i className="fas fa-angle-down"></i>
                          ) : (
                            <i className="fas fa-angle-right"></i>
                          )}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={onClickDelete}>
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      {/* </div> */}
                    </Col>
                  </Col>
                  <Col md={12} className="mt-2">
                    {taskdata?.due_by &&
                      <div className={`d-flex justify-content-center rounded align-items-center p-3 ${taskdata?.due_status == 'Overdue' ? 'bg-danger' : taskdata?.due_status == 'Due today' ? 'bg-warning' : 'bg-info'}`}>
                        <div className="me-4 text-white d-flex justify-content-center align-items-center">
                          <i className="fas fa-calendar me-1 font-size-24" /> {taskdata?.days_difference ? `${taskdata?.days_difference} days` : ''}
                        </div>
                        <div className="d-flex flex-column justify-content-center text-white">
                          {moment(taskdata?.due_by).format('DD MMM')}
                          <span>{taskdata?.due_status}</span>
                        </div>
                      </div>}
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card style={{ borderRadius: "15px" }}>
              <CardBody style={{ padding: "20px" }}>
                <div style={{ textAlign: "center" }}>
                  <Row className="mt-3">
                    <Col md={12}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          justifyContent: "top",
                          alignItems: "center",
                          height: '150px'
                          //justifyContent: "space-between"
                        }}
                      >
                        <Button
                          className="btn w-100"
                          //color={activityModal ? "modalButtonColor" : "labelColor"}
                          color="labelColor"

                          onClick={activityToggle}
                          style={{ display: "flex", justifyContent: "space-between", borderRadius: "5px" }}
                        >

                          Activity
                          <i className="fas fa-list font-size-12 align-middle me-2"></i>{" "}
                        </Button>

                        <Button
                          className="btn w-100"
                          //color={documentModal ? "modalButtonColor" : "labelColor"}
                          color="labelColor"
                          onClick={documentToggle}


                          // onClick={() => {
                          //   toggle("2");
                          // }}
                          style={{ display: "flex", justifyContent: "space-between", borderRadius: "5px" }}
                        >

                          Documents
                          <i className="fas fa-list font-size-12 align-middle me-2"></i>{" "}
                        </Button>
                      </div>

                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>

          </Col>
          <Col md={12} lg={10} xs={12} className="p-0">
            <Card data-aos="fade-right" data-aos-once={true} className="custom_card_border_design me-2">
              <CardBody>
                <Row>
                  <Col md={9}>
                    <h4 className="text-primary">Tasks</h4>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <input
                      type="file"
                      onChange={handleChange}
                      ref={inputFile}
                      style={{ display: "none" }}
                      multiple
                    />
                    <div className="me-1">
                      <Button color="primary">
                        <i className="fas fa-cloud-upload-alt font-size-14 text-white"></i>
                      </Button>
                    </div>
                    <Button
                      // className="btn m-1"
                      onClick={() => inputFile.current.click()}
                    >
                      {" "}
                      <i className="fas fa-paperclip d-block font-size-20"></i>
                    </Button>
                  </Col>
                </Row>
                <div className="borderBottom mt-2" />
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
                      <h4>Add document to Task</h4>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {!showDropZone ? (
                  <Row>
                    <Col md={6}>
                      <Row className="my-3">
                        <Col className="text-textTitleColor" md={4}>
                          Property
                        </Col>
                        <Col md={8}>
                          <Link
                            to={`/propertyInfo/${taskdata ? taskdata?.property_id : null
                              }`}
                          >
                            <span className="underlined">
                              {taskdata ? taskdata?.reference : null}
                            </span>
                          </Link>
                        </Col>
                        <div
                          className="borderBottom mt-3"
                          style={{ width: "96%" }}
                        />
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Row className="my-3">
                        <Col className="text-primary" md={4}>
                          Label
                        </Col>
                        <Col className="" md={8}>
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
                                listEnable();
                              }}
                            >
                              <i className="fas fa-pencil-alt text-primary"></i>
                            </a>
                          ) : (
                            <>
                              <TagsInput
                                value={selectedLevel}
                                onChange={e => {
                                  handleMulti3(e);
                                  // props.getAllTask();
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
                        <div
                          className="borderBottom mt-3"
                          style={{ width: "96%" }}
                        />
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Row className="mt-3">
                        <Col className="text-textTitleColor" md={4}>
                          Owner
                        </Col>
                        <Col md={8}>
                          <Link to={`/contactsInfo/owner/${taskdata?.contact_id}`}>


                            {taskdata &&
                              `${taskdata?.owner_first_name || ''} ${taskdata?.owner_last_name || ''}`
                            }
                          </Link>
                        </Col>
                        <div
                          className="borderBottom mt-4"
                          style={{ width: "96%" }}
                        />
                      </Row>
                    </Col>



                    <Col md={6} className="mt-2">
                      <Row>

                        <Col md={12}>
                          <div className="form-group-new" style={{ marginBottom: "-25px" }}>
                            <Flatpickr
                              className="form-control d-block"
                              placeholder="Pick a Date..."
                              value={editState.due_by}
                              // onChange={() => dateHandler()}
                              options={{
                                altInput: true,
                                format: "d/m/Y",
                                altFormat: "d/m/Y",
                                onChange: dateHandler,
                              }}
                            />
                            <label htmlFor="usr">Due on</label>
                          </div>
                        </Col>
                        <div
                          className="borderBottom mt-3"
                          style={{ width: "96%" }}
                        />
                      </Row>
                    </Col>

                    <Col md={6} className="mt-2">
                      <Row>
                        <Col className="text-primary" md={4}>
                          Tenant
                        </Col>
                        <Col md={8}>
                          <Link
                            to={
                              taskdata && taskdata?.tenant
                                ? `/contactsInfo/${taskdata?.tenant?.contact_id}`
                                : ""
                            }
                          >
                            {taskdata
                              ? taskdata?.tenant?.full_name
                              : null}
                          </Link>
                        </Col>
                        <div
                          className="borderBottom mt-4"
                          style={{ width: "96%" }}
                        />
                      </Row>
                    </Col>


                    <Col md={6} className="mt-3">
                      <Row>
                        <Col md={12}>
                          <div className="form-group-new" style={{ marginBottom: "-25px" }}>
                            <Select
                              value={managerGroup}
                              options={managerOptionGroup}
                              onChange={e =>
                                handleState(e.value, "manager", e.label)
                              }
                              classNamePrefix="select2-selection"
                            />
                            <label htmlFor="usr">Manager</label>
                          </div>
                        </Col>
                        <div
                          className="borderBottom mt-3"
                          style={{ width: "96%" }}
                        />

                      </Row>
                    </Col>


                  </Row>
                ) : (
                  ""
                )}

              </CardBody>
            </Card>

            <Card data-aos="fade-right" data-aos-once={true} className="custom_card_border_design p-3">

              <h4 className="text-primary">Description</h4>
              <div className="borderBottom mt-3" />
              <div className="w-100">
                {show &&
                  <Progress
                    value={90}
                    color="info"
                    style={{ width: "90%" }}
                    animated
                  ></Progress>
                }
              </div>

              <Col className="my-3">
                <div className="form-group-new" style={{ marginBottom: "-25px" }}>
                  <Input
                    name="summary"
                    type="text"
                    value={editState.summary}
                    onChange={e =>
                      handleState(e.target.value, "summary")
                    }
                  />
                  <label htmlFor="usr">Summary</label>
                </div>
              </Col>

              <FormGroup row>
                <Label for="exampleSelect " className="form-group-new-desc-label" style={{ marginBottom: "-10px", zIndex: "10", width: "90px", padding: "0px 3px 0px 3px" }}>
                  Description
                </Label>

                <Col md={12}>
                  <div className="form-group-new-desc" >
                    <Input
                      type="textarea"
                      name="description"
                      rows="3"
                      value={editState.description}
                      onChange={e =>
                        handleState(e.target.value, "description")
                      }
                    />
                  </div>
                </Col>
              </FormGroup>

            </Card>
            <div className="d-flex justify-content-end my-3 px-3">
              <Button
                color="buttonColor"
                onClick={formSubmitHandler}
                className="d-flex align-items-center"
              >
                <i
                  className="bx bx-save ms-1"
                  style={{ fontSize: "16px" }}
                ></i>{" "}
                Save
              </Button>
            </div>
          </Col>


          {/* <Col md={10}>
            <Card data-aos="fade-right" data-aos-once={true}>
              <CardBody>
                <div className="">
                  <Nav className="nav-tabs-custom justify-content-evenly">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: state.activeTab === "1",
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
                          active: state.activeTab === "2",
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



                    {state.activeTab === "1" && (
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
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className="d-flex align-items-end"
                          >
                            <Link to={`/all-task-activity/${id}`}>
                              <span className="font-size-14 text-dark">
                                All
                              </span>
                            </Link>
                          </NavLink>
                        </NavItem>
                      </div>
                    )}

                    {state.activeTab === "2" && (
                      <div className="ms-5 ps-5">
                        <NavItem>
                          <NavLink style={{ cursor: "pointer" }}>
                            <Link to={`/all-task-document/${id}`}>
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
                    activeTab={state.activeTab}
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
                              task_id={id}
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

                            {props.task_all_activity?.data?.data?.map(
                              (data, i) => (
                                <ShowActivityData key={i} data={data} />
                              )
                            )}
                          </div>

                          <p
                            className="fw-bold ps-2 pt-5 font-size-15"
                            style={{
                              borderBottom: "1.2px dotted #c9c7c7",
                            }}
                          >
                            Comments
                          </p>

                          <div
                            style={{
                              padding: "10px",
                              maxHeight: "600px",
                              overflowY: "auto",
                              overflowX: "hidden",
                            }}
                          >
                            <CommentData data={msgData} />
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">


                    </TabPane>
                  </TabContent>
                </div>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
      </div>

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
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "760px",
              marginTop: "10px",
            }}
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
                {/* <NavItem> */}
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
                  <Link to={`/all-task-activity/${id}`}>
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
                <Comment
                  msgToggle={msgToggle}
                  // msgHandlerSubmit={msgHandlerSubmit}
                  prop_Id={id}
                  message={message}
                  setMessage={setMessage}
                />
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
                {props.task_all_activity?.data?.data?.map(
                  (data, i) => (
                    <ShowActivityData key={i} data={data} />
                  )
                )}
              </div>
              {props.task_all_activity?.data?.length > 0 && (
                <div className="w-100 mt-2 d-flex justify-content-end">
                  <Link to={`/all-task-activity/${id}`}>
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
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "720px",
              marginTop: "10px",
            }}
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
                  style={{ cursor: "pointer", height: "50px", width: "50px" }}
                  onClick={msgToggle}
                >
                  <div
                    className="badge badge-soft-secondary d-flex align-items-start p-2"
                    style={{ border: "1px solid white" }}
                  >
                    <i className="bx bxs-comment-detail me-1 font-size-16 text-white" />
                    <i className="fas fa-angle-down font-size-16 text-white" />
                  </div>
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    height: "50px",
                    width: "50px",
                    display: "flex",
                  }}
                >
                  <Link to={`/all-property-activity/${id}`}>
                    <div
                      className="badge badge-soft-secondary d-flex align-items-start px-3 py-2 font-size-16 text-white"
                      style={{ border: "1px solid white" }}
                    >
                      All
                    </div>
                  </Link>
                  <div
                    onClick={commentToggle}
                    style={{ cursor: "pointer", marginLeft: "15px" }}
                  >
                    <i className="mdi mdi-close-thick font-size-20 text-white"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="12">
              {/* {msgShow && ( */}
              <Comment
                msgToggle={commentToggle}
                msgHandlerSubmit={msgHandlerSubmit}
                setMessage={setMessage}
                task_id={id}
              />
              {/* )} */}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      {/* ================= comment modal end   ===================*/}













      {documentModal &&
        <PropertyDocs
          documentModal={documentModal} documentToggle={documentToggle} component='Task'
          data={props.all_task_document?.data?.data} id={id}
        />}
    </React.Fragment>
  );
};

Aos.init({
  once: true,
});

const mapStateToProps = gstate => {
  const { user_list_data, user_list_error, user_list_loading } =
    gstate.property;

  const {
    get_task_info,
    get_task_info_error,
    get_task_info_loading,

    edit_task,
    edit_task_loading,

    get_task_label_info,
    get_task_label_info_error,
    get_task_label_info_loading,

    task_delete_loading,
    task_all_activity,

    edit_task_status_loading
  } = gstate.tasks;

  const {
    task_message_data_loading,
    task_message_data,
    add_message_data_loading,
  } = gstate.Activity;
  const {
    all_task_document,
    all_task_document_error,
    all_task_document_loading,

    store_inspection_task_job_document_loading,
  } = gstate.Document;

  return {
    user_list_data,
    user_list_error,
    user_list_loading,

    get_task_info,
    get_task_info_error,
    get_task_info_loading,

    edit_task,
    edit_task_loading,

    get_task_label_info,
    get_task_label_info_error,
    get_task_label_info_loading,

    task_delete_loading,

    task_message_data_loading,
    task_message_data,

    store_inspection_task_job_document_loading,

    all_task_document,
    all_task_document_error,
    all_task_document_loading,

    add_message_data_loading,
    task_all_activity,

    edit_task_status_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getUser,
    getTaskInfo,
    editTask,
    getTaskInfoFresh,
    editTaskFresh,
    editTaskStatus,
    editTaskStatusFresh,
    taskLebelInsert,
    getTaskLabelInfo,
    getTaskLabelInfoFresh,
    updateTaskFile,
    deleteTask,
    getAllTask,
    getMessageTask,
    addComment,
    addCommentFresh,
    storeInspectionTaskJobDocument,
    AllTaskDocument,
    storeInspectionTaskJobDocumentFresh,
    getTaskAllActivity,
    deleteTaskFresh,
    getAllActiveTask,
  })(TaskShow)
);
