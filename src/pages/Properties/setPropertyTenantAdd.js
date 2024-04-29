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
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as Yup from "yup";
import toastr from "toastr";
import Select from "react-select";
import moment from 'moment';


import classnames from "classnames";
import {
  Link,
  withRouter,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import { addPropertyTanent, propertyListFresh } from "../../store/Properties/actions";
import { propertyTenantInfoFresh } from "../../store/Properties/tenantActions";
import { showContact, contactList } from "../../store/Contacts2/actions";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const setPropertyTenantAdd = props => {
  // Form Tab State
  const [tabState, setTabState] = useState({
    activeTab: 1,
    passedSteps: [1],
  });
  // ---------

  let { id, propertyId } = useParams(); // Property ID
  const history = useHistory();
  const location = useLocation();
  // Autocomplete address
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {};

  const inputRefPostal = useRef();
  const autoCompletePostalRef = useRef();
  // ------------------------

  const [addressState, setAddressState] = useState(true);

  const [postalAddressState, setPostalAddressState] = useState({});
  // console.log(postalAddressState);
  const [physicalAddressState, setPhysicalAddressState] = useState({});
  // console.log(physicalAddressState);

  const handlePostalAddressState = e => {
    setPostalAddressState({ ...postalAddressState, [e.target.name]: e.target.value });
  }
  const handlePhysicalAddressState = e => {
    setPhysicalAddressState({ ...physicalAddressState, [e.target.name]: e.target.value });
  }


  const [state, setState] = useState({}); // Form 1 State

  const date = moment().format("yyyy-MM-DD");
  var substractDay = moment().subtract(1, "days").format("yyyy-MM-DD");

  const [state2, setState2] = useState({
    move_in: date, agreement_start: date, paid_to: substractDay,
  }); // Form 2 State

  const [perDayRent, setPerDayRent] = useState(0);
  const [weeklyRent, setWeeklyRent] = useState();
  const [fortNightlyRent, setFortNightlyRent] = useState();
  const [monthlyRent, setMonthlyRent] = useState();

  // console.log(state2);
  const [phone, setPhone] = useState({
    mobile_phone: null,
    work_phone: null,
    home_phone: null,
  });
  const [tenantCom, setTenantCom] = useState({
    print: false,
    email: false,
    sms: false,
  }); // Form 2 communication field state

  let tenantCommunication = {
    print: false,
    email: false,
    sms: false,
  }; // Form 1 Communication Field State

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

  const [formSubmitBtnState, setFormSubmitBtnState] = useState(1); // Form Submit Button State

  // Handle Inner form values and set form value state

  let contactEditCommunication = {
    printCheck: false,
    emailCheck: false,
    smsCheck: false,
  };

  let com = [];
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
    })
    let val = [...checkState];
    val.push(value);
    setCheckState(val);
  }

  const checkFalseHandler = (boolean, value) => {
    setForCheck({
      ...forCheck,
      [boolean]: false,
    })
    let val = [...checkState];
    val = val.filter(item => item !== value);
    setCheckState(val);
  }

  const mobilePhoneHandler = (e) => {
    setPhone({
      ...phone,
      mobile_phone: e,
    })
    if (e === '') {
      if (forCheck.smsCheck === false) {
        return;
      } else {
        checkFalseHandler('smsCheck', 'SMS');
      }
    } else {
      if (forCheck.smsCheck === true) {
        return;
      } else {
        checkTrueHandler('smsCheck', 'SMS');
      }
    }
  }

  const emailHandler = (e) => {
    setState({
      ...state,
      email: e.target.value
    });
    if (e.target.value === '') {
      if (forCheck.emailCheck === false) {
        return;
      } else {
        checkFalseHandler('emailCheck', 'Email');
      }
    } else {
      if (forCheck.emailCheck === true) {
        return;
      } else {
        checkTrueHandler('emailCheck', 'Email');
      }
    }
  }

  const communicationHandler = (e) => {
    let val = e.target.value, checked = e.target.checked;
    if (val === 'Print' && checked === true) {
      checkTrueHandler('printCheck', 'Print');
    } else if (val === 'Print' && checked === false) {
      checkFalseHandler('printCheck', 'Print');
    } else if (val === 'Email' && checked === true) {
      checkTrueHandler('emailCheck', 'Email');
    } else if (val === 'Email' && checked === false) {
      checkFalseHandler('emailCheck', 'Email');
    } else if (val === 'SMS' && checked === true) {
      checkTrueHandler('smsCheck', 'SMS');
    } else if (val === 'SMS' && checked === false) {
      checkFalseHandler('smsCheck', 'SMS');
    }
  };



  const referenceHandler = (e, stateName) => {
    let fName = state.first_name ? state.first_name + ' ' : '';
    let lName = state.last_name ? state.last_name + ' ' : '';
    let cName = state.company_name ? '- ' + state.company_name : '';

    if (stateName === 'first_name') { fName = e.target.value + ' ' }
    if (stateName === 'last_name') { lName = e.target.value + ' ' }
    if (stateName === 'company_name') { cName = '- ' + e.target.value }

    let reference = fName + lName + cName;
    setState({ ...state, [stateName]: e.target.value, reference });
  }

  console.log(props.contacts_show_data?.contactCommunication);

  useEffect(() => {
    if (props.property_add_tanent_loading === "Success") {
      toastr.success("Tenant Added Successfully");
      props.contactList();
      props.propertyListFresh();
      history.push(
        "/propertyInfo/" + propertyId,
        { id: id }
      );
    }
    if (props.property_add_tanent_loading === "Failed") {
      toastr.error("Something went wrong");
    }

    if (props.contacts_show_loading === false) {
      props.showContact(id);
    }

    if (props.contacts_show_data) {
      setState({
        ...state,
        reference: props.contacts_show_data.data.reference,
        first_name: props.contacts_show_data.data.first_name,
        last_name: props.contacts_show_data.data.last_name,
        salutation: props.contacts_show_data.data.salutation,
        company_name: props.contacts_show_data.data.company_name,
        email: props.contacts_show_data.data.email,
        abn: props.contacts_show_data.data.abn,
        notes: props.contacts_show_data.data.notes,

        physical_building_name:
          props.contacts_show_data?.contactPhysicalAddress?.building_name,
        physical_country:
          props.contacts_show_data?.contactPhysicalAddress?.country,
        physical_number: props.contacts_show_data?.contactPhysicalAddress?.number,
        physical_postcode:
          props.contacts_show_data?.contactPhysicalAddress?.postcode,
        physical_state: props.contacts_show_data?.contactPhysicalAddress?.state,
        physical_street: props.contacts_show_data?.contactPhysicalAddress?.street,
        physical_suburb: props.contacts_show_data?.contactPhysicalAddress?.suburb,
        physical_unit: props.contacts_show_data?.contactPhysicalAddress?.unit,

        postal_building_name:
          props.contacts_show_data?.contactPostalAddress?.building_name,
        postal_country: props.contacts_show_data?.contactPostalAddress?.country,
        postal_number: props.contacts_show_data?.contactPostalAddress?.number,
        postal_postcode: props.contacts_show_data?.contactPostalAddress?.postcode,
        postal_state: props.contacts_show_data?.contactPostalAddress?.state,
        postal_street: props.contacts_show_data?.contactPostalAddress?.street,
        postal_suburb: props.contacts_show_data?.contactPostalAddress?.suburb,
        postal_unit: props.contacts_show_data?.contactPostalAddress?.unit,
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
          contactEditCommunication = {
            ...contactEditCommunication,
            printCheck: true,
          }
          com.push("Print")
        }
        if (item.communication === "Email") {
          contactEditCommunication = {
            ...contactEditCommunication,
            emailCheck: true,
          }
          com.push("Email")
        }
        if (item.communication === "SMS") {
          contactEditCommunication = {
            ...contactEditCommunication,
            smsCheck: true,
          }
          com.push("SMS")
        }
      });
      setForCheck({ ...contactEditCommunication });
      setCheckState([...com]);
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
      let u = unitN ? unitN + "/ " : "";
      let c = country ? country + " " : "";
      let st = statename ? statename + " " : "";
      let pc = postal_codeN ? postal_codeN + ", " : "";
      let sn = suburbN ? suburbN + " " : "";
      let s = streetN ? streetN + ", " : "";
      let n = street_numberN ? street_numberN + " " : "";
      setFullPhysicalAddress(u + n + s + sn + pc + st + c);
      // setPhysicalAddressState({ ...physicalAddressState, postal_country: country, postal_state: statename, postal_postcode: postal_codeN, postal_suburb: suburbN, postal_street: streetN, postal_number: street_numberN });
      setPhysicalAddress({
        ...physicalAddress,
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
        let pc = postal_codeN ? postal_codeN + ", " : "";
        let sn = suburbN ? suburbN + " " : "";
        let s = streetN ? streetN + ", " : "";
        let n = street_numberN ? street_numberN + " " : "";

        setFullPostalAddress(u + n + s + sn + pc + st + c);
        // setPostalAddressState({ ...postalAddressState, physical_country: country, physical_state: statename, physical_postcode: postal_codeN, physical_suburb: suburbN, physical_street: streetN, physical_number: street_numberN });
        setPostalAddress({
          ...postalAddress,
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
    props.property_add_tanent_loading,
    props.contacts_show_loading,
    props.contacts_show_data,
  ]);

  const handleBondValues = e => {
    // console.log(e);
    let value = e.target.value;
    value = +value;
    // if (!value) {
    //   setState2({...state2, rent: '', bond_required: ''});
    // }
    if (typeof value === 'number') {
      // console.log('ok');
      if (formTwoButtonValue.wfmBtn === 'Weekly') {
        // console.log('weekly');
        setWeeklyRent(value);
        value *= 4;
        value = value.toFixed(2);
        setState2({ ...state2, rent: e.target.value, bond_required: value });
        setFortNightlyRent();
        setMonthlyRent();
      } else if (formTwoButtonValue.wfmBtn === 'FortNightly') {
        // console.log('FortNightly');
        setFortNightlyRent(value);
        value *= 2;
        value = value.toFixed(2);
        setState2({ ...state2, rent: e.target.value, bond_required: value });
        setWeeklyRent();
        setMonthlyRent();
      } else if (formTwoButtonValue.wfmBtn === 'Monthly') {
        console.log('Monthly');
        setMonthlyRent(value);
        value /= 1.1;
        value = value.toFixed(2);
        setState2({ ...state2, rent: e.target.value, bond_required: value });
        setWeeklyRent();
        setFortNightlyRent();
      }
    } else {
      setState2({ ...state2, rent: e.target.value, bond_required: '' });
    }
  }
  console.log(state2);

  // Autocomplete address
  function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }
  // -----------------

  // console.log(props.contacts_show_data);
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

  const [postalAddForm, setPostalAddForm] = useState(true);
  const [physicalAddForm, setPhysicalAddForm] = useState(true);

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

  const checkAddressHandler = () => {
    if (addressState) {
      setPhysicalAddressState({
        ...physicalAddressState,
        physical_building_name: physicalAddressState.postal_building_name,
        physical_country: physicalAddressState.postal_country,
        physical_number: physicalAddressState.postal_number,
        physical_postcode: physicalAddressState.postal_postcode,
        physical_state: physicalAddressState.postal_state,
        physical_street: physicalAddressState.postal_street,
        physical_suburb: physicalAddressState.postal_suburb,
        physical_unit: physicalAddressState.postal_unit,
      });
      setPhysicalAddForm(true);
    } else {
      setPhysicalAddressState({
        ...physicalAddressState,
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

  const handlePropertyFormOneValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handlePropertyFormTwoValues = e => {
    setState2({ ...state2, [e.target.name]: e.target.value });
  };
  const handlePostalAddForm = () => {
    setPostalAddForm(prev => !prev);
  };

  const handlePhysicalAddForm = () => {
    setPhysicalAddForm(prev => !prev);
  };
  const tenantComHandler = e => {
    if (e.target.value === "SMS") {
      setTenantCom({
        ...tenantCom,
        sms: !tenantCom.sms,
      });
    }
    if (e.target.value === "Email") {
      setTenantCom({
        ...tenantCom,
        email: !tenantCom.email,
      });
    }
    if (e.target.value === "Print") {
      setTenantCom({
        ...tenantCom,
        print: !tenantCom.print,
      });
    }
  };

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

  document.title = "Tenant | Add Tenant";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Forms" breadcrumbItem="Add Tenant" /> */}

          <Row>
            <Col lg="12">


              <div className="wizard clearfix">
                <Card>
                  <CardBody>
                    <div className="steps clearfix">
                      <h4 className="text-primary mb-4">New Tenant</h4>
                      <div className="my-3" style={{
                        borderBottom:
                          "1.2px dotted #c9c7c7",
                      }}></div>
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
                            <span className="number">2.</span>{" "}
                            <span>Folio</span>
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                  </CardBody>
                </Card>
                <div className="content clearfix">
                  <TabContent
                    activeTab={tabState.activeTab}
                    className="body"
                  >
                    <TabPane tabId={1}>
                      <Row>
                        <Col sm="12">
                          <div className="d-flex flex-column justify-content-start">
                            <div className="">
                              <div>
                                <div className="">
                                  {/* {props.error ? (
                                                                            <Alert color="danger">
                                                                                {JSON.stringify(props.error.response.data.message)}
                                                                            </Alert>
                                                                            ) : null} */}
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
                                      mobile_phone: (phone && phone.mobile_phone) || "",
                                      work_phone: (phone && phone.work_phone) || "",
                                      home_phone: (phone && phone.home_phone) || "",
                                      email: (state && state.email) || "",

                                      postal_building_name:
                                        (state &&
                                          state.postal_building_name) ||
                                        "",
                                      postal_unit:
                                        (state && state.postal_unit) || "",
                                      postal_number:
                                        (state && state.postal_number) ||
                                        "",
                                      postal_street:
                                        (state && state.postal_street) ||
                                        "",
                                      postal_suburb:
                                        (state && state.postal_suburb) ||
                                        "",
                                      postal_postcode:
                                        (state && state.postal_postcode) ||
                                        "",
                                      postal_state:
                                        (state && state.postal_state) || "",
                                      postal_country:
                                        (state && state.postal_country) ||
                                        "",

                                      physical_building_name:
                                        (state &&
                                          state.physical_building_name) ||
                                        "",
                                      physical_unit:
                                        (state && state.physical_unit) ||
                                        "",
                                      physical_number:
                                        (state && state.physical_number) ||
                                        "",
                                      physical_street:
                                        (state && state.physical_street) ||
                                        "",
                                      physical_suburb:
                                        (state && state.physical_suburb) ||
                                        "",
                                      physical_postcode:
                                        (state &&
                                          state.physical_postcode) ||
                                        "",
                                      physical_state:
                                        (state && state.physical_state) ||
                                        "",
                                      physical_country:
                                        (state && state.physical_country) ||
                                        "",

                                      abn: (state && state.abn) || "",

                                      notes: (state && state.notes) || "",
                                      check: checkState ? checkState : [],

                                    }}
                                    validationSchema={Yup.object().shape({
                                      reference: Yup.string().required(
                                        "Please Enter Reference"
                                      ),
                                      first_name: Yup.string()
                                        .required("Please Enter First Name")
                                        .matches(
                                          /^[aA-zZ\s]+$/,
                                          "Only alphabets are allowed for this field "
                                        ),
                                      last_name: Yup.string()
                                        .required("Please Enter Last Name")
                                        .matches(
                                          /^[aA-zZ\s]+$/,
                                          "Only alphabets are allowed for this field "
                                        ),
                                      // salutation: Yup.string().required(
                                      //   "Please Enter Salutation"
                                      // ),
                                      company_name: Yup.string().required(
                                        "Please Enter Company Name"
                                      ),
                                      mobile_phone: Yup.string().required(
                                        "Please Enter Mobile phone"
                                      ),
                                      work_phone: Yup.string().required(
                                        "Please Enter Work phone"
                                      ),
                                      home_phone: Yup.string().required(
                                        "Please Enter Home phone"
                                      ),
                                      email: Yup.string()
                                        .email(
                                          "Field should contain a valid e-mail"
                                        )
                                        .max(255)
                                        .required("E-mail is required"),

                                      mobile_phone: Yup.string().required(
                                        "Please Enter Mobile phone"
                                      ),
                                      work_phone: Yup.string().required(
                                        "Please Enter Work phone"
                                      ),
                                      home_phone: Yup.string().required(
                                        "Please Enter Home phone"
                                      ),

                                      // postal_building_name:
                                      //   Yup.string().required(
                                      //     "Please Enter Building"
                                      //   ),
                                      // postal_unit:
                                      //   Yup.string().required(
                                      //     "Please Enter Unit"
                                      //   ),
                                      // postal_number: Yup.string().required(
                                      //   "Please Enter Number"
                                      // ),
                                      // postal_street: Yup.string().required(
                                      //   "Please Enter Street"
                                      // ),
                                      // postal_suburb: Yup.string().required(
                                      //   "Please Enter Suburb"
                                      // ),
                                      // postal_postcode:
                                      //   Yup.string().required(
                                      //     "Please Enter Postcode"
                                      //   ),
                                      // postal_state:
                                      //   Yup.string().required(
                                      //     "Please Enter State"
                                      //   ),
                                      // postal_country: Yup.string().required(
                                      //   "Please Enter Country"
                                      // ),

                                      // physical_building_name:
                                      //   Yup.string().required(
                                      //     "Please Enter Building"
                                      //   ),
                                      // physical_unit:
                                      //   Yup.string().required(
                                      //     "Please Enter Unit"
                                      //   ),
                                      // physical_number:
                                      //   Yup.string().required(
                                      //     "Please Enter Number"
                                      //   ),
                                      // physical_street:
                                      //   Yup.string().required(
                                      //     "Please Enter Street"
                                      //   ),
                                      // physical_suburb:
                                      //   Yup.string().required(
                                      //     "Please Enter Suburb"
                                      //   ),
                                      // physical_postcode:
                                      //   Yup.string().required(
                                      //     "Please Enter Postcode"
                                      //   ),
                                      // physical_state:
                                      //   Yup.string().required(
                                      //     "Please Enter State"
                                      //   ),
                                      // physical_country:
                                      //   Yup.string().required(
                                      //     "Please Enter Country"
                                      //   ),

                                      // communication: Yup.string().required(
                                      //   "Please Enter Communication"
                                      // ),
                                      abn: Yup.string().required(
                                        "Please Enter ABN"
                                      ),
                                      // notes:
                                      //   Yup.string().required(
                                      //     "Please Enter Notes"
                                      //   ),
                                    })}
                                    onSubmit={(values, onSubmitProps) => {
                                      setState(values);
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
                                          id="tenant-form-1"
                                        >
                                          <div>


                                            <Card>
                                              <CardBody>
                                                <h4 className="text-primary mb-3">

                                                  Tenant Contact

                                                </h4>


                                                <div className="w-75 mb-4" style={{
                                                  borderBottom:
                                                    "1.2px dotted #c9c7c7",
                                                }}></div>
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
                                                          handlePropertyFormOneValues
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
                                                <div className="w-75 mb-4" style={{
                                                  borderBottom:
                                                    "1.2px dotted #c9c7c7",
                                                }}></div>
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
                                                        value={state.first_name}
                                                        className={
                                                          "form-control" +
                                                          (errors.first_name &&
                                                            touched.first_name
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        onChange={e =>
                                                          referenceHandler(e, 'first_name')
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
                                                        value={state.last_name}
                                                        className={
                                                          "form-control" +
                                                          (errors.last_name &&
                                                            touched.last_name
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        onChange={e =>
                                                          referenceHandler(e, 'last_name')
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
                                                        value={state.salutation}
                                                        className={
                                                          "form-control" +
                                                          (errors.salutation &&
                                                            touched.salutation
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        onChange={
                                                          handlePropertyFormOneValues
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
                                                        value={
                                                          state.company_name
                                                        }
                                                        className={
                                                          "form-control" +
                                                          (errors.company_name &&
                                                            touched.company_name
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        onChange={e =>
                                                          referenceHandler(e, "company_name")
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
                                                        value={
                                                          phone.mobile_phone
                                                        }
                                                        onChange={(e) => mobilePhoneHandler(e)}

                                                      />
                                                      <Field
                                                        name="mobile_phone"
                                                        type="hidden"
                                                        value={
                                                          state.mobile_phone
                                                        }
                                                        className={
                                                          "form-control" +
                                                          (errors.mobile_phone &&
                                                            touched.mobile_phone
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        onChange={
                                                          handlePropertyFormOneValues
                                                        }
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
                                                      <PhoneInput
                                                        country={"au"}
                                                        value={phone.work_phone}
                                                        onChange={value =>
                                                          setPhone({
                                                            ...phone,
                                                            work_phone: value,
                                                          })
                                                        }
                                                      />
                                                      <Field
                                                        name="work_phone"
                                                        type="hidden"
                                                        value={
                                                          state.work_phone
                                                        }
                                                        className={
                                                          "form-control" +
                                                          (errors.work_phone &&
                                                            touched.work_phone
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        onChange={
                                                          handlePropertyFormOneValues
                                                        }
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

                                                      <PhoneInput
                                                        country={"au"}
                                                        value={phone.home_phone}
                                                        onChange={value =>
                                                          setPhone({
                                                            ...phone,
                                                            home_phone: value,
                                                          })
                                                        }
                                                      />
                                                      <Field
                                                        name="home_phone"
                                                        type="hidden"
                                                        value={
                                                          state.home_phone
                                                        }
                                                        className={
                                                          "form-control" +
                                                          (errors.home_phone &&
                                                            touched.home_phone
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        onChange={
                                                          handlePropertyFormOneValues
                                                        }
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
                                                        value={state.email}
                                                        className={
                                                          "form-control" +
                                                          (errors.email &&
                                                            touched.email
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        onChange={e => emailHandler(e)}
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
                                                                  state.postal_building_name
                                                                }
                                                                onChange={
                                                                  handlePostalAddressState
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
                                                                value={
                                                                  state.postal_unit
                                                                }
                                                                onChange={
                                                                  handlePostalAddressState
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
                                                                  handlePostalAddressState
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
                                                                  handlePostalAddressState
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
                                                                  handlePostalAddressState
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
                                                                  handlePostalAddressState
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
                                                                value={
                                                                  state.postal_state
                                                                }
                                                                onChange={
                                                                  handlePostalAddressState
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
                                                                  handlePostalAddressState
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
                                                                Same as postal
                                                                address
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
                                                                  state.physical_building_name
                                                                }
                                                                onChange={
                                                                  handlePhysicalAddressState
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
                                                                  handlePhysicalAddressState
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
                                                                  handlePhysicalAddressState
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
                                                                  handlePhysicalAddressState
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
                                                                  handlePhysicalAddressState
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
                                                                  handlePhysicalAddressState
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
                                                                  handlePhysicalAddressState
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
                                                                  handlePhysicalAddressState
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

                                                  {/* Communication value added */}
                                                  <Row className="mt-3 justify-content-evenly align-items-start g-4">
                                                    <Col md={2}>
                                                      {" "}
                                                      <Label
                                                        for="communication"
                                                        className="form-label ps-2"
                                                      >
                                                        Communication
                                                      </Label>
                                                    </Col>
                                                    <Col
                                                      md={8}
                                                      className="ms-4"
                                                    >
                                                      <div className="form-check mb-3">
                                                        <Label
                                                          for="defaultCheck1"
                                                          className="form-check-label"
                                                        >
                                                          Print statements and
                                                          notices for this
                                                          person
                                                        </Label>
                                                        <Field
                                                          name="communication"
                                                          type="checkbox"
                                                          className="form-check-input"
                                                          value="Print"
                                                          id="defaultCheck1"
                                                          checked={forCheck.printCheck === true ? true : false}
                                                          onClick={e => communicationHandler(e)}
                                                        />
                                                      </div>
                                                      <div className="form-check mb-3">
                                                        <Label
                                                          for="defaultCheck2"
                                                          className="form-check-label"
                                                        >
                                                          Send email
                                                          communications to this
                                                          person
                                                        </Label>
                                                        <Field
                                                          name="communication"
                                                          type="checkbox"
                                                          className="form-check-input"
                                                          value="Email"
                                                          id="defaultCheck2"
                                                          onClick={e => communicationHandler(e)}
                                                          checked={forCheck.emailCheck === true ? true : false}
                                                        />
                                                      </div>
                                                      <div className="form-check mb-3">
                                                        <Label
                                                          for="defaultCheck3"
                                                          className="form-check-label"
                                                        >
                                                          Send SMS
                                                          communications to this
                                                          person
                                                        </Label>
                                                        <Field
                                                          name="communication"
                                                          type="checkbox"
                                                          className="form-check-input"
                                                          value="SMS"
                                                          id="defaultCheck3"
                                                          checked={forCheck.smsCheck === true ? true : false}
                                                          onClick={e => communicationHandler(e)}
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
                                                <div className="w-75 mb-4" style={{
                                                  borderBottom:
                                                    "1.2px dotted #c9c7c7",
                                                }}></div>
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

                                                </h4>{" "}
                                                <div className="w-75 mb-4" style={{
                                                  borderBottom:
                                                    "1.2px dotted #c9c7c7",
                                                }}></div>
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
                                            rent:
                                              (state2 && state2.rent) || "",
                                            bond_required:
                                              (state2 &&
                                                state2.bond_required) ||
                                              "",

                                            bond_held:
                                              (state2 &&
                                                state2.bond_held) ||
                                              "",
                                            move_in:
                                              (state2 && state2.move_in) ||
                                              "",
                                            move_out:
                                              (state2 && state2.move_out) ||
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
                                              (state2 && state2.paid_to) ||
                                              "",
                                            part_paid:
                                              (state2 &&
                                                state2.part_paid) ||
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
                                          }}
                                          validationSchema={Yup.object().shape(
                                            {
                                              rent: Yup.string().required(
                                                "Please Enter Rent"
                                              ),
                                              bond_required:
                                                Yup.string().required(
                                                  "Bond is required"
                                                ),
                                              move_in: Yup.date()
                                                .typeError(
                                                  "Move in Date is required"
                                                )
                                                .required(
                                                  "Move in Date is required"
                                                ),
                                              move_out: Yup.date()
                                                .typeError(
                                                  "Move out Date is required"
                                                )
                                                .required(
                                                  "Move out Date is required"
                                                )
                                                .when(
                                                  "move_in",
                                                  move_in => {
                                                    if (move_in) {
                                                      return Yup.date()
                                                        .min(
                                                          move_in,
                                                          "Move out Date must be after Move in Date"
                                                        )
                                                        .typeError(
                                                          "Move out Date is required"
                                                        );
                                                    }
                                                  }
                                                ),
                                              agreement_start: Yup.date()
                                                .typeError(
                                                  "Agreement Start Date is required"
                                                )
                                                .required(
                                                  "Agreement Start Date is required"
                                                ),
                                              agreement_end: Yup.date()
                                                .typeError(
                                                  "Agreement End Date is required"
                                                )
                                                .required(
                                                  "Agreement End Date is required"
                                                )
                                                .when(
                                                  "agreement_start",
                                                  agreement_start => {
                                                    if (agreement_start) {
                                                      return Yup.date()
                                                        .min(
                                                          agreement_start,
                                                          "Agreement End Date must be after Agreement Start Date"
                                                        )
                                                        .typeError(
                                                          "Agreement End Date is required"
                                                        );
                                                    }
                                                  }
                                                ),
                                              paid_to:
                                                Yup.string().required(
                                                  "Paid to date required"
                                                ),
                                              // part_paid:
                                              //   Yup.string().required(
                                              //     "Paid Amount Required"
                                              //   ),
                                              // invoice_days_in_advance:
                                              //   Yup.string().required(
                                              //     "Invoice Days required"
                                              //   ),

                                              // rent_review_frequency:
                                              //   Yup.string().required(
                                              //     "Rent Review Frequency required"
                                              //   ),
                                              // next_rent_review:
                                              //   Yup.string().required(
                                              //     "Next rent review required"
                                              //   ),
                                              // bank_reterence:
                                              //   Yup.string().required(
                                              //     "Bank Reference required"
                                              //   ),
                                              // receipt_warning:
                                              //   Yup.string().required(
                                              //     "Receipt required"
                                              //   ),
                                            }
                                          )}
                                          onSubmit={(
                                            values,
                                            onSubmitProps
                                          ) => {
                                            console.log(values);
                                            props.addPropertyTanent(
                                              state,
                                              values,
                                              formTwoButtonValue,
                                              propertyId,
                                              phone,
                                              id,
                                            );
                                            props.propertyTenantInfoFresh();
                                          }}
                                        >
                                          {({
                                            errors,
                                            status,
                                            touched,
                                          }) => (
                                            <div>
                                              <Form
                                                className="form-horizontal"
                                                id="tenant-form-2"
                                              >
                                                <div>
                                                  <div className="mb-3">

                                                    <Card>
                                                      <CardBody>
                                                        <h4 className="text-primary mb-2">

                                                          Add Tenant Folio

                                                        </h4>
                                                        <div className="w-100 mt-2 mb-4" style={{
                                                          borderBottom:
                                                            "1.2px dotted #c9c7c7",
                                                        }}></div>

                                                        <Row className="mb-3 w-75">
                                                          <Col md={3}>
                                                            <Label
                                                              for="rent"
                                                              className="form-label"
                                                            >
                                                              Rent
                                                            </Label>
                                                          </Col>
                                                          <Col md={3}>
                                                            <Field
                                                              name="rent"
                                                              type="number"
                                                              className={
                                                                "form-control" +
                                                                (errors.rent &&
                                                                  touched.rent
                                                                  ? " is-invalid"
                                                                  : "")
                                                              }
                                                              id="rent"
                                                              value={
                                                                state2.rent
                                                              }
                                                              onChange={(e) => {
                                                                handleBondValues(e);
                                                              }}
                                                            />
                                                            <ErrorMessage
                                                              name="rent"
                                                              component="div"
                                                              className="invalid-feedback"
                                                            />
                                                          </Col>
                                                          <Col md={6}>
                                                            <div className="btn-group btn-group-justified">
                                                              <div className="btn-group">
                                                                <Button
                                                                  color={
                                                                    inspectionWeeklylyBtn
                                                                      ? "secondary"
                                                                      : "light"
                                                                  }
                                                                  onClick={
                                                                    toggleInspectionWeeklyBtn
                                                                  }
                                                                >
                                                                  {/* {inspectionWeeklylyBtn ? (
                                                                    <i className="bx bx-comment-check"></i>
                                                                  ) : null} */}
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
                                                                  onClick={
                                                                    toggleInspectionfortnightlyBtn
                                                                  }
                                                                >
                                                                  {/* {inspectionfortnightlyBtn ? (
                                                                    <i className="bx bx-comment-check"></i>
                                                                  ) : null} */}
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
                                                                  onClick={
                                                                    toggleInspectionMonthlyBtn
                                                                  }
                                                                >
                                                                  {/* {inspectionMonthlyBtn ? (
                                                                    <i className="bx bx-comment-check"></i>
                                                                  ) : null} */}
                                                                  <span>
                                                                    {" "}
                                                                    Monthly
                                                                  </span>
                                                                </Button>
                                                              </div>
                                                            </div>
                                                          </Col>
                                                        </Row>

                                                        <Row className="mb-3">
                                                          <Col md={4}>
                                                            <Label
                                                              for="routine_inspections_frequency"
                                                              className="form-label"
                                                            >
                                                              Rent includes tax
                                                            </Label>
                                                          </Col>
                                                          <Col md={4}>
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
                                                            <Col md={4}>
                                                              <Label
                                                                for="bond_required"
                                                                className="form-label"
                                                              >
                                                                Bond required
                                                              </Label>
                                                            </Col>
                                                            <Col md={4}>
                                                              <Field
                                                                name="bond_required"
                                                                id="bond_required"
                                                                type="number"
                                                                className={
                                                                  "form-control" +
                                                                  (errors.bond_required &&
                                                                    touched.bond_required
                                                                    ? " is-invalid"
                                                                    : "")
                                                                }
                                                                value={
                                                                  state2.bond_required
                                                                }
                                                                onChange={
                                                                  handlePropertyFormTwoValues
                                                                }
                                                              />
                                                              <ErrorMessage
                                                                name="bond_required"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </Col>
                                                            <Col md={4}>
                                                              {/* <p>
                                                                Edit bond
                                                                details
                                                              </p> */}
                                                            </Col>
                                                          </Row>

                                                          <Row className="mb-3">
                                                            <Col md={4}>
                                                              <Label
                                                                for="bond_held"
                                                                className="form-label"
                                                              >
                                                                Bond held
                                                              </Label>
                                                            </Col>
                                                            <Col md={4}>
                                                              <Field
                                                                name="bond_held"
                                                                type="number"
                                                                id="bond_held"
                                                                className={
                                                                  "form-control" +
                                                                  (errors.bond_held &&
                                                                    touched.bond_held
                                                                    ? " is-invalid"
                                                                    : "")
                                                                }
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
                                                            </Col>
                                                            <Col md={4}>
                                                              {/* <p>
                                                                Edit bond
                                                                details
                                                              </p> */}
                                                            </Col>
                                                          </Row>
                                                        </div>

                                                        <div className="my-3">
                                                          <Row className="mb-3">
                                                            <Col md={4}>
                                                              <Label
                                                                for="move_in"
                                                                className="form-label"
                                                              >
                                                                Move in
                                                              </Label>
                                                            </Col>
                                                            <Col md={4}>
                                                              <Field
                                                                name="move_in"
                                                                type="date"
                                                                className={
                                                                  "form-control" +
                                                                  (errors.move_in &&
                                                                    touched.move_in
                                                                    ? " is-invalid"
                                                                    : "")
                                                                }
                                                                value={
                                                                  state2.move_in
                                                                }
                                                                onChange={
                                                                  handlePropertyFormTwoValues
                                                                }
                                                                defaultValue={state2.move_in}
                                                              />
                                                            </Col>
                                                            <Col md={4}></Col>
                                                          </Row>

                                                          <Row className="mb-3">
                                                            <Col md={4}>
                                                              <Label
                                                                for="move_out"
                                                                className="form-label"
                                                              >
                                                                Move out
                                                              </Label>
                                                            </Col>
                                                            <Col md={4}>
                                                              <Field
                                                                name="move_out"
                                                                type="date"
                                                                className={
                                                                  "form-control" +
                                                                  (errors.move_out &&
                                                                    touched.move_out
                                                                    ? " is-invalid"
                                                                    : "")
                                                                }
                                                                value={
                                                                  state2.move_out
                                                                }
                                                                onChange={
                                                                  handlePropertyFormTwoValues
                                                                }
                                                              />
                                                              <ErrorMessage
                                                                name="move_out"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </Col>
                                                            <Col md={4}>
                                                              {/* <p>
                                                                Edit Move Out
                                                                Details
                                                              </p> */}
                                                            </Col>
                                                          </Row>

                                                          <Row className="mb-3">
                                                            <Col md={4}>
                                                              <Label
                                                                for="agreement_start"
                                                                className="form-label"
                                                              >
                                                                Agreement Start
                                                              </Label>
                                                            </Col>
                                                            <Col md={4}>
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
                                                                  handlePropertyFormTwoValues
                                                                }

                                                              />
                                                              <ErrorMessage
                                                                name="agreement_start"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </Col>
                                                            <Col md={4}></Col>
                                                          </Row>

                                                          <Row className="mb-3">
                                                            <Col md={4}>
                                                              <Label
                                                                for="agreement_end"
                                                                className="form-label"
                                                              >
                                                                Agreement End
                                                              </Label>
                                                            </Col>
                                                            <Col md={4}>
                                                              <Field
                                                                id="agreement_end"
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
                                                                  handlePropertyFormTwoValues
                                                                }
                                                              />
                                                              <ErrorMessage
                                                                name="agreement_end"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </Col>
                                                            <Col md={4}></Col>
                                                          </Row>

                                                          <Row className="mb-3">
                                                            <Col md={4}>
                                                              <Label
                                                                for="routine_inspections_frequency"
                                                                className="form-label"
                                                              >
                                                                Periodic tenancy
                                                              </Label>
                                                            </Col>
                                                            <Col md={4}>
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
                                                            <Col md={4}></Col>
                                                          </Row>
                                                        </div>

                                                        <div className="my-3">
                                                          <Row className="mb-3">
                                                            <Col md={4}>
                                                              <Label
                                                                for="paid_to"
                                                                className="form-label"
                                                              >
                                                                Paid to
                                                              </Label>
                                                            </Col>
                                                            <Col md={4}>
                                                              <Field
                                                                id="paid_to"
                                                                name="paid_to"
                                                                type="date"
                                                                className={
                                                                  "form-control" +
                                                                  (errors.paid_to &&
                                                                    touched.paid_to
                                                                    ? " is-invalid"
                                                                    : "")
                                                                }
                                                                value={
                                                                  state2.paid_to
                                                                }
                                                                onChange={
                                                                  handlePropertyFormTwoValues
                                                                }
                                                              />
                                                              <ErrorMessage
                                                                name="paid_to"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </Col>
                                                            <Col md={4}>
                                                              {/* <p>
                                                                Pro-rata the
                                                                initial period
                                                              </p> */}
                                                            </Col>
                                                          </Row>

                                                          <Row className="mb-3">
                                                            <Col md={4}>
                                                              <Label
                                                                for="part_paid"
                                                                className="form-label"
                                                              >
                                                                Part paid
                                                              </Label>
                                                            </Col>
                                                            <Col md={4}>
                                                              <Field
                                                                name="part_paid"
                                                                id="part_paid"
                                                                type="number"
                                                                className={
                                                                  "form-control" +
                                                                  (errors.part_paid &&
                                                                    touched.part_paid
                                                                    ? " is-invalid"
                                                                    : "")
                                                                }
                                                                value={
                                                                  state2.part_paid
                                                                }
                                                                onChange={
                                                                  handlePropertyFormTwoValues
                                                                }
                                                              />
                                                              <ErrorMessage
                                                                name="part_paid"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </Col>
                                                            <Col md={4}></Col>
                                                          </Row>

                                                          <Row className="mb-3">
                                                            <Col md={4}>
                                                              <Label
                                                                for="routine_inspections_frequency"
                                                                className="form-label"
                                                              >
                                                                Rent invoices
                                                              </Label>
                                                            </Col>
                                                            <Col md={4}>
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
                                                            <Col md={4}></Col>
                                                          </Row>

                                                          <Row className="mb-3">
                                                            <Col md={4}>
                                                              <Label
                                                                for="invoice_days_in_advance"
                                                                className="form-label"
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

                                                          <Row className="mb-3">
                                                            <Col md={4}>
                                                              <Label
                                                                for="rent_review_frequency"
                                                                className="form-label"
                                                              >
                                                                Rent review
                                                                frequency
                                                              </Label>
                                                            </Col>
                                                            <Col
                                                              md={4}
                                                              className="d-flex align-items-center"
                                                            >
                                                              <Field
                                                                name="rent_review_frequency"
                                                                type="number"
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
                                                              <ErrorMessage
                                                                name="rent_review_frequency"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                              <p>months</p>
                                                            </Col>
                                                            <Col md={4}></Col>
                                                          </Row>

                                                          <Row className="mb-3">
                                                            <Col md={4}>
                                                              <Label
                                                                for="next_rent_review"
                                                                className="form-label"
                                                              >
                                                                Next rent review
                                                              </Label>
                                                            </Col>
                                                            <Col md={4}>
                                                              <Field
                                                                id="next_rent_review"
                                                                name="next_rent_review"
                                                                type="date"
                                                                className={
                                                                  "form-control" +
                                                                  (errors.next_rent_review &&
                                                                    touched.next_rent_review
                                                                    ? " is-invalid"
                                                                    : "")
                                                                }
                                                                value={
                                                                  state2.next_rent_review
                                                                }
                                                                onChange={
                                                                  handlePropertyFormTwoValues
                                                                }
                                                              />
                                                              <ErrorMessage
                                                                name="next_rent_review"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </Col>
                                                            <Col md={4}></Col>
                                                          </Row>

                                                          <Row className="mb-3">
                                                            <Col md={4}>
                                                              <Label
                                                                for="routine_inspections_frequency"
                                                                className="form-label"
                                                              >
                                                                Exclude from
                                                                arrears
                                                                automation?
                                                              </Label>
                                                            </Col>
                                                            <Col md={4}>
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
                                                            <Col md={4}></Col>
                                                          </Row>
                                                        </div>
                                                      </CardBody>
                                                    </Card>

                                                    <Card>
                                                      <CardBody>
                                                        <h4 className="text-primary mb-2">

                                                          Options

                                                        </h4>
                                                        <div className="w-100 mt-2 mb-4" style={{
                                                          borderBottom:
                                                            "1.2px dotted #c9c7c7",
                                                        }}></div>
                                                        <div className="mb-3 w-75">
                                                          <Row className="mb-3">
                                                            <Col md={2}>
                                                              <Label
                                                                for="bank_reterence"
                                                                className="form-label"
                                                              >
                                                                Bank reference
                                                              </Label>
                                                            </Col>

                                                            <Col md={8}>
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
                                                              <ErrorMessage
                                                                name="bank_reterence"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </Col>
                                                          </Row>
                                                          <Row>
                                                            <Col md={2}>
                                                              <Label
                                                                for="receipt_warning"
                                                                className="form-label"
                                                              >
                                                                Receipt warning
                                                              </Label>
                                                            </Col>

                                                            <Col md={8}>
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
                                                              <ErrorMessage
                                                                name="receipt_warning"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </Col>
                                                          </Row>
                                                        </div>
                                                        <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                          <Col md={4}>
                                                            <Label
                                                              for="building"
                                                              className="form-label"
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
                                                      </CardBody>
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
                  </TabContent>
                </div>
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
                        tabState.activeTab === 4 ? "next disabled" : "next"
                      }
                    >
                      <button
                        type="submit"
                        form={"tenant-form-" + formSubmitBtnState}
                        className="btn btn-primary"
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
  const { property_add_tanent_loading } = gstate.property;

  const { contacts_show_data, contacts_show_error, contacts_show_loading } =
    gstate.Contacts2;

  return {
    property_add_tanent_loading,

    contacts_show_data,
    contacts_show_error,
    contacts_show_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addPropertyTanent,
    propertyTenantInfoFresh,
    showContact,
    propertyListFresh,
    contactList
  })(setPropertyTenantAdd)
);
