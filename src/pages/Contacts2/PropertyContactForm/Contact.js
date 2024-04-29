import React, { useEffect, useState, useRef, Fragment } from "react";
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
import * as Yup from "yup";
import toastr from "toastr";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import classnames from "classnames";
import { Link, withRouter, useParams, useHistory } from "react-router-dom";
import { addPropertyTanent, propertyListFresh } from "../../store/Properties/actions";
import { propertyTenantInfoFresh } from "../../store/Properties/tenantActions";
import { contactList, showContactFresh, showContact } from "../../store/Contacts2/actions";
import moment from 'moment';

import TenantBondDetails from "./TenantBondDetails";
import TenantMoveOutDetails from "./TenantMoveOutDetails";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
const Contact = (props) => {

    const [tabState, setTabState] = useState({
        activeTab: 1,
        passedSteps: [1],
    });
    // ---------

    let { id } = useParams(); // Property ID
    const history = useHistory();

    // const [date, setDate] = useState();
    // const [startTime, setStartTime] = useState();
    // const [endTime, setEndTime] = useState();

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
    const [addressHandlerState, setAddressHandlerState] = useState(true);

    const [postalAddressState, setPostalAddressState] = useState({});
    const [physicalAddressState, setPhysicalAddressState] = useState({});
    const [contactState, setContactState] = useState(false);
    const [contactId, setContactId] = useState(null);
    const [postalAddress, setPostalAddress] = useState({});
    const [physicalAddress, setPhysicalAddress] = useState({});
    const [fullPostalAddress, setFullPostalAddress] = useState('');
    const [fullPhysicalAddress, setFullPhysicalAddress] = useState('');

    const handlePostalAddressState = e => {
        setPostalAddress({ ...postalAddress, [e.target.name]: e.target.value });
    }
    const handlePhysicalAddressState = e => {
        setPhysicalAddress({ ...physicalAddress, [e.target.name]: e.target.value });
    }

    // Autocomplete address
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {};

    const inputRefPostal = useRef();
    const autoCompletePostalRef = useRef();
    // ------------------------

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
    const [phone, setPhone] = useState({
        mobile_phone: null,
        work_phone: null,
        home_phone: null,
    });

    const [formSubmitBtnState, setFormSubmitBtnState] = useState(1); // Form Submit Button State

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

    useEffect(() => {
        if (contactState) {
            props.showContact(selectedId);
        }
        if (props.property_add_tanent_loading === "Success") {
            toastr.success("Tenant Added Successfully");
            props.contactList();
            props.propertyTenantInfoFresh();
            props.propertyListFresh();
            history.push(
                "/propertyInfo/" + id,
                { id: id }
            );
        }
        if (props.property_add_tanent_loading === "Failed") {
            toastr.error("Something went wrong");
        }

        if (props.contacts_list_loading === false) {
            props.contactList();
        }

        if (props.contacts_show_data && contactState) {
            setContactState(false);
            setContactId(props.contacts_show_data?.data?.id);
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

            setPostalAddress({
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
            setPhysicalAddress({
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
            });

            let building = props.contacts_show_data.contactPostalAddress?.building_name ? props.contacts_show_data.contactPostalAddress.building_name + ", " : '';
            let unit = props.contacts_show_data.contactPostalAddress?.unit ? props.contacts_show_data.contactPostalAddress.unit + ", " : '';
            let number = props.contacts_show_data.contactPostalAddress?.number ? props.contacts_show_data.contactPostalAddress.number + ", " : '';
            let street = props.contacts_show_data.contactPostalAddress?.street ? props.contacts_show_data.contactPostalAddress.street + ", " : '';
            let suburb = props.contacts_show_data.contactPostalAddress?.suburb ? props.contacts_show_data.contactPostalAddress.suburb + ", " : '';
            let pstate = props.contacts_show_data.contactPostalAddress?.state ? props.contacts_show_data.contactPostalAddress.state + ", " : '';
            let postcode = props.contacts_show_data.contactPostalAddress?.postcode ? props.contacts_show_data.contactPostalAddress.postcode + ", " : '';
            let country = props.contacts_show_data.contactPostalAddress?.country ? props.contacts_show_data.contactPostalAddress.country : '';
            setFullPostalAddress(building + unit + number + street + suburb + pstate + postcode + country);
            building = props.contacts_show_data.contactPhysicalAddress.building_name ? props.contacts_show_data.contactPhysicalAddress.building_name + ", " : '';
            unit = props.contacts_show_data.contactPhysicalAddress.unit ? props.contacts_show_data.contactPhysicalAddress.unit + ", " : '';
            number = props.contacts_show_data.contactPhysicalAddress.number ? props.contacts_show_data.contactPhysicalAddress.number + ", " : '';
            street = props.contacts_show_data.contactPhysicalAddress.street ? props.contacts_show_data.contactPhysicalAddress.street + ", " : '';
            suburb = props.contacts_show_data.contactPhysicalAddress.suburb ? props.contacts_show_data.contactPhysicalAddress.suburb + ", " : '';
            pstate = props.contacts_show_data.contactPhysicalAddress.state ? props.contacts_show_data.contactPhysicalAddress.state + ", " : '';
            postcode = props.contacts_show_data.contactPhysicalAddress.postcode ? props.contacts_show_data.contactPhysicalAddress.postcode + ", " : '';
            country = props.contacts_show_data.contactPhysicalAddress.country ? props.contacts_show_data.contactPhysicalAddress.country : '';
            setFullPhysicalAddress(building + unit + number + street + suburb + pstate + postcode + country);

            let com = [];
            props.contacts_show_data?.contactCommunication?.map((item) => {
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
            let unitN="";
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

                let unit = inArray("subpremise", element.types);
                if (unit == true) {
                    unitN = element.long_name;
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
             let u = unitN ? unitN + "/ " : "";
            let c = country ? country + " " : "";
            let st = statename ? statename + " " : "";
            let pc = postal_codeN ? postal_codeN + ", " : "";
            let sn = suburbN ? suburbN + " " : "";
            let s = streetN ? streetN + ", " : "";
            let n = street_numberN ? street_numberN + " " : "";
            setFullPostalAddress(u+ n + s + sn + pc + st + c);
            // setPostalAddressState({ ...postalAddressState, physical_country: country, physical_state: statename, physical_postcode: postal_codeN, physical_suburb: suburbN, physical_street: streetN, physical_number: street_numberN });
            setPostalAddress({ ...postalAddress,postal_unit:unitN, postal_country: country, postal_state: statename, postal_postcode: postal_codeN, postal_suburb: suburbN, postal_street: streetN, postal_number: street_numberN });

            setPostalAddForm(true);
        });

        autoCompletePostalRef.current = new window.google.maps.places.Autocomplete(
            inputRefPostal.current,
            options
        );
        autoCompletePostalRef.current.addListener("place_changed", async function () {
            const place = await autoCompletePostalRef.current.getPlace();
            let unitN="";
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

                let unit = inArray("subpremise", element.types);
                if (unit == true) {
                    unitN = element.long_name;
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
            let u = unitN ? unitN + "/ " : "";
            let c = country ? country + " " : "";
            let st = statename ? statename + " " : "";
            let pc = postal_codeN ? postal_codeN + ", " : "";
            let sn = suburbN ? suburbN + " " : "";
            let s = streetN ? streetN + ", " : "";
            let n = street_numberN ? street_numberN + " " : "";
            setFullPhysicalAddress(u+ n + s + sn + pc + st + c);
            // setPhysicalAddressState({ ...physicalAddressState, postal_country: country, postal_state: statename, postal_postcode: postal_codeN, postal_suburb: suburbN, postal_street: streetN, postal_number: street_numberN });
            setPhysicalAddress({ ...physicalAddress, physical_unit: unitN, physical_country: country, physical_state: statename, physical_postcode: postal_codeN, physical_suburb: suburbN, physical_street: streetN, physical_number: street_numberN });

            setPhysicalAddForm(true);
        });



        //--------------------------------
    }, [props.property_add_tanent_loading, props.contacts_list_loading, contactState, props.contacts_show_data, state]);

    // Autocomplete address
    function inArray(needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
            if (haystack[i] == needle) return true;
        }
        return false;
    }
    // -----------------

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

    const [selectedId, setSelectedId] = useState();
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [optionGroup, setOptionGroup] = useState();
    const [optionGroupState, setOptionGroupState] = useState(true);

    const [show, setShow] = useState(false);
    const [showRent, setShowRent] = useState(false);
    const [showMoveOut, setShowMoveOut] = useState(false);
    const [postalAddForm, setPostalAddForm] = useState(false);
    const [physicalAddForm, setPhysicalAddForm] = useState(false);

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

    const handleShowRent = () => setShowRent(prev => !prev)
    const handleShowMoveOut = () => setShowMoveOut(prev => !prev)

    // Handle Inner form values and set form value state
    const handlePropertyFormOneValues = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handlePropertyFormTwoValues = e => {
        setState2({ ...state2, [e.target.name]: e.target.value });
    };
    const handlePropertyFormBond = e => {
        const bond__paid = e.target.value;
        const bond__arrears = state2.bond_required - bond__paid;

        setState2({ ...state2, [e.target.name]: bond__paid, bond_arrears: bond__arrears });
    };
    // ---------------

    const handlePostalAddForm = () => {
        setPostalAddForm(prev => !prev);
    };

    const handlePhysicalAddForm = () => {
        setPhysicalAddForm(prev => !prev);
    };

    const handleSelectGroup = e => {
        setSelectedGroup(e);
        setSelectedId(e.value);
    };

    // Select contact field data
    let option;
    if (props.contacts_list_data && optionGroupState) {
        option = props.contacts_list_data.data.map(item => ({
            options: [{ label: item.reference, value: item.id }],
        }));

        setOptionGroup(option);
        setOptionGroupState(false);
    }

    const handlePushData = () => {
        props.showContactFresh();
        if (selectedId) {
            setContactState(true);
        }
        handleClose();
        // history.push("/set/setPropertyTenantAdd/" + selectedId + "/" + id, { id: selectedId });
    };
    // ----------------

    const handleBondValues = e => {
        let value = e.target.value;
        value = +value;
        // if (!value) {
        //   setState2({...state2, rent: '', bond_required: ''});
        // }
        if (typeof value === 'number') {
            if (formTwoButtonValue.wfmBtn === 'Weekly') {
                setWeeklyRent(value);
                value *= 4;
                value = value.toFixed(2);
                setState2({ ...state2, rent: e.target.value, bond_required: value });
                setFortNightlyRent();
                setMonthlyRent();
            } else if (formTwoButtonValue.wfmBtn === 'FortNightly') {
                setFortNightlyRent(value);
                value *= 2;
                value = value.toFixed(2);
                setState2({ ...state2, rent: e.target.value, bond_required: value });
                setWeeklyRent();
                setMonthlyRent();
            } else if (formTwoButtonValue.wfmBtn === 'Monthly') {
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
    let rentByBtn;
    const handleWeeklyBondValue = e => {
        if (weeklyRent) {
            setState2({ ...state2, rent: weeklyRent });
        } else if (fortNightlyRent) {
            rentByBtn = fortNightlyRent / 2
            rentByBtn = rentByBtn.toFixed(2);
            setState2({ ...state2, rent: rentByBtn });
        } else if (monthlyRent) {
            rentByBtn = monthlyRent / 4.29
            rentByBtn = rentByBtn.toFixed(2);
            setState2({ ...state2, rent: rentByBtn });
        }
    }
    const handleFortNightlylyBondValue = e => {
        if (fortNightlyRent) {
            setState2({ ...state2, rent: fortNightlyRent });
        } else if (weeklyRent) {
            rentByBtn = weeklyRent * 2;
            rentByBtn = rentByBtn.toFixed();
            setState2({ ...state2, rent: rentByBtn });
        } else if (monthlyRent) {
            rentByBtn = monthlyRent / 2.143
            rentByBtn = rentByBtn.toFixed();
            setState2({ ...state2, rent: rentByBtn });
        }
    }
    const handleMonthlyBondValue = e => {
        if (monthlyRent) {
            setState2({ ...state2, rent: monthlyRent });
        } else if (weeklyRent) {
            rentByBtn = weeklyRent * 4.29;
            rentByBtn = rentByBtn.toFixed();
            setState2({ ...state2, rent: rentByBtn });
        } else if (fortNightlyRent) {
            rentByBtn = fortNightlyRent * 2
            rentByBtn = rentByBtn.toFixed();
            setState2({ ...state2, rent: rentByBtn });
        }
    }
    // -----------------

    const checkAddressHandler = () => {
        if (addressHandlerState) {
            setPhysicalAddress({
                ...physicalAddress,
                physical_building_name: postalAddressState.postal_building_name,
                physical_country: postalAddressState.postal_country,
                physical_number: postalAddressState.postal_number,
                physical_postcode: postalAddressState.postal_postcode,
                physical_state: postalAddressState.postal_state,
                physical_street: postalAddressState.postal_street,
                physical_suburb: postalAddressState.postal_suburb,
                physical_unit: postalAddressState.postal_unit,
            });
            setPhysicalAddForm(true);
        } else {
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
        setAddressHandlerState(prev => !prev);
    };

    return (
        <Fragment>
            <div className="d-flex flex-column justify-content-start">
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
                            (postalAddress &&
                                postalAddress.postal_building_name) ||
                            "",
                        postal_unit:
                            (postalAddress && postalAddress.postal_unit) || "",
                        postal_number:
                            (postalAddress && postalAddress.postal_number) ||
                            "",
                        postal_street:
                            (postalAddress && postalAddress.postal_street) ||
                            "",
                        postal_suburb:
                            (postalAddress && postalAddress.postal_suburb) ||
                            "",
                        postal_postcode:
                            (postalAddress && postalAddress.postal_postcode) ||
                            "",
                        postal_state:
                            (postalAddress && postalAddress.postal_state) || "",
                        postal_country:
                            (postalAddress && postalAddress.postal_country) ||
                            "",

                        physical_building_name:
                            (physicalAddress &&
                                physicalAddress.physical_building_name) ||
                            "",
                        physical_unit:
                            (physicalAddress && physicalAddress.physical_unit) ||
                            "",
                        physical_number:
                            (physicalAddress && physicalAddress.physical_number) ||
                            "",
                        physical_street:
                            (physicalAddress && physicalAddress.physical_street) ||
                            "",
                        physical_suburb:
                            (physicalAddress && physicalAddress.physical_suburb) ||
                            "",
                        physical_postcode:
                            (physicalAddress &&
                                physicalAddress.physical_postcode) ||
                            "",
                        physical_state:
                            (physicalAddress && physicalAddress.physical_state) ||
                            "",
                        physical_country:
                            (physicalAddress && physicalAddress.physical_country) ||
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
                        //   "Please Enter Reference"
                        // ),
                        company_name: Yup.string().required(
                            "Please Enter Reference"
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
                        // work_phone: Yup.string().required(
                        //   "Please Enter Work phone"
                        // ),
                        // home_phone: Yup.string().required(
                        //   "Please Enter Home phone"
                        // ),

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
                        <Form
                            className="form-horizontal"
                            id="tenant-form-1"
                        >
                            <Card>
                                <CardBody>
                                    <div className="w-75 d-flex justify-content-between align-items-center pb-1" style={{
                                        borderBottom:
                                            "1.2px dotted #c9c7c7",
                                    }}>
                                        <div>

                                            <h4 className="mb-3 text-primary">New Tenant Contact</h4>

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
                                                            className="btn btn-primary"
                                                            data-dismiss="modal"
                                                        >
                                                            Close
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
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
                                    <h4 className="mb-3 text-primary">People</h4>
                                    <div className="my-3 w-75" style={{
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
                                                {/* <Field
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
                                                      /> */}
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

                                                {/* <Field
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
                                                      /> */}
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
                                                        value={fullPostalAddress}
                                                        onChange={(e) => {
                                                            setFullPostalAddress(e.target.value);
                                                        }}
                                                        ref={inputRef}
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
                                                                        postalAddress.postal_unit
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
                                                                        postalAddress.postal_number
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
                                                                        postalAddress.postal_street
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
                                                                        postalAddress.postal_suburb
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
                                                                        postalAddress.postal_postcode
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
                                                                        postalAddress.postal_state
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
                                                                        postalAddress.postal_country
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
                                                        value={fullPhysicalAddress}
                                                        onChange={(e) => {
                                                            setFullPhysicalAddress(e.target.value);
                                                        }}
                                                        ref={inputRefPostal}
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
                                                                        physicalAddress.physical_unit
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
                                                                        physicalAddress.physical_number
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
                                                                        physicalAddress.physical_street
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
                                                                        physicalAddress.physical_suburb
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
                                                                        physicalAddress.physical_postcode
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
                                                                        physicalAddress.physical_state
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
                                                                        physicalAddress.physical_country
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
                                    <h4 className="mb-3 text-primary">Commercial</h4>
                                    <div className="my-3 w-75" style={{
                                        borderBottom:
                                            "1.2px dotted #c9c7c7",
                                    }}></div>

                                    <div className="my-3 w-75">
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
                                    <h4 className="mb-3 text-primary">Notes</h4>
                                    <div className="my-3 w-75" style={{
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

                        </Form>
                    )}
                </Formik>
            </div>
        </Fragment>
    )

};

export default Contact;