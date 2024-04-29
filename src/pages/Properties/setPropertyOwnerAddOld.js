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

import {
  addOwner,
  propertyOwnerInfoFresh,
  propertyListFresh,
} from "../../store/Properties/actions";

import {
  showContact,
} from "../../store/Contacts2/actions";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Link, useHistory, withRouter, useParams } from "react-router-dom";
const setPropertyOwnerAdd = props => {
  let { id, propertyId } = useParams(); // Contact ID & Property ID
  // Form Tab State
  const [tabState, setTabState] = useState({
    activeTab: 1,
    passedSteps: [1],
  });
  // ---------
  const history = useHistory();
  // Autocomplete address
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {};

  const inputRefPostal = useRef();
  const autoCompletePostalRef = useRef();
  // ------------------------

  const [formSubmitBtnState, setFormSubmitBtnState] = useState(1); // Form Submit Button State

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
  const [state2, setState2] = useState({ owner_access: 1 }); // Form 2 State

  const [addressState, setAddressState] = useState(true);

  const [show, setShow] = useState(false);
  const [postalAddForm, setPostalAddForm] = useState(false);
  const [physicalAddForm, setPhysicalAddForm] = useState(false);

  const [inspectionEnableBtn, setInspectionEnableBtn] = useState(true);
  const [inspectionDisableBtn, setInspectionDisableBtn] = useState(false);

  // Fees Form State
  const [rows3, setRows3] = useState([1]);
  const [state3, setState3] = useState([
    { selectedValues: {}, fee_template_1: "", income_account_1: "", fee_trigger_1: "", notes_1: "", amount_1: "100.00%" },
  ]);

  const [selectedGroup6, setSelectedGroup6] = useState(null);
  const [optionGroup6, setOptionGroup6] = useState([
    {
      options: [
        { label: "Admin Fee (৳)", value: "Admin Fee (৳)" },
      ],
    },
  ]);

  const [rows4, setRows4] = useState([1]);
  const [state7, setState7] = useState([
    { selectedValues: {}, fee_template_2: "", income_account_2: "", fee_trigger_2: "", notes_2: "", amount_2: "100.00%", amountPlaceholder: '0.00%' },
  ]);

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

  // Payment method Form State
  const [rows5, setRows5] = useState([1]);
  const [state8, setState8] = useState([
    { selectedValues: {}, method: "", payee: "", bsb: "", account: "", split: "100.00", split_type_boolean: false, split_type: '%', splitTypeEnableBtn: true, splitTypeDisableBtn: false },
  ]);

  const [selectedGroup8, setSelectedGroup8] = useState(null);
  const [optionGroup8, setOptionGroup8] = useState([
    {
      options: [
        { label: "None", value: "None" },
        { label: "Cheque", value: "Cheque" },
        { label: "EFT", value: "EFT" },
      ],
    },
  ]);

  const [selectedId8, setSelectedId8] = useState();
  const [tableInfoShow8, setTableInfoShow8] = useState(false);

  // ----------------------------
  const [ownerCom, setOwnerCom] = useState({
    print: false,
    email: false,
    sms: false,
  }); // Form 2 communication field state

  let ownerCommunication = {
    print: false,
    email: false,
    sms: false,
  }; // Form 1 Communication Field State

  useEffect(() => {
    if (props.contacts_show_loading === false) {
      props.showContact(id);
    }
    if (props.property_owner_add_loading === "Success") {
      toastr.success("Owner Added Successfully");
      props.propertyListFresh();
      history.push("/propertyInfo/" + propertyId, {
        id: propertyId,
      });
    }
    if (props.property_owner_add_loading === "Failed") {
      toastr.error("Something went wrong");
    }
    if (props.property_owner_info_loading === "Success") {
      props.propertyOwnerInfoFresh();
    }
    if (props.contacts_show_data && props.contacts_show_data.status !== false) {
      setState({
        ...state,
        contacts_id: props.contacts_show_data.data.id,
        reference: props.contacts_show_data.data.reference,
        first_name: props.contacts_show_data.data.first_name,
        last_name: props.contacts_show_data.data.last_name,
        salutation: props.contacts_show_data.data.salutation,
        company_name: props.contacts_show_data.data.company_name,
        email: props.contacts_show_data.data.email,
        abn: props.contacts_show_data.data.abn,
        notes: props.contacts_show_data.data.notes,

        physical_building_name:
          props.contacts_show_data.contactPhysicalAddress.building_name,
        physical_country:
          props.contacts_show_data.contactPhysicalAddress.country,
        physical_number: props.contacts_show_data.contactPhysicalAddress.number,
        physical_postcode:
          props.contacts_show_data.contactPhysicalAddress.postcode,
        physical_state: props.contacts_show_data.contactPhysicalAddress.state,
        physical_street: props.contacts_show_data.contactPhysicalAddress.street,
        physical_suburb: props.contacts_show_data.contactPhysicalAddress.suburb,
        physical_unit: props.contacts_show_data.contactPhysicalAddress.unit,

        postal_building_name:
          props.contacts_show_data.contactPostalAddress.building_name,
        postal_country: props.contacts_show_data.contactPostalAddress.country,
        postal_number: props.contacts_show_data.contactPostalAddress.number,
        postal_postcode: props.contacts_show_data.contactPostalAddress.postcode,
        postal_state: props.contacts_show_data.contactPostalAddress.state,
        postal_street: props.contacts_show_data.contactPostalAddress.street,
        postal_suburb: props.contacts_show_data.contactPostalAddress.suburb,
        postal_unit: props.contacts_show_data.contactPostalAddress.unit,
      });
      setPhone({
        mobile_phone: props.contacts_show_data.data.mobile_phone,
        work_phone: props.contacts_show_data.data.work_phone,
        home_phone: props.contacts_show_data.data.home_phone,
      });
    }

    if (props.contacts_show_data) {
      props.contacts_show_data.contactCommunication.map(item => {
        if (item.communication === "Print") {
          ownerCommunication = {
            ...ownerCommunication,
            print: true,
          };
        }
        if (item.communication === "Email") {
          ownerCommunication = {
            ...ownerCommunication,
            email: true,
          };
        }
        if (item.communication === "SMS") {
          ownerCommunication = {
            ...ownerCommunication,
            sms: true,
          };
        }
      });
      setOwnerCom({ ...ownerCommunication });
    }
    // Autocomplete address
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log({ place });
      let country = '';
      let statename = '';
      let postal_codeN = ''
      let suburbN = ''
      let streetN = ''
      let street_numberN = ''




      place.address_components.forEach(element => {
        let checkCountry = inArray('country', element.types)

        if (checkCountry == true) {
          country = element.long_name

        }

        let administrative_area_level_1 = inArray('administrative_area_level_1', element.types)
        if (administrative_area_level_1 == true) {
          statename = element.long_name

        }

        let postal_code = inArray('postal_code', element.types)
        if (postal_code == true) {
          postal_codeN = element.long_name

        }


        let suburb = inArray('locality', element.types)
        if (suburb == true) {
          suburbN = element.long_name

        }

        let street = inArray('route', element.types)
        if (street == true) {
          streetN = element.long_name

        }


        let street_number = inArray('street_number', element.types)
        if (street_number == true) {
          street_numberN = element.long_name

        }



      });
      setState({ ...state, physical_country: country, physical_state: statename, physical_postcode: postal_codeN, physical_suburb: suburbN, physical_street: streetN, physical_number: street_numberN });
      setPhysicalAddForm(true);
    });

    autoCompletePostalRef.current = new window.google.maps.places.Autocomplete(
      inputRefPostal.current,
      options
    );
    autoCompletePostalRef.current.addListener("place_changed", async function () {
      const place = await autoCompletePostalRef.current.getPlace();
      console.log({ place });
      let country = '';
      let statename = '';
      let postal_codeN = ''
      let suburbN = ''
      let streetN = ''
      let street_numberN = ''




      place.address_components.forEach(element => {
        let checkCountry = inArray('country', element.types)

        if (checkCountry == true) {
          country = element.long_name

        }

        let administrative_area_level_1 = inArray('administrative_area_level_1', element.types)
        if (administrative_area_level_1 == true) {
          statename = element.long_name

        }

        let postal_code = inArray('postal_code', element.types)
        if (postal_code == true) {
          postal_codeN = element.long_name

        }


        let suburb = inArray('locality', element.types)
        if (suburb == true) {
          suburbN = element.long_name

        }

        let street = inArray('route', element.types)
        if (street == true) {
          streetN = element.long_name

        }


        let street_number = inArray('street_number', element.types)
        if (street_number == true) {
          street_numberN = element.long_name

        }



      });
      setState({ ...state, postal_country: country, postal_state: statename, postal_postcode: postal_codeN, postal_suburb: suburbN, postal_street: streetN, postal_number: street_numberN });
      setPostalAddForm(true);
    });
    //--------------------------------
  }, [
    props.contacts_list_loading,
    props.property_owner_add_loading,
    props.property_owner_info_loading,
    props.contacts_show_loading,
  ]);

  // Autocomplete address
  function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }
  // -----------------

  console.log(props.contacts_show_data);

  const date = new Date();
  const futureDate = date.getDate();
  date.setDate(futureDate);
  const defaultValue = date.toLocaleDateString("en-CA");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePropertyFormValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handlePropertyFormValues2 = e => {
    setState2({ ...state2, [e.target.name]: e.target.value });
  };

  // console.log(state3);

  // console.log(state4);

  const handlePostalAddForm = () => {
    setPostalAddForm(prev => !prev);
  };

  const handlePhysicalAddForm = () => {
    setPhysicalAddForm(prev => !prev);
  };

  const toggleInspectionDisableBtn = () => {
    setState2({ ...state2, owner_access: 0 });
    setInspectionDisableBtn(true);
    setInspectionEnableBtn(false);
  };
  const toggleInspectionEnableBtn = () => {
    setOptionGroupState2({
      ...state2,
      owner_access: 1,
    });
    setInspectionEnableBtn(true);
    setInspectionDisableBtn(false);
  };
  const handleSelectGroup2 = e => {
    //  console.log(e);
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
    console.log(state3);
    console.log(state7);

    toggleTab(tabState.activeTab + 1);
    setFormSubmitBtnState(formSubmitBtnState + 1);

  };
  const handleChangeInput = async (idx, e, type) => {
    const values = [...state3];

    values[idx][type] = e.value;
    values[idx]['selectedValues'] = e;
    values[idx]['income_account_1'] = 'Administration fee (inc. tax)';
    values[idx]['fee_trigger_1'] = 'Each statement period';
    values[idx]['notes_1'] = '';
    await setState3(values);

    setSelectedGroup6(e);
    setSelectedId6(e.value);
    setTableInfoShow3(true);
  };

  console.log(selectedGroup6);
  console.log(state3);
  const handleChangeInput2 = async (idx, e, type) => {
    const values = [...state7];
    // console.log(idx);
    values[idx][type] = e.label;
    values[idx]['selectedValues'] = e;
    if (e.value === "1") {
      values[idx]['income_account_2'] = 'Commercial Management fee (inc. tax)';
      values[idx]['fee_trigger_2'] = 'Rental receipt';
      values[idx]['notes_2'] = '';
      values[idx]['amountPlaceholder'] = '0.00%';
    } else if (e.value === "2") {
      values[idx]['income_account_2'] = 'Letting fee (inc. tax)';
      values[idx]['fee_trigger_2'] = 'First rent receipt';
      values[idx]['notes_2'] = '';
      values[idx]['amountPlaceholder'] = '0.00৳';
    } else if (e.value === "3") {
      values[idx]['income_account_2'] = 'Management fee (inc. tax)';
      values[idx]['fee_trigger_2'] = 'Rental receipt';
      values[idx]['notes_2'] = '';
      values[idx]['amountPlaceholder'] = '0.00%';
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

    if (rows3.length > 1) {
      var rowIndex = [...rows3];
      rowIndex.splice(idx, 1);
      setRows3(rowIndex);

      var rowStateValue = [...state3];
      rowStateValue.splice(idx, 1);
      setState3(rowStateValue);
    }
  };
  const handleRemoveRow7 = (e, idx) => {

    if (rows4.length > 1) {
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
      { selectedValues: {}, fee_template_1: "", income_account_1: "", fee_trigger_1: "", notes_1: "", amount_1: "100.00%" },
    ]);
  };
  const handleAddRow7 = () => {
    const item = {
      name: "",
    };
    setRows4([...rows4, item]);

    setState7([
      ...state7,
      { selectedValues: {}, fee_template_2: "", income_account_2: "", fee_trigger_2: "", notes_2: "", amount_2: "100.00%", amountPlaceholder: "0.00%" },
    ]);
  };
  // ---------------------

  // Payment Method form

  const handleRowResult2 = async e => {
    e.preventDefault();
    console.log('I\'m on payment method submit handler function');
    console.log(state8);
    props.addOwner(state, propertyId, state2, phone, state3, state7, state8, id);
    props.propertyOwnerInfoFresh();
  };

  // -----------------------------

  // Payment method handler
  const handleChangeInput3 = async (idx, e, type) => {
    const values = [...state8];
    values[idx][type] = e.value;
    values[idx]['selectedValues'] = e;
    if (e.value === "None") {
      values[idx]['payee'] = '';
      values[idx]['bsb'] = '';
      values[idx]['account'] = '';
    } else if (e.value === "Cheque") {
      values[idx]['payee'] = '1';
      values[idx]['bsb'] = '';
      values[idx]['account'] = '';
    } else if (e.value === "EFT") {
      values[idx]['payee'] = '1';
      values[idx]['bsb'] = '1';
      values[idx]['account'] = '1';
    }
    await setState8(values);

    setSelectedGroup8(e);
    setSelectedId8(e.value);
    setTableInfoShow8(true);
  };

  const handlePropertyFormValues8 = (idx, e) => {
    let data = [...state8];
    data[idx][e.target.name] = e.target.value;
    setState8(data);
  };

  const handleRemoveRow8 = (e, idx) => {
    if (rows5.length > 1) {
      var rowIndex = [...rows5];
      rowIndex.splice(idx, 1);
      setRows5(rowIndex);

      var rowStateValue = [...state8];
      rowStateValue.splice(idx, 1);
      setState8(rowStateValue);
    }
  };

  const handleAddRow8 = () => {
    const item = {
      name: "",
    };
    setRows5([...rows5, item]);
    const values = [...state8];
    values[rows5.length - 1]['split_type_boolean'] = true;

    setState8([
      ...values,
      { selectedValues: {}, method: "", payee: "", bsb: "", account: "", split: "100.00", split_type_boolean: false, split_type: '%', splitTypeEnableBtn: true, splitTypeDisableBtn: false },
    ]);
  };

  const toggleDollorBtn = (idx) => {
    let data = [...state8];
    data[idx]['split_type'] = '৳';
    data[idx]['split'] = '';
    data[idx]['splitTypeEnableBtn'] = false;
    data[idx]['splitTypeDisableBtn'] = true;
    setState8(data);
  }
  const togglePercentBtn = (idx) => {
    let data = [...state8];
    data[idx]['split_type'] = '%';
    data[idx]['split'] = '';
    data[idx]['splitTypeEnableBtn'] = true;
    data[idx]['splitTypeDisableBtn'] = false;
    setState8(data);
  }
  // -----------------------------

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
  const ownerComHandler = e => {
    if (e.target.value === "SMS") {
      setOwnerCom({
        ...ownerCom,
        sms: !ownerCom.sms,
      });
    }
    if (e.target.value === "Email") {
      setOwnerCom({
        ...ownerCom,
        email: !ownerCom.email,
      });
    }
    if (e.target.value === "Print") {
      setOwnerCom({
        ...ownerCom,
        print: !ownerCom.print,
      });
    }
  };
  const checkAddressHandler = () => {
    if (addressState) {
      setState({
        ...state,
        physical_building_name: state.postal_building_name,
        physical_country: state.postal_country,
        physical_number: state.postal_number,
        physical_postcode: state.postal_postcode,
        physical_state: state.postal_state,
        physical_street: state.postal_street,
        physical_suburb: state.postal_suburb,
        physical_unit: state.postal_unit,
      });
      setPhysicalAddForm(true);
    } else {
      setState({
        ...state,
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

  return (
    <div className="page-content">

      <h4 className="mb-3 text-primary">Assign owner</h4>

      <div className="wizard clearfix">
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
                  setFormSubmitBtnState(3)
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
                  setFormSubmitBtnState(4)
                }}
              >
                <span className="number">4.</span> Payment Methods
              </NavLink>
            </NavItem>
          </ul>
        </div>
        <div className="content clearfix">
          <TabContent activeTab={tabState.activeTab} className="body">
            <TabPane tabId={1}>
              <Row>
                <Col sm="12">
                  <div className="d-flex flex-column justify-content-start">
                    <div className="py-2 ps-3">
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
                              // mobile_phone: (state && state.mobile_phone) || "",
                              // work_phone: (state && state.work_phone) || "",
                              // home_phone: (state && state.home_phone) || "",
                              email: (state && state.email) || "",

                              postal_building_name:
                                (state && state.postal_building_name) || "",
                              postal_unit: (state && state.postal_unit) || "",
                              postal_number:
                                (state && state.postal_number) || "",
                              postal_street:
                                (state && state.postal_street) || "",
                              postal_suburb:
                                (state && state.postal_suburb) || "",
                              postal_postcode:
                                (state && state.postal_postcode) || "",
                              postal_state: (state && state.postal_state) || "",
                              postal_country:
                                (state && state.postal_country) || "",

                              physical_building_name:
                                (state && state.physical_building_name) || "",
                              physical_unit:
                                (state && state.physical_unit) || "",
                              physical_number:
                                (state && state.physical_number) || "",
                              physical_street:
                                (state && state.physical_street) || "",
                              physical_suburb:
                                (state && state.physical_suburb) || "",
                              physical_postcode:
                                (state && state.physical_postcode) || "",
                              physical_state:
                                (state && state.physical_state) || "",
                              physical_country:
                                (state && state.physical_country) || "",

                              abn: (state && state.abn) || "",

                              notes: (state && state.notes) || "",
                              communication:
                                (state && state.communication) || [],
                            }}
                            // validationSchema={Yup.object().shape({
                            //   reference: Yup.string().required(
                            //     "Please Enter Reference"
                            //   ),
                            //   first_name: Yup.string().required(
                            //     "Please Enter First name"
                            //   ),
                            //   last_name: Yup.string().required(
                            //     "Please Enter Last name"
                            //   ),
                            //   salutation: Yup.string().required(
                            //     "Please Enter Reference"
                            //   ),
                            //   company_name: Yup.string().required(
                            //     "Please Enter Salutation"
                            //   ),
                            //   // mobile_phone: Yup.string().required(
                            //   //   "Please Enter Mobile phone"
                            //   // ),
                            //   // work_phone: Yup.string().required(
                            //   //   "Please Enter Reference"
                            //   // ),
                            //   // home_phone: Yup.string().required(
                            //   //   "Please Enter Work phone"
                            //   // ),
                            //   email:
                            //     Yup.string().required("Please Enter Email"),

                            //   postal_building_name: Yup.string().required(
                            //     "Please Enter Building name"
                            //   ),
                            //   postal_unit:
                            //     Yup.string().required("Please Enter Unit"),
                            //   postal_number: Yup.string().required(
                            //     "Please Enter Number"
                            //   ),
                            //   postal_street: Yup.string().required(
                            //     "Please Enter Street"
                            //   ),
                            //   postal_suburb: Yup.string().required(
                            //     "Please Enter Suburb"
                            //   ),
                            //   postal_postcode: Yup.string().required(
                            //     "Please Enter Postcode"
                            //   ),
                            //   postal_state:
                            //     Yup.string().required("Please Enter State"),
                            //   postal_country:
                            //     Yup.string().required("Please Enter State"),

                            //   physical_building_name: Yup.string().required(
                            //     "Please Enter Building name"
                            //   ),
                            //   physical_unit:
                            //     Yup.string().required("Please Enter Unit"),
                            //   physical_number: Yup.string().required(
                            //     "Please Enter Number"
                            //   ),
                            //   physical_street: Yup.string().required(
                            //     "Please Enter Street"
                            //   ),
                            //   physical_suburb: Yup.string().required(
                            //     "Please Enter Suburb"
                            //   ),
                            //   physical_postcode: Yup.string().required(
                            //     "Please Enter Postcode"
                            //   ),
                            //   physical_state:
                            //     Yup.string().required("Please Enter State"),
                            //   physical_country: Yup.string().required(
                            //     "Please Enter Country"
                            //   ),

                            //   // communication: Yup.string().required(
                            //   //   "Please Enter Communication"
                            //   // ),
                            //   abn: Yup.string().required("Please Enter ABN"),
                            //   notes:
                            //     Yup.string().required("Please Enter Notes"),
                            // })}
                            onSubmit={(values, onSubmitProps) => {
                              setState(values);
                              console.log(values);
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
                                          <div className="w-75 d-flex justify-content-between align-items-center pb-1" style={{
                                            borderBottom:
                                              "1.2px dotted #c9c7c7",
                                          }}>

                                            <div>
                                              <h4 className="text-primary mb-3">

                                                Owner Contact

                                              </h4>
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
                                            <div className="w-75 mt-2 mb-2" style={{
                                              borderBottom:
                                                "1.2px dotted #c9c7c7",
                                            }}></div>
                                          </h4>

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
                                                  onChange={
                                                    handlePropertyFormValues
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
                                                  onChange={
                                                    handlePropertyFormValues
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
                                                  onChange={
                                                    handlePropertyFormValues
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
                                                <PhoneInput
                                                  country={"au"}
                                                  value={state.mobile_phone}
                                                  onChange={value =>
                                                    setPhone({
                                                      ...phone,
                                                      mobile_phone: value,
                                                    })
                                                  }
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
                                                <PhoneInput
                                                  country={"au"}
                                                  value={state.work_phone}
                                                  onChange={value =>
                                                    setPhone({
                                                      ...phone,
                                                      work_phone: value,
                                                    })
                                                  }
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
                                                <PhoneInput
                                                  country={"au"}
                                                  value={state.home_phone}
                                                  onChange={value =>
                                                    setPhone({
                                                      ...phone,
                                                      home_phone: value,
                                                    })
                                                  }
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
                                                    (errors.email && touched.email
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
                                                <div className="d-flex">
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
                                                    ref={inputRefPostal}
                                                    value={
                                                      state.postal_building_name &&
                                                        state.postal_unit &&
                                                        state.postal_number &&
                                                        state.postal_street &&
                                                        state.postal_suburb &&
                                                        state.postal_state &&
                                                        state.postal_postcode &&
                                                        state.postal_country
                                                        ? state.postal_building_name +
                                                        "," +
                                                        state.postal_unit +
                                                        "," +
                                                        state.postal_number +
                                                        "," +
                                                        state.postal_street +
                                                        "," +
                                                        state.postal_suburb +
                                                        "," +
                                                        state.postal_state +
                                                        "," +
                                                        state.postal_postcode +
                                                        "," +
                                                        state.postal_country
                                                        : ""
                                                    }
                                                  />
                                                  {!postalAddForm ? (
                                                    <Button
                                                      color="info"
                                                      onClick={handlePostalAddForm}
                                                      className="d-flex justify-content-evenly align-items-center"
                                                    >
                                                      Details{" "}
                                                      <i className="fa fa-solid fa-caret-down" />
                                                    </Button>
                                                  ) : (
                                                    <Button
                                                      color="info"
                                                      onClick={handlePostalAddForm}
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
                                                            state.postal_building_name
                                                          }
                                                          onChange={
                                                            handlePropertyFormValues
                                                          }
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
                                                          value={state.postal_unit}
                                                          onChange={
                                                            handlePropertyFormValues
                                                          }
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
                                                            state.postal_number
                                                          }
                                                          onChange={
                                                            handlePropertyFormValues
                                                          }
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
                                                            state.postal_street
                                                          }
                                                          onChange={
                                                            handlePropertyFormValues
                                                          }
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
                                                            state.postal_suburb
                                                          }
                                                          onChange={
                                                            handlePropertyFormValues
                                                          }
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
                                                            state.postal_postcode
                                                          }
                                                          onChange={
                                                            handlePropertyFormValues
                                                          }
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
                                                          value={state.postal_state}
                                                          onChange={
                                                            handlePropertyFormValues
                                                          }
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
                                                            state.postal_country
                                                          }
                                                          onChange={
                                                            handlePropertyFormValues
                                                          }
                                                        />
                                                      </Col>
                                                      <ErrorMessage
                                                        name="postal_country"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      />
                                                    </Row>
                                                    <Row>
                                                      <Col md={6} className="mt-3">
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
                                                <div className="d-flex">
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
                                                    ref={inputRef}
                                                    value={
                                                      state.physical_building_name &&
                                                        state.physical_unit &&
                                                        state.physical_number &&
                                                        state.physical_street &&
                                                        state.physical_suburb &&
                                                        state.physical_state &&
                                                        state.physical_postcode &&
                                                        state.physical_country
                                                        ? state.physical_building_name +
                                                        "," +
                                                        state.physical_unit +
                                                        "," +
                                                        state.physical_number +
                                                        "," +
                                                        state.physical_street +
                                                        "," +
                                                        state.physical_suburb +
                                                        "," +
                                                        state.physical_state +
                                                        "," +
                                                        state.physical_postcode +
                                                        "," +
                                                        state.physical_country
                                                        : ""
                                                    }
                                                  />
                                                  {!physicalAddForm ? (
                                                    <Button
                                                      color="info"
                                                      onClick={
                                                        handlePhysicalAddForm
                                                      }
                                                      className="d-flex justify-content-evenly align-items-center"
                                                    >
                                                      Details{" "}
                                                      <i className="fa fa-solid fa-caret-down" />
                                                    </Button>
                                                  ) : (
                                                    <Button
                                                      color="info"
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
                                                            state.physical_building_name
                                                          }
                                                          onChange={
                                                            handlePropertyFormValues
                                                          }
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
                                                            state.physical_unit
                                                          }
                                                          onChange={
                                                            handlePropertyFormValues
                                                          }
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
                                                            state.physical_number
                                                          }
                                                          onChange={
                                                            handlePropertyFormValues
                                                          }
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
                                                            state.physical_street
                                                          }
                                                          onChange={
                                                            handlePropertyFormValues
                                                          }
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
                                                            state.physical_suburb
                                                          }
                                                          onChange={
                                                            handlePropertyFormValues
                                                          }
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
                                                            state.physical_postcode
                                                          }
                                                          onChange={
                                                            handlePropertyFormValues
                                                          }
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
                                                            state.physical_state
                                                          }
                                                          onChange={
                                                            handlePropertyFormValues
                                                          }
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
                                                            state.physical_country
                                                          }
                                                          onChange={
                                                            handlePropertyFormValues
                                                          }
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
                                                    Print statements and notices for
                                                    this person
                                                  </Label>
                                                  <Field
                                                    name="communication"
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    value="Print"
                                                    id="defaultCheck1"
                                                    checked={
                                                      ownerCom.print !== false
                                                        ? ownerCom.print
                                                        : null
                                                    }
                                                    onClick={ownerComHandler}
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
                                                    checked={
                                                      ownerCom.email !== false
                                                        ? ownerCom.email
                                                        : null
                                                    }
                                                    onClick={ownerComHandler}
                                                  />
                                                </div>
                                                <div className="form-check mb-3">
                                                  <Label
                                                    for="defaultCheck3"
                                                    className="form-check-label"
                                                  >
                                                    Send SMS communications to this
                                                    person
                                                  </Label>
                                                  <Field
                                                    name="communication"
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    value="SMS"
                                                    id="defaultCheck3"
                                                    checked={
                                                      ownerCom.sms !== false
                                                        ? ownerCom.sms
                                                        : null
                                                    }
                                                    onClick={ownerComHandler}
                                                  />
                                                </div>
                                                <Button color="danger">
                                                  Delete Person
                                                </Button>
                                              </Col>
                                            </Row>
                                          </div>
                                        </CardBody>
                                      </Card>

                                      <Card>
                                        <CardBody>
                                          <h4 className="text-primary mb-3">
                                            Commercial
                                            <div className="w-75 mt-2 mb-2" style={{
                                              borderBottom:
                                                "1.2px dotted #c9c7c7",
                                            }}></div>
                                          </h4>
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
                                            <div className="w-75 mt-2 mb-2" style={{
                                              borderBottom:
                                                "1.2px dotted #c9c7c7",
                                            }}></div>
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
                                                  value={state.notes}
                                                  className={
                                                    "form-control" +
                                                    (errors.notes && touched.notes
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
                                    {/* <div className="w-75 mt-2 mb-2" style={{
                                      borderBottom:
                                        "1.2px dotted #c9c7c7",
                                    }}></div> */}
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
                        <div className="py-2 ps-3">
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
                                  total_money:
                                    (state2 && state2.total_money) || "",
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
                                  owner_access:
                                    (state2 && state2.owner_access) || "",
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
                                  setState2(values);
                                  console.log(values);
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
                                        <div className="">



                                          <Card>
                                            <CardBody>
                                              <div className="w-75">
                                                <h4 className="text-primary mb-2">

                                                  Disburse

                                                </h4>
                                                <div className="w-100" style={{
                                                  borderBottom:
                                                    "1.2px dotted #c9c7c7",
                                                }} />
                                                <div className="d-flex justify-content-center align-items-center my-3">
                                                  <p className="text-muted">
                                                    A new folio will be created
                                                    for this property
                                                  </p>
                                                </div>
                                                <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                  <Col md={4}>
                                                    <Label
                                                      for="building"
                                                      className="form-label"
                                                    >
                                                      When should this folio be
                                                      disbursed?
                                                    </Label>
                                                  </Col>

                                                  <Col md={8}>
                                                    <Row className="d-flex mb-2">
                                                      <Col md={5}>
                                                        <p>
                                                          {" "}
                                                          When total money in is
                                                        </p>
                                                      </Col>
                                                      <Col md={3}>
                                                        {" "}
                                                        <Field
                                                          name="total_money"
                                                          type="number"
                                                          placeholder="0.00৳"
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
                                                          onChange={
                                                            handlePropertyFormValues2
                                                          }
                                                        />
                                                        <ErrorMessage
                                                          name="total_money"
                                                          component="div"
                                                          className="invalid-feedback"
                                                        />
                                                      </Col>
                                                      <Col md={3}>
                                                        <p>or more</p>
                                                      </Col>
                                                    </Row>
                                                    <Row className="d-flex mb-2">
                                                      <Col md={5}>
                                                        <p> When balance is</p>
                                                      </Col>
                                                      <Col md={3}>
                                                        {" "}
                                                        <Field
                                                          name="balance"
                                                          type="number"
                                                          placeholder="0.00৳"
                                                          className={
                                                            "form-control" +
                                                            (errors.balance &&
                                                              touched.balance
                                                              ? " is-invalid"
                                                              : "")
                                                          }
                                                          value={state2.balance}
                                                          onChange={
                                                            handlePropertyFormValues2
                                                          }
                                                        />
                                                        <ErrorMessage
                                                          name="balance"
                                                          component="div"
                                                          className="invalid-feedback"
                                                        />
                                                      </Col>
                                                      <Col md={3}>
                                                        <p>or more</p>
                                                      </Col>
                                                    </Row>
                                                    <Row className="d-flex">
                                                      <Col className="d-flex">
                                                        <i className="fa fa-solid fa-check text-success" />
                                                        <p>
                                                          {" "}
                                                          At regular intervals
                                                        </p>
                                                      </Col>
                                                      <Col>
                                                        <div className="mb-3">
                                                          <Select
                                                            value={selectedGroup2}
                                                            onChange={
                                                              handleSelectGroup2
                                                            }
                                                            options={optionGroup2}
                                                            classNamePrefix="select2-selection"

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
                                                      <Col>
                                                        <p>Next disburse date</p>
                                                      </Col>
                                                      <Col>
                                                        <div className="mb-3 row">
                                                          <div className="col-md-10">
                                                            <Field
                                                              name="next_disburse_date"
                                                              type="date"
                                                              className={
                                                                "form-control" +
                                                                (errors.next_disburse_date &&
                                                                  touched.next_disburse_date
                                                                  ? " is-invalid"
                                                                  : "")
                                                              }
                                                              value={
                                                                state2.next_disburse_date
                                                              }
                                                              onChange={
                                                                handlePropertyFormValues2
                                                              }
                                                            />
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
                                              </div>
                                            </CardBody>
                                          </Card>

                                          <Card>
                                            <CardBody>
                                              <div className="w-75">
                                                <h4 className="text-primary mb-2">

                                                  Withhold

                                                </h4>
                                                <div className="w-100" style={{
                                                  borderBottom:
                                                    "1.2px dotted #c9c7c7",
                                                }} />
                                                <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                  <Col md={4}>
                                                    <Label
                                                      for="building"
                                                      className="form-label"
                                                    >
                                                      Withhold amount
                                                    </Label>
                                                  </Col>

                                                  <Col md={8}>
                                                    <Row className="d-flex">
                                                      <Col>
                                                        {" "}
                                                        <Field
                                                          name="withhold_amount"
                                                          type="number"
                                                          placeholder="0.00৳"
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
                                                          onChange={
                                                            handlePropertyFormValues2
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
                                                      At the time of disbursement,
                                                      this amount will be
                                                      discounted from the funds
                                                      disbursed to the owner and
                                                      withheld. If there is less
                                                      than this amount available
                                                      to be disbursed no funds
                                                      will be disbursed and the
                                                      amount will stay in the
                                                      owner folio.
                                                    </p>
                                                  </Col>
                                                </Row>
                                                <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                  <Col md={4}>
                                                    <Label
                                                      for="building"
                                                      className="form-label"
                                                    >
                                                      Withhold reason
                                                    </Label>
                                                  </Col>

                                                  <Col md={8}>
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
                                              <div className="w-75">
                                                <h4 className="text-primary mb-2">

                                                  Agreement

                                                </h4>
                                                <div className="w-100" style={{
                                                  borderBottom:
                                                    "1.2px dotted #c9c7c7",
                                                }} />

                                                <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                  <Col md={4}>
                                                    <Label
                                                      for="building"
                                                      className="form-label"
                                                    >
                                                      Agreement start
                                                    </Label>
                                                  </Col>

                                                  <Col md={8}>
                                                    <Row className="d-flex">
                                                      <Col>
                                                        <div className="mb-3 row">
                                                          <div className="col-md-10">
                                                            <Field
                                                              name="agreement_start"
                                                              type="date"
                                                              className={
                                                                "form-control" +
                                                                (errors.agreement_start &&
                                                                  touched.agreement_start
                                                                  ? " is-invalid"
                                                                  : "")
                                                              }
                                                              value={
                                                                state2.agreement_start
                                                              }
                                                              onChange={
                                                                handlePropertyFormValues2
                                                              }
                                                            />
                                                            <ErrorMessage
                                                              name="agreement_start"
                                                              component="div"
                                                              className="invalid-feedback"
                                                            />
                                                          </div>
                                                        </div>
                                                      </Col>
                                                      <Col></Col>
                                                      <Col></Col>
                                                    </Row>
                                                  </Col>
                                                </Row>
                                                <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                  <Col md={4}>
                                                    <Label
                                                      for="building"
                                                      className="form-label"
                                                    >
                                                      Gained reason
                                                    </Label>
                                                  </Col>

                                                  <Col md={8}>
                                                    <Row className="d-flex">
                                                      <Col>
                                                        <div>
                                                          <div className="mb-3 select2-container">
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
                                                  <Col md={4}>
                                                    <Label
                                                      for="building"
                                                      className="form-label"
                                                    >
                                                      Comment (gained)
                                                    </Label>
                                                  </Col>

                                                  <Col md={8}>
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
                                                          value={state2.comment}
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
                                                <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                  <Col md={4}>
                                                    <Label
                                                      for="building"
                                                      className="form-label"
                                                    >
                                                      Agreement ends
                                                    </Label>
                                                  </Col>

                                                  <Col md={8}>
                                                    <Row className="d-flex">
                                                      <Col>
                                                        <div className="mb-3 row">
                                                          <div className="col-md-10">
                                                            <Field
                                                              name="agreement_end"
                                                              type="date"
                                                              className={
                                                                "form-control" +
                                                                (errors.agreement_end &&
                                                                  touched.agreement_end
                                                                  ? " is-invalid"
                                                                  : "")
                                                              }
                                                              value={
                                                                state2.agreement_end
                                                              }
                                                              onChange={
                                                                handlePropertyFormValues2
                                                              }
                                                            />
                                                            <ErrorMessage
                                                              name="agreement_end"
                                                              component="div"
                                                              className="invalid-feedback"
                                                            />
                                                          </div>
                                                        </div>
                                                      </Col>
                                                      <Col></Col>
                                                      <Col></Col>
                                                    </Row>
                                                  </Col>
                                                </Row>
                                              </div>
                                            </CardBody>
                                          </Card>

                                          <Card>
                                            <CardBody>
                                              <div>
                                                <h4 className="text-primary mb-2">

                                                  Client Access

                                                </h4>
                                                <div className="w-100" style={{
                                                  borderBottom:
                                                    "1.2px dotted #c9c7c7",
                                                }} />
                                                <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                  <Col md={4}>
                                                    <Label
                                                      for="building"
                                                      className="form-label"
                                                    >
                                                      Owner Access
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
                                                              <span> Enable</span>
                                                            </Button>
                                                          </div>
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
                                                        </div>
                                                      </Col>
                                                      <Col></Col>
                                                    </Row>
                                                  </Col>
                                                </Row>
                                              </div>
                                            </CardBody>
                                          </Card>


                                        </div>
                                      </div>
                                      {/* <div className="w-100" style={{
                                        borderBottom:
                                          "1.2px dotted #c9c7c7",
                                      }} /> */}
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
              <Row className="">
                <Col xs="12">
                  <div>
                    <div>
                      <form
                        className="repeater mt-3"
                        id="owner-form-3"
                        encType="multipart/form-data"
                        onSubmit={handleRowResult}
                      >
                        <table style={{ width: "100%" }}>
                          <tbody>
                            <Card>
                              <CardBody>
                                <CardTitle className="text-primary mb-4">
                                  Folio -
                                </CardTitle>
                                {rows3.map((item, idx) => (
                                  <Row id={"addr" + idx} key={idx}>
                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="name">
                                        Fee template
                                      </label>
                                      <div>
                                        <div className="mb-3 select2-container">
                                          <Select
                                            value={state3[idx]['selectedValues']}
                                            onChange={e =>
                                              handleChangeInput(
                                                idx,
                                                e,
                                                "fee_template_1"
                                              )
                                            }
                                            options={optionGroup6}
                                            classNamePrefix="select2-selection"
                                          />
                                        </div>
                                      </div>
                                    </Col>

                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="income_account_1">
                                        Income account
                                      </label>

                                      <p>
                                        {state3[idx]['income_account_1']}
                                      </p>
                                    </Col>

                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="fee_trigger_1">
                                        Fee trigger
                                      </label>

                                      <p>
                                        {state3[idx]['fee_trigger_1']}
                                      </p>
                                    </Col>

                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="notes_1">
                                        Notes
                                      </label>

                                      <p>{state3[idx]['notes_1']}</p>
                                    </Col>

                                    <Col
                                      lg="2"
                                      className="mb-3 d-flex flex-column align-items-center"
                                    >
                                      <label htmlFor="amount_1">
                                        Amount
                                      </label>

                                      <Row className="d-flex flex-column">
                                        <Col>
                                          <input
                                            name="amount_1"
                                            type="text"
                                            className={
                                              "form-control"
                                            }
                                            onChange={e =>
                                              handlePropertyFormValues4(
                                                idx,
                                                e
                                              )
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
                                          handleRemoveRow(e, idx)
                                        }
                                        color="danger"
                                        className="mt-3"
                                        style={{
                                          width: "70%",
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    </Col>
                                  </Row>

                                ))}

                                <div className="d-flex justify-content-end">
                                  {" "}
                                  <Button
                                    onClick={handleAddRow}
                                    color="info"
                                    className="mt-3 mt-lg-0"
                                  >
                                    Add{" "}
                                  </Button>{" "}
                                </div>
                              </CardBody>
                            </Card>
                            <Card>
                              <CardBody>
                                <CardTitle className="text-primary mb-4">
                                  Folio -
                                </CardTitle>
                                {rows4.map((item, idx) => (
                                  <Row id={"addr" + idx} key={idx}>
                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="fee_template_2">
                                        Fee template
                                      </label>
                                      <div>
                                        <div className="mb-3 select2-container">
                                          <Select
                                            value={state7[idx]['selectedValues']}
                                            onChange={e =>
                                              handleChangeInput2(
                                                idx,
                                                e,
                                                "fee_template_2"
                                              )
                                            }
                                            options={optionGroup7}
                                            classNamePrefix="select2-selection"
                                            name="fee_template_2"
                                          />
                                        </div>
                                      </div>
                                    </Col>

                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="income_account_2">
                                        Income account
                                      </label>

                                      <p>{state7[idx]['income_account_2']}</p>
                                    </Col>

                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="fee_trigger_2">
                                        Fee trigger
                                      </label>

                                      <p>{state7[idx]['fee_trigger_2']}</p>
                                    </Col>

                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="note_2">
                                        Notes
                                      </label>
                                      <p>{state7[idx]['note_2']}</p>
                                    </Col>

                                    <Col
                                      lg="2"
                                      className="mb-3 d-flex flex-column align-items-center"
                                    >
                                      <label htmlFor="amount_2">
                                        Amount
                                      </label>

                                      <Row className="d-flex flex-column">
                                        <Col>
                                          <input
                                            name="amount_2"
                                            type="text"
                                            placeholder={state7[idx]['amountPlaceholder']}
                                            className={
                                              "form-control"
                                            }
                                            onChange={e =>
                                              handlePropertyFormValues7(
                                                idx,
                                                e
                                              )
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
                                          handleRemoveRow7(e, idx)
                                        }
                                        color="danger"
                                        className="mt-3"
                                        style={{
                                          width: "70%",
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    </Col>
                                  </Row>
                                ))}

                                <div className="d-flex justify-content-end">
                                  {" "}
                                  <Button
                                    onClick={handleAddRow7}
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
            <TabPane tabId={4}>
              <Row className="">
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
                            <Card>
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
                                            value={state8[idx]['selectedValues']}
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

                                      {
                                        state8[idx]['payee'] !== '' ?
                                          <input
                                            name="payee"
                                            type="text"
                                            className={
                                              "form-control"
                                            }
                                            onChange={e =>
                                              handlePropertyFormValues8(
                                                idx,
                                                e
                                              )
                                            }
                                          /> : null
                                      }
                                    </Col>

                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="bsb">
                                        BSB
                                      </label>
                                      {
                                        state8[idx]['bsb'] !== '' ?
                                          <input
                                            name="bsb"
                                            type="text"
                                            className={
                                              "form-control"
                                            }
                                            onChange={e =>
                                              handlePropertyFormValues8(
                                                idx,
                                                e
                                              )
                                            }
                                          /> : null
                                      }
                                    </Col>

                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="account">
                                        Account #
                                      </label>

                                      {
                                        state8[idx]['account'] !== '' ?
                                          <input
                                            name="bsb"
                                            type="text"
                                            className={
                                              "form-control"
                                            }
                                            onChange={e =>
                                              handlePropertyFormValues8(
                                                idx,
                                                e
                                              )
                                            }
                                          /> : null
                                      }
                                    </Col>

                                    <Col
                                      lg="2"
                                      className="mb-3 d-flex flex-column align-items-center"
                                    >
                                      <label htmlFor="split">
                                        Split
                                      </label>

                                      <Row className="d-flex flex-column">
                                        <Col>
                                          <div className="btn-group btn-group-justified">
                                            {state8[idx]['split_type_boolean'] === true ?
                                              <>
                                                <div className="btn-group">
                                                  <Button
                                                    className="d-flex align-items-center"
                                                    color={
                                                      state8[idx]['splitTypeDisableBtn']
                                                        ? "secondary"
                                                        : "light"
                                                    }
                                                    onClick={() => toggleDollorBtn(idx)}
                                                  >
                                                    <span> ৳</span>
                                                  </Button>
                                                </div>
                                                <div className="btn-group">
                                                  <Button
                                                    className="d-flex align-items-center"
                                                    color={
                                                      state8[idx]['splitTypeEnableBtn']
                                                        ? "secondary"
                                                        : "light"
                                                    }
                                                    onClick={() => togglePercentBtn(idx)}
                                                  >
                                                    <span> %</span>
                                                  </Button>
                                                </div>
                                              </>
                                              : null
                                            }
                                            <input
                                              name="split"
                                              type="text"
                                              className={
                                                "form-control"
                                              }
                                              value={state8[idx]['split']}
                                              placeholder="0.00"
                                              onChange={e =>
                                                handlePropertyFormValues8(
                                                  idx,
                                                  e
                                                )
                                              }
                                              disabled={!state8[idx]['split_type_boolean']}
                                            />
                                          </div>

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
                                        className="mt-3"
                                        style={{
                                          width: "70%",
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    </Col>
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
            <li className={tabState.activeTab === 4 ? "next disabled" : "next"}>
              <button
                type="submit"
                form={"owner-form-" + formSubmitBtnState}
                className="btn btn-info"
              >
                Save & Next
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
    contacts_show_data,
    contacts_show_error,
    contacts_show_loading,

  } = gstate.Contacts2;
  const { property_owner_add_loading, property_owner_info_loading } =
    gstate.property;
  return {
    contacts_show_data,
    contacts_show_error,
    contacts_show_loading,

    property_owner_add_loading,
    property_owner_info_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addOwner,
    propertyOwnerInfoFresh,
    showContact,
    propertyListFresh,
  })(setPropertyOwnerAdd)
);
