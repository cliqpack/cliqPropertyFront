import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Select from "react-select";

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
import moment from "moment";

import {
  addOwner,
  propertyOwnerInfoFresh,
} from "../../store/Properties/actions";
import {
  getOwnerInfo,
  editOwner,
  OwnerInfoFresh,
  OwnerUpdateFresh,
} from "store/actions";
import { contactList, showContactFresh } from "../../store/Contacts2/actions";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

import { Link, useHistory, withRouter, useParams } from "react-router-dom";
import Breadcrumbs from "components/Common/Breadcrumb";
import ChargeManualFeeModal from "./ChargeManualFeeModal";

const OwnerEdit = props => {
  const { id, tabId } = useParams(); // Owner Contact Id
  const history = useHistory();
  // Form Tab State
  const [tabState, setTabState] = useState({
    activeTab: tabId ? +tabId : 1,
    passedSteps: [+tabId],
  });
  const [blurState, setBlurState] = useState({});
  const [createBillState, setCreateBillState] = useState({
    toggleCreateBillModal: false,
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

  const [formSubmitBtnState, setFormSubmitBtnState] = useState(
    tabId ? +tabId : 1
  ); // Form Submit Button State

  const [selectedId, setSelectedId] = useState();
  const [contactabId, setContactabId] = useState();
  const [propertyId, setPropertyId] = useState();
  const [chargeFeeModal, setChargeFeeModal] = useState(false);
  const [manualFeeData, setManualFeeData] = useState({ description: '', property: '', notes: '' });

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
  const [state, setState] = useState({

  }); // Form 1 State
  const [state2, setState2] = useState({}); // Form 2 State
  const [ownerAccess, setOwnerAccess] = useState(1);

  const [addressState, setAddressState] = useState(true);

  const [postalAddForm, setPostalAddForm] = useState(false);
  const [physicalAddForm, setPhysicalAddForm] = useState(false);
  const [postalAddress, setPostalAddress] = useState({});
  const [physicalAddress, setPhysicalAddress] = useState({});
  const [fullPostalAddress, setFullPostalAddress] = useState("");
  const [fullPhysicalAddress, setFullPhysicalAddress] = useState("");

  const [inspectionEnableBtn, setInspectionEnableBtn] = useState(true);
  const [inspectionDisableBtn, setInspectionDisableBtn] = useState(false);

  // Fees Form State
  const [rows3, setRows3] = useState([]);
  const [state3, setState3] = useState([
    {
      fee_template: "",
      income_account: "",
      fee_trigger: "",
      notes: "",
      amount: "",
    },
  ]);

  const [selectedGroup6, setSelectedGroup6] = useState(null);
  const [optionGroup6, setOptionGroup6] = useState([
    {
      options: [{ label: "Admin Fee ($)", value: "Admin Fee ($)" }],
    },
  ]);

  const [rows4, setRows4] = useState([]);
  const [state7, setState7] = useState([
    {
      fee_template: "",
      income_account: "",
      fee_trigger: "",
      notes: "",
      amount: "",
    },
  ]);

  const [selectedGroup7, setSelectedGroup7] = useState(null);
  const [optionGroup7, setOptionGroup7] = useState([
    {
      options: [
        { label: "Commercial Management Fee (%)", value: "1" },
        { label: "Letting fee ($)", value: "2" },
        { label: "Management fee (%)", value: "3" },
      ],
    },
  ]);

  const [tableInfoShow3, setTableInfoShow3] = useState(false);
  const [tableInfoShow7, setTableInfoShow7] = useState(false);
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
  const [dateCheck, setDateCheck] = useState({ nextDisburseDate: false, });

  const [init, setInit] = useState(true);

  const [feesModal, setfeesModal] = useState(false);
  const toggleFeesModal = () => {
    setfeesModal(prev => !prev);
  };

  const toggleFeesModalHandler = () => {
    toggleFeesModal();
    setEnteredStateTab3(true);
  };

  let com = [];

  let contactEditCommunication = {
    printCheck: false,
    emailCheck: false,
    smsCheck: false,
  };

  const [forCheck, setForCheck] = useState({
    smsCheck: false,
    emailCheck: false,
    printCheck: false,
  });
  const [checkState, setCheckState] = useState([]);

  const checkTrueHandler = (boolean, value) => {
    setForCheck({
      ...forCheck,
      [boolean]: true,
    });
    let val = [...checkState];
    val.push(value);
    setCheckState(val);
  };

  const checkFalseHandler = (boolean, value) => {
    setForCheck({
      ...forCheck,
      [boolean]: false,
    });
    let val = [...checkState];
    val = val.filter(item => item !== value);
    setCheckState(val);
  };

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

  const communicationHandler = e => {
    let val = e.target.value,
      checked = e.target.checked;
    if (val === "Print" && checked === true) {
      checkTrueHandler("printCheck", "Print");
    } else if (val === "Print" && checked === false) {
      checkFalseHandler("printCheck", "Print");
    } else if (val === "Email" && checked === true) {
      checkTrueHandler("emailCheck", "Email");
    } else if (val === "Email" && checked === false) {
      checkFalseHandler("emailCheck", "Email");
    } else if (val === "SMS" && checked === true) {
      checkTrueHandler("smsCheck", "SMS");
    } else if (val === "SMS" && checked === false) {
      checkFalseHandler("smsCheck", "SMS");
    }
  };

  // ----------------------------
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

  const disburseDateHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ['next_disburse_date']: dateStr });
  }

  const agreementDateHandler = (selectedDates, dateStr, instance) => {
    // setState2({ ...state2, ['next_disburse_date']: dateStr });
    const months = moment(dateStr).add(12, 'months').format('yyyy-MM-DD');
    const day = moment(months).subtract(1, 'days').format('yyyy-MM-DD');
    // const date_end1 = moment(dateStr)
    //   .add(365, "days")
    //   .format("yyyy-MM-DD");
    setState2({
      ...state2,
      ['agreement_start']: dateStr,
      ["agreement_end"]: day,
    });
  }

  const agreementEndDateHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ['agreement_end']: dateStr })
  }

  useEffect(() => {
    if (props.owner_info_loading === false) {
      props.getOwnerInfo(id);
    }
    if (props.property_owner_info_loading === "Success") {
      props.propertyOwnerInfoFresh();
    }
    if (props.property_owner_update_loading === "Success") {
      // props.contactList();
      toastr.success("Owner Updated");
      // props.showContactFresh();
      props.OwnerUpdateFresh();
      history.push("/propertyInfo/" + propertyId);
    }
    if (props.owner_info_data) {
      setState({
        ...state,
        reference: props.owner_info_data?.data?.data?.reference,
        first_name: props.owner_info_data?.data?.data?.first_name,
        last_name: props.owner_info_data?.data?.data?.last_name,
        salutation: props.owner_info_data?.data?.data?.salutation,
        company_name: props.owner_info_data?.data?.data?.company_name,
        email: props.owner_info_data?.data?.data?.email,
        abn: props.owner_info_data?.data?.data?.contact?.abn,
        notes: props.owner_info_data?.data?.data?.notes,
      });

      let building = props.owner_info_data?.data?.contactPostalAddress
        ?.building_name
        ? props.owner_info_data?.data?.contactPostalAddress.building_name + " "
        : "";
      let unit = props.owner_info_data?.data?.contactPostalAddress?.unit
        ? props.owner_info_data?.data?.contactPostalAddress.unit + "/ "
        : "";
      let number = props.owner_info_data?.data?.contactPostalAddress?.number
        ? props.owner_info_data?.data?.contactPostalAddress.number + " "
        : "";
      let street = props.owner_info_data?.data?.contactPostalAddress?.street
        ? props.owner_info_data?.data?.contactPostalAddress.street + ", "
        : "";
      let suburb = props.owner_info_data?.data?.contactPostalAddress?.suburb
        ? props.owner_info_data?.data?.contactPostalAddress.suburb + ", "
        : "";
      let stateN = props.owner_info_data?.data?.contactPostalAddress?.state
        ? props.owner_info_data?.data?.contactPostalAddress.state + " "
        : "";
      let postcode = props.owner_info_data?.data?.contactPostalAddress?.postcode
        ? props.owner_info_data?.data?.contactPostalAddress.postcode + " "
        : "";
      let country = props.owner_info_data?.data?.contactPostalAddress?.country
        ? props.owner_info_data?.data?.contactPostalAddress.country
        : "";
      setFullPostalAddress(
        building + unit + number + street + suburb + stateN + postcode + country
      );

      setPostalAddress({
        ...postalAddress,
        postal_building_name:
          props.owner_info_data?.data?.contactPostalAddress?.building_name,
        postal_country:
          props.owner_info_data?.data?.contactPostalAddress?.country,
        postal_number:
          props.owner_info_data?.data?.contactPostalAddress?.number,
        postal_postcode:
          props.owner_info_data?.data?.contactPostalAddress?.postcode,
        postal_state: props.owner_info_data?.data?.contactPostalAddress?.state,
        postal_street:
          props.owner_info_data?.data?.contactPostalAddress?.street,
        postal_suburb:
          props.owner_info_data?.data?.contactPostalAddress?.suburb,
        postal_unit: props.owner_info_data?.data?.contactPostalAddress?.unit,
      });

      building = props.owner_info_data?.data?.contactPhysicalAddress
        ?.building_name
        ? props.owner_info_data?.data?.contactPhysicalAddress.building_name +
        " "
        : "";
      unit = props.owner_info_data?.data?.contactPhysicalAddress?.unit
        ? props.owner_info_data?.data?.contactPhysicalAddress.unit + "/ "
        : "";
      number = props.owner_info_data?.data?.contactPhysicalAddress?.number
        ? props.owner_info_data?.data?.contactPhysicalAddress.number + " "
        : "";
      street = props.owner_info_data?.data?.contactPhysicalAddress?.street
        ? props.owner_info_data?.data?.contactPhysicalAddress.street + ", "
        : "";
      suburb = props.owner_info_data?.data?.contactPhysicalAddress?.suburb
        ? props.owner_info_data?.data?.contactPhysicalAddress.suburb + ", "
        : "";
      stateN = props.owner_info_data?.data?.contactPhysicalAddress?.state
        ? props.owner_info_data?.data?.contactPhysicalAddress.state + " "
        : "";
      postcode = props.owner_info_data?.data?.contactPhysicalAddress?.postcode
        ? props.owner_info_data?.data?.contactPhysicalAddress.postcode + " "
        : "";
      country = props.owner_info_data?.data?.contactPhysicalAddress?.country
        ? props.owner_info_data?.data?.contactPhysicalAddress.country
        : "";
      setFullPhysicalAddress(
        building + unit + number + street + suburb + stateN + postcode + country
      );
      setPhysicalAddress({
        ...physicalAddress,
        physical_building_name:
          props.owner_info_data?.data?.contactPhysicalAddress?.building_name,
        physical_country:
          props.owner_info_data?.data?.contactPhysicalAddress?.country,
        physical_number:
          props.owner_info_data?.data?.contactPhysicalAddress?.number,
        physical_postcode:
          props.owner_info_data?.data?.contactPhysicalAddress?.postcode,
        physical_state:
          props.owner_info_data?.data?.contactPhysicalAddress?.state,
        physical_street:
          props.owner_info_data?.data?.contactPhysicalAddress?.street,
        physical_suburb:
          props.owner_info_data?.data?.contactPhysicalAddress?.suburb,
        physical_unit:
          props.owner_info_data?.data?.contactPhysicalAddress?.unit,
      });
      setPhone({
        mobile_phone: props.owner_info_data?.data?.data?.mobile_phone,
        work_phone: props.owner_info_data?.data?.data?.work_phone,
        home_phone: props.owner_info_data?.data?.data?.home_phone,
      });
      setContactabId(props.owner_info_data?.data?.data?.contact_id);
      setPropertyId(props.owner_info_data?.data?.data?.property_id);
      setState2({
        ...state2,
        total_money:
          props.owner_info_data?.data?.data?.owner_folio?.total_money,
        balance: props.owner_info_data?.data?.data?.owner_folio?.balance,
        regular_intervals:
          props.owner_info_data?.data?.data?.owner_folio?.regular_intervals,
        next_disburse_date:
          props.owner_info_data?.data?.data?.owner_folio?.next_disburse_date,
        withhold_amount:
          props.owner_info_data?.data?.data?.owner_folio?.withhold_amount,
        withold_reason:
          props.owner_info_data?.data?.data?.owner_folio?.withold_reason,
        agreement_start:
          props.owner_info_data?.data?.data?.owner_folio?.agreement_start,
        gained_reason:
          props.owner_info_data?.data?.data?.owner_folio?.gained_reason,
        comment: props.owner_info_data?.data?.data?.owner_folio?.comment,
        agreement_end:
          props.owner_info_data?.data?.data?.owner_folio?.agreement_end,
      });

      setDateCheck({
        ...dateCheck,
        nextDisburseDate: props.owner_info_data?.data?.data?.owner_folio?.next_disburse_date ? true : false
      })
      // setBlurState({
      //   ...blurState,
      //   total_money: props.owner_info_data?.data?.data?.owner_folio?.total_money
      //     ? "$" + props.owner_info_data?.data?.data?.owner_folio?.total_money
      //     : "$0.00",
      //   balance: props.owner_info_data?.data?.data?.owner_folio?.balance
      //     ? "$" + props.owner_info_data?.data?.data?.owner_folio?.balance
      //     : "$0.00",
      //   withhold_amount: props.owner_info_data?.data?.data?.owner_folio
      //     ?.withhold_amount
      //     ? "$" +
      //     props.owner_info_data?.data?.data?.owner_folio?.withhold_amount
      //     : "$0.00",
      // });
      setOwnerAccess(
        props.owner_info_data?.data?.data?.owner_folio?.owner_access
      );
      setSelectedGroup2({
        label:
          props.owner_info_data?.data?.data?.owner_folio?.regular_intervals,
        value:
          props.owner_info_data?.data?.data?.owner_folio?.regular_intervals,
      });
      setSelectedGroup3({
        label: props.owner_info_data?.data?.data?.owner_folio?.gained_reason,
        value: props.owner_info_data?.data?.data?.owner_folio?.gained_reason,
      });
      setRows3([...props.owner_info_data?.data.data.owner_fees]);
      // ownerFeesArray = props.owner_info_data?.data.data.owner_fees.map
      setState3([...props.owner_info_data?.data?.data?.owner_fees]);
      setRows4([...props.owner_info_data?.data?.data?.owner_property_fees]);
      setState7([...props.owner_info_data?.data?.data?.owner_property_fees]);
      setRows5([...props.owner_info_data?.data?.data?.owner_payment]);

      let lengthA = props.owner_info_data?.data?.data?.owner_payment.length;
      props.owner_info_data?.data?.data?.owner_payment.map((item, idx) => {
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

      setState8([...props.owner_info_data?.data?.data?.owner_payment]);
    }
    if (props.owner_info_data?.data?.contactCommunication) {
      props.owner_info_data?.data?.contactCommunication.map(item => {
        if (item.communication === "Print") {
          contactEditCommunication = {
            ...contactEditCommunication,
            printCheck: true,
          };
          com.push("Print");
        }
        if (item.communication === "Email") {
          contactEditCommunication = {
            ...contactEditCommunication,
            emailCheck: true,
          };
          com.push("Email");
        }
        if (item.communication === "SMS") {
          contactEditCommunication = {
            ...contactEditCommunication,
            smsCheck: true,
          };
          com.push("SMS");
        }
      });
      setForCheck({ ...contactEditCommunication });
      setCheckState([...com]);
    }

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      let unitN = "";
      let country = "";
      let statename = "";
      let postal_codeN = "";
      let suburbN = "";
      let streetN = "";
      let street_numberN = "";

      place.address_components.forEach(element => {
        let checkCountry = inArray("country", element.types);

        if (checkCountry == true) {
          country = element.long_name;
        }

        let administrative_area_level_1 = inArray(
          "administrative_area_level_1",
          element.types
        );
        if (administrative_area_level_1 == true) {
          statename = element.long_name;
        }

        let postal_code = inArray("postal_code", element.types);
        if (postal_code == true) {
          postal_codeN = element.long_name;
        }

        let unit = inArray("subpremise", element.types);
        if (unit == true) {
          unitN = element.long_name;
        }

        let suburb = inArray("locality", element.types);
        if (suburb == true) {
          suburbN = element.long_name;
        }

        let street = inArray("route", element.types);
        if (street == true) {
          streetN = element.long_name;
        }

        let street_number = inArray("street_number", element.types);
        if (street_number == true) {
          street_numberN = element.long_name;
        }
      });
      let u = unitN ? unitN + "/ " : "";
      let c = country ? country + " " : "";
      let st = statename ? statename + " " : "";
      let pc = postal_codeN ? postal_codeN + " " : "";
      let sn = suburbN ? suburbN + ", " : "";
      let s = streetN ? streetN + ", " : "";
      let n = street_numberN ? street_numberN + " " : "";
      setFullPhysicalAddress(u + n + s + sn + st + pc + c);
      // setPhysicalAddressState({ ...physicalAddressState, postal_country: country, postal_state: statename, postal_postcode: postal_codeN, postal_suburb: suburbN, postal_street: streetN, postal_number: street_numberN });
      setPhysicalAddress({
        ...physicalAddress,
        physical_building_name: '',

        physical_unit: unitN,
        physical_country: country,
        physical_state: statename,
        physical_postcode: postal_codeN,
        physical_suburb: suburbN,
        physical_street: streetN,
        physical_number: street_numberN,
      });

      setPhysicalAddForm(true);
    });

    autoCompletePostalRef.current = new window.google.maps.places.Autocomplete(
      inputRefPostal.current,
      options
    );
    autoCompletePostalRef.current.addListener(
      "place_changed",
      async function () {
        const place = await autoCompletePostalRef.current.getPlace();
        let unitN = "";
        let country = "";
        let statename = "";
        let postal_codeN = "";
        let suburbN = "";
        let streetN = "";
        let street_numberN = "";

        place.address_components.forEach(element => {
          let checkCountry = inArray("country", element.types);

          if (checkCountry == true) {
            country = element.long_name;
          }

          let administrative_area_level_1 = inArray(
            "administrative_area_level_1",
            element.types
          );
          if (administrative_area_level_1 == true) {
            statename = element.long_name;
          }

          let postal_code = inArray("postal_code", element.types);
          if (postal_code == true) {
            postal_codeN = element.long_name;
          }

          let unit = inArray("subpremise", element.types);
          if (unit == true) {
            unitN = element.long_name;
          }

          let suburb = inArray("locality", element.types);
          if (suburb == true) {
            suburbN = element.long_name;
          }

          let street = inArray("route", element.types);
          if (street == true) {
            streetN = element.long_name;
          }

          let street_number = inArray("street_number", element.types);
          if (street_number == true) {
            street_numberN = element.long_name;
          }
        });
        let u = unitN ? unitN + "/ " : "";
        let c = country ? country + " " : "";
        let st = statename ? statename + " " : "";
        let pc = postal_codeN ? postal_codeN + " " : "";
        let sn = suburbN ? suburbN + ", " : "";
        let s = streetN ? streetN + ", " : "";
        let n = street_numberN ? street_numberN + " " : "";

        setFullPostalAddress(u + n + s + sn + st + pc + c);
        // setPostalAddressState({ ...postalAddressState, physical_country: country, physical_state: statename, physical_postcode: postal_codeN, physical_suburb: suburbN, physical_street: streetN, physical_number: street_numberN });
        setPostalAddress({
          ...postalAddress,
          postal_building_name: '',

          postal_unit: unitN,
          postal_country: country,
          postal_state: statename,
          postal_postcode: postal_codeN,
          postal_suburb: suburbN,
          postal_street: streetN,
          postal_number: street_numberN,
        });

        setPostalAddForm(true);
      }
    );
    //--------------------------------
  }, [
    props.property_owner_info_loading,
    props.owner_info_loading,
    props.owner_info_data,
    props.property_owner_update_loading,
  ]);



  const addresshandler = (e, statename) => {
    let b = postalAddress.postal_building_name ? postalAddress.postal_building_name + " " : "";
    let u = postalAddress.postal_unit ? postalAddress.postal_unit + "/" : "";
    let n = postalAddress.postal_number ? postalAddress.postal_number + " " : "";
    let st = postalAddress.postal_street ? postalAddress.postal_street + ", " : "";
    let sb = postalAddress.postal_suburb ? postalAddress.postal_suburb + ", " : "";
    let pc = postalAddress.postal_postcode ? postalAddress.postal_postcode + " " : "";
    let s = postalAddress.postal_state ? postalAddress.postal_state + " " : "";
    let c = postalAddress.postal_country ? postalAddress.postal_country + " " : "";
    if (statename === "postal_building_name") {
      b = e.target.value + " ";
    } else if (statename === "postal_unit") {
      u = e.target.value && postalAddress.postal_number ? `${e.target.value}/` : e.target.value;
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
    let b = physicalAddress.physical_building_name ? physicalAddress.physical_building_name + " " : "";
    let u = physicalAddress.physical_unit ? physicalAddress.physical_unit + "/" : "";
    let n = physicalAddress.physical_number ? physicalAddress.physical_number + " " : "";
    let st = physicalAddress.physical_street ? physicalAddress.physical_street + ", " : "";
    let sb = physicalAddress.physical_suburb ? physicalAddress.physical_suburb + ", " : "";
    let pc = physicalAddress.physical_postcode ? physicalAddress.physical_postcode + " " : "";
    let s = physicalAddress.physical_state ? physicalAddress.physical_state + " " : "";
    let c = physicalAddress.physical_country ? physicalAddress.physical_country + " " : "";
    if (statename === "physical_building_name") {
      b = e.target.value + " ";
    } else if (statename === "physical_unit") {
      u = e.target.value && physicalAddress.physical_number ? `${e.target.value}/` : e.target.value;
    } else if (statename === "physical_number") {
      n = e.target.value + " ";
    } else if (statename === "physical_street") {
      st = e.target.value + ", ";
    } else if (statename === "physical_suburb") {
      sb = e.target.value + ", ";
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

  // Autocomplete address
  function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }
  // -----------------
  if (init) {
    props.getOwnerInfo(id);
    setInit(false);
  }
  const date = new Date();
  const futureDate = date.getDate();
  date.setDate(futureDate);
  const defaultValue = date.toLocaleDateString("en-CA");

  const handlePropertyFormValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // const handlePropertyFormValues2 = e => {
  //   setState2({ ...state2, [e.target.name]: e.target.value });
  // };

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
      // setState2({ ...state2, ["agreement_end"]: date_end1 });
    } else if (e.target.name == "next_disburse_date") {
      setDateCheck({ ...dateCheck, nextDisburseDate: true })
      setState2({ ...state2, [e.target.name]: e.target.value });

    } else {
      setState2({ ...state2, [e.target.name]: e.target.value });
    }
  };

  const handlePropertyFormValuesTotalMoney = e => {
    var lol = e.target.value.split("$");

    const data = `$${lol.length == 2 ? lol[1] : lol[0]}`;

    setState2({ ...state2, [e.target.name]: e.target.value });
    setBlurState({ ...blurState, total_money: data });
  };

  const handlePropertyFormValuesBalanace = e => {
    var lol = e.target.value.split("$");
    const data = `$${lol.length == 2 ? lol[1] : lol[0]}`;
    setState2({ ...state2, [e.target.name]: e.target.value });
    setBlurState({ ...blurState, balance: data });
  };

  const handlePropertyFormValuesWithHoldAmount = e => {
    var lol = e.target.value.split("$");
    const data = `$${lol.length == 2 ? lol[1] : lol[0]}`;
    setState2({ ...state2, [e.target.name]: e.target.value });
    setBlurState({ ...blurState, withhold_amount: data });
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
      if (el.fee_template === "Admin Fee ($)") {
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
        setEnteredStateTab3(false);
      } else {
        setEnteredStateTab3(true);
      }
    });

    const values1 = [...state7];

    await state7.forEach(async (el, idx) => {
      if (el.fee_template === "Commercial Management Fee (%)") {
        if (el.amount.length === 0) {
          values1[idx]["errorState"] = true;
          values1[idx]["error"] = " Invalid amount.";
          await setState7(values1);
          return;
        } else {
          values1[idx]["errorState"] = false;
          values1[idx]["error"] = "";
          await setState7(values1);
        }
      } else if (el.fee_template === "Letting fee ($)") {
        if (el.amount.length === 0) {
          values1[idx]["errorState"] = true;
          values1[idx]["error"] = " Invalid amount.";
          await setState7(values1);
          return;
        } else {
          values1[idx]["errorState"] = false;
          values1[idx]["error"] = "";
          await setState7(values1);
        }
      } else if (el.fee_template === "Management fee (%)") {
        if (el.amount.length === 0) {
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
        setEnteredStateTab3(false);
      } else {
        setEnteredStateTab3(true);
      }
    });
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

  const handleChangeInput = async (idx, e, type) => {
    const values = [...state3];
    let targetedValue = e.target.value;

    values[idx][type] = targetedValue;
    // values[idx]['selectedValues'] = e;
    values[idx]["income_account"] = "Administration fee (inc. tax)";
    values[idx]["fee_trigger"] = "Each statement period";
    values[idx]["notes"] = "";
    await setState3(values);

    // setSelectedGroup6(e);
    // setSelectedId6(e.value);
    setTableInfoShow3(true);
  };
  const handleChangeInput2 = async (idx, e, type) => {
    const values = [...state7];
    let targetedValue = e.target.value;
    values[idx][type] = targetedValue;
    if (targetedValue === "Commercial Management Fee (%)") {
      values[idx]["income_account"] = "Commercial Management Fee (%)";
      values[idx]["fee_trigger"] = "Rental receipt";
      values[idx]["notes"] = "";
      values[idx]["types"] = "%";
    } else if (targetedValue === "Letting fee ($)") {
      values[idx]["income_account"] = "Letting fee ($)";
      values[idx]["fee_trigger"] = "First rent receipt";
      values[idx]["notes"] = "";
      values[idx]["types"] = "$";
    } else if (targetedValue === "Management fee (%)") {
      values[idx]["income_account"] = "Management fee (%)";
      values[idx]["fee_trigger"] = "Rental receipt";
      values[idx]["notes"] = "";
      values[idx]["types"] = "%";
    }
    await setState7(values);

    // setSelectedGroup7(e);
    // setSelectedId7(e.value);
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
    // var rowIndex = [""];
    // rowIndex.push("");
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

  // -----------------------------

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
          if (values[idx]['split_type'] == '%') {
            split += Number(element.split);
          }

          if (split > 100 || Number(element.split) === 0) {
            values[lengthSp - 1]["errorState"] = true;
            values[lengthSp - 1]["error"] = "Invalid Percentage";
            await setState8(values);
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
      });

      await state8.forEach(async (element, idx) => {
        if (element.errorState == false) {
          await setEnteredState(true);
        } else {
          await setEnteredState(false);
        }
      });
    }
  };

  if (enteredState && tabState.activeTab === 4) {
    setEnteredState(false);
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
      checkState
    );
    props.propertyOwnerInfoFresh();
  }
  const handleFocus = event => event.target.select();
  const handleFocusOut = () => {
  };
  // -----------------------------

  const checkAddressHandler = () => {
    if (addressState) {
      let building = postalAddress.postal_building_name
        ? postalAddress.postal_building_name + " "
        : "";
      let unit = postalAddress.postal_unit
        ? postalAddress.postal_unit + "/ "
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

  const nextTabState = (e) => {
    if (tabState.activeTab === 3) {
      e.preventDefault();
      setTabState({
        ...tabState,
        activeTab: 4,
      });
      setFormSubmitBtnState(formSubmitBtnState + 1)
    }
  }

  const handleCreateBill = (item) => {
    setChargeFeeModal(prev => !prev);
    setManualFeeData({
      description: item.addon.display_name,
      notes: item.addon.note,
      property: '',
      property_id: propertyId,
      owner_folio_id: props.owner_info_data?.data?.data?.owner_folio?.id,
    })
  }
  const toggleManualFeeModal = () => {
    setChargeFeeModal(prev => !prev);
  }

  return (
    <div className="page-content">
      {
        chargeFeeModal && <ChargeManualFeeModal modalState={chargeFeeModal} toggle={toggleManualFeeModal} data={manualFeeData} />
      }
      <div className="wizard clearfix">
        <Breadcrumbs title="Edit Owner" breadcrumbItem="Properties" />

        <Card>
          <CardBody>
            <h4 className="ms-2 text-primary">Edit Owner - {state.reference || ''}</h4>
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
                    // disabled={!(tabState.passedSteps || []).includes(2)}
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
                    // disabled={!(tabState.passedSteps || []).includes(3)}
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
                    <span className="number">3.</span> Fees
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({
                    current: tabState.activeTab === 4,
                  })}
                >
                  <NavLink
                    // disabled={!(tabState.passedSteps || []).includes(4)}
                    className={
                      (classnames({
                        active: tabState.activeTab === 4,
                      }),
                        "done")
                    }
                    onClick={() => {
                      toggleTab(4);
                      setFormSubmitBtnState(4);
                    }}
                  >
                    <span className="number">4.</span> Payment Methods
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
                    <div className="py-2 ps-3">
                      <div>
                        <div className="mb-3">
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
                            validationSchema={Yup.object().shape({
                              // reference: Yup.string().required(
                              //     "Please Enter Reference"
                              // ),
                              first_name: Yup.string().required(
                                "Please Enter First name"
                              ),
                              last_name: Yup.string().required(
                                "Please Enter Last name"
                              ),
                              // company_name: Yup.string().required(
                              //     "Please Enter Salutation"
                              // ),
                              // mobile_phone: Yup.string().required(
                              //     "Please Enter Mobile phone"
                              // ),
                              // work_phone: Yup.string().required(
                              //     "Please Enter Work phone"
                              // ),
                              // home_phone: Yup.string().required(
                              //     "Please Enter Home Phone"
                              // ),
                              email:
                                Yup.string().required("Please Enter Email"),

                              // abn: Yup.string().required("Please Enter ABN"),
                            })}
                            onSubmit={(values, onSubmitProps) => {
                              setState(values);
                              toggleTab(tabState.activeTab + 1);
                              setFormSubmitBtnState(formSubmitBtnState + 1);
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
                                      <Card>
                                        <CardBody>
                                          <div className="w-75 d-flex justify-content-between align-items-center pb-1">
                                            <div>
                                              <h4 className="text-primary mb-2">
                                                Owner Contact
                                              </h4>
                                            </div>
                                          </div>
                                          <div
                                            className="w-75 mt-2 mb-2"
                                            style={{
                                              borderBottom:
                                                "1.2px dotted #c9c7c7",
                                            }}
                                          ></div>

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
                                                    handlePropertyFormValues
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
                                          <h4 className="text-primary mb-3">
                                            People
                                          </h4>
                                          <div
                                            className="w-75 mt-2 mb-2"
                                            style={{
                                              borderBottom:
                                                "1.2px dotted #c9c7c7",
                                            }}
                                          ></div>
                                          <div className="mb-3 w-75">
                                            <Row className="mt-2 mb-3 justify-content-evenly align-items-center">
                                              <Col md={2}>
                                                <Label
                                                  for="building"
                                                  className="form-label"
                                                >
                                                  First Name
                                                </Label>
                                              </Col>

                                              <Col md={8}>
                                                <Field
                                                  name="first_name"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.first_name &&
                                                      touched.first_name
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={state.first_name}
                                                  onChange={e =>
                                                    referenceHandler(
                                                      e,
                                                      "first_name"
                                                    )
                                                  }
                                                />

                                                <ErrorMessage
                                                  name="first_name"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Row>
                                            <Row className="mt-2 mb-3 mb-3 justify-content-evenly align-items-center">
                                              <Col md={2}>
                                                <Label
                                                  for="last_name"
                                                  className="form-label"
                                                >
                                                  Last Name
                                                </Label>
                                              </Col>

                                              <Col md={8}>
                                                <Field
                                                  name="last_name"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.last_name &&
                                                      touched.last_name
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={state.last_name}
                                                  onChange={e =>
                                                    referenceHandler(
                                                      e,
                                                      "last_name"
                                                    )
                                                  }
                                                />

                                                <ErrorMessage
                                                  name="last_name"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Row>
                                            <Row className="mt-2 mb-3 mb-3 justify-content-evenly align-items-center">
                                              <Col md={2}>
                                                <Label
                                                  for="building"
                                                  className="form-label"
                                                >
                                                  Salutation
                                                </Label>
                                              </Col>

                                              <Col md={8}>
                                                <Field
                                                  name="salutation"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.salutation &&
                                                      touched.salutation
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={state.salutation}
                                                  onChange={
                                                    handlePropertyFormValues
                                                  }
                                                />

                                                <ErrorMessage
                                                  name="salutation"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Row>
                                            <Row className="mt-2 mb-3 mb-3 justify-content-evenly align-items-center">
                                              <Col md={2}>
                                                <Label
                                                  for="company_name"
                                                  className="form-label"
                                                >
                                                  Company name
                                                </Label>
                                              </Col>

                                              <Col md={8}>
                                                <Field
                                                  name="company_name"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.company_name &&
                                                      touched.company_name
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={state.company_name}
                                                  onChange={e =>
                                                    referenceHandler(
                                                      e,
                                                      "company_name"
                                                    )
                                                  }
                                                />

                                                <ErrorMessage
                                                  name="company_name"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Row>
                                            <Row className="mt-2 mb-3 mb-3 justify-content-evenly align-items-center">
                                              <Col md={2}>
                                                <Label
                                                  for="mobile_phone"
                                                  className="form-label"
                                                >
                                                  Mobile phone
                                                </Label>
                                              </Col>

                                              <Col md={8}>
                                                <Field
                                                  name="mobile_phone"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.mobile_phone &&
                                                      touched.mobile_phone
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={phone.mobile_phone}
                                                  onChange={mobilePhoneHandler}
                                                />

                                                <ErrorMessage
                                                  name="mobile_phone"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Row>
                                            <Row className="mt-2 mb-3 mb-3 justify-content-evenly align-items-center">
                                              <Col md={2}>
                                                <Label
                                                  for="work_phone"
                                                  className="form-label"
                                                >
                                                  Work phone
                                                </Label>
                                              </Col>

                                              <Col md={8}>
                                                <Field
                                                  name="work_phone"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.work_phone &&
                                                      touched.work_phone
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={phone.work_phone}
                                                  onChange={e => {
                                                    setPhone({
                                                      ...phone,
                                                      work_phone:
                                                        e.target.value,
                                                    });
                                                  }}
                                                />

                                                <ErrorMessage
                                                  name="work_phone"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Row>
                                            <Row className="mt-2 mb-3 mb-3 justify-content-evenly align-items-center">
                                              <Col md={2}>
                                                <Label
                                                  for="building"
                                                  className="form-label"
                                                >
                                                  Home phone
                                                </Label>
                                              </Col>

                                              <Col md={8}>
                                                <Field
                                                  name="home_phone"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.home_phone &&
                                                      touched.home_phone
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={phone.home_phone}
                                                  onChange={e => {
                                                    setPhone({
                                                      ...phone,
                                                      home_phone:
                                                        e.target.value,
                                                    });
                                                  }}
                                                />

                                                <ErrorMessage
                                                  name="home_phone"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Row>

                                            <Row className="mt-2 mb-3 mb-3 justify-content-evenly align-items-center">
                                              <Col md={2}>
                                                <Label
                                                  for="email"
                                                  className="form-label"
                                                >
                                                  Email
                                                </Label>
                                              </Col>

                                              <Col md={8}>
                                                <Field
                                                  name="email"
                                                  type="text"
                                                  className={
                                                    "form-control" +
                                                    (errors.email &&
                                                      touched.email
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={state.email}
                                                  onChange={
                                                    handlePropertyFormValues
                                                  }
                                                />

                                                <ErrorMessage
                                                  name="email"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Row>

                                            <Row className="mt-3 mb-3 justify-content-evenly align-items-start">
                                              <Col md={2}>
                                                <Label
                                                  for="address"
                                                  className="form-label"
                                                >
                                                  Postal Address
                                                </Label>
                                              </Col>
                                              <Col md={8}>
                                                <div className="input-group d-flex">
                                                  <input
                                                    name="postal_address"
                                                    type="text"
                                                    className={
                                                      "form-control" +
                                                      (errors.postal_address &&
                                                        touched.postal_address
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    value={fullPostalAddress}
                                                    onChange={e => {
                                                      setFullPostalAddress(
                                                        e.target.value
                                                      );
                                                    }}
                                                    ref={inputRefPostal}
                                                  />

                                                  {!postalAddForm ? (
                                                    <Button
                                                      color="primary"
                                                      onClick={
                                                        handlePostalAddForm
                                                      }
                                                      className="d-flex justify-content-evenly align-items-center"
                                                    >
                                                      Details{" "}
                                                      <i className="fa fa-solid fa-caret-down ms-1" />
                                                    </Button>
                                                  ) : (
                                                    <Button
                                                      color="primary"
                                                      onClick={
                                                        handlePostalAddForm
                                                      }
                                                      className="d-flex justify-content-evenly align-items-center"
                                                    >
                                                      Close
                                                      <i className="fas fa-times ms-1"></i>
                                                    </Button>
                                                  )}
                                                </div>

                                                {postalAddForm && (
                                                  <div className="bg-soft">
                                                    <Row className="mt-3">
                                                      <Col md={2}>
                                                        <Label
                                                          for="building"
                                                          className="form-label"
                                                        >
                                                          Building Name
                                                        </Label>
                                                      </Col>

                                                      <Col md={6}>
                                                        <Field
                                                          name="postal_building_name"
                                                          type="text"
                                                          className={
                                                            "form-control" +
                                                            (errors.postal_building_name &&
                                                              touched.postal_building_name
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={
                                                            postalAddress.postal_building_name
                                                          }
                                                          // onChange={
                                                          //   handlePostalFormValues
                                                          // }
                                                          onChange={e => {
                                                            addresshandler(e, "postal_building_name");
                                                          }}
                                                        />

                                                        <ErrorMessage
                                                          name="postal_building_name"
                                                          component="div"
                                                          className="invalid-feedback"
                                                        />
                                                      </Col>
                                                    </Row>

                                                    <Row className="mt-3">
                                                      <Col md={2}>
                                                        <Label
                                                          for="postal_unit"
                                                          className="form-label"
                                                        >
                                                          Unit
                                                        </Label>
                                                      </Col>

                                                      <Col md={6}>
                                                        <Field
                                                          name="postal_unit"
                                                          type="text"
                                                          className={
                                                            "form-control" +
                                                            (errors.postal_unit &&
                                                              touched.postal_unit
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={
                                                            postalAddress.postal_unit
                                                          }
                                                          // onChange={
                                                          //   handlePostalFormValues
                                                          // }
                                                          onChange={e => {
                                                            addresshandler(e, "postal_unit");
                                                          }}
                                                        />
                                                        <ErrorMessage
                                                          name="postal_unit"
                                                          component="div"
                                                          className="invalid-feedback"
                                                        />
                                                      </Col>
                                                    </Row>

                                                    <Row className="mt-3">
                                                      <Col md={2}>
                                                        <Label
                                                          for="number"
                                                          className="form-label"
                                                        >
                                                          Number
                                                        </Label>
                                                      </Col>

                                                      <Col md={6}>
                                                        <Field
                                                          name="postal_number"
                                                          type="text"
                                                          className={
                                                            "form-control" +
                                                            (errors.postal_number &&
                                                              touched.postal_number
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={
                                                            postalAddress.postal_number
                                                          }
                                                          // onChange={
                                                          //   handlePostalFormValues
                                                          // }
                                                          onChange={e => {
                                                            addresshandler(e, "postal_number");
                                                          }}
                                                        />
                                                      </Col>
                                                      <ErrorMessage
                                                        name="postal_number"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Row>

                                                    <Row className="mt-3">
                                                      <Col md={2}>
                                                        <Label
                                                          for="postal_street"
                                                          className="form-label"
                                                        >
                                                          Street
                                                        </Label>
                                                      </Col>

                                                      <Col md={6}>
                                                        <Field
                                                          name="postal_street"
                                                          type="text"
                                                          className={
                                                            "form-control" +
                                                            (errors.postal_street &&
                                                              touched.postal_street
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={
                                                            postalAddress.postal_street
                                                          }
                                                          // onChange={
                                                          //   handlePostalFormValues
                                                          // }
                                                          onChange={e => {
                                                            addresshandler(e, "postal_street");
                                                          }}
                                                        />

                                                        <ErrorMessage
                                                          name="postal_street"
                                                          component="div"
                                                          className="invalid-feedback"
                                                        />
                                                      </Col>
                                                    </Row>

                                                    <Row className="mt-3">
                                                      <Col md={2}>
                                                        <Label
                                                          for="postal_suburb"
                                                          className="form-label"
                                                        >
                                                          Suburb
                                                        </Label>
                                                      </Col>

                                                      <Col md={6}>
                                                        <Field
                                                          name="postal_suburb"
                                                          type="text"
                                                          className={
                                                            "form-control" +
                                                            (errors.postal_suburb &&
                                                              touched.postal_suburb
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={
                                                            postalAddress.postal_suburb
                                                          }
                                                          // onChange={
                                                          //   handlePostalFormValues
                                                          // }
                                                          onChange={e => {
                                                            addresshandler(e, "postal_suburb");
                                                          }}
                                                        />
                                                      </Col>

                                                      <ErrorMessage
                                                        name="postal_suburb"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Row>

                                                    <Row className="mt-3">
                                                      <Col md={2}>
                                                        <Label
                                                          for="postal_postcode"
                                                          className="form-label"
                                                        >
                                                          Postcode
                                                        </Label>
                                                      </Col>

                                                      <Col md={6}>
                                                        <Field
                                                          name="postal_postcode"
                                                          type="text"
                                                          className={
                                                            "form-control" +
                                                            (errors.postal_postcode &&
                                                              touched.postal_postcode
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={
                                                            postalAddress.postal_postcode
                                                          }
                                                          // onChange={
                                                          //   handlePostalFormValues
                                                          // }
                                                          onChange={e => {
                                                            addresshandler(e, "postal_postcode");
                                                          }}
                                                        />
                                                      </Col>

                                                      <ErrorMessage
                                                        name="postal_postcode"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Row>

                                                    <Row className="mt-3">
                                                      <Col md={2}>
                                                        <Label
                                                          for="state"
                                                          className="form-label"
                                                        >
                                                          State
                                                        </Label>
                                                      </Col>

                                                      <Col md={6}>
                                                        <Field
                                                          name="postal_state"
                                                          type="text"
                                                          className={
                                                            "form-control" +
                                                            (errors.postal_state &&
                                                              touched.postal_state
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={
                                                            postalAddress.postal_state
                                                          }
                                                          // onChange={
                                                          //   handlePostalFormValues
                                                          // }
                                                          onChange={e => {
                                                            addresshandler(e, "postal_state");
                                                          }}
                                                        />
                                                      </Col>

                                                      <ErrorMessage
                                                        name="postal_state"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Row>

                                                    <Row className="mt-3">
                                                      <Col md={2}>
                                                        <Label
                                                          for="postal_country"
                                                          className="form-label"
                                                        >
                                                          Country
                                                        </Label>
                                                      </Col>

                                                      <Col md={6}>
                                                        <Field
                                                          name="postal_country"
                                                          type="text"
                                                          className={
                                                            "form-control" +
                                                            (errors.postal_country &&
                                                              touched.postal_country
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={
                                                            postalAddress.postal_country
                                                          }
                                                          // onChange={
                                                          //   handlePostalFormValues
                                                          // }
                                                          onChange={e => {
                                                            addresshandler(e, "postal_country");
                                                          }}
                                                        />
                                                      </Col>
                                                      <ErrorMessage
                                                        name="postal_country"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Row>
                                                    <Row>
                                                      <Col
                                                        md={6}
                                                        className="mt-3"
                                                      >
                                                        <input
                                                          type="checkbox"
                                                          className="form-check-input mr-3"
                                                          id="sameaddress"
                                                          onClick={
                                                            checkAddressHandler
                                                          }
                                                        />
                                                        &nbsp; &nbsp;
                                                        <Label
                                                          for="sameaddress"
                                                          className="form-check-label"
                                                        >
                                                          Same as postal address
                                                        </Label>
                                                      </Col>
                                                    </Row>
                                                  </div>
                                                )}
                                              </Col>
                                            </Row>

                                            <Row className="mt-3 justify-content-evenly align-items-start">
                                              <Col md={2}>
                                                <Label
                                                  for="address"
                                                  className="form-label"
                                                >
                                                  Physical Address
                                                </Label>
                                              </Col>
                                              <Col md={8}>
                                                <div className="input-group d-flex">
                                                  {" "}
                                                  <input
                                                    name="physical_address"
                                                    type="text"
                                                    className={
                                                      "form-control" +
                                                      (errors.physical_address &&
                                                        touched.physical_address
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    value={fullPhysicalAddress}
                                                    onChange={e => {
                                                      setFullPhysicalAddress(
                                                        e.target.value
                                                      );
                                                    }}
                                                    ref={inputRef}
                                                  />
                                                  {!physicalAddForm ? (
                                                    <Button
                                                      color="primary"
                                                      onClick={
                                                        handlePhysicalAddForm
                                                      }
                                                      className="d-flex justify-content-evenly align-items-center"
                                                    >
                                                      Details{" "}
                                                      <i className="fa fa-solid fa-caret-down ms-1" />
                                                    </Button>
                                                  ) : (
                                                    <Button
                                                      color="primary"
                                                      onClick={
                                                        handlePhysicalAddForm
                                                      }
                                                      className="d-flex justify-content-evenly align-items-center"
                                                    >
                                                      Close
                                                      <i className="fas fa-times ms-1"></i>
                                                    </Button>
                                                  )}
                                                </div>

                                                {physicalAddForm && (
                                                  <div>
                                                    <Row className="my-3 mb-3">
                                                      <Col md={2}>
                                                        <Label
                                                          for="building"
                                                          className="form-label"
                                                        >
                                                          Building Name
                                                        </Label>
                                                      </Col>

                                                      <Col md={6}>
                                                        <Field
                                                          name="physical_building_name"
                                                          type="text"
                                                          className={
                                                            "form-control" +
                                                            (errors.physical_building_name &&
                                                              touched.physical_building_name
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={
                                                            physicalAddress.physical_building_name
                                                          }
                                                          onChange={e => {
                                                            addresshandlerPhysical(e, "physical_building_name");
                                                          }}
                                                        />

                                                        <ErrorMessage
                                                          name="physical_building_name"
                                                          component="div"
                                                          className="invalid-feedback"
                                                        />
                                                      </Col>
                                                    </Row>

                                                    <Row className="mt-2 mb-3">
                                                      <Col md={2}>
                                                        <Label
                                                          for="unit"
                                                          className="form-label"
                                                        >
                                                          Unit
                                                        </Label>
                                                      </Col>

                                                      <Col md={6}>
                                                        <Field
                                                          name="physical_unit"
                                                          type="text"
                                                          className={
                                                            "form-control" +
                                                            (errors.physical_unit &&
                                                              touched.physical_unit
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={
                                                            physicalAddress.physical_unit
                                                          }
                                                          onChange={e => {
                                                            addresshandlerPhysical(e, "physical_unit");
                                                          }}
                                                        />
                                                        <ErrorMessage
                                                          name="physical_unit"
                                                          component="div"
                                                          className="invalid-feedback"
                                                        />
                                                      </Col>
                                                    </Row>

                                                    <Row className="mt-3 mb-3">
                                                      <Col md={2}>
                                                        <Label
                                                          for="number"
                                                          className="form-label"
                                                        >
                                                          Number
                                                        </Label>
                                                      </Col>

                                                      <Col md={6}>
                                                        <Field
                                                          name="physical_number"
                                                          type="text"
                                                          className={
                                                            "form-control" +
                                                            (errors.physical_number &&
                                                              touched.physical_number
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={
                                                            physicalAddress.physical_number
                                                          }
                                                          onChange={e => {
                                                            addresshandlerPhysical(e, "physical_number");
                                                          }}
                                                        />
                                                      </Col>
                                                      <ErrorMessage
                                                        name="physical_number"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Row>

                                                    <Row className="mt-3 mb-3">
                                                      <Col md={2}>
                                                        <Label
                                                          for="physical_street"
                                                          className="form-label"
                                                        >
                                                          Street
                                                        </Label>
                                                      </Col>

                                                      <Col md={6}>
                                                        <Field
                                                          name="physical_street"
                                                          type="text"
                                                          className={
                                                            "form-control" +
                                                            (errors.physical_street &&
                                                              touched.physical_street
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={
                                                            physicalAddress.physical_street
                                                          }
                                                          onChange={e => {
                                                            addresshandlerPhysical(e, "physical_street");
                                                          }}
                                                        />

                                                        <ErrorMessage
                                                          name="physical_street"
                                                          component="div"
                                                          className="invalid-feedback"
                                                        />
                                                      </Col>
                                                    </Row>

                                                    <Row className="mt-3 mb-3">
                                                      <Col md={2}>
                                                        <Label
                                                          for="suburb"
                                                          className="form-label"
                                                        >
                                                          Suburb
                                                        </Label>
                                                      </Col>

                                                      <Col md={6}>
                                                        <Field
                                                          name="physical_suburb"
                                                          type="text"
                                                          className={
                                                            "form-control" +
                                                            (errors.physical_suburb &&
                                                              touched.physical_suburb
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={
                                                            physicalAddress.physical_suburb
                                                          }
                                                          onChange={e => {
                                                            addresshandlerPhysical(e, "physical_suburb");
                                                          }}
                                                        />
                                                      </Col>

                                                      <ErrorMessage
                                                        name="physical_suburb"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Row>

                                                    <Row className="mt-3 mb-3">
                                                      <Col md={2}>
                                                        <Label
                                                          for="postcode"
                                                          className="form-label"
                                                        >
                                                          Postcode
                                                        </Label>
                                                      </Col>

                                                      <Col md={6}>
                                                        <Field
                                                          name="physical_postcode"
                                                          type="text"
                                                          className={
                                                            "form-control" +
                                                            (errors.physical_postcode &&
                                                              touched.physical_postcode
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={
                                                            physicalAddress.physical_postcode
                                                          }
                                                          onChange={e => {
                                                            addresshandlerPhysical(e, "physical_postcode");
                                                          }}
                                                        />
                                                      </Col>

                                                      <ErrorMessage
                                                        name="physical_postcode"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Row>

                                                    <Row className="mt-3 mb-3">
                                                      <Col md={2}>
                                                        <Label
                                                          for="state"
                                                          className="form-label"
                                                        >
                                                          State
                                                        </Label>
                                                      </Col>

                                                      <Col md={6}>
                                                        <Field
                                                          name="physical_state"
                                                          type="text"
                                                          className={
                                                            "form-control" +
                                                            (errors.physical_state &&
                                                              touched.physical_state
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={
                                                            physicalAddress.physical_state
                                                          }
                                                          onChange={e => {
                                                            addresshandlerPhysical(e, "physical_state");
                                                          }}
                                                        />
                                                      </Col>

                                                      <ErrorMessage
                                                        name="physical_state"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Row>

                                                    <Row className="mt-3 mb-3">
                                                      <Col md={2}>
                                                        <Label
                                                          for="country"
                                                          className="form-label"
                                                        >
                                                          Country
                                                        </Label>
                                                      </Col>

                                                      <Col md={6}>
                                                        <Field
                                                          name="physical_country"
                                                          type="text"
                                                          className={
                                                            "form-control" +
                                                            (errors.physical_country &&
                                                              touched.physical_country
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={
                                                            physicalAddress.physical_country
                                                          }
                                                          onChange={e => {
                                                            addresshandlerPhysical(e, "physical_country");
                                                          }}
                                                        />
                                                      </Col>
                                                      <ErrorMessage
                                                        name="physical_country"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Row>
                                                  </div>
                                                )}
                                              </Col>
                                            </Row>
                                            <Row className="mt-3 justify-content-evenly align-items-start g-4">
                                              <Col md={2}>
                                                {" "}
                                                <Label
                                                  for="building"
                                                  className="form-label ps-2"
                                                >
                                                  Communication
                                                </Label>
                                              </Col>
                                              <Col md={8} className="ms-4">
                                                <div className="form-check mb-3">
                                                  <Label
                                                    for="defaultCheck1"
                                                    className="form-check-label"
                                                  >
                                                    Print statements and notices
                                                    for this person
                                                  </Label>
                                                  <Field
                                                    name="communication"
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    value="Print"
                                                    id="defaultCheck1"
                                                    checked={
                                                      forCheck.printCheck ===
                                                        true
                                                        ? true
                                                        : false
                                                    }
                                                    onClick={e =>
                                                      communicationHandler(e)
                                                    }
                                                  />
                                                </div>
                                                <div className="form-check mb-3">
                                                  <Label
                                                    for="defaultCheck2"
                                                    className="form-check-label"
                                                  >
                                                    Send email communications to
                                                    this person
                                                  </Label>
                                                  <Field
                                                    name="communication"
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    value="Email"
                                                    id="defaultCheck2"
                                                    onClick={e =>
                                                      communicationHandler(e)
                                                    }
                                                    checked={
                                                      forCheck.emailCheck ===
                                                        true
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                </div>
                                                <div className="form-check mb-3">
                                                  <Label
                                                    for="defaultCheck3"
                                                    className="form-check-label"
                                                  >
                                                    Send SMS communications to
                                                    this person
                                                  </Label>
                                                  <Field
                                                    name="communication"
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    value="SMS"
                                                    id="defaultCheck3"
                                                    checked={
                                                      forCheck.smsCheck === true
                                                        ? true
                                                        : false
                                                    }
                                                    onClick={e =>
                                                      communicationHandler(e)
                                                    }
                                                  />
                                                </div>
                                                {/* <Button color="danger">
                                                                                                    Delete Person
                                                                                                </Button> */}
                                              </Col>
                                            </Row>
                                          </div>
                                        </CardBody>
                                      </Card>
                                      <Card>
                                        <CardBody>
                                          <h4 className="text-primary mb-3">
                                            Commercial
                                          </h4>
                                          <div
                                            className="w-75 mt-2 mb-2"
                                            style={{
                                              borderBottom:
                                                "1.2px dotted #c9c7c7",
                                            }}
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
                                          </h4>
                                          <div
                                            className="w-75 mt-2 mb-2"
                                            style={{
                                              borderBottom:
                                                "1.2px dotted #c9c7c7",
                                            }}
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
                              <Formik
                                enableReinitialize={true}
                                initialValues={{
                                  total_money:
                                    (state2 && state2.total_money) || "$0.00",
                                  balance: (state2 && state2.balance) || "",
                                  regular_intervals:
                                    (state2 && state2.regular_intervals) || "",
                                  next_disburse_date:
                                    (state2 && state2.next_disburse_date) || "",
                                  withhold_amount:
                                    (state2 && state2.withhold_amount) || "",
                                  withold_reason:
                                    (state2 && state2.withold_reason) || "",
                                  agreement_start:
                                    (state2 && state2.agreement_start) || "",
                                  gained_reason:
                                    (state2 && state2.gained_reason) || "",
                                  comment: (state2 && state2.comment) || "",
                                  agreement_end:
                                    (state2 && state2.agreement_end) || "",
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
                                  setFormSubmitBtnState(formSubmitBtnState + 1);
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
                                              <Card>
                                                <CardBody>
                                                  <h4 className="text-primary mb-2">
                                                    Disburse
                                                  </h4>
                                                  <div
                                                    className="w-100 mb-3"
                                                    style={{
                                                      borderBottom:
                                                        "1.2px dotted #c9c7c7",
                                                    }}
                                                  />
                                                  <div className="d-flex justify-content-center align-items-center my-3">
                                                    <p className="text-muted">
                                                      A new folio will be
                                                      created for this property
                                                    </p>
                                                  </div>
                                                  <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                    <Col md={3}>
                                                      <Label
                                                        for="building"
                                                        className="form-label"
                                                      >
                                                        When should this folio
                                                        be disbursed?
                                                      </Label>
                                                    </Col>

                                                    <Col md={9}>
                                                      <Row className="d-flex mb-2">
                                                        <Col md={3}>
                                                          <p>
                                                            {" "}
                                                            When total money in
                                                            is
                                                          </p>
                                                        </Col>
                                                        {/* <Col md={3}>
                                                          {" "}
                                                          <Field
                                                            name="total_money"
                                                            type="text"
                                                            placeholder="$0.00"
                                                            className={
                                                              "form-control" +
                                                              (errors.total_money &&
                                                              touched.total_money
                                                                ? " is-invalid"
                                                                : "")
                                                            }
                                                            value={
                                                              blurState.total_money
                                                            }
                                                            onChange={
                                                              handlePropertyFormValuesTotalMoney
                                                            }
                                                          />
                                                          <ErrorMessage
                                                            name="total_money"
                                                            component="div"
                                                            className="invalid-feedback"
                                                          />
                                                        </Col> */}
                                                        <Col
                                                          md={3}
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
                                                              $
                                                            </span>
                                                          </span>
                                                          <div className="d-flex flex-column">
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
                                                                borderTopLeftRadius: 0,
                                                                borderBottomLeftRadius: 0,
                                                              }}
                                                              // onChange={e => {
                                                              //   handlePropertyFormValuesTotalMoney(
                                                              //     e
                                                              //   );
                                                              // }}
                                                              onChange={
                                                                handlePropertyFormValues2
                                                              }
                                                            />
                                                            <ErrorMessage
                                                              name="total_money"
                                                              component="div"
                                                              className="invalid-feedback"
                                                            />
                                                          </div>
                                                        </Col>
                                                        <Col md={3}>
                                                          <p>or more</p>
                                                        </Col>
                                                      </Row>
                                                      <Row className="d-flex mb-2">
                                                        <Col md={3}>
                                                          <p>
                                                            {" "}
                                                            When balance is
                                                          </p>
                                                        </Col>
                                                        {/* <Col md={3}>
                                                          {" "}
                                                          <Field
                                                            name="balance"
                                                            type="text"
                                                            placeholder="$0.00"
                                                            className={
                                                              "form-control" +
                                                              (errors.balance &&
                                                              touched.balance
                                                                ? " is-invalid"
                                                                : "")
                                                            }
                                                            value={
                                                              blurState.balance
                                                            }
                                                            onChange={
                                                              handlePropertyFormValuesBalanace
                                                            }
                                                          />
                                                          <ErrorMessage
                                                            name="balance"
                                                            component="div"
                                                            className="invalid-feedback"
                                                          />
                                                        </Col> */}
                                                        <Col
                                                          md={3}
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
                                                              $
                                                            </span>
                                                          </span>
                                                          <div className="d-flex flex-column">
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
                                                                borderTopLeftRadius: 0,
                                                                borderBottomLeftRadius: 0,
                                                              }}
                                                              // onChange={
                                                              //   handlePropertyFormValuesBalanace
                                                              // }
                                                              onChange={
                                                                handlePropertyFormValues2
                                                              }
                                                            />
                                                            <ErrorMessage
                                                              name="balance"
                                                              component="div"
                                                              className="invalid-feedback"
                                                            />
                                                          </div>
                                                        </Col>
                                                        <Col md={3}>
                                                          <p>or more</p>
                                                        </Col>
                                                      </Row>
                                                      <Row className="d-flex">
                                                        <Col
                                                          md={3}
                                                          className="d-flex"
                                                        >
                                                          <i className="fa fa-solid fa-check text-success" />
                                                          <p>
                                                            {" "}
                                                            At regular intervals
                                                          </p>
                                                        </Col>
                                                        <Col md={5}>
                                                          <div className="mb-3">
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
                                                            <ErrorMessage
                                                              name="regular_intervals"
                                                              component="div"
                                                              className="invalid-feedback"
                                                            />
                                                          </div>
                                                        </Col>
                                                      </Row>
                                                      <Row>
                                                        <Col md={3}>
                                                          <p>
                                                            Next disburse date
                                                          </p>
                                                        </Col>
                                                        <Col md={5}>
                                                          <div className="mb-3 row">
                                                            <div className="col-md-10">

                                                              <div className="w-100">
                                                                <Flatpickr
                                                                  className="form-control d-block"
                                                                  placeholder="Pick a date..."
                                                                  value={state2.next_disburse_date}

                                                                  options={{
                                                                    altInput: true,
                                                                    format: "d/m/Y",
                                                                    altFormat: "d/m/Y",
                                                                    onChange: disburseDateHandler
                                                                  }}
                                                                />
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
                                              </Card>
                                              <Card>
                                                <CardBody>
                                                  <h4 className="text-primary mb-2">
                                                    Withhold
                                                  </h4>
                                                  <div
                                                    className="w-100"
                                                    style={{
                                                      borderBottom:
                                                        "1.2px dotted #c9c7c7",
                                                    }}
                                                  />
                                                  <div className="w-75">
                                                    <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                      <Col md={2}>
                                                        <Label
                                                          for="building"
                                                          className="form-label"
                                                        >
                                                          Withhold amount
                                                        </Label>
                                                      </Col>

                                                      {/* <Col md={7}>
                                                        <Row className="d-flex">
                                                          <Col>
                                                            {" "}
                                                            <Field
                                                              name="withhold_amount"
                                                              type="text"
                                                              placeholder="$0.00"
                                                              className={
                                                                "form-control" +
                                                                (errors.withhold_amount &&
                                                                touched.withhold_amount
                                                                  ? " is-invalid"
                                                                  : "")
                                                              }
                                                              value={
                                                                blurState.withhold_amount
                                                              }
                                                              onChange={e =>
                                                                handlePropertyFormValuesWithHoldAmount
                                                              }
                                                            />
                                                            <ErrorMessage
                                                              name="withhold_amount"
                                                              component="div"
                                                              className="invalid-feedback"
                                                            />
                                                          </Col>
                                                          <Col></Col>

                                                          <Col></Col>
                                                        </Row>
                                                        <p className="text-muted">
                                                          {" "}
                                                          At the time of
                                                          disbursement, this
                                                          amount will be
                                                          discounted from the
                                                          funds disbursed to the
                                                          owner and withheld. If
                                                          there is less than
                                                          this amount available
                                                          to be disbursed no
                                                          funds will be
                                                          disbursed and the
                                                          amount will stay in
                                                          the owner folio.
                                                        </p>
                                                      </Col> */}
                                                      <Col md={7}>
                                                        <Row className="d-flex">
                                                          <Col className="d-flex">
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
                                                                  borderTopLeftRadius: 0,
                                                                  borderBottomLeftRadius: 0,
                                                                }}
                                                                // onChange={
                                                                //   handlePropertyFormValuesWithHoldAmount
                                                                // }
                                                                onChange={
                                                                  handlePropertyFormValues2
                                                                }
                                                              />
                                                              <ErrorMessage
                                                                name="withhold_amount"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </div>
                                                          </Col>
                                                          <Col></Col>

                                                          <Col></Col>
                                                        </Row>
                                                        <p className="text-muted">
                                                          {" "}
                                                          At the time of
                                                          disbursement, this
                                                          amount will be
                                                          discounted from the
                                                          funds disbursed to the
                                                          owner and withheld. If
                                                          there is less than
                                                          this amount available
                                                          to be disbursed no
                                                          funds will be
                                                          disbursed and the
                                                          amount will stay in
                                                          the owner folio.
                                                        </p>
                                                      </Col>
                                                    </Row>
                                                    <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                      <Col md={2}>
                                                        <Label
                                                          for="building"
                                                          className="form-label"
                                                        >
                                                          Withhold reason
                                                        </Label>
                                                      </Col>

                                                      <Col md={7}>
                                                        <Row className="d-flex">
                                                          <Col>
                                                            {" "}
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
                                                            <ErrorMessage
                                                              name="withold_reason"
                                                              component="div"
                                                              className="invalid-feedback"
                                                            />
                                                          </Col>
                                                        </Row>
                                                      </Col>
                                                    </Row>
                                                  </div>
                                                </CardBody>
                                              </Card>
                                              <Card>
                                                <CardBody>
                                                  <h4 className="text-primary mb-2">
                                                    Agreement
                                                  </h4>
                                                  <div
                                                    className="w-100"
                                                    style={{
                                                      borderBottom:
                                                        "1.2px dotted #c9c7c7",
                                                    }}
                                                  />
                                                  <div className="w-75">
                                                    <Row className="mt-2 mb-3 d-flex justify-content-evenly align-items-start">
                                                      <Col md={4} className='d-flex justify-content-center'>
                                                        <Label
                                                          for="building"
                                                          className="form-label"
                                                        >
                                                          Agreement start
                                                        </Label>
                                                      </Col>

                                                      <Col md={8} className=''>
                                                        <div className="w-50">
                                                          <Flatpickr
                                                            className="form-control d-block"
                                                            placeholder="Pick a date..."
                                                            value={state2.agreement_start}
                                                            // disabled={disabledState}
                                                            // onChange={() => dateHandler()}
                                                            options={{
                                                              altInput: true,
                                                              format: "d/m/Y",
                                                              altFormat: "d/m/Y",
                                                              onChange: agreementDateHandler
                                                            }}
                                                          />
                                                        </div>
                                                      </Col>
                                                    </Row>
                                                    <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                      <Col md={2}>
                                                        <Label
                                                          for="building"
                                                          className="form-label"
                                                        >
                                                          Gained reason
                                                        </Label>
                                                      </Col>

                                                      <Col md={7}>
                                                        <Row className="d-flex">
                                                          <Col>
                                                            <div>
                                                              <div className="mb-3">
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
                                                              </div>
                                                            </div>
                                                          </Col>
                                                        </Row>
                                                      </Col>
                                                    </Row>

                                                    <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                      <Col md={2}>
                                                        <Label
                                                          for="building"
                                                          className="form-label"
                                                        >
                                                          Comment (gained)
                                                        </Label>
                                                      </Col>

                                                      <Col md={7}>
                                                        <Row className="d-flex">
                                                          <Col>
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
                                                            <ErrorMessage
                                                              name="comment"
                                                              component="div"
                                                              className="invalid-feedback"
                                                            />
                                                          </Col>
                                                        </Row>
                                                      </Col>
                                                    </Row>
                                                    <Row className="mt-2 mb-3 d-flex justify-content-evenly align-items-start">
                                                      <Col md={4}>
                                                        <Label
                                                          for="building"
                                                          className="form-label"
                                                        >
                                                          Agreement ends
                                                        </Label>
                                                      </Col>

                                                      <Col md={8}>
                                                        <div className="w-50">
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
                                                              onChange: agreementEndDateHandler
                                                            }}
                                                          />
                                                        </div>
                                                      </Col>
                                                    </Row>
                                                  </div>
                                                </CardBody>
                                              </Card>

                                              <Card>
                                                <CardBody>
                                                  <h4 className="text-primary mb-2">
                                                    Client Access
                                                  </h4>
                                                  <div
                                                    className="w-100"
                                                    style={{
                                                      borderBottom:
                                                        "1.2px dotted #c9c7c7",
                                                    }}
                                                  />
                                                  <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                    <Col md={2}>
                                                      <Label
                                                        for="building"
                                                        className="form-label"
                                                      >
                                                        Owner Access
                                                      </Label>
                                                    </Col>

                                                    <Col md={7}>
                                                      <Row className="d-flex">
                                                        <Col>
                                                          <div className="btn-group btn-group-justified">
                                                            <div className="btn-group">
                                                              <Button
                                                                className="d-flex align-items-center"
                                                                color={
                                                                  ownerAccess ===
                                                                    1
                                                                    ? "secondary"
                                                                    : "light"
                                                                }
                                                                onClick={
                                                                  toggleInspectionEnableBtn
                                                                }
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
                                                                className="d-flex align-items-center"
                                                                color={
                                                                  ownerAccess ===
                                                                    0
                                                                    ? "secondary"
                                                                    : "light"
                                                                }
                                                                onClick={
                                                                  toggleInspectionDisableBtn
                                                                }
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
                                              </Card>
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
              <Card>
                <CardBody>
                  {
                    props.owner_info_data?.data?.data?.user ?
                      // <div className="text-center">
                      //   Yes have user plan data
                      // </div>
                      <div className="table-responsive">
                        <Table className="table mb-0">
                          <thead className="table-light">
                            <tr>
                              <th></th>
                              <th>Addon</th>
                              <th>Addon type</th>
                              <th>$</th>
                              <th>%</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row" className="align-middle text-center">{props.owner_info_data?.data?.data?.user?.user_plan?.plan?.name}</th>
                              <td colSpan={4}>
                                {
                                  props.owner_info_data?.data?.data?.user?.user_plan?.plan?.details?.map((item, idx) => {
                                    return (
                                      <>
                                        <tr key={item.id} className="mb-3 d-flex justify-content-start">
                                          <div style={{ width: '30%' }}>{item.addon.display_name}</div>
                                          <div style={{ width: item.addon.value === '$' ? '43%' : '59%' }}>{item.addon.fee_type}</div>
                                          <div style={{ width: item.addon.value === '$' ? '10%' : '' }}>{item.addon.value === '$' && `$${item.addon.price}`}</div>
                                          <div style={{ width: item.addon.value === '%' ? '5%' : '' }}>
                                            {item.addon.value === '%' && `${item.addon.price}%`}
                                            {
                                              item.addon.fee_type === 'Manual' &&
                                              <>
                                                {item.addon.value === '%' && <br />}
                                                <Button color="secondary" className="btn btn-sm" onClick={() => handleCreateBill(item)}>Charge Fee</Button>
                                              </>
                                            }
                                          </div>
                                        </tr>
                                        {idx + 1 !== props.owner_info_data?.data?.data?.user?.user_plan?.plan?.details?.length ? <hr /> : ''}
                                      </>

                                    );
                                  })
                                }
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      : <div className="text-center text-primary">No plan has been assigned to this owner yet</div>
                  }
                </CardBody>
              </Card>
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
                            <Card>
                              <CardBody>
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
                                          onChange={e =>
                                            handlePropertyFormValues8(idx, e)
                                          }
                                          value={state8[idx]["bsb"]}
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
                                          onChange={e =>
                                            handlePropertyFormValues8(idx, e)
                                          }
                                          value={state8[idx]["account"]}
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
                                                    "$"
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
                                              handlePropertyFormValues8(idx, e)
                                            }
                                            disabled={
                                              !state8[idx]["split_type_boolean"]
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
                                    color="secondary"
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
                  toggleTab(
                    tabState.activeTab === 1 ? "" : tabState.activeTab - 1
                  );
                  setFormSubmitBtnState(formSubmitBtnState - 1);
                }}
              >
                Previous
              </Link>
            </li>
            <li className={tabState.activeTab === 4 ? "next disabled" : "next"}>
              <button
                type="submit"
                form={"owner-form-" + formSubmitBtnState}
                className="btn btn-info"
                onClick={nextTabState}
              >
                <i className="fas fa-file-alt me-1"></i>
                {
                  tabState.activeTab === 4 ?
                    'Save' : 'Save & Next'
                }
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = gstate => {
  const { } = gstate.Contacts2;
  const {
    property_owner_info_loading,
    owner_info_data,
    owner_info_error,
    owner_info_loading,

    property_owner_update_loading,
  } = gstate.property;
  return {
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
  })(OwnerEdit)
);
