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
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import classnames from "classnames";
import {
  useLocation,
  withRouter,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { showContact, editContactFresh, deleteContact, deleteContactFresh, archiveContact, archiveContactFresh, restoreContact, restoreContactFresh } from "../../store/Contacts2/actions";
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
import { connect } from "react-redux";
import ContactsInfoOfOwner from "./Info/ContactsInfoOfOwner";
import ContactsInfoOfInfo from "./Info/ContactsInfoOfInfo";
import ContactsInfoOfTenant from "./Info/ContactsInfoOfTenant";
import ContactsInfoOfSupplier from "./Info/ContactsInfoOfSupplier";
import TaskAdd from "pages/Task/TaskAdd";
import moment from "moment";
import toastr from "toastr";

import Aos from "aos";
import "aos/dist/aos.css";
import ContactsInfoOfSeller from "./Info/ContactsInfoOfSeller";
import ContactsInfoOfBuyer from "./Info/ContactsInfoOfBuyer";
import MessagesModal from "./MessagesModal/MessagesModal";
import ContactActivityNdoc from "./Activity/ContactActivityNdoc";
import Loder from "components/Loder/Loder";

const ContactsInfo = props => {
  // console.log("karim");
  
  const history = useHistory();
  const { id } = useParams();
  const [state, setState] = useState({
    activeTab: "",
  });

  const [showDropZone, setShowDropZone] = useState(false);
  const [dropdownState, setDropDownState] = useState({ open: false, loader: false, disableDeleteBtn: false });

  const [selectedLevel, setSelectedLevel] = useState([]);

  const [message, setMessage] = useState("");
  const [init, setInit] = useState(true);
  const [msgShow, setMsgShow] = useState(false);
  const msgToggle = () => setMsgShow(prev => !prev);

  const [msgModal, setMsgModal] = useState(false);

  const toggleMsgModal = () => {
    setMsgModal(prev => !prev);
  }
  const [show, setShow] = useState(false)

  useEffect(() => {
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

  useEffect(() => {
    if (props.delete_contact_loading === 'Success') {
      setDropDownState(prev => ({ ...prev, loader: false }))
      history.push('/contactList')
      props.deleteContactFresh()
    } else if (props.delete_contact_loading === 'Failed') {
      toastr.error("Something went wrong");
      setDropDownState(prev => ({ ...prev, loader: false, disableDeleteBtn: false }))
      props.deleteContactFresh()
    }
  }, [props.delete_contact_loading])

  useEffect(() => {
    if (props.archive_contact_loading === 'Success') {
      setDropDownState(prev => ({ ...prev, loader: false }))
      toastr.success('Contact archived Successfully')
      props.showContact(id);
      props.archiveContactFresh()
    } else if (props.archive_contact_loading === 'Failed') {
      setDropDownState(prev => ({ ...prev, loader: false }))
      toastr.error('Something went wrong!')
      props.archiveContactFresh()
    }
  }, [props.archive_contact_loading])

  useEffect(() => {
    if (props.restore_contact_loading === 'Success') {
      setDropDownState(prev => ({ ...prev, loader: false }))
      toastr.success('Contact Restored Successfully')
      props.showContact(id);
      props.restoreContactFresh()
    } else if (props.restore_contact_loading === 'Failed') {
      setDropDownState(prev => ({ ...prev, loader: false }))
      toastr.error('Something went wrong!')
      props.restoreContactFresh()
    }
  }, [props.restore_contact_loading])



  if (init) {
    props.showContact(id);
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

  const msgData = props.contacts_message_data?.data?.data;

  var authUserData = JSON.parse(localStorage.getItem("authUser"));
  const managerNameData = authUserData?.user?.first_name;

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

  const onDeleteContact = () => {
    props.deleteContact(id)
    setDropDownState(prev => ({ ...prev, loader: true, disableDeleteBtn: true }))
  }

  const archiveContactHandler = () => {
    setDropDownState(prev => ({ ...prev, loader: true }))
    props.archiveContact(id)
  }

  const contactRestoreHandler = () => {
    setDropDownState(prev => ({ ...prev, loader: true }))
    props.restoreContact(id)
  }

  console.log(props.contacts_show_data);

  return (
    <div
      className="page-content"
      onDragOver={drag}
      onDragLeave={dragend}
      onDrop={dropFile}
    >
      {dropdownState.loader && <Loder status={dropdownState.loader} />}
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
                      <Button
                        type="button"
                        className="btn btn-info w-100"
                        color={msgModal ? "modalButtonColor" : "labelColor"}
                        onClick={toggleMsgModal}
                        style={{ display: "flex", justifyContent: "space-between", borderRadius: "5px" }}
                      >

                        Message
                        <i className="fas fa-angle-right ms-1" />
                      </Button>

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
                      {props.contacts_show_data?.data?.archive == 0 &&
                        <Dropdown
                          isOpen={dropdownState.open}
                          toggle={() =>
                            setDropDownState(prev => ({ ...prev, open: !prev.open }))
                          }
                        >
                          <DropdownToggle
                            tag="button"
                            className="btn btn-labelColor w-100"
                            style={{ display: "flex", justifyContent: "space-between", borderRadius: "5px" }}
                            disabled={props.contacts_show_data?.contact_archive_status == true ? false : true}
                          >
                            Action
                            {dropdownState.open ? (
                              <i className="fas fa-angle-down font-size-12 align-middle mx-2 mt-1"></i>
                            ) : (
                              <i className="fas fa-angle-right font-size-12 align-middle mx-2 mt-1"></i>
                            )}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={archiveContactHandler}>
                              Archive
                            </DropdownItem>
                            {
                              (props.contacts_show_data?.owner == 0 && props.contacts_show_data?.tenant == 0 && props.contacts_show_data?.supplier == 0 && props.contacts_show_data?.seller == 0) &&
                              <DropdownItem onClick={onDeleteContact} disabled={dropdownState.disableDeleteBtn}>
                                Delete
                              </DropdownItem>
                            }
                          </DropdownMenu>
                        </Dropdown>
                      }
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
            {props.contacts_show_data?.data?.archive == 1 && (
              <Alert color="info">
                <div className="d-flex justify-content-between">
                  <span className="font-size-20">
                    <i className="fas fa-archive"></i> Archived on{" "}
                    {moment(props.contacts_show_data?.data?.updated_at).format(
                      "DD MMM YYYY"
                    )}
                  </span>
                  <Button
                    color="info"
                    className="btn btn-sm"
                    onClick={contactRestoreHandler}
                  >
                    <i className="fas fa-undo-alt"></i> Restore
                  </Button>
                </div>
              </Alert>
            )}
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

            {state.activeTab == 1 ?
              <ContactActivityNdoc state={state} toggle={toggle} msgToggle={msgToggle} msgShow={msgShow} msgData={msgData} managerNameData={managerNameData}
                msgHandlerSubmit={msgHandlerSubmit} setMessage={setMessage} data={props.all_contact_document?.data?.data} modalShow={activityModal} toggleActivity={toggleActivity} />
              : state.activeTab == 2 ?
                <ContactActivityNdoc state={state} toggle={toggle} msgToggle={msgToggle} msgShow={msgShow} msgData={msgData} managerNameData={managerNameData}
                  msgHandlerSubmit={msgHandlerSubmit} setMessage={setMessage} data={props.all_contact_document?.data?.data} modalShowDoc={documentModal} toggleDocument={toggleDocument} />
                : ""}
          </div>
        </Col>
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

  const { contacts_show_data, contacts_show_loading, contacts_edit_loading, delete_contact_loading, archive_contact_loading, restore_contact_loading } =
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

    add_message_data_loading, store_contact_doc_loading,

    delete_contact_loading, archive_contact_loading, restore_contact_loading
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
    AllContactDocument, storeContactDocFresh,
    deleteContact, deleteContactFresh, archiveContact, archiveContactFresh, restoreContact, restoreContactFresh
  })(ContactsInfo)
);
