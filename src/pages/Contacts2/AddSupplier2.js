import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import {
  addSupplier,
  addSupplierFresh,
  contactList,
  showContact,
  showContactFresh,
} from "../../store/Contacts2/actions";
import { getChartOfAccounts, SupplierListFresh } from "store/actions";
import { Link, useHistory, withRouter, useParams } from "react-router-dom";

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
  // Form,
  FormGroup,
  UncontrolledAlert,
} from "reactstrap";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import classnames from "classnames";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import Breadcrumbs from "components/Common/Breadcrumb";
import ContactForm from "./MultipleReference/ContactForm";

const AddSupplier2 = props => {
  const history = useHistory();

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

  const [tabState, setTabState] = useState({
    activeTab: 1,
    passedSteps: [1],
  });

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {};
  const inputRefPostal = useRef();
  const autoCompletePostalRef = useRef();
  const [addressState, setAddressState] = useState(true);

  const [selectedId, setSelectedId] = useState();
  const [contactId, setContactId] = useState(null);
  const [contactState, setContactState] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [optionGroup, setOptionGroup] = useState([]);
  const [optionGroupState, setOptionGroupState] = useState(true);

  const [selectedId2, setSelectedId2] = useState();
  const [selectedGroup2, setSelectedGroup2] = useState(null);
  const [optionGroup2, setOptionGroup2] = useState([
    // {
    //   options: [
    //     { label: "400-council rates", value: "400-council rates" },
    //     { label: "405-water rates", value: "405-water rates" },
    //     { label: "415-land taxes", value: "415-land taxes" },
    //   ],
    // },
  ]);

  const [selectedId3, setSelectedId3] = useState();
  const [selectedGroup3, setSelectedGroup3] = useState({
    label: "Normal",
    value: "Normal",
  });
  const [optionGroup3, setOptionGroup3] = useState([
    {
      options: [
        { label: "High", value: "High" },
        { label: "Normal", value: "Normal" },
        { label: "Low", value: "Low" },
      ],
    },
  ]);

  const [state2, setState2] = useState({
    bill_priority: "Normal",
    abn: "",
    website: "",
    auto_approve_bill: 0,
    account: "",
  });
  const [show, setShow] = useState(false);
  const [postalAddForm, setPostalAddForm] = useState(false);
  const [physicalAddForm, setPhysicalAddForm] = useState(false);
  // const [postalAddress, setPostalAddress] = useState({});
  // const [physicalAddress, setPhysicalAddress] = useState({});

  const [forRef, setForRef] = useState(false);

  const [formSubmitBtnState, setFormSubmitBtnState] = useState(1); // Form Submit Button State

  // const [fullPostalAddress, setFullPostalAddress] = useState('');
  // const [fullPhysicalAddress, setFullPhysicalAddress] = useState('');

  const [phone, setPhone] = useState({
    mobile_phone: null,
    work_phone: null,
    home_phone: null,
  });
  let contactEditCommunication = {
    printCheck: false,
    emailCheck: false,
    smsCheck: false,
  };
  // const [forCheck, setForCheck] = useState({
  //   smsCheck: false,
  //   emailCheck: false,
  //   printCheck: false,
  // });
  // const [checkState, setCheckState] = useState([]);

  // Payment method state
  const [accErr, setAccErr] = useState(false);
  const [rows5, setRows5] = useState([1]);
  // let payee = state.reference;
  const [state8, setState8] = useState([
    {
      selectedValues: { label: "EFT", value: "EFT" },
      method: "EFT",
      payee: '',
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

  const [optionGroup8, setOptionGroup8] = useState([
    {
      options: [
        { label: "None", value: "None" },
        { label: "Cheque", value: "Cheque" },
        { label: "EFT", value: "EFT" },
        { label: "BPay", value: "BPay" },
      ],
    },
  ]);
  const [selectedGroup8, setSelectedGroup8] = useState(null);
  const [selectedId8, setSelectedId8] = useState();
  const [tableInfoShow8, setTableInfoShow8] = useState(false);
  const [enteredState, setEnteredState] = useState(false);
  const [disablePaymentAddBtn, setDisablePaymentAddBtn] = useState(false);
  const [bpayErrorState, setBpayErrorState] = useState(false);
  const [billerCodeState, setBillerCodeState] = useState(false);

  const [showErrorState, setShowErrorState] = useState(false);
  // ----------------------------
  const [formTwoButtonValue, setFormTwoButtonValue] = useState({
    auto_approve_bill: 1,
  });

  const toggleInspectionApproveBillsYesBtn = () => {
    setState2({ ...state2, auto_approve_bill: 1 });
  };

  const toggleInspectionApproveBillsNoBtn = () => {
    setState2({ ...state2, auto_approve_bill: 0 });
  };

  const handlePushData = () => {
    props.showContactFresh();
    if (selectedId) {
      setContactState(true);
    }
    handleClose();
    // history.push("/set/setAddSupplier/" + selectedId, {
    //   id: selectedId,
    // });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelectGroup = e => {
    setSelectedGroup(e);
    setSelectedId(e.value);
  };
  const handleSelectGroup2 = e => {
    setState2({ ...state2, account: e.value });
    setSelectedGroup2(e);
    setSelectedId2(e.value);
  };
  const handleSelectGroup3 = e => {
    setState2({ ...state2, bill_priority: e.value });
    setSelectedGroup3(e);
    setSelectedId3(e.value);
  };

  const handlePropertyFormOneValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handlePropertyFormOneValues2 = e => {
    setState2({ ...state2, [e.target.name]: e.target.value });
  };

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
  const handleFocus = event => event.target.select();

  useEffect(() => {
    let account;
    if (props.chartAccount_list_data?.account) {
      account = props.chartAccount_list_data?.account.map(item => ({
        label: item.account_name,
        value: item.id,
      }));
      setOptionGroup2(account);
    }
    if (props.chartAccount_list_loading === false) {
      props.getChartOfAccounts();
    }
    if (contactState) {
      props.showContact(selectedId);
    }
    if (props.supplier_add_loading === "Success") {
      toastr.success("Supplier Added Successfully");
      props.contactList();
      props.addSupplierFresh();
      props.SupplierListFresh();
      const pushID = props.supplier_add_data.contact_id || null;
      history.push("/contactsInfo/" + pushID);
    }
    if (props.supplier_add_loading === "Failed") {
      toastr.error("Something went wrong");
      props.addSupplierFresh();
    }
    if (props.contacts_list_loading === false) {
      props.contactList();
      props.addSupplierFresh();
    }
    if (
      props.contacts_show_data &&
      props.contacts_show_data?.data?.supplier === 1
    ) {
      setShowErrorState(true);
      setContactState(false);
    } else if (props.contacts_show_data && contactState) {
      setContactState(false);
      setContactId(props.contacts_show_data?.data?.id);

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
        setCountDelete(prev => prev + 1);
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
        }
      );
      setPhysicalAddress(contactsPhysical);
      setPostalAddress(contactsPostal);
      setFullPhysicalAddress(contactsPostalFull);
      setFullPostalAddress(contactsPhysicalFull);

      setState2({ ...state2, abn: props.contacts_show_data.data?.abn });

      setState8([
        {
          selectedValues: { label: "EFT", value: "EFT" },
          method: "EFT",
          payee: props.contacts_show_data?.data?.reference,
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
    }
  }, [
    props.supplier_add_loading,
    props.contacts_list_loading,
    props.contacts_show_data,
    contactState,
    state,
    props.chartAccount_list_loading,
    props.chartAccount_list_data?.account,
  ]);

  let option;
  if (props.contacts_list_data && optionGroupState) {
    option = props.contacts_list_data.data?.map(item => ({
      label: item.reference,
      value: item.id,
    }));

    setOptionGroup([
      {
        options: option,
      },
    ]);
    setOptionGroupState(false);
  }

  const referenceHandler = (e, stateName) => {
    let unit = postalAddress.postal_unit ? postalAddress.postal_unit + " " : "";
    let number = postalAddress.postal_number
      ? postalAddress.postal_number + " "
      : "";
    let street = postalAddress.postal_street
      ? "- " + postalAddress.postal_street
      : "";

    if (stateName === "postal_unit") {
      unit = e.target.value + " ";
    }
    if (stateName === "postal_number") {
      number = e.target.value + " ";
    }
    if (stateName === "postal_street") {
      street = "- " + e.target.value;
    }

    let reference = unit + number + street;
    if (stateName) {
      setPostalAddress({ ...postalAddress, [stateName]: e.target.value });
    }
    setState({ ...state, reference });
  };
  if (forRef) {
    referenceHandler("", "");
    setForRef(false);
  }

  const handleReference = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // Payment method functions
  const handleChangeInput3 = async (idx, e, type) => {
    const values = [...state8];
    values[idx][type] = e.value;
    values[idx]["selectedValues"] = e;
    if (e.value === "None") {
      values[idx]["payeeType"] = false;
      values[idx]["bsbType"] = false;
      values[idx]["accountType"] = false;
      setBillerCodeState(false);
      setDisablePaymentAddBtn(false);
    } else if (e.value === "Cheque") {
      values[idx]["payeeType"] = true;
      values[idx]["payee"] = state.reference;
      values[idx]["bsbType"] = false;
      values[idx]["accountType"] = false;
      setBillerCodeState(false);
      setDisablePaymentAddBtn(false);
    } else if (e.value === "EFT") {
      values[idx]["payeeType"] = true;
      values[idx]["payee"] = state.reference;
      values[idx]["bsbType"] = true;
      values[idx]["accountType"] = true;
      setBillerCodeState(false);
      setDisablePaymentAddBtn(false);
    } else if (e.value === "BPay") {
      values[idx]["payeeType"] = false;
      values[idx]["payee"] = "";
      values[idx]["bsbType"] = false;
      values[idx]["split"] = 100;
      values[idx]["split_type"] = "%";
      values[idx]["accountType"] = false;
      setBillerCodeState(true);
      if (state8.length === 1) {
        setDisablePaymentAddBtn(true);
      }
    }
    await setState8(values);

    setSelectedGroup8(e);
    setSelectedId8(e.value);
    setTableInfoShow8(true);
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
    if (state8.length === 1 && disablePaymentAddBtn) {
      setDisablePaymentAddBtn(false);
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
        biller_code: "",
        split: rows5.length === 0 ? 100 : 0,
        split_type_boolean: false,
        split_type: "%",
        splitTypeEnableBtn: true,
        splitTypeDisableBtn: false,
        errorState: false,
        error: "none",
      },
    ]);
  };

  const toggleDollorBtn = idx => {
    let data = [...state8];
    let splitval = data[idx]["split"];
    data[idx]["split_type"] = "৳";
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

  const handleRowResult2 = e => {
    e.preventDefault();
    let forBPay = false;
    if (state8.length === 0) {
      setEnteredState(true);
    } else {
      const values = [...state8];
      var split = 0;
      var lengthSp = state8.length;
      state8.forEach((element, idx) => {
        if (element.method == "EFT") {
          if (element.payee == "") {
            values[idx]["errorState"] = true;
            values[idx]["error"] = "Enter a Payee for EFT payment";
            setState8(values);
            return;
          } else if (element.bsb.length < 6 || isNaN(element.bsb)) {
            values[idx]["errorState"] = true;
            values[idx]["error"] = "Enter a 6-digit BSB";
            setState8(values);
            return;
          } else if (element.account == "") {
            values[idx]["errorState"] = true;
            values[idx]["error"] = " Enter an Account number";
            setState8(values);
            return;
          } else if (isNaN(element.account)) {
            values[idx]["errorState"] = true;
            values[idx]["error"] = "Account number must be numeric";
            setState8(values);
            return;
          } else {
            values[idx]["errorState"] = false;
            values[idx]["error"] = "";
            setState8(values);
          }
        }
        if (element.method == "BPay") {
          forBPay = true;
          if (element.biller_code == "") {
            values[idx]["errorState"] = true;
            values[idx]["error"] = "The Biller Code should be at least 1 digit";
            setState8(values);
            return;
          } else if (isNaN(element.biller_code)) {
            values[idx]["errorState"] = true;
            values[idx]["error"] = "The Biller Code must be numeric";
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
        if (lengthSp > 1) {
          if (values[idx]["split_type"] == "%") {
            split += Number(element.split);
          }
          if (split > 100 || Number(element.split) === 0) {
            values[lengthSp - 1]["errorState"] = true;
            values[lengthSp - 1]["error"] = "Invalid Percentage";
            setState8(values);
            return
          } else {
            values[idx]["errorState"] = false;
            values[idx]["error"] = "";
            setState8(values);
          }
        }
      });

      state8.forEach((element, idx) => {
        if (forBPay && state8.length > 1) {
          setBpayErrorState(true);
          setTimeout(() => {
            setBpayErrorState(false);
          }, 3000);
        } else if (element.errorState == false) {
          setEnteredState(true);
        } else {
          setEnteredState(false);
        }
      });
    }
  };

  if (enteredState && tabState.activeTab === 3) {
    setEnteredState(false);
    props.addSupplier(
      state,
      state2,
      physicalAddress,
      postalAddress,
      state8,
      contactId
    );
  }

  if (showErrorState) {
    setTimeout(() => {
      setShowErrorState(false);
      props.showContactFresh();
    }, 5000);
  }

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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Add Supplier" breadcrumbItem="Contacts" /> */}
          <h4 className="text-primary py-2">Add Supplier</h4>
          <Row className="g-2">
            <Col lg="2" style={{ padding: "0px" }}>
              <Card
                style={{ borderRadius: "14px", margin: "0px", padding: "0px" }}
              >
                <CardBody
                  style={{ margin: "0px", padding: "7px" }}
                  className="my-3"
                >
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
                        <span style={{ fontSize: "12px" }}>Supplier</span>
                      </NavLink>
                    </NavItem>
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
                </CardBody>
              </Card>
            </Col>
            <Col lg="10" style={{ padding: "0px" }}>
              <div className="wizard clearfix">
                <div>
                  <TabContent activeTab={tabState.activeTab} className="body">
                    <TabPane tabId={1}>
                      <Row>
                        <Col sm="12">
                          <div className="d-flex flex-column justify-content-start">
                            <div className="py-2 ps-3">
                              <div>
                                <div className="mb-3">
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
                                      notes: (state && state.notes) || "",
                                      communication: checkState
                                        ? checkState
                                        : [],
                                    }}
                                    validationSchema={Yup.object().shape({
                                      //
                                    })}
                                    onSubmit={(values, onSubmitProps) => {
                                      const emptyNames = state.contacts.filter(item => !item.first_name.trim() || !item.last_name.trim() || !item.email.trim());

                                      if (emptyNames.length > 0) {
                                        const fName = state.contacts.filter(item => !item.first_name.trim())
                                        const lName = state.contacts.filter(item => !item.last_name.trim())
                                        const email = state.contacts.filter(item => !item.email.trim())
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
                                          <div style={{ marginTop: "-5px" }}>
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
                                                      {showErrorState && (
                                                        <UncontrolledAlert
                                                          color="warning"
                                                          role="alert"
                                                        >
                                                          {
                                                            props
                                                              .contacts_show_data
                                                              ?.data?.reference
                                                          }{" "}
                                                          is already a supplier
                                                        </UncontrolledAlert>
                                                      )}
                                                      <div className="d-flex justify-content-between align-items-center">
                                                        <CardTitle tag="h5">
                                                          New Contact
                                                        </CardTitle>

                                                        <div>
                                                          <div>
                                                            <button
                                                              type="button"
                                                              onClick={
                                                                handleShow
                                                              }
                                                              className="btn btn-buttonColor"
                                                              data-toggle="modal"
                                                              data-target="#myModal"
                                                            >
                                                              <i className="fa fa-regular fa-user me-1" />
                                                              Select Contact
                                                            </button>

                                                            <Modal
                                                              isOpen={show}
                                                              toggle={
                                                                handleShow
                                                              }
                                                            >
                                                              <div className="modal-header">
                                                                <h5
                                                                  className="modal-title mt-0"
                                                                  id="myModalLabel"
                                                                >
                                                                  <h4 className="text-primary">
                                                                    Select
                                                                    Contact
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
                                                              <div className="modal-body">
                                                                <div className="mb-3 select2-container">
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
                                                                </div>
                                                              </div>
                                                              <div className="modal-footer">
                                                                <button
                                                                  type="button"
                                                                  onClick={
                                                                    handleClose
                                                                  }
                                                                  className="btn btn-secondary"
                                                                  data-dismiss="modal"
                                                                >
                                                                  Close
                                                                </button>
                                                                <button
                                                                  type="button"
                                                                  className="btn btn-info"
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
                                                      <div className="my-3">
                                                        <Row className="d-flex justify-content-left align-items-center">
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
                                                                  handleReference
                                                                }
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
                                            {/* 
                                            <Card>
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
                                                            (
                                                              item,
                                                              idx
                                                            ) => (
                                                              <Button
                                                                type="button"
                                                                color="dark"
                                                                outline={
                                                                  step ===
                                                                    idx
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
                                                                      ]
                                                                        .deleted
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
                                                                  {idx ==
                                                                    0 && (
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
                                                            btnRows.length >
                                                              9
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
                                                     
                                                    }
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
                                                          height: "800px",
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
                                                            {btnRows.map(
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
                                                      {state.contacts.map(
                                                        (item, idx) => {
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

                                            {/* <Card>
                                              <CardBody>
                                                <h4
                                                  className="text-primary mb-3 w-75"
                                                  style={{
                                                    borderBottom:
                                                      "1.2px dotted #c9c7c7",
                                                  }}
                                                >
                                                  Notes
                                                  <div className="w-25 mb-3"></div>
                                                </h4>{" "}
                                                <div className="mb-3 w-75">
                                                  <Row>
                                                    <Col md={2}>
                                                      <Label
                                                        for="notes"
                                                        className="form-label"
                                                      >
                                                        Notes
                                                      </Label>
                                                    </Col>

                                                    <Col md={8}>
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
                                                      />
                                                      <ErrorMessage
                                                        name="notes"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Col>
                                                  </Row>
                                                </div>
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
                                                      <CardTitle tag="h5">
                                                        Notes
                                                      </CardTitle>
                                                      <div className="mb-3">
                                                        <Row className="mt-3 d-flex justify-content-evenly align-items-center">
                                                          {/* <Col md={2}>
                                            <Label for="notes" className="form-label">
                                              Notes
                                            </Label>
                                          </Col> */}

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
                      <Row>
                        <Col sm={12}>
                          <Row>
                            <Col md={12}>
                              <div className="d-flex flex-column justify-content-start">
                                <div className="">
                                  <div>
                                    <div className="">
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
                                          abn: (state2 && state2.abn) || "",
                                          website:
                                            (state2 && state2.website) || "",
                                          account:
                                            (state2 && state2.account) || "",
                                          bill_priority:
                                            (state2 && state2.bill_priority) ||
                                            "",
                                          auto_approve_bill:
                                            (state2 &&
                                              state2.auto_approve_bill) ||
                                            0,
                                        }}
                                        onSubmit={(values, onSubmitProps) => {
                                          setState2(values);
                                          toggleTab(tabState.activeTab + 1);
                                          setFormSubmitBtnState(
                                            formSubmitBtnState + 1
                                          );
                                        }}
                                      >
                                        {({ errors, status, touched }) => (
                                          <div style={{ marginLeft: "15px" }}>
                                            <Form
                                              className="form-horizontal"
                                              id="tenant-form-2"
                                            >
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
                                                        justifyContent:
                                                          "center",
                                                        padding: "0px",
                                                      }}
                                                    >
                                                      <div
                                                        style={{
                                                          marginTop: "15px",
                                                          display: "flex",
                                                          flexDirection:
                                                            "column",
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
                                                            height: "300px",
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
                                                        <div className="w-75">
                                                          <CardTitle tag="h5">
                                                            Tenant Contact
                                                          </CardTitle>

                                                          <div className="mb-3 ms-2 mt-3">
                                                            <Row>
                                                              <Col md={12}>
                                                                <div className="form-group-new">
                                                                  <Field
                                                                    name="abn"
                                                                    type="text"
                                                                    value={
                                                                      state2.abn
                                                                    }
                                                                    className={
                                                                      "form-control" +
                                                                      (errors.abn &&
                                                                        touched.abn
                                                                        ? " is-invalid"
                                                                        : "")
                                                                    }
                                                                    onChange={
                                                                      handlePropertyFormOneValues2
                                                                    }
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
                                                            <Row>
                                                              <Col md={12}>
                                                                <div className="form-group-new">
                                                                  <Field
                                                                    name="website"
                                                                    type="text"
                                                                    value={
                                                                      state2.website
                                                                    }
                                                                    placeholder="Website"
                                                                    className={
                                                                      "form-control" +
                                                                      (errors.website &&
                                                                        touched.website
                                                                        ? " is-invalid"
                                                                        : "")
                                                                    }
                                                                    onChange={
                                                                      handlePropertyFormOneValues2
                                                                    }
                                                                  />
                                                                  <label htmlFor="usr">
                                                                    Website
                                                                  </label>
                                                                </div>
                                                                <ErrorMessage
                                                                  name="website"
                                                                  component="div"
                                                                  className="invalid-feedback"
                                                                />
                                                              </Col>
                                                            </Row>

                                                            <Row>
                                                              <Col md={12}>
                                                                <div className="form-group-new">
                                                                  <Select
                                                                    value={
                                                                      selectedGroup2
                                                                    }
                                                                    onChange={
                                                                      handleSelectGroup2
                                                                    }
                                                                    options={
                                                                      optionGroup2
                                                                    }
                                                                    classNamePrefix="select2-selection"
                                                                  />
                                                                  <label htmlFor="usr">
                                                                    Account
                                                                  </label>
                                                                </div>
                                                              </Col>

                                                              <ErrorMessage
                                                                name="account"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </Row>
                                                            <Row>
                                                              <Col md={12}>
                                                                <div className="form-group-new">
                                                                  <Select
                                                                    value={
                                                                      selectedGroup3
                                                                    }
                                                                    onChange={
                                                                      handleSelectGroup3
                                                                    }
                                                                    options={
                                                                      optionGroup3
                                                                    }
                                                                    classNamePrefix="select2-selection"
                                                                  />
                                                                  <label htmlFor="usr">
                                                                    Bill
                                                                    priority
                                                                  </label>
                                                                </div>
                                                              </Col>
                                                              <ErrorMessage
                                                                name="bill_priority"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </Row>
                                                            <Row>
                                                              <Col md={5}>
                                                                <Label
                                                                  for="routine_inspections_frequency"
                                                                  className="form-label"
                                                                >
                                                                  Auto approve
                                                                  bills
                                                                </Label>
                                                              </Col>
                                                              <Col md={7}>
                                                                <div className="btn-group btn-group-justified">
                                                                  <div className="btn-group">
                                                                    <Button
                                                                      color={
                                                                        state2.auto_approve_bill ===
                                                                          1
                                                                          ? "secondary"
                                                                          : "light"
                                                                      }
                                                                      onClick={
                                                                        toggleInspectionApproveBillsYesBtn
                                                                      }
                                                                    >
                                                                      {state2.auto_approve_bill ===
                                                                        1 ? (
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
                                                                        state2.auto_approve_bill ===
                                                                          0
                                                                          ? "secondary"
                                                                          : "light"
                                                                      }
                                                                      onClick={
                                                                        toggleInspectionApproveBillsNoBtn
                                                                      }
                                                                    >
                                                                      {state2.auto_approve_bill ===
                                                                        0 ? (
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
                                                              <ErrorMessage
                                                                name="auto_approve_bills"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </Row>
                                                          </div>
                                                        </div>
                                                      </CardBody>
                                                    </Col>
                                                  </Row>
                                                </Col>
                                              </Card>
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
                    </TabPane>
                    <TabPane tabId={3}>
                      <Row>
                        <Col xs="12">
                          <div style={{ height: "auto" }}>
                            <div style={{ marginLeft: "15px" }}>
                              <form
                                className="repeater"
                                id="tenant-form-3"
                                encType="multipart/form-data"
                                onSubmit={handleRowResult2}
                              >
                                <table style={{ width: "100%" }}>
                                  <tbody>
                                    {accErr && <p>Alert</p>}
                                    <Card className="custom_card_border_design me-2">
                                      <CardBody>
                                        {rows5?.map((item, idx) => (
                                          <Row id={"addr" + idx} key={idx}>
                                            <Col lg="2" className="mb-3">
                                              <label htmlFor="name">
                                                Method
                                              </label>
                                              <div>
                                                <div className="mb-3 select2-container">
                                                  <Select
                                                    value={
                                                      state8[idx]?.[
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
                                            {!(
                                              state8[idx]?.["method"] === "BPay"
                                            ) ? (
                                              <Col lg="2" className="mb-3">
                                                <label htmlFor="payee">
                                                  Payee
                                                </label>

                                                {state8[idx]?.["payeeType"] ===
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
                                                    value={
                                                      state8[idx]?.["payee"]
                                                    }
                                                  />
                                                ) : null}
                                              </Col>
                                            ) : null}
                                            {state8[idx]?.["method"] ===
                                              "BPay" ? (
                                              <Col lg="2" className="mb-3">
                                                <label htmlFor="biller_code">
                                                  Biller Code
                                                </label>
                                                <input
                                                  name="biller_code"
                                                  type="text"
                                                  className={"form-control"}
                                                  onChange={e =>
                                                    handlePropertyFormValues8(
                                                      idx,
                                                      e
                                                    )
                                                  }
                                                  value={
                                                    state8[idx]?.["biller_code"]
                                                  }
                                                />
                                              </Col>
                                            ) : null}
                                            <Col lg="2" className="mb-3">
                                              <label htmlFor="bsb">BSB</label>
                                              {state8[idx]?.["bsbType"] ===
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
                                                />
                                              ) : null}
                                            </Col>

                                            <Col lg="2" className="mb-3">
                                              <label htmlFor="account">
                                                Account #
                                              </label>

                                              {state8[idx]?.["accountType"] ===
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
                                                  {state8[idx]?.[
                                                    "split_type_boolean"
                                                  ] === true ? (
                                                    <div className="btn-group btn-group-sm me-1">
                                                      <Button
                                                        className="d-flex align-items-center"
                                                        color={
                                                          state8[idx]?.[
                                                            "split_type"
                                                          ] === "৳"
                                                            ? "secondary"
                                                            : "light"
                                                        }
                                                        onClick={() =>
                                                          toggleDollorBtn(idx)
                                                        }
                                                      >
                                                        <span> ৳</span>
                                                      </Button>
                                                      <Button
                                                        className="d-flex align-items-center"
                                                        color={
                                                          state8[idx]?.[
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
                                                  <input
                                                    name="split"
                                                    type="text"
                                                    className={"form-control"}
                                                    onFocus={handleFocus}
                                                    value={
                                                      state8[idx]?.["split"]
                                                    }
                                                    placeholder="0.00"
                                                    onChange={e =>
                                                      handlePropertyFormValues8(
                                                        idx,
                                                        e
                                                      )
                                                    }
                                                    disabled={
                                                      !state8[idx]?.[
                                                      "split_type_boolean"
                                                      ]
                                                    }
                                                  />
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
                                            {state8[idx]?.["errorState"] ? (
                                              <div className="d-flex align-items-start text-warning">
                                                <i className="fas fa-exclamation-triangle me-1"></i>
                                                <p>{state8[idx]?.["error"]}</p>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </Row>
                                        ))}

                                        <div className="d-flex justify-content-end">
                                          {" "}
                                          <Button
                                            onClick={handleAddRow8}
                                            color="secondary"
                                            className="mt-3 mt-lg-0"
                                            disabled={
                                              disablePaymentAddBtn
                                                ? true
                                                : false
                                            }
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
                {bpayErrorState && (
                  <UncontrolledAlert color="danger" role="alert">
                    BPay cannot be split, remove the other accounts
                  </UncontrolledAlert>
                )}
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
                        tabState.activeTab === 3 ? "next disabled" : "next"
                      }
                    >
                      <button
                        type="submit"
                        form={"tenant-form-" + formSubmitBtnState}
                        className="btn btn-info"
                      >
                        <i className="fas fa-file-alt me-1"></i>Save & Next
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
    contacts_list_data,
    contacts_list_error,
    contacts_list_loading,

    contacts_add_loading,

    user_list_data,
    user_list_error,
    user_list_loading,
    suppliers_list_data,
    suppliers_list_error,
    suppliers_list_loading,
    supplier_add_loading,
    supplier_add_data,

    contacts_show_data,
  } = gstate.Contacts2;

  const { chartAccount_list_data, chartAccount_list_loading } =
    gstate.Portfolio;

  return {
    contacts_list_data,
    contacts_list_error,
    contacts_list_loading,

    contacts_add_loading,

    user_list_data,
    user_list_error,
    user_list_loading,

    suppliers_list_data,
    suppliers_list_error,
    suppliers_list_loading,
    supplier_add_loading,
    supplier_add_data,
    chartAccount_list_data,
    chartAccount_list_loading,
    contacts_show_data,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addSupplier,
    addSupplierFresh,
    contactList,
    showContactFresh,
    showContact,
    getChartOfAccounts,
    SupplierListFresh,
  })(AddSupplier2)
);
