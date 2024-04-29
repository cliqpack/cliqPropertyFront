import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
    Card,
    Alert,
    CardBody,
    CardTitle,
    Col,
    Container,
    Row,
    Label,
    Input,
    Button,
    CardHeader, Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";

import {
    addProperty,
    getUser,
    getPropertyEditInfo,
    updatePropertyInfo,
    getPropertyType,
    propertyUpdateFresh,
    getPropertyInfo,
    getPropertyEditInfoFresh,
} from "../../store/Properties/actions";
import { contactList, updatePropertyInfoFromListingList } from "store/actions";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
// Form Editor

import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { Link, useHistory, useParams, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

import "flatpickr/dist/themes/material_blue.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { propTypes } from "react-bootstrap-editable";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const LoadingContainer = () => <div>Loading...</div>;

const EditPropertyModal = props => {
    const style = {
        width: "95.2%",
        height: "100%",
        borderRadius: "0 0 5px 5px",
    };
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {};
    const history = useHistory();
    const { id } = useParams(); // Property ID

    const [editPropertyState, setEditPropertyState] = useState({});
    console.log(editPropertyState);
    const [description, setDescription] = useState({});
    // console.log(editPropertyState);
    const [addressState, setAddressState] = useState({});
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(prev => !prev);
    // console.log(addressState);

    const [inspectionButtonState, setInspectionButtonState] = useState({
        routine_inspections_frequency_type: "Weekly",
        first_routine_frequency_type: "Weekly",
    });
    const [disabledState, setDisabledState] = useState(false);
    const [inspectionWeeklylyBtn, setInspectionWeeklyBtn] = useState(false);
    const [inspectionMonthlyBtn, setInspectionMonthlyBtn] = useState(false);
    const [inspectionFirstRoutineWeeklyBtn, setInspectionFirstRoutineWeeklyBtn] =
        useState(true);
    const [
        inspectionFirstRoutineMonthlyBtn,
        setInspectionFirstRoutineMonthlyBtn,
    ] = useState(false);
    const [propertyEditState, setPropertyEditState] = useState(true);
    document.title = "CliqProperty";
    const [state2, setState2] = useState({
        location: undefined,
    });
    const [mapToggle, setMapToggle] = useState(false);
    const dispatch = useDispatch();

    const [fullAddress, setFullAddress] = useState("");
    const [addressShow, setAddressShow] = useState(false);

    const toggle = () => setAddressShow(prev => !prev);

    const [defaultProps, setDefaultProps] = useState({
        lat: -33.8675,
        lng: 151.2072,
    });

    const dateHandler = (selectedDates, dateStr, instance) => {
        console.log(dateStr);
        setEditPropertyState({ ...editPropertyState, ['routine_inspection_due_date']: dateStr });
    }



    useEffect(() => {
        if (props.property_update_info_loading === "Success") {
            toastr.success("Updated Successfully");
            props.getPropertyInfo(id);
            props.propertyUpdateFresh();
            history.push("/propertyInfo/" + id);
        }
        if (props.property_edit_info_data != undefined) {
            console.log("-----------------");
            setEditPropertyState({
                ...editPropertyState,
                reference: props.property_edit_info_data?.data.data.reference,
                manager: props.property_edit_info_data?.data.data.manager_id,
                primaryType: props.property_edit_info_data?.data.data.primary_type,
                property_type: props.property_edit_info_data?.data.data.property_type,
                bedroom: props.property_edit_info_data?.data.data.bedroom,
                bathroom: props.property_edit_info_data?.data.data.bathroom,
                car_space: props.property_edit_info_data?.data.data.car_space,
                subject: props.property_edit_info_data?.data.data.subject,
                floorArea: props.property_edit_info_data?.data.data.floor_area,
                address: props.property_edit_info_data?.data.data.address,
                floorSize: props.property_edit_info_data?.data.data.floor_size,
                landSize: props.property_edit_info_data?.data.data.land_size,
                landArea: props.property_edit_info_data?.data.data.land_area,
                keyNumber: props.property_edit_info_data?.data.data.key_number,
                strataManager:
                    props.property_edit_info_data?.data.data.strata_manager_id,
                routine_inspections_frequency: Number(
                    props.property_edit_info_data?.data.data.routine_inspections_frequency
                ),
                first_routine: props.property_edit_info_data?.data.data.first_routine,
                routine_inspections_frequency_type:
                    props.property_edit_info_data?.data.data
                        .routine_inspections_frequency_type,
                note: props.property_edit_info_data?.data.data.note,
                youtube_link: props.property_edit_info_data?.data.data.youtube_link,
                vr_link: props.property_edit_info_data?.data.data.vr_link,
                routine_inspection_due_date:
                    props.property_edit_info_data?.data.data.routine_inspection_due_date,
            });
            setAddressState({
                building_name:
                    props.property_edit_info_data?.data.addressData.building_name,
                country: props.property_edit_info_data?.data.addressData.country,
                number: props.property_edit_info_data?.data.addressData.number,
                postcode: props.property_edit_info_data?.data.addressData.postcode,
                property_id: props.property_edit_info_data?.data.addressData.property_id,
                state: props.property_edit_info_data?.data.addressData.state,
                street: props.property_edit_info_data?.data.addressData.street,
                suburb: props.property_edit_info_data?.data.addressData.suburb,
                unit: props.property_edit_info_data?.data.addressData.unit,
            });
            setAddressShow(true);

            let building = props.property_edit_info_data?.data.addressData
                ?.building_name
                ? props.property_edit_info_data?.data.addressData.building_name + ", "
                : "";
            let unit = props.property_edit_info_data?.data.addressData?.unit
                ? props.property_edit_info_data?.data.addressData.unit + "/"
                : "";
            let number = props.property_edit_info_data?.data.addressData?.number
                ? props.property_edit_info_data?.data.addressData.number + " "
                : "";
            let street = props.property_edit_info_data?.data.addressData?.street
                ? props.property_edit_info_data?.data.addressData.street + ", "
                : "";
            let suburb = props.property_edit_info_data?.data.addressData?.suburb
                ? props.property_edit_info_data?.data.addressData.suburb + " "
                : "";
            let state = props.property_edit_info_data?.data.addressData?.state
                ? props.property_edit_info_data?.data.addressData.state + " "
                : "";
            let postcode = props.property_edit_info_data?.data.addressData?.postcode
                ? props.property_edit_info_data?.data.addressData.postcode + ", "
                : "";
            let country = props.property_edit_info_data?.data.addressData?.country
                ? props.property_edit_info_data?.data.addressData.country
                : "";
            setFullAddress(
                building + unit + number + street + suburb + state + postcode + country
            );

            setState2({
                ...state2,
                location: props.property_edit_info_data.data.data.location,
            });

            setDescription(
                props.property_edit_info_data.data.data.description
                    ? props.property_edit_info_data.data.data.description
                    : " "
            );

            if (props.property_edit_info_data?.data?.data?.location) {
                let arr =
                    props.property_edit_info_data?.data?.data?.location.split(",");
                setDefaultProps({
                    lat: arr[0],
                    lng: arr[1],
                });
            }

            if (
                props.property_edit_info_data.data.data
                    .routine_inspections_frequency_type === "Monthly"
            ) {
                setInspectionMonthlyBtn(true);
                setInspectionWeeklyBtn(false);
            } else {
                setInspectionMonthlyBtn(false);
                setInspectionWeeklyBtn(true);
            }
            if (
                props.property_edit_info_data.data.data.first_routine_frequency_type ===
                "Monthly"
            ) {
                setInspectionFirstRoutineMonthlyBtn(true);
                setInspectionFirstRoutineWeeklyBtn(false);
            } else {
                setInspectionFirstRoutineMonthlyBtn(false);
                setInspectionFirstRoutineWeeklyBtn(true);
            }
        }
        if (propertyEditState) {
            props.getPropertyEditInfo(props.p_id);
            setPropertyEditState(false);
        }
        if (props.user_list_loading == false) {
            props.getUser();
        }
        if (props.property_type_loading == false) {
            props.getPropertyType();
        }
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            console.log({ place });
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
            let s = streetN ? streetN + " " : "";
            let n = street_numberN ? street_numberN + " " : "";

            let reference = streetN + ", " + u + n;
            setEditPropertyState({ ...editPropertyState, reference });
            setMapToggle(false);
            setFullAddress(u + n + s + sn + pc + st + c);
            setAddressState({
                building_name: "",
                unit: unitN,
                number: street_numberN,
                suburb: suburbN,
                street: streetN,
                postcode: postal_codeN,
                state: statename,
                country: country,
            });
            setState2({
                ...state2,
                location:
                    place.geometry.location.lat() + `,` + place.geometry.location.lng(),
            });
            setDefaultProps({
                ...defaultProps,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            });
        });
        // if (editPropertyState.routine_inspections_frequency) {
        //   handleRoutineType();
        // }
    }, [
        props,
        // editPropertyState.routine_inspections_frequency
    ]);
    function inArray(needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
            if (haystack[i] == needle) return true;
        }
        return false;
    }

    let userData = undefined;
    let propertyType = undefined;
    if (props.user_list_data != null) {
        if (typeof props.user_list_data.data != "undefined") {
            userData = props.user_list_data.data.map((item, key) => (
                <option key={key} value={item.id}>
                    {item.first_name + " " + item.last_name}
                </option>
            ));
        }
    }

    if (props.property_type_loading == "Success") {
        propertyType = props.property_type_data.data.data.map((item, key) => (
            <option key={key} value={item.id}>
                {item.type}
            </option>
        ));
    }

    // console.log('----------');
    // console.log(userData, propertyType);

    // console.log(props.property_edit_info_data);

    const toggleInspectionMonthlyBtn = () => {
        setInspectionButtonState({
            ...inspectionButtonState,
            routine_inspections_frequency_type: "Monthly",
        });
        setInspectionMonthlyBtn(true);
        setInspectionWeeklyBtn(false);
    };
    const toggleInspectionWeeklyBtn = () => {
        setInspectionButtonState({
            ...inspectionButtonState,
            routine_inspections_frequency_type: "Weekly",
        });
        setInspectionWeeklyBtn(true);
        setInspectionMonthlyBtn(false);
    };

    const toggleInspectionFristRoutineMonthlyBtn = () => {
        setInspectionButtonState({
            ...inspectionButtonState,
            first_routine_frequency_type: "Monthly",
        });
        setInspectionFirstRoutineMonthlyBtn(true);
        setInspectionFirstRoutineWeeklyBtn(false);
    };
    const toggleInspectionFirstRoutineWeeklyBtn = () => {
        setInspectionButtonState({
            ...inspectionButtonState,
            first_routine_frequency_type: "Weekly",
        });
        setInspectionFirstRoutineWeeklyBtn(true);
        setInspectionFirstRoutineMonthlyBtn(false);
    };
    const handleRoutineType = e => {
        // let value = editPropertyState.routine_inspections_frequency;
        let value = e.target.value;
        setEditPropertyState(prev => ({
            ...prev,
            routine_inspections_frequency: value,
        }));
        // if (value) {
        //   setDisabledState(false);
        //   calcRotine();
        // } else {
        //   console.log('-------------yay');
        //   setDisabledState(true);
        //   setEditPropertyState({ ...editPropertyState, routine_inspection_due_date: '' });
        //   // calcRotine();
        // }

        if (value) {
            setDisabledState(false);
        } else {
            setDisabledState(true);
        }
        if (
            e.target.name == "routine_inspections_frequency" &&
            e.target.value !== ""
        ) {
            console.log("-=-=-=-=-=-");
            calcRotine(value);
        } else {
            setEditPropertyState(prev => ({
                ...prev,
                routine_inspection_due_date: "",
            }));
        }
    };
    console.log(editPropertyState);

    const calcRotine = async value => {
        let check;
        if (
            inspectionButtonState.routine_inspections_frequency_type === "Weekly" &&
            value
        ) {
            var date = new Date();
            var days = Number(value) * Number("7");
            var date_t = date.addDays(days);
            // date_get(date_t);
            let dtat = "routine_inspection_due_date";
            check = await date_get(date_t);
            await setEditPropertyState(prev => ({
                ...prev,
                ["routine_inspection_due_date"]: check,
            }));
        } else if (
            inspectionButtonState.routine_inspections_frequency_type === "Monthly" &&
            value
        ) {
            var date = new Date();
            //var days = Number(state.routine_inspections_frequency) * 30;
            var days = date.setMonth(date.getMonth() + Number(value));

            let dtat = "routine_inspection_due_date";
            check = await date_get(days);
            await setEditPropertyState(prev => ({ ...prev, [dtat]: check }));
        }
    };

    const date_get = dTime => {
        var today = undefined;
        var td = new Date(dTime);
        var dd = String(td.getDate()).padStart(2, "0");
        var mm = String(td.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = td.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        return today;
    };

    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };

    const onMapClickHandler = e => {
        console.log(e);
        // setState2({...state2, location: e.center.lat});
    };

    const moveMarker = (props, marker, e) => {
        console.log(e.latLng.lat(), e.latLng.lng());
        setDefaultProps({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        setState2({
            ...state2,
            location: e.latLng.lat() + "," + e.latLng.lng(),
        });
    };
    // console.log(state2);

    const onMarkerClick = e => {
        console.log(e.google.maps.LatLng());
    };

    const addresshandler = (e, statename) => {
        let b = addressState.building_name ? addressState.building_name + " " : "";
        let u = addressState.unit ? addressState.unit + "/" : "";
        let n = addressState.number ? addressState.number + " " : "";
        let st = addressState.street ? addressState.street + ", " : "";
        let sb = addressState.suburb ? addressState.suburb + ", " : "";
        let pc = addressState.postcode ? addressState.postcode + " " : "";
        let s = addressState.state ? addressState.state + " " : "";
        let c = addressState.country ? addressState.country + " " : "";
        if (statename === "building") {
            b = e.target.value + " ";
        } else if (statename === "unit") {
            u = e.target.value + "/";
        } else if (statename === "number") {
            n = e.target.value + " ";
        } else if (statename === "street") {
            st = e.target.value + ", ";
        } else if (statename === "suburb") {
            sb = e.target.value + ", ";
        } else if (statename === "postcode") {
            pc = e.target.value + " ";
        } else if (statename === "state") {
            s = e.target.value + " ";
        } else if (statename === "country") {
            c = e.target.value;
        }
        let address = b + u + n + st + sb + pc + s + c;
        let reference = st + u + n;
        setEditPropertyState({ ...editPropertyState, reference });
        setFullAddress(address);
        setAddressState({
            ...addressState,
            [e.target.name]: e.target.value,
        });
    };
    // console.log(state2);
    const handleSubmit = () => {
        // props.updatePropertyInfo(props.p_id, editPropertyState, editPropertyState, null);
        props.updatePropertyInfoFromListingList(props.p_id, editPropertyState, editPropertyState,)
    }

    return (
        <React.Fragment>
            <Button className="btn" color="info" onClick={toggleModal}>
                <i className="fa fa-solid fa-pen" />
            </Button>
            <Modal isOpen={show} toggle={toggleModal} size="lg">
                <ModalHeader toggle={toggleModal}>
                    <i className="bx bx-task me-1 text-primary"></i>
                    Edit Property Description
                </ModalHeader>
                <ModalBody>
                    <div className="">
                        <Container fluid={true}>
                            {/* <Breadcrumbs title="Forms" breadcrumbItem="Edit Properties" /> */}

                            <Row>
                                <Col>
                                    <div className="mb-3">
                                        {props.error ? (
                                            <Alert color="danger">
                                                {JSON.stringify(props.error.response.data.message)}
                                            </Alert>
                                        ) : null}
                                        <Formik
                                            enableReinitialize={true}
                                            initialValues={{
                                                reference:
                                                    (editPropertyState && editPropertyState.reference) || "",
                                                manager:
                                                    (editPropertyState && editPropertyState.manager) || "",

                                                building_name:
                                                    (addressState && addressState.building_name) || "",
                                                country: (addressState && addressState.country) || "",
                                                number: (addressState && addressState.number) || "",
                                                postcode: (addressState && addressState.postcode) || "",
                                                property_id:
                                                    (editPropertyState && editPropertyState.property_id) ||
                                                    "",
                                                state: (addressState && addressState.state) || "",
                                                street: (addressState && addressState.street) || "",
                                                suburb: (addressState && addressState.suburb) || "",
                                                unit: (addressState && addressState.unit) || "",
                                                primaryType:
                                                    (editPropertyState && editPropertyState.primaryType) ||
                                                    "",
                                                property_type:
                                                    (editPropertyState && editPropertyState.property_type) ||
                                                    "",
                                                bedroom:
                                                    (editPropertyState && editPropertyState.bedroom) || "",
                                                bathroom:
                                                    (editPropertyState && editPropertyState.bathroom) || "",
                                                car_space:
                                                    (editPropertyState && editPropertyState.car_space) || "",
                                                subject:
                                                    (editPropertyState && editPropertyState.subject) || "",
                                                floorSize:
                                                    (editPropertyState && editPropertyState.floorSize) || "",
                                                floorArea:
                                                    (editPropertyState && editPropertyState.floorArea) || "",
                                                // floor_area_UoM: (editPropertyState && editPropertyState.floor_area_UoM) || "",
                                                landSize:
                                                    (editPropertyState && editPropertyState.landSize) || "",
                                                landArea:
                                                    (editPropertyState && editPropertyState.landArea) || "",

                                            }}
                                            validationSchema={Yup.object().shape({
                                                reference: Yup.string().required("Please Enter Reference"),
                                                manager: Yup.string().required("Manager Name Redquired"),

                                                // building_name: Yup.string().required(
                                                //   "Please Enter Building"
                                                // ),
                                                // unit: Yup.string().required("Please Enter Unit"),
                                                // number: Yup.string().required("Please Enter Number"),
                                                // street: Yup.string().required("Please Enter Street"),
                                                // suburb: Yup.string().required("Please Enter Suburb"),
                                                // postcode: Yup.string().required("Please Enter Postcode"),
                                                // state: Yup.string().required("Please Enter State"),
                                                // country: Yup.string().required("Please Enter Country"),

                                                // floorSize: Yup.string().required("Floor Size required"),
                                                // landSize: Yup.string().required("Land Size Required"),

                                                primaryType: Yup.string().required(
                                                    "Please Enter Primary Type"
                                                ),
                                                // floorArea: Yup.string().required("Floor Area Required"),
                                                // landArea: Yup.string().required("Land Area Required"),
                                                // keyNumber: Yup.string().required("Key Number Required"),
                                                // strataManager: Yup.string().required(
                                                //   "Starta Manager Required"
                                                // ),
                                                routine_inspections_frequency:
                                                    Yup.string().required("Required"),
                                                // note: Yup.string().required("Please Enter Note"),
                                            })}
                                            onSubmit={(values, onSubmitProps) => {
                                                console.log(values);
                                                // dispatch(
                                                //     updatePropertyInfo(id, values, state2, description)
                                                // );
                                            }}
                                        >
                                            {({ errors, status, touched }) => (
                                                <Form className="form-horizontal">
                                                    <Card>
                                                        <CardBody>

                                                            <div className="mb-3">
                                                                <Row>
                                                                    <Col md={2}>
                                                                        <Label for="refernce" className="form-label">
                                                                            Reference
                                                                        </Label>
                                                                    </Col>

                                                                    <Col md={8}>
                                                                        <Field
                                                                            name="reference"
                                                                            type="text"
                                                                            onChange={event => {
                                                                                setEditPropertyState(prevEditState => ({
                                                                                    ...prevEditState,
                                                                                    reference: event.target.value,
                                                                                }));
                                                                            }}
                                                                            className={
                                                                                "form-control" +
                                                                                (errors.reference && touched.reference
                                                                                    ? " is-invalid"
                                                                                    : "")
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
                                                            <div className="mb-3">
                                                                <Row>
                                                                    <Col md={2}>
                                                                        <Label for="manager" className="form-label">
                                                                            Manager
                                                                        </Label>
                                                                    </Col>

                                                                    <Col md={8}>
                                                                        <Field
                                                                            as="select"
                                                                            name="manager"
                                                                            className="form-select"
                                                                            onChange={event => {
                                                                                setEditPropertyState(prevEditState => ({
                                                                                    ...prevEditState,
                                                                                    manager: event.target.value,
                                                                                }));
                                                                            }}
                                                                        >
                                                                            <option>Choose...</option>
                                                                            {userData}
                                                                        </Field>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </CardBody>
                                                    </Card>

                                                    <Card>
                                                        <CardBody>
                                                            <h4 className="mb-3 text-primary"> Address</h4>
                                                            <div
                                                                className="my-3"
                                                                style={{
                                                                    borderBottom: "1.2px dotted #c9c7c7",
                                                                }}
                                                            ></div>
                                                            <div className="mb-3">
                                                                <Row>
                                                                    <Col md={2}>
                                                                        <Label for="address" className="form-label">
                                                                            Address
                                                                        </Label>
                                                                    </Col>
                                                                    <Col md={8}>
                                                                        <div className="input-group d-flex">
                                                                            <input
                                                                                name="address"
                                                                                type="text"
                                                                                className={
                                                                                    "form-control" +
                                                                                    (errors.address && touched.address
                                                                                        ? " is-invalid"
                                                                                        : "")
                                                                                }
                                                                                value={fullAddress}
                                                                                onChange={e => {
                                                                                    setFullAddress(e.target.value);
                                                                                }}
                                                                                ref={inputRef}
                                                                            />
                                                                            {!addressShow ? (
                                                                                <Button
                                                                                    color="primary"
                                                                                    onClick={toggle}
                                                                                    className="d-flex justify-content-evenly align-items-center"
                                                                                >
                                                                                    Details{" "}
                                                                                    <i className="fa fa-solid fa-caret-down ms-1" />
                                                                                </Button>
                                                                            ) : (
                                                                                <Button
                                                                                    color="primary"
                                                                                    onClick={toggle}
                                                                                    className="d-flex justify-content-evenly align-items-center"
                                                                                >
                                                                                    Close
                                                                                    <i className="fas fa-times ms-1"></i>
                                                                                </Button>
                                                                            )}
                                                                        </div>

                                                                        {addressShow && (
                                                                            <div>
                                                                                <Row className="mt-2">
                                                                                    <Col md={2}>
                                                                                        <Label
                                                                                            for="building"
                                                                                            className="form-label"
                                                                                        >
                                                                                            Building Name
                                                                                        </Label>
                                                                                    </Col>

                                                                                    <Col>
                                                                                        <Field
                                                                                            name="building_name"
                                                                                            type="text"
                                                                                            className={
                                                                                                "form-control" +
                                                                                                (errors.building_name &&
                                                                                                    touched.building_name
                                                                                                    ? " is-invalid"
                                                                                                    : "")
                                                                                            }
                                                                                            value={addressState.building_name}
                                                                                            onChange={e => {
                                                                                                addresshandler(e, "building");
                                                                                            }}
                                                                                        />

                                                                                        <ErrorMessage
                                                                                            name="building_name"
                                                                                            component="div"
                                                                                            className="invalid-feedback"
                                                                                        />
                                                                                    </Col>
                                                                                </Row>

                                                                                <Row className="mt-2">
                                                                                    <Col md={2}>
                                                                                        <Label
                                                                                            for="unit"
                                                                                            className="form-label"
                                                                                        >
                                                                                            Unit
                                                                                        </Label>
                                                                                    </Col>

                                                                                    <Col>
                                                                                        <Field
                                                                                            name="unit"
                                                                                            type="text"
                                                                                            className={
                                                                                                "form-control" +
                                                                                                (errors.unit && touched.unit
                                                                                                    ? " is-invalid"
                                                                                                    : "")
                                                                                            }
                                                                                            value={addressState.unit}
                                                                                            onChange={e => {
                                                                                                addresshandler(e, "unit");
                                                                                            }}
                                                                                        />
                                                                                        <ErrorMessage
                                                                                            name="unit"
                                                                                            component="div"
                                                                                            className="invalid-feedback"
                                                                                        />
                                                                                    </Col>
                                                                                </Row>

                                                                                <Row className="mt-2">
                                                                                    <Col md={2}>
                                                                                        <Label
                                                                                            for="number"
                                                                                            className="form-label"
                                                                                        >
                                                                                            Number
                                                                                        </Label>
                                                                                    </Col>

                                                                                    <Col>
                                                                                        <Field
                                                                                            name="number"
                                                                                            type="text"
                                                                                            className={
                                                                                                "form-control" +
                                                                                                (errors.number && touched.number
                                                                                                    ? " is-invalid"
                                                                                                    : "")
                                                                                            }
                                                                                            value={addressState.number}
                                                                                            onChange={e => {
                                                                                                addresshandler(e, "number");
                                                                                            }}
                                                                                        />
                                                                                    </Col>
                                                                                    <ErrorMessage
                                                                                        name="number"
                                                                                        component="div"
                                                                                        className="invalid-feedback"
                                                                                    />
                                                                                </Row>

                                                                                <Row className="mt-2">
                                                                                    <Col md={2}>
                                                                                        <Label
                                                                                            for="street"
                                                                                            className="form-label"
                                                                                        >
                                                                                            Street
                                                                                        </Label>
                                                                                    </Col>

                                                                                    <Col>
                                                                                        <Field
                                                                                            name="street"
                                                                                            type="text"
                                                                                            className={
                                                                                                "form-control" +
                                                                                                (errors.street && touched.street
                                                                                                    ? " is-invalid"
                                                                                                    : "")
                                                                                            }
                                                                                            value={addressState.street}
                                                                                            onChange={e => {
                                                                                                addresshandler(e, "street");
                                                                                            }}
                                                                                        />

                                                                                        <ErrorMessage
                                                                                            name="street"
                                                                                            component="div"
                                                                                            className="invalid-feedback"
                                                                                        />
                                                                                    </Col>
                                                                                </Row>

                                                                                <Row className="mt-2">
                                                                                    <Col md={2}>
                                                                                        <Label
                                                                                            for="suburb"
                                                                                            className="form-label"
                                                                                        >
                                                                                            Suburb
                                                                                        </Label>
                                                                                    </Col>

                                                                                    <Col>
                                                                                        <Field
                                                                                            name="suburb"
                                                                                            type="text"
                                                                                            className={
                                                                                                "form-control" +
                                                                                                (errors.suburb && touched.suburb
                                                                                                    ? " is-invalid"
                                                                                                    : "")
                                                                                            }
                                                                                            value={addressState.suburb}
                                                                                            onChange={e => {
                                                                                                addresshandler(e, "suburb");
                                                                                            }}
                                                                                        />
                                                                                    </Col>

                                                                                    <ErrorMessage
                                                                                        name="suburb"
                                                                                        component="div"
                                                                                        className="invalid-feedback"
                                                                                    />
                                                                                </Row>

                                                                                <Row className="mt-2">
                                                                                    <Col md={2}>
                                                                                        <Label
                                                                                            for="postcode"
                                                                                            className="form-label"
                                                                                        >
                                                                                            Postcode
                                                                                        </Label>
                                                                                    </Col>

                                                                                    <Col>
                                                                                        <Field
                                                                                            name="postcode"
                                                                                            type="text"
                                                                                            className={
                                                                                                "form-control" +
                                                                                                (errors.postcode && touched.postcode
                                                                                                    ? " is-invalid"
                                                                                                    : "")
                                                                                            }
                                                                                            value={addressState.postcode}
                                                                                            onChange={e => {
                                                                                                addresshandler(e, "postcode");
                                                                                            }}
                                                                                        />
                                                                                    </Col>

                                                                                    <ErrorMessage
                                                                                        name="postcode"
                                                                                        component="div"
                                                                                        className="invalid-feedback"
                                                                                    />
                                                                                </Row>

                                                                                <Row className="mt-2">
                                                                                    <Col md={2}>
                                                                                        <Label
                                                                                            for="state"
                                                                                            className="form-label"
                                                                                        >
                                                                                            State
                                                                                        </Label>
                                                                                    </Col>

                                                                                    <Col>
                                                                                        <Field
                                                                                            name="state"
                                                                                            type="text"
                                                                                            className={
                                                                                                "form-control" +
                                                                                                (errors.state && touched.state
                                                                                                    ? " is-invalid"
                                                                                                    : "")
                                                                                            }
                                                                                            value={addressState.state}
                                                                                            onChange={e => {
                                                                                                addresshandler(e, "state");
                                                                                            }}
                                                                                        />
                                                                                    </Col>

                                                                                    <ErrorMessage
                                                                                        name="state"
                                                                                        component="div"
                                                                                        className="invalid-feedback"
                                                                                    />
                                                                                </Row>

                                                                                <Row className="mt-2">
                                                                                    <Col md={2}>
                                                                                        <Label
                                                                                            for="country"
                                                                                            className="form-label"
                                                                                        >
                                                                                            Country
                                                                                        </Label>
                                                                                    </Col>

                                                                                    <Col>
                                                                                        <Field
                                                                                            name="country"
                                                                                            type="text"
                                                                                            className={
                                                                                                "form-control" +
                                                                                                (errors.country && touched.country
                                                                                                    ? " is-invalid"
                                                                                                    : "")
                                                                                            }
                                                                                            value={addressState.country}
                                                                                            onChange={e => {
                                                                                                addresshandler(e, "country");
                                                                                            }}
                                                                                        />
                                                                                    </Col>
                                                                                    <ErrorMessage
                                                                                        name="country"
                                                                                        component="div"
                                                                                        className="invalid-feedback"
                                                                                    />
                                                                                </Row>
                                                                            </div>
                                                                        )}
                                                                    </Col>
                                                                </Row>
                                                            </div>

                                                            <div className="mb-3">
                                                                <Row>
                                                                    <Col md={2}>
                                                                        <Label for="location" className="form-label">
                                                                            Location
                                                                        </Label>
                                                                    </Col>

                                                                    <Col md={8} className="mb-3">
                                                                        <div className="input-group">
                                                                            <input
                                                                                type="text"
                                                                                className={
                                                                                    "form-control" +
                                                                                    (errors.location && touched.location
                                                                                        ? " is-invalid"
                                                                                        : "")
                                                                                }
                                                                                onClick={() =>
                                                                                    mapToggle == true
                                                                                        ? setMapToggle(false)
                                                                                        : setMapToggle(true)
                                                                                }
                                                                                id="inputGroupFile04"
                                                                                aria-describedby="inputGroupFileAddon04"
                                                                                placeholder={
                                                                                    state2.location
                                                                                        ? "Geographic location found"
                                                                                        : "No geographic location."
                                                                                }
                                                                                readOnly
                                                                            />
                                                                            <Button
                                                                                onClick={() =>
                                                                                    mapToggle == true
                                                                                        ? setMapToggle(false)
                                                                                        : setMapToggle(true)
                                                                                }
                                                                                color="light"
                                                                                type="button"
                                                                                id="inputGroupFileAddon04"
                                                                            >
                                                                                {state2.location ? (
                                                                                    <i className="fas fa-map-marker-alt text-success font-size-18"></i>
                                                                                ) : (
                                                                                    <i className="fas fa-map-marker-alt text-danger font-size-18"></i>
                                                                                )}
                                                                            </Button>
                                                                        </div>
                                                                        <ErrorMessage
                                                                            name="location"
                                                                            component="div"
                                                                            className="invalid-feedback"
                                                                        />
                                                                        {mapToggle ? (
                                                                            <div
                                                                                style={{ height: "50vh", width: "100%" }}
                                                                            >
                                                                                <Map
                                                                                    style={style}
                                                                                    google={props.google}
                                                                                    initialCenter={defaultProps}
                                                                                    zoom={12}
                                                                                    onClick={e => onMapClickHandler(e)}
                                                                                >
                                                                                    <Marker
                                                                                        position={defaultProps}
                                                                                        draggable={true}
                                                                                        onDragend={moveMarker}
                                                                                        onClick={e => {
                                                                                            onMarkerClick(e);
                                                                                        }}
                                                                                    />
                                                                                </Map>
                                                                            </div>
                                                                        ) : null}
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </CardBody>
                                                    </Card>

                                                    <Card>
                                                        <CardBody>
                                                            <h4 className="mb-3 text-primary"> Details</h4>

                                                            <div
                                                                className="my-3"
                                                                style={{
                                                                    borderBottom: "1.2px dotted #c9c7c7",
                                                                }}
                                                            ></div>
                                                            <div className="mb-3">
                                                                <Row>
                                                                    <Col md={2}>
                                                                        <Label for="primaryType" className="form-label">
                                                                            Primary Type
                                                                        </Label>
                                                                    </Col>
                                                                    <Col md={8}>
                                                                        <Field
                                                                            as="select"
                                                                            name="primaryType"
                                                                            className="form-control"
                                                                            onChange={event => {
                                                                                setEditPropertyState(prevEditState => ({
                                                                                    ...prevEditState,
                                                                                    primaryType: event.target.value,
                                                                                }));
                                                                            }}
                                                                        >
                                                                            <option>Choose</option>
                                                                            <option value="Residential">
                                                                                Residential
                                                                            </option>
                                                                            <option value="Commercial">Commercial</option>
                                                                        </Field>
                                                                        <ErrorMessage
                                                                            name="primayType"
                                                                            component="div"
                                                                            className="invalid-feedback"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </div>

                                                            <div className="mb-3">
                                                                <Row>
                                                                    <Col md={2}>
                                                                        <Label for="type" className="form-label">
                                                                            Type
                                                                        </Label>
                                                                    </Col>

                                                                    <Col md={8}>
                                                                        <Field
                                                                            as="select"
                                                                            name="type"
                                                                            className={
                                                                                "form-select" +
                                                                                (errors.type && touched.type
                                                                                    ? " is-invalid"
                                                                                    : "")
                                                                            }
                                                                            value={editPropertyState.property_type}
                                                                            onChange={event => {
                                                                                setEditPropertyState(prevEditState => ({
                                                                                    ...prevEditState,
                                                                                    property_type: event.target.value,
                                                                                }));
                                                                            }}
                                                                        >
                                                                            <option>Choose</option>
                                                                            {propertyType != undefined
                                                                                ? propertyType
                                                                                : null}
                                                                        </Field>
                                                                        <ErrorMessage
                                                                            name="type"
                                                                            component="div"
                                                                            className="invalid-feedback"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </div>

                                                            <div className="my-3">
                                                                <Row>
                                                                    <Col md={2}>
                                                                        <Label for="bedroom" className="form-label">
                                                                            Number Of
                                                                        </Label>
                                                                    </Col>

                                                                    <Col md={1}>
                                                                        <Field
                                                                            name="bedroom"
                                                                            type="text"
                                                                            className={
                                                                                "form-control" +
                                                                                (errors.bedroom && touched.bedroom
                                                                                    ? " is-invalid"
                                                                                    : "")
                                                                            }
                                                                            placeholder="0"
                                                                            value={editPropertyState.bedroom}
                                                                            onChange={event => {
                                                                                setEditPropertyState(prevEditState => ({
                                                                                    ...prevEditState,
                                                                                    bedroom: event.target.value,
                                                                                }));
                                                                            }}
                                                                        />
                                                                        <ErrorMessage
                                                                            name="bedroom"
                                                                            component="div"
                                                                            className="invalid-feedback"
                                                                        />
                                                                    </Col>
                                                                    <Col md={2}>Bedrooms</Col>
                                                                    <Col md={1}>
                                                                        <Field
                                                                            name="bathroom"
                                                                            type="text"
                                                                            className={
                                                                                "form-control" +
                                                                                (errors.bathroom && touched.bathroom
                                                                                    ? " is-invalid"
                                                                                    : "")
                                                                            }
                                                                            value={editPropertyState.bathroom}
                                                                            onChange={event => {
                                                                                setEditPropertyState(prevEditState => ({
                                                                                    ...prevEditState,
                                                                                    bathroom: event.target.value,
                                                                                }));
                                                                            }}
                                                                        />
                                                                        <ErrorMessage
                                                                            name="bathroom"
                                                                            component="div"
                                                                            className="invalid-feedback"
                                                                        />
                                                                    </Col>
                                                                    <Col md={2}>Bathrooms</Col>
                                                                    <Col md={1}>
                                                                        <Field
                                                                            name="car_space"
                                                                            type="text"
                                                                            className={
                                                                                "form-control" +
                                                                                (errors.car_space && touched.car_space
                                                                                    ? " is-invalid"
                                                                                    : "")
                                                                            }
                                                                            value={editPropertyState.car_space}
                                                                            onChange={event => {
                                                                                setEditPropertyState(prevEditState => ({
                                                                                    ...prevEditState,
                                                                                    car_space: event.target.value,
                                                                                }));
                                                                            }}
                                                                        />
                                                                        <ErrorMessage
                                                                            name="car_space"
                                                                            component="div"
                                                                            className="invalid-feedback"
                                                                        />
                                                                    </Col>
                                                                    <Col md={2}>Car Space</Col>
                                                                </Row>
                                                            </div>




                                                            <div className="mb-3">
                                                                <Row>
                                                                    <Col md={2} mb-3>
                                                                        <Label for="floorArea" className="form-label">
                                                                            Floor Area
                                                                        </Label>
                                                                    </Col>
                                                                    <Col md={2} mb-3>
                                                                        <Field
                                                                            name="floorSize"
                                                                            type="number"
                                                                            className={
                                                                                "form-control" +
                                                                                (errors.floorSize && touched.floorSize
                                                                                    ? " is-invalid"
                                                                                    : "")
                                                                            }
                                                                        />
                                                                        <ErrorMessage
                                                                            name="floorSize"
                                                                            component="div"
                                                                            className="invalid-feedback"
                                                                        />
                                                                    </Col>
                                                                    <Col md={6} mb-3>
                                                                        <Field
                                                                            as="select"
                                                                            name="floorArea"
                                                                            className="form-control"
                                                                            onChange={event => {
                                                                                setEditPropertyState(prevEditState => ({
                                                                                    ...prevEditState,
                                                                                    floorArea: event.target.value,
                                                                                }));
                                                                            }}
                                                                        >
                                                                            <option>Select FLoor Area</option>
                                                                            <option value="m2">m2</option>
                                                                            <option value="square">Square</option>
                                                                        </Field>
                                                                        <ErrorMessage
                                                                            name="floorArea"
                                                                            component="div"
                                                                            className="invalid-feedback"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </div>

                                                            <div className="mb-3">
                                                                <Row>
                                                                    <Col md={2}>
                                                                        <Label for="landArea" className="form-label">
                                                                            Land Area
                                                                        </Label>
                                                                    </Col>
                                                                    <Col md={2}>
                                                                        <Field
                                                                            name="landSize"
                                                                            type="number"
                                                                            className={
                                                                                "form-control" +
                                                                                (errors.landSize && touched.landSize
                                                                                    ? " is-invalid"
                                                                                    : "")
                                                                            }
                                                                            onChange={event => {
                                                                                setEditPropertyState(prevEditState => ({
                                                                                    ...prevEditState,
                                                                                    landSize: event.target.value,
                                                                                }));
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                    <Col md={6}>
                                                                        <div>
                                                                            <Field
                                                                                as="select"
                                                                                name="landArea"
                                                                                className="form-select"
                                                                                onChange={event => {
                                                                                    setEditPropertyState(prevEditState => ({
                                                                                        ...prevEditState,
                                                                                        landArea: event.target.value,
                                                                                    }));
                                                                                }}
                                                                            >
                                                                                <option>Choose</option>
                                                                                <option value="ac">ac</option>
                                                                                <option value="ha">ha</option>
                                                                                <option value="m">㎡</option>
                                                                                <option value="squares">squares</option>
                                                                            </Field>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </div>




                                                        </CardBody>
                                                    </Card>



                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {/* <Button
            color="info"
            onClick={e => {
              handleSubmit(e);
              toggle();
            }}
          >
            <i className="fas fa-file-alt me-1"></i>Save
          </Button> */}
                    <Button onClick={handleSubmit}>
                        <i className="fas fa-file-alt me-1"></i>Save
                    </Button>

                </ModalFooter>
            </Modal>

        </React.Fragment>
    );
};

const mapStateToProps = gstate => {
    const {
        property_list_data,
        property_list_error,
        property_list_loading,
        property_add_loading,
        user_list_data,
        user_list_error,
        user_list_loading,
        property_edit_info_data,
        property_edit_info_error,
        property_edit_info_loading,
        property_update_info_data,
        property_update_info_error,
        property_update_info_loading,

        property_type_data,
        property_type_error,
        property_type_loading,
    } = gstate.property;
    return {
        property_list_data,
        property_list_error,
        property_list_loading,
        property_add_loading,
        user_list_data,
        user_list_error,
        user_list_loading,

        property_edit_info_data,
        property_edit_info_error,
        property_edit_info_loading,

        property_update_info_data,
        property_update_info_error,
        property_update_info_loading,

        property_type_data,
        property_type_error,
        property_type_loading,
    };
};

EditPropertyModal.propTypes = {
    google: PropTypes.object,
};

export default withRouter(
    connect(mapStateToProps, {
        addProperty,
        getUser,
        getPropertyEditInfo,
        updatePropertyInfo,
        getPropertyType,
        propertyUpdateFresh,
        getPropertyInfo,
        getPropertyEditInfoFresh, updatePropertyInfoFromListingList
    })(
        GoogleApiWrapper({
            apiKey: "AIzaSyD0FeNTACOETan6R_fJ18o5kSgTyoAFabk",
            LoadingContainer: LoadingContainer,
            v: "3",
        })(EditPropertyModal)
    )
);