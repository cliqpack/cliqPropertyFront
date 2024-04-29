import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  FormText,
} from "reactstrap";
import { connect } from "react-redux";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import toastr from "toastr";
import { useHistory, useParams, withRouter } from "react-router-dom";
import {
  updatePropertyInfoFromListingList,
  updatePropertyInfoFromListingListFresh,
} from "store/actions";
import {
  getPropertyEditInfo,
  getPropertyType,
  getUser,
  getPropertyEditInfoFresh,
} from "store/Properties/actions";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import Loder from "components/Loder/Loder";


const LoadingContainer = () => <div>Loading...</div>;
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const EditPropertyListingInfoModal = props => {
  const { id } = useParams();
  const p_id = props.p_id;
  // console.log(props.p_id);
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {};

  // console.log(id);
  const history = useHistory();
  const [inspectionModal, setInspectionModal] = useState(false);
  const [editPropertyState, setEditPropertyState] = useState({
    building_name: "",
  });
  const [state2, setState2] = useState({});
  const [defaultProps, setDefaultProps] = useState({
    lat: -33.8675,
    lng: 151.2072,
  });
  const [addressShow, setAddressShow] = useState(false);
  const toggleAddress = () => setAddressShow(prev => !prev);
  // console.log('EditPropertyListingInfoModal---states-----------');
  // console.log(editPropertyState, state2);
  // console.log();
  // console.log('EditPropertyListingInfoModal---bedroom-----------');

  const [propertyEditState, setPropertyEditState] = useState(true);
  const [fullAddress, setFullAddress] = useState("");
  const [addressState, setAddressState] = useState({});

  const [mapToggle, setMapToggle] = useState(false);



  const toggle = () => setInspectionModal(!inspectionModal);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

    if (props.property_type_loading == false) {
      // console.log("------------------");
      // console.log('Type');
      props.getPropertyType();
      // console.log("------------------");
    }

    if (props.property_update_listing_info_loading === "Success") {
      setShowModal(false)
      toastr.success("Update Successfully");
      props.updatePropertyInfoFromListingListFresh();
    }

    if (props.user_list_loading == false) {
      props.getUser();
    }

    if (props.propertyEditData != false) {
      // setEditPropertyState({
      //     ...editPropertyState,
      //     reference: props.propertyEditData?.data.reference,
      // })

      setEditPropertyState({
        ...editPropertyState,
        reference: props.propertyEditData?.data.reference,
        manager: props.propertyEditData?.data.manager_id,
        primary_type: props.propertyEditData?.data.primary_type,
        bedroom: props.propertyEditData?.data.bedroom,
        bathroom: props.propertyEditData?.data.bathroom,
        car_space: props.propertyEditData?.data.car_space,
        floorArea: props.propertyEditData?.data.floor_area,
        garages: props.propertyEditData?.data.optional_property?.garages,
        carports: props.propertyEditData?.data.optional_property?.carports,
        open_car_space: props.propertyEditData?.data.optional_property?.open_car_space,
        // address: props.propertyEditData?.data.address,
        // building_name: props.propertyEditData?.addressData.building_name,
        // country: props.propertyEditData?.addressData.country,
        // number: props.propertyEditData?.addressData.number,
        // postcode: props.propertyEditData?.addressData.postcode,
        property_id: props.propertyEditData?.addressData.property_id,
        // state: props.propertyEditData?.addressData.state,
        // street: props.propertyEditData?.addressData.street,
        // suburb: props.propertyEditData?.addressData.suburb,
        // unit: props.propertyEditData?.addressData.unit,
        floorSize: props.propertyEditData?.data.floor_size,
        landSize: props.propertyEditData?.data.land_size,
        landArea: props.propertyEditData?.data.land_area,
      });

      // setState2({
      //   ...state2,
      //   location: props.propertyEditData?.data.location,
      // });
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

      // setState2({
      //   ...state2,
      //   location:
      //     place.geometry.location.lat() + `,` + place.geometry.location.lng(),
      // });

      // setDefaultProps({
      //   ...defaultProps,
      //   lat: place.geometry.location.lat(),
      //   lng: place.geometry.location.lng(),
      // });

    });
  }, [props, props.property_update_listing_info_loading]);
  function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }

  // console.log(editPropertyState);

  if (propertyEditState) {
    if (p_id !== undefined) {
      props.getPropertyEditInfo(p_id);
      // console.log('info');
      setPropertyEditState(false);
    }
  }
  console.log(p_id);
  // console.log("--------------EditPropertyListingInfoModal===========================");
  // console.log(props.propertyEditData?.data.bathroom);
  // console.log(props.propertyEditData?.data.property_address);
  // console.log(props.propertyEditData?.data.primary_type);

  let userData;
  let propertyType;

  if (props.user_list_data != null) {
    if (typeof props.user_list_data.data != "undefined") {
      userData = props.user_list_data.data.map((item, key) => (
        <option key={key} value={item.id}>
          {item.first_name + " " + item.last_name}
        </option>
      ));
    }
  }
  // console.log('-------------');
  // console.log(userData);

  if (props.property_type_loading == "Success") {
    propertyType = props.property_type_data?.data.data.map((item, key) => (
      <option key={key} value={item.id}>
        {item.type}
      </option>
    ));
  }
  // console.log('-------------');
  // console.log(propertyType);

  const handlePropertyFormValues = e => {
    setEditPropertyState({
      ...editPropertyState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {

    e.preventDefault();
    setShowModal(true)
    props.updatePropertyInfoFromListingList(p_id, editPropertyState, state2);
    //props.updatePropertyInfoFromListingListFresh();
    props.getPropertyEditInfoFresh();
  };

  // console.log(props.propertyInfoData?.data.data.reference);

  return (
    <>
      <Button className="btn" color="info" onClick={toggle}>
        <i className="fa fa-solid fa-pen" />
      </Button>
      <Loder status={showModal} />
      {/* ===============Inspection modal start from here ================*/}

      <Modal isOpen={inspectionModal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          <i className="bx bx-task me-1 text-primary"></i>
          Edit Property Description
        </ModalHeader>

        <ModalBody>

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


                    property_id:
                      (editPropertyState && editPropertyState.property_id) ||
                      "",
                    state: (editPropertyState && editPropertyState.state) || "",
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
                    primary_type:
                      (editPropertyState && editPropertyState.primary_type) ||
                      "",
                    bedroom:
                      (editPropertyState && editPropertyState.bedroom) || "",
                    bathroom:
                      (editPropertyState && editPropertyState.bathroom) || "",
                    car_space:
                      (editPropertyState && editPropertyState.car_space) || "",
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
                  // validationSchema={Yup.object().shape({
                  //     reference: Yup.string().required("Please Enter Reference"),
                  //     manager: Yup.string().required("Manager Name Redquired"),

                  //     building_name: Yup.string().required(
                  //         "Please Enter Building"
                  //     ),
                  //     unit: Yup.string().required("Please Enter Unit"),
                  //     number: Yup.string().required("Please Enter Number"),
                  //     street: Yup.string().required("Please Enter Street"),
                  //     suburb: Yup.string().required("Please Enter Suburb"),
                  //     postcode: Yup.string().required("Please Enter Postcode"),
                  //     state: Yup.string().required("Please Enter State"),
                  //     country: Yup.string().required("Please Enter Country"),

                  //     floorSize: Yup.string().required("Floor Size required"),
                  //     landSize: Yup.string().required("Land Size Required"),

                  //     primaryType: Yup.string().required(
                  //         "Please Enter Primary Type"
                  //     ),
                  //     floorArea: Yup.string().required("Floor Area Required"),
                  //     landArea: Yup.string().required("Land Area Required"),
                  //     keyNumber: Yup.string().required("Key Number Required"),
                  //     strataManager: Yup.string().required(
                  //         "Starta Manager Required"
                  //     ),
                  //     routine_inspections_frequency:
                  //         Yup.string().required("Required"),
                  //     note: Yup.string().required("Please Enter Note"),
                  // })}
                  onSubmit={(values, onSubmitProps) => { }}
                >
                  {({ errors, status, touched }) => (
                    <Form className="form-horizontal">
                      <Card>
                        <CardBody>
                          <CardTitle className="mb-3">
                            Edit Properties
                          </CardTitle>
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

                      {/* <Card>
                        <CardBody>
                          <CardTitle className="mb-3">Address</CardTitle>
                          <div className="mb-3 w-75">
                            <Row>
                              <Col md={2}>
                                <Label for="address" className="form-label">
                                  Address
                                </Label>
                              </Col>
                              <Col md={8}>
                                <input
                                  name="address"
                                  type="text"
                                  className={
                                    "form-control" +
                                    (errors.address && touched.address
                                      ? " is-invalid"
                                      : "")
                                  }
                                  value={
                                    editPropertyState.building_name +
                                    "," +
                                    editPropertyState.unit +
                                    "," +
                                    editPropertyState.number +
                                    "," +
                                    editPropertyState.street +
                                    "," +
                                    editPropertyState.suburb +
                                    "," +
                                    editPropertyState.state +
                                    "," +
                                    editPropertyState.postcode +
                                    "," +
                                    editPropertyState.country
                                  }
                                />

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
                                        onChange={event => {
                                          setEditPropertyState(
                                            prevEditState => ({
                                              ...prevEditState,
                                              building_name: event.target.value,
                                            })
                                          );
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
                                      <Label for="unit" className="form-label">
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
                                        onChange={event => {
                                          setEditPropertyState(
                                            prevEditState => ({
                                              ...prevEditState,
                                              unit: event.target.value,
                                            })
                                          );
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
                                        onChange={event => {
                                          setEditPropertyState(
                                            prevEditState => ({
                                              ...prevEditState,
                                              number: event.target.value,
                                            })
                                          );
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
                                        onChange={event => {
                                          setEditPropertyState(
                                            prevEditState => ({
                                              ...prevEditState,
                                              street: event.target.value,
                                            })
                                          );
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
                                        onChange={event => {
                                          setEditPropertyState(
                                            prevEditState => ({
                                              ...prevEditState,
                                              suburb: event.target.value,
                                            })
                                          );
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
                                        onChange={event => {
                                          setEditPropertyState(
                                            prevEditState => ({
                                              ...prevEditState,
                                              postcode: event.target.value,
                                            })
                                          );
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
                                      <Label for="state" className="form-label">
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
                                        onChange={event => {
                                          setEditPropertyState(
                                            prevEditState => ({
                                              ...prevEditState,
                                              state: event.target.value,
                                            })
                                          );
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
                                        onChange={event => {
                                          setEditPropertyState(
                                            prevEditState => ({
                                              ...prevEditState,
                                              country: event.target.value,
                                            })
                                          );
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

                              <Col md={8}>
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
                                  onChange={e =>
                                    setState2({
                                      ...state2,
                                      location: e.target.value,
                                    })
                                  }
                                  value={state2.location}
                                />
                                <ErrorMessage
                                  name="location"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                              {mapToggle ? (
                                <div style={{ height: "100vh", width: "100%" }}>
                                  <GoogleMapReact
                                    bootstrapURLKeys={{ key: "" }}
                                    defaultCenter={defaultProps.center}
                                    defaultZoom={defaultProps.zoom}
                                    onClick={e => {
                                      setState2({
                                        ...state2,
                                        location: e.lat + "-" + e.lng,
                                      });
                                    }}
                                  >
                                    <AnyReactComponent
                                      lat={59.955413}
                                      lng={30.337844}
                                      text="My Marker"
                                    />
                                  </GoogleMapReact>
                                </div>
                              ) : null}
                            </Row>
                          </div>
                        </CardBody>
                      </Card> */}

                      <Card>
                        <CardBody>

                          <div className="mb-3 w-75">
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
                                      onClick={toggleAddress}
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

                          {/* <div className="mb-3 w-75">
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
                          </div> */}
                        </CardBody>
                      </Card>

                      <Card>
                        <CardBody>
                          <CardTitle>Details</CardTitle>

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
                                  name="primary_type"
                                  className="form-control"
                                  onChange={event => {
                                    setEditPropertyState(prevEditState => ({
                                      ...prevEditState,
                                      primary_type: event.target.value,
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
                                  name="primary_type"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                            </Row>
                          </div>

                          {/* <div className="mb-3">
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
                                                                    value={editPropertyState.primary_type}
                                                                    onChange={event => {
                                                                        setEditPropertyState(prevEditState => ({
                                                                            ...prevEditState,
                                                                            property_type: event.target.value,
                                                                        }));
                                                                    }}
                                                                >
                                                                    <option>Choose</option>
                                                                    {
                                                                        propertyType != undefined ? propertyType : null
                                                                    }
                                                                </Field>
                                                                <ErrorMessage
                                                                    name="type"
                                                                    component="div"
                                                                    className="invalid-feedback"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </div> */}

                          <div className="mb-3 w-100">
                            <Row className="d-flex">
                              <Col md={3}>
                                <Label for="bedroom" className="form-label">
                                  Number Of
                                </Label>
                              </Col>

                              <div className="d-flex">
                                {" "}
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
                              </div>

                              <div className="d-flex">
                                {" "}
                                <Col md={1}>
                                  <Field
                                    name="garages"
                                    type="text"
                                    className={
                                      "form-control" +
                                      (errors.garages && touched.garages
                                        ? " is-invalid"
                                        : "")
                                    }
                                    placeholder="0"
                                    value={editPropertyState.garages}
                                    onChange={event => {
                                      setEditPropertyState(prevEditState => ({
                                        ...prevEditState,
                                        garages: event.target.value,
                                      }));
                                    }}
                                  />
                                </Col>
                                <Col md={2}>Garages</Col>
                                <Col md={1}>
                                  <Field
                                    name="carports"
                                    type="text"
                                    className={
                                      "form-control" +
                                      (errors.carports && touched.carports
                                        ? " is-invalid"
                                        : "")
                                    }
                                    value={editPropertyState.carports}
                                    onChange={event => {
                                      setEditPropertyState(prevEditState => ({
                                        ...prevEditState,
                                        carports: event.target.value,
                                      }));
                                    }}
                                  />
                                </Col>
                                <Col md={2}>Carports</Col>
                                <Col md={1}>
                                  <Field
                                    name="open_car_space"
                                    type="text"
                                    className={
                                      "form-control" +
                                      (errors.open_car_space &&
                                        touched.open_car_space
                                        ? " is-invalid"
                                        : "")
                                    }
                                    value={editPropertyState.open_car_space}
                                    onChange={event => {
                                      setEditPropertyState(prevEditState => ({
                                        ...prevEditState,
                                        open_car_space: event.target.value,
                                      }));
                                    }}
                                  />
                                </Col>
                                <Col md={2}>Open Car Space</Col>
                              </div>
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
                                  onChange={event => {
                                    setEditPropertyState(prevEditState => ({
                                      ...prevEditState,
                                      floorSize: event.target.value,
                                    }));
                                  }}
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
                                    <option value="Square">Square</option>
                                    <option value="Large">Large</option>
                                    <option value="Small">Small</option>
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
        </ModalBody>
        <ModalFooter>
          <Button
            color="info"
            onClick={e => {
              handleSubmit(e);
              toggle();
            }}
          >
            <i className="fas fa-file-alt me-1"></i>Save
          </Button>
        </ModalFooter>
      </Modal>

      {/* ===============Inspection modal ends here ================*/}
    </>
  );
};
const mapStateToProps = gstate => {
  const {
    user_list_data,
    user_list_error,
    user_list_loading,

    data,
    property_type_loading,

    property_type_data,
  } = gstate.property;

  const { inspection_add_data, inspection_add_error, inspection_add_loading } =
    gstate.Inspections;

  const { property_update_listing_info_data, property_update_listing_info_error, property_update_listing_info_loading } =
    gstate.Listing;



  return {
    inspection_add_data,
    inspection_add_error,
    inspection_add_loading,

    user_list_data,
    user_list_error,
    user_list_loading,

    data,
    property_type_loading,

    property_type_data,

    property_update_listing_info_data,
    property_update_listing_info_error,
    property_update_listing_info_loading
  };
};

// EditPropertyListingInfoModal.propTypes = {
//   google: PropTypes.object,
// };

export default withRouter(
  connect(mapStateToProps, {
    updatePropertyInfoFromListingList,
    getPropertyEditInfo,
    getPropertyType,
    getUser,
    getPropertyEditInfoFresh,
    updatePropertyInfoFromListingListFresh,
  })(
    GoogleApiWrapper({
      apiKey: "AIzaSyD0FeNTACOETan6R_fJ18o5kSgTyoAFabk",
      LoadingContainer: LoadingContainer,
      v: "3",
    })(EditPropertyListingInfoModal)
  ));
