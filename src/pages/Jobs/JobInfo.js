import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  withRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import { TagsInput } from "react-tag-input-component";
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
  Table,
  Carousel,
  CarouselControl,
  CarouselItem,
  CarouselIndicators,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
} from "reactstrap";
import { Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import classnames from "classnames";
// import DummyImg from '../../../assets/images/dummy-image-square.jpg';
import DummyImg from "../../assets/images/dummy-image-square.jpg";
import toastr from "toastr";
import moment from "moment";
import MailTemplateModal from "pages/Jobs/Activity/MailTemplateModal";
import {
  addProPic,
  getPropertyTenantInfo,
  propertyOwnerAddFresh,
  contactList,
  propertyUpdateFresh,
  showContactFresh,
  JobsListById,
  propertyList,
  JobsLabel,
  getQuote,
  addQuoteJobApprove,
  editJobInfo,
  editJobInfoFresh,
  JobsListByIdFresh,
  SupplierList,
  jobInfoImageAdd,
  jobInfoImageAddFresh,
  jobApprove,
  addSupplierFromJob,
  addSupplierFromJobFresh,
  jobUnassigned,
  jobStatusFresh,
  getQuoteFresh,
  jobUnapprove,
  jobUnquote,
  jobOwnerAssigned,
  jobTenantAssigned,
  jobCompleted,
  getQuoteInit,
  jobReopen,
  jobFinished,
  deleteJob,
  JobsList,
  deleteJobFresh,
  getMessageJob,
  addComment,
  storeInspectionTaskJobDocument,
  storeInspectionTaskJobDocumentFresh,
  AllJobDocument,
  addCommentFresh,
  editQuoteJob,
  editQuoteFresh,
  deleteQuoteJob,
  deleteQuoteJobFresh,
  uploadJobFileFresh,
  jobAllActivity, jobImageDelete, jobImageDeleteFresh

} from "../../store/actions";
import {
  addProperty,
  getUser,
  getPropertyInfo,
  getPropertyKeyFresh,
  getPropertyInfoFresh,
  updatePicture,
  getUserInfo,
  addPropertyMember,
  updateDoc,
  lebelInsert2,
} from "../../store/Properties/actions";
import { propertyTenantAddFresh } from "../../store/Properties/tenantActions";
import QuotesModal from "./QuotesModal";
import QuotesDownModal from "./QuotesDownModal";
import Aos from "aos";
import "aos/dist/aos.css";
import Comment from "pages/Activity/Comment";
import MailTemplateModalMaintenance from "./Activity/MailTemplateModalMaintenance";
import ShowActivityData from "pages/Properties/Activity/ShowActivityData";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
//import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import MessagesModal from "./MessagesModal/MessagesModal";
import Select from "react-select";
import PropertyDocs from "pages/Properties/PropertyDocs";
import ImageModal from "pages/Image/ImageModal";
import { withTranslation, useTranslation } from "react-i18next";

import CommentData from "pages/Activity/CommentData";
//import {  } from 'react-router-dom';

let propertyId = undefined;

document.title = "CliqProperty";

const JobInfo = props => {
  const { t } = useTranslation();
  const localizeItem = text => `${t(text)}`
  //const navigate = usenavigate();

  const { id } = useParams();
  const [file, setFile] = useState(DummyImg);

  const [userState, setUserState] = useState(true);
  const [show, setShow] = useState(false)

  const [jobs, setJobs] = useState({});
  const [jobsImageState, setJobsImageState] = useState(true);

  const [documentFile, setDocumentFile] = useState([]);
  const [memberBtnName, setMemberBtnName] = useState("");
  const inputFile = useRef(null);
  const inputDocFile = useRef(null);
  const [enable, setEnable] = useState(false);

  const [level, setLevel] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState([]);

  const [singleBtn, setSingleBtn] = useState(false);

  const [showQuotes, setShowQuotes] = useState(false);
  const [editQuoteModal, setEditQuoteModal] = useState({
    item: {},
    showEditQuoteModal: false,
  });
  const [init, setInit] = useState(true);

  const [items, setItems] = useState([]);

  const [actionState, setActionState] = useState({ btnsecondary1: false });
  // image viewer
  const [showSliderState, setShowSliderState] = useState({
    photoIndex: 0,
    isOpen: false,
  });

  //dropzone for document
  const [showDropZone, setShowDropZone] = useState(false);
  // dropzone section
  const [showDropZoneImage, setShowDropZoneImage] = useState({
    property: false,
    propertyPhoto: false,
  });

  // State for Active index
  const [activeIndex, setActiveIndex] = React.useState(0);
  // State for Animation
  const [animating, setAnimating] = React.useState(false);

  const [inspectionModal, setInspectionModal] = useState(false);
  const quotesToggle = () => setInspectionModal(prev => !prev);

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(prev => !prev);

  const [msgModal, setMsgModal] = useState(false);

  const toggleMsgModal = () => {
    setMsgModal(prev => !prev);
  };


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


  // Items array length
  const itemLength = items.length - 1;
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  const previousButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? itemLength : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  // Next button for Carousel
  const nextButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === itemLength ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const handleMulti3 = e => {
    //setSelectedState(e);
    setSelectedLevel(e);
    props.JobsLabel(id, e);
  };

  const listEnable = () => {
    setLevel(false);
  };

  const disable = () => {
    let insLvl = [];
    setLevel(true);
  };

  let property_data = undefined;
  let dueDate = undefined;

  if (props.property_info_data) {
    property_data = props.property_info_data?.data;
    dueDate = props.property_info_data?.data?.routine_inspection_due_date;
  }

  const handleChange = async e => {
    e.preventDefault();
    props.storeInspectionTaskJobDocument(
      e.target.files,
      jobData.property_id,
      null,
      null,
      jobData.id
    );
    setShow(true)
  };
  const handleDocument = async e => {
    if (
      e.target.files[0].type !== "image/jpeg" &&
      e.target.files[0].type !== "image/png" &&
      e.target.files[0].type !== "image/gif" &&
      e.target.files[0].type !== "image/webp"
    ) {
      toastr.error(
        `File ${e.target.files[0].name} is not of a valid type. Expected one of the following extensions: BMP, GIF, JPEG, JPG, PNG.`
      );
    } else {
      await props.jobInfoImageAdd(
        //file: e.target.files[0],
        e.target.files,
        id
      );
    }
  };

  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const property_id = params.id;

  let propertyName = "New Property";

  const [state, setState] = useState({
    activeTab: "1",
    optionAccess:
      props.jobListById_show_data?.data?.access == null
        ? [{ label: "Agent", value: "Agent" }]
        : [
          { label: "None", value: "None" },
          { label: "Agent", value: "Agent" },
          { label: "Owner", value: "Owner" },
          { label: "Tenant", value: "Tenant" },
        ],
  });
  const [msgShow, setMsgShow] = useState(false);
  const [message, setMessage] = useState("");
  const msgToggle = () => setMsgShow(prev => !prev);
  // const [infoState, setInfoState] = useState(true);
  const jobData = props.jobListById_show_data?.data;
  // console.log(jobData);

  const msgHandlerSubmit = e => {
    e.preventDefault();
    if (message.length === 0) {
      return;
    } else {
      props.addComment(
        message,
        jobData.property_id,
        null,
        null,
        null,
        null,
        id
      );
      msgToggle();
    }
  };

  var authUserData = JSON.parse(localStorage.getItem("authUser"));
  const managerNameData = authUserData?.user?.first_name;

  const tenantName = `${props.jobListById_show_data?.data?.properties[0]?.tenant[0]
    ?.first_name} ${props.jobListById_show_data?.data?.properties[0]?.tenant[0]?.last_name}`

  const tenantId =
    props.jobListById_show_data?.data?.properties[0]?.tenant[0]?.id;

  let image = [];
  if (
    props.jobListById_show_data?.data?.jobs_images?.length > 0 &&
    jobsImageState
  ) {
    props.jobListById_show_data?.data?.jobs_images?.map((item, key) => {
      image.push({
        id: key + 1,
        src: item.image_path,
        altText: "Slide " + (key + 1),
        caption: "Slide " + (key + 1),
      });
    });
    setItems(image);
    setJobsImageState(false);
  }
  // if (props.jobListById_show_data?.data?.jobs_images?.length > 0 && jobsImageState) {
  //     props.jobListById_show_data?.data?.jobs_images?.map((item, key) => {
  //         setItems([...items, {
  //             id: key + 1,
  //             src: item.image_path,
  //             altText: "Slide " + (key + 1),
  //             caption: "Slide " + (key + 1),
  //         }])
  //     });
  //     setJobsImageState(false);
  // }
  if (init) {
    props.AllJobDocument(id);
    props.JobsListById(id);
    props.getQuote(id);
    props.jobAllActivity(id);
    setInit(false);
  }

  let ownerId;
  if (
    props.jobListById_show_data?.data?.properties[0]?.owner_id !== undefined
  ) {
    ownerId = props.jobListById_show_data?.data?.properties[0]?.owner[0]?.contact_id;
  }

  const callJobAllActivity = () => props.jobAllActivity(id);

  const dateHandler = (selectedDates, dateStr, instance) => {
    setJobs({ ...jobs, ["due_by"]: dateStr });
  };

  // image drag & drop section start
  const propertyDropFile = e => {
    e.preventDefault();
    setShowDropZoneImage(prev => {
      return {
        ...prev,
        property: false,
      };
    });
  };

  const propertyDrag = e => {
    e.preventDefault();
    setShowDropZoneImage({
      ...showDropZoneImage,
      property: true,
    });
  };

  const propertyDragend = e => {
    e.preventDefault();
    setShowDropZoneImage(prev => {
      return {
        ...prev,
        property: false,
      };
    });
  };
  const propertyPhotoDropFile = e => {
    e.preventDefault();
    setShowDropZoneImage(prev => {
      return {
        ...prev,
        propertyPhoto: false,
      };
    });
  };

  const propertyPhotoDrag = e => {
    e.preventDefault();
    setShowDropZoneImage(prev => {
      return {
        ...prev,
        propertyPhoto: true,
      };
    });
  };

  const propertyPhotoDragend = e => {
    e.preventDefault();
    setShowDropZoneImage(prev => {
      return {
        ...prev,
        propertyPhoto: false,
      };
    });
  };
  // image drag & drop section end

  const handlePropertyFilesdrop = (e, id) => {
    e.preventDefault();
    props.jobInfoImageAdd(
      //file: e.target.files[0],
      e.dataTransfer.files,
      id
    );
  };

  useEffect(() => {
    if (props.job_image_delete_loading == 'Success') {
      toastr.success('Success')
      props.jobImageDeleteFresh();
      props.JobsListById(id);

    }
    if (props.job_image_delete_loading == 'Failed') {
      toastr.error('Failed')
      props.jobImageDeleteFresh()
    }
  }, [props.job_image_delete_loading])



  useEffect(() => {
    let option;
    if (props.supplier_list_data) {
      option = props.supplier_list_data?.data.map(item => ({
        label: item.reference,
        value: item.id,
      }));
      setState(prev => ({ ...prev, optionSupplier: option }));
    }

    let optionManager;
    if (props.user_list_data) {
      optionManager = props.user_list_data?.data?.map(item => ({
        label: item.full_name,
        value: item.id,
      }));
      setState(prev => ({ ...prev, optionManager: optionManager }));
    }

    let insLvl = [];
    if (props.upload_job_file_loading === "Success") {
      toastr.success("File uploaded");
      props.uploadJobFileFresh();
      props.getQuote(id);
      props.JobsListByIdFresh();
    }
    if (props.job_quote_edit_loading === "Success") {
      toastr.success("Quote Edited Successfully");
      props.editQuoteFresh();
      props.getQuote(id);
      props.JobsListByIdFresh();
      callJobAllActivity();
    }
    if (props.job_quote_delete_loading === "Success") {
      toastr.success("Quote Deleted");
      props.deleteQuoteJobFresh();
      props.getQuote(id);
      props.JobsListByIdFresh();
    }
    if (props.property_list_loading === false) {
      props.propertyList();
    }
    if (props.jobListById_show_loading === false) {
      props.JobsListById(id);
      props.AllJobDocument(id);
      props.getMessageJob(id);
    }
    if (props.supplier_list_loading === false) {
      props.SupplierList();
    }
    if (props.jobListById_show_data?.data) {
      setJobs({
        due_by: props.jobListById_show_data?.data?.due_by,
        access: props.jobListById_show_data?.data?.access,
        manager: props.jobListById_show_data?.data?.manager_id,
        summary: props.jobListById_show_data?.data?.summary,
        description: props.jobListById_show_data?.data?.description,
        work_order_notes: props.jobListById_show_data?.data?.work_order_notes,
        tenant: tenantName ? tenantName : "None",
        tenant_id: tenantId,
      });

      // setState({ ...state, selectedAccess: { label: props.jobListById_show_data?.data?.access, value: props.jobListById_show_data?.data?.access } })
      setState(prev => ({
        ...prev,
        selectedAccess:
          props.jobListById_show_data?.data?.access == null
            ? { label: "Agent", value: "Agent" }
            : {
              label: props.jobListById_show_data?.data?.access,
              value: props.jobListById_show_data?.data?.access,
            },
        selectedManager: {
          label: `${props.jobListById_show_data?.data?.manager?.full_name}`,
          value: props.jobListById_show_data?.data?.manager?.id,
        },
        selectedTenant:
          props.jobListById_show_data?.data?.properties[0]?.tenant?.length == 0
            ? { label: "None", value: null }
            : { label: tenantName, value: tenantId },
        optionTenant:
          props.jobListById_show_data?.data?.properties[0]?.tenant?.length == 0
            ? [{ label: "None", value: null }]
            : [
              { label: tenantName, value: tenantId },
              { label: "None", value: null },
            ],
      }));
    }
    if (props.user_list_loading == false) {
      props.getUser();
    }
    if (props.jobListById_show_data?.data?.jobs_label != []) {
      props.jobListById_show_data?.data?.jobs_label?.map(async (item, key) =>
        insLvl.push(item.labels)
      );
      setSelectedLevel(insLvl);
    }
    if (props.getQuote_show_loading === false) {
      props.getQuote(id);
    }
    if (props.job_modal_edit_loading === "Success") {
      toastr.success("Job Edited Successfully");
      props.editJobInfoFresh();
      props.JobsListByIdFresh();
      setInit(true);
      callJobAllActivity();
    }
    if (props.job_info_image_add_loading === "Success") {
      toastr.success("Image Added Successfully");
      props.JobsListById(id);
      props.jobInfoImageAddFresh();
    }
    if (props.job_status_loading === "Approve") {
      toastr.success("Job Approved");
      props.jobStatusFresh();
      props.JobsListByIdFresh();
      props.getQuote(id);
      callJobAllActivity();
    }
    if (props.job_status_loading === "Unapprove") {
      toastr.success("Job Unapproved");
      props.jobStatusFresh();
      props.JobsListByIdFresh();
      props.getQuoteFresh();
      callJobAllActivity();
    }

    if (props.job_status_loading === "Unassigned") {
      toastr.success("Supplier Unassigned");
      props.jobStatusFresh();
      props.JobsListByIdFresh();
      props.getQuoteFresh();
      callJobAllActivity();
    }
    if (props.job_status_loading === "Unquoted") {
      toastr.success("Job Unquoted");
      props.jobStatusFresh();
      props.JobsListByIdFresh();
      props.getQuoteFresh();
      callJobAllActivity();
    }
    if (props.job_status_loading === "ownerAssigned") {
      toastr.success("Owner attending");
      props.jobStatusFresh();
      props.JobsListByIdFresh();
      props.getQuoteFresh();
      callJobAllActivity();
    }
    if (props.job_status_loading === "tenantAssigned") {
      toastr.success("Tenant attending");
      props.jobStatusFresh();
      props.JobsListByIdFresh();
      props.getQuoteFresh();
      callJobAllActivity();
    }
    if (props.job_status_loading === "Completed") {
      toastr.success("Job Completed");
      props.jobStatusFresh();
      props.JobsListByIdFresh();
      props.getQuoteFresh();
      callJobAllActivity();
    }
    if (props.job_status_loading === "Finished") {
      toastr.success("Job Finised");
      props.jobStatusFresh();
      props.JobsListByIdFresh();
      props.getQuoteFresh();
      callJobAllActivity();
    }
    if (props.job_status_loading === "Reopen") {
      toastr.success("Job Reopened");
      props.jobStatusFresh();
      props.JobsListByIdFresh();
      props.getQuoteFresh();
      callJobAllActivity();
    }

    if (props.add_supplier_from_job_loading === "Success") {
      toastr.success("Supplier added");
      props.addSupplierFromJobFresh();
      props.JobsListByIdFresh();
      callJobAllActivity();
    }
    if (props.job_delete_loading === "Success") {
      toastr.success("Job Deleted");
      props.JobsList();

      history.push("/maintenance");
      props.deleteJobFresh();
      callJobAllActivity();
    }
    if (props.job_message_data_loading === false) {
      props.getMessageJob(id);
    }
    if (props.store_inspection_task_job_document_loading === "Success") {
      toastr.success("Uploaded successfully");
      props.storeInspectionTaskJobDocumentFresh();
      props.AllJobDocument(id);
      setShow(false)
    }
    if (props.store_inspection_task_job_document_loading === "Failed") {
      toastr.error("Failed");
      props.storeInspectionTaskJobDocumentFresh();
      // props.AllJobDocument(id);
      setShow(false)
    }
    // if (props.add_message_data_loading === "Success") {
    //   toastr.success("Comment Added Successfully");

    //   props.addCommentFresh();
    //   props.getMessageJob(id);
    // }
    if (props.job_all_activity_loading === false) {
      props.jobAllActivity(id);
      props.addCommentFresh();
    }
    setJobsImageState(true);
    Aos.init({ duration: 2000 });
  }, [
    props.upload_job_file_loading,
    props.job_quote_edit_loading,
    props.job_quote_delete_loading,
    props.store_inspection_task_job_document_loading,
    props.jobListById_show_loading,
    props.jobListById_show_data,
    props.property_list_loading,
    props.getQuote_show_loading,
    props.job_modal_edit_loading,
    props.supplier_list_loading,
    props.job_info_image_add_loading,
    props.job_status_loading,
    props.add_supplier_from_job_loading,
    props.job_delete_loading,
    props.job_message_data_loading,
    props.job_all_activity_loading,
    props.user_list_data,
  ]);



  const activityData = props.job_all_activity?.data?.data;
  const msgData = props.job_message_data?.data?.data;

  let supplierReference;
  if (props.supplier_list_data?.data) {
    supplierReference = props.supplier_list_data?.data?.map((item, key) => (
      <option key={key} value={item.id}>
        {item.reference}
      </option>
    ));
  }



  const jobDeleteHandler = e => {
    e.preventDefault();
    toggleDeleteModal();
    props.deleteJob(id);
  };

  let propertyLinkId;
  if (props.jobListById_show_data?.data?.property_id !== undefined) {
    propertyLinkId = props.jobListById_show_data?.data?.property_id;
  }

  let userData = undefined;

  if (props.user_list_data) {
    userData = props.user_list_data?.data?.map((item, key) => (
      <option key={key} value={item.id}>
        {item.first_name + " " + item.last_name}
      </option>
    ));
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
            // <option key={key} value={item.id}>{ item.first_name + ' ' + item.last_name }</option>
          ));
        }
      }
    }
  };

  docFiles();

  const quotesHandler = () => {
    setShowQuotes(true);
  };

  const selectHandler = e => {
    setJobs({ ...jobs, [e.target.name]: e.target.value });
  };

  const selectHandlerForTenant = e => {
    setJobs({ ...jobs, [e.target.name]: e.target.value, tenant_id: null });
  };

  const showSlider = () => {

    setShowSliderState(prev => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.editJobInfo(jobs, id, state);
  };

  const slides = items
    ? items.map((item, key) => {
      return (
        <CarouselItem
          onExited={() => setAnimating(false)}
          onExiting={() => setAnimating(true)}
          key={key}
        >
          <div onClick={showSlider}>
            <img
              src={item.src}
              className="d-block w-100"
              alt={item.altText}
              style={{ height: "450px", width: "100%", objectFit: "cover", width: "400px" }}
            />
          </div>
        </CarouselItem>
      );
    })
    : [];

  const toggle = tab => {
    if (state.activeTab !== tab) {
      setState({
        ...state,
        activeTab: tab,
      });
    }
    if (tab == '2') {
      props.AllJobDocument(id);
      documentToggle()
    }
  };
  // ============for new image viewer===============
  const image_slides = items.map((item, idx) => {
    //return { src: process.env.REACT_APP_IMAGE + item.property_image }
    return { src: item.src };
  });
  // ============for new image viewer ends===============

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

  const handlejobDoc = e => {
    e.preventDefault();
    setShow(true)
    props.storeInspectionTaskJobDocument(
      e.dataTransfer.files,
      jobData.property_id,
      null,
      null,
      jobData.id
    );
  };

  const toggleEditQuoteModal = () => {
    setEditQuoteModal({
      item: {},
      showEditQuoteModal: false,
    });
  };
  const editQuoteHandler = item => {
    setEditQuoteModal({
      item,
      showEditQuoteModal: true,
    });
  };

  const handleSelectAccess = e => {
    setState({ ...state, selectedAccess: e });
  };

  const handleSelectGroupManager = e => {
    setState({ ...state, selectedManager: e });
  };
  const handleSelectTenant = e => {
    setState({ ...state, selectedTenant: e });
  };

  const tenantDrag = e => {
    e.preventDefault();
    setShowDropZone(true);
  };

  const tenantDragend = e => {
    e.preventDefault();

    setShowDropZone(false);
  };

  const tenantDropFile = e => {
    e.preventDefault();
    setShowDropZone(false);
  };

  const handleSelectSupplier = e => {
    props.addSupplierFromJob(e.value, id);
  }

  const navigateToWorkOrder = () => {
    history.push("/tasks")
  }

  return (
    <React.Fragment>
      <div
        className="page-content"
      // onDragOver={drag}
      // onDragLeave={dragend}
      // onDrop={dropFile}
      >
        {/* <Breadcrumbs title="Jobs info" breadcrumbItem="Jobs" /> */}
        <h4 className="ms-2 text-primary">{localizeItem('Jobs')} {localizeItem('Info')}</h4>
        <Row>
          <Col lg={2}>
            <Card style={{ borderRadius: "15px" }}>
              <CardBody style={{ padding: "20px" }}>

                <div>
                  <h5 className="text-primary py-1">
                    {localizeItem('Job')}{" "}
                    {`000${jobData?.id ? jobData?.id : ""} [${jobData?.status ? jobData?.status : ""
                      }]-${props.jobListById_show_data?.data?.summary
                        ? props.jobListById_show_data?.data?.summary
                        : ""
                      }`}
                  </h5>
                  <div
                    className="mb-2"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>

                  {jobData?.status == "Closed" && (
                    <div className="w-100">
                      <Alert color="info">
                        <Row className="align-items-center flex-column">
                          <Col md={12} className="d-flex justify-content-end align-items-center">
                            <i className="fas fa-check-circle font-size-16 me-2"></i>
                            {localizeItem('Closed')} {localizeItem('on')} {jobData?.completed}
                          </Col>
                          <Col md={12} className="d-flex justify-content-start mt-2">
                            <Button
                              color="info"
                              onClick={() => props.jobReopen(id)}
                            >
                              <i className="fas fa-undo me-2"></i>
                              {localizeItem('Reopen')}
                            </Button>
                          </Col>
                        </Row>
                      </Alert>
                    </div>
                  )}
                  <Row className="mt-3">
                    <Col
                      md={12}
                      className="d-flex flex-column gap-2"
                    >

                      <Button
                        className="btn w-100 d-flex justify-content-between"
                        color="labelColor"
                        onClick={toggleMsgModal}
                      >
                        {localizeItem('Message')}
                        <i className="fas fa-angle-down ms-1" />
                      </Button>
                      {jobData?.status == "Reported" ||
                        jobData?.status == "Quoted" ? (
                        <Button
                          className="btn w-100 d-flex justify-content-between"
                          color="labelColor"
                          onClick={() => props.jobApprove(id)}
                        >
                          {localizeItem('Approve')}  <i className="fas fa-thumbs-up me-1" />
                        </Button>

                      ) : (
                        ""
                      )}

                      {jobData?.status == "Approved" ? (
                        <div className="w-100 d-flex align-items-center my-1" >

                          <div className="w-100" style={{ backgroundColor: "red !important" }}>
                            <Select
                              value={state.selectedSupplier}
                              onChange={handleSelectSupplier}
                              options={state.optionSupplier}
                              classNamePrefix="select2-selection"
                              placeholder='Assign a supplier...'
                            // theme={(theme) => ({
                            //   ...theme,
                            //   borderRadius: 6,
                            //   backgroundColor: "red",
                            //   colors: {
                            //     ...theme.colors,
                            //     primary25: 'red',
                            //     primary: 'blue',
                            //     secondary: "blue"
                            //   },

                            //   backgroundColors: {
                            //     ...theme.colors,
                            //     primary25: 'red',
                            //     primary: 'blue',
                            //     secondary: "blue"
                            //   },

                            // })}


                            />
                          </div>
                        </div>
                      ) : null}

                      {jobData?.status == "Reported" ? (
                        <Button
                          className="btn w-100 d-flex justify-content-between"
                          color="labelColor"
                          onClick={e => {
                            quotesToggle();
                            props.getQuoteInit(id);
                          }}
                        >

                          {localizeItem('Quotes')} <i className="fas fa-wrench font-size-12 align-mpIddle me-1"></i>
                        </Button>
                      ) : null}
                      {inspectionModal && <QuotesModal
                        toggle={quotesToggle}
                        inspectionModal={inspectionModal}
                      />}

                      {jobData?.status == "Assigned" ||
                        jobData?.status == "Finished" ? (
                        <Button
                          type="button"
                          color="labelColor"
                          className="btn w-100 d-flex justify-content-between"
                          onClick={() => props.jobCompleted(id)}
                        >

                          {localizeItem('Complete')} <i className="fas fa-check-circle me-1"></i>
                        </Button>
                      ) : (
                        ""
                      )}
                      {jobData?.status == "Assigned" && (
                        <Button
                          className="btn w-100 d-flex justify-content-between"
                          color="labelColor"
                          onClick={() => props.jobFinished(id)}
                        >

                          {localizeItem('Finish')} <i className="fas fa-coins me-2"></i>
                        </Button>
                      )}
                      <Link target="_blank" to={{ pathname: process.env.REACT_APP_DOCUMENT_2 + 'live/Document/' + `workOrder-${id}.pdf.pdf` }}>
                        {jobData?.maintenance_assign?.supplier ? (

                          <Button className="btn w-100 d-flex justify-content-between my-2"
                            color="labelColor">

                            {localizeItem('Work')} {localizeItem('order')}  <i className="fas fa-file-alt me-2"></i>
                          </Button>

                        ) : (
                          ""
                        )}
                      </Link>
                    </Col>
                    <Col md={12}>

                      {/* <div className="d-flex gap-2 flex-wrap w-100"> */}
                      {props.job_status_loading == "inspected" ? (
                        <Button
                          className="btn w-100 d-flex justify-content-between"
                          color="labelColor"
                        // onClick={() => {
                        //     props.insComplete(id);
                        // }}
                        >
                          {localizeItem('Completed')} <i className="fas fa-check me-1"></i>
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
                          {localizeItem('Action')} <i className="mdi mdi-chevron-down"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                          {jobData?.status == "Approved" && (
                            <DropdownItem
                              onClick={() =>
                                props.jobOwnerAssigned(ownerId, id)
                              }
                            >
                              {/* <a onClick={() =>props.jobOwnerAssigned(ownerId, id)}> */}
                              {localizeItem('Owner')} {localizeItem('attending')}
                              {/* </a> */}
                            </DropdownItem>
                          )}
                          {jobData?.status == "Approved" && (
                            <DropdownItem
                              onClick={() =>
                                props.jobTenantAssigned(tenantId, id)
                              }
                            >
                              {/* <a
                                  onClick={() =>
                                    props.jobTenantAssigned(tenantId, id)
                                  }
                                > */}
                              {localizeItem('Tenant')} {localizeItem('attending')}
                              {/* </a> */}
                            </DropdownItem>
                          )}
                          {jobData?.status == "Quoted" && (
                            <DropdownItem
                              onClick={() => props.jobUnquote(id)}
                            >
                              {/* <a onClick={() => props.jobUnquote(id)}> */}
                              {t('Unquote')}
                              {/* </a> */}
                            </DropdownItem>
                          )}
                          {jobData?.status == "Assigned" && (
                            <DropdownItem
                              onClick={() => props.jobUnassigned(id)}
                            >
                              {/* <a onClick={() => props.jobUnassigned(id)}> */}
                              {t('Unassign')}
                              {/* </a> */}
                            </DropdownItem>
                          )}
                          {jobData?.status == "Approved" && (
                            <DropdownItem
                              onClick={() => props.jobUnapprove(id)}
                            >
                              {/* <a onClick={() => props.jobUnapprove(id)}> */}
                              {t('Unapprove')}
                              {/* </a> */}
                            </DropdownItem>
                          )}
                          {jobData?.status === "Reported" && (
                            <DropdownItem
                              onClick={() => {
                                props.jobCompleted(id);
                              }}
                            >
                              {" "}
                              {/* <a
                                  onClick={() => {
                                    props.jobCompleted(id);
                                  }}
                                > */}
                              {t('Reject')}
                              {/* </a> */}
                            </DropdownItem>
                          )}
                          <DropdownItem onClick={toggleDeleteModal}>
                            {" "}
                            {/* <a onClick={toggleDeleteModal}> */}
                            {t('Delete')}
                            {/* </a> */}
                          </DropdownItem>

                          <div>
                            <Modal
                              isOpen={deleteModal}
                              toggle={toggleDeleteModal}
                              size="lg"
                              backdrop={"static"}
                              id="staticBackdrop"
                            >
                              <div className="modal-header">
                                <h5
                                  className="modal-title mt-0"
                                  id="myModalLabel"
                                >
                                  {t('Are')} {t('you')} {t('sure')} {t('you')} {t('want')} {t('to')} {t('delete')} {t('this')} {t('job')}?
                                  ({t('You')} {t('cannot')} {t('undo')} {t('this')} {t('action')})
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  onClick={toggleDeleteModal}
                                  aria-label="Close"
                                ></button>
                              </div>

                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-light"
                                  onClick={toggleDeleteModal}
                                >
                                  {t('Cancel')}
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-info"
                                  onClick={jobDeleteHandler}
                                >
                                  {t('Ok')}
                                </button>
                              </div>
                            </Modal>
                          </div>

                          <DropdownItem>
                            {" "}
                            <a
                            // onClick={() => { } }
                            >
                              {t('Report')}
                            </a>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      {/* </div> */}
                    </Col>
                    <Col md={12} className="mt-2">
                      {jobData?.due_by &&
                        <div className={`d-flex justify-content-center rounded align-items-center p-3 ${jobData?.due_status == 'Overdue' ? 'bg-danger' : jobData?.due_status == 'Due today' ? 'bg-warning' : 'bg-info'}`}>
                          <div className="me-4 text-white d-flex justify-content-center align-items-center">
                            <i className="fas fa-calendar me-1 font-size-24" /> {jobData?.days_difference ? `${jobData?.days_difference} ${t('days')}` : ''}
                          </div>
                          <div className="d-flex flex-column justify-content-center text-white">
                            {moment(jobData?.due_by).format('DD MMM')}
                            <span>{jobData?.due_status}</span>
                          </div>
                        </div>}
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
                          //color={activityModal ? "modalButtonColor" : "labelColor"}
                          color="labelColor"
                          // onClick={() => {
                          //   toggle("1");
                          // }}
                          onClick={activityToggle}
                          style={{ display: "flex", justifyContent: "space-between", borderRadius: "5px" }}
                        >

                          {t('Activity')}
                          <i className="fas fa-list font-size-12 align-middle me-2"></i>{" "}
                        </Button>

                        <Button
                          className="btn w-100"
                          //color={documentModal ? "modalButtonColor" : "labelColor"}
                          color="labelColor"
                          //onClick={documentToggle}
                          onClick={() => {
                            toggle("2");
                          }}
                          style={{ display: "flex", justifyContent: "space-between", borderRadius: "5px" }}
                        >

                          {t('Documents')}
                          <i className="fas fa-list font-size-12 align-middle me-2"></i>{" "}
                        </Button>
                      </div>

                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>

          </Col>
          {/* <Row className="justify-content-center"> */}
          <Col md={12} lg={10} xs={12} className="p-0">
            <Card data-aos="fade-right" className="custom_card_border_design me-2">
              <CardBody>
                <div>
                  <Row>
                    <Col md={6}>
                      <Row className="py-1">
                        <Col md={4}>{t('Property')}</Col>
                        <Col md={8}>
                          <Link
                            className="text-info"
                            to={`/propertyInfo/${propertyLinkId}`}
                          >
                            <p>{jobData?.property_reference}</p>
                          </Link>
                        </Col>
                      </Row>
                      <div
                        style={{
                          borderBottom: "1.2px dotted #C1C1C1",
                        }}
                      ></div>
                      <Row className="py-3">
                        <Col md={4}>{t('Created')} {t('in')}</Col>
                        <Col md={8} className="text-muted">
                          {/* {jobData?.created_at
                                ? new Date(
                                  jobData?.created_at
                                ).toLocaleDateString("en-us", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })
                                : ""} */}
                          {jobData?.created_at &&
                            moment(jobData?.created_at).format(
                              "DD MMM YYYY"
                            )}
                        </Col>
                      </Row>
                      <div
                        style={{
                          borderBottom: "1.2px dotted #C1C1C1",
                        }}
                      ></div>
                      <Row className="mt-4">
                        <FormGroup row>
                          {/* <Label for="exampleSelect" md={4}>
                            Due by
                          </Label> */}
                          <Col md={12}>
                            <div className="form-group-new" style={{ marginBottom: "-20px" }}>
                              <Flatpickr
                                className="form-control d-block"
                                placeholder="Pick a Date..."
                                value={jobs.due_by}
                                // onChange={() => dateHandler()}
                                options={{
                                  altInput: true,
                                  format: "d/m/Y",
                                  altFormat: "d/m/Y",
                                  onChange: dateHandler,
                                }}
                              />
                              <label htmlFor="usr">{t('Due')} {t('by')}</label>
                            </div>
                          </Col>
                        </FormGroup>
                      </Row>
                      <div
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      ></div>
                      <Row className="mt-4">
                        <FormGroup row>

                          <Col md={12}>
                            <div className="form-group-new" style={{ marginBottom: "-20px" }}>
                              <Select
                                value={state.selectedAccess}
                                onChange={handleSelectAccess}
                                options={state.optionAccess}
                                classNamePrefix="select2-selection"
                              />
                              <label htmlFor="usr">{t('Access')}</label>
                            </div>
                          </Col>
                        </FormGroup>
                      </Row>
                      <div
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      ></div>
                      <Row className="mt-4">
                        <FormGroup row>
                          {/* <Label for="exampleSelect" md={4}>
                            Manager
                          </Label> */}
                          <Col md={12}>

                            <div className="form-group-new" style={{ marginBottom: "-20px" }}>
                              <Select
                                value={state.selectedManager}
                                onChange={handleSelectGroupManager}
                                options={state.optionManager}
                                classNamePrefix="select2-selection"
                              />
                              <label htmlFor="usr">{t('Manager')}</label>
                            </div>
                          </Col>
                        </FormGroup>
                      </Row>
                      <div
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      ></div>
                      <Row className="py-2">
                        {/* Supplier */}
                        {jobData?.maintenance_assign?.status ==
                          "Assigned" ? (
                          <>
                            <Col
                              md={4}
                              className="d-flex justify-content-start"
                            >
                              <i className="bx bx-user-plus fa-2x text-primary"></i>
                            </Col>
                            <Col
                              md={8}
                              className="d-flex justify-content-start"
                            >
                              <h4 className="text-primary">
                                {
                                  jobData?.maintenance_assign?.supplier
                                    ?.first_name
                                }{" "}
                                {
                                  jobData?.maintenance_assign?.supplier
                                    ?.last_name
                                }
                              </h4>
                            </Col>
                          </>
                        ) : null}
                        {/* Owner */}
                        {jobData?.maintenance_assign?.status ==
                          "Owner_Assigned" ? (
                          <>
                            <Col
                              md={4}
                              className="d-flex justify-content-start"
                            >
                              <i className="fas fa-house-user fa-2x text-primary"></i>
                            </Col>
                            <Col
                              md={8}
                              className="d-flex justify-content-start"
                            >
                              <h4 className="text-primary">
                                {
                                  jobData?.maintenance_assign?.owner
                                    ?.first_name
                                }{" "}
                                {
                                  jobData?.maintenance_assign?.owner
                                    ?.last_name
                                }
                              </h4>
                            </Col>
                          </>
                        ) : null}
                        {/* Tenant */}
                        {jobData?.maintenance_assign?.status ==
                          "Tenent_Assigned" ? (
                          <>
                            <Col
                              md={4}
                              className="d-flex justify-content-start"
                            >
                              <i className="fas fa-users fa-2x text-primary"></i>
                            </Col>
                            <Col
                              md={8}
                              className="d-flex justify-content-start"
                            >
                              <h4 className="text-primary">
                                {
                                  jobData?.maintenance_assign?.tenant
                                    ?.first_name
                                }{" "}
                                {
                                  jobData?.maintenance_assign?.tenant
                                    ?.last_name
                                }
                              </h4>
                            </Col>
                          </>
                        ) : null}
                      </Row>
                      {jobData?.maintenance_assign?.status !== undefined ? (
                        <div
                          style={{
                            borderBottom: "1.2px dotted #c9c7c7",
                          }}
                        ></div>
                      ) : null}
                      <Row className="py-3">
                        <Col md={4}>{t('Labels')}</Col>
                        <Col md={8} className="d-flex align-items-center">
                          {level
                            ? selectedLevel.map((item, key) => {
                              return (
                                <span
                                  className="font-size-12 badge rounded-pill bg-info float-start"
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
                      </Row>


                      <div className="py-2">
                        {/* Supplier */}
                        {jobData?.maintenance_assign?.status ==
                          "Assigned" ? (
                          <>
                            <Row className="pb-1">
                              <Col md={4}>Supplier</Col>
                              <Col md={8}>
                                <Link
                                  to={`/contactsInfo/supplier/${jobData?.maintenance_assign?.supplier_id}`}
                                >
                                  <span className="text-info">
                                    {/* {
                                          jobData?.maintenance_assign?.supplier
                                            ?.first_name
                                        }{" "}
                                        {
                                          jobData?.maintenance_assign?.supplier
                                            ?.last_name
                                        } */}
                                    {
                                      jobData?.maintenance_assign?.supplier
                                        ?.reference
                                    }
                                  </span>
                                </Link>
                              </Col>
                            </Row>
                            <Row className="py-1">
                              <Col md={4} className="text-muted">
                                {t('Phone')}
                              </Col>
                              <Col md={8}>
                                {
                                  jobData?.maintenance_assign?.supplier
                                    ?.work_phone
                                }
                              </Col>
                            </Row>
                            <Row>
                              <Col md={4} className="text-muted">
                                {t('Email')}
                              </Col>
                              <Col md={8}>
                                {
                                  jobData?.maintenance_assign?.supplier
                                    ?.email
                                }
                              </Col>
                            </Row>
                          </>
                        ) : null}
                      </div>
                      {jobData?.maintenance_assign?.status !== undefined ? (
                        <div
                          style={{
                            borderBottom: "1.2px dotted #c9c7c7",
                          }}
                        ></div>
                      ) : null}
                    </Col>
                    {/* 2nd column */}
                    <Col md={6}>
                      <div className="d-flex justify-content-end align-items-center">
                        {/* <div className="me-2"><i className="fas fa-cloud-upload-alt fa-2x text-info" /></div> */}



                        <Button
                          className="me-1"
                          color="labelColor"
                        //onClick={() => inputFileProp.current.click()}
                        >
                          <i className="fas fa-cloud-upload-alt font-size-16 text-white"></i>
                        </Button>



                        <Button
                          className="btn"
                          color="info"
                          onClick={() => inputFile.current.click()}
                        >
                          {" "}
                          <i className="bx bx-camera d-block font-size-20"></i>
                        </Button>

                        <input
                          type="file"
                          onChange={handleDocument}
                          ref={inputFile}
                          style={{ display: "none" }}
                          accept="image/*"
                          multiple
                        />
                      </div>
                      <div
                        onDragOver={propertyDrag}
                        onDragLeave={propertyDragend}
                        onDrop={propertyDropFile}
                      >
                        {showDropZoneImage.property ? (
                          <div
                            style={{
                              position: "relative",
                              height: "400px",
                              width: "100%",
                              border: "4px dashed grey",
                              borderRadius: "5px",
                              marginTop: "10px",
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
                              <h4>{t('Add')} {t('photo')}(s) {t('for')} {t('maintenance')}</h4>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {!showDropZoneImage.property && (
                          <>
                            <div
                              className="mt-2 rounded p-1"
                              style={{
                                height: "420px",
                                border: "1px dashed #c9c8c3",
                                borderRadius: "2px",
                              }}
                            >
                              {slides.length > 0 ? (
                                <>
                                  <Carousel
                                    previous={previousButton}
                                    next={nextButton}
                                    activeIndex={activeIndex}
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
                                        jobData?.jobs_images
                                      }
                                      // property_id={id}
                                      apiCall={props.jobImageDelete}
                                      activeIndex={activeIndex}
                                      setActiveIndex={setActiveIndex}
                                    ></ImageModal>
                                  )}
                                </>
                              ) : (
                                <img
                                  src={DummyImg}
                                  style={{
                                    height: "400px",
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
                                  {itemLength + 1}
                                </span>
                              </div>
                            </div>

                            {/* <Lightbox
                                  open={showSliderState.isOpen}
                                  close={() =>
                                    setShowSliderState({ isOpen: false })
                                  }
                                  //slides={image_slides}
                                  slides={image_slides}
                                  plugins={[Zoom, Fullscreen, Video]}
                                /> */}
                          </>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <div
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>
                </div>



                <Row className="mt-4">

                  <Col md={6}>
                    <Row className="py-1">
                      <FormGroup row>
                        <Label for="exampleSelect" md={4}>
                          {t('Tenant')}
                        </Label>
                        <Col md={8} className="mt-1">

                          <div>
                            <Select
                              value={state.selectedTenant}
                              onChange={handleSelectTenant}
                              options={state.optionTenant}
                              classNamePrefix="select2-selection"
                            />
                          </div>
                        </Col>
                        {props.jobListById_show_data?.data?.properties[0]
                          ?.tenant[0]?.mobile_phone ||
                          props.jobListById_show_data?.data?.properties[0]
                            ?.tenant[0]?.home_phone ||
                          props.jobListById_show_data?.data?.properties[0]
                            ?.tenant[0]?.work_phone ? (
                          <Row className="py-1">
                            <Col md={4} className="text-muted">
                              {t('Phone')}
                            </Col>
                            <Col
                              md={8}
                              className="py-1 ps-4 d-flex flex-column justify-content-center"
                            >
                              <span className="py-1">
                                {" "}
                                {
                                  props.jobListById_show_data?.data
                                    ?.properties[0]?.tenant[0]
                                    ?.mobile_phone && `(m) ${props.jobListById_show_data?.data
                                      ?.properties[0]?.tenant[0]
                                      ?.mobile_phone}`
                                }
                              </span>

                              <span className="pb-1">
                                {" "}
                                {
                                  props.jobListById_show_data?.data
                                    ?.properties[0]?.tenant[0]?.home_phone ? ` (h)${props.jobListById_show_data?.data
                                      ?.properties[0]?.tenant[0]?.home_phone}` : ''
                                }
                              </span>

                              <span className="">
                                {" "}
                                {
                                  props.jobListById_show_data?.data
                                    ?.properties[0]?.tenant[0]?.work_phone && `(w) ${props.jobListById_show_data?.data
                                      ?.properties[0]?.tenant[0]?.work_phone}`
                                }
                              </span>
                            </Col>
                          </Row>
                        ) : (
                          ""
                        )}
                        {props.jobListById_show_data?.data?.properties[0]
                          ?.tenant[0]?.email && (
                            <Row className="py-1 ">
                              <Col md={4} className="text-muted">
                                {t('Email')}
                              </Col>
                              <Col md={8} className="">
                                <div className="">
                                  {" "}
                                  {props.jobListById_show_data?.data
                                    ?.properties[0]?.tenant[0]?.email
                                    ? props.jobListById_show_data?.data
                                      ?.properties[0]?.tenant[0]?.email
                                    : ""}
                                </div>
                              </Col>
                            </Row>
                          )}
                      </FormGroup>
                    </Row>
                  </Col>

                  <Col md={6}>


                    {jobData?.properties[0]?.owner?.length > 0 ? (
                      <div className="py-2">
                        <Row className="my-2">
                          <Col md={4}>
                            <Label for="exampleSelect">
                              {t('Owner')}
                            </Label>
                          </Col>
                          <Col md={8}>
                            <Link
                              className="text-info"
                              to={`/contactsInfo/${ownerId}`}
                            >
                              <span>
                                {
                                  jobData?.properties[0]?.owner[0]
                                    ?.first_name
                                }{" "}
                                {
                                  jobData?.properties[0]?.owner[0]
                                    ?.last_name
                                }
                              </span>
                            </Link>
                          </Col>
                        </Row>
                        <Row className="my-3">
                          <Col md={4} className="text-muted">
                            {t('Phone')}
                          </Col>
                          <Col md={8}>
                            {" "}
                            {props.jobListById_show_data?.data
                              ?.properties[0]?.owner[0]?.mobile_phone
                              ? `(m) ${props.jobListById_show_data?.data
                                ?.properties[0]?.owner[0]?.mobile_phone}`
                              : ""}
                          </Col>
                        </Row>
                        <Row className="my-2">
                          <Col md={4} className="text-muted">
                            {t('Email')}
                          </Col>
                          <Col md={8}>
                            {props.jobListById_show_data?.data
                              ?.properties[0]?.owner[0]?.email
                              ? props.jobListById_show_data?.data
                                ?.properties[0]?.owner[0]?.email
                              : ""}
                          </Col>
                        </Row>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* {jobData?.properties[0]?.owner?.length > 0 ? (
                      <div
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      ></div>
                    ) : (
                      ""
                    )} */}
                  </Col>
                  <div
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>
                </Row>

                {props.getQuote_show_data?.data?.length > 0 ? (
                  <div className="mt-5">
                    <div>
                      <h4 className="text-primary">{t('Quotes')}</h4>
                    </div>
                    <div
                      style={{
                        borderBottom: "1.2px dotted #c9c7c7",
                      }}
                    ></div>
                    <div>
                      {editQuoteModal.showEditQuoteModal && (
                        <QuotesModal
                          toggleEditQuoteModal={toggleEditQuoteModal}
                          editQuoteData={editQuoteModal.item}
                          showEditQuoteModal={
                            editQuoteModal.showEditQuoteModal
                          }
                        />
                      )}
                      <Table className="table table-borderless">
                        <tbody>
                          {props.getQuote_show_data?.data[0]?.supplier_id
                            ? props.getQuote_show_data?.data?.map(
                              (item, i) => (
                                <tr key={i}>
                                  <td
                                    style={{ width: "33%" }}
                                    onClick={() => editQuoteHandler(item)}
                                  >
                                    <span className="text-primary">
                                      {item?.supplier?.reference}
                                    </span>
                                  </td>
                                  <td style={{ width: "33%" }}>
                                    {item?.reference}
                                  </td>
                                  <td style={{ width: "24%" }}>
                                    {item?.amount ? `${item?.amount}৳` : ''}
                                  </td>
                                  <td style={{ width: "20%" }}>
                                    {item?.status == "init" ? (
                                      jobData?.status == "Reported" ||
                                        jobData?.status == "Quoted" ? (
                                        <Button
                                          color="info"
                                          className="btn btn-info btn-sm"
                                          onClick={() => {
                                            props.addQuoteJobApprove(
                                              item.id,
                                              id
                                            );
                                          }}
                                        >
                                          {t('Approve')}
                                        </Button>
                                      ) : (
                                        " "
                                      )
                                    ) : item?.status == "approve" ? (
                                      <div className="d-flex justify-content-center">
                                        <i className="fas fa-check-square fa-2x text-info ms-1"></i>
                                      </div>
                                    ) : (
                                      " "
                                    )}
                                  </td>
                                </tr>
                              )
                            )
                            : null}
                        </tbody>
                      </Table>
                    </div>
                    {jobData?.status === "Reported" ||
                      jobData?.status === "Quoted" ? (
                      <div className="d-flex justify-content-end me-2">
                        <QuotesDownModal />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}

                <div className="mt-5">
                  <div>
                    <h4 className="text-primary">{t('Bills')}</h4>
                  </div>
                  <div
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>
                  {jobData?.bill && (
                    <div className="table-responsive">
                      <Table className="table table-borderless mb-0">
                        <thead>
                          <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th className="text-primary">{`Bill #${jobData?.bill?.id
                              } (${moment(jobData?.bill?.billing_date).format(
                                "DD/MM/yyyy"
                              )})`}</th>
                            <td>{jobData?.bill?.details || ""}</td>
                            <td>{jobData?.bill?.amount}৳</td>
                            <td></td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3">
                  <Row>
                    <Col>
                      <h4 className="text-primary">{t('Description')}</h4>

                    </Col>
                    <Col>
                      <div className="d-flex justify-content-end">
                        <Button
                          className="me-1"
                          color="light"
                          outline
                          disabled
                        >
                          <i className="fas fa-cloud-upload-alt font-size-20 text-info"></i>
                        </Button>
                        <Button
                          className="btn m-1"
                          color="secondary"
                          onClick={() => inputDocFile.current.click()}
                        >
                          {" "}
                          <i className="fas fa-paperclip d-block font-size-20"></i>
                        </Button>
                        <input
                          type="file"
                          onChange={handleChange}
                          ref={inputDocFile}
                          style={{ display: "none" }}
                        />
                        <div
                          className="my-1"
                          style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                        />
                      </div>
                    </Col>
                    <div
                      style={{
                        borderBottom: "1.2px dotted #c9c7c7",
                      }}
                    ></div>
                  </Row>

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

                  <div
                    onDragOver={tenantDrag}
                    onDragLeave={tenantDragend}
                    onDrop={tenantDropFile}
                  >
                    {showDropZone ? (
                      <div
                        style={{
                          position: "relative",
                          height: "300px",
                          width: "100%",
                          border: "4px dashed grey",
                          borderRadius: "5px",
                        }}
                        onDrop={e => handlejobDoc(e)}
                        className="mt-2"
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
                          <h4>{t('Add')} {t('document')} {t('to')} {t('Job')}</h4>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {!showDropZone && (
                      <>
                        <Row md={12} className="mt-4">

                          <Col md={6} style={{ marginTop: "-10px" }}>
                            <FormGroup row>
                              <Label for="exampleSelect " className="form-group-new-desc-label" style={{ marginBottom: "-10px", zIndex: "10", width: "85px", padding: "0px 3px 0px 3px", }}>
                                {t('Summary')}
                              </Label>
                              <div className="form-group-new">
                                <Input
                                  name="summary"
                                  type="textarea"
                                  rows="3"
                                  //placeholder="Summary"
                                  className="form-control"
                                  value={jobs.summary}
                                  onChange={selectHandler}
                                  disabled={
                                    jobData?.status == "Closed" ? true : false
                                  }
                                />

                              </div>
                            </FormGroup>
                          </Col>


                          <Col md={6} style={{ marginTop: "-10px" }}>
                            <FormGroup row>
                              <Label for="exampleSelect " className="form-group-new-desc-label" style={{ marginBottom: "-10px", zIndex: "10", width: "135px", padding: "0px 3px 0px 3px", }}>
                                {t('Work')} {t('order')} {t('notes')}
                              </Label>
                              <div className="form-group-new">
                                <Input
                                  name="work_order_notes"
                                  type="textarea"
                                  rows="3"
                                  className="form-control"
                                  placeholder="Work order notes"
                                  value={jobs.work_order_notes}
                                  onChange={selectHandler}
                                  disabled={
                                    jobData?.status == "Closed" ? true : false
                                  }
                                />

                              </div>
                            </FormGroup>
                          </Col>


                        </Row>




                        <FormGroup row>
                          <Label for="exampleSelect " className="form-group-new-desc-label" style={{ marginBottom: "-10px", zIndex: "10", width: "90px", padding: "0px 3px 0px 3px" }}>
                            {t('Description')}
                          </Label>

                          <Col md={12}>
                            <div className="form-group-new-desc" >
                              <Input
                                name="description"
                                type="textarea"
                                rows="5"
                                className="form-control"
                                //placeholder="Description"
                                value={jobs.description}
                                onChange={selectHandler}
                                disabled={
                                  jobData?.status == "Closed" ? true : false
                                }
                              />
                              {/* <label htmlFor="usr" style={{ marginTop: "-10px" }}>Description</label> */}
                            </div>
                          </Col>
                        </FormGroup>
                      </>
                    )}
                  </div>
                </div>
                <Row className="mt-2">
                  <Col
                    md={12}
                    className="mt-1 d-flex justify-content-end mb-4"
                  >
                    <button
                      className="btn btn-buttonCancelColor w-md"
                      type="submit"
                    >
                      <i className="fas fa-times me-1"></i> {t('Cancel')}
                    </button>
                    <button
                      className="btn btn-buttonColor w-md ms-2"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      <i className="fas fa-file-alt me-1"></i> {t('Save')}
                    </button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
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
                  {t('Activity')}
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
                    <Link to={`/all-job-activity/${id}`}>
                      {/* <span className="font-size-14 text-dark">
                                All
                              </span> */}
                      <div className="badge badge-soft-secondary d-flex align-items-start px-3 py-2 font-size-16 text-white">
                        {t('All')}
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
                {t('Active')}
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
                    <ShowActivityData data={data} key={i} />
                  ))}
                </div>
                {activityData?.length > 0 && (
                  <div className="w-100 mt-2 d-flex justify-content-end">
                    <Link to={`/all-job-activity/${id}`}>
                      <Button color="labelColor">
                        <i className="fas fa-external-link-alt me-1" />
                        {t('View')} {t('All')}
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
                  {t('Comments')}
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
                  {t('Activity')}
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
                  job_id={id}
                />

              </Col>
            </Row>
          </ModalBody>
        </Modal>
        {/* ================= comment modal end   ===================*/}


        {msgModal && (
          <MessagesModal
            toggle={toggleMsgModal}
            msgModal={msgModal}
            jobId={id}
          />
        )}
      </div>
      {documentModal &&
        <PropertyDocs
          documentModal={documentModal} documentToggle={documentToggle} component='Jobs'
          data={props.all_job_document?.data?.data} id={id}
        />}
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    property_add_loading,

    property_info_data,
    property_info_error,
    property_info_loading,

    user_list_data,
    user_list_loading,

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
  } = gstate.property;

  const {
    jobListById_show_loading,
    jobListById_show_data,
    getQuote_show_loading,
    getQuote_show_data,
    job_modal_edit_loading,
    supplier_list_loading,
    supplier_list_data,
    job_info_image_add_loading,
    job_status_loading,
    add_supplier_from_job_loading,
    job_delete_loading,
    job_quote_add_loading,
    job_quote_edit_loading,
    job_quote_delete_loading,
    upload_job_file_loading,

    job_image_delete_loading
  } = gstate.Jobs;

  const { contacts_list_data, contacts_list_loading, contacts_show_loading } =
    gstate.Contacts2;

  const {
    job_message_data,
    job_message_data_loading,
    add_message_data_loading,
    job_all_activity,
    job_all_activity_error,
    job_all_activity_loading,
  } = gstate.Activity;

  const {
    all_job_document,
    all_job_document_error,
    all_job_document_loading,

    store_inspection_task_job_document_loading,
  } = gstate.Document;

  return {
    property_add_loading,

    property_info_data,
    property_info_error,
    property_info_loading,

    user_list_data,
    user_list_loading,

    property_update_info_loading,

    property_tenant_info_data,
    property_tenant_info_error,
    property_tenant_info_loading,

    property_add_tanent_loading,

    property_owner_info_data,
    property_owner_info_error,
    property_owner_info_loading,

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

    jobListById_show_loading,

    jobListById_show_data,

    getQuote_show_loading,
    getQuote_show_data,

    job_modal_edit_loading,

    supplier_list_loading,
    supplier_list_data,

    job_info_image_add_loading,

    job_status_loading,

    add_supplier_from_job_loading,

    job_delete_loading,

    job_message_data,
    job_message_data_loading,

    store_inspection_task_job_document_loading,

    all_job_document,
    all_job_document_error,
    all_job_document_loading,

    job_all_activity,
    job_all_activity_error,
    job_all_activity_loading,

    add_message_data_loading,

    job_quote_add_loading,
    job_quote_edit_loading,
    job_quote_delete_loading,
    upload_job_file_loading,

    job_image_delete_loading
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
    propertyTenantAddFresh,
    propertyOwnerAddFresh,
    contactList,
    propertyUpdateFresh,
    getPropertyKeyFresh,
    getPropertyInfoFresh,
    showContactFresh,
    lebelInsert2,
    JobsListById,
    propertyList,
    JobsLabel,
    getQuote,
    addQuoteJobApprove,
    editJobInfo,
    editJobInfoFresh,
    JobsListByIdFresh,
    SupplierList,
    jobInfoImageAdd,
    jobInfoImageAddFresh,
    jobApprove,
    addSupplierFromJob,
    addSupplierFromJobFresh,
    jobUnassigned,
    jobStatusFresh,
    getQuoteFresh,
    jobUnapprove,
    jobUnquote,
    jobOwnerAssigned,
    jobTenantAssigned,
    jobCompleted,
    getQuoteInit,
    jobReopen,
    jobFinished,
    deleteJob,
    JobsList,
    deleteJobFresh,
    getMessageJob,
    addComment,
    addCommentFresh,
    storeInspectionTaskJobDocument,
    storeInspectionTaskJobDocumentFresh,
    AllJobDocument,
    jobAllActivity,

    editQuoteJob,
    editQuoteFresh,
    deleteQuoteJob,
    deleteQuoteJobFresh,
    uploadJobFileFresh,

    jobImageDelete, jobImageDeleteFresh
  })(JobInfo)
);
