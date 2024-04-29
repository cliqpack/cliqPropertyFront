import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import moment from "moment";
import "./style.css";
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
  getPropertyInfo,
  getPropertyFee,
  getPropertyFeeFresh,
  propertyOwnerAddFresh,
} from "../../store/Properties/actions";
import {
  contactList,
  showContactFresh,
  showContact, emailValidationCheck, emailValidationCheckFresh
} from "../../store/Contacts2/actions";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Link, useHistory, withRouter, useParams } from "react-router-dom";
import { element } from "prop-types";
import { blur } from "redux-form";

import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import Breadcrumbs from "components/Common/Breadcrumb";
import Plans from "./Plans";
import OwnerContactForm from './Owner/OwnerContactForm';
import OwnerFolioForm from "./Owner/OwnerFolioForm";
import OwnerPaymentMethodForm from "./Owner/OwnerPaymentMethodForm";
import OwnerFeeForm from "./Owner/OwnerFeeForm";
import PropertyFeeForm from "./Owner/PropertyFeeForm";

const PropertyOwnerAdd2 = props => {
  // Form Tab State
  const [tabState, setTabState] = useState({
    activeTab: 1,
    passedSteps: [1],
    customIconActiveTab: '1',

  });

  const toggleIconCustom = tab => {
    if (tabState.activeTab !== tab) {
      setTabState({ ...tabState, customIconActiveTab: tab })
    }
    // if(tab=='1'){
    //   setPlanIndex();
    // }
  }

  const [dateCheck, setDateCheck] = useState({ nextDisburseDate: false, });
  const [blurState, setBlurState] = useState({});
  const [seen, setSeen] = useState(false);
  // ---------
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
  console.log(tabState);

  // Autocomplete address
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {};

  const inputRefPostal = useRef();
  const autoCompletePostalRef = useRef();
  // ------------------------

  const [fullPostalAddress, setFullPostalAddress] = useState("");
  const [fullPhysicalAddress, setFullPhysicalAddress] = useState("");

  const { id } = useParams(); // Property ID
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
  const [state, setState] = useState({}); // Form 1 State
  const date = moment().format("yyyy-MM-DD");
  const date_end = moment().add(365, "days").format("yyyy-MM-DD");
  const months = moment().add(12, 'months').format('yyyy-MM-DD');
  const day = moment(months).subtract(1, 'days').format('yyyy-MM-DD');
  const [state2, setState2] = useState({
    agreement_start: date,
    agreement_end: day,
  }); // Form 2 State


  const [ownerAccess, setOwnerAccess] = useState(1); // Form 2 State

  const [addressState, setAddressState] = useState(true);

  const [show, setShow] = useState(false);
  const [postalAddForm, setPostalAddForm] = useState(false);
  const [physicalAddForm, setPhysicalAddForm] = useState(false);
  const [postalAddress, setPostalAddress] = useState({});
  const [physicalAddress, setPhysicalAddress] = useState({});

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
  const [enteredStateTab3, setEnteredStateTab3] = useState(false);

  // ----------------------------

  const [forCheck, setForCheck] = useState({
    smsCheck: false,
    emailCheck: false,
    printCheck: false,
  });
  let contactEditCommunication = {
    printCheck: false,
    emailCheck: false,
    smsCheck: false,
  };
  const [checkState, setCheckState] = useState([]);
  const [planState, setPlanState] = useState();
  const [planIndex, setPlanIndex] = useState({ index: 0, selected: false });

  console.log(planState);
  console.log(planIndex);

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
  const propertyRef = props.property_info_data?.data?.data?.reference
    ? props.property_info_data?.data?.data?.reference
    : "";



  const disburseDateHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ['next_disburse_date']: dateStr });
  }

  const agreementDateHandler = (selectedDates, dateStr, instance) => {

    const months = moment(dateStr).add(12, 'months').format('yyyy-MM-DD');
    const day = moment(months).subtract(1, 'days').format('yyyy-MM-DD');
    // const date_end1 = moment(dateStr).add(365, "days").format("yyyy-MM-DD");
    setState2({
      ...state2, ['agreement_start']: dateStr, ["agreement_end"]: day,
    });
  }

  const agreementEndDateHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ['agreement_end']: dateStr })
  }


  useEffect(() => {
    if (contactState) {
      props.showContact(selectedId);
    }
    if (props.contacts_list_loading === false) {
      props.contactList();
    }
    if (props.property_owner_add_loading === "Success") {
      // props.contactList();
      toastr.success("Owner Added Successfully");
      props.propertyOwnerAddFresh();
      props.propertyListFresh();
      history.push("/propertyInfo/" + id, {
        id: id,
      });
    }
    if (props.property_owner_add_loading === "Failed") {
      toastr.error("Something went wrong");
      props.propertyOwnerAddFresh();
    }
    if (props.property_owner_info_loading === "Success") {
      props.propertyOwnerInfoFresh();
    }

    if (props.property_info_loading === false) {
      props.getPropertyInfo(id);
    }

    if (props.contacts_show_data && contactState) {
      setContactState(false);
      setContactId(props.contacts_show_data?.data?.id);
      setState({
        ...state,
        reference: props.contacts_show_data?.data?.reference,
        first_name: props.contacts_show_data?.data?.first_name,
        last_name: props.contacts_show_data?.data?.last_name,
        salutation: props.contacts_show_data?.data?.salutation,
        company_name: props.contacts_show_data?.data?.company_name,
        email: props.contacts_show_data?.data?.email,
        abn: props.contacts_show_data?.data?.abn,
        notes: props.contacts_show_data?.data?.notes,
      });

      setPhone({
        mobile_phone: props.contacts_show_data?.data?.mobile_phone,
        work_phone: props.contacts_show_data?.data?.work_phone,
        home_phone: props.contacts_show_data?.data?.home_phone,
      });

      setPostalAddress({
        postal_building_name:
          props.contacts_show_data?.contactPostalAddress?.building_name,
        postal_country: props.contacts_show_data?.contactPostalAddress?.country,
        postal_number: props.contacts_show_data?.contactPostalAddress?.number,
        postal_postcode:
          props.contacts_show_data?.contactPostalAddress?.postcode,
        postal_state: props.contacts_show_data?.contactPostalAddress?.state,
        postal_street: props.contacts_show_data?.contactPostalAddress?.street,
        postal_suburb: props.contacts_show_data?.contactPostalAddress?.suburb,
        postal_unit: props.contacts_show_data?.contactPostalAddress?.unit,
      });
      setPhysicalAddress({
        physical_building_name:
          props.contacts_show_data?.contactPhysicalAddress?.building_name,
        physical_country:
          props.contacts_show_data?.contactPhysicalAddress?.country,
        physical_number:
          props.contacts_show_data?.contactPhysicalAddress?.number,
        physical_postcode:
          props.contacts_show_data?.contactPhysicalAddress?.postcode,
        physical_state: props.contacts_show_data?.contactPhysicalAddress?.state,
        physical_street:
          props.contacts_show_data?.contactPhysicalAddress?.street,
        physical_suburb:
          props.contacts_show_data?.contactPhysicalAddress?.suburb,
        physical_unit: props.contacts_show_data?.contactPhysicalAddress?.unit,
      });

      let building = props.contacts_show_data?.contactPostalAddress
        ?.building_name
        ? props.contacts_show_data.contactPostalAddress?.building_name + " "
        : "";
      let unit = props.contacts_show_data?.contactPostalAddress?.unit
        ? props.contacts_show_data?.contactPostalAddress.unit + "/"
        : "";
      let number = props.contacts_show_data?.contactPostalAddress?.number
        ? props.contacts_show_data?.contactPostalAddress.number + " "
        : "";
      let street = props.contacts_show_data?.contactPostalAddress?.street
        ? props.contacts_show_data?.contactPostalAddress.street + ", "
        : "";
      let suburb = props.contacts_show_data?.contactPostalAddress?.suburb
        ? props.contacts_show_data?.contactPostalAddress?.suburb + ", "
        : "";
      let pstate = props.contacts_show_data?.contactPostalAddress?.state
        ? props.contacts_show_data?.contactPostalAddress?.state + " "
        : "";
      let postcode = props.contacts_show_data?.contactPostalAddress?.postcode
        ? props.contacts_show_data?.contactPostalAddress?.postcode + " "
        : "";
      let country = props.contacts_show_data?.contactPostalAddress?.country
        ? props.contacts_show_data?.contactPostalAddress?.country
        : "";
      setFullPostalAddress(
        building + unit + number + street + suburb + pstate + postcode + country
      );
      building = props.contacts_show_data?.contactPhysicalAddress?.building_name
        ? props.contacts_show_data?.contactPhysicalAddress?.building_name + " "
        : "";
      unit = props.contacts_show_data?.contactPhysicalAddress?.unit
        ? props.contacts_show_data?.contactPhysicalAddress?.unit + "/"
        : "";
      number = props.contacts_show_data?.contactPhysicalAddress?.number
        ? props.contacts_show_data?.contactPhysicalAddress?.number + " "
        : "";
      street = props.contacts_show_data?.contactPhysicalAddress?.street
        ? props.contacts_show_data?.contactPhysicalAddress?.street + ", "
        : "";
      suburb = props.contacts_show_data?.contactPhysicalAddress?.suburb
        ? props.contacts_show_data?.contactPhysicalAddress?.suburb + " "
        : "";
      pstate = props.contacts_show_data?.contactPhysicalAddress?.state
        ? props.contacts_show_data?.contactPhysicalAddress?.state + " "
        : "";
      postcode = props.contacts_show_data?.contactPhysicalAddress?.postcode
        ? props.contacts_show_data?.contactPhysicalAddress.postcode + " "
        : "";
      country = props.contacts_show_data?.contactPhysicalAddress?.country
        ? props.contacts_show_data?.contactPhysicalAddress?.country
        : "";
      setFullPhysicalAddress(
        building + unit + number + street + suburb + pstate + postcode + country
      );

      let com = [];
      props.contacts_show_data?.contactCommunication?.map(item => {
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

    // Autocomplete address
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
      let u = unitN ? unitN + "/" : "";
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
        let u = unitN ? unitN + "/" : "";
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
    setSeen(true);
  }, [
    props.contacts_list_loading,
    props.property_owner_add_loading,
    props.property_owner_info_loading,
    contactState,
    props.contacts_show_data,
    state,
    props.property_info_loading,
    props.get_property_fee_data,
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
    setState8([
      {
        selectedValues: { label: "EFT", value: "EFT" },
        method: "EFT",
        payee: reference,
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
    let dollar = e.target.value;

    var lol = e.target.value.split("৳");

    // const data = lol.length == 2 ? `$${lol[1]}` : `$${lol[0]}`;
    var blur = null;
    var data = 0;
    if (lol.length == 2 && dollar != "") {
      blur = `${lol[1]}৳`;
      data = lol[1];
    } else if (lol.length == 1 && dollar != "") {
      blur = `${lol[0]}৳`;
      data = lol[0];
    }

    setState2({ ...state2, [e.target.name]: data });
    setBlurState({ ...blurState, total_money: blur });
  };

  const handlePropertyFormValuesBalanace = e => {
    let dollar = e.target.value;
    var lol = e.target.value.split("৳");
    // const data = `$${lol.length == 2 ? lol[1] : lol[0]}`;
    var blur;
    var data = 0;
    if (lol.length == 2 && dollar != "") {
      blur = `${lol[1]}৳`;
      data = lol[1];
    } else if (lol.length == 1 && dollar != "") {
      blur = `${lol[0]}৳`;
      data = lol[0];
    }

    setState2({ ...state2, [e.target.name]: data });
    setBlurState({ ...blurState, balance: blur });
  };

  const handlePropertyFormValuesWithHoldAmount = e => {
    let dollar = e.target.value;
    var lol = e.target.value.split("৳");
    // const data = `$${lol.length == 2 ? lol[1] : lol[0]}`;
    var blur = null;
    var data = 0;
    if (lol.length == 2 && dollar != "") {
      blur = `${lol[1]}৳`;
      data = lol[1];
    } else if (lol.length == 1 && dollar != "") {
      blur = `${lol[0]}৳`;
      data = lol[0];
    }

    setState2({ ...state2, [e.target.name]: data });
    setBlurState({ ...blurState, withhold_amount: blur });
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
        setEnteredStateTab3(false);
      } else {
        setEnteredStateTab3(true);
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
      } else if (el.fee_template_2 === "Letting fee ()") {
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

  const toggleFeesModalHandler = () => {
    if (tabState.customIconActiveTab == '1') {
      toggleFeesModal();
      setEnteredStateTab3(true);
    } else if (tabState.customIconActiveTab == 2) {
      console.log(planState);
      console.log(planIndex);
    }
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
      values[idx]["types"] = "%";
    } else if (e.value === "2") {
      values[idx]["income_account_2"] = "Letting fee (inc. tax) (৳)";
      values[idx]["fee_trigger_2"] = "First rent receipt";
      values[idx]["notes_2"] = "";
      values[idx]["types"] = "৳";
    } else if (e.value === "3") {
      values[idx]["income_account_2"] = "Management fee (inc. tax) (%)";
      values[idx]["fee_trigger_2"] = "Rental receipt";
      values[idx]["notes_2"] = "";
      values[idx]["types"] = "%";
    }
    await setState7(values);

    setSelectedGroup7(e);
    setSelectedId7(e.value);
    setTableInfoShow7(true);
  };
  const handlePropertyFormValues4 = (idx, e) => {
    let data = [...state3];
    data[idx][e.target.name] = e.target.value;

    // let dollar = e.target.value;
    // let lol = e.target.value.split("$");
    // let blur;

    // if (lol.length == 2 && dollar != "") {
    //   blur = `$${lol[1]}`;
    // } else if (lol.length == 1 && dollar != "") {
    //   blur = `$${lol[0]}`;
    // }

    // data[idx]["blurState"] = blur;
    setState3(data);
    // setBlurState({ ...blurState, [e.target.name]: blur });
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
        blurState: "",
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
          if (values[idx]['split_type'] == '%') {
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
  if (enteredState && tabState.activeTab === 4) {
    setEnteredState(false);
    props.addOwner(
      state,
      id,
      state2,
      phone,
      state3,
      state7,
      state8,
      ownerAccess,
      contactId,
      physicalAddress,
      postalAddress,
      checkState
    );
    props.propertyOwnerInfoFresh();
  }
  const handleFocus = event => event.target.select();
  // -----------------------------

  let option;
  if (props.contacts_list_data && optionGroupState) {
    option = props.contacts_list_data.data.map(item => ({
      label: item.reference,
      value: item.id,
    }));

    setOptionGroup(option);
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

  const handlePushData = () => {
    props.showContactFresh();
    if (selectedId) {
      setContactState(true);
    }
    handleClose();
    // history.push("/set/setPropertyOwnerAdd/" + selectedId + "/" + id);
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="wizard clearfix">
          <Breadcrumbs title="Assign Owner" breadcrumbItem="Properties" />
          <Row>
            <Col lg="12">
              <Card style={{ marginBottom: "10px", marginRight: '6px' }}>
                <CardBody>
                  <h4 className="ms-2 text-primary">New Owner - {propertyRef}</h4>
                  <div
                    className=""
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>
                </CardBody>
              </Card>

              <div className="vertical-wizard wizard clearfix vertical">
                <div
                  className="card"
                  style={{ marginTop: '11px' }}>
                  <div
                    className="card-body"
                  >
                    <div className="steps clearfix" style={{ width: "100%" }}>
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
                            <span className="number">3.</span> Fees
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({
                            current: tabState.activeTab === 4,
                          })}
                        >
                          <NavLink
                            disabled={!(tabState.passedSteps || []).includes(4)}
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
                  </div>
                </div>
                <div className="content clearfix" style={{ paddingRight: '0px' }}>
                  <TabContent activeTab={tabState.activeTab} className="body">
                    <TabPane tabId={1}>
                      <OwnerContactForm
                        toggleTab={toggleTab}
                        tabState={tabState}
                        setFormSubmitBtnState={setFormSubmitBtnState}
                        formSubmitBtnState={formSubmitBtnState}
                      />
                    </TabPane>
                    <TabPane tabId={2}>
                      <OwnerFolioForm
                        toggleTab={toggleTab}
                        tabState={tabState}
                        setFormSubmitBtnState={setFormSubmitBtnState}
                        formSubmitBtnState={formSubmitBtnState}
                      />
                    </TabPane>
                    <TabPane tabId={3}>
                      <Row>
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
                            className="p-3 text-muted"
                          >
                            <TabPane tabId="1">
                              <Row>
                                <Col sm="12">
                                  <div>
                                    <form
                                      id="owner-form-3"
                                      encType="multipart/form-data"
                                      onSubmit={handleRowResult}
                                    >
                                      <table style={{ width: "100%" }}>
                                        <tbody>
                                          <OwnerFeeForm
                                            state={state}
                                            rows3={rows3}
                                            state3={state3}
                                            handleChangeInput={handleChangeInput}
                                            optionGroup6={optionGroup6}
                                            handlePropertyFormValues4={handlePropertyFormValues4}
                                            handleRemoveRow={handleRemoveRow}
                                            handleAddRow={handleAddRow}
                                          />
                                          <PropertyFeeForm
                                          propertyRef={propertyRef}
                                          rows4={rows4}
                                          state7={state7}
                                          handleChangeInput2={handleChangeInput2}
                                          optionGroup7={optionGroup7}
                                          handlePropertyFormValues7={handlePropertyFormValues7}
                                          handleRemoveRow7={handleRemoveRow7}
                                          handleAddRow7={handleAddRow7}
                                          />
                                        </tbody>
                                      </table>
                                    </form>
                                  </div>
                                </Col>
                              </Row>
                            </TabPane>
                            <TabPane tabId="2">
                              {/* <Row>
                                <Col lg="12"> */}
                              <Card>
                                <CardBody>
                                  <Plans statedata={{ 'planState': planState, 'setPlanState': setPlanState, 'planIndex': planIndex, 'setPlanIndex': setPlanIndex }} />
                                </CardBody>
                              </Card>
                              {/* </Col>
                              </Row> */}
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
                                  <h5 className="modal-title mt-0" id="myModalLabel">
                                    Continue without adding fees?
                                  </h5>
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
                      <OwnerPaymentMethodForm />
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
                    <li className={tabState.activeTab === 4 ? "next disabled" : "next"}>
                      <button
                        type="submit"
                        form={"owner-form-" + formSubmitBtnState}
                        className="btn btn-primary"
                      >
                        <i className="fas fa-file-alt me-1"></i> Save & Next
                      </button>
                    </li>
                  </ul>
                </div>
              </div>


            </Col>
          </Row>
        </div>
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

    contacts_show_data, email_validation_check_data
  } = gstate.Contacts2;
  const {
    property_owner_add_loading,
    property_owner_info_loading,
    property_info_data,
    property_info_loading,

    get_property_fee_data,
    get_property_fee_error,
    get_property_fee_loading,
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
    property_info_loading,

    get_property_fee_data,
    get_property_fee_error,
    get_property_fee_loading, email_validation_check_data
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
    getPropertyInfo,
    getPropertyFee,
    getPropertyFeeFresh,
    propertyOwnerAddFresh, emailValidationCheck, emailValidationCheckFresh
  })(PropertyOwnerAdd2)
);