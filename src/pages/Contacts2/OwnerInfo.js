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
} from "reactstrap";
import classnames from "classnames";
import { useLocation, withRouter, Link, useParams, useHistory } from "react-router-dom";
import { showContact, showContactFresh } from "../../store/Contacts2/actions";
import {
  OwnerInfoFresh, ContactsAllActivity, addComment,
  addCommentFresh, getMessageContacts, storeContactDocFresh
} from "store/actions";
import { propTypes } from "react-bootstrap-editable";
import { connect } from "react-redux";
import ContactsInfoOfOwner from "./Info/ContactsInfoOfOwner";
import ContactsInfoOfInfo from "./Info/ContactsInfoOfInfo";
import MessagesModal from "./MessagesModal/MessagesModal";
import ShowActivityData from "pages/Properties/Activity/ShowActivityData";
import Comment from "pages/Activity/Comment";
import toastr from "toastr";
import TaskAdd from "pages/Task/TaskAdd";
import moment from "moment";
import Breadcrumbs from "components/Common/Breadcrumb";

const OwnerInfo = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const [state, setState] = useState({
    activeTab: "1",

  });

  const [selectedLevel, setSelectedLevel] = useState([]);
  const [init, setInit] = useState(true);
  const [msgModal, setMsgModal] = useState(false);
  const [message, setMessage] = useState("");

  const [msgShow, setMsgShow] = useState(false);
  const msgToggle = () => setMsgShow(prev => !prev);

  const toggleMsgModal = () => {
    setMsgModal(prev => !prev);
  }

  const msgHandlerSubmit = e => {
    e.preventDefault();
    if (message.length === 0) {
      return;
    } else {
      props.addComment(message, null, id);
      msgToggle();
    }
  };

  useEffect(() => {
    if (props.store_contact_doc_loading == 'Success') {
      toastr.success('Success');
      props.storeContactDocFresh();
      props.AllContactDocument(id);
      // setShow(false)
    }
    if (props.store_contact_doc_loading == 'Failed') {
      toastr.error('Something went wrong');
      props.storeContactDocFresh();
      // setShow(false)

    }
    if (props.add_message_data_loading === "Success") {
      toastr.success("Comment Added Successfully");

      props.getMessageContacts(id);
      props.addCommentFresh();
    }
    if (props.contacts_show_loading === false) {
      props.showContact(id);
      props.getMessageContacts(id);

    }
    if (init) {
      props.ContactsAllActivity(id);
      props.getMessageContacts(id);

      setInit(false)
    }

    let insLvl = [];
    if (props.contacts_show_data?.data?.contact_label != []) {
      props.contacts_show_data?.data?.contact_label?.map(async (item, key) =>
        insLvl.push(item.labels)
      );
      setSelectedLevel(insLvl);
    }
  }, [props.contacts_show_loading, props.contacts_show_data, props.add_message_data_loading]);

  const activityData = props.contacts_all_activity?.data?.data;
  const msgData = props.contacts_message_data?.data?.data;
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





  let communication = [];
  if (
    props.contacts_show_data &&
    props.contacts_show_data.contactCommunication &&
    props.contacts_show_data.contactCommunication.length > 0
  ) {
    communication = props.contacts_show_data.contactCommunication.map(
      (item, key) => (
        <span
          className={`p-2 m-1 rounded-pill text-white font-size-12 ${item.communication == "Email"
            ? "bg-primary"
            : item.communication == "SMS"
              ? "bg-warning"
              : "bg-success"
            }`}
          key={key}
        >
          {item.communication}{" "}
        </span>
      )
    );
  }







  let ownerData = [];
  if (props.contacts_show_data) {
    if (props.contacts_show_data?.owner?.length > 0) {
      ownerData = props.contacts_show_data?.owner.map((item, idx) =>
      (ownerData = item.owner_property.map((items, idx) => (

        <ContactsInfoOfOwner key={idx} item={item} items={items} />

      )))
      )
    }
  }

  return (
    <div className="page-content">
      <Breadcrumbs title="Contacts info of owner" breadcrumbItem="Contacts" />

      <Card>
        <CardBody>
          <h4 className='mb-2 text-primary'>Owner</h4>
          <div className="w-100 " style={{ borderBottom: '1.2px dotted #c9c7c7' }} />
          <div className="d-flex justify-content-start align-items-center my-3 g-2">
            <Button
              className="btn w-md m-1"
              color="info"
              onClick={toggleMsgModal}
            >
              <i className="fas fa-paper-plane me-1"></i>
              Message
              <i className="fas fa-angle-down ms-1" />
            </Button>
            <TaskAdd
              contactRef={props.contacts_show_data?.data?.reference}
              contact_id={props.contacts_show_data?.data?.id}
            />

          </div>
        </CardBody>
      </Card>

      <Row className="d-flex justify-content-center">
        <Col md={10}>
          <div>


            <ContactsInfoOfInfo props={props} communication={communication} selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} />
            {/* Owner div */}

            {ownerData ? ownerData : null}

          </div>
        </Col>
        <Col md={10}>
          <Card>
            <CardBody>
              <div>
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
                      <i className="fa fa-solid fa-bars me-1" />
                      Activity
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
                      <span className="d-none d-sm-block">
                        <i className="fas fa-user"></i> Documents
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="fas fa-user"></i>
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
                            {/* <i className="far fa-comment-alt me-2 font-size-16 text-primary" /> */}
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
                          <Link to={`/`}>
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
                          <Link to={`/`}>
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
                <TabContent activeTab={state.activeTab} className="p-3 text-muted">
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <CardText className="mb-0">
                          {msgShow && (
                            <Comment
                              msgToggle={msgToggle}
                              msgHandlerSubmit={msgHandlerSubmit}
                              setMessage={setMessage}
                            />
                          )}
                          <div>

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
                            }}>
                            {msgData?.map((data, i) => (
                              <div key={i}>
                                {data?.comment && (
                                  <div className="py-2 mt-1 d-flex">
                                    <div className="d-flex justify-content-center">
                                      <div className="avatar-sm me-2">
                                        <span className="avatar-title rounded-circle bg-light text-primary fa-2x">
                                          {managerNameData?.slice(0, 1)}
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      className="w-100"
                                      style={{
                                        borderBottom: "1.2px dotted #c9c7c7",
                                      }}
                                    >
                                      <div className="d-flex justify-content-between align-items-center mt-2">
                                        <div>
                                          <i className="far fa-comment"></i>
                                          <span className="font-size-13 ms-1">
                                            {" "}
                                            {data?.comment}
                                          </span>
                                        </div>
                                        <span>
                                          <i className="far fa-calendar me-1"></i>{" "}
                                          {moment(data?.created_at
                                          ).format('DD/MM/yyyy, h:mm a')}

                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}


                              </div>
                            ))}
                          </div>



                        </CardText>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">
                        <CardText className="mb-0">
                          <Row>
                            <Col md={3}>
                              <i className="fas fa-hammer"></i>
                            </Col>
                            <Col md={9}>
                              <p className='text-primary'>
                                Statement #2 - SUP00022.pdf
                              </p>
                              <div className="d-flex justify-content-between">
                                <div className="d-flex justify-content-evenly align-items-start">
                                  <i className="fa fa-solid fa-clock me-2" />
                                  <p>1 Oct 2020</p>
                                </div>
                                <p>73kb</p>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={3}>
                              <i className="fas fa-hammer"></i>
                            </Col>
                            <Col md={9}>
                              <p className='text-primary'>
                                Statement #1 - SUP00022.pdf
                              </p>
                              <div className="d-flex justify-content-between">
                                <div className="d-flex justify-content-evenly align-items-start">
                                  <i className="fa fa-solid fa-clock me-2" />
                                  <p>1 Oct 2020</p>
                                </div>
                                <p>49kb</p>
                              </div>
                            </Col>
                          </Row>
                          <Row></Row>
                        </CardText>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                      <button type="button" className="btn btn-secondary">
                        View All
                      </button>
                    </div>
                  </TabPane>
                </TabContent>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <MessagesModal toggle={toggleMsgModal} msgModal={msgModal} contactId={id} />
    </div>
  );
};

const mapStateToProps = gstate => {
  const {
    contacts_show_data,
    contacts_show_loading,
  } =
    gstate.Contacts2;
  const {
    all_contact_document,
    all_contact_document_error,
    all_contact_document_loading,
    store_property_document_loading, store_contact_doc_loading
  } = gstate.Document;
  const {
    contacts_all_activity_loading,
    contacts_all_activity, add_message_data_loading,
    contacts_message_data

  } = gstate.Activity;
  return {
    contacts_show_data,
    contacts_show_loading,
    contacts_all_activity_loading,
    contacts_all_activity, add_message_data_loading,
    contacts_message_data,
    all_contact_document,
    all_contact_document_error,
    all_contact_document_loading,
    store_property_document_loading, store_contact_doc_loading
  };
};
export default withRouter(
  connect(mapStateToProps, {
    showContact,
    showContactFresh,
    OwnerInfoFresh,
    ContactsAllActivity, addComment,
    addCommentFresh, getMessageContacts, storeContactDocFresh
  })(OwnerInfo)
);
