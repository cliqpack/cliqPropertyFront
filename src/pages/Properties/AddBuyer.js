import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import moment from "moment";

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
  //   Form,
  FormGroup,
} from "reactstrap";
import classnames from "classnames";
import { Formik, Field, Form, ErrorMessage, useFormik, date } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

import {
  addOwner,
  propertyOwnerInfoFresh,
  propertyListFresh,
  addSaleAgreement,
  addSaleAgreementFresh,
  addBuyer,
  addBuyerFresh,
  SaleAgreementInfoFresh,
  SaleAgreementInfoForPropertyFresh,
  editSaleAgreementInfo,
  editSaleAgreementInfoFresh,
} from "../../store/Properties/actions";
import {
  contactList,
  showContactFresh,
  showContact,
} from "../../store/Contacts2/actions";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Link, useHistory, withRouter, useParams } from "react-router-dom";
import { element } from "prop-types";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import ContactForm from "pages/Contacts2/MultipleReference/ContactForm";

const SaleAgreement = props => {
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

  // Autocomplete address
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {};

  const inputRefPostal = useRef();
  const autoCompletePostalRef = useRef();
  // ------------------------

  // const [fullPostalAddress, setFullPostalAddress] = useState("");
  // const [fullPhysicalAddress, setFullPhysicalAddress] = useState("");

  const { id, saleId } = useParams(); // Property ID
  const history = useHistory();

  const [formSubmitBtnState, setFormSubmitBtnState] = useState(1); // Form Submit Button State

  const [selectedId, setSelectedId] = useState();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [optionGroup, setOptionGroup] = useState();
  const [optionGroupState, setOptionGroupState] = useState(true);

  const [contactState, setContactState] = useState(false);
  const [contactId, setContactId] = useState(null);

  const [phone, setPhone] = useState({
    mobile_phone: null,
    work_phone: null,
    home_phone: null,
  });

  const [selectedId2, setSelectedId2] = useState();
  const [selectedGroup2, setSelectedGroup2] = useState(null);
  const [optionGroup2, setOptionGroup2] = useState([
    {
      options: [
        { label: "Off", value: "Off" },
        { label: "Weekly", value: "Weekly" },
        { label: "Fortnightly", value: "Fortnightly" },
        { label: "Twice Monthly", value: "Twice Monthly" },
        { label: "Monthly", value: "Monthly" },
      ],
    },
  ]);
  const [optionGroupState2, setOptionGroupState2] = useState(true);

  const [selectedId3, setSelectedId3] = useState();
  const [selectedGroup3, setSelectedGroup3] = useState(null);
  const [optionGroup3, setOptionGroup3] = useState([
    {
      options: [
        { label: "Management purchased", value: "Management purchased" },
        { label: "Advertising", value: "Advertising" },
        { label: "Multiple landlord", value: "Multiple landlord" },
        { label: "Not gained", value: "Not gained" },
        { label: "Price", value: "Price" },
        { label: "Referral", value: "Referral" },
        { label: "Sales team referral", value: "Sales team referral" },
      ],
    },
  ]);
  const [optionGroupState3, setOptionGroupState3] = useState(true);
  // const [state, setState] = useState({}); // Form 1 State
  // console.log(state, phone);

  const date = moment().format("yyyy-MM-DD");

  const [state2, setState2] = useState({}); // Form 2 State
  console.log(state2);
  const [ownerAccess, setOwnerAccess] = useState(1); // Form 2 State

  const [addressState, setAddressState] = useState(true);

  const [show, setShow] = useState(false);
  const [postalAddForm, setPostalAddForm] = useState(false);
  const [physicalAddForm, setPhysicalAddForm] = useState(false);
  // const [postalAddress, setPostalAddress] = useState({});
  // const [physicalAddress, setPhysicalAddress] = useState({});

  const [inspectionEnableBtn, setInspectionEnableBtn] = useState(true);
  const [inspectionDisableBtn, setInspectionDisableBtn] = useState(false);

  // Fees Form State
  const [rows3, setRows3] = useState([]);
  const [state3, setState3] = useState([]);

  const [selectedGroup6, setSelectedGroup6] = useState(null);
  const [optionGroup6, setOptionGroup6] = useState([
    {
      options: [{ label: "Admin Fee (৳)", value: "Admin Fee (৳)" }],
    },
  ]);

  const [rows4, setRows4] = useState([]);
  const [state7, setState7] = useState([]);

  const [selectedGroup7, setSelectedGroup7] = useState(null);
  const [optionGroup7, setOptionGroup7] = useState([
    {
      options: [
        { label: "Commercial Management Fee (%)", value: "1" },
        { label: "Letting fee (৳)", value: "2" },
        { label: "Management fee (%)", value: "3" },
      ],
    },
  ]);

  const [selectedId6, setSelectedId6] = useState();
  const [selectedId7, setSelectedId7] = useState();

  const [tableInfoShow3, setTableInfoShow3] = useState(false);
  const [tableInfoShow7, setTableInfoShow7] = useState(false);
  // ----------------------
  const [feesModal, setfeesModal] = useState(false);

  const toggleFeesModal = () => {
    setfeesModal(prev => !prev);
  };

  // Payment method state
  const [accErr, setAccErr] = useState(false);
  const [rows5, setRows5] = useState([1]);
  const [state8, setState8] = useState([
    {
      selectedValues: { label: "EFT", value: "EFT" },
      method: "EFT",
      payee: state.reference,
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
      ],
    },
  ]);
  const [selectedGroup8, setSelectedGroup8] = useState(null);
  const [selectedId8, setSelectedId8] = useState();
  const [tableInfoShow8, setTableInfoShow8] = useState(false);
  const [enteredState, setEnteredState] = useState(false);

  const editSaleData =
    props.edit_seller_info_property_data?.data?.data?.sales_contact;

  const mobilePhoneHandler = e => {
    setPhone({
      ...phone,
      mobile_phone: e.target.value,
    });
    if (e.target.value === "") {
      if (forCheck.smsCheck === false) {
        return;
      } else {
        checkFalseHandler("smsCheck", "SMS");
      }
    } else {
      if (forCheck.smsCheck === true) {
        return;
      } else {
        checkTrueHandler("smsCheck", "SMS");
      }
    }
  };

  const emailHandler = e => {
    setState({
      ...state,
      email: e.target.value,
    });
    if (e.target.value === "") {
      if (forCheck.emailCheck === false) {
        return;
      } else {
        checkFalseHandler("emailCheck", "Email");
      }
    } else {
      if (forCheck.emailCheck === true) {
        return;
      } else {
        checkTrueHandler("emailCheck", "Email");
      }
    }
  };

  const propertyRef = props.property_info_data?.data?.data?.reference
    ? props.property_info_data?.data?.data?.reference
    : "";

  useEffect(() => {
    if (contactState) {
      props.showContact(selectedId);
    }
    if (props.contacts_list_loading === false) {
      props.contactList();
    }
    if (props.edit_seller_info_property_loading === false) {
      props.editSaleAgreementInfo(id, saleId);
    }
    if (props.edit_seller_info_property_data?.data?.data?.sales_contact) {
      setState2({
        ...state2,
        agreement_start: editSaleData?.seller_folio?.agreement_start,
        agreement_end: editSaleData?.seller_folio?.agreement_end,
        asking_price: editSaleData?.seller_folio?.asking_price,
        commission: editSaleData?.seller_folio?.commission,
      });

      setRows5(editSaleData?.seller_payment);

      let lengthA = editSaleData?.seller_payment?.length;
      editSaleData?.seller_payment?.map((item, idx) => {
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

      setState8(editSaleData?.seller_payment);
    }
    if (props.property_owner_add_loading === "Failed") {
      toastr.error("Something went wrong");
    }
    if (props.property_owner_info_loading === "Success") {
      props.propertyOwnerInfoFresh();
    }
    if (props.buyer_add_loading === "Success") {
      toastr.success("Buyer added successfuly");
      props.addBuyerFresh();
      props.SaleAgreementInfoFresh();
      props.SaleAgreementInfoForPropertyFresh();
      history.push(`/propertyInfo/${id}`);
    }
    if (props.buyer_add_loading === "Failed") {
      toastr.error("Something went wrong");
      props.addBuyerFresh();
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
      setContactId(props.contacts_show_data?.data?.id);
      setContactState(false);
    }
  }, [
    props.contacts_list_loading,
    props.property_owner_add_loading,
    props.property_owner_info_loading,
    contactState,
    props.contacts_show_data,
    state,
    props.buyer_add_loading,
  ]);

  const addresshandler = (e, statename) => {
    let b = postalAddress.postal_building_name
      ? postalAddress.postal_building_name + " "
      : "";
    let u = postalAddress.postal_unit ? postalAddress.postal_unit + "/" : "";
    let n = postalAddress.postal_number
      ? postalAddress.postal_number + " "
      : "";
    let st = postalAddress.postal_street
      ? postalAddress.postal_street + ", "
      : "";
    let sb = postalAddress.postal_suburb
      ? postalAddress.postal_suburb + ", "
      : "";
    let pc = postalAddress.postal_postcode
      ? postalAddress.postal_postcode + " "
      : "";
    let s = postalAddress.postal_state ? postalAddress.postal_state + " " : "";
    let c = postalAddress.postal_country
      ? postalAddress.postal_country + " "
      : "";
    if (statename === "postal_building_name") {
      b = e.target.value + " ";
    } else if (statename === "postal_unit") {
      u =
        e.target.value && postalAddress.postal_number
          ? `${e.target.value}/`
          : e.target.value;
    } else if (statename === "postal_number") {
      n = e.target.value + " ";
    } else if (statename === "postal_street") {
      st = e.target.value + ", ";
    } else if (statename === "postal_suburb") {
      sb = e.target.value + ", ";
    } else if (statename === "postal_postcode") {
      pc = e.target.value + " ";
    } else if (statename === "postal_state") {
      s = e.target.value + " ";
    } else if (statename === "postal_country") {
      c = e.target.value;
    }
    let address = b + u + n + st + sb + s + pc + c;
    // let reference = st + u + n;
    setFullPostalAddress(address);
    // setState({ ...state, reference });
    setPostalAddress({
      ...postalAddress,
      [e.target.name]: e.target.value,
    });
  };

  const addresshandlerPhysical = (e, statename) => {
    let b = physicalAddress.physical_building_name
      ? physicalAddress.physical_building_name + " "
      : "";
    let u = physicalAddress.physical_unit
      ? physicalAddress.physical_unit + "/"
      : "";
    let n = physicalAddress.physical_number
      ? physicalAddress.physical_number + " "
      : "";
    let st = physicalAddress.physical_street
      ? physicalAddress.physical_street + ", "
      : "";
    let sb = physicalAddress.physical_suburb
      ? physicalAddress.physical_suburb + ", "
      : "";
    let pc = physicalAddress.physical_postcode
      ? physicalAddress.physical_postcode + " "
      : "";
    let s = physicalAddress.physical_state
      ? physicalAddress.physical_state + " "
      : "";
    let c = physicalAddress.physical_country
      ? physicalAddress.physical_country + " "
      : "";
    if (statename === "physical_building_name") {
      b = e.target.value + " ";
    } else if (statename === "physical_unit") {
      u =
        e.target.value && physicalAddress.physical_number
          ? `${e.target.value}/`
          : e.target.value;
    } else if (statename === "physical_number") {
      n = e.target.value + " ";
    } else if (statename === "physical_street") {
      st = e.target.value + ", ";
    } else if (statename === "physical_suburb") {
      sb = e.target.value + " ";
    } else if (statename === "physical_postcode") {
      pc = e.target.value + " ";
    } else if (statename === "physical_state") {
      s = e.target.value + " ";
    } else if (statename === "physical_country") {
      c = e.target.value;
    }
    let address = b + u + n + st + sb + s + pc + c;
    // let reference = st + u + n;
    setFullPhysicalAddress(address);
    // setState({ ...state, reference });
    setPhysicalAddress({
      ...physicalAddress,
      [e.target.name]: e.target.value,
    });
  };

  //   console.log(props.seller_add_loading);

  // Autocomplete address
  function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }
  // -----------------

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePropertyFormValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handlePropertyFormTwoValues = e => {
    setState2({ ...state2, [e.target.name]: e.target.value });
  };

  const referenceHandler = (e, stateName) => {
    let fName = state.first_name ? state.first_name + " " : "";
    let lName = state.last_name ? state.last_name + " " : "";
    let cName = state.company_name ? "- " + state.company_name : "";

    if (stateName === "first_name") {
      fName = e.target.value + " ";
    }
    if (stateName === "last_name") {
      lName = e.target.value + " ";
    }
    if (stateName === "company_name") {
      cName = "- " + e.target.value;
    }

    let reference = fName + lName + cName;
    setState({ ...state, [stateName]: e.target.value, reference });
  };

  const handleReferenceValues = e => {
    setState({ ...state, reference: e.target.value });
    setState8([
      {
        selectedValues: { label: "EFT", value: "EFT" },
        method: "EFT",
        payee: e.target.value,
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

  const handlePropertyFormValues2 = e => {
    setState2({ ...state2, [e.target.name]: e.target.value });
  };
  const handlePostalFormValues = e => {
    setPostalAddress({ ...postalAddress, [e.target.name]: e.target.value });
  };
  const handlePhysicalFormValues = e => {
    setPhysicalAddress({ ...physicalAddress, [e.target.name]: e.target.value });
  };

  const handlePostalAddForm = () => {
    setPostalAddForm(prev => !prev);
  };

  const handlePhysicalAddForm = () => {
    setPhysicalAddForm(prev => !prev);
  };

  const toggleInspectionDisableBtn = () => {
    setOwnerAccess(0);
    setInspectionDisableBtn(true);
    setInspectionEnableBtn(false);
  };
  const toggleInspectionEnableBtn = () => {
    setOwnerAccess(1);
    setInspectionEnableBtn(true);
    setInspectionDisableBtn(false);
  };

  const handleSelectGroup = e => {
    setSelectedGroup(e);
    setSelectedId(e.value);
  };
  const handleSelectGroup2 = e => {
    setState2({ ...state2, regular_intervals: e.value });
    setSelectedGroup2(e);
    setSelectedId2(e.value);
  };
  const handleSelectGroup3 = e => {
    setState2({ ...state2, gained_reason: e.value });
    setSelectedGroup3(e);
    setSelectedId3(e.value);
  };

  // Fees Form Handler functions
  const handleRowResult = async e => {
    e.preventDefault();
    if (state3.length === 0 && state7.length === 0) setfeesModal(true);

    const values = [...state3];

    await state3.forEach(async (el, idx) => {
      if (el.fee_template_1 === "Admin Fee (৳)") {
        if (el.amount_1.length === 0) {
          values[idx]["errorState"] = true;
          values[idx]["error"] = " Invalid amount.";
          await setState3(values);
          return;
        } else {
          values[idx]["errorState"] = false;
          values[idx]["error"] = "";
          await setState3(values);
        }
      } else {
        values[idx]["errorState"] = false;
        values[idx]["error"] = "";
        await setState3(values);
      }
      // else {
      //   setEnteredState(true)
      // }
    });
    // false true
    await state3.forEach(async (element, idx) => {
      if (element.errorState == true) {
        setEnteredState(false);
      } else {
        setEnteredState(true);
      }
    });

    const values1 = [...state7];

    await state7.forEach(async (el, idx) => {
      if (el.fee_template_2 === "Commercial Management Fee (%)") {
        if (el.amount_2.length === 0) {
          values1[idx]["errorState"] = true;
          values1[idx]["error"] = " Invalid amount.";
          await setState7(values1);
          return;
        } else {
          values1[idx]["errorState"] = false;
          values1[idx]["error"] = "";
          await setState7(values1);
        }
      } else if (el.fee_template_2 === "Letting fee (৳)") {
        if (el.amount_2.length === 0) {
          values1[idx]["errorState"] = true;
          values1[idx]["error"] = " Invalid amount.";
          await setState7(values1);
          return;
        } else {
          values1[idx]["errorState"] = false;
          values1[idx]["error"] = "";
          await setState7(values1);
        }
      } else if (el.fee_template_2 === "Management fee (%)") {
        if (el.amount_2.length === 0) {
          values1[idx]["errorState"] = true;
          values1[idx]["error"] = " Invalid amount.";
          await setState7(values1);
          return;
        } else {
          values1[idx]["errorState"] = false;
          values1[idx]["error"] = "";
          await setState7(values1);
        }
      } else {
        values1[idx]["errorState"] = false;
        values1[idx]["error"] = "";
        await setState7(values1);
      }
    });

    await state7.forEach(async (element, idx) => {
      if (element.errorState == true) {
        setEnteredState(false);
      } else {
        setEnteredState(true);
      }
    });
  };

  if (enteredState) {
    setEnteredState(false);

    // toggleTab(tabState.activeTab + 1);
    // setFormSubmitBtnState(formSubmitBtnState + 1);
  }

  const toggleFeesModalHandler = () => {
    toggleFeesModal();
    setEnteredState(true);
  };

  const handleChangeInput = async (idx, e, type) => {
    const values = [...state3];

    values[idx][type] = e.value;
    values[idx]["selectedValues"] = e;
    values[idx]["income_account_1"] = "Administration fee (inc. tax)";
    values[idx]["fee_trigger_1"] = "Each statement period";
    values[idx]["notes_1"] = "";
    await setState3(values);

    setSelectedGroup6(e);
    setSelectedId6(e.value);
    setTableInfoShow3(true);
  };

  const handleChangeInput2 = async (idx, e, type) => {
    const values = [...state7];
    values[idx][type] = e.label;
    values[idx]["selectedValues"] = e;
    if (e.value === "1") {
      values[idx]["income_account_2"] = "Commercial Management fee (%)";
      values[idx]["fee_trigger_2"] = "Rental receipt";
      values[idx]["notes_2"] = "";
    } else if (e.value === "2") {
      values[idx]["income_account_2"] = "Letting fee (inc. tax) (৳)";
      values[idx]["fee_trigger_2"] = "First rent receipt";
      values[idx]["notes_2"] = "";
    } else if (e.value === "3") {
      values[idx]["income_account_2"] = "Management fee (inc. tax) (%)";
      values[idx]["fee_trigger_2"] = "Rental receipt";
      values[idx]["notes_2"] = "";
    }
    await setState7(values);

    setSelectedGroup7(e);
    setSelectedId7(e.value);
    setTableInfoShow7(true);
  };
  const handlePropertyFormValues4 = (idx, e) => {
    let data = [...state3];
    data[idx][e.target.name] = e.target.value;
    setState3(data);
  };
  const handlePropertyFormValues7 = (idx, e) => {
    let data = [...state7];
    data[idx][e.target.name] = e.target.value;
    setState7(data);
  };
  const handleRemoveRow = (e, idx) => {
    if (rows3.length > 0) {
      var rowIndex = [...rows3];
      rowIndex.splice(idx, 1);
      setRows3(rowIndex);

      var rowStateValue = [...state3];
      rowStateValue.splice(idx, 1);
      setState3(rowStateValue);
    }
  };
  const handleRemoveRow7 = (e, idx) => {
    if (rows4.length > 0) {
      var rowIndex = [...rows4];
      rowIndex.splice(idx, 1);
      setRows4(rowIndex);

      var rowStateValue = [...state7];
      rowStateValue.splice(idx, 1);
      setState7(rowStateValue);
    }
  };
  const handleAddRow = () => {
    const item = {
      name: "",
    };
    setRows3([...rows3, item]);

    setState3([
      ...state3,
      {
        selectedValues: {},
        fee_template_1: "",
        income_account_1: "",
        fee_trigger_1: "",
        notes_1: "",
        amount_1: "",
        errorState: false,
        error: "none",
      },
    ]);
  };
  const handleAddRow7 = () => {
    const item = {
      name: "",
    };
    setRows4([...rows4, item]);

    setState7([
      ...state7,
      {
        selectedValues: {},
        fee_template_2: "",
        income_account_2: "",
        fee_trigger_2: "",
        notes_2: "",
        amount_2: "",
        amountPlaceholder: "",
        errorState: false,
        error: "none",
      },
    ]);
  };
  // ---------------------

  // Payment method functions
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

  const handleRowResult2 = async e => {
    e.preventDefault();
    if (state8.length === 0) {
      setEnteredState(true);
    } else {
      const values = [...state8];
      var split = 0;
      var lengthSp = state8.length;
      await state8.forEach(async (element, idx) => {
        if (lengthSp > 1) {
          if (values[idx]["split_type"] == "%") {
            split += Number(element.split);
          }
        }
        if (element.method == "EFT") {
          if (element.payee == "") {
            values[idx]["errorState"] = true;
            values[idx]["error"] = "Enter a Payee for EFT payment";
            await setState8(values);
            return;
          } else if (element.bsb.length < 6) {
            values[idx]["errorState"] = true;
            values[idx]["error"] = "Enter a 6-digit BSB";
            await setState8(values);
            return;
          } else if (element.account == "") {
            values[idx]["errorState"] = true;
            values[idx]["error"] = " Enter an Account number";
            await setState8(values);
            return;
          } else {
            values[idx]["errorState"] = false;
            values[idx]["error"] = "";
            await setState8(values);
          }
        }
        if (element.method == "Cheque") {
          if (element.payee == "") {
            values[idx]["errorState"] = true;
            values[idx]["error"] = "Enter a Payee for Cheque payment";
            await setState8(values);
            return;
          } else {
            values[idx]["errorState"] = false;
            values[idx]["error"] = "";
            await setState8(values);
          }
        }
        if (split > 100 || element.split === 0) {
          values[lengthSp - 1]["errorState"] = true;
          values[lengthSp - 1]["error"] = "Invalid Percentage";
          await setState8(values);
        }
      });

      await state8.forEach(async (element, idx) => {
        if (element.errorState == false) {
          setEnteredState(true);
        } else {
          setEnteredState(false);
        }
      });
    }
  };

  if (enteredState) {
    setEnteredState(false);
    console.log("Save & Exit-----");
    props.addBuyer(
      state,
      id,
      saleId,
      state2,
      phone,
      state8,
      physicalAddress,
      postalAddress,
      contactId
    );
  }
  const handleFocus = event => event.target.select();
  // -----------------------------

  let option;
  if (props.contacts_list_data && optionGroupState) {
    option = props.contacts_list_data.data.map(item => ({
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

  const checkAddressHandler = () => {
    if (addressState) {
      let building = postalAddress.postal_building_name
        ? postalAddress.postal_building_name + " "
        : "";
      let unit = postalAddress.postal_unit
        ? postalAddress.postal_unit + "/"
        : "";
      let number = postalAddress.postal_number
        ? postalAddress.postal_number + " "
        : "";
      let street = postalAddress.postal_street
        ? postalAddress.postal_street + ", "
        : "";
      let suburb = postalAddress.postal_suburb
        ? postalAddress.postal_suburb + ", "
        : "";
      let pstate = postalAddress.postal_state
        ? postalAddress.postal_state + " "
        : "";
      let postcode = postalAddress.postal_postcode
        ? postalAddress.postal_postcode + " "
        : "";
      let country = postalAddress.postal_country
        ? postalAddress.postal_country
        : "";
      setFullPhysicalAddress(
        building + unit + number + street + suburb + pstate + postcode + country
      );
      setPhysicalAddress({
        ...physicalAddress,
        physical_building_name: postalAddress.postal_building_name,
        physical_country: postalAddress.postal_country,
        physical_number: postalAddress.postal_number,
        physical_postcode: postalAddress.postal_postcode,
        physical_state: postalAddress.postal_state,
        physical_street: postalAddress.postal_street,
        physical_suburb: postalAddress.postal_suburb,
        physical_unit: postalAddress.postal_unit,
      });
      setPhysicalAddForm(true);
    } else {
      setFullPhysicalAddress("");
      setPhysicalAddress({
        ...physicalAddress,
        physical_building_name: "",
        physical_country: "",
        physical_number: "",
        physical_postcode: "",
        physical_state: "",
        physical_street: "",
        physical_suburb: "",
        physical_unit: "",
      });
    }
    setAddressState(prev => !prev);
  };

  const agreementStartDate = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    setState2({ ...state2, ["agreement_start"]: dateStr });
  };
  const agreementEndDate = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    setState2({ ...state2, ["agreement_end"]: dateStr });
  };
  const dateContractHandler = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    setState2({ ...state2, ["contract_exc"]: dateStr });
  };
  const dateDepositHandler = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    setState2({ ...state2, ["deposit_due"]: dateStr });
  };

  const dateSettleMentDueHandler = (selectedDates, dateStr, instance) => {
    console.log(dateStr);
    setState2({ ...state2, ["settlement_due"]: dateStr });
  };

  const handlePushData = () => {
    props.showContactFresh();
    if (selectedId) {
      setContactState(true);
    }
    handleClose();
    // history.push("/set/setPropertyOwnerAdd/" + selectedId + "/" + id);
  };

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

  return (
    <div className="page-content">
      <div className="wizard clearfix">
        <Card>
          <CardBody>
            <h4 className="ms-2 text-primary">Sold</h4>
            <div
              className="my-3"
              style={{
                borderBottom: "1.2px dotted #c9c7c7",
              }}
            ></div>
            <div className="steps clearfix">
              <ul>
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
                    <span className="number">1.</span> Contact
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
                    <span className="number">2.</span> <span>Folios</span>
                  </NavLink>
                </NavItem>

                <NavItem
                  className={classnames({
                    current: tabState.activeTab === 3,
                  })}
                >
                  <NavLink
                    disabled={!(tabState.passedSteps || []).includes(3)}
                    className={
                      (classnames({
                        active: tabState.activeTab === 3,
                      }),
                      "done")
                    }
                    onClick={() => {
                      toggleTab(3);
                      setFormSubmitBtnState(3);
                    }}
                  >
                    <span className="number">3.</span> Payment Methods
                  </NavLink>
                </NavItem>
              </ul>
            </div>
          </CardBody>
        </Card>

        <div className="content clearfix">
          <TabContent activeTab={tabState.activeTab} className="body">
            <TabPane tabId={1}>
              <Row>
                <Col sm="12">
                  <div className="d-flex flex-column justify-content-start">
                    <div>
                      <div>
                        <div className="mb-3">
                          {/* {props.error ? (
                          <Alert color="danger">
                            {JSON.stringify(props.error.response.data.message)}
                          </Alert>
                        ) : null} */}
                          <Formik
                            enableReinitialize={true}
                            initialValues={{
                              reference: (state && state.reference) || "",
                              first_name: (state && state.first_name) || "",

                              last_name: (state && state.last_name) || "",
                              salutation: (state && state.salutation) || "",
                              company_name: (state && state.company_name) || "",
                              mobile_phone: (phone && phone.mobile_phone) || "",
                              work_phone: (phone && phone.work_phone) || "",
                              home_phone: (phone && phone.home_phone) || "",
                              email: (state && state.email) || "",

                              postal_building_name:
                                (postalAddress &&
                                  postalAddress.postal_building_name) ||
                                "",
                              postal_unit:
                                (postalAddress && postalAddress.postal_unit) ||
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
                                (postalAddress && postalAddress.postal_state) ||
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
                              check: checkState ? checkState : [],
                              notes: (state && state.notes) || "",
                            }}
                            validationSchema={Yup.object().shape({})}
                            onSubmit={(values, onSubmitProps) => {
                              // setState(values);
                              toggleTab(tabState.activeTab + 1);
                              setFormSubmitBtnState(formSubmitBtnState + 1);
                            }}
                          >
                            {({ errors, status, touched }) => (
                              <div>
                                <div>
                                  <Form
                                    className="form-horizontal"
                                    id="seller-form-1"
                                  >
                                    <div>
                                      <Card>
                                        <CardBody>
                                          <div
                                            className="w-75 d-flex justify-content-between align-items-center pb-1"
                                            style={{
                                              borderBottom:
                                                "1.2px dotted #c9c7c7",
                                            }}
                                          >
                                            <div>
                                              <CardTitle className="mb-3">
                                                <h4 className="text-primary">
                                                  New Buyer Contact
                                                </h4>
                                              </CardTitle>
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
                                                  <div className="modal-header">
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
                                                      onClick={handleClose}
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
                                                        value={selectedGroup}
                                                        onChange={
                                                          handleSelectGroup
                                                        }
                                                        options={optionGroup}
                                                        classNamePrefix="select2-selection"
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="modal-footer">
                                                    <button
                                                      type="button"
                                                      onClick={handleClose}
                                                      className="btn btn-primary"
                                                      data-dismiss="modal"
                                                    >
                                                      Close
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn btn-primary"
                                                      onClick={handlePushData}
                                                    >
                                                      OK
                                                    </button>
                                                  </div>
                                                </Modal>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="my-3 w-75">
                                            <Row className="d-flex justify-content-evenly align-items-center">
                                              <Col md={2}>
                                                <Label
                                                  for="reference"
                                                  className="form-label"
                                                >
                                                  Reference
                                                </Label>
                                              </Col>

                                              <Col md={8}>
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
                                                    handleReferenceValues
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="reference"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Row>
                                          </div>
                                        </CardBody>
                                      </Card>
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
                                                            handleSubmit(e, idx)
                                                          }
                                                        >
                                                          <span
                                                            style={{
                                                              textDecoration:
                                                                state?.contacts[
                                                                  idx
                                                                ].deleted
                                                                  ? "line-through"
                                                                  : "none",
                                                            }}
                                                            title={
                                                              state?.contacts[
                                                                idx
                                                              ].first_name ||
                                                              state?.contacts[
                                                                idx
                                                              ].last_name ||
                                                              state?.contacts[
                                                                idx
                                                              ].company_name
                                                                ? state
                                                                    ?.contacts[
                                                                    idx
                                                                  ].reference
                                                                : "New Person"
                                                            }
                                                          >
                                                            {idx == 0 && (
                                                              <i className="fas fa-star"></i>
                                                            )}{" "}
                                                            {state?.contacts[
                                                              idx
                                                            ].first_name ||
                                                            state?.contacts[idx]
                                                              .last_name ||
                                                            state?.contacts[idx]
                                                              .company_name
                                                              ? state?.contacts[
                                                                  idx
                                                                ].reference
                                                                  .length <= 12
                                                                ? state
                                                                    ?.contacts[
                                                                    idx
                                                                  ].reference
                                                                : state?.contacts[
                                                                    idx
                                                                  ].reference.slice(
                                                                    0,
                                                                    12
                                                                  ) + "...."
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
                                                    onClick={handleBtnRows}
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

                                          {state.contacts?.map((item, idx) => {
                                            {
                                              /* console.log("checking"); */
                                            }
                                            return (
                                              <div
                                                key={idx}
                                                style={
                                                  activeState === idx
                                                    ? { display: "block" }
                                                    : { display: "none" }
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
                                                  state={state.contacts[idx]}
                                                  countDelete={countDelete}
                                                  checkHandler={checkHandler}
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
                                                    fullPhysicalAddress[idx]
                                                  }
                                                  setFullPhysicalAddress={
                                                    setFullPhysicalAddress
                                                  }
                                                  fullPostalAddress={
                                                    fullPostalAddress[idx]
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
                                          })}
                                        </CardBody>
                                      </Card>
                                      <Card>
                                        <CardBody>
                                          <h4 className="text-primary mb-3">
                                            Commercial Seller
                                            <div className="w-75 mt-2 mb-2"></div>
                                          </h4>
                                          <div
                                            style={{
                                              borderBottom:
                                                "1.2px dotted #c9c7c7",
                                            }}
                                            className="mb-3 w-75"
                                          ></div>

                                          <div className="mb-3 w-75">
                                            <Row>
                                              <Col md={2}>
                                                <Label
                                                  for="abn"
                                                  className="form-label"
                                                >
                                                  ABN
                                                </Label>
                                              </Col>

                                              <Col md={8}>
                                                <Field
                                                  name="abn"
                                                  type="text"
                                                  value={state.abn}
                                                  className={
                                                    "form-control" +
                                                    (errors.abn && touched.abn
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  onChange={
                                                    handlePropertyFormValues
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="abn"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Row>
                                          </div>
                                        </CardBody>
                                      </Card>
                                      <Card>
                                        <CardBody>
                                          <h4 className="text-primary mb-3">
                                            Notes
                                            <div className="w-75 mt-2 mb-2"></div>
                                          </h4>{" "}
                                          <div
                                            style={{
                                              borderBottom:
                                                "1.2px dotted #c9c7c7",
                                            }}
                                            className="mb-3 w-75"
                                          ></div>
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
                                                  value={state.notes}
                                                  className={
                                                    "form-control" +
                                                    (errors.notes &&
                                                    touched.notes
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  onChange={
                                                    handlePropertyFormValues
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
                                      </Card>
                                    </div>
                                  </Form>
                                </div>
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
                  {" "}
                  <Row>
                    <Col md={12}>
                      <div className="d-flex flex-column justify-content-start">
                        <div>
                          <div>
                            <div className="mb-3">
                              {/* {props.error ? (
                                <Alert color="danger">
                                  {JSON.stringify(props.error.response.data.message)}
                                </Alert>
                              ) : null} */}
                              <Formik
                                enableReinitialize={true}
                                initialValues={{
                                  agreement_start:
                                    (state2 && state2.agreement_start) || "",
                                  agreement_end:
                                    (state2 && state2.agreement_end) || "",
                                  agreement_end:
                                    (state2 && state2.agreement_end) || "",
                                  asking_price:
                                    (state2 && state2.asking_price) || "",
                                  commission:
                                    (state2 && state2.commission) || "",
                                  purchase_price:
                                    (state2 && state2.purchase_price) || "",
                                  contract_exc:
                                    (state2 && state2.contract_exc) || "",
                                  deposit_due:
                                    (state2 && state2.deposit_due) || "",
                                  settlement_due:
                                    (state2 && state2.settlement_due) || "",
                                }}
                                onSubmit={(values, onSubmitProps) => {
                                  setState2(values);
                                  toggleTab(tabState.activeTab + 1);
                                  setFormSubmitBtnState(formSubmitBtnState + 1);
                                }}
                              >
                                {({ errors, status, touched }) => (
                                  <div>
                                    <Form
                                      className="form-horizontal"
                                      id="seller-form-2"
                                    >
                                      <div>
                                        <Card>
                                          <CardBody>
                                            <h4 className="mb-3 text-primary">
                                              Sale Details
                                            </h4>

                                            <div
                                              className="w-100 mt-2 mb-4"
                                              style={{
                                                borderBottom:
                                                  "1.2px dotted #c9c7c7",
                                              }}
                                            ></div>

                                            <Row className="mb-3">
                                              <Col md={3}>
                                                <Label
                                                  for="agreement_start"
                                                  className="form-label text-dark"
                                                >
                                                  Agreement Start
                                                </Label>
                                              </Col>
                                              <Col md={5}>
                                                <div className="w-75">
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
                                                      format: "d/m/Y",
                                                      altFormat: "d/m/Y",
                                                      onChange:
                                                        agreementStartDate,
                                                    }}
                                                  />
                                                </div>
                                                <ErrorMessage
                                                  name="agreement_start"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                              <Col md={4}></Col>
                                            </Row>
                                            <Row className="mb-3">
                                              <Col md={3}>
                                                <Label
                                                  for="agreement_end"
                                                  className="form-label text-dark"
                                                >
                                                  Agreement End
                                                </Label>
                                              </Col>
                                              <Col md={5}>
                                                <div className="w-75">
                                                  <Flatpickr
                                                    className="form-control d-block"
                                                    placeholder="Pick a date..."
                                                    value={state2.agreement_end}
                                                    // disabled={disabledState}
                                                    // onChange={() => dateHandler()}
                                                    options={{
                                                      altInput: true,
                                                      format: "d/m/Y",
                                                      altFormat: "d/m/Y",
                                                      onChange:
                                                        agreementEndDate,
                                                    }}
                                                  />
                                                </div>
                                                <ErrorMessage
                                                  name="agreement_end"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                              <Col md={4}></Col>
                                            </Row>
                                            <Row className="mb-3">
                                              <Col md={3}>
                                                <Label
                                                  for="asking_price"
                                                  className="form-label text-dark"
                                                >
                                                  Asking price
                                                </Label>
                                              </Col>
                                              {/* <Col md={5}>
                                                <Field
                                                  id="asking_price"
                                                  name="asking_price"
                                                  type="number"
                                                  placeholder="$0.00"
                                                  className={
                                                    "form-control" +
                                                    (errors.asking_price &&
                                                    touched.asking_price
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={state2.asking_price}
                                                  onChange={
                                                    handlePropertyFormTwoValues
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="asking_price"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col> */}
                                              <Col md={5} className="d-flex">
                                                <div className="d-flex flex-column">
                                                  <Field
                                                    id="asking_price"
                                                    name="asking_price"
                                                    type="text"
                                                    placeholder="0.00"
                                                    className={
                                                      "form-control" +
                                                      (errors.asking_price &&
                                                      touched.asking_price
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    style={{
                                                      borderTopRightRadius: 0,
                                                      borderBottomRightRadius: 0,
                                                    }}
                                                    value={state2.asking_price}
                                                    onChange={
                                                      handlePropertyFormTwoValues
                                                    }
                                                  />
                                                  <ErrorMessage
                                                    name="asking_price"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
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
                                              </Col>
                                              <Col md={4}></Col>
                                            </Row>
                                            <Row className="mb-3">
                                              <Col md={3}>
                                                <Label
                                                  for="purchase_price"
                                                  className="form-label text-dark"
                                                >
                                                  Purchase price
                                                </Label>
                                              </Col>
                                              {/* <Col md={5}>
                                                <Field
                                                  id="purchase_price"
                                                  name="purchase_price"
                                                  type="number"
                                                  placeholder="$0.00"
                                                  className={
                                                    "form-control" +
                                                    (errors.purchase_price &&
                                                    touched.purchase_price
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={state2.purchase_price}
                                                  onChange={
                                                    handlePropertyFormTwoValues
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="purchase_price"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col> */}
                                              <Col md={5} className="d-flex">
                                                <div className="d-flex flex-column">
                                                  <Field
                                                    id="purchase_price"
                                                    name="purchase_price"
                                                    type="text"
                                                    placeholder="0.00"
                                                    className={
                                                      "form-control" +
                                                      (errors.purchase_price &&
                                                      touched.purchase_price
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    style={{
                                                      borderTopRightRadius: 0,
                                                      borderBottomRightRadius: 0,
                                                    }}
                                                    value={
                                                      state2.purchase_price
                                                    }
                                                    onChange={
                                                      handlePropertyFormTwoValues
                                                    }
                                                  />
                                                  <ErrorMessage
                                                    name="purchase_price"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
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
                                              </Col>
                                              <Col md={4}></Col>
                                            </Row>
                                            <Row className="mb-3">
                                              <Col md={3}>
                                                <Label
                                                  for="contract_exc"
                                                  className="form-label text-dark"
                                                >
                                                  Contract exchange
                                                </Label>
                                              </Col>
                                              <Col md={5}>
                                                <div className="w-75">
                                                  <Flatpickr
                                                    className="form-control d-block"
                                                    placeholder="Pick a date..."
                                                    value={state2.contract_exc}
                                                    options={{
                                                      altInput: true,
                                                      format: "d/m/Y",
                                                      altFormat: "d/m/Y",
                                                      onChange:
                                                        dateContractHandler,
                                                    }}
                                                  />
                                                </div>
                                                <ErrorMessage
                                                  name="contract_exc"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                              <Col md={4}></Col>
                                            </Row>
                                            <Row className="mb-3">
                                              <Col md={3}>
                                                <Label
                                                  for="deposit_due"
                                                  className="form-label text-dark"
                                                >
                                                  Deposit due
                                                </Label>
                                              </Col>
                                              <Col md={5}>
                                                <div className="w-75">
                                                  <Flatpickr
                                                    className="form-control d-block"
                                                    placeholder="Pick a date..."
                                                    value={state2.deposit_due}
                                                    options={{
                                                      altInput: true,
                                                      format: "d/m/Y",
                                                      altFormat: "d/m/Y",
                                                      onChange:
                                                        dateDepositHandler,
                                                    }}
                                                  />
                                                </div>
                                                <ErrorMessage
                                                  name="deposit_due"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                              <Col md={4}></Col>
                                            </Row>
                                            <Row className="mb-3">
                                              <Col md={3}>
                                                <Label
                                                  for="settlement_due"
                                                  className="form-label text-dark"
                                                >
                                                  Settlement due
                                                </Label>
                                              </Col>
                                              <Col md={5}>
                                                <div className="w-75">
                                                  <Flatpickr
                                                    className="form-control d-block"
                                                    placeholder="Pick a date..."
                                                    value={
                                                      state2.settlement_due
                                                    }
                                                    // disabled={disabledState}
                                                    // onChange={() => dateHandler()}
                                                    options={{
                                                      altInput: true,
                                                      format: "d/m/Y",
                                                      altFormat: "d/m/Y",
                                                      onChange:
                                                        dateSettleMentDueHandler,
                                                    }}
                                                  />
                                                </div>
                                                <ErrorMessage
                                                  name="settlement_due"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                              <Col md={4}></Col>
                                            </Row>
                                            <Row className="mb-3">
                                              <Col md={3}>
                                                <Label
                                                  for="commission"
                                                  className="form-label text-dark"
                                                >
                                                  Commission
                                                </Label>
                                              </Col>
                                              {/* <Col md={5}>
                                                <Field
                                                  id="commission"
                                                  name="commission"
                                                  type="number"
                                                  placeholder="$0.00"
                                                  className={
                                                    "form-control" +
                                                    (errors.commission &&
                                                    touched.commission
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={state2.commission}
                                                  onChange={
                                                    handlePropertyFormTwoValues
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="commission"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col> */}
                                              <Col md={5} className="d-flex">
                                                <div className="d-flex flex-column">
                                                  <Field
                                                    id="commission"
                                                    name="commission"
                                                    type="text"
                                                    placeholder="0.00"
                                                    className={
                                                      "form-control" +
                                                      (errors.commission &&
                                                      touched.commission
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    style={{
                                                      borderTopRightRadius: 0,
                                                      borderBottomRightRadius: 0,
                                                    }}
                                                    value={state2.commission}
                                                    onChange={
                                                      handlePropertyFormTwoValues
                                                    }
                                                  />
                                                  <ErrorMessage
                                                    name="commission"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
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
                                              </Col>
                                              <Col md={4}>
                                                <i
                                                  className="fas fa-info-circle
"
                                                ></i>
                                                <span>
                                                  A bill for sales commission
                                                  will be created for this value
                                                  when the sales folio is
                                                  disbursed
                                                </span>
                                              </Col>
                                            </Row>
                                          </CardBody>
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
                </Col>
              </Row>
            </TabPane>

            <TabPane tabId={3}>
              <Row>
                <Col xs="12">
                  <div>
                    <div>
                      <form
                        className="repeater mt-3"
                        id="seller-form-3"
                        encType="multipart/form-data"
                        onSubmit={handleRowResult2}
                      >
                        <table style={{ width: "100%" }}>
                          <tbody>
                            {accErr && <p>Alert</p>}
                            <Card>
                              <CardBody>
                                {console.log(state8)}
                                {console.log(rows5)}
                                {rows5.map((item, idx) => (
                                  <Row id={"addr" + idx} key={idx}>
                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="name">Method</label>
                                      <div>
                                        <div className="mb-3 select2-container">
                                          <Select
                                            value={
                                              state8[idx]["selectedValues"]
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
                                      <label htmlFor="payee">Payee</label>

                                      {state8[idx]["payeeType"] === true ? (
                                        <input
                                          name="payee"
                                          type="text"
                                          className={"form-control"}
                                          onChange={e =>
                                            handlePropertyFormValues8(idx, e)
                                          }
                                          value={state8[idx]["payee"]}
                                        />
                                      ) : null}
                                    </Col>
                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="bsb">BSB</label>
                                      {state8[idx]["bsbType"] === true ? (
                                        <input
                                          name="bsb"
                                          type="text"
                                          maxLength="6"
                                          className={"form-control"}
                                          value={state8[idx]["bsb"]}
                                          onChange={e =>
                                            handlePropertyFormValues8(idx, e)
                                          }
                                        />
                                      ) : null}
                                    </Col>

                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="account">Account #</label>

                                      {state8[idx]["accountType"] === true ? (
                                        <input
                                          name="account"
                                          type="text"
                                          className={"form-control"}
                                          value={state8[idx]["account"]}
                                          onChange={e =>
                                            handlePropertyFormValues8(idx, e)
                                          }
                                        />
                                      ) : null}
                                    </Col>

                                    <Col
                                      lg="2"
                                      className="mb-3 d-flex flex-column align-items-center"
                                    >
                                      <label htmlFor="split">Split</label>

                                      <Row className="d-flex flex-column">
                                        <Col className="d-flex">
                                          {state8[idx]["split_type_boolean"] ===
                                          true ? (
                                            <div className="btn-group btn-group-sm me-1">
                                              <Button
                                                className="d-flex align-items-center"
                                                color={
                                                  state8[idx]["split_type"] ===
                                                  "৳"
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
                                                  state8[idx]["split_type"] ===
                                                  "%"
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
                                            value={state8[idx]["split"]}
                                            placeholder="0.00"
                                            onChange={e =>
                                              handlePropertyFormValues8(idx, e)
                                            }
                                            disabled={
                                              !state8[idx]["split_type_boolean"]
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
                                        onClick={e => handleRemoveRow8(e, idx)}
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

                                <div className="d-flex justify-content-end">
                                  {" "}
                                  <Button
                                    onClick={handleAddRow8}
                                    color="info"
                                    className="mt-3 mt-lg-0"
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
        <div className="actions clearfix">
          <ul>
            <li
              className={
                tabState.activeTab === 1 ? "previous disabled" : "previous"
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
            <li className={tabState.activeTab === 3 ? "next disabled" : "next"}>
              <button
                type="submit"
                form={"seller-form-" + formSubmitBtnState}
                className="btn btn-primary"
              >
                <i className="fas fa-file-alt me-1"></i> Save & Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
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

    contacts_show_data,
  } = gstate.Contacts2;
  const {
    property_owner_add_loading,
    property_owner_info_loading,
    property_info_data,

    seller_add_loading,

    buyer_add_loading,

    edit_seller_info_property_data,
    edit_seller_info_property_error,
    edit_seller_info_property_loading,
  } = gstate.property;
  return {
    contacts_list_data,
    contacts_list_error,
    contacts_list_loading,

    contacts_add_loading,

    user_list_data,
    user_list_error,
    user_list_loading,

    property_owner_add_loading,
    property_owner_info_loading,

    property_info_data,

    contacts_show_data,
    seller_add_loading,

    buyer_add_loading,

    edit_seller_info_property_data,
    edit_seller_info_property_error,
    edit_seller_info_property_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addOwner,
    propertyOwnerInfoFresh,
    contactList,
    showContact,
    showContactFresh,
    propertyOwnerInfoFresh,
    propertyListFresh,
    addSaleAgreement,
    addSaleAgreementFresh,
    addBuyer,
    addBuyerFresh,
    SaleAgreementInfoFresh,
    SaleAgreementInfoForPropertyFresh,
    editSaleAgreementInfo,
    editSaleAgreementInfoFresh,
  })(SaleAgreement)
);
