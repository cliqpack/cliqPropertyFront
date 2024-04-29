import React, { Fragment, useState, useEffect } from "react";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
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
} from "reactstrap";
import { rentDiscount, rentDiscountFresh } from "store/actions";
import toastr from "toastr";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import classnames from "classnames";

const RentDiscount = props => {
  const [state, setState] = useState();
  const [state2, setState2] = useState({
    schedule_for: moment(props.state2?.paid_to).add(1, 'days').format('YYYY-MM-DD'),
    discount_amount: "",
  });
  
  console.log(props.state2);

  useEffect(() => {
    if (props.rent_discount_add_loading == "Success") {
      toastr.success("Rent Discount Added successfully");
      props.rentDiscountFresh();
      props.toggleDiscountRent();
    }
  }, [props.rent_discount_add_loading]);

  const handlePropertyFormTwoValues = e => {
    setState2({
      ...state2,
      [e.target.name]: e.target.value,
    });
  };

  const handleDiscountRent = e => {
    props.rentDiscount(state2, props.cid);
  };

  const dateMoveOutHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ["schedule_for"]: dateStr });
  };

  return (
    <Fragment>
      <Modal
        size="lg"
        isOpen={props.rentDiscountState}
        toggle={props.toggleDiscountRent}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            Rent Discount
          </h5>
          <button
            type="button"
            onClick={props.toggleDiscountRent}
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
              <Row>
                <Col md={12}>
                  <Card className="mt-3">
                    <div className="p-2" style={{ backgroundColor: "#87CEEB" }}>
                      <p>
                        <i className="fas fa-lightbulb me-2 text-primary"></i>{" "}
                        Rent Discount
                      </p>
                      <ul className="ms-2">
                        <li>
                          Reduces the amount of rent due for a single unpaid
                          rent period
                        </li>
                        <li>
                          Rent amount cannot be discounted to less than one
                          dollar
                        </li>
                        <li>
                          The rent period must still be receipted or credited to
                          advance the paid to date
                        </li>
                      </ul>
                    </div>
                  </Card>
                  <Row className="mb-3">
                    <Col md={3}>
                      <Label
                        for="schedule_for"
                        className="form-label text-dark"
                      >
                        Schedule for
                      </Label>
                    </Col>
                    <Col md={4} className="d-flex align-items-start">
                      <Flatpickr
                        className="form-control d-block"
                        placeholder="Pick a date..."
                        value={state2.schedule_for}
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
                        for="discount_amount"
                        className="form-label text-dark"
                      >
                        Discount Amount
                      </Label>
                    </Col>
                    <Col md={4} className="d-flex align-items-start">
                      <input
                        placeholder="0.00"
                        name="discount_amount"
                        id="discount_amount"
                        type="text"
                        className="form-control"
                        value={state2.discount_amount}
                        onChange={handlePropertyFormTwoValues}
                      />
                    </Col>
                    <Col md={4} className="d-flex align-items-start">
                      <p className="mt-1">
                        <i className="fas fa-info-circle"></i> Tenant is paid up
                        to {moment(props.state2?.paid_to).format("DD-MMM-YYYY")}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={props.toggleDiscountRent}
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button type="button" className="btn btn-info" onClick={handleDiscountRent}>
            Save
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    rent_discount_add_data,
    rent_discount_add_error,
    rent_discount_add_loading,
  } = gstate.property;

  return {
    rent_discount_add_data,
    rent_discount_add_error,
    rent_discount_add_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    rentDiscount,
    rentDiscountFresh,
  })(RentDiscount)
);
