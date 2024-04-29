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
import {
  useLocation,
  withRouter,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { showContact, SupplierInfoFresh } from "../../store/Contacts2/actions";
import {
  ContactsAllActivity, getMessageContacts, addComment,
  addCommentFresh
} from "store/actions";
import { connect } from "react-redux";
import ContactsInfoOfSupplier from "./Info/ContactsInfoOfSupplier";
import ShowActivityData from "pages/Properties/Activity/ShowActivityData";
import MessagesModal from "./MessagesModal/MessagesModal";
import Comment from "pages/Activity/Comment";
import toastr from "toastr";
import TaskAdd from "pages/Task/TaskAdd";
import moment from "moment";
import Breadcrumbs from "components/Common/Breadcrumb";

const SupplierInfo = props => {
  const { id } = useParams();
  const history = useHistory();

  const [state, setState] = useState({
    activeTab: "1",

  });

  const toggle = tab => {
    if (state.activeTab !== tab) {
      setState({
        ...state,
        activeTab: tab,
      });
    }
  };
  const [message, setMessage] = useState("");

  const [init, setInit] = useState(true);
  const [msgModal, setMsgModal] = useState(false);

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
    if (props.add_message_data_loading === "Success") {
      toastr.success("Comment Added Successfully");

      props.getMessageContacts(id);
      props.addCommentFresh();
    }
    if (props.contacts_show_loading === false) {
      props.showContact(id);
      props.ContactsAllActivity(id);
      props.getMessageContacts(id);

    }
  }, [props.contacts_show_loading, props.add_message_data_loading]);

  const activityData = props.contacts_all_activity?.data?.data;
  const msgData = props.contacts_message_data?.data?.data;
  var authUserData = JSON.parse(localStorage.getItem("authUser"));
  const managerNameData = authUserData?.user?.first_name;

  // console.log(props.contacts_show_data);


  if (init) {
    props.showContact(id);
    props.ContactsAllActivity(id);

    setInit(false);
  }

  let communication = [];
  if (
    props.contacts_show_data &&
    props.contacts_show_data.contactCommunication &&
    props.contacts_show_data.contactCommunication.length > 0
  ) {
    communication = props.contacts_show_data.contactCommunication.map(
      (item, key) => (
        <span
          //  className='px-2 py-1 me-1 bg-info'
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




  let supplierData = [];
  if (props.contacts_show_data) {
    if (props.contacts_show_data.supplier?.length > 0) {
      supplierData = props.contacts_show_data.supplier?.map(item => {
        return (
          <ContactsInfoOfSupplier key={item.id} item={item} />
        );
      });
    }
  }


  return (
    <div className="page-content">
      <Breadcrumbs title="Contacts info of supplier" breadcrumbItem="Contacts" />

      <Card>
        <CardBody>
          <h4 className="mb-2 text-primary" >{
            props.contacts_show_data?.data?.reference
          }</h4>

          <div className="w-100" style={{ borderBottom: "1.2px dotted #c9c7c7" }} />
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
            {/* <Button className="me-2" color="info">
              <i className="fas fa-solid fa-location-arrow me-1" />
              Message
            </Button>
            <Button className="me-2" color="secondary">
              <i className="fa fa-solid fa-bars me-1" />
              Task
            </Button>
            <Button className="me-2" color="secondary">
              Alert
            </Button>
            <Button disabled className="me-2" color="secondary">
              Action<i className="fas fa-solid fa-angle-down ms-1"></i>
            </Button> */}
          </div>
        </CardBody>
      </Card>

      <Row className="d-flex justify-content-center">
        <Col md={10}>
          <div className="w-100">
            <Card>
              <CardBody>
                <div className="w-100 mb-2 d-flex justify-content-between align-items-center">

                  <h4 className="mb-2 text-primary">People</h4>

                  <Link to={"/contact/edit/" + props.contacts_show_data?.data?.id}>
                    <button type="button" className="btn btn-info">
                      <i className="mdi mdi-pencil d-block font-size-16"></i>
                    </button>
                  </Link>
                </div>
                <div
                  className="w-100 "
                  style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                />

                <div>
                  {/* People div */}

                  <div className="mt-3">
                    <Row>
                      <Col md={6}>
                        <div className="py-1">
                          <Col>
                            <Row className="d-flex">
                              <Col md={4}>
                                <p className="text-primary">Full name</p>
                              </Col>
                              <Col md={8}>
                                <p>
                                  {
                                    props.contacts_show_data?.data?.first_name !== null ?
                                      props.contacts_show_data?.data?.first_name + " " : null
                                  }
                                  {
                                    props.contacts_show_data?.data?.last_name !== null ?
                                      props.contacts_show_data?.data?.last_name : null
                                  }
                                </p>
                              </Col>
                            </Row>
                            <div
                              className="w-100 "
                              style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                            />
                          </Col>
                        </div>
                        <div className="py-1">
                          {props.contacts_show_data?.data?.contact_postal_address?.building_name ||
                            props.contacts_show_data?.data?.contact_postal_address?.number ||
                            props.contacts_show_data?.data?.contact_postal_address?.postcode ||
                            props.contacts_show_data?.data?.contact_postal_address?.country ||
                            props.contacts_show_data?.data?.contact_postal_address?.state ||
                            props.contacts_show_data?.data?.contact_postal_address?.street ||
                            props.contacts_show_data?.data?.contact_postal_address?.suburb ||
                            props.contacts_show_data?.data?.contact_postal_address?.unit ?
                            <Col>
                              <Row className="d-flex">
                                <Col md={4}>
                                  <p className="text-wrap text-primary">
                                    Postal <br /> Address
                                  </p>
                                </Col>
                                <Col md={8}>
                                  {console.log(props.contacts_show_data?.data?.contact_postal_address?.building_name)}
                                  <p>
                                    {
                                      props.contacts_show_data?.data?.contact_postal_address?.building_name !== null ?
                                        props.contacts_show_data?.data?.contact_postal_address?.building_name + " " : null
                                    }
                                    {
                                      props.contacts_show_data?.data?.contact_postal_address?.number !== null ?
                                        props.contacts_show_data?.data?.contact_postal_address?.number + " " : null
                                    }
                                    {
                                      props.contacts_show_data?.data?.contact_postal_address?.postcode !== null ?
                                        props.contacts_show_data?.data?.contact_postal_address?.postcode + " " : null
                                    }
                                    {
                                      props.contacts_show_data?.data?.contact_postal_address?.country !== null ?
                                        props.contacts_show_data?.data?.contact_postal_address?.country + " " : null
                                    }
                                    {
                                      props.contacts_show_data?.data?.contact_postal_address?.state !== null ?
                                        props.contacts_show_data?.data?.contact_postal_address?.state + " " : null
                                    }
                                    {
                                      props.contacts_show_data?.data?.contact_postal_address?.street !== null ?
                                        props.contacts_show_data?.data?.contact_postal_address?.street + " " : null
                                    }
                                    {
                                      props.contacts_show_data?.data?.contact_postal_address?.unit !== null ?
                                        props.contacts_show_data?.data?.contact_postal_address?.unit + " " : null
                                    }
                                  </p>
                                </Col>
                              </Row>
                              <div
                                className="w-100 "
                                style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                              />
                            </Col>
                            : null
                          }
                        </div>

                        <div className="py-1">
                          {props.contacts_show_data?.data?.contact_physical_address?.building_name ||
                            props.contacts_show_data?.data?.contact_physical_address?.number ||
                            props.contacts_show_data?.data?.contact_physical_address?.postcode ||
                            props.contacts_show_data?.data?.contact_physical_address?.country ||
                            props.contacts_show_data?.data?.contact_physical_address?.state ||
                            props.contacts_show_data?.data?.contact_physical_address?.street ||
                            props.contacts_show_data?.data?.contact_physical_address?.suburb ||
                            props.contacts_show_data?.data?.contact_physical_address?.unit ?
                            <Col>
                              <Row className="d-flex">
                                <Col md={4}>
                                  <p className="text-wrap text-primary">
                                    Physical <br /> Address
                                  </p>
                                </Col>
                                <Col md={8}>
                                  <p>
                                    {
                                      props.contacts_show_data?.data?.contact_physical_address?.building_name !== null ?
                                        props.contacts_show_data?.data?.contact_physical_address?.building_name + " " : null
                                    }
                                    {
                                      props.contacts_show_data?.data?.contact_physical_address?.number !== null ?
                                        props.contacts_show_data?.data?.contact_physical_address?.number + " " : null
                                    }
                                    {
                                      props.contacts_show_data?.data?.contact_physical_address?.postcode !== null ?
                                        props.contacts_show_data?.data?.contact_physical_address?.postcode + " " : null
                                    }
                                    {
                                      props.contacts_show_data?.data?.contact_physical_address?.country !== null ?
                                        props.contacts_show_data?.data?.contact_physical_address?.country + " " : null
                                    }
                                    {
                                      props.contacts_show_data?.data?.contact_physical_address?.state !== null ?
                                        props.contacts_show_data?.data?.contact_physical_address?.state + " " : null
                                    }
                                    {
                                      props.contacts_show_data?.data?.contact_physical_address?.street !== null ?
                                        props.contacts_show_data?.data?.contact_physical_address?.street + " " : null
                                    }
                                    {
                                      props.contacts_show_data?.data?.contact_physical_address?.unit !== null ?
                                        props.contacts_show_data?.data?.contact_physical_address?.unit + " " : null
                                    }
                                  </p>
                                </Col>
                              </Row>
                              <div
                                className="w-100 "
                                style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                              />
                            </Col>
                            : null}
                        </div>
                        <div className="py-1">
                          <Col>
                            <Row className="d-flex">
                              <Col md={4}>
                                <p className="ms-2 text-primary">
                                  Labels
                                </p>
                              </Col>
                              <Col md={8}>
                                <p>
                                  <i
                                    className="mdi mdi-pencil d-block font-size-16 text-primary"
                                  ></i>
                                </p>
                              </Col>
                            </Row>
                            <div
                              className="w-100 "
                              style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                            />
                          </Col>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="py-1">
                          {props.contacts_show_data?.data?.home_phone ?
                            <Col>
                              <Row className="d-flex">
                                <Col md={4}>
                                  <p className="text-primary">Phone</p>
                                </Col>

                                <Col md={8}>
                                  <p>{props.contacts_show_data?.data?.home_phone}</p>
                                </Col>

                              </Row>{" "}
                              <div
                                className="w-100 "
                                style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                              />
                            </Col>
                            : null
                          }
                        </div>
                        <div className="py-1">
                          {props.contacts_show_data?.data?.work_phone ?
                            <Col>
                              <Row className="d-flex">
                                <Col md={4}>
                                  <p className="text-primary">Work</p>
                                </Col>
                                <Col md={8}>
                                  <p>{props.contacts_show_data?.data?.work_phone}</p>
                                </Col>
                              </Row>{" "}
                              <div
                                className="w-100 "
                                style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                              />
                            </Col>
                            : null}
                        </div>
                        <div className="py-1">
                          {props.contacts_show_data?.data?.mobile_phone ?
                            <Col>
                              <Row className="d-flex">
                                <Col md={4}>
                                  <p className="text-primary">Mobile</p>
                                </Col>
                                <Col md={8}>
                                  <p>{props.contacts_show_data?.data?.mobile_phone}</p>
                                </Col>
                              </Row>{" "}
                              <div
                                className="w-100 "
                                style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                              />
                            </Col>
                            : null}
                        </div>
                        <div className="py-1">
                          {props.contacts_show_data?.data?.email ?
                            <Col>
                              <Row className="d-flex">
                                <Col md={4}>
                                  <p className="text-primary">Email</p>
                                </Col>
                                <Col md={8}>
                                  <p>{props.contacts_show_data?.data?.email}</p>
                                </Col>
                              </Row>{" "}
                              <div
                                className="w-100 "
                                style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                              />
                            </Col>
                            : null}
                        </div>
                        <div className="py-1">
                          <Col>
                            <Row className="d-flex">
                              <Col md={5}>
                                <p className="text-primary">Communication</p>
                              </Col>
                              <Col md={7}>
                                <p>{communication.length > 0 ? communication : "None"}</p>
                              </Col>
                            </Row>{" "}
                            <div
                              className="w-100 "
                              style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                            />
                          </Col>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </CardBody>
            </Card>
            {/* Supplier div */}
            {supplierData ? supplierData : null}
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
                  {/* <div>
                    {state.activeTab === "1" && (
                      <button type="button" className="btn btn-secondary">
                        <i className="fas fa-envelope" />
                      </button>
                    )}
                    <button type="button" className="btn btn-secondary ms-1">
                      All
                    </button>
                  </div> */}
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

                          {/* <p
                            className="fw-bold ps-2 font-size-16"
                            style={{
                              borderBottom: "1.2px dotted #c9c7c7",
                            }}
                          >
                            Active
                          </p> */}
                          {/* <div
                            style={{
                              padding: "10px",
                              maxHeight: "600px",
                              overflowY: "auto",
                              overflowX: "hidden",
                            }}
                            className='pb-2'
                          >
                            {activityData?.map((data, i) => (
                              <ShowActivityData key={i} data={data} />
                            ))}
                          </div> */}




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

                                {/* {data.maintenance && (
                                  <div className="py-2 mt-1 d-flex">
                                    <div className="d-flex justify-content-center">
                                      <div className="avatar-sm me-2">
                                        <span className="avatar-title rounded-circle bg-light text-primary fa-2x">
                                          {authUser.user.first_name.slice(0, 1)}
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      className="w-100"
                                      style={{
                                        borderBottom: "1.2px dotted #c9c7c7",
                                      }}
                                    >
                                      <div className="d-flex justify-content-between">
                                        <div>
                                          <i className="fas fa-wrench"></i>
                                          <Link
                                            to={`/maintenanceInfo/${data?.maintenance_id}`}
                                          >
                                            <span className="font-size-13 ms-1 text-info">
                                              {" "}
                                              {data?.maintenance?.summary}
                                            </span>
                                          </Link>
                                        </div>
                                        {data?.maintenance?.due_by && (
                                          <div>
                                            {data?.maintenance?.status ===
                                              "Finished" ? (
                                              ""
                                            ) : moment(new Date()).isAfter(
                                              data?.maintenance?.due_by
                                            ) == true ? (
                                              <span className="text-danger">
                                                <i className="far fa-calendar me-1"></i>
                                                {data?.maintenance?.due_by}
                                              </span>
                                            ) : (
                                              <span className="text-primary">
                                                <i className="far fa-calendar me-1"></i>
                                                {data?.maintenance?.due_by}
                                              </span>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                      <div className="mt-1">
                                        <span className="font-size-13 ps-1">
                                          {data?.maintenance?.status}
                                        </span>
                                      </div>
                                      <div className="mt-1">
                                        <span className="font-size-13 ps-1">
                                          {data?.property?.reference}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {data.task && (
                                  <div className="py-2  d-flex">
                                    <div className="d-flex justify-content-center">
                                      <div className="avatar-sm me-2">
                                        <span className="avatar-title rounded-circle bg-light text-primary fa-2x">
                                          {authUser.user.first_name.slice(0, 1)}
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      className="w-100"
                                      style={{
                                        borderBottom: "1.2px dotted #c9c7c7",
                                      }}
                                    >
                                      <div className="d-flex justify-content-between">
                                        <div>
                                          <i className="fas fa-clipboard-list"></i>
                                          <Link
                                            to={`/task/show/${data?.task_id}`}
                                          >
                                            <span className="font-size-13 ms-1 text-info">
                                              {" "}
                                              {data?.task?.summary}
                                            </span>
                                          </Link>
                                        </div>
                                        {data?.task?.due_by && (
                                          <div>
                                            {data?.task?.status === "Finished" ? (
                                              ""
                                            ) : moment(new Date()).isAfter(
                                              data?.task?.due_by
                                            ) == true ? (
                                              <span className="text-danger">
                                                <i className="far fa-calendar me-1"></i>
                                                {data?.task?.due_by}
                                              </span>
                                            ) : (
                                              <span className="text-primary">
                                                <i className="far fa-calendar me-1"></i>
                                                {data?.task?.due_by}
                                              </span>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                      <div className="mt-1">
                                        <span className="font-size-13 ps-1">
                                          {data?.task?.status}
                                        </span>
                                      </div>
                                      <div className="mt-1">
                                        <span className="font-size-13 ps-1">
                                          {data?.property?.reference}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {data.inspection && (
                                  <div className="py-2  d-flex">
                                    <div className="d-flex justify-content-center">
                                      <div className="avatar-sm me-2">
                                        <span className="avatar-title rounded-circle bg-light text-primary fa-2x">
                                          {authUser.user.first_name.slice(0, 1)}
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      className="w-100"
                                      style={{
                                        borderBottom: "1.2px dotted #c9c7c7",
                                      }}
                                    >
                                      <div className="d-flex justify-content-between">
                                        <div>
                                          <i className="bx bx-task"></i>
                                          <Link
                                            to={`/inspectionInfo/${data?.inspection_id}`}
                                          >
                                            <span className="font-size-13 ms-1 text-info">
                                              {" "}
                                              {data?.inspection?.summery}
                                            </span>
                                          </Link>
                                        </div>
                                        {data?.inspection?.inspection_date && (
                                          <div>
                                            {data?.inspection?.status ===
                                              "Finished" ? (
                                              ""
                                            ) : moment(new Date()).isAfter(
                                              data?.inspection?.inspection_date
                                            ) == true ? (
                                              <span className="text-danger">
                                                <i className="far fa-calendar me-1"></i>
                                                {
                                                  data?.inspection
                                                    ?.inspection_date
                                                }
                                              </span>
                                            ) : (
                                              <span className="text-primary">
                                                <i className="far fa-calendar me-1"></i>
                                                {
                                                  data?.inspection
                                                    ?.inspection_date
                                                }
                                              </span>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                      <div className="mt-1">
                                        <span className="font-size-13 ps-1">
                                          Scheduled for{" "}
                                          {moment(data?.inspection?.start_time, [
                                            "HH:mm",
                                          ]).format("hh:mm a")}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )} */}
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
  const { contacts_show_data, contacts_show_loading } = gstate.Contacts2;
  const {
    contacts_all_activity_loading,
    contacts_all_activity, add_message_data_loading,
    contacts_message_data

  } = gstate.Activity;
  return {
    contacts_all_activity_loading,
    contacts_all_activity,
    contacts_show_data,
    contacts_show_loading, add_message_data_loading,
    contacts_message_data
  };
};
export default withRouter(
  connect(mapStateToProps, {
    showContact,
    SupplierInfoFresh, ContactsAllActivity, getMessageContacts, addComment,
    addCommentFresh
  })(SupplierInfo)
);
