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
  addChartOfAccounts,
  addChartOfAccountsFresh,
  getChartOfAccounts,
} from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";

const AccountsAddModal = props => {
  const [state, setState] = useState({
    selectedCategory: [],
    optionCategory: [],
    selectedFeeType: [],
    optionFeeType: [],
    incomeBtn: true,
    expenseBtn: false,
    inclusiveBtn: true,
    exclusiveBtn: false,
    yesBtn: true,
    noBtn: false,

    type: "Income",
    tax: 1,
    hidden: 1,
  });

  const stateHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const toggleYesBtn = () => {
    setState({
      ...state,
      hidden: 1,
      yesBtn: true,
      noBtn: false,
    });
  };

  const toggleNoBtn = () => {
    setState({
      ...state,
      hidden: 0,
      yesBtn: false,
      noBtn: true,
    });
  };
  const toggleIncomeBtn = () => {
    setState({
      ...state,
      type: "Income",
      incomeBtn: true,
      expenseBtn: false,
    });
  };

  const toggleExpenseBtn = () => {
    setState({
      ...state,
      type: "Expense",
      incomeBtn: false,
      expenseBtn: true,
    });
  };

  const toggleInclusiveBtn = () => {
    setState({
      ...state,
      tax: 1,
      inclusiveBtn: true,
      exclusiveBtn: false,
    });
  };

  const toggleExclusiveBtn = () => {
    setState({
      ...state,
      tax: 0,

      inclusiveBtn: false,
      exclusiveBtn: true,
    });
  };

  const handleSelectGroupCategory = e => { };
  const handleSelectGroupFeeType = e => {
    setState({ ...state, selectedFeeType: e });
  };

  const handleSave = e => {
    e.preventDefault();
    props.addChartOfAccounts(state);
  };

  useEffect(() => {
    if (props.add_chart_of_accounts_loading === "Success") {
      toastr.success("Success");

      props.addChartOfAccountsFresh();
      props.getChartOfAccounts();
      props.toggle();
    }
  }, [props.add_chart_of_accounts_loading]);
  console.log(props.add_chart_of_accounts_loading);

  return (
    <>
      <Modal
        isOpen={props.accountsModal}
        toggle={props.toggle}
        scrollable={true}
        size="lg"
      >
        <ModalHeader toggle={props.toggle}>Add Accounts</ModalHeader>

        <ModalBody>
          <Row>
            <Col lg={12}>
              <Row className="py-3">
                <Col md={4} className="d-flex justify-content-start ps-5">
                  Account type
                </Col>
                <Col md={8} className="">
                  <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                      <Button
                        color={state.incomeBtn ? "secondary" : "light"}
                        onClick={toggleIncomeBtn}
                      >
                        {state.incomeBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Income</span>
                      </Button>
                    </div>
                    <div className="btn-group">
                      <Button
                        color={state.expenseBtn ? "secondary" : "light"}
                        onClick={toggleExpenseBtn}
                      >
                        {state.expenseBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Expense</span>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="py-2">
                <Col md={4} className="d-flex justify-content-start ps-5">
                  Name
                </Col>
                <Col md={8} className="">
                  <div className="w-50">
                    <input
                      className="form-control"
                      type="text"
                      name="account_name"
                      placeholder=""
                      onChange={stateHandler}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="py-2">
                <Col md={4} className="d-flex justify-content-start ps-5">
                  Description
                </Col>
                <Col md={8} className="">
                  <div className="w-50">
                    <input
                      className="form-control"
                      type="text"
                      name="description"
                      placeholder="Bill details (optional) "
                      onChange={stateHandler}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="py-2">
                <Col md={4} className="d-flex justify-content-start ps-5">
                  Account number
                </Col>
                <Col md={8} className="">
                  <div className="w-50">
                    <input
                      className="form-control"
                      type="text"
                      name="account_number"
                      placeholder="0"
                      onChange={stateHandler}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="py-3">
                <Col md={4} className="d-flex justify-content-start ps-5">
                  Tax
                </Col>
                <Col md={8} className="">
                  <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                      <Button
                        color={state.inclusiveBtn ? "secondary" : "light"}
                        onClick={toggleInclusiveBtn}
                      >
                        {state.inclusiveBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Tax Inclusive</span>
                      </Button>
                    </div>
                    <div className="btn-group">
                      <Button
                        color={state.exclusiveBtn ? "secondary" : "light"}
                        onClick={toggleExclusiveBtn}
                      >
                        {state.exclusiveBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Tax Exclusive</span>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              {/* <Row className="py-1 mb-2">
                <Col md={4} className="d-flex justify-content-start ps-5">
                  Category
                </Col>
                <Col md={8} className="">
                  <div className="w-50">
                    <Select
                      value={state.selectedCategory}
                      onChange={handleSelectGroupCategory}
                      options={state.optionCategory}
                      classNamePrefix="select2-selection"
                    />
                  </div>
                </Col>
              </Row> */}
              <Row className="py-3">
                <Col md={4} className="d-flex justify-content-start ps-5">
                  Hidden
                </Col>
                <Col md={8} className="">
                  <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                      <Button
                        color={state.yesBtn ? "secondary" : "light"}
                        onClick={toggleYesBtn}
                      >
                        {state.yesBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> Yes</span>
                      </Button>
                    </div>
                    <div className="btn-group">
                      <Button
                        color={state.noBtn ? "secondary" : "light"}
                        onClick={toggleNoBtn}
                      >
                        {state.noBtn ? (
                          <i className="bx bx-comment-check"></i>
                        ) : null}
                        <span> No</span>
                      </Button>
                    </div>
                  </div>
                  <div className="py-3">
                    <i className="" />
                    <span>
                      {" "}
                      Hide applicable transactions from the folio summary
                    </span>
                  </div>
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
  const { add_chart_of_accounts_loading } = gstate.Portfolio;

  return { add_chart_of_accounts_loading };
};
export default connect(mapStateToProps, {
  addChartOfAccounts,
  addChartOfAccountsFresh,
  getChartOfAccounts,
})(AccountsAddModal);
