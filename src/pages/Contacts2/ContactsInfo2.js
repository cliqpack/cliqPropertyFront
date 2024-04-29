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
  Badge,
} from "reactstrap";
import classnames from "classnames";
import {
  useLocation,
  withRouter,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { showContact, editContactFresh } from "../../store/Contacts2/actions";
import {
  TenantInfoFresh,
  tenantUpdateFresh,
  OwnerUpdateFresh,
  OwnerInfoFresh,
  SupplierInfoFresh,
  getTaskInfoFresh,
  ContactsAllActivity,
  addComment,
  addCommentFresh,
  getMessageContacts,
  sendEmailFresh,
  storePropertyDocument,
  storePropertyDocumentFresh,
  AllContactDocument, storeContactDocFresh
} from "store/actions";
import { propTypes } from "react-bootstrap-editable";
import { connect } from "react-redux";
import ContactsInfoOfOwner from "./Info/ContactsInfoOfOwner";
import ContactsInfoOfInfo from "./Info/ContactsInfoOfInfo";
import ContactsInfoOfTenant from "./Info/ContactsInfoOfTenant";
import ContactsInfoOfSupplier from "./Info/ContactsInfoOfSupplier";
import TaskAdd from "pages/Task/TaskAdd";
import moment from "moment";
import MailTemplateModal from "pages/Jobs/Activity/MailTemplateModal";
import toastr from "toastr";
import Comment from "pages/Activity/Comment";

import Aos from "aos";
import "aos/dist/aos.css";
import ContactsInfoOfSeller from "./Info/ContactsInfoOfSeller";
import ContactsInfoOfBuyer from "./Info/ContactsInfoOfBuyer";
import MessagesModal from "./MessagesModal/MessagesModal";
import ShowActivityData from "pages/Properties/Activity/ShowActivityData";
import Breadcrumbs from "components/Common/Breadcrumb";
import { set } from "lodash";
import ContactActivityNdoc from "./Activity/ContactActivityNdoc";

const ContactsInfo = props => {
  const history = useHistory();
  const { id } = useParams();
  const [state, setState] = useState({
    activeTab: "",
  });

  const [showDropZone, setShowDropZone] = useState(false);

  const [selectedLevel, setSelectedLevel] = useState([]);

  const [message, setMessage] = useState("");
  const [msgState, setMsgState] = useState("");
  const [init, setInit] = useState(true);
  const [msgShow, setMsgShow] = useState(false);
  const msgToggle = () => setMsgShow(prev => !prev);

  const [msgModal, setMsgModal] = useState(false);

  const toggleMsgModal = () => {
    setMsgModal(prev => !prev);
  }
  const [show, setShow] = useState(false)

  useEffect(() => {

    // if (props.add_message_data_loading === "Success") {
    //   toastr.success("Comment Added Successfully");

    //   props.getMessageContacts(id);
    //   props.addCommentFresh();
    // }
    if (props.store_property_document_loading === "Success") {
      toastr.success("Uploaded Successfully");
      props.storePropertyDocumentFresh();
      props.AllContactDocument(id);
      setShow(false)

    }
    if (props.store_property_document_loading === "Failed") {
      toastr.error("Something went wrong");
      props.storePropertyDocumentFresh();
      setShow(false)

    }
    if (props.get_task_info_loading === "Success") {
      setInit(true);
      props.getTaskInfoFresh();
    }
    if (props.owner_info_loading === "Success") {
      props.OwnerInfoFresh();
    }
    if (props.property_owner_update_loading === "Success") {
      props.OwnerUpdateFresh();
    }
    if (props.tenant_update_loading === "Success") {
      props.tenantUpdateFresh();
    }
    // if (props.contacts_show_loading === false) {
    //   props.showContact(id);
    //   props.AllContactDocument(id);
    //   props.getMessageContacts(id);
    //   props.ContactsAllActivity(id);
    // }
    if (props.tenant_info_loading === "Success") {
      props.TenantInfoFresh();
    }
    if (props.contacts_edit_loading === "Success") {
      props.editContactFresh();
    }
    let insLvl = [];
    if (props.contacts_show_data?.data?.contact_label != []) {
      props.contacts_show_data?.data?.contact_label?.map(async (item, key) =>
        insLvl.push(item.labels)
      );
      setSelectedLevel(insLvl);
    }
    if (props.contacts_all_activity_loading === false) {
      props.ContactsAllActivity(id);
    }
    if (props.send_email_loading === "Success") {
      toastr.success("Email sent successfully");
      props.sendEmailFresh();
    }
  }, [
    // props.contacts_show_loading,
    props.tenant_info_loading,
    props.contacts_edit_loading,
    props.tenant_update_loading,
    props.property_owner_update_loading,
    props.contacts_show_data,
    props.contacts_all_activity_loading,
    props.contacts_message_data_loading,
    props.send_email_loading,
    props.store_property_document_loading,
  ]);

  useEffect(() => { props.OwnerInfoFresh() }, [])



  if (init) {
    props.showContact(id);
    // props.AllContactDocument(id);
    props.getMessageContacts(id);
    props.ContactsAllActivity(id);
    setInit(false);
  }

  const handleTenantFiles = (e, propId, contactId, tenantId) => {
    e.preventDefault();
    props.storePropertyDocument(
      e.dataTransfer.files[0],
      propId,
      contactId,
      tenantId
    );
  };

  const handleOwnerFiles = (e, propId, contactId, ownerId) => {
    e.preventDefault();
    props.storePropertyDocument(
      e.dataTransfer.files[0],
      propId,
      contactId,
      null,
      ownerId
    );
  };

  const activityData = props.contacts_all_activity?.data?.data;
  const msgData = props.contacts_message_data?.data?.data;

  var authUserData = JSON.parse(localStorage.getItem("authUser"));
  const managerNameData = authUserData?.user?.first_name;
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  const msgHandlerSubmit = e => {
    e.preventDefault();
    if (message.length === 0) {
      return;
    } else {
      props.addComment(message, null, id);
      msgToggle();
    }
  };

  const toggle = tab => {
    console.log(tab);
    if (state.activeTab !== tab) {
      console.log("In the if");
      setState({
        ...state,
        activeTab: tab,
      });
    }
    const tabCall = tab == 2 && props.AllContactDocument(id);

  };

  let communication = [];
  if (
    props.contacts_show_data &&
    props.contacts_show_data.contactCommunication &&
    props.contacts_show_data.contactCommunication.length > 0
  ) {
    communication = [... new Set(props.contacts_show_data.contactCommunication)].map(
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

  //style={{ backgroundColor: item.communication == 'Email' ? 'tomato' : item.communication == 'SMS' ? 'yellow' : 'violet' }}
  // const ownerEditHandler = id => {
  //   history.push(`/owner/edit/${id}/2`);
  // };

  let tenantData = [];
  if (props.contacts_show_data) {
    if (props.contacts_show_data?.tenant?.length > 0) {
      tenantData = props.contacts_show_data?.tenant.map(
        (item, idx) =>
        (tenantData = item?.tenant_property?.map((items, idx) => (
          <ContactsInfoOfTenant
            key={idx}
            item={item}
            items={items}
            showDropZone={showDropZone}
            handleTenantFiles={handleTenantFiles}
            setShow={setShow} show={show}

          />
        )))
      );
    }
  }

  console.log(props.contacts_show_data?.owner);
  let ownerData = [];
  if (props.contacts_show_data) {
    if (props.contacts_show_data?.owner?.length > 0) {
      ownerData = props.contacts_show_data?.owner?.map(
        (item, idx) =>
        (ownerData = item.owner_property.map((items, idx) => (
          <ContactsInfoOfOwner
            key={idx}
            item={item}
            items={items}
            showDropZone={showDropZone}
            handleOwnerFiles={handleOwnerFiles}
            setShow={setShow} show={show}
          />
        )))
      );
    }
  }

  let supplierData = [];
  if (props.contacts_show_data) {
    if (props.contacts_show_data?.supplier?.length > 0) {
      supplierData = props.contacts_show_data?.supplier?.map(item => {
        return <ContactsInfoOfSupplier key={item.id} item={item} />;
      });
    }
  }

  let sellerData = [];
  if (props.contacts_show_data) {
    if (props.contacts_show_data?.seller?.length > 0) {
      sellerData = props.contacts_show_data?.seller?.map(item => {
        return (
          <ContactsInfoOfSeller
            key={item.id}
            item={item}
            showDropZone={showDropZone}
          />
        );
      });
    }
  }

  let buyerData = [];
  if (props.contacts_show_data) {
    if (props.contacts_show_data?.buyer?.length > 0) {
      buyerData = props.contacts_show_data?.buyer?.map(item => {
        return (
          <ContactsInfoOfBuyer
            key={item.id}
            item={item}
            showDropZone={showDropZone}
          />
        );
      });
    }
  }

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

  let ref;
  if (props.contacts_show_data) {
    if (!props.contacts_show_data?.data?.first_name && !props.contacts_show_data?.data?.last_name) {
      ref = props.contacts_show_data?.data?.reference;
    } else {
      ref = props.contacts_show_data?.data?.first_name + ' ' + props.contacts_show_data?.data?.last_name;
    }
  }

  const [activityModal, setActivity] = useState(false);
  const toggleActivity = () => setActivity(!activityModal);

  // document modal
  const [documentModal, setDocument] = useState(false);
  const toggleDocument = () => setDocument(!documentModal);

  return (
    <div
      className="page-content"
      onDragOver={drag}
      onDragLeave={dragend}
      onDrop={dropFile}
    >
      {/* <Breadcrumbs title="Contacts Info" breadcrumbItem="Contacts" /> */}
      <h4 className="ms-2 text-primary">Contact Info</h4>

      <Row>
        <Col lg={2} style={{ display: "flex", flexDirection: "column" }}>
          <Card style={{ borderRadius: "15px" }}>
            <CardBody className="py-4">
              <div style={{ textAlign: "center" }}>
                <h4 className="mb-2 text-primary">
                  {/* {props.contacts_show_data?.data?.reference} */}
                  {ref}
                </h4>

                <div
                  className="w-100"
                  style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                />
                <Row className="mt-3">
                  <Col md={12}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        //justifyContent: "space-between"
                      }}
                    >
                      {/* <Button
                        className="btn w-100"
                        color={msgModal ? "modalButtonColor" : "labelColor"}
                        onClick={toggleMsgModal}
                        style={{ display: "flex", justifyContent: "space-between", borderRadius: "5px" }}
                      >

                        Message
                        <i className="fas fa-angle-right ms-1" />
                      </Button> */}

                      <TaskAdd
                        contactRef={props.contacts_show_data?.data?.reference}
                        contact_id={props.contacts_show_data?.data?.id}
                      />
                    </div>

                  </Col>
                </Row>
              </div>
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
                        color={activityModal ? "modalButtonColor" : "labelColor"}
                        onClick={() => { toggle(1); toggleActivity() }}
                        style={{ display: "flex", justifyContent: "space-between", borderRadius: "5px" }}
                      >

                        Activity
                        <i className="fas fa-list font-size-12 align-middle me-2"></i>{" "}
                      </Button>

                      <Button
                        className="btn w-100"
                        color={documentModal ? "modalButtonColor" : "labelColor"}
                        //onClick={documentToggle}
                        onClick={() => { toggle(2); toggleDocument() }}
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

        {/* <Row className="d-flex justify-content-center"> */}
        <Col md={12} lg={10} xs={12} className="p-0">
          <div>
            <ContactsInfoOfInfo
              props={props}
              communication={communication}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
            />

            {/* Owner div */}
            {ownerData ? ownerData : null}

            {/* Supplier div */}
            {supplierData ? supplierData : null}

            {/* Tenant div */}
            {tenantData ? tenantData : null}

            {/* Seller div */}
            {sellerData || ""}

            {/* Buyer div */}
            {buyerData || ""}



            {/* <Card data-aos="fade-right" data-aos-once={true}>
              <CardBody> */}

            {state.activeTab == 1 ?
              <ContactActivityNdoc state={state} toggle={toggle} msgToggle={msgToggle} msgShow={msgShow} msgData={msgData} managerNameData={managerNameData}
                msgHandlerSubmit={msgHandlerSubmit} setMessage={setMessage} data={props.all_contact_document?.data?.data} modalShow={activityModal} toggleActivity={toggleActivity} />
              : state.activeTab == 2 ?
                <ContactActivityNdoc state={state} toggle={toggle} msgToggle={msgToggle} msgShow={msgShow} msgData={msgData} managerNameData={managerNameData}
                  msgHandlerSubmit={msgHandlerSubmit} setMessage={setMessage} data={props.all_contact_document?.data?.data} modalShowDoc={documentModal} toggleDocument={toggleDocument} />
                : ""}
            {/* </CardBody>
            </Card> */}
          </div>
        </Col>
        {/* <Col md={10} className="p-0">
          <Card data-aos="fade-right" data-aos-once={true}>
            <CardBody>


              <ContactActivityNdoc state={state} toggle={toggle} msgToggle={msgToggle} msgShow={msgShow} msgData={msgData} managerNameData={managerNameData}
                msgHandlerSubmit={msgHandlerSubmit} setMessage={setMessage} data={props.all_contact_document?.data?.data} />
            </CardBody>
          </Card>
        </Col> */}
      </Row>
      {msgModal && <MessagesModal toggle={toggleMsgModal} msgModal={msgModal} contactId={id} />}
    </div>
  );
};

Aos.init({
  once: true,
});

const mapStateToProps = gstate => {
  const { get_task_info_loading } = gstate.tasks;

  const { contacts_show_data, contacts_show_loading, contacts_edit_loading } =
    gstate.Contacts2;

  const {
    tenant_info_loading,
    tenant_update_loading,
    property_owner_update_loading,
    owner_info_loading,
  } = gstate.property;
  const {
    contacts_all_activity_loading,
    contacts_all_activity,
    contacts_message_data_loading,
    contacts_message_data,
    send_email_loading,
    add_message_data_loading,
  } = gstate.Activity;
  const {
    all_contact_document,
    all_contact_document_error,
    all_contact_document_loading,
    store_property_document_loading, store_contact_doc_loading
  } = gstate.Document;
  return {
    contacts_show_data,
    contacts_show_loading,
    tenant_info_loading,

    tenant_update_loading,

    contacts_edit_loading,

    property_owner_update_loading,

    owner_info_loading,

    get_task_info_loading,

    contacts_all_activity_loading,
    contacts_all_activity,

    contacts_message_data_loading,
    contacts_message_data,
    send_email_loading,

    store_property_document_loading,

    all_contact_document,
    all_contact_document_error,
    all_contact_document_loading,

    add_message_data_loading, store_contact_doc_loading
  };
};
export default withRouter(
  connect(mapStateToProps, {
    showContact,
    TenantInfoFresh,
    editContactFresh,
    tenantUpdateFresh,
    OwnerUpdateFresh,
    OwnerInfoFresh,
    SupplierInfoFresh,
    getTaskInfoFresh,
    ContactsAllActivity,
    addComment,
    addCommentFresh,
    getMessageContacts,
    sendEmailFresh,
    storePropertyDocument,
    storePropertyDocumentFresh,
    AllContactDocument, storeContactDocFresh
  })(ContactsInfo)
);
