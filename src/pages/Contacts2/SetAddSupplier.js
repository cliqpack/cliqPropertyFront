import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  addSupplier,
  addSupplierFresh,
  contactList,
  showContactFresh,
  showContact,
} from "../../store/Contacts2/actions";
import {
  Link,
  withRouter,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
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
} from "reactstrap";

import classnames from "classnames";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";


const SetAddSupplier = props => {

  const { id } = useParams(); // Property ID
  const history = useHistory();

  const [tabState, setTabState] = useState({
    activeTab: 1,
    passedSteps: [1],
  });

  // Autocomplete address
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {};

  const inputRefPostal = useRef();
  const autoCompletePostalRef = useRef();
  // ------------------------

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
  const [forCheck, setForCheck] = useState({
    smsCheck: false,
    emailCheck: false,
    printCheck: false,
  });
  const [checkState, setCheckState] = useState([]);

  const [selectedId2, setSelectedId2] = useState();
  const [selectedGroup2, setSelectedGroup2] = useState(null);
  const [optionGroup2, setOptionGroup2] = useState([
    {
      options: [
        { label: "400-council rates", value: "400-council rates" },
        { label: "405-water rates", value: "405-water rates" },
        { label: "415-land taxes", value: "415-land taxes" },
      ],
    },
  ]);

  const [selectedId3, setSelectedId3] = useState();
  const [selectedGroup3, setSelectedGroup3] = useState(null);
  const [optionGroup3, setOptionGroup3] = useState([
    {
      options: [
        { label: "High", value: "High" },
        { label: "Normal", value: "Normal" },
        { label: "Low", value: "Low" },
      ],
    },
  ]);

  const [selectedId6, setSelectedId6] = useState();
  const [selectedGroup6, setSelectedGroup6] = useState(null);
  const [optionGroup6, setOptionGroup6] = useState([
    {
      options: [
        { label: "None", value: "None" },
        { label: "Cheque", value: "Cheque" },
        { label: "EFT", value: "EFT" },
        { label: "Bpay", value: "Bpay" },
      ],
    },
  ]);
  const [tableInfoShow3, setTableInfoShow3] = useState(false);

  const [state, setState] = useState({});
  // console.log(state);
  const [state2, setState2] = useState({});
  const [state3, setState3] = useState([
    { method: "", payee: "", bsb: "", account: "", split: "100.00%" },
  ]);
  // console.log(state2);

  const [postalAddForm, setPostalAddForm] = useState(true);
  const [physicalAddForm, setPhysicalAddForm] = useState(true);

  const [inspectionApproveBillsYesBtn, setInspectionApproveBillsYesBtn] =
    useState(true);
  const [inspectionApproveBillsNoBtn, setInspectionApproveBillsNoBtn] =
    useState(false);

  const [formSubmitBtnState, setFormSubmitBtnState] = useState(1); // Form Submit Button State

  const [rows3, setRows3] = useState([1]);

  const handleAddRow = () => {
    const item = {
      name: "",
    };
    setRows3([...rows3, item]);

    setState3([
      ...state3,
      { method: "", payee: "", bsb: "", account: "", split: "100.00%" },
    ]);
  };

  const handleRemoveRow = (e, idx) => {

    if (rows3.length > 1) {
      var rowIndex = [...rows3];
      rowIndex.splice(idx, 1);
      setRows3(rowIndex);
    }
  };

  const [formTwoButtonValue, setFormTwoButtonValue] = useState({
    auto_approve_bill: 1,
  });

  const toggleInspectionApproveBillsYesBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, auto_approve_bill: 1 });
    setInspectionApproveBillsYesBtn(true);
    setInspectionApproveBillsNoBtn(false);
  };

  const toggleInspectionApproveBillsNoBtn = () => {
    setFormTwoButtonValue({ ...formTwoButtonValue, auto_approve_bill: 0 });
    setInspectionApproveBillsNoBtn(true);
    setInspectionApproveBillsYesBtn(false);
  };

  const handlePostalAddForm = () => {
    setPostalAddForm(prev => !prev);
  };

  const handlePhysicalAddForm = () => {
    setPhysicalAddForm(prev => !prev);
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

  const handlePropertyFormValues4 = (idx, e) => {
    let data = [...state3];
    data[idx][e.target.name] = e.target.value;
    setState3(data);
  };

  const handleChangeInput = async (idx, e, type) => {
    const values = [...state3];

    values[idx][type] = e.value;
    await setState3(values);

    setSelectedGroup6(e);
    setSelectedId6(e.value);
    setTableInfoShow3(true);
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

  useEffect(() => {
    if (props.supplier_add_loading === "Success") {
      props.contactList();
      toastr.success("Supplier Added Successfully");
      const pushID = props.supplier_add_data.contact_id || null;
      console.log(pushID);
      history.push("/contactsInfo/supplier/" + pushID);
      props.addSupplierFresh();
    }
    if (props.supplier_add_loading === "Failed") {
      toastr.error("Something went wrong");
    }

    if (props.contacts_show_loading === false) {
      console.log('show contact');
      props.showContact(id);
    }

    if (props.contacts_show_data) {
      setState({
        ...state,
        reference: props.contacts_show_data?.data?.reference,
        first_name: props.contacts_show_data.data?.first_name,
        last_name: props.contacts_show_data.data?.last_name,
        salutation: props.contacts_show_data.data?.salutation,
        company_name: props.contacts_show_data.data?.company_name,
        email: props.contacts_show_data.data?.email,
        abn: props.contacts_show_data.data?.abn,
        notes: props.contacts_show_data.data?.notes,

        physical_building_name:
          props.contacts_show_data.contactPhysicalAddress?.building_name,
        physical_country:
          props.contacts_show_data.contactPhysicalAddress?.country,
        physical_number:
          props.contacts_show_data.contactPhysicalAddress?.number,
        physical_postcode:
          props.contacts_show_data.contactPhysicalAddress?.postcode,
        physical_state: props.contacts_show_data.contactPhysicalAddress?.state,
        physical_street:
          props.contacts_show_data.contactPhysicalAddress?.street,
        physical_suburb:
          props.contacts_show_data.contactPhysicalAddress?.suburb,
        physical_unit: props.contacts_show_data.contactPhysicalAddress?.unit,

        postal_building_name:
          props.contacts_show_data.contactPostalAddress?.building_name,
        postal_country: props.contacts_show_data.contactPostalAddress?.country,
        postal_number: props.contacts_show_data.contactPostalAddress?.number,
        postal_postcode:
          props.contacts_show_data.contactPostalAddress?.postcode,
        postal_state: props.contacts_show_data.contactPostalAddress?.state,
        postal_street: props.contacts_show_data.contactPostalAddress?.street,
        postal_suburb: props.contacts_show_data.contactPostalAddress?.suburb,
        postal_unit: props.contacts_show_data.contactPostalAddress?.unit,
      });

      setPhone({
        mobile_phone: props.contacts_show_data.data?.mobile_phone,
        work_phone: props.contacts_show_data.data?.work_phone,
        home_phone: props.contacts_show_data.data?.home_phone,
      })
    }

    if (props.contacts_show_data) {
      let com = [];
      props.contacts_show_data.contactCommunication.map((item) => {
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
      console.log({ place });
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
      setState({
        ...state,
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
        console.log({ place });
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
        setState({
          ...state,
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
    props.supplier_add_loading,
    props.contacts_show_data,
    props.contacts_list_loading,
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
  // -----------------------

  const handleRowResult = async e => {
    e.preventDefault();
    await props.addSupplier(state, phone, state2, formTwoButtonValue, state3, id);

  };

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

  document.title = "Supplier | Add Supplier";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg="12">
              <div>
                <div>
                  <div className="wizard clearfix">
                    <Card>
                      <CardBody>
                        <h4 className="mb-3 text-primary">New Supplier</h4>
                        <div style={{
                          borderBottom:
                            "1.2px dotted #c9c7c7",
                        }} className="mb-2"></div>
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
                                <span className="number">2.</span>{" "}
                                <span>Supplier</span>
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
                                          mobile_phone: (phone && phone.mobile_phone) || "",
                                          work_phone: (phone && phone.work_phone) || "",
                                          home_phone: (phone && phone.home_phone) || "",

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
                                          notes: (state && state.notes) || "",
                                          communication:
                                            checkState ? checkState : [],
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
                                          //   "Please Enter Reference"
                                          // ),
                                          company_name: Yup.string().required(
                                            "Please Enter Company Name"
                                          ),

                                          email: Yup.string()
                                            .email(
                                              "Field should contain a valid e-mail"
                                            )
                                            .max(255)
                                            .required("E-mail is required"),

                                          mobile_phone: Yup.string()
                                            .required(
                                              "Please Enter Mobile Phone"
                                            ),
                                          work_phone: Yup.string()
                                            .required("Please Enter Work Phone"),
                                          home_phone: Yup.string()
                                            .required("Please Enter Home Phone"),

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

                                          // notes: Yup.string().required(
                                          //   "Please Enter Reference"
                                          // ),
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
                                                    <div
                                                      className="w-75 d-flex justify-content-between align-items-center"
                                                      style={{
                                                        borderBottom:
                                                          "1.2px dotted #c9c7c7",
                                                      }}
                                                    >


                                                      <h4 className="mb-3 text-primary">
                                                        Supplier Contact
                                                      </h4>


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
                                                    <h4
                                                      className="text-primary mb-3 w-75"

                                                    >
                                                      People

                                                    </h4>
                                                    <div className="w-75" style={{
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
                                                            onChange={e => referenceHandler(e, 'first_name')}
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
                                                            onChange={e => referenceHandler(e, 'last_name')}
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
                                                            onChange={e => referenceHandler(e, 'company_name')}
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
                                                              phone.mobile_phone
                                                            }
                                                            className={
                                                              "form-control" +
                                                              (errors.mobile_phone &&
                                                                touched.mobile_phone
                                                                ? " is-invalid"
                                                                : "")
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
                                                              phone.work_phone
                                                            }
                                                            className={
                                                              "form-control" +
                                                              (errors.work_phone &&
                                                                touched.work_phone
                                                                ? " is-invalid"
                                                                : "")
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
                                                              phone.home_phone
                                                            }
                                                            className={
                                                              "form-control" +
                                                              (errors.home_phone &&
                                                                touched.home_phone
                                                                ? " is-invalid"
                                                                : "")
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
                                                              ref={inputRefPostal}
                                                            />
                                                            {!postalAddForm ? (
                                                              <Button
                                                                color="info"
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
                                                                color="info"
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
                                                                      handlePropertyFormOneValues
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
                                                                      handlePropertyFormOneValues
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
                                                                      handlePropertyFormOneValues
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
                                                                      handlePropertyFormOneValues
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
                                                                      handlePropertyFormOneValues
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
                                                                      handlePropertyFormOneValues
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
                                                                      handlePropertyFormOneValues
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
                                                                      handlePropertyFormOneValues
                                                                    }
                                                                  />
                                                                </Col>
                                                                <ErrorMessage
                                                                  name="postal_country"
                                                                  component="div"
                                                                  className="invalid-feedback"
                                                                />
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
                                                              ref={inputRef}
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
                                                                <i className="fa fa-solid fa-caret-down ms-1" />
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
                                                                      handlePropertyFormOneValues
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
                                                                      handlePropertyFormOneValues
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
                                                                      handlePropertyFormOneValues
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
                                                                      handlePropertyFormOneValues
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
                                                                      handlePropertyFormOneValues
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
                                                                      handlePropertyFormOneValues
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
                                                                      handlePropertyFormOneValues
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
                                                                      handlePropertyFormOneValues
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
                                                              checked={forCheck.emailCheck === true ? true : false}
                                                              onClick={e => communicationHandler(e)}
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
                          <Row>
                            <Col sm={12}>
                              <Row>
                                <Col md={12}>
                                  <div className="d-flex flex-column justify-content-start">
                                    <div className="">
                                      <div>
                                        <div className="mb-3">
                                          {props.error ? (
                                            <Alert color="danger">
                                              {JSON.stringify(
                                                props.error.response.data
                                                  .message
                                              )}
                                            </Alert>
                                          ) : null}
                                          <Formik
                                            enableReinitialize={true}
                                            initialValues={{
                                              abn: (state2 && state2.abn) || "",
                                              website:
                                                (state2 && state2.website) ||
                                                "",
                                              account:
                                                (state2 && state2.account) ||
                                                "",
                                              bill_priority:
                                                (state2 &&
                                                  state2.bill_priority) ||
                                                "",
                                            }}
                                            // validationSchema={Yup.object().shape(
                                            //   {
                                            //     abn: Yup.string().required(
                                            //       "Please Enter ABN"
                                            //     ),
                                            //     website: Yup.string().required(
                                            //       "Please Enter Website"
                                            //     ),
                                            //     account: Yup.string().required(
                                            //       "Please Select Account"
                                            //     ),
                                            //     bill_priority:
                                            //       Yup.string().required(
                                            //         "Please Select Bill Priority"
                                            //       ),
                                            //     auto_approve_bill:
                                            //       Yup.string().required(
                                            //         "Please Select Auto Approve Bills"
                                            //       ),
                                            //   }
                                            // )}
                                            onSubmit={(
                                              values,
                                              onSubmitProps
                                            ) => {
                                              // console.log(values);
                                              setState2(values);
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
                                                  id="tenant-form-2"
                                                >
                                                  <Card>
                                                    <CardBody>
                                                      <div className="w-75">
                                                        <h4 className="mb-3 text-primary">

                                                          New Supplier

                                                        </h4>
                                                        <div className="w-100" style={{
                                                          borderBottom:
                                                            "1.2px dotted #c9c7c7",
                                                        }}></div>

                                                        <div className="mb-3 ms-2">
                                                          <Row className="my-3">
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
                                                                value={state2.abn}
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
                                                              <ErrorMessage
                                                                name="abn"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </Col>
                                                          </Row>
                                                          <Row className="my-3">
                                                            <Col md={2}>
                                                              <Label
                                                                for="website"
                                                                className="form-label"
                                                              >
                                                                Website
                                                              </Label>
                                                            </Col>

                                                            <Col md={8}>
                                                              <Field
                                                                name="website"
                                                                type="text"
                                                                value={state2.website}
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
                                                              <ErrorMessage
                                                                name="website"
                                                                component="div"
                                                                className="invalid-feedback"
                                                              />
                                                            </Col>
                                                          </Row>

                                                          <Row className="mb-3">
                                                            <Col md={2}>
                                                              <Label>Account</Label>
                                                            </Col>
                                                            <Col md={8}>
                                                              <Select
                                                                value={selectedGroup2}
                                                                onChange={
                                                                  handleSelectGroup2
                                                                }
                                                                options={optionGroup2}
                                                                classNamePrefix="select2-selection"
                                                              />
                                                            </Col>

                                                            <ErrorMessage
                                                              name="account"
                                                              component="div"
                                                              className="invalid-feedback"
                                                            />
                                                          </Row>
                                                          <Row>
                                                            <Col md={2}>
                                                              <Label>
                                                                Bill priority
                                                              </Label>
                                                            </Col>
                                                            <Col md={8}>
                                                              <Select
                                                                value={selectedGroup3}
                                                                onChange={
                                                                  handleSelectGroup3
                                                                }
                                                                options={optionGroup3}
                                                                classNamePrefix="select2-selection"
                                                              />
                                                            </Col>
                                                            <ErrorMessage
                                                              name="bill_priority"
                                                              component="div"
                                                              className="invalid-feedback"
                                                            />
                                                          </Row>
                                                          <Row className="my-3">
                                                            <Col md={2}>
                                                              <Label
                                                                for="routine_inspections_frequency"
                                                                className="form-label"
                                                              >
                                                                Auto approve bills
                                                              </Label>
                                                            </Col>
                                                            <Col md={8}>
                                                              <div className="btn-group btn-group-justified">
                                                                <div className="btn-group">
                                                                  <Button
                                                                    color={
                                                                      inspectionApproveBillsYesBtn
                                                                        ? "secondary"
                                                                        : "light"
                                                                    }
                                                                    onClick={
                                                                      toggleInspectionApproveBillsYesBtn
                                                                    }
                                                                  >
                                                                    {inspectionApproveBillsYesBtn ? (
                                                                      <i className="bx bx-comment-check"></i>
                                                                    ) : null}
                                                                    <span> Yes</span>
                                                                  </Button>
                                                                </div>
                                                                <div className="btn-group">
                                                                  <Button
                                                                    color={
                                                                      inspectionApproveBillsNoBtn
                                                                        ? "secondary"
                                                                        : "light"
                                                                    }
                                                                    onClick={
                                                                      toggleInspectionApproveBillsNoBtn
                                                                    }
                                                                  >
                                                                    {inspectionApproveBillsNoBtn ? (
                                                                      <i className="bx bx-comment-check"></i>
                                                                    ) : null}
                                                                    <span> No</span>
                                                                  </Button>
                                                                </div>
                                                              </div>
                                                            </Col>
                                                            {/* <ErrorMessage
                                                        name="auto_approve_bills"
                                                        component="div"
                                                        className="invalid-feedback"
                                                      /> */}
                                                          </Row>
                                                        </div>
                                                      </div>
                                                    </CardBody>
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
                          <Row className="">
                            <Col xs="12">
                              <div>
                                <Card>
                                  <CardBody>
                                    <div>
                                      <form
                                        className="repeater mt-3"
                                        id="tenant-form-3"
                                        encType="multipart/form-data"
                                        onSubmit={handleRowResult}
                                      >
                                        <table style={{ width: "100%" }}>
                                          <tbody>
                                            {rows3.map((item, idx) => (
                                              <tr id={"addr" + idx} key={idx}>
                                                <td>
                                                  <div data-repeater-list="group-a">
                                                    <Row data-repeater-item>
                                                      <Col lg="2" className="mb-3">
                                                        <label htmlFor="name">
                                                          Method
                                                        </label>
                                                        <div>
                                                          <div className="mb-3 select2-container">
                                                            <Select

                                                              onChange={e =>
                                                                handleChangeInput(
                                                                  idx,
                                                                  e,
                                                                  "method"
                                                                )
                                                              }
                                                              options={optionGroup6}
                                                              classNamePrefix="select2-selection"
                                                              name="method"
                                                            />
                                                          </div>
                                                        </div>
                                                      </Col>

                                                      <Col lg="2" className="mb-3">
                                                        <label htmlFor="email">
                                                          Payee
                                                        </label>

                                                        <input
                                                          name="payee"
                                                          type="text"
                                                          className={"form-control"}
                                                          onChange={e =>
                                                            handlePropertyFormValues4(
                                                              idx,
                                                              e
                                                            )
                                                          }
                                                        />
                                                      </Col>

                                                      <Col lg="2" className="mb-3">
                                                        <label htmlFor="subject">
                                                          BSB
                                                        </label>

                                                        <input
                                                          name="bsb"
                                                          type="text"
                                                          className={"form-control"}
                                                          onChange={e =>
                                                            handlePropertyFormValues4(
                                                              idx,
                                                              e
                                                            )
                                                          }
                                                        />
                                                      </Col>

                                                      <Col lg="2" className="mb-3">
                                                        <label htmlFor="resume">
                                                          Account#
                                                        </label>

                                                        <input
                                                          name="account"
                                                          type="text"
                                                          className={"form-control"}
                                                          onChange={e =>
                                                            handlePropertyFormValues4(
                                                              idx,
                                                              e
                                                            )
                                                          }
                                                        />
                                                      </Col>

                                                      <Col
                                                        lg="2"
                                                        className="mb-3 d-flex flex-column align-items-center"
                                                      >
                                                        <label htmlFor="message">
                                                          Split
                                                        </label>

                                                        <Row className="d-flex flex-column">
                                                          <Col>
                                                            <input
                                                              name="split"
                                                              type="text"
                                                              placeholder="100%"
                                                              className={
                                                                "form-control"
                                                              }
                                                              onChange={e =>
                                                                handlePropertyFormValues4(
                                                                  idx,
                                                                  e
                                                                )
                                                              }
                                                              disabled={true}
                                                            />
                                                          </Col>
                                                        </Row>
                                                      </Col>
                                                      <Col
                                                        lg="2"
                                                        className="form-group align-self-center"
                                                      >
                                                        <Button
                                                          onClick={e =>
                                                            handleRemoveRow(e, idx)
                                                          }
                                                          color="danger"
                                                        >
                                                          Remove
                                                        </Button>
                                                      </Col>
                                                    </Row>
                                                  </div>
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </form>
                                      <div className="d-flex justify-content-end">
                                        {" "}
                                        <Button
                                          onClick={handleAddRow}
                                          color="secondary"
                                          className="mt-3 mt-lg-0"
                                        >
                                          Add{" "}
                                        </Button>{" "}
                                      </div>
                                    </div>
                                  </CardBody>
                                </Card>
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
                            <i className="fas fa-file-alt me-1"></i> Save & Next
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
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
    contacts_show_data,
    contacts_show_loading,
    supplier_add_data,

  } = gstate.Contacts2;

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
    contacts_show_data,
    contacts_show_loading,
    supplier_add_data,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addSupplier,
    addSupplierFresh,
    contactList,
    showContact,
  })(SetAddSupplier)
);
