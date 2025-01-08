import React, { useEffect, useState } from "react";
import { Link, withRouter, useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Parser from "html-react-parser";
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
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import classnames from "classnames";
import DetailsAndAdvert from "./DetailsAndAdvert";
import DeleteModal from "components/Common/DeleteModal";
import toastr from "toastr";
import Comment from "pages/Activity/Comment";

import {
  listingStatus,
  ListingListInfo,
  getPropertyEditInfo,
  listingStatusFresh,
  ListingsInfoFresh,
  deleteListing,
  ListingList,
  getMessageListing,
  addComment, addCommentFresh,
  deleteListingFresh, listAllActivity, getListingDoc, republishListing,
  offMarketStatus, offMarketStatusFresh,
  republishListingFresh
} from "store/actions";
import Aos from "aos";
import "aos/dist/aos.css";
import Loder from "components/Loder/Loder";
import MessagesModal from "./MsgModal/MessagesModal";
import ShowActivityData from "pages/Properties/Activity/ShowActivityData";
import moment from "moment";
import Breadcrumbs from "components/Common/Breadcrumb";
import CommentData from "pages/Activity/CommentData";
import PropertyDocs from "pages/Properties/PropertyDocs";

const ListingInfo = props => {
  const history = useHistory();
  const { id } = useParams();
  const [state, setState] = useState({
    activeTab: "1",
  });

  const [loader, setLoader] = useState(true)

  const [actionState, setActionState] = useState({ btnsecondary1: false });
  const [deleteState, setDeleteState] = useState(false);

  const [msgShow, setMsgShow] = useState(false);
  const [message, setMessage] = useState("");
  const [init, setInit] = useState(true);
  const [call, setCall] = useState(false);
  // console.log(msgState);
  const [msgModal, setMsgModal] = useState(false);

  const toggleMsgModal = () => {
    setMsgModal(prev => !prev);
  }


  const msgToggle = () => setMsgShow(prev => !prev);
  const [showModal, setShowModal] = useState(false);
  const msgHandlerSubmit = e => {
    e.preventDefault();
    if (message.length === 0) {
      return;
    } else {
      props.addComment(message, props.listing_list_info_data?.data[0]?.property_id, null, null, null, id);
      props.getMessageListing(id);
      msgToggle();
    }
  };
  // activity modal declare
  const [activitymodal, setActivityModal] = useState(false);
  const activityToggle = () => {

    if (activitymodal == false) {
      console.log('1');
      //props.PropertyAllActivity(property_id);
      setActivityModal(prev => !prev)
    } else {
      console.log('2');

      setActivityModal(prev => !prev)
    }
  }

  // comment modal declare
  const [commentmodal, setCommentModal] = useState(false);
  const commentToggle = () => setCommentModal(!commentmodal);
  // document modal
  const [documentModal, setDocumentModal] = useState(false);
  const documentToggle = () => setDocumentModal(prev => !prev);
  console.log(props.listing_list_info_data?.data?.length, '------');
  useEffect(() => {
    if (props.listing_list_info_loading == 'Success') {
      if (props.listing_list_info_data?.data?.length > 0) {

        setLoader(false)
      } else if (props.listing_list_info_data?.data?.length == 0) {
        setLoader(true)
      }
    }
  }, [props.listing_list_info_loading, props.listing_list_info_data?.data?.length])

  console.log(props.off_market_status_loading);
  useEffect(() => {
    if (props.off_market_status_loading == 'Success') {
      toastr.success('Success')
      props.offMarketStatusFresh()
      props.ListingListInfo(id);
      props.ListingList(id);
      props.ListingsInfoFresh();
      setLoader(false)

    }
    if (props.off_market_status_loading == 'Failed') {
      toastr.error('Failed')
      setLoader(false)
      props.offMarketStatusFresh()
    }
    if (props.listing_list_info_loading === false) {
      props.ListingListInfo(id);
      props.listAllActivity(id);
      setCall(true);
    }
    if (props.listing_status_loading == 'Success') {
      toastr.success(props.listing_status_data.data.status);
      props.listingStatusFresh();
      // props.ListingListInfo(id);
      props.ListingList(id);
      props.ListingsInfoFresh()


    }
    if (props.listing_status_loading == 'Failed') {
      toastr.error('Something went error');
      props.listingStatusFresh();
      setLoader(false)
    }
    if (props.listing_message_data_loading === false) {
      props.getMessageListing(id);
    }

    if (props.delete_listing_loading === "Success") {
      setShowModal(false);
      toastr.success("Deleted Successfully");
      props.ListingList();
      history.push("/listing");
    }
    if (props.republish_listing_loading == "Success") {
      toastr.success('Success')
      props.republishListingFresh()
      // props.ListingListInfo(id);
      props.ListingsInfoFresh()

      props.ListingList(id);
      setLoader(false)

    }
    if (props.republish_listing_loading == "Failed") {
      toastr.error('Failed')
      props.republishListingFresh()
      setLoader(false)
    }
    Aos.init({ duration: 2000 });
  }, [
    props.listing_status_loading,
    props.listing_message_data_loading,
    props.property_edit_info_data,
    props.property_edit_info_loading,
    props.delete_listing_loading, props.off_market_status_loading,
    props.republish_listing_loading

  ]);
  console.log(props.republish_listing_loading);
  // console.log(props.listing_list_info_data?.data[0]?.property_id);
  const activityData = props.list_all_activity?.data?.data;

  const msgData = props.listing_message_data?.data?.data;
  if (init) {
    props.ListingListInfo(id);
    props.listAllActivity(id);

    setInit(false);
    setCall(true);
  }

  if (call) {
    const propertyInfo = props.listing_list_info_data?.data[0];
    if (typeof propertyInfo != "undefined") {
      // console.log(propertyInfo);
      props.getPropertyEditInfo(propertyInfo.property_id);
      setCall(false);
    }
  }

  var authUserData = JSON.parse(localStorage.getItem("authUser"));
  const managerNameData = authUserData?.user?.first_name;

  const toggle = tab => {
    if (state.activeTab !== tab) {
      setState({
        ...state,
        activeTab: tab,
      });
    }
    console.log(tab);
    if (tab == '2') {
      props.getListingDoc(id)
    }
  };

  console.log(props.get_list_feature_image?.data?.data, 'props.get_list_feature_image------');

  const handleListingStatus = status => {
    const { date_available, rent, bond
    } = props.rental_listing_data?.data

    // console.log(props.list_desc_data?.data?.description);
    // console.log(props.listing_list_info_data?.data[0]);
    const { bathroom, bedroom, car_space } = props.listing_list_info_data?.data[0];
    // console.log(bathroom, bedroom, car_space);
    // return

    if (rent == null || bond == null || date_available == null) {
      // toastr.error('Edit Rental listing detail')
      if (rent == null) {
        toastr.warning('Please enter Rental Per Week')
        return

      }
      if (date_available == null) {
        toastr.warning('Please enter date for rental listing detail')
        return
      }
      if (bond == null) {
        toastr.warning('Please enter Bond')
        return

      }
    }
    else if (props.list_desc_data?.data?.description == null) {
      toastr.warning('Edit Property description')
    } else if (bathroom == null || bedroom == null || car_space == null) {
      if (bathroom == null || bedroom == null || car_space == null) {
        toastr.warning('Bathroom, Bedroom, Car space cannot be null')
      } else
        if (bathroom == null) {
          toastr.warning('Bathroom cannot be null')
        } else if (bedroom == null) {
          toastr.warning('Bedroom cannot be null')

        } else if (car_space == null) {
          toastr.warning('Car space cannot be null')

        }
    }
    else if (props.get_list_feature_image?.data?.data?.length == 0) {
      toastr.warning('Please add atleast one Image of your propery')
    }
    else {
      props.listingStatus(id, status);
      // props.ListingsInfoFresh()
      setLoader(true)

    }
    // return
  };
  // console.log(props.listing_list_info_data);

  // Handle Listing delete
  const onClickDelete = () => {
    setDeleteState(true);
  };
  const onClickDeleteOff = () => {
    setDeleteState(false);
  };
  const handleDeleteProject = () => {
    setShowModal(true)
    props.deleteListing(id);
    props.ListingsInfoFresh()

    setDeleteState(false);
  };

  const createTenantHandler = () => {
    history.push(`/propertyTenantAdd/${props.listing_list_info_data?.data[0]?.property_id}`)
  }

  // if (props.delete_listing_loading === "Success") {
  //   setShowModal(false);
  //   toastr.success("Deleted Successfully");
  //   props.ListingList();
  //   history.push("/listing");
  // }
  // ---------------------------

  const republishHandler = () => {
    setLoader(true)
    props.republishListing(id)
    // props.ListingsInfoFresh()

  }

  console.log(props.list_desc_data?.data);

  return (
    <div className="page-content">
      {/* <Breadcrumbs title="Listings" breadcrumbItem="Listings" /> */}
      <h4 className="ms-2 text-primary">Listing details</h4>
      <Loder status={showModal} />
      <Modal isOpen={deleteState} toggle={onClickDeleteOff} centered={true}>
        <ModalBody className="py-3 px-5">
          <Row>
            <Col lg={12}>
              <div className="text-center">
                <i
                  className="mdi mdi-alert-circle-outline"
                  style={{ fontSize: "9em", color: "orange" }}
                />
                <h2>Are you sure?</h2>
                <h4>You won&t be able to revert this!</h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-success btn-lg me-2"
                  onClick={handleDeleteProject}
                >
                  Yes, delete it!
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-lg me-2"
                  onClick={onClickDeleteOff}
                >
                  Cancel
                </button>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      <Row>
        <Col md={2} style={{ display: "flex", flexDirection: "column" }}>
          <Card style={{ borderRadius: "15px" }}>
            <CardBody className="py-4">
              <div>
                <h5 className="text-primary">
                  For Rent -{" "}
                  {`${props.property_edit_info_data?.data?.addressData?.number || ''} ${props.property_edit_info_data?.data?.addressData?.street || ''} ${props.property_edit_info_data?.data?.addressData?.suburb || ''}  ${props.property_edit_info_data?.data?.addressData?.postcode || ''}`}
                </h5>
                <div
                  className="w-100 my-2"
                  style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                />
                {/* <p className="text-muted">
              <i className="fas fa-list font-size-10 align-middle me-1"></i>
              Listing
            </p> */}
                <Col md={12}>
                  <Button
                    className="w-100 text-start mb-1"
                    color="buttonColor"
                    onClick={createTenantHandler}
                  >
                    Create Tenancy
                  </Button>
                  {props.listing_list_info_data?.data?.[0]["status"] === "Published"
                    &&
                    props.listing_list_info_data?.data?.[0]?.["secondary_status"] === "Republished"
                    ||
                    props.listing_list_info_data?.data?.[0]["status"] === "Leased"
                    &&
                    props.listing_list_info_data?.data?.[0]?.["secondary_status"] === "Republished"
                    ? <Button
                      className="w-100 text-start mb-2"
                      color="buttonColor"
                      onClick={republishHandler}
                    >
                      Republish
                    </Button> : ""}
                  {props.listing_list_info_data?.data?.[0]["status"] === "Draft" && (
                    <Button
                      className="my-2 w-100 text-start"
                      color="buttonColor"
                      disabled={props.listing_list_info_data?.data?.[0]?.["status"] === "Draft" ? false : true}
                      onClick={() => handleListingStatus("Published")}
                    >
                      Publish
                    </Button>
                  )}
                  <Button
                    className="btn btn-labelColor w-100 d-flex justify-content-between"
                    color="buttonColor"
                    onClick={toggleMsgModal}
                  >
                    Message
                    <i className="fas fa-angle-down ms-1" />
                  </Button>
                  {props.listing_list_info_data?.data?.[0]["status"] ===
                    "Published" && (
                      <Button
                        className="me-2 mt-2"
                        color="buttonColor"
                        disabled={props.listing_list_info_data?.data?.[0]["status"] ===
                          "Published" ? false : true}
                        onClick={() => handleListingStatus("Leased")}
                      >
                        Mark as Leased
                      </Button>
                    )}

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
                      className="btn btn-labelColor w-100 d-flex justify-content-between mt-2"
                    >
                      Action <i className="fas fa-angle-down"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                      {props.listing_list_info_data?.data[0]["status"] ===
                        "Published" && (
                          <DropdownItem
                            onClick={() => {
                              handleListingStatus("Draft");
                            }}
                            disabled={props.listing_list_info_data?.data[0]["status"] ===
                              "Published" ? false : true}
                          >
                            UnPublish
                          </DropdownItem>
                        )}
                      {/* {props.listing_list_info_data?.data[0]["status"] ===
                    "Draft" && ( */}

                      {props.listing_list_info_data?.data[0]["status"] ===
                        "Published" || props.listing_list_info_data?.data[0]["status"] ===
                        "Leased" ? <DropdownItem
                          onClick={() => {
                            props.offMarketStatus(id, "Draft");

                            setLoader(true)
                          }}
                          disabled={props.listing_list_info_data?.data[0]["status"] ===
                            "Published" || props.listing_list_info_data?.data[0]["status"] ===
                            "Leased" ? false : true}
                        >
                        Off market
                      </DropdownItem> : ''}

                      <DropdownItem onClick={onClickDelete}>Delete</DropdownItem>
                      {/* )} */}
                    </DropdownMenu>
                  </Dropdown>
                </Col>
              </div>
            </CardBody>
          </Card>

          <Card style={{ borderRadius: "15px" }}>
            <CardBody style={{ padding: "20px" }}>
              <div style={{ textAlign: "center" }}>
                <Row className="mt-3">
                  <Col md={12} style={{ height: "200px", display: "flex", flexDirection: "column", gap: "10px" }}>



                    <Button
                      className="btn w-100"
                      color={
                        activitymodal
                          ? "modalButtonColor"
                          : "labelColor"
                      }


                      onClick={activityToggle}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: "5px",
                      }}
                    >
                      Activity
                      <i className="fas fa-list font-size-12 align-middle me-2"></i>{" "}
                    </Button>

                    <Button
                      className="btn w-100"
                      color={
                        documentModal
                          ? "modalButtonColor"
                          : "labelColor"
                      }

                      onClick={documentToggle}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: "5px",
                      }}
                    >
                      Documents
                      <i className="fas fa-list font-size-12 align-middle me-2"></i>{" "}
                    </Button>



                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={10} className="p-0 m-0">
          <DetailsAndAdvert />
        </Col>
      </Row>



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
                  <Link to={`/all-listing-activity/${id}`}>
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
              {/* {msgShow && (
                <Comment
                  msgToggle={msgToggle}
                  // msgHandlerSubmit={msgHandlerSubmit}
                  prop_Id={id}
                  message={message}
                  setMessage={setMessage}
                />
              )} */}


              {/* {msgShow && (
                          <Comment
                            msgToggle={msgToggle}
                            msgHandlerSubmit={msgHandlerSubmit}
                            setMessage={setMessage}
                            listing_id={id}
                          />
                        )} */}

              <div
                style={{
                  padding: "10px",
                  maxHeight: "600px",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
                className="pb-2"
              >
                {/* {activityData?.map((data, i) => (
                  <ShowActivityData
                    key={data.id}
                    data={data}
                    modalState={modalState}
                    setModalState={setModalState}
                    tog_large={toggleModalState}
                    text='PropertyInfo'
                  />
                ))} */}


                {activityData?.map((data, i) => (
                  <ShowActivityData data={data} key={i} />
                ))}
              </div>
              {activityData?.length > 0 && (
                <div className="w-100 mt-2 d-flex justify-content-end">
                  <Link to={`/all-listing-activity/${id}`}>
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
                  style={{
                    cursor: "pointer",
                    width: "50px",
                    backgroundColor: "#3C627B",
                    borderRadius: "8px",
                  }}
                  onClick={msgToggle}
                >

                  <div className="badge badge-soft-secondary d-flex align-items-start p-2">
                    {/* <i className="far fa-comment-alt me-2 font-size-16 text-primary" /> */}
                    <i className="bx bxs-comment-detail me-1 font-size-16 text-white" />
                    <i className="fas fa-angle-down font-size-16 text-white" />
                  </div>
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    width: "50px",
                    backgroundColor: "#3C627B",
                    borderRadius: "8px",
                  }}
                >
                  <Link to={`/all-listing-activity/${id}`}>
                    <div className="badge badge-soft-secondary d-flex align-items-start px-3 py-2 font-size-16 text-white">
                      All
                    </div>
                  </Link>
                </div>
                <div
                  onClick={commentToggle}
                  style={{ cursor: "pointer", marginLeft: "15px" }}
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
              {/* <Comment
                msgToggle={commentToggle}
                prop_Id={id}
                message={message}
                setMessage={setMessage}
              /> */}

              <Comment
                msgToggle={commentToggle}
                msgHandlerSubmit={msgHandlerSubmit}
                setMessage={setMessage}
                listing_id={id}
              />
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      {/* ================= comment modal end   ===================*/}

      {documentModal &&
        <PropertyDocs
          documentModal={documentModal} documentToggle={documentToggle} component='Listing'
          data={props.all_listing_doc_data?.data?.data} id={id}
        />}

      {msgModal && <MessagesModal toggle={toggleMsgModal} msgModal={msgModal} listingId={id} />}

      {loader && <Loder status={loader} />}

    </div>
  );
};

const mapStateToProps = gstate => {
  const {
    listing_list_loading,
    listing_list_data,
    listing_list_error,
    listing_status_loading,
    listing_list_info_data,
    listing_status_data,
    listing_list_info_loading,
    delete_listing_loading,
    rental_listing_data, list_desc_data, off_market_status_loading,
    get_list_feature_image, republish_listing_loading

  } = gstate.Listing;
  const {
    property_edit_info_loading,
    property_type_loading,

    property_edit_info_data,
  } = gstate.property;

  const { listing_message_data, listing_message_data_loading, list_all_activity, add_message_data_loading,

    list_all_activity_loading } =
    gstate.Activity;

  const {
    all_job_document,
    all_job_document_error,
    all_job_document_loading,

    store_inspection_task_job_document_loading,
    all_listing_doc_data,
    all_listing_data_doc_loading,

  } = gstate.Document;

  return {
    listing_list_info_data,
    listing_list_loading,
    listing_list_data,
    listing_list_error,
    property_edit_info_data,
    listing_status_loading,

    listing_status_data,
    listing_list_info_loading,

    delete_listing_loading,

    listing_message_data,
    listing_message_data_loading, list_all_activity,
    list_all_activity_loading, add_message_data_loading,
    all_job_document,
    all_job_document_error,
    all_job_document_loading,

    store_inspection_task_job_document_loading,
    all_listing_doc_data,
    all_listing_data_doc_loading,

    republish_listing_loading,

    rental_listing_data, list_desc_data, off_market_status_loading,
    get_list_feature_image
  };
};

export default withRouter(
  connect(mapStateToProps, {
    listingStatus,
    ListingListInfo,
    listingStatusFresh,
    ListingsInfoFresh,
    deleteListing,
    ListingList,
    getMessageListing,
    addComment, addCommentFresh,
    getPropertyEditInfo,
    deleteListingFresh, listAllActivity, getListingDoc, republishListing,
    republishListingFresh, offMarketStatus, offMarketStatusFresh,

  })(ListingInfo)
);
