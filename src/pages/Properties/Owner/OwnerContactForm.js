import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "../style.css";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Label,
    Modal,
    Button,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
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
} from "../../../store/Properties/actions";
import {
    contactList,
    showContactFresh,
    showContact, emailValidationCheck, emailValidationCheckFresh
} from "../../../store/Contacts2/actions";

import { useHistory, withRouter, useParams } from "react-router-dom";

const OwnerContactForm = props => {

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

    const [state, setState] = useState({}); // Form 1 State

    const [addressState, setAddressState] = useState(true);

    const [show, setShow] = useState(false);
    const [postalAddForm, setPostalAddForm] = useState(false);
    const [physicalAddForm, setPhysicalAddForm] = useState(false);
    const [postalAddress, setPostalAddress] = useState({});
    const [physicalAddress, setPhysicalAddress] = useState({});

    // Payment method state
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
    // Fees Form Handler functions


    if (enteredStateTab3) {
        setEnteredStateTab3(false);
        props.toggleTab(props.tabState.activeTab + 1);
        setFormSubmitBtnState(prev => {
            if (prev === 4) {
                return prev;
            } else return prev + 1;
        });
    }
    // ---------------------

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
    };
    return (
        <Row>
            <Col sm="12">
                <div className="d-flex flex-column justify-content-start">
                    <div>
                        <div>
                            <div className="mb-3">

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
                                            (postalAddress &&
                                                postalAddress.postal_building_name) ||
                                            "",
                                        postal_unit:
                                            (postalAddress && postalAddress.postal_unit) ||
                                            "",
                                        postal_number:
                                            (postalAddress &&
                                                postalAddress.postal_number) ||
                                            "",
                                        postal_street:
                                            (postalAddress &&
                                                postalAddress.postal_street) ||
                                            "",
                                        postal_suburb:
                                            (postalAddress &&
                                                postalAddress.postal_suburb) ||
                                            "",
                                        postal_postcode:
                                            (postalAddress &&
                                                postalAddress.postal_postcode) ||
                                            "",
                                        postal_state:
                                            (postalAddress && postalAddress.postal_state) ||
                                            "",
                                        postal_country:
                                            (postalAddress &&
                                                postalAddress.postal_country) ||
                                            "",

                                        physical_building_name:
                                            (physicalAddress &&
                                                physicalAddress.physical_building_name) ||
                                            "",
                                        physical_unit:
                                            (physicalAddress &&
                                                physicalAddress.physical_unit) ||
                                            "",
                                        physical_number:
                                            (physicalAddress &&
                                                physicalAddress.physical_number) ||
                                            "",
                                        physical_street:
                                            (physicalAddress &&
                                                physicalAddress.physical_street) ||
                                            "",
                                        physical_suburb:
                                            (physicalAddress &&
                                                physicalAddress.physical_suburb) ||
                                            "",
                                        physical_postcode:
                                            (physicalAddress &&
                                                physicalAddress.physical_postcode) ||
                                            "",
                                        physical_state:
                                            (physicalAddress &&
                                                physicalAddress.physical_state) ||
                                            "",
                                        physical_country:
                                            (physicalAddress &&
                                                physicalAddress.physical_country) ||
                                            "",

                                        abn: (state && state.abn) || "",
                                        check: checkState ? checkState : [],
                                        notes: (state && state.notes) || "",
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
                                        // company_name: Yup.string().required(
                                        //   "Please Enter Company Name"
                                        // ),
                                        email: Yup.string().email(
                                            "Field should contain a valid e-mail"
                                        )
                                            .max(255)
                                            .required("E-mail is required"),
                                        // mobile_phone: Yup.string().required(
                                        //   "Please Enter Mobile phone"
                                        // ),
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
                                        // abn: Yup.string().required(
                                        //   "Please Enter ABN"
                                        // ),
                                        // notes: Yup.string().required(
                                        //   "Please Enter Reference"
                                        // ),
                                    })}
                                    onSubmit={(values, onSubmitProps) => {
                                        setState(values);
                                        props.toggleTab(props.tabState.activeTab + 1);
                                        props.setFormSubmitBtnState(props.formSubmitBtnState + 1);
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
                                                                <div
                                                                    className="w-75 d-flex justify-content-between align-items-center pb-1"
                                                                    style={{
                                                                        borderBottom:
                                                                            "1.2px dotted #c9c7c7",
                                                                    }}
                                                                >
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
                                                                                        <Select
                                                                                            value={selectedGroup}
                                                                                            onChange={
                                                                                                handleSelectGroup
                                                                                            }
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
                                                                    <div
                                                                        className="w-75 mt-2 mb-2"
                                                                        style={{
                                                                            borderBottom:
                                                                                "1.2px dotted #c9c7c7",
                                                                        }}
                                                                    ></div>
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
                                                                                    referenceHandler(
                                                                                        e,
                                                                                        "first_name"
                                                                                    )
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
                                                                                    referenceHandler(
                                                                                        e,
                                                                                        "last_name"
                                                                                    )
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
                                                                                    referenceHandler(
                                                                                        e,
                                                                                        "company_name"
                                                                                    )
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
                                                                            <Field
                                                                                name="mobile_phone"
                                                                                type="text"
                                                                                className={
                                                                                    "form-control" +
                                                                                    (errors.mobile_phone &&
                                                                                        touched.mobile_phone
                                                                                        ? " is-invalid"
                                                                                        : "")
                                                                                }
                                                                                value={phone.mobile_phone}
                                                                                onChange={mobilePhoneHandler}
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
                                                                            <Field
                                                                                name="work_phone"
                                                                                type="text"
                                                                                className={
                                                                                    "form-control" +
                                                                                    (errors.work_phone &&
                                                                                        touched.work_phone
                                                                                        ? " is-invalid"
                                                                                        : "")
                                                                                }
                                                                                value={phone.work_phone}
                                                                                onChange={e => {
                                                                                    setPhone({
                                                                                        ...phone,
                                                                                        work_phone:
                                                                                            e.target.value,
                                                                                    });
                                                                                }}
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
                                                                            <Field
                                                                                name="home_phone"
                                                                                type="text"
                                                                                className={
                                                                                    "form-control" +
                                                                                    (errors.home_phone &&
                                                                                        touched.home_phone
                                                                                        ? " is-invalid"
                                                                                        : "")
                                                                                }
                                                                                value={phone.home_phone}
                                                                                onChange={e => {
                                                                                    setPhone({
                                                                                        ...phone,
                                                                                        home_phone:
                                                                                            e.target.value,
                                                                                    });
                                                                                }}
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
                                                                                    (errors.email &&
                                                                                        touched.email
                                                                                        ? " is-invalid"
                                                                                        : "")
                                                                                }
                                                                                value={state.email}
                                                                                onChange={e =>
                                                                                    emailHandler(e)
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
                                                                                    value={fullPostalAddress}
                                                                                    onChange={e => {
                                                                                        setFullPostalAddress(
                                                                                            e.target.value
                                                                                        );
                                                                                    }}
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

                                                                                                onChange={e => {
                                                                                                    addresshandler(e, "postal_building_name");
                                                                                                }}
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

                                                                                                onChange={e => {
                                                                                                    addresshandler(e, "postal_unit");
                                                                                                }}
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

                                                                                                onChange={e => {
                                                                                                    addresshandler(e, "postal_number");
                                                                                                }}
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

                                                                                                onChange={e => {
                                                                                                    addresshandler(e, "postal_street");
                                                                                                }}
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

                                                                                                onChange={e => {
                                                                                                    addresshandler(e, "postal_suburb");
                                                                                                }}
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
                                                                                                onChange={e => {
                                                                                                    addresshandler(e, "postal_postcode");
                                                                                                }}
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
                                                                                                onChange={e => {
                                                                                                    addresshandler(e, "postal_state");
                                                                                                }}
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
                                                                                                onChange={e => {
                                                                                                    addresshandler(e, "postal_country");
                                                                                                }}
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
                                                                                    value={fullPhysicalAddress}
                                                                                    onChange={e => {
                                                                                        setFullPhysicalAddress(
                                                                                            e.target.value
                                                                                        );
                                                                                    }}
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
                                                                                                onChange={e => {
                                                                                                    addresshandlerPhysical(e, "physical_building_name");
                                                                                                }}
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
                                                                                                onChange={e => {
                                                                                                    addresshandlerPhysical(e, "physical_unit");
                                                                                                }}
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
                                                                                                onChange={e => {
                                                                                                    addresshandlerPhysical(e, "physical_number");
                                                                                                }}
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
                                                                                                onChange={e => {
                                                                                                    addresshandlerPhysical(e, "physical_street");
                                                                                                }}
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
                                                                                                onChange={e => {
                                                                                                    addresshandlerPhysical(e, "physical_suburb");
                                                                                                }}
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
                                                                                                onChange={e => {
                                                                                                    addresshandlerPhysical(e, "physical_postcode");
                                                                                                }}
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
                                                                                                onChange={e => {
                                                                                                    addresshandlerPhysical(e, "physical_state");
                                                                                                }}
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
                                                                                                onChange={e => {
                                                                                                    addresshandlerPhysical(e, "physical_country");
                                                                                                }}
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
                                                                                    Print statements and notices
                                                                                    for this person
                                                                                </Label>
                                                                                <Field
                                                                                    name="communication"
                                                                                    type="checkbox"
                                                                                    className="form-check-input"
                                                                                    value="Print"
                                                                                    id="defaultCheck1"
                                                                                    onClick={e =>
                                                                                        communicationHandler(e)
                                                                                    }
                                                                                    checked={
                                                                                        forCheck.printCheck ===
                                                                                            true
                                                                                            ? true
                                                                                            : false
                                                                                    }
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
                                                                                    onClick={e =>
                                                                                        communicationHandler(e)
                                                                                    }
                                                                                    checked={
                                                                                        forCheck.emailCheck ===
                                                                                            true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="form-check mb-3">
                                                                                <Label
                                                                                    for="defaultCheck3"
                                                                                    className="form-check-label"
                                                                                >
                                                                                    Send SMS communications to
                                                                                    this person
                                                                                </Label>
                                                                                <Field
                                                                                    name="communication"
                                                                                    type="checkbox"
                                                                                    className="form-check-input"
                                                                                    value="SMS"
                                                                                    id="defaultCheck3"
                                                                                    checked={
                                                                                        forCheck.smsCheck === true
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onClick={e =>
                                                                                        communicationHandler(e)
                                                                                    }
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
                                                                <div
                                                                    style={{
                                                                        borderBottom:
                                                                            "1.2px dotted #c9c7c7",
                                                                    }}
                                                                    className="mb-3 w-75"
                                                                ></div>

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
                                                                <div
                                                                    style={{
                                                                        borderBottom:
                                                                            "1.2px dotted #c9c7c7",
                                                                    }}
                                                                    className="mb-3 w-75"
                                                                ></div>
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
                                                                                    (errors.notes &&
                                                                                        touched.notes
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
    })(OwnerContactForm)
);