import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
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
  Form,
  FormGroup,
  CardHeader,
  Collapse
} from "reactstrap";
import classnames from "classnames";
import moment from "moment";
import {
  sendMail,
  mailList,
  sendReply,
  inboxList,
  inboxListFresh,
  mailSendFresh,
  mailListUndelivered,
  mailListUndeliveredFresh,
  mailListSent,
  sendSMS,
  sendSMSFresh,
  smsList,
  smsListFresh,
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
  smsOutboxListFresh,
  getsentsmsList,
  sendMailSeenUnseen,
  mailSeenUnseenFresh,
  sendMailReplyCheck,
  mailReplyCheckFresh,
  outboxMailData,
  outboxMailDataFresh,
  deleteSMSOutbox,
  deleteSMSOutboxFresh,
  deleteMultipleSMS,
  deleteMultipleSMSFresh,
  deleteMailTemplateMultiple,
  deleteMailTemplateMultipleFresh,
  deleteSmsTemplateMulti,
  deleteSmsTemplateMultiFresh,
  mailListSentFresh,
  storeAttachment,
  storeAttachmentFresh,
  spamList,
  spamListFresh,
} from "store/Messages/actions";
import toastr from "toastr";
import Select from "react-select";
import Switch from "react-switch";
// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

import avatar2 from "../../assets/images/users/avatar-2.jpg";

import MailLogo from "../../assets/images/image.png";

import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

import EditScheduleModal from "./EditScheduleModal";
import DeleteModal from "pages/Calendar/DeleteModal";

import ReplyCard from "./ReplyCard";
import parse from "html-react-parser";
import ShowSMSModal from "./Modal/ShowSMSModal";
import ShowLetterModal from "./Modal/ShowLetterModal";
import ShowLetterEditModal from "./Modal/ShowLetterEditModal";

import Loder from "components/Loder/Loder";
import { floor } from "lodash";
import { TagsInput } from "react-tag-input-component";
import RemotePagination from "pages/Task/RemotePagination";
import { getUser, contactList } from "store/actions";
import { useTranslation } from "react-i18next";

const Messages = props => {
  const history = useHistory();
  const location = useLocation();
  const { uploaded } = location?.state || {};
  const { t } = useTranslation();
  let language = localStorage.getItem("i18nextLng");

  const [state, setState] = useState({
    optionManager: [],
    optionContacts: [],
    modal: false,
    modal1: false,
    mailBodyModal: false,
    mailBodyModal2: false,
    loader: false,
    mailBodyModalText: null,
    mailBodyModalText2: null,
    activeTab: history.location?.state?.from == "dashboard" ? "1" : "0",
    page: 1,
    data: [],
    count: "",
    sizePerPage: 10,
    dataLength: 0,
    loading: false,
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
    reply: [],
    reply_from: null,
    reply_to: null,
    bodyLetter: null,
  });
  const [sentEmailBoolean, setSentEmailBoolean] = useState(true);
  const [init, setInit] = useState(true);
  const [loader, setLoader] = useState(false);
  const [smsButton, setSMSButton] = useState(false);
  const [smsTempButton, setSMSTempButton] = useState(false);
  const [modalSMS, setModalSMS] = useState(false);
  const [modalLetter, setModalLetter] = useState(false);
  const [modalMailTemplate, setModalMailTemplate] = useState(false);
  const [modalSMSTemplate, setModalSMSTemplate] = useState(false);
  const [data, setData] = useState({ smsData: {}, deleteData: {}, letterData: {} });
  const [showSMSModal, setShowSMSModal] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [showLetterEditModal, setShowLetterEditModal] = useState(false);
  const [search, setSearch] = useState("");
  const toggleShowSMSModal = () => setShowSMSModal(prev => !prev);
  const toggleShowLetterModal = () => setShowLetterModal(prev => !prev);
  const toggleEditLetterModal = () => setShowLetterEditModal(prev => !prev);

  var authUser = JSON.parse(localStorage.getItem("authUser"));

  const toggleSMSmodal = () => {
    setModalSMS(!modalSMS);
  };

  const toggleLettermodal = () => {
    setModalLetter(!modalLetter);
  };

  const [mailTempEditData, setMailTempEditData] = useState({
    subject: null,
    body: null,
  });

  const [smsTempEditData, setSMSTempEditData] = useState({
    name: null,
    message: null,
  });

  const [state2, setState2] = useState();
  const [smsOutboxTab, setSmsOutboxTab] = useState(false);
  const [dOpen, setDOpen] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const [optionGroup, setOptionGroup] = useState();
  const [modal, setModal] = useState(false);
  const [smsTempList, setSmsTempList] = useState();
  const [checkStatus, setCheckStatus] = useState(false);
  const [checkSmsStatus, setCheckSmsStatus] = useState(false);
  const [deleteState, setDeleteState] = useState();
  const [deleteState2, setDeleteState2] = useState();
  const [mess, setMess] = useState(false);
  const [mails, setMails] = useState([]);
  const toggle = () => setModal(!modal);
  const [modalDelete, setModalDelete] = useState(false);
  const toggleModalDelete = () => setModalDelete(prev => !prev);
  const inputFileProp = useRef(null);
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
  const [letterModal, setLetterModal] = useState(false);

  if (init) {
    props.getUser();
    props.contactList();
    props.inboxList(state.page, state.sizePerPage, null, "updated_at", "desc");
    setInit(false);
  }
  const toggleEmailTemplateModal = () => {
    setTaskModal(!taskModal);
  };
  //Delete Modal

  const toggleSMSTemplateModal = () => {
    setSMSModal(!smsModal);
  };
  const [sendReply, setReply] = useState(false);
  // make mail temp field null
  const handleMailTempFieldNull = () => {
    setMailTempEditData(prev => ({
      ...mailTempEditData,
      subject: "",
      body: "",
    }));

    // setSelectedGroup(null);
    //setShowTemplate(false);
  };

  const handleToggleTempModal = () => {
    toggleEmailTemplateTextModal();
  };

  // schedule modal for SMS start from here
  const handleToggleTempModalForSMS = () => {
    if (state2) {
      toggleSMSTemplateModal();
    } else {
      toastr.warning("Please fill up all fields");
    }
  };
  // schedule modal for SMS ends from here

  const toggleTempModalLetter = () => {
    setLetterModal(!letterModal);
  };

  // schedule modal for Letter start from here
  const handleToggleTempModalForLetter = () => {
    if (!state.bodyLetter) {
      toastr.warning("Please fill up all fields");
      return;
    }
    toggleTempModalLetter();
  };
  // schedule modal for Letter ends from here

  //Schedule state
  const [schedule, setSchedule] = useState({
    init: true,
    clickRegarding: false,
    optionRegarding: [],
    optionTo: [],
    optionFrom: [],
    editScheduleModal: false,
    templateData: [],
  });
  const [selectedCC, setSelectedCC] = useState([]);
  const [selectedBCC, setSelectedBCC] = useState([]);
  const [opencc, setOpencc] = useState(false);

  const toggleEditScheduleModal = () => {
    setSchedule(prev => ({
      ...prev,
      editScheduleModal: !prev.editScheduleModal,
    }));
  };

  //For datatable
  const [actionArray, setActionArray] = useState([]);
  const [table, setTable] = useState([]);
  const [attached, setAttached] = useState([]);

  const handleEditMailTempForm = id => {
    setEditMailTempmodal(!editMailTempmodal);
    props.templateListById(id);
    setCheckStatus(true);
  };

  const handleDeleteMailTempForm = () => {
    setDeleteModal(!deleteModal);
    setDeleteTempStatus(true);
    setState({ ...state, loader: true });
    props.deleteMailTemplateByID(deleteState);
  };

  const handleDeleteSMSTempForm = () => {
    setDeleteModal2(!deleteModal2);
    setState({ ...state, loader: true });
    props.deleteSmsTemplateByID(deleteState2);
  };

  const handleMailTempEditForm = e => {
    e.preventDefault();
    setEditMailTempmodal(!editMailTempmodal);
    setState({ ...state, loader: true });

    props.sendMailTemplateEditByUserID(
      props.tmp_list_id_data?.template?.id,
      mailTempEditData
    );
  };

  const handleSMSTempEditForm = e => {
    e.preventDefault();
    setSMSTempUpdate(!smsTempUpdate);
    setState({ ...state, loader: true });
    props.sendSMSTemplateEditByUserID(
      props.tmp_list_id_sms_data?.data?.id,
      smsTempEditData
    );
    handleMultipleItem;
  };

  const handleMultipleItem = id => {
    let arr = [];
    let checkboxes = document.querySelectorAll(
      "input[type='checkbox']:checked"
    );
    for (let i = 0; i < checkboxes.length; i++) {
      arr.push(checkboxes[i].id);
    }
    setMails(arr);
  };

  function uncheckAllBoxes() {
    var input = document.querySelectorAll("input[type='checkbox']:checked");
    for (var i = 0; i < input.length; i++) {
      input[i].checked = false;
    }
  }
  const resultEl = document.getElementById("result");
  const toggleTab = tab => {
    if (props.activeTab !== tab) {
      setState({ ...state, activeTab: tab });
    }

    setTable([]);
    if (tab == 0) {
      props.inboxList(1, 10, null, "updated_at", "desc");
      setActionArray([]);
    }
    if (tab == 1) {
      props.outboxMailData(1, 10, null, "updated_at", "desc");
      setActionArray([]);
    }
    if (tab == 2) {
      props.mailListUndelivered(1, 10, null, "updated_at", "desc");
      setActionArray([]);
    }
    if (tab == 3) {
      props.mailListSent(1, 10, null, "updated_at", "desc");
      setActionArray([]);
    }
    if (tab == 4) {
      props.smsList(1, 10, null, "updated_at", "desc");
      setActionArray([]);
    }
    if (tab == 5) {
      props.smsOutboxList(1, 10, null, "updated_at", "desc");
      setActionArray([]);
    }
    if (tab == 6) {
      props.templateList(1, 10, null, "updated_at", "desc");
      setActionArray([]);
    }
    if (tab == 7) {
      props.templateListSMS(1, 10, null, "updated_at", "desc");
      setActionArray([]);
    }
    if (tab == 8) {
      props.spamList(1, 10, null, "updated_at", "desc");
      setActionArray([]);
    }
    if (tab == 9) {
      fetchLetterTemplate(null, "updated_at", "desc", 1, 10);
      setActionArray([]);
    }
    if (tab == 10) {
      fetchSentLetter(null, "message_with_mails.updated_at", "desc", 1, 10);
      setActionArray([]);
    }
    if (tab == 11) {
      fetchOutboxLetter(null, "message_with_mails.updated_at", "desc", 1, 10);
      setActionArray([]);
    }
  };

  const fetchLetterTemplate = async (search, sortField, sortValue, page, perPage) => {

    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authUser.token}`
    };
    const letterTemplateList = `${process.env.REACT_APP_LOCALHOST}/letter/templates?search=${search}&sortField=${sortField}&sortValue=${sortValue}&page=${page}&perPage=${perPage}`;

    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await axios.get(letterTemplateList, { headers: headers });
      setState((prevData) => ({
        ...prevData,
        data: response.data.data.data,
        dataLength: response.data.data.total,
        page: parseInt(response.data.data.currentPage),
        sizePerPage: response.data.data.perPage,
      }));
    } catch (error) {
      console.error('Error fetching letter template:', error);
      setState(prev => ({ ...prev, loading: false }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }

  const fetchSentLetter = async (search, sortField, sortValue, page, perPage) => {

    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authUser.token}`
    };
    const sentLettterList = `${process.env.REACT_APP_LOCALHOST}/letters/sent?search=${search}&sortField=${sortField}&sortValue=${sortValue}&page=${page}&perPage=${perPage}`;

    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await axios.get(sentLettterList, { headers: headers });
      setState((prevData) => ({
        ...prevData,
        data: response.data.data.data,
        dataLength: response.data.data.total,
        page: parseInt(response.data.data.currentPage),
        sizePerPage: response.data.data.perPage,
      }));
    } catch (error) {
      console.error('Error fetching sent letters:', error);
      setState(prev => ({ ...prev, loading: false }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }

  const fetchOutboxLetter = async (search, sortField, sortValue, page, perPage) => {

    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authUser.token}`
    };
    const outboxLetterList = `${process.env.REACT_APP_LOCALHOST}/letters/outbox?search=${search}&sortField=${sortField}&sortValue=${sortValue}&page=${page}&perPage=${perPage}`;

    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await axios.get(outboxLetterList, { headers: headers });
      setState((prevData) => ({
        ...prevData,
        data: response.data.data.data,
        dataLength: response.data.data.total,
        page: parseInt(response.data.data.currentPage),
        sizePerPage: response.data.data.perPage,
      }));
    } catch (error) {
      console.error('Error fetching outbox letters:', error);
      setState(prev => ({ ...prev, loading: false }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }

  if (uploaded && sentEmailBoolean) {
    setSentEmailBoolean(false)
    setState(prevState => ({
      ...prevState,
      modal: !prevState.modal,
      activeTab: "0",
      loader: false,
      mailBodyModal2: false,
      to: "",
      subject: "",
      body: "",
    }));
    setSelectedCC([]);
    setSelectedBCC([]);
  }

  const togglemodal = () => {
    setState(prevState => ({
      ...prevState,
      modal: !prevState.modal,
      activeTab: "0",
      loader: false,
      mailBodyModal2: false,
      to: "",
      subject: "",
      body: "",
    }));
    setAttached([]);
    setSelectedCC([]);
    setSelectedBCC([]);
  };

  const toggleEmailTemplateTextModal = () => {
    setState(prevState => ({
      ...prevState,
      loader: false,
      mailBodyModal2: false,
      to: "",
      subject: "",
      body: "",
    }));
    setModalMailTemplate(!modalMailTemplate)
    setAttached([]);
    setSelectedCC([]);
    setSelectedBCC([]);
  };

  const toggleSMSTemplateTextModal = () => {
    setModalSMSTemplate(!modalSMSTemplate)
  };

  const togglemodal1 = () => {
    setState(prevState => ({
      modal1: !prevState.modal1,
      activeTab: "1",
      activeTab,
    }));
  };

  const toggleMailBodyModal = (tab, text, to, from, subject, id) => {
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

  const toggleMailBodyModal2 = (
    tab,
    text,
    to,
    from,
    subject,
    id,
    reply,
    reply_from,
    reply_to
  ) => {
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
      reply_to: reply_to,
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

  const handleMulti3 = e => {
    setSelectedCC(e);
  };
  const handleMulti4 = e => {
    setSelectedBCC(e);
  };

  const handleSubmitMail = e => {
    e.preventDefault();
    if (state.to === "") {
      toastr.warning("Please add recipient");
      return;
    }
    if (mailTempEditData.subject === "") {
      toastr.warning("Please add subject");
      return;
    }
    if (state.id != null) {
      props.sendMail(
        state,
        mailTempEditData.subject,
        attached,
        selectedCC,
        selectedBCC
      );
      setOptionGroup([]);
      setState({ ...state, loader: true });
      setMailTempEditData(...mailTempEditData, {
        body: "",
        subject: "",
      });
    } else {
      props.sendMail(
        state,
        mailTempEditData.subject,
        attached,
        selectedCC,
        selectedBCC
      );
      setOptionGroup([]);
      setState({ ...state, loader: true });
    }
  };

  const handleReplyMail = e => {
    e.preventDefault();
    if (state.to == null) {
      toastr.warning("Please fill up all fields");
    } else if (state.id != null) {
      props.sendReply(state);
      // setSelectedGroup(null);
      setOptionGroup([]);
      setState({ ...state, mailBodyModal2: false });
      setLoader(true);
    }
  };

  const handleMultipleMailSend = () => {
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
    if (!state2) {
      toastr.warning("Please add recepient");
      return;
    }
    if (!smsTempEditData.message) {
      toastr.warning("Please add sms body");
      return;
    }
    props.sendSMS(state2, smsTempEditData.message);
    setState(prevState => ({
      ...prevState,
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
    props.sendSMSTemplate(state2, smsTempEditData.message);
    setModal(false);

    setState(prevState => ({
      loader: true,
    }));
  };

  const selectHandlerForMessage = e => {
    setState({ ...state, ["to"]: e.value });
  };
  const selectHandlerForSMS = e => {
    setState2({ ...state2, [e.target.name]: e.target.value });
  };

  const dropDownHandler = e => {
    if (e.target.value == "1") togglemodal();
    if (e.target.value == "2") toggleSMSmodal();
    if (e.target.value == "3") toggleLettermodal();
  };

  const selectDropDownHandler = e => {
    if (e.target.value) {
      props.templateListById(e.target.value);
      setShowTemplate(true);
    }
  };

  const handleSelectGroupForMail = e => {
    // setSelectedGroup(e);
    if (e.value != undefined) {
      props.templateListById(e.value);
      setShowTemplate(true);
    }
  };
  //============= template list for SMS ===============
  const handleSelectGroupForSMS = e => {
    setSelectedGroupSMS(e);
    if (e.value != undefined) {
      props.templateListBySMSId(e.value);
      setShowTemplateSMS(true);
    }
  };

  const selectDropDownHandlerForSMS = e => {
    if (e.target.value) {
      setShowSMSTemp(true);
    }
  };

  const templateAllData = props.tmp_list_data?.template;

  const templateDataById = props.tmp_list_id_data?.template;

  //mail temp delete
  const mailTempDelete = id => {
    setDeleteState(id);
    setDeleteModal(!deleteModal);
  };

  //sms temp delete
  const smsTempDelete = id => {
    setDeleteState2(id);
    setDeleteModal2(!deleteModal2);
  };

  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png', 'image/gif'];

  const handleAttachment = e => {
    e.preventDefault();

    const file = e.target.files[0]
    if (!allowedTypes.includes(file.type)) {
      toastr.error("File must be of type pdf, xls, xlsx, doc, docx, jpg, jpeg, png, gif")
      return;
    }

    props.storeAttachment(e.target.files);
    setLoader(true);
  };

  //====== filter mail for out box starts from here ===========
  let outboxMail = props.mail_list_data
    ? props.mail_list_data.data
      ? props.mail_list_data.data.filter(mail => mail.status != "sent")
      : null
    : null;

  let allSenrMail = props.mail_list_sent_data
    ? props.mail_list_sent_data.data
      ? props.mail_list_sent_data.data.filter(
        mail => mail.status == "sent" && mail.type != "sms"
      )
      : null
    : null;

  // ========== pagination for outbox starts from here ===========
  const [currentPage, setCurrentPage] = useState(1);

  const [postsPerPage] = useState(10);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [color, setColor] = useState("green");
  const currentPosts = outboxMail
    ? outboxMail.slice(indexOfFirstPost, indexOfLastPost)
    : null;
  const outboxLength = outboxMail
    ? outboxMail.length > 0
      ? outboxMail.length
      : null
    : null;
  // Change page
  const paginate = pageNumber => {
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
  const allSenrMailLength = allSenrMail
    ? allSenrMail.length > 0
      ? allSenrMail.length
      : null
    : null;
  // Change page
  const paginateFotSent = pageNumber => {
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

  // ============= sms outbox ===========
  const [currentPageForSMSOutbox, setCurrentPageForSMSOutbox] = useState(1);
  const indexOfLastPostForSMSOutbox = currentPageForSMSOutbox * postsPerPage;
  const indexOfFirstPostForSMSOutbox =
    indexOfLastPostForSMSOutbox - postsPerPage;
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

  const currentPostsForSMSSent = props.sms_sent_data?.data
    ? props.sms_sent_data?.data.slice(
      indexOfFirstPostForSMSSent,
      currentPageForSMSSent
    )
    : null;
  const allSMSOutboxLength = props.sms_outbox_data?.data
    ? props.sms_outbox_data?.data.length > 0
      ? props.sms_outbox_data?.data.length
      : null
    : null;

  const allSMSSentLength = props.sms_sent_data?.data
    ? props.sms_sent_data?.data.length > 0
      ? props.sms_sent_data?.data.length
      : null
    : null;

  const allSMSLength = props.sms_list_data?.data
    ? props.sms_list_data?.data.length > 0
      ? props.sms_list_data?.data.length
      : null
    : null;
  // Change page
  const paginateForSMS = pageNumber => {
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
  const allReplySortById = props.inbox_list_data?.data?.reply;

  const allMailTempLength = props.tmp_list_data?.template
    ? props.tmp_list_data?.template.length > 0
      ? props.tmp_list_data?.template.length
      : null
    : null;
  // Change page
  const paginateForMailTemp = pageNumber => {
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
  const allSMSTempLength = props.tmp_list_data?.template
    ? props.tmp_list_data?.template.length > 0
      ? props.tmp_list_sms_data?.template.length
      : null
    : null;
  // Change page
  const paginateForSMSTemp = pageNumber => {
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
  const allUndeliveredLength = props.mail_list_undelivered_data?.data
    ? props.mail_list_undelivered_data?.data.length > 0
      ? props.mail_list_undelivered_data?.data.length
      : null
    : null;
  // Change page
  const paginateForUndelivered = pageNumber => {
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
    email_sends_automatically: true,
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

  const handleSaveScheduleforEmail = async (e) => {
    e.preventDefault();

    if (!schedule.name) {
      toastr.warning("Please enter a template name.");
      return;
    }
    if (!schedule.selectRegarding || !schedule.selectRegarding.value) {
      toastr.warning("Please select 'This message is regarding'.");
      return;
    }
    if (!schedule.selectTo || !schedule.selectTo.value) {
      toastr.warning("Please select 'This message will be sent to'.");
      return;
    }
    if (!schedule.selectFrom || !schedule.selectFrom.value) {
      toastr.warning("Please select 'This message will be sent when'.");
      return;
    }
    if (!state.body) {
      toastr.warning("Please enter the body");
      return;
    }

    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authUser.token}`
    };
    const URL = `${process.env.REACT_APP_LOCALHOST}/mail/template`;
    const data = {
      name: schedule.name,
      message_action_name_id: schedule.selectRegarding.value,
      message_trigger_to_id: schedule.selectTo.value,
      messsage_trigger_point_id: schedule.selectFrom.value,
      body: state.body,
      status: form1state.switch1,
      email_sends_automatically: form1state.email_sends_automatically,
      subject: schedule.name,
      type: "mail",
    };

    setState(prev => ({ ...prev, loader: true }));

    try {
      const response = await axios.post(URL, data, { headers });
      toggleEmailTemplateModal();
      toggleEmailTemplateTextModal();
      setState(prev => ({ ...prev, loader: false }));

      setSchedule({
        name: '',
        selectRegarding: null,
        selectTo: null,
        selectFrom: null,
      });
      setState(prev => ({
        ...prev,
        body: '',
      }));

      toastr.success(response.data.message);
      props.templateList(1, 10, null, "updated_at", "desc");
    } catch (error) {
      setState(prev => ({ ...prev, loader: false }));
      if (error.response) {
        toastr.warning(error.response.data.message || 'Something went wrong');
      } else if (error.request) {
        toastr.warning('No response from the server');
      } else {
        toastr.warning(error.message);
      }
    }
  };

  const handleSaveScheduleforSMS = async (e) => {
    e.preventDefault();

    if (!schedule.name) {
      toastr.warning("Name cannot be empty");
      return;
    }
    if (!schedule.selectRegarding) {
      toastr.warning("Please select 'This message is regarding'.");
      return;
    }
    if (!schedule.selectTo) {
      toastr.warning("Please select 'This message will be sent to'.");
      return;
    }
    if (!schedule.selectFrom) {
      toastr.warning("Please select 'This message will be sent when'.");
      return;
    }
    if (!smsTempEditData.message) {
      toastr.warning("Please enter the body");
      return;
    }

    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authUser.token}`
    };
    const Url = `${process.env.REACT_APP_LOCALHOST}/sms/template`;
    const data = {
      name: schedule.name,
      status: form1state.switch1,
      message: smsTempEditData.message,
      message_action_name_id: schedule.selectRegarding.value,
      message_trigger_to_id: schedule.selectTo.value,
      messsage_trigger_point_id: schedule.selectFrom.value,
      type: "sms",
    };

    setState(prev => ({ ...prev, loader: true }));

    try {
      const response = await axios.post(Url, data, { headers: headers });

      setSchedule({
        name: '',
        selectRegarding: null,
        selectTo: null,
        selectFrom: null,
      });
      setSMSTempEditData({
        ...smsTempEditData,
        message: '',
      });

      toggleSMSTemplateModal();
      toggleSMSTemplateTextModal();
      setState(prev => ({ ...prev, loader: false }));
      toastr.success(response.data.message);
      props.templateListSMS(1, 10, null, "updated_at", "desc");
    } catch (error) {
      toastr.warning(error.message);
      setState(prev => ({ ...prev, loader: false }));
    }
  };



  const handleSaveScheduleforLetter = async (e) => {
    e.preventDefault();

    let hasError = false;
    const validationErrors = {};

    if (!schedule.name) {
      hasError = true;
      validationErrors.name = "Name cannot be empty";
    }
    if (!state.bodyLetter) {
      hasError = true;
      validationErrors.bodyLetter = "Please enter the body";
    }
    if (!schedule.selectRegarding?.value) {
      hasError = true;
      validationErrors.selectRegarding = "Please select 'This message is regarding'.";
    }
    if (!schedule.selectTo?.value) {
      hasError = true;
      validationErrors.selectTo = "Please select 'This message will be sent to'.";
    }
    if (!schedule.selectFrom?.value) {
      hasError = true;
      validationErrors.selectFrom = "Please select 'This message will be sent when'.";
    }

    if (hasError) {
      Object.values(validationErrors).forEach(error => {
        toastr.warning(error);
      });
      return;
    }

    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authUser.token}`
    };
    const Url = `${process.env.REACT_APP_LOCALHOST}/letter/templates`;
    const data = {
      name: schedule?.name,
      message: state.bodyLetter,
      message_action_name_id: schedule?.selectRegarding?.value,
      message_trigger_to_id: schedule?.selectTo?.value,
      messsage_trigger_point_id: schedule?.selectFrom?.value,
      status: form1state.switch1,
      email_sends_automatically: form1state.email_sends_automatically
    };

    setState(prev => ({ ...prev, loader: true }));

    try {
      const response = await axios.post(Url, data, { headers: headers });

      setSchedule({
        name: '',
        selectRegarding: null,
        selectTo: null,
        selectFrom: null
      });
      setState({
        ...state,
        bodyLetter: '',
      });

      toggleLettermodal();
      toggleTempModalLetter();
      setState(prev => ({ ...prev, loader: false }));
      toastr.success(response.data.message);
      fetchLetterTemplate(null, "updated_at", "desc", 1, 10);
    } catch (error) {
      toastr.warning(error.message);
      setState(prev => ({ ...prev, loader: false }));
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
  };
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
    setSchedule({ ...schedule, templateData: row });
    toggleEditScheduleModal();
  };
  const handleClick = (row, tab) => {
    props.sendMailSeenUnseen(row.id);
  };

  const singleDeleteMail = data => {
    setModalDelete(true);
    setState({ ...state, mail: "single", activeTab: "6" });
    setActionArray(data);
  };
  const delRef = (cell, row) => (
    <span
      className="badge rounded-pill badge-soft-danger font-size-12"
      onClick={() => singleDeleteMail(row)}
    >
      Delete
    </span>
  );

  const editRef = (cell, row) => (
    <span className="badge rounded-pill badge-soft-primary font-size-12">
      Edit
    </span>
  );

  const delSMSTemplate = data => {
    setModalDelete(true);
    setActionArray(data);
    setState({ ...state, activeTab: "7", sms: "single" });
  };

  const delRefSMS = (cell, row) => (
    <span
      className="badge rounded-pill badge-soft-danger font-size-12"
      onClick={() => delSMSTemplate(row)}
    >
      Delete
    </span>
  );


  const delLetterTemplate = data => {
    setModalDelete(true);
    setActionArray(prevArray => [...prevArray, data]);
  };

  const delRefLetter = (cell, row) => (
    <span
      className="badge rounded-pill badge-soft-danger font-size-12"
      onClick={() => delLetterTemplate(row)}
    >
      Delete
    </span>
  );

  const inboxSubjectRef = (cell, row) => (
    <span
      className={
        (row.watch == 1 && row.reply_to == authUser.user.email) ||
          row.details_status == "Unread"
          ? "fw-bold text-info"
          : "text-info"
      }
    >
      {cell}
    </span>
  );

  const mailTemplateData = [
    {
      dataField: "name",
      text: "Name",
      text: `${t("Name")}`,
      sort: true,
    },

    {
      dataField: "message_action_name",
      text: "Regarding",
      text: `${t("Regarding")}`,
      sort: true,
    },
    {
      dataField: "message_trigger_to",
      text: "Send to",
      text: `${t("Send")} ${t("to")}`,
      sort: true,
    },
    {
      dataField: "messsage_trigger_point",
      text: "Trigger",
      text: `${t("Trigger")}`,
      sort: true,
    },
    {
      dataField: "",
      text: "Edit",
      text: `${t("Edit")}`,
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
      text: `${t("Action")}`,
      sort: true,
      formatter: delRef,
    },
  ];
  const handleMailSend = data => {
    props.sendMultipleMail(data);
    setState({ ...state, loader: true });
  };
  const sendRef = (cell, row) => (
    <span
      className="badge rounded-pill badge-soft-success font-size-12"
      onClick={() => handleMailSend(row)}
    >
      Send
    </span>
  );
  const viewRef = (cell, row, tab) => (
    <span
      className="badge rounded-pill badge-soft-primary font-size-12"
      onClick={() => {
        toggleMailBodyModal2(
          state.activeTab,
          row.body,
          row.to,
          row.from,
          row.subject,
          row.id,
          row.reply,
          row.reply_from,
          row.reply_to
        );
        handleClick(row, tab);
      }}
    >
      View
    </span>
  );

  const inboxDetail = (e, column, columnIndex, row, rowIndex) => {
    history.push("/messages-details/" + row.id);
    props.sendMailSeenUnseen(row.id);
  };

  const dateRef = (cell, row) => (
    <span
      className={
        (row.watch == 1 && row.reply_to == authUser.user.email) ||
          row.details_status == "Unread"
          ? "fw-bold text-mute"
          : "text-mute"
      }
    >
      {cell ? moment(cell).format("DD/MM/yyyy") : ""}
    </span>
  );

  const detailStatus = (cell, row) => {
    if (cell == "Unread") {
      return (
        <span className="badge rounded-pill bg-warning me-1 p-1">{cell}</span>
      );
    } else if (cell == "Pending") {
      return (
        <span className="badge rounded-pill bg-secondary me-1 p-1">{cell}</span>
      );
    } else if (cell == "Open") {
      return (
        <span className="badge rounded-pill bg-secondary me-1 p-1 fw-bold">
          {cell}
        </span>
      );
    } else if (cell == "Complete") {
      return (
        <span className="badge rounded-pill bg-info me-1 p-1">{cell}</span>
      );
    } else {
      return (
        <span className="badge rounded-pill bg-danger me-1 p-1">
          {"Unread"}
        </span>
      );
    }
  };

  const inboxTableData = [
    {
      dataField: "details_status",
      // text: inboxTableDataName.Status,
      text: `${t("Status")}`,
      sort: true,
      formatter: detailStatus,

      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          inboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "from",
      text: `${t("From")}`,
      sort: true,
      formatter: inboxSubjectRef,

      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          inboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "to",
      text: `${t("To")}`,

      sort: true,
      formatter: inboxSubjectRef,

      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          inboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "subject",
      text: `${t("Subject")}`,

      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          inboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "status",
      text: `${t("Sending")} ${t("status")}`,
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
      text: `${t("Updated")} ${t("at")}`,
      formatter: dateRef,
      sort: true,
    },
  ];

  const delRef1 = (cell, row) => (
    <span
      className="badge rounded-pill badge-soft-danger font-size-12"
      onClick={() => handleMailDelete(row)}
    >
      Delete
    </span>
  );

  const outboxDetail = (e, column, columnIndex, row, rowIndex) => {
    history.push("/messages-details/" + row.id);
  };

  const inboxTableData1 = [
    {
      dataField: "details_status",
      text: `${t("Status")}`,
      sort: true,
      formatter: detailStatus,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          inboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "from",
      text: `${t("From")}`,
      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "to",
      text: `${t("To")}`,
      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "subject",
      text: `${t("Subject")}`,
      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "status",
      text: `${t("Status")}`,

      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "",
      text: `${t("Action")}`,
      formatter: sendRef,
      sort: true,
    },
    {
      dataField: "",
      text: `${t("Action")}`,
      formatter: delRef1,
      sort: true,
    },
    {
      dataField: "updated_at",
      text: `${t("Updated")} ${t("at")}`,
      formatter: dateRef,

      sort: true,
    },
  ];
  const inboxTableData2 = [
    {
      dataField: "details_status",
      text: `${t("Status")}`,
      sort: true,
      formatter: detailStatus,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          inboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "from",
      text: `${t("From")}`,
      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "to",
      text: `${t("To")}`,
      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "subject",
      text: `${t("Subject")}`,
      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "status",
      text: `${t("Status")}`,
      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "updated_at",
      text: `${t("Updated")} ${t("at")}`,
      formatter: dateRef,
      sort: true,
    },
  ];

  const inboxTableData3 = [
    {
      dataField: "details_status",
      text: `${t("Status")}`,
      sort: true,
      formatter: detailStatus,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          inboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "from",
      text: `${t("From")}`,
      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "to",
      text: `${t("To")}`,
      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "subject",
      text: `${t("Subject")}`,
      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "status",
      text: `${t("Status")}`,
      sort: true,
      formatter: inboxSubjectRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          outboxDetail(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "updated_at",
      text: `${t("Updated")} ${t("at")}`,
      formatter: dateRef,
      sort: true,
    },
  ];

  const smsTemplateData = [
    {
      dataField: "name",
      text: `${t("Name")}`,
      sort: true,
      // events: {
      //   onClick: (e, column, columnIndex, row, rowIndex) => {
      //     mailTemplateDetails(e, column, columnIndex, row, rowIndex);
      //   },
      // },
    },

    {
      dataField: "message_action_name",
      text: `${t("Regarding")}`,
      sort: true,
      // events: {
      //   onClick: (e, column, columnIndex, row, rowIndex) => {
      //     mailTemplateDetails(e, column, columnIndex, row, rowIndex);
      //   },
      // },
    },
    {
      dataField: "message_trigger_to",
      text: `${t("Send")} ${t("to")}`,
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
      text: `${t("Trigger")}`,
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
      text: `${t("Edit")}`,
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
      text: `${t("Action")}`,
      sort: true,
      formatter: delRefSMS
    },
  ];

  const letterTemplateData = [
    {
      dataField: "name",
      text: `${t("Name")}`,
      sort: true,
    },

    {
      dataField: "message_action_name",
      text: `${t("Regarding")}`,
      sort: true,
    },
    {
      dataField: "message_trigger_to",
      text: `${t("Send")} ${t("to")}`,
      sort: true,
    },
    {
      dataField: "messsage_trigger_point",
      text: "Trigger",
      text: `${t("Trigger")}`,
      sort: true,
    },
    {
      dataField: "",
      text: "Edit",
      text: `${t("Edit")}`,
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
      text: `${t("Action")}`,
      sort: true,
      formatter: delRefLetter,
    },
  ];

  const sentLetterData = [
    {
      dataField: "recipient_full_name",
      text: `${t("Recipient")}`,
      sort: true,
    },

    {
      dataField: "body",
      text: `${t("Letter")}`,
      sort: true,
      formatter: (cell) => {
        if (!cell) {
          return "";
        }
        return cell.length > 30 ? `${cell.substring(0, 30)}...` : cell;
      },
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          letterDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },

    {
      dataField: "status",
      text: `${t("Status")}`,
      sort: true,
    },
    {
      dataField: "created_at",
      text: `${t("Created at")}`,
      sort: true,
      formatter: (cell) => {
        return moment(cell).format("DD/MM/YYYY");
      },
    },
    {
      dataField: "",
      text: `${t("Edit")}`,
      sort: true,
      formatter: (cell, row) => {
        if (state.toggleTab === "11") {
          return editRef(cell, row);
        }
        return null;
      },
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          if (state.toggleTab === "11") {
            letterEdit(e, column, columnIndex, row, rowIndex);
          }
        },
      },
    },
    {
      dataField: "Action",
      text: `${t("Action")}`,
      sort: true,
      formatter: delRefLetter,
    },
  ];

  const outboxLetterData = [
    {
      dataField: "recipient_full_name",
      text: `${t("Recipient")}`,
      sort: true,
    },

    {
      dataField: "body",
      text: `${t("Letter")}`,
      sort: true,
      formatter: (cell) => {
        return cell.length > 30 ? `${cell.substring(0, 30)}...` : cell;
      },
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          letterDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "status",
      text: `${t("Status")}`,
      sort: true,
    },
    {
      dataField: "created_at",
      text: `${t("Created at")}`,
      sort: true,
      formatter: (cell) => {
        return moment(cell).format("DD/MM/YYYY");
      },
    },
    {
      dataField: "",
      text: "Edit",
      text: `${t("Edit")}`,
      sort: true,
      formatter: editRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          letterEdit(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "Action",
      text: `${t("Action")}`,
      sort: true,
      formatter: delRefLetter,
    },
  ];

  const letterDetails = (e, column, columnIndex, row, rowIndex) => {
    setData({ ...data, letterData: row });
    toggleShowLetterModal();
  }

  const letterEdit = (e, column, columnIndex, row, rowIndex) => {
    setData({ ...data, letterData: row });
    toggleEditLetterModal();
  };

  const handleSelect = (isSelect, rows, e) => {
    if (rows) {
      setActionArray(prevArray => [...prevArray, isSelect]);
      setTable([...table, isSelect.id]);
    } else {
      setActionArray(cur => cur.filter(data => data.id !== isSelect.id));
      setTable(cur => cur.filter(data => data !== isSelect.id));
    }
  };

  const handleSelectAll = (isSelect, rows, e) => {
    if (isSelect) {
      setActionArray(rows);
      const data = rows.map(item => item.id);
      setTable(data);
    } else {
      setActionArray([]);
      setTable([]);
    }
  };

  // Select  Button operation
  const selectRow = {
    mode: "checkbox",
    // clickToSelect: true,
    selected: table,
    onSelect: handleSelect,
    onSelectAll: handleSelectAll,
  };

  const handleReply = () => {
    setReply(!sendReply);
  };

  useEffect(() => {
    if (props.delete_multi_sms_temp__loading === "Success") {
      toastr.success("Deleted");
      props.deleteSmsTemplateMultiFresh();
      setActionArray([]);
      props.templateListSMS();
      setState(prev => ({ ...prev, loader: false }));
    }
    if (props.delete_multi_sms_temp__loading === "Failed") {
      toastr.error("Something went error");
      props.deleteSmsTemplateMultiFresh();
      // setActionArray([])
      setState(prev => ({ ...prev, loader: false }));
    }
    if (props.multiple_mail_temp_delete_loading === "Success") {
      toastr.success("Deleted");
      props.deleteMailTemplateMultipleFresh();
      setActionArray([]);
      props.templateList();
      setState(prev => ({ ...prev, loader: false }));
    }
    if (props.multiple_mail_temp_delete_loading === "Failed") {
      toastr.error("Something went wrong");
      props.deleteMailTemplateMultipleFresh();
      // setActionArray([]);
      setState(prev => ({ ...prev, loader: false }));
    }
    if (props.multiple_sms_delete_loading === "Success") {
      toastr.success("Deleted");
      props.deleteMultipleSMSFresh();
      props.getsentsmsList();
      props.smsOutboxList(
        state.page,
        state.sizePerPage,
        null,
        "updated_at",
        "desc"
      );
      setActionArray([]);
      setState(prev => ({ ...prev, loader: false }));
    }
    if (props.multiple_sms_delete_loading === "Failed") {
      toastr.success("Failed");
      props.deleteMultipleSMSFresh();
      // setActionArray([]);
      setState(prev => ({ ...prev, loader: false }));
    }
    if (props.delete_outbox_sms_data == "Success") {
      toastr.success("Deleted");
      props.deleteSMSOutboxFresh();
      props.smsOutboxList(
        state.page,
        state.sizePerPage,
        null,
        "updated_at",
        "desc"
      );
      setState(prev => ({ ...prev, loader: false }));
    }
    if (props.delete_outbox_sms_data == "Failed") {
      toastr.error("Something went wrong");
      props.deleteSMSOutboxFresh();
      setState(prev => ({ ...prev, loader: false }));
    }
    if (props.outbox_mail_list_loading === "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.outbox_mail_list_data?.page),
        data: props.outbox_mail_list_data?.data,
        count: props.outbox_mail_list_data?.count,
        sizePerPage: props.outbox_mail_list_data?.sizePerPage,
        dataLength: props.outbox_mail_list_data?.length,
        loading: false,
      }));
      props.outboxMailDataFresh();
    }

    if (props.mail_list_undelivered_loading === "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.mail_list_undelivered_data?.page),
        data: props.mail_list_undelivered_data?.data,
        count: props.mail_list_undelivered_data?.count,
        sizePerPage: props.mail_list_undelivered_data?.sizePerPage,
        dataLength: props.mail_list_undelivered_data?.length,
        loading: false,
      }));
      props.mailListUndeliveredFresh();
    }
    if (props.add_schedule_loading === "Success") {
      toastr.success("Success");
      setState({ ...state, loader: false });
      props.addScheduleFresh();
      setSchedule(prev => ({
        ...prev,
        selectRegarding: {},
        selectTo: {},
        selectFrom: {},
      }));
      toggleEmailTemplateModal();
      togglemodal();
    }

    if (props.mail_seen_unseen_loading === "Success") {
      props.mailSeenUnseenFresh();
      props.inboxList(
        state.page,
        state.sizePerPage,
        null,
        "updated_at",
        "desc"
      );
    }

    if (props.reply_sand_loading === "Success") {
      toastr.success("Success");
      props.sendReplyFresh();
      props.inboxList(
        state.page,
        state.sizePerPage,
        null,
        "updated_at",
        "desc"
      );
      setLoader(false);
    }
    if (props.reply_sand_loading === "Failed") {
      toastr.error("Something went wrong");
      props.sendReplyFresh();
      setLoader(false);
    }
    if (props.schedule_list_loading === false) {
      props.scheduleRegardingData();
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

    let optionManager;
    if (props.user_list_data) {
      optionManager = props.user_list_data?.data?.map(item => ({
        // label: item.first_name + " " + item.last_name,
        label: item.full_name,
        value: item.email,
      }));
      setState(prev => ({ ...prev, optionManager: optionManager }));
    }

    if (props.inbox_list_loading === "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.inbox_list_data?.page),
        data: props.inbox_list_data?.data,
        count: props.inbox_list_data?.count,
        sizePerPage: props.inbox_list_data?.sizePerPage,
        dataLength: props.inbox_list_data?.length,
        loading: false,
      }));
      props.inboxListFresh();
    }

    if (props.sms_outbox_loading === "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.sms_outbox_data?.page),
        data: props.sms_outbox_data?.data,
        count: props.sms_outbox_data?.count,
        sizePerPage: props.sms_outbox_data?.sizePerPage,
        dataLength: props.sms_outbox_data?.length,
        loading: false,
      }));
      props.smsOutboxListFresh();
    }

    if (props.mail_list_sent_loading === "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.mail_list_sent_data?.page),
        data: props.mail_list_sent_data?.data,
        count: props.mail_list_sent_data?.count,
        sizePerPage: props.mail_list_sent_data?.sizePerPage,
        dataLength: props.mail_list_sent_data?.length,
        loading: false,
      }));
      props.mailListSentFresh();
    }

    if (props.mail_add_loading == "Success") {
      toastr.success("Success");
      props.mailSendFresh();
      props.mailList();

      props.mailListSent(
        state.page,
        state.sizePerPage,
        null,
        "updated_at",
        "desc"
      );
      props.outboxMailData();
      setMailTempEditData({});
      setState(prev => ({
        ...prev,
        loader: false,
        mailBodyModal2: false,
        modal: false,
        activeTab: "3",
        to: "",
        subject: "",
        body: "",
      }));
      setAttached([]);
      setSelectedCC([]);
      setSelectedBCC([]);
    }
    if (props.mail_add_loading == "Failed") {
      toastr.error("Something went wrong");
      setState(prev => ({
        ...prev,
        loader: false,
      }));
      props.mailSendFresh();
    }
    // for multiple mail send

    if (props.multiple_mail_add_loading === "Success") {
      toastr.success("Success");
      props.multipleMailSendFresh();

      props.outboxMailData(
        state.page,
        state.sizePerPage,
        null,
        "updated_at",
        "desc"
      );
      setActionArray([]);
      setTable([]);
      setState(prev => ({ ...prev, loader: false }));
    }
    if (props.multiple_mail_add_loading === "Failed") {
      toastr.warning("Something went wrong");
      props.multipleMailSendFresh();
      setState(prev => ({ ...prev, loader: false }));
    }

    //for multiple mail delete
    if (props.multiple_mail_delete_loading === "Success") {
      toastr.success("Deleted");
      props.multipleMailDeleteFresh();
      props.outboxMailData();
      setModalDelete(false);
      props.inboxList(
        state.page,
        state.sizePerPage,
        null,
        "updated_at",
        "desc"
      );
      props.mailListUndelivered(
        state.page,
        state.sizePerPage,
        null,
        "updated_at",
        "desc"
      );
      props.mailListSent(
        state.page,
        state.sizePerPage,
        null,
        "updated_at",
        "desc"
      );

      setActionArray([]);
      setState(prev => ({ ...prev, loader: false }));

      // toggleTab('1');
    }
    if (props.multiple_mail_delete_loading === "Failed") {
      toastr.error("Something went wrong");
      props.multipleMailDeleteFresh();
      setModalDelete(false);
      props.inboxList(
        state.page,
        state.sizePerPage,
        null,
        "updated_at",
        "desc"
      );
      setActionArray([]);
      setState(prev => ({ ...prev, loader: false }));
    }

    // for sms template
    if (props.send_sms_loading === "Success") {
      props.sendSMSTemplateFresh();
      props.templateListSMSFresh();
      props.templateListSMS();
      toastr.success("Saved");
      toggleSMSTemplateModal();
      toggleSMSmodal();
      setState({ ...state, loader: false });
    }
    // mail template edit
    if (props.edit_mail_template_loading === "Success") {
      props.mailTemplateEditFresh();
      toastr.success("Updated");
      setState({ ...state, loader: false });
    }

    // delete mail template
    if (props.delete_mail_template_loading === "Success") {
      toastr.success("Deleted");
      props.deleteMailTemplateFresh();
      setActionArray([]);
      // setDeleteTempStatus(false);
      setState({ ...state, loader: false, mail: "" });
      //props.templateListFresh();
      props.templateList();
    }

    if (props.delete_mail_template_loading === "Failed") {
      toastr.error("Something went wrong");
      props.deleteMailTemplateFresh();
      setState({ ...state, loader: false, mail: "" });
    }

    // delete sms template
    if (props.delete_sms_template_loading === "Success") {
      props.deleteSmsTemplateFresh();
      props.templateListSMSFresh();
      toastr.success("Deleted");
      setActionArray([]);
      setState({ ...state, loader: false });
    }

    if (props.delete_sms_template_loading === "Failed") {
      toastr.error("Something went wrong");
      props.deleteSmsTemplateFresh();
      // setActionArray([]);
      setState({ ...state, loader: false });
    }
    // sms template edit
    if (props.edit_sms_template_loading === "Success") {
      props.smsTemplateEditFresh();
      props.templateListSMS();
      toastr.success("Updated");

      setState({ ...state, loader: false });
    }
    if (props.sms_add_loading == "Success") {
      toastr.success("Success");
      props.sendSMSFresh();
      props.smsList(state.page, state.sizePerPage, null, "updated_at", "desc");

      setSMSTempEditData({});
      setState({ ...state, loader: false });
      setShowSMSModal(false);
      setModalSMS(false);
    }
    if (props.sms_add_loading == "Failed") {
      toastr.error("Something went wrong");
      props.sendSMSFresh();
      setState({ ...state, loader: false });
      // setShowSMSModal(false)
    }

    if (props.sms_list_loading === "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.sms_list_data?.page),
        data: props.sms_list_data?.data,
        count: props.sms_list_data?.count,
        sizePerPage: props.sms_list_data?.sizePerPage,
        dataLength: props.sms_list_data?.length,
        loading: false,
      }));
      props.smsListFresh();
    }
    if (props.mail_template_add_loading === "Success") {
      props.sendMailTemplateFresh();
      props.templateListFresh();
      toastr.success("Saved");

      setState({ ...state, loader: false });
    }
    if (props.tmp_list_loading === "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.tmp_list_data?.page),
        data: props.tmp_list_data?.data,
        count: props.tmp_list_data?.count,
        sizePerPage: props.tmp_list_data?.sizePerPage,
        dataLength: props.tmp_list_data?.length,
        loading: false,
      }));
      props.templateListFresh();
    }

    if (props.tmp_list_sms_loading === "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.tmp_list_sms_data?.page),
        data: props.tmp_list_sms_data?.data,
        count: props.tmp_list_sms_data?.count,
        sizePerPage: props.tmp_list_sms_data?.sizePerPage,
        dataLength: props.tmp_list_sms_data?.length,
        loading: false,
      }));
      props.templateListSMSFresh();
    }

    if (props.mail_spam_loading === "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.mail_spam_data?.page),
        data: props.mail_spam_data?.data,
        count: props.mail_spam_data?.count,
        sizePerPage: props.mail_spam_data?.sizePerPage,
        dataLength: props.mail_spam_data?.length,
        loading: false,
      }));
      props.spamListFresh();
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
      setState({
        ...state,
        to: authUser.user.email == state.to ? state.from : state.to,
        from: authUser.user.email,
      });
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
    let optionContacts;
    if (props.contacts_list_loading == "Success") {
      optionContacts = props.contacts_list_data?.data?.map((item, key) => ({
        label: item.reference + "( " + item.email + " )",
        value: item.email,
      }));
      setState(prev => ({ ...prev, optionContacts: optionContacts }));
    }
  }, [
    props.inbox_list_loading,
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
    props.sms_list_loading,
    props.mail_seen_unseen_loading,
    sendReply,
    props.outbox_mail_list_loading,
    props.delete_outbox_sms_data,
    props.multiple_sms_delete_loading,
    props.multiple_mail_temp_delete_loading,
    props.delete_multi_sms_temp__loading,
    props.mail_attachment_loading,
    props.mail_spam_loading,
    attached,
    props.user_list_data,
    props.contacts_list_loading,
  ]);

  const handleMultipleMailInbox = () => {
    props.sendMultipleMail(actionArray);
    setState(prev => ({ ...prev, loader: true }));
  };

  const handleDeleteInbox = () => {
    setModalDelete(true);
  };

  const handleDeleteMultipleSentSMS = () => {
    setModalDelete(true);
  };

  const handleMultipleMailTemplateDelete = () => {
    setModalDelete(true);
  };
  const handleMultipleSMSTemplateDelete = () => {
    setModalDelete(true);
  };

  const handleMultipleMailTemp = () => {
    setDeleteModal(true);
  };

  const deleteHandler = async () => {
    if (state.activeTab == "0") {
      props.deleteMultipleMail(actionArray);
      props.inboxList("1", "10", null, "updated_at", "desc");
    }
    if (state.activeTab == "1") {
      props.deleteMultipleMail(actionArray);
      props.outboxMailData("1", "10", null, "updated_at", "desc");
    }
    if (state.activeTab == "2") {
      props.deleteMultipleMail(actionArray);
      props.mailListUndelivered("1", "10", null, "updated_at", "desc");
    }
    if (state.activeTab == "3") {
      props.deleteMultipleMail(actionArray);
      props.mailListSent("1", "10", null, "updated_at", "desc");
    }
    if (state.activeTab == "5") {
      props.deleteMultipleSMS(actionArray);
      props.smsOutboxList("1", "10", null, "updated_at", "desc");
    }
    if (state.activeTab == "8") {
      props.deleteMultipleSMS(actionArray);
      props.spamList("1", "10", null, "updated_at", "desc");
    }
    if (state.activeTab == "6") {
      if (state.mail == "single") {
        props.deleteMailTemplateByID(actionArray.id);
      } else {
        props.deleteMailTemplateMultiple(actionArray);
      }
      props.templateList("1", "10", null, "updated_at", "desc");
    }
    if (state.activeTab == "7") {
      if (state.sms == "single") {
        props.deleteSmsTemplateByID(actionArray.id);
      } else {
        props.deleteSmsTemplateMulti(actionArray);
      }
      props.templateListSMS("1", "10", null, "updated_at", "desc");
    }
    if (state.activeTab == "9") {
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authUser.token}`
      };
      const Url = `${process.env.REACT_APP_LOCALHOST}/letter/templates/destroy-multiple`;
      const ids = actionArray.map(object => object.id);
      const data = {
        id: ids
      }
      setModalDelete(false);
      setState(prev => ({ ...prev, loader: true }));
      try {
        const response = await axios.post(Url, data, { headers: headers });
        setState(prev => ({
          ...prev,
          loader: false,
          activeTab: "9"
        }));
        toastr.success(response.data.message)
        fetchLetterTemplate(null, "updated_at", "desc", "1", "10");
        setActionArray([]);
      } catch (error) {
        setState(prev => ({ ...prev, loader: false }));
        toastr.error(error.message);
      }
    }
    if (state.activeTab === "10" || state.activeTab === "11") {
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authUser.token}`
      };
      const Url = `${process.env.REACT_APP_LOCALHOST}/letters/delete-multiple`;
      const ids = actionArray.map(object => object.id);
      const data = {
        id: ids
      }
      setModalDelete(false);
      setState(prev => ({ ...prev, loader: true }));
      try {
        const response = await axios.post(Url, data, { headers: headers });
        setState(prev => ({
          ...prev,
          loader: false,
          activeTab: state.activeTab
        }));
        toastr.success(response.data.message)
        if (state.activeTab === "10") {
          fetchSentLetter(null, "message_with_mails.updated_at", "desc", "1", "10");
        }
        if (state.activeTab === "11") {
          fetchOutboxLetter(null, "message_with_mails.updated_at", "desc", "1", "10");
        }
        setActionArray([]);
      } catch (error) {
        setState(prev => ({ ...prev, loader: false }));
        toastr.error(error.message);
      }
    }

    if (state.activeTab !== "9" && state.activeTab !== "10" && state.activeTab !== "11") {
      setModalDelete(false);
      setState(prev => ({ ...prev, loader: true }));
    }

  };

  const handleMailDelete = data => {
    setModalDelete(prev => !prev);
    setActionArray([data]);
  };

  let x = JSON.parse(window.localStorage.getItem("authUser"));

  const msgRef = (cell, row) => (
    <span className="text-primary">
      {cell ? cell.slice(0, 30) + "......" : ""}
    </span>
  )

  const smsDetail = (e, column, columnIndex, row, rowIndex) => {
    setData({ ...data, smsData: row });
    toggleShowSMSModal();
  };
  const sentSmsTableData = [
    {
      dataField: "to",
      text: `${t("Recipient")}`,
      sort: true,
    },
    {
      dataField: "body",
      text: `${t("Message")}`,

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
      text: `${t("Status")}`,
      sort: true,
    },
    {
      dataField: "created_at",
      text: `${t("Created")} ${t("at")}`,
      formatter: dateRef,
      sort: true,
    },
  ];

  const handleSMSSend = data => {
    props.sendMultipleMail(data.id);
    setState({ ...state, loader: true });
  };

  const smsSendRef = (cell, row) => (
    <span
      className="badge rounded-pill badge-soft-primary font-size-12"
      onClick={() => handleSMSSend(row)}
    >
      Send
    </span>
  );

  const handleSMSDelete = data => {
    setModalDelete(prev => !prev);
    setActionArray([data]);
  };

  const smsDelRef = (cell, row) => (
    <span
      className="badge rounded-pill badge-soft-danger font-size-12"
      onClick={() => handleSMSDelete(row)}
    >
      Delete
    </span>
  );

  const outboxSmsTableData = [
    {
      dataField: "to",
      text: `${t("Recipient")}`,
      sort: true,
    },
    {
      dataField: "body",
      text: `${t("Message")}`,
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
      text: `${t("Status")}`,
    },
    // {
    //   dataField: "",
    //   text: "Action",
    //   formatter: smsSendRef,
    //   sort: true,
    // },
    {
      dataField: "",
      text: "Action",
      text: `${t("Action")}`,
      formatter: smsDelRef,

      sort: true,
    },
    {
      dataField: "created_at",
      text: `${t("Created")} ${t("at")}`,
      formatter: dateRef,
      sort: true,
    },
  ];

  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder }
  ) => {
    setState(prev => ({ ...prev, loading: true }));
    if (!search) {
      if (sortField) {
        if (state.activeTab == 0) {
          props.inboxList(page, sizePerPage, null, sortField, sortOrder);
          setActionArray([]);
        } else if (state.activeTab == 1) {
          props.outboxMailData(page, sizePerPage, null, sortField, sortOrder);
          setActionArray([]);
        } else if (state.activeTab == 2) {
          props.mailListUndelivered(
            page,
            sizePerPage,
            null,
            sortField,
            sortOrder
          );
          setActionArray([]);
        } else if (state.activeTab == 3) {
          props.mailListSent(page, sizePerPage, null, sortField, sortOrder);
          setActionArray([]);
        } else if (state.activeTab == 4) {
          props.smsList(page, sizePerPage, null, sortField, sortOrder);
          setActionArray([]);
        } else if (state.activeTab == 5) {
          props.smsOutboxList(page, sizePerPage, null, sortField, sortOrder);
          setActionArray([]);
        } else if (state.activeTab == 6) {
          props.templateList(page, sizePerPage, null, sortField, sortOrder);
          setActionArray([]);
        } else if (state.activeTab == 7) {
          props.templateListSMS(page, sizePerPage, null, sortField, sortOrder);
          setActionArray([]);
        } else if (state.activeTab == 8) {
          props.spamList(page, sizePerPage, null, sortField, sortOrder);
          setActionArray([]);
        } else if (state.activeTab == 9) {
          fetchLetterTemplate(null, sortField, sortOrder, page, sizePerPage);
          setActionArray([]);
        } else if (state.activeTab == 10) {
          fetchSentLetter(null, sortField, sortOrder, page, sizePerPage);
          setActionArray([]);
        } else if (state.activeTab == 11) {
          fetchOutboxLetter(null, sortField, sortOrder, page, sizePerPage);
          setActionArray([]);
        }
      } else {
        if (state.activeTab == 0) {
          props.inboxList(page, sizePerPage, null, "updated_at", "desc");
          setActionArray([]);
        } else if (state.activeTab == 1) {
          props.outboxMailData(page, sizePerPage, null, "updated_at", "desc");
          setActionArray([]);
        } else if (state.activeTab == 2) {
          props.mailListUndelivered(
            page,
            sizePerPage,
            null,
            "updated_at",
            "desc"
          );
          setActionArray([]);
        } else if (state.activeTab == 3) {
          props.mailListSent(page, sizePerPage, null, "updated_at", "desc");
          setActionArray([]);
        } else if (state.activeTab == 4) {
          props.smsList(page, sizePerPage, null, "updated_at", "desc");
          setActionArray([]);
        } else if (state.activeTab == 5) {
          props.smsOutboxList(page, sizePerPage, null, "updated_at", "desc");
          setActionArray([]);
        } else if (state.activeTab == 6) {
          props.templateList(page, sizePerPage, null, "updated_at", "desc");
          setActionArray([]);
        } else if (state.activeTab == 7) {
          props.templateListSMS(page, sizePerPage, null, "updated_at", "desc");
          setActionArray([]);
        } else if (state.activeTab == 8) {
          props.spamList(page, sizePerPage, null, "updated_at", "desc");
          setActionArray([]);
        } else if (state.activeTab == 9) {
          fetchLetterTemplate(null, "updated_at", "desc", page, sizePerPage);
          setActionArray([]);
        } else if (state.activeTab == 10) {
          fetchSentLetter(null, "message_with_mails.updated_at", "desc", page, sizePerPage);
          setActionArray([]);
        } else if (state.activeTab == 11) {
          fetchOutboxLetter(null, "message_with_mails.updated_at", "desc", page, sizePerPage);
          setActionArray([]);
        }
      }
    } else {
      if (sortField) {
        if (state.activeTab == 0) {
          props.inboxList(page, sizePerPage, search, sortField, sortOrder);
          setActionArray([]);
        } else if (state.activeTab == 1) {
          props.outboxMailData(page, sizePerPage, search, sortField, sortOrder);
          setActionArray([]);
        } else if (state.activeTab == 2) {
          props.mailListUndelivered(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder
          );
          setActionArray([]);
        } else if (state.activeTab == 3) {
          props.mailListSent(page, sizePerPage, search, sortField, sortOrder);
          setActionArray([]);
        } else if (state.activeTab == 4) {
          props.smsList(page, sizePerPage, search, sortField, sortOrder);
          setActionArray([]);
        } else if (state.activeTab == 5) {
          props.smsOutboxList(page, sizePerPage, search, sortField, sortOrder);
          setActionArray([]);
        } else if (state.activeTab == 6) {
          props.templateList(page, sizePerPage, search, sortField, sortOrder);
          setActionArray([]);
        } else if (state.activeTab == 7) {
          props.templateListSMS(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder
          );
          setActionArray([]);
        } else if (state.activeTab == 8) {
          props.spamList(page, sizePerPage, search, sortField, sortOrder);
          setActionArray([]);
        } else if (state.activeTab == 9) {
          fetchLetterTemplate(search, sortField, sortOrder, page, sizePerPage);
          setActionArray([]);
        } else if (state.activeTab == 10) {
          fetchSentLetter(search, sortField, sortOrder, page, sizePerPage);
          setActionArray([]);
        } else if (state.activeTab == 11) {
          fetchOutboxLetter(search, sortField, sortOrder, page, sizePerPage);
          setActionArray([]);
        }
      } else {
        if (state.activeTab == 0) {
          props.inboxList(page, sizePerPage, search, "updated_at", "desc");
          setActionArray([]);
        } else if (state.activeTab == 1) {
          props.outboxMailData(page, sizePerPage, search, "updated_at", "desc");
          setActionArray([]);
        } else if (state.activeTab == 2) {
          props.mailListUndelivered(
            page,
            sizePerPage,
            search,
            "updated_at",
            "desc"
          );
          setActionArray([]);
        } else if (state.activeTab == 3) {
          props.mailListSent(page, sizePerPage, search, "updated_at", "desc");
          setActionArray([]);
        } else if (state.activeTab == 4) {
          props.smsList(page, sizePerPage, search, "updated_at", "desc");
          setActionArray([]);
        } else if (state.activeTab == 5) {
          props.smsOutboxList(page, sizePerPage, search, "updated_at", "desc");
          setActionArray([]);
        } else if (state.activeTab == 6) {
          props.templateList(page, sizePerPage, search, "updated_at", "desc");
          setActionArray([]);
        } else if (state.activeTab == 7) {
          props.templateListSMS(
            page,
            sizePerPage,
            search,
            "updated_at",
            "desc"
          );
          setActionArray([]);
        } else if (state.activeTab == 8) {
          props.spamList(page, sizePerPage, search, "updated_at", "desc");
          setActionArray([]);
        } else if (state.activeTab == 9) {
          fetchLetterTemplate(search, "updated_at", "desc", page, sizePerPage)
          setActionArray([]);
        } else if (state.activeTab == 10) {
          fetchSentLetter(search, "message_with_mails.updated_at", "desc", page, sizePerPage);
          setActionArray([]);
        } else if (state.activeTab == 11) {
          fetchOutboxLetter(search, "message_with_mails.updated_at", "desc", page, sizePerPage);
          setActionArray([]);
        }
      }
    }
  };

  const handleSearchState = e => {
    setSearch(e.target.value);
  };
  const messageDefaultSorted = [
    {
      dataField: "updated_at",
      order: "desc",
    },
  ];

  const selectRowMessage = {
    mode: "checkbox",
    hideSelectColumn: false,
    selected: table,
    onSelect: handleSelect,
    onSelectAll: handleSelectAll,
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

  const handleSelectGroupManager = e => {
    setState(prev => ({ ...prev, selectedManager: e, to: e.value }));
  };

  //
  const localizeItem = text => `${t(text)}`;

  const BreadcrumbsData = {
    title: `${t("Email")}`,
    breadcrumbItem: `${t("Inbox")}`,
  };


  // Get all contact list

  const [contacts, setContacts] = useState([]);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [text, setText] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleInputChange = (newValue) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeoutId = setTimeout(() => {
      setText(newValue);
    }, 500);

    setTypingTimeout(timeoutId);
  };

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authUser.token}`
    };
    const contactListUrl = `${process.env.REACT_APP_LOCALHOST}/message/recipients`;

    const fetchOptionContacts = async () => {
      try {
        setIsContactLoading(true);
        const response = await axios.post(contactListUrl, { text: text }, { headers: headers });
        const formattedContacts = response.data.data.map(contact => ({
          label: `${contact.display} ( ${contact.email} )`,
          value: contact.email
        }));
        setContacts(formattedContacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setIsContactLoading(false);
      }
    };

    fetchOptionContacts();
  }, [text])

  const handleMultipleUndeliveredDismiss = async () => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authUser.token}`
    };

    const Url = `${process.env.REACT_APP_LOCALHOST}/message/email/dismiss`;
    const ids = actionArray.map(object => object.id);
    const data = {
      ids: ids
    };

    setState(prev => ({ ...prev, loader: true }));

    try {
      const response = await axios.post(Url, data, { headers: headers });
      toastr.success(response.data.message);
      props.mailListUndelivered(1, 10, null, "updated_at", "desc");
      setActionArray([]);
    } catch (error) {
      console.error('Error:', error);

      if (error.response) {
        const errorMessage = error.response.data.message || 'An error occurred while dismissing the emails.';
        toastr.warning(errorMessage);
      } else if (error.request) {
        toastr.warning('No response received from the server.');
      } else {
        toastr.warning('An unexpected error occurred.');
      }
    } finally {
      setState(prev => ({ ...prev, loader: false }));
    }
  };

  const [mergeData, setMergeData] = useState([]); // Holds merge fields and subfields
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openAccordion, setOpenAccordion] = useState(null); // State to manage open accordion item
  const editorRef = useRef(null);


  // Fetch merge fields and subfields based on action name
  const fetchMergeFields = async (actionName) => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authUser.token}`
    };
    const Url = `${process.env.REACT_APP_LOCALHOST}/message-actions/${actionName}`;
    setLoading(true);
    try {
      const response = await axios.get(Url, { headers: headers });
      setMergeData(response.data.data.merge_fields);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (schedule?.selectRegarding) {
      fetchMergeFields(schedule?.selectRegarding?.label)
    } else {
      fetchMergeFields("Contact")
    }
  }, [schedule?.selectRegarding?.label])


  // Toggle Accordion
  const toggleAccordion = (itemId) => {
    setOpenAccordion(openAccordion === itemId ? null : itemId);
  };

  const handleSubFieldClick = (subField) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const insertContent = `{{${subField}}}`;

      editor.model.change(writer => {
        // Get the current selection position
        const selection = editor.model.document.selection;

        // Insert the text at the current cursor position
        editor.model.insertContent(writer.createText(insertContent), selection);
      });
    }
  };

  const handleSubFieldClickSMS = (subField) => {
    const messageData = smsTempEditData.message || "";
    const insertContent = `{{${subField}}}`;

    // Insert the subfield at the end of the current message
    const updatedMessage = messageData + insertContent;

    // Update the state with the new message
    setSMSTempEditData({
      ...smsTempEditData,
      message: updatedMessage,
    });
  };

  const handleSubFieldClickLetter = (subField) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const insertContent = `{{${subField}}}`;

      editor.model.change(writer => {
        // Get the current selection position
        const selection = editor.model.document.selection;

        // Insert the text at the current cursor position
        editor.model.insertContent(writer.createText(insertContent), selection);
      });
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          {/* <Breadcrumbs title={BreadcrumbsData.title} breadcrumbItem={BreadcrumbsData.breadcrumbItem} /> */}
          {/* <Loder status={editMailStatus} /> */}
          <h4 className="ms-2 text-primary">Email</h4>
          <Row>
            <Col xs="12">
              {/* Render Email SideBar */}
              <Card className="email-leftbar">
                <div className="">
                  <Dropdown
                    isOpen={dOpen}
                    toggle={() => setDOpen(prev => !prev)}
                    onClick={dropDownHandler}
                    className="w-100"
                  >
                    <DropdownToggle
                      className="btn btn-cyan d-flex justify-content-between align-items-center w-100"
                      caret
                    >
                      {t("New")}
                      {dOpen == false ? (
                        <i className="mdi mdi-chevron-down font-size-16 ms-1"></i>
                      ) : (
                        <i className="mdi mdi-chevron-right font-size-16 ms-1"></i>
                      )}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem value="1">{localizeItem("Compose")}</DropdownItem>
                      <DropdownItem value="2">{t("SMS")}</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>

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
                        <i className="mdi mdi-email-receive-outline me-1"></i>
                        {t("Inbox")}{" "}
                        {/* <span className="ml-1 float-end">
                          (
                          {state.count?.inbox_count
                            ? state.count?.inbox_count
                            : "0"}
                          )
                        </span> */}
                      </NavLink>
                    </NavItem>

                    {authUser.user.user_type == "Property Manager" && (
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: state.activeTab === "1",
                          })}
                          onClick={() => {
                            toggleTab("1");
                          }}
                        >
                          <i className="mdi mdi-email-plus-outline me-1"></i>
                          {t("Outbox")}{" "}
                          {/* <span className="ml-1 float-end">
                          (
                          {state.count?.outbox_count
                            ? state.count?.outbox_count
                            : "0"}
                          )
                        </span> */}
                        </NavLink>
                      </NavItem>
                    )}

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: state.activeTab === "8",
                        })}
                        onClick={() => {
                          toggleTab("8");
                        }}
                      >
                        <i className="mdi mdi-email-outline me-1"></i>
                        {t("Spam")}{" "}
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
                        <i className="mdi mdi-email-remove-outline me-1"></i>
                        {t("Undelivered")}
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
                        <i className="mdi mdi-email-send-outline me-1"></i>
                        {t("Sent")}
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: state.activeTab === "4",
                        })}
                        onClick={() => {
                          toggleTab("4");
                        }}
                      >
                        <i className="mdi mdi-cellphone-arrow-down me-1"></i>
                        {t("Sent")} {t("SMS")}
                      </NavLink>
                    </NavItem>

                    {authUser.user.user_type == "Property Manager" && (
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: state.activeTab === "5",
                          })}
                          onClick={() => {
                            toggleTab("5");
                          }}
                        >
                          <i className="mdi mdi-cellphone-android me-1"></i>
                          {t("SMS")} {t("Outbox")}
                        </NavLink>
                      </NavItem>
                    )}
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: state.activeTab === "10",
                        })}
                        onClick={() => {
                          toggleTab("10");
                        }}
                      >
                        <i className="mdi mdi-printer me-1"></i>
                        Sent Letter
                      </NavLink>
                    </NavItem>
                    {authUser.user.user_type == "Property Manager" && (
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: state.activeTab === "11",
                          })}
                          onClick={() => {
                            toggleTab("11");
                          }}
                        >
                          <i className="mdi mdi-printer-alert me-1"></i>
                          Outox Letter
                        </NavLink>
                      </NavItem>
                    )}

                    {authUser.user.user_type == "Property Manager" && (
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: state.activeTab === "6",
                          })}
                          onClick={() => {
                            toggleTab("6");
                          }}
                        >
                          <i className="mdi mdi-email-open-multiple-outline me-1"></i>
                          {t("Email")} {t("Template")}
                        </NavLink>
                      </NavItem>
                    )}

                    {authUser.user.user_type == "Property Manager" && (
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: state.activeTab === "7",
                          })}
                          onClick={() => {
                            toggleTab("7");
                            setSMSTempButton(true);
                          }}
                        >
                          <i className="mdi mdi-cellphone-text me-1"></i>
                          {t("SMS")} {t("Template")}
                        </NavLink>
                      </NavItem>
                    )}

                    {authUser.user.user_type == "Property Manager" && (
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: state.activeTab === "9",
                          })}
                          onClick={() => {
                            toggleTab("9");
                          }}
                        >
                          <i className="fas fa-print me-1"></i>
                          {t("Letter")} {t("Template")}
                        </NavLink>
                      </NavItem>
                    )}
                  </Nav>
                </div>
              </Card>
              <div className="email-rightbar mb-3">
                <Card>
                  <TabContent activeTab={state.activeTab}>
                    <TabPane tabId="0">
                      <Row>
                        <Col sm="12">
                          <Card>
                            <CardHeader className="bg-transparent border-bottom communication-module-sidebar-item-design">
                              <div className="d-flex justify-content-between align-items-center search-box px-1">
                                {/* <CardTitle>
                                  <i className="mdi mdi-email-receive-outline me-1"></i>{" "}
                                  {t('Inbox')}
                                </CardTitle> */}
                                <div className="btn-group btn-group-justified ms-1 gap-3">
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleMailInbox}
                                      color="info"
                                      className="rounded"
                                      style={{ cursor: "notAllowed" }}
                                      disabled={true}
                                    >
                                      <i className="mdi mdi-email me-1" />
                                      {t("Send")}
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleSMSTemplateDelete}
                                      color="danger"
                                      className="rounded"
                                      disabled={
                                        actionArray?.length == 0 ? true : false
                                      }
                                    >
                                      <i className="fas fa-trash me-1" />
                                      {t("Delete")}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardBody className="p-4 mb-0">
                              {state.activeTab == 0 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={inboxTableData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={selectRowMessage}
                                  defaultSorted={messageDefaultSorted}
                                />
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <Card>
                            <CardHeader className="bg-transparent border-bottom communication-module-sidebar-item-design">
                              <div className="d-flex justify-content-between align-items-center search-box px-1">
                                {/* <CardTitle>
                                  <i className="mdi mdi-email-plus-outline me-1"></i>{" "}
                                  {t('Outbox')}
                                </CardTitle> */}
                                <div className="btn-group btn-group-justified ms-1 gap-3">
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleMailInbox}
                                      color="info"
                                      className="rounded"
                                      disabled={
                                        actionArray?.length == 0 ? true : false
                                      }
                                    >
                                      <i className="mdi mdi-email me-1" />
                                      {t("Send")}
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleSMSTemplateDelete}
                                      color="danger"
                                      className="rounded"
                                      disabled={
                                        actionArray?.length == 0 ? true : false
                                      }
                                    >
                                      <i className="fas fa-trash me-1" />
                                      {t("Delete")}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardBody className="p-4 mb-0">
                              {state.activeTab == 1 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={inboxTableData1}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={selectRowMessage}
                                  defaultSorted={messageDefaultSorted}
                                />
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <Card>
                            <CardHeader className="bg-transparent border-bottom communication-module-sidebar-item-design">
                              <div className="d-flex justify-content-between align-items-center search-box px-1">
                                {/* <CardTitle>
                                  <i className="mdi mdi-email-remove-outline me-1"></i>{" "}
                                  {t('Undelivered')}
                                </CardTitle> */}
                                <div className="btn-group btn-group-justified ms-1 gap-3">
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleMailInbox}
                                      color="info"
                                      className="rounded"
                                      style={{ cursor: "notAllowed" }}
                                      disabled={true}
                                    >
                                      <i className="mdi mdi-email me-1" />
                                      {t("Send")}
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleSMSTemplateDelete}
                                      color="danger"
                                      className="rounded"
                                      disabled={
                                        actionArray?.length == 0 ? true : false
                                      }
                                    >
                                      <i className="fas fa-trash me-1" />
                                      {t("Delete")}
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleUndeliveredDismiss}
                                      color="warning"
                                      className="rounded"
                                      disabled={
                                        actionArray?.length == 0 ? true : false
                                      }
                                    >
                                      <i className="fas fa-archive me-1" />
                                      {t("Dismiss")}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardBody className="p-4 mb-0">
                              {state.activeTab == 2 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={inboxTableData2}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={selectRowMessage}
                                  defaultSorted={messageDefaultSorted}
                                />
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          <Card>
                            <CardHeader className="bg-transparent border-bottom communication-module-sidebar-item-design">
                              <div className="d-flex justify-content-between align-items-center search-box px-1">
                                <div className="btn-group btn-group-justified ms-1 gap-3">
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleMailInbox}
                                      color="info"
                                      className="rounded"
                                      style={{ cursor: "notAllowed" }}
                                      disabled={true}
                                    >
                                      <i className="mdi mdi-email me-1" />
                                      {t("Send")}
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleSMSTemplateDelete}
                                      color="danger"
                                      className="rounded"
                                      disabled={
                                        actionArray?.length == 0 ? true : false
                                      }
                                    >
                                      <i className="fas fa-trash me-1" />
                                      {t("Delete")}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardBody className="p-4 mb-0">
                              {state.activeTab == 3 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={inboxTableData3}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={selectRowMessage}
                                  defaultSorted={messageDefaultSorted}
                                />
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="4">
                      <Row>
                        <Col sm="12">
                          <Card>
                            <CardHeader className="bg-transparent border-bottom communication-module-sidebar-item-design">
                              <div className="d-flex justify-content-between align-items-center search-box px-1">
                                <div className="btn-group btn-group-justified ms-1 gap-3">
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleMailInbox}
                                      color="info"
                                      className="rounded"
                                      style={{ cursor: "notAllowed" }}
                                      disabled={true}
                                    >
                                      <i className="mdi mdi-email me-1" />
                                      {t("Send")}
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleSMSTemplateDelete}
                                      color="danger"
                                      className="rounded"
                                      disabled={
                                        actionArray?.length == 0 ? true : false
                                      }
                                    >
                                      <i className="fas fa-trash me-1" />
                                      {t("Delete")}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardBody className="p-4 mb-0">
                              {state.activeTab == 4 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={sentSmsTableData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={selectRowMessage}
                                  defaultSorted={messageDefaultSorted}
                                />
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="5">
                      <Row>
                        <Col sm="12">
                          <Card>
                            <CardHeader className="bg-transparent border-bottom communication-module-sidebar-item-design">
                              <div className="d-flex justify-content-between align-items-center search-box px-1">
                                <div className="btn-group btn-group-justified ms-1 gap-3">
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleMailInbox}
                                      color="info"
                                      className="rounded"
                                      style={{ cursor: "notAllowed" }}
                                      disabled={true}
                                    >
                                      <i className="mdi mdi-email me-1" />
                                      {t("Send")}
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleSMSTemplateDelete}
                                      color="danger"
                                      className="rounded"
                                      disabled={
                                        actionArray?.length == 0 ? true : false
                                      }
                                    >
                                      <i className="fas fa-trash me-1" />
                                      {t("Delete")}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardBody className="p-4 mb-0">
                              {state.activeTab == 5 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={sentSmsTableData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={selectRowMessage}
                                  defaultSorted={messageDefaultSorted}
                                />
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="6">
                      <Row>
                        <Col sm="12">
                          <Card>
                            <CardHeader className="bg-transparent border-bottom communication-module-sidebar-item-design">
                              <div className="d-flex justify-content-between align-items-center search-box px-1">
                                <div className="btn-group btn-group-justified ms-1 gap-3">
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleMailInbox}
                                      color="info"
                                      className="rounded"
                                      style={{ cursor: "notAllowed" }}
                                      disabled={true}
                                    >
                                      <i className="mdi mdi-email me-1" />
                                      {t("Send")}
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleSMSTemplateDelete}
                                      color="danger"
                                      className="rounded"
                                      disabled={
                                        actionArray?.length == 0 ? true : false
                                      }
                                    >
                                      <i className="fas fa-trash me-1" />
                                      {t("Delete")}
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleToggleTempModal}
                                      color="primary"
                                      className="rounded"
                                    >
                                      <i className="fas fa-plus me-1" />
                                      Add Template
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardBody className="p-4 mb-0">
                              {state.activeTab == 6 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={mailTemplateData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={selectRowMessage}
                                  defaultSorted={messageDefaultSorted}
                                />
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="7">
                      <Row>
                        <Col sm="12">
                          <Card>
                            <CardHeader className="bg-transparent border-bottom communication-module-sidebar-item-design">
                              <div className="d-flex justify-content-between align-items-center search-box px-1">
                                <div className="btn-group btn-group-justified ms-1 gap-3">
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleMailInbox}
                                      color="info"
                                      className="rounded"
                                      style={{ cursor: "notAllowed" }}
                                      disabled={true}
                                    >
                                      <i className="mdi mdi-email me-1" />
                                      {t("Send")}
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleSMSTemplateDelete}
                                      color="danger"
                                      className="rounded"
                                      disabled={
                                        actionArray?.length == 0 ? true : false
                                      }
                                    >
                                      <i className="fas fa-trash me-1" />
                                      {t("Delete")}
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      onClick={toggleSMSTemplateTextModal}
                                      color="primary"
                                      className="rounded"
                                    >
                                      <i className="fas fa-plus me-1" />
                                      Add Template
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardBody className="p-4 mb-0">
                              {state.activeTab == 7 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={smsTemplateData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={selectRowMessage}
                                  defaultSorted={messageDefaultSorted}
                                />
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="8">
                      <Row>
                        <Col sm="12">
                          <Card>
                            <CardHeader className="bg-transparent border-bottom communication-module-sidebar-item-design">
                              <div className="d-flex justify-content-between align-items-center search-box px-1">
                                <div className="btn-group btn-group-justified ms-1 gap-3">
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleMailInbox}
                                      color="info"
                                      className="rounded"
                                      style={{ cursor: "notAllowed" }}
                                      disabled={true}
                                    >
                                      <i className="mdi mdi-email me-1" />
                                      {t("Send")}
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleSMSTemplateDelete}
                                      color="danger"
                                      className="rounded"
                                      disabled={
                                        actionArray?.length == 0 ? true : false
                                      }
                                    >
                                      <i className="fas fa-trash me-1" />
                                      {t("Delete")}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardBody className="p-4 mb-0">
                              {state.activeTab == 8 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={inboxTableData3}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={selectRowMessage}
                                  defaultSorted={messageDefaultSorted}
                                />
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="9">
                      <Row>
                        <Col sm="12">
                          <Card>
                            <CardHeader className="bg-transparent border-bottom communication-module-sidebar-item-design">
                              <div className="d-flex justify-content-between align-items-center search-box px-1">
                                <div className="btn-group btn-group-justified ms-1 gap-3">
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleMailInbox}
                                      color="info"
                                      className="rounded"
                                      style={{ cursor: "notAllowed" }}
                                      disabled={true}
                                    >
                                      <i className="mdi mdi-email me-1" />
                                      {t("Send")}
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleSMSTemplateDelete}
                                      color="danger"
                                      className="rounded"
                                      disabled={
                                        actionArray?.length == 0 ? true : false
                                      }
                                    >
                                      <i className="fas fa-trash me-1" />
                                      {t("Delete")}
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      onClick={toggleLettermodal}
                                      color="primary"
                                      className="rounded"
                                    >
                                      <i className="fas fa-plus me-1" />
                                      Add Template
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardBody className="p-4 mb-0">
                              {state.activeTab == 9 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={letterTemplateData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={selectRowMessage}
                                  defaultSorted={messageDefaultSorted}
                                />
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="10">
                      <Row>
                        <Col sm="12">
                          <Card>
                            <CardHeader className="bg-transparent border-bottom communication-module-sidebar-item-design">
                              <div className="d-flex justify-content-between align-items-center search-box px-1">
                                <div className="btn-group btn-group-justified ms-1 gap-3">
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleMailInbox}
                                      color="info"
                                      className="rounded"
                                      style={{ cursor: "notAllowed" }}
                                      disabled={true}
                                    >
                                      <i className="mdi mdi-email me-1" />
                                      {t("Send")}
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleSMSTemplateDelete}
                                      color="danger"
                                      className="rounded"
                                      disabled={
                                        actionArray?.length == 0 ? true : false
                                      }
                                    >
                                      <i className="fas fa-trash me-1" />
                                      {t("Delete")}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardBody className="p-4 mb-0">
                              {state.activeTab == 10 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={sentLetterData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={selectRowMessage}
                                  defaultSorted={messageDefaultSorted}
                                />
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="11">
                      <Row>
                        <Col sm="12">
                          <Card>
                            <CardHeader className="bg-transparent border-bottom communication-module-sidebar-item-design">
                              <div className="d-flex justify-content-between align-items-center search-box px-1">
                                <div className="btn-group btn-group-justified ms-1 gap-3">
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleMailInbox}
                                      color="info"
                                      className="rounded"
                                      style={{ cursor: "notAllowed" }}
                                      disabled={true}
                                    >
                                      <i className="mdi mdi-email me-1" />
                                      {t("Send")}
                                    </Button>
                                  </div>
                                  <div className="btn-group">
                                    <Button
                                      onClick={handleMultipleSMSTemplateDelete}
                                      color="danger"
                                      className="rounded"
                                      disabled={
                                        actionArray?.length == 0 ? true : false
                                      }
                                    >
                                      <i className="fas fa-trash me-1" />
                                      {t("Delete")}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardBody className="p-4 mb-0">
                              {state.activeTab == 11 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={outboxLetterData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={selectRowMessage}
                                  defaultSorted={messageDefaultSorted}
                                />
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Email modals */}
      {/* ============== Modal for Mail ============== */}
      <Modal
        isOpen={state.modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal modal-lg"
        tabIndex="-1"
        toggle={togglemodal}
      >
        <div className="modal-content">
          <ModalHeader style={{ backgroundColor: "#153D58" }}>
            <div className="d-flex justify-content-between">
              <div>
                <span className="text-white">{localizeItem("New")}</span>{" "}
                <span className="text-white">{localizeItem("Email")}</span>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <form>
              <div className="mb-3">
                <Row>
                  <Col
                    md="9"
                    className="d-flex justify-content-between"
                    style={{ position: "relative", zIndex: "12" }}
                  >
                    <Select
                      value={state.selectedContacts}
                      options={contacts}
                      onChange={selectHandlerForMessage}
                      onInputChange={handleInputChange}
                      placeholder="Select a Contacts..."
                      className="form-control-new w-100"
                      style={{ position: "absolute" }}
                      isLoading={isContactLoading}
                      noOptionsMessage={() => (isContactLoading ? "Loading..." : "No options available")}
                    />
                  </Col>
                  <Col md={3} style={{ cursor: "pointer", textAlign: "end" }}>
                    <p
                      onClick={() => setOpencc(prev => !prev)}
                    >
                      cc/bcc
                      {opencc ? (
                        <i
                          className="fas fa-angle-up me-1"
                          style={{ padding: "2px" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-angle-down me-1"
                          style={{ padding: "2px" }}
                        ></i>
                      )}
                    </p>
                  </Col>
                  <div
                    className="w-90 my-1 mx-3"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                      width: "90%",
                    }}
                  ></div>
                </Row>
              </div>
              {opencc && (
                <>
                  <div className="mb-3">
                    <TagsInput
                      value={selectedCC}
                      onChange={handleMulti3}
                      name="cc"
                      placeHolder="Add CC and press Enter"
                      style={{
                        border: "none",
                        backgroundColor: "#FFF !important",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <TagsInput
                      value={selectedBCC}
                      onChange={handleMulti4}
                      name="bcc"
                      placeHolder="Add BCC and press enter"
                    />
                  </div>
                </>
              )}
              <div className="mb-3">
                <Row>
                  <Col md="9">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={mailTempEditData.subject}
                      onChange={e =>
                        setMailTempEditData({
                          ...mailTempEditData,
                          subject: e.target.value,
                        })
                      }
                      style={{
                        border: "none",
                        backgroundColor: "#F2F6FA !important",
                        width: "100%",
                      }}
                    />
                  </Col>
                  <Col md="3" style={{ textAlign: "end" }}>
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
                  <div
                    className="w-90 my-1 mx-3"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                      width: "90%",
                    }}
                  ></div>
                </Row>
              </div>
              <CKEditor
                editor={DecoupledEditor}
                config={editorConfiguration}
                data={showTemplate ? (props.tmp_list_id_data ? props.tmp_list_id_data?.template?.body : "") : ""}
                style={{ zIndex: "1" }}
                onReady={editor => {
                  editorRef.current = editor;
                  if (editor) {
                    editor.ui.getEditableElement().parentElement.insertBefore(
                      editor.ui.view.toolbar.element,
                      editor.ui.getEditableElement()
                    );
                  }
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setState({ ...state, body: data });
                }}
              />
            </form>
            <div className="mt-3">
              {attached?.length > 0 &&
                attached?.map((item, key) => (
                  <div key={key} className="bg-info mb-2 p-1">
                    <a
                      className="text-light"
                      href={`${process.env.REACT_APP_DOCUMENT}` + item.path}
                      target="blank"
                      rel="noopener noreferrer"
                    >
                      {key + 1}
                      {`.`} {item.name} {` (`}
                      {Math.floor(Number(item.file_size) / 1024)}
                      {` kb)`}
                    </a>
                  </div>
                ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <div>
              <Button
                type="button"
                color="danger"
                onClick={togglemodal}
                className="me-1"
              >
                <i className="fas fa-times me-1"></i> {localizeItem("Close")}
              </Button>
              <Button
                type="button"
                color="buttonColor"
                onClick={handleSubmitMail}
                className="ms-1"
              >
                {localizeItem("Send")} <i className="fab fa-telegram-plane ms-1"></i>
              </Button>
            </div>
          </ModalFooter>
        </div>
      </Modal>
      {/* ============== Modal for Mail end here ============== */}

      {/* ==============Modal for Mail Template============== */}
      <Modal
        isOpen={modalMailTemplate}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal modal-xl"
        tabIndex="-1"
        toggle={toggleEmailTemplateTextModal}
      >
        <div className="modal-content">
          <ModalHeader style={{ backgroundColor: "#153D58" }}>
            <div className="d-flex justify-content-between">
              <div>
                <span className="text-white">New</span>{" "}
                <span className="text-white">Template</span>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <Row>
              {/* Form on the Left */}
              <Col md="5">
                <Form className="form p-3">
                  <div className="row mb-4">
                    <Label
                      htmlFor="horizontal-firstname-Input"
                      className="col-sm-4 col-form-label"
                    >
                      {localizeItem("Active")}
                    </Label>
                    <Col sm={8}>
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
                    <Label for="property" sm={4}>
                      {localizeItem("Name")}
                    </Label>
                    <Col sm={8}>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        onChange={scheduleHandler}
                        placeholder="What will this be called?"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="contact" sm={4}>
                      {localizeItem("This")} {localizeItem("message")}{" "}
                      {localizeItem("is")} {localizeItem("regarding")}
                    </Label>
                    <Col sm={8}>
                      <Select
                        value={schedule.selectRegarding}
                        onChange={handleSelectRegion}
                        options={schedule.optionRegarding}
                        classNamePrefix="select2-selection"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="manager" sm={4}>
                      {localizeItem("This")} {localizeItem("message")}{" "}
                      {localizeItem("will")} {localizeItem("be")}{" "}
                      {localizeItem("sent")} {localizeItem("to")}
                    </Label>
                    <Col sm={8}>
                      <Select
                        value={schedule.selectTo}
                        onChange={handleSelectTo}
                        options={schedule.optionTo}
                        classNamePrefix="select2-selection"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="manager" sm={4}>
                      {localizeItem("This")} {localizeItem("message")}{" "}
                      {localizeItem("will")} {localizeItem("be")}{" "}
                      {localizeItem("sent")} {localizeItem("when")}
                    </Label>
                    <Col sm={8}>
                      <Select
                        value={schedule.selectFrom}
                        onChange={handleSelectFrom}
                        options={schedule.optionFrom}
                        classNamePrefix="select2-selection"
                      />
                    </Col>
                  </FormGroup>
                  <div className="row mb-4">
                    <Label
                      htmlFor="horizontal-firstname-Input"
                      className="col-sm-4 col-form-label"
                    >
                      Automatically Email send
                    </Label>
                    <Col sm={8}>
                      <Switch
                        uncheckedIcon={<Offsymbol />}
                        checkedIcon={<OnSymbol />}
                        className="me-1 mb-sm-8 mb-2"
                        onColor="#153D58"
                        onChange={() => {
                          setForm1State({
                            ...form1state,
                            email_sends_automatically:
                              !form1state.email_sends_automatically,
                          });
                        }}
                        checked={form1state.email_sends_automatically}
                      />
                    </Col>
                  </div>
                </Form>
              </Col>

              {/* CKEditor and Merge Fields on the Right */}
              <Col md="7">
                <Row>
                  {/* CKEditor */}
                  <Col md="8">
                    <form>
                      <CKEditor
                        editor={DecoupledEditor}
                        config={editorConfiguration}
                        data={
                          showTemplate
                            ? props.tmp_list_id_data
                              ? props.tmp_list_id_data?.template?.body
                              : ""
                            : ""
                        }
                        style={{ zIndex: "1" }}
                        onReady={editor => {
                          editorRef.current = editor;
                          if (editor) {
                            editor.ui
                              .getEditableElement()
                              .parentElement.insertBefore(
                                editor.ui.view.toolbar.element,
                                editor.ui.getEditableElement()
                              );
                          }
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setState({ ...state, body: data });
                        }}
                      />
                    </form>
                  </Col>

                  {/* Merge Fields */}
                  <Col md="4">
                    <div className="mt-3">
                      {loading ? (
                        <p>Loading...</p>
                      ) : error ? (
                        <p className="text-red-500">{error}</p>
                      ) : (
                        mergeData.map((mergeField, idx) => (
                          <Card key={idx} className="mb-2">
                            <CardHeader
                              onClick={() => toggleAccordion(idx.toString())}
                              style={{ cursor: "pointer" }}
                              className="bg-gray-200 p-2"
                            >
                              {mergeField.merge_field}
                            </CardHeader>
                            <Collapse isOpen={openAccordion === idx.toString()}>
                              <CardBody className="p-2">
                                <div className="space-y-1">
                                  {mergeField.merge_subfields.map(
                                    (subField, index) => (
                                      <div
                                        key={index}
                                        onClick={() =>
                                          handleSubFieldClick(subField)
                                        }
                                        className="block text-blue-500"
                                        style={{ cursor: "pointer" }}
                                      >
                                        {subField}
                                      </div>
                                    )
                                  )}
                                </div>
                              </CardBody>
                            </Collapse>
                          </Card>
                        ))
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="danger"
              onClick={toggleEmailTemplateTextModal}
              className="me-1"
            >
              <i className="fas fa-times me-1"></i> {localizeItem("Close")}
            </Button>
            <Button
              type="button"
              color="buttonColor"
              onClick={handleSaveScheduleforEmail}
              className="ms-1"
            >
              <i className="far fa-save"></i> &nbsp; {localizeItem("Save")}
            </Button>
          </ModalFooter>
        </div>
      </Modal>
      {/* ============== Modal for Mail Template ends here ============== */}
      {/* Email modals end here*/}


      {/* SMS modals */}
      {/* -----Modal for SMS------ */}
      <Modal
        isOpen={modalSMS}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal modal-lg"
        tabIndex="-1"
      >
        <div className="modal-content">
          <ModalHeader>
            <div className="d-flex justify-content-between">
              <div>
                {localizeItem("New")} {localizeItem("SMS")}
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <form>
              {/* Row for "To" and "Message" fields */}
              <div className="mb-3">
                <Label htmlFor="to-input" className="col-form-label">
                  {localizeItem("To")}
                </Label>
                <Input
                  id="to-input"
                  type="text"
                  name="to"
                  className="form-control"
                  placeholder="To"
                  required
                  onChange={selectHandlerForSMS}
                />
              </div>
              <div>
                <Label htmlFor="message-textarea" className="col-form-label">
                  {localizeItem("Messages")}
                </Label>
                <Input
                  id="message-textarea"
                  type="textarea"
                  name="textarea"
                  className="form-control"
                  value={smsTempEditData.message}
                  onChange={e =>
                    setSMSTempEditData({
                      ...smsTempEditData,
                      message: e.target.value,
                    })
                  }
                />
              </div>
              {/* Buttons */}
              <div className="d-flex justify-content-end gap-3 mt-3">
                <Button
                  type="button"
                  color="danger"
                  onClick={toggleSMSmodal}
                >
                  <i className="fas fa-times"></i> {localizeItem("Cancel")}
                </Button>
                <Button
                  type="button"
                  color="primary"
                  onClick={handleSubmitSMS}
                >
                  {localizeItem("Send")}{" "}
                  <i className="fab fa-telegram-plane ms-1"></i>
                </Button>
              </div>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </div>
      </Modal>
      {/* -----Modal for SMS end here------ */}

      {/* -----Modal for SMS template------ */}
      <Modal
        isOpen={modalSMSTemplate}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal modal-xl"
        tabIndex="-1"
      >
        <div className="modal-content">
          <ModalHeader>
            <div className="d-flex justify-content-between">
              <div>
                {localizeItem("New")} {localizeItem("Template")}
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <Row>
              {/* Left Column for Regarding field */}
              <Col md={5}>
                <Form className="form p-3">
                  <div className="row mb-4">
                    <Label
                      htmlFor="horizontal-firstname-Input"
                      className="col-sm-3 col-form-label"
                    >
                      {localizeItem("Active")}
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
                      {localizeItem("Name")}
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
                      {localizeItem("This")} {localizeItem("message")}{" "}
                      {localizeItem("is")} {localizeItem("regarding")}
                    </Label>
                    <Col sm={9}>
                      <div className="p-2">
                        <Select
                          value={schedule.selectRegarding}
                          onChange={handleSelectRegion}
                          options={schedule.optionRegarding}
                          classNamePrefix="select2-selection"
                        />
                      </div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="manager" sm={3}>
                      {localizeItem("This")} {localizeItem("message")}{" "}
                      {localizeItem("will")} {localizeItem("be")}{" "}
                      {localizeItem("sent")} {localizeItem("to")}
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
                      {t("This")} {t("message")} {t("will")} {t("be")} {t("sent")}{" "}
                      {t("when")}
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
                </Form>
              </Col>
              {/* Right Column for Text field and Merge Fields */}
              <Col md={7}>
                <Row>
                  {/* Text Field for Messages */}
                  <Col sm={8}>
                    <FormGroup>
                      <Label htmlFor="message-textarea" className="col-form-label">
                        {localizeItem("Messages")}
                      </Label>
                      <Input
                        id="message-textarea"
                        type="textarea"
                        name="textarea"
                        className="form-control"
                        value={smsTempEditData.message}
                        onChange={(e) =>
                          setSMSTempEditData({
                            ...smsTempEditData,
                            message: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                  {/* Merge Fields */}
                  <Col sm={4}>
                    <div className="w-full">
                      {loading ? (
                        <p>Loading...</p>
                      ) : error ? (
                        <p className="text-danger">{error}</p>
                      ) : (
                        mergeData.map((mergeField, idx) => (
                          <Card key={idx} className="mb-2">
                            <CardHeader
                              onClick={() => toggleAccordion(idx.toString())}
                              style={{ cursor: 'pointer' }}
                            >
                              {mergeField.merge_field}
                            </CardHeader>
                            <Collapse isOpen={openAccordion === idx.toString()}>
                              <CardBody className="p-2">
                                <div className="space-y-1">
                                  {mergeField.merge_subfields.map((subField, index) => (
                                    <div
                                      key={index}
                                      onClick={() => handleSubFieldClickSMS(subField)}
                                      className="block text-blue-500"
                                      style={{ cursor: 'pointer' }}
                                    >
                                      {subField}
                                    </div>
                                  ))}
                                </div>
                              </CardBody>
                            </Collapse>
                          </Card>
                        ))
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* Buttons */}
            <div className="d-flex justify-content-end gap-3 mt-3">
              <Button
                type="button"
                color="danger"
                onClick={toggleSMSTemplateTextModal}
              >
                <i className="fas fa-times"></i> {localizeItem("Cancel")}
              </Button>
              <Button
                type="button"
                color="primary"
                onClick={handleSaveScheduleforSMS}
              >
                <i className="far fa-save"></i> &nbsp; {localizeItem("Save")}
              </Button>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </div>
      </Modal>
      {/* -----Modal for SMS template end here------ */}
      {/* SMS modals end here  */}


      {/* letter modals  */}
      {/* -----Modal for letter starts here------ */}
      <Modal
        isOpen={modalLetter}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal modal-xl"
        tabIndex="-1"
      >
        <div className="modal-content">
          <ModalHeader>
            <div className="d-flex justify-content-between">
              <div>
                {localizeItem("New")} {localizeItem("Letter Template")}
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm={5}>
                <Form className="form p-3">
                  <div className="row mb-4">
                    <Label
                      htmlFor="horizontal-firstname-Input"
                      className="col-sm-3 col-form-label"
                    >
                      {localizeItem("Active")}
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
                      {localizeItem("Name")}
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
                      {localizeItem("This")} {localizeItem("message")}{" "}
                      {localizeItem("is")} {localizeItem("regarding")}
                    </Label>
                    <Col sm={9}>
                      <div className="p-2">
                        <Select
                          value={schedule.selectRegarding}
                          onChange={handleSelectRegion}
                          options={schedule.optionRegarding}
                          classNamePrefix="select2-selection"
                        />
                      </div>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="manager" sm={3}>
                      {localizeItem("This")} {localizeItem("message")}{" "}
                      {localizeItem("will")} {localizeItem("be")}{" "}
                      {localizeItem("sent")} {localizeItem("to")}
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
                      {t("This")} {t("message")} {t("will")} {t("be")} {t("sent")}{" "}
                      {t("when")}
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
                  <div className="row mb-4">
                    <Label
                      htmlFor="horizontal-firstname-Input"
                      className="col-sm-3 col-form-label"
                    >
                      Automatically Letter send
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
                            email_sends_automatically:
                              !form1state.email_sends_automatically,
                          });
                        }}
                        checked={form1state.email_sends_automatically}
                      />
                    </Col>
                  </div>
                </Form>
              </Col>
              <Col sm={4}>
                <form>
                  <CKEditor
                    editor={DecoupledEditor}
                    config={editorConfiguration}
                    style={{ zIndex: "1" }}
                    onReady={editor => {
                      editorRef.current = editor;
                      if (editor) {
                        editor.ui.getEditableElement().parentElement.insertBefore(
                          editor.ui.view.toolbar.element,
                          editor.ui.getEditableElement()
                        );
                      }
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setState({ ...state, bodyLetter: data });
                    }}
                  />
                  <div className="d-flex justify-content-end mt-3">
                    <Button
                      type="button"
                      color="danger"
                      onClick={toggleLettermodal}
                    >
                      <i className="fas fa-times"></i> {localizeItem("Cancel")}
                    </Button>
                    <Button
                      type="button"
                      color="info"
                      onClick={handleSaveScheduleforLetter}
                      className="ms-2"
                    >
                      <i className="far fa-save"></i> &nbsp; {t("Save")}
                    </Button>
                  </div>
                </form>
              </Col>
              <Col sm={3}>
                <div className="w-full">
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p className="text-danger">{error}</p>
                  ) : (
                    mergeData.map((mergeField, idx) => (
                      <Card key={idx} className="mb-2">
                        <CardHeader
                          onClick={() => toggleAccordion(idx.toString())}
                          style={{ cursor: 'pointer' }}
                        >
                          {mergeField.merge_field}
                        </CardHeader>
                        <Collapse isOpen={openAccordion === idx.toString()}>
                          <CardBody className="p-2">
                            <div className="space-y-1">
                              {mergeField.merge_subfields.map((subField, index) => (
                                <div
                                  key={index}
                                  onClick={() => handleSubFieldClickLetter(subField)}
                                  className="block text-blue-500"
                                  style={{ cursor: 'pointer' }}
                                >
                                  {subField}
                                </div>
                              ))}
                            </div>
                          </CardBody>
                        </Collapse>
                      </Card>
                    ))
                  )}
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </div>
      </Modal>
      {/* -----Modal for letter ends here------ */}
      {/* letter modals end here  */}


      {/* Modal for SMS template name start from here*/}
      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        backdrop={true}
      >
        <div className="modal-content">
          <ModalHeader>
            <div>
              {localizeItem("Template")} {localizeItem("Name")}
            </div>
          </ModalHeader>
          <ModalBody>
            <form>
              <div className="row mb-3">
                <Label
                  htmlFor="horizontal-firstname-Input"
                  className="col-sm-2 col-form-label"
                >
                  {localizeItem("Name")}
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
              onClick={toggle}
            >
              <i className="fas fa-times"></i> {localizeItem("Cancel")}
            </Button>
            <Button type="button" color="info" onClick={saveSMStemplate}>
              {localizeItem("Save")}{" "}
              <i className="fab fa-telegram-plane ms-1"></i>
            </Button>
          </ModalFooter>
        </div>
      </Modal>
      {/* Modal for SMS template name ends from here*/}


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
              <div>
                {localizeItem("Update")} {localizeItem("SMS")}{" "}
                {localizeItem("Template")}
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSMSTempEditForm}>
              <div className="row mb-3">
                <Label
                  htmlFor="horizontal-firstname-Input"
                  className="col-sm-2 col-form-label"
                >
                  {localizeItem("Name")}
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
                  {localizeItem("Messages")}
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
                  color="danger"
                  onClick={smsTempUpdatetoggle}
                >
                  <i className="fas fa-times"></i> {localizeItem("Cancel")}
                </Button>
                <Button type="submit" color="info">
                  {localizeItem("Update")}{" "}
                  <i className="fab fa-telegram-plane ms-1"></i>
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
                          <small className="text-muted">{state.to}</small>
                        </Media>
                      </Media>
                      {/* {state.subject != null ? <h4 className="mt-0 font-size-16">
                                {state.subject}
                              </h4> : null} */}
                      <h4 className="mt-0 font-size-16">{state.subject}</h4>{" "}
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
                          onClick={() => toggleMailBodyModalWithouttext()}
                        >
                          {localizeItem("Close")}
                        </Button>{" "}
                        {state.id ? (
                          <Button
                            type="button"
                            color="primary"
                            onClick={handleSubmitMail}
                            className="ms-1"
                          >
                            {localizeItem("Send")}{" "}
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
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <i className="bx bx-envelope me-1 fa-2x text-info"></i>{" "}
                <span className="text-info fa-2x">
                  {localizeItem("Email")} {localizeItem("reply")}
                </span>
              </div>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => toggleMailBodyModalWithouttext2()}
              ></button>
            </div>
            <hr />
            <Row>
              <Col md={6}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <p style={{ fontSize: "14px", fontWeight: "bold" }}>From:</p>
                  {state.from}
                </div>
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
              </Col>
              <Col md={6}>
                <div className="d-flex justify-content-end">
                  <div className="fw-bold">
                    <span>
                      {" "}
                      {moment(state?.updated_at).format("MMMM Do YYYY")}
                    </span>{" "}
                    <br />
                    <span className="mt-2">
                      {" "}
                      {moment(state?.updated_at).format("h:mm a")}
                    </span>
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

              {state.reply?.length > 0
                ? state.reply.map((item, key) => (
                  <ReplyCard
                    item={item}
                    key={key}
                    from={state.reply_from}
                    to={state.reply_to}
                  />
                ))
                : ""}

              {/* =============== showing reply mail ends ============= */}

              {state.activeTab == 0 ? (
                // reply sectiion
                <>
                  {sendReply ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "20px",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                              To:
                            </p>
                            {/* {state?.reply?.length ? state?.reply?.length == 0 ? state.from :
                                      (authUser.user.email != state?.reply[(state?.reply?.length - 1)].from) ? state?.reply[(state?.reply?.length - 1)].to : state?.reply[(state?.reply?.length - 1)].from : state.from} */}
                            {authUser.user.email == state.from
                              ? state.to
                              : state.from}
                          </div>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                              {localizeItem("Subject")}:
                            </p>
                            {state.subject}
                          </div>
                        </div>
                        <div
                          style={{
                            height: "70px",
                            backgroundColor: "#159B9C",
                            marginBottom: "20px",
                          }}
                          className="d-flex justify-content-start pr-3 pt-2"
                        >
                          <img
                            src={MailLogo}
                            height="90%"
                            width="170px"
                            style={{ marginLeft: "20px" }}
                          />
                        </div>
                        <CKEditor
                          editor={DecoupledEditor}
                          config={editorConfiguration}
                          onReady={editor => {
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
                            setState({ ...state, body: data });
                          }}
                        />
                        <div
                          style={{
                            height: "70px",
                            backgroundColor: "rgba(52,58,64,.25)",
                          }}
                        ></div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
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
            {state.activeTab == "0" && (
              <div
              //  style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}
              >
                <Button
                  onClick={handleReply}
                //  style={{ marginBottom: "10px" }}
                >
                  {sendReply
                    ? `${localizeItem("Close")} ${localizeItem("Reply")}`
                    : `${localizeItem("Reply")}`}
                </Button>
              </div>
            )}
            <Button
              type="button"
              color="danger"
              className="mx-2"
              onClick={() => toggleMailBodyModalWithouttext2()}
            >
              Close
            </Button>{" "}
            {sendReply
              ? state.activeTab == "0" && (
                <Button
                  type="button"
                  color="primary"
                  //onClick={handleSubmitMail}
                  onClick={sendReply ? handleReplyMail : ""}
                  className="ms-1"
                >
                  {/* {sendReply ? "Reply" : "Send"} */}
                  {localizeItem("Reply")}
                  <i className="fab fa-telegram-plane ms-1"></i>
                </Button>
              )
              : null}
            {state.activeTab == "0" ? (
              ""
            ) : (
              <Button
                type="button"
                color="primary"
                className="ms-1"
                onClick={handleSubmitMail}
              >
                {localizeItem("Send")}
              </Button>
            )}
          </div>
        </ModalFooter>
      </Modal>
      {/* =================modal 2 ends here ============*/}
      {/* Modal for edit EMAIL TEMPLATE start from here */}

      <Modal isOpen={editMailTempmodal} centered={true}>
        <ModalHeader>
          {localizeItem("Update")} {localizeItem("your")}{" "}
          {localizeItem("Template")}
        </ModalHeader>
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
              data={
                checkStatus === true
                  ? props.tmp_list_id_data
                    ? props.tmp_list_id_data?.template?.body
                    : ""
                  : ""
              }
              onReady={editor => {
                if (editor) {
                  editor.ui
                    .getEditableElement()
                    .parentElement.insertBefore(
                      editor.ui.view.toolbar.element,
                      editor.ui.getEditableElement()
                    );
                }
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setMailTempEditData({
                  ...mailTempEditData,
                  body: data,
                });
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                gap: 3,
              }}
            >
              <Button color="primary" type="submit">
                {localizeItem("Submit")}
              </Button>{" "}
              <Button color="primary" onClick={mailTempEdittoggle}>
                {localizeItem("Cancel")}
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
            className="bx bx-loader bx-spin font-size-42 align-middle me-1"
            style={{ zindex: 100, overflow: "hidden" }}
          />
        </ModalBody>
      </Modal>

      {/* ==================== delete SMS modal start from here ============== */}
      <Modal isOpen={deleteModal2} toggle={toggleDelete2} centered={true}>
        <ModalHeader toggle={toggleDelete2} style={{ textAlign: "center" }}>
          {localizeItem("Delete")} {localizeItem("SMS")}{" "}
          {localizeItem("Template")}
        </ModalHeader>
        <ModalBody>
          <div style={{ fontSize: "30px", textAlign: "center" }}>
            {localizeItem("Are")} {localizeItem("you")} {localizeItem("sure")}?
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="col-md-12 text-center gap-3">
            <Button color="secondary" onClick={toggleDelete2}>
              {localizeItem("Cancel")}
            </Button>{" "}
            <Button
              color="danger"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteSMSTempForm}
            >
              {localizeItem("Delete")}
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      {/* ==================== delete SMS modal ends here ============== */}

      <EditScheduleModal
        editScheduleModal={schedule.editScheduleModal}
        toggle={toggleEditScheduleModal}
        form1state={form1state}
        setForm1State={setForm1State}
        schedule={schedule}
        fetchLetterTemplate={fetchLetterTemplate}
      />
      {showSMSModal && (
        <ShowSMSModal
          show={showSMSModal}
          toggle={toggleShowSMSModal}
          data={data.smsData}
        />
      )}
      {showLetterModal && (
        <ShowLetterModal
          show={showLetterModal}
          toggle={toggleShowLetterModal}
          data={data.letterData}
        />
      )}
      {showLetterEditModal && (
        <ShowLetterEditModal
          show={showLetterEditModal}
          toggle={toggleEditLetterModal}
          data={data.letterData}
          fetchOutboxLetter={fetchOutboxLetter}
        />
      )}
      <DeleteModal
        show={modalDelete}
        onDeleteClick={deleteHandler}
        onCloseClick={() => setModalDelete(prev => !prev)}
      />
      {loader && <Loder status={loader} />}
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const { user_list_data, user_list_error, user_list_loading } =
    gstate.property;
  const { contacts_list_data, contacts_list_loading } = gstate.Contacts2;
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
    mail_seen_unseen_loading,
    mail_reply_loading,
    outbox_mail_list_data,
    outbox_mail_list_loading,
    delete_outbox_sms_data,
    multiple_sms_delete_loading,
    multiple_mail_temp_delete_loading,
    delete_multi_sms_temp__loading,

    mail_attachment_data,
    mail_attachment_error,
    mail_attachment_loading,

    mail_spam_data,
    mail_spam_error,
    mail_spam_loading,
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
    mail_seen_unseen_loading,
    mail_reply_loading,
    outbox_mail_list_data,
    outbox_mail_list_loading,
    delete_outbox_sms_data,
    multiple_sms_delete_loading,
    multiple_mail_temp_delete_loading,
    delete_multi_sms_temp__loading,

    mail_attachment_data,
    mail_attachment_error,
    mail_attachment_loading,

    mail_spam_data,
    mail_spam_error,
    mail_spam_loading,

    user_list_data,
    user_list_error,
    user_list_loading,

    contacts_list_data,
    contacts_list_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    sendMail,
    mailList,
    inboxList,
    inboxListFresh,
    mailSendFresh,
    mailListUndelivered,
    mailListUndeliveredFresh,
    mailListSent,
    sendSMS,
    sendSMSFresh,
    smsList,
    smsListFresh,
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
    smsOutboxListFresh,
    getsentsmsList,
    sendMailSeenUnseen,
    mailSeenUnseenFresh,
    sendMailReplyCheck,
    mailReplyCheckFresh,
    outboxMailData,
    outboxMailDataFresh,
    deleteSMSOutbox,
    deleteSMSOutboxFresh,
    deleteMultipleSMS,
    deleteMultipleSMSFresh,
    deleteMailTemplateMultiple,
    deleteMailTemplateMultipleFresh,
    deleteSmsTemplateMulti,
    deleteSmsTemplateMultiFresh,
    mailListSentFresh,
    storeAttachment,
    storeAttachmentFresh,
    spamList,
    spamListFresh,
    getUser,
    contactList,
  })(Messages)
);
