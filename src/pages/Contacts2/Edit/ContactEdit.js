import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
// import Autocomplete from "react-google-autocomplete";
import {
  Card,
  Alert,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Label,
  Modal,
  Input,
  Button,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  showContact,
  ContactListFresh,
  showContactFresh,
  editContact,
  emailValidationCheck,
  emailValidationCheckFresh,
} from "store/actions";

import { Link, useHistory, useParams, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import ContactForm from "../MultipleReference/ContactForm";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const ContactEdit = props => {
  let com = [];
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

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


  document.title = "CliqProperty";


  useEffect(() => {
    if (props.contacts_show_loading === false) {
      props.showContact(id);
    }

    if (props.contacts_show_data) {
      let contacts = [];
      let contactsPhysical = [];
      let contactsPhysicalFull = [];
      let contactsPostal = [];
      let contactsPostalFull = [];
      let btn = [];
      let forChecks = [];
      props.contacts_show_data?.data?.contact_details?.map((item, key) => {
        let check = [];
        let smsCheck = item.contact_details_communications[0]?.communication == 'SMS' || item.contact_details_communications[1]?.communication == 'SMS' || item.contact_details_communications[2]?.communication == 'SMS' ? true : false;
        let emailCheck = item.contact_details_communications[0]?.communication == 'Email' || item.contact_details_communications[1]?.communication == 'Email' || item.contact_details_communications[2]?.communication == 'Email' ? true : false;
        let printCheck = item.contact_details_communications[0]?.communication == 'Print' || item.contact_details_communications[1]?.communication == 'Print' || item.contact_details_communications[2]?.communication == 'Print' ? true : false;
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
        abn: props.contacts_show_data?.data?.abn,
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
      props.contacts_show_data?.data?.contact_postal_address?.map((item, key) => {
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
    }
    if (props.contacts_edit_loading === "Success") {
      toastr.success("Updated");
      history.push("/contactsInfo/" + id);
    }
    if (props.contacts_edit_loading === "Failed") {
      toastr.error("Update Failed");
    }
  }, [
    props.contacts_show_data,
    props.contacts_edit_loading,
    props.contacts_show_loading,
  ]);

  console.log(props.contacts_show_data);

  const handlePropertyFormValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  function goBack() {
    window.history.back();
  }

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
    console.log(length);
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Edit Contact" breadcrumbItem="Contacts" /> */}
          <h4 className="text-primary py-2 px-4">
            Edit Contact
          </h4>

          <div className="d-flex flex-column justify-content-start">
            <div className="py-2 ps-3">
              <div>
                <div className="mb-3">
                  {props.error ? (
                    <Alert color="danger">
                      {JSON.stringify(props.error.response.data.message)}
                    </Alert>
                  ) : null}
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      reference: (state && state.reference) || "",

                      abn: (state && state.abn) || "",

                      notes: (state && state.notes) || "",
                    }}
                    validationSchema={Yup.object().shape({})}
                    onSubmit={(values, onSubmitProps) => {


                      const emptyNames = state.contacts.filter(item => !item.first_name.trim() || !item.last_name.trim() || !item.email.trim());

                      // const emptyNames = state.contacts.filter(item => !item.first_name.trim() && !item.last_name.trim());
                      // console.log(emptyNames);

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
                        // console.log("No objects with empty first_name or last_name found.");
                        // console.log(emptyNames);
                        // toastr.success('in')

                        dispatch(
                          props.editContact(values, id, '123', state,
                            physicalAddress,
                            postalAddress));
                        props.ContactListFresh();
                        onSubmitProps.resetForm();

                      }



                      props.ContactListFresh();
                      onSubmitProps.resetForm();
                    }}
                  >
                    {({ errors, status, touched }) => (
                      <div>
                        <Form>
                          <div>
                            <Card className="custom_card_border_design me-2">
                              <Col md={9}>
                                <Row className="d-flex justify-content-start px-3">
                                  <Col xs={2} sm={3} md={1} lg={1} style={{ textAlign: "center", justifyContent: "center", padding: "0px" }} >
                                    <div style={{ marginTop: "15px", display: "flex", flexDirection: "column", position: "absolute", left: "15px", }}>
                                      <i className="far fa-user-circle ms-1" style={{ fontSize: "30px" }} />

                                      <div className="vr" style={{ width: "3px", height: "70px", position: "absolute", left: "17px", top: "28px", background: "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)" }}>

                                      </div>

                                    </div>
                                  </Col>
                                  <Col xs={10} sm={9} md={11} lg={11}>
                                    <CardBody style={{ paddingLeft: "0px" }}>
                                      <div className="mb-2 d-flex justify-content-between align-items-center pb-1">
                                        {/* <h4 className="text-primary">
                                          Edit{" "}
                                          {props.contacts_show_data?.data
                                            ?.reference || "Contact"}
                                        </h4> */}

                                        <CardTitle tag="h5">
                                          Edit{" "}
                                          {props.contacts_show_data?.data
                                            ?.reference || "Contact"}
                                        </CardTitle>
                                      </div>

                                      <div>
                                        <Row className="d-flex justify-content-evenly align-items-center">

                                          <Col md={12}>
                                            <div className="form-group-new">
                                              <Field
                                                name="reference"
                                                type="text"
                                                value={state?.reference}
                                                className={
                                                  "form-control" +
                                                  (errors.reference && touched.reference
                                                    ? " is-invalid"
                                                    : "")
                                                }
                                                onChange={handlePropertyFormValues}
                                              />
                                              <label htmlFor="usr">Reference</label>
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
                                          {btnRows.map((item, idx) => (
                                            <Button
                                              type="button"
                                              color="dark"
                                              outline={
                                                step === idx ? false : true
                                              }
                                              key={idx}
                                              className="m-1 btn-sm"
                                              onClick={e =>
                                                handleSubmit(e, idx)
                                              }
                                            >
                                              <span
                                                style={{
                                                  textDecoration: state
                                                    ?.contacts[idx].deleted
                                                    ? "line-through"
                                                    : "none",
                                                }}
                                                title={
                                                  state?.contacts[idx]
                                                    .first_name ||
                                                    state?.contacts[idx]
                                                      .last_name ||
                                                    state?.contacts[idx]
                                                      .company_name
                                                    ? state?.contacts[idx]
                                                      .reference
                                                    : "New Person"
                                                }
                                              >
                                                {idx == 0 && (
                                                  <i className="fas fa-star"></i>
                                                )}{" "}
                                                {state?.contacts[idx]
                                                  .first_name ||
                                                  state?.contacts[idx]
                                                    .last_name ||
                                                  state?.contacts[idx]
                                                    .company_name
                                                  ? state?.contacts[idx]
                                                    .reference.length <= 12
                                                    ? state?.contacts[idx]
                                                      .reference
                                                    : state?.contacts[
                                                      idx
                                                    ].reference.slice(0, 12) +
                                                    "...."
                                                  : "New Person"}
                                              </span>
                                            </Button>
                                          ))}
                                        </div>
                                      </Col>
                                      <Col md={1}>
                                        <Button
                                          color="secondary"
                                          className="m-1 btn-sm"
                                          onClick={handleBtnRows}
                                          disabled={
                                            btnRows.length > 9 ? true : false
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
                                    borderBottom: "1.2px dotted #c9c7c7",
                                  }}
                                ></div>

                                {state.contacts?.map((item, idx) => {
                                  console.log("checking");
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
                                        handleUndoContact={handleUndoContact}
                                        handleContactReference={
                                          handleContactReference
                                        }
                                        setPrimaryHandler={setPrimaryHandler}
                                        state={state.contacts[idx]}
                                        countDelete={countDelete}
                                        checkHandler={checkHandler}
                                        physicalAddress={physicalAddress[idx]}
                                        postalAddress={postalAddress[idx]}
                                        handleSameAddress={handleSameAddress}
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
                                      />
                                    </div>
                                  );
                                })}
                              </CardBody>
                            </Card> */}

                            <Card className="custom_card_border_design me-2">
                              <Col md={9}>
                                <Row className="d-flex justify-content-start px-3">
                                  <Col xs={2} sm={3} md={1} lg={1} style={{ textAlign: "center", justifyContent: "center", padding: "0px" }} >
                                    <div style={{ marginTop: "15px", display: "flex", flexDirection: "column", position: "absolute", left: "15px", }}>
                                      <i className="far fa-user-circle ms-1" style={{ fontSize: "30px" }} />

                                      <div className="vr" style={{ width: "3px", height: "800px", position: "absolute", left: "17px", top: "28px", background: "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)" }}>

                                      </div>

                                    </div>
                                  </Col>
                                  <Col xs={10} sm={9} md={11} lg={11}>
                                    <CardBody style={{ paddingLeft: "0px" }}>

                                      <Row>
                                        <CardTitle tag="h5">
                                          People
                                        </CardTitle>
                                      </Row>
                                      <Row style={{ display: "flex", justifyContent: "flex-end" }}>

                                        <Row>

                                          <div className="d-flex justify-content-end" >
                                            {btnRows.map((item, idx) => (
                                              <Button
                                                type="button"
                                                color="buttonColor"
                                                outline={
                                                  step === idx ? false : true
                                                }
                                                key={idx}
                                                className="m-1 btn-sm p-2"
                                                onClick={e =>
                                                  handleSubmit(e, idx)
                                                }
                                              >
                                                <span
                                                  style={{
                                                    textDecoration: state
                                                      .contacts[idx].deleted
                                                      ? "line-through"
                                                      : "none",
                                                  }}
                                                  title={
                                                    state.contacts[idx]
                                                      .first_name ||
                                                      state.contacts[idx]
                                                        .last_name ||
                                                      state.contacts[idx]
                                                        .company_name
                                                      ? state.contacts[idx]
                                                        .reference
                                                      : "New Person"
                                                  }
                                                >
                                                  {idx === 0 && (
                                                    <i className="fas fa-star"></i>
                                                  )}{" "}
                                                  {state.contacts[idx]
                                                    .first_name ||
                                                    state.contacts[idx].last_name ||
                                                    state.contacts[idx].company_name
                                                    ? state.contacts[idx]
                                                      .reference.length <= 12
                                                      ? state.contacts[idx]
                                                        .reference
                                                      : state.contacts[
                                                        idx
                                                      ].reference.slice(0, 12) +
                                                      "...."
                                                    : "New Person"}
                                                </span>
                                              </Button>

                                            ))}
                                            <Button
                                              color="buttonColor"
                                              className="m-1 btn-sm p-2"
                                              onClick={handleBtnRows}
                                              disabled={
                                                btnRows.length > 9 ? true : false
                                              }
                                            >
                                              Add
                                            </Button>
                                          </div>



                                        </Row>

                                      </Row>
                                      {state?.contacts?.map((item, idx) => {
                                        console.log("checking");
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
                                              handleUndoContact={handleUndoContact}
                                              handleContactReference={
                                                handleContactReference
                                              }
                                              setPrimaryHandler={setPrimaryHandler}
                                              state={state.contacts[idx]}
                                              countDelete={countDelete}
                                              checkHandler={checkHandler}
                                              physicalAddress={physicalAddress[idx]}
                                              postalAddress={postalAddress[idx]}
                                              handleSameAddress={handleSameAddress}
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
                                  </Col>
                                </Row>
                              </Col>
                            </Card>


                            <Card className="custom_card_border_design me-2">
                              <Col md={9}>
                                <Row className="d-flex justify-content-start px-3">

                                  <Col xs={2} sm={3} md={1} lg={1} style={{ textAlign: "center", justifyContent: "center", padding: "0px" }} >
                                    <div style={{ marginTop: "15px", display: "flex", flexDirection: "column", position: "absolute", left: "15px", }}>
                                      <i className="far fa-user-circle ms-1" style={{ fontSize: "30px" }} />

                                      <div className="vr" style={{ width: "3px", height: "70px", position: "absolute", left: "17px", top: "28px", background: "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)" }}>

                                      </div>

                                    </div>
                                  </Col>
                                  <Col xs={10} sm={9} md={11} lg={11}>
                                    <CardBody style={{ paddingLeft: "0px" }}>
                                      <CardTitle tag="h5">
                                        ABN
                                      </CardTitle>
                                      <div className="my-3">
                                        <Row className="d-flex justify-content-evenly align-items-center">

                                          <Col md={12}>
                                            <div className="form-group-new">
                                              <Field
                                                name="abn"
                                                type="text"
                                                value={state?.abn}
                                                className={
                                                  "form-control" +
                                                  (errors.abn && touched.abn
                                                    ? " is-invalid"
                                                    : "")
                                                }
                                                onChange={handlePropertyFormValues}
                                              />
                                              <label htmlFor="usr">ABN</label>
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
                              <Col md={9}>
                                <Row className="d-flex justify-content-start px-3">

                                  <Col xs={2} sm={3} md={1} lg={1} style={{ textAlign: "center", justifyContent: "center", padding: "0px" }} >
                                    <div style={{ marginTop: "15px", display: "flex", flexDirection: "column", position: "absolute", left: "15px", }}>
                                      <i className="far fa-user-circle ms-1" style={{ fontSize: "30px" }} />

                                      <div className="vr" style={{ width: "3px", height: "70px", position: "absolute", left: "17px", top: "28px", background: "linear-gradient(180deg, #153D58 0%, rgba(250, 250, 250, 0.65) 100%)" }}>

                                      </div>

                                    </div>
                                  </Col>
                                  <Col xs={10} sm={9} md={11} lg={11}>
                                    <CardBody style={{ paddingLeft: "0px" }}>
                                      <CardTitle tag="h5">
                                        Notes
                                      </CardTitle>

                                      <div className="my-3">
                                        <Row className="d-flex justify-content-evenly align-items-center">
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
                                                value={state?.notes}
                                                className={
                                                  "form-control" +
                                                  (errors.notes && touched.notes
                                                    ? " is-invalid"
                                                    : "")
                                                }
                                                onChange={handlePropertyFormValues}
                                              />
                                              <label htmlFor="usr">Notes</label>
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

                          {/* <div className="w-100" style={{
                                                        borderBottom:
                                                            "1.2px dotted #c9c7c7",
                                                    }}></div> */}
                          <div>
                            <div className="mt-2 d-flex justify-content-end g-4">
                              <button
                                className="btn btn-buttonCancelColor w-md ms-5"
                                onClick={goBack}
                                type="button"
                              >
                                <i className="fas fa-times me-1"></i>Clear
                              </button>
                              <button
                                className="btn btn-buttonColor w-md ms-2"
                                type="submit"
                              // disabled={
                              //   props.email_validation_check_data?.data
                              //     ?.status == "Warning"
                              //     ? true
                              //     : false
                              // }
                              >
                                <i className="fas fa-file-alt me-1"></i> Save
                              </button>
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
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    contacts_show_data,
    contacts_show_error,
    contacts_show_loading,

    contacts_edit_data,
    contacts_edit_error,
    contacts_edit_loading,
    email_validation_check_data,
  } = gstate.Contacts2;
  return {
    contacts_show_data,
    contacts_show_error,
    contacts_show_loading,

    contacts_edit_data,
    contacts_edit_error,
    contacts_edit_loading,
    email_validation_check_data,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    showContact,
    showContactFresh,
    ContactListFresh,
    editContact,
    emailValidationCheck,
    emailValidationCheckFresh,
  })(ContactEdit)
);
