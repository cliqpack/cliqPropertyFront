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

import {
  companyDataForPortfolioLabelsEdit,
  companyDataForPortfolioLabelsEditFresh,
  companyDataForPortfolioLabel,
} from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";
// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const LabelEditModal = props => {
  const [state, setState] = useState({
    propertyBtn: true,
    contactBtn: false,
    jobBtn: false,
    inspectBtn: false,
    taskBtn: false,
    infoBtn: true,
    impBtn: false,
  });

  console.log(state);

  const stateHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const togglePropertyBtn = () => {
    setState({
      ...state,
      type: "Property",
      propertyBtn: true,
      contactBtn: false,
      jobBtn: false,
      inspectBtn: false,
      taskBtn: false,
    });
  };

  const toggleContactBtn = () => {
    setState({
      ...state,
      type: "Contact",

      propertyBtn: false,
      contactBtn: true,
      jobBtn: false,
      inspectBtn: false,
      taskBtn: false,
      inspectBtn: false,
      taskBtn: false,
    });
  };

  const toggleJobBtn = () => {
    setState({
      ...state,
      type: "Job",

      propertyBtn: false,
      contactBtn: false,
      jobBtn: true,
      inspectBtn: false,
      taskBtn: false,
    });
  };
  const toggleInspectBtn = () => {
    setState({
      ...state,
      type: "Inspection",

      propertyBtn: false,
      contactBtn: false,
      jobBtn: false,
      inspectBtn: true,
      taskBtn: false,
    });
  };
  const toggleTaskBtn = () => {
    setState({
      ...state,
      type: "Task",
      propertyBtn: false,
      contactBtn: false,
      jobBtn: false,
      inspectBtn: false,
      taskBtn: true,
    });
  };
  const togglePriorityBtn = () => {
    setState({
      ...state,
      priority: "Info",
      infoBtn: true,
      impBtn: false,
    });
  };
  const toggleImpBtn = () => {
    setState({
      ...state,
      priority: "Important",
      infoBtn: false,
      impBtn: true,
    });
  };

  const handleSave = e => {
    e.preventDefault();
    props.companyDataForPortfolioLabelsEdit(state);
  };

  useEffect(() => {
    if (props.label_edit_loading === "Success") {
      toastr.success("Success");

      props.companyDataForPortfolioLabelsEditFresh();
      props.companyDataForPortfolioLabel();
      props.toggle();
    }
    if (props.data != undefined) {
      setState(prev => ({
        ...prev,
        id: props.data.id,
        label_name: props.data.label_name,
        type: props.data.type,
        propertyBtn: props.data.type == "Property" ? true : false,
        contactBtn: props.data.type == "Contact" ? true : false,
        jobBtn: props.data.type == "Job" ? true : false,
        inspectBtn: props.data.type == "Inspection" ? true : false,
        taskBtn: props.data.type == "Task" ? true : false,
        priority: props.data.priority,
        infoBtn: props.data.priority == "Info" ? true : false,
        impBtn: props.data.priority == "Important" ? true : false,
      }));
    }
  }, [props.label_edit_loading, props.data]);

  console.log(props.data);

  return (
    <>
      <Modal
        isOpen={props.labelModalEdit}
        toggle={props.toggle}
        scrollable={true}
        size="lg"
      >
        <ModalHeader toggle={props.toggle} className="text-info">Edit Label</ModalHeader>

        <ModalBody>
          <Row>
            <Col lg={12}>
              <Row className="py-2">
                <Col
                  md={3}
                  className="d-flex justify-content-center align-items-center ps-5"
                >
                  Name
                </Col>
                <Col md={8} className="">
                  <div className="w-50">
                    <input
                      className="form-control"
                      type="text"
                      name="label_name"
                      value={state.label_name}
                      placeholder="Label name"
                      onChange={stateHandler}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="py-3">
                <Col
                  md={3}
                  className="d-flex justify-content-center align-items-center ps-5"
                >
                  Type
                </Col>
                <Col md={8} className="fw-bold">
                  {/* <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                      <Button
                        color={state.propertyBtn ? "secondary" : "light"}
                        onClick={togglePropertyBtn}
                      >
                        {state.propertyBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Property</span>
                      </Button>
                    </div>
                    <div className="btn-group">
                      <Button
                        color={state.contactBtn ? "secondary" : "light"}
                        onClick={toggleContactBtn}
                      >
                        {state.contactBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Contact</span>
                      </Button>
                    </div>
                    <div className="btn-group">
                      <Button
                        color={state.jobBtn ? "secondary" : "light"}
                        onClick={toggleJobBtn}
                      >
                        {state.jobBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Job</span>
                      </Button>
                    </div>
                    <div className="btn-group">
                      <Button
                        color={state.inspectBtn ? "secondary" : "light"}
                        onClick={toggleInspectBtn}
                      >
                        {state.inspectBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Inspection</span>
                      </Button>
                    </div>
                    <div className="btn-group">
                      <Button
                        color={state.taskBtn ? "secondary" : "light"}
                        onClick={toggleTaskBtn}
                      >
                        {state.taskBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Task</span>
                      </Button>
                    </div>
                  </div> */}
                  {props.data?.type}
                </Col>
              </Row>

              <Row className="py-3">
                <Col
                  md={3}
                  className="d-flex justify-content-center align-items-center ps-5"
                >
                  Priority
                </Col>
                <Col md={8} className="">
                  <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                      <Button
                        color={state.infoBtn ? "secondary" : "light"}
                        onClick={togglePriorityBtn}
                      >
                        {state.infoBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Info</span>
                      </Button>
                    </div>
                    <div className="btn-group">
                      <Button
                        color={state.impBtn ? "secondary" : "light"}
                        onClick={toggleImpBtn}
                      >
                        {state.impBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Important</span>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="py-2">
                <Col
                  md={3}
                  className="d-flex justify-content-center align-items-center ps-5"
                >
                  Preview
                </Col>
                <Col md={8} className="">                  <div className={`w-50 ${state.infoBtn ? 'text-info' : 'text-danger'}`}>{state.label_name}</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={props.toggle}>
            <i className="fas fa-times me-1"></i>Cancel
          </Button>
          <Button color="info" onClick={handleSave}>
            <i className="fas fa-file-alt me-1"></i> Save
          </Button>
        </ModalFooter>
      </Modal>

      {/* ===============Inspection modal ends here ================*/}
    </>
  );
};
const mapStateToProps = gstate => {
  const { label_edit_loading } = gstate.Portfolio;

  return {
    label_edit_loading,
  };
};
export default connect(mapStateToProps, {
  companyDataForPortfolioLabelsEdit,
  companyDataForPortfolioLabelsEditFresh,
  companyDataForPortfolioLabel,
})(LabelEditModal);
