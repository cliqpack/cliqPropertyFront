import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  Card,
  Alert,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Input,
  Button,
  CardHeader,
} from "reactstrap";
import classnames from "classnames";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import { useDispatch } from "react-redux";

import { Link, useHistory, withRouter } from "react-router-dom";
import { addEditContact } from "../../store/Contacts2/actions";

const ContactsInfoEdit = () => {
  const [tabState, setTabState] = useState({
    activeTab: "1",
    activeTab1: "5",
    activeTab2: "9",
    activeTab3: "13",
    verticalActiveTab: "1",
    verticalActiveTabWithIcon: "1",
    customActiveTab: "1",
    customIconActiveTab: "1",
    activeTabJustify: "5",
    col1: true,
    col2: false,
    col3: false,
    col5: true,
    col6: true,
    col7: true,
    col8: true,
    col9: true,
    col10: false,
    col11: false,
  });

  const [state, setState] = useState({});

  const [postalAddForm, setPostalAddForm] = useState(false);
  const [physicalAddForm, setPhysicalAddForm] = useState(false);

  const handlePropertyFormValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handlePostalAddForm = () => {
    setPostalAddForm(prev => !prev);
  };

  const handlePhysicalAddForm = () => {
    setPhysicalAddForm(prev => !prev);
  };

  const toggle = tab => {
    if (tabState.activeTab !== tab) {
      setTabState({
        ...tabState,
        activeTab: tab,
      });
    }
  };
  return (
    <div className="mt-5 pt-5 ps-3">
      <CardTitle className="mb-3">
        <h3 className="text-primary">
          Edit Supplier - Accounts Department - Local Newspaper (SUP00022)
        </h3>
      </CardTitle>
      <Nav tabs className="d-flex justify-content-between">
        <div className="d-flex">
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={classnames({
                active: tabState.activeTab === "1",
              })}
              onClick={() => {
                toggle("1");
              }}
            >
              Contact
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={classnames({
                active: tabState.activeTab === "2",
              })}
              onClick={() => {
                toggle("2");
              }}
            >
              Supplier
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={classnames({
                active: tabState.activeTab === "3",
              })}
              onClick={() => {
                toggle("3");
              }}
            >
              Payment Methods
            </NavLink>
          </NavItem>
        </div>
      </Nav>
      <div className="w-100 border-bottom border-primary" />
      <div className="overflow-scroll h-75"></div>
      <TabContent activeTab={tabState.activeTab} className="p-3 text-muted">
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <div className="py-2 ps-3">
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
                        physical_country:
                          (state && state.physical_country) || "",

                        // abn: (state && state.abn) || "",

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

                        postal_building_name: Yup.string().required(
                          "Please Enter Building"
                        ),
                        postal_unit: Yup.string().required("Please Enter Unit"),
                        postal_number: Yup.string().required(
                          "Please Enter Number"
                        ),
                        postal_street: Yup.string().required(
                          "Please Enter Street"
                        ),
                        postal_suburb: Yup.string().required(
                          "Please Enter Suburb"
                        ),
                        postal_postcode: Yup.string().required(
                          "Please Enter Postcode"
                        ),
                        postal_state:
                          Yup.string().required("Please Enter State"),
                        postal_country: Yup.string().required(
                          "Please Enter Country"
                        ),

                        physical_building_name: Yup.string().required(
                          "Please Enter Building"
                        ),
                        physical_unit:
                          Yup.string().required("Please Enter Unit"),
                        physical_number: Yup.string().required(
                          "Please Enter Number"
                        ),
                        physical_street: Yup.string().required(
                          "Please Enter Street"
                        ),
                        physical_suburb: Yup.string().required(
                          "Please Enter Suburb"
                        ),
                        physical_postcode: Yup.string().required(
                          "Please Enter Postcode"
                        ),
                        physical_state:
                          Yup.string().required("Please Enter State"),
                        physical_country: Yup.string().required(
                          "Please Enter Country"
                        ),

                        // communication: Yup.string().required(
                        //   "Please Enter Reference"
                        // ),
                        // abn: Yup.string().required("Please Enter Reference"),
                        notes: Yup.string().required("Please Enter Reference"),
                      })}
                      onSubmit={(values, onSubmitProps) => {
                        console.log(values);
                        // dispatch(addEditContact(values));
                        // onSubmitProps.resetForm();
                      }}
                    >
                      {({ errors, status, touched }) => (
                        <div>
                          <Form className="form-horizontal">
                            <div
                              style={{ height: "60vh" }}
                              className="overflow-auto w-100"
                            >
                              <div className="w-75 d-flex justify-content-between align-items-center border-bottom border-primary pb-1">
                                <div>
                                  <CardTitle className="mb-3">
                                    <h4 className="text-primary">
                                      New Supplier Contact
                                    </h4>
                                  </CardTitle>
                                  {/* <div className="w-100 border-bottom border-primary" /> */}
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
                                        (errors.reference && touched.reference
                                          ? " is-invalid"
                                          : "")
                                      }
                                      onChange={handlePropertyFormValues}
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
                                <div className="w-25 mb-2 border-bottom border-primary"></div>
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
                                        (errors.first_name && touched.first_name
                                          ? " is-invalid"
                                          : "")
                                      }
                                      value={state.first_name}
                                      onChange={handlePropertyFormValues}
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
                                        (errors.last_name && touched.last_name
                                          ? " is-invalid"
                                          : "")
                                      }
                                      value={state.last_name}
                                      onChange={handlePropertyFormValues}
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
                                        (errors.salutation && touched.salutation
                                          ? " is-invalid"
                                          : "")
                                      }
                                      value={state.salutation}
                                      onChange={handlePropertyFormValues}
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
                                      onChange={handlePropertyFormValues}
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
                                      onChange={handlePropertyFormValues}
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
                                      onChange={handlePropertyFormValues}
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
                                        (errors.home_phone && touched.home_phone
                                          ? " is-invalid"
                                          : "")
                                      }
                                      value={state.home_phone}
                                      onChange={handlePropertyFormValues}
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
                                      onChange={handlePropertyFormValues}
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
                                          color="secondary"
                                          onClick={handlePostalAddForm}
                                          className="d-flex justify-content-evenly align-items-center"
                                        >
                                          Details{" "}
                                          <i className="fa fa-solid fa-caret-down" />
                                        </Button>
                                      ) : (
                                        <Button
                                          color="secondary"
                                          onClick={handlePostalAddForm}
                                          className="d-flex justify-content-evenly align-items-center"
                                        >
                                          Close
                                          <i className="fa-regular fa-circle-xmark" />
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
                                              value={state.postal_building_name}
                                              onChange={
                                                handlePropertyFormValues
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
                                              value={state.postal_unit}
                                              onChange={
                                                handlePropertyFormValues
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
                                              value={state.postal_number}
                                              onChange={
                                                handlePropertyFormValues
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
                                              value={state.postal_street}
                                              onChange={
                                                handlePropertyFormValues
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
                                              value={state.postal_suburb}
                                              onChange={
                                                handlePropertyFormValues
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
                                              value={state.postal_postcode}
                                              onChange={
                                                handlePropertyFormValues
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
                                              value={state.postal_state}
                                              onChange={
                                                handlePropertyFormValues
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
                                              value={state.postal_country}
                                              onChange={
                                                handlePropertyFormValues
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
                                    <Label for="address" className="form-label">
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
                                          color="secondary"
                                          onClick={handlePhysicalAddForm}
                                          className="d-flex justify-content-evenly align-items-center"
                                        >
                                          Details{" "}
                                          <i className="fa fa-solid fa-caret-down" />
                                        </Button>
                                      ) : (
                                        <Button
                                          color="secondary"
                                          onClick={handlePhysicalAddForm}
                                          className="d-flex justify-content-evenly align-items-center"
                                        >
                                          Close
                                          <i className="fa fa-light fa-xmark" />
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
                                                handlePropertyFormValues
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
                                              value={state.physical_unit}
                                              onChange={
                                                handlePropertyFormValues
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
                                              value={state.physical_number}
                                              onChange={
                                                handlePropertyFormValues
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
                                              value={state.physical_street}
                                              onChange={
                                                handlePropertyFormValues
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
                                              value={state.physical_suburb}
                                              onChange={
                                                handlePropertyFormValues
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
                                              value={state.physical_postcode}
                                              onChange={
                                                handlePropertyFormValues
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
                                              value={state.physical_state}
                                              onChange={
                                                handlePropertyFormValues
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
                                              value={state.physical_country}
                                              onChange={
                                                handlePropertyFormValues
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
                                      for="building"
                                      className="form-label ps-2"
                                    >
                                      Communication
                                    </Label>
                                  </Col>
                                  <Col md={8} className="ms-4">
                                    <div className="form-check mb-3">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="print"
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
                                        value="email"
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
                                        value="sms"
                                        id="defaultCheck1"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="defaultCheck1"
                                      >
                                        Send SMS communications to this person
                                      </label>
                                    </div>
                                    <Button color="danger">
                                      Delete Person
                                    </Button>
                                  </Col>
                                </Row>
                              </div>
                              <CardTitle className="text-primary mb-3">
                                Notes
                                <div className="w-25 mb-3 border-bottom border-primary"></div>
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
                                      onChange={handlePropertyFormValues}
                                    />
                                    <ErrorMessage
                                      name="notes"
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                  </Col>
                                </Row>
                              </div>
                            </div>
                            <div className="w-100 mb-2 border-top border-primary"></div>
                            <div className="w-75">
                              <div className="mt-2 d-flex justify-content-end g-4">
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
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <CardText className="mb-0">
                <h1>Suppliers</h1>
              </CardText>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <CardText className="mb-0">payment methods</CardText>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
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
  return {
    contacts_list_data,
    contacts_list_error,
    contacts_list_loading,

    contacts_add_loading,

    user_list_data,
    user_list_error,
    user_list_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, { addEditContact })(ContactsInfoEdit)
);
