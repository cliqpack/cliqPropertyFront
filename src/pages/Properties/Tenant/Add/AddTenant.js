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

const AddTenant = props => {
    // Form Tab State
    const [tabState, setTabState] = useState({
        activeTab: 1,
        passedSteps: [1],
    });
    // ---------

    let { id } = useParams(); // Property ID
    const history = useHistory();

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
            // props.contactList();
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
            let c = country ? country + ", " : '';
            let st = statename ? statename + ", " : '';
            let pc = postal_codeN ? postal_codeN + ", " : '';
            let sn = suburbN ? suburbN + ", " : '';
            let s = streetN ? streetN + ", " : '';
            let n = street_numberN ? street_numberN + ", " : '';
            setFullPostalAddress(c + st + pc + sn + s + n);
            // setPostalAddressState({ ...postalAddressState, physical_country: country, physical_state: statename, physical_postcode: postal_codeN, physical_suburb: suburbN, physical_street: streetN, physical_number: street_numberN });
            setPostalAddress({ ...postalAddress, postal_country: country, postal_state: statename, postal_postcode: postal_codeN, postal_suburb: suburbN, postal_street: streetN, postal_number: street_numberN });

            setPostalAddForm(true);
        });

        autoCompletePostalRef.current = new window.google.maps.places.Autocomplete(
            inputRefPostal.current,
            options
        );
        autoCompletePostalRef.current.addListener("place_changed", async function () {
            const place = await autoCompletePostalRef.current.getPlace();
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
            let c = country ? country + ", " : '';
            let st = statename ? statename + ", " : '';
            let pc = postal_codeN ? postal_codeN + ", " : '';
            let sn = suburbN ? suburbN + ", " : '';
            let s = streetN ? streetN + ", " : '';
            let n = street_numberN ? street_numberN + ", " : '';
            setFullPhysicalAddress(c + st + pc + sn + s + n);
            // setPhysicalAddressState({ ...physicalAddressState, postal_country: country, postal_state: statename, postal_postcode: postal_codeN, postal_suburb: suburbN, postal_street: streetN, postal_number: street_numberN });
            setPhysicalAddress({ ...physicalAddress, physical_country: country, physical_state: statename, physical_postcode: postal_codeN, physical_suburb: suburbN, physical_street: streetN, physical_number: street_numberN });

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

    // Handle bond values
    // const handleBondValues = e => {
    //   let value = e.target.value;
    //   setState2({ ...state2, rent: value });
    //   value = +value;
    //   value = value.toFixed(2);
    //   if (formTwoButtonValue.wfmBtn === 'Weekly') {
    //     setWeeklyRent(value);
    //     // value *=4;
    //     // setState2({...state2, rent: value, bond_required: value});
    //     setFortNightlyRent();
    //     setMonthlyRent();
    //   } else if (formTwoButtonValue.wfmBtn === 'FortNightly') {
    //     setFortNightlyRent(value);
    //     // value *=2;
    //     // setState2({...state2, rent: value, bond_required: value});
    //     setWeeklyRent();
    //     setMonthlyRent();
    //   } else if (formTwoButtonValue.wfmBtn === 'Monthly') {
    //     setMonthlyRent(value);
    //     // value /=1.1;
    //     // setState2({...state2, rent: value, bond_required: value});
    //     setWeeklyRent();
    //     setFortNightlyRent();
    //   }
    // }
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

    document.title = "Tenant | Add Tenant";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>

                    <Row>
                        <Col lg="12">
                            <div className="wizard clearfix">
                                <Card>
                                    <CardBody>
                                        <h4 className="text-primary mb-4">New Tenant</h4>
                                        <div className="my-3" style={{
                                            borderBottom:
                                                "1.2px dotted #c9c7c7",
                                        }}></div>
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

                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId={2}>
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
                                                                            bond_paid:
                                                                                (state2 &&
                                                                                    state2.bond_paid) ||
                                                                                "",
                                                                            bond_receipted:
                                                                                (state2 &&
                                                                                    state2.bond_receipted) ||
                                                                                "",
                                                                            bond_arrears:
                                                                                (state2 &&
                                                                                    state2.bond_arrears) ||
                                                                                "",
                                                                            bond_reference:
                                                                                (state2 &&
                                                                                    state2.bond_reference) ||
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
                                                                                // bond_required:
                                                                                //   Yup.string().required(
                                                                                //     "Bond is required"
                                                                                //   ),
                                                                                // move_in: Yup.date()
                                                                                //   .typeError(
                                                                                //     "Move in Date is required"
                                                                                //   )
                                                                                //   .required(
                                                                                //     "Move in Date is required"
                                                                                //   ),
                                                                                // move_out: Yup.date()
                                                                                //   .typeError(
                                                                                //     "Move out Date is required"
                                                                                //   )
                                                                                //   .required(
                                                                                //     "Move out Date is required"
                                                                                //   )
                                                                                //   .when(
                                                                                //     "move_in",
                                                                                //     move_in => {
                                                                                //       if (move_in) {
                                                                                //         return Yup.date()
                                                                                //           .min(
                                                                                //             move_in,
                                                                                //             "Move out Date must be after Move in Date"
                                                                                //           )
                                                                                //           .typeError(
                                                                                //             "Move out Date is required"
                                                                                //           );
                                                                                //       }
                                                                                //     }
                                                                                //   ),
                                                                                // agreement_start: Yup.date()
                                                                                //   .typeError(
                                                                                //     "Agreement Start Date is required"
                                                                                //   )
                                                                                //   .required(
                                                                                //     "Agreement Start Date is required"
                                                                                //   ),
                                                                                // agreement_end: Yup.date()
                                                                                //   .typeError(
                                                                                //     "Agreement End Date is required"
                                                                                //   )
                                                                                //   .required(
                                                                                //     "Agreement End Date is required"
                                                                                //   )
                                                                                //   .when(
                                                                                //     "agreement_start",
                                                                                //     agreement_start => {
                                                                                //       if (agreement_start) {
                                                                                //         return Yup.date()
                                                                                //           .min(
                                                                                //             agreement_start,
                                                                                //             "Agreement End Date must be after Agreement Start Date"
                                                                                //           )
                                                                                //           .typeError(
                                                                                //             "Agreement End Date is required"
                                                                                //           );
                                                                                //       }
                                                                                //     }
                                                                                //   ),
                                                                                // paid_to:
                                                                                //   Yup.string().required(
                                                                                //     "Paid to date required"
                                                                                //   ),
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
                                                                            props.addPropertyTanent(
                                                                                state,
                                                                                values,
                                                                                formTwoButtonValue,
                                                                                id,
                                                                                phone,
                                                                                contactId,
                                                                            );
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

                                                                                    <div className="text-primary mb-3">


                                                                                        <Card>
                                                                                            <CardBody>
                                                                                                <h4 className="mb-3 text-primary">Add Tenant Folio</h4>



                                                                                                <div className="w-100 mt-2 mb-4" style={{
                                                                                                    borderBottom:
                                                                                                        "1.2px dotted #c9c7c7",
                                                                                                }}></div>

                                                                                                <Row className="mb-3 w-75">
                                                                                                    <Col md={4}>
                                                                                                        <Label
                                                                                                            for="rent"
                                                                                                            className="form-label text-dark"
                                                                                                        >
                                                                                                            Rent
                                                                                                        </Label>
                                                                                                    </Col>
                                                                                                    <Col md={3}>
                                                                                                        <Field
                                                                                                            name="rent"
                                                                                                            type="text"
                                                                                                            placeholder="0.00৳"
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
                                                                                                    <Col md={5}>
                                                                                                        <div className="btn-group btn-group-justified">
                                                                                                            <div className="btn-group">
                                                                                                                <Button
                                                                                                                    color={
                                                                                                                        inspectionWeeklylyBtn
                                                                                                                            ? "secondary"
                                                                                                                            : "light"
                                                                                                                    }
                                                                                                                    onClick={(e) => {
                                                                                                                        toggleInspectionWeeklyBtn(e)
                                                                                                                        handleWeeklyBondValue(e)
                                                                                                                    }}
                                                                                                                >
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
                                                                                                                    onClick={(e) => {
                                                                                                                        toggleInspectionfortnightlyBtn(e)
                                                                                                                        handleFortNightlylyBondValue(e)
                                                                                                                    }}
                                                                                                                >
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
                                                                                                                    onClick={(e) => {
                                                                                                                        toggleInspectionMonthlyBtn(e)
                                                                                                                        handleMonthlyBondValue(e)
                                                                                                                    }}
                                                                                                                >
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
                                                                                                            className="form-label text-dark"
                                                                                                        >
                                                                                                            Rent includes tax
                                                                                                        </Label>
                                                                                                    </Col>
                                                                                                    <Col md={6}>
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
                                                                                                        <Col md={3}>
                                                                                                            <Label
                                                                                                                for="bond_required"
                                                                                                                className="form-label text-dark"
                                                                                                            >
                                                                                                                Bond required
                                                                                                            </Label>
                                                                                                        </Col>
                                                                                                        <Col md={4}>
                                                                                                            <Field
                                                                                                                name="bond_required"
                                                                                                                id="bond_required"
                                                                                                                type="text"
                                                                                                                placeholder="0.00৳"
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
                                                                                                                    handlePropertyFormBond
                                                                                                                }
                                                                                                            />
                                                                                                            <ErrorMessage
                                                                                                                name="bond_required"
                                                                                                                component="div"
                                                                                                                className="invalid-feedback"
                                                                                                            />
                                                                                                        </Col>
                                                                                                        <Col className="d-flex align-items-center" md={4}>
                                                                                                            {/* <TenantBondDetails state2={state2} handlePropertyFormTwoValues={handlePropertyFormTwoValues} handlePropertyFormBond={handlePropertyFormBond} /> */}
                                                                                                            {/* <p>
                                                              <u className="d-flex">Edit bond details

                                                                <div>
                                                                  <div

                                                                    onClick={handleShowRent}
                                                                    data-toggle="modal"
                                                                    data-target="#myModal"
                                                                  >
                                                                    <i className="fas fa-pen text-primary ms-1"></i>
                                                                  </div>

                                                                  <Modal
                                                                    size="lg"

                                                                    isOpen={showRent}
                                                                    toggle={handleShowRent}
                                                                  >
                                                                    <div className="modal-header">
                                                                      <h5
                                                                        className="modal-title mt-0"
                                                                        id="myModalLabel"
                                                                      >
                                                                        <h4 className="text-primary">
                                                                          Bond For-
                                                                        </h4>
                                                                      </h5>
                                                                      <button
                                                                        type="button"
                                                                        onClick={handleShowRent}
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
                                                                      <Row>
                                                                        <Col></Col>
                                                                        <Col md={10}>
                                                                          <Row className="mb-3">
                                                                            <Col md={3}>
                                                                              <Label
                                                                                for="bond_required"
                                                                                className="form-label text-dark"
                                                                              >
                                                                                Bond required
                                                                              </Label>
                                                                            </Col>
                                                                            <Col md={3}>
                                                                              <Field
                                                                                placeholder='0.00৳'
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
                                                                                  handlePropertyFormBond
                                                                                }
                                                                              />
                                                                              <ErrorMessage
                                                                                name="bond_required"
                                                                                component="div"
                                                                                className="invalid-feedback"
                                                                              />
                                                                            </Col>
                                                                            <Col></Col>
                                                                          </Row>
                                                                          <Row className="mb-3">
                                                                            <Col md={3}>
                                                                              <Label
                                                                                for="bond_already_paid"
                                                                                className="form-label text-dark"
                                                                              >
                                                                                Bond already paid
                                                                              </Label>
                                                                            </Col>
                                                                            <Col md={3}>
                                                                              <Field
                                                                                placeholder='0.00৳'
                                                                                name="bond_already_paid"
                                                                                id="bond_already_paid"
                                                                                type="number"
                                                                                className={
                                                                                  "form-control" +
                                                                                  (errors.bond_already_paid &&
                                                                                    touched.bond_already_paid
                                                                                    ? " is-invalid"
                                                                                    : "")
                                                                                }
                                                                                value={
                                                                                  state2.bond_already_paid
                                                                                }
                                                                                onChange={
                                                                                  handlePropertyFormBond
                                                                                }
                                                                              />
                                                                              <ErrorMessage
                                                                                name="bond_already_paid"
                                                                                component="div"
                                                                                className="invalid-feedback"
                                                                              />
                                                                            </Col>
                                                                            <Col>
                                                                              <p className="text-muted">
                                                                                Bond money already paid to the bond authority
                                                                              </p>
                                                                            </Col>
                                                                          </Row>

                                                                          <Row className="mb-3">
                                                                            <Col md={3}>
                                                                              <Label
                                                                                for="bond_receipted"
                                                                                className="form-label text-dark"
                                                                              >
                                                                                Bond receipted
                                                                              </Label>
                                                                            </Col>
                                                                            <Col md={3}>
                                                                              <Field
                                                                                placeholder='0.00৳'
                                                                                name="bond_receipted"
                                                                                id="bond_receipted"
                                                                                type="number"
                                                                                disabled={true}
                                                                                className={
                                                                                  "form-control" +
                                                                                  (errors.bond_receipted &&
                                                                                    touched.bond_receipted
                                                                                    ? " is-invalid"
                                                                                    : "")
                                                                                }
                                                                                value={
                                                                                  state2.bond_receipted
                                                                                }
                                                                                onChange={
                                                                                  handlePropertyFormBond
                                                                                }
                                                                              />
                                                                              <ErrorMessage
                                                                                name="bond_receipted"
                                                                                component="div"
                                                                                className="invalid-feedback"
                                                                              />
                                                                            </Col>
                                                                            <Col>                                                                              <p className="text-muted">Bond receipted plus bond already paid</p>
                                                                            </Col>
                                                                          </Row>



                                                                          <Row className="mb-3">
                                                                            <Col md={3}>
                                                                              <Label
                                                                                for="bond_held"
                                                                                className="form-label text-dark"
                                                                              >
                                                                                Bond held
                                                                              </Label>
                                                                            </Col>
                                                                            <Col md={3}>
                                                                              <Field
                                                                                placeholder='0.00৳'
                                                                                name="bond_held"
                                                                                id="bond_held"
                                                                                type="number"
                                                                                disabled={true}
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
                                                                                  handlePropertyFormBond
                                                                                }
                                                                              />
                                                                              <ErrorMessage
                                                                                name="bond_held"
                                                                                component="div"
                                                                                className="invalid-feedback"
                                                                              />
                                                                            </Col>
                                                                            <Col>
                                                                            </Col>
                                                                          </Row>

                                                                          <Row className="mb-3">
                                                                            <Col md={3}>
                                                                              <Label
                                                                                for="bond_held"
                                                                                className="form-label text-dark"
                                                                              >
                                                                                Bond arrears
                                                                              </Label>
                                                                            </Col>
                                                                            <Col md={3}>
                                                                              <Field
                                                                                placeholder='0.00৳'
                                                                                name="bond_held"
                                                                                id="bond_held"
                                                                                type="number"
                                                                                disabled={true}
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
                                                                                  handlePropertyFormBond
                                                                                }
                                                                              />
                                                                              <ErrorMessage
                                                                                name="bond_held"
                                                                                component="div"
                                                                                className="invalid-feedback"
                                                                              />
                                                                            </Col>
                                                                            <Col>
                                                                            </Col>
                                                                          </Row>

                                                                          <Row className="mb-3">
                                                                            <Col md={3}>
                                                                              <Label
                                                                                for="bond_reference"
                                                                                className="form-label text-dark"
                                                                              >
                                                                                Bond reference
                                                                              </Label>
                                                                            </Col>
                                                                            <Col md={7}>
                                                                              <Field

                                                                                name="bond_reference"
                                                                                id="bond_reference"
                                                                                type="text"
                                                                                className={
                                                                                  "form-control" +
                                                                                  (errors.bond_reference &&
                                                                                    touched.bond_reference
                                                                                    ? " is-invalid"
                                                                                    : "")
                                                                                }
                                                                                value={
                                                                                  state2.bond_reference
                                                                                }
                                                                                onChange={
                                                                                  handlePropertyFormBond
                                                                                }
                                                                              />
                                                                              <ErrorMessage
                                                                                name="bond_reference"
                                                                                component="div"
                                                                                className="invalid-feedback"
                                                                              />
                                                                            </Col>
                                                                            <Col>
                                                                            </Col>
                                                                          </Row>

                                                                        </Col>
                                                                        <Col></Col>
                                                                      </Row>


                                                                    </div>
                                                                    <div className="modal-footer">
                                                                      <button
                                                                        type="button"
                                                                        onClick={handleShowRent}
                                                                        className="btn btn-primary"
                                                                        data-dismiss="modal"
                                                                      >
                                                                        <i className="fas fa-times me-1"></i>Close
                                                                      </button>
                                                                      <button
                                                                        type="button"
                                                                        className="btn btn-primary"

                                                                      >
                                                                        <i className="fas fa-file-alt me-1"></i> Save
                                                                      </button>
                                                                    </div>
                                                                  </Modal>
                                                                </div>
                                                              </u>

                                                            </p> */}
                                                                                                        </Col>
                                                                                                    </Row>

                                                                                                    <Row className="mb-3">
                                                                                                        <Col md={4}>
                                                                                                            <Label
                                                                                                                for="bond_held"
                                                                                                                className="form-label text-dark"
                                                                                                            >
                                                                                                                Bond held
                                                                                                            </Label>
                                                                                                        </Col>
                                                                                                        <Col md={4}>
                                                                                                            <Field
                                                                                                                name="bond_held"
                                                                                                                type="number"
                                                                                                                id="bond_held"
                                                                                                                disabled={true}
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
                                                                                                        <Col md={4}></Col>
                                                                                                    </Row>
                                                                                                </div>

                                                                                                <div className="my-3">
                                                                                                    <Row className="mb-3">
                                                                                                        <Col md={4}>
                                                                                                            <Label
                                                                                                                for="move_in"
                                                                                                                className="form-label text-dark"
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

                                                                                                            />
                                                                                                        </Col>
                                                                                                        <Col md={4}></Col>
                                                                                                    </Row>

                                                                                                    <Row className="mb-3">
                                                                                                        <Col md={3}>
                                                                                                            <Label
                                                                                                                for="move_out"
                                                                                                                className="form-label text-dark"
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
                                                                                                        <Col className="d-flex align-items-center" md={4}>
                                                                                                            {/* <TenantMoveOutDetails state2={state2} /> */}
                                                                                                        </Col>
                                                                                                    </Row>

                                                                                                    <Row className="mb-3">
                                                                                                        <Col md={4}>
                                                                                                            <Label
                                                                                                                for="agreement_start"
                                                                                                                className="form-label text-dark"
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
                                                                                                                className="form-label text-dark"
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
                                                                                                                className="form-label text-dark"
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
                                                                                                                className="form-label text-dark"
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
                                                                                                            {/* <div className="form-check mb-3">
                                                              <Label
                                                                for="defaultCheck1"
                                                                className="form-check-label text-dark"
                                                              >

                                                                Pro-rata the initial period

                                                              </Label>
                                                              <Field
                                                                name="pro-rata"
                                                                value="Print"
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                id="defaultCheck1"
                                                              />
                                                            </div> */}

                                                                                                        </Col>
                                                                                                    </Row>

                                                                                                    <Row className="mb-3">
                                                                                                        <Col md={4}>
                                                                                                            <Label
                                                                                                                for="part_paid"
                                                                                                                className="form-label text-dark"
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
                                                                                                                className="form-label text-dark"
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
                                                                                                                className="form-label text-dark"
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
                                                                                                                className="form-label text-dark"
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
                                                                                                                className="form-label text-dark"
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
                                                                                                                className="form-label text-dark"
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
                                                                                                <h4 className="mb-3 text-primary"> Options</h4>

                                                                                                <div className="w-100 mt-2 mb-4" style={{
                                                                                                    borderBottom:
                                                                                                        "1.2px dotted #c9c7c7",
                                                                                                }}></div>

                                                                                                <div className="mb-3 w-75">
                                                                                                    <Row className="mb-3">
                                                                                                        <Col md={2}>
                                                                                                            <Label
                                                                                                                for="bank_reterence"
                                                                                                                className="form-label text-dark"
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
                                                                                                                className="form-label text-dark"
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
                                                                                                <div className="mb-3 w-75">
                                                                                                    <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                                                                        <Col md={4}>
                                                                                                            <Label
                                                                                                                for="building"
                                                                                                                className="form-label text-dark"
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
            </div >
        </React.Fragment >
    );
};

const mapStateToProps = gstate => {
    const { property_add_tanent_loading } = gstate.property;
    const { contacts_list_data, contacts_list_loading, contacts_show_data, } = gstate.Contacts2;
    return {
        property_add_tanent_loading,
        contacts_list_data,
        contacts_list_loading,

        contacts_show_data,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        addPropertyTanent,
        propertyTenantInfoFresh,
        contactList,
        showContactFresh,
        propertyListFresh,
        showContact,
    })(AddTenant)
);
