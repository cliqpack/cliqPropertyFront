import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  withRouter,
} from "react-router-dom";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { TagsInput } from "react-tag-input-component";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  Modal,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
  Progress,
  Carousel,
  CarouselControl,
  CarouselItem,
  Label,
  Tooltip,
  Container,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import classnames from "classnames";
import dummyImage from "../../assets/images/dummy-image-square.jpg";
import {
  addProPic,
  getPropertyTenantInfo,
  getPropertyTenantInfoFresh,
  getPropertyOwnerInfo,
  propertyOwnerAddFresh,
  contactList,
  propertyUpdateFresh,
  showContactFresh,
  getTaskInfoFresh,
  PropertyAllActivity,
  addComment,
  addCommentFresh,
  getMessageProperties,
  sendEmailFresh,
  getUser,
  getPropertyInfo,
  getPropertyKeyFresh,
  getPropertyInfoFresh,
  updatePicture,
  storeMultiplePicture,
  uploadMultipleImagePercentageFresh,
  getUserInfo,
  addPropertyMember,
  updateDoc,
  lebelInsert2,
  AllPropertyDocument,
  storePropertyDocument,
  storePropertyDocumentFresh,
  archieveProperty,
  undoArchieveProperty,
  SaleAgreementInfoForProperty,
  SaleAgreementInfoForPropertyFresh,
  editSaleAgreementInfoFresh,
  getTenantForManageFresh,
  uploadImagePercentageFresh,
  SaleAgreementInfoFresh,
  getMessageTemplatesForProperty,
  addPeriodic,
  addPeriodicFresh,
  getArchieveProperty,
  getAgreementFee,
  getAgreementFeeFresh,
  TenantInfoFresh,
  userList,
  propertyImageDelete,
  propertyImageDeleteFresh,
  OwnerInfoFresh,
  sellerFolioList,
} from "../../store/actions";

import TaskAddProperty from "./TaskAddProperty";
import { propertyTenantAddFresh } from "../../store/Properties/tenantActions";
import { getPropertyKey } from "../../store/Properties/actions";
import PropertyKey from "./PropertyKey";

import InspectionModalProperty from "./InspectionModalProperty";
import AddJobModalProperty from "./AddJobModalProperty";

import ListingModalProperties from "./ListingModalProperties";
import MailTemplateModal from "pages/Jobs/Activity/MailTemplateModal";
import MailTemplateModalMaintenance from "pages/Jobs/Activity/MailTemplateModalMaintenance";
import PropertyInfoRightBar from "./PropertyInfoRightBar";
import moment from "moment";
import toastr from "toastr";
import Aos from "aos";
import "aos/dist/aos.css";
import Comment from "pages/Activity/Comment";
import SaleInfo from "./SaleInfo";
import ShowActivityData from "./Activity/ShowActivityData";
import MessagesModal from "./MessagesModal";
import ImageModal from "pages/Image/ImageModal";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
//import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import Flatpickr from "react-flatpickr";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Labels from "./Label/Label";
import CommentData from "pages/Activity/CommentData";
import Documents from "./Documents/Documents";
import RentCalculation from "./Tenant/RentCalculation";
import PropertyDocs from "./PropertyDocs";

document.title = "CliqProperty";

const PropertyInfo = props => {
  const { id } = useParams();
  const [state, setState] = useState({
    customIconActiveTab: "1",
    activeTab: "1",
    singlebtn1: false,
  });
  const [modalState, setModalState] = useState(false);
  const toggleModalState = () => {
    setModalState(prevState => !prevState);
  };
  const [init, setInit] = useState(true);

  const [label, setLabel] = useState();
  const handleMulti = e => {
    setLabel({ ...label, selectedMulti: e });
  };
  const [file, setFile] = useState(dummyImage);
  const [showDropZone, setShowDropZone] = useState({
    property: false,
    owner: false,
    tenant: false,
    propertyPhoto: false,
    sale: false,
  });

  const [userState, setUserState] = useState(true);
  const renderCount = useRef(0);
  const [animating, setAnimating] = useState(false);
  // const [activeIndex, setActiveIndex] = useState(0);

  // Select contact
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [optionGroup, setOptionGroup] = useState();
  const [optionTeam, setOptionTeam] = useState();
  const [optionGroupState, setOptionGroupState] = useState(true);

  const [ownerData, setOwnerState] = useState(undefined);
  const [tenantData, setTenantState] = useState(undefined);
  const [memberModal, setMemberModal] = useState(false);
  const [keyModal, setKeyModal] = useState(false);
  const [periodicModal, setPeriodicModal] = useState(false);
  const [documentFile, setDocumentFile] = useState([]);
  const [memberBtnName, setMemberBtnName] = useState("");
  const inputFile = useRef(null);
  const inputFileProp = useRef(null);
  const inputFileSale = useRef(null);
  const inputFileTenant = useRef(null);
  const inputFileOwner = useRef(null);
  const [propGet, setPropGet] = useState(true);
  const [enable, setEnable] = useState(false);

  const [level, setLevel] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState([]);

  const [msgShow, setMsgShow] = useState(false);
  const [message, setMessage] = useState("");

  const [msgModal, setMsgModal] = useState(false);
  const [pTenancy, setPTenancy] = useState(false);
  const [state1, setState1] = useState({ create_bill: 0, fee_data: {} });

  //Image modal
  const [activeIndex, setActiveIndex] = useState(0);

  const [mailTemplateShow, setMailTemplateShow] = useState(false);
  // activity modal declare
  const [activitymodal, setActivityModal] = useState(false);
  const activityToggle = () => {
    if (activitymodal == false) {
      props.PropertyAllActivity(property_id);
      setActivityModal(prev => !prev);
    } else {
      setActivityModal(prev => !prev);
    }
  };

  // comment modal declare
  const [commentmodal, setCommentModal] = useState(false);
  const commentToggle = () => setCommentModal(!commentmodal);
  // document modal declare
  const [documentModal, setDocumentModal] = useState(false);
  const documentToggle = () => {
    if (documentModal == false) {
      props.AllPropertyDocument(property_id);
    }
    setDocumentModal(prev => !prev);
  };
  const tog_large = () => {
    setMailTemplateShow(prevState => !prevState);
    // removeBodyCss();
  };

  const toggleMsgModal = () => {
    // props.getMessageTemplatesForProperty();
    setMsgModal(prev => !prev);
  };

  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const property_id = params.id;

  const msgToggle = () => setMsgShow(prev => !prev);
  const currentDate = new Date();

  var authUserData = JSON.parse(localStorage.getItem("authUser"));
  let propertyName = "New Property";
  let propertyId;

  const [slides, setSlides] = useState([]);
  const [itemLength, setItemLength] = useState(0);
  const rootData = () => {
    props.getPropertyInfo(property_id);
    props.getPropertyTenantInfo(property_id);
    props.getPropertyOwnerInfo(property_id);
    props.AllPropertyDocument(id);

    props.getPropertyKey(property_id);
    props.getMessageProperties(property_id);
    props.contactList();
    props.getTenantForManageFresh();
    props.SaleAgreementInfoFresh();
    props.SaleAgreementInfoForProperty(property_id);
    props.sellerFolioList();
  };

  if (propGet) {
    rootData();
    setPropGet(false);
  }
  useEffect(() => {
    props.OwnerInfoFresh();
  }, []);

  useEffect(() => {
    if (props.property_image_delete_loading == "Success") {
      toastr.success("Image deleted successfully");
      props.propertyImageDeleteFresh();
      props.getPropertyInfo(id);
      // setloader(false);
      setActiveIndex(0);
    }
    if (props.property_info_data?.data?.data?.properties_level != []) {
      let insLvl = [];
      props.property_info_data?.data?.data?.properties_level?.map(
        async (item, key) => insLvl.push(item.labels)
      );
      setSelectedLevel(insLvl);
    }
    if (props.property_info_data) {
      let slides = [],
        itemLength = 0;
      slides = props.property_info_data?.data?.data?.property_images?.map(
        (item, idx) => {
          return (
            <CarouselItem
              onExited={() => setAnimating(false)}
              onExiting={() => setAnimating(true)}
              key={idx}
            >
              <img
                src={process.env.REACT_APP_IMAGE + item.property_image}
                onClick={showSlider}
                alt={item.property_image}
                style={{ height: "450px", width: "100%", objectFit: "cover" }}
              />
            </CarouselItem>
          );
        }
      );
      itemLength =
        props.property_info_data?.data?.data?.property_images?.length - 1;
      setSlides(slides);
      setItemLength(itemLength);
      if (props.property_info_data?.data?.data?.property_images?.length == 0) {
        setFile(dummyImage);
      }
    }
    if (
      props.percentage_multiple_loading === "Success" &&
      props.percentage_multiple == 100
    ) {
      toastr.success("Uploaded successfully");
      props.uploadMultipleImagePercentageFresh();
    }
    if (props.percentage_multiple_loading === "Failed") {
      toastr.error("Upload Failed. too large file!!");
      props.uploadMultipleImagePercentageFresh();
    }
    if (props.store_property_document_loading === "Success") {
      toastr.success("Uploaded Successfully");
      props.AllPropertyDocument(id);
      props.storePropertyDocumentFresh();
    }
    if (props.get_task_info_loading === "Success") {
      props.getTaskInfoFresh();
    }
    if (props.property_add_tanent_loading === "Success") {
      props.propertyTenantAddFresh();
    }
    if (props.property_owner_add_loading === "Success") {
      props.propertyOwnerAddFresh();
    }
    if (props.send_email_loading === "Success") {
      toastr.success("Email sent successfully");
      props.sendEmailFresh();
      setModalState(false);
    }
    if (props.send_email_loading === "Failed") {
      toastr.error("Something went wrong");
      props.sendEmailFresh();
    }
    if (props.periodic_tenancy_update_loading === "Success") {
      toastr.success("Periodic Tenancy Update Successfully");
      props.addPeriodicFresh();
      rootData();
      tog_periodic_modal();
      setState1({ create_bill: 0, fee_data: {} });
    }
    if (props.property_tenant_info_loading == "Success") {
      props.getPropertyTenantInfoFresh();
    }
    Aos.init({ duration: 2000 });
  }, [
    props.property_add_tanent_loading,
    props.property_owner_add_loading,
    props.property_info_data,
    props.get_task_info_loading,
    props.send_email_loading,
    props.store_property_document_loading,
    props.percentage_loading,
    props.percentage_multiple_loading,
    props.periodic_tenancy_update_loading,
    props.percentage_multiple,
    props.property_image_delete_loading,
    props.property_tenant_info_loading,
  ]);

  const salesAndBuyerData = props.seller_info_property_data?.data?.data;
  const saleInfoData =
    props.seller_info_property_data?.data?.data?.sales_contact;
  const activityData = props.property_all_activity?.data?.data;

  const msgData = props.property_message_data?.data?.data;
  const managerNameData = authUserData?.user?.first_name;
  const user_type = authUserData?.user?.user_type;
  const handleMulti3 = e => {
    setSelectedLevel(e);
    props.lebelInsert2(id, e);
  };

  const listEnable = () => {
    setLevel(false);
  };

  const disable = () => {
    let insLvl = [];
    setLevel(true);
  };

  const handlePropertyFilesdrop = (e, propId) => {
    e.preventDefault();
    props.storePropertyDocument(e.dataTransfer.files, propId);
  };
  const handlePropertyFiles = (e, propId) => {
    e.preventDefault();
    props.storePropertyDocument(e.target.files, propId);
  };

  const handleTenantFiles = (e, propId, contactId, tenantId) => {
    e.preventDefault();
    // return false;
    props.storePropertyDocument(e.target.files, propId, contactId, tenantId);
  };
  const handleTenantDropFiles = (e, propId, contactId, tenantId) => {
    e.preventDefault();
    // return false;
    props.storePropertyDocument(
      e.dataTransfer.files,
      propId,
      contactId,
      tenantId
    );
  };

  const handleOwnerFiles = (e, propId, contactId, ownerId) => {
    e.preventDefault();
    props.storePropertyDocument(
      e.target.files,
      propId,
      contactId,
      null,
      ownerId
    );
  };
  const handleOwnerDropFiles = (e, propId, contactId, ownerId) => {
    e.preventDefault();
    props.storePropertyDocument(
      e.dataTransfer.files,
      propId,
      contactId,
      null,
      ownerId
    );
  };

  const handleSaleFiles = (e, propId, contactId, saleId) => {
    e.preventDefault();
    props.storePropertyDocument(
      e.target.files,
      propId,
      contactId,
      null,
      null,
      saleId
    );
  };
  const handleSaleDropFiles = (e, propId, contactId, saleId) => {
    e.preventDefault();
    props.storePropertyDocument(
      e.dataTransfer.files,
      propId,
      contactId,
      null,
      null,
      saleId
    );
  };

  const handleUploadImage = async e => {
    setFile([...file, e.target.files[0]]);
    await setFile(URL.createObjectURL(e.target.files[0]));
    const property_image = await e.target.files[0];
    // await props.updatePicture(
    //   e.target.files[0],
    //   props.property_info_data.data.data.id
    // );
    await props.storeMultiplePicture(
      e.target.files,
      props.property_info_data.data.data.id
    );
  };
  const handleUploadImageDropzone = async e => {
    setFile([...file, e.dataTransfer.files[0]]);
    await setFile(URL.createObjectURL(e.dataTransfer.files[0]));
    const property_image = await e.dataTransfer.files[0];
    // await props.updatePicture(
    //   e.dataTransfer.files[0],
    //   props.property_info_data.data.data.id
    // );
    await props.storeMultiplePicture(
      e.dataTransfer.files,
      props.property_info_data.data.data.id
    );
  };

  const handleDocument = async e => {
    await props.updateDoc(
      e.target.files[0],
      props.property_info_data.data.data.id
    );
  };

  const toggle = tab => {
    if (state.activeTab !== tab) {
      setState({
        ...state,
        activeTab: tab,
      });
    }

    const tabCall = tab == 2 && props.AllPropertyDocument(property_id);
  };

  const msgHandlerSubmit = e => {
    e.preventDefault();
    if (message.length === 0) {
      return;
    } else {
      props.addComment(message, id);
      msgToggle();
    }
  };

  if (props.property_info_data) {
    propertyId = property_id;
  }

  if (userState) {
    props.getUser();
    setUserState(false);
  }
  let property_data = undefined;
  let property_owner_info_data = undefined;
  let property_pending_bill = undefined;
  let dueDate = undefined;

  if (props.property_info_data) {
    property_data = props.property_info_data?.data;
    dueDate = props.property_info_data?.data?.routine_inspection_due_date;
    property_owner_info_data =
      props.property_info_data?.data?.data?.current_owner_folio;
    property_pending_bill = props.property_info_data?.data?.total_bills_amount;
  }

  const memberHandler = (property_id, member_id, type) => {
    setMemberModal(prevState => !prevState);
    props.addPropertyMember(property_id, member_id, type);
  };

  let userData = undefined;
  if (props.user_list_data) {
    if (typeof props.user_list_data?.data !== "undefined") {
      userData = props.user_list_data?.data?.map((item, key) => (
        <tr key={key}>
          <th scope="row">{item.id}</th>
          <td>{item.first_name + " " + item.last_name}</td>
          <td>{item.mobile_phone}</td>
          <td>{item.email}</td>
          <td>
            <Button
              color="info"
              type="button"
              onClick={() => {
                memberHandler(property_data.data.id, item.id, memberBtnName);
              }}
            >
              <i className="bx bxs-group me-2"></i>
              Assign {memberBtnName}
            </Button>
          </td>
        </tr>
      ));
    }
  }

  let docData = undefined;
  const docFiles = () => {
    if (property_data != undefined) {
      if (property_data.data) {
        if (typeof property_data.data.property_docs !== "undefined") {
          docData = property_data.data.property_docs.map((item, key) => (
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
                <p>{property_data && property_data.data.reference}</p>
              </Col>

              <Col>
                <i className="bx bx-show" style={{ fontSize: 24 }} />
              </Col>

              <hr />
            </Row>
          ));
        }
      }
    }
  };

  docFiles();

  const propertyEditBtn = id => {
    history.push("/propertyEdit/" + id);
  };

  const toggleMemberModal = () => {
    setMemberModal(prevState => !prevState);
  };

  const tog_key_modal = () => {
    setKeyModal(prevState => !prevState);
    setEnable(prevState => !prevState);
    rootData();
  };

  const tog_periodic_modal = () => {
    props.getAgreementFeeFresh();
    props.getAgreementFee(property_id);
    setPeriodicModal(prevState => !prevState);
    setState1({
      ...state1,
      id: tenantInfoData?.folio?.tenant_contact_id,
      agreement_start: tenantInfoData?.folio?.agreement_start,
      agreement_end: tenantInfoData?.folio?.agreement_end,
    });
    var pt = tenantInfoData?.folio?.periodic_tenancy == "0" ? false : true;
    setPTenancy(pt);
  };

  let agreementFeeStatus;
  if (props.agreement_fee?.data?.data) {
    if (props.agreement_fee?.data?.data?.value === "%") {
      agreementFeeStatus = `${props.agreement_fee?.data?.data?.fee_type} - ${props.agreement_fee?.data?.data?.price}${props.agreement_fee?.data?.data?.value} of the current weekly rent`;
    } else {
      agreementFeeStatus = `${props.agreement_fee?.data?.data?.fee_type} of ${props.agreement_fee?.data?.data?.value}${props.agreement_fee?.data?.data?.price}`;
    }
  }
  let agreementFolioFeeStatus;
  if (props.agreement_fee?.data?.folioAgreement) {
    if (
      props.agreement_fee?.data?.folioAgreement?.fee_settings?.value === "%"
    ) {
      agreementFolioFeeStatus = `${props.agreement_fee?.data?.folioAgreement?.fee_settings?.fee_type} - ${props.agreement_fee?.data?.folioAgreement?.amount}${props.agreement_fee?.data?.folioAgreement?.fee_settings?.value} of the current weekly rent`;
    } else {
      agreementFolioFeeStatus = `${props.agreement_fee?.data?.folioAgreement?.fee_settings?.fee_type} of ${props.agreement_fee?.data?.folioAgreement?.fee_settings?.value}${props.agreement_fee?.data?.folioAgreement?.amount}`;
    }
  }
  let agreementPropertyFeeStatus;
  if (props.agreement_fee?.data?.propertyAgreement) {
    if (
      props.agreement_fee?.data?.propertyAgreement?.fee_settings?.value === "%"
    ) {
      agreementPropertyFeeStatus = `${props.agreement_fee?.data?.propertyAgreement?.fee_settings?.fee_type} - ${props.agreement_fee?.data?.propertyAgreement?.amount}${props.agreement_fee?.data?.propertyAgreement?.fee_settings?.value} of the current weekly rent`;
    } else {
      agreementPropertyFeeStatus = `${props.agreement_fee?.data?.propertyAgreement?.fee_settings?.fee_type} of ${props.agreement_fee?.data?.propertyAgreement?.fee_settings?.value}${props.agreement_fee?.data?.propertyAgreement?.amount}`;
    }
  }

  const ownerHandler = () => {
    props.getPropertyInfoFresh();
    setMemberModal(prevState => !prevState);
    setMemberBtnName("Owner");
  };

  const tenantHandler = () => {
    props.getPropertyInfoFresh();
    setMemberModal(prevState => !prevState);
    setMemberBtnName("Tenant");
  };

  let tenantInfoData = undefined;
  let paidToData = undefined;
  let tenantStatus = false;
  if (props.property_tenant_info_data?.data) {
    tenantInfoData = props.property_tenant_info_data?.data;
    if (tenantInfoData?.folio?.paid_to) {
      paidToData = new Date(
        props.property_tenant_info_data?.data?.folio?.paid_to
      );
      paidToData = paidToData.toLocaleDateString("en-us", {
        day: "numeric",
        month: "short",
      });
    }
    if (
      props.property_tenant_info_data?.data?.data != null &&
      tenantInfoData?.data?.status != "false"
    ) {
      tenantStatus = props.property_tenant_info_data.data;
    }
  }

  let ownerInfoData = undefined;
  let ownerStatus = false;
  if (props.property_owner_info_data) {
    ownerInfoData = props.property_owner_info_data?.data;
    if (
      props.property_owner_info_data?.data?.data != null &&
      ownerInfoData?.data?.status != "0"
    ) {
      ownerStatus = true;
    }
  }

  let option;
  if (props.contacts_list_data && optionGroupState) {
    option = props.contacts_list_data.data?.map(item => ({
      options: [{ label: item.reference, value: item.id }],
    }));

    setOptionGroup(option);
    setOptionTeam([
      {
        label: `${authUserData.user.first_name} ${authUserData.user.last_name}`,
        value: `${authUserData.user.id}`,
      },
    ]);
    setOptionGroupState(false);
  }

  var keyText = {
    selectselectedGroup: selectedGroup,
    optionGroup: optionGroup,
    property_id: property_id,
    optionTeam: optionTeam,
  };

  const ownerEditHandler = (id, tabId, fId, proId) => {
    history.push({
      pathname: `/owner/edit/${id}/${fId}/${tabId}`,
      state: { proId },
    });
  };
  const tenantEditHandler = (id, tabId) => {
    props.TenantInfoFresh();
    history.push("/tenant/edit/" + id + "/" + tabId);
  };
  const tenantFolioHandler = (contactId, tId, fId) => {
    history.push(`/tenantFolio/${id}/${contactId}/${tId}/${fId}`);
  };
  const ownerFolioHandler = (contactId, oId, folioCode, fId) => {
    history.push({
      pathname: `/ownerFolio/${id}/${fId}`,
      state: { contactId, oId, folioCode, fId },
    });
  };
  const sellerFolioHandler = (contactId, folioCode, fId) => {
    history.push({
      pathname: `/sellerFolio/${id}/${fId}`,
      state: { contactId, folioCode, fId },
    });
  };
  const supplierEditHandler = id => {
    props.SupplierInfoFresh();
    history.push("/supplier/edit/" + id);
  };
  const editSaleHandler = (saleId, tabId) => {
    props.SaleAgreementInfoForPropertyFresh();
    props.editSaleAgreementInfoFresh();
    history.push(`/editSaleAgreement/${id}/${saleId}/${tabId}`);
  };

  const propertyDropFile = e => {
    e.preventDefault();
    setShowDropZone(prev => {
      return {
        ...prev,
        property: false,
      };
    });
  };

  const propertyDrag = e => {
    e.preventDefault();
    setShowDropZone(prev => {
      return {
        ...prev,
        property: true,
      };
    });
  };

  const propertyDragend = e => {
    e.preventDefault();
    setShowDropZone(prev => {
      return {
        ...prev,
        property: false,
      };
    });
  };
  const propertyPhotoDropFile = e => {
    e.preventDefault();
    setShowDropZone(prev => {
      return {
        ...prev,
        propertyPhoto: false,
      };
    });
  };

  const propertyPhotoDrag = e => {
    e.preventDefault();
    setShowDropZone(prev => {
      return {
        ...prev,
        propertyPhoto: true,
      };
    });
  };

  const propertyPhotoDragend = e => {
    e.preventDefault();
    setShowDropZone(prev => {
      return {
        ...prev,
        propertyPhoto: false,
      };
    });
  };

  const tenantDropFile = e => {
    e.preventDefault();
    setShowDropZone(prev => {
      return {
        ...prev,
        tenant: false,
      };
    });
  };

  const tenantDrag = e => {
    e.preventDefault();
    setShowDropZone(prev => {
      return {
        ...prev,
        tenant: true,
      };
    });
  };

  const tenantDragend = e => {
    e.preventDefault();
    setShowDropZone(prev => {
      return {
        ...prev,
        tenant: false,
      };
    });
  };

  const saleDropFile = e => {
    e.preventDefault();
    setShowDropZone(prev => {
      return {
        ...prev,
        sale: false,
      };
    });
  };

  const saleDrag = e => {
    e.preventDefault();
    setShowDropZone(prev => {
      return {
        ...prev,
        sale: true,
      };
    });
  };

  const saleDragend = e => {
    e.preventDefault();
    setShowDropZone(prev => {
      return {
        ...prev,
        sale: false,
      };
    });
  };

  const ownerDropFile = e => {
    e.preventDefault();
    setShowDropZone(prev => {
      return {
        ...prev,
        owner: false,
      };
    });
  };

  const ownerDrag = e => {
    e.preventDefault();
    setShowDropZone(prev => {
      return {
        ...prev,
        owner: true,
      };
    });
  };

  const ownerDragend = e => {
    e.preventDefault();
    setShowDropZone(prev => {
      return {
        ...prev,
        owner: false,
      };
    });
  };

  const handleArchive = () => {
    props.archieveProperty(id);
    props.getPropertyInfo(id);
    props.getArchieveProperty();
    props.SaleAgreementInfoFresh();
  };

  const handleUndoArchive = () => {
    props.undoArchieveProperty(id);
    props.getPropertyInfo(id);
    props.getArchieveProperty();
    props.SaleAgreementInfoFresh();
  };
  const [jobModal, setJobModal] = useState(false);
  const [jobModalEnable, setJobModalEnable] = useState(false);
  const jobToggle = () => {
    setJobModalEnable(prev => !prev);
    setJobModal(prev => !prev);
  };

  const [inspectionModal, setInspectionModal] = useState(false);
  const [inspectionModalEnable, setInspectionModalEnable] = useState(false);
  const inspectionToggle = () => {
    setInspectionModalEnable(prev => !prev);
    setInspectionModal(prev => !prev);
  };

  const [listingModal, setListingModal] = useState(false);
  const [listingModalEnable, setListingModalEnable] = useState(false);
  const listingToggle = () => {
    setListingModalEnable(prev => !prev);
    setListingModal(prev => !prev);
  };

  const [showSliderState, setShowSliderState] = useState({
    photoIndex: 0,
    isOpen: false,
  });
  const [imageShowState, setImageShowState] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [taskModalEnable, setTaskModalEnable] = useState(false);
  const [rentCalculationState, setRentCalculationState] = useState(false);
  const taskToggle = () => {
    setTaskModalEnable(prev => !prev);
    setTaskModal(prev => !prev);
  };

  const showSlider = () => {
    setShowSliderState(prev => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };

  const image_slides =
    props.property_info_data?.data?.data?.property_images?.map((item, idx) => {
      return { src: process.env.REACT_APP_IMAGE + item.property_image };
    });

  const previousButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? itemLength : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const nextButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === itemLength ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  let listingLink = `/listingInfo/`;
  let inspectionLink = `/inspectionInfo/`;
  let maintenanceLink = `/maintenanceInfo/`;
  const handleIDate = value => {
    setState1({ ...state1, agreement_start: value });
  };
  const dateHandler = (selectedDates, dateStr, instance) => {
    handleIDate(dateStr);
  };
  const handleIDate1 = value => {
    setState1({ ...state1, agreement_end: value });
  };
  const dateHandler1 = (selectedDates, dateStr, instance) => {
    handleIDate1(dateStr);
  };
  const handleAgreementFee = (e, type) => {
    if (type === "PLAN") {
      setState1(prev => ({
        ...prev,
        create_bill: prev.create_bill === 0 ? 1 : 0,
        fee_data: props.agreement_fee?.data?.data,
        property_id: property_id,
      }));
    } else if (type === "FOLIOFEE") {
      setState1(prev => ({
        ...prev,
        create_bill: prev.create_bill === 0 ? 1 : 0,
        folio_fee_data: props.agreement_fee?.data?.folioAgreement,
        property_id: property_id,
      }));
    } else if (type === "PROPERTYFEE") {
      setState1(prev => ({
        ...prev,
        create_bill: prev.create_bill === 0 ? 1 : 0,
        property_fee_data: props.agreement_fee?.data?.propertyAgreement,
        property_id: property_id,
      }));
    }
  };

  const handlePeriodic = () => {
    props.addPeriodic(state1, pTenancy);
  };

  const togglePT = () => {
    setPTenancy(prev => !prev);
  };

  let moneyOut =
    +property_owner_info_data?.money_out +
    (property_pending_bill?.total_bills_amount_sum_amount
      ? +property_pending_bill?.total_bills_amount_sum_amount
      : 0);
  let moneyIn =
    +property_owner_info_data?.money_in +
    (property_owner_info_data?.opening_balance
      ? +property_owner_info_data?.opening_balance
      : 0);
  let totalBalance = moneyIn - moneyOut;

  const propertyAddress = property_data?.property_address;

  const toggleCalculationRent = () => {
    setRentCalculationState(prev => !prev);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Property info" breadcrumbItem="Properties" /> */}
          <h4 className="ms-2 text-primary">Property Info</h4>
          <Row>
            <Col lg={2} style={{ display: "flex", flexDirection: "column" }}>
              <Card style={{ borderRadius: "15px" }}>
                <CardBody className="py-4">
                  <div style={{ textAlign: "center" }}>
                    <h4 className="text-primary py-1">
                      {" "}
                      {property_data ? `${property_data?.data?.reference}` : ""}
                    </h4>

                    <Row className="mt-3">
                      <Col md={12}>
                        {/* <Button type="button" className="btn me-1" color="primary">
                        <i className="bx bx-meteor me-1" /> Message
                      </Button> */}
                        {/* <Button type="button" className="btn me-1" color="primary">
                        <i className="bx bxs-wrench me-1"></i> Job
                      </Button> */}
                        {user_type == "Property Manager" &&
                          property_data?.data?.status !== "Archived" && (
                            <>
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
                                  className="btn w-100"
                                  color={
                                    jobModalEnable
                                      ? "modalButtonColor"
                                      : "labelColor"
                                  }
                                  onClick={jobToggle}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Job
                                  <i className="bx bx-plus-circle font-size-18 align-middle ms-2" />
                                </Button>
                                {jobModalEnable && (
                                  <AddJobModalProperty
                                    propertyInfoData={props.property_info_data}
                                    id={property_id}
                                    toggle={jobToggle}
                                    jobModal={jobModal}
                                    propertyRef={property_data?.data?.reference}
                                  />
                                )}

                                <Button
                                  className="btn w-100"
                                  color={
                                    inspectionModalEnable
                                      ? "modalButtonColor"
                                      : "labelColor"
                                  }
                                  onClick={inspectionToggle}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Inspection
                                  <i className="bx bx-plus-circle font-size-18 align-middle ms-2" />
                                </Button>
                                {inspectionModalEnable && (
                                  <InspectionModalProperty
                                    data={property_data}
                                    toggle={inspectionToggle}
                                    inspectionModal={inspectionModal}
                                  />
                                )}

                                <Button
                                  className="btn w-100"
                                  color={
                                    listingModalEnable
                                      ? "modalButtonColor"
                                      : "labelColor"
                                  }
                                  onClick={listingToggle}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Listings
                                  <i className="bx bx-plus-circle font-size-18 align-middle ms-2" />
                                </Button>
                                {listingModalEnable && (
                                  <ListingModalProperties
                                    propertyInfoData={
                                      props.property_info_data?.data?.data
                                        ?.reference
                                    }
                                    id={id}
                                    toggle={listingToggle}
                                    listingModal={listingModal}
                                  />
                                )}

                                <Button
                                  className="btn w-100"
                                  color={
                                    taskModalEnable
                                      ? "modalButtonColor"
                                      : "labelColor"
                                  }
                                  onClick={taskToggle}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Task
                                  <i className="bx bx-plus-circle font-size-18 align-middle ms-2" />
                                </Button>
                                <Button
                                  className="btn w-100"
                                  color={
                                    msgModal ? "modalButtonColor" : "labelColor"
                                  }
                                  onClick={toggleMsgModal}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderRadius: "5px",
                                  }}
                                >
                                  {/* <i className="fas fa-paper-plane me-1"></i> */}
                                  Message
                                  <i className="fas fa-angle-right ms-1" />
                                </Button>
                              </div>
                              {taskModalEnable && (
                                <TaskAddProperty
                                  propertyName={property_data?.data?.reference}
                                  property_id={property_id}
                                  toggle={taskToggle}
                                  taskModal={taskModal}
                                />
                              )}
                            </>
                          )}
                        {/* <Button className="btn me-1" color="primary">
                        <i className="bx bxs-file-blank me-1"></i> Rent Receipt
                      </Button> */}
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>

              <Card style={{ borderRadius: "15px" }}>
                <CardBody style={{ padding: "20px" }}>
                  <div style={{ textAlign: "center" }}>
                    <Row className="mt-3">
                      <Col md={12} style={{ height: "200px" }}>
                        {user_type == "Property Manager" &&
                          property_data?.data?.status !== "Archived" && (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "10px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
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

                                {moment().isAfter(
                                  tenantInfoData?.folio?.paid_to
                                ) && (
                                    <div className="d-flex justify-content-center rounded align-items-center p-3 bg-danger">
                                      <div className="me-4 text-white d-flex justify-content-center align-items-center">
                                        <i
                                          className="fas fa-calendar text-light"
                                          style={{
                                            fontSize: "20px",
                                            marginTop: "0px",
                                          }}
                                        ></i>
                                        <span
                                          className="text-light"
                                          style={{
                                            margin: "10px",
                                          }}
                                        >
                                          {
                                            tenantInfoData?.folio?.rent_arrers
                                              ?.days
                                          }{" "}
                                          Days
                                        </span>
                                      </div>
                                      <div className="d-flex flex-column justify-content-center text-white">
                                        <p className="mb-0 text-light text-start">
                                          Rent Arrears
                                        </p>
                                        <p className="mb-0 text-light text-start">
                                          <b>
                                            {parseFloat(
                                              tenantInfoData?.folio?.rent_arrers
                                                ?.rent_due
                                            ).toFixed(2)}৳
                                          </b>
                                        </p>
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </>
                          )}
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>

            {/* <Row className="justify-content-center"> */}
            <Col md={12} lg={10} xs={12} className="p-0">
              <Card
                data-aos="fade-right"
                data-aos-once={true}
                style={{
                  borderRadius: "15px",
                  backgroundColor: "#F2F6FA",
                  border: "8px solid white",
                }}
              >
                <CardBody style={{ padding: "20px" }}>
                  {property_data?.data?.status === "Archived" && (
                    <Alert color="info">
                      <div className="d-flex justify-content-between">
                        <span className="font-size-20">
                          <i className="fas fa-archive"></i> Archived on{" "}
                          {moment(property_data?.updated_at).format(
                            "DD MMM YYYY"
                          )}
                        </span>
                        <Button
                          color="info"
                          className="btn btn-sm"
                          onClick={handleUndoArchive}
                        >
                          <i className="fas fa-undo-alt"></i> Restore
                        </Button>
                      </div>
                    </Alert>
                  )}
                  <div>
                    <Row className="d-flex justify-content-between">
                      <Col md={6}>
                        <h4 className="text-primary">Property</h4>
                      </Col>

                      {property_data?.data?.status !== "Archived" &&
                        user_type == "Property Manager" && (
                          <Col
                            style={{ cursor: "pointer" }}
                            md={6}
                            className="d-flex justify-content-end"
                          >
                            <Button
                              className="me-1"
                              color="labelColor"
                              onClick={() => inputFileProp.current.click()}
                            >
                              <i className="fas fa-cloud-upload-alt font-size-16 text-white"></i>
                            </Button>

                            <input
                              type="file"
                              onChange={e => handlePropertyFiles(e, id)}
                              ref={inputFileProp}
                              style={{ display: "none" }}
                              multiple
                            />
                            <Button
                              className="btn me-1"
                              color="labelColor"
                              onClick={() => inputFile.current.click()}
                            // style={{ height: "28px" }}
                            >
                              {" "}
                              <i className="bx bx-camera d-block font-size-16"></i>
                            </Button>
                            <input
                              type="file"
                              onChange={handleUploadImage}
                              ref={inputFile}
                              style={{ display: "none" }}
                              accept="image/*"
                              multiple
                            />

                            <Button
                              color="labelColor"
                              className="btn btn-sm me-1"
                              onClick={() =>
                                propertyEditBtn(property_data?.data.id)
                              }
                            // style={{ height: "28px" }}
                            >
                              <i className="fa fa-solid fa-pen font-size-16" />
                            </Button>

                            <Dropdown
                              isOpen={state.singlebtn1}
                              toggle={() =>
                                setState(prev => {
                                  return {
                                    ...prev,
                                    singlebtn1: !prev.singlebtn1,
                                  };
                                })
                              }
                              className="mt-4 mt-sm-0"
                            >
                              <DropdownToggle
                                className="btn btn-secondary btn-sm"
                                caret
                                style={{ padding: "10px" }}
                              >
                                Actions <i className="mdi mdi-chevron-down"></i>
                              </DropdownToggle>
                              <DropdownMenu>
                                {/* <DropdownItem>Action</DropdownItem> */}
                                <Link to={`/manageTenant/${id}`}>
                                  <DropdownItem>Manage Tenant</DropdownItem>
                                </Link>
                                <Link to={`/manageOwner/${id}`}>
                                  <DropdownItem>Manage Owner</DropdownItem>
                                </Link>

                                <Link to={`/saleInfo/${id}`}>
                                  <DropdownItem>Manage Sales</DropdownItem>
                                </Link>
                                {tenantInfoData?.folio && (
                                  <Link
                                    to={`/DashboardTenantInfo/${id}`}
                                    target="_blank"
                                  >
                                    <DropdownItem>
                                      Access as Tenant
                                    </DropdownItem>
                                  </Link>
                                )}
                                {property_data?.data?.owner_folio_id && (
                                  <Link to={`/info/${id}`} target="_blank">
                                    <DropdownItem>Access as Owner</DropdownItem>
                                  </Link>
                                )}
                                {property_data?.data?.status == "Active" && (
                                  <>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={handleArchive}>
                                      Archive
                                    </DropdownItem>
                                  </>
                                )}
                              </DropdownMenu>
                            </Dropdown>
                          </Col>
                        )}
                      <div
                        className="my-1"
                        style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                      />
                    </Row>

                    <Row>
                      <Col
                        md={7}
                        onDragOver={propertyDrag}
                        onDragLeave={propertyDragend}
                        onDrop={propertyDropFile}
                      >
                        {showDropZone.property ? (
                          <div
                            style={{
                              position: "relative",
                              height: "400px",
                              width: "100%",
                              border: "4px dashed grey",
                              borderRadius: "5px",
                            }}
                            onDrop={e => handlePropertyFilesdrop(e, id)}
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
                              <h4>Add document for property</h4>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {!showDropZone.property && (
                          <>
                            <Row>
                              <Col md={4} className="text-primary py-1">
                                Address
                              </Col>
                              <Col md={8} className="py-1">
                                {`${propertyAddress?.building_name || ""} ${propertyAddress?.unit || ""
                                  }${propertyAddress?.unit &&
                                    propertyAddress?.number
                                    ? "/"
                                    : ""
                                  }${propertyAddress?.number || ""} ${propertyAddress?.street || ""
                                  }, ${propertyAddress?.suburb || ""} ${propertyAddress?.state || ""
                                  } ${propertyAddress?.postcode || ""}`}
                              </Col>
                              <div
                                style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                              />
                            </Row>
                            {property_data?.data.floor_size &&
                              property_data?.data.floor_area ? (
                              <Row>
                                <Col md={4} className="text-primary py-2">
                                  {property_data?.data.floor_size
                                    ? "Floor area"
                                    : ""}
                                </Col>
                                <Col md={8} className="py-2">
                                  {property_data?.data.floor_size
                                    ? property_data?.data.floor_size +
                                    " " +
                                    property_data?.data.floor_area
                                    : ""}{" "}
                                </Col>
                                <div
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                />
                              </Row>
                            ) : (
                              ""
                            )}
                            {property_data?.data.land_size &&
                              property_data?.data.land_area ? (
                              <Row className="my-1">
                                <Col md={4} className="py-2 text-primary">
                                  {property_data?.data.land_size
                                    ? "Land area"
                                    : ""}
                                </Col>
                                <Col md={8} className="py-2">
                                  {property_data?.data.land_size
                                    ? property_data?.data.land_size +
                                    " " +
                                    property_data?.data.land_area
                                    : ""}{" "}
                                </Col>
                                <div
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                />
                              </Row>
                            ) : (
                              ""
                            )}
                            <Row className="my-1">
                              <Col md={4} className="py-2 text-primary">
                                Attributes
                              </Col>
                              <Col md={8} className="py-2">
                                <span className="badge square-pill bg-labelColor justify-content-center align-items-center p-2 m-1">
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      marginRight: "2px",
                                    }}
                                  >
                                    {property_data?.data.bedroom
                                      ? property_data.data.bedroom
                                      : 0}
                                  </span>{" "}
                                  <i className="fas fa-bed font-size-14 me-2"></i>
                                </span>

                                <span className="badge square-pill bg-success justify-content-center align-items-center p-2 m-1">
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      marginRight: "2px",
                                    }}
                                  >
                                    {property_data?.data.bathroom
                                      ? property_data.data.bathroom
                                      : 0}
                                  </span>{" "}
                                  <i className="fas fa-bath font-size-14 me-2"></i>
                                </span>

                                <span className="badge square-pill bg-warning justify-content-center align-items-center p-2 m-1">
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      marginRight: "2px",
                                    }}
                                  >
                                    {property_data?.data?.car_space
                                      ? property_data.data.car_space
                                      : 0}{" "}
                                  </span>
                                  <i className="fas fa-car font-size-14 me-2"></i>
                                </span>
                              </Col>
                              <div
                                style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                              />
                            </Row>

                            <Row className="my-1">
                              <Col md={4} className="text-primary py-2">
                                Type
                              </Col>
                              <Col md={8} className="py-2">
                                {property_data?.data?.property_type
                                  ? property_data?.data.property_type?.type
                                  : ""}
                              </Col>
                              <div
                                style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                              />
                            </Row>

                            <Row className="my-1">
                              <Col md={4} className="text-primary py-2">
                                Manager
                              </Col>
                              <Col md={8} className="py-2">
                                {property_data?.data?.manager_name
                                  ? property_data?.data?.manager_name
                                  : ""}
                              </Col>
                              <div
                                style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                              />
                            </Row>

                            {property_data?.data
                              .routine_inspection_due_date && (
                                <Row>
                                  <Col md={4} className="text-primary py-2">
                                    Inspection due
                                  </Col>

                                  <Col md={8} className="py-2">
                                    <span className="badge square-pill bg-labelColor justify-content-center align-items-center p-2">
                                      {property_data?.data
                                        .routine_inspection_due_date
                                        ? moment(
                                          property_data?.data
                                            .routine_inspection_due_date
                                        ).format("DD-MMM-YYYY")
                                        : ""}
                                    </span>
                                  </Col>
                                  <div
                                    style={{
                                      borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                  />
                                </Row>
                              )}

                            <Row className="my-1">
                              <Col md={4} className="text-primary py-2">
                                Key number
                              </Col>

                              <Col
                                md={8}
                                className="py-2"
                                onClick={() => tog_key_modal()}
                                style={{ cursor: "pointer" }}
                              >
                                {property_data?.data.key_number
                                  ? property_data?.data.key_number
                                  : ""}{" "}
                                &nbsp;
                                {props.property_key_data?.data?.data
                                  ?.check_type == "out" ? (
                                  <>
                                    <i
                                      className="mdi mdi-key-arrow-right text-danger"
                                      style={{
                                        fontSize: 20,
                                        position: "absolute",
                                      }}
                                    ></i>
                                    {moment().diff(
                                      moment(
                                        props.property_key_data?.data?.data
                                          ?.return_due
                                      ),
                                      "days"
                                    ) > 0 && (
                                        <span
                                          className="badge square-pill bg-danger justify-content-center align-items-center p-2 ms-2"
                                          ref={el => {
                                            if (el) {
                                              el.style.setProperty(
                                                "margin-left",
                                                "30px",
                                                "important"
                                              );
                                            }
                                          }}
                                        >
                                          {moment().diff(
                                            moment(
                                              props.property_key_data?.data?.data
                                                ?.return_due
                                            ),
                                            "days"
                                          )}{" "}
                                          {moment().diff(
                                            moment(
                                              props.property_key_data?.data?.data
                                                ?.return_due
                                            ),
                                            "days"
                                          ) > 1
                                            ? "DAYS"
                                            : "DAY"}{" "}
                                          OVERDUE
                                        </span>
                                      )}
                                  </>
                                ) : (
                                  <i
                                    className="mdi mdi-key-chain text-success"
                                    style={{
                                      fontSize: 20,
                                      position: "absolute",
                                      marginTop: -6,
                                    }}
                                  ></i>
                                )}
                              </Col>
                              <div
                                style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                              />
                            </Row>

                            <Row className="my-1">
                              <Col md={4} className="text-primary py-2">
                                Labels
                              </Col>
                              <Col
                                md={7}
                                className="py-2"
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  justifyContent: "flex-start",
                                }}
                              >
                                {level
                                  ? selectedLevel.map((item, key) => {
                                    return (
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                        }}
                                        key={key}
                                      >
                                        <span className="font-size-12 badge square-pill bg-labelColor float-start my-1 px-2 py-2 mx-1">
                                          {item}
                                        </span>
                                      </div>
                                    );
                                  })
                                  : null}{" "}
                                {level ? (
                                  <a
                                    onClick={() => {
                                      listEnable();
                                    }}
                                  >
                                    <i className="ms-2 fas fa-pencil-alt text-primary"></i>
                                  </a>
                                ) : (
                                  <>
                                    <TagsInput
                                      value={selectedLevel}
                                      onChange={e => {
                                        handleMulti3(e);
                                      }}
                                      name="level"
                                      placeHolder="Add a label"
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
                                style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                              />
                            </Row>

                            <Row className="my-1">
                              <Col md={4} className="py-2 text-primary">
                                Reminders
                              </Col>
                              <Col md={8} className="py-2">
                                <Link to={`/propertyReminders/${id}`}>
                                  {property_data?.data?.reminder_count || 0}{" "}
                                  reminders
                                </Link>
                              </Col>
                              <div
                                style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                              />
                            </Row>
                            {property_data?.data?.vr_link && (
                              <Row>
                                <Col md={4} className="py-2 text-primary">
                                  VR Link
                                </Col>
                                <Col md={8} className="py-2">
                                  <a
                                    className="badge rounded-pill bg-success justify-content-center align-items-center p-2"
                                    style={{ fontSize: 18 }}
                                    href={property_data?.data?.vr_link}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className="fas fa-vr-cardboard"></i>
                                  </a>
                                </Col>
                                <div
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                />
                              </Row>
                            )}

                            {property_data?.data?.youtube_link && (
                              <Row>
                                <Col md={4} className="py-2 text-primary">
                                  YouTube Link
                                </Col>
                                <Col md={8} className="py-2">
                                  <a
                                    className="badge rounded-pill bg-danger justify-content-center align-items-center p-2"
                                    style={{ fontSize: 18 }}
                                    href={property_data?.data?.youtube_link}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className="fab fa-youtube"></i>
                                  </a>
                                </Col>
                                <div
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                />
                              </Row>
                            )}

                            <Row className="my-1">
                              <Col md={4} className="py-2 text-primary">
                                Strata manager
                              </Col>
                              <Col md={8} className="py-2">
                                {property_data?.data ? (
                                  <Link
                                    to={`/contactsInfo/${property_data?.data?.stata_manager?.contact_id}`}
                                  >
                                    {property_data?.data?.stata_manager_name}
                                  </Link>
                                ) : (
                                  ""
                                )}
                              </Col>

                              <div
                                style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                              />
                            </Row>

                            {/* <Row>
                          <Col className="py-2 text-primary">Re-let</Col>
                          <Col className="py-2">
                            Yes{" "}
                            <i className="fas fa-pen font-size-14 text-primary ms-1"></i>
                          </Col>
                          <div
                            style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                          />
                        </Row> */}
                          </>
                        )}
                      </Col>

                      <Col
                        md={5}
                        onDragOver={propertyPhotoDrag}
                        onDragLeave={propertyPhotoDragend}
                        onDrop={propertyPhotoDropFile}
                      >
                        {showDropZone.propertyPhoto ? (
                          <div
                            style={{
                              position: "relative",
                              height: "400px",
                              width: "100%",
                              border: "4px dashed grey",
                              borderRadius: "5px",
                              objectFit: "cover",
                            }}
                            className="d-flex justify-content-end"
                            onDrop={e => handleUploadImageDropzone(e)}
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
                              <h4>Add photo for property</h4>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {!showDropZone.propertyPhoto ? (
                          <>
                            <div
                              style={{
                                border: "1px dashed #c9c8c3",
                                borderRadius: "2px",
                                height: "100%",
                                width: "100%",
                                objectFit: "contain",
                              }}
                              className="d-flex justify-content-end"
                            >
                              {slides?.length > 0 ? (
                                <>
                                  <Carousel
                                    previous={previousButton}
                                    next={nextButton}
                                    activeIndex={activeIndex}
                                    interval={null}
                                    style={{
                                      height: "100% !important",
                                      width: "100% !important",
                                      objectFit: "fill",
                                    }}
                                  >
                                    {slides}
                                    <CarouselControl
                                      directionText="Prev"
                                      direction={itemLength > 0 ? "prev" : ""}
                                      onClickHandler={previousButton}
                                    />
                                    <CarouselControl
                                      directionText="Next"
                                      direction={itemLength > 0 ? "next" : ""}
                                      onClickHandler={nextButton}
                                    />
                                  </Carousel>
                                  {showSliderState.isOpen && (
                                    <ImageModal
                                      openState={showSliderState.isOpen}
                                      toggle={showSlider}
                                      imageArray={
                                        props.property_info_data?.data?.data
                                          ?.property_images
                                      }
                                      component="property"
                                      apiCall={props.propertyImageDelete}
                                      activeIndex={activeIndex}
                                      setActiveIndex={setActiveIndex}
                                    ></ImageModal>
                                  )}
                                </>
                              ) : (
                                <img
                                  src={file}
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                            </div>
                            <div
                              style={{
                                marginTop: "-18px",
                                zIndex: 100,
                                height: "30px",
                                width: "100%",
                                textAlign: "center",
                                position: "absolute",
                                justifyContent: "center",
                              }}
                              className="d-flex justify-content-end"
                            >
                              <div
                                style={{
                                  width: "60px",
                                  backgroundColor: "#c9c8c3",
                                  height: "35px",
                                  margin: "auto",
                                  padding: "5px",
                                  display: "flex",
                                  gap: 2,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderRadius: "5px",
                                }}
                              >
                                <i
                                  className="bx bx-image-add"
                                  style={{ fontSize: "15px" }}
                                />
                                <span style={{ fontSize: "15px" }}>
                                  {
                                    props.property_info_data?.data?.data
                                      ?.property_images?.length
                                  }
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        {/* =======================yet another react lightbox start from here==================== */}

                        {/* <Lightbox
                          open={showSliderState.isOpen}
                          close={() => setShowSliderState({ isOpen: false })}
                          //slides={image_slides}
                          slides={image_slides}
                          plugins={[Zoom, Fullscreen, Video]}
                        /> */}

                        {/* =======================yet another react lightbox ends here=========================== */}

                        {/* <ImageModal openState={imageShowState} /> */}
                        {/* {props.percentage >= 0 && props.percentage != null ? (
                        <div className="mt-3">
                          <Progress
                            striped
                            color="info"
                            value={props.percentage}
                          ></Progress>
                          <p style={{ textAlign: "center" }}>
                            {props.percentage_detail}
                          </p>
                        </div>
                      ) : null} */}
                        {props.percentage_multiple >= 0 &&
                          props.percentage_multiple != null ? (
                          <div className="mt-3">
                            <Progress
                              striped
                              color="info"
                              value={props.percentage_multiple}
                            ></Progress>
                            <p style={{ textAlign: "center" }}>
                              {props.percentage_multiple_detail}
                            </p>
                          </div>
                        ) : null}
                      </Col>
                    </Row>

                    {/* )} */}
                  </div>
                </CardBody>
              </Card>

              {/* </ScrollAnimation> */}

              {saleInfoData ? (
                <>
                  <Card
                    data-aos="fade-left"
                    data-aos-once={true}
                    style={{
                      borderRadius: "15px",
                      backgroundColor: "#F2F6FA",
                      border: "8px solid white",
                    }}
                  >
                    <CardBody>
                      <div
                        className=""
                        onDragOver={saleDrag}
                        onDragLeave={saleDragend}
                        onDrop={saleDropFile}
                      >
                        <Row className="d-flex justify-content-between">
                          {" "}
                          <Col md={6} className="d-flex">
                            <Col>
                              <div className="text-primary d-flex align-items-center">
                                <i className="mdi mdi-home-currency-usd font-size-20 me-1"></i>
                                <div className="font-size-18">
                                  {" "}
                                  Sale Agreement
                                </div>
                              </div>
                            </Col>
                          </Col>
                          {user_type == "Property Manager" && (
                            <Col
                              style={{ cursor: "pointer" }}
                              md={6}
                              className="d-flex justify-content-end"
                            >
                              <Button
                                className="me-1"
                                color="light"
                                onClick={() => inputFileSale.current.click()}
                              >
                                <i className="fas fa-cloud-upload-alt font-size-20 text-info"></i>
                              </Button>
                              <input
                                type="file"
                                onChange={e =>
                                  handleSaleFiles(
                                    e,
                                    id,
                                    saleInfoData?.contact_id,
                                    saleInfoData?.id
                                  )
                                }
                                ref={inputFileSale}
                                style={{ display: "none" }}
                                multiple
                              />
                              {/* <Button type="button" className="ms-1 btn btn-info">
                              <i className="fa fa-regular fa-user" />
                            </Button> */}
                              <Button
                                type="button"
                                className="ms-1 btn btn-info"
                                onClick={() =>
                                  editSaleHandler(
                                    salesAndBuyerData?.sales_contact?.id,
                                    salesAndBuyerData?.has_buyer == "true"
                                      ? "3"
                                      : "2"
                                  )
                                }
                              >
                                <i className="fa fa-solid fa-pen" />
                              </Button>

                              <Button
                                type="button"
                                className="ms-1 btn btn-info"
                                onClick={() =>
                                  sellerFolioHandler(
                                    salesAndBuyerData?.sales_contact
                                      ?.contact_id,
                                    salesAndBuyerData?.sales_contact
                                      ?.folio_code,
                                    salesAndBuyerData?.sales_contact
                                      ?.seller_folio?.id
                                  )
                                }
                              >
                                <i className="fa fa-solid fa-dollar-sign" />
                              </Button>
                            </Col>
                          )}
                        </Row>
                        <div
                          className="my-1"
                          style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                        />
                        {showDropZone.sale ? (
                          <div
                            style={{
                              position: "relative",
                              height: "400px",
                              width: "100%",
                              border: "4px dashed grey",
                              borderRadius: "5px",
                            }}
                            onDrop={e =>
                              handleSaleDropFiles(
                                e,
                                id,
                                saleInfoData?.contact_id,
                                saleInfoData?.id
                              )
                            }
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
                              <h4>Add document to sale agreement</h4>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Row style={{ cursor: "pointer" }}>
                              <Col
                                className="d-flex flex-column justify-content-center"
                                style={{
                                  borderStyle: "dotted",
                                  borderWidth: "thin",
                                  borderColor: "#DCDCDC",
                                  backgroundColor: "#F0FFFF",
                                  height: "70px",
                                  width: "90px",
                                }}
                                md={1}
                              >
                                <span className="text-muted fw-bold d-flex justify-content-center">
                                  Money in
                                </span>
                                <span className="text-muted d-flex justify-content-center">
                                  {
                                    salesAndBuyerData?.sales_contact
                                      ?.seller_folio?.money_in
                                  }৳
                                </span>
                              </Col>
                              <Col
                                className="d-flex flex-column justify-content-center"
                                style={{
                                  borderStyle: "dotted",
                                  borderWidth: "thin",
                                  borderColor: "#DCDCDC",
                                  backgroundColor: "#F0FFFF",
                                  height: "70px",
                                  width: "90px",
                                }}
                                md={1}
                              >
                                <span className="text-muted fw-bold d-flex justify-content-center ps-3">
                                  Money out
                                </span>
                                <span className="text-muted d-flex justify-content-center">
                                  {
                                    salesAndBuyerData?.sales_contact
                                      ?.seller_folio?.money_out
                                  }৳
                                </span>
                              </Col>
                              <Col
                                className="d-flex flex-column justify-content-center"
                                style={{
                                  borderStyle: "dotted",
                                  borderWidth: "thin",
                                  borderColor: "#DCDCDC",
                                  backgroundColor: "#F0FFFF",
                                  height: "70px",
                                  width: "90px",
                                }}
                                md={1}
                              >
                                <span className="fw-bold d-flex justify-content-center ps-3">
                                  Bills pending
                                </span>
                                <span className="text-muted d-flex justify-content-center">
                                  {props.seller_info_property_data?.data
                                    ?.total_bill
                                    ? props.seller_info_property_data?.data
                                      ?.total_bill
                                    : "0.00"}৳
                                </span>
                              </Col>

                              <Col
                                className="d-flex flex-column justify-content-center"
                                style={{
                                  borderStyle: "dotted",
                                  borderWidth: "thin",
                                  borderColor: "#DCDCDC",
                                  backgroundColor: "#F0FFFF",
                                  height: "70px",
                                  width: "90px",
                                }}
                                md={1}
                              >
                                <span className="text-muted fw-bold d-flex justify-content-center">
                                  Balance
                                </span>
                                <span className="text-muted d-flex justify-content-center">
                                  {
                                    salesAndBuyerData?.sales_contact
                                      ?.seller_folio?.balance
                                  }৳
                                </span>
                              </Col>
                              <Col
                                className="d-flex flex-column justify-content-center"
                                style={{
                                  borderStyle: "dotted",
                                  borderWidth: "thin",
                                  borderColor: "#DCDCDC",
                                  backgroundColor: "#F0FFFF",
                                  height: "70px",
                                  width: "90px",
                                }}
                                md={1}
                              ></Col>
                              <Col
                                className=""
                                style={{
                                  borderStyle: "dotted",
                                  borderWidth: "thin",
                                  borderColor: "#DCDCDC",
                                  backgroundColor: "#F0FFFF",
                                  height: "70px",
                                  width: "90px",
                                }}
                                md={1}
                              ></Col>
                              <Col
                                className="d-flex flex-column justify-content-center"
                                style={{
                                  borderStyle: "dotted",
                                  borderWidth: "thin",
                                  borderColor: "#DCDCDC",
                                  backgroundColor: "#F0FFFF",
                                  height: "70px",
                                  width: "120px",
                                }}
                                md={1}
                              >
                                <span className="text-muted fw-bold d-flex justify-content-center">
                                  Status
                                </span>
                                {property_data?.data?.status != "Listed" ? (
                                  <span
                                    className="badge bg-success d-flex justify-content-center"
                                    style={{ fontSize: "13px" }}
                                  >
                                    {property_data?.data?.status}
                                  </span>
                                ) : (
                                  <span
                                    className="badge bg-warning d-flex justify-content-center"
                                    style={{ fontSize: "13px" }}
                                  >
                                    {property_data?.data?.status}
                                  </span>
                                )}
                              </Col>
                            </Row>

                            <div className="mt-3">
                              <Row className="py-1">
                                <Col md={6}>
                                  <Row className="py-1">
                                    <Col md={5}>
                                      <span className="text-primary">
                                        Seller
                                      </span>
                                    </Col>
                                    <Col md={7}>
                                      <Link
                                        to={`/contactsInfo/${saleInfoData?.contact_id}`}
                                      >
                                        {`${saleInfoData?.first_name} ${saleInfoData?.last_name}`}
                                      </Link>
                                    </Col>
                                  </Row>
                                  <div
                                    className="w-100"
                                    style={{
                                      borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                  />
                                </Col>
                                <Col md={6}>
                                  <Row className="py-1">
                                    <Col md={5}>
                                      <span className="text-primary">
                                        Folio
                                      </span>
                                    </Col>
                                    <Col md={7}>
                                      {`${saleInfoData?.reference}`}{" "}
                                      {`(${saleInfoData?.seller_folio?.folio_code})`}
                                    </Col>
                                  </Row>
                                  <div
                                    className="w-100"
                                    style={{
                                      borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                  />
                                </Col>
                              </Row>
                              <Row className="py-1">
                                {saleInfoData?.mobile_phone && (
                                  <Col md={6}>
                                    <>
                                      <Row className="py-1">
                                        <Col md={5}>
                                          <span className="text-primary">
                                            Seller Phone
                                          </span>
                                        </Col>
                                        <Col md={7}>
                                          <span>
                                            {/* {tenantInfoData?.data?.mobile_phone} */}
                                            {saleInfoData?.mobile_phone
                                              ? `(m) ${saleInfoData?.mobile_phone}`
                                              : ""}
                                          </span>
                                        </Col>
                                      </Row>
                                      <div
                                        className="w-100"
                                        style={{
                                          borderBottom: "1.2px dotted #c9c7c7",
                                        }}
                                      />
                                    </>
                                  </Col>
                                )}

                                <Col md={6}>
                                  <Row className="py-1">
                                    <Col md={5}>
                                      <span className="text-primary">
                                        Agreement
                                      </span>
                                    </Col>
                                    <Col md={7}>
                                      <span className="badge rounded-pill bg-secondary justify-content-center align-items-center p-2">
                                        from{" "}
                                        {moment(
                                          saleInfoData?.seller_folio
                                            ?.agreement_start
                                        ).format("DD MMM YYYY")}{" "}
                                        to{" "}
                                        {moment(
                                          saleInfoData?.seller_folio
                                            ?.agreement_end
                                        ).format("DD MMM YYYY")}
                                      </span>
                                    </Col>
                                  </Row>{" "}
                                  <div
                                    className="w-100"
                                    style={{
                                      borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col md={6}>
                                  <Row className="py-1">
                                    <Col md={5}>
                                      <span className="text-primary">
                                        Seller email
                                      </span>
                                    </Col>
                                    <Col md={7}>
                                      <span>{saleInfoData?.email}</span>
                                    </Col>
                                  </Row>
                                  <div
                                    className="w-100"
                                    style={{
                                      borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                  />
                                </Col>

                                {salesAndBuyerData?.has_buyer == "true" &&
                                  salesAndBuyerData?.buyer_contact?.buyer_folio
                                    ?.deposit_due ? (
                                  <Col md={6}>
                                    <Row className="py-1">
                                      <Col md={5}>
                                        <span className="text-primary">
                                          Deposit Due
                                        </span>
                                      </Col>
                                      <Col md={7}>
                                        <span className="badge rounded-pill bg-warning justify-content-center align-items-center p-2">
                                          {salesAndBuyerData?.buyer_contact
                                            ?.buyer_folio?.deposit_due
                                            ? moment(
                                              salesAndBuyerData?.buyer_contact
                                                ?.buyer_folio?.deposit_due
                                            ).format("DD MMM YYYY")
                                            : ""}
                                        </span>
                                      </Col>
                                    </Row>{" "}
                                    <div
                                      className="w-100"
                                      style={{
                                        borderBottom: "1.2px dotted #c9c7c7",
                                      }}
                                    />
                                  </Col>
                                ) : (
                                  ""
                                )}
                              </Row>
                              <Row className="py-1">
                                <Col md={6}>
                                  <Row className="py-1">
                                    <Col md={5}>
                                      <span className="text-primary">
                                        Asking price
                                      </span>
                                    </Col>
                                    <Col md={7}>
                                      <span className="text-primary">
                                        {saleInfoData?.seller_folio
                                          ?.asking_price
                                          ? `${saleInfoData?.seller_folio?.asking_price}৳`
                                          : "0.00৳"}
                                      </span>
                                    </Col>
                                  </Row>
                                  <div
                                    className="w-100"
                                    style={{
                                      borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                  />
                                </Col>

                                {salesAndBuyerData?.has_buyer == "true" &&
                                  salesAndBuyerData?.buyer_contact?.buyer_folio
                                    ?.contract_exchange ? (
                                  <Col md={6}>
                                    <Row className="py-1">
                                      <Col md={5}>
                                        <span className="text-primary">
                                          Contract Exchange
                                        </span>
                                      </Col>
                                      <Col md={7}>
                                        <span className="badge rounded-pill bg-warning justify-content-center align-items-center p-2">
                                          {salesAndBuyerData?.buyer_contact
                                            ?.buyer_folio?.contract_exchange
                                            ? moment(
                                              salesAndBuyerData?.buyer_contact
                                                ?.buyer_folio
                                                ?.contract_exchange
                                            ).format("DD MMM YYYY")
                                            : ""}
                                        </span>
                                      </Col>
                                    </Row>{" "}
                                    <div
                                      className="w-100"
                                      style={{
                                        borderBottom: "1.2px dotted #c9c7c7",
                                      }}
                                    />
                                  </Col>
                                ) : (
                                  ""
                                )}
                              </Row>

                              {salesAndBuyerData?.has_buyer == "true" && (
                                <Row className="py-1">
                                  <Col md={6}>
                                    <Row className="py-1">
                                      <Col md={5}>
                                        <span className="text-primary">
                                          Purchase price
                                        </span>
                                      </Col>
                                      <Col md={7}>
                                        <span className="text-primary">
                                          {salesAndBuyerData?.buyer_contact
                                            ?.buyer_folio?.purchase_price
                                            ? `${salesAndBuyerData?.buyer_contact?.buyer_folio?.purchase_price}৳`
                                            : "0.00৳"}
                                        </span>
                                      </Col>
                                    </Row>
                                    <div
                                      className="w-100"
                                      style={{
                                        borderBottom: "1.2px dotted #c9c7c7",
                                      }}
                                    />
                                  </Col>

                                  {salesAndBuyerData?.buyer_contact?.buyer_folio
                                    ?.settlement_due && (
                                      <Col md={6}>
                                        <Row className="py-1">
                                          <Col md={5}>
                                            <span className="text-primary">
                                              Settlement
                                            </span>
                                          </Col>
                                          <Col md={7}>
                                            <span className="badge rounded-pill bg-success justify-content-center align-items-center p-2">
                                              {salesAndBuyerData?.buyer_contact
                                                ?.buyer_folio?.settlement_due
                                                ? moment(
                                                  salesAndBuyerData
                                                    ?.buyer_contact?.buyer_folio
                                                    ?.settlement_due
                                                ).format("DD MMM YYYY")
                                                : ""}
                                            </span>
                                          </Col>
                                        </Row>{" "}
                                        <div
                                          className="w-100"
                                          style={{
                                            borderBottom: "1.2px dotted #c9c7c7",
                                          }}
                                        />
                                      </Col>
                                    )}
                                </Row>
                              )}
                              {salesAndBuyerData?.has_buyer == "true" && (
                                <Row className="py-1">
                                  <Col md={6}>
                                    <Row className="py-1">
                                      <Col md={5}>
                                        <span className="text-primary">
                                          Buyer
                                        </span>
                                      </Col>
                                      <Col md={7}>
                                        <span>
                                          {/* <Link
                                          to={`/contactsInfo/${salesAndBuyerData?.buyer_contact?.contact_id}`}
                                        > */}
                                          {
                                            salesAndBuyerData?.buyer_contact
                                              ?.reference
                                          }
                                          {/* </Link> */}
                                        </span>
                                      </Col>
                                    </Row>
                                    <div
                                      className="w-100"
                                      style={{
                                        borderBottom: "1.2px dotted #c9c7c7",
                                      }}
                                    />
                                  </Col>

                                  {/* <Col md={6}>
                            <Row className="py-1">
                              <Col md={5}>
                                <span className="text-primary">
                                  Settlement
                                </span>
                              </Col>
                              <Col md={7}>
                                {moment(salesAndBuyerData?.buyer_contact?.buyer_folio?.settlement_due).format("DD-MMM-YYYY")}
                              </Col>
                            </Row>{" "}
                            <div
                              className="w-100"
                              style={{
                                borderBottom: "1.2px dotted #c9c7c7",
                              }}
                            />
                          </Col> */}
                                </Row>
                              )}
                              {(salesAndBuyerData?.has_buyer == "true" &&
                                salesAndBuyerData?.buyer_contact?.work_phone) ||
                                salesAndBuyerData?.buyer_contact?.mobile_phone ? (
                                <Row className="py-1">
                                  <Col md={6}>
                                    <Row className="py-1">
                                      <Col md={5}>
                                        <span className="text-primary">
                                          Buyer phone
                                        </span>
                                      </Col>
                                      <Col md={7}>
                                        <span>
                                          {`(w) ${salesAndBuyerData?.buyer_contact
                                            ?.work_phone || ""
                                            } ${salesAndBuyerData?.buyer_contact
                                              ?.mobile_phone || ""
                                            }`}
                                        </span>
                                      </Col>
                                    </Row>
                                    <div
                                      className="w-100"
                                      style={{
                                        borderBottom: "1.2px dotted #c9c7c7",
                                      }}
                                    />
                                  </Col>
                                </Row>
                              ) : (
                                ""
                              )}
                              {salesAndBuyerData?.has_buyer == "true" && (
                                <Row className="py-1">
                                  <Col md={6}>
                                    <Row className="py-1">
                                      <Col md={5}>
                                        <span className="text-primary">
                                          Buyer email
                                        </span>
                                      </Col>
                                      <Col md={7}>
                                        <span>
                                          {
                                            salesAndBuyerData?.buyer_contact
                                              ?.email
                                          }
                                        </span>
                                      </Col>
                                    </Row>
                                    <div
                                      className="w-100"
                                      style={{
                                        borderBottom: "1.2px dotted #c9c7c7",
                                      }}
                                    />
                                  </Col>
                                </Row>
                              )}

                              {salesAndBuyerData?.has_buyer == "true" && (
                                <Row>
                                  <Col md={6}>
                                    <Row className="py-1">
                                      <Col md={5}>
                                        <span className="text-primary">
                                          Commission
                                        </span>
                                      </Col>
                                      <Col md={7}>
                                        <span>
                                          {salesAndBuyerData?.buyer_contact
                                            ?.buyer_folio?.commission
                                            ? `${salesAndBuyerData?.buyer_contact?.buyer_folio?.commission}৳`
                                            : ""}
                                        </span>
                                      </Col>
                                    </Row>
                                    <div
                                      className="w-100"
                                      style={{
                                        borderBottom: "1.2px dotted #c9c7c7",
                                      }}
                                    />
                                  </Col>
                                </Row>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </>
              ) : null}

              {tenantInfoData && tenantInfoData?.folio ? (
                <>
                  <Card
                    data-aos="fade-left"
                    data-aos-once={true}
                    style={{
                      borderRadius: "15px",
                      backgroundColor: "#F2F6FA",
                      border: "8px solid white",
                    }}
                  >
                    <CardBody>
                      <div
                        onDragOver={tenantDrag}
                        onDragLeave={tenantDragend}
                        onDrop={tenantDropFile}
                      >
                        <Row className="d-flex justify-content-between">
                          {" "}
                          <Col md={6} className="d-flex">
                            <Col>
                              <h4 className="text-primary">
                                <i className="bx bxs-group font-size-20 me-1"></i>
                                Tenant
                              </h4>
                            </Col>
                          </Col>
                          {user_type == "Property Manager" && (
                            <Col
                              style={{ cursor: "pointer" }}
                              md={6}
                              className="d-flex justify-content-end"
                            >
                              <Button
                                color="labelColor"
                                onClick={() => inputFileTenant.current.click()}
                              >
                                <i className="fas fa-cloud-upload-alt font-size-16 text-white"></i>
                              </Button>
                              <input
                                type="file"
                                onChange={e =>
                                  handleTenantFiles(
                                    e,
                                    id,
                                    tenantInfoData?.data?.contact_id,
                                    tenantInfoData?.data?.id
                                  )
                                }
                                ref={inputFileTenant}
                                style={{ display: "none" }}
                                multiple
                              />
                              <Button
                                className="ms-1 btn btn-labelColor"
                                color="info"
                                onClick={toggleCalculationRent}
                              >
                                <i className="fas fa-calculator"></i>
                              </Button>
                              {rentCalculationState && (
                                <RentCalculation
                                  toggleCalculationRent={toggleCalculationRent}
                                  rentCalculationState={rentCalculationState}
                                  propertyId={id}
                                ></RentCalculation>
                              )}
                              <Button
                                type="button"
                                className="ms-1 btn btn-labelColor"
                                onClick={() => {
                                  tenantEditHandler(
                                    tenantInfoData?.data?.id,
                                    2
                                  );
                                }}
                              >
                                <i className="fa fa-solid fa-pen" />
                              </Button>

                              <Button
                                type="button"
                                className="ms-1 btn btn-labelColor"
                                onClick={() => {
                                  tenantFolioHandler(
                                    tenantInfoData?.data?.contact_id,
                                    tenantInfoData?.data?.id,
                                    tenantInfoData?.folio?.id
                                  );
                                }}
                              >
                                <i className="fa fa-solid fa-dollar-sign" />
                              </Button>
                            </Col>
                          )}
                          <div
                            className="my-1"
                            style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                          />
                          {showDropZone.tenant ? (
                            <div
                              style={{
                                position: "relative",
                                height: "400px",
                                width: "100%",
                                border: "4px dashed grey",
                                borderRadius: "5px",
                              }}
                              onDrop={e =>
                                handleTenantDropFiles(
                                  e,
                                  id,
                                  tenantInfoData?.data?.contact_id,
                                  tenantInfoData?.data?.id
                                )
                              }
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
                                <h4>Add document to tenant</h4>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </Row>
                        {!showDropZone.tenant && (
                          <Row
                            style={{ cursor: "pointer" }}
                            className="d-flex flex-wrap p-1"
                            onClick={() => {
                              tenantFolioHandler(
                                tenantInfoData?.data?.contact_id,
                                tenantInfoData?.data?.id,
                                tenantInfoData?.folio?.id
                              );
                            }}
                          >
                            <Col
                              className="d-flex flex-column justify-content-center"
                              style={{
                                borderStyle: "dotted",
                                borderWidth: "thin",
                                borderColor: "#DCDCDC",
                                backgroundColor: "#FFFFFF",
                                height: "70px",
                                borderRadius: "8px",
                                marginRight: "10px",
                              }}
                              md={2}
                            >
                              <span className="text-muted fw-bold d-flex justify-content-center">
                                Paid to
                              </span>
                              <span className="text-muted d-flex justify-content-center">
                                {paidToData ? paidToData : "0.00"}
                              </span>
                            </Col>
                            <Col
                              className="d-flex flex-column justify-content-center"
                              style={{
                                borderStyle: "dotted",
                                borderWidth: "thin",
                                borderColor: "#DCDCDC",
                                backgroundColor: "#FFFFFF",
                                height: "70px",
                                borderRadius: "8px",
                                marginRight: "10px",
                              }}
                              md={2}
                            >
                              <span className="text-muted fw-bold d-flex justify-content-center">
                                Part Paid
                              </span>
                              <span className="text-muted d-flex justify-content-center">
                                {tenantInfoData?.folio?.part_paid
                                  ? tenantInfoData?.folio?.part_paid
                                  : "0.00"}৳
                              </span>
                            </Col>

                            <Col
                              className="d-flex flex-column justify-content-center"
                              style={{
                                borderStyle: "dotted",
                                borderWidth: "thin",
                                borderColor: "#DCDCDC",
                                backgroundColor: "#FFFFFF",
                                height: "70px",
                                borderRadius: "8px",
                                marginRight: "10px",
                              }}
                              md={2}
                            >
                              <span className="text-muted fw-bold d-flex justify-content-center">
                                Deposits
                              </span>
                              <span className="text-muted d-flex justify-content-center">
                                {tenantInfoData?.folio?.deposit
                                  ? tenantInfoData?.folio?.deposit + "৳"
                                  : "0.00৳"}
                              </span>
                            </Col>

                            <Col
                              className="d-flex flex-column justify-content-center"
                              style={{
                                borderTop: "dotted",
                                borderWidth: "thin",
                                borderColor: "#DCDCDC",
                              }}
                            ></Col>
                            <Col
                              className=""
                              style={{
                                borderTop: "dotted",
                                borderWidth: "thin",
                                borderColor: "#DCDCDC",
                              }}
                            ></Col>
                            <Col
                              className=""
                              style={{
                                borderTop: "dotted",
                                borderWidth: "thin",
                                borderColor: "#DCDCDC",
                              }}
                            ></Col>
                          </Row>
                        )}
                        {!showDropZone.tenant && (
                          <div className="mt-3">
                            <Row>
                              <Col md={6}>
                                <Row className="py-1">
                                  <Col md={5}>
                                    <span className="text-primary">
                                      Contact
                                    </span>
                                  </Col>
                                  <Col md={7}>
                                    <Link
                                      to={`/contactsInfo/${tenantInfoData?.data?.contact_id}`}
                                    >
                                      {tenantInfoData?.data?.first_name &&
                                        tenantInfoData?.data.last_name
                                        ? `${tenantInfoData?.data?.first_name} ${tenantInfoData?.data.last_name}`
                                        : ""}
                                    </Link>
                                  </Col>
                                </Row>
                                <div
                                  className="w-100"
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                />
                              </Col>
                              {tenantInfoData?.folio?.folio_code && (
                                <Col md={6}>
                                  <Row className="py-1">
                                    <Col md={5}>
                                      <span className="text-primary">
                                        Folio
                                      </span>
                                    </Col>
                                    <Col md={7} style={{ cursor: "pointer" }}>
                                      <span
                                        className="text-primary"
                                        onClick={() => {
                                          tenantFolioHandler(
                                            tenantInfoData?.data?.contact_id,
                                            tenantInfoData?.data?.id,
                                            tenantInfoData?.folio?.id
                                          );
                                        }}
                                      >
                                        {tenantInfoData?.data?.reference
                                          ? `${tenantInfoData?.data?.reference}`
                                          : ""}{" "}
                                        {`(${tenantInfoData?.folio?.folio_code})`}
                                      </span>
                                    </Col>
                                  </Row>
                                  <div
                                    className="w-100"
                                    style={{
                                      borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                  />
                                </Col>
                              )}
                            </Row>
                            <Row>
                              {tenantInfoData?.data?.mobile_phone ? (
                                <Col md={6}>
                                  <Row className="py-1">
                                    <Col md={5}>
                                      <span className="text-primary">
                                        Phone
                                      </span>
                                    </Col>
                                    <Col md={7}>
                                      <span>
                                        {tenantInfoData?.data?.mobile_phone}
                                      </span>
                                    </Col>
                                  </Row>
                                  <div
                                    className="w-100"
                                    style={{
                                      borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                  />
                                </Col>
                              ) : (
                                ""
                              )}
                              {tenantInfoData?.data?.email ? (
                                <Col md={6}>
                                  <Row className="py-1">
                                    <Col md={5}>
                                      <span className="text-primary">
                                        Email
                                      </span>
                                    </Col>
                                    <Col md={7}>
                                      <span>
                                        {tenantInfoData?.data?.email
                                          ? tenantInfoData?.data?.email
                                          : ""}
                                      </span>
                                    </Col>
                                  </Row>{" "}
                                  <div
                                    className="w-100"
                                    style={{
                                      borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                  />
                                </Col>
                              ) : (
                                ""
                              )}
                            </Row>
                            <Row>
                              <Col md={6}>
                                <Row className="py-1">
                                  <Col md={5}>
                                    <span className="text-primary">Rent </span>
                                  </Col>
                                  <Col md={7}>
                                    <span>
                                      {tenantInfoData?.folio?.rent || "0.00"}৳
                                    </span>
                                  </Col>
                                </Row>
                                <div
                                  className="w-100"
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                />
                              </Col>

                              {tenantInfoData?.folio?.bond_required && (
                                <Col md={6}>
                                  <Row className="py-1">
                                    <Col md={5}>
                                      <span className="text-primary">
                                        Bond{" "}
                                      </span>
                                    </Col>
                                    <Col md={7}>
                                      <span>
                                        {`${tenantInfoData?.folio?.bond_required}৳ bond required, ${tenantInfoData?.folio?.bond_held}৳ held`}
                                      </span>
                                    </Col>
                                  </Row>{" "}
                                  <div
                                    className="w-100"
                                    style={{
                                      borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                  />
                                </Col>
                              )}
                            </Row>
                            <Row>
                              <Col md={6}>
                                <Row className="py-1">
                                  <Col md={5}>
                                    <span className="text-primary">
                                      Rent period
                                    </span>
                                  </Col>
                                  <Col md={7}>
                                    <span className="badge square-pill bg-labelColor justify-content-center align-items-center p-2">
                                      {tenantInfoData?.folio?.rent_type}
                                    </span>
                                  </Col>
                                </Row>
                                <div
                                  className="w-100"
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                />
                              </Col>

                              <Col md={6}>
                                <Row className="py-1">
                                  <Col md={5}>
                                    <span className="text-primary">
                                      Rent review{" "}
                                    </span>
                                  </Col>
                                  <Col md={7}>
                                    {moment(
                                      tenantInfoData?.folio?.next_rent_review ||
                                      ""
                                    ).format("DD MMM YYYY")}
                                  </Col>
                                </Row>{" "}
                                <div
                                  className="w-100"
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <Row className="py-1">
                                  <Col md={5}>
                                    <span className="text-primary">
                                      Moved in
                                    </span>
                                  </Col>
                                  <Col md={7}>
                                    <span className="badge square-pill bg-success justify-content-center align-items-center p-2">
                                      {tenantInfoData?.folio?.move_in
                                        ? moment(
                                          tenantInfoData?.folio?.move_in
                                        ).format("DD MMM YYYY")
                                        : ""}
                                    </span>
                                  </Col>
                                </Row>
                                <div
                                  className="w-100 "
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                />
                              </Col>
                              <Col md={6}>
                                <Row className="py-1">
                                  <Col md={5}>
                                    <span className="text-primary">
                                      Arrears automation
                                    </span>
                                  </Col>
                                  <Col md={7}>
                                    <span>
                                      {tenantInfoData?.folio
                                        ?.exclude_form_arrears === 1
                                        ? "Yes"
                                        : "No"}
                                    </span>
                                  </Col>
                                </Row>
                                <div
                                  className="w-100"
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                />
                              </Col>
                            </Row>

                            {tenantInfoData?.folio?.move_out && (
                              <Row>
                                <Col md={6}>
                                  <Row className="py-1">
                                    <Col md={5}>
                                      <span className="text-primary">
                                        Moved out
                                      </span>
                                    </Col>
                                    <Col md={7}>
                                      <span className="badge rounded-pill bg-success justify-content-center align-items-center p-2">
                                        {tenantInfoData?.folio?.move_out
                                          ? moment(
                                            tenantInfoData?.folio?.move_out
                                          ).format("DD MMM YYYY")
                                          : ""}
                                      </span>
                                    </Col>
                                  </Row>
                                  <div
                                    className="w-100 "
                                    style={{
                                      borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                  />
                                </Col>
                              </Row>
                            )}

                            <Row>
                              <Col md={6}>
                                <Row className="py-1">
                                  <Col md={5}>
                                    <span className="text-primary">
                                      Agreement{" "}
                                    </span>
                                  </Col>
                                  <Col md={7}>
                                    <span className="badge square-pill bg-warning justify-content-center align-items-center p-2">
                                      From{" "}
                                      {tenantInfoData?.folio?.agreement_start
                                        ? moment(
                                          tenantInfoData?.folio
                                            ?.agreement_start
                                        ).format("DD MMM YYYY")
                                        : ""}{" "}
                                      to{" "}
                                      {tenantInfoData?.folio?.agreement_end
                                        ? moment(
                                          tenantInfoData?.folio?.agreement_end
                                        ).format("DD MMM YYYY")
                                        : ""}
                                    </span>
                                    <a
                                      onClick={() => {
                                        tog_periodic_modal();
                                      }}
                                    >
                                      <i className="ms-2 fas fa-pencil-alt text-primary"></i>
                                    </a>
                                  </Col>
                                </Row>
                                <div
                                  className="w-100 "
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                />
                              </Col>
                              {tenantInfoData?.folio?.bank_reterence && (
                                <Col md={6}>
                                  <Row className="py-1">
                                    <Col md={5}>
                                      <span className="text-primary">
                                        Bank Reference
                                      </span>
                                    </Col>
                                    <Col md={7}>
                                      <span className="">
                                        {tenantInfoData?.folio
                                          ?.bank_reterence || ""}
                                      </span>
                                    </Col>
                                  </Row>
                                  <div
                                    className="w-100 "
                                    style={{
                                      borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                  />
                                </Col>
                              )}
                            </Row>
                            <Row>
                              <Col md={6}>
                                <Row className="py-1">
                                  <Col md={5}>
                                    <span className="text-primary">
                                      Periodic Tendency{" "}
                                    </span>
                                  </Col>
                                  <Col md={7}>
                                    <span>
                                      {tenantInfoData?.folio
                                        ?.periodic_tenancy === 0
                                        ? "No"
                                        : "Yes"}
                                    </span>
                                  </Col>
                                </Row>
                                <div
                                  className="w-100 "
                                  style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                />
                              </Col>
                              <Col md={6}></Col>
                            </Row>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </>
              ) : null}

              {property_data?.data?.owner_folio_id ? (
                <>
                  <Card
                    data-aos="fade-right"
                    data-aos-once={true}
                    style={{
                      borderRadius: "15px",
                      backgroundColor: "#F2F6FA",
                      border: "8px solid white",
                    }}
                  >
                    <CardBody>
                      <div
                        onDragOver={ownerDrag}
                        onDragLeave={ownerDragend}
                        onDrop={ownerDropFile}
                      >
                        <div className="">
                          <Row className="d-flex justify-content-between">
                            {" "}
                            <Col md={6} className="d-flex">
                              <Col>
                                <h4 className="text-primary">
                                  <i className="fas fa-home me-2"></i>Owner
                                </h4>
                              </Col>
                            </Col>
                            {user_type == "Property Manager" && (
                              <Col
                                style={{ cursor: "pointer" }}
                                md={6}
                                className="d-flex justify-content-end"
                              >
                                <Button
                                  //className="me-1"
                                  color="labelColor"
                                  onClick={() =>
                                    inputFileTenant.current.click()
                                  }
                                >
                                  <i className="fas fa-cloud-upload-alt font-size-16 text-white"></i>
                                </Button>
                                <input
                                  type="file"
                                  onChange={e =>
                                    handleOwnerFiles(
                                      e,
                                      id,
                                      property_data?.data?.current_owner
                                        ?.contact_id,
                                      property_data?.data?.current_owner?.id
                                    )
                                  }
                                  ref={inputFileOwner}
                                  style={{ display: "none" }}
                                  multiple
                                />
                                <Button
                                  type="button"
                                  className="ms-1 btn btn-labelColor"
                                  onClick={() => {
                                    ownerEditHandler(
                                      property_data?.data?.current_owner?.id,
                                      2,
                                      property_data?.data?.current_owner_folio
                                        ?.id,
                                      id
                                    );
                                  }}
                                >
                                  <i className="fa fa-solid fa-pen" />
                                </Button>
                                <Button
                                  type="button"
                                  className="ms-1 btn btn-labelColor"
                                  onClick={() => {
                                    ownerFolioHandler(
                                      property_data?.data?.current_owner
                                        ?.contact_id,
                                      property_data?.data?.current_owner?.id,
                                      property_owner_info_data?.folio_code,
                                      property_owner_info_data?.id
                                    );
                                  }}
                                >
                                  <i className="fa fa-solid fa-dollar-sign" />
                                </Button>
                              </Col>
                            )}
                            <div
                              className="my-1"
                              style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                            />
                            {showDropZone.owner ? (
                              <div
                                style={{
                                  position: "relative",
                                  height: "400px",
                                  width: "100%",
                                  border: "4px dashed grey",
                                  borderRadius: "5px",
                                }}
                                onDrop={e =>
                                  handleOwnerDropFiles(
                                    e,
                                    id,
                                    property_data?.data?.current_owner
                                      ?.contact_id,
                                    property_data?.data?.current_owner?.id
                                  )
                                }
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
                                  <h4>Add document to Owner</h4>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </Row>
                          {!showDropZone.owner && (
                            <Row
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                ownerFolioHandler(
                                  property_data?.data?.current_owner
                                    ?.contact_id,
                                  property_data?.data?.current_owner?.id,
                                  property_owner_info_data?.folio_code,
                                  property_owner_info_data?.id
                                );
                              }}
                              className="d-flex"
                            >
                              <Col
                                md={1}
                                className="d-flex flex-column justify-content-center"
                                style={{
                                  borderStyle: "dotted",
                                  borderWidth: "thin",
                                  borderColor: "#DCDCDC",
                                  backgroundColor: "#FFFFFF",
                                  height: "70px",
                                  width: "90px",
                                  borderRadius: "8px",
                                  marginRight: "10px",
                                }}
                              >
                                <span className="text-muted fw-bold d-flex justify-content-center">
                                  Opening
                                </span>
                                <span className="text-muted d-flex justify-content-center">
                                  {property_owner_info_data?.opening_balance ||
                                    "0.00"}৳
                                </span>
                              </Col>

                              <Col
                                md={1}
                                className="d-flex flex-column justify-content-center"
                                style={{
                                  borderStyle: "dotted",
                                  borderWidth: "thin",
                                  borderColor: "#DCDCDC",
                                  backgroundColor: "#FFFFFF",
                                  height: "70px",
                                  width: "90px",
                                  borderRadius: "8px",
                                  marginRight: "10px",
                                }}
                              >
                                <span className="text-muted fw-bold d-flex justify-content-center">
                                  Money in
                                </span>
                                <span className="text-muted d-flex justify-content-center">
                                  {property_owner_info_data?.money_in || "0.00"}৳
                                </span>
                              </Col>

                              <Col
                                md={1}
                                className="d-flex flex-column justify-content-center"
                                style={{
                                  borderStyle: "dotted",
                                  borderWidth: "thin",
                                  borderColor: "#DCDCDC",
                                  backgroundColor: "#FFFFFF",
                                  height: "70px",
                                  width: "90px",
                                  borderRadius: "8px",
                                  marginRight: "10px",
                                }}
                              >
                                <span className="text-muted fw-bold ps-3 d-flex justify-content-center">
                                  Money out
                                </span>
                                <span className="text-muted d-flex justify-content-center">
                                  {property_owner_info_data?.money_out ||
                                    "0.00"}৳
                                </span>
                              </Col>

                              <Col
                                md={1}
                                className="d-flex flex-column justify-content-center"
                                style={{
                                  borderStyle: "dotted",
                                  borderWidth: "thin",
                                  borderColor: "#DCDCDC",
                                  backgroundColor: "#FFFFFF",
                                  height: "70px",
                                  width: "90px",
                                  borderRadius: "8px",
                                  marginRight: "10px",
                                }}
                              >
                                <span className="text-muted fw-bold d-flex justify-content-center">
                                  Uncleared
                                </span>
                                <span className="text-muted d-flex justify-content-center">
                                  {property_owner_info_data?.uncleared ||
                                    "0.00"}৳
                                </span>
                              </Col>

                              <Col
                                md={1}
                                className="d-flex flex-column justify-content-center"
                                style={{
                                  borderStyle: "dotted",
                                  borderWidth: "thin",
                                  borderColor: "#DCDCDC",
                                  backgroundColor: "#FFFFFF",
                                  height: "70px",
                                  width: "90px",
                                  borderRadius: "8px",
                                  marginRight: "10px",
                                }}
                              >
                                <span className="text-muted fw-bold d-flex justify-content-center">
                                  Bills pending
                                </span>
                                <span className="text-muted d-flex justify-content-center">
                                  {property_pending_bill?.total_bills_amount_sum_amount
                                    ? property_pending_bill?.total_bills_amount_sum_amount
                                    : "0.00"}৳
                                </span>
                              </Col>

                              <Col
                                md={1}
                                className="d-flex flex-column justify-content-end"
                                style={{
                                  borderStyle: "dotted",
                                  borderWidth: "thin",
                                  borderColor: "#DCDCDC",
                                  backgroundColor: "#FFFFFF",
                                  height: "70px",
                                  width: "90px",
                                  borderRadius: "8px",
                                  marginRight: "10px",
                                }}
                              >
                                <span className="text-muted fw-bold d-flex justify-content-center">
                                  Invoices pending
                                </span>

                                <span className="text-muted d-flex justify-content-center">
                                  {property_data?.pending_invoice_bill
                                    ? property_data?.pending_invoice_bill
                                    : "0.00"}৳
                                </span>
                              </Col>

                              <Col
                                md={1}
                                className="d-flex flex-column justify-content-center"
                                style={{
                                  borderStyle: "dotted",
                                  borderWidth: "thin",
                                  borderColor: "#DCDCDC",
                                  backgroundColor: "#FFFFFF",
                                  height: "70px",
                                  width: "90px",
                                  borderRadius: "8px",
                                  marginRight: "10px",
                                }}
                              >
                                <span className="text-muted fw-bold d-flex justify-content-center">
                                  Withhold
                                </span>
                                <span className="text-muted d-flex justify-content-center">
                                  {property_owner_info_data?.withhold_amount
                                    ? property_owner_info_data?.withhold_amount
                                    : "0.00"}৳
                                </span>
                              </Col>

                              <Col
                                md={1}
                                className="d-flex flex-column justify-content-center"
                                style={{
                                  borderStyle: "dotted",
                                  borderWidth: "thin",
                                  borderColor: "#DCDCDC",
                                  backgroundColor: "#FFFFFF",
                                  height: "70px",
                                  width: "90px",
                                  borderRadius: "8px",
                                  marginRight: "10px",
                                }}
                              >
                                <span className="text-muted fw-bold d-flex justify-content-center">
                                  Balance
                                </span>
                                <span className="text-muted d-flex justify-content-center">
                                  {+property_owner_info_data?.money_in +
                                    (property_owner_info_data?.opening_balance
                                      ? +property_owner_info_data?.opening_balance
                                      : 0) ==
                                    "0"
                                    ? "0.00"
                                    : totalBalance > 0
                                      ? totalBalance
                                      : "0.00"}৳
                                </span>
                              </Col>
                            </Row>
                          )}
                        </div>

                        {!showDropZone.owner && (
                          <div className="mt-3">
                            <Row>
                              <Col md={6}>
                                <Row>
                                  <Col>
                                    <Row className="py-1">
                                      <Col md={5}>
                                        <span className="text-primary">
                                          Contact
                                        </span>
                                      </Col>
                                      <Col md={7}>
                                        <Link
                                          to={`/contactsInfo/${property_data?.data?.current_owner?.contact_id}`}
                                        >
                                          {property_data?.data?.current_owner
                                            ?.first_name &&
                                            property_data?.data?.current_owner
                                              ?.last_name
                                            ? `${property_data?.data?.current_owner?.first_name} ${property_data?.data?.current_owner?.last_name}`
                                            : ""}
                                        </Link>
                                      </Col>
                                    </Row>
                                    <div
                                      className="w-100"
                                      style={{
                                        borderBottom: "1.2px dotted #c9c7c7",
                                      }}
                                    />
                                  </Col>
                                </Row>
                                <Row>
                                  {property_data?.data?.current_owner
                                    ?.mobile_phone &&
                                    property_data?.data?.current_owner
                                      ?.home_phone &&
                                    property_data?.data?.current_owner
                                      ?.work_phone ? (
                                    <Col className="py-1">
                                      <Row>
                                        <Col md={5}>
                                          <span className="text-primary">
                                            Phone
                                          </span>
                                        </Col>
                                        <Col md={7}>
                                          <span>{`(m) ${property_data?.data?.current_owner
                                            ?.mobile_phone
                                            ? property_data?.data
                                              ?.current_owner?.mobile_phone
                                            : ""
                                            } (h) ${property_data?.data?.current_owner
                                              ?.home_phone
                                              ? property_data?.data
                                                ?.current_owner?.home_phone
                                              : ""
                                            } (w) ${property_data?.data?.current_owner
                                              ?.work_phone
                                              ? property_data?.data
                                                ?.current_owner?.work_phone
                                              : ""
                                            }`}</span>
                                        </Col>
                                      </Row>
                                      <div
                                        className="w-100"
                                        style={{
                                          borderBottom: "1.2px dotted #c9c7c7",
                                        }}
                                      />
                                    </Col>
                                  ) : (
                                    ""
                                  )}
                                </Row>
                                {property_data?.planName && (
                                  <Row>
                                    <Col className="py-1">
                                      <Row>
                                        <Col md={5}>
                                          <span className="text-primary">
                                            Plan{" "}
                                          </span>
                                        </Col>
                                        <Col md={7}>
                                          <Link
                                            to={{
                                              pathname: `/owner/edit/${property_data?.data?.current_owner?.id}/${property_data?.data?.current_owner_folio?.id}/3`,
                                              state: { proId: id },
                                            }}
                                          >
                                            <span>
                                              {property_data?.planName}{" "}
                                              <i className="fas fa-pen font-size-14 text-primary ms-1"></i>
                                            </span>
                                          </Link>
                                        </Col>
                                      </Row>
                                      <div
                                        className="w-100"
                                        style={{
                                          borderBottom: "1.2px dotted #c9c7c7",
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                )}
                                <Row>
                                  <Col className="py-1">
                                    <Row>
                                      <Col md={5}>
                                        <span className="text-primary">
                                          Fee schedule{" "}
                                        </span>
                                      </Col>
                                      <Col md={7}>
                                        <Link
                                          to={{
                                            pathname: `/owner/edit/${property_data?.data?.current_owner?.id}/${property_data?.data?.current_owner_folio?.id}/3`,
                                            state: { proId: id },
                                          }}
                                        >
                                          <span>
                                            {property_data?.total_fees
                                              ? property_data?.total_fees
                                              : 0}{" "}
                                            fees{" "}
                                            <i className="fas fa-pen font-size-14 text-primary ms-1"></i>
                                          </span>
                                        </Link>
                                      </Col>
                                    </Row>
                                    <div
                                      className="w-100"
                                      style={{
                                        borderBottom: "1.2px dotted #c9c7c7",
                                      }}
                                    />
                                  </Col>
                                </Row>

                                {property_owner_info_data?.balance ||
                                  property_owner_info_data?.total_money ||
                                  property_owner_info_data?.regular_intervals ? (
                                  <Row>
                                    <Col className="py-1">
                                      <Row>
                                        <Col md={5}>
                                          <span className="text-primary">
                                            Disbursements
                                          </span>
                                        </Col>
                                        <Col md={7}>
                                          {/* {property_owner_info_data?.balance &&
                                        property_owner_info_data?.total_money && (
                                          <span>{`on balance of ${property_owner_info_data?.balance}/ on total money in of ${property_owner_info_data?.total_money} / at ${property_owner_info_data?.regular_intervals}`}</span>
                                        )} */}
                                          {property_owner_info_data?.balance
                                            ? `on balance of ${property_owner_info_data?.balance ||
                                            ""
                                            }৳/`
                                            : ""}{" "}
                                          {property_owner_info_data?.total_money
                                            ? ` on total money in of ${property_owner_info_data?.total_money ||
                                            ""
                                            }৳`
                                            : ""}{" "}
                                          {property_owner_info_data?.regular_intervals
                                            ? `/ at ${property_owner_info_data?.regular_intervals} intervals`
                                            : ""}
                                        </Col>
                                      </Row>
                                      <div
                                        className="w-100"
                                        style={{
                                          borderBottom: "1.2px dotted #c9c7c7",
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                ) : (
                                  ""
                                )}
                                <Row>
                                  {property_owner_info_data?.next_disburse_date ? (
                                    <Col className="py-1">
                                      <Row>
                                        <Col md={5}>
                                          <span className="text-primary">
                                            Next Disbursement
                                          </span>
                                        </Col>
                                        <Col md={7}>
                                          <span className="badge square-pill bg-labelColor justify-content-center align-items-center p-2 mb-2">
                                            {moment(
                                              property_owner_info_data?.next_disburse_date
                                            ).format("DD MMM yyyy") || ""}
                                          </span>
                                        </Col>
                                      </Row>
                                      <div
                                        className="w-100 "
                                        style={{
                                          borderBottom: "1.2px dotted #c9c7c7",
                                        }}
                                      />
                                    </Col>
                                  ) : (
                                    ""
                                  )}
                                </Row>
                                <Row>
                                  {property_owner_info_data?.agreement_end ? (
                                    <Col className="py-1">
                                      <Row>
                                        <Col md={5}>
                                          <span className="text-primary">
                                            Agreement end
                                          </span>
                                        </Col>
                                        <Col md={7}>
                                          <span className="badge rounded-pill bg-warning justify-content-center align-items-center p-2 mb-2">
                                            {moment(
                                              property_owner_info_data?.agreement_end
                                            ).format("DD MMM yyyy") || ""}
                                          </span>
                                        </Col>
                                      </Row>
                                      <div
                                        className="w-100 "
                                        style={{
                                          borderBottom: "1.2px dotted #c9c7c7",
                                        }}
                                      />
                                    </Col>
                                  ) : (
                                    ""
                                  )}
                                </Row>
                              </Col>
                              {property_owner_info_data?.folio_code && (
                                <Col md={6}>
                                  <div>
                                    <Col className="py-1">
                                      <Row>
                                        <Col md={4}>
                                          <span className="text-primary">
                                            Folio
                                          </span>
                                        </Col>
                                        <Col
                                          md={8}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <div
                                            className="text-primary"
                                            onClick={() => {
                                              ownerFolioHandler(
                                                property_data?.data
                                                  ?.current_owner?.contact_id,
                                                property_data?.data
                                                  ?.current_owner?.id,
                                                property_owner_info_data?.folio_code,
                                                property_owner_info_data?.id
                                              );
                                            }}
                                          >
                                            {property_data?.data?.current_owner
                                              ?.reference
                                              ? `${property_data?.data?.current_owner?.reference}`
                                              : ""}
                                            (
                                            {
                                              property_owner_info_data?.folio_code
                                            }
                                            )
                                          </div>
                                        </Col>
                                      </Row>
                                      <div
                                        className="w-100"
                                        style={{
                                          borderBottom: "1.2px dotted #c9c7c7",
                                        }}
                                      />
                                    </Col>
                                  </div>

                                  {property_data?.data?.current_owner
                                    ?.email && (
                                      <div>
                                        <Col className="py-1">
                                          <Row>
                                            <Col md={4}>
                                              <span className="text-primary">
                                                Email
                                              </span>
                                            </Col>
                                            <Col md={8}>
                                              {property_data?.data?.current_owner
                                                ?.email || ""}
                                            </Col>
                                          </Row>
                                          <div
                                            className="w-100"
                                            style={{
                                              borderBottom:
                                                "1.2px dotted #c9c7c7",
                                            }}
                                          />
                                        </Col>
                                      </div>
                                    )}
                                  <div>
                                    <Col className="py-1">
                                      <Row>
                                        <Col md={4}>
                                          <span className="text-primary">
                                            Payment methods{" "}
                                          </span>
                                        </Col>
                                        <Col md={8}>
                                          <Link
                                            to={{
                                              pathname: `/owner/edit/${property_data?.data?.current_owner?.id}/${property_data?.data?.current_owner_folio?.id}/4`,
                                              state: { proId: id },
                                            }}
                                            className="d-flex"
                                          >
                                            <div className="d-flex align-items-start">
                                              <p>
                                                {property_data?.data
                                                  ?.current_owner?.owner_payment
                                                  .length === 0
                                                  ? "None"
                                                  : property_data?.data
                                                    ?.current_owner
                                                    ?.owner_payment.length ===
                                                    1
                                                    ? property_data?.data
                                                      ?.current_owner
                                                      ?.owner_payment[0]?.method
                                                    : `Split(
                                            ${property_data?.data?.current_owner?.owner_payment.map(
                                                      item =>
                                                        item.split_type == "৳"
                                                          ? `${item.split
                                                            ? item.split
                                                            : "0"
                                                          }.00৳ ${item.method}`
                                                          : ` ${item.split}% ${item.method}`
                                                    )}
                                            )`}
                                              </p>

                                              <i className="ms-1 me-2 mdi mdi-pencil d-block font-size-16 text-primary"></i>
                                            </div>
                                          </Link>
                                        </Col>
                                      </Row>{" "}
                                      <div
                                        className="w-100"
                                        style={{
                                          borderBottom: "1.2px dotted #c9c7c7",
                                        }}
                                      />
                                    </Col>
                                  </div>
                                </Col>
                              )}
                            </Row>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </>
              ) : null}

              <Row
                className="d-flex justify-content-center"
                data-aos="fade-right"
                data-aos-once={true}
              >
                {(!property_data?.data?.owner_folio_id ||
                  !tenantInfoData?.folio) && (
                    <Col
                      md={5}
                      style={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        borderRadius: "15px",
                        backgroundColor: "#f8f8fb",
                      }}
                    >
                      <Card body style={{ backgroundColor: "#f8f8fb" }}>
                        <CardTitle className="h4 mt-0 text-center mb-3">
                          <h4 className="my-0" style={{ fontWeight: "400" }}>
                            Is this property for rent?
                          </h4>
                        </CardTitle>

                        <div className="d-flex flex-column justify-content-center align-items-center">
                          {" "}
                          {!property_data?.data?.owner_folio_id && (
                            <Link to={"/propertyOwnerAdd/" + propertyId}>
                              <Button
                                color="info"
                                className="mb-3 mt-3 w-100"
                                style={{
                                  fontWeight: "400",
                                  fontSize: "15px",
                                }}
                                type="button"
                                onClick={ownerHandler}
                                data-toggle="modal"
                                data-target=".bs-example-modal-lg"
                              >
                                <i className="fas fa-home me-2"></i>
                                Assign an owner
                              </Button>
                            </Link>
                          )}
                          {!tenantInfoData?.folio && (
                            <Link to={"/propertyTenantAdd/" + propertyId}>
                              <Button
                                className="w-100"
                                color="info"
                                style={{
                                  fontWeight: "400",
                                  fontSize: "16px",
                                }}
                                type="button"
                                onClick={tenantHandler}
                                data-toggle="modal"
                                data-target=".bs-example-modal-lg"
                              >
                                <i className="bx bxs-group me-2"></i>
                                Assign a tenant
                              </Button>
                            </Link>
                          )}
                        </div>
                      </Card>
                    </Col>
                  )}
                {saleInfoData
                  ? null
                  : (!property_data?.data?.owner_folio_id &&
                    !tenantInfoData?.folio) && (
                    <Col
                      md={5}
                      className=" ms-4"
                      style={{
                        boxShadow:
                          "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        borderRadius: "15px",
                      }}
                    >
                      <Card body style={{ backgroundColor: "#f8f8fb" }}>
                        <CardTitle className="h4 mt-0 text-center mb-3">
                          <h4 className="my-0" style={{ fontWeight: "400" }}>
                            Is this property for sale?
                          </h4>
                        </CardTitle>

                        <Button
                          color="info"
                          className="mb-3 mt-3"
                          style={{
                            fontWeight: "400",
                            fontSize: "16px",
                          }}
                          type="button"
                        >
                          <Link
                            style={{ color: "white" }}
                            to={`/addSaleAgreement/${id}`}
                          >
                            <i className="mdi mdi-home-currency-usd font-size-18 me-1" />
                            Attach a sales agreement
                          </Link>
                        </Button>
                      </Card>
                    </Col>
                  )}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal size="lg" isOpen={memberModal} toggle={toggleMemberModal}>
        <div className="modal-header">
          <button
            onClick={() => setMemberModal(false)}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{userData}</tbody>
          </table>
        </div>
      </Modal>
      <Modal isOpen={periodicModal} toggle={tog_periodic_modal}>
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            Edit Agreement Dates for new tenant -{" "}
            {property_data && property_data.data.reference}
          </h5>
          <button
            type="button"
            onClick={() => setPeriodicModal(prev => !prev)}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <Row>
            <Col md={12}>
              <Row className="mb-3">
                <Col md={3}>
                  <Label for="new_rent_from" className="form-label text-dark">
                    Agreement Start
                  </Label>
                </Col>
                <Col md={4} className="d-flex align-items-start">
                  <Flatpickr
                    className="form-control d-block"
                    placeholder="Pick a Date..."
                    value={state1.agreement_start}
                    options={{
                      altInput: true,
                      format: "d/m/Y",
                      altFormat: "d/m/Y",
                      onChange: dateHandler,
                    }}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={3}>
                  <Label for="new_rent_value" className="form-label text-dark">
                    Agreement End
                  </Label>
                </Col>
                <Col md={4} className="d-flex align-items-start">
                  <Flatpickr
                    className="form-control d-block"
                    placeholder="Pick a Date..."
                    value={state1.agreement_end}
                    options={{
                      altInput: true,
                      format: "d/m/Y",
                      altFormat: "d/m/Y",
                      onChange: dateHandler1,
                    }}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3}>
                  <Label
                    for="periodic_tenancy"
                    className="form-label text-dark"
                  >
                    Periodic Tenancy
                  </Label>
                </Col>
                <Col md={4} className="d-flex align-items-start">
                  <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                      <Button
                        color={pTenancy == true ? "secondary" : "light"}
                        onClick={togglePT}
                      >
                        <span> yes</span>
                      </Button>
                    </div>

                    <div className="btn-group">
                      <Button
                        color={pTenancy == false ? "secondary" : "light"}
                        onClick={togglePT}
                      >
                        <span> No</span>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              {props.agreement_fee?.data?.data?.fee_type ===
                "Agreement date - renewed" && (
                  <Row className="mb-3">
                    <h5 className="modal-title mt-0 mb-3" id="myModalLabel">
                      Create bills based on plan
                    </h5>
                    <Col>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="defaultCheck1"
                          name="create_bill"
                          onClick={e => handleAgreementFee(e, "PLAN")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheck1"
                        >
                          {agreementFeeStatus}
                        </label>
                      </div>
                    </Col>
                  </Row>
                )}
              {(props.agreement_fee?.data?.folioAgreement?.fee_settings
                ?.fee_type === "Agreement date - renewed" ||
                props.agreement_fee?.data?.propertyAgreement?.fee_settings
                  ?.fee_type === "Agreement date - renewed") && (
                  <Row className="mb-3">
                    <h5 className="modal-title mt-0 mb-3" id="myModalLabel">
                      Create bills based on fees
                    </h5>
                    {props.agreement_fee?.data?.folioAgreement?.fee_settings
                      ?.fee_type === "Agreement date - renewed" && (
                        <Col>
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck2"
                              name="create_bill"
                              onClick={e => handleAgreementFee(e, "FOLIOFEE")}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="defaultCheck2"
                            >
                              {agreementFolioFeeStatus}
                            </label>
                          </div>
                        </Col>
                      )}
                    {props.agreement_fee?.data?.propertyAgreement?.fee_settings
                      ?.fee_type === "Agreement date - renewed" && (
                        <Col>
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck3"
                              name="create_bill"
                              onClick={e => handleAgreementFee(e, "PROPERTYFEE")}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="defaultCheck3"
                            >
                              {agreementPropertyFeeStatus}
                            </label>
                          </div>
                        </Col>
                      )}
                  </Row>
                )}
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={tog_periodic_modal}
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={handlePeriodic}
          >
            Save
          </button>
        </div>
      </Modal>
      {enable ? (
        <PropertyKey
          keyModal={keyModal}
          toggle={tog_key_modal}
          text={keyText}
        ></PropertyKey>
      ) : null}

      {msgModal && (
        <MessagesModal
          toggle={toggleMsgModal}
          msgModal={msgModal}
          propId={id}
        />
      )}

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
                  <Link to={`/all-property-activity/${id}`}>
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
                {activityData?.map((data, i) => (
                  <ShowActivityData
                    key={data.id}
                    data={data}
                    modalState={modalState}
                    setModalState={setModalState}
                    tog_large={toggleModalState}
                    text="PropertyInfo"
                  />
                ))}
              </div>
              {activityData?.length > 0 && (
                <div className="w-100 mt-2 d-flex justify-content-end">
                  <Link to={`/all-property-activity/${id}`}>
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
              <Comment
                msgToggle={commentToggle}
                prop_Id={id}
                message={message}
                setMessage={setMessage}
              />
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      {/* ================= comment modal end   ===================*/}

      {/* ================= documents modal start   ===================*/}

      {/* ================= documents modal ends    ===================*/}
      {documentModal && (
        <PropertyDocs
          documentModal={documentModal}
          documentToggle={documentToggle}
          component="Property"
          data={props.all_property_document?.data?.data}
          id={id}
        />
      )}
    </React.Fragment>
  );
};

Aos.init({
  once: true,
});

const mapStateToProps = gstate => {
  const { get_task_info_loading } = gstate.tasks;
  const {
    property_add_loading,

    property_info_data,
    property_info_error,
    property_info_loading,

    user_list_data,

    property_update_info_loading,

    property_tenant_info_data,
    property_tenant_info_error,
    property_tenant_info_loading,

    property_add_tanent_loading,

    property_owner_info_data,
    property_owner_info_error,
    property_owner_info_loading,

    property_owner_add_loading,

    property_key_add_data,
    property_key_add_error,
    property_key_add_loading,

    property_key_data,
    property_key_error,
    property_key_loading,

    property_archived_loading,
    property_archived,
    property_archived_error,
    undo_archived_property_loading,

    get_archived_property,
    get_archived_property_error,
    get_archived_property_loading,

    seller_info_property_data,
    seller_info_property_loading,

    percentage,
    percentage_loading,
    percentage_detail,

    percentage_multiple,
    percentage_multiple_loading,
    percentage_multiple_detail,

    periodic_tenancy_update_data,
    periodic_tenancy_update_error,
    periodic_tenancy_update_loading,

    agreement_fee,
    agreement_fee_error,
    agreement_fee_loading,

    property_image_delete_data,
    property_image_delete_error,
    property_image_delete_loading,
  } = gstate.property;

  const {
    property_all_activity,
    property_all_activity_loading,
    add_message_data_loading,
    property_message_data,
    property_message_data_loading,
    send_email_loading,
  } = gstate.Activity;

  const { contacts_list_data, contacts_list_loading, contacts_show_loading } =
    gstate.Contacts2;

  const {
    all_property_document,
    all_property_document_error,
    all_property_document_loading,
    store_property_document_loading,
  } = gstate.Document;
  return {
    property_add_loading,

    property_info_data,
    property_info_error,
    property_info_loading,

    user_list_data,

    property_update_info_loading,

    property_tenant_info_data,
    property_tenant_info_error,
    property_tenant_info_loading,

    property_add_tanent_loading,

    property_owner_info_data,
    property_owner_info_error,
    property_owner_info_loading,

    agreement_fee,
    agreement_fee_error,
    agreement_fee_loading,

    property_owner_add_loading,

    contacts_list_data,
    contacts_list_loading,

    property_key_add_data,
    property_key_add_error,
    property_key_add_loading,

    property_key_data,
    property_key_error,
    property_key_loading,

    contacts_show_loading,
    get_task_info_loading,

    property_all_activity,
    property_all_activity_loading,

    add_message_data_loading,

    property_message_data,
    property_message_data_loading,
    send_email_loading,

    all_property_document,
    all_property_document_error,
    all_property_document_loading,

    store_property_document_loading,

    property_archived_loading,
    property_archived,
    property_archived_error,

    undo_archived_property_loading,

    get_archived_property,
    get_archived_property_error,
    get_archived_property_loading,

    seller_info_property_data,
    seller_info_property_loading,

    percentage,
    percentage_loading,
    percentage_detail,

    percentage_multiple,
    percentage_multiple_loading,
    percentage_multiple_detail,

    periodic_tenancy_update_data,
    periodic_tenancy_update_error,
    periodic_tenancy_update_loading,

    property_image_delete_data,
    property_image_delete_error,
    property_image_delete_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getUser,
    addProPic,
    getPropertyInfo,
    updatePicture,
    getUserInfo,
    addPropertyMember,
    updateDoc,
    getPropertyTenantInfo,
    getPropertyTenantInfoFresh,
    propertyTenantAddFresh,
    getPropertyOwnerInfo,
    propertyOwnerAddFresh,
    contactList,
    propertyUpdateFresh,
    getPropertyKeyFresh,
    getPropertyInfoFresh,
    getPropertyKey,
    showContactFresh,
    lebelInsert2,
    getTaskInfoFresh,
    PropertyAllActivity,
    addComment,
    addCommentFresh,
    getMessageProperties,
    sendEmailFresh,
    AllPropertyDocument,
    storePropertyDocument,
    storePropertyDocumentFresh,
    archieveProperty,
    undoArchieveProperty,
    SaleAgreementInfoForProperty,
    SaleAgreementInfoForPropertyFresh,
    editSaleAgreementInfoFresh,
    getTenantForManageFresh,
    uploadImagePercentageFresh,
    SaleAgreementInfoFresh,
    storeMultiplePicture,
    uploadMultipleImagePercentageFresh,
    addPeriodic,
    addPeriodicFresh,
    getAgreementFee,
    getAgreementFeeFresh,
    getArchieveProperty,
    TenantInfoFresh,
    userList,
    propertyImageDelete,
    propertyImageDeleteFresh,
    OwnerInfoFresh,
    sellerFolioList,
  })(PropertyInfo)
);
