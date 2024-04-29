import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Alert,
  Container,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Modal,
  Input,
  Button,
  CardHeader,
  FormGroup,
  InputGroup, UncontrolledAlert
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import classnames from "classnames";
import { Link, withRouter, useParams, useHistory } from "react-router-dom";
import {
  addPropertyTanent,
  propertyListFresh,
  getPropertyInfo,
} from "../../store/Properties/actions";
import { propertyTenantInfoFresh } from "../../store/Properties/tenantActions";
import {
  contactList,
  showContactFresh,
  showContact,
} from "../../store/Contacts2/actions";
import { addPropertyTanentFresh } from "../../store/Properties/actions";
import moment from "moment";

import TenantBondDetails from "./TenantBondDetails";
import TenantMoveOutDetails from "./TenantMoveOutDetails";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import ContactForm from "pages/Contacts2/MultipleReference/ContactForm";
import RecurringInvoice from "./Tenant/RecurringInvoice";

const PropertyTanentAdd2 = props => {

  //recurring invoice
  const [invoice, setInvoice] = useState([])
  //multiple state
  const [state, setState] = useState({
    reference: "",
    abn: "",
    notes: "",
    contacts: [
      {
        reference: "",
        first_name: "",
        last_name: "",
        salutation: "",
        company_name: "",
        mobile_phone: "",
        work_phone: "",
        home_phone: "",
        email: "",
        check: [],
        work_phone: "",
        deleted: false,
        primary: true,
        email1: "",
        email1_send_type: "",
        email1_status: false,
        email2: "",
        email2_send_type: "",
        email2_status: false,
        email3: "",
        email3_send_type: "",
        email3_status: false,
        optionEmail: [
          { label: "All Email", value: "All Email" },
          { label: "Statements Only", value: "Statements Only" },
        ],
      },
    ],
  });
  const [activeState, setActiveState] = useState(0);
  const [postalAddress, setPostalAddress] = useState([
    {
      postal_building_name: "",
      postal_unit: "",
      postal_number: "",
      postal_street: "",
      postal_suburb: "",
      postal_postcode: "",
      postal_state: "",
      postal_country: "",
    },
  ]);
  const [physicalAddress, setPhysicalAddress] = useState([
    {
      physical_building_name: "",
      physical_unit: "",
      physical_number: "",
      physical_street: "",
      physical_suburb: "",
      physical_postcode: "",
      physical_state: "",
      physical_country: "",
    },
  ]);

  const [step, setStep] = useState(0);
  const [btnRows, setBtnRows] = useState([{ btn: "" }]);
  const [countDelete, setCountDelete] = useState(1);
  const [forCheck, setForCheck] = useState([
    {
      smsCheck: false,
      emailCheck: false,
      printCheck: false,
    },
  ]);
  const [checkState, setCheckState] = useState([[]]);
  const [fullPhysicalAddress, setFullPhysicalAddress] = useState([
    { full: "" },
  ]);
  const [fullPostalAddress, setFullPostalAddress] = useState([{ full: "" }]);
  //---------multiple---------------//

  // Form Tab State
  const [tabState, setTabState] = useState({
    activeTab: 1,
    passedSteps: [1],
  });
  // ---------
  let { id, data } = useParams(); // Property ID
  const history = useHistory();
  const [blurState, setBlurState] = useState({});
  const [dateCheck, setDateCheck] = useState({ moveOut: false });

  const date = moment().format("yyyy-MM-DD");

  const date_end = moment().add(365, "days").format("yyyy-MM-DD");
  const date_end1 = moment()
    .add(12, "months")
    .subtract(1, "days")
    .format("yyyy-MM-DD");

  var substractDay = moment().subtract(1, "days").format("yyyy-MM-DD");
  var substractMonths = moment(date_end)
    .subtract(3, "Month")
    .format("yyyy-MM-DD");

  const [state2, setState2] = useState({
    move_in: date,
    agreement_start: date,
    agreement_end: date_end1,
    paid_to: substractDay,
    rent_review_frequency: "12",
    next_rent_review: substractMonths,
  }); // Form 2 State

  const [weeklyRent, setWeeklyRent] = useState();
  const [fortNightlyRent, setFortNightlyRent] = useState();
  const [monthlyRent, setMonthlyRent] = useState();

  const [contactState, setContactState] = useState(false);
  const [contactId, setContactId] = useState(null);

  // Autocomplete address
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {};

  const inputRefPostal = useRef();
  const autoCompletePostalRef = useRef();
  // ------------------------

  // Form 2 Button value state
  const [formTwoButtonValue, setFormTwoButtonValue] = useState({
    wfmBtn: "Weekly",
    rentTax: 0,
    periodic_tenancy: 0,
    rentInvoiceBtn: 0,
    exclude_form_arrears: 0,
    tenant_access: 0,
  });
  // --------------
  const [phone, setPhone] = useState({
    mobile_phone: null,
    work_phone: null,
    home_phone: null,
  });

  const [formSubmitBtnState, setFormSubmitBtnState] = useState(1); // Form Submit Button State



  let contactEditCommunication = {
    printCheck: false,
    emailCheck: false,
    smsCheck: false,
  };


  const dateMoveInHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ["move_in"]: dateStr });
  };
  const dateMoveOutHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ["move_out"]: dateStr });
  };

  const dateAgreementStartHandler = (selectedDates, dateStr, instance) => {
    const date_end1 = moment(dateStr)
      .add(12, "months")
      .subtract(1, "days")
      .format("yyyy-MM-DD");
    const substractDay = moment(dateStr)
      .subtract(1, "days")
      .format("yyyy-MM-DD");
    const substractDay1 = moment(date_end1)
      .subtract(3, "Month")
      .format("yyyy-MM-DD");
    setState2({
      ...state2,
      ["agreement_start"]: dateStr,
      ["agreement_end"]: date_end1,
      ["paid_to"]: substractDay,
      ["next_rent_review"]: substractDay1,
    });
  };

  const dateAgreementEndHandler = (selectedDates, dateStr, instance) => {
    const substractMonthThree = moment(dateStr)
      .subtract(3, "Month")
      .format("yyyy-MM-DD");

    setState2({ ...state2, ["agreement_end"]: substractMonthThree });
  };

  const datePaidToHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ["paid_to"]: dateStr });
  };

  const dateNextRentReviewHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ["next_rent_review"]: dateStr });
  };

  useEffect(() => {
    if (contactState) {
      props.showContact(selectedId);
    }
    if (props.property_info_loading === false) {
      props.getPropertyInfo(id);
    }
    if (props.property_add_tanent_loading === "Success") {
      toastr.success("Tenant Added Successfully");
      // props.contactList();
      props.propertyTenantInfoFresh();
      props.propertyListFresh();
      props.addPropertyTanentFresh();
      history.push("/propertyInfo/" + id, { id: id });
    }
    if (props.property_add_tanent_loading === "Tenant Failed") {
      toastr.error(props.property_add_tanent.message);
      props.addPropertyTanentFresh();
    }

    if (props.property_add_tanent_loading === "Failed") {
      toastr.error("Something went wrong");
      props.addPropertyTanentFresh();
    }

    if (props.contacts_list_loading === false) {
      props.contactList();
    }

    if (props.contacts_show_data && contactState) {
      let contacts = [];
      let contactsPhysical = [];
      let contactsPhysicalFull = [];
      let contactsPostal = [];
      let contactsPostalFull = [];
      let btn = [];
      let forChecks = [];
      props.contacts_show_data?.data?.contact_details?.map((item, key) => {
        let check = [];
        let smsCheck =
          item.contact_details_communications[0]?.communication == "SMS" ||
            item.contact_details_communications[1]?.communication == "SMS" ||
            item.contact_details_communications[2]?.communication == "SMS"
            ? true
            : false;
        let emailCheck =
          item.contact_details_communications[0]?.communication == "Email" ||
            item.contact_details_communications[1]?.communication == "Email" ||
            item.contact_details_communications[2]?.communication == "Email"
            ? true
            : false;
        let printCheck =
          item.contact_details_communications[0]?.communication == "Print" ||
            item.contact_details_communications[1]?.communication == "Print" ||
            item.contact_details_communications[2]?.communication == "Print"
            ? true
            : false;
        let forCheck = {
          smsCheck: smsCheck,
          emailCheck: emailCheck,
          printCheck: printCheck,
        };
        item.contact_details_communications.map(item_c => {
          check.push(item_c.communication);
        });
        let contact = {
          reference: item.reference,
          first_name: item.first_name,
          last_name: item.last_name,
          salutation: item.salutation,
          company_name: item.company_name,
          email: item.email,
          mobile_phone: item.mobile_phone,
          work_phone: item.work_phone,
          home_phone: item.home_phone,
          check: check,
          deleted: false,
          primary: item.primary == 1 ? true : false,

          email1: item.email1,
          email1_send_type: item.email1_send_type
            ? { label: item.email1_send_type, value: item.email1_send_type }
            : "",
          email1_status: item.email1 ? true : false,
          email2: item.email2,
          email2_send_type: item.email2_send_type
            ? { label: item.email2_send_type, value: item.email2_send_type }
            : "",
          email2_status: item.email2 ? true : false,
          email3: item.email3,
          email3_send_type: item.email3_send_type
            ? { label: item.email3_send_type, value: item.email3_send_type }
            : "",
          email3_status: item.email3 ? true : false,
          optionEmail: [
            { label: "All Email", value: "All Email" },
            { label: "Statements Only", value: "Statements Only" },
          ],
        };
        contacts.push(contact);
        forChecks.push(forCheck);
        let btn_s = { btn: "" };
        btn.push(btn_s);
      });

      let data = {
        reference: props.contacts_show_data?.data?.reference,
        abn: props.contacts_show_data?.data?.ABN,
        notes: props.contacts_show_data?.data?.notes,
        contacts: contacts,
      };
      setState(data);
      setBtnRows(btn);
      setForCheck(forChecks);

      props.contacts_show_data?.data?.contact_physical_address?.map(
        (item, key) => {
          console.log(item);
          let physical = {
            physical_building_name: item.building_name,
            physical_unit: item.unit,
            physical_number: item.number,
            physical_street: item.street,
            physical_suburb: item.suburb,
            physical_postcode: item.postcode,
            physical_state: item.state,
            physical_country: item.country,
          };
          contactsPhysical.push(physical);
          let full =
            item.building_name +
            " " +
            item.unit +
            "/" +
            item.number +
            " " +
            item.street +
            ", " +
            item.suburb +
            " " +
            item.state +
            " " +
            item.postcode +
            " " +
            item.country;
          contactsPhysicalFull.push({ full: full });
        }
      );
      props.contacts_show_data?.data?.contact_postal_address?.map(
        (item, key) => {
          let postal = {
            postal_building_name: item.building_name,
            postal_unit: item.unit,
            postal_number: item.number,
            postal_street: item.street,
            postal_suburb: item.suburb,
            postal_postcode: item.postcode,
            postal_state: item.state,
            postal_country: item.country,
          };
          contactsPostal.push(postal);
          let full =
            item.building_name +
            " " +
            item.unit +
            "/" +
            item.number +
            " " +
            item.street +
            ", " +
            item.suburb +
            " " +
            item.state +
            " " +
            item.postcode +
            " " +
            item.country;
          contactsPostalFull.push({ full: full });
        }
      );
      setPhysicalAddress(contactsPhysical);
      setPostalAddress(contactsPostal);
      setFullPhysicalAddress(contactsPostalFull);
      setFullPostalAddress(contactsPhysicalFull);

      setContactState(false);
      setContactId(props.contacts_show_data?.data?.id);
    }
  }, [
    props.property_add_tanent_loading,
    props.contacts_list_loading,
    contactState,
    props.contacts_show_data,
    state,
    props.property_info_loading,
  ]);

  const propertyRef = props.property_info_data?.data?.data?.reference
    ? props.property_info_data?.data?.data?.reference
    : "";

  // Autocomplete address
  function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }
  // -----------------

  // Form 2 buttons
  const [inspectionWeeklylyBtn, setInspectionWeeklyBtn] = useState(true);
  const [inspectionMonthlyBtn, setInspectionMonthlyBtn] = useState(false);
  const [inspectionfortnightlyBtn, setInspectionfortnightlyBtn] =
    useState(false);

  const [inspectionIncludeTaxBtn, setInspectionIncludeTaxBtn] = useState(false);
  const [inspectionExcludeTaxBtn, setInspectionExcludeTaxBtn] = useState(true);

  const [inspectionPeriodicYesBtn, setInspectionPeriodicYesBtn] =
    useState(false);
  const [inspectionPeriodicNoBtn, setInspectionPeriodicNoBtn] = useState(true);

  const [inspectionRentEnableBtn, setInspectionRentEnableBtn] = useState(false);
  const [inspectionRentDisableBtn, setInspectionRentDisableBtn] =
    useState(true);

  const [inspectionAreaAutomationYesBtn, setInspectionAreaAutomationYesBtn] =
    useState(false);
  const [inspectionAreaAutomationNoBtn, setInspectionAreaAutomationNoBtn] =
    useState(true);

  const [inspectionEnableBtn, setInspectionEnableBtn] = useState(true);
  const [inspectionDisableBtn, setInspectionDisableBtn] = useState(false);
  // ------------------

  const [selectedId, setSelectedId] = useState();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [optionGroup, setOptionGroup] = useState();
  const [optionGroupState, setOptionGroupState] = useState(true);

  const [show, setShow] = useState(false);
  const [showRent, setShowRent] = useState(false);
  const [showMoveOut, setShowMoveOut] = useState(false);
  const [postalAddForm, setPostalAddForm] = useState(false);
  const [physicalAddForm, setPhysicalAddForm] = useState(false);

  // Toggle Tab function
  const toggleTab = tab => {
    console.log(tab);
    // return
    if (tabState.activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        let modifiedSteps = [...tabState.passedSteps, tab];
        setTabState({
          activeTab: tab,
          passedSteps: modifiedSteps,
        });
      }
    }
  };
  // -----------------

  // Form 2 button handler function
  const toggleInspectionMonthlyBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, wfmBtn: "Monthly" });
    setInspectionMonthlyBtn(true);
    setInspectionWeeklyBtn(false);
    setInspectionfortnightlyBtn(false);
  };
  const toggleInspectionWeeklyBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, wfmBtn: "Weekly" });
    setInspectionWeeklyBtn(true);
    setInspectionMonthlyBtn(false);
    setInspectionfortnightlyBtn(false);
  };
  const toggleInspectionfortnightlyBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, wfmBtn: "FortNightly" });
    setInspectionfortnightlyBtn(true);
    setInspectionWeeklyBtn(false);
    setInspectionMonthlyBtn(false);
  };

  const toggleInspectionIncludeTaxBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, rentTax: 1 });
    setInspectionIncludeTaxBtn(true);
    setInspectionExcludeTaxBtn(false);
  };
  const toggleInspectionExcludeTaxBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, rentTax: 0 });
    setInspectionExcludeTaxBtn(true);
    setInspectionIncludeTaxBtn(false);
  };

  const toggleInspectionPeriodicYesBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, periodic_tenancy: 1 });
    setInspectionPeriodicYesBtn(true);
    setInspectionPeriodicNoBtn(false);
  };
  const toggleInspectionPeriodicNoBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, periodic_tenancy: 0 });
    setInspectionPeriodicNoBtn(true);
    setInspectionPeriodicYesBtn(false);
  };

  const toggleInspectionRentEnableBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, rentInvoiceBtn: 1 });
    setInspectionRentEnableBtn(true);
    setInspectionRentDisableBtn(false);
  };
  const toggleInspectionRentDisableBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, rentInvoiceBtn: 0 });
    setInspectionRentDisableBtn(true);
    setInspectionRentEnableBtn(false);
    setState2({ ...state2, invoice_days_in_advance: "" });
  };

  const toggleInspectionAreaAutomationYesBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, exclude_form_arrears: 1 });
    setInspectionAreaAutomationYesBtn(true);
    setInspectionAreaAutomationNoBtn(false);
  };

  const toggleInspectionAreaAutomationNoBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, exclude_form_arrears: 0 });
    setInspectionAreaAutomationNoBtn(true);
    setInspectionAreaAutomationYesBtn(false);
  };

  const toggleInspectionDisableBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, tenant_access: 0 });
    setInspectionDisableBtn(true);
    setInspectionEnableBtn(false);
  };
  const toggleInspectionEnableBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, tenant_access: 1 });
    setInspectionEnableBtn(true);
    setInspectionDisableBtn(false);
  };
  // ------------------

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePropertyFormOneValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handlePropertyFormTwoValues = e => {

    if (e.target.name == "rent_review_frequency") {
      const date_end2 = moment()
        .add(e.target.value, "Month")
        .format("yyyy-MM-DD");
      setState2({
        ...state2,
        ["next_rent_review"]: date_end2,
        ["rent_review_frequency"]: e.target.value,
      });
    }

    else {
      setState2({
        ...state2,
        [e.target.name]: e.target.value,
        bond_paid: "",
        bond_receipted: "",
        bond_held: "",
        bond_arrears: "",
      });
    }
  };
  const handlePropertyFormBond = e => {
    const bond__paid = e.target.value;
    const bond__arrears = state2.bond_required - bond__paid;

    setState2({
      ...state2,
      [e.target.name]: bond__paid,
      bond_arrears: bond__arrears,
      bond_held: bond__paid,
    });
  };


  const handleSelectGroup = e => {
    setSelectedGroup(e);
    setSelectedId(e.value);
  };

  let option;
  if (props.contacts_list_data && optionGroupState) {
    option = props.contacts_list_data?.data?.map(item => ({
      label: item.reference,
      value: item?.id,
    }));

    setOptionGroup([
      {
        options: option,
      },
    ]);
    setOptionGroupState(false);
  }

  const handlePushData = () => {
    props.showContactFresh();
    if (selectedId) {
      setContactState(true);
    }
    handleClose();
    // history.push("/set/setPropertyTenantAdd/" + selectedId + "/" + id, { id: selectedId });
  };
  // Handle bond values
  const handleBondValues = e => {
    let value = e.target.value;
    value = +value;

    if (typeof value === "number") {
      if (formTwoButtonValue.wfmBtn === "Weekly") {
        setWeeklyRent(value);
        value *= 4;
        value = value.toFixed(2);
        setState2({ ...state2, rent: e.target.value, bond_required: value });
        setFortNightlyRent();
        setMonthlyRent();
      } else if (formTwoButtonValue.wfmBtn === "FortNightly") {
        setFortNightlyRent(value);
        value *= 2;
        value = value.toFixed(2);
        setState2({ ...state2, rent: e.target.value, bond_required: value });
        setWeeklyRent();
        setMonthlyRent();
      } else if (formTwoButtonValue.wfmBtn === "Monthly") {
        setMonthlyRent(value);
        let monthlyCalc = 365 / 12;
        let bondPerDay = value / monthlyCalc;
        value = bondPerDay * 28;
        value = value.toFixed(2);
        setState2({ ...state2, rent: e.target.value, bond_required: value });
        setWeeklyRent();
        setFortNightlyRent();
      }
    } else {
      setState2({ ...state2, rent: e.target.value, bond_required: "" });
    }
  };
  let rentByBtn;
  const handleWeeklyBondValue = e => {
    if (weeklyRent) {
      setState2({ ...state2, rent: weeklyRent });
    } else if (fortNightlyRent) {
      rentByBtn = fortNightlyRent / 2;
      rentByBtn = rentByBtn.toFixed(2);
      setState2({ ...state2, rent: rentByBtn });
    } else if (monthlyRent) {
      let pDay = 365 / 12;
      rentByBtn = monthlyRent / pDay;
      rentByBtn = rentByBtn * 7;
      rentByBtn = rentByBtn.toFixed(2);
      setState2({ ...state2, rent: rentByBtn });
    }
  };
  const handleFortNightlylyBondValue = e => {
    if (fortNightlyRent) {
      setState2({ ...state2, rent: fortNightlyRent });
    } else if (weeklyRent) {
      rentByBtn = weeklyRent * 2;
      rentByBtn = rentByBtn.toFixed();
      setState2({ ...state2, rent: rentByBtn });
    } else if (monthlyRent) {
      let pDay = 365 / 12;
      rentByBtn = monthlyRent / pDay;
      rentByBtn = rentByBtn * 14;
      rentByBtn = rentByBtn.toFixed();
      setState2({ ...state2, rent: rentByBtn });
    }
  };
  const handleMonthlyBondValue = e => {
    if (monthlyRent) {
      setState2({ ...state2, rent: monthlyRent });
    } else if (weeklyRent) {
      let pdRent = weeklyRent / 7;
      rentByBtn = (365 / 12) * pdRent;
      rentByBtn = rentByBtn.toFixed();
      setState2({ ...state2, rent: rentByBtn });
    } else if (fortNightlyRent) {
      let pdRent = fortNightlyRent / 14;
      rentByBtn = (365 / 12) * pdRent;
      rentByBtn = rentByBtn.toFixed();
      setState2({ ...state2, rent: rentByBtn });
    }
  };

  document.title = "CliqProperty";
  //----------Multi-reference form hendler------------//
  const handleBtnRows = () => {
    const item = { btn: "" };
    setBtnRows([...btnRows, item]);
    let value = [...state["contacts"]];
    const length = btnRows.length;
    value.push({
      reference: "",
      first_name: "",
      last_name: "",
      salutation: "",
      company_name: "",
      mobile_phone: "",
      work_phone: "",
      home_phone: "",
      email: "",
      check: [],
      work_phone: "",
      deleted: false,
      primary: false,
      email1: "",
      email1_send_type: "",
      email1_status: false,
      email2: "",
      email2_send_type: "",
      email2_status: false,
      email3: "",
      email3_send_type: "",
      email3_status: false,
      optionEmail: [
        { label: "All Email", value: "All Email" },
        { label: "Statements Only", value: "Statements Only" },
      ],
    });
    setState({ ...state, contacts: value });
    setForCheck([
      ...forCheck,
      {
        smsCheck: false,
        emailCheck: false,
        printCheck: false,
      },
    ]);
    setCheckState([...checkState, []]);
    setPhysicalAddress([
      ...physicalAddress,
      {
        physical_building_name: "",
        physical_unit: "",
        physical_number: "",
        physical_street: "",
        physical_suburb: "",
        physical_postcode: "",
        physical_state: "",
        physical_country: "",
      },
    ]);

    setPostalAddress([
      ...postalAddress,
      {
        postal_building_name: "",
        postal_unit: "",
        postal_number: "",
        postal_street: "",
        postal_suburb: "",
        postal_postcode: "",
        postal_state: "",
        postal_country: "",
      },
    ]);
    setFullPhysicalAddress([...fullPhysicalAddress, { full: "" }]);
    setFullPostalAddress([...fullPostalAddress, { full: "" }]);
    setCountDelete(prev => prev + 1);

    setActiveState(length);
    setStep(length);
  };

  const communicationHandler = (e, idx) => {
    let val = e.target.value,
      checked = e.target.checked;
    if (val === "Print" && checked === true) {
      checkTrueHandler("printCheck", "Print", idx);
    } else if (val === "Print" && checked === false) {
      checkFalseHandler("printCheck", "Print", idx);
    } else if (val === "Email" && checked === true) {
      checkTrueHandler("emailCheck", "Email", idx);
    } else if (val === "Email" && checked === false) {
      checkFalseHandler("emailCheck", "Email", idx);
    } else if (val === "SMS" && checked === true) {
      checkTrueHandler("smsCheck", "SMS", idx);
    } else if (val === "SMS" && checked === false) {
      checkFalseHandler("smsCheck", "SMS", idx);
    }
  };

  const handleContactFormValues = (name, val, idx) => {
    let value = [...state.contacts];
    let contact = value[idx];
    contact[name] = val;
    value[idx] = contact;
    setState({ ...state, contacts: value });
  };
  const autoPostalFormValues = (
    idx,
    postal_country,
    postal_state,
    postal_postcode,
    postal_suburb,
    postal_street,
    postal_number,
    postal_unit,
    postal_building_name
  ) => {
    let postals = [...postalAddress];
    let postal = postals[idx];
    postal["postal_country"] = postal_country;
    postal["postal_state"] = postal_state;
    postal["postal_postcode"] = postal_postcode;
    postal["postal_suburb"] = postal_suburb;
    postal["postal_street"] = postal_street;
    postal["postal_number"] = postal_number;
    postal["postal_unit"] = postal_unit;
    postal["postal_building_name"] = postal_building_name;
    postals[idx] = postal;
    setPostalAddress(postals);

    let fullpostals = [...fullPostalAddress];
    let fullpostal = fullpostals[idx];
    let bld = postal_building_name ? postal_building_name + " " : "";
    let u = postal_unit ? postal_unit + "/" : "";
    let c = postal_country ? postal_country + " " : "";
    let st = postal_state ? postal_state + " " : "";
    let pc = postal_postcode ? postal_postcode + " " : "";
    let sn = postal_suburb ? postal_suburb + ", " : "";
    let s = postal_street ? postal_street + ", " : "";
    let n = postal_number ? postal_number + " " : "";

    let full = bld + u + n + s + sn + st + pc + c;
    fullpostal["full"] = full;
    fullpostals[idx] = fullpostal;
    setFullPostalAddress(fullpostals);
  };

  const autoPhysicalFormValues = (
    idx,
    physical_country,
    physical_state,
    physical_postcode,
    physical_suburb,
    physical_street,
    physical_number,
    physical_unit,
    physical_building_name
  ) => {
    let physicals = [...physicalAddress];
    let physical = physicals[idx];
    physical["physical_country"] = physical_country;
    physical["physical_state"] = physical_state;
    physical["physical_postcode"] = physical_postcode;
    physical["physical_suburb"] = physical_suburb;
    physical["physical_street"] = physical_street;
    physical["physical_number"] = physical_number;
    physical["physical_unit"] = physical_unit;
    physical["physical_building_name"] = physical_building_name;
    physicals[idx] = physical;
    setPhysicalAddress(physicals);

    let fullphysicals = [...fullPhysicalAddress];
    let fullphysical = fullphysicals[idx];
    let bld = physical_building_name ? physical_building_name + " " : "";
    let u = physical_unit ? physical_unit + "/" : "";
    let c = physical_country ? physical_country + " " : "";
    let st = physical_state ? physical_state + " " : "";
    let pc = physical_postcode ? physical_postcode + " " : "";
    let sn = physical_suburb ? physical_suburb + ", " : "";
    let s = physical_street ? physical_street + ", " : "";
    let n = physical_number ? physical_number + " " : "";

    let full = bld + u + n + s + sn + st + pc + c;
    fullphysical["full"] = full;
    fullphysicals[idx] = fullphysical;
    setFullPhysicalAddress(fullphysicals);
  };

  const handlePostalFormFieldValues = (e, idx) => {
    let postals = [...postalAddress];
    let postal = postals[idx];
    postal[e.target.name] = e.target.value;
    postals[idx] = postal;
    setPostalAddress(postals);
    console.log(e.target.name);
    let fullpostals = [...fullPostalAddress];
    let fullpostal = fullpostals[idx];
    let bld = "",
      u = "",
      c = "",
      st = "",
      pc = "",
      sn = "",
      s = "",
      n = "";
    if (e.target.name == "postal_building_name") {
      bld = e.target.value + " ";
    } else {
      bld = postal["postal_building_name"] + " ";
    }
    if (e.target.name == "postal_unit") {
      u = e.target.value + "/";
    } else {
      u = postal["postal_unit"] + "/";
    }
    if (e.target.name == "postal_country") {
      c = e.target.value + " ";
    } else {
      c = postal["postal_country"] + " ";
    }
    if (e.target.name == "postal_state") {
      st = e.target.value + " ";
    } else {
      st = postal["postal_state"] + " ";
    }
    if (e.target.name == "postal_postcode") {
      pc = e.target.value + " ";
    } else {
      pc = postal["postal_postcode"] + " ";
    }
    if (e.target.name == "postal_suburb") {
      sn = e.target.value + " ";
    } else {
      sn = postal["postal_suburb"] + " ";
    }
    if (e.target.name == "postal_street") {
      s = e.target.value + " ";
    } else {
      s = postal["postal_street"] + " ";
    }
    if (e.target.name == "postal_number") {
      n = e.target.value + " ";
    } else {
      n = postal["postal_number"] + " ";
    }

    let full = bld + u + n + s + sn + st + pc + c;
    fullpostal["full"] = full;
    fullpostals[idx] = fullpostal;
    setFullPostalAddress(fullpostals);
  };
  const handlePhysicalFormFieldValues = (e, idx) => {
    let physicals = [...physicalAddress];
    let physical = physicals[idx];
    physical[e.target.name] = e.target.value;
    physicals[idx] = physical;
    setPhysicalAddress(physicals);

    let fullphysicals = [...fullPhysicalAddress];
    let fullphysical = fullphysicals[idx];
    let bld = "",
      u = "",
      c = "",
      st = "",
      pc = "",
      sn = "",
      s = "",
      n = "";
    if (e.target.name == "physical_building_name") {
      bld = e.target.value + " ";
    } else {
      bld = physical["physical_building_name"] + " ";
    }
    if (e.target.name == "physical_unit") {
      u = e.target.value + "/";
    } else {
      u = physical["physical_unit"] + "/";
    }
    if (e.target.name == "physical_country") {
      c = e.target.value + " ";
    } else {
      c = physical["physical_country"] + " ";
    }
    if (e.target.name == "physical_state") {
      st = e.target.value + " ";
    } else {
      st = physical["physical_state"] + " ";
    }
    if (e.target.name == "physical_postcode") {
      pc = e.target.value + " ";
    } else {
      pc = physical["physical_postcode"] + " ";
    }
    if (e.target.name == "physical_suburb") {
      sn = e.target.value + " ";
    } else {
      sn = physical["physical_suburb"] + " ";
    }
    if (e.target.name == "physical_street") {
      s = e.target.value + " ";
    } else {
      s = physical["physical_street"] + " ";
    }
    if (e.target.name == "physical_number") {
      n = e.target.value + " ";
    } else {
      n = physical["physical_number"] + " ";
    }
    let full = bld + u + n + s + sn + st + pc + c;
    fullphysical["full"] = full;
    fullphysicals[idx] = fullphysical;
    setFullPhysicalAddress(fullphysicals);
  };
  const handleSameAddress = (
    idx,
    country = "",
    number = "",
    code = "",
    state = "",
    street = "",
    suburb = "",
    unit = "",
    bname = ""
  ) => {
    let physicals = [...physicalAddress];
    let physical = physicals[idx];
    physical.physical_building_name = bname;
    physical.physical_country = country;
    physical.physical_number = number;
    physical.physical_postcode = code;
    physical.physical_state = state;
    physical.physical_street = street;
    physical.physical_suburb = suburb;
    physical.physical_unit = unit;
    physicals[idx] = physical;
    setPhysicalAddress(physicals);

    let fullphysicals = [...fullPhysicalAddress];
    let fullphysical = fullphysicals[idx];
    let bld = "",
      u = "",
      c = "",
      st = "",
      pc = "",
      sn = "",
      s = "",
      n = "";
    bld = bname + " ";
    u = unit + "/";
    c = country + " ";
    st = state + " ";
    pc = code + " ";
    sn = suburb + " ";
    s = street + " ";
    n = number + " ";
    let full = bld + u + n + s + sn + st + pc + c;
    fullphysical["full"] = full;
    fullphysicals[idx] = fullphysical;
    setFullPhysicalAddress(fullphysicals);
  };
  const handleDeletedContact = idx => {
    let value = [...state["contacts"]];
    let newVal = value[idx];
    newVal["deleted"] = true;
    value[idx] = newVal;
    setState({
      ...state,
      contacts: value,
    });
    setCountDelete(prev => prev - 1);
  };

  const handleUndoContact = idx => {
    let value = [...state["contacts"]];
    let newVal = value[idx];
    newVal["deleted"] = false;
    value[idx] = newVal;
    setState({
      ...state,
      contacts: value,
    });
    setCountDelete(prev => prev + 1);
  };

  const handleContactReference = (e, statename, idx) => {
    let first = state.contacts[idx]["first_name"]
      ? state.contacts[idx]["first_name"] + " "
      : "";
    let last = state.contacts[idx]["last_name"]
      ? state.contacts[idx]["last_name"]
      : "";
    let company = state.contacts[idx]["company_name"]
      ? " - " + state.contacts[idx]["company_name"] + " "
      : "";
    if (statename === "first_name") {
      first = e.target.value + " ";
    } else if (statename === "last_name") {
      last = e.target.value;
    } else if (statename === "company_name") {
      company = " - " + e.target.value + " ";
    }
    let reference = first + last + company;
    let val = [...state["contacts"]];
    let con = val[idx];
    con["reference"] = reference;
    val[idx] = con;
    let ref = state.contacts.map((item, key) => {
      return (key > 0 && item.reference ? " & " : "") + item.reference;
    });
    let mainRef = ref.toString().replace(/ ,/g, "");
    setState({ ...state, reference: mainRef, contacts: val });
  };

  const setPrimaryHandler = idx => {
    // Contact
    let contacts = [...state.contacts];
    let contact = contacts[0];
    contact["primary"] = false;
    contacts[0] = contact;
    let primaryContact = contacts[idx];
    primaryContact["primary"] = true;
    contacts.splice(idx, 1);
    contacts.splice(0, 0, primaryContact);
    setState({ ...state, contacts });

    // Physical Address
    let physicals = [...physicalAddress];
    let primaryPhysical = physicals[idx];
    physicals.splice(idx, 1);
    physicals.splice(0, 0, primaryPhysical);
    setPhysicalAddress(physicals);

    // Postal Address
    let postals = [...postalAddress];
    let primaryPostal = postals[idx];
    postals.splice(idx, 1);
    postals.splice(0, 0, primaryPostal);
    setPostalAddress(postals);

    setStep(0);
    setActiveState(0);
  };

  const checkTrueHandler = (boolean, value, idx) => {
    let check = [...forCheck];
    let newCheck = check[idx];
    newCheck[boolean] = true;
    check[idx] = newCheck;
    setForCheck(check);
    let val = [...state["contacts"]];
    let checkValue = val[idx]["check"];
    checkValue.push(value);
    val[idx]["check"] = checkValue;
    setState({ ...state, contacts: val });
  };

  const checkFalseHandler = (boolean, value, idx) => {
    let check = [...forCheck];
    let newCheck = check[idx];
    newCheck[boolean] = false;
    check[idx] = newCheck;
    setForCheck(check);
    let val = [...state["contacts"]];
    let checkValue = val[idx]["check"];
    let newcheckValue = checkValue.filter(item => item !== value);
    val[idx]["check"] = newcheckValue;
    setState({ ...state, contacts: val });
  };

  const checkHandler = (value, idx, checkstate, checkname) => {
    let check = [...forCheck];
    let idxCheck = check[idx];
    if (value === "") {
      if (idxCheck[checkstate] === false) {
        return;
      } else {
        checkFalseHandler(checkstate, checkname, idx);
      }
    } else {
      if (idxCheck[checkstate] === true) {
        return;
      } else {
        checkTrueHandler(checkstate, checkname, idx);
      }
    }
  };

  const handleSubmit = (e, idx) => {
    setActiveState(idx);
    setStep(idx);
  };

  const handleSelectGroupEmail1 = (e, idx) => {
    let value = [...state.contacts];
    let contact = value[idx];
    contact["email1_send_type"] = e;
    value[idx] = contact;
    setState({ ...state, contacts: value });
  };
  const handleSelectGroupEmail2 = (e, idx) => {
    let value = [...state.contacts];
    let contact = value[idx];
    contact["email2_send_type"] = e;
    value[idx] = contact;
    setState({ ...state, contacts: value });
  };
  const handleSelectGroupEmail3 = (e, idx) => {
    let value = [...state.contacts];
    let contact = value[idx];
    contact["email3_send_type"] = e;
    value[idx] = contact;
    setState({ ...state, contacts: value });
  };

  const handleDeletedAditionalEmail = (idx, field) => {
    let value = [...state["contacts"]];
    let newVal = value[idx];
    newVal[field] = false;
    value[idx] = newVal;
    setState({
      ...state,
      contacts: value,
    });
  };

  const handleAddAditionalEmail = (idx, field) => {
    let value = [...state["contacts"]];
    let newVal = value[idx];
    newVal[field] = true;
    value[idx] = newVal;
    setState({
      ...state,
      contacts: value,
    });
  };

  const saveTenantHandler = (e) => {
    e.preventDefault();
    if (tabState.activeTab == 3) {
      // toastr.error('in')
      props.addPropertyTanent(
        state,
        state2,
        formTwoButtonValue,
        id,
        phone,
        contactId,
        postalAddress,
        physicalAddress,
        checkState,
        invoice
      );
    } else {
      // props.addPropertyTanent(
      //   state,
      //   state2,
      //   formTwoButtonValue,
      //   id,
      //   phone,
      //   contactId,
      //   postalAddress,
      //   physicalAddress,
      //   checkState,
      //   invoice
      // );
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        {/* <Breadcrumbs title="Assign Tenant" breadcrumbItem="Properties" /> */}
        <h4 className="text-primary py-2 px-4"> New Tenant - {propertyRef}</h4>
        <Container fluid={true}>
          <Row>
            <Col lg="2" >
              <Card
                style={{ borderRadius: "14px", margin: "0px", padding: "0px" }}
              >
                <CardBody
                  style={{ margin: "0px", padding: "7px" }}
                  className="my-3"
                >
                  <Nav
                    className="icon-tab-tenant"
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      padding: "0px",
                      margin: "0px",
                    }}
                  >
                    <NavItem
                      className={classnames({
                        current: tabState.activeTab === 1,
                      })}
                    >
                      <NavLink
                        className={classnames({
                          active: tabState.activeTab === 1,
                        })}
                        onClick={() => {
                          toggleTab(1);
                          setFormSubmitBtnState(1);
                        }}
                      >
                        <span className="number icon-tab-tenant-number">1</span>{" "}
                        <span style={{ fontSize: "12px" }}>Contact</span>
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={classnames({
                        current: tabState.activeTab === 2,
                      })}
                    >
                      <NavLink
                        disabled={!(tabState.passedSteps || []).includes(2)}
                        className={classnames({
                          active: tabState.activeTab === 2,
                        })}
                        onClick={() => {
                          toggleTab(2);
                          setFormSubmitBtnState(2);
                        }}
                      >
                        <span className="number icon-tab-tenant-number">2</span>{" "}
                        <span style={{ fontSize: "12px" }}>Folios</span>
                      </NavLink>
                    </NavItem>
                    {formTwoButtonValue.rentInvoiceBtn ==
                      1 &&
                      <NavItem
                        className={classnames({
                          current: tabState.activeTab === 3,
                        })}
                      >
                        <NavLink
                          disabled={!(tabState.passedSteps || []).includes(3)}
                          className={classnames({
                            active: tabState.activeTab === 3,
                          })}
                          onClick={() => {
                            toggleTab(3);
                            setFormSubmitBtnState(3);
                          }}
                        >
                          <span className="number icon-tab-tenant-number">3</span>{" "}
                          <span style={{ fontSize: "12px" }}>Recurring Invoices</span>
                        </NavLink>
                      </NavItem>}
                  </Nav>

                </CardBody>
              </Card>
            </Col>
            <Col lg="10" style={{ padding: "0px" }}>
              <div className="wizard clearfix">
                <TabContent activeTab={tabState.activeTab} className="body">
                  <TabPane tabId={1}>
                    <Row>
                      <Col sm="12">
                        <div className="d-flex flex-column justify-content-start">
                          <div className="">
                            <div>
                              <div className="">
                                <Formik
                                  enableReinitialize={true}
                                  initialValues={{
                                    reference:
                                      (state && state.reference) || "",
                                    first_name:
                                      (state && state.first_name) || "",

                                    last_name:
                                      (state && state.last_name) || "",
                                    salutation:
                                      (state && state.salutation) || "",
                                    company_name:
                                      (state && state.company_name) || "",
                                    email: (state && state.email) || "",
                                    mobile_phone:
                                      (phone && phone.mobile_phone) || "",
                                    work_phone:
                                      (phone && phone.work_phone) || "",
                                    home_phone:
                                      (phone && phone.home_phone) || "",

                                    postal_building_name:
                                      (postalAddress &&
                                        postalAddress.postal_building_name) ||
                                      "",
                                    postal_unit:
                                      (postalAddress &&
                                        postalAddress.postal_unit) ||
                                      "",
                                    postal_number:
                                      (postalAddress &&
                                        postalAddress.postal_number) ||
                                      "",
                                    postal_street:
                                      (postalAddress &&
                                        postalAddress.postal_street) ||
                                      "",
                                    postal_suburb:
                                      (postalAddress &&
                                        postalAddress.postal_suburb) ||
                                      "",
                                    postal_postcode:
                                      (postalAddress &&
                                        postalAddress.postal_postcode) ||
                                      "",
                                    postal_state:
                                      (postalAddress &&
                                        postalAddress.postal_state) ||
                                      "",
                                    postal_country:
                                      (postalAddress &&
                                        postalAddress.postal_country) ||
                                      "",

                                    physical_building_name:
                                      (physicalAddress &&
                                        physicalAddress.physical_building_name) ||
                                      "",
                                    physical_unit:
                                      (physicalAddress &&
                                        physicalAddress.physical_unit) ||
                                      "",
                                    physical_number:
                                      (physicalAddress &&
                                        physicalAddress.physical_number) ||
                                      "",
                                    physical_street:
                                      (physicalAddress &&
                                        physicalAddress.physical_street) ||
                                      "",
                                    physical_suburb:
                                      (physicalAddress &&
                                        physicalAddress.physical_suburb) ||
                                      "",
                                    physical_postcode:
                                      (physicalAddress &&
                                        physicalAddress.physical_postcode) ||
                                      "",
                                    physical_state:
                                      (physicalAddress &&
                                        physicalAddress.physical_state) ||
                                      "",
                                    physical_country:
                                      (physicalAddress &&
                                        physicalAddress.physical_country) ||
                                      "",

                                    abn: (state && state.abn) || "",

                                    notes: (state && state.notes) || "",
                                    check: checkState ? checkState : [],
                                  }}
                                  validationSchema={Yup.object().shape({})}
                                  onSubmit={(values, onSubmitProps) => {


                                    const emptyNames = state.contacts.filter(item => !item.first_name.trim() || !item.last_name.trim() || !item.email.trim());



                                    if (emptyNames.length > 0) {
                                      console.log("Objects with empty first_name or last_name found:");
                                      console.log(emptyNames);
                                      const fName = state.contacts.filter(item => !item.first_name.trim())
                                      const lName = state.contacts.filter(item => !item.last_name.trim())
                                      const email = state.contacts.filter(item => !item.email.trim())
                                      console.log(fName, lName, email);
                                      // toastr.warning('Please enter First & Last Name')
                                      toastr.warning(`Please enter ${fName.length > 0 ? 'First Name' : ''} ${lName.length > 0 ? 'Last Name' : ''} ${email.length > 0 ? 'Email' : ''}`)

                                    } else {
                                      toggleTab(tabState.activeTab + 1);
                                      setFormSubmitBtnState(
                                        formSubmitBtnState + 1
                                      );
                                    }



                                  }}
                                >
                                  {({ errors, status, touched }) => (
                                    <div>
                                      <Form
                                        className="form-horizontal"
                                        id="tenant-form-1"
                                      >
                                        <div>
                                          <Card className="custom_card_border_design me-2">
                                            <Col md={11}>
                                              <Row className="d-flex justify-content-start px-3">
                                                <Col
                                                  xs={2}
                                                  sm={3}
                                                  md={1}
                                                  lg={1}
                                                  style={{
                                                    textAlign: "center",
                                                    justifyContent: "center",
                                                    padding: "0px",
                                                  }}
                                                >
                                                  <div
                                                    style={{
                                                      marginTop: "15px",
                                                      display: "flex",
                                                      flexDirection: "column",
                                                      position: "absolute",
                                                      left: "15px",
                                                    }}
                                                  >
                                                    <i
                                                      className="far fa-user-circle ms-1"
                                                      style={{
                                                        fontSize: "30px",
                                                      }}
                                                    />

                                                    <div
                                                      className="vr"
                                                      style={{
                                                        width: "3px",
                                                        height: "80px",
                                                        position: "absolute",
                                                        left: "17px",
                                                        top: "28px",
                                                        background:
                                                          "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)",
                                                      }}
                                                    ></div>
                                                  </div>
                                                </Col>
                                                <Col xs={10} sm={9} md={11} lg={11}>
                                                  <CardBody>
                                                    <div
                                                      className="w-100 d-flex justify-content-between align-items-center pb-1"
                                                      style={{
                                                        borderBottom:
                                                          "1.2px dotted #c9c7c7",
                                                      }}
                                                    >
                                                      <div>
                                                        <h4 className="mb-3 text-primary">
                                                          New Tenant Contact
                                                        </h4>
                                                      </div>

                                                      <div>
                                                        <div>
                                                          <button
                                                            type="button"
                                                            onClick={handleShow}
                                                            className="btn btn-primary"
                                                            data-toggle="modal"
                                                            data-target="#myModal"
                                                          >
                                                            <i className="fa fa-regular fa-user me-1" />
                                                            Select Contact
                                                          </button>

                                                          <Modal
                                                            isOpen={show}
                                                            toggle={handleShow}
                                                          >
                                                            <div className="modal-header" style={{ backgroundColor: "#F2F6FA" }}>
                                                              <h5
                                                                className="modal-title mt-0"
                                                                id="myModalLabel"
                                                              >
                                                                <h4 className="text-primary">
                                                                  Select Contact
                                                                </h4>
                                                              </h5>
                                                              <button
                                                                type="button"
                                                                onClick={
                                                                  handleClose
                                                                }
                                                                className="close"
                                                                data-dismiss="modal"
                                                                aria-label="Close"
                                                              >
                                                                <span aria-hidden="true">
                                                                  &times;
                                                                </span>
                                                              </button>
                                                            </div>
                                                            <div className="modal-body" style={{ backgroundColor: "#F2F6FA" }}>
                                                              <div className="form-group-new">
                                                                <Select
                                                                  value={
                                                                    selectedGroup
                                                                  }
                                                                  onChange={
                                                                    handleSelectGroup
                                                                  }
                                                                  options={
                                                                    optionGroup
                                                                  }
                                                                  classNamePrefix="select2-selection"
                                                                />
                                                                <label htmlFor="usr">   Select </label>
                                                              </div>
                                                            </div>
                                                            <div className="modal-footer" style={{ backgroundColor: "#F2F6FA" }}>
                                                              <button
                                                                type="button"
                                                                onClick={
                                                                  handleClose
                                                                }
                                                                className="btn btn-primary"
                                                                data-dismiss="modal"
                                                              >
                                                                Close
                                                              </button>
                                                              <button
                                                                type="button"
                                                                className="btn btn-primary"
                                                                onClick={
                                                                  handlePushData
                                                                }
                                                              >
                                                                OK
                                                              </button>
                                                            </div>
                                                          </Modal>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="my-3 w-100">
                                                      <Row className="d-flex justify-content-evenly align-items-center">
                                                        {/* <Col md={2}>
                                                          <Label
                                                            for="reference"
                                                            className="form-label"
                                                          >
                                                            Reference
                                                          </Label>
                                                        </Col> */}

                                                        <Col md={12}>
                                                          <div className="form-group-new">
                                                            <Field
                                                              name="reference"
                                                              type="text"
                                                              value={state.reference}
                                                              className={
                                                                "form-control" +
                                                                (errors.reference &&
                                                                  touched.reference
                                                                  ? " is-invalid"
                                                                  : "")
                                                              }
                                                              onChange={
                                                                handlePropertyFormOneValues
                                                              }
                                                            />
                                                            <label htmlFor="usr">   Reference </label>
                                                          </div>
                                                          <ErrorMessage
                                                            name="reference"
                                                            component="div"
                                                            className="invalid-feedback"
                                                          />
                                                        </Col>
                                                      </Row>
                                                    </div>
                                                  </CardBody>
                                                </Col>
                                              </Row>
                                            </Col>
                                          </Card>

                                          <Card className="custom_card_border_design me-2">
                                            <Col md={11}>
                                              <Row className="d-flex justify-content-start px-3">


                                                <Col
                                                  xs={2}
                                                  sm={3}
                                                  md={1}
                                                  lg={1}
                                                  style={{
                                                    textAlign: "center",
                                                    justifyContent: "center",
                                                    padding: "0px",
                                                  }}
                                                >
                                                  <div
                                                    style={{
                                                      marginTop: "15px",
                                                      display: "flex",
                                                      flexDirection: "column",
                                                      position: "absolute",
                                                      left: "15px",
                                                    }}
                                                  >
                                                    <i
                                                      className="far fa-user-circle ms-1"
                                                      style={{
                                                        fontSize: "30px",
                                                      }}
                                                    />

                                                    <div
                                                      className="vr"
                                                      style={{
                                                        width: "3px",
                                                        height: "450px",
                                                        position: "absolute",
                                                        left: "17px",
                                                        top: "28px",
                                                        background:
                                                          "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)",
                                                      }}
                                                    ></div>
                                                  </div>
                                                </Col>
                                                <Col xs={10} sm={9} md={11} lg={11}>
                                                  <CardBody>
                                                    <Row>
                                                      <Col md={3}>
                                                        <h4 className="text-primary mb-3">
                                                          People
                                                        </h4>
                                                      </Col>
                                                      <Col md={6}>
                                                        <Row>
                                                          <Col md={11}>
                                                            <div className="d-flex justify-content-end">
                                                              {btnRows.map(
                                                                (item, idx) => (
                                                                  <Button
                                                                    type="button"
                                                                    color="dark"
                                                                    outline={
                                                                      step === idx
                                                                        ? false
                                                                        : true
                                                                    }
                                                                    key={idx}
                                                                    className="m-1 btn-sm"
                                                                    onClick={e =>
                                                                      handleSubmit(
                                                                        e,
                                                                        idx
                                                                      )
                                                                    }
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        textDecoration:
                                                                          state
                                                                            ?.contacts[
                                                                            idx
                                                                          ].deleted
                                                                            ? "line-through"
                                                                            : "none",
                                                                      }}
                                                                      title={
                                                                        state
                                                                          ?.contacts[
                                                                          idx
                                                                        ]
                                                                          .first_name ||
                                                                          state
                                                                            ?.contacts[
                                                                            idx
                                                                          ]
                                                                            .last_name ||
                                                                          state
                                                                            ?.contacts[
                                                                            idx
                                                                          ]
                                                                            .company_name
                                                                          ? state
                                                                            ?.contacts[
                                                                            idx
                                                                          ]
                                                                            .reference
                                                                          : "New Person"
                                                                      }
                                                                    >
                                                                      {idx == 0 && (
                                                                        <i className="fas fa-star"></i>
                                                                      )}{" "}
                                                                      {state
                                                                        ?.contacts[
                                                                        idx
                                                                      ]
                                                                        .first_name ||
                                                                        state
                                                                          ?.contacts[
                                                                          idx
                                                                        ].last_name ||
                                                                        state
                                                                          ?.contacts[
                                                                          idx
                                                                        ].company_name
                                                                        ? state
                                                                          ?.contacts[
                                                                          idx
                                                                        ]
                                                                          .reference
                                                                          .length <=
                                                                          12
                                                                          ? state
                                                                            ?.contacts[
                                                                            idx
                                                                          ]
                                                                            .reference
                                                                          : state?.contacts[
                                                                            idx
                                                                          ].reference.slice(
                                                                            0,
                                                                            12
                                                                          ) +
                                                                          "...."
                                                                        : "New Person"}
                                                                    </span>
                                                                  </Button>
                                                                )
                                                              )}
                                                            </div>
                                                          </Col>
                                                          <Col md={1}>
                                                            <Button
                                                              color="secondary"
                                                              className="m-1 btn-sm"
                                                              onClick={
                                                                handleBtnRows
                                                              }
                                                              disabled={
                                                                btnRows.length > 9
                                                                  ? true
                                                                  : false
                                                              }
                                                            >
                                                              Add
                                                            </Button>
                                                          </Col>
                                                        </Row>
                                                      </Col>
                                                    </Row>
                                                    <div
                                                      className="w-75"
                                                      style={{
                                                        borderBottom:
                                                          "1.2px dotted #c9c7c7",
                                                      }}
                                                    ></div>

                                                    {state.contacts?.map(
                                                      (item, idx) => {
                                                        {
                                                          /* console.log("checking"); */
                                                        }
                                                        return (
                                                          <div
                                                            key={idx}
                                                            style={
                                                              activeState === idx
                                                                ? {
                                                                  display:
                                                                    "block",
                                                                }
                                                                : {
                                                                  display: "none",
                                                                }
                                                            }
                                                          >
                                                            <ContactForm
                                                              idx={idx}
                                                              communicationHandler={
                                                                communicationHandler
                                                              }
                                                              handleContactFormValues={
                                                                handleContactFormValues
                                                              }
                                                              autoPostalFormValues={
                                                                autoPostalFormValues
                                                              }
                                                              autoPhysicalFormValues={
                                                                autoPhysicalFormValues
                                                              }
                                                              handlePostalFormFieldValues={
                                                                handlePostalFormFieldValues
                                                              }
                                                              handlePhysicalFormFieldValues={
                                                                handlePhysicalFormFieldValues
                                                              }
                                                              forCheck={forCheck}
                                                              handleDeletedContact={
                                                                handleDeletedContact
                                                              }
                                                              handleUndoContact={
                                                                handleUndoContact
                                                              }
                                                              handleContactReference={
                                                                handleContactReference
                                                              }
                                                              setPrimaryHandler={
                                                                setPrimaryHandler
                                                              }
                                                              state={
                                                                state.contacts[idx]
                                                              }
                                                              countDelete={
                                                                countDelete
                                                              }
                                                              checkHandler={
                                                                checkHandler
                                                              }
                                                              physicalAddress={
                                                                physicalAddress[idx]
                                                              }
                                                              postalAddress={
                                                                postalAddress[idx]
                                                              }
                                                              handleSameAddress={
                                                                handleSameAddress
                                                              }
                                                              fullPhysicalAddress={
                                                                fullPhysicalAddress[
                                                                idx
                                                                ]
                                                              }
                                                              setFullPhysicalAddress={
                                                                setFullPhysicalAddress
                                                              }
                                                              fullPostalAddress={
                                                                fullPostalAddress[
                                                                idx
                                                                ]
                                                              }
                                                              setFullPostalAddress={
                                                                setFullPostalAddress
                                                              }
                                                              handleSelectGroupEmail1={
                                                                handleSelectGroupEmail1
                                                              }
                                                              handleSelectGroupEmail2={
                                                                handleSelectGroupEmail2
                                                              }
                                                              handleSelectGroupEmail3={
                                                                handleSelectGroupEmail3
                                                              }
                                                              handleDeletedAditionalEmail={
                                                                handleDeletedAditionalEmail
                                                              }
                                                              handleAddAditionalEmail={
                                                                handleAddAditionalEmail
                                                              }
                                                            />
                                                          </div>
                                                        );
                                                      }
                                                    )}
                                                  </CardBody>
                                                </Col>
                                              </Row>
                                            </Col>
                                          </Card>

                                          <Card className="custom_card_border_design me-2">
                                            <Col md={11}>
                                              <Row className="d-flex justify-content-start px-3">
                                                <Col
                                                  xs={2}
                                                  sm={3}
                                                  md={1}
                                                  lg={1}
                                                  style={{
                                                    textAlign: "center",
                                                    justifyContent: "center",
                                                    padding: "0px",
                                                  }}
                                                >
                                                  <div
                                                    style={{
                                                      marginTop: "15px",
                                                      display: "flex",
                                                      flexDirection: "column",
                                                      position: "absolute",
                                                      left: "15px",
                                                    }}
                                                  >
                                                    <i
                                                      className="far fa-user-circle ms-1"
                                                      style={{
                                                        fontSize: "30px",
                                                      }}
                                                    />

                                                    <div
                                                      className="vr"
                                                      style={{
                                                        width: "3px",
                                                        height: "80px",
                                                        position: "absolute",
                                                        left: "17px",
                                                        top: "28px",
                                                        background:
                                                          "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)",
                                                      }}
                                                    ></div>
                                                  </div>
                                                </Col>
                                                <Col xs={10} sm={9} md={11} lg={11}>
                                                  <CardBody>
                                                    <h4 className="mb-3 text-primary">
                                                      Commercial
                                                    </h4>
                                                    <div
                                                      className="my-3 w-75"
                                                      style={{
                                                        borderBottom:
                                                          "1.2px dotted #c9c7c7",
                                                      }}
                                                    ></div>

                                                    <div className="my-3 w-100">
                                                      <Row>
                                                        {/* <Col md={2}>
                                                          <Label
                                                            for="abn"
                                                            className="form-label"
                                                          >
                                                            ABN
                                                          </Label>
                                                        </Col> */}

                                                        <Col md={12}>
                                                          <div className="form-group-new">
                                                            <Field
                                                              name="abn"
                                                              type="text"
                                                              value={state.abn}
                                                              onChange={
                                                                handlePropertyFormOneValues
                                                              }
                                                              className={
                                                                "form-control" +
                                                                (errors.abn &&
                                                                  touched.abn
                                                                  ? " is-invalid"
                                                                  : "")
                                                              }
                                                            />
                                                            <label htmlFor="usr"> ABN</label>
                                                          </div>
                                                          <ErrorMessage
                                                            name="abn"
                                                            component="div"
                                                            className="invalid-feedback"
                                                          />
                                                        </Col>
                                                      </Row>
                                                    </div>
                                                  </CardBody>
                                                </Col>
                                              </Row>
                                            </Col>
                                          </Card>

                                          <Card className="custom_card_border_design me-2">
                                            <Col md={11}>
                                              <Row className="d-flex justify-content-start px-3">
                                                <Col
                                                  xs={2}
                                                  sm={3}
                                                  md={1}
                                                  lg={1}
                                                  style={{
                                                    textAlign: "center",
                                                    justifyContent: "center",
                                                    padding: "0px",
                                                  }}
                                                >
                                                  <div
                                                    style={{
                                                      marginTop: "15px",
                                                      display: "flex",
                                                      flexDirection: "column",
                                                      position: "absolute",
                                                      left: "15px",
                                                    }}
                                                  >
                                                    <i
                                                      className="far fa-user-circle ms-1"
                                                      style={{
                                                        fontSize: "30px",
                                                      }}
                                                    />

                                                    <div
                                                      className="vr"
                                                      style={{
                                                        width: "3px",
                                                        height: "70px",
                                                        position: "absolute",
                                                        left: "17px",
                                                        top: "28px",
                                                        background:
                                                          "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)",
                                                      }}
                                                    ></div>
                                                  </div>
                                                </Col>
                                                <Col xs={10} sm={9} md={11} lg={11}>
                                                  <CardBody>
                                                    <h4 className="mb-3 text-primary">
                                                      Notes
                                                    </h4>
                                                    <div
                                                      className="my-3 w-75"
                                                      style={{
                                                        borderBottom:
                                                          "1.2px dotted #c9c7c7",
                                                      }}
                                                    ></div>
                                                    <div className="mb-3 w-100">
                                                      <Row>
                                                        {/* <Col md={2}>
                                                          <Label
                                                            for="notes"
                                                            className="form-label"
                                                          >
                                                            Notes
                                                          </Label>
                                                        </Col> */}

                                                        <Col md={12}>
                                                          <div className="form-group-new">
                                                            <Field
                                                              name="notes"
                                                              type="text"
                                                              value={state.notes}
                                                              onChange={
                                                                handlePropertyFormOneValues
                                                              }
                                                              className={
                                                                "form-control" +
                                                                (errors.notes &&
                                                                  touched.notes
                                                                  ? " is-invalid"
                                                                  : "")
                                                              }
                                                            />
                                                            <label htmlFor="usr">Notes </label>
                                                          </div>
                                                          <ErrorMessage
                                                            name="notes"
                                                            component="div"
                                                            className="invalid-feedback"
                                                          />
                                                        </Col>
                                                      </Row>
                                                    </div>
                                                  </CardBody>
                                                </Col>
                                              </Row>
                                            </Col>
                                          </Card>
                                        </div>
                                      </Form>
                                    </div>
                                  )}
                                </Formik>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId={2}>
                    <div>
                      <Row>
                        <Col sm={12}>
                          <Row>
                            <Col md={12}>
                              <div className="d-flex flex-column justify-content-start">
                                <div className="">
                                  <div>
                                    <div className="">
                                      <Formik
                                        enableReinitialize={true}
                                        initialValues={{
                                          rent: (state2 && state2.rent) || "",
                                          bond_required:
                                            (state2 &&
                                              state2.bond_required) ||
                                            "",
                                          bond_paid:
                                            (state2 && state2.bond_paid) ||
                                            "",
                                          bond_receipted:
                                            (state2 &&
                                              state2.bond_receipted) ||
                                            "",
                                          bond_arrears:
                                            (state2 && state2.bond_arrears) ||
                                            "",
                                          bond_reference:
                                            (state2 &&
                                              state2.bond_reference) ||
                                            "",
                                          bond_held:
                                            (state2 && state2.bond_held) ||
                                            "",
                                          move_in:
                                            (state2 && state2.move_in) || "",
                                          move_out:
                                            (state2 && state2.move_out) || "",
                                          break_lease:
                                            (state2 && state2.break_lease) ||
                                            "",
                                          termination:
                                            (state2 && state2.termination) ||
                                            "",
                                          bond_notes:
                                            (state2 && state2.bond_notes) ||
                                            "",
                                          agreement_start:
                                            (state2 &&
                                              state2.agreement_start) ||
                                            "",
                                          agreement_end:
                                            (state2 &&
                                              state2.agreement_end) ||
                                            "",
                                          paid_to:
                                            (state2 && state2.paid_to) || "",
                                          part_paid:
                                            (state2 && state2.part_paid) ||
                                            "",
                                          invoice_days_in_advance:
                                            (state2 &&
                                              state2.invoice_days_in_advance) ||
                                            "",

                                          rent_review_frequency:
                                            (state2 &&
                                              state2.rent_review_frequency) ||
                                            "",
                                          next_rent_review:
                                            (state2 &&
                                              state2.next_rent_review) ||
                                            "",
                                          bank_reference:
                                            (state2 &&
                                              state2.bank_reference) ||
                                            "",
                                          receipt_warning:
                                            (state2 &&
                                              state2.receipt_warning) ||
                                            "",
                                        }}
                                        validationSchema={Yup.object().shape({
                                          rent: Yup.string().required(
                                            "Please Enter Rent"
                                          ),

                                        })}
                                        onSubmit={(values, onSubmitProps) => {


                                          if (formTwoButtonValue.rentInvoiceBtn == 1) {
                                            toggleTab(tabState.activeTab + 1);
                                            setFormSubmitBtnState(
                                              formSubmitBtnState + 1
                                            );
                                          } else {
                                            props.addPropertyTanent(
                                              state,
                                              values,
                                              formTwoButtonValue,
                                              id,
                                              phone,
                                              contactId,
                                              postalAddress,
                                              physicalAddress,
                                              checkState,
                                              invoice
                                            );
                                          }



                                        }}
                                      >
                                        {({ errors, status, touched }) => (
                                          <div>
                                            <Form
                                              className="form-horizontal"
                                              id="tenant-form-2"
                                            >
                                              <div className="text-primary mb-3">
                                                <Card className="custom_card_border_design me-2">
                                                  <Col md={11}>
                                                    <Row className="d-flex justify-content-start px-3">
                                                      <Col
                                                        xs={2}
                                                        sm={3}
                                                        md={1}
                                                        lg={1}
                                                        style={{
                                                          textAlign: "center",
                                                          justifyContent: "center",
                                                          padding: "0px",
                                                        }}
                                                      >
                                                        <div
                                                          style={{
                                                            marginTop: "15px",
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            position: "absolute",
                                                            left: "15px",
                                                          }}
                                                        >
                                                          <i
                                                            className="far fa-user-circle ms-1"
                                                            style={{
                                                              fontSize: "30px",
                                                            }}
                                                          />

                                                          <div
                                                            className="vr"
                                                            style={{
                                                              width: "3px",
                                                              height: "570px",
                                                              position: "absolute",
                                                              left: "17px",
                                                              top: "28px",
                                                              background:
                                                                "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)",
                                                            }}
                                                          ></div>
                                                        </div>
                                                      </Col>
                                                      <Col xs={10} sm={9} md={11} lg={11}>
                                                        <CardBody>
                                                          <h4 className="mb-3 text-primary">
                                                            Add Tenant Folio
                                                          </h4>

                                                          <div
                                                            className="w-100 mt-2 mb-4"
                                                            style={{
                                                              borderBottom:
                                                                "1.2px dotted #c9c7c7",
                                                            }}
                                                          ></div>

                                                          <Row>
                                                            {/* <Col md={4}>
                                                              <Label
                                                                for="rent"
                                                                className="form-label text-dark"
                                                              >
                                                                Rent
                                                              </Label>
                                                            </Col> */}
                                                            <Col md={8}>
                                                              <Row className="mb-3">
                                                                <Col
                                                                  md={4}
                                                                  className="d-flex"
                                                                >
                                                                  <div className="form-group-new">
                                                                    <Field
                                                                      name="rent"
                                                                      type="text"
                                                                      placeholder="0.00"
                                                                      className={
                                                                        "rounded-end form-control" +
                                                                        (errors.rent &&
                                                                          touched.rent
                                                                          ? " is-invalid"
                                                                          : "")
                                                                      }
                                                                      style={{
                                                                        borderTopRightRadius: 0,
                                                                        borderBottomRightRadius: 0,
                                                                      }}
                                                                      id="rent"
                                                                      value={
                                                                        state2.rent
                                                                      }
                                                                      // onChange={e =>
                                                                      //   handleValueForState2(
                                                                      //     e
                                                                      //   )
                                                                      // }
                                                                      onChange={
                                                                        handleBondValues
                                                                      }
                                                                    />
                                                                    <label htmlFor="usr">Rent</label>
                                                                  </div>
                                                                  <span className="input-group-append rounded-start">
                                                                    <span
                                                                      className="input-group-text"
                                                                      style={{
                                                                        borderTopLeftRadius: 0,
                                                                        borderBottomLeftRadius: 0,
                                                                      }}
                                                                    >
                                                                      ৳
                                                                    </span>
                                                                  </span>
                                                                  <ErrorMessage
                                                                    name="rent"
                                                                    component="div"
                                                                    className="invalid-feedback"
                                                                  />
                                                                </Col>
                                                                <Col md={4}>
                                                                  <div className="btn-group btn-group-justified">
                                                                    <div className="btn-group">
                                                                      <Button
                                                                        color={
                                                                          inspectionWeeklylyBtn
                                                                            ? "secondary"
                                                                            : "light"
                                                                        }
                                                                        onClick={e => {
                                                                          toggleInspectionWeeklyBtn(
                                                                            e
                                                                          );
                                                                          handleWeeklyBondValue(
                                                                            e
                                                                          );
                                                                        }}
                                                                      >
                                                                        <span>
                                                                          {" "}
                                                                          Weekly
                                                                        </span>
                                                                      </Button>
                                                                    </div>
                                                                    <div className="btn-group">
                                                                      <Button
                                                                        color={
                                                                          inspectionfortnightlyBtn
                                                                            ? "secondary"
                                                                            : "light"
                                                                        }
                                                                        onClick={e => {
                                                                          toggleInspectionfortnightlyBtn(
                                                                            e
                                                                          );
                                                                          handleFortNightlylyBondValue(
                                                                            e
                                                                          );
                                                                        }}
                                                                      >
                                                                        <span>
                                                                          {" "}
                                                                          fortnightly
                                                                        </span>
                                                                      </Button>
                                                                    </div>
                                                                    <div className="btn-group">
                                                                      <Button
                                                                        color={
                                                                          inspectionMonthlyBtn
                                                                            ? "secondary"
                                                                            : "light"
                                                                        }
                                                                        onClick={e => {
                                                                          toggleInspectionMonthlyBtn(
                                                                            e
                                                                          );
                                                                          handleMonthlyBondValue(
                                                                            e
                                                                          );
                                                                        }}
                                                                      >
                                                                        <span>
                                                                          {" "}
                                                                          Monthly
                                                                        </span>
                                                                      </Button>
                                                                    </div>
                                                                  </div>
                                                                </Col>
                                                              </Row>
                                                            </Col>
                                                          </Row>

                                                          <Row className="mb-3">
                                                            <Col md={4}>
                                                              <Label
                                                                for="routine_inspections_frequency"
                                                                className="form-label text-dark"
                                                              >
                                                                Rent includes tax
                                                              </Label>
                                                            </Col>
                                                            <Col md={6}>
                                                              <div className="btn-group btn-group-justified">
                                                                <div className="btn-group">
                                                                  <Button
                                                                    color={
                                                                      inspectionIncludeTaxBtn
                                                                        ? "secondary"
                                                                        : "light"
                                                                    }
                                                                    onClick={
                                                                      toggleInspectionIncludeTaxBtn
                                                                    }
                                                                  >
                                                                    {inspectionIncludeTaxBtn ? (
                                                                      <i className="bx bx-comment-check"></i>
                                                                    ) : null}
                                                                    <span>
                                                                      {" "}
                                                                      Include Tax
                                                                    </span>
                                                                  </Button>
                                                                </div>

                                                                <div className="btn-group">
                                                                  <Button
                                                                    color={
                                                                      inspectionExcludeTaxBtn
                                                                        ? "secondary"
                                                                        : "light"
                                                                    }
                                                                    onClick={
                                                                      toggleInspectionExcludeTaxBtn
                                                                    }
                                                                  >
                                                                    {inspectionExcludeTaxBtn ? (
                                                                      <i className="bx bx-comment-check"></i>
                                                                    ) : null}
                                                                    <span>
                                                                      {" "}
                                                                      Exclude Tax
                                                                    </span>
                                                                  </Button>
                                                                </div>
                                                              </div>
                                                            </Col>
                                                          </Row>

                                                          <div className="my-3">
                                                            <Row className="mb-3">
                                                              {/* <Col md={4}>
                                                                <Label
                                                                  for="bond_required"
                                                                  className="form-label text-dark"
                                                                >
                                                                  Bond required
                                                                </Label>
                                                              </Col> */}
                                                              <Col
                                                                md={3}
                                                                className="d-flex"
                                                              >
                                                                <div className="form-group-new">
                                                                  <Field
                                                                    name="bond_required"
                                                                    id="bond_required"
                                                                    type="text"
                                                                    placeholder="0.00"
                                                                    className={
                                                                      "form-control" +
                                                                      (errors.bond_required &&
                                                                        touched.bond_required
                                                                        ? " is-invalid"
                                                                        : "")
                                                                    }
                                                                    style={{
                                                                      borderTopLeftRadius: 0,
                                                                      borderBottomLeftRadius: 0,
                                                                    }}
                                                                    value={
                                                                      state2.bond_required
                                                                    }
                                                                    onChange={
                                                                      handlePropertyFormTwoValues
                                                                    }
                                                                  />
                                                                  <label htmlFor="usr"> Bond required</label>
                                                                </div>
                                                                <span className="input-group-append">
                                                                  <span
                                                                    className="input-group-text"
                                                                    style={{
                                                                      borderTopRightRadius: 0,
                                                                      borderBottomRightRadius: 0,
                                                                    }}
                                                                  >
                                                                    ৳
                                                                  </span>
                                                                </span>
                                                                <ErrorMessage
                                                                  name="bond_required"
                                                                  component="div"
                                                                  className="invalid-feedback"
                                                                />

                                                              </Col>
                                                              <Col
                                                                className="align-items-center"
                                                                md={4}
                                                              >
                                                                <TenantBondDetails
                                                                  state2={state2}
                                                                  blurState={
                                                                    blurState
                                                                  }
                                                                  handlePropertyFormTwoValues={
                                                                    handlePropertyFormTwoValues
                                                                  }
                                                                  handlePropertyFormBond={
                                                                    handlePropertyFormBond
                                                                  }
                                                                />
                                                              </Col>
                                                              <Col
                                                                md={4}
                                                                className="d-flex"
                                                              >
                                                                <div className="form-group-new">
                                                                  <Field
                                                                    name="bond_held"
                                                                    type="text"
                                                                    id="bond_held"
                                                                    disabled={true}
                                                                    placeholder="0.00"
                                                                    className={
                                                                      "form-control" +
                                                                      (errors.bond_held &&
                                                                        touched.bond_held
                                                                        ? " is-invalid"
                                                                        : "")
                                                                    }
                                                                    style={{
                                                                      borderTopRightRadius: 0,
                                                                      borderBottomRightRadius: 0,
                                                                    }}
                                                                    value={
                                                                      state2.bond_held
                                                                    }
                                                                    onChange={
                                                                      handlePropertyFormTwoValues
                                                                    }
                                                                  />
                                                                  <label htmlFor="usr">Bond held</label>
                                                                </div>
                                                                <span className="input-group-append rounded-start">
                                                                  <span
                                                                    className="input-group-text"
                                                                    style={{
                                                                      borderTopLeftRadius: 0,
                                                                      borderBottomLeftRadius: 0,
                                                                    }}
                                                                  >
                                                                    ৳
                                                                  </span>
                                                                </span>
                                                                <ErrorMessage
                                                                  name="bond_held"
                                                                  component="div"
                                                                  className="invalid-feedback"
                                                                />
                                                              </Col>

                                                            </Row>

                                                            {/* <Row className="mb-3">
                                                              <Col md={4}>
                                                                <Label
                                                                  for="bond_held"
                                                                  className="form-label text-dark"
                                                                >
                                                                  Bond held
                                                                </Label>
                                                              </Col>
                                                              <Col
                                                                md={4}
                                                                className="d-flex"
                                                              >
                                                                <span className="input-group-append rounded-start">
                                                                  <span
                                                                    className="input-group-text"
                                                                    style={{
                                                                      borderTopRightRadius: 0,
                                                                      borderBottomRightRadius: 0,
                                                                    }}
                                                                  >
                                                                    ৳
                                                                  </span>
                                                                </span>
                                                                <div className="d-flex flex-column">
                                                                  <Field
                                                                    name="bond_held"
                                                                    type="text"
                                                                    id="bond_held"
                                                                    disabled={true}
                                                                    placeholder="0.00"
                                                                    className={
                                                                      "form-control" +
                                                                      (errors.bond_held &&
                                                                        touched.bond_held
                                                                        ? " is-invalid"
                                                                        : "")
                                                                    }
                                                                    style={{
                                                                      borderTopLeftRadius: 0,
                                                                      borderBottomLeftRadius: 0,
                                                                    }}
                                                                    value={
                                                                      state2.bond_held
                                                                    }
                                                                    onChange={
                                                                      handlePropertyFormTwoValues
                                                                    }
                                                                  />
                                                                  <ErrorMessage
                                                                    name="bond_held"
                                                                    component="div"
                                                                    className="invalid-feedback"
                                                                  />
                                                                </div>
                                                              </Col>
                                                              <Col md={4}></Col>
                                                            </Row> */}
                                                          </div>

                                                          <div className="my-3">
                                                            <Row className="mb-3">
                                                              {/* <Col md={4}>
                                                                <Label
                                                                  for="move_in"
                                                                  className="form-label text-dark"
                                                                >
                                                                  Move in
                                                                </Label>
                                                              </Col> */}
                                                              <Col md={4}>

                                                                <div className="form-group-new">
                                                                  <Flatpickr
                                                                    className="form-control d-block"
                                                                    placeholder="Pick a date..."
                                                                    value={
                                                                      state2.move_in
                                                                    }
                                                                    // disabled={disabledState}
                                                                    // onChange={() => dateHandler()}
                                                                    options={{
                                                                      altInput: true,
                                                                      format:
                                                                        "d/m/Y",
                                                                      altFormat:
                                                                        "d/m/Y",
                                                                      onChange:
                                                                        dateMoveInHandler,
                                                                    }}
                                                                  />
                                                                  <label htmlFor="usr">Move in</label>
                                                                </div>
                                                              </Col>

                                                              <Col md={4}>

                                                                <div className="form-group-new">
                                                                  <Flatpickr
                                                                    className="form-control d-block"
                                                                    placeholder="Pick a date..."
                                                                    value={
                                                                      state2.move_out
                                                                    }
                                                                    // disabled={disabledState}
                                                                    // onChange={() => dateHandler()}
                                                                    options={{
                                                                      altInput: true,
                                                                      format:
                                                                        "d/m/Y",
                                                                      altFormat:
                                                                        "d/m/Y",
                                                                      onChange:
                                                                        dateMoveOutHandler,
                                                                    }}
                                                                  />
                                                                  <label htmlFor="usr"> Move Out </label>
                                                                </div>
                                                                <ErrorMessage
                                                                  name="move_out"
                                                                  component="div"
                                                                  className="invalid-feedback"
                                                                />
                                                              </Col>
                                                              <Col
                                                                className="align-items-center"
                                                                md={4}
                                                              >
                                                                <TenantMoveOutDetails
                                                                  state2={state2}
                                                                  handlePropertyFormTwoValues={
                                                                    handlePropertyFormTwoValues
                                                                  }
                                                                />
                                                              </Col>
                                                            </Row>

                                                            {/* <Row className="mb-3">
                                                              <Col md={4}>
                                                                <Label
                                                                  for="move_out"
                                                                  className="form-label text-dark"
                                                                >
                                                                  Move out
                                                                </Label>
                                                              </Col>
                                                              <Col md={3}>

                                                                <div className="w-75">
                                                                  <Flatpickr
                                                                    className="form-control d-block"
                                                                    placeholder="Pick a date..."
                                                                    value={
                                                                      state2.move_out
                                                                    }
                                                                    // disabled={disabledState}
                                                                    // onChange={() => dateHandler()}
                                                                    options={{
                                                                      altInput: true,
                                                                      format:
                                                                        "d/m/Y",
                                                                      altFormat:
                                                                        "d/m/Y",
                                                                      onChange:
                                                                        dateMoveOutHandler,
                                                                    }}
                                                                  />
                                                                </div>
                                                                <ErrorMessage
                                                                  name="move_out"
                                                                  component="div"
                                                                  className="invalid-feedback"
                                                                />
                                                              </Col>
                                                              <Col
                                                                className="d-flex align-items-center"
                                                                md={4}
                                                              >
                                                                <TenantMoveOutDetails
                                                                  state2={state2}
                                                                  handlePropertyFormTwoValues={
                                                                    handlePropertyFormTwoValues
                                                                  }
                                                                />
                                                              </Col>
                                                            </Row> */}

                                                            <Row className="mb-3">

                                                              <Col md={3}>
                                                                <div className="form-group-new">
                                                                  <Flatpickr
                                                                    className="form-control d-block"
                                                                    placeholder="Pick a date..."
                                                                    value={
                                                                      state2.agreement_start
                                                                    }
                                                                    // disabled={disabledState}
                                                                    // onChange={() => dateHandler()}
                                                                    options={{
                                                                      altInput: true,
                                                                      format:
                                                                        "d/m/Y",
                                                                      altFormat:
                                                                        "d/m/Y",
                                                                      onChange:
                                                                        dateAgreementStartHandler,
                                                                    }}
                                                                  />
                                                                  <label htmlFor="usr">Agreement Start</label>
                                                                </div>
                                                                <ErrorMessage
                                                                  name="agreement_start"
                                                                  component="div"
                                                                  className="invalid-feedback"
                                                                />
                                                              </Col>
                                                              <Col md={3}>

                                                                <div className="form-group-new">
                                                                  <Flatpickr
                                                                    className="form-control d-block"
                                                                    placeholder="Pick a date..."
                                                                    value={
                                                                      state2.agreement_end
                                                                    }

                                                                    options={{
                                                                      altInput: true,
                                                                      format:
                                                                        "d/m/Y",
                                                                      altFormat:
                                                                        "d/m/Y",
                                                                      onChange:
                                                                        dateAgreementEndHandler,
                                                                    }}
                                                                  />
                                                                  <label htmlFor="usr">Agreement End</label>
                                                                </div>
                                                                <ErrorMessage
                                                                  name="agreement_end"
                                                                  component="div"
                                                                  className="invalid-feedback"
                                                                />
                                                              </Col>
                                                              <Col md={3}>

                                                                <div className="form-group-new">
                                                                  <Flatpickr
                                                                    className="form-control d-block"
                                                                    placeholder="Pick a date..."
                                                                    value={
                                                                      state2.paid_to
                                                                    }
                                                                    // disabled={disabledState}
                                                                    // onChange={() => dateHandler()}
                                                                    options={{
                                                                      altInput: true,
                                                                      format:
                                                                        "d/m/Y",
                                                                      altFormat:
                                                                        "d/m/Y",
                                                                      onChange:
                                                                        datePaidToHandler,
                                                                    }}
                                                                  />
                                                                  <label htmlFor="usr">Paid to</label>
                                                                </div>
                                                                <ErrorMessage
                                                                  name="paid_to"
                                                                  component="div"
                                                                  className="invalid-feedback"
                                                                />
                                                              </Col>

                                                              <Col
                                                                md={3}
                                                                className="d-flex"
                                                              >
                                                                <div className="form-group-new">
                                                                  <Field
                                                                    name="part_paid"
                                                                    id="part_paid"
                                                                    type="text"
                                                                    placeholder="0.00"
                                                                    className={
                                                                      "form-control" +
                                                                      (errors.part_paid &&
                                                                        touched.part_paid
                                                                        ? " is-invalid"
                                                                        : "")
                                                                    }
                                                                    style={{
                                                                      borderTopLeftRadius: 0,
                                                                      borderBottomLeftRadius: 0,
                                                                    }}
                                                                    value={
                                                                      state2.part_paid
                                                                    }
                                                                    onChange={
                                                                      handlePropertyFormTwoValues
                                                                    }
                                                                  />
                                                                  <label htmlFor="usr">Part paid </label>

                                                                </div>
                                                                <span className="input-group-append">
                                                                  <span
                                                                    className="input-group-text"
                                                                    style={{
                                                                      borderTopRightRadius: 0,
                                                                      borderBottomRightRadius: 0,
                                                                    }}
                                                                  >
                                                                    ৳
                                                                  </span>
                                                                </span>
                                                                <ErrorMessage
                                                                  name="part_paid"
                                                                  component="div"
                                                                  className="invalid-feedback"
                                                                />
                                                              </Col>
                                                            </Row>


                                                            <Row className="mb-4">
                                                              <Col md={3}>
                                                                <Label
                                                                  for="routine_inspections_frequency"
                                                                  className="form-label text-dark"
                                                                >
                                                                  Periodic tenancy
                                                                </Label>
                                                              </Col>
                                                              <Col md={3}>
                                                                <div className="btn-group btn-group-justified">
                                                                  <div className="btn-group">
                                                                    <Button
                                                                      color={
                                                                        inspectionPeriodicYesBtn
                                                                          ? "secondary"
                                                                          : "light"
                                                                      }
                                                                      onClick={
                                                                        toggleInspectionPeriodicYesBtn
                                                                      }
                                                                    >
                                                                      {inspectionPeriodicYesBtn ? (
                                                                        <i className="bx bx-comment-check"></i>
                                                                      ) : null}
                                                                      <span>
                                                                        {" "}
                                                                        Yes
                                                                      </span>
                                                                    </Button>
                                                                  </div>
                                                                  <div className="btn-group">
                                                                    <Button
                                                                      color={
                                                                        inspectionPeriodicNoBtn
                                                                          ? "secondary"
                                                                          : "light"
                                                                      }
                                                                      onClick={
                                                                        toggleInspectionPeriodicNoBtn
                                                                      }
                                                                    >
                                                                      {inspectionPeriodicNoBtn ? (
                                                                        <i className="bx bx-comment-check"></i>
                                                                      ) : null}
                                                                      <span>
                                                                        {" "}
                                                                        No
                                                                      </span>
                                                                    </Button>
                                                                  </div>
                                                                </div>
                                                              </Col>
                                                              <Col md={3}>
                                                                <Label
                                                                  for="routine_inspections_frequency"
                                                                  className="form-label text-dark"
                                                                >
                                                                  Rent invoices
                                                                </Label>
                                                              </Col>
                                                              <Col md={3}>
                                                                <div className="btn-group btn-group-justified">
                                                                  <div className="btn-group">
                                                                    <Button
                                                                      color={
                                                                        inspectionRentEnableBtn
                                                                          ? "secondary"
                                                                          : "light"
                                                                      }
                                                                      onClick={
                                                                        toggleInspectionRentEnableBtn
                                                                      }
                                                                    >
                                                                      {inspectionRentEnableBtn ? (
                                                                        <i className="bx bx-comment-check"></i>
                                                                      ) : null}
                                                                      <span>
                                                                        {" "}
                                                                        Enable
                                                                      </span>
                                                                    </Button>
                                                                  </div>
                                                                  <div className="btn-group">
                                                                    <Button
                                                                      color={
                                                                        inspectionRentDisableBtn
                                                                          ? "secondary"
                                                                          : "light"
                                                                      }
                                                                      onClick={
                                                                        toggleInspectionRentDisableBtn
                                                                      }
                                                                    >
                                                                      {inspectionRentDisableBtn ? (
                                                                        <i className="bx bx-comment-check"></i>
                                                                      ) : null}
                                                                      <span>
                                                                        {" "}
                                                                        Disable
                                                                      </span>
                                                                    </Button>
                                                                  </div>
                                                                </div>

                                                              </Col>

                                                            </Row>
                                                          </div>

                                                          <div className="my-3 py-3">

                                                            {formTwoButtonValue.rentInvoiceBtn ==
                                                              1 && (
                                                                <Row className="mb-3 pb-3">
                                                                  <Col md={4}>
                                                                    <Label
                                                                      for="invoice_days_in_advance"
                                                                      className="form-label text-dark"
                                                                    >
                                                                      Invoice days in
                                                                      advance
                                                                    </Label>
                                                                  </Col>
                                                                  <Col
                                                                    md={4}
                                                                    className="d-flex align-items-center"
                                                                  >
                                                                    <Field
                                                                      name="invoice_days_in_advance"
                                                                      type="number"
                                                                      className={
                                                                        "form-control" +
                                                                        (errors.invoice_days_in_advance &&
                                                                          touched.invoice_days_in_advance
                                                                          ? " is-invalid"
                                                                          : "")
                                                                      }
                                                                      value={
                                                                        state2.invoice_days_in_advance
                                                                      }
                                                                      onChange={
                                                                        handlePropertyFormTwoValues
                                                                      }
                                                                    />
                                                                    <ErrorMessage
                                                                      name="invoice_days_in_advance"
                                                                      component="div"
                                                                      className="invalid-feedback"
                                                                    />
                                                                  </Col>
                                                                  <Col md={4}></Col>
                                                                </Row>
                                                              )}

                                                            {formTwoButtonValue.rentInvoiceBtn ==
                                                              1 &&
                                                              <div className="mt-1 mb-2">
                                                                <UncontrolledAlert
                                                                  color="warning"
                                                                  className="alert-dismissible fade show"
                                                                  role="alert"
                                                                >
                                                                  <Row>
                                                                    <Col md={1}>
                                                                      <i className="mdi mdi-alert-outline me-2"></i>
                                                                    </Col>
                                                                    <Col md={11}>
                                                                      <Row className="d-flex flex-column">
                                                                        <Col >    Rent invoicing </Col>
                                                                        <Col >
                                                                          Generate a rent invoice message automatically overnight for each rental period
                                                                        </Col>

                                                                      </Row>
                                                                    </Col>

                                                                  </Row>

                                                                </UncontrolledAlert>
                                                              </div>}

                                                            <Row className="mt-1">

                                                              <Col
                                                                md={4}
                                                                className="d-flex"
                                                              >
                                                                <div className="form-group-new">
                                                                  <Field
                                                                    name="rent_review_frequency"
                                                                    type="text"
                                                                    placeholder="0"
                                                                    className={
                                                                      "form-control" +
                                                                      (errors.rent_review_frequency &&
                                                                        touched.rent_review_frequency
                                                                        ? " is-invalid"
                                                                        : "")
                                                                    }
                                                                    value={
                                                                      state2.rent_review_frequency
                                                                    }
                                                                    onChange={
                                                                      handlePropertyFormTwoValues
                                                                    }
                                                                  />

                                                                  <label htmlFor="usr"> Rent review frequency </label>
                                                                </div>
                                                                <ErrorMessage
                                                                  name="rent_review_frequency"
                                                                  component="div"
                                                                  className="invalid-feedback"
                                                                />
                                                                <p className="ms-2 text-secondary">
                                                                  Months
                                                                </p>
                                                              </Col>
                                                              <Col
                                                                md={3}

                                                              >
                                                                <div className="form-group-new">
                                                                  <Flatpickr
                                                                    className="form-control d-block"
                                                                    placeholder="Pick a date..."
                                                                    value={
                                                                      state2.next_rent_review
                                                                    }
                                                                    // disabled={disabledState}
                                                                    // onChange={() => dateHandler()}
                                                                    options={{
                                                                      altInput: true,
                                                                      format:
                                                                        "d/m/Y",
                                                                      altFormat:
                                                                        "d/m/Y",
                                                                      onChange:
                                                                        dateNextRentReviewHandler,
                                                                    }}
                                                                  />
                                                                  <label htmlFor="usr">Next rent review</label>
                                                                </div>

                                                                <ErrorMessage
                                                                  name="next_rent_review"
                                                                  component="div"
                                                                  className="invalid-feedback"
                                                                />
                                                              </Col>

                                                              <Col md={3}>
                                                                <Label
                                                                  for="routine_inspections_frequency"
                                                                  className="form-label text-dark"
                                                                >
                                                                  Exclude from
                                                                  arrears
                                                                  automation?
                                                                </Label>
                                                              </Col>
                                                              <Col md={2}>
                                                                <div className="btn-group btn-group-justified">
                                                                  <div className="btn-group">
                                                                    <Button
                                                                      color={
                                                                        inspectionAreaAutomationYesBtn
                                                                          ? "secondary"
                                                                          : "light"
                                                                      }
                                                                      onClick={
                                                                        toggleInspectionAreaAutomationYesBtn
                                                                      }
                                                                    >
                                                                      {inspectionAreaAutomationYesBtn ? (
                                                                        <i className="bx bx-comment-check"></i>
                                                                      ) : null}
                                                                      <span>
                                                                        {" "}
                                                                        Yes
                                                                      </span>
                                                                    </Button>
                                                                  </div>
                                                                  <div className="btn-group">
                                                                    <Button
                                                                      color={
                                                                        inspectionAreaAutomationNoBtn
                                                                          ? "secondary"
                                                                          : "light"
                                                                      }
                                                                      onClick={
                                                                        toggleInspectionAreaAutomationNoBtn
                                                                      }
                                                                    >
                                                                      {inspectionAreaAutomationNoBtn ? (
                                                                        <i className="bx bx-comment-check"></i>
                                                                      ) : null}
                                                                      <span>
                                                                        {" "}
                                                                        No
                                                                      </span>
                                                                    </Button>
                                                                  </div>
                                                                </div>
                                                              </Col>
                                                            </Row>


                                                          </div>
                                                        </CardBody>
                                                      </Col>
                                                    </Row>
                                                  </Col>
                                                </Card>

                                                <Card className="custom_card_border_design me-2">
                                                  <Col md={11}>
                                                    <Row className="d-flex justify-content-start px-3">
                                                      <Col
                                                        xs={2}
                                                        sm={3}
                                                        md={1}
                                                        lg={1}
                                                        style={{
                                                          textAlign: "center",
                                                          justifyContent: "center",
                                                          padding: "0px",
                                                        }}
                                                      >
                                                        <div
                                                          style={{
                                                            marginTop: "15px",
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            position: "absolute",
                                                            left: "15px",
                                                          }}
                                                        >
                                                          <i
                                                            className="far fa-user-circle ms-1"
                                                            style={{
                                                              fontSize: "30px",
                                                            }}
                                                          />

                                                          <div
                                                            className="vr"
                                                            style={{
                                                              width: "3px",
                                                              height: "70px",
                                                              position: "absolute",
                                                              left: "17px",
                                                              top: "28px",
                                                              background:
                                                                "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)",
                                                            }}
                                                          ></div>
                                                        </div>
                                                      </Col>
                                                      <Col xs={10} sm={9} md={11} lg={11}>
                                                        <CardBody>
                                                          <h4 className="mb-3 text-primary">
                                                            {" "}
                                                            Options
                                                          </h4>

                                                          <div
                                                            className="w-100 mt-2 mb-4"
                                                            style={{
                                                              borderBottom:
                                                                "1.2px dotted #c9c7c7",
                                                            }}
                                                          ></div>

                                                          <div className="mb-3">
                                                            <Row className="mb-3">
                                                              <Col md={6}>
                                                                <div className="form-group-new">
                                                                  <Field
                                                                    name="bank_reference"
                                                                    type="text"
                                                                    value={
                                                                      state2.bank_reference
                                                                    }
                                                                    className={
                                                                      "form-control" +
                                                                      (errors.bank_reference &&
                                                                        touched.bank_reference
                                                                        ? " is-invalid"
                                                                        : "")
                                                                    }
                                                                    onChange={
                                                                      handlePropertyFormTwoValues
                                                                    }
                                                                  />
                                                                  <label htmlFor="usr"> Bank reference</label>
                                                                </div>
                                                                <ErrorMessage
                                                                  name="bank_reference"
                                                                  component="div"
                                                                  className="invalid-feedback"
                                                                />
                                                              </Col>
                                                              <Col md={6}>
                                                                <div className="form-group-new">
                                                                  <Field
                                                                    id="receipt_warning"
                                                                    name="receipt_warning"
                                                                    type="text"
                                                                    value={
                                                                      state2.receipt_warning
                                                                    }
                                                                    className={
                                                                      "form-control" +
                                                                      (errors.receipt_warning &&
                                                                        touched.receipt_warning
                                                                        ? " is-invalid"
                                                                        : "")
                                                                    }
                                                                    onChange={
                                                                      handlePropertyFormTwoValues
                                                                    }
                                                                  />
                                                                  <label htmlFor="usr">Receipt warning</label>
                                                                </div>
                                                                <ErrorMessage
                                                                  name="receipt_warning"
                                                                  component="div"
                                                                  className="invalid-feedback"
                                                                />
                                                              </Col>
                                                            </Row>
                                                          </div>
                                                          <div className="mb-3">
                                                            <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                              <Col md={4}>
                                                                <Label
                                                                  for="building"
                                                                  className="form-label text-dark"
                                                                >
                                                                  Tenant Access
                                                                </Label>
                                                              </Col>

                                                              <Col md={8}>
                                                                <Row className="d-flex">
                                                                  <Col>
                                                                    <div className="btn-group btn-group-justified">
                                                                      <div className="btn-group">
                                                                        <Button
                                                                          className="d-flex align-items-center"
                                                                          color={
                                                                            inspectionDisableBtn
                                                                              ? "secondary"
                                                                              : "light"
                                                                          }
                                                                          onClick={
                                                                            toggleInspectionDisableBtn
                                                                          }
                                                                        >
                                                                          {inspectionDisableBtn ? (
                                                                            <i className="bx bx-comment-check"></i>
                                                                          ) : null}
                                                                          <span>
                                                                            {" "}
                                                                            Disable
                                                                          </span>
                                                                        </Button>
                                                                      </div>
                                                                      <div className="btn-group">
                                                                        <Button
                                                                          className="d-flex align-items-center"
                                                                          color={
                                                                            inspectionEnableBtn
                                                                              ? "secondary"
                                                                              : "light"
                                                                          }
                                                                          onClick={
                                                                            toggleInspectionEnableBtn
                                                                          }
                                                                        >
                                                                          {inspectionEnableBtn ? (
                                                                            <i className="bx bx-comment-check"></i>
                                                                          ) : null}
                                                                          <span>
                                                                            {" "}
                                                                            Enable
                                                                          </span>
                                                                        </Button>
                                                                      </div>
                                                                    </div>
                                                                  </Col>
                                                                  <Col></Col>
                                                                </Row>
                                                              </Col>
                                                            </Row>
                                                          </div>
                                                        </CardBody>
                                                      </Col>
                                                    </Row>
                                                  </Col>
                                                </Card>
                                              </div>
                                            </Form>
                                          </div>
                                        )}
                                      </Formik>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col md={2}></Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </TabPane>
                  <TabPane tabId={3}>
                    <form
                      className="repeater mt-3"
                      id="tenant-form-3"
                      encType="multipart/form-data"
                      onSubmit={saveTenantHandler}
                    >

                      <RecurringInvoice data={invoice} setData={setInvoice} />
                    </form>
                  </TabPane>
                </TabContent>
                {/* </div> */}
                <div className="actions clearfix">
                  <ul>
                    <li
                      className={
                        tabState.activeTab === 1
                          ? "previous disabled"
                          : "previous"
                      }
                    >
                      <Link
                        to="#"
                        onClick={() => {
                          toggleTab(tabState.activeTab - 1);
                          setFormSubmitBtnState(formSubmitBtnState - 1);
                        }}
                      >
                        Previous
                      </Link>
                    </li>
                    <li
                      className={
                        tabState.activeTab == 2 && formTwoButtonValue.rentInvoiceBtn !=
                          1 || tabState.activeTab == 3 && formTwoButtonValue.rentInvoiceBtn ==
                          1 ? "next disabled" : "next"
                      }
                    >
                      <button
                        type="submit"
                        form={"tenant-form-" + formSubmitBtnState}
                        // onClick={saveTenantHandler}
                        className="btn btn-primary"
                      >
                        <i className="fas fa-file-alt me-1"></i>{`${tabState.activeTab == 2 && formTwoButtonValue.rentInvoiceBtn !=
                          1 || tabState.activeTab == 3 && formTwoButtonValue.rentInvoiceBtn ==
                          1 ? 'Save' : 'Save & Next'}`}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment >
  );
};

const mapStateToProps = gstate => {
  const {
    property_add_tanent_loading,
    property_add_tanent,
    property_info_data,
    property_info_loading,
  } = gstate.property;
  const { contacts_list_data, contacts_list_loading, contacts_show_data } =
    gstate.Contacts2;
  return {
    property_add_tanent_loading,
    contacts_list_data,
    contacts_list_loading,

    contacts_show_data,

    property_info_data,
    property_info_loading,
    property_add_tanent,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addPropertyTanent,
    propertyTenantInfoFresh,
    contactList,
    showContactFresh,
    propertyListFresh,
    showContact,
    getPropertyInfo,
    addPropertyTanentFresh,
  })(PropertyTanentAdd2)
);
