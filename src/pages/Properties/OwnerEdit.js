import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Modal,
  Button,
} from "reactstrap";
import classnames from "classnames";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import moment from "moment";
import FrequencyAddModal from "./FrequencyAddModal";
import {
  addOwner,
  propertyOwnerInfoFresh,
} from "../../store/Properties/actions";
import {
  getOwnerInfo,
  editOwner,
  OwnerInfoFresh,
  OwnerUpdateFresh,
  getAddonsFresh,
  getPlanAddonsFresh,
  planListFresh,
  ownerPlan,
} from "store/actions";
import { contactList, showContactFresh } from "../../store/Contacts2/actions";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

import { Link, useHistory, withRouter, useParams, useLocation } from "react-router-dom";
import ChargeManualFeeModal from "./ChargeManualFeeModal";
import Plans from "./Plans";
import {
  optionMonth,
  optionDate,
  optionWeekName,
  regularIntervalOption,
  gainedReasonOption,
} from "pages/common/common";
import "./property.css";
import ContactForm from "pages/Contacts2/MultipleReference/ContactForm";
import NewOwnerFeeForm from "./Owner/NewOwnerFeeForm";
import NewPropertyFeeForm from "./Owner/NewPropertyFeeForm";

const OwnerEdit = props => {
  const { id, ownerFolioId, tabId } = useParams(); // Owner Contact Id
  const history = useHistory();
  const location = useLocation();
  const [state, setState] = useState({});
  const [ownerFolioState, setOwnerFolioState] = useState({
    folioId: ownerFolioId,
    folioCode: undefined,
    folioState: 'EXISTING_FOLIO'
  });
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
    customIconActiveTab: "1",
  });

  const [planState, setPlanState] = useState();
  const [planIndex, setPlanIndex] = useState({
    index: 0,
    selected: false,
    initialSelected: true,
    planFrequency: "",
    planID: undefined,
  });
  const [frequencyModalState, setFrequencyModalState] = useState(false);
  const [frequencyState, setFrequencyState] = useState({
    time: "06:00",
    fortNightlyDate: "",
    selectedMonth: {},
    selectedWeekName: {},
    selectedDate: {},
    frequencyType: "",
    optionMonth: optionMonth,
    optionDate: optionDate,
    optionWeekName: optionWeekName,
  });
  const [initial, setInitial] = useState(true);
  if (initial) {
    setInitial(false);
    props.getAddonsFresh();
    props.planListFresh();
    props.getPlanAddonsFresh();
  }
  // ---------
  const [step1, setStep1] = useState(false);
  const toggleTab = tab => {
    if (tabState.activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        let modifiedSteps = [...tabState.passedSteps, tab];
        setTabState({
          ...tabState,
          activeTab: tab,
          passedSteps: modifiedSteps,
        });
      }
    }
  };
  const toggleIconCustom = tab => {
    if (tabState.activeTab !== tab) {
      setTabState({ ...tabState, customIconActiveTab: tab });
    }
  };
  const toggleFrequencyModal = () => {
    setFrequencyModalState(prev => !prev);
  };

  const [formSubmitBtnState, setFormSubmitBtnState] = useState(
    tabId ? +tabId : 1
  ); // Form Submit Button State
  const [contactabId, setContactabId] = useState();
  const [propertyIdState, setPropertyIdState] = useState(true);
  const [propertyId, setPropertyId] = useState();
  const [chargeFeeModal, setChargeFeeModal] = useState(false);
  const [manualFeeData, setManualFeeData] = useState({
    id: "",
    description: "",
    property: "",
    notes: "",
  });

  const [phone, setPhone] = useState({
    mobile_phone: null,
    work_phone: null,
    home_phone: null,
  });

  const [selectedId2, setSelectedId2] = useState();
  const [selectedGroup2, setSelectedGroup2] = useState(null);
  const [optionGroup2, setOptionGroup2] = useState(regularIntervalOption);

  const [selectedId3, setSelectedId3] = useState();
  const [selectedGroup3, setSelectedGroup3] = useState(null);
  const [optionGroup3, setOptionGroup3] = useState(gainedReasonOption);
  // const [state, setState] = useState({}); // Form 1 State
  const [state2, setState2] = useState({}); // Form 2 State
  const [ownerAccess, setOwnerAccess] = useState(1);
  const [inspectionEnableBtn, setInspectionEnableBtn] = useState(true);
  const [inspectionDisableBtn, setInspectionDisableBtn] = useState(false);
  // Fees Form State
  const [rows3, setRows3] = useState([]);
  const [state3, setState3] = useState([]);

  const [state7, setState7] = useState([]);
  // ----------------------

  // Payment method state
  const [accErr, setAccErr] = useState(false);
  const [rows5, setRows5] = useState([]);
  const [state8, setState8] = useState([]);
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
  const [enteredStateTab3, setEnteredStateTab3] = useState(false);
  // ----------------------------
  const [dateCheck, setDateCheck] = useState({ nextDisburseDate: false });

  const [feesModal, setfeesModal] = useState(false);
  const toggleFeesModal = () => {
    setfeesModal(prev => !prev);
  };

  const toggleFeesModalHandler = () => {
    toggleFeesModal();
    setEnteredStateTab3(true);
  };

  if (propertyIdState) {
    setPropertyIdState(false)
    setPropertyId(location.state.proId)
  }

  const disburseDateHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ["next_disburse_date"]: dateStr });
  };

  const agreementDateHandler = (selectedDates, dateStr, instance) => {
    const months = moment(dateStr).add(12, "months").format("yyyy-MM-DD");
    const day = moment(months).subtract(1, "days").format("yyyy-MM-DD");
    setState2({
      ...state2,
      ["agreement_start"]: dateStr,
      ["agreement_end"]: day,
    });
  };

  const agreementEndDateHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ["agreement_end"]: dateStr });
  };

  const getDate = param => {
    let elm;
    frequencyState.optionDate.forEach(element => {
      element.options.forEach(el => {
        if (param == el.label) {
          elm = el;
        }
      });
    });
    return elm;
  };
  const getMonth = param => {
    let elm;
    frequencyState.optionMonth.forEach(element => {
      element.options.forEach(el => {
        if (param == el.value) {
          elm = el;
        }
      });
    });
    return elm;
  };

  useEffect(() => {
    props.ownerPlan(id, propertyId);
    props.OwnerInfoFresh()
    props.getOwnerInfo(id, ownerFolioId);
  }, [])
  // useEffect(() => {
  //   if (props.owner_info_loading === false) {
  //     props.getOwnerInfo(id, ownerFolioId);
  //   }
  // }, [props.owner_info_loading])
  useEffect(() => {
    if (props.property_owner_info_loading === "Success") {
      props.propertyOwnerInfoFresh();
    }
  }, [props.property_owner_info_loading])
  useEffect(() => {
    if (props.owner_info_loading == "Success") {
      let contacts = [];
      let contactsPhysical = [];
      let contactsPhysicalFull = [];
      let contactsPostal = [];
      let contactsPostalFull = [];
      let btn = [];
      let forChecks = [];

      props.owner_info_data?.data?.data?.contact_details?.map((item, key) => {
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
        reference: props.owner_info_data?.data?.data?.reference,
        abn: props.owner_info_data?.data?.data?.abn,
        notes: props.owner_info_data?.data?.data?.notes,
        contacts: contacts,
      };
      setState(data);
      setBtnRows(btn);
      setForCheck(forChecks);

      props.owner_info_data?.data?.contactPhysicalAddress?.map((item, key) => {
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
      props.owner_info_data?.data?.contactPostalAddress?.map((item, key) => {
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

      setContactabId(props.owner_info_data?.data?.data?.contact_id);
      setState2({
        ...state2,
        id: props.owner_info_data?.data?.ownerFolio?.id,
        total_money:
          props.owner_info_data?.data?.ownerFolio?.total_money,
        balance: props.owner_info_data?.data?.ownerFolio?.balance,
        regular_intervals:
          props.owner_info_data?.data?.ownerFolio?.regular_intervals,
        next_disburse_date:
          props.owner_info_data?.data?.ownerFolio?.next_disburse_date,
        withhold_amount:
          props.owner_info_data?.data?.ownerFolio?.withhold_amount,
        withold_reason:
          props.owner_info_data?.data?.ownerFolio?.withold_reason,
        agreement_start:
          props.owner_info_data?.data?.ownerFolio?.agreement_start,
        gained_reason:
          props.owner_info_data?.data?.ownerFolio?.gained_reason,
        comment: props.owner_info_data?.data?.ownerFolio?.comment,
        agreement_end:
          props.owner_info_data?.data?.ownerFolio?.agreement_end,
      });

      setOwnerFolioState({
        folioId: ownerFolioId,
        folioCode: props.owner_info_data?.data?.ownerFolio?.folio_code,
        folioState: 'EXISTING_FOLIO',
      })

      setDateCheck({
        ...dateCheck,
        nextDisburseDate: props.owner_info_data?.data?.ownerFolio
          ?.next_disburse_date
          ? true
          : false,
      });

      setOwnerAccess(
        props.owner_info_data?.data?.ownerFolio?.owner_access
      );
      setSelectedGroup2({
        label:
          props.owner_info_data?.data?.ownerFolio?.regular_intervals,
        value:
          props.owner_info_data?.data?.ownerFolio?.regular_intervals,
      });
      setSelectedGroup3({
        label: props.owner_info_data?.data?.ownerFolio?.gained_reason,
        value: props.owner_info_data?.data?.ownerFolio?.gained_reason,
      });

      setRows5([...props.owner_info_data?.data?.data?.owner_payment]);

      let lengthA = props.owner_info_data?.data?.data?.owner_payment.length;
      props.owner_info_data?.data?.data?.owner_payment.map((item, idx) => {
        item["selectedValues"] = { label: item.method, value: item.method };
        // item["payee"] = item.payee;
        item["payeeType"] =
          (item.method === "EFT" || item.method === "" || item.method === "Cheque") ? true : false;
        item["bsbType"] = item.method === "EFT" ? true : false;
        item["accountType"] = item.method === "EFT" ? true : false;
        item["split_type_boolean"] =
          lengthA > 1 ? (idx === lengthA - 1 ? false : true) : false;
        item["errorState"] = false;
        item["error"] = "none";
      });

      setState8([...props.owner_info_data?.data?.data?.owner_payment]);
    }
  }, [props.owner_info_loading])
  useEffect(() => {
    if (props.property_owner_update_loading === "Success") {
      toastr.success("Owner Updated");
      props.OwnerUpdateFresh();
      props.getAddonsFresh();
      props.getPlanAddonsFresh();
      props.planListFresh();
      history.push("/propertyInfo/" + propertyId);
    }
  }, [props.property_owner_update_loading])
  useEffect(() => {
    if (props.owner_plan_loading === "Success") {
      let plan = props.owner_plan_data;
      if (plan.ownerPlan) {
        setPlanIndex(prev => ({
          ...prev,
          planFrequency:
            plan.ownerPlan.untriggered_owner_plan_details.frequency_type,
          planID: plan.ownerPlan.menu_plan_id,
        }));
      }
    }
    //--------------------------------
  }, [
    props.owner_plan_loading,
  ]);

  const handlePropertyFormValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handlePropertyFormValues2 = e => {
    if (e.target.name == "agreement_start") {
      const date_end1 = moment(e.target.value)
        .add(12, "Month")
        .format("yyyy-MM-DD");
      setState2({
        ...state2,
        [e.target.name]: e.target.value,
        ["agreement_end"]: date_end1,
      });
    } else if (e.target.name == "next_disburse_date") {
      setDateCheck({ ...dateCheck, nextDisburseDate: true });
      setState2({ ...state2, [e.target.name]: e.target.value });
    } else {
      setState2({ ...state2, [e.target.name]: e.target.value });
    }
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
    if (
      state3.length === 0 &&
      state7.length === 0 &&
      planIndex.selected === false
    )
      setfeesModal(true);
    const values = [...state3];
    await state3.forEach(async (el, idx) => {
      if (el.amount.length === 0) {
        values[idx]["errorState"] = true;
        values[idx]["error"] = " Invalid amount.";
        await setState3(values);
        return;
      } else {
        values[idx]["errorState"] = false;
        values[idx]["error"] = "";
        await setState3(values);
      }
    });
    await state3.forEach(async (element, idx) => {
      if (element.errorState == true) {
        setEnteredStateTab3(false);
      } else if (planIndex.selected === false) {
        setEnteredStateTab3(true);
      }
    });
    if (state3.length === 0) setEnteredStateTab3(true)

    const values1 = [...state7];
    await state7.forEach(async (ele, midx) => {
      ele['data'].forEach(async (el, idx) => {
        if (el.amount.length === 0) {
          values1[midx]['data'][idx]["errorState"] = true;
          values1[midx]['data'][idx]["error"] = " Invalid amount.";
          await setState7(values1);
          return;
        } else {
          values1[midx]['data'][idx]["errorState"] = false;
          values1[midx]['data'][idx]["error"] = "";
          await setState7(values1);
        }
      })
    });

    await state7.forEach(async (element, midx) => {
      element.data.forEach((el, idx) => {
        if (el.errorState == true) {
          setEnteredStateTab3(false);
        } else if (planIndex.selected === false) {
          setEnteredStateTab3(true);
        }
      })
    });
    if (state7.length === 1 && state7[0]['data'].length === 0) {
      setEnteredStateTab3(true)
    }

    if (planIndex.selected === true) {
      setFrequencyModalState(true);
    }
  };

  if (enteredStateTab3) {
    setEnteredStateTab3(false);
    toggleTab(tabState.activeTab + 1);
    setFormSubmitBtnState(prev => {
      if (prev === 4) {
        return prev;
      } else return prev + 1;
    });
  }

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

  const handleRowResult2 = e => {
    e.preventDefault();
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
          } else if ((element.bsb.length < 6) || isNaN(element.bsb)) {
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
        if (element.errorState == false) {
          setEnteredState(true);
        } else {
          setEnteredState(false);
        }
      });
    }
  };

  if (enteredState && tabState.activeTab === 4) {
    setEnteredState(false);
    let planData;
    if (planIndex.selected === true) {
      planData = planState.filter((item, i) => i === planIndex.index);
    }
    props.editOwner(
      state,
      id,
      state2,
      phone,
      state3,
      state7,
      state8,
      ownerAccess,
      postalAddress,
      physicalAddress,
      checkState,
      null,
      planData,
      frequencyState,
      propertyId
    );
    props.propertyOwnerInfoFresh();
  }
  const handleFocus = event => event.target.select();
  const handleFocusOut = () => { };
  // -----------------------------

  const handleCreateBill = item => {
    setChargeFeeModal(prev => !prev);
    setManualFeeData({
      id: item.addon_id,
      description: item.display_name,
      notes: item.note,
      property: "",
      property_id: propertyId,
      owner_folio_id: props.owner_info_data?.data?.ownerFolio?.id,
    });
  };

  const toggleManualFeeModal = () => {
    setChargeFeeModal(prev => !prev);
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
      {frequencyModalState && (
        <FrequencyAddModal
          setEnteredStateTab3={setEnteredStateTab3}
          frequencyState={frequencyState}
          setFrequencyState={setFrequencyState}
          data={planIndex}
          frequencyModalState={frequencyModalState}
          toggleFrequencyModal={toggleFrequencyModal}
          edit={true}
          ownerContactId={id}
          planID={planIndex.planID}
          getDate={getDate}
          getMonth={getMonth}
          proId={propertyId}
        />
      )}
      {chargeFeeModal && (
        <ChargeManualFeeModal
          modalState={chargeFeeModal}
          toggle={toggleManualFeeModal}
          data={manualFeeData}
        />
      )}
      <div className="wizard clearfix">
        <h4 className="text-primary p-2">Edit Owner</h4>
        <Row>
          <Col lg="2">
            <Card
              style={{ borderRadius: "14px", margin: "0px", padding: "0px" }}
            >
              <CardBody style={{ margin: "0px", padding: "7px" }}>
                <h4
                  className="text-primary"
                  style={{ fontSize: "15px", padding: "5px 10px" }}
                >
                  Edit Owner - {state.reference || ""}
                </h4>
                {/* <div
                  className="my-3"
                  style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                /> */}

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
                    marginBottom: "20px",
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
                        setStep1(!step1);
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
                      <span style={{ fontSize: "12px" }}>Folios</span>
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
                      style={{ textAlign: "left" }}
                    >
                      <span className="number icon-tab-tenant-number">3</span>{" "}
                      <span style={{ fontSize: "12px" }}>Fees</span>
                    </NavLink>
                  </NavItem>
                  <NavItem
                    className={classnames({
                      current: tabState.activeTab === 4,
                    })}
                  //style={{ width: "33%" }}
                  >
                    <NavLink
                      disabled={!(tabState.passedSteps || []).includes(3)}
                      className={classnames({
                        active: tabState.activeTab === 4,
                      })}
                      onClick={() => {
                        toggleTab(4);
                        setFormSubmitBtnState(4);
                      }}
                      style={{
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      <span className="number icon-tab-tenant-number">4</span>{" "}
                      <span style={{ fontSize: "12px" }}>Payment Methods</span>
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
                              <div className="mb-3">
                                <Formik
                                  enableReinitialize={true}
                                  initialValues={{
                                    reference: (state && state.reference) || "",

                                    abn: (state && state.abn) || "",
                                    check: checkState ? checkState : [],

                                    notes: (state && state.notes) || "",
                                  }}
                                  validationSchema={Yup.object().shape({})}
                                  onSubmit={(values, onSubmitProps) => {


                                    const emptyNames = state.contacts.filter(item => !item.first_name.trim() || !item.last_name.trim() || !item.email.trim());



                                    if (emptyNames.length > 0) {
                                      const fName = state.contacts.filter(item => !item.first_name.trim())
                                      const lName = state.contacts.filter(item => !item.last_name.trim())
                                      const email = state.contacts.filter(item => !item.email.trim())
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
                                      <div>
                                        <Form
                                          className="form-horizontal"
                                          id="owner-form-1"
                                        >
                                          <div>
                                            <Card
                                              style={{
                                                borderRadius: "15px",
                                                backgroundColor: "#F2F6FA",
                                                border: "8px solid white",
                                                marginTop: "-30px",
                                                height: "150px",
                                              }}
                                            >
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
                                                          height: "50px",
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
                                                    <CardBody
                                                      style={{
                                                        paddingLeft: "5px",
                                                      }}
                                                    >
                                                      <CardTitle tag="h5">
                                                        Owner Contact
                                                      </CardTitle>

                                                      <div className="my-3 w-100">
                                                        <Row className="d-flex justify-content-evenly align-items-center">
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
                                                                  handlePropertyFormValues
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
                                                height: "150px",
                                              }}
                                            >
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
                                                  <Col xs={10} sm={9} md={11} lg={11}>
                                                    <CardBody
                                                      style={{
                                                        paddingLeft: "5px",
                                                      }}
                                                    >
                                                      <CardTitle tag="h5">
                                                        Commercial
                                                      </CardTitle>
                                                      <div className="mb-3 w-100">
                                                        <Row>
                                                          <Col md={12}>
                                                            <div className="form-group-new mt-2">
                                                              <Field
                                                                name="abn"
                                                                type="text"
                                                                value={
                                                                  state.abn
                                                                }
                                                                className={
                                                                  "form-control" +
                                                                  (errors.abn &&
                                                                    touched.abn
                                                                    ? " is-invalid"
                                                                    : "")
                                                                }
                                                                onChange={
                                                                  handlePropertyFormValues
                                                                }
                                                              />
                                                              <label htmlFor="usr">
                                                                {" "}
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
                                                height: "150px",
                                              }}
                                            >
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
                                                  <Col xs={10} sm={9} md={11} lg={11}>
                                                    <CardBody
                                                      style={{
                                                        paddingLeft: "5px",
                                                      }}
                                                    >
                                                      <CardTitle tag="h5">
                                                        Notes
                                                      </CardTitle>
                                                      <div className="mt-3 w-100">
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
                                                                value={
                                                                  state.notes
                                                                }
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
                                                              <label htmlFor="usr">
                                                                {" "}
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
                                    <Formik
                                      enableReinitialize={true}
                                      initialValues={{
                                        id: (state2 && state2.id) || "",
                                        total_money:
                                          (state2 && state2.total_money) ||
                                          "0.00৳",
                                        balance:
                                          (state2 && state2.balance) || "",
                                        regular_intervals:
                                          (state2 &&
                                            state2.regular_intervals) ||
                                          "",
                                        next_disburse_date:
                                          (state2 &&
                                            state2.next_disburse_date) ||
                                          "",
                                        withhold_amount:
                                          (state2 && state2.withhold_amount) ||
                                          "",
                                        withold_reason:
                                          (state2 && state2.withold_reason) ||
                                          "",
                                        agreement_start:
                                          (state2 && state2.agreement_start) ||
                                          "",
                                        gained_reason:
                                          (state2 && state2.gained_reason) ||
                                          "",
                                        comment:
                                          (state2 && state2.comment) || "",
                                        agreement_end:
                                          (state2 && state2.agreement_end) ||
                                          "",
                                      }}
                                      // validationSchema={Yup.object().shape({
                                      //   total_money: Yup.string().required(
                                      //     "Please Enter total money"
                                      //   ),
                                      //   balance: Yup.string().required(
                                      //     "Please Enter balance"
                                      //   ),
                                      //   regular_intervals: Yup.string().required(
                                      //     "Please Enter regular intervals"
                                      //   ),
                                      //   next_disburse_date: Yup.string().required(
                                      //     "Please Enter next disburse date"
                                      //   ),
                                      //   withhold_amount: Yup.string().required(
                                      //     "Please Enter withhold amount"
                                      //   ),
                                      //   withold_reason: Yup.string().required(
                                      //     "Please Enter withhold reason"
                                      //   ),
                                      //   agreement_start: Yup.string().required(
                                      //     "Please Enter agreement start date"
                                      //   ),
                                      //   gained_reason: Yup.string().required(
                                      //     "Please Enter gained reason"
                                      //   ),
                                      //   comment: Yup.string().required(
                                      //     "Please Enter comment"
                                      //   ),
                                      //   agreement_end: Yup.string().required(
                                      //     "Please Enter agreement end date"
                                      //   ),
                                      // })}
                                      onSubmit={(values, onSubmitProps) => {
                                        // setState2(values);
                                        toggleTab(tabState.activeTab + 1);
                                        setFormSubmitBtnState(
                                          formSubmitBtnState + 1
                                        );
                                      }}
                                    >
                                      {({ errors, status, touched }) => (
                                        <div>
                                          <Form
                                            className="form-horizontal"
                                            id="owner-form-2"
                                          >
                                            <div>
                                              <div className="mb-3">
                                                <Row>
                                                  <Col md={12}>
                                                    <Row
                                                      style={{ padding: "0px" }}
                                                    >
                                                      <Col md={6}>
                                                        <Card
                                                          style={{
                                                            borderRadius:
                                                              "15px",
                                                            backgroundColor:
                                                              "#F2F6FA",
                                                            border:
                                                              "8px solid white",
                                                            marginTop: "-30px",
                                                            height: "360px",
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
                                                                  padding:
                                                                    "0px",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    marginTop:
                                                                      "15px",
                                                                    display:
                                                                      "flex",
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
                                                                      width:
                                                                        "3px",
                                                                      height:
                                                                        "280px",
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
                                                                    paddingLeft:
                                                                      "10px",
                                                                  }}
                                                                >
                                                                  <CardTitle tag="h5">
                                                                    Disburse
                                                                  </CardTitle>

                                                                  {/* <div className="d-flex justify-content-center align-items-center my-3">
                                                                    <p className="text-muted">
                                                                      A new folio will be
                                                                      created for this property
                                                                    </p>
                                                                  </div> */}
                                                                  <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                                    {/* <Col md={3}>
                                                                      <Label
                                                                        for="building"
                                                                        className="form-label"
                                                                      >
                                                                        When should this folio
                                                                        be disbursed?
                                                                      </Label>
                                                                    </Col> */}

                                                                    <Col
                                                                      md={12}
                                                                    >
                                                                      <Row className="d-flex mb-2">
                                                                        <Col
                                                                          md={6}
                                                                        >
                                                                          <p>
                                                                            {" "}
                                                                            When
                                                                            total
                                                                            money
                                                                            in
                                                                            is
                                                                          </p>
                                                                        </Col>

                                                                        <Col
                                                                          md={6}
                                                                          className="d-flex"
                                                                        >
                                                                          <div className="d-flex flex-column">
                                                                            <div className="form-group-new">
                                                                              <Field
                                                                                name="total_money"
                                                                                type="text"
                                                                                placeholder="0.00"
                                                                                className={
                                                                                  "form-control" +
                                                                                  (errors.total_money &&
                                                                                    touched.total_money
                                                                                    ? " is-invalid"
                                                                                    : "")
                                                                                }
                                                                                value={
                                                                                  state2.total_money
                                                                                }
                                                                                style={{
                                                                                  borderTopRightRadius: 0,
                                                                                  borderBottomRightRadius: 0,
                                                                                }}
                                                                                onChange={
                                                                                  handlePropertyFormValues2
                                                                                }
                                                                              />
                                                                              <label htmlFor="usr">
                                                                                Total
                                                                                money
                                                                              </label>
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
                                                                              name="total_money"
                                                                              component="div"
                                                                              className="invalid-feedback"
                                                                            />
                                                                          </div>
                                                                        </Col>
                                                                      </Row>
                                                                      <Row
                                                                        className="d-flex mb-2"
                                                                        style={{
                                                                          marginTop:
                                                                            "-10px",
                                                                        }}
                                                                      >
                                                                        <Col
                                                                          md={6}
                                                                        >
                                                                          <p>
                                                                            {" "}
                                                                            When
                                                                            balance
                                                                            is
                                                                          </p>
                                                                        </Col>

                                                                        <Col
                                                                          md={6}
                                                                          className="d-flex"
                                                                        >
                                                                          <div className="d-flex flex-column">
                                                                            <div className="form-group-new">
                                                                              <Field
                                                                                name="balance"
                                                                                type="text"
                                                                                placeholder="0.00"
                                                                                className={
                                                                                  "form-control" +
                                                                                  (errors.balance &&
                                                                                    touched.balance
                                                                                    ? " is-invalid"
                                                                                    : "")
                                                                                }
                                                                                value={
                                                                                  state2.balance
                                                                                }
                                                                                style={{
                                                                                  borderTopRightRadius: 0,
                                                                                  borderBottomRightRadius: 0,
                                                                                }}
                                                                                onChange={
                                                                                  handlePropertyFormValues2
                                                                                }
                                                                              />
                                                                              <label htmlFor="usr">
                                                                                Balance
                                                                              </label>
                                                                            </div>
                                                                            <ErrorMessage
                                                                              name="balance"
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
                                                                      </Row>
                                                                      <Row
                                                                        className="d-flex"
                                                                        style={{
                                                                          marginTop:
                                                                            "-10px",
                                                                        }}
                                                                      >
                                                                        <Col
                                                                          md={6}
                                                                          className="d-flex"
                                                                        >
                                                                          <p>
                                                                            {" "}
                                                                            At
                                                                            regular
                                                                            intervals
                                                                          </p>
                                                                        </Col>
                                                                        <Col
                                                                          md={6}
                                                                        >
                                                                          <div className="mb-3">
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
                                                                                className={
                                                                                  errors.regular_intervals &&
                                                                                    touched.regular_intervals
                                                                                    ? " is-invalid"
                                                                                    : ""
                                                                                }
                                                                                name="regular_intervals"
                                                                              />{" "}
                                                                              <label htmlFor="usr">
                                                                                Intervals
                                                                              </label>
                                                                            </div>
                                                                            <ErrorMessage
                                                                              name="regular_intervals"
                                                                              component="div"
                                                                              className="invalid-feedback"
                                                                            />
                                                                          </div>
                                                                        </Col>
                                                                      </Row>
                                                                      <Row
                                                                        style={{
                                                                          marginTop:
                                                                            "-20px",
                                                                        }}
                                                                      >
                                                                        <Col
                                                                          md={6}
                                                                        >
                                                                          <p>
                                                                            Next
                                                                            disburse
                                                                            date
                                                                          </p>
                                                                        </Col>
                                                                        <Col
                                                                          md={6}
                                                                        >
                                                                          <div className="mb-3 row">
                                                                            <div className="col-md-10">
                                                                              <div className="form-group-new">
                                                                                <Flatpickr
                                                                                  className="form-control d-block"
                                                                                  placeholder="Pick a date..."
                                                                                  value={
                                                                                    state2.next_disburse_date
                                                                                  }
                                                                                  options={{
                                                                                    altInput: true,
                                                                                    format:
                                                                                      "d/m/Y",
                                                                                    altFormat:
                                                                                      "d/m/Y",
                                                                                    onChange:
                                                                                      disburseDateHandler,
                                                                                  }}
                                                                                />
                                                                                <label htmlFor="usr">
                                                                                  {" "}
                                                                                  Date
                                                                                </label>
                                                                              </div>
                                                                              <ErrorMessage
                                                                                name="next_disburse_date"
                                                                                component="div"
                                                                                className="invalid-feedback"
                                                                              />
                                                                            </div>
                                                                          </div>
                                                                        </Col>
                                                                      </Row>
                                                                    </Col>
                                                                  </Row>
                                                                </CardBody>
                                                              </Col>
                                                            </Row>
                                                          </Col>
                                                        </Card>
                                                      </Col>
                                                      <Col md={6}>
                                                        <Card
                                                          style={{
                                                            borderRadius:
                                                              "15px",
                                                            backgroundColor:
                                                              "#F2F6FA",
                                                            border:
                                                              "8px solid white",
                                                            marginTop: "-30px",
                                                            height: "360px",
                                                          }}
                                                        >
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
                                                                  display:
                                                                    "flex",
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
                                                                    width:
                                                                      "3px",
                                                                    height:
                                                                      "280px",
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
                                                                  paddingLeft:
                                                                    "10px",
                                                                }}
                                                              >
                                                                <CardTitle
                                                                  tag="h5"
                                                                  style={{
                                                                    marginBottom:
                                                                      "40px",
                                                                  }}
                                                                >
                                                                  Agreement
                                                                </CardTitle>

                                                                <div
                                                                  className="w-100"
                                                                  style={{
                                                                    marginTop:
                                                                      "-20px",
                                                                  }}
                                                                >
                                                                  <Row className="d-flex justify-content-evenly align-items-start">
                                                                    {/* <Col md={6} className='d-flex justify-content-start'>
                                                                      <Label
                                                                        for="building"
                                                                        className="form-label"
                                                                      >
                                                                        Agreement start
                                                                      </Label>
                                                                    </Col> */}

                                                                    <Col
                                                                      md={12}
                                                                      className=""
                                                                    >
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
                                                                              agreementDateHandler,
                                                                          }}
                                                                        />
                                                                        <label htmlFor="usr">
                                                                          Agreement
                                                                          start
                                                                        </label>
                                                                      </div>
                                                                    </Col>
                                                                  </Row>
                                                                  <Row className="justify-content-evenly align-items-start">
                                                                    {/* <Col md={2}>
                                                                      <Label
                                                                        for="building"
                                                                        className="form-label"
                                                                      >
                                                                        Gained reason
                                                                      </Label>
                                                                    </Col> */}

                                                                    <Col
                                                                      md={12}
                                                                    >
                                                                      <Row className="d-flex">
                                                                        <Col>
                                                                          <div>
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
                                                                                className={
                                                                                  errors.gained_reason &&
                                                                                    touched.gained_reason
                                                                                    ? " is-invalid"
                                                                                    : ""
                                                                                }
                                                                                name="gained_reason"
                                                                              />
                                                                              <ErrorMessage
                                                                                name="gained_reason"
                                                                                component="div"
                                                                                className="invalid-feedback"
                                                                              />
                                                                              <label htmlFor="usr">
                                                                                {" "}
                                                                                Gained
                                                                                reason
                                                                              </label>
                                                                            </div>
                                                                          </div>
                                                                        </Col>
                                                                      </Row>
                                                                    </Col>
                                                                  </Row>

                                                                  <Row className="justify-content-evenly align-items-start">
                                                                    {/* <Col md={2}>
                                                                      <Label
                                                                        for="building"
                                                                        className="form-label"
                                                                      >
                                                                        Comment (gained)
                                                                      </Label>
                                                                    </Col> */}

                                                                    <Col
                                                                      md={12}
                                                                    >
                                                                      <Row className="d-flex">
                                                                        <Col>
                                                                          <div className="form-group-new">
                                                                            {" "}
                                                                            <Field
                                                                              name="comment"
                                                                              type="text"
                                                                              className={
                                                                                "form-control" +
                                                                                (errors.comment &&
                                                                                  touched.comment
                                                                                  ? " is-invalid"
                                                                                  : "")
                                                                              }
                                                                              value={
                                                                                state2.comment
                                                                              }
                                                                              onChange={
                                                                                handlePropertyFormValues2
                                                                              }
                                                                            />
                                                                            <label htmlFor="usr">
                                                                              Comment(gained)
                                                                            </label>
                                                                          </div>
                                                                          <ErrorMessage
                                                                            name="comment"
                                                                            component="div"
                                                                            className="invalid-feedback"
                                                                          />
                                                                        </Col>
                                                                      </Row>
                                                                    </Col>
                                                                  </Row>
                                                                  <Row className="d-flex justify-content-evenly align-items-start">
                                                                    {/* <Col md={4}>
                                                                      <Label
                                                                        for="building"
                                                                        className="form-label"
                                                                      >
                                                                        Agreement ends
                                                                      </Label>
                                                                    </Col> */}

                                                                    <Col
                                                                      md={12}
                                                                    >
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
                                                                              agreementEndDateHandler,
                                                                          }}
                                                                        />

                                                                        <label htmlFor="usr">
                                                                          {" "}
                                                                          Agreement
                                                                          ends
                                                                        </label>
                                                                      </div>
                                                                    </Col>
                                                                  </Row>
                                                                </div>
                                                              </CardBody>
                                                            </Col>
                                                          </Row>
                                                        </Card>
                                                      </Col>
                                                    </Row>
                                                    <Row className="mt-4">
                                                      <Col md={6}>
                                                        <Card
                                                          style={{
                                                            borderRadius:
                                                              "15px",
                                                            backgroundColor:
                                                              "#F2F6FA",
                                                            border:
                                                              "8px solid white",
                                                            marginTop: "-30px",
                                                            height: "260px",
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
                                                                  padding:
                                                                    "0px",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    marginTop:
                                                                      "15px",
                                                                    display:
                                                                      "flex",
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
                                                                      width:
                                                                        "3px",
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
                                                              <Col
                                                                xs={10}
                                                                sm={9}
                                                                md={11}
                                                                lg={11}
                                                              >
                                                                <CardBody
                                                                  style={{
                                                                    paddingLeft:
                                                                      "10px",
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

                                                                  <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                                    <Col
                                                                      md={12}
                                                                    >
                                                                      <div className="d-flex">
                                                                        <div className="d-flex flex-column w-100">
                                                                          <div className="form-group-new">
                                                                            <Field
                                                                              name="withhold_amount"
                                                                              type="text"
                                                                              placeholder="0.00"
                                                                              className={
                                                                                "form-control" +
                                                                                (errors.withhold_amount &&
                                                                                  touched.withhold_amount
                                                                                  ? " is-invalid"
                                                                                  : "")
                                                                              }
                                                                              value={
                                                                                state2.withhold_amount
                                                                              }
                                                                              style={{
                                                                                borderTopRightRadius: 0,
                                                                                borderBottomRightRadius: 0,
                                                                              }}
                                                                              onChange={
                                                                                handlePropertyFormValues2
                                                                              }
                                                                            />
                                                                            <label htmlFor="usr">
                                                                              {" "}
                                                                              Withhold
                                                                              amount
                                                                            </label>
                                                                          </div>
                                                                          <ErrorMessage
                                                                            name="withhold_amount"
                                                                            component="div"
                                                                            className="invalid-feedback"
                                                                          />
                                                                        </div>
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
                                                                  </Row>

                                                                  <Row
                                                                    className="justify-content-evenly align-items-start"
                                                                    style={{
                                                                      marginTop:
                                                                        "-10px",
                                                                    }}
                                                                  >
                                                                    <Col
                                                                      md={12}
                                                                    >
                                                                      <Row className="d-flex">
                                                                        <Col>
                                                                          {" "}
                                                                          <div className="form-group-new">
                                                                            <Field
                                                                              name="withold_reason"
                                                                              type="text"
                                                                              className={
                                                                                "form-control" +
                                                                                (errors.withold_reason &&
                                                                                  touched.withold_reason
                                                                                  ? " is-invalid"
                                                                                  : "")
                                                                              }
                                                                              value={
                                                                                state2.withold_reason
                                                                              }
                                                                              onChange={
                                                                                handlePropertyFormValues2
                                                                              }
                                                                            />
                                                                            <label htmlFor="usr">
                                                                              {" "}
                                                                              Withhold
                                                                              reason
                                                                            </label>
                                                                          </div>
                                                                          <ErrorMessage
                                                                            name="withold_reason"
                                                                            component="div"
                                                                            className="invalid-feedback"
                                                                          />
                                                                        </Col>
                                                                      </Row>
                                                                    </Col>
                                                                  </Row>
                                                                </CardBody>
                                                              </Col>
                                                            </Row>
                                                          </Col>
                                                        </Card>
                                                      </Col>
                                                      <Col md={6}>
                                                        <Card
                                                          style={{
                                                            borderRadius:
                                                              "15px",
                                                            backgroundColor:
                                                              "#F2F6FA",
                                                            border:
                                                              "8px solid white",
                                                            marginTop: "-30px",
                                                            height: "260px",
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
                                                                  padding:
                                                                    "0px",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    marginTop:
                                                                      "15px",
                                                                    display:
                                                                      "flex",
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
                                                                      width:
                                                                        "3px",
                                                                      height:
                                                                        "70px",
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
                                                                    paddingLeft:
                                                                      "10px",
                                                                  }}
                                                                >
                                                                  <CardTitle tag="h5">
                                                                    Commercial
                                                                  </CardTitle>
                                                                  <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                                    <Col md={4}>
                                                                      <Label
                                                                        for="building"
                                                                        className="form-label"
                                                                      >
                                                                        Owner
                                                                        Access
                                                                      </Label>
                                                                    </Col>

                                                                    <Col md={8}>
                                                                      <Row className="d-flex">
                                                                        <Col>
                                                                          <div className="btn-group btn-group-justified">
                                                                            <div className="btn-group">
                                                                              <Button
                                                                                className="d-flex align-items-center btn w-lg"
                                                                                color={
                                                                                  ownerAccess ===
                                                                                    1
                                                                                    ? "secondary"
                                                                                    : "light"
                                                                                }
                                                                                onClick={
                                                                                  toggleInspectionEnableBtn
                                                                                }
                                                                                style={{
                                                                                  width:
                                                                                    "50%",
                                                                                }}
                                                                              >
                                                                                {ownerAccess ===
                                                                                  1 ? (
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
                                                                                className="d-flex align-items-center btn w-lg"
                                                                                color={
                                                                                  ownerAccess ===
                                                                                    0
                                                                                    ? "secondary"
                                                                                    : "light"
                                                                                }
                                                                                onClick={
                                                                                  toggleInspectionDisableBtn
                                                                                }
                                                                                style={{
                                                                                  width:
                                                                                    "50%",
                                                                                }}
                                                                              >
                                                                                {ownerAccess ===
                                                                                  0 ? (
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
                                                                        <Col></Col>
                                                                      </Row>
                                                                    </Col>
                                                                  </Row>
                                                                </CardBody>
                                                              </Col>
                                                            </Row>
                                                          </Col>
                                                        </Card>
                                                      </Col>
                                                    </Row>
                                                  </Col>
                                                </Row>
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
                  </TabPane>
                  <TabPane tabId={3}>
                    <Row style={{ marginTop: "-25px" }}>
                      <Col xs="12">
                        <Nav pills className="navtab-bg nav-justified">
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: tabState.customIconActiveTab === "1",
                              })}
                              onClick={() => {
                                toggleIconCustom("1");
                              }}
                            >
                              Traditional
                            </NavLink>
                          </NavItem>

                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: tabState.customIconActiveTab === "2",
                              })}
                              onClick={() => {
                                toggleIconCustom("2");
                              }}
                            >
                              Plan
                            </NavLink>
                          </NavItem>
                        </Nav>

                        <TabContent
                          activeTab={tabState.customIconActiveTab}
                          className="py-3 text-muted"
                        >
                          <TabPane tabId="1">
                            <Row>
                              <Col sm="12">
                                <div>
                                  <form
                                    className="repeater"
                                    id="owner-form-3"
                                    encType="multipart/form-data"
                                    onSubmit={handleRowResult}
                                  >
                                    <table style={{ width: "100%" }}>
                                      <tbody>
                                        <div>
                                          <NewOwnerFeeForm
                                            state={state}
                                            rows3={rows3}
                                            state3={state3}
                                            setState3={setState3}
                                            setRows3={setRows3}
                                            ownerFolioState={ownerFolioState}
                                          />
                                        </div>
                                        <div>
                                          <NewPropertyFeeForm
                                            state7={state7}
                                            setState7={setState7}
                                            ownerFolioState={ownerFolioState}
                                          />
                                        </div>
                                      </tbody>
                                    </table>
                                  </form>
                                </div>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="2">
                            <Card>
                              <CardBody>
                                <Plans
                                  statedata={{
                                    planState: planState,
                                    setPlanState: setPlanState,
                                    planIndex: planIndex,
                                    setPlanIndex: setPlanIndex,
                                    edit: true,
                                    folioId: state2?.id,
                                    handleCreateBill: handleCreateBill,
                                    proId: propertyId
                                  }}
                                  setFrequencyState={setFrequencyState}
                                />
                              </CardBody>
                            </Card>
                          </TabPane>
                        </TabContent>

                        <div>
                          <div>
                            <Modal
                              isOpen={feesModal}
                              toggle={toggleFeesModal}
                              scrollable={true}
                              backdrop={"static"}
                              id="staticBackdrop"
                            >
                              <div className="modal-header">
                                <p
                                  className="modal-title"
                                  id="staticBackdropLabel"
                                >
                                  Continue without adding fees or plan?
                                </p>
                                <button
                                  type="button"
                                  className="btn-close"
                                  onClick={toggleFeesModal}
                                  aria-label="Close"
                                ></button>
                              </div>

                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-light"
                                  onClick={toggleFeesModal}
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-info"
                                  onClick={toggleFeesModalHandler}
                                >
                                  Ok
                                </button>
                              </div>
                            </Modal>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId={4}>
                    <Row>
                      <Col xs="12">
                        <div>
                          <div>
                            <form
                              className="repeater mt-3"
                              id="owner-form-4"
                              encType="multipart/form-data"
                              onSubmit={handleRowResult2}
                            >
                              <table style={{ width: "100%" }}>
                                <tbody>
                                  {accErr && <p>Alert</p>}
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
                                            <label htmlFor="name">Method</label>
                                            <div>
                                              <div className="mb-3 select2-container">
                                                <Select
                                                  value={
                                                    state8?.[idx]?.[
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
                                            <label htmlFor="payee">Payee</label>

                                            {state8?.[idx]?.["payeeType"] ===
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
                                                value={state8?.[idx]?.["payee"]}
                                              />
                                            ) : null}
                                          </Col>
                                          <Col lg="2" className="mb-3">
                                            <label htmlFor="bsb">BSB</label>
                                            {state8?.[idx]?.["bsbType"] === true ? (
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
                                                value={state8?.[idx]?.["bsb"]}
                                              />
                                            ) : null}
                                          </Col>

                                          <Col lg="2" className="mb-3">
                                            <label htmlFor="account">
                                              Account #
                                            </label>

                                            {state8?.[idx]?.["accountType"] ===
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
                                                value={state8?.[idx]?.["account"]}
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
                                                {state8?.[idx]?.[
                                                  "split_type_boolean"
                                                ] === true ? (
                                                  <div className="btn-group btn-group-sm me-1">
                                                    <Button
                                                      className="d-flex align-items-center"
                                                      color={
                                                        state8?.[idx]?.[
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
                                                        state8?.[idx]?.[
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
                                                  onBlur={handleFocusOut}
                                                  value={state8?.[idx]?.["split"]}
                                                  placeholder="0.00"
                                                  onChange={e =>
                                                    handlePropertyFormValues8(
                                                      idx,
                                                      e
                                                    )
                                                  }
                                                  disabled={
                                                    !state8?.[idx]?.[
                                                    "split_type_boolean"
                                                    ]
                                                  }
                                                />
                                                {state8?.[idx]?.["split_type"] ===
                                                  "৳" && (
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
                                                  )}
                                                {state8?.[idx]?.["split_type"] ===
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
                                          {state8?.[idx]?.["errorState"] ? (
                                            <div className="d-flex align-items-start text-warning">
                                              <i className="fas fa-exclamation-triangle me-1"></i>
                                              <p>{state8?.[idx]?.["error"]}</p>
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
                                          color="buttonColor"
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
            </div>
          </Col>
        </Row>
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
                  toggleTab(
                    tabState.activeTab === 1 ? "" : tabState.activeTab - 1
                  );
                  setFormSubmitBtnState(formSubmitBtnState - 1);
                }}
                style={{ backgroundColor: "#A9F4E0", color: "black" }}
              >
                Previous
              </Link>
            </li>
            <li className={tabState.activeTab === 4 ? "next disabled" : "next"}>
              <button
                type="submit"
                form={"owner-form-" + formSubmitBtnState}
                className="btn btn-buttonColor"
              // onClick={nextTabState}
              >
                <i className="fas fa-file-alt me-1"></i>
                {tabState.activeTab === 4 ? "Save" : "Save & Next"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = gstate => {
  const { owner_plan_data, owner_plan_loading, owner_plan_error } = gstate.Plan;
  const {
    property_owner_info_loading,
    owner_info_data,
    owner_info_error,
    owner_info_loading,
    property_owner_update_loading,
  } = gstate.property;
  return {
    owner_plan_data,
    owner_plan_loading,
    owner_plan_error,
    property_owner_info_loading,
    owner_info_data,
    owner_info_error,
    owner_info_loading,
    property_owner_update_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addOwner,
    propertyOwnerInfoFresh,
    contactList,
    showContactFresh,
    propertyOwnerInfoFresh,
    getOwnerInfo,
    editOwner,
    OwnerUpdateFresh,
    OwnerInfoFresh,
    getAddonsFresh,
    getPlanAddonsFresh,
    planListFresh,
    ownerPlan,
  })(OwnerEdit)
);
