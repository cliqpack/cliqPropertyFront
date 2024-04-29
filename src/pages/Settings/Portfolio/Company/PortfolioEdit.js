import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes, { number } from "prop-types";
import { useDispatch } from "react-redux";
import {
  Card,
  Alert,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Label,
  Input,
  Button,
  CardHeader,
} from "reactstrap";
import Select from "react-select";
import {
  companyDataForPortfolio,
  companyDataForPortfolioEdit,
  companyDataForPortfolioEditFresh,
  companyDataForPortfolioCountry,
  companyDataForPortfolioRegion,
} from "store/actions";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import InvoicePaymentsModal from "./InvoicePaymentsModal";
import InspectionReportModal from "./InspectionReportModal";
import WorkingHoursModal from "./WorkingHoursModal";
import BootstrapTooltip from "common/Tooltip/BootstrapTooltip";

document.title = "CliqProperty";

const PortfolioEdit = props => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false)
  const [init, setInit] = useState(true);
  const [status, setStatus] = useState(false);
  const toggle = () => setStatus(prev => !prev)
  const [state, setState] = useState({
    selectedCountry: [],
    optionCountry: [
      // {
      //   options: [
      //     { label: "Australia", value: "Australia" },
      //     { label: "New Zealand", value: "New Zealand" },
      //   ],
      // },
    ],
    selectedRegion: [],
    optionRegion: [
      // {
      //   options: [
      //     { label: "New South Wales", value: "New South Wales" },
      //     { label: "Victoria", value: "Victoria" },
      //   ],
      // },
    ],
    workOrderYesBtn: true,
    workOrderNoBtn: false,
    tenantMoveYesBtn: true,
    tenantMoveNoBtn: false,
    rentalPositionYesBtn: true,
    rentalPositionNoBtn: false,
    effectivePaidDatesYesBtn: true,
    effectivePaidDatesNoBtn: false,
    ownerStatementsYesBtn: true,
    ownerStatementsNoBtn: false,
    billApprovalYesBtn: true,
    billApprovalNoBtn: false,
    testProgramYesBtn: true,
    testProgramNoBtn: false,
    clientAccessYesBtn: true,
    clientAccessNoBtn: false,
  });

  // console.log(state);


  const [workModal, setWorkModal] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [inspectionModal, setInspectionModal] = useState(false);

  const toggleWorkModal = () => {
    setWorkModal(prev => !prev);
  };
  const toggleInvoiceModal = () => {
    setInvoiceModal(prev => !prev);
  };
  const toggleInspectionModal = () => {
    setInspectionModal(prev => !prev);
  };

  const handleSelectGroup = e => { };

  const handleSelectGroupCountry = e => {
    setState({ ...state, selectedCountry: e });
  };

  const handleSelectGroupRegion = e => {
    setState({ ...state, selectedRegion: e });
  };

  const toggleworkOrderYesBtn = () => {
    setState({
      ...state,
      include_property_key_number: 1,
      workOrderYesBtn: true,
      workOrderNoBtn: false,
    });
  };

  const toggleworkOrderNoBtn = () => {
    setState({
      ...state,
      include_property_key_number: 0,
      workOrderNoBtn: true,
      workOrderYesBtn: false,
    });
  };

  const toggletenantMoveYesBtn = () => {
    setState({
      ...state,
      update_inspection_date: 1,
      tenantMoveYesBtn: true,
      tenantMoveNoBtn: false,
    });
  };

  const toggletenantMoveNoBtn = () => {
    setState({
      ...state,
      update_inspection_date: 0,

      tenantMoveYesBtn: false,
      tenantMoveNoBtn: true,
    });
  };

  const toggleClientAccessYesBtn = () => {
    setState({
      ...state,
      client_access: 1,
      clientAccessYesBtn: true,
      clientAccessNoBtn: false,
    });
  };

  const toggleClientAccessNoBtn = () => {
    setState({
      ...state,
      client_access: 0,
      clientAccessYesBtn: false,
      clientAccessNoBtn: true,
    });
  };

  const togglerentalPositionYesBtn = () => {
    setState({
      ...state,
      rental_position_on_receipts: 1,
      rentalPositionYesBtn: true,
      rentalPositionNoBtn: false,
    });
  };

  const togglerentalPositionNoBtn = () => {
    setState({
      ...state,
      rental_position_on_receipts: 0,

      rentalPositionYesBtn: false,
      rentalPositionNoBtn: true,
    });
  };

  const toggleEffectivePaidDatesYesBtn = () => {
    setState({
      ...state,
      show_effective_paid_to_dates: 1,
      effectivePaidDatesYesBtn: true,
      effectivePaidDatesNoBtn: false,
    });
  };

  const toggleEffectivePaidDatesNoBtn = () => {
    setState({
      ...state,
      show_effective_paid_to_dates: 0,

      effectivePaidDatesYesBtn: false,
      effectivePaidDatesNoBtn: true,
    });
  };

  const toggleOwnerStatementsYesBtn = () => {
    setState({
      ...state,
      include_paid_bills: 1,
      ownerStatementsYesBtn: true,
      ownerStatementsNoBtn: false,
    });
  };

  const toggleOwnerStatementsNoBtn = () => {
    setState({
      ...state,
      include_paid_bills: 0,
      ownerStatementsYesBtn: false,
      ownerStatementsNoBtn: true,
    });
  };

  const toggleBillApprovalYesBtn = () => {
    setState({
      ...state,
      bill_approval: 1,
      billApprovalYesBtn: true,
      billApprovalNoBtn: false,
    });
  };

  const toggleBillApprovalNoBtn = () => {
    setState({
      ...state,
      bill_approval: 0,
      billApprovalYesBtn: false,
      billApprovalNoBtn: true,
    });
  };

  const toggleTestProgramYesBtn = () => {
    setState({
      ...state,
      join_the_test_program: 1,
      testProgramYesBtn: true,
      testProgramNoBtn: false,
    });
  };

  const toggleTestProgramNoBtn = () => {
    setState({
      ...state,
      join_the_test_program: 0,
      testProgramYesBtn: false,
      testProgramNoBtn: true,
    });
  };

  const stateHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSave = e => {
    e.preventDefault();
    setIsLoading(true);
    props.companyDataForPortfolioEdit(state);
  };

  useEffect(() => {
    if (props.company_data_edit_loading === "Success") {
      toastr.success("Success");
      setIsLoading(false)
      props.companyDataForPortfolioEditFresh();
      props.companyDataForPortfolio();
    }
    if (props.company_data_edit_loading === "Failed") {
      toastr.error('Failed')
      setIsLoading(false)
      props.companyDataForPortfolioEditFresh();
    }
    if (props.company_data_loading === false) {
      props.companyDataForPortfolio();
    }

    if (init) {
      props.companyDataForPortfolioCountry();
      props.companyDataForPortfolioRegion();

      setInit(false);
    }
    let optionCountry;
    if (props.cdc_list_data?.country) {
      optionCountry = props.cdc_list_data?.country.map(item => ({
        label: item.country_name,
        value: item.id,
      }));
      setState(prev => ({ ...prev, optionCountry: optionCountry }));
    }
    let optionRegion;
    if (props.cdr_list_data?.region) {
      optionRegion = props.cdr_list_data?.region.map(item => ({
        label: item.region_name,
        value: item.id,
      }));

      setState(prev => ({ ...prev, optionRegion: optionRegion }));
    }

    if (props.company_data?.companySetting) {
      setState(prev => ({
        ...prev,
        portfolio_name:
          props.company_data?.companySetting?.company?.company_name,
        licence_number: props.company_data?.companySetting?.licence_number,
        client_access_url:
          props.company_data?.companySetting?.client_access_url,
        include_property_key_number:
          props.company_data?.companySetting?.include_property_key_number,
        workOrderYesBtn:
          props.company_data?.companySetting?.include_property_key_number == 0
            ? false
            : true,
        workOrderNoBtn:
          props.company_data?.companySetting?.include_property_key_number == 0
            ? true
            : false,
        update_inspection_date:
          props.company_data?.companySetting?.update_inspection_date,
        tenantMoveYesBtn:
          props.company_data?.companySetting?.update_inspection_date == 0
            ? false
            : true,
        tenantMoveNoBtn:
          props.company_data?.companySetting?.update_inspection_date == 0
            ? true
            : false,
        client_access: props.company_data?.companySetting?.client_access,
        clientAccessYesBtn:
          props.company_data?.companySetting?.client_access == 0 ? false : true,
        clientAccessNoBtn:
          props.company_data?.companySetting?.client_access == 0 ? true : false,
        rental_position_on_receipts:
          props.company_data?.companySetting?.rental_position_on_receipts,
        rentalPositionYesBtn:
          props.company_data?.companySetting?.rental_position_on_receipts == 0
            ? false
            : true,
        rentalPositionNoBtn:
          props.company_data?.companySetting?.rental_position_on_receipts == 0
            ? true
            : false,
        show_effective_paid_to_dates:
          props.company_data?.companySetting?.show_effective_paid_to_dates,
        effectivePaidDatesYesBtn:
          props.company_data?.companySetting?.show_effective_paid_to_dates == 0
            ? false
            : true,
        effectivePaidDatesNoBtn:
          props.company_data?.companySetting?.show_effective_paid_to_dates == 0
            ? true
            : false,
        effectivePaidDatesNoBtn:
          props.company_data?.companySetting?.show_effective_paid_to_dates == 0
            ? true
            : false,
        include_paid_bills:
          props.company_data?.companySetting?.include_paid_bills,
        ownerStatementsYesBtn:
          props.company_data?.companySetting?.include_paid_bills == 0
            ? false
            : true,
        ownerStatementsNoBtn:
          props.company_data?.companySetting?.include_paid_bills == 0
            ? true
            : false,
        bill_approval: props.company_data?.companySetting?.bill_approval,
        billApprovalYesBtn:
          props.company_data?.companySetting?.bill_approval == 0 ? false : true,
        billApprovalNoBtn:
          props.company_data?.companySetting?.bill_approval == 0 ? true : false,
        join_the_test_program:
          props.company_data?.companySetting?.join_the_test_program,
        testProgramYesBtn:
          props.company_data?.companySetting?.join_the_test_program == 0
            ? false
            : true,
        testProgramNoBtn:
          props.company_data?.companySetting?.join_the_test_program == 0
            ? true
            : false,
        selectedCountry: {
          label: props.company_data?.companySetting?.country?.country_name,
          value: props.company_data?.companySetting?.country?.id,
        },
        selectedRegion: {
          label: props.company_data?.companySetting?.region?.region_name,
          value: props.company_data?.companySetting?.region?.id,
        },
      }));

      // setState(prev=>({...prev,}))
    }
  }, [
    props.company_data_loading,
    props.company_data_edit_loading,
    props.cdc_list_data,
    props.cdr_list_data,
    props.company_data?.companySetting,
  ]);


  const InvoicePaymentInstructions = e => {
    // setState
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="ms-2 text-primary mb-4">Company Settings</h4>

                  <div
                    className="w-100 mt-2 mb-4"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      <div className="">Portfolio supplier</div>
                    </Col>
                    <Col md={9} className="d-flex justify-content-start">
                      {props.company_data?.companySetting?.portfolio_supplier ||
                        ""}
                    </Col>
                  </Row>
                  <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      {" "}
                      Portfolio name
                    </Col>
                    <Col md={9} className="d-flex justify-content-start">
                      <div className="w-50">
                        <input
                          className="form-control"
                          type="text"
                          name="portfolio_name"
                          value={state.portfolio_name}
                          placeholder="Portfolio name"
                          onChange={stateHandler}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row className="py-1">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Country
                    </Col>
                    <Col md={9} className="">
                      <div className="w-50">
                        <Select
                          value={state.selectedCountry}
                          onChange={handleSelectGroupCountry}
                          options={state.optionCountry}
                          classNamePrefix="select2-selection"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="py-1">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Region
                    </Col>
                    <Col md={9} className="">
                      <div className="w-50">
                        <Select
                          value={state.selectedRegion}
                          onChange={handleSelectGroupRegion}
                          options={state.optionRegion}
                          classNamePrefix="select2-selection"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Licence number
                    </Col>
                    <Col md={9} className="">
                      <div className="w-50">
                        <input
                          className="form-control"
                          type="text"
                          name="licence_number"
                          value={state.licence_number}
                          placeholder="Licence number"
                          onChange={stateHandler}
                        />
                      </div>
                    </Col>
                  </Row>

                  {/* <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Include property key number on work order
                    </Col>
                    <Col md={9} className="d-flex align-items-center">
                      <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                          <Button
                            color={
                              state.workOrderYesBtn ? "secondary" : "light"
                            }
                            onClick={toggleworkOrderYesBtn}
                          >
                            {state.workOrderYesBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> Yes</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={state.workOrderNoBtn ? "secondary" : "light"}
                            onClick={toggleworkOrderNoBtn}
                          >
                            {state.workOrderNoBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> No</span>
                          </Button>
                        </div>
                      </div>
                      <BootstrapTooltip text={`By default the inspection due date is updated when a new tenant moves in. Select No to leave the due date unchanged when a new tenant move-in date is added.`} id={1} />
                    </Col>

                  </Row> */}

                  {/* <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Update inspection date on tenant move-in
                    </Col>
                    <Col md={9} className="">
                      <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                          <Button
                            color={
                              state.tenantMoveYesBtn ? "secondary" : "light"
                            }
                            onClick={toggletenantMoveYesBtn}
                          >
                            {state.tenantMoveYesBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> Yes</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={
                              state.tenantMoveNoBtn ? "secondary" : "light"
                            }
                            onClick={toggletenantMoveNoBtn}
                          >
                            {state.tenantMoveNoBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> No</span>
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row> */}

                  {/* <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Client access
                    </Col>
                    <Col md={9} className="d-flex align-items-center">
                      <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                          <Button
                            color={
                              state.clientAccessYesBtn ? "secondary" : "light"
                            }
                            onClick={toggleClientAccessYesBtn}
                          >
                            {state.clientAccessYesBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> Yes</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={
                              state.clientAccessNoBtn ? "secondary" : "light"
                            }
                            onClick={toggleClientAccessNoBtn}
                          >
                            {state.clientAccessNoBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> No</span>
                          </Button>
                        </div>
                      </div>
                      <BootstrapTooltip text={`Allow owners and tenants to access their information. You can preview what they can see from each property.`} id={2} />
                    </Col>
                  </Row> */}

                  {/* <Row className="py-2">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Client access URL
                    </Col>
                    <Col md={9} className="">
                      <div className="w-50">
                        <input
                          className="form-control"
                          type="text"
                          name="client_access_url"
                          value={state.client_access_url}
                          disabled={true}
                          placeholder="URL"
                          onChange={stateHandler}
                          style={{ cursor: 'not-allowed' }}
                        />
                      </div>
                    </Col>
                  </Row> */}

                  <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      <div className="">Portfolio ID</div>
                    </Col>
                    <Col md={9} className="d-flex justify-content-start">
                      {props.company_data?.companySetting?.portfolio_id}
                    </Col>
                  </Row>

                  {/* <Row className="py-1">
                    <Col
                      md={3}
                      className="d-flex justify-content-start align-items-center ps-5"
                    >
                      Working hours
                    </Col>
                    <Col
                      md={9}
                      className="d-flex justify-content-start align-items-center"
                    >
                      <Button
                        className="btn w-md m-1"
                        color="secondary"
                        onClick={toggleWorkModal}
                      >
                        <i className="bx bxs-edit-alt me-2"></i>
                        Working hours
                      </Button>
                    </Col>

                  </Row> */}

                  {/* <Row className="py-1">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Invoice payment instructions
                    </Col>
                    <Col md={9} className="d-flex justify-content-start">
                      <Button
                        className="btn w-md m-1"
                        color="secondary"
                        onClick={toggleInvoiceModal}
                      >
                        <i className="bx bxs-edit-alt me-2"></i>
                        Invoice payment instructions
                      </Button>
                    </Col>
                  </Row> */}

                  {/* <Row className="py-1">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Inspection Report Disclaimer
                    </Col>
                    <Col md={9} className="d-flex justify-content-start">
                      <Button
                        className="btn w-md m-1"
                        color="secondary"
                        onClick={toggleInspectionModal}
                      >
                        <i className="bx bxs-edit-alt me-2"></i>
                        Inspection report disclaimer
                      </Button>
                    </Col>
                  </Row> */}

                  {/* <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Rental position on receipts
                    </Col>
                    <Col md={9} className="">
                      <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                          <Button
                            color={
                              state.rentalPositionYesBtn ? "secondary" : "light"
                            }
                            onClick={togglerentalPositionYesBtn}
                          >
                            {state.rentalPositionYesBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> Yes</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={
                              state.rentalPositionNoBtn ? "secondary" : "light"
                            }
                            onClick={togglerentalPositionNoBtn}
                          >
                            {state.rentalPositionNoBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> No</span>
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row> */}

                  {/* <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Show effective paid to dates
                    </Col>
                    <Col md={9} className="">
                      <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                          <Button
                            color={
                              state.effectivePaidDatesYesBtn
                                ? "secondary"
                                : "light"
                            }
                            onClick={toggleEffectivePaidDatesYesBtn}
                          >
                            {state.effectivePaidDatesYesBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> Yes</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={
                              state.effectivePaidDatesNoBtn
                                ? "secondary"
                                : "light"
                            }
                            onClick={toggleEffectivePaidDatesNoBtn}
                          >
                            {state.effectivePaidDatesNoBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> No</span>
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row> */}

                  {/* <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Include paid bills when printing Owner Statements
                    </Col>
                    <Col md={9} className="d-flex align-items-center">
                      <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                          <Button
                            color={
                              state.ownerStatementsYesBtn
                                ? "secondary"
                                : "light"
                            }
                            onClick={toggleOwnerStatementsYesBtn}
                          >
                            {state.ownerStatementsYesBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> Yes</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={
                              state.ownerStatementsNoBtn ? "secondary" : "light"
                            }
                            onClick={toggleOwnerStatementsNoBtn}
                          >
                            {state.ownerStatementsNoBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> No</span>
                          </Button>
                        </div>
                      </div>
                      <BootstrapTooltip text={`Include bills with PDF or image formats when printing owner statements`} id={3} />
                    </Col>

                  </Row> */}

                  <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Bill approval
                    </Col>
                    <Col md={9} className="">
                      <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                          <Button
                            color={
                              state.billApprovalYesBtn ? "secondary" : "light"
                            }
                            onClick={toggleBillApprovalYesBtn}
                          >
                            {state.billApprovalYesBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> Yes</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={
                              state.billApprovalNoBtn ? "secondary" : "light"
                            }
                            onClick={toggleBillApprovalNoBtn}
                          >
                            {state.billApprovalNoBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> No</span>
                          </Button>
                        </div>
                      </div>
                      <span className="badge rounded-pill bg-dark ms-2 p-2">
                        Standard Plan
                      </span>
                    </Col>
                  </Row>

                  {/* <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Join the test program
                    </Col>
                    <Col md={9} className="d-flex align-items-center">
                      <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                          <Button
                            color={
                              state.testProgramYesBtn ? "secondary" : "light"
                            }
                            onClick={toggleTestProgramYesBtn}
                          >
                            {state.testProgramYesBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> Yes</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={
                              state.testProgramNoBtn ? "secondary" : "light"
                            }
                            onClick={toggleTestProgramNoBtn}
                          >
                            {state.testProgramNoBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> No</span>
                          </Button>
                        </div>
                      </div>
                      <BootstrapTooltip text={`Be first to use the latest features of PropertyMe`} id={4} />
                    </Col>
                  </Row> */}

                  <Row>
                    <Col md={12} className="d-flex justify-content-end">
                      <button
                        className="btn btn-info w-md ms-2"
                        type="submit"
                        disabled={isLoading ? true : false}
                        onClick={handleSave}
                      >
                        <i className="fas fa-file-alt me-1"></i> Save
                      </button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {workModal && <WorkingHoursModal workModal={workModal} toggle={toggleWorkModal} id={props.company_data?.companySetting?.id} />}

      {invoiceModal && <InvoicePaymentsModal
        invoiceModal={invoiceModal}
        toggle={toggleInvoiceModal}
      />}
      {inspectionModal && <InspectionReportModal
        inspectionModal={inspectionModal}
        toggle={toggleInspectionModal}
      />}
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    company_data,
    company_data_loading,
    company_data_edit_loading,
    cdc_list_data,
    cdc_list_loading,
    cdr_list_data,
    cdr_list_loading,
  } = gstate.Portfolio;

  return {
    company_data,
    company_data_loading,
    company_data_edit_loading,
    cdc_list_data,
    cdc_list_loading,
    cdr_list_data,
    cdr_list_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    companyDataForPortfolio,
    companyDataForPortfolioEdit,
    companyDataForPortfolioEditFresh,
    companyDataForPortfolioCountry,
    companyDataForPortfolioRegion,
  })(PortfolioEdit)
);
