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
    CardTitle,
    Label,
    Button,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
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

import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

const OwnerFolioForm = props => {
    // Form Tab State
    const [tabState, setTabState] = useState({
        activeTab: 1,
        passedSteps: [1],
        customIconActiveTab: '1',

    });

    const [dateCheck, setDateCheck] = useState({ nextDisburseDate: false, });
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
    const [state, setState] = useState({}); // Form 1 State
    const date = moment().format("yyyy-MM-DD");
    const months = moment().add(12, 'months').format('yyyy-MM-DD');
    const day = moment(months).subtract(1, 'days').format('yyyy-MM-DD');
    const [state2, setState2] = useState({
        agreement_start: date,
        agreement_end: day,
    }); // Form 2 State


    const [ownerAccess, setOwnerAccess] = useState(1); // Form 2 State

    const [postalAddForm, setPostalAddForm] = useState(false);
    const [physicalAddForm, setPhysicalAddForm] = useState(false);
    const [postalAddress, setPostalAddress] = useState({});
    const [physicalAddress, setPhysicalAddress] = useState({});

    const [inspectionEnableBtn, setInspectionEnableBtn] = useState(true);
    const [inspectionDisableBtn, setInspectionDisableBtn] = useState(false);

    // Fees Form State
    const [state3, setState3] = useState([]);

    const [state7, setState7] = useState([]);

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

    // Autocomplete address
    function inArray(needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
            if (haystack[i] == needle) return true;
        }
        return false;
    }
    // -----------------

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
            <Col md={12}>
                <div className="d-flex flex-column justify-content-start">
                    <div>
                        <div>
                            <div className="mb-3">
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
                                        props.toggleTab(props.tabState.activeTab + 1);
                                        props.setFormSubmitBtnState(props.formSubmitBtnState + 1);
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
                                                                            className="w-100"
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
                                                                                    <Col
                                                                                        md={3}
                                                                                        className="d-flex"
                                                                                    >
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
                                                                                                    borderTopRightRadius: 0,
                                                                                                    borderBottomRightRadius: 0,
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
                                                                                            <span className="input-group-append rounded-start">
                                                                                            <span
                                                                                                className="input-group-text"
                                                                                                style={{
                                                                                                    borderTopLeftRadius: 0,
                                                                                                    borderBottomLeftRadius: 0,
                                                                                                }}
                                                                                            >
                                                                                                ৳
                                                                                            </span>
                                                                                        </span>
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
                                                                                    <Col
                                                                                        md={3}
                                                                                        className="d-flex"
                                                                                    >
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
                                                                                                    borderTopRightRadius: 0,
                                                                                                    borderBottomRightRadius: 0,
                                                                                                }}
                                                                                                // onChange={
                                                                                                //   handlePropertyFormValuesBalanace
                                                                                                // }
                                                                                                onChange={
                                                                                                    handlePropertyFormValues2
                                                                                                }
                                                                                            />
                                                                                            <span className="input-group-append rounded-start">
                                                                                            <span
                                                                                                className="input-group-text"
                                                                                                style={{
                                                                                                    borderTopLeftRadius: 0,
                                                                                                    borderBottomLeftRadius: 0,
                                                                                                }}
                                                                                            >
                                                                                                ৳
                                                                                            </span>
                                                                                        </span>
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

                                                                                <Col md={7}>
                                                                                    <Row className="d-flex">
                                                                                        <Col className="d-flex">
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
                                                                                                        borderTopRightRadius: 0,
                                                                                                        borderBottomRightRadius: 0,
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
                                                                                            <span className="input-group-append rounded-start">
                                                                                                <span
                                                                                                    className="input-group-text"
                                                                                                    style={{
                                                                                                        borderTopLeftRadius: 0,
                                                                                                        borderBottomLeftRadius: 0,
                                                                                                    }}
                                                                                                >
                                                                                                    ৳
                                                                                                </span>
                                                                                            </span>
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
                                                                            <Row className="mt-2 mb-3 d-flex justify-content-evenly align-items-start">
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

                                                                            <Row className="mt-2 mb-3 d-flex justify-content-evenly align-items-start">
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
                                                                                                placeholder="Add a comment..."
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
                                                                        <CardTitle className="text-primary mb-2">
                                                                            Client Access
                                                                        </CardTitle>
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
    })(OwnerFolioForm)
);