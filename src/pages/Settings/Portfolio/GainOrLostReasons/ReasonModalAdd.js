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
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { connect } from "react-redux";
import Select from "react-select";

import { addReason, addReasonFresh, getReasons, editReason, editReasonFresh } from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";

const ReasonModalAdd = props => {
  const [state, setState] = useState({
    gainBtn: true,
    lostBtn: false,
  });

  console.log(state);

  const stateHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const toggleGainBtn = () => {
    setState({
      ...state,
      gainBtn: true,
      lostBtn: false,
    });
  };

  const toggleLostBtn = () => {
    setState({
      ...state,
      gainBtn: false,
      lostBtn: true,
    });
  };

  const handleSave = () => {
    props.addReason(state)
  };
  const handleEdit = () => {
    props.editReason(state, props.data?.id)
  };

  useEffect(() => {
    if (props.edit_reason_loading == 'Success') {
      toastr.success('Success');
      props.editReasonFresh()
      props.getReasons()
      props.toggle()
    }
    if (props.edit_reason_loading == 'Failed') {
      toastr.error('Failed');
      props.editReasonFresh()
    }
    if (props.add_reason_loading == "Success") {
      toastr.success('Success');
      props.addReasonFresh();
      props.getReasons();
      props.toggle();
    }
    if (props.data) {
      console.log('in');
      if (props.data.id) {
        setState({ ...state, description: props.data.reason, gainBtn: props.data.type == 'Gain' ? true : false, lostBtn: props.data.type == 'Lost' ? true : false })
      }
    }
  }, [props.add_reason_loading, props.data, props.edit_reason_loading]);

  console.log(props.data);

  return (
    <>
      <Modal isOpen={props.reasonModal} toggle={props.toggle} scrollable={true}>
        <ModalHeader toggle={props.toggle}>New Reason</ModalHeader>

        <ModalBody>
          <Row>
            <Col lg={12}>
              <Row className="py-2">
                <Col md={4} className="d-flex justify-content-start ps-5">
                  Reason
                </Col>
                <Col md={8} className="">
                  <div className="w-75">
                    <input
                      className="form-control"
                      type="text"
                      name="description"
                      value={state.description}
                      placeholder="Description"
                      onChange={stateHandler}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="py-3">
                <Col md={4} className="d-flex justify-content-start ps-5">
                  Type
                </Col>
                <Col md={8} className="">
                  <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                      <Button
                        color={state.gainBtn ? "secondary" : "light"}
                        onClick={toggleGainBtn}
                      >
                        {state.gainBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Gain</span>
                      </Button>
                    </div>
                    <div className="btn-group">
                      <Button
                        color={state.lostBtn ? "secondary" : "light"}
                        onClick={toggleLostBtn}
                      >
                        {state.lostBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Lost</span>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={e => {
            props.toggle(); setState({
              gainBtn: true,
              lostBtn: false,
            })
          }}>
            <i className="fas fa-times me-1"></i>Cancel
          </Button>
          {props.data?.id ?

            <Button color="info" onClick={handleEdit}>
              <i className="fas fa-file-alt me-1"></i> Save
            </Button>
            :
            <Button color="info" onClick={handleSave}>
              <i className="fas fa-file-alt me-1"></i> Save
            </Button>

          }
        </ModalFooter>
      </Modal>

    </>
  );
};
const mapStateToProps = gstate => {
  const { add_reason_loading, edit_reason_loading } = gstate.Portfolio;

  return { add_reason_loading, edit_reason_loading };
};
export default connect(mapStateToProps, { addReason, addReasonFresh, getReasons, editReason, editReasonFresh })(ReasonModalAdd);
