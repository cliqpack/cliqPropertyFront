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
  UncontrolledAlert,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";

import classnames from "classnames";
import { Link, withRouter, useParams, useHistory } from "react-router-dom";
import {
  getTenantInfo,
  TenantInfoFresh,
} from "../../store/Properties/tenantActions";
import {
  editPropertyTanent,
  tenantUpdateFresh,
  contactList,
  showContactFresh,
  propertyTenantInfoFresh,
  tenantMoveOutFresh,
  tenantMoveOut,
} from "../../store/actions";
import moment from "moment";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TenantBondDetails from "./TenantBondDetails";
import TenantMoveOutDetails from "./TenantMoveOutDetails";
import TenantAdjustrent from "./TenantAdjustRent";
import "./property.css";
import ContactForm from "pages/Contacts2/MultipleReference/ContactForm";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const TenantEdit = props => {
  const { id, tabId } = useParams(); // Tenant id
  const history = useHistory();

  const [state, setState] = useState({});
  const [activeState, setActiveState] = useState(0);
  const [postalAddress, setPostalAddress] = useState([]);
  const [physicalAddress, setPhysicalAddress] = useState([]);

  const [step, setStep] = useState(0);
  const [btnRows, setBtnRows] = useState([]);
  const [countDelete, setCountDelete] = useState(1);
  const [forCheck, setForCheck] = useState([]);
  const [checkState, setCheckState] = useState([[]]);
  const [fullPhysicalAddress, setFullPhysicalAddress] = useState([]);
  const [fullPostalAddress, setFullPostalAddress] = useState([]);

  // Form Tab State
  const [tabState, setTabState] = useState({
    activeTab: tabId ? +tabId : 1,
    passedSteps: [+tabId],
  });
  // ---------

  // Autocomplete address
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {};

  const inputRefPostal = useRef();
  const autoCompletePostalRef = useRef();
  // ------------------------
  const [propertyId, setPropertyId] = useState();
  const [moveOutShow, setMoveOutShow] = useState(false);
  const toggleMoveOutShow = () => {
    setMoveOutShow(prev => !prev);
  };
  // const [state, setState] = useState({}); // Form 1 State
  const [state2, setState2] = useState({}); // Form 2 State

  const [showTransactionsAlert, setShowTransactionsAlert] = useState(false);
  const [addressState, setAddressState] = useState(true);
  // const [postalAddress, setPostalAddress] = useState({});
  // const [physicalAddress, setPhysicalAddress] = useState({});

  const [postalAddressState, setPostalAddressState] = useState({});
  const [physicalAddressState, setPhysicalAddressState] = useState({});

  const [phone, setPhone] = useState({
    mobile_phone: null,
    work_phone: null,
    home_phone: null,
  });

  const handlePostalAddressState = e => {
    setPostalAddressState({
      ...postalAddressState,
      [e.target.name]: e.target.value,
    });
  };
  const handlePhysicalAddressState = e => {
    setPhysicalAddressState({
      ...physicalAddressState,
      [e.target.name]: e.target.value,
    });
  };

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
  const [formSubmitBtnState, setFormSubmitBtnState] = useState(
    tabId ? +tabId : 1
  ); // Form Submit Button State

  const [init, setInit] = useState(true);

  // ----------------------------
  let contactEditCommunication = {
    printCheck: false,
    emailCheck: false,
    smsCheck: false,
  };

  let com = [];
  // const [forCheck, setForCheck] = useState({
  //   smsCheck: false,
  //   emailCheck: false,
  //   printCheck: false,
  // });
  // const [checkState, setCheckState] = useState([]);
  const [checkTrue, setCheckTrue] = useState(true);

  const [dateCheck, setDateCheck] = useState({ moveOut: false });

  // const checkTrueHandler = (boolean, value) => {
  //   setForCheck({
  //     ...forCheck,
  //     [boolean]: true,
  //   });
  //   let val = [...checkState];
  //   val.push(value);
  //   setCheckState(val);
  // };

  // const checkFalseHandler = (boolean, value) => {
  //   setForCheck({
  //     ...forCheck,
  //     [boolean]: false,
  //   });
  //   let val = [...checkState];
  //   val = val.filter(item => item !== value);
  //   setCheckState(val);
  // };

  const dateMoveInHandler = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    setState2({ ...state2, ["move_in"]: dateStr });
  };
  const dateMoveOutHandler = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    setState2({ ...state2, ["move_out"]: dateStr });
    props.tenantMoveOut(props.tenant_info_data?.data?.data?.id);
    setShowTransactionsAlert(true);
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
    console.log(dateStr);
    setState2({ ...state2, ["paid_to"]: dateStr });
  };

  const dateNextRentReviewHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ["next_rent_review"]: dateStr });
  };

  if (init) {
    props.getTenantInfo(id);
    props.tenantMoveOutFresh();
    setInit(false);
  }

  useEffect(() => {
    if (props.property_tenant_info_loading === "Success") {
      props.propertyTenantInfoFresh();
    }
    if (props.tenant_update_loading === "Success") {
      toastr.success("Tenant updated successfully");
      // props.contactList();
      if (props.tenant_update_data.contact_id) {
        props.tenantUpdateFresh();
        props.showContactFresh();
        history.push("/propertyInfo/" + propertyId);
      }
    }

    if (props.tenant_update_loading == "Failed") {
      toastr.error("Something went wrong");
      props.tenantUpdateFresh();
    }

    if (props.tenant_info_loading == "Success") {
      console.log(props.tenant_info_data?.data);
      if (props.tenant_info_data?.data?.tenantPayment.length > 0) {
        setPaymentStatus("edit");
        setRows5([...props.tenant_info_data?.data?.tenantPayment]);

        let lengthA = props.tenant_info_data?.data?.tenantPayment.length;
        props.tenant_info_data?.data?.tenantPayment.map((item, idx) => {
          item["selectedValues"] = { label: item.method, value: item.method };
          item["payeeType"] =
            item.method === "EFT" || item.method === "" ? true : false;
          item["bsbType"] = item.method === "EFT" ? true : false;
          item["accountType"] = item.method === "EFT" ? true : false;
          item["split_type_boolean"] =
            lengthA > 1 ? (idx === lengthA - 1 ? false : true) : false;
          item["errorState"] = false;
          item["error"] = "none";
        });

        setState8([...props.tenant_info_data?.data?.tenantPayment]);
      }

      let contacts = [];
      let contactsPhysical = [];
      let contactsPhysicalFull = [];
      let contactsPostal = [];
      let contactsPostalFull = [];
      let btn = [];
      let forChecks = [];

      props.tenant_info_data?.data?.data?.contact_details?.map((item, key) => {
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
        setCountDelete(prev => prev + 1);
      });

      let data = {
        reference: props.tenant_info_data?.data?.data?.reference,
        abn: props.tenant_info_data?.data?.data?.ABN,
        notes: props.tenant_info_data?.data?.data?.notes,
        contacts: contacts,
      };
      setState(data);
      setBtnRows(btn);
      setForCheck(forChecks);

      props.tenant_info_data?.data?.contactPhysicalAddress?.map((item, key) => {
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
        let building = item.building_name ? item.building_name + " " : "";
        let unit = item.unit ? item.unit + "/" : "";
        let number = item.number ? item.number + " " : "";
        let street = item.street ? item.street + " " : "";
        let suburb = item.suburb ? item.suburb + ", " : "";
        let state = item.state ? item.state + " " : "";
        let postcode = item.postcode ? item.postcode + " " : "";
        let country = item.country ? item.country : "";
        let full =
          building +
          unit +
          number +
          street +
          suburb +
          state +
          postcode +
          country;
        contactsPhysicalFull.push({ full: full });
      });
      props.tenant_info_data?.data?.contactPostalAddress?.map((item, key) => {
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
        let building = item.building_name ? item.building_name + " " : "";
        let unit = item.unit ? item.unit + "/" : "";
        let number = item.number ? item.number + " " : "";
        let street = item.street ? item.street + " " : "";
        let suburb = item.suburb ? item.suburb + ", " : "";
        let state = item.state ? item.state + " " : "";
        let postcode = item.postcode ? item.postcode + " " : "";
        let country = item.country ? item.country : "";
        let full =
          building +
          unit +
          number +
          street +
          suburb +
          state +
          postcode +
          country;
        contactsPostalFull.push({ full: full });
      });
      setPhysicalAddress(contactsPhysical);
      setPostalAddress(contactsPostal);
      setFullPhysicalAddress(contactsPostalFull);
      setFullPostalAddress(contactsPhysicalFull);

      // setState({
      //   ...state,
      //   reference: props.tenant_info_data?.data?.data?.reference,
      //   first_name: props.tenant_info_data?.data?.data?.first_name,
      //   last_name: props.tenant_info_data?.data?.data?.last_name,
      //   salutation: props.tenant_info_data?.data?.data?.salutation,
      //   company_name: props.tenant_info_data?.data?.data?.company_name,

      //   email: props.tenant_info_data?.data?.data?.email,
      //   abn: props.tenant_info_data?.data?.data?.abn,
      //   notes: props.tenant_info_data?.data?.data?.notes,
      // });

      setPropertyId(props.tenant_info_data?.data?.data?.property_id);

      // setPhone({
      //   mobile_phone: props.tenant_info_data?.data?.data?.mobile_phone,
      //   work_phone: props.tenant_info_data?.data?.data?.work_phone,
      //   home_phone: props.tenant_info_data?.data?.data?.home_phone,
      // });

      setState2({
        rent: props.tenant_info_data?.data?.folio?.rent,
        rent_type: props.tenant_info_data?.data?.folio?.rent_type,
        bond_required: props.tenant_info_data?.data?.folio?.bond_required,
        rentTax: props.tenant_info_data?.data?.folio?.rent_includes_tax,
        periodic_tenancy: props.tenant_info_data?.data?.folio?.periodic_tenancy,
        bond_held: props.tenant_info_data?.data?.folio?.bond_held,
        move_in: props.tenant_info_data?.data?.folio?.move_in,
        move_out: props.tenant_info_data?.data?.folio?.move_out,
        agreement_start: props.tenant_info_data?.data?.folio?.agreement_start,
        agreement_end: props.tenant_info_data?.data?.folio?.agreement_end,
        paid_to: props.tenant_info_data?.data?.folio?.paid_to,
        part_paid: props.tenant_info_data?.data?.folio?.part_paid,
        invoice_days_in_advance:
          props.tenant_info_data?.data?.folio?.invoice_days_in_advance,
        rent_review_frequency:
          props.tenant_info_data?.data?.folio?.rent_review_frequency,
        next_rent_review: props.tenant_info_data?.data?.folio?.next_rent_review,
        bank_reterence: props.tenant_info_data?.data?.folio?.bank_reterence,
        receipt_warning: props.tenant_info_data?.data?.folio?.receipt_warning,
        bond_paid: props.tenant_info_data?.data?.folio?.bond_already_paid,
        bond_arrears: props.tenant_info_data?.data?.folio?.bond_arreas,
        bond_receipted: props.tenant_info_data?.data?.folio?.bond_receipted,
        bond_reference: props.tenant_info_data?.data?.folio?.bond_reference,
        break_lease: props.tenant_info_data?.data?.folio?.break_lease,
        bond_notes: props.tenant_info_data?.data?.folio?.notes,
        termination: props.tenant_info_data?.data?.folio?.termination,
      });

      setInspectionIncludeTaxBtn(
        props.tenant_info_data?.data?.folio?.rent_includes_tax == 0
          ? false
          : true
      );
      setInspectionExcludeTaxBtn(
        props.tenant_info_data?.data?.folio?.rent_includes_tax == 0
          ? true
          : false
      );

      setInspectionPeriodicYesBtn(
        props.tenant_info_data?.data?.folio?.periodic_tenancy == 0
          ? false
          : true
      );
      setInspectionPeriodicNoBtn(
        props.tenant_info_data?.data?.folio?.periodic_tenancy == 0
          ? true
          : false
      );

      setInspectionRentEnableBtn(
        props.tenant_info_data?.data?.folio?.rent_invoice == 0 ? false : true
      );
      setInspectionRentDisableBtn(
        props.tenant_info_data?.data?.folio?.rent_invoice == 0 ? true : false
      );

      setInspectionAreaAutomationYesBtn(
        props.tenant_info_data?.data?.folio?.exclude_form_arrears == 0
          ? false
          : true
      );
      setInspectionAreaAutomationNoBtn(
        props.tenant_info_data?.data?.folio?.exclude_form_arrears == 0
          ? true
          : false
      );

      setInspectionEnableBtn(
        props.tenant_info_data?.data?.folio?.tenant_access == 0 ? false : true
      );
      setInspectionDisableBtn(
        props.tenant_info_data?.data?.folio?.tenant_access == 0 ? true : false
      );

      setDateCheck({
        ...dateCheck,
        moveOut: props.tenant_info_data?.data?.folio?.move_out ? true : false,
      });

      setFormTwoButtonValue({
        wfmBtn: props.tenant_info_data?.data?.folio?.rent_type,
        rentTax: props.tenant_info_data?.data?.folio?.rent_includes_tax,
        periodic_tenancy: props.tenant_info_data?.data?.folio?.periodic_tenancy,
        rentInvoiceBtn: props.tenant_info_data?.data?.folio?.rent_invoice,
        exclude_form_arrears:
          props.tenant_info_data?.data?.folio?.exclude_form_arrears,
        tenant_access: props.tenant_info_data?.data?.folio?.tenant_access,
      });

      if (props.tenant_info_data?.data?.folio?.rent_type === "Weekly") {
        setWeeklyRent(props.tenant_info_data?.data?.folio?.rent);
        setInspectionWeeklyBtn(true);
        setInspectionfortnightlyBtn(false);
        setInspectionMonthlyBtn(false);
      } else if (
        props.tenant_info_data?.data?.folio?.rent_type === "FortNightly"
      ) {
        setFortNightlyRent(props.tenant_info_data?.data?.folio.rent);
        setInspectionWeeklyBtn(false);
        setInspectionfortnightlyBtn(true);
        setInspectionMonthlyBtn(false);
      } else {
        setMonthlyRent(props.tenant_info_data?.data?.folio.rent);
        setInspectionWeeklyBtn(false);
        setInspectionfortnightlyBtn(false);
        setInspectionMonthlyBtn(true);
      }
      if (props.tenant_info_data?.data?.folio?.rent_invoice == 1) {
        setInspectionRentEnableBtn(true);
        setInspectionRentDisableBtn(false);
      } else if (props.tenant_info_data?.data?.folio?.rent_invoice == 0) {
        setInspectionRentEnableBtn(false);
        setInspectionRentDisableBtn(true);
      }
    }
  }, [props.tenant_info_loading, props.tenant_update_loading]);

  const [rows5, setRows5] = useState([]);
  const [state8, setState8] = useState([]);
  console.log(state8);

  const [optionGroup8, setOptionGroup8] = useState([
    {
      options: [
        { label: "None", value: "None" },
        { label: "Cheque", value: "Cheque" },
        { label: "EFT", value: "EFT" },
      ],
    },
  ]);

  const [enteredState, setEnteredState] = useState(false);
  console.log(enteredState);
  const [paymentStatus, setPaymentStatus] = useState("add");
  console.log(paymentStatus);
  const handleChangeInput3 = async (idx, e, type) => {
    const values = [...state8];
    values[idx][type] = e.value;
    values[idx]["selectedValues"] = e;
    if (e.value === "None") {
      values[idx]["payeeType"] = false;
      values[idx]["bsbType"] = false;
      values[idx]["accountType"] = false;
    } else if (e.value === "Cheque") {
      values[idx]["payeeType"] = true;
      values[idx]["payee"] = state.reference;
      values[idx]["bsbType"] = false;
      values[idx]["accountType"] = false;
    } else if (e.value === "EFT") {
      values[idx]["payeeType"] = true;
      values[idx]["payee"] = state.reference;
      values[idx]["bsbType"] = true;
      values[idx]["accountType"] = true;
    }
    await setState8(values);

    setSelectedGroup8(e);
    setSelectedId8(e.value);
    setTableInfoShow8(true);
  };

  const splitCalculation = (val, data, stateLength) => {
    data.forEach((element, idx) => {
      if (
        stateLength > 1 &&
        idx < stateLength - 1 &&
        element.split_type === "%"
      ) {
        val = val - element.split > 0 ? val - element.split : 0;
      }
    });
    return val;
  };

  const handlePropertyFormValues8 = async (idx, e) => {
    let data = [...state8];
    let val = 100;
    let stateLength = data.length;

    data[idx][e.target.name] = e.target.value;
    if (e.target.name == "split" && data[idx]["split_type"] === "%") {
      val = splitCalculation(val, data, stateLength);
      data[stateLength - 1]["split"] = val;
    }
    setState8(data);
  };

  const toggleDollorBtn = idx => {
    let data = [...state8];
    let splitval = data[idx]["split"];
    data[idx]["split_type"] = "$";
    if (splitval) {
      let totalVal = 0;
      data.forEach(element => {
        totalVal += +element.split;
      });
      if (totalVal === 100) {
        data[data.length - 1]["split"] =
          +data[data.length - 1]["split"] + +splitval;
      }
    }
    data[idx]["split"] = "";
    setState8(data);
  };

  const togglePercentBtn = idx => {
    let data = [...state8];
    data[idx]["split_type"] = "%";
    data[idx]["split"] = "";
    setState8(data);
  };

  const handleFocus = event => event.target.select();
  const handleFocusOut = () => { };

  const handleRemoveRow8 = (e, idx) => {
    var rowIndex = [...rows5];
    var rowStateValue = [...state8];
    let removed = rowStateValue[idx];
    rowStateValue.splice(idx, 1);
    if (rowStateValue.length > 1) {
      rowStateValue[rowStateValue.length - 1]["split"] =
        +rowStateValue[rowStateValue.length - 1]["split"] + +removed["split"];
      rowStateValue[rowStateValue.length - 1]["split_type_boolean"] = false;
    } else if (rowStateValue.length === 1) {
      rowStateValue[rowStateValue.length - 1]["split"] = 100;
      rowStateValue[rowStateValue.length - 1]["split_type_boolean"] = false;
    }

    rowIndex.splice(idx, 1);
    setRows5(rowIndex);
    setState8(rowStateValue);
  };

  const handleAddRow8 = () => {
    const item = {
      name: "",
    };
    setRows5([...rows5, item]);
    const values = [...state8];
    if (rows5.length > 0) {
      values[rows5.length - 1]["split_type_boolean"] = true;
    }

    setState8([
      ...values,
      {
        selectedValues: { label: "EFT", value: "EFT" },
        method: "EFT",
        payee: state.reference,
        payeeType: true,
        bsb: "",
        bsbType: true,
        account: "",
        accountType: true,
        split: rows5.length === 0 ? 100 : 0,
        split_type_boolean: false,
        split_type: "%",
        errorState: false,
        error: "none",
      },
    ]);
  };

  const handleRowResult2 = async e => {
    e.preventDefault();

    if (state8.length === 0) {
      setEnteredState(true);
    } else {
      const values = [...state8];
      var split = 0;
      var lengthSp = state8.length;
      state8.forEach(async (element, idx) => {
        if (lengthSp > 1) {
          if (values[idx]["split_type"] == "%") {
            split += Number(element.split);
          }

          if (split > 100 || Number(element.split) === 0) {
            values[lengthSp - 1]["errorState"] = true;
            values[lengthSp - 1]["error"] = "Invalid Percentage";
            setState8(values);
          }
        }
        if (element.method == "EFT") {
          if (element.payee == "") {
            values[idx]["errorState"] = true;
            values[idx]["error"] = "Enter a Payee for EFT payment";
            setState8(values);
            return;
          } else if (element.bsb.length < 6) {
            values[idx]["errorState"] = true;
            values[idx]["error"] = "Enter a 6-digit BSB";
            setState8(values);
            return;
          } else if (element.account == "") {
            values[idx]["errorState"] = true;
            values[idx]["error"] = " Enter an Account number";
            setState8(values);
            return;
          } else {
            values[idx]["errorState"] = false;
            values[idx]["error"] = "";
            setState8(values);
          }
        }
        if (element.method == "Cheque") {
          if (element.payee == "") {
            values[idx]["errorState"] = true;
            values[idx]["error"] = "Enter a Payee for Cheque payment";
            setState8(values);
            return;
          } else {
            values[idx]["errorState"] = false;
            values[idx]["error"] = "";
            setState8(values);
          }
        }
      });

      state8.forEach(async (element, idx) => {
        console.log(element.errorState);
        if (element.errorState == false) {
          setEnteredState(true);
        } else {
          setEnteredState(false);
        }
      });
    }
  };

  if (enteredState && tabState.activeTab === 3) {
    console.log("in");
    setEnteredState(false);
    props.editPropertyTanent(
      state,
      state2,
      formTwoButtonValue,
      id,
      postalAddressState,
      physicalAddressState,
      checkState,
      phone,
      postalAddress,
      physicalAddress,
      paymentStatus,
      state8
    );
  }

  const nextTabState = e => {
    if (tabState.activeTab === 2) {
      e.preventDefault();
      setTabState({
        ...tabState,
        activeTab: 3,
      });
      setFormSubmitBtnState(formSubmitBtnState + 1);
    }
  };

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

  const [inspectionEnableBtn, setInspectionEnableBtn] = useState(false);
  const [inspectionDisableBtn, setInspectionDisableBtn] = useState(true);
  // ------------------

  // const [fullPhysicalAddress, setFullPhysicalAddress] = useState("");
  // const [fullPostalAddress, setFullPostalAddress] = useState("");

  const [weeklyRent, setWeeklyRent] = useState();
  const [fortNightlyRent, setFortNightlyRent] = useState();
  const [monthlyRent, setMonthlyRent] = useState();
  const [toggleState, setToggleState] = useState(false);

  //adjust rent toggle
  const toggleAdjustRent = () => {
    setToggleState(prev => !prev);
  };
  // Toggle Tab function
  const toggleTab = tab => {
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
    setFormTwoButtonValue(prev => {
      return { ...prev, wfmBtn: "Monthly" };
    });
    setInspectionMonthlyBtn(true);
    setInspectionWeeklyBtn(false);
    setInspectionfortnightlyBtn(false);
  };
  const toggleInspectionWeeklyBtn = () => {
    setFormTwoButtonValue(prev => {
      return { ...prev, wfmBtn: "Weekly" };
    });
    setInspectionWeeklyBtn(true);
    setInspectionMonthlyBtn(false);
    setInspectionfortnightlyBtn(false);
  };
  const toggleInspectionfortnightlyBtn = () => {
    setFormTwoButtonValue(prev => {
      return { ...prev, wfmBtn: "FortNightly" };
    });
    setInspectionfortnightlyBtn(true);
    setInspectionWeeklyBtn(false);
    setInspectionMonthlyBtn(false);
  };

  const toggleInspectionIncludeTaxBtn = () => {
    setFormTwoButtonValue(prev => {
      return { ...prev, rentTax: 1 };
    });
    setInspectionIncludeTaxBtn(true);
    setInspectionExcludeTaxBtn(false);
  };
  const toggleInspectionExcludeTaxBtn = () => {
    setFormTwoButtonValue(prev => {
      return { ...prev, rentTax: 0 };
    });
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
    setFormTwoButtonValue(prev => {
      return { ...prev, rentInvoiceBtn: 1 };
    });
    setInspectionRentEnableBtn(true);
    setInspectionRentDisableBtn(false);
  };
  const toggleInspectionRentDisableBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, rentInvoiceBtn: 0 });
    setFormTwoButtonValue(prev => {
      return { ...prev, rentInvoiceBtn: 0 };
    });
    setInspectionRentDisableBtn(true);
    setInspectionRentEnableBtn(false);
    setState2({ ...state2, invoice_days_in_advance: "" });
  };

  const toggleInspectionAreaAutomationYesBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, exclude_form_arrears: 1 });
    setFormTwoButtonValue(prev => {
      return { ...prev, exclude_form_arrears: 1 };
    });
    setInspectionAreaAutomationYesBtn(true);
    setInspectionAreaAutomationNoBtn(false);
  };

  const toggleInspectionAreaAutomationNoBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, exclude_form_arrears: 0 });
    setFormTwoButtonValue(prev => {
      return { ...prev, exclude_form_arrears: 0 };
    });
    setInspectionAreaAutomationNoBtn(true);
    setInspectionAreaAutomationYesBtn(false);
  };

  const toggleInspectionDisableBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, tenant_access: 0 });
    setFormTwoButtonValue(prev => {
      return { ...prev, tenant_access: 0 };
    });
    setInspectionDisableBtn(true);
    setInspectionEnableBtn(false);
  };
  const toggleInspectionEnableBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, tenant_access: 1 });
    setFormTwoButtonValue(prev => {
      return { ...prev, tenant_access: 1 };
    });
    setInspectionEnableBtn(true);
    setInspectionDisableBtn(false);
  };

  // Handle Inner form values and set form value state
  const handlePropertyFormOneValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // Handle Bond
  let rentByBtn;
  const handleWeeklyBondValue = e => {
    if (weeklyRent) {
      setState2({ ...state2, rent: weeklyRent });
    } else if (fortNightlyRent) {
      rentByBtn = fortNightlyRent / 2;
      rentByBtn = rentByBtn.toFixed(2);
      setState2({ ...state2, rent: rentByBtn });
    } else if (monthlyRent) {
      rentByBtn = monthlyRent / 4.29;
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
      rentByBtn = monthlyRent / 2.143;
      rentByBtn = rentByBtn.toFixed();
      setState2({ ...state2, rent: rentByBtn });
    }
  };

  const handleMonthlyBondValue = e => {
    if (monthlyRent) {
      setState2({ ...state2, rent: monthlyRent });
    } else if (weeklyRent) {
      rentByBtn = weeklyRent * 4.29;
      rentByBtn = rentByBtn.toFixed();
      setState2({ ...state2, rent: rentByBtn });
    } else if (fortNightlyRent) {
      rentByBtn = fortNightlyRent * 2;
      rentByBtn = rentByBtn.toFixed();
      setState2({ ...state2, rent: rentByBtn });
    }
  };

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
        value /= 1.1;
        value = value.toFixed(2);
        setState2({ ...state2, rent: e.target.value, bond_required: value });
        setWeeklyRent();
        setFortNightlyRent();
      }
    } else {
      setState2({ ...state2, rent: e.target.value, bond_required: "" });
    }
  };

  const handlePropertyFormTwoValues = e => {
    if (e.target.name == "agreement_start") {
      const date_end1 = moment(e.target.value)
        .add(364, "days")
        .format("yyyy-MM-DD");
      const substractDay = moment(e.target.value)
        .subtract(1, "days")
        .format("yyyy-MM-DD");
      const substractDay1 = moment(date_end1)
        .subtract(3, "Month")
        .format("yyyy-MM-DD");
      setState2({
        ...state2,
        [e.target.name]: e.target.value,
        ["agreement_end"]: date_end1,
        ["paid_to"]: substractDay,
        ["next_rent_review"]: substractDay1,
      });
      // setState2({ ...state2, ["agreement_end"]: date_end1 });
    } else if (e.target.name == "agreement_end") {
      const substractMonthThree = moment(e.target.value)
        .subtract(3, "Month")
        .format("yyyy-MM-DD");

      setState2({ ...state2, ["agreement_end"]: substractMonthThree });
    } else if (e.target.name == "rent_review_frequency") {
      const date_end2 = moment()
        .add(e.target.value, "Month")
        .format("yyyy-MM-DD");
      setState2({
        ...state2,
        ["next_rent_review"]: date_end2,
        ["rent_review_frequency"]: e.target.value,
      });
    } else if (e.target.name == "move_out") {
      setDateCheck({ ...dateCheck, moveOut: true });
      setState2({ ...state2, [e.target.name]: e.target.value });
    } else {
      setState2({ ...state2, [e.target.name]: e.target.value });
    }
  };

  const handlePropertyFormTwoValuesForMovingTenant = e => {
    console.log(e.target.value);
    setState2({
      ...state2,
      [e.target.name]: e.target.value,
    });
    props.tenantMoveOut(props.tenant_info_data?.data?.data?.id);
    setShowTransactionsAlert(true);
  };

  const handlePropertyFormBond = e => {
    const bond__paid = e.target.value;
    const bond__arrears =
      +state2.bond_required - (+state2.bond_receipted + +bond__paid);
    const bond__held = +state2.bond_receipted + +bond__paid;

    setState2(prev => ({
      ...prev,
      [e.target.name]: bond__paid,
      bond_arrears: bond__arrears,
      bond_held: bond__held,
    }));
  };

  const tenantComHandler = e => {
    if (e.target.value === "SMS") {
      setTenantEditCom({
        ...tenantEditCom,
        sms: !tenantEditCom.sms,
      });
    }
    if (e.target.value === "Email") {
      setTenantEditCom({
        ...tenantEditCom,
        email: !tenantEditCom.email,
      });
    }
    if (e.target.value === "Print") {
      setTenantEditCom({
        ...tenantEditCom,
        print: !tenantEditCom.print,
      });
    }
  };
  // ----------------

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
    setState8([
      {
        selectedValues: { label: "EFT", value: "EFT" },
        method: "EFT",
        payee: mainRef,
        payeeType: true,
        bsb: "",
        bsbType: true,
        account: "",
        accountType: true,
        split: 100,
        split_type_boolean: false,
        split_type: "%",
        errorState: false,
        error: "none",
      },
    ]);
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

  document.title = "CliqProperty";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <h4 className="text-primary py-2">Edit Tenant</h4>
          <Row className="g-2">
            <Col lg="2">
              <Card
                style={{ borderRadius: "14px", margin: "0px", padding: "0px" }}
              >
                <CardBody style={{ margin: "0px", padding: "7px" }}>
                  <h4
                    className="text-primary"
                    style={{ fontSize: "15px", padding: "5px 10px" }}
                  >
                    Edit Tenant - {state.reference || ""}
                  </h4>
                  <div
                    className="my-3"
                    style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                  />

                  {/* <div className="steps clearfix"> */}
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
                    //style={{ width: "33%" }}
                    >
                      <NavLink
                        className={classnames({
                          active: tabState.activeTab === 1,
                        })}
                        onClick={() => {
                          toggleTab(1);
                          setFormSubmitBtnState(1);
                        }}
                        style={{ textAlign: "left" }}
                      >
                        <span className="number icon-tab-tenant-number">1</span>{" "}
                        <span style={{ fontSize: "12px" }}>Contact</span>
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={classnames({
                        current: tabState.activeTab === 2,
                      })}
                    //style={{ width: "33%" }}
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
                        style={{ textAlign: "left" }}
                      >
                        <span className="number icon-tab-tenant-number">2</span>{" "}
                        <span style={{ fontSize: "12px" }}>Folio</span>
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={classnames({
                        current: tabState.activeTab === 3,
                      })}
                    //style={{ width: "33%" }}
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
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <span className="number icon-tab-tenant-number">3</span>{" "}
                        <span style={{ fontSize: "12px" }}>
                          Payment Methods
                        </span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  {/* </div> */}
                </CardBody>
              </Card>
            </Col>
            <Col lg="10" style={{ padding: "0px" }}>
              <div className="wizard clearfix">
                <div className="content clearfix">
                  <TabContent activeTab={tabState.activeTab} className="body">
                    <TabPane tabId={1}>
                      <Row>
                        <Col sm="12">
                          <div className="d-flex flex-column justify-content-start">
                            <div>
                              <div>
                                <div>
                                  {props.error ? (
                                    <Alert color="danger">
                                      {JSON.stringify(
                                        props.error.response.data.message
                                      )}
                                    </Alert>
                                  ) : null}
                                  <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                      reference:
                                        (state && state.reference) || "",

                                      abn: (state && state.abn) || "",

                                      notes: (state && state.notes) || "",
                                      check: checkState ? checkState : [],
                                    }}
                                    validationSchema={Yup.object().shape({})}
                                    onSubmit={(values, onSubmitProps) => {
                                      toggleTab(tabState.activeTab + 1);
                                      setFormSubmitBtnState(
                                        formSubmitBtnState + 1
                                      );
                                    }}
                                  >
                                    {({ errors, status, touched }) => (
                                      <div style={{ marginTop: "-30px" }}>
                                        <Form
                                          className="form-horizontal"
                                          id="tenant-form-1"
                                        >
                                          <div>
                                            <Card className="custom_card_border_design me-2">
                                              <Col md={9}>
                                                <Row className="d-flex justify-content-start px-3">
                                                  <Col
                                                    md={1}
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
                                                  <Col md={11}>
                                                    <CardBody
                                                      style={{
                                                        paddingLeft: "0px",
                                                      }}
                                                    >
                                                      <CardTitle tag="h5">
                                                        Tenant Contact
                                                      </CardTitle>
                                                      {/* <div
                                                      className="w-75 d-flex justify-content-between align-items-center pb-1"
                                                      style={{
                                                        borderBottom:
                                                          "1.2px dotted #c9c7c7",
                                                      }}
                                                    >
                                                      <h4 className="mb-3 text-primary">
                                                        Tenant Contact
                                                      </h4>
                                                    </div> */}
                                                      <div className="my-3">
                                                        <Row className="d-flex justify-content-evenly align-items-center">
                                                          {/* <Col md={4}>
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
                                                                value={
                                                                  state.reference
                                                                }
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
                                                                style={{
                                                                  backgroundColor:
                                                                    "#F2F6FA",
                                                                }}
                                                              />
                                                              <label htmlFor="usr">
                                                                Reference
                                                              </label>
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

                                            {/* <Card>
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
                                                        />
                                                      </div>
                                                    );
                                                  }
                                                )}
                                              </CardBody>
                                            </Card> */}

                                            <Card className="custom_card_border_design me-2">
                                              <Col md={9}>
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
                                                          height:
                                                            btnRows.length > 0
                                                              ? "800px"
                                                              : "50px",
                                                          position: "absolute",
                                                          left: "17px",
                                                          top: "28px",
                                                          background:
                                                            "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)",
                                                        }}
                                                      ></div>
                                                    </div>
                                                  </Col>
                                                  <Col
                                                    xs={10}
                                                    sm={9}
                                                    md={11}
                                                    lg={11}
                                                  >
                                                    <CardBody
                                                      style={{
                                                        paddingLeft: "0px",
                                                      }}
                                                    >
                                                      <Row>
                                                        <CardTitle tag="h5">
                                                          People
                                                        </CardTitle>
                                                      </Row>
                                                      <Row
                                                        style={{
                                                          display: "flex",
                                                          justifyContent:
                                                            "flex-end",
                                                        }}
                                                      >
                                                        <Row>
                                                          <div className="d-flex justify-content-end">
                                                            {btnRows?.map(
                                                              (item, idx) => (
                                                                <Button
                                                                  type="button"
                                                                  color="buttonColor"
                                                                  outline={
                                                                    step === idx
                                                                      ? false
                                                                      : true
                                                                  }
                                                                  key={idx}
                                                                  className="m-1 btn-sm p-2"
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
                                                                          .contacts[
                                                                          idx
                                                                        ]
                                                                          .deleted
                                                                          ? "line-through"
                                                                          : "none",
                                                                    }}
                                                                    title={
                                                                      state
                                                                        .contacts[
                                                                        idx
                                                                      ]
                                                                        .first_name ||
                                                                        state
                                                                          .contacts[
                                                                          idx
                                                                        ]
                                                                          .last_name ||
                                                                        state
                                                                          .contacts[
                                                                          idx
                                                                        ]
                                                                          .company_name
                                                                        ? state
                                                                          .contacts[
                                                                          idx
                                                                        ]
                                                                          .reference
                                                                        : "New Person"
                                                                    }
                                                                  >
                                                                    {idx ===
                                                                      0 && (
                                                                        <i className="fas fa-star"></i>
                                                                      )}{" "}
                                                                    {state
                                                                      .contacts[
                                                                      idx
                                                                    ]
                                                                      .first_name ||
                                                                      state
                                                                        .contacts[
                                                                        idx
                                                                      ]
                                                                        .last_name ||
                                                                      state
                                                                        .contacts[
                                                                        idx
                                                                      ]
                                                                        .company_name
                                                                      ? state
                                                                        .contacts[
                                                                        idx
                                                                      ]
                                                                        .reference
                                                                        .length <=
                                                                        12
                                                                        ? state
                                                                          .contacts[
                                                                          idx
                                                                        ]
                                                                          .reference
                                                                        : state.contacts[
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
                                                            <Button
                                                              color="buttonColor"
                                                              className="m-1 btn-sm p-2"
                                                              onClick={
                                                                handleBtnRows
                                                              }
                                                              disabled={
                                                                btnRows.length >
                                                                  9
                                                                  ? true
                                                                  : false
                                                              }
                                                            >
                                                              Add
                                                            </Button>
                                                          </div>
                                                        </Row>
                                                      </Row>
                                                      {state?.contacts?.map(
                                                        (item, idx) => {
                                                          console.log(
                                                            "checking"
                                                          );
                                                          return (
                                                            <div
                                                              key={idx}
                                                              style={
                                                                activeState ===
                                                                  idx
                                                                  ? {
                                                                    display:
                                                                      "block",
                                                                  }
                                                                  : {
                                                                    display:
                                                                      "none",
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
                                                                forCheck={
                                                                  forCheck
                                                                }
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
                                                                  state
                                                                    .contacts[
                                                                  idx
                                                                  ]
                                                                }
                                                                countDelete={
                                                                  countDelete
                                                                }
                                                                checkHandler={
                                                                  checkHandler
                                                                }
                                                                physicalAddress={
                                                                  physicalAddress[
                                                                  idx
                                                                  ]
                                                                }
                                                                postalAddress={
                                                                  postalAddress[
                                                                  idx
                                                                  ]
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

                                            <Card
                                              style={{
                                                borderRadius: "15px",
                                                backgroundColor: "#F2F6FA",
                                                border: "8px solid white",
                                              }}
                                            >
                                              <Col md={9}>
                                                <Row className="d-flex justify-content-start px-3">
                                                  <Col
                                                    md={1}
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
                                                  <Col md={11}>
                                                    <CardBody
                                                      style={{
                                                        paddingLeft: "0px",
                                                      }}
                                                    >
                                                      <CardTitle tag="h5">
                                                        Commercial
                                                      </CardTitle>

                                                      <div className="my-3">
                                                        <Row className="d-flex justify-content-evenly align-items-center">
                                                          <Col md={12}>
                                                            <div className="form-group-new">
                                                              <Field
                                                                name="abn"
                                                                type="text"
                                                                value={
                                                                  state.abn
                                                                }
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
                                                                style={{
                                                                  backgroundColor:
                                                                    "#F2F6FA",
                                                                }}
                                                              />
                                                              <label htmlFor="usr">
                                                                ABN
                                                              </label>
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

                                            <Card
                                              style={{
                                                borderRadius: "15px",
                                                backgroundColor: "#F2F6FA",
                                                border: "8px solid white",
                                              }}
                                            >
                                              <Col md={7}>
                                                <Row className="d-flex justify-content-start px-3">
                                                  <Col
                                                    md={1}
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
                                                  <Col md={11}>
                                                    <CardBody
                                                      style={{
                                                        paddingLeft: "0px",
                                                      }}
                                                    >
                                                      <CardTitle tag="h5">
                                                        Tenant Contact
                                                      </CardTitle>

                                                      <div className="my-3">
                                                        <Row className="d-flex justify-content-evenly align-items-center">
                                                          <Col md={12}>
                                                            <div className="form-group-new">
                                                              <Field
                                                                name="notes"
                                                                type="text"
                                                                value={
                                                                  state.notes
                                                                }
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
                                                                style={{
                                                                  backgroundColor:
                                                                    "#F2F6FA",
                                                                }}
                                                              />
                                                              <label htmlFor="usr">
                                                                Notes
                                                              </label>
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
                                      <div>
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
                                            bank_reterence:
                                              (state2 &&
                                                state2.bank_reterence) ||
                                              "",
                                            receipt_warning:
                                              (state2 &&
                                                state2.receipt_warning) ||
                                              "",
                                            break_lease:
                                              (state2 && state2.break_lease) ||
                                              "",
                                            termination:
                                              (state2 && state2.termination) ||
                                              "",
                                            bond_notes:
                                              (state2 && state2.bond_notes) ||
                                              "",
                                            check: checkState ? checkState : [],
                                          }}
                                          validationSchema={Yup.object().shape({
                                            rent: Yup.string().required(
                                              "Please Enter Rent"
                                            ),
                                          })}
                                          onSubmit={(values, onSubmitProps) => {
                                            // props.editPropertyTanent(
                                            //   state,
                                            //   values,
                                            //   formTwoButtonValue,
                                            //   id,
                                            //   postalAddressState,
                                            //   physicalAddressState,
                                            //   checkState,
                                            //   phone,
                                            //   postalAddress,
                                            //   physicalAddress
                                            // );
                                            // props.addPropertyTanent(state, values, formTwoButtonValue, id);
                                            // props.TenantInfoFresh();
                                          }}
                                        >
                                          {({ errors, status, touched }) => (
                                            <div style={{ marginTop: "-30px" }}>
                                              <Form
                                                className="form-horizontal"
                                                id="tenant-form-2"
                                              >
                                                <div>
                                                  <div className="mb-3">
                                                    <Card
                                                      className="custom_card_border_design me-2"
                                                    >
                                                      <Col md={12}>
                                                        <Row className="d-flex justify-content-start px-3">
                                                          <Col
                                                            xs={2}
                                                            sm={3}
                                                            md={1}
                                                            lg={1}
                                                            style={{
                                                              textAlign:
                                                                "center",
                                                              justifyContent:
                                                                "center",
                                                              padding: "0px",
                                                            }}
                                                          >
                                                            <div
                                                              style={{
                                                                marginTop:
                                                                  "15px",
                                                                display: "flex",
                                                                flexDirection:
                                                                  "column",
                                                                position:
                                                                  "absolute",
                                                                left: "15px",
                                                              }}
                                                            >
                                                              <i
                                                                className="far fa-user-circle ms-1"
                                                                style={{
                                                                  fontSize:
                                                                    "30px",
                                                                }}
                                                              />

                                                              <div
                                                                className="vr"
                                                                style={{
                                                                  width: "3px",
                                                                  height:
                                                                    "600px",
                                                                  position:
                                                                    "absolute",
                                                                  left: "17px",
                                                                  top: "28px",
                                                                  background:
                                                                    "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)",
                                                                }}
                                                              ></div>
                                                            </div>
                                                          </Col>
                                                          <Col xs={10} sm={9} md={11} lg={11}>
                                                            <CardBody
                                                              style={{
                                                                paddingLeft:
                                                                  "0px",
                                                              }}
                                                            >
                                                              <CardTitle
                                                                tag="h5"
                                                                style={{
                                                                  marginBottom:
                                                                    "40px",
                                                                }}
                                                              >
                                                                Edit Tenant
                                                                Folio
                                                              </CardTitle>

                                                              <div>
                                                                <Row className="d-flex justify-content-evenly align-items-center">
                                                                  <Col
                                                                    md={4}
                                                                  ></Col>
                                                                  <Col md={12}>
                                                                    <Row>
                                                                      <Col
                                                                        md={4}
                                                                        className="d-flex gap-2"
                                                                      >
                                                                        <span className="input-group-append rounded-start">
                                                                          <span
                                                                            className="input-group-text"
                                                                            style={{
                                                                              // borderTopRightRadius: 0,
                                                                              borderRadius:
                                                                                "4px",
                                                                            }}
                                                                          >
                                                                            $
                                                                          </span>
                                                                        </span>
                                                                        <div className="d-flex flex-column">
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
                                                                                // borderTopLeftRadius: 0,
                                                                                borderRadius:
                                                                                  "4px",
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
                                                                              disabled={
                                                                                true
                                                                              }
                                                                            />
                                                                            <label htmlFor="usr">
                                                                              Rent
                                                                            </label>
                                                                          </div>
                                                                          <ErrorMessage
                                                                            name="rent"
                                                                            component="div"
                                                                            className="invalid-feedback"
                                                                          />
                                                                        </div>
                                                                      </Col>
                                                                      <Col
                                                                        md={3}
                                                                      >
                                                                        <div className="btn-group btn-group-justified align-items-left">
                                                                          {inspectionWeeklylyBtn && (
                                                                            <div className="btn-group">
                                                                              <Button
                                                                                className="btn"
                                                                                disabled={
                                                                                  true
                                                                                }
                                                                                color={
                                                                                  inspectionWeeklylyBtn
                                                                                    ? "switchButtonColor"
                                                                                    : "switchButtonOppsiteColor"
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
                                                                          )}
                                                                          {inspectionfortnightlyBtn && (
                                                                            <div className="btn-group">
                                                                              <Button
                                                                                className="btn"
                                                                                disabled={
                                                                                  true
                                                                                }
                                                                                color={
                                                                                  inspectionfortnightlyBtn
                                                                                    ? "switchButtonColor"
                                                                                    : "switchButtonOppsiteColor"
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
                                                                          )}
                                                                          {inspectionMonthlyBtn && (
                                                                            <div className="btn-group">
                                                                              <Button
                                                                                className="btn"
                                                                                disabled={
                                                                                  true
                                                                                }
                                                                                color={
                                                                                  inspectionMonthlyBtn
                                                                                    ? "switchButtonColor"
                                                                                    : "switchButtonOppsiteColor"
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
                                                                          )}
                                                                        </div>
                                                                      </Col>
                                                                      <Col
                                                                        md={5}
                                                                        className="d-flex align-items-left"
                                                                      >
                                                                        <div
                                                                          onClick={
                                                                            toggleAdjustRent
                                                                          }
                                                                          className="text-primary hoverBondDetails"
                                                                        >
                                                                          Adjust
                                                                          Rent{" "}
                                                                          <i className="fas fa-pen"></i>
                                                                        </div>
                                                                        {toggleState && (
                                                                          <TenantAdjustrent
                                                                            cid={
                                                                              props
                                                                                .tenant_info_data
                                                                                ?.data
                                                                                ?.data
                                                                                ?.id
                                                                            }
                                                                            conid={
                                                                              props
                                                                                .tenant_info_data
                                                                                ?.data
                                                                                ?.data
                                                                                ?.contact_id
                                                                            }
                                                                            propID={
                                                                              props
                                                                                .tenant_info_data
                                                                                ?.data
                                                                                ?.data
                                                                                ?.property_id
                                                                            }
                                                                            toggleState={
                                                                              toggleState
                                                                            }
                                                                            toggleAdjustRent={
                                                                              toggleAdjustRent
                                                                            }
                                                                            state={
                                                                              state
                                                                            }
                                                                            state2={
                                                                              state2
                                                                            }
                                                                            handlePropertyFormTwoValues={
                                                                              handlePropertyFormTwoValues
                                                                            }
                                                                            handlePropertyFormBond={
                                                                              handlePropertyFormBond
                                                                            }
                                                                          />
                                                                        )}
                                                                      </Col>
                                                                    </Row>
                                                                  </Col>
                                                                </Row>
                                                              </div>
                                                              <Row
                                                                style={{
                                                                  marginBottom:
                                                                    "40px",
                                                                }}
                                                              >
                                                                <Col md={4}>
                                                                  <Label
                                                                    for="routine_inspections_frequency"
                                                                    className="form-label"
                                                                  >
                                                                    Rent
                                                                    includes tax
                                                                  </Label>
                                                                </Col>
                                                                <Col md={7}>
                                                                  <div className="btn-group btn-group-justified">
                                                                    <div className="btn-group">
                                                                      <Button
                                                                        className="btn"
                                                                        color={
                                                                          inspectionIncludeTaxBtn
                                                                            ? "switchButtonColor"
                                                                            : "switchButtonOppsiteColor"
                                                                        }
                                                                        onClick={
                                                                          toggleInspectionIncludeTaxBtn
                                                                        }
                                                                        style={{
                                                                          border:
                                                                            "1px solid #BCBEBE",
                                                                        }}
                                                                      >
                                                                        {inspectionIncludeTaxBtn && (
                                                                          <i className="bx bx-comment-check"></i>
                                                                        )}
                                                                        <span>
                                                                          {" "}
                                                                          Include
                                                                          Tax
                                                                        </span>
                                                                      </Button>
                                                                    </div>

                                                                    <div className="btn-group">
                                                                      <Button
                                                                        className="btn"
                                                                        color={
                                                                          inspectionExcludeTaxBtn
                                                                            ? "switchButtonColor"
                                                                            : "switchButtonOppsiteColor"
                                                                        }
                                                                        onClick={
                                                                          toggleInspectionExcludeTaxBtn
                                                                        }
                                                                        style={{
                                                                          border:
                                                                            "1px solid #BCBEBE",
                                                                        }}
                                                                      >
                                                                        {inspectionExcludeTaxBtn && (
                                                                          <i className="bx bx-comment-check"></i>
                                                                        )}
                                                                        <span>
                                                                          {" "}
                                                                          Exclude
                                                                          Tax
                                                                        </span>
                                                                      </Button>
                                                                    </div>
                                                                  </div>
                                                                </Col>
                                                              </Row>

                                                              <div
                                                                className="mt-3"
                                                                style={{
                                                                  marginTop:
                                                                    "20px",
                                                                }}
                                                              >
                                                                <Row className="d-flex justify-content-evenly align-items-center mt-3">
                                                                  {/* <Col md={4}>
                                                                    <Label
                                                                      for="bond_required"
                                                                      className="form-label"
                                                                    >
                                                                      Bond required
                                                                    </Label>
                                                                  </Col> */}

                                                                  <Col
                                                                    md={4}
                                                                    className="d-flex gap-2"
                                                                  >
                                                                    <span className="input-group-append">
                                                                      <span
                                                                        className="input-group-text"
                                                                        style={{
                                                                          borderTopRightRadius: 0,
                                                                          borderBottomRightRadius: 0,
                                                                        }}
                                                                      >
                                                                        $
                                                                      </span>
                                                                    </span>
                                                                    {/* <div className="d-flex flex-column"> */}
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
                                                                          backgroundColor:
                                                                            "#F2F6FA",
                                                                        }}
                                                                        value={
                                                                          state2.bond_required
                                                                        }
                                                                        onChange={
                                                                          handlePropertyFormBond
                                                                        }
                                                                      />
                                                                      <label htmlFor="usr">
                                                                        Bond
                                                                        required
                                                                      </label>
                                                                    </div>
                                                                    <ErrorMessage
                                                                      name="bond_required"
                                                                      component="div"
                                                                      className="invalid-feedback"
                                                                    />
                                                                  </Col>
                                                                  {/* <Col
                                                                    md={3}
                                                                    className="d-flex align-items-center"
                                                                  >
                                                                    
                                                                  </Col> */}

                                                                  <Col
                                                                    md={4}
                                                                    className="d-flex gap-2"
                                                                  >
                                                                    <span className="input-group-append">
                                                                      <span
                                                                        className="input-group-text"
                                                                        style={{
                                                                          borderTopRightRadius: 0,
                                                                          borderBottomRightRadius: 0,
                                                                        }}
                                                                      >
                                                                        $
                                                                      </span>
                                                                    </span>
                                                                    {/* <div className="d-flex flex-column"> */}
                                                                    <div className="form-group-new">
                                                                      <Field
                                                                        disabled={
                                                                          true
                                                                        }
                                                                        name="bond_required"
                                                                        id="bond_required"
                                                                        type="text"
                                                                        placeholder="0.00"
                                                                        className={
                                                                          "form-control" +
                                                                          (errors.bond_receipted &&
                                                                            touched.bond_receipted
                                                                            ? " is-invalid"
                                                                            : "")
                                                                        }
                                                                        style={{
                                                                          borderTopLeftRadius: 0,
                                                                          borderBottomLeftRadius: 0,
                                                                        }}
                                                                        value={
                                                                          state2.bond_receipted
                                                                        }
                                                                        onChange={
                                                                          handlePropertyFormBond
                                                                        }
                                                                      />
                                                                      <label htmlFor="usr">
                                                                        {" "}
                                                                        Bond
                                                                        receipted
                                                                      </label>
                                                                    </div>
                                                                    <ErrorMessage
                                                                      name="bond_receipted"
                                                                      component="div"
                                                                      className="invalid-feedback"
                                                                    />
                                                                  </Col>

                                                                  <Col
                                                                    md={4}
                                                                    className="d-flex gap-2"
                                                                  >
                                                                    <span className="input-group-append rounded-start">
                                                                      <span
                                                                        className="input-group-text"
                                                                        style={{
                                                                          borderTopRightRadius: 0,
                                                                          borderBottomRightRadius: 0,
                                                                        }}
                                                                      >
                                                                        $
                                                                      </span>
                                                                    </span>
                                                                    <div className="d-flex flex-column">
                                                                      <div className="form-group-new">
                                                                        <Field
                                                                          name="bond_held"
                                                                          type="text"
                                                                          id="bond_held"
                                                                          disabled={
                                                                            true
                                                                          }
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
                                                                        <label htmlFor="usr">
                                                                          {" "}
                                                                          Bond
                                                                          held
                                                                        </label>
                                                                      </div>
                                                                      <ErrorMessage
                                                                        name="bond_held"
                                                                        component="div"
                                                                        className="invalid-feedback"
                                                                      />
                                                                    </div>
                                                                  </Col>
                                                                </Row>
                                                              </div>

                                                              <div className="my-3">
                                                                <Row className="mb-3">
                                                                  <Col md={4}>
                                                                    <div className="form-group-new">
                                                                      <Flatpickr
                                                                        className="form-control d-block "
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

                                                                      <label htmlFor="usr">
                                                                        {" "}
                                                                        Move in
                                                                      </label>
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

                                                                      <label htmlFor="usr">
                                                                        {" "}
                                                                        Move out
                                                                      </label>
                                                                    </div>
                                                                    <ErrorMessage
                                                                      name="move_out"
                                                                      component="div"
                                                                      className="invalid-feedback"
                                                                    />
                                                                  </Col>

                                                                  <Col
                                                                    md={4}
                                                                    className="d-flex align-items-center"
                                                                    style={{
                                                                      marginTop:
                                                                        "-30px",
                                                                    }}
                                                                  >
                                                                    <TenantMoveOutDetails
                                                                      state2={
                                                                        state2
                                                                      }
                                                                      setState2={
                                                                        setState2
                                                                      }
                                                                      moveOutShow={
                                                                        moveOutShow
                                                                      }
                                                                      toggle={
                                                                        toggleMoveOutShow
                                                                      }
                                                                      handlePropertyFormTwoValues={
                                                                        handlePropertyFormTwoValues
                                                                      }
                                                                    />
                                                                  </Col>
                                                                </Row>

                                                                {showTransactionsAlert && (
                                                                  <div className="w-75 my-1 bg-danger">
                                                                    {props
                                                                      .tenant_move_out_data
                                                                      ?.due ==
                                                                      null && (
                                                                        <UncontrolledAlert
                                                                          color="danger"
                                                                          role="alert"
                                                                        >
                                                                          No
                                                                          Transaction
                                                                          Made
                                                                        </UncontrolledAlert>
                                                                      )}
                                                                    {props
                                                                      .tenant_move_out_data
                                                                      ?.due >
                                                                      0 && (
                                                                        <UncontrolledAlert
                                                                          color="danger"
                                                                          role="alert"
                                                                        >
                                                                          Tenant
                                                                          has due
                                                                          of $
                                                                          {
                                                                            props
                                                                              .tenant_move_out_data
                                                                              ?.due
                                                                          }
                                                                        </UncontrolledAlert>
                                                                      )}
                                                                  </div>
                                                                )}

                                                                <Row className="mb-3">
                                                                  <Col md={3}>
                                                                    <div className="form-group-new">
                                                                      <Flatpickr
                                                                        className="form-control d-block"
                                                                        placeholder="Pick a date..."
                                                                        value={
                                                                          state2.agreement_start
                                                                        }
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
                                                                      <label htmlFor="usr">
                                                                        {" "}
                                                                        Agreement
                                                                        Start
                                                                      </label>
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
                                                                        // disabled={disabledState}
                                                                        // onChange={() => dateHandler()}
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
                                                                      <label htmlFor="usr">
                                                                        {" "}
                                                                        Agreement
                                                                        End
                                                                      </label>
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
                                                                      <label htmlFor="usr">
                                                                        {" "}
                                                                        Paid to
                                                                      </label>
                                                                    </div>
                                                                    <ErrorMessage
                                                                      name="paid_to"
                                                                      component="div"
                                                                      className="invalid-feedback"
                                                                    />
                                                                  </Col>

                                                                  <Col
                                                                    md={3}
                                                                    className="d-flex gap-2"
                                                                  >
                                                                    <span className="input-group-append">
                                                                      <span
                                                                        className="input-group-text"
                                                                        style={{
                                                                          borderTopRightRadius: 0,
                                                                          borderBottomRightRadius: 0,
                                                                        }}
                                                                      >
                                                                        $
                                                                      </span>
                                                                    </span>
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
                                                                      <label htmlFor="usr">
                                                                        {" "}
                                                                        Part
                                                                        paid
                                                                      </label>
                                                                    </div>
                                                                    <ErrorMessage
                                                                      name="part_paid"
                                                                      component="div"
                                                                      className="invalid-feedback"
                                                                    />
                                                                  </Col>
                                                                </Row>
                                                                <Row className="mb-3">
                                                                  <Col md={3}>
                                                                    <Label
                                                                      for="routine_inspections_frequency"
                                                                      className="form-label"
                                                                    >
                                                                      Periodic
                                                                      tenancy
                                                                    </Label>
                                                                  </Col>
                                                                  <Col md={9}>
                                                                    <div className="btn-group btn-group-justified">
                                                                      <div className="btn-group">
                                                                        <Button
                                                                          className="btn"
                                                                          color={
                                                                            inspectionPeriodicYesBtn
                                                                              ? "switchButtonColor"
                                                                              : "switchButtonOppsiteColor"
                                                                          }
                                                                          onClick={
                                                                            toggleInspectionPeriodicYesBtn
                                                                          }
                                                                          style={{
                                                                            border:
                                                                              "1px solid #BCBEBE",
                                                                          }}
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
                                                                          className="btn"
                                                                          color={
                                                                            inspectionPeriodicNoBtn
                                                                              ? "switchButtonColor"
                                                                              : "switchButtonOppsiteColor"
                                                                          }
                                                                          onClick={
                                                                            toggleInspectionPeriodicNoBtn
                                                                          }
                                                                          style={{
                                                                            border:
                                                                              "1px solid #BCBEBE",
                                                                          }}
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
                                                                </Row>
                                                              </div>

                                                              <div className="my-3">
                                                                <Row className="mb-3">
                                                                  <Col md={3}>
                                                                    <Label
                                                                      for="routine_inspections_frequency"
                                                                      className="form-label"
                                                                    >
                                                                      Rent
                                                                      invoices
                                                                    </Label>
                                                                  </Col>
                                                                  <Col md={9}>
                                                                    <div className="btn-group btn-group-justified">
                                                                      <div className="btn-group">
                                                                        <Button
                                                                          className="btn"
                                                                          color={
                                                                            inspectionRentEnableBtn
                                                                              ? "switchButtonColor"
                                                                              : "switchButtonOppsiteColor"
                                                                          }
                                                                          onClick={
                                                                            toggleInspectionRentEnableBtn
                                                                          }
                                                                          style={{
                                                                            border:
                                                                              "1px solid #BCBEBE",
                                                                          }}
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
                                                                          className="btn"
                                                                          color={
                                                                            inspectionRentDisableBtn
                                                                              ? "switchButtonColor"
                                                                              : "switchButtonOppsiteColor"
                                                                          }
                                                                          onClick={
                                                                            toggleInspectionRentDisableBtn
                                                                          }
                                                                          style={{
                                                                            border:
                                                                              "1px solid #BCBEBE",
                                                                          }}
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
                                                                {formTwoButtonValue.rentInvoiceBtn ==
                                                                  1 && (
                                                                    <Row className="mb-3">
                                                                      <Col md={4}>
                                                                        <Label
                                                                          for="invoice_days_in_advance"
                                                                          className="form-label"
                                                                        >
                                                                          Invoice
                                                                          days in
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
                                                                      <Col
                                                                        md={4}
                                                                      ></Col>
                                                                    </Row>
                                                                  )}

                                                                <Row
                                                                  className="mb-3"
                                                                  style={{
                                                                    marginTop:
                                                                      "30px",
                                                                  }}
                                                                >
                                                                  <Col
                                                                    md={6}
                                                                    style={{
                                                                      display:
                                                                        "flex",
                                                                      justifyContent:
                                                                        "space-between",
                                                                    }}
                                                                  >
                                                                    <Col
                                                                      md={10}
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
                                                                        <label htmlFor="usr">
                                                                          {" "}
                                                                          Rent
                                                                          review
                                                                          frequency
                                                                        </label>
                                                                      </div>
                                                                      <ErrorMessage
                                                                        name="rent_review_frequency"
                                                                        component="div"
                                                                        className="invalid-feedback"
                                                                      />
                                                                    </Col>

                                                                    <Col
                                                                      md={2}
                                                                      style={{
                                                                        display:
                                                                          "flex",
                                                                        marginTop:
                                                                          "10px",
                                                                      }}
                                                                    >
                                                                      <span className="ms-2 text-secondary">
                                                                        Months
                                                                      </span>
                                                                    </Col>
                                                                  </Col>

                                                                  <Col md={6}>
                                                                    <div className="form-group-new">
                                                                      <Flatpickr
                                                                        className="form-control d-block"
                                                                        placeholder="Pick a date..."
                                                                        value={
                                                                          state2.next_rent_review
                                                                        }
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
                                                                      <label htmlFor="usr">
                                                                        {" "}
                                                                        Next
                                                                        rent
                                                                        review
                                                                      </label>
                                                                    </div>
                                                                    <ErrorMessage
                                                                      name="next_rent_review"
                                                                      component="div"
                                                                      className="invalid-feedback"
                                                                    />
                                                                  </Col>
                                                                </Row>

                                                                <Row className="mb-3">
                                                                  <Col md={3}>
                                                                    <Label
                                                                      for="routine_inspections_frequency"
                                                                      className="form-label"
                                                                    >
                                                                      Exclude
                                                                      from
                                                                      arrears
                                                                      automation?
                                                                    </Label>
                                                                  </Col>
                                                                  <Col md={9}>
                                                                    <div className="btn-group btn-group-justified">
                                                                      <div className="btn-group">
                                                                        <Button
                                                                          className="btn"
                                                                          color={
                                                                            inspectionAreaAutomationYesBtn
                                                                              ? "switchButtonColor"
                                                                              : "switchButtonOppsiteColor"
                                                                          }
                                                                          onClick={
                                                                            toggleInspectionAreaAutomationYesBtn
                                                                          }
                                                                          style={{
                                                                            border:
                                                                              "1px solid #BCBEBE",
                                                                          }}
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
                                                                          className="btn"
                                                                          color={
                                                                            inspectionAreaAutomationNoBtn
                                                                              ? "switchButtonColor"
                                                                              : "switchButtonOppsiteColor"
                                                                          }
                                                                          onClick={
                                                                            toggleInspectionAreaAutomationNoBtn
                                                                          }
                                                                          style={{
                                                                            border:
                                                                              "1px solid #BCBEBE",
                                                                          }}
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
                                                                  <Col
                                                                    md={4}
                                                                  ></Col>
                                                                </Row>
                                                              </div>
                                                            </CardBody>
                                                          </Col>
                                                        </Row>
                                                      </Col>
                                                    </Card>

                                                    <Card
                                                      style={{
                                                        borderRadius: "15px",
                                                        backgroundColor:
                                                          "#F2F6FA",
                                                        border:
                                                          "8px solid white",
                                                      }}
                                                    >
                                                      <Col md={12}>
                                                        <Row className="d-flex justify-content-start px-3">
                                                          <Col
                                                            xs={2}
                                                            sm={3}
                                                            md={1}
                                                            lg={1}
                                                            style={{
                                                              textAlign:
                                                                "center",
                                                              justifyContent:
                                                                "center",
                                                              padding: "0px",
                                                            }}
                                                          >
                                                            <div
                                                              style={{
                                                                marginTop:
                                                                  "15px",
                                                                display: "flex",
                                                                flexDirection:
                                                                  "column",
                                                                position:
                                                                  "absolute",
                                                                left: "15px",
                                                              }}
                                                            >
                                                              <i
                                                                className="far fa-user-circle ms-1"
                                                                style={{
                                                                  fontSize:
                                                                    "30px",
                                                                }}
                                                              />

                                                              <div
                                                                className="vr"
                                                                style={{
                                                                  width: "3px",
                                                                  height:
                                                                    "150px",
                                                                  position:
                                                                    "absolute",
                                                                  left: "17px",
                                                                  top: "28px",
                                                                  background:
                                                                    "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)",
                                                                }}
                                                              ></div>
                                                            </div>
                                                          </Col>
                                                          <Col xs={10} sm={9} md={11} lg={11}>
                                                            <CardBody
                                                              style={{
                                                                paddingLeft:
                                                                  "0px",
                                                              }}
                                                            >
                                                              <CardTitle tag="h5">
                                                                Options
                                                              </CardTitle>

                                                              <div className="my-3">
                                                                <Row>
                                                                  <Col md={6}>
                                                                    <div className="form-group-new">
                                                                      <Field
                                                                        name="bank_reterence"
                                                                        type="text"
                                                                        value={
                                                                          state2.bank_reterence
                                                                        }
                                                                        className={
                                                                          "form-control" +
                                                                          (errors.bank_reterence &&
                                                                            touched.bank_reterence
                                                                            ? " is-invalid"
                                                                            : "")
                                                                        }
                                                                        onChange={
                                                                          handlePropertyFormTwoValues
                                                                        }
                                                                      />
                                                                      <label htmlFor="usr">
                                                                        Bank
                                                                        reference
                                                                      </label>
                                                                    </div>
                                                                    <ErrorMessage
                                                                      name="bank_reterence"
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
                                                                      <label htmlFor="usr">
                                                                        Receipt
                                                                        warning
                                                                      </label>
                                                                    </div>
                                                                    <ErrorMessage
                                                                      name="receipt_warning"
                                                                      component="div"
                                                                      className="invalid-feedback"
                                                                    />
                                                                  </Col>
                                                                </Row>
                                                              </div>

                                                              <Row className="mb-3 justify-content-evenly align-items-start">
                                                                <Col md={4}>
                                                                  <Label
                                                                    for="building"
                                                                    className="form-label"
                                                                  >
                                                                    Tenant
                                                                    Access
                                                                  </Label>
                                                                </Col>

                                                                <Col md={8}>
                                                                  <Row className="d-flex">
                                                                    <Col>
                                                                      <div className="btn-group btn-group-justified">
                                                                        <div className="btn-group">
                                                                          <Button
                                                                            className="d-flex align-items-center btn"
                                                                            color={
                                                                              inspectionDisableBtn
                                                                                ? "switchButtonColor"
                                                                                : "switchButtonOppsiteColor"
                                                                            }
                                                                            onClick={
                                                                              toggleInspectionDisableBtn
                                                                            }
                                                                            style={{
                                                                              border:
                                                                                "1px solid #BCBEBE",
                                                                            }}
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
                                                                            className="d-flex align-items-center btn"
                                                                            color={
                                                                              inspectionEnableBtn
                                                                                ? "switchButtonColor"
                                                                                : "switchButtonOppsiteColor"
                                                                            }
                                                                            onClick={
                                                                              toggleInspectionEnableBtn
                                                                            }
                                                                            style={{
                                                                              border:
                                                                                "1px solid #BCBEBE",
                                                                            }}
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
                                                                <Col
                                                                  md={4}
                                                                ></Col>
                                                              </Row>
                                                            </CardBody>
                                                          </Col>
                                                        </Row>
                                                      </Col>
                                                    </Card>
                                                  </div>
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
                          </Col>
                        </Row>
                      </div>
                    </TabPane>
                    <TabPane tabId={3}>
                      <Row>
                        <Col xs="12">
                          <div>
                            <div>
                              <form
                                className="repeater mt-3"
                                id="tenant-form-3"
                                encType="multipart/form-data"
                                onSubmit={handleRowResult2}
                              >
                                <table style={{ width: "100%" }}>
                                  <tbody>
                                    {/* {accErr && <p>Alert</p>} */}
                                    <Card
                                      style={{
                                        borderRadius: "15px",
                                        backgroundColor: "#F2F6FA",
                                        border: "8px solid white",

                                        marginTop: "-40px",
                                      }}
                                    >
                                      <CardBody>
                                        {rows5.map((item, idx) => (
                                          <Row id={"addr" + idx} key={idx}>
                                            <Col lg="2" className="mb-3">
                                              <label htmlFor="name">
                                                Method
                                              </label>
                                              <div>
                                                <div className="mb-3 select2-container">
                                                  <Select
                                                    value={
                                                      state8[idx][
                                                      "selectedValues"
                                                      ]
                                                    }
                                                    onChange={e =>
                                                      handleChangeInput3(
                                                        idx,
                                                        e,
                                                        "method"
                                                      )
                                                    }
                                                    options={optionGroup8}
                                                    classNamePrefix="select2-selection"
                                                  />
                                                </div>
                                              </div>
                                            </Col>
                                            <Col lg="2" className="mb-3">
                                              <label htmlFor="payee">
                                                Payee
                                              </label>

                                              {state8[idx]["payeeType"] ===
                                                true ? (
                                                <input
                                                  name="payee"
                                                  type="text"
                                                  className={"form-control"}
                                                  onChange={e =>
                                                    handlePropertyFormValues8(
                                                      idx,
                                                      e
                                                    )
                                                  }
                                                  value={state8[idx]["payee"]}
                                                />
                                              ) : null}
                                            </Col>
                                            <Col lg="2" className="mb-3">
                                              <label htmlFor="bsb">BSB</label>
                                              {state8[idx]["bsbType"] ===
                                                true ? (
                                                <input
                                                  name="bsb"
                                                  type="text"
                                                  maxLength="6"
                                                  className={"form-control"}
                                                  onChange={e =>
                                                    handlePropertyFormValues8(
                                                      idx,
                                                      e
                                                    )
                                                  }
                                                  value={state8[idx]["bsb"]}
                                                />
                                              ) : null}
                                            </Col>

                                            <Col lg="2" className="mb-3">
                                              <label htmlFor="account">
                                                Account #
                                              </label>

                                              {state8[idx]["accountType"] ===
                                                true ? (
                                                <input
                                                  name="account"
                                                  type="text"
                                                  className={"form-control"}
                                                  onChange={e =>
                                                    handlePropertyFormValues8(
                                                      idx,
                                                      e
                                                    )
                                                  }
                                                  value={state8[idx]["account"]}
                                                />
                                              ) : null}
                                            </Col>

                                            <Col
                                              lg="2"
                                              className="mb-3 d-flex flex-column align-items-center"
                                            >
                                              <label htmlFor="split">
                                                Split
                                              </label>

                                              <Row className="d-flex flex-column">
                                                <Col className="d-flex">
                                                  {state8[idx][
                                                    "split_type_boolean"
                                                  ] === true ? (
                                                    <div className="btn-group btn-group-sm me-1">
                                                      <Button
                                                        className="d-flex align-items-center"
                                                        color={
                                                          state8[idx][
                                                            "split_type"
                                                          ] === "$"
                                                            ? "secondary"
                                                            : "light"
                                                        }
                                                        onClick={() =>
                                                          toggleDollorBtn(idx)
                                                        }
                                                      >
                                                        <span> $</span>
                                                      </Button>
                                                      <Button
                                                        className="d-flex align-items-center"
                                                        color={
                                                          state8[idx][
                                                            "split_type"
                                                          ] === "%"
                                                            ? "secondary"
                                                            : "light"
                                                        }
                                                        onClick={() =>
                                                          togglePercentBtn(idx)
                                                        }
                                                      >
                                                        <span> %</span>
                                                      </Button>
                                                    </div>
                                                  ) : null}

                                                  {state8[idx]["split_type"] ===
                                                    "$" && (
                                                      <span className="input-group-append rounded-start">
                                                        <span
                                                          className="input-group-text"
                                                          style={{
                                                            borderTopRightRadius: 0,
                                                            borderBottomRightRadius: 0,
                                                          }}
                                                        >
                                                          $
                                                        </span>
                                                      </span>
                                                    )}
                                                  <input
                                                    name="split"
                                                    type="text"
                                                    className={"form-control"}
                                                    onFocus={handleFocus}
                                                    onBlur={handleFocusOut}
                                                    value={state8[idx]["split"]}
                                                    placeholder="0.00"
                                                    onChange={e =>
                                                      handlePropertyFormValues8(
                                                        idx,
                                                        e
                                                      )
                                                    }
                                                    disabled={
                                                      !state8[idx][
                                                      "split_type_boolean"
                                                      ]
                                                    }
                                                  />
                                                  {state8[idx]["split_type"] ===
                                                    "%" && (
                                                      <span className="input-group-append">
                                                        <span
                                                          className="input-group-text"
                                                          style={{
                                                            borderTopLeftRadius: 0,
                                                            borderBottomLeftRadius: 0,
                                                          }}
                                                        >
                                                          %
                                                        </span>
                                                      </span>
                                                    )}
                                                </Col>
                                              </Row>
                                            </Col>
                                            <Col
                                              lg="2"
                                              className="form-group align-self-center d-flex justify-content-end"
                                            >
                                              <Button
                                                onClick={e =>
                                                  handleRemoveRow8(e, idx)
                                                }
                                                color="danger"
                                              >
                                                Remove
                                              </Button>
                                            </Col>
                                            {state8[idx]["errorState"] ? (
                                              <div className="d-flex align-items-start text-warning">
                                                <i className="fas fa-exclamation-triangle me-1"></i>
                                                <p>{state8[idx]["error"]}</p>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </Row>
                                        ))}

                                        <div className="d-flex justify-content-center">
                                          {" "}
                                          <Button
                                            onClick={handleAddRow8}
                                            color="buttonColor"
                                            className="mt-3 mt-lg-0"
                                            style={{ width: "100px" }}
                                          >
                                            Add{" "}
                                          </Button>{" "}
                                        </div>
                                      </CardBody>
                                    </Card>
                                  </tbody>
                                </table>
                              </form>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </div>

                <div className="actions clearfix px-2">
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
                        style={{ backgroundColor: "#A9F4E0", color: "black" }}
                      >
                        Previous
                      </Link>
                    </li>
                    <li
                      className={
                        tabState.activeTab === 3 ? "next disabled" : "next"
                      }
                    >
                      <button
                        type="submit"
                        form={"tenant-form-" + formSubmitBtnState}
                        className="btn btn-buttonColor"
                        onClick={nextTabState}
                      >
                        <i className="fas fa-file-alt me-1"></i>
                        {tabState.activeTab === 3 ? "Save" : "Save & Next"}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    tenant_info_data,
    tenant_info_error,
    tenant_info_loading,

    tenant_update_loading,
    tenant_update_data,

    property_tenant_info_loading,
    tenant_move_out_loading,
    tenant_move_out_data,
  } = gstate.property;
  return {
    tenant_info_data,
    tenant_info_error,
    tenant_info_loading,

    tenant_update_loading,
    tenant_update_data,

    property_tenant_info_loading,
    tenant_move_out_loading,
    tenant_move_out_data,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    TenantInfoFresh,
    getTenantInfo,
    editPropertyTanent,
    propertyTenantInfoFresh,
    contactList,
    showContactFresh,
    tenantMoveOutFresh,
    tenantMoveOut,
    tenantUpdateFresh,
  })(TenantEdit)
);
