import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Select from "react-select";
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
    Modal,
    Input,
    Button,
    CardHeader,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";

//common
// import TextualInputs from "./TextualInputs"
import { addContact, showContact, showContactFresh } from "../../store/Contacts2/actions";

import { Link, useHistory, useLocation, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { propTypes } from "react-bootstrap-editable";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Contacts = props => {
    const history = useHistory();
    const location = useLocation();
    const [state, setState] = useState({});

    document.title = "Contacts | My Day";

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (props.contacts_add_loading == "Success") {
            toastr.success("Success");
        }
        if (props.contacts_show_loading === false) {
            props.showContact(location.state.id);
        }
        if (props.contacts_show_data) {
            setState({
                ...state,
                reference: props.contacts_show_data.data.reference,
                first_name: props.contacts_show_data.data.first_name,
                last_name: props.contacts_show_data.data.last_name,
                salutation: props.contacts_show_data.data.salutation,
                company_name: props.contacts_show_data.data.company_name,
                mobile_phone: props.contacts_show_data.data.mobile_phone,
                work_phone: props.contacts_show_data.data.work_phone,
                home_phone: props.contacts_show_data.data.home_phone,
                email: props.contacts_show_data.data.email,
                abn: props.contacts_show_data.data.abn,
                notes: props.contacts_show_data.data.notes,
            });
        }
    }, [
        props.contacts_add_loading,
        props.contacts_show_loading,
        props.contacts_show_data,
        location,
    ]);

    console.log(props.contacts_show_data);

    const tog_standard = route => {
        setTogState(prevTogState => !prevTogState);
        setRoute(route);
    };
    const handleSelectGroup = (e) => {
        setSelectedGroup(e);
        setSelectedId(e.value);
    }

    const dispatch = useDispatch();
  
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <div className="d-flex flex-column justify-content-start">
                        {/* <Breadcrumbs title="Forms" breadcrumbItem="New Contact" /> */}
                        <CardTitle className="mb-2">
                            <h3 className="text-primary">New Contact</h3>
                        </CardTitle>

                        <div className="py-2 ps-3">
                        <div>
                            <div className="mb-3">
                            {props.error ? (
                                <Alert color="danger">
                                {JSON.stringify(props.error.response.data.message)}
                                </Alert>
                            ) : null}
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                reference: (state && state.reference) || "",
                                first_name: (state && state.first_name) || "",

                                last_name: (state && state.last_name) || "",
                                salutation: (state && state.salutation) || "",
                                company_name: (state && state.company_name) || "",
                                mobile_phone: (state && state.mobile_phone) || "",
                                work_phone: (state && state.work_phone) || "",
                                home_phone: (state && state.home_phone) || "",
                                email: (state && state.email) || "",

                                postal_building_name:
                                    (state && state.postal_building_name) || "",
                                postal_unit: (state && state.postal_unit) || "",
                                postal_number: (state && state.postal_number) || "",
                                postal_street: (state && state.postal_street) || "",
                                postal_suburb: (state && state.postal_suburb) || "",
                                postal_postcode: (state && state.postal_postcode) || "",
                                postal_state: (state && state.postal_state) || "",
                                postal_country: (state && state.postal_country) || "",

                                physical_building_name:
                                    (state && state.physical_building_name) || "",
                                physical_unit: (state && state.physical_unit) || "",
                                physical_number: (state && state.physical_number) || "",
                                physical_street: (state && state.physical_street) || "",
                                physical_suburb: (state && state.physical_suburb) || "",
                                physical_postcode:
                                    (state && state.physical_postcode) || "",
                                physical_state: (state && state.physical_state) || "",
                                physical_country: (state && state.physical_country) || "",

                                abn: (state && state.abn) || "",

                                notes: (state && state.notes) || "",
                                }}
                                validationSchema={Yup.object().shape({
                                reference: Yup.string().required(
                                    "Please Enter Reference"
                                ),
                                first_name: Yup.string().required(
                                    "Please Enter Reference"
                                ),
                                last_name: Yup.string().required(
                                    "Please Enter Reference"
                                ),
                                salutation: Yup.string().required(
                                    "Please Enter Reference"
                                ),
                                company_name: Yup.string().required(
                                    "Please Enter Reference"
                                ),
                                mobile_phone: Yup.string().required(
                                    "Please Enter Reference"
                                ),
                                work_phone: Yup.string().required(
                                    "Please Enter Reference"
                                ),
                                home_phone: Yup.string().required(
                                    "Please Enter Reference"
                                ),
                                email: Yup.string().required("Please Enter Reference"),

                                // postal_building_name: Yup.string().required(
                                //     "Please Enter Building"
                                // ),
                                // postal_unit: Yup.string().required("Please Enter Unit"),
                                // postal_number: Yup.string().required(
                                //     "Please Enter Number"
                                // ),
                                // postal_street: Yup.string().required(
                                //     "Please Enter Street"
                                // ),
                                // postal_suburb: Yup.string().required(
                                //     "Please Enter Suburb"
                                // ),
                                // postal_postcode: Yup.string().required(
                                //     "Please Enter Postcode"
                                // ),
                                // postal_state: Yup.string().required("Please Enter State"),
                                // postal_country: Yup.string().required(
                                //     "Please Enter Country"
                                // ),

                                // physical_building_name: Yup.string().required(
                                //     "Please Enter Building"
                                // ),
                                // physical_unit: Yup.string().required("Please Enter Unit"),
                                // physical_number: Yup.string().required(
                                //     "Please Enter Number"
                                // ),
                                // physical_street: Yup.string().required(
                                //     "Please Enter Street"
                                // ),
                                // physical_suburb: Yup.string().required(
                                //     "Please Enter Suburb"
                                // ),
                                // physical_postcode: Yup.string().required(
                                //     "Please Enter Postcode"
                                // ),
                                // physical_state:
                                //     Yup.string().required("Please Enter State"),
                                // physical_country: Yup.string().required(
                                //     "Please Enter Country"
                                // ),

                                // communication: Yup.string().required(
                                //   "Please Enter Reference"
                                // ),
                                abn: Yup.string().required("Please Enter Reference"),
                                notes: Yup.string().required("Please Enter Reference"),
                                })}
                                onSubmit={(values, onSubmitProps) => {
                                console.log(values);
                                dispatch(addContact(values));
                                onSubmitProps.resetForm();
                                }}
                            >
                                {({ errors, status, touched }) => (
                                <div>
                                    <Row className="d-flex justify-content-between g-5 mb-2">
                                    <Col md={6}>
                                        <div className="border-bottom">
                                        <CardTitle className="mb-3 text-primary text-primary">
                                            Contact
                                        </CardTitle>
                                        </div>
                                    </Col>
                                    </Row>

                                    <div
                                    style={{ height: "60vh" }}
                                    className="overflow-auto w-100"
                                    >
                                    <Form className="form-horizontal">
                                        <div className="w-75 d-flex justify-content-between align-items-center">
                                            <CardTitle className="mb-3">
                                                <h4 className="text-primary">New Contact</h4>
                                            </CardTitle>
                                        </div>
                                        <div className="my-3 w-75">
                                            <Row className="d-flex justify-content-evenly align-items-center">
                                                <Col md={2}>
                                                    <Label for="reference" className="form-label">
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
                                                        (errors.reference && touched.reference
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        onChange={(e)=>{
                                                            setState({
                                                                ...state,
                                                                reference: e.target.value
                                                            })
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name="reference"
                                                        component="div"
                                                        className="invalid-feedback"
                                                    />
                                                </Col>
                                            </Row>
                                        </div>

                                        <CardTitle className="text-primary mb-3">
                                            People
                                        </CardTitle>
                                        <div className="mb-3 w-75">
                                            <Row className="mt-2 mb-3 justify-content-evenly align-items-center">
                                                <Col md={2}>
                                                    <Label for="building" className="form-label">
                                                        First Name
                                                    </Label>
                                                </Col>

                                                <Col md={8}>
                                                    <Field
                                                        name="first_name"
                                                        type="text"
                                                        className={
                                                        "form-control" +
                                                        (errors.first_name && touched.first_name
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        value={state.first_name}
                                                        onChange={(e)=>{
                                                            setState({
                                                                ...state,
                                                                first_name: e.target.value
                                                            })
                                                        }}
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
                                                    <Label for="last_name" className="form-label">
                                                        Last Name
                                                    </Label>
                                                </Col>

                                                <Col md={8}>
                                                    <Field
                                                        name="last_name"
                                                        type="text"
                                                        className={
                                                        "form-control" +
                                                        (errors.last_name && touched.last_name
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        value={state.last_name}
                                                        onChange={(e)=>{
                                                            setState({
                                                                ...state,
                                                                last_name: e.target.value
                                                            })
                                                        }}
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
                                                    <Label for="building" className="form-label">
                                                        Salutation
                                                    </Label>
                                                </Col>

                                                <Col md={8}>
                                                    <Field
                                                        name="salutation"
                                                        type="text"
                                                        className={
                                                        "form-control" +
                                                        (errors.salutation && touched.salutation
                                                            ? " is-invalid"
                                                            : "")
                                                        }
                                                        value={state.salutation}
                                                        onChange={(e)=>{
                                                            setState({
                                                                ...state,
                                                                salutation: e.target.value
                                                            })
                                                        }}
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
                                                        onChange={(e)=>{
                                                            setState({
                                                                ...state,
                                                                company_name: e.target.value
                                                            })
                                                        }}
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
                                                value={state.mobile_phone}
                                                onChange={(e)=>{
                                                    setState({
                                                        ...state,
                                                        mobile_phone: e.target.value
                                                    })
                                                }}
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
                                                (errors.work_phone && touched.work_phone
                                                    ? " is-invalid"
                                                    : "")
                                                }
                                                value={state.work_phone}
                                                onChange={(e)=>{
                                                    setState({
                                                        ...state,
                                                        work_phone: e.target.value
                                                    })
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
                                            <Label for="building" className="form-label">
                                                Home phone
                                            </Label>
                                            </Col>

                                            <Col md={8}>
                                            <Field
                                                name="home_phone"
                                                type="text"
                                                className={
                                                "form-control" +
                                                (errors.home_phone && touched.home_phone
                                                    ? " is-invalid"
                                                    : "")
                                                }
                                                value={state.home_phone}
                                                onChange={(e)=>{
                                                    setState({
                                                        ...state,
                                                        home_phone: e.target.value
                                                    })
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
                                            <Label for="email" className="form-label">
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
                                                onChange={(e)=>{
                                                    setState({
                                                        ...state,
                                                        email: e.target.value
                                                    })
                                                }}
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
                                            <Label for="address" className="form-label">
                                                Postal Address
                                            </Label>
                                            </Col>
                                            <Col md={8}>
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

                                            <div>
                                                <Row className="mt-3">
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
                                                    name="postal_building_name"
                                                    type="text"
                                                    className={
                                                        "form-control" +
                                                        (errors.postal_building_name &&
                                                        touched.postal_building_name
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    value={state.postal_building_name}
                                                    onChange={(e)=>{
                                                        setState({
                                                            ...state,
                                                            postal_building_name: e.target.value
                                                        })
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

                                                <Col>
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
                                                    onChange={(e)=>{
                                                        setState({
                                                            ...state,
                                                            postal_unit: e.target.value
                                                        })
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

                                                <Col>
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
                                                    value={state.postal_number}
                                                    onChange={(e)=>{
                                                        setState({
                                                            ...state,
                                                            postal_number: e.target.value
                                                        })
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

                                                <Col>
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
                                                    value={state.postal_street}
                                                    onChange={(e)=>{
                                                        setState({
                                                            ...state,
                                                            postal_street: e.target.value
                                                        })
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

                                                <Col>
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
                                                    value={state.postal_suburb}
                                                    onChange={(e)=>{
                                                        setState({
                                                            ...state,
                                                            postal_suburb: e.target.value
                                                        })
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

                                                <Col>
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
                                                    value={state.postal_postcode}
                                                    onChange={(e)=>{
                                                        setState({
                                                            ...state,
                                                            postal_postcode: e.target.value
                                                        })
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

                                                <Col>
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
                                                    onChange={(e)=>{
                                                        setState({
                                                            ...state,
                                                            postal_state: e.target.value
                                                        })
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

                                                <Col>
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
                                                    value={state.postal_country}
                                                    onChange={(e)=>{
                                                        setState({
                                                            ...state,
                                                            postal_country: e.target.value
                                                        })
                                                    }}
                                                    />
                                                </Col>
                                                <ErrorMessage
                                                    name="postal_country"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                                </Row>
                                            </div>
                                            </Col>
                                        </Row>

                                        <Row className="mt-3 justify-content-evenly align-items-start">
                                            <Col md={2}>
                                            <Label for="address" className="form-label">
                                                Physical Address
                                            </Label>
                                            </Col>
                                            <Col md={8}>
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

                                                <Col>
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
                                                    value={state.physical_building_name}
                                                    onChange={(e)=>{
                                                        setState({
                                                            ...state,
                                                            physical_building_name: e.target.value
                                                        })
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

                                                <Col>
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
                                                    value={state.physical_unit}
                                                    onChange={(e)=>{
                                                        setState({
                                                            ...state,
                                                            physical_unit: e.target.value
                                                        })
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

                                                <Col>
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
                                                    value={state.physical_number}
                                                    onChange={(e)=>{
                                                        setState({
                                                            ...state,
                                                            physical_number: e.target.value
                                                        })
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

                                                <Col>
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
                                                    value={state.physical_street}
                                                    onChange={(e)=>{
                                                        setState({
                                                            ...state,
                                                            physical_street: e.target.value
                                                        })
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

                                                <Col>
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
                                                    value={state.physical_suburb}
                                                    onChange={(e)=>{
                                                        setState({
                                                            ...state,
                                                            physical_suburb: e.target.value
                                                        })
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

                                                <Col>
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
                                                    value={state.physical_postcode}
                                                    onChange={(e)=>{
                                                        setState({
                                                            ...state,
                                                            physical_postcode: e.target.value
                                                        })
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

                                                <Col>
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
                                                    value={state.physical_state}
                                                    onChange={(e)=>{
                                                        setState({
                                                            ...state,
                                                            physical_state: e.target.value
                                                        })
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

                                                <Col>
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
                                                    value={state.physical_country}
                                                    onChange={(e)=>{
                                                        setState({
                                                            ...state,
                                                            physical_country: e.target.value
                                                        })
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
                                            </Col>
                                        </Row>
                                        </div>

                                        <div className="mb-3 w-75">
                                        {/* <Row className="justify-content-md-center align-items-md-start g-4">
                                            <Col md={2}>
                                                {" "}
                                                <Label
                                                for="building"
                                                className="form-label"
                                                >
                                                Communication
                                                </Label>
                                            </Col>
                                            <Col md={8} className="ms-4">
                                                <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="defaultCheck1"
                                                    
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="defaultCheck1"
                                                >
                                                    Print statements and notices for this
                                                    person
                                                </label>
                                                </div>
                                                <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="defaultCheck1"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="defaultCheck1"
                                                >
                                                    Send email communications to this person
                                                </label>
                                                </div>
                                                <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="defaultCheck1"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="defaultCheck1"
                                                >
                                                    Send SMS communications to this person
                                                </label>
                                                </div>
                                            </Col>
                                            </Row> */}
                                        </div>

                                        <CardTitle className="text-primary mb-3">
                                            Commercial
                                        </CardTitle>
                                        <div className="mb-3 w-75">
                                            <Row>
                                                <Col md={2}>
                                                    <Label for="abn" className="form-label">
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
                                                        onChange={(e)=>{
                                                            setState({
                                                                ...state,
                                                                abn: e.target.value
                                                            })
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name="abn"
                                                        component="div"
                                                        className="invalid-feedback"
                                                    />
                                                </Col>
                                            </Row>
                                        </div>

                                        <CardTitle className="text-primary mb-3">
                                            Notes
                                        </CardTitle>
                                        <div className="mb-3 w-75">
                                        <Row>
                                            <Col md={2}>
                                            <Label for="notes" className="form-label">
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
                                                onChange={(e)=>{
                                                    setState({
                                                        ...state,
                                                        notes: e.target.value
                                                    })
                                                }}
                                            />
                                            <ErrorMessage
                                                name="notes"
                                                component="div"
                                                className="invalid-feedback"
                                            />
                                            </Col>
                                        </Row>
                                        </div>
                                        <div className="w-75">
                                        <div className="mt-3 d-flex justify-content-end g-4">
                                            <button
                                            className="btn btn-secondary w-md ms-5"
                                            type="submit"
                                            >
                                            Close
                                            </button>
                                            <button
                                            className="btn btn-info w-md ms-2"
                                            type="submit"
                                            >
                                            Submit
                                            </button>
                                        </div>
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
                </Container>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = gstate => {
  const {
    contacts_add_loading,

    contacts_show_data,
    contacts_show_error,
    contacts_show_loading,

  } = gstate.Contacts2;
  return {

    contacts_add_loading,

    contacts_show_data,
    contacts_show_error,
    contacts_show_loading,

  };
};

export default withRouter(
  connect(mapStateToProps, {
    addContact,
    showContact,
    showContactFresh,
  })(Contacts)
);
