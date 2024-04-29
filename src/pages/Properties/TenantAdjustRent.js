import React, { Fragment, useState, useEffect } from "react";
import "./propertyTenantBondDetails.css";
import {
  withRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import {
  Modal,
  Row,
  Col,
  Card,
  ErrorMessage,
  Label,
  Field,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Carousel,
  CarouselControl,
  CarouselItem,
  UncontrolledAlert,
} from "reactstrap";
import {
  getRentDetails,
  editRentDetails,
  editRentDetailsFresh,
  getRentDetailsFresh,
  getPropertyInfo,
} from "store/actions";
import toastr from "toastr";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import classnames from "classnames";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

import dummyImage from "../../assets/images/dummy-image-square.jpg";

const TenantAdjustrent = props => {
  const [state, setState] = useState({ activeTab: "1" });
  const [state2, setState2] = useState({
    notice_period: "",
    new_rent_from: "",
    new_rent_value: "",
    rent_unchange: "",
    rent_change: "",
    see_alert: false,
  });
  const [init, setInit] = useState(true);
  const [showSliderState, setShowSliderState] = useState({
    photoIndex: 0,
    isOpen: false,
  });
  const [file, setFile] = useState(dummyImage);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  if (init) {
    props.getRentDetails(props.cid, props.propID);
    props.getPropertyInfo(props.propID);
    setInit(false);
  }

  useEffect(() => {
    if (props.rent_details_loading == "Success") {
      const data = props.rent_details_data?.data;
      setState2(prev => ({
        ...prev,
        new_rent_from: moment(props.state2.paid_to).add(1, 'days').format('YYYY-MM-DD'),
        new_rent_value: props.state2.rent,
        rent_unchange: "",
        rent_change: "No change in rent.",
        inspection: props.rent_details_data?.last_inspection,
        jobs: props.rent_details_data?.jobs,
      }));
      props.getRentDetailsFresh();
    }
    if (props.rent_details_add_loading == "Success") {
      toastr.success("Rent Added successfully");
      props.editRentDetailsFresh();
      props.toggleAdjustRent();
    }
  }, [
    props.rent_details_loading,
    props.rent_details_add_loading
  ]);

  const toggle = (tab, type = null) => {
    if (state.activeTab !== tab) {
      setState({
        ...state,
        activeTab: tab,
      });
    }
  };

  const handlePropertyFormTwoValues = e => {
    setState2({
      ...state2,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdjust = e => {
    if (props.state2.paid_to < state2.new_rent_from) {
      props.editRentDetails(state2, props.cid);
    } else {
      setState2({ ...state2, see_alert: true });
    }
  };

  const dateMoveOutHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ["new_rent_from"]: dateStr });
    dayCalculation(dateStr);
  };
  const showSlider = () => {
    setShowSliderState({
      ...showSliderState,
      isOpen: true,
    });
  };
  let slides = [],
    itemLength = 0;
  if (props.property_info_data) {
    slides = props.property_info_data?.data?.data?.property_images?.map(
      (item, idx) => {
        return (
          <CarouselItem
            onExited={() => setAnimating(false)}
            onExiting={() => setAnimating(true)}
            key={idx}
          >
            <img
              src={process.env.REACT_APP_IMAGE + item.property_image}
              onClick={showSlider}
              alt={item.property_image}
              style={{ height: "300px", width: "400px", objectFit: "cover" }}
            />
          </CarouselItem>
        );
      }
    );
    itemLength =
      props.property_info_data?.data?.data?.property_images?.length - 1;
  }

  const image_slides =
    props.property_info_data?.data?.data?.property_images?.map((item, idx) => {
      return { src: process.env.REACT_APP_IMAGE + item.property_image };
    });
  const previousButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? itemLength : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const nextButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === itemLength ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  let property_data = undefined;
  if (props.property_info_data) {
    property_data = props.property_info_data?.data;
  }
  const propertyAddress = property_data?.property_address;

  const dayCalculation = due_to => {
    var date1 = moment(props.state2.paid_to).add(1, 'days').format('YYYY-MM-DD');
    var date2 = moment(due_to);

    const days = date2.diff(date1, "days");

    setState2(prev => ({ ...prev, notice_period: days }));
  };

  const daysCalculation = e => {
    var date = undefined;
    if (state2.new_rent_from === '') {
      date = moment(props.state2.paid_to).add(e.target.value, 'days').format('YYYY-MM-DD')
    } else {
      date = moment(state2.new_rent_from).add(e.target.value, "days").format("YYYY-MM-DD");
    }
    if (e.target.value === '' || isNaN(e.target.value)) {
      setState2({
        ...state2,
        notice_period: e.target.value,
        new_rent_from: '',
      });
    } else {
      setState2({
        ...state2,
        notice_period: e.target.value,
        new_rent_from: date,
      });
    }
  };
  const calculate_rent = e => {
    let rent = props.state2.rent;
    let output = Number(e.target.value) - Number(rent);

    if (e.target.value > rent) {
      let value = `Incresed of ${output}৳`;
      setState2({
        ...state2,
        new_rent_value: e.target.value,
        rent_change: value,
      });
    } else {
      let value = `Decrease of ${Number(output) * -1}৳`;
      setState2({
        ...state2,
        new_rent_value: e.target.value,
        rent_change: value,
      });
    }
  };
  return (
    <Fragment>
      <Modal
        size="lg"
        isOpen={props.toggleState}
        toggle={props.toggleAdjustRent}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            Rent Review: {props.state.reference} -{" "}
            {property_data?.data?.reference}
          </h5>
          <button
            type="button"
            onClick={props.toggleAdjustRent}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <Card>
            <CardBody>
              <Nav className="icon-tab nav-justified">
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: state.activeTab === "1",
                    })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Adjust
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: state.activeTab === "2",
                    })}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Details
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent
                activeTab={state.activeTab}
                className="p-3 text-muted"
              >
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <h4 className="text-primary mb-2">
                        Tenant ten-{"000" + props.conid}
                      </h4>
                      <div
                        className="w-100 mt-2 mb-4"
                        style={{
                          borderBottom: "1.2px dotted #c9c7c7",
                        }}
                      ></div>
                      <Row>
                        <Col md={12}>
                          <Row
                            style={{ cursor: "pointer" }}
                            className="p-1"
                            onClick={() => {
                              tenantFolioHandler(props.conid, props.cid);
                            }}
                          >
                            <Col
                              className="d-flex flex-column justify-content-center"
                              style={{
                                borderStyle: "dotted",
                                borderWidth: "thin",
                                borderColor: "#DCDCDC",
                                backgroundColor: "#F0FFFF",
                                height: "70px",
                              }}
                              md={3}
                            >
                              <span className="text-muted fw-bold d-flex justify-content-center">
                                {props.state2.rent_type
                                  ? props.state2.rent_type
                                  : ""}
                              </span>
                              <span className="text-muted d-flex justify-content-center">
                                {props.state2.rent
                                  ? "৳" + props.state2.rent
                                  : "0.00"}
                              </span>
                            </Col>
                            <Col
                              className="d-flex flex-column justify-content-center"
                              style={{
                                borderStyle: "dotted",
                                borderWidth: "thin",
                                borderColor: "#DCDCDC",
                                backgroundColor: "#F0FFFF",
                                height: "70px",
                              }}
                              md={3}
                            >
                              <span className="text-muted fw-bold d-flex justify-content-center">
                                Agreement End
                              </span>
                              <span className="text-muted d-flex justify-content-center">
                                {props.state2.agreement_end
                                  ? moment(props.state2.agreement_end).format(
                                    "DD-MMM-YYYY"
                                  )
                                  : " "}
                              </span>
                            </Col>

                            <Col
                              className="d-flex flex-column justify-content-center"
                              style={{
                                borderStyle: "dotted",
                                borderWidth: "thin",
                                borderColor: "#DCDCDC",
                                backgroundColor: "#F0FFFF",
                              }}
                              md={2}
                            >
                              <span className="text-muted fw-bold d-flex justify-content-center">
                                Paid to
                              </span>
                              <span className="text-muted d-flex justify-content-center">
                                {props.state2.paid_to
                                  ? moment(props.state2.paid_to).format(
                                    "DD-MMM-YYYY"
                                  )
                                  : " "}
                              </span>
                            </Col>

                            <Col
                              className="d-flex flex-column justify-content-center"
                              style={{
                                borderStyle: "dotted",
                                borderWidth: "thin",
                                borderColor: "#DCDCDC",
                                backgroundColor: "#F0FFFF",
                              }}
                              md={2}
                            >
                              <span className="text-muted fw-bold d-flex justify-content-center">
                                Part Paid
                              </span>
                              <span className="text-muted d-flex justify-content-center">
                                {props.state2.part_paid
                                  ? "৳" + props.state2.part_paid
                                  : "0.00৳"}
                              </span>
                            </Col>

                            <Col
                              className="d-flex flex-column justify-content-center"
                              style={{
                                borderStyle: "dotted",
                                borderWidth: "thin",
                                borderColor: "#DCDCDC",
                                backgroundColor: "#F0FFFF",
                              }}
                              md={2}
                            >
                              <span className="text-muted fw-bold d-flex justify-content-center">
                                Bond Held
                              </span>
                              <span className="text-muted d-flex justify-content-center">
                                {props.state2.bond_held
                                  ? "৳" + props.state2.bond_held
                                  : "0.00৳"}
                              </span>
                            </Col>

                            <Col
                              className="d-flex flex-column justify-content-center"
                              style={{
                                borderTop: "dotted",
                                borderWidth: "thin",
                                borderColor: "#DCDCDC",
                              }}
                            ></Col>
                            <Col
                              className=""
                              style={{
                                borderTop: "dotted",
                                borderWidth: "thin",
                                borderColor: "#DCDCDC",
                              }}
                            ></Col>
                            <Col
                              className=""
                              style={{
                                borderTop: "dotted",
                                borderWidth: "thin",
                                borderColor: "#DCDCDC",
                              }}
                            ></Col>
                          </Row>
                          <h4 className="text-primary mb-2 mt-2">
                            Rent Adjustments
                          </h4>
                          <div
                            className="w-100 mt-2 mb-4"
                            style={{
                              borderBottom: "1.2px dotted #c9c7c7",
                            }}
                          ></div>
                          <Row className="mb-3">
                            <Col md={12}>
                              {state2.see_alert && (
                                <UncontrolledAlert color="danger" role="alert">
                                  Rent has been receipted up to{" "}
                                  {props.state2.paid_to} The rent for this
                                  tenant cannot be adjusted after it has already
                                  been receipted
                                </UncontrolledAlert>
                              )}
                            </Col>
                            <Col md={3}>
                              <Label
                                for="notice_period"
                                className="form-label text-dark"
                              >
                                Notice Period
                              </Label>
                            </Col>
                            <Col md={4} className="d-flex align-items-start">
                              <input
                                placeholder="0 days"
                                name="notice_period"
                                id="notice_period"
                                type="text"
                                className="form-control"
                                value={state2.notice_period}
                                onChange={daysCalculation}
                              />
                            </Col>

                            <Col md={4} className="d-flex align-items-start">
                              <p className="mt-2">Days</p>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={3}>
                              <Label
                                for="new_rent_from"
                                className="form-label text-dark"
                              >
                                New Rent From
                              </Label>
                            </Col>
                            <Col md={4} className="d-flex align-items-start">
                              <Flatpickr
                                className="form-control d-block"
                                value={state2.new_rent_from}
                                options={{
                                  altInput: true,
                                  format: "d/m/Y",
                                  altFormat: "d/m/Y",
                                  onChange: dateMoveOutHandler,
                                }}
                              />
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col md={3}>
                              <Label
                                for="new_rent_value"
                                className="form-label text-dark"
                              >
                                New Rent Value
                              </Label>
                            </Col>
                            <Col md={4} className="d-flex align-items-start">
                              <input
                                placeholder="0.00"
                                name="new_rent_value"
                                id="new_rent_value"
                                type="text"
                                className="form-control"
                                value={state2.new_rent_value}
                                onChange={calculate_rent}
                              />
                            </Col>
                            <Col md={4} className="d-flex align-items-start">
                              <p>{state2.rent_change}</p>
                            </Col>
                          </Row>

                          <Row className="mb-3">
                            <Col md={3}></Col>
                            <Col md={9} className="form-check">
                              <div className="form-check">
                                <input
                                  name="rent_unchange"
                                  id="rent_unchange"
                                  type="Checkbox"
                                  className="form-check-input"
                                  value={state2.rent_unchange}
                                  onChange={handlePropertyFormTwoValues}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="customControlInline"
                                >
                                  Rent is unchanged for review
                                </label>
                              </div>
                            </Col>
                          </Row>

                          <Card className="mt-3">
                            <div
                              className="p-2"
                              style={{ backgroundColor: "#87CEEB" }}
                            >
                              <p>
                                <i className="fas fa-lightbulb me-2 text-primary"></i>{" "}
                                Rent Adjustment
                              </p>
                              <ul className="ms-2">
                                <li>
                                  Permanently changes the tenants rent amount
                                </li>
                                <li>Can only adjust unpaid periods</li>
                              </ul>
                            </div>
                          </Card>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row style={{ marginTop: "60px" }}>
                    <Col sm="6">
                      <Row>
                        <Col md={5} className="text-primary py-1">
                          Address
                        </Col>
                        <Col md={7} className="py-1">
                          {`${propertyAddress?.building_name || ""} ${propertyAddress?.unit || ""
                            }${propertyAddress?.unit && propertyAddress?.number
                              ? "/"
                              : ""
                            }${propertyAddress?.number || ""} ${propertyAddress?.street || ""
                            }, ${propertyAddress?.suburb || ""} ${propertyAddress?.state || ""
                            } ${propertyAddress?.postcode || ""}`}
                        </Col>
                        <div style={{ borderBottom: "1.2px dotted #c9c7c7" }} />
                      </Row>
                      <Row>
                        <Col md={5} className="py-2 text-primary">
                          Attributes
                        </Col>
                        <Col md={7} className="py-2">
                          <span className="badge rounded-pill bg-primary justify-content-center align-items-center p-2 m-1">
                            <span
                              style={{
                                fontSize: "13px",
                                marginRight: "2px",
                              }}
                            >
                              {property_data?.data.bedroom
                                ? property_data.data.bedroom
                                : 0}
                            </span>{" "}
                            <i className="fas fa-bed font-size-14 me-2"></i>
                          </span>

                          <span className="badge rounded-pill bg-success justify-content-center align-items-center p-2 m-1">
                            <span
                              style={{
                                fontSize: "13px",
                                marginRight: "2px",
                              }}
                            >
                              {property_data?.data.bathroom
                                ? property_data.data.bathroom
                                : 0}
                            </span>{" "}
                            <i className="fas fa-bath font-size-14 me-2"></i>
                          </span>

                          <span className="badge rounded-pill bg-warning justify-content-center align-items-center p-2 m-1">
                            <span
                              style={{
                                fontSize: "13px",
                                marginRight: "2px",
                              }}
                            >
                              {property_data?.data?.car_space
                                ? property_data.data.car_space
                                : 0}{" "}
                            </span>
                            <i className="fas fa-car font-size-14 me-2"></i>
                          </span>
                        </Col>
                        <div style={{ borderBottom: "1.2px dotted #c9c7c7" }} />
                      </Row>
                      <Row>
                        <Col md={5} className="text-primary py-2">
                          Last review
                        </Col>
                        <Col md={7} className="py-2">
                          {""}
                        </Col>
                        <div style={{ borderBottom: "1.2px dotted #c9c7c7" }} />
                      </Row>
                      <Row>
                        <Col md={5} className="text-primary py-2">
                          Next review
                        </Col>
                        <Col md={7} className="py-2">
                          {props.state2?.next_rent_review
                            ? moment(props.state2?.next_rent_review).format(
                              "DD-MMM-YYYY"
                            )
                            : ""}
                        </Col>
                        <div style={{ borderBottom: "1.2px dotted #c9c7c7" }} />
                      </Row>
                      <Row>
                        <Col md={5} className="text-primary py-2">
                          Paid to
                        </Col>
                        <Col md={7} className="py-2">
                          {props.state2?.paid_to
                            ? moment(props.state2?.paid_to).format(
                              "DD-MMM-YYYY"
                            )
                            : ""}
                        </Col>
                        <div style={{ borderBottom: "1.2px dotted #c9c7c7" }} />
                      </Row>
                      <Row>
                        <Col md={5} className="text-primary py-2">
                          Part Paid
                        </Col>
                        <Col md={7} className="py-2">
                          {props.state2?.part_paid
                            ? props.state2.part_paid
                            : "0.00"}৳
                        </Col>
                        <div style={{ borderBottom: "1.2px dotted #c9c7c7" }} />
                      </Row>
                      <Row>
                        <Col md={5} className="text-primary py-2">
                          Move in
                        </Col>
                        <Col md={7} className="py-2">
                          {props.state2?.move_in
                            ? moment(props.state2.move_in).format("DD-MMM-YYYY")
                            : ""}
                        </Col>
                        <div style={{ borderBottom: "1.2px dotted #c9c7c7" }} />
                      </Row>
                      <Row>
                        <Col md={5} className="text-primary py-2">
                          Deposits
                        </Col>
                        <Col md={7} className="py-2">
                          {props.state2?.deposits
                            ? props.state2.deposits
                            : "0.00"}৳
                        </Col>
                        <div style={{ borderBottom: "1.2px dotted #c9c7c7" }} />
                      </Row>
                      <Row className="mt-5">
                        <Row>
                          <Col md={12}>
                            <h5 className="text-primary mb-2">
                              Last Inspection
                            </h5>
                            <div
                              className="w-100"
                              style={{
                                borderBottom: "1.2px dotted #c9c7c7",
                              }}
                            ></div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={5} className="text-primary py-2">
                            type
                          </Col>
                          <Col md={7} className="py-2">
                            {state2.inspection?.inspection_type ? (
                              <a
                                href={
                                  "/inspectionInfo/" + state2.inspection?.id
                                }
                                target="blank"
                              >
                                {state2.inspection?.inspection_type}
                              </a>
                            ) : (
                              ""
                            )}
                          </Col>
                          <div
                            style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                          />
                        </Row>
                        <Row>
                          <Col md={5} className="text-primary py-2">
                            date
                          </Col>
                          <Col md={7} className="py-2">
                            {state2.inspection?.inspection_date
                              ? moment(
                                state2.inspection?.inspection_date
                              ).format("DD-MMM-YYYY")
                              : ""}
                          </Col>
                          <div
                            style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                          />
                        </Row>
                        <Row>
                          <Col md={5} className="text-primary py-2">
                            Rent Review
                          </Col>
                          <Col md={7} className="py-2">
                            {"0.00"}৳
                          </Col>
                          <div
                            style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                          />
                        </Row>
                      </Row>
                      <Row className="mt-5">
                        <Row>
                          <Col md={12}>
                            <h5 className="text-primary mb-2">
                              Jobs{" "}
                              {"(" +
                                moment(state2.jobs?.end_date).format(
                                  "DD-MMM-YYYY"
                                ) +
                                " to " +
                                moment(state2.jobs?.start_date).format(
                                  "DD-MMM-YYYY"
                                ) +
                                ")"}
                            </h5>
                            <div
                              className="w-100"
                              style={{
                                borderBottom: "1.2px dotted #c9c7c7",
                              }}
                            ></div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={5} className="text-primary py-2">
                            Agent reported
                          </Col>
                          <Col md={7} className="py-2">
                            {state2.jobs?.job_agent
                              ? state2.jobs?.job_agent
                              : ""}
                          </Col>
                          <div
                            style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                          />
                        </Row>
                        <Row>
                          <Col md={5} className="text-primary py-2">
                            Tenant reported
                          </Col>
                          <Col md={7} className="py-2">
                            {state2.jobs?.job_tenant
                              ? state2.jobs?.job_tenant
                              : ""}
                          </Col>
                          <div
                            style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                          />
                        </Row>
                        <Row>
                          <Col md={5} className="text-primary py-2">
                            Owner reported
                          </Col>
                          <Col md={7} className="py-2">
                            {state2.jobs?.job_owner
                              ? state2.jobs?.job_owner
                              : ""}
                          </Col>
                          <div
                            style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                          />
                        </Row>
                      </Row>
                    </Col>
                    <Col sm="6">
                      <div
                        style={{
                          border: "1px dashed #c9c8c3",
                          borderRadius: "2px",
                        }}
                      >
                        {slides?.length > 0 ? (
                          <Carousel
                            previous={previousButton}
                            next={nextButton}
                            activeIndex={activeIndex}
                          >
                            {slides}
                            <CarouselControl
                              directionText="Prev"
                              direction={itemLength > 0 ? "prev" : ""}
                              onClickHandler={previousButton}
                            />
                            <CarouselControl
                              directionText="Next"
                              direction={itemLength > 0 ? "next" : ""}
                              onClickHandler={nextButton}
                            />
                          </Carousel>
                        ) : (
                          <img
                            src={file}
                            style={{
                              height: "100%",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          marginTop: "-18px",
                          zIndex: 100,
                          height: "30px",
                          width: "100%",
                          textAlign: "center",
                          position: "absolute",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "60px",
                            backgroundColor: "#c9c8c3",
                            height: "35px",
                            margin: "auto",
                            padding: "5px",
                            display: "flex",
                            gap: 2,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "5px",
                          }}
                        >
                          <i
                            className="bx bx-image-add"
                            style={{ fontSize: "15px" }}
                          />
                          <span style={{ fontSize: "15px" }}>
                            {itemLength + 1}
                          </span>
                        </div>
                      </div>

                      {/* <Lightbox
                        open={showSliderState.isOpen}
                        close={() => setShowSliderState({ isOpen: false })}
                        slides={image_slides}
                        plugins={[Zoom, Fullscreen, Video]}
                      /> */}
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={props.toggleAdjustRent}
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button type="button" className="btn btn-info" onClick={handleAdjust}>
            Save
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    rent_details_data,
    rent_details_error,
    rent_details_loading,

    rent_details_add_data,
    rent_details_add_error,
    rent_details_add_loading,

    property_info_data,
    property_info_error,
    property_info_loading,
  } = gstate.property;

  return {
    rent_details_data,
    rent_details_error,
    rent_details_loading,

    rent_details_add_data,
    rent_details_add_error,
    rent_details_add_loading,

    property_info_data,
    property_info_error,
    property_info_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getRentDetails,
    editRentDetails,
    editRentDetailsFresh,
    getRentDetailsFresh,
    getPropertyInfo,
  })(TenantAdjustrent)
);
