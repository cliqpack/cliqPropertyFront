import moment from "moment";
import React, { useEffect, useState } from "react";
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
  Form,
  FormGroup,
  FormText,
} from "reactstrap";
import { connect } from "react-redux";
import Select from "react-select";

import {
  removeAdjustment,
  removeAdjustmentFresh,
  adjustmentsDataFresh,
} from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";

const RemoveAdjustmentsModal = props => {
  const [state, setState] = useState();
  const handleValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleClose = () =>
    props.setState(prev => ({
      ...prev,
      showModalRemove: false,
      showModalRemoveData: [],
      selected: []
    }));

  const handleSave = e => {
    e.preventDefault();
    props.removeAdjustment(props.actionArray, state);
    handleClose();
  };

  return (
    <>
      <Modal
        isOpen={props.state.showModalRemove}
        toggle={props.toggle}
        scrollable={true}
      >
        <ModalHeader toggle={props.toggle}>
          <span className="text-primary">Remove Adjustment</span>
        </ModalHeader>

        <ModalBody>
          <div>

            <div
              // className="mb-3 w-75 mx-3"
            >
              <Row className="d-flex align-items-center">
                <Col md={3}>
                  <Label for="refernce" className="form-label">
                    Reason for removal
                  </Label>
                </Col>

                <Col md={9}>
                  <input
                    name="reason"
                    type="text"
                    placeholder="type reason for removing"
                    onChange={handleValues}
                    className="form-control"
                  />

                </Col>
              </Row>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex justify-content-end">
            <div>
              <button
                type="submit"
                className="btn btn-info"
                onClick={handleClose}
              >
                <i className="fas fa-times me-1"></i> No
              </button>
              <button
                type="submit"
                className="btn btn-danger ms-2"
                onClick={handleSave}
              >
                <i className="fas fa-file-alt me-1"></i> Yes
              </button>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};
const mapStateToProps = gstate => {
  const { rmv_adjustment_loading } = gstate.Reconciliations;

  return {
    rmv_adjustment_loading,
  };
};

export default connect(mapStateToProps, {
  removeAdjustment,
  removeAdjustmentFresh,
  adjustmentsDataFresh,
})(RemoveAdjustmentsModal);
