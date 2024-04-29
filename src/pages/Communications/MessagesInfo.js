import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Button,
  Form,
  FormGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import classnames from "classnames";
import { withRouter, useParams, useHistory } from "react-router-dom";
import {
  getUser,
  propertyList,
  contactList,
  mailDetails,
  mailDetailsFresh,
  mailDetailStatusAssign,
  mailDetailStatusAssignFresh,
  JobsList,
  getInspectionList,
  getAllActiveTask,
  mailDetailRegarding,
  mailDetailRegardingFresh,
  sendReply,
  sendReplyFresh,
  getMessageMail,
  storeAttachment,
  storeAttachmentFresh,
  spamMove,
  spamMoveFresh,
} from "store/actions";
import MailLogo from "../../assets/images/image.png";
import parse from "html-react-parser";
import { connect } from "react-redux";
import moment from "moment";
import toastr from "toastr";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import Comment from "pages/Activity/Comment";

import Breadcrumbs from "components/Common/Breadcrumb";
import ReplyCard from "./ReplyCard";
import FlushItem from "./FlushItem";
import FlushItemReply from "./FlushItemReply";
import Select from "react-select";
import CommentData from "pages/Activity/CommentData";
import Loder from "components/Loder/Loder";
import { floor } from "lodash";

const MessagesInfo = props => {
  const history = useHistory();
  const { id } = useParams();
  const [state, setState] = useState({
    activeTab: "1",
    optionManager: [],
    optionStatus: [
      { label: "Unread", value: "Unread" },
      { label: "Pending", value: "Pending" },
      { label: "Open", value: "Open" },
      { label: "Complete", value: "Complete" },
    ],
    mailReplyModal: false,
    id: id,
    to: null,
    subject: null,
    body: null,
  });
  const [state2, setState2] = useState({});
  const [msgShow, setMsgShow] = useState(false);
  const [message, setMessage] = useState("");

  const [init, setInit] = useState(true);
  const [frmShow, setFrmShow] = useState(false);
  const frmToggle = () => setFrmShow(prev => !prev);
  const frmSubmit = () => {
    console.log("form Submit");
    props.mailDetailRegarding(id, state2);
    setLoader(prev => !prev);
  };
  const [actionState, setActionState] = useState({ btnsecondary1: false });
  const inputFileProp = useRef(null);
  const [attached, setAttached] = useState([]);
  const [loader, setLoader] = useState(false);
  const authUser = JSON.parse(localStorage.getItem("authUser"));

  const toggleMsgModal = () => {
    setMsgModal(prev => !prev);
  };

  useEffect(() => {
    let optionManager;
    let optionProperty;
    let optionContacts;
    let optionJobs;
    let optionInspections;
    let optionTasks;
    console.log(props.mail_regarding_loading);
    if (props.user_list_loading == "Success") {
      optionManager = props.user_list_data?.data.map(item => ({
        label: item.full_name,
        value: item.id,
      }));
      setState(prev => ({ ...prev, optionManager: optionManager }));
    }
    if (props.property_list_loading == "Success") {
      optionProperty = props.property_list_data?.data.map(item => ({
        label: item.reference,
        value: item.id,
      }));
      setState2(prev => ({ ...prev, optionProperty: optionProperty }));
    }
    if (props.contacts_list_loading == "Success") {
      optionContacts = props.contacts_list_data?.data?.map((item, key) => ({
        label: item.reference,
        value: item.id,
      }));
      setState2(prev => ({ ...prev, optionContacts: optionContacts }));
    }
    if (props.jobs_list_loading == "Success") {
      optionJobs = props.jobs_list_data?.data.map(item => ({
        label: item.summary,
        value: item.id,
      }));
      setState2(prev => ({ ...prev, optionJobs: optionJobs }));
    }
    if (props.inspection_list_loading == "Success") {
      optionInspections = props.inspection_list_data?.data?.data.map(item => ({
        label: item.summery,
        value: item.id,
      }));
      setState2(prev => ({ ...prev, optionInspections: optionInspections }));
    }
    if (props.all_active_task_loading == "Success") {
      console.log(props.all_active_task);
      optionTasks = props.all_active_task?.data?.data.map(item => ({
        label: item.summary,
        value: item.id,
      }));
      setState2(prev => ({ ...prev, optionTasks: optionTasks }));
    }
    if (props.mail_details_loading == "Success") {
      console.log(props.mail_details_data.data?.task_id);
      let status = {
        label: props.mail_details_data?.data?.details_status,
        value: props.mail_details_data?.data?.details_status,
      };
      let manager = {
        label:
          props.mail_details_data?.data?.assign_name == " "
            ? null
            : props.mail_details_data?.data?.assign_name,
        value: props.mail_details_data?.data?.assign_id,
      };
      let property = {
        label: props.mail_details_data?.data?.property_id
          ? props.mail_details_data?.data?.property?.reference
          : null,
        value: props.mail_details_data?.data?.property_id,
      };
      let contact = {
        label: props.mail_details_data?.data?.contact_id
          ? props.mail_details_data?.data?.contacts?.reference
          : null,
        value: props.mail_details_data?.data?.contact_id,
      };

      let job = {
        label: props.mail_details_data?.data?.job_id
          ? props.mail_details_data?.data?.job?.summary
          : null,
        value: props.mail_details_data?.data?.job_id,
      };
      let inspection = {
        label: props.mail_details_data?.data?.inspection_id
          ? props.mail_details_data?.data?.inspection?.summery
          : null,
        value: props.mail_details_data?.data?.inspection_id,
      };
      let task = {
        label: props.mail_details_data?.data?.task_id
          ? props.mail_details_data?.data?.task?.summary
          : null,
        value: props.mail_details_data?.data?.task_id,
      };
      setState({
        ...state,
        selectedStatus:
          props.mail_details_data?.data?.details_status != null ? status : "",
        selectedManager:
          props.mail_details_data?.data?.assign_id != null ? manager : "",
        to:
          authUser.user.email == props.mail_details_data?.data?.from
            ? props.mail_details_data?.data?.to
            : props.mail_details_data?.data?.from,
        from: authUser.user.email,
        subject: props.mail_details_data?.data?.subject,
      });
      setState2({
        ...state2,
        selectedProperty:
          props.mail_details_data?.data?.property_id != null ? property : "",
        selectedContacts:
          props.mail_details_data?.data?.contact_id != null ? contact : "",
        selectedJobs: props.mail_details_data?.data?.job_id != null ? job : "",
        selectedInspections:
          props.mail_details_data?.data?.inspection_id != null
            ? inspection
            : "",
        selectedTasks:
          props.mail_details_data?.data?.task_id != null ? task : "",
      });
      props.mailDetailsFresh();
    }
    if (props.mail_status_assign_loading == "Success") {
      toastr.success("Mail Updated");
      props.mailDetails(id);
      props.mailDetailStatusAssignFresh();
      setLoader(prev => !prev);
    }
    if (props.mail_regarding_loading == "Success") {
      toastr.success("Mail regarding Updated");
      props.mailDetails(id);
      props.mailDetailRegardingFresh();
      setLoader(prev => !prev);
      setFrmShow(prev => !prev);
    }
    if (props.reply_sand_loading == "Success") {
      toastr.success("Mail Replied");
      props.mailDetailsFresh();
      props.sendReplyFresh();
      props.mailDetails(id);
      setLoader(prev => !prev);
    }
    if (props.mail_attachment_loading === "Success") {
      let attach = attached;
      props.mail_attachment_data?.data?.data?.map(item => {
        attach.push(item);
      });
      setAttached(attach);
      setLoader(false);
      props.storeAttachmentFresh();
    }
    if (props.move_to_spam_loading == "Success") {
      toastr.success("Mail move to spam");
      props.spamMoveFresh();
      props.mailDetails(id);
      setLoader(prev => !prev);
    }
  }, [
    props.user_list_loading,
    props.property_list_loading,
    props.contacts_list_loading,
    props.mail_details_loading,
    props.mail_status_assign_loading,
    props.jobs_list_loading,
    props.inspection_list_loading,
    props.all_active_task_loading,
    props.mail_regarding_loading,
    props.reply_sand_loading,
    props.mail_attachment_loading,
    attached,
    props.move_to_spam_loading,
  ]);

  if (init) {
    props.mailDetails(id);
    props.propertyList();
    props.contactList();
    props.getUser();
    props.getMessageMail(id);
    props.JobsList("Active", "1", "10", null, "id", "desc");
    props.getInspectionList("1", "10", null, "id", "desc");
    props.getAllActiveTask("1", "10", null, "id", "desc");
    setInit(false);
  }

  const msgData = props.mail_message_data?.data?.data;

  var authUserData = JSON.parse(localStorage.getItem("authUser"));
  const managerNameData = authUserData?.user?.first_name;

  const toggle = tab => {
    if (state.activeTab !== tab) {
      setState({
        ...state,
        activeTab: tab,
      });
    }
  };
  const msgToggle = () => setMsgShow(prev => !prev);
  console.log(state);

  const handleSelectGroupManager = e => {
    setState({ ...state, selectedManager: e });
    props.mailDetailStatusAssign(id, null, e.value);
    setLoader(prev => !prev);
  };

  const handleSelectStatus = e => {
    setState({ ...state, selectedStatus: e });
    props.mailDetailStatusAssign(id, e.value, null);
    setLoader(prev => !prev);
  };

  const btnStatusHandle = status => {
    let objStatus = { label: status, value: status };
    setState({ ...state, selectedStatus: objStatus });
    props.mailDetailStatusAssign(id, objStatus.value, null);
    setLoader(prev => !prev);
  };

  const handleSelectProperty = e => {
    setState2({ ...state2, selectedProperty: e });
  };

  const handleSelectContacts = e => {
    setState2({ ...state2, selectedContacts: e });
  };

  const handleSelectJobs = e => {
    setState2({ ...state2, selectedJobs: e });
  };

  const handleSelectInspections = e => {
    setState2({ ...state2, selectedInspections: e });
  };

  const handleSelectTasks = e => {
    setState2({ ...state2, selectedTasks: e });
  };

  const mailReplyToggle = () => {
    setState(prevState => ({
      ...prevState,
      mailReplyModal: !prevState.mailReplyModal,
    }));
  };

  const handleReplyMail = e => {
    e.preventDefault();

    if (state.to == null) {
      toastr.warning("Please fill up all fields");
    } else if (state.id != null) {
      props.sendReply(state, attached);
      setState({ ...state, mailReplyModal: false });
      setLoader(prev => !prev);
      setAttached([]);
    }
  };

  const handleAttachment = e => {
    e.preventDefault();
    props.storeAttachment(e.target.files);
    setLoader(true);
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
    <div className="page-content">
      {loader && <Loder status={loader} />}
      {/* <Breadcrumbs title="Message Details" breadcrumbItem="Inbox" /> */}
      <h4 className="ms-2 text-primary">Message Details</h4>
      <Row>
        <Col lg={2} style={{ display: "flex", flexDirection: "column" }}>
          <Card style={{ borderRadius: "15px" }}>
            <CardBody>
              <div style={{ textAlign: "center" }}>
                <h5 className="mb-2 text-primary">
                  {props.mail_details_data?.data?.subject}{" "}
                  {`[${props.mail_details_data?.data?.status}]`}
                </h5>

                <div
                  className="w-100"
                  style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                />
                <Row className="mt-3">
                  <Col
                    md={12}
                    className="d-flex align-items-center justify-content-center flex-column"
                  >
                    <Button
                      className="btn w-100"
                      color="info"
                      onClick={mailReplyToggle}
                    >
                      <i className="fas fa-reply me-1"></i>
                      Reply
                    </Button>
                    {state.selectedStatus?.value == "Complete" ? (
                      <Button
                        className="btn w-100 m-1"
                        color="labelColor"
                        onClick={() => {
                          btnStatusHandle("Open");
                        }}
                      >
                        Open
                      </Button>
                    ) : (
                      <Button
                        className="btn w-100 m-1"
                        color="labelColor"
                        onClick={() => {
                          btnStatusHandle("Complete");
                        }}
                      >
                        <i className="fas fa-check me-1"></i>
                        Complete
                      </Button>
                    )}
                    <div className="w-100">
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
                          className="btn btn-labelColor w-100 me-1"
                        >
                          Action <i className="mdi mdi-chevron-down"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={msgToggle}>
                            {" "}
                            Add Comment{" "}
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              props.spamMove(id);
                              setLoader(true);
                            }}
                          >
                            {" "}
                            Move to Spam{" "}
                          </DropdownItem>
                          <DropdownItem disabled={true}> report </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={12} lg={10} xs={12} className="p-0">
          <Card className="custom_card_border_design me-2">
            <Row className="d-flex justify-content-center p-3">
              <Col md={8}>
                <div className="mt-4">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <FlushItem
                      mailData={props.mail_details_data}
                      open={
                        props.mail_details_data?.data?.reply?.length == 0
                          ? true
                          : false
                      }
                    />
                    {props.mail_details_data?.data?.reply?.map((item, key) => {
                      let leng = props.mail_details_data.data.reply.length - 1;
                      if (leng == key) {
                        return (
                          <FlushItemReply mailData={item} open={true} key={key} />
                        );
                      } else {
                        return (
                          <FlushItemReply mailData={item} open={false} key={key} />
                        );
                      }
                    })}
                  </div>
                </div>
                <div className="w-100 mb-2 d-flex justify-content-between align-items-center pt-3">
                  <CommentData data={msgData} />
                </div>
                {msgShow && (
                  <div className="w-100 mb-2 d-flex justify-content-between align-items-center pt-3">
                    <Comment
                      msgToggle={msgToggle}
                      // msgHandlerSubmit={msgHandlerSubmit}
                      // prop_Id={id}
                      mail_id={id}
                      message={message}
                      setMessage={setMessage}
                    />
                  </div>
                )}
                <div className="w-100 mb-2 d-flex justify-content-between align-items-center pt-3">
                  <div>
                    {!msgShow && (
                      <Button
                        className="btn w-md m-1"
                        color="buttonColor"
                        onClick={msgToggle}
                      >
                        <i className="fas fa-comment-dots me-1"></i>
                        Comment
                      </Button>
                    )}
                  </div>
                  <div>
                    <Button
                      className="btn w-md m-1 pt-2"
                      color="buttonColor"
                      onClick={mailReplyToggle}
                    >
                      <i className="fas fa-reply me-1"></i>
                      Reply
                    </Button>
                  </div>
                </div>
              </Col>
              {/*new  */}

              <Col md={4}>
                <div className="mb-3 w-75">
                  <Row>
                    <Col md={12}>
                      <Label for="status" className="form-label">
                        Status
                      </Label>
                    </Col>

                    <Col md={12}>
                      <div>
                        <Select
                          value={state.selectedStatus}
                          onChange={handleSelectStatus}
                          options={state.optionStatus}
                          classNamePrefix="select2-selection"
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="mb-3 w-75">
                  <Row>
                    <Col md={12}>
                      <Label for="manager" className="form-label">
                        Assigned
                      </Label>
                    </Col>

                    <Col md={12}>
                      <div>
                        <Select
                          value={state.selectedManager}
                          onChange={handleSelectGroupManager}
                          options={state.optionManager}
                          classNamePrefix="select2-selection"
                        />
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="w-100 mb-2 d-flex justify-content-between align-items-center">
                  <Label for="regarding" className="form-label">
                    Regarding
                  </Label>

                  <button
                    type="button"
                    className="btn btn-buttonColor"
                    onClick={frmToggle}
                  >
                    <i className="mdi mdi-pencil d-block font-size-16"></i>
                  </button>
                </div>
                {frmShow ? (
                  <>
                    <Form className="form p-3">
                      <FormGroup row>
                        <Label for="exampleSelect" md={4}>
                          Contact
                        </Label>
                        <Col md={8}>
                          <div className="">
                            <Select
                              value={state2.selectedContacts}
                              options={state2.optionContacts}
                              onChange={handleSelectContacts}
                              placeholder="Select a Contacts..."
                              // classNamePrefix="select2-selection"
                              styles={{
                                // Fixes the overlapping problem of the component
                                menu: provided => ({ ...provided, zIndex: 9999 })
                              }}
                            />
                          </div>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="exampleSelect" md={4}>
                          Property
                        </Label>
                        <Col md={8}>
                          <div className="">
                            <Select
                              value={state2.selectedProperty}
                              onChange={handleSelectProperty}
                              options={state2.optionProperty}
                              // classNamePrefix="select2-selection"
                              placeholder="Select a property..."
                              styles={{
                                // Fixes the overlapping problem of the component
                                menu: provided => ({ ...provided, zIndex: 9999 })
                              }}
                            />
                          </div>
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mt-5">
                        <Col md={12}>
                          <Nav className="icon-tab nav-justified">
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
                                Job
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
                                Inspections
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  active: state.activeTab === "3",
                                })}
                                onClick={() => {
                                  toggle("3");
                                }}
                              >
                                Tasks
                              </NavLink>
                            </NavItem>
                          </Nav>
                          <TabContent
                            activeTab={state.activeTab}
                            className="p-3 text-muted mt-5 pt-4"
                          >
                            <TabPane tabId="1">
                              <Row>
                                <Label for="exampleSelect" md={4}>
                                  Jobs
                                </Label>
                                <Col md={8}>
                                  <div className="">
                                    <Select
                                      value={state2.selectedJobs}
                                      options={state2.optionJobs}
                                      onChange={handleSelectJobs}
                                      placeholder="Jobs..."
                                      classNamePrefix="select2-selection"
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </TabPane>
                            <TabPane tabId="2">
                              <Row>
                                <Label for="exampleSelect" md={5}>
                                  Inspections
                                </Label>
                                <Col md={7}>
                                  <div className="">
                                    <Select
                                      value={state2.selectedInspections}
                                      options={state2.optionInspections}
                                      onChange={handleSelectInspections}
                                      // className='w-50'
                                      placeholder="Inspections..."
                                      classNamePrefix="select2-selection"
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </TabPane>
                            <TabPane tabId="3">
                              <Row>
                                <Label for="exampleSelect" md={4}>
                                  Task
                                </Label>
                                <Col md={8}>
                                  <div className="">
                                    <Select
                                      value={state2.selectedTasks}
                                      options={state2.optionTasks}
                                      onChange={handleSelectTasks}
                                      placeholder="Tasks..."
                                      classNamePrefix="select2-selection"
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </TabPane>
                          </TabContent>
                        </Col>
                      </FormGroup>
                    </Form>
                    <div className="w-100 mb-2 d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={frmToggle}
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={frmSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Row className="d-flex">
                        <Col md={4}>
                          <p className="text-primary">Contacts</p>
                        </Col>
                        <Col md={8}>
                          {props.mail_details_data?.data?.contact_id ? (
                            <p>
                              {props.mail_details_data?.data?.contacts?.reference}
                            </p>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>
                      <div
                        className="w-100 "
                        style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                      />
                      <Row className="d-flex">
                        <Col md={4}>
                          <p className="text-primary">Property</p>
                        </Col>
                        <Col md={8}>
                          {props.mail_details_data?.data?.property_id ? (
                            <p>
                              {props.mail_details_data?.data?.property?.reference}
                            </p>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>
                      <div
                        className="w-100 "
                        style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                      />
                      {props.mail_details_data?.data?.job_id ? (
                        <>
                          <Row className="d-flex">
                            <Col md={4}>
                              <p className="text-primary">Job</p>
                            </Col>
                            <Col md={8}>
                              <p>{props.mail_details_data?.data?.job?.summary}</p>
                            </Col>
                          </Row>
                          <div
                            className="w-100 "
                            style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                          />
                        </>
                      ) : null}
                      {props.mail_details_data?.data?.inspection_id ? (
                        <>
                          <Row className="d-flex">
                            <Col md={4}>
                              <p className="text-primary">Inspection</p>
                            </Col>
                            <Col md={8}>
                              <p>
                                {props.mail_details_data?.data?.inspection?.summery}
                              </p>
                            </Col>
                          </Row>
                          <div
                            className="w-100 "
                            style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                          />
                        </>
                      ) : null}
                      {props.mail_details_data?.data?.task_id ? (
                        <>
                          <Row className="d-flex">
                            <Col md={4}>
                              <p className="text-primary">Taks</p>
                            </Col>
                            <Col md={8}>
                              <p>{props.mail_details_data?.data?.task?.summary}</p>
                            </Col>
                          </Row>
                          <div
                            className="w-100 "
                            style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                          />
                        </>
                      ) : null}
                    </div>
                  </>
                )}

                <div className="mb-3 w-75 mt-3">
                  <Row>
                    <Col md={12}>
                      <Label for="status" className="form-label">
                        Received Attachments
                      </Label>
                    </Col>

                    <Col md={12}>
                      <Button className="btn w-md m-1" color="buttonColor" disabled={true}>
                        Convert to Bill
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Modal
        isOpen={state.mailReplyModal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        size="xl"
      >
        <ModalBody style={{ overflow: "scroll" }}>
          <div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <i className="bx bx-envelope me-2 fa-2x text-info"></i>{" "}
                <span className="text-info fa-2x">Email reply</span>
              </div>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => mailReplyToggle()}
              ></button>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(52,58,64,.25)",
              width: "90%",
              margin: "auto",
            }}
          >
            <div
              style={{
                margin: "auto",
                backgroundColor: " #fff",
                maxHeight: "600px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>To:</p>
                    {state.to}
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Subject:
                    </p>
                    {state.subject}
                  </div>
                </div>
                <Row className="mb-2">
                  <Col sm="11">
                    <div style={{ display: "flex", gap: "10px" }}>
                      <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                        body:
                      </p>
                    </div>
                  </Col>

                  <Col sm="1">
                    <input
                      type="file"
                      onChange={e => handleAttachment(e)}
                      ref={inputFileProp}
                      style={{ display: "none" }}
                      multiple
                    />
                    <Button
                      type="button"
                      color="secondary"
                      onClick={() => inputFileProp.current.click()}
                      className="me-1"
                    >
                      <i className="fas fa-paperclip me-1"></i>
                    </Button>
                  </Col>
                </Row>
                <CKEditor
                  editor={DecoupledEditor}
                  config={editorConfiguration}
                  onReady={editor => {
                    console.log("Editor is ready to use!", editor);

                    if (editor) {
                      editor.ui
                        .getEditableElement()
                        .parentElement.insertBefore(
                          editor.ui.view.toolbar.element,
                          editor.ui.getEditableElement()
                        );

                      // textEditor = editor;
                    }
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();

                    console.log(data);
                    setState({ ...state, body: data });
                  }}
                />
                <div className="mt-3">
                  {attached.length > 0
                    ? attached.map((item, key) => (
                      <div key={key} className="bg-info mb-2 p-1">
                        <a
                          className="text-light"
                          href={
                            `${process.env.REACT_APP_DOCUMENT}` + item.path
                          }
                          target="blank"
                        >
                          {key + 1}
                          {`.`} {item.name} {` (`}
                          {floor(Number(item.file_size) / 1024)}
                          {` kb)`}
                        </a>
                      </div>
                    ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <div className="d-flex justify-content-between align-items-top">
            <Button
              type="button"
              color="danger"
              className="mx-2"
              onClick={() => mailReplyToggle()}
            >
              Close
            </Button>{" "}
            <Button
              type="button"
              color="primary"
              className="ms-1"
              onClick={handleReplyMail}
            >
              Send
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = gstate => {
  const {
    user_list_data,
    user_list_error,
    user_list_loading,

    property_list_data,
    property_list_loading,
    property_add_loading,
  } = gstate.property;

  const { contacts_list_data, contacts_list_loading } = gstate.Contacts2;

  const { jobs_list_data, jobs_list_error, jobs_list_loading } = gstate.Jobs;

  const {
    inspection_list_data,
    inspection_list_error,
    inspection_list_loading,
  } = gstate.Inspections;

  const { all_active_task, all_active_task_error, all_active_task_loading } =
    gstate.tasks;

  const {
    mail_details_data,
    mail_details_error,
    mail_details_loading,

    mail_status_assign_data,
    mail_status_assign_error,
    mail_status_assign_loading,

    mail_regarding_data,
    mail_regarding_error,
    mail_regarding_loading,

    reply_sand_loading,

    mail_attachment_data,
    mail_attachment_error,
    mail_attachment_loading,

    move_to_spam,
    move_to_spam_error,
    move_to_spam_loading,
  } = gstate.Message;
  const {
    mail_message_data,
    mail_message_data_error,
    mail_message_data_loading,
  } = gstate.Activity;

  return {
    user_list_data,
    user_list_error,
    user_list_loading,

    property_list_data,
    property_list_loading,
    property_add_loading,

    contacts_list_data,
    contacts_list_loading,

    mail_details_data,
    mail_details_error,
    mail_details_loading,

    mail_status_assign_data,
    mail_status_assign_error,
    mail_status_assign_loading,

    mail_regarding_data,
    mail_regarding_error,
    mail_regarding_loading,

    reply_sand_loading,

    mail_message_data,
    mail_message_data_error,
    mail_message_data_loading,

    jobs_list_data,
    jobs_list_error,
    jobs_list_loading,

    inspection_list_data,
    inspection_list_error,
    inspection_list_loading,

    all_active_task,
    all_active_task_error,
    all_active_task_loading,

    mail_attachment_data,
    mail_attachment_error,
    mail_attachment_loading,

    move_to_spam,
    move_to_spam_error,
    move_to_spam_loading,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    getUser,
    propertyList,
    contactList,
    mailDetails,
    mailDetailsFresh,
    mailDetailStatusAssign,
    mailDetailStatusAssignFresh,
    JobsList,
    getInspectionList,
    getAllActiveTask,
    mailDetailRegarding,
    mailDetailRegardingFresh,
    sendReply,
    sendReplyFresh,
    getMessageMail,
    storeAttachment,
    storeAttachmentFresh,
    spamMove,
    spamMoveFresh,
  })(MessagesInfo)
);
