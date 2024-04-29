import React, { Fragment, useState, useEffect } from "react";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  withRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Row, Col, Card, Label, Button } from "reactstrap";
import {
  getPropertyTenantInfo,
  getPropertyTenantInfoFresh,
} from "store/actions";
import toastr from "toastr";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import classnames from "classnames";
import { floor } from "lodash";
import Loder from "components/Loder/Loder";

const RentCalculation = props => {
  const due_to = moment().format("YYYY-MM-DD");
  const [state, setState] = useState({
    rent: 0,
    part_paid: "0",
    paid_to: "",
    rentDue: true,
    paidTo: false,
    linked: true,
    feeEdit: false,
    due_to: due_to,
    calculate: false,
  });
  

  // Form 2 buttons
  const [WeeklylyBtn, setWeeklyBtn] = useState(true);
  const [MonthlyBtn, setMonthlyBtn] = useState(false);
  const [fortnightlyBtn, setfortnightlyBtn] = useState(false);
  const [init, setInit] = useState(true);
  const [loader, setLoader] = useState(false);

  if (init) {
    setLoader(true);
    props.getPropertyTenantInfo(props.propertyId);
    setInit(false);
  }
  useEffect(() => {
    if (props.property_tenant_info_loading == "Success") {
      var date1 = moment(props.property_tenant_info_data?.data?.folio?.paid_to);
      var date2 = moment();

      const days = date2.diff(date1, "days");
      setState({
        ...state,
        rent: props.property_tenant_info_data?.data?.folio?.rent,
        rent_type: props.property_tenant_info_data?.data?.folio?.rent_type,
        bond_required:
          props.property_tenant_info_data?.data?.folio?.bond_required,
        rentTax:
          props.property_tenant_info_data?.data?.folio?.rent_includes_tax,
        periodic_tenancy:
          props.property_tenant_info_data?.data?.folio?.periodic_tenancy,
        bond_held: props.property_tenant_info_data?.data?.folio?.bond_held,
        move_in: props.property_tenant_info_data?.data?.folio?.move_in,
        move_out: props.property_tenant_info_data?.data?.folio?.move_out,
        agreement_start:
          props.property_tenant_info_data?.data?.folio?.agreement_start,
        agreement_end:
          props.property_tenant_info_data?.data?.folio?.agreement_end,
        paid_to: props.property_tenant_info_data?.data?.folio?.paid_to,
        part_paid: props.property_tenant_info_data?.data?.folio?.part_paid,
        invoice_days_in_advance:
          props.property_tenant_info_data?.data?.folio?.invoice_days_in_advance,
        rent_review_frequency:
          props.property_tenant_info_data?.data?.folio?.rent_review_frequency,
        next_rent_review:
          props.property_tenant_info_data?.data?.folio?.next_rent_review,
        bank_reterence:
          props.property_tenant_info_data?.data?.folio?.bank_reterence,
        receipt_warning:
          props.property_tenant_info_data?.data?.folio?.receipt_warning,
        bond_paid:
          props.property_tenant_info_data?.data?.folio?.bond_already_paid,
        bond_arrears: props.property_tenant_info_data?.data?.folio?.bond_arreas,
        bond_receipted:
          props.property_tenant_info_data?.data?.folio?.bond_receipted,
        bond_reference:
          props.property_tenant_info_data?.data?.folio?.bond_reference,
        break_lease: props.property_tenant_info_data?.data?.folio?.break_lease,
        bond_notes: props.property_tenant_info_data?.data?.folio?.notes,
        termination: props.property_tenant_info_data?.data?.folio?.termination,
        days: days,
      });

      if (props.property_tenant_info_data?.data?.folio?.rent_type == "Weekly") {
        setfortnightlyBtn(false);
        setWeeklyBtn(true);
        setMonthlyBtn(false);
      } else if (
        props.property_tenant_info_data?.data?.folio?.rent_type == "FortNightly"
      ) {
        setfortnightlyBtn(true);
        setWeeklyBtn(false);
        setMonthlyBtn(false);
      } else if (
        props.property_tenant_info_data?.data?.folio?.rent_type == "Monthly"
      ) {
        setfortnightlyBtn(false);
        setWeeklyBtn(false);
        setMonthlyBtn(true);
      }
      setLoader(false);
      props.getPropertyTenantInfoFresh();
    }
  }, [props.property_tenant_info_loading]);

  const handlePropertyFormTwoValues = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // Form 2 button handler function
  const toggleMonthlyBtn = () => {
    setState({ ...state, rent_type: "Monthly" });
    setMonthlyBtn(true);
    setWeeklyBtn(false);
    setfortnightlyBtn(false);
  };
  const toggleWeeklyBtn = () => {
    setState({ ...state, rent_type: "Weekly" });
    setWeeklyBtn(true);
    setMonthlyBtn(false);
    setfortnightlyBtn(false);
  };
  const togglefortnightlyBtn = () => {
    setState({ ...state, rent_type: "FortNightly" });
    setfortnightlyBtn(true);
    setWeeklyBtn(false);
    setMonthlyBtn(false);
  };

  const handleForm = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleCalculationRent = () => {
    if (state.rentDue) {
      let rent_due = 0;
      if (state.rent_type == "Weekly") {
        rent_due =
          (Number(state.rent) / 7) * Number(state.days) -
          Number(state.part_paid);
      } else if (state.rent_type == "FortNightly") {
        rent_due =
          (Number(state.rent) / 14) * Number(state.days) -
          Number(state.part_paid);
      } else if (state.rent_type == "Monthly") {
        let month = floor(Number(state.days) / 30);
        let days = Number(state.days) % 30;
        rent_due =
          Number(state.rent) * month +
          ((Number(state.rent) * 12) / 365) * Number(days) -
          Number(state.part_paid);
      }
      setState({
        ...state,
        ["calculate"]: true,
        rent_due: parseFloat(rent_due).toFixed(2),
      });
    } else if (state.paidTo) {
      let paid_balance = Number(state.part_paid) + Number(state.pay);
      let rent_cycle = Number(paid_balance) / Number(state.rent);
      let number_of_cycle = floor(rent_cycle);
      let part_paid =
        paid_balance - Number(number_of_cycle) * Number(state.rent);
      let calculate_paid_to = "";
      if (state.rent_type == "Weekly") {
        let count_day = number_of_cycle * 7;
        calculate_paid_to = moment(state.paid_to)
          .add(count_day, "days")
          .format("DD-MM-YYYY");
      } else if (state.rent_type == "FortNightly") {
        let count_day = number_of_cycle * 14;
        calculate_paid_to = moment(state.paid_to)
          .add(count_day, "days")
          .format("DD-MM-YYYY");
      } else if (state.rent_type == "Monthly") {
        // let count_day=number_of_cycle*30;
        console.log(state.paid_to);
        calculate_paid_to = moment(state.paid_to)
          .add(number_of_cycle, "month")
          .format("DD-MM-YYYY");
      }
      setState({
        ...state,
        ["calculate"]: true,
        calculate_paid_to: calculate_paid_to,
        calculate_part_paid: parseFloat(part_paid).toFixed(2),
      });
    }
  };

  const datePaidToHandler = (selectedDates, dateStr, instance) => {
    setState(prev => ({ ...prev, ["paid_to"]: dateStr }));
    dayCalculation(dateStr, state.due_to);
  };
  const dateDueToHandler = (selectedDates, dateStr, instance) => {
    setState({ ...state, ["due_to"]: dateStr });
    dayCalculation(state.paid_to, dateStr);
  };
  const toggleModeBtn = (fresh) => {
    setState(prev => ({
      ...prev,
      linked: !prev.linked,
      feeEdit: !prev.feeEdit,
    }));
    console.log(fresh);
    if (fresh) {
      refresh();
    }
  };
  const toggleCalculateBtn = () => {
    setState(prev => ({
      ...prev,
      rentDue: !prev.rentDue,
      paidTo: !prev.paidTo,
    }));
  };

  const dayCalculation = (paid_to, due_to) => {
    var date1 = moment(paid_to);
    var date2 = moment(due_to);

    const days = date2.diff(date1, "days");

    setState(prev => ({ ...prev, days: days }));
  };

  const daysCalculation = e => {
    var date = moment(state.paid_to)
      .add(e.target.value, "days")
      .format("YYYY-MM-DD");
    setState({ ...state, days: e.target.value, due_to: date });
  };

  const refresh = () => {
    setState(prev => ({
      ...prev,
      rent: 0,
      part_paid: "0",
      paid_to: "",
      rentDue: true,
      paidTo: false,
      linked: true,
      feeEdit: false,
      due_to: due_to,
      calculate: false,
    }));
    setInit(true);
  };

  return (
    <Fragment>
      <Modal
        size="lg"
        isOpen={props.rentCalculationState}
        toggle={props.toggleCalculationRent}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            Rent Calculation
          </h5>
          <button
            type="button"
            onClick={props.toggleCalculationRent}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <Row>
            <Col sm="12">
            {loader && <Loder status={loader} />}
              <Row>
                <Col md={12}>
                  <Row className="mb-3">
                    <Col md={4}>
                      <Label for="Mode" className="form-label text-dark">
                        Mode
                      </Label>
                    </Col>
                    <Col md={8}>
                      <Row className="mb-3">
                        <Col md={8}>
                          <div className="d-flex">
                            <div className="btn-group btn-group-justified">
                              <div className="btn-group">
                                <Button
                                  color={state.linked ? "secondary" : "light"}
                                  onClick={()=>toggleModeBtn(true)}
                                >
                                  {state.linked ? (
                                    <i className="bx bx-comment-check"></i>
                                  ) : null}
                                  <span> Linked</span>
                                </Button>
                              </div>
                              <div className="btn-group">
                                <Button
                                  color={state.feeEdit ? "secondary" : "light"}
                                  onClick={()=>toggleModeBtn(false)}
                                >
                                  {state.feeEdit ? (
                                    <i className="bx bx-comment-check"></i>
                                  ) : null}
                                  <span>Fee Edit</span>
                                </Button>
                              </div>
                            </div>
                          </div>

                          {state.linked && (
                            <p className="mb-1 text-secondary">
                              Rent adjustments and deductions included
                            </p>
                          )}
                          {state.feeEdit && (
                            <p className="mb-1 text-secondary">
                              No rent adjustments or deductions are applied
                            </p>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4}>
                      <Label for="rent" className="form-label text-dark">
                        Rent
                      </Label>
                    </Col>
                    <Col md={8}>
                      <Row className="mb-3">
                        <Col md={4} className="d-flex">
                          <div className="d-flex flex-column">
                            <input
                              name="rent"
                              type="text"
                              placeholder="0.00"
                              className={"rounded-end form-control"}
                              style={{
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                              }}
                              id="rent"
                              value={state.rent}
                              onChange={handleForm}
                              disabled={state.linked}
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
                        <Col md={8}>
                          <div className="btn-group btn-group-justified">
                            <div className="btn-group">
                              <Button
                                color={WeeklylyBtn ? "secondary" : "light"}
                                onClick={e => {
                                  toggleWeeklyBtn(e);
                                }}
                                disabled={state.linked}
                              >
                                <span> Weekly</span>
                              </Button>
                            </div>
                            <div className="btn-group">
                              <Button
                                color={fortnightlyBtn ? "secondary" : "light"}
                                onClick={e => {
                                  togglefortnightlyBtn(e);
                                }}
                                disabled={state.linked}
                              >
                                <span> fortnightly</span>
                              </Button>
                            </div>
                            <div className="btn-group">
                              <Button
                                color={MonthlyBtn ? "secondary" : "light"}
                                onClick={e => {
                                  toggleMonthlyBtn(e);
                                }}
                                disabled={state.linked}
                              >
                                <span> Monthly</span>
                              </Button>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4}>
                      <Label for="paid_to" className="form-label text-dark">
                        Paid to
                      </Label>
                    </Col>
                    <Col md={8}>
                      <Row className="mb-3">
                        <Col md={4} className="d-flex">
                          {state.linked && (
                            <Flatpickr
                              className="form-control d-block"
                              placeholder="Pick a date..."
                              value={state.paid_to}
                              options={{
                                altInput: true,
                                format: "d/m/Y",
                                altFormat: "d/m/Y",
                                onChange: datePaidToHandler,
                              }}
                              disabled={true}
                            />
                          )}
                          {state.feeEdit && (
                            <Flatpickr
                              className="form-control d-block"
                              placeholder="Pick a date..."
                              value={state.paid_to}
                              options={{
                                altInput: true,
                                format: "d/m/Y",
                                altFormat: "d/m/Y",
                                onChange: datePaidToHandler,
                              }}
                            />
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4}>
                      <Label for="part_paid" className="form-label text-dark">
                        Part paid
                      </Label>
                    </Col>
                    <Col md={8}>
                      <Row className="mb-3">
                        <Col md={4} className="d-flex">
                          <div className="d-flex flex-column">
                            <input
                              name="part_paid"
                              id="part_paid"
                              type="text"
                              placeholder="0.00"
                              className={"form-control"}
                              style={{
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                              }}
                              value={state.part_paid}
                              onChange={handlePropertyFormTwoValues}
                              disabled={state.linked}
                            />
                          </div>
                          <span className="input-group-append">
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
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4}>
                      <Label for="Calculate" className="form-label text-dark">
                        Calculate
                      </Label>
                    </Col>
                    <Col md={8}>
                      <Row className="mb-3">
                        <Col md={8} className="d-flex">
                          <div className="btn-group btn-group-justified">
                            <div className="btn-group">
                              <Button
                                color={state.rentDue ? "secondary" : "light"}
                                onClick={toggleCalculateBtn}
                              >
                                {state.rentDue ? (
                                  <i className="bx bx-comment-check"></i>
                                ) : null}
                                <span> Rent Due</span>
                              </Button>
                            </div>
                            <div className="btn-group">
                              <Button
                                color={state.paidTo ? "secondary" : "light"}
                                onClick={toggleCalculateBtn}
                              >
                                {state.paidTo ? (
                                  <i className="bx bx-comment-check"></i>
                                ) : null}
                                <span> Paid to</span>
                              </Button>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  {state.rentDue && (
                    <Row className="mb-3">
                      <Col md={4}>
                        <Label for="due_to" className="form-label text-dark">
                          Due to
                        </Label>
                      </Col>
                      <Col md={8}>
                        <Row className="mb-3">
                          <Col md={4} className="d-flex">
                            <Flatpickr
                              className="form-control d-block"
                              placeholder="Pick a date..."
                              value={state.due_to}
                              options={{
                                altInput: true,
                                format: "d/m/Y",
                                altFormat: "d/m/Y",
                                onChange: dateDueToHandler,
                              }}
                            />
                          </Col>
                          <Col md={3}>
                            <input
                              name="days"
                              id="days"
                              type="text"
                              placeholder="0"
                              className={"form-control"}
                              style={{
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                              }}
                              value={state.days}
                              onChange={e => daysCalculation(e)}
                            />
                          </Col>
                          <Col md={3} className="mt-2">
                            Days
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  )}
                  {state.paidTo && (
                    <Row className="mb-3">
                      <Col md={4}>
                        <Label for="pay" className="form-label text-dark">
                          Pay
                        </Label>
                      </Col>
                      <Col md={8}>
                        <Row className="mb-3">
                          <Col md={4} className="d-flex">
                            <div className="d-flex flex-column">
                              <input
                                name="pay"
                                type="text"
                                placeholder="0.00"
                                className={"rounded-end form-control"}
                                style={{
                                  borderTopRightRadius: 0,
                                  borderBottomRightRadius: 0,
                                }}
                                id="pay"
                                value={state.pay}
                                onChange={handleForm}
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
                          <Col md={8}></Col>
                        </Row>
                      </Col>
                    </Row>
                  )}
                  {state.calculate && (
                    <Row className="mb-3">
                      <Col md={12}>
                        <h4>
                          <i className="fas fa-info-circle"></i> Result
                        </h4>
                        <Row className="p-3 d-flex">
                          {state.rentDue && (
                            <Col
                              className="d-flex flex-column justify-content-center"
                              style={{
                                borderStyle: "dotted",
                                borderWidth: "thin",
                                borderColor: "#DCDCDC",
                                backgroundColor: "#F0FFFF",
                                height: "70px",
                              }}
                            >
                              <span className="text-muted fw-bold">
                                Rent Due
                              </span>
                              <span className="text-muted">
                                {" "}
                                {state.rent_due ? state.rent_due : "0.00"}
                              </span>
                            </Col>
                          )}
                          {state.paidTo && (
                            <>
                              <Col
                                className="d-flex flex-column justify-content-center"
                                style={{
                                  borderStyle: "dotted",
                                  borderWidth: "thin",
                                  borderColor: "#DCDCDC",
                                  backgroundColor: "#F0FFFF",
                                }}
                              >
                                <span className="text-muted fw-bold">
                                  Paid to
                                </span>
                                <span className="text-muted">
                                  {state.calculate_paid_to}
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
                              >
                                <span className="text-muted fw-bold">
                                  Part Paid
                                </span>
                                <span className="text-muted">
                                  {state.calculate_part_paid}৳
                                </span>
                              </Col>
                            </>
                          )}
                        </Row>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={refresh}
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={props.toggleCalculationRent}
            className="btn btn-danger"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={handleCalculationRent}
          >
            <i className="fas fa-calculator"></i> Calculate
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = gstate => {
  const { property_tenant_info_data, property_tenant_info_loading } =
    gstate.property;

  return {
    property_tenant_info_data,
    property_tenant_info_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getPropertyTenantInfo,
    getPropertyTenantInfoFresh,
  })(RentCalculation)
);
