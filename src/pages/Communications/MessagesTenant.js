import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Input,
  Label,
  Row,
  TabContent,
  TabPane,
  Nav,
  Media,
  Alert,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ButtonDropdown,
  Badge,
  CardBody,
  Form,
  FormGroup,
  UncontrolledCollapse,
  Collapse,
} from "reactstrap";
import classnames from "classnames";
import moment from "moment";
import { flatMap, map } from "lodash";
import {
  getInboxMails,
  getStarredMails,
  getImportantMails,
  getDraftMails,
  getSentMails,
  getTrashMails,
} from "store/mails/actions";
import {
  sendMail,
  mailList,
  sendReply,
  inboxList,
  mailSendFresh,
  mailListUndelivered,
  mailListSent,
  sendSMS,
  sendSMSFresh,
  smsList,
  sendMailTemplate,
  sendSMSTemplate,
  sendMailTemplateFresh,
  sendSMSTemplateFresh,
  templateListSMS,
  templateListSMSFresh,
  templateListBySMSId,
  templateList,
  templateListFresh,
  templateListById,
  sendMailTemplateEditByUserID,
  mailTemplateEditFresh,
  sendSMSTemplateEditByUserID,
  smsTemplateEditFresh,
  deleteMailTemplateByID,
  deleteMailTemplateFresh,
  deleteSmsTemplateByID,
  deleteSmsTemplateFresh,
  sendMultipleMail,
  multipleMailSendFresh,
  deleteMultipleMail,
  multipleMailDeleteFresh,
  scheduleRegardingData,
  scheduleTriggerTo,
  scheduleTriggerFrom,
  addSchedule,
  addScheduleFresh,
  sendReplyFresh,
  smsOutboxList,
  getsentsmsList,
  mailSeenUnseenFresh,
  sendMailSeenUnseen, outboxMailData, outboxMailDataOwner
} from "store/Messages/actions";
import toastr from "toastr";
import Select from "react-select";
import Switch from "react-switch";
// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Email Topbar
// import EmailToolbar from "./email-toolbar"

//Import images
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import MailLogo from "../../assets/images/image.png";
import Pagination from "pages/PaginatedItems/Pagination";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import EditScheduleModal from "./EditScheduleModal";
import DeleteModal from "pages/Calendar/DeleteModal";

import ReplyCard from "./ReplyCard";
import parse from 'html-react-parser';
import DatatableTables2 from "pages/Tables/DatatableTables2";
import ShowSMSModal from "./Modal/ShowSMSModal";

const Messages = props => {
  const [state, setState] = useState({
    modal: false,
    modal1: false,
    mailBodyModal: false,
    mailBodyModal2: false,
    loader: false,
    mailBodyModalText: null,
    mailBodyModalText2: null,
    activeTab: "0",
    passedSteps: [1],
    resultArray: [],
    inboxmails: [],
    starredmails: [],
    importantmails: [],
    draftmails: [],
    sentmails: [],
    trashmails: [],
    to: null,
    subject: null,
    body: null,
    from: null,
    id: null,
    body: "",
    reply: []
  });

  console.log(state);
  const [undeliveredButton, setUndeliveredBotton] = useState(false);
  const [sentButton, setSentButton] = useState(false);
  const [smsButton, setSMSButton] = useState(false);
  const [smsTempButton, setSMSTempButton] = useState(false);
  const [deleteTempStatus, setDeleteTempStatus] = useState(false);
  const [scheduleModalForSMS, setScheduleModalForSMS] = useState(false);
  const [modalSMS, setModalSMS] = useState(false);

  const toggleSMSmodal = () => {
    setModalSMS(!modalSMS);
  };
  const [showSMSModal, setShowSMSModal] = useState(false);
  const toggleShowSMSModal = () => setShowSMSModal(prev => !prev);
  const [modalDelete, setModalDelete] = useState(false);
  const [data, setData] = useState({ smsData: {}, deleteData: {} })
  const [mailTempEditData, setMailTempEditData] = useState({
    subject: null,
    body: null,
  });

  const [smsTempEditData, setSMSTempEditData] = useState({
    name: null,
    message: null,
  });

  var authUser = JSON.parse(localStorage.getItem("authUser"));
  console.log(authUser.user.user_type);

  const [state2, setState2] = useState();
  const [smsOutboxTab, setSmsOutboxTab] = useState(false);
  const [smsSentTab, setSmsSentTab] = useState(false);
  const [desc, setDesc] = useState({});
  const [dOpen, setDOpen] = useState(false);
  const [selectTemplateDropdown, setSelectTemplateDropdown] = useState(false);
  const [selectTemplateSMSDropdown, setSelectTemplateSMSDropdown] =
    useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const [showTemplateSMS, setShowTemplateSMS] = useState(false);
  const [showSmsTemp, setShowSMSTemp] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroupSMS, setSelectedGroupSMS] = useState(null);
  const [optionGroup, setOptionGroup] = useState();
  const [modal, setModal] = useState(false);
  const [smsTempList, setSmsTempList] = useState();
  const [checkStatus, setCheckStatus] = useState(false);
  const [checkSmsStatus, setCheckSmsStatus] = useState(false);
  const [deleteState, setDeleteState] = useState();
  const [deleteState2, setDeleteState2] = useState();
  const [mess, setMess] = useState(false);
  const [mails, setMails] = useState([]);
  const [status, setStatus] = useState(true);
  const toggle = () => setModal(!modal);

  // delete modal 1
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDelete = () => setDeleteModal(!deleteModal);

  // delete modal 2
  const [deleteModal2, setDeleteModal2] = useState(false);
  const toggleDelete2 = () => setDeleteModal2(!deleteModal2);

  const [editMailTempmodal, setEditMailTempmodal] = useState(false);
  const mailTempEdittoggle = () => setEditMailTempmodal(!editMailTempmodal);

  // sms template update modal
  const [smsTempUpdate, setSMSTempUpdate] = useState(false);
  const smsTempUpdatetoggle = () => setSMSTempUpdate(!smsTempUpdate);

  // template Modal
  const [taskModal, setTaskModal] = useState(false);
  const [smsModal, setSMSModal] = useState(false);
  const toggleTempModal = () => {
    setTaskModal(!taskModal);
  };

  // schedule modal for SMS 
  const [scheduleModalSMS, setScheduleModalSMS] = useState(false);
  const toggleTempModalSMS = () => {
    setSMSModal(!smsModal);
  };
  const [sendReply, setReply] = useState(false);
  // make mail temp field null
  const handleMailTempFieldNull = () => {
    console.log("=====================Hello brother==============================")
    setMailTempEditData({
      ...mailTempEditData,
      subject: "",
      //body: props.tmp_list_id_data?.template?.subject,
      body: "",
    });

    setSelectedGroup(null);
    //setShowTemplate(false);
  }

  const handleToggleTempModal = () => {
    console.log(state.body);
    console.log(mailTempEditData.subject);
    // if (state.body.length === 0 || state.body) {
    //   toastr.warning("Subject can not be empty");
    // } else {
    //   toggleTempModal();
    // }
    if (state.body && mailTempEditData.subject) {
      toggleTempModal();
    } else {
      toastr.warning(" Subject & Body can not be empty");
    }
  };

  // schedule modal for SMS start from here
  const handleToggleTempModalForSMS = () => {
    console.log(state2);
    if (state2) {
      toggleTempModalSMS();
    } else {
      toastr.warning("Please fill up all fields");
    }

  };
  // schedule modal for SMS start from here

  //Schedule state
  const [schedule, setSchedule] = useState({
    init: true,
    clickRegarding: false,
    selectRegarding: {},
    optionRegarding: [],
    selectTo: {},
    optionTo: [],
    selectFrom: {},
    optionFrom: [],
    editScheduleModal: false,
    templateData: []
  });

  const toggleEditScheduleModal = () => {
    setSchedule(prev => ({ ...prev, editScheduleModal: !prev.editScheduleModal }))
  }

  //For datatable
  const [actionArray, setActionArray] = useState([]);


  const handleEditMailTempForm = id => {
    console.log(id);
    setEditMailTempmodal(!editMailTempmodal);
    props.templateListById(id);
    setCheckStatus(true);
  };

  const handleDeleteMailTempForm = () => {
    console.log(deleteState);
    setDeleteModal(!deleteModal);
    setDeleteTempStatus(true);
    setState({ ...state, loader: true });
    props.deleteMailTemplateByID(deleteState);
  };

  const handleDeleteSMSTempForm = () => {
    console.log(deleteState2);
    setDeleteModal2(!deleteModal2);
    setState({ ...state, loader: true });
    props.deleteSmsTemplateByID(deleteState2);
  };

  const handleEditSMSTempForm = id => {
    console.log(id);
    setSMSTempUpdate(!smsTempUpdate);
    props.templateListBySMSId(id);
    setCheckSmsStatus(true);
  };

  const handleMailTempEditForm = e => {
    e.preventDefault();
    console.log(props.tmp_list_id_data?.template?.id);
    console.log(mailTempEditData);
    setEditMailTempmodal(!editMailTempmodal);
    setState({ ...state, loader: true });

    props.sendMailTemplateEditByUserID(
      props.tmp_list_id_data?.template?.id,
      mailTempEditData
    );
  };

  const handleSMSTempEditForm = e => {
    e.preventDefault();
    console.log("======== this is sms edit temp form");
    //console.log(props.tmp_list_id_sms_data?.template?.id)
    console.log(props.tmp_list_id_sms_data?.data?.id);
    console.log(smsTempEditData);
    setSMSTempUpdate(!smsTempUpdate);
    setState({ ...state, loader: true });
    props.sendSMSTemplateEditByUserID(
      props.tmp_list_id_sms_data?.data?.id,
      smsTempEditData
    ); handleMultipleItem
  };
  //const arr = [];

  const handleMultipleItem = id => {
    let arr = [];
    let checkboxes = document.querySelectorAll(
      "input[type='checkbox']:checked"
    );
    console.log(checkboxes.length);
    for (let i = 0; i < checkboxes.length; i++) {
      arr.push(checkboxes[i].id);
    }
    console.log(arr);
    setMails(arr);
  };
  console.log(mails);

  function uncheckAllBoxes() {
    var input = document.querySelectorAll(
      "input[type='checkbox']:checked"
    );
    for (var i = 0; i < input.length; i++) {
      input[i].checked = false;
    }
    //this.onclick = checkAllBoxes;
  }
  const resultEl = document.getElementById("result");
  console.log(resultEl);
  const toggleTab = tab => {
    if (props.activeTab !== tab) {
      setState({ activeTab: tab });
    }
    if (tab == 1) {
      props.outboxMailDataOwner();

    }
    if (tab == 2) {
      props.mailListUndelivered();
    }
    if (tab == 3) {
      props.mailListSent();
    }
    if (tab == 4) {
      props.smsList();
    }
    if (tab == 5) {
      props.smsOutboxList();
      console.log("========================this is tab 5==================")
    }
    if (tab == 6) {
      props.templateList();
    }
    if (tab == 8) {
      props.getsentsmsList();
    }
    if (tab == 0) {
      props.inboxList();
    }
  };
  const togglemodal = () => {
    setState(prevState => ({
      modal: !prevState.modal,
      activeTab: "0",
    }));
  };
  const togglemodal1 = () => {
    setState(prevState => ({
      modal1: !prevState.modal1,
      activeTab: "1", activeTab
    }));
  };

  const toggleMailBodyModal = (tab, text, to, from, subject, id) => {
    console.log(tab, text);
    setState(prevState => ({
      mailBodyModal: !prevState.mailBodyModal,
      activeTab: tab,
      mailBodyModalText: text,
      to: to,
      subject: subject,
      from: from,
      id: id,
    }));
  };

  const toggleMailBodyModal2 = (tab, text, to, from, subject, id, reply, reply_from, reply_to) => {
    console.log(tab, text);
    setState(prevState => ({
      mailBodyModal2: !prevState.mailBodyModal2,
      activeTab: tab,
      mailBodyModalText: text,
      to: to,
      subject: subject,
      from: from,
      id: id,
      reply: reply,
      reply_from: reply_from,
      reply_to: reply_to
    }));
  };

  const toggleMailBodyModalWithouttext = () => {
    setState(prevState => ({
      mailBodyModal: !prevState.mailBodyModal,
      activeTab: state.activeTab,
    }));
  };

  const toggleMailBodyModalWithouttext2 = () => {
    setState(prevState => ({
      mailBodyModal2: !prevState.mailBodyModal2,
      activeTab: state.activeTab,
    }));
  };

  document.title = "CliqProperty";

  const {
    inboxmails,
    starredmails,
    importantmails,
    draftmails,
    sentmails,
    trashmails,
  } = props;


  // const handleSubmitMail = e => {
  //   e.preventDefault();
  //   if (state.to == null) {
  //     // setMess(true);
  //     // setTimeout(() => {
  //     //   setMess(false);
  //     // }, 5000);
  //     toastr.warning("Please fill up all fields");
  //   } else if (state.id != null) {
  //     console.log("Hiiiiiii");
  //     console.log(state);

  //     props.sendMail(state, mailTempEditData.subject);

  //     setSelectedGroup(null);
  //     setOptionGroup([]);
  //     // toggleTab("1")
  //     setState(prevState => ({
  //       //modal: !prevState.modal,
  //       activeTab: "0",
  //       loader: true,
  //       body: "",
  //     }));
  //     setMailTempEditData(...mailTempEditData, {
  //       body: "",
  //       subject: "",
  //     });
  //   } else {
  //     props.sendMail(state, mailTempEditData.subject);

  //     setSelectedGroup(null);
  //     setOptionGroup([]);
  //     // toggleTab("1")
  //     setState(prevState => ({
  //       modal: !prevState.modal,
  //       activeTab: "0",
  //       loader: true,
  //       body: "",
  //     }));
  //     setMailTempEditData(...mailTempEditData, {
  //       body: "",
  //       subject: "",
  //     });
  //   }

  //   // props.addJobModal(state, report);
  // };
  // const handleSubmitMail = e => {
  //   e.preventDefault();
  //   if (state.to == null) {
  //     // setMess(true);
  //     // setTimeout(() => {
  //     //   setMess(false);
  //     // }, 5000);
  //     toastr.warning("Please fill up all fields");
  //   } else if (state.id != null) {
  //     console.log("Hiiiiiii");
  //     console.log(state);

  //     props.sendMail(state, mailTempEditData.subject);

  //     setSelectedGroup(null);
  //     setOptionGroup([]);
  //     // toggleTab("1")
  //     setState(prevState => ({
  //       //modal: !prevState.modal,
  //       loader: true,
  //       body: "",
  //     }));
  //     setMailTempEditData(...mailTempEditData, {
  //       body: "",
  //       subject: "",
  //     });
  //   } else {
  //     props.sendMail(state, mailTempEditData.subject);

  //     setSelectedGroup(null);
  //     setOptionGroup([]);
  //     // toggleTab("1")
  //     setState(prevState => ({
  //       modal: !prevState.modal,
  //       loader: true,
  //       body: "",
  //     }));
  //     setMailTempEditData(...mailTempEditData, {
  //       body: "",
  //       subject: "",
  //     });
  //   }

  //   // props.addJobModal(state, report);
  // };

  const handleSubmitMail = e => {
    e.preventDefault();
    if (state.to == null) {
      // setMess(true);
      // setTimeout(() => {
      //   setMess(false);
      // }, 5000);
      toastr.warning("Please fill up all fields");
    } else if (state.id != null) {
      console.log("Hiiiiiii");
      console.log(state);

      props.sendMail(state, mailTempEditData.subject);

      setSelectedGroup(null);
      setOptionGroup([]);
      // toggleTab("1")
      // setState(prevState => ({
      //   //modal: !prevState.modal,
      //   loader: true,
      //   body: "",
      // }));
      setState({ ...state, loader: true })
      setMailTempEditData(...mailTempEditData, {
        body: "",
        subject: "",
      });
    } else {
      props.sendMail(state, mailTempEditData.subject);

      setSelectedGroup(null);
      setOptionGroup([]);
      // toggleTab("1")
      // setState(prevState => ({
      //   modal: !prevState.modal,
      //   loader: true,
      //   body: "",
      // }));
      setState({ ...state, loader: true })

      setMailTempEditData(...mailTempEditData, {
        body: "",
        subject: "",
      });
    }

    // props.addJobModal(state, report);
  };

  // const handleReplyMail = e => {
  //   e.preventDefault();
  //   console.log("========== I am in reply Mail system =============");
  //   console.log(state.body);
  //   if (state.to == null) {
  //     // setMess(true);
  //     // setTimeout(() => {
  //     //   setMess(false);
  //     // }, 5000);
  //     toastr.warning("Please fill up all fields");
  //   } else if (state.id != null) {
  //     console.log("Hiiiiiii");
  //     setState({ ...state, to: (authUser.user.email == state.to ? state.from : state.to), from: authUser.user.email });
  //     console.log(state);

  //     // props.sendReply(state);

  //     setSelectedGroup(null);
  //     setOptionGroup([]);
  //     // toggleTab("1")
  //     setState(prevState => ({
  //       //modal: !prevState.modal,
  //       activeTab: "0",
  //       //loader: true,
  //       body: "",
  //     }));
  //     // setMailTempEditData(...mailTempEditData, {
  //     //   body: "",
  //     //   subject: "",
  //     // });
  //   }
  //   // else {
  //   //   props.sendMail(state, mailTempEditData.subject);

  //   //   setSelectedGroup(null);
  //   //   setOptionGroup([]);
  //   //   // toggleTab("1")
  //   //   setState(prevState => ({
  //   //     modal: !prevState.modal,
  //   //     activeTab: "1",
  //   //     loader: true,
  //   //     body: "",
  //   //   }));

  //   // }

  //   // props.addJobModal(state, report);
  // };

  const handleReplyMail = e => {
    e.preventDefault();
    console.log("========== I am in reply Mail system =============");
    console.log(state.body);
    if (state.to == null) {
      // setMess(true);
      // setTimeout(() => {
      //   setMess(false);
      // }, 5000);
      toastr.warning("Please fill up all fields");
    } else if (state.id != null) {
      console.log("Hiiiiiii");
      // console.log(state);
      // setState({ ...state, to: (authUser.user.email == state.to ? state.from : state.to), from: "890" });
      console.log(state);
      props.sendReply(state);

      setSelectedGroup(null);
      setOptionGroup([]);
      // toggleTab("1")
      setState({ ...state, mailBodyModal2: false })

      // setMailTempEditData(...mailTempEditData, {
      //   body: "",
      //   subject: "",
      // });
    }
    // else {
    //   props.sendMail(state, mailTempEditData.subject);

    //   setSelectedGroup(null);
    //   setOptionGroup([]);
    //   // toggleTab("1")
    //   setState(prevState => ({
    //     modal: !prevState.modal,
    //     activeTab: "1",
    //     loader: true,
    //     body: "",
    //   }));

    // }

    // props.addJobModal(state, report);
  };



  const handleMultipleMailSend = () => {
    console.log(mails);
    if (mails.length < 1) {
      toastr.warning("Oppps, You didn't select any mail");

      setState({ ...state, loader: false });
    } else {
      props.sendMultipleMail(mails);
      setState({ ...state, loader: true });
      setMails([]);

    }
  };
  const handleMultipleMailDelete = () => {
    console.log(mails);
    if (mails.length < 1) {
      toastr.warning("Oppps, You didn't select any mail");

      setState({ ...state, loader: false });
    } else {
      props.deleteMultipleMail(mails);
      setState({ ...state, loader: true });
      setMails([]);
      //uncheckAllBoxes();
    }
  };

  const handleSubmitSMS = e => {
    e.preventDefault();
    console.log(e);
    console.log(state2);
    console.log(smsTempEditData.message);
    props.sendSMS(state2, smsTempEditData.message);
    console.log(state2);
    toggleSMSmodal();
    setState(prevState => ({
      modal1: !prevState.modal1,
      activeTab: "4",
      loader: true,
    }));
  };

  const saveMailTemplate = e => {
    e.preventDefault();

    props.sendMailTemplate(state, mailTempEditData.subject);

    setState(prevState => ({
      activeTab: "1",
      loader: true,
    }));
  };

  const saveSMStemplate = e => {
    e.preventDefault();
    console.log(state2);
    props.sendSMSTemplate(state2, smsTempEditData.message);
    setModal(false);

    setState(prevState => ({
      loader: true,
    }));
  };

  const selectHandlerForMessage = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const selectHandlerForSMS = e => {
    setState2({ ...state2, [e.target.name]: e.target.value });
  };

  const dropDownHandler = e => {
    if (e.target.value == "1") togglemodal();
    if (e.target.value == "2") toggleSMSmodal();
  };

  const selectDropDownHandler = e => {
    console.log(e.target.value);

    if (e.target.value) {
      props.templateListById(e.target.value);
      setShowTemplate(true);
    }
  };

  const handleSelectGroupForMail = e => {
    console.log(e.value);
    setSelectedGroup(e);
    if (e.value != undefined) {
      props.templateListById(e.value);
      setShowTemplate(true);
    }
  };
  //============= template list for SMS ===============
  const handleSelectGroupForSMS = e => {
    console.log(e.value);
    setSelectedGroupSMS(e);
    if (e.value != undefined) {
      props.templateListBySMSId(e.value);
      setShowTemplateSMS(true);
    }
  };

  const selectDropDownHandlerForSMS = e => {
    console.log(e.target.value);
    if (e.target.value) {
      setShowSMSTemp(true);
    }
  };

  // console.log(props.tmp_list_data?.template);
  const templateAllData = props.tmp_list_data?.template;
  // console.log(props.tmp_list_id_data?.template);
  const templateDataById = props.tmp_list_id_data?.template;

  //mail temp delete
  const mailTempDelete = id => {
    console.log(id);
    setDeleteState(id);
    setDeleteModal(!deleteModal);
  };

  //sms temp delete
  const smsTempDelete = id => {
    setDeleteState2(id);
    setDeleteModal2(!deleteModal2);
  };

  //====== filter mail for out box starts from here ===========
  let outboxMail = props.mail_list_data
    ? props.mail_list_data.data
      ? props.mail_list_data.data.filter(mail => mail.status != "sent")
      : null
    : null;





  //====== filter mail for out box starts from here ===========
  // let allSenrMail = props.mail_list_data
  //   ? props.mail_list_data.data
  //     ? props.mail_list_data.data.filter(mail => mail.status == "sent")
  //     : null
  //   : null;
  // console.log(allSenrMail);

  let allSenrMail = props.mail_list_sent_data
    ? props.mail_list_sent_data.data
      ? props.mail_list_sent_data.data.filter(mail => mail.status == "sent" && mail.type != "sms")
      : null
    : null;
  console.log(allSenrMail);


  /*
   * pagination start from here
   */
  // ========== pagination for outbox starts from here ===========
  const [currentPage, setCurrentPage] = useState(1);

  const [postsPerPage] = useState(10);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  console.log(indexOfFirstPost);
  const [color, setColor] = useState("green");
  const currentPosts = outboxMail
    ? outboxMail.slice(indexOfFirstPost, indexOfLastPost)
    : null;
  console.log(currentPosts);
  const outboxLength = outboxMail
    ? outboxMail.length > 0
      ? outboxMail.length
      : null
    : null;
  // Change page
  const paginate = pageNumber => {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
  };
  const handleForward = () => {
    if (currentPage < Math.ceil(outboxLength / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
  };

  const handleBackward = () => {
    // if (currentPage < Math.ceil(outboxLength / postsPerPage)) {
    //   //setCurrentPage(1);
    //   setCurrentPage(currentPage - 1);
    // } else if (currentPage < 1) {
    //   setCurrentPage(outboxLength);
    // }
    // else if (currentPage > Math.ceil(outboxLength / postsPerPage) && currentPage < 1) {
    //   setCurrentPage(outboxLength);
    // }
    // else {
    //   setCurrentPage(1);
    // }
    if (Math.ceil(outboxLength / postsPerPage) > currentPage) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage == 0) {
      setCurrentPage(1);
    } else {
      setCurrentPage(1);
    }
  };
  // ========== pagination for outbox ends here ===========

  // ========== pagination for "SENT" starts from here ===========
  const [currentPageForSentMail, setCurrentPageForSentMail] = useState(1);

  // Get current posts
  const indexOfLastPostForSentMail = currentPageForSentMail * postsPerPage;
  const indexOfFirstPostForSentMail = indexOfLastPostForSentMail - postsPerPage;

  const currentPostsForSentMail = allSenrMail
    ? allSenrMail.slice(indexOfFirstPostForSentMail, indexOfLastPostForSentMail)
    : null;
  console.log(currentPostsForSentMail);
  const allSenrMailLength = allSenrMail
    ? allSenrMail.length > 0
      ? allSenrMail.length
      : null
    : null;
  // Change page
  const paginateFotSent = pageNumber => {
    console.log(pageNumber);
    setCurrentPageForSentMail(pageNumber);
  };
  const handleForwardForSent = () => {
    if (currentPage < Math.ceil(allSenrMailLength / postsPerPage)) {
      setCurrentPageForSentMail(currentPageForSentMail + 1);
    } else {
      setCurrentPageForSentMail(1);
    }
  };

  const handleBackwardForSent = () => {
    if (currentPage < Math.ceil(allSenrMailLength / postsPerPage)) {
      //setCurrentPage(1);
      setCurrentPageForSentMail(currentPageForSentMail - 1);
    } else if (currentPageForSentMail <= 1) {
      setCurrentPageForSentMail(allSenrMailLength);
    } else {
      setCurrentPageForSentMail(1);
    }
  };
  // ========== pagination for "SENT" ends here ===========

  // ========== pagination for "SMS" starts from here ===========
  const [currentPageForSMS, setCurrentPageForSMS] = useState(1);

  // Get current posts
  const indexOfLastPostForSMS = currentPageForSMS * postsPerPage;
  const indexOfFirstPostForSMS = indexOfLastPostForSMS - postsPerPage;

  const currentPostsForSMS = props.sms_list_data?.data
    ? props.sms_list_data?.data.slice(
      indexOfFirstPostForSMS,
      indexOfLastPostForSMS
    )
    : null;
  console.log(props.sms_outbox_data);
  console.log(currentPostsForSMS);
  // ============= sms outbox ===========  
  const [currentPageForSMSOutbox, setCurrentPageForSMSOutbox] = useState(1);
  const indexOfLastPostForSMSOutbox = currentPageForSMSOutbox * postsPerPage;
  const indexOfFirstPostForSMSOutbox = indexOfLastPostForSMSOutbox - postsPerPage;
  // ============= sms sent ===========  
  const [currentPageForSMSSent, setCurrentPageForSMSSent] = useState(1);
  const indexOfLastPostForSMSSent = currentPageForSMSSent * postsPerPage;
  const indexOfFirstPostForSMSSent = indexOfLastPostForSMSSent - postsPerPage;

  const currentPostsForSMSOutbox = props.sms_outbox_data?.data
    ? props.sms_outbox_data?.data.slice(
      indexOfFirstPostForSMSOutbox,
      currentPageForSMSOutbox
    )
    : null;

  // const currentPostsForSMSSent = props.sms_sent_data?.data ? props.sms_sent_data?.data
  // ? props.sms_sent_data?.data.slice(
  //   indexOfFirstPostForSMSSent,
  //   currentPageForSMSSent
  // )
  // : null;
  const currentPostsForSMSSent = props.sms_sent_data?.data
    ? props.sms_sent_data?.data.slice(
      indexOfFirstPostForSMSSent,
      currentPageForSMSSent
    )
    : null;
  console.log(currentPostsForSMSOutbox);
  const allSMSOutboxLength = props.sms_outbox_data?.data
    ? props.sms_outbox_data?.data.length > 0
      ? props.sms_outbox_data?.data.length
      : null
    : null;

  console.log(props.sms_sent_data?.data);


  console.log(currentPostsForSMSSent);

  const allSMSSentLength = props.sms_sent_data?.data
    ? props.sms_sent_data?.data.length > 0
      ? props.sms_sent_data?.data.length
      : null
    : null;
  console.log(allSMSSentLength);
  console.log(currentPostsForSentMail);
  const allSMSLength = props.sms_list_data?.data
    ? props.sms_list_data?.data.length > 0
      ? props.sms_list_data?.data.length
      : null
    : null;
  // Change page
  const paginateForSMS = pageNumber => {
    console.log(pageNumber);
    setCurrentPageForSMS(pageNumber);
  };
  const handleForwardForSMS = () => {
    if (currentPageForSMS < Math.ceil(allSMSLength / postsPerPage)) {
      setCurrentPageForSMS(currentPageForSMS + 1);
    } else {
      setCurrentPageForSMS(1);
    }
  };

  const handleBackwardForSMS = () => {
    if (currentPageForSMS < Math.ceil(allSMSLength / postsPerPage)) {
      //setCurrentPage(1);
      setCurrentPageForSMS(currentPageForSMS - 1);
    } else if (currentPageForSMS <= 1) {
      setCurrentPageForSMS(allSMSLength);
    } else {
      setCurrentPageForSMS(1);
    }
  };
  // ========== pagination for "SMS" ends here ===========

  // ========== pagination for "MAIL TEMPLATE" starts from here ===========
  const [currentPageForMailTemp, setCurrentPageForMailTemp] = useState(1);

  // Get current posts
  const indexOfLastPostForMailTemp = currentPageForMailTemp * postsPerPage;
  const indexOfFirstPostForMailTemp = indexOfLastPostForMailTemp - postsPerPage;



  const currentPostsForMailTemp = props.tmp_list_data?.template
    ? props.tmp_list_data?.template.slice(
      indexOfFirstPostForMailTemp,
      indexOfLastPostForMailTemp
    )
    : null;
  console.log("-----725-------");
  console.log(props.tmp_list_data?.template);
  console.log(props.inbox_list_data?.data);
  console.log(state.reply);
  const allReplySortById = props.inbox_list_data?.data?.reply;

  console.log(allReplySortById)

  const allMailTempLength = props.tmp_list_data?.template
    ? props.tmp_list_data?.template.length > 0
      ? props.tmp_list_data?.template.length
      : null
    : null;
  // Change page
  const paginateForMailTemp = pageNumber => {
    console.log(pageNumber);
    setCurrentPageForMailTemp(pageNumber);
  };
  const handleForwardForMailTemp = () => {
    if (currentPageForMailTemp < Math.ceil(allMailTempLength / postsPerPage)) {
      setCurrentPageForMailTemp(currentPageForMailTemp + 1);
    } else {
      setCurrentPageForMailTemp(1);
    }
  };

  const handleBackwardForMailTemp = () => {
    if (currentPageForMailTemp < Math.ceil(allMailTempLength / postsPerPage)) {
      //setCurrentPage(1);
      setCurrentPageForMailTemp(currentPageForMailTemp - 1);
    } else if (currentPageForSMS <= 1) {
      setCurrentPageForMailTemp(allMailTempLength);
    } else {
      setCurrentPageForMailTemp(1);
    }
  };
  // ========== pagination for "MAIL TEMPLATE" ends here ===========

  // ========== pagination for "SMS TEMPLATE" starts from here ===========
  const [currentPageForSMSTemp, setCurrentPageForSMSTemp] = useState(1);

  // Get current posts
  const indexOfLastPostForSMSTemp = currentPageForSMSTemp * postsPerPage;
  const indexOfFirstPostForSMSTemp = indexOfLastPostForSMSTemp - postsPerPage;

  const currentPostsForSMSTemp = props.tmp_list_sms_data?.template
    ? props.tmp_list_sms_data?.template.slice(
      indexOfFirstPostForSMSTemp,
      indexOfLastPostForSMSTemp
    )
    : null;
  console.log(currentPostsForSMSTemp);
  const allSMSTempLength = props.tmp_list_data?.template
    ? props.tmp_list_data?.template.length > 0
      ? props.tmp_list_sms_data?.template.length
      : null
    : null;
  // Change page
  const paginateForSMSTemp = pageNumber => {
    console.log(pageNumber);
    setCurrentPageForSMSTemp(pageNumber);
  };
  const handleForwardForSMSTemp = () => {
    if (currentPageForSMSTemp < Math.ceil(allSMSTempLength / postsPerPage)) {
      setCurrentPageForSMSTemp(currentPageForSMSTemp + 1);
    } else {
      setCurrentPageForSMSTemp(1);
    }
  };

  const handleBackwardForSMSTemp = () => {
    if (currentPageForSMSTemp < Math.ceil(allSMSTempLength / postsPerPage)) {
      //setCurrentPage(1);
      setCurrentPageForSMSTemp(currentPageForSMSTemp - 1);
    } else if (currentPageForSMS <= 1) {
      setCurrentPageForSMSTemp(allSMSTempLength);
    } else {
      setCurrentPageForSMSTemp(1);
    }
  };
  // ========== pagination for "SMS TEMPLATE" ends here ===========

  // ========== pagination for "Undelivered" starts from here ===========
  const [currentPageForUndelivered, setCurrentPageForUndelivered] = useState(1);

  // Get current posts
  const indexOfLastPostUndelivered = currentPageForUndelivered * postsPerPage;
  const indexOfFirstPostUndelivered = indexOfLastPostUndelivered - postsPerPage;

  const currentPostsForUndelivered = props.mail_list_undelivered_data?.data
    ? props.mail_list_undelivered_data?.data.slice(
      indexOfFirstPostUndelivered,
      indexOfLastPostUndelivered
    )
    : null;
  console.log(currentPostsForSMSTemp);
  const allUndeliveredLength = props.mail_list_undelivered_data?.data
    ? props.mail_list_undelivered_data?.data.length > 0
      ? props.mail_list_undelivered_data?.data.length
      : null
    : null;
  // Change page
  const paginateForUndelivered = pageNumber => {
    console.log(pageNumber);
    setCurrentPageForUndelivered(pageNumber);
  };
  const handleForwardForUndelivered = () => {
    if (
      currentPageForUndelivered < Math.ceil(allUndeliveredLength / postsPerPage)
    ) {
      setCurrentPageForUndelivered(currentPageForUndelivered + 1);
    } else {
      setCurrentPageForUndelivered(1);
    }
  };

  const handleBackwardForUndelivered = () => {
    if (
      currentPageForUndelivered < Math.ceil(allUndeliveredLength / postsPerPage)
    ) {
      //setCurrentPage(1);
      setCurrentPageForUndelivered(currentPageForUndelivered - 1);
    } else if (currentPageForUndelivered <= 1) {
      setCurrentPageForUndelivered(allSMSTempLength);
    } else {
      setCurrentPageForUndelivered(1);
    }
  };
  // ========== pagination for "Undelivered" ends here ===========

  /*
   * pagination ends here
   */
  const [form1state, setForm1State] = useState({
    switch1: true,
    // switch2: false,
    // selectedFiles: [],
  });

  const Offsymbol = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "#fff",
          paddingRight: 2,
        }}
      >
        {" "}
        No
      </div>
    );
  };
  const OnSymbol = props => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "#fff",
          paddingRight: 2,
        }}
      >
        {" "}
        Yes
      </div>
    );
  };

  const scheduleHandler = e => {
    setSchedule(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleSelectRegion = e => {
    setSchedule({ ...schedule, selectRegarding: e, clickRegarding: true });
    console.log(schedule.selectRegarding);
    // props.scheduleTriggerTo(schedule.selectRegarding.value);
  };

  if (schedule.clickRegarding) {
    props.scheduleTriggerTo(schedule.selectRegarding.value);
    props.scheduleTriggerFrom(schedule.selectRegarding.value);
    setSchedule({ ...schedule, clickRegarding: false });
  }

  const handleSelectTo = e => {
    setSchedule({ ...schedule, selectTo: e });
  };
  const handleSelectFrom = e => {
    setSchedule({ ...schedule, selectFrom: e });
  };

  const handleSaveSchedule = e => {
    e.preventDefault();
    if (schedule.name) {
      props.addSchedule(schedule, form1state, state.body, mailTempEditData.subject);
      setState({ ...state, loader: true });
    } else {
      toastr.warning(" Name can not be empty");
    }

  };


  const handleSaveScheduleforSMS = e => {
    e.preventDefault();
    console.log(form1state, state2, smsTempEditData.message)
    if (schedule.name) {

      props.sendSMSTemplate(schedule.name, form1state.switch1, schedule.selectRegarding.value, schedule.selectTo.value, schedule.selectFrom.value, state2.to, smsTempEditData.message);
      setState({ ...state, loader: true });
    } else {
      toastr.warning(" Name can not be empty");
    }
  };

  //Datatable
  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: props.tmp_list_data?.template?.length || 0, // replace later with size(customers),
    custom: true,
  };


  const pageOptionsInbox = {

    sizePerPage: 10,
    totalSize: props.inbox_list_data?.data?.length || 0, // replace later with size(customers),
    custom: true,

  }
  const pageOptionsSMS = {
    sizePerPage: 10,
    totalSize: props.tmp_list_sms_data?.template?.length || 0, // replace later with size(customers),
    custom: true,
  };

  let node;
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const mailTemplateDetails = (e, column, columnIndex, row, rowIndex) => {
    console.log(row);
    setSchedule({ ...schedule, templateData: row });
    // toggleModalLabelEdit();
    toggleEditScheduleModal();
  };
  const handleClick = (row, tab) => {
    console.log(row, tab);
    props.sendMailSeenUnseen(row.id)
  }

  // const delRef = (cell, row) => (<span className="badge rounded-pill badge-soft-danger font-size-12" onClick={() => setDeleteState(prev => !prev)}>Delete</span>);
  const delRef = (cell, row) => (<span className="badge rounded-pill badge-soft-danger font-size-12" onClick={() => mailTempDelete(row.id)}>Delete</span>);

  const editRef = (cell, row) => (<span className="badge rounded-pill badge-soft-primary font-size-12">Edit</span>);

  const delRefSMS = (cell, row) => (<span className="badge rounded-pill badge-soft-danger font-size-12" onClick={() => smsTempDelete(row.id)}>Delete</span>);

  const viewRef = (cell, row, tab) => (<span className="badge rounded-pill badge-soft-primary font-size-12" onClick={() => {
    toggleMailBodyModal2(
      state.activeTab,
      row.body,
      row.to,
      row.from,
      row.subject,
      row.id,
      row.reply
    )
    handleClick(row, tab)
  }
  }>View</span>);

  // const inboxSubjectRef = (cell, row) => (<span style={row.watch == 1 && authUser.user.user_type == "Tenant" ? { fontWeight: 'bold', color: "#3477eb" } : { fontWeight: 'normal', color: "#3477eb" }}>{row.subject}</span>);
  const inboxSubjectRef = (cell, row) => (<span className={row.watch == 1 && row.reply_to == authUser.user.email ? 'fw-bold text-info' : 'text-info'}>{row.subject}</span>);
  const mailTemplateData = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },

    {
      dataField: "message_action_name",
      text: "Regarding",
      sort: true,
    },
    {
      dataField: "message_trigger_to",
      text: "Send to",
      sort: true,

    },
    {
      dataField: "messsage_trigger_point",
      text: "Trigger",
      sort: true,
    },
    {
      dataField: "",
      text: "Edit",
      sort: true,
      formatter: editRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          mailTemplateDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "Action",
      text: "Action",
      sort: true,
      formatter: delRef,

    },
  ];

  const inboxDetail = (e, column, columnIndex, row, rowIndex) => {
    console.log('--1366---');
    console.log(row);
    toggleMailBodyModal2(
      state.activeTab,
      row.body,
      row.to,
      row.from,
      row.subject,
      row.id,
      row.reply,
      row.reply_from,
      row.reply_to,
    )
    props.sendMailSeenUnseen(row.id)

  };
  const dateRef = (cell, row) => <span className="text-muted">{moment(cell).format('DD/MM/yyyy')}</span>

  const inboxTableData = [

    {
      dataField: "from",
      text: "From",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          inboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "to",
      text: "To",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          inboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },


    {
      dataField: "status",
      text: "Status",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          inboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "subject",
      text: "Subject",
      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          inboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },

    },
    {
      dataField: "updated_at",
      text: "Updated At",
      formatter: dateRef,
      sort: true,
    },
  ]

  const sendRef = (cell, row) => <span className="badge rounded-pill badge-soft-success font-size-12"
    onClick={() => handleMailSend(row)}>Send</span>;

  const deleteHandler = () => {
    console.log(state.activeTab);
    if (state.activeTab == '1') {
      props.deleteMultipleMail([data.deleteData.id]);

    }
    if (state.activeTab == '5') {
      props.deleteSMSOutbox(data.id)
    }
    setModalDelete(false);
  }

  const handleMailDelete = (data) => {
    console.log(data);
    // props.deleteMultipleMail([data.id]);
    // setState({ ...state, loader: true })
    setModalDelete(prev => !prev);
    setData({ ...data, deleteData: data })
  }
  const delRef1 = (cell, row) => <span className="badge rounded-pill badge-soft-danger font-size-12"
    onClick={() => handleMailDelete(row)}>Delete</span>;
  const outboxDetail = (e, column, columnIndex, row, rowIndex) => {
    console.log('--1366---');
    console.log(row);
    toggleMailBodyModal2(
      state.activeTab,
      row.body,
      row.to,
      row.from,
      row.subject,
      row.id
    )
    props.sendMailSeenUnseen(row.id)

  };

  const handleMailSend = (data) => {
    props.sendMultipleMail([data.id]);
    setState({ ...state, loader: true });
  }



  const inboxTableData1 = [

    {
      dataField: "from",
      text: "From",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "to",
      text: "To",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },


    {
      dataField: "status",
      text: "Status",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "subject",
      text: "Subject",
      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },

    },
    // {
    //   dataField: "",
    //   text: "View",
    //   sort: true,
    //   formatter: viewRef,
    //   // events: {
    //   //   onClick: (e, column, columnIndex, row, rowIndex) => {
    //   //     mailTemplateDetails(e, column, columnIndex, row, rowIndex);
    //   //   },
    //   // },
    // },

    {
      dataField: "",
      text: "Action",
      formatter: sendRef,
      sort: true,
    },
    {
      dataField: "",
      text: "Action",
      formatter: delRef1,
      sort: true,
    },
    {
      dataField: "updated_at",
      text: "Updated At",
      formatter: dateRef,

      sort: true,
    },
  ]
  const inboxTableData2 = [

    {
      dataField: "from",
      text: "From",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "to",
      text: "To",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },


    {
      dataField: "status",
      text: "Status",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "subject",
      text: "Subject",
      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },

    },
    // {
    //   dataField: "",
    //   text: "View",
    //   sort: true,
    //   formatter: viewRef,
    //   // events: {
    //   //   onClick: (e, column, columnIndex, row, rowIndex) => {
    //   //     mailTemplateDetails(e, column, columnIndex, row, rowIndex);
    //   //   },
    //   // },
    // },

    {
      dataField: "updated_at",
      text: "Updated At",
      formatter: dateRef,

      sort: true,
    },
  ]

  const inboxTableData3 = [

    {
      dataField: "from",
      text: "From",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "to",
      text: "To",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },


    {
      dataField: "status",
      text: "Status",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "subject",
      text: "Subject",
      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },

    },
    // {
    //   dataField: "",
    //   text: "View",
    //   sort: true,
    //   formatter: viewRef,
    //   // events: {
    //   //   onClick: (e, column, columnIndex, row, rowIndex) => {
    //   //     mailTemplateDetails(e, column, columnIndex, row, rowIndex);
    //   //   },
    //   // },
    // },

    {
      dataField: "updated_at",
      text: "Updated At",
      formatter: dateRef,

      sort: true,
    },
  ]

  const smsDetail = (e, column, columnIndex, row, rowIndex) => {
    setData({ ...data, smsData: row })
    toggleShowSMSModal();
  }
  const msgRef = (cell, row) => <span className="text-primary">{cell.slice(0, 30) + ('......')}</span>;

  const sentSmsTableData = [
    {
      dataField: "to",
      text: "Recipient",
      sort: true,
    },
    {
      dataField: "body",
      text: "Message",
      formatter: msgRef,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          smsDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
    {
      dataField: "created_at",
      text: "Created at",
      formatter: dateRef,

      sort: true,
    },
  ]
  const smsTemplateData = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
      // events: {
      //   onClick: (e, column, columnIndex, row, rowIndex) => {
      //     mailTemplateDetails(e, column, columnIndex, row, rowIndex);
      //   },
      // },
    },

    {
      dataField: "message_action_name",
      text: "Regarding",
      sort: true,
      // events: {
      //   onClick: (e, column, columnIndex, row, rowIndex) => {
      //     mailTemplateDetails(e, column, columnIndex, row, rowIndex);
      //   },
      // },
    },
    {
      dataField: "message_trigger_to",
      text: "Send to",
      sort: true,
      // events: {
      //   onClick: (e, column, columnIndex, row, rowIndex) => {
      //     mailTemplateDetails(e, column, columnIndex, row, rowIndex);
      //   },
      // },
    },
    {
      dataField: "messsage_trigger_point",
      text: "Trigger",
      sort: true,
      // events: {
      //   onClick: (e, column, columnIndex, row, rowIndex) => {
      //     mailTemplateDetails(e, column, columnIndex, row, rowIndex);
      //   },
      // },
    },
    {
      dataField: "",
      text: "Edit",
      sort: true,
      formatter: editRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          mailTemplateDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "Action",
      text: "Action",
      sort: true,
      formatter: delRefSMS,
      // events: {
      //   onClick: (e, column, columnIndex, row, rowIndex) => {
      //     mailTemplateDetails(e, column, columnIndex, row, rowIndex);
      //   },
      // },
    }
  ]




  const handleSelect = (isSelect, rows, e) => {
    if (rows) {
      setActionArray(prevArray => [...prevArray, isSelect]);
    } else {
      setActionArray(cur => cur.filter(data => data.id !== isSelect.id));
    }
  };

  const handleSelectAll = (isSelect, rows, e) => {

    if (isSelect) {
      setActionArray(rows);
    } else {
      setActionArray([]);
    }
  };

  // Select  Button operation
  const selectRow = {
    mode: "checkbox",

    onSelect: handleSelect,

    onSelectAll: handleSelectAll,
  };

  console.log(smsTempButton);

  const handleReply = () => {
    setReply(!sendReply)
  }
  console.log(props.reply_sand_loading);
  console.log(props.sms_outbox_data);

  useEffect(() => {
    if (props.outbox_list_owner_loading === false) {
      props.outboxMailDataOwner();
    }
    if (props.add_schedule_loading === "Success") {
      toastr.success("Success");
      setState({ ...state, loader: false });
      props.addScheduleFresh();
      setSchedule(prev => ({ ...prev, selectRegarding: {}, selectTo: {}, selectFrom: {}, }))
      toggleTempModal();
      togglemodal();
    }

    if (props.mail_seen_unseen_loading === "Success") {
      props.mailSeenUnseenFresh();
      props.inboxList();
    }

    if (props.reply_sand_loading === "Success") {
      toastr.success("Success");
      setState({ ...state, loader: false });
      props.sendReplyFresh();
      props.inboxList();
      // props.addScheduleFresh();
      // setSchedule(prev => ({ ...prev, selectRegarding: {}, selectTo: {}, selectFrom: {}, }))
      // toggleTempModal();
      // togglemodal();
    }
    if (props.reply_sand_loading === "Failed") {
      toastr.error("Something went wrong");
      props.sendReplyFresh();
    }
    if (props.schedule_list_loading === false) {
      props.scheduleRegardingData();
      // props.scheduleTriggerTo();
      // props.scheduleTriggerFrom();
    }

    let optionRegarding;
    if (props.schedule_list_data?.message_action) {
      optionRegarding = props.schedule_list_data?.message_action.map(item => ({
        label: item.name,
        value: item.id,
      }));

      setSchedule(prev => ({ ...prev, optionRegarding: optionRegarding }));
    }
    let optionTo;
    if (props.trigger_to_list_data?.messageActionTriggerPoint) {
      optionTo = props.trigger_to_list_data?.messageActionTriggerPoint.map(
        item => ({
          label: item.trigger_to,
          value: item.id,
        })
      );

      setSchedule(prev => ({ ...prev, optionTo: optionTo }));
    }
    let optionFrom;
    if (props.trigger_from_list_data?.messageActionTriggerPoint) {
      optionFrom = props.trigger_from_list_data?.messageActionTriggerPoint.map(
        item => ({
          label: item.trigger_point,
          value: item.id,
        })
      );

      setSchedule(prev => ({ ...prev, optionFrom: optionFrom }));
    }
    // if (props.property_list_loading === false) {
    //     props.propertyList();
    //     props.addJobModalFresh();
    // } else if (props.property_add_loading == "Success") {
    //     props.propertyAddFresh();
    //     props.propertyList();
    // }
    // if (props.jobs_list_loading === false) {
    //     props.JobsList();
    // }

    if (props.mail_list_loading === false) {
      props.mailList();
    }

    if (props.inbox_list_loading === false) {
      props.inboxList();
    }

    if (props.mail_list_undelivered_loading === false && undeliveredButton) {
      props.mailListUndelivered();
    }

    if (props.sms_outbox_loading === false && smsOutboxTab) {
      props.smsOutboxList();
    }
    if (props.sms_sent_loading === false) {
      props.getsentsmsList();
    }

    if (props.mail_list_sent_loading === false) {
      props.mailListSent();
    }

    // if (props.mail_add_loading == "Success") {
    //   props.mailSendFresh();
    //   props.mailList();
    //   props.mailListUndelivered();
    //   props.mailListSent();
    //   props.mailListUndelivered();

    //   toastr.success("Success");

    //   setState({ ...state, loader: false, mailBodyModal2: false });
    // }

    if (props.mail_add_loading == "Success") {
      toastr.success("Success");
      props.mailSendFresh();
      props.mailList();
      props.mailListUndelivered();
      props.mailListSent();
      props.mailListUndelivered();
      props.outboxMailDataOwner();
      setMailTempEditData({})
      setState({ ...state, loader: false, mailBodyModal2: false, modal: false, to: '', subject: '', body: '' });
    }
    if (props.mail_add_loading == "Failed") {
      toastr.error('Something went wrong');
      props.mailSendFresh();

    }
    // for multiple mail send

    if (props.multiple_mail_add_loading === "Success") {
      toastr.success("Success");
      props.multipleMailSendFresh();
      props.outboxMailDataOwner();
      setState(prev => ({ ...prev, loader: false, activeTab: '1' }))
    }
    if (props.multiple_mail_add_loading === "Failed") {
      toastr.warning("Something went wrong");
      props.multipleMailSendFresh();
      setState(prev => ({ ...prev, loader: false, activeTab: '1' }))

    }

    //for multiple mail delete
    if (props.multiple_mail_delete_loading === "Success") {
      toastr.success("Deleted");
      console.log('delete modal');
      props.multipleMailDeleteFresh();
      props.outboxMailDataOwner();
      toggleTab('1');
    }
    if (props.multiple_mail_delete_loading === "Failed") {
      toastr.error("Something went wrong");
      props.multipleMailDeleteFresh();

      toggleTab('1');
    }
    // for sms template
    if (props.send_sms_loading === "Success") {
      console.log("===================yo==================");
      console.log(state)
      props.sendSMSTemplateFresh();
      props.templateListSMSFresh();
      props.templateListSMS();
      toastr.success("Saved");
      toggleTempModalSMS();
      //togglemodal1();
      //setModalSMS(false)
      // setState(prevState => ({
      //   modal1: !prevState.modal1,
      //   activeTab: "4",
      // }));
      toggleSMSmodal();
      console.log(state)
      setState({ ...state, loader: false });
    }
    // mail template edit
    if (props.edit_mail_template_loading === "Success") {
      console.log("===================mail template edit==================");
      props.mailTemplateEditFresh();
      toastr.success("Updated");

      setState({ ...state, loader: false });
    }

    // delete mail template
    if (props.delete_mail_template_loading === "Success") {
      toastr.success("Deleted");
      setDeleteTempStatus(false);
      setState({ ...state, loader: false });
      props.deleteMailTemplateFresh();
      //props.templateListFresh();
      props.templateList();


    }

    // delete sms template
    if (props.delete_sms_template_loading === "Success") {
      console.log("===================delete sms template==================");
      props.deleteSmsTemplateFresh();
      props.templateListSMSFresh();
      toastr.success("Deleted");

      setState({ ...state, loader: false });
    }
    // sms template edit
    if (props.edit_sms_template_loading === "Success") {
      console.log("===================sms template edit==================");
      props.smsTemplateEditFresh();
      props.templateListSMS();
      toastr.success("Updated");

      setState({ ...state, loader: false });
    }
    if (props.sms_add_loading == "Success") {
      toastr.success("Success");
      props.sendSMSFresh();
      props.smsList();

      setSMSTempEditData({})
      setState({ ...state, loader: false, activeTab: '8' });
      // toggleTab("8");
      setShowSMSModal(false)
    }
    if (props.sms_add_loading == 'Failed') {
      toastr.error("Something went wrong");
      props.sendSMSFresh();
      setState({ ...state, loader: false, activeTab: '8' });
      // setShowSMSModal(false)

    }
    if (props.sms_list_loading === false && smsButton) {
      props.smsList();
    }
    if (props.mail_template_add_loading === "Success") {
      props.sendMailTemplateFresh();
      props.templateListFresh();
      toastr.success("Saved");

      setState({ ...state, loader: false });
    }
    // if (props.tmp_list_loading === false) {
    //   props.templateList();
    // }

    if (props.tmp_list_sms_loading === false && smsTempButton) {
      props.templateListSMS();
    }
    if (props.tmp_list_data?.template) {
      let option;
      option = props.tmp_list_data?.template.map(item => ({
        label: item.subject,
        value: parseInt(item.id),
      }));

      setOptionGroup(option);
    }

    if (props.tmp_list_sms_data?.template) {
      let option;
      option = props.tmp_list_sms_data?.template.map(item => ({
        label: item.name,
        value: parseInt(item.id),
      }));

      setSmsTempList(option);
    }
    if (props.tmp_list_id_loading === "Success") {
      setMailTempEditData({
        ...mailTempEditData,
        subject: props.tmp_list_id_data?.template?.subject,
        //body: props.tmp_list_id_data?.template?.subject,
        body: props.tmp_list_id_data?.template?.body,
      });
    }

    if (props.tmp_list_id_sms_loading === "Success") {
      setSMSTempEditData({
        ...smsTempEditData,
        name: props.tmp_list_id_sms_data?.data?.name,
        message: props.tmp_list_id_sms_data?.data?.message,
      });
    }
    if (sendReply) {
      setState({ ...state, to: (authUser.user.email == state.to ? state.from : state.to), from: authUser.user.email });
    }
  }, [
    props.mail_list_loading,
    props.mail_add_loading,
    props.mail_list_undelivered_loading,
    props.mail_list_sent_loading,
    props.sms_add_loading,
    props.mail_template_add_loading,
    props.tmp_list_loading,
    props.tmp_list_data,
    props.send_sms_loading,
    props.tmp_list_id_sms_data,
    props.tmp_list_sms_data,
    props.tmp_list_id_data,
    props.edit_mail_template_loading,
    props.tmp_list_id_loading,
    props.tmp_list_id_sms_loading,
    props.edit_sms_template_loading,
    props.delete_mail_template_loading,
    props.delete_sms_template_loading,
    props.multiple_mail_add_loading,
    props.multiple_mail_delete_loading,
    props.schedule_list_data?.message_action,
    props.schedule_list_loading,
    props.trigger_to_list_data?.messageActionTriggerPoint,
    props.trigger_from_list_data?.messageActionTriggerPoint,
    props.add_schedule_loading,
    smsTempButton,
    props.reply_sand_loading,
    props.sms_outbox_loading,
    props.sms_sent_loading,
    props.mail_seen_unseen_loading,
    sendReply, props.outbox_list_owner_loading
  ]);
  console.log(props.tmp_list_data?.template);
  // console.log(props.tmp_list_id_data);
  // console.log(props.edit_mail_template_loading);
  let x = JSON.parse(window.localStorage.getItem("authUser"));
  // console.log(x.user.first_name);
  console.log(props.schedule_list_data);

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
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Email" breadcrumbItem="Inbox" />
          {/* <Loder status={editMailStatus} /> */}
          <Row>
            <Col xs="12">
              {/* Render Email SideBar */}
              <Card className="email-leftbar">
                <div className="">
                  <Dropdown
                    isOpen={dOpen}
                    toggle={() => setDOpen(prev => !prev)}
                    onClick={dropDownHandler}
                    className='w-100'
                  >
                    <DropdownToggle className="btn btn-danger d-flex justify-content-center align-items-center w-100" caret>
                      {/* <i className="fas fa-edit me-1 font-size-14" /> */}
                      New
                      {dOpen == false ? <i className="mdi mdi-chevron-down font-size-16 ms-1"></i>
                        :
                        <i className="mdi mdi-chevron-right font-size-16 ms-1"></i>}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem value="1">Compose</DropdownItem>
                      <DropdownItem value="2">SMS</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                {/* <Button type="button" color="danger" onClick={togglemodal}>
                  Compose
                </Button> */}
                <div className="mail-list mt-4">
                  <Nav tabs className="nav-tabs-custom" vertical role="tablist">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: state.activeTab === "0",
                        })}
                        onClick={() => {
                          toggleTab("0");
                        }}
                      >
                        <i className="mdi mdi-email-outline me-2"></i> Inbox{" "}
                        <span className="ml-1 float-end">
                          ({props?.inbox_list_data?.data ? props?.inbox_list_data?.data.length : ""})
                          {/* ({outboxMail ? outboxMail.length : ""}) */}

                        </span>
                      </NavLink>
                      <NavLink
                        className={classnames({
                          active: state.activeTab === "1",
                        })}
                        onClick={() => {
                          toggleTab("1");
                        }}
                      >
                        <i className="mdi mdi-email-outline me-2"></i> Outbox{" "}
                        {/* <span className="ml-1 float-end">({props.mail_list_data ? props.mail_list_data.data ? props.mail_list_data.data.length : "" : ""})</span> */}
                        <span className="ml-1 float-end">
                          ({props.outbox_list_owner_data?.data ? props.outbox_list_owner_data?.data.length : ""})
                        </span>
                      </NavLink>


                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: state.activeTab === "2",
                        })}
                        onClick={() => {
                          toggleTab("2");
                        }}
                      >
                        <i className="mdi mdi-star-outline me-2"></i>Undelivered
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: state.activeTab === "3",
                        })}
                        onClick={() => {
                          toggleTab("3");
                        }}
                      >
                        <i className="mdi mdi-star-outline me-2"></i>Sent
                      </NavLink>
                    </NavItem>


                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: state.activeTab === "8",
                        })}
                        onClick={() => {
                          toggleTab("8");
                        }}
                      >
                        <i className="fas fa-print me-2"></i>Sent SMS
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: state.activeTab === "5",
                        })}
                        onClick={() => {
                          toggleTab("5");
                        }}
                      >
                        <i className="fas fa-print me-2"></i>SMS Outbox
                      </NavLink>
                    </NavItem>

                    {/* <NavItem>
                      <NavLink
                        className={classnames({
                          active: state.activeTab === "6",
                        })}
                        onClick={() => {
                          toggleTab("6");
                        }}
                      >
                        <i className="fas fa-print me-2"></i>Email Template
                      </NavLink>
                    </NavItem> */}
                    {/* <NavItem>
                      <NavLink
                        className={classnames({
                          active: state.activeTab === "7",
                        })}
                        onClick={() => {
                          toggleTab("7");
                          setSMSTempButton(true);
                        }}
                      >
                        <i className="fas fa-print me-2"></i>SMS Template
                      </NavLink>
                    </NavItem> */}
                  </Nav>
                </div>

                {/* <h6 className="mt-4">Labels</h6> */}

                {/* <div className="mail-list mt-1">
                  <Link to="#">
                    <span className="mdi mdi-arrow-right-drop-circle text-primary float-end"></span>
                    SMS
                  </Link>
                  <Link to="#">
                    <span className="mdi mdi-arrow-right-drop-circle text-warning float-end"></span>
                    Letters
                  </Link>
                  <Link to="#">
                    <span className="mdi mdi-arrow-right-drop-circle text-primary float-end"></span>
                    Documents
                  </Link>
                  <Link to="#">
                    <span className="mdi mdi-arrow-right-drop-circle text-danger float-end"></span>
                    Statements
                  </Link>
                  <Link to="#">
                    <span className="mdi mdi-arrow-right-drop-circle text-success float-end"></span>
                    Drafts
                  </Link>
                </div> */}

                {/* <h6 className="mt-4">Chat</h6>

                                <div className="mt-2">
                                    <Link to="#" className="media">
                                        <img
                                            className="d-flex me-3 rounded-circle"
                                            src={avatar2}
                                            alt="skote"
                                            height="36"
                                        />
                                        <Media className="chat-user-box" body>
                                            <p className="user-title m-0">Scott Median</p>
                                            <p className="text-muted">Hello</p>
                                        </Media>
                                    </Link>

                                    <Link to="#" className="media">
                                        <img
                                            className="d-flex me-3 rounded-circle"
                                            src={avatar3}
                                            alt="skote"
                                            height="36"
                                        />
                                        <Media className="chat-user-box" body>
                                            <p className="user-title m-0">Julian Rosa</p>
                                            <p className="text-muted">What about our next..</p>
                                        </Media>
                                    </Link>

                                    <Link to="#" className="media">
                                        <img
                                            className="d-flex me-3 rounded-circle"
                                            src={avatar4}
                                            alt="skote"
                                            height="36"
                                        />
                                        <Media className="chat-user-box" body>
                                            <p className="user-title m-0">David Medina</p>
                                            <p className="text-muted">Yeah everything is fine</p>
                                        </Media>
                                    </Link>

                                    <Link to="#" className="media">
                                        <img
                                            className="d-flex me-3 rounded-circle"
                                            src={avatar6}
                                            alt="skote"
                                            height="36"
                                        />
                                        <Media className="chat-user-box" body>
                                            <p className="user-title m-0">Jay Baker</p>
                                            <p className="text-muted">Wow that&apos;s great</p>
                                        </Media>
                                    </Link>
                                </div> */}
              </Card>

              {/* -----Modal for Mail------ */}
              <Modal
                isOpen={state.modal}
                role="dialog"
                autoFocus={true}
                centered={true}
                className="exampleModal"
                tabIndex="-1"
              // toggle={this.togglemodal}
              >
                <div className="modal-content">
                  <ModalHeader>
                    <div className="d-flex justify-content-between">
                      <div>New Mail</div>

                    </div>
                  </ModalHeader>
                  <ModalBody>
                    {/* <div className="mb-3 select2-container">
                      <Label>Select Template</Label>
                      <Select
                        value={selectedGroup}
                        onChange={handleSelectGroupForMail}
                        options={optionGroup}
                        placeholder="Mail Template"
                        classNamePrefix="select2-selection"
                      />
                    </div> */}

                    <form>
                      <div className="mb-3">
                        <Input
                          type="to"
                          name="to"
                          className="form-control"
                          placeholder="To"
                          onChange={selectHandlerForMessage}
                          required={true}
                        />
                      </div>

                      <div className="mb-3">
                        <Input
                          type="subject"
                          name="subject"
                          className="form-control"
                          // placeholder={
                          //   showTemplate === true
                          //     ? props.tmp_list_id_data
                          //       ? props.tmp_list_id_data?.template?.subject
                          //       : ""
                          //     : "Subject"
                          // }
                          placeholder="Subject"
                          value={mailTempEditData.subject}
                          //onChange={selectHandlerForMessage}
                          onChange={e =>
                            setMailTempEditData({
                              ...mailTempEditData,
                              subject: e.target.value,
                            })
                          }
                        />
                      </div>
                      <CKEditor
                        editor={DecoupledEditor}
                        config={editorConfiguration}
                        data={
                          showTemplate === true
                            ? props.tmp_list_id_data
                              ? props.tmp_list_id_data?.template?.body
                              : ""
                            : ""
                        }
                        // data={
                        //   showTemplate === true
                        //     ? mailTempEditData ? mailTempEditData.body
                        //       : "" : ""
                        // }
                        onReady={editor => {
                          console.log("Editor is ready to use!", editor);


                          if (editor) {
                            editor.ui
                              .getEditableElement()
                              .parentElement.insertBefore(
                                editor.ui.view.toolbar.element,
                                editor.ui.getEditableElement()
                              );

                            textEditor = editor;
                          }
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();

                          console.log(data);
                          setState({ ...state, body: data });
                        }}

                      />
                    </form>
                    {mess ? (
                      <Alert color="danger">
                        Please fill up all the fields
                      </Alert>
                    ) : (
                      ""
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <div>
                      <Button
                        type="button"
                        color="secondary"
                        onClick={() => { togglemodal(); handleMailTempFieldNull() }}
                        //onClick={handleMailTempFieldNull}
                        className="me-1"
                      >
                        <i className="fas fa-times me-1"></i> Close
                      </Button>
                      {/* <Button
                        type="button"
                        color="info"
                        //onClick={saveMailTemplate}
                        onClick={handleToggleTempModal}
                      >
                        Save <i className="fas fa-file ms-1"></i>
                      </Button> */}

                      <Button
                        type="button"
                        color="primary"
                        onClick={handleSubmitMail}
                        className="ms-1"
                      >
                        Send <i className="fab fa-telegram-plane ms-1"></i>
                      </Button>
                    </div>
                  </ModalFooter>
                </div>
              </Modal>

              {/* -----Modal for SMS------ */}
              <Modal
                //isOpen={state.modal1}
                isOpen={modalSMS}
                role="dialog"
                autoFocus={true}
                centered={true}
                className="exampleModal"
                tabIndex="-1"
              // toggle={this.togglemodal}
              >
                <div className="modal-content">
                  <ModalHeader>
                    <div className="d-flex justify-content-between">
                      <div>New SMS</div>
                    </div>
                  </ModalHeader>
                  <ModalBody>
                    {/* <div className="mb-3 select2-container">
                      <Label>Select Template</Label>
                      <Select
                        value={selectedGroupSMS}
                        onChange={handleSelectGroupForSMS}
                        options={smsTempList}
                        placeholder="SMS Template"
                        classNamePrefix="select2-selection"
                      />
                    </div> */}
                    <form>
                      <div className="row mb-3">
                        <Label
                          htmlFor="horizontal-firstname-Input"
                          className="col-sm-2 col-form-label"
                        >
                          To
                        </Label>
                        <Col sm={10}>
                          <Input
                            type="to"
                            name="to"
                            className="form-control"
                            placeholder="To"
                            required
                            onChange={selectHandlerForSMS}
                          />
                        </Col>
                      </div>

                      <div className="row">
                        <Label
                          htmlFor="horizontal-firstname-Input"
                          className="col-sm-2 col-form-label"
                        >
                          Messages
                        </Label>
                        <Col sm={10}>
                          <Input
                            type="textarea"
                            name="textarea"
                            className="form-control"
                            //placeholder={showTemplateSMS === true ? props.tmp_list_id_sms_data ? props.tmp_list_id_sms_data?.data?.message : "" : "Message"}
                            //value={showTemplateSMS === true ? props.tmp_list_id_sms_data ? props.tmp_list_id_sms_data?.data?.message : "" : "Message"}
                            value={smsTempEditData.message}
                            onChange={e =>
                              setSMSTempEditData({
                                ...smsTempEditData,
                                message: e.target.value,
                              })
                            }
                          //onChange={selectHandlerForSMS}
                          />
                        </Col>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "right",
                          gap: 3,
                          marginTop: "15px",
                        }}
                      >
                        <Button
                          type="button"
                          color="secondary"
                          //onClick={togglemodal1}
                          onClick={toggleSMSmodal}
                        >
                          <i className="fas fa-times"></i> Cancel
                        </Button>
                        {/* <Button
                          type="button"
                          color="info"
                          //onClick={saveSMStemplate}
                          onClick={handleToggleTempModalForSMS}
                        >
                          Save <i className="fas fa-file ms-1"></i>
                        </Button> */}

                        <Button
                          type="button"
                          color="primary"
                          onClick={handleSubmitSMS}
                        >
                          Send <i className="fab fa-telegram-plane ms-1"></i>
                        </Button>
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </div>
              </Modal>

              {/* Modal for SMS template name start from here*/}

              <Modal
                isOpen={modal}
                role="dialog"
                autoFocus={true}
                centered={true}
                className="exampleModal"
                //tabIndex="-1"
                //toggle={toggle}
                backdrop={true}
              >
                <div className="modal-content">
                  <ModalHeader>
                    <div>Template Name</div>
                  </ModalHeader>
                  <ModalBody>
                    <form>
                      <div className="row mb-3">
                        <Label
                          htmlFor="horizontal-firstname-Input"
                          className="col-sm-2 col-form-label"
                        >
                          Name
                        </Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            name="tempName"
                            className="form-control"
                            placeholder="Template name"
                            onChange={selectHandlerForSMS}
                          />
                        </Col>
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      type="button"
                      color="secondary"
                      //onClick={() => setSelectTemplateSMSDropdown(prev => !prev)}
                      onClick={toggle}
                    >
                      <i className="fas fa-times"></i> Cancel
                    </Button>
                    <Button
                      type="button"
                      color="info"
                      onClick={saveSMStemplate}
                    >
                      Save <i className="fab fa-telegram-plane ms-1"></i>
                    </Button>
                  </ModalFooter>
                </div>
              </Modal>
              {/* <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggle}>
                    Do Something
                  </Button>{' '}
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal> */}
              {/* Modal for SMS template name ends here*/}

              {/* ============= update sms template modal start from here ================ */}
              <Modal
                isOpen={smsTempUpdate}
                role="dialog"
                autoFocus={true}
                centered={true}
                className="exampleModal"
                tabIndex="-1"
              // toggle={this.togglemodal}
              >
                <div className="modal-content">
                  <ModalHeader>
                    <div className="d-flex justify-content-between">
                      <div>Update SMS Template</div>
                    </div>
                  </ModalHeader>
                  <ModalBody>
                    <form onSubmit={handleSMSTempEditForm}>
                      <div className="row mb-3">
                        <Label
                          htmlFor="horizontal-firstname-Input"
                          className="col-sm-2 col-form-label"
                        >
                          Name
                        </Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            name="name"
                            className="form-control"
                            //placeholder={checkSmsStatus === true ? props.tmp_list_id_sms_data ? props.tmp_list_id_sms_data?.data?.name : "" : "Message"}
                            value={smsTempEditData.name}
                            onChange={e =>
                              setSMSTempEditData({
                                ...smsTempEditData,
                                name: e.target.value,
                              })
                            }
                          />
                        </Col>
                      </div>

                      <div className="row">
                        <Label
                          htmlFor="horizontal-firstname-Input"
                          className="col-sm-2 col-form-label"
                        >
                          Messages
                        </Label>
                        <Col sm={10}>
                          <Input
                            type="textarea"
                            name="message"
                            className="form-control"
                            //placeholder={checkSmsStatus === true ? props.tmp_list_id_sms_data ? props.tmp_list_id_sms_data?.data?.message : "" : "Message"}
                            value={smsTempEditData.message}
                            onChange={e =>
                              setSMSTempEditData({
                                ...smsTempEditData,
                                message: e.target.value,
                              })
                            }
                          />
                        </Col>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "right",
                          gap: 3,
                          marginTop: "20px",
                        }}
                      >
                        <Button
                          type="button"
                          color="secondary"
                          onClick={smsTempUpdatetoggle}
                        >
                          <i className="fas fa-times"></i> Cancel
                        </Button>
                        <Button type="submit" color="info">
                          Update <i className="fab fa-telegram-plane ms-1"></i>
                        </Button>
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </div>
              </Modal>
              {/* ============= update sms template modal ends here ================ */}

              {/* -----Modal for Inner body text show------ */}
              <Modal
                isOpen={state.mailBodyModal}
                role="dialog"
                autoFocus={true}
                centered={true}
                className="exampleModal"
                tabIndex="-1"
              // toggle={this.togglemodal}
              >
                <div className="modal-content">
                  <ModalBody style={{ padding: 0, margin: 0 }}>
                    <Row>
                      <Col xs="12">
                        {/* Render Email SideBar */}

                        <div className="mb-3">
                          <Card>
                            {/* Render Email Top Tool Bar */}

                            <CardBody>
                              <Media className="mb-4">
                                <img
                                  className="d-flex me-3 rounded-circle avatar-sm"
                                  //src={avatar2}
                                  src={
                                    x.user
                                      ? "http://backend-myday.cliqpack.com/public/Image/" +
                                      x.user.profile
                                      : avatar2
                                  }
                                  alt="skote"
                                />
                                <Media body>
                                  <h5 className="font-size-14 mt-1">
                                    {x.user.first_name + " " + x.user.last_name}
                                  </h5>
                                  {/* {state.subject ? <small className="text-muted">
                                    {state.to}
                                  </small> : null} */}
                                  <small className="text-muted">
                                    {state.to}
                                  </small>
                                </Media>
                              </Media>
                              {/* {state.subject != null ? <h4 className="mt-0 font-size-16">
                                {state.subject}
                              </h4> : null} */}
                              <h4 className="mt-0 font-size-16">
                                {state.subject}
                              </h4>{" "}
                              {/* {state.subject != null ?
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: state.mailBodyModalText,
                                  }}
                                ></div>
                                :

                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: state.subject ? "" : "30px" }} className="mx-5">
                                  <p style={{ fontWeight: "bold" }}>Message</p>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: state.mailBodyModalText,
                                    }}
                                  ></div>
                                </div>} */}
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: state.mailBodyModalText,
                                }}
                              ></div>
                              <hr />
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "right",
                                  gap: "10px",
                                }}
                              >
                                <Button
                                  type="button"
                                  color="danger"
                                  onClick={() =>
                                    toggleMailBodyModalWithouttext()
                                  }
                                >
                                  Close
                                </Button>{" "}
                                {state.id ? (
                                  <Button
                                    type="button"
                                    color="primary"
                                    onClick={handleSubmitMail}
                                    className="ms-1"
                                  >
                                    Send{" "}
                                    <i className="fab fa-telegram-plane ms-1"></i>
                                  </Button>
                                ) : null}
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                    </Row>
                  </ModalBody>
                </div>
              </Modal>

              {/* =================modal 2 starts from here ============*/}
              <Modal
                isOpen={state.mailBodyModal2}
                role="dialog"
                autoFocus={true}
                centered={true}
                className="exampleModal"
                tabIndex="-1"
                // toggle={this.togglemodal}
                size="xl"

              >
                <ModalBody style={{ overflow: "scroll" }}>
                  <div>
                    <div style={{ display: "flex", gap: "10px", justifyContent: 'space-between' }}>
                      <div style={{ display: "flex", gap: "10px" }}> <i
                        className="bx bx-envelope ms-2"
                        style={{ fontSize: "30px" }}
                      ></i>{" "}
                        <h3>Email</h3></div>
                      <button
                        type="button"
                        className="btn-close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() => toggleMailBodyModalWithouttext2()}
                      >
                      </button>
                    </div>
                    <hr />
                    <Row>
                      <Col md={6}>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                            From:
                          </p>
                          {state.from}
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                            To:
                          </p>
                          {state.to}
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                            Subject:
                          </p>
                          {state.subject}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="d-flex justify-content-end">
                          <div className="fw-bold">
                            <span> {moment(state?.updated_at).format('MMMM Do YYYY')}</span> <br />
                            <span className="mt-2"> {moment(state?.updated_at).format('h:mm a')}</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
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
                        style={{ height: "70px", backgroundColor: "#159B9C" }}
                        className="d-flex justify-content-start pr-3 pt-2"
                      >
                        <img
                          src={MailLogo}
                          height="90%"
                          width="170px"
                          style={{ marginLeft: "20px" }}
                        />
                      </div>
                      <div style={{ padding: "16px" }}>

                        <p>{parse(`${state.mailBodyModalText}`)}</p>

                        <p>Many thanks,</p>
                        <p>
                          {x.user.first_name + " " + x.user.last_name} <br />
                          {state.to} <br />
                          {x.user.mobile_phone}
                        </p>
                      </div>

                      <div
                        style={{
                          height: "70px",
                          backgroundColor: "rgba(52,58,64,.25)",
                          marginTop: sendReply ? "80px" : "10px",
                        }}
                      ></div>

                      {/* =============== showing reply mail start ============= */}

                      {state.reply?.length > 0 ? state.reply.map((item, key) => (
                        <ReplyCard item={item} key={key} from={state.reply_from} to={state.reply_to} />
                      )) : ""}

                      {/* <ReplyCard item={state.reply} /> */}

                      {/* =============== showing reply mail ends ============= */}

                      {state.activeTab == 0 ?
                        // reply sectiion
                        <>
                          {/* <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                            <Button onClick={handleReply} style={{ marginBottom: "10px" }}>{sendReply ? "Close Reply" : "Reply"}</Button>
                          </div> */}
                          {sendReply ?
                            <>
                              <div style={{ display: "flex", flexDirection: "column", marginTop: '30px' }}>
                                <div>
                                  <div style={{ display: "flex", gap: "10px" }}>
                                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                                      To:
                                    </p>
                                    {/* {state?.reply?.length ? state?.reply?.length == 0 ? state.from :
                                      (authUser.user.email != state?.reply[(state?.reply?.length - 1)].from) ? state?.reply[(state?.reply?.length - 1)].to : state?.reply[(state?.reply?.length - 1)].from : state.from} */}
                                    {authUser.user.email == state.from ? state.to : state.from}
                                  </div>
                                  <div style={{ display: "flex", gap: "10px" }}>
                                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                                      Subject:
                                    </p>
                                    {state.subject}
                                  </div>
                                </div>
                                <CKEditor
                                  editor={DecoupledEditor}
                                  config={editorConfiguration}
                                  // data={
                                  //   showTemplate === true
                                  //     ? props.tmp_list_id_data
                                  //       ? props.tmp_list_id_data?.template?.body
                                  //       : ""
                                  //     : ""
                                  // }

                                  onReady={editor => {
                                    console.log("Editor is ready to use!", editor);


                                    if (editor) {
                                      editor.ui
                                        .getEditableElement()
                                        .parentElement.insertBefore(
                                          editor.ui.view.toolbar.element,
                                          editor.ui.getEditableElement()
                                        );

                                      textEditor = editor;
                                    }
                                  }}
                                  onChange={(event, editor) => {
                                    const data = editor.getData();

                                    console.log(data);
                                    setState({ ...state, body: data });
                                  }}

                                />
                              </div>
                            </>
                            : ""
                          }

                        </>

                        : ""
                      }


                    </div>
                  </div>

                </ModalBody>
                <ModalFooter>
                  <div
                    className="d-flex justify-content-between align-items-top"
                  // style={{
                  //   display: "flex",
                  //   justifyContent: "right",
                  //   gap: "10px",
                  //   marginTop: "20px",
                  // }}
                  >
                    {state.activeTab == '0' &&
                      <div
                      //  style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}
                      >
                        <Button onClick={handleReply}
                        //  style={{ marginBottom: "10px" }}
                        >{sendReply ? "Close Reply" : "Reply"}</Button>
                      </div>}
                    <Button
                      type="button"
                      color="danger"
                      className="mx-2"
                      onClick={() => toggleMailBodyModalWithouttext2()}
                    >
                      Close
                    </Button>{" "}
                    {sendReply ? (
                      state.activeTab == '0' && <Button
                        type="button"
                        color="primary"
                        //onClick={handleSubmitMail}
                        onClick={sendReply ? handleReplyMail : ''}
                        className="ms-1"
                      >
                        {/* {sendReply ? "Reply" : "Send"} */}Reply
                        <i className="fab fa-telegram-plane ms-1"></i>
                      </Button>
                    ) : null}
                    {state.activeTab == '0' ? '' :
                      <Button
                        type="button"
                        color="primary"
                        className="ms-1"
                        onClick={handleSubmitMail}
                      >
                        Send
                      </Button>
                    }
                  </div>
                </ModalFooter>
              </Modal>
              {/* =================modal 2 ends here ============*/}
              {/* Modal for edit EMAIL TEMPLATE start from here */}

              <Modal isOpen={editMailTempmodal} centered={true}>
                <ModalHeader>Update your Template</ModalHeader>
                <ModalBody>
                  <form onSubmit={handleMailTempEditForm}>
                    <div className="mb-3">
                      <Input
                        type="subject"
                        name="subject"
                        className="form-control"
                        //placeholder={checkStatus === true ? props.tmp_list_id_data ? props.tmp_list_id_data?.template?.subject : "" : "Subject"}
                        value={mailTempEditData.subject}
                        //value={mailTempEditData.subject}

                        onChange={e =>
                          setMailTempEditData({
                            ...mailTempEditData,
                            subject: e.target.value,
                          })
                        }
                      //onChange={(e) => handleSubjectUpdate(e)}
                      />
                    </div>
                    <CKEditor
                      editor={DecoupledEditor}
                      config={editorConfiguration}
                      //data={sendTemplate ? desc ? desc.body : 'hello' : "hello2"}
                      // data={
                      //   checkStatus === true
                      //     ? props.tmp_list_id_data
                      //       ? props.tmp_list_id_data?.template?.body
                      //       : ""
                      //     : ""
                      // }
                      data={
                        checkStatus === true
                          ? props.tmp_list_id_data
                            ? props.tmp_list_id_data?.template?.body
                            : ""
                          : ""
                      }
                      //data={mailTempEditData.body}
                      onReady={editor => {
                        console.log("Editor is ready to use!", editor);

                        // Insert the toolbar before the editable area.
                        if (editor) {
                          editor.ui
                            .getEditableElement()
                            .parentElement.insertBefore(
                              editor.ui.view.toolbar.element,
                              editor.ui.getEditableElement()
                            );

                          textEditor = editor;
                        }
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        // console.log({ event, editor, data });
                        console.log(data);

                        setMailTempEditData({
                          ...mailTempEditData,
                          body: data,
                        });
                      }}

                    // onChange={selectHandlerForProperty}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        gap: 3,
                      }}
                    >
                      <Button color="primary" type="submit">
                        submit
                      </Button>{" "}
                      <Button color="primary" onClick={mailTempEdittoggle}>
                        cancel
                      </Button>
                    </div>
                  </form>
                </ModalBody>
              </Modal>
              {/* Modal for edit EMAIL TEMPLATE ends here */}
              {/* -----Modal for Loader------ */}
              <Modal
                isOpen={state.loader}
                // role="dialog"
                // autoFocus={true}
                centered={true}
                tabIndex="-1"
                size="small"
                style={{ border: "none", width: "5%" }}
              >
                <ModalBody>
                  <i
                    className="bx bx-loader bx-spin font-size-42 align-middle me-2"
                    style={{ zindex: 100, overflow: "hidden" }}
                  />
                </ModalBody>
              </Modal>

              {/* ==================== delete mail modal start from here ============== */}
              <Modal isOpen={deleteModal} toggle={toggleDelete} centered={true}>
                <ModalHeader
                  toggle={toggleDelete}
                  style={{ textAlign: "center" }}
                >
                  Delete Mail Template
                </ModalHeader>

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
                          onClick={handleDeleteMailTempForm}
                        >
                          Yes, delete it!
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-lg me-2"
                          onClick={toggleDelete}
                        >
                          Cancel
                        </button>
                      </div>
                    </Col>
                  </Row>
                </ModalBody>

              </Modal>
              {/* ==================== delete mail modal ends here ============== */}

              {/* ==================== delete SMS modal start from here ============== */}
              <Modal
                isOpen={deleteModal2}
                toggle={toggleDelete2}
                centered={true}
              >
                <ModalHeader
                  toggle={toggleDelete2}
                  style={{ textAlign: "center" }}
                >
                  Delete SMS Template
                </ModalHeader>
                <ModalBody>
                  <div style={{ fontSize: "30px", textAlign: "center" }}>
                    Are you sure?
                  </div>
                </ModalBody>
                <ModalFooter>
                  <div className="col-md-12 text-center gap-3">
                    <Button color="secondary" onClick={toggleDelete2}>
                      Cancel
                    </Button>{" "}
                    <Button
                      color="danger"
                      style={{ cursor: "pointer" }}
                      onClick={handleDeleteSMSTempForm}
                    >
                      Delete
                    </Button>
                  </div>
                </ModalFooter>
              </Modal>
              {/* ==================== delete SMS modal ends here ============== */}

              <div className="email-rightbar mb-3">
                <Card>
                  <TabContent activeTab={state.activeTab}>
                    <TabPane tabId="0">

                      <div className="px-2 mt-2">

                        {props.inbox_list_data?.data ? (
                          <DatatableTables2
                            products={props.inbox_list_data}
                            columnData={inboxTableData}
                          />
                        ) : null}
                      </div>
                    </TabPane>
                    <TabPane tabId="1">
                      <div className="px-2 mt-2">

                        {props.outbox_list_owner_data?.data ? (
                          <DatatableTables2
                            products={props.outbox_list_owner_data}
                            columnData={inboxTableData1}
                          />
                        ) : null}
                      </div>
                    </TabPane>
                    <TabPane tabId="2">
                      <div className="px-2 mt-2">

                        {props.mail_list_undelivered_data?.data ? (
                          <DatatableTables2
                            products={props.mail_list_undelivered_data}
                            columnData={inboxTableData2}
                          />
                        ) : null}
                      </div>
                    </TabPane>
                    <TabPane tabId="3">
                      <div className="px-2 mt-2">

                        {props.mail_list_sent_data?.data ? (
                          <DatatableTables2
                            products={props.mail_list_sent_data}
                            columnData={inboxTableData3}
                          />
                        ) : null}
                      </div>
                    </TabPane>
                    <TabPane tabId="4">
                      <ul className="message-list">
                        {map(currentPostsForSMS, (inbox, key) => (
                          <li
                            key={key}
                            onClick={() => {
                              toggleMailBodyModal(state.activeTab, inbox.body)
                              setSMSButton(true);
                            }
                            }
                          >
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <Input type="checkbox" id={inbox.id} />
                                <Label htmlFor={inbox.id} className="toggle" />
                              </div>
                              <Link to="#" className="title">
                                {inbox.to}
                              </Link>
                              <span className="star-toggle far fa-star" />
                            </div>
                            <div className="col-mail col-mail-2">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: inbox.body,
                                }}
                              ></div>
                              {/* <div className="date">{inbox.date}</div> */}
                            </div>
                          </li>
                        ))}
                      </ul>
                      <Row
                        style={{ paddingLeft: "20px", paddingRight: "20px" }}
                      >
                        {/* {currentPage == 1 ?
                          <Col xs="7">Showing {currentPage} - {postsPerPage} of {outboxMail ? outboxMail.length > 0 ? outboxMail.length : null : null}</Col>
                          :
                          <Col xs="7">Showing {postsPerPage} - {postsPerPage + postsPerPage} of {outboxMail ? outboxMail.length > 0 ? outboxMail.length : null : null}</Col>

                        } */}
                        <Col xs="7">
                          Showing {postsPerPage} data per page out of{" "}
                          {outboxMail
                            ? outboxMail.length > 0
                              ? outboxMail.length
                              : null
                            : null}
                        </Col>
                        <Col xs="5">
                          <div className="btn-group float-end">
                            <Button
                              type="button"
                              color="success"
                              size="sm"
                              onClick={handleBackwardForSMS}
                            >
                              <i className="fa fa-chevron-left" />
                            </Button>
                            <Button
                              type="button"
                              color="success"
                              size="sm"
                              onClick={handleForwardForSMS}
                            >
                              <i className="fa fa-chevron-right" />
                            </Button>
                          </div>
                        </Col>

                        <Pagination
                          postsPerPage={postsPerPage}
                          totalPosts={
                            props.sms_list_data?.data
                              ? props.sms_list_data?.data.length > 0
                                ? props.sms_list_data?.data.length
                                : null
                              : null
                          }
                          paginate={paginateForSMS}
                        />
                      </Row>
                    </TabPane>
                    <TabPane tabId="5">

                      <div className="px-2 mt-2">

                        {props.sms_outbox_data?.data ? (
                          <DatatableTables2
                            products={props.sms_outbox_data}
                            columnData={sentSmsTableData}
                          />
                        ) : null}
                      </div>
                    </TabPane>
                    <TabPane tabId="6" className="py-5 px-2">

                      <PaginationProvider
                        pagination={paginationFactory(pageOptions)}
                        keyField="id"
                        columns={mailTemplateData}
                        data={props.tmp_list_data?.template || []}
                      >
                        {({ paginationProps, paginationTableProps }) => (
                          <ToolkitProvider
                            keyField="id"
                            columns={mailTemplateData}
                            data={props.tmp_list_data?.template || []}
                            search
                          >
                            {toolkitProps => (
                              <React.Fragment>
                                <Row className="mb-2">
                                  <Col md={2}></Col>
                                  <Col md={10}></Col>
                                </Row>

                                <Row>
                                  <Col xl="12">
                                    <div className="table-responsive">
                                      <div className="d-flex justify-content-end align-items-center search-box">
                                        <SearchBar
                                          {...toolkitProps.searchProps}
                                        />
                                      </div>
                                      <BootstrapTable
                                        ref={n => (node = n)}
                                        keyField={"id"}
                                        responsive
                                        bordered={false}
                                        striped={false}
                                        defaultSorted={defaultSorted}
                                        // selectRow={selectRow}
                                        tabIndexCell
                                        classes={
                                          "table align-middle table-nowrap"
                                        }
                                        headerWrapperClasses={"thead-light"}
                                        {...toolkitProps.baseProps}
                                        {...paginationTableProps}
                                      />
                                    </div>
                                  </Col>
                                </Row>

                                <Row className="align-items-md-center mt-30">
                                  <Col className="inner-custom-pagination d-flex">
                                    <div className="d-inline">
                                      <SizePerPageDropdownStandalone
                                        {...paginationProps}
                                      />
                                    </div>
                                    <div className="text-md-right ms-auto">
                                      <PaginationListStandalone
                                        {...paginationProps}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </React.Fragment>
                            )}
                          </ToolkitProvider>
                        )}
                      </PaginationProvider>


                    </TabPane>
                    <TabPane tabId="7">
                      <PaginationProvider
                        pagination={paginationFactory(pageOptionsSMS)}
                        keyField="id"
                        columns={smsTemplateData}
                        data={props.tmp_list_sms_data?.template || []}
                      >
                        {({ paginationProps, paginationTableProps }) => (
                          <ToolkitProvider
                            keyField="id"
                            columns={smsTemplateData}
                            data={props.tmp_list_sms_data?.template || []}
                            search
                          >
                            {toolkitProps => (
                              <React.Fragment>
                                <Row className="mb-2">
                                  <Col md={2}></Col>
                                  <Col md={10}></Col>
                                </Row>

                                <Row>
                                  <Col xl="12">
                                    <div className="table-responsive">
                                      <div className="d-flex justify-content-end align-items-center search-box">
                                        <SearchBar
                                          {...toolkitProps.searchProps}
                                        />
                                      </div>
                                      <BootstrapTable
                                        ref={n => (node = n)}
                                        keyField={"id"}
                                        responsive
                                        bordered={false}
                                        striped={false}
                                        defaultSorted={defaultSorted}
                                        // selectRow={selectRow}
                                        tabIndexCell
                                        classes={
                                          "table align-middle table-nowrap"
                                        }
                                        headerWrapperClasses={"thead-light"}
                                        {...toolkitProps.baseProps}
                                        {...paginationTableProps}
                                      />
                                    </div>
                                  </Col>
                                </Row>

                                <Row className="align-items-md-center mt-30">
                                  <Col className="inner-custom-pagination d-flex">
                                    <div className="d-inline">
                                      <SizePerPageDropdownStandalone
                                        {...paginationProps}
                                      />
                                    </div>
                                    <div className="text-md-right ms-auto">
                                      <PaginationListStandalone
                                        {...paginationProps}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </React.Fragment>
                            )}
                          </ToolkitProvider>
                        )}
                      </PaginationProvider>
                    </TabPane>
                    <TabPane tabId="8">

                      <div className="px-2 mt-2">

                        {props.sms_sent_data?.data ? (
                          <DatatableTables2
                            products={props.sms_sent_data}
                            columnData={sentSmsTableData}
                          />
                        ) : null}
                      </div>
                    </TabPane>



                    <TabPane tabId="12">
                      <>
                        <ul className="message-list">
                          {map(
                            props.tmp_list_sms_data?.template,
                            (inbox, key) => (
                              <li key={key}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail">
                                      <Input type="checkbox" id={inbox.id} />
                                      <Label
                                        htmlFor={inbox.id}
                                        className="toggle"
                                      />
                                    </div>
                                    <Link to="#" className="title">
                                      {inbox.to}
                                    </Link>

                                    <span className="star-toggle far fa-star" />
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: inbox.name,
                                      }}
                                    ></div>
                                  </div>
                                  <div className="col-mail col-mail-2">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: inbox.message,
                                      }}
                                    ></div>
                                    <div className="date">
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: 4,
                                          marginTop: "10px",
                                        }}
                                      >
                                        <Badge
                                          style={{
                                            padding: "5px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleEditSMSTempForm(inbox.id)
                                          }
                                          color="primary"
                                        >
                                          Edit
                                        </Badge>

                                        <Badge
                                          style={{ padding: "5px" }}
                                          onClick={() => smsTempDelete(inbox.id)}
                                          color="danger"
                                        >
                                          Delete
                                        </Badge>
                                      </div>
                                    </div>
                                    {/* <div className="date">{inbox.date}</div> */}
                                  </div>
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                        <Row
                          style={{ paddingLeft: "20px", paddingRight: "20px" }}
                        >
                          {/* {currentPage == 1 ?
                          <Col xs="7">Showing {currentPage} - {postsPerPage} of {outboxMail ? outboxMail.length > 0 ? outboxMail.length : null : null}</Col>
                          :
                          <Col xs="7">Showing {postsPerPage} - {postsPerPage + postsPerPage} of {outboxMail ? outboxMail.length > 0 ? outboxMail.length : null : null}</Col>

                        } */}
                          <Col xs="7">
                            Showing {postsPerPage} data per page out of{" "}
                            {props.tmp_list_sms_data?.template
                              ? props.tmp_list_sms_data?.template.length > 0
                                ? props.tmp_list_sms_data?.template.length
                                : null
                              : null}
                          </Col>
                          <Col xs="5">
                            <div className="btn-group float-end">
                              <Button
                                type="button"
                                color="success"
                                size="sm"
                                onClick={handleBackwardForSMSTemp}
                              >
                                <i className="fa fa-chevron-left" />
                              </Button>
                              <Button
                                type="button"
                                color="success"
                                size="sm"
                                onClick={handleForwardForSMSTemp}
                              >
                                <i className="fa fa-chevron-right" />
                              </Button>
                            </div>
                          </Col>

                          <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={
                              props.tmp_list_data?.template
                                ? props.tmp_list_data?.template.length > 0
                                  ? props.tmp_list_sms_data?.template.length
                                  : null
                                : null
                            }
                            paginate={paginateForSMSTemp}
                          />
                        </Row>
                      </>
                    </TabPane>




                  </TabContent>
                </Card>

              </div>
            </Col>
          </Row>
        </Container>
        {/* ============== template modal starts from here ===================*/}
        <Modal isOpen={taskModal} toggle={toggleTempModal}>
          <ModalHeader toggle={toggleTempModal}>
            <i className="bx bx-task text-primary"></i>&nbsp;
            <span className="text-primary">Schedule</span>
          </ModalHeader>

          <ModalBody>
            <Form className="form p-3">
              <div className="row mb-4">
                <Label
                  htmlFor="horizontal-firstname-Input"
                  className="col-sm-3 col-form-label"
                >
                  Active
                </Label>
                <Col sm={9}>
                  <Switch
                    uncheckedIcon={<Offsymbol />}
                    checkedIcon={<OnSymbol />}
                    className="me-1 mb-sm-8 mb-2"
                    onColor="#153D58"
                    onChange={() => {
                      setForm1State({
                        ...form1state,
                        switch1: !form1state.switch1,
                      });
                    }}
                    checked={form1state.switch1}
                  />
                </Col>
              </div>
              <FormGroup row>
                <Label for="property" sm={3}>
                  Name
                </Label>
                <Col sm={9}>
                  <div className="p-2">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      onChange={scheduleHandler}
                      placeholder="What will this be called?"

                    />
                  </div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="contact" sm={3}>
                  This message is regarding
                </Label>
                <Col sm={9}>
                  <div className="p-2">
                    <Select
                      value={schedule.selectRegarding}
                      onChange={handleSelectRegion}
                      options={schedule.optionRegarding}
                      // placeholder="Contact"
                      classNamePrefix="select2-selection"
                    />
                  </div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="manager" sm={3}>
                  This message will be sent to
                </Label>
                <Col sm={9}>
                  <div className="p-2">
                    <Select
                      value={schedule.selectTo}
                      onChange={handleSelectTo}
                      options={schedule.optionTo}
                      classNamePrefix="select2-selection"
                    />
                  </div>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="manager" sm={3}>
                  This message will be sent when
                </Label>
                <Col sm={9}>
                  <div className="p-2">
                    <Select
                      value={schedule.selectFrom}
                      onChange={handleSelectFrom}
                      options={schedule.optionFrom}
                      classNamePrefix="select2-selection"
                    />
                  </div>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="button" sm={3}></Label>
                <Col sm={9} className="gap-3">
                  <Button color="info" onClick={toggleTempModal}>
                    <i className="fa-solid fa-xmark"></i>Cancel
                  </Button>{" "}
                  <Button
                    color="info"
                    // disabled={
                    //   (state.property || props.property_id) && state.summary
                    //     ? false
                    //     : true
                    // }
                    onClick={handleSaveSchedule}
                  >
                    <i className="far fa-save"></i> &nbsp; Save
                  </Button>{" "}
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
        {/* ============== template modal ends here ===================*/}


        {/* ============== template modal FOR SMS starts from here ===================*/}
        <Modal isOpen={smsModal} toggle={toggleTempModalSMS}>
          <ModalHeader toggle={toggleTempModalSMS}>
            <i className="bx bx-task text-primary"></i>&nbsp;
            <span className="text-primary">SMS Schedule</span>
          </ModalHeader>

          <ModalBody>
            <Form className="form p-3">
              <div className="row mb-4">
                <Label
                  htmlFor="horizontal-firstname-Input"
                  className="col-sm-3 col-form-label"
                >
                  Active
                </Label>
                <Col sm={9}>
                  <Switch
                    uncheckedIcon={<Offsymbol />}
                    checkedIcon={<OnSymbol />}
                    className="me-1 mb-sm-8 mb-2"
                    onColor="#153D58"
                    onChange={() => {
                      setForm1State({
                        ...form1state,
                        switch1: !form1state.switch1,
                      });
                    }}
                    checked={form1state.switch1}
                  />
                </Col>
              </div>
              <FormGroup row>
                <Label for="property" sm={3}>
                  Name
                </Label>
                <Col sm={9}>
                  <div className="p-2">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      onChange={scheduleHandler}
                      placeholder="What will this be called?"

                    />
                  </div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="contact" sm={3}>
                  This message is regarding
                </Label>
                <Col sm={9}>
                  <div className="p-2">
                    <Select
                      value={schedule.selectRegarding}
                      onChange={handleSelectRegion}
                      options={schedule.optionRegarding}
                      // placeholder="Contact"
                      classNamePrefix="select2-selection"
                    />
                  </div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="manager" sm={3}>
                  This message will be sent to
                </Label>
                <Col sm={9}>
                  <div className="p-2">
                    <Select
                      value={schedule.selectTo}
                      onChange={handleSelectTo}
                      options={schedule.optionTo}
                      classNamePrefix="select2-selection"
                    />
                  </div>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="manager" sm={3}>
                  This message will be sent when
                </Label>
                <Col sm={9}>
                  <div className="p-2">
                    <Select
                      value={schedule.selectFrom}
                      onChange={handleSelectFrom}
                      options={schedule.optionFrom}
                      classNamePrefix="select2-selection"
                    />
                  </div>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="button" sm={3}></Label>
                <Col sm={9} className="gap-3">
                  <Button color="info" onClick={toggleTempModalSMS}>
                    <i className="fa-solid fa-xmark"></i>Cancel
                  </Button>{" "}
                  <Button
                    color="info"
                    // disabled={
                    //   (state.property || props.property_id) && state.summary
                    //     ? false
                    //     : true
                    // }
                    onClick={handleSaveScheduleforSMS}
                  >
                    <i className="far fa-save"></i> &nbsp; Save
                  </Button>{" "}
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
        {/* ============== template modal FOR SMS ends here ===================*/}
      </div>
      <DeleteModal
        show={modalDelete}
        onDeleteClick={deleteHandler}
        onCloseClick={() => setModalDelete(prev => !prev)}
      />
      <EditScheduleModal editScheduleModal={schedule.editScheduleModal} toggle={toggleEditScheduleModal} form1state={form1state}
        setForm1State={setForm1State} schedule={schedule} />
      {showSMSModal && <ShowSMSModal show={showSMSModal} toggle={toggleShowSMSModal} data={data.smsData} />}
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    mail_list_data,
    mail_list_error,
    mail_list_loading,
    mail_add_loading,


    inbox_list_data,
    inbox_list_error,
    inbox_list_loading,
    // mail_add_loading,

    mail_list_undelivered_data,
    mail_list_undelivered_loading,

    mail_list_sent_data,
    mail_list_sent_loading,

    sms_add_loading,

    sms_list_data,
    sms_list_loading,

    mail_template_add_loading,

    tmp_list_loading,
    tmp_list_data,

    tmp_list_id_data,
    tmp_list_id_loading,

    send_sms_loading,

    tmp_list_sms_data,
    tmp_list_sms_error,
    tmp_list_sms_loading,

    tmp_list_id_sms_data,
    tmp_list_id_sms_error,
    tmp_list_id_sms_loading,

    edit_mail_template_loading,

    edit_sms_template_loading,

    delete_mail_template_loading,

    delete_sms_template_loading,

    multiple_mail_add_loading,
    multiple_mail_delete_loading,
    schedule_list_loading,
    schedule_list_data,
    trigger_to_list_data,
    trigger_from_list_data,
    add_schedule_loading,
    reply_sand_loading,


    sms_outbox_data,
    sms_outbox_error,
    sms_outbox_loading,

    sms_sent_data,
    sms_sent_error,
    sms_sent_loading,
    mail_seen_unseen_loading, outbox_list_owner_data, outbox_list_owner_loading
  } = gstate.Message;
  return {
    mail_list_data,
    mail_list_error,
    mail_list_loading,
    mail_add_loading,


    inbox_list_data,
    inbox_list_error,
    inbox_list_loading,

    mail_list_undelivered_data,
    mail_list_undelivered_loading,

    mail_list_sent_data,
    mail_list_sent_loading,

    sms_add_loading,

    sms_list_data,
    sms_list_loading,

    mail_template_add_loading,

    tmp_list_loading,
    tmp_list_data,

    tmp_list_id_data,
    tmp_list_id_loading,

    send_sms_loading,

    tmp_list_sms_data,
    tmp_list_sms_error,
    tmp_list_sms_loading,

    tmp_list_id_sms_data,
    tmp_list_id_sms_error,
    tmp_list_id_sms_loading,

    edit_mail_template_loading,

    edit_sms_template_loading,

    delete_mail_template_loading,

    delete_sms_template_loading,

    multiple_mail_add_loading,
    multiple_mail_delete_loading,

    schedule_list_loading,
    schedule_list_data,
    trigger_to_list_data,
    trigger_from_list_data,
    add_schedule_loading,
    reply_sand_loading,

    sms_outbox_data,
    sms_outbox_error,
    sms_outbox_loading,

    sms_sent_data,
    sms_sent_error,
    sms_sent_loading,
    mail_seen_unseen_loading, outbox_list_owner_data, outbox_list_owner_loading
  };
};

export default withRouter(
  connect(mapStateToProps, {
    sendMail,
    mailList,
    inboxList,
    mailSendFresh,
    mailListUndelivered,
    mailListSent,
    sendSMS,
    sendSMSFresh,
    smsList,
    sendMailTemplate,
    sendSMSTemplate,
    sendMailTemplateFresh,
    sendSMSTemplateFresh,
    templateListSMS,
    templateListSMSFresh,
    templateListBySMSId,
    templateList,
    templateListFresh,
    templateListById,
    sendMailTemplateEditByUserID,
    mailTemplateEditFresh,
    sendSMSTemplateEditByUserID,
    smsTemplateEditFresh,
    deleteMailTemplateByID,
    deleteMailTemplateFresh,
    deleteSmsTemplateByID,
    deleteSmsTemplateFresh,
    sendMultipleMail,
    multipleMailSendFresh,
    deleteMultipleMail,
    multipleMailDeleteFresh,
    scheduleRegardingData,
    scheduleTriggerTo,
    scheduleTriggerFrom,
    addSchedule,
    addScheduleFresh,
    sendReply,
    sendReplyFresh,
    smsOutboxList,
    getsentsmsList,
    mailSeenUnseenFresh,
    sendMailSeenUnseen, outboxMailData, outboxMailDataOwner
  })(Messages)
);
