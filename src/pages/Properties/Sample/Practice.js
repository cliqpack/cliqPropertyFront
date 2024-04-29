import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import moment from 'moment';

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
    contactList,
    showContactFresh,
} from "../../store/Contacts2/actions";


import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Link, useHistory, withRouter, useParams } from "react-router-dom";
import { element } from "prop-types";
const PropertyOwnerAdd2 = props => {
    // Form Tab State
    const [tabState, setTabState] = useState({
        activeTab: 1,
        passedSteps: [1],
    });
    // ---------

    // Autocomplete address
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {};

    const inputRefPostal = useRef();
    const autoCompletePostalRef = useRef();
    // ------------------------

    let { id } = useParams(); // Property ID
    const history = useHistory();

    const [formSubmitBtnState, setFormSubmitBtnState] = useState(1); // Form Submit Button State

    const [selectedId, setSelectedId] = useState();
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [optionGroup, setOptionGroup] = useState();
    const [optionGroupState, setOptionGroupState] = useState(true);

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
    // console.log(state);
    const date = moment().format("yyyy-MM-DD");

    const [state2, setState2] = useState({
        agreement_start: date,
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

    const [rows4, setRows4] = useState([]);
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

    const [enteredState, setEnteredState] = useState(false);

    const [tableInfoShow3, setTableInfoShow3] = useState(false);
    const [tableInfoShow7, setTableInfoShow7] = useState(false);
    // ----------------------

    // Payment method Form State
    const [rows5, setRows5] = useState([1]);
    const [state8, setState8] = useState([
        { selectedValues: { label: "EFT", value: "EFT" }, method: "EFT", payee: state.reference, bsb: "1", account: "1", split: "100.00", split_type_boolean: false, split_type: '%', splitTypeEnableBtn: true, splitTypeDisableBtn: false, errorState: false, error: 'none' },
    ]);
    // console.log(state8[0].bsb);

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

    const [paymentMethodError, setPaymentMethodErrror] = useState([{ falseState: false }]);


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

    // ----------------------------
    const propertyRef = props.property_info_data?.data?.data?.reference ? props.property_info_data?.data?.data?.reference : '';

    useEffect(() => {
        if (props.property_owner_add_loading === "Success") {
            props.contactList();
            toastr.success("Owner Added Successfully");
            props.propertyListFresh();
            history.push("/propertyInfo/" + id, {
                id: id,
            });
        }
        if (props.property_owner_add_loading === "Failed") {
            toastr.error("Something went wrong");
        }
        if (props.property_owner_info_loading === "Success") {
            props.propertyOwnerInfoFresh();
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
            setPhysicalAddress({ ...physicalAddress, physical_country: country, physical_state: statename, physical_postcode: postal_codeN, physical_suburb: suburbN, physical_street: streetN, physical_number: street_numberN });
            setPhysicalAddForm(true);
        });

        autoCompletePostalRef.current = new window.google.maps.places.Autocomplete(
            inputRefPostal.current,
            options
        );
        autoCompletePostalRef.current.addListener("place_changed", async function () {
            const place = await autoCompletePostalRef.current.getPlace();
            // console.log({ place });
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
            setPostalAddress({ ...postalAddress, postal_country: country, postal_state: statename, postal_postcode: postal_codeN, postal_suburb: suburbN, postal_street: streetN, postal_number: street_numberN });
            setPostalAddForm(true);
        });
        //--------------------------------
    }, [props.contacts_list_loading, props.property_owner_add_loading, props.property_owner_info_loading]);

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
        let fName = state.first_name ? state.first_name + ' ' : '';
        let lName = state.last_name ? state.last_name + ' ' : '';
        let cName = state.company_name ? '- ' + state.company_name : '';

        if (stateName === 'first_name') { fName = e.target.value + ' ' }
        if (stateName === 'last_name') { lName = e.target.value + ' ' }
        if (stateName === 'company_name') { cName = '- ' + e.target.value }

        let reference = fName + lName + cName;
        setState({ ...state, [stateName]: e.target.value, reference });

        setState8([{ selectedValues: { label: "EFT", value: "EFT" }, method: "EFT", payee: reference, bsb: "1", account: "1", split: "100.00", split_type_boolean: false, split_type: '%', splitTypeEnableBtn: true, splitTypeDisableBtn: false, errorState: false, error: 'none' }]);
    }

    const handleReferenceValues = e => {
        setState({ ...state, reference: e.target.value });
        setState8([{ selectedValues: { label: "EFT", value: "EFT" }, method: "EFT", payee: e.target.value, bsb: "1", account: "1", split: "100.00", split_type_boolean: false, split_type: '%', splitTypeEnableBtn: true, splitTypeDisableBtn: false, errorState: false, error: 'none' }]);
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
    // console.log(state2);

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

    const handleChangeInput2 = async (idx, e, type) => {
        const values = [...state7];
        values[idx][type] = e.label;
        values[idx]['selectedValues'] = e;
        if (e.value === "1") {
            values[idx]['income_account_2'] = 'Commercial Management fee (%)';
            values[idx]['fee_trigger_2'] = 'Rental receipt';
            values[idx]['notes_2'] = '';
            values[idx]['amountPlaceholder'] = '0.00%';
        } else if (e.value === "2") {
            values[idx]['income_account_2'] = 'Letting fee (inc. tax) (৳)';
            values[idx]['fee_trigger_2'] = 'First rent receipt';
            values[idx]['notes_2'] = '';
            values[idx]['amountPlaceholder'] = '0.00৳';
        } else if (e.value === "3") {
            values[idx]['income_account_2'] = 'Management fee (inc. tax) (%)';
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
            { selectedValues: {}, fee_template_1: "", income_account_1: "", fee_trigger_1: "", notes_1: "", amount_1: "" },
        ]);
    };
    const handleAddRow7 = () => {
        const item = {
            name: "",
        };
        setRows4([...rows4, item]);

        setState7([
            ...state7,
            { selectedValues: {}, fee_template_2: "", income_account_2: "", fee_trigger_2: "", notes_2: "", amount_2: "", amountPlaceholder: '' },
        ]);
    };
    // ---------------------

    // Payment Method form
    const handleRowResult2 = async e => {
        e.preventDefault();
        const values = [...state8];
        var split = 0;
        var lengthSp = state8.length;



        // let val = [...paymentMethodError];
        await state8.forEach(async (element, idx) => {
            if (lengthSp > 1) {
                split += Number(element.split);
            }
            if (element.method == "EFT") {
                console.log(element.bsb.length);
                if (element.bsb.length < 5) {
                    console.log("in");
                    values[idx]['errorState'] = true;
                    values[idx]['error'] = "BSB length Not less then 5 digit";
                    await setState8(values);
                    return;
                }
                else if (element.account == '1') {
                    values[idx]['errorState'] = true;
                    values[idx]['error'] = "Account cant be empty";
                    await setState8(values);
                    return;
                } else {
                    values[idx]['errorState'] = false;
                    values[idx]['error'] = "";
                    await setState8(values);
                }


            }
            if (split > 100) {
                console.log(split);
                values[lengthSp - 1]['errorState'] = true;
                values[lengthSp - 1]['error'] = "Invalid Percentage";
                await setState8(values);

                console.log("up");
            }
        });

        await state8.forEach(async (element, idx) => {
            console.log(element.errorState);
            if (element.errorState == false) {
                setEnteredState(true);
            } else {
                setEnteredState(false);
            }
        });
        // setPaymentMethodErrror(val);

    }

    if (enteredState) {


        console.log('enter');
        // props.addOwner(state, id, state2, phone, state3, state7, state8, ownerAccess);
        // props.propertyOwnerInfoFresh();

    }

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
            values[idx]['payee'] = state.reference;
            values[idx]['bsb'] = '';
            values[idx]['account'] = '';
        } else if (e.value === "EFT") {
            values[idx]['payee'] = state.reference;
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
        var split = 0;
        var lengthSp = state8.length;

        data[idx][e.target.name] = e.target.value;
        console.log(data);
        setState8(data);
        if (e.target.name == "split") {
            console.log(e.target.value);
            state8.forEach(async (element, idx) => {
                if (lengthSp > 1) {

                }
            });
        }

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
            { selectedValues: { label: "EFT", value: "EFT" }, method: "EFT", payee: state.reference, bsb: "1", account: "1", split: "100.00", split_type_boolean: false, split_type: '%', splitTypeEnableBtn: true, splitTypeDisableBtn: false, errorState: false, error: 'none' },
        ]);
        // setPaymentMethodErrror([...paymentMethodError, { falseState: false }]);
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

    let option;
    if (props.contacts_list_data && optionGroupState) {
        option = props.contacts_list_data.data.map(item => ({
            options: [{ label: item.reference, value: item.id }],
        }));

        setOptionGroup(option);
        setOptionGroupState(false);
    }

    const checkAddressHandler = () => {
        if (addressState) {
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
        history.push("/set/setPropertyOwnerAdd/" + selectedId + "/" + id);
    };

    return (
        <div className="page-content">
            <div className="wizard clearfix">
                <Card>
                    <CardBody>
                        <h4 className="ms-2 text-primary">Assign owner</h4>
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
                                                                (postalAddress && postalAddress.postal_building_name) || "",
                                                            postal_unit: (postalAddress && postalAddress.postal_unit) || "",
                                                            postal_number:
                                                                (postalAddress && postalAddress.postal_number) || "",
                                                            postal_street:
                                                                (postalAddress && postalAddress.postal_street) || "",
                                                            postal_suburb:
                                                                (postalAddress && postalAddress.postal_suburb) || "",
                                                            postal_postcode:
                                                                (postalAddress && postalAddress.postal_postcode) || "",
                                                            postal_state: (postalAddress && postalAddress.postal_state) || "",
                                                            postal_country:
                                                                (postalAddress && postalAddress.postal_country) || "",

                                                            physical_building_name:
                                                                (physicalAddress && physicalAddress.physical_building_name) || "",
                                                            physical_unit:
                                                                (physicalAddress && physicalAddress.physical_unit) || "",
                                                            physical_number:
                                                                (physicalAddress && physicalAddress.physical_number) || "",
                                                            physical_street:
                                                                (physicalAddress && physicalAddress.physical_street) || "",
                                                            physical_suburb:
                                                                (physicalAddress && physicalAddress.physical_suburb) || "",
                                                            physical_postcode:
                                                                (physicalAddress && physicalAddress.physical_postcode) || "",
                                                            physical_state:
                                                                (physicalAddress && physicalAddress.physical_state) || "",
                                                            physical_country:
                                                                (physicalAddress && physicalAddress.physical_country) || "",

                                                            abn: (state && state.abn) || "",
                                                            check: checkState ? checkState : [],
                                                            notes: (state && state.notes) || "",

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
                                                        //   // salutation: Yup.string().required(
                                                        //   //   "Please Enter Reference"
                                                        //   // ),
                                                        //   company_name: Yup.string().required(
                                                        //     "Please Enter Company Name"
                                                        //   ),
                                                        //   mobile_phone: Yup.string().required(
                                                        //     "Please Enter Mobile phone"
                                                        //   ),
                                                        //   work_phone: Yup.string().required(
                                                        //     "Please Enter Work Phone"
                                                        //   ),
                                                        //   home_phone: Yup.string().required(
                                                        //     "Please Enter Home Phone"
                                                        //   ),
                                                        //   email:
                                                        //     Yup.string().required("Please Enter Email"),

                                                        //   // postal_building_name: Yup.string().required(
                                                        //   //   "Please Enter Building name"
                                                        //   // ),
                                                        //   // postal_unit:
                                                        //   //   Yup.string().required("Please Enter Unit"),
                                                        //   // postal_number: Yup.string().required(
                                                        //   //   "Please Enter Number"
                                                        //   // ),
                                                        //   // postal_street: Yup.string().required(
                                                        //   //   "Please Enter Street"
                                                        //   // ),
                                                        //   // postal_suburb: Yup.string().required(
                                                        //   //   "Please Enter Suburb"
                                                        //   // ),
                                                        //   // postal_postcode: Yup.string().required(
                                                        //   //   "Please Enter Postcode"
                                                        //   // ),
                                                        //   // postal_state:
                                                        //   //   Yup.string().required("Please Enter State"),
                                                        //   // postal_country:
                                                        //   //   Yup.string().required("Please Enter State"),

                                                        //   // physical_building_name: Yup.string().required(
                                                        //   //   "Please Enter Building name"
                                                        //   // ),
                                                        //   // physical_unit:
                                                        //   //   Yup.string().required("Please Enter Unit"),
                                                        //   // physical_number: Yup.string().required(
                                                        //   //   "Please Enter Number"
                                                        //   // ),
                                                        //   // physical_street: Yup.string().required(
                                                        //   //   "Please Enter Street"
                                                        //   // ),
                                                        //   // physical_suburb: Yup.string().required(
                                                        //   //   "Please Enter Suburb"
                                                        //   // ),
                                                        //   // physical_postcode: Yup.string().required(
                                                        //   //   "Please Enter Postcode"
                                                        //   // ),
                                                        //   // physical_state:
                                                        //   //   Yup.string().required("Please Enter State"),
                                                        //   // physical_country: Yup.string().required(
                                                        //   //   "Please Enter Country"
                                                        //   // ),

                                                        //   // communication: Yup.string().required(
                                                        //   //   "Please Enter Communication"
                                                        //   // ),
                                                        //   abn: Yup.string().required("Please Enter ABN"),
                                                        //   // notes:
                                                        //   //   Yup.string().required("Please Enter Notes"),
                                                        // })}
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
                                                                                    <div className="w-75 d-flex justify-content-between align-items-center pb-1" style={{
                                                                                        borderBottom:
                                                                                            "1.2px dotted #c9c7c7",
                                                                                    }}>
                                                                                        <div>
                                                                                            <CardTitle className="mb-3">
                                                                                                <h4 className="text-primary">
                                                                                                    New Owner Contact
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
                                                                                                            <Label>Single Select</Label>
                                                                                                            <Select
                                                                                                                value={selectedGroup}
                                                                                                                onChange={handleSelectGroup}
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
                                                                                    <CardTitle className="text-primary mb-3">
                                                                                        People
                                                                                        <div className="w-75 mt-2 mb-2" style={{
                                                                                            borderBottom:
                                                                                                "1.2px dotted #c9c7c7",
                                                                                        }}></div>
                                                                                    </CardTitle>
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
                                                                                                    className={
                                                                                                        "form-control" +
                                                                                                        (errors.last_name &&
                                                                                                            touched.last_name
                                                                                                            ? " is-invalid"
                                                                                                            : "")
                                                                                                    }
                                                                                                    value={state.last_name}
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
                                                                                                    value={phone.mobile_phone}
                                                                                                    onChange={(e) => mobilePhoneHandler(e)}
                                                                                                />
                                                                                                <Field
                                                                                                    name="mobile_phone"
                                                                                                    type="hidden"
                                                                                                    className={
                                                                                                        "form-control" +
                                                                                                        (errors.mobile_phone &&
                                                                                                            touched.mobile_phone
                                                                                                            ? " is-invalid"
                                                                                                            : "")
                                                                                                    }
                                                                                                    value={phone.mobile_phone}
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
                                                                                                    className={
                                                                                                        "form-control" +
                                                                                                        (errors.work_phone &&
                                                                                                            touched.work_phone
                                                                                                            ? " is-invalid"
                                                                                                            : "")
                                                                                                    }
                                                                                                    value={phone.work_phone}
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
                                                                                                    className={
                                                                                                        "form-control" +
                                                                                                        (errors.home_phone &&
                                                                                                            touched.home_phone
                                                                                                            ? " is-invalid"
                                                                                                            : "")
                                                                                                    }
                                                                                                    value={phone.home_phone}
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
                                                                                                        (errors.email && touched.email
                                                                                                            ? " is-invalid"
                                                                                                            : "")
                                                                                                    }
                                                                                                    value={state.email}
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
                                                                                                                        handlePostalFormValues
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
                                                                                                                    value={postalAddress.postal_unit}
                                                                                                                    onChange={
                                                                                                                        handlePostalFormValues
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
                                                                                                                        handlePostalFormValues
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
                                                                                                                        handlePostalFormValues
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
                                                                                                                        handlePostalFormValues
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
                                                                                                                        handlePostalFormValues
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
                                                                                                                    value={postalAddress.postal_state}
                                                                                                                    onChange={
                                                                                                                        handlePostalFormValues
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
                                                                                                                        handlePostalFormValues
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
                                                                                                                        handlePhysicalFormValues
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
                                                                                                                        handlePhysicalFormValues
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
                                                                                                                        handlePhysicalFormValues
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
                                                                                                                        handlePhysicalFormValues
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
                                                                                                                        handlePhysicalFormValues
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
                                                                                                                        handlePhysicalFormValues
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
                                                                                                                        handlePhysicalFormValues
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
                                                                                                                        handlePhysicalFormValues
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
                                                                                                        value="print"
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
                                                                                                        Send email communications to
                                                                                                        this person
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
                                                                                                        Send SMS communications to this
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
                                                                                        <div className="w-75 mt-2 mb-2"></div>
                                                                                    </h4>
                                                                                    <div style={{
                                                                                        borderBottom:
                                                                                            "1.2px dotted #c9c7c7",
                                                                                    }} className="mb-3 w-75"></div>

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
                                                                                    <div style={{
                                                                                        borderBottom:
                                                                                            "1.2px dotted #c9c7c7",
                                                                                    }} className="mb-3 w-75"></div>
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
                                                                                                        <Col md={3}>
                                                                                                            <Label
                                                                                                                for="building"
                                                                                                                className="form-label"
                                                                                                            >
                                                                                                                When should this folio be
                                                                                                                disbursed?
                                                                                                            </Label>
                                                                                                        </Col>

                                                                                                        <Col md={9}>
                                                                                                            <Row className="d-flex mb-2">
                                                                                                                <Col md={3}>
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
                                                                                                                <Col md={3}>
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
                                                                                                                <Col md={3} className="d-flex">
                                                                                                                    <i className="fa fa-solid fa-check text-success" />
                                                                                                                    <p>
                                                                                                                        {" "}
                                                                                                                        At regular intervals
                                                                                                                    </p>
                                                                                                                </Col>
                                                                                                                <Col md={5}>
                                                                                                                    <div className="mb-3">
                                                                                                                        <Select
                                                                                                                            value={selectedGroup2}
                                                                                                                            onChange={
                                                                                                                                handleSelectGroup2
                                                                                                                            }
                                                                                                                            options={optionGroup2}
                                                                                                                            // className={
                                                                                                                            //   "form-control" +
                                                                                                                            //   (errors.regular_intervals &&
                                                                                                                            //     touched.regular_intervals
                                                                                                                            //     ? " is-invalid"
                                                                                                                            //     : "")
                                                                                                                            // }
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
                                                                                                                <Col md={3}>
                                                                                                                    <p>Next disburse date</p>
                                                                                                                </Col>
                                                                                                                <Col md={5}>
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
                                                                                                </CardBody>
                                                                                            </Card>
                                                                                            <Card>
                                                                                                <CardBody>
                                                                                                    <h4 className="text-primary mb-2">

                                                                                                        Withhold

                                                                                                    </h4>
                                                                                                    <div className="w-100" style={{
                                                                                                        borderBottom:
                                                                                                            "1.2px dotted #c9c7c7",
                                                                                                    }} />
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

                                                                                                            <Col md={7}>
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
                                                                                                    <div className="w-100" style={{
                                                                                                        borderBottom:
                                                                                                            "1.2px dotted #c9c7c7",
                                                                                                    }} />
                                                                                                    <div className="w-75">
                                                                                                        <Row className="mt-2 mb-3 justify-content-evenly align-items-start">
                                                                                                            <Col md={2}>
                                                                                                                <Label
                                                                                                                    for="building"
                                                                                                                    className="form-label"
                                                                                                                >
                                                                                                                    Agreement start
                                                                                                                </Label>
                                                                                                            </Col>

                                                                                                            <Col md={7}>
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
                                                                                                                                    // className={
                                                                                                                                    //   "form-control" +
                                                                                                                                    //   (errors.gained_reason &&
                                                                                                                                    //     touched.gained_reason
                                                                                                                                    //     ? " is-invalid"
                                                                                                                                    //     : "")
                                                                                                                                    // }
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
                                                                                                            <Col md={2}>
                                                                                                                <Label
                                                                                                                    for="building"
                                                                                                                    className="form-label"
                                                                                                                >
                                                                                                                    Agreement ends
                                                                                                                </Label>
                                                                                                            </Col>

                                                                                                            <Col md={7}>
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
                                                                                                    <CardTitle className="text-primary mb-2">

                                                                                                        Client Access

                                                                                                    </CardTitle>
                                                                                                    <div className="w-100" style={{
                                                                                                        borderBottom:
                                                                                                            "1.2px dotted #c9c7c7",
                                                                                                    }} />
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
                                                                                                                                    inspectionEnableBtn
                                                                                                                                        ? "secondary"
                                                                                                                                        : "light"
                                                                                                                                }
                                                                                                                                onClick={
                                                                                                                                    toggleInspectionEnableBtn
                                                                                                                                }
                                                                                                                            >
                                                                                                                                {inspectionEnableBtn ? (
                                                                                                                                    <i className="bx bx-comment-check me-1"></i>
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
                                                                                                                                    <i className="bx bx-comment-check me-1"></i>
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
                            <Row>
                                <Col xs="12">
                                    <div>
                                        <div>
                                            <form
                                                id="owner-form-3"
                                                encType="multipart/form-data"
                                                onSubmit={handleRowResult}
                                            >
                                                <table style={{ width: "100%" }}>
                                                    <tbody>
                                                        <Card>
                                                            <CardBody style={{ width: "100%" }}>
                                                                <CardTitle className="text-primary mb-4">
                                                                    Folio - {`${state.first_name} ${state.last_name}`} (OWN00016)
                                                                </CardTitle>
                                                                {rows3.map((item, idx) => (
                                                                    <Row key={idx} id={"addr" + idx}>
                                                                        <Col lg={2}>
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

                                                                        <Col lg={2}>
                                                                            <label htmlFor="income_account_1">
                                                                                Income account
                                                                            </label>

                                                                            <p>
                                                                                {state3[idx]['income_account_1']}
                                                                            </p>
                                                                        </Col>

                                                                        <Col lg={2}>
                                                                            <label htmlFor="fee_trigger_1">
                                                                                Fee trigger
                                                                            </label>

                                                                            <p>
                                                                                {state3[idx]['fee_trigger_1']}
                                                                            </p>
                                                                        </Col>

                                                                        <Col lg={2}>
                                                                            <label htmlFor="notes_1">
                                                                                Notes
                                                                            </label>

                                                                            <p>{state3[idx]['notes_1']}</p>
                                                                        </Col>

                                                                        <Col
                                                                            lg={2}
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
                                                                            lg={2}
                                                                            className="form-group align-self-center d-flex justify-content-end"
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
                                                                ))}

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
                                                            </CardBody>
                                                        </Card>
                                                        <Card>
                                                            <CardBody>
                                                                <CardTitle className="text-primary mb-4">
                                                                    Folio - {propertyRef} (OWN00016)
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

                                                                            <Row>
                                                                                <Col className="d-flex justify-content-center align-items-center">
                                                                                    <div className="h4 ms-1">
                                                                                        {state7[idx]['selectedValues'].value === '2' ? '৳' : ''}
                                                                                    </div>
                                                                                    <input
                                                                                        name="amount_2"
                                                                                        type="text"
                                                                                        // placeholder={state7[idx]['amountPlaceholder']}
                                                                                        className="form-control w-50"

                                                                                        onChange={e =>
                                                                                            handlePropertyFormValues7(
                                                                                                idx,
                                                                                                e
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                    <div className="h4 ms-1">
                                                                                        {state7[idx]['selectedValues'].value === '1' ? '%' : ''}
                                                                                        {state7[idx]['selectedValues'].value === '3' ? '%' : ''}
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
                                                                                    handleRemoveRow7(e, idx)
                                                                                }
                                                                                color="danger"
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
                        <TabPane tabId={4}>
                            <Row>
                                <Col xs="12">
                                    <div>
                                        <div>
                                            <form
                                                className="repeater"
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
                                                                                        value={state8[idx]['payee']}

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
                                                                                        maxLength="6"
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
                                                                                        name="account"
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
                                                                                                <div className="btn-group btn-group-sm">
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
                                                                                                <div className="btn-group btn-group-sm">
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
                                                                            >
                                                                                Remove
                                                                            </Button>
                                                                        </Col>
                                                                        {state8[idx]['errorState'] ?
                                                                            <div className="d-flex align-items-start text-warning"><i className="fas fa-exclamation-triangle me-1"></i><p>{state8[idx]['error']}</p></div> : ''}
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
    } = gstate.Contacts2;
    const { property_owner_add_loading, property_owner_info_loading, property_info_data } =
        gstate.property;
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

        property_info_data
    };
};

export default withRouter(
    connect(mapStateToProps, {
        addOwner,
        propertyOwnerInfoFresh,
        contactList,
        showContactFresh,
        propertyOwnerInfoFresh,
        propertyListFresh,
    })(PropertyOwnerAdd2)
);
