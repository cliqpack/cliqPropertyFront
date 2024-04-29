import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import moment from "moment";
import "../style.css";
import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
} from "reactstrap";
import toastr from "toastr";

import {
    addOwner,
    propertyOwnerInfoFresh,
    propertyListFresh,
    getPropertyInfo,
    getPropertyFee,
    getPropertyFeeFresh,
    propertyOwnerAddFresh,
} from "../../../store/Properties/actions";
import {
    contactList,
    showContactFresh,
    showContact, emailValidationCheck, emailValidationCheckFresh
} from "../../../store/Contacts2/actions";

import { useHistory, withRouter, useParams } from "react-router-dom";

const OwnerPaymentMethodForm = props => {
    // Form Tab State
    const [tabState, setTabState] = useState({
        activeTab: 1,
        passedSteps: [1],
        customIconActiveTab: '1',

    });

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
    const [optionGroup, setOptionGroup] = useState();
    const [optionGroupState, setOptionGroupState] = useState(true);

    const [contactState, setContactState] = useState(false);
    const [contactId, setContactId] = useState(null);

    const [phone, setPhone] = useState({
        mobile_phone: null,
        work_phone: null,
        home_phone: null,
    });

    const [state, setState] = useState({}); // Form 1 State
    const date = moment().format("yyyy-MM-DD");
    const months = moment().add(12, 'months').format('yyyy-MM-DD');
    const day = moment(months).subtract(1, 'days').format('yyyy-MM-DD');
    const [state2, setState2] = useState({
        agreement_start: date,
        agreement_end: day,
    }); // Form 2 State


    const [ownerAccess, setOwnerAccess] = useState(1); // Form 2 State

    const [show, setShow] = useState(false);
    const [postalAddForm, setPostalAddForm] = useState(false);
    const [physicalAddForm, setPhysicalAddForm] = useState(false);
    const [postalAddress, setPostalAddress] = useState({});
    const [physicalAddress, setPhysicalAddress] = useState({});

    const [state3, setState3] = useState([]);

    const [state7, setState7] = useState([]);

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

    // ----------------------------
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

    // Autocomplete address
    function inArray(needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
            if (haystack[i] == needle) return true;
        }
        return false;
    }
    // -----------------
    
    // Fees Form Handler functions
    if (enteredStateTab3) {
        setEnteredStateTab3(false);
        toggleTab(tabState.activeTab + 1);
        setFormSubmitBtnState(prev => {
            if (prev === 4) {
                return prev;
            } else return prev + 1;
        });
    }
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
    return (
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
                                                                                    "৳"
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
                                                                    "৳" && (
                                                                        <span className="input-group-append rounded-start">
                                                                            <span
                                                                                className="input-group-text"
                                                                                style={{
                                                                                    borderTopRightRadius: 0,
                                                                                    borderBottomRightRadius: 0,
                                                                                }}
                                                                            >
                                                                                ৳
                                                                            </span>
                                                                        </span>
                                                                    )}
                                                                <input
                                                                    name="split"
                                                                    type="text"
                                                                    className={"form-control"}
                                                                    onFocus={handleFocus}
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
    })(OwnerPaymentMethodForm)
);