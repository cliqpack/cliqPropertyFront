import moment from "moment";
import React, { useState } from "react";
import {
  Col,
  Row,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { connect } from "react-redux";
import {
  addAdjustment,
  addAdjustmentFresh,
  adjustmentsDataFresh,
} from "store/actions";
import { useParams } from "react-router-dom";
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
const AdjustmentModal = props => {
  const { id } = useParams();
  const currentDate = moment().format("YYYY-MM-DD");
  const [state, setState] = useState({ date: currentDate });
  const handleValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleAmountValues = e => {
    setState({ ...state, [e.target.name]: Number(e.target.value) ? e.target.value : ''});
  };
  const handleClose = () =>
    props.setState(prev => ({ ...prev, showModalAdd: false, showModalRemoveData: [] }));
  const handleSave = e => {
    e.preventDefault();
    props.addAdjustment(id, state);
    handleClose();
    setState({});
  };
  const dateHandler = (selectedDates, dateStr, instance) => {
    setState({ ...state, ['date']: dateStr });
  }
  return (
    <>
      <button type="button" className="btn btn-info" onClick={props.toggle}>
        Add Adjustments
      </button>
      <Modal
        size="lg"
        isOpen={props.state.showModalAdd}
        toggle={props.toggle}
        scrollable={true}
      >
        <ModalHeader toggle={props.toggle}>
          <span className="text-primary">Add Adjustment</span>
        </ModalHeader>
        <ModalBody>
          <div>
            <div className="mb-3 w-75">
              <Row className="d-flex align-items-center">
                <Col md={4}>
                  <Label for="refernce" className="form-label">
                    Apply on
                  </Label>
                </Col>
                <Col md={4}>
                  <Flatpickr
                    className="form-control d-block"
                    placeholder="Pick a date..."
                    value={state.date}
                    options={{
                      altInput: true,
                      format: "d/m/Y",
                      altFormat: "d/m/Y",
                      onChange: dateHandler
                    }}
                  />
                </Col>
              </Row>
            </div>
            <div className="mb-3 w-75">
              <Row className="d-flex align-items-center">
                <Col md={4}>
                  <Label for="refernce" className="form-label">
                    Reason of adjustment
                  </Label>
                </Col>
                <Col md={8}>
                  <input
                    name="reason"
                    type="text"
                    placeholder="Reason for adjustment"
                    onChange={handleValues}
                    value={state.reason}
                    className="form-control"
                  />
                </Col>
              </Row>
            </div>
            <div className="mb-3 w-75">
              <Row className="d-flex align-items-center">
                <Col md={4}>
                  <Label for="amount" className="form-label">
                    Amount
                  </Label>
                </Col>
                <Col md={4} className="d-flex">
                  <div className="d-flex flex-column">
                    <input
                      className={
                        "rounded-end form-control"
                      }
                      name="amount"
                      type="text"
                      placeholder="0.00"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      value={
                        state.amount
                      }
                      onChange={
                        handleAmountValues
                      }
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
              </Row>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-info"
              onClick={handleClose}
            >
              <i className="fas fa-times me-1"></i> Close
            </button>
            <button
              type="submit"
              className="btn btn-info ms-2"
              onClick={handleSave}
            >
              <i className="fas fa-file-alt me-1"></i> Save
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};
const mapStateToProps = gstate => {
  const { add_adjustment_loading } = gstate.Reconciliations;
  return {
    add_adjustment_loading,
  };
};
export default connect(mapStateToProps, {
  addAdjustment,
  addAdjustmentFresh,
  adjustmentsDataFresh,
})(AdjustmentModal);