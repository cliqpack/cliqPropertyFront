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
  companyDataForPortfolioBankingEdit,
  companyDataForPortfolioBankingEditFresh,
  companyDataForPortfolioBanking,
  bankingFileData,
  bankingBankData,
} from "store/actions";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import DepositClearanceModal from "./DepositClearanceModal";

document.title = "CliqProperty";

const PortfolioBanking = props => {
  const history = useHistory();
  const [isLoading, setIsloading] = useState(false)
  const [init, setInit] = useState(true);

  const [state, setState] = useState({
    selectedBank: [],
    optionBank: [],
    selectedFileFormat: [],
    optionFileFormat: [
    ],
    EFTPaymentsEnableYesBtn: true,
    EFTPaymentsEnableNoBtn: false,
    statementDescriptionYesBtn: true,
    statementDescriptionNoBtn: false,
    TenantDebitEnableYesBtn: true,
    TenantDebitEnableNoBtn: false,
    BPAYEnableYesBtn: true,
    BPAYEnableNoBtn: false,
    WestpacLiveBtn: true,
    PaymentsPlusBtn: false,
    PaymentProcessingServiceBtn: false,
  });
  // console.log(state);

  const [depositModal, setDepositModal] = useState(false);

  const toggleDepositModal = () => {
    setDepositModal(prev => !prev);
  };

  const toggleWestpacLiveBtn = () => {
    setState({
      ...state,
      bpay_for: "WestpacLive",
      WestpacLiveBtn: true,
      PaymentsPlusBtn: false,
      PaymentProcessingServiceBtn: false,
    });
  };
  const togglePaymentsPlusBtn = () => {
    setState({
      ...state,
      bpay_for: "PaymentsPlus",
      WestpacLiveBtn: false,
      PaymentsPlusBtn: true,
      PaymentProcessingServiceBtn: false,
    });
  };
  const togglePaymentProcessingServiceBtn = () => {
    setState({
      ...state,
      bpay_for: "PaymentProcessingService",
      WestpacLiveBtn: false,
      PaymentsPlusBtn: false,
      PaymentProcessingServiceBtn: true,
    });
  };

  const toggleBPAYEnableYesBtn = () => {
    setState({
      ...state,
      bpay_enable: 1,
      BPAYEnableYesBtn: true,
      BPAYEnableNoBtn: false,
    });
  };

  const toggleBPAYEnableNoBtn = () => {
    setState({
      ...state,
      bpay_enable: 0,
      BPAYEnableYesBtn: false,
      BPAYEnableNoBtn: true,
    });
  };

  const toggleTenantDebitEnableYesBtn = () => {
    setState({
      ...state,
      tenant_direct_debitenable_enable: 1,
      TenantDebitEnableYesBtn: true,
      TenantDebitEnableNoBtn: false,
    });
  };

  const toggleTenantDebitEnableNoBtn = () => {
    setState({
      ...state,
      tenant_direct_debitenable_enable: 0,

      TenantDebitEnableYesBtn: false,
      TenantDebitEnableNoBtn: true,
    });
  };

  const toggleEFTPaymentsEnableYesBtn = () => {
    setState({
      ...state,
      eft_payments_enable: 1,
      EFTPaymentsEnableYesBtn: true,
      EFTPaymentsEnableNoBtn: false,
    });
  };

  const toggleEFTPaymentsEnableNoBtn = () => {
    setState({
      ...state,
      eft_payments_enable: 0,

      EFTPaymentsEnableYesBtn: false,
      EFTPaymentsEnableNoBtn: true,
    });
  };

  const toggleStatementDescriptionYesBtn = () => {
    setState({
      ...state,
      statement_description_as_property_reference: 1,
      statementDescriptionYesBtn: true,
      statementDescriptionNoBtn: false,
    });
  };

  const toggleStatementDescriptionNoBtn = () => {
    setState({
      ...state,
      statement_description_as_property_reference: 0,
      statementDescriptionYesBtn: false,
      statementDescriptionNoBtn: true,
    });
  };

  const stateHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSelectGroupBank = e => {
    setState({ ...state, selectedBank: e });
  };
  const handleSelectGroupFileFormat = e => {
    setState({ ...state, selectedFileFormat: e });
  };

  const handleSave = e => {
    e.preventDefault();
    setIsloading(true)
    props.companyDataForPortfolioBankingEdit(state);
  };

  useEffect(() => {
    if (props.bde_list_loading == "Success") {
      toastr.success("Success");
      setIsloading(false)
      props.companyDataForPortfolioBankingEditFresh();
      props.companyDataForPortfolioBanking();
    }
    if (props.bde_list_loading == "Failed") {
      toastr.error("Failed");
      setIsloading(false)
      props.companyDataForPortfolioBankingEditFresh();
    }
    if (props.bd_list_loading === false) {
      props.companyDataForPortfolioBanking();
    }
    if (init) {
      props.bankingBankData();
      props.bankingFileData();
      setInit(false);
    }
    let optionBank;
    if (props.bbd_list_data?.bank) {
      optionBank = props.bbd_list_data?.bank.map(item => ({
        label: item.bank_name,
        value: item.id,
      }));
      setState(prev => ({ ...prev, optionBank: optionBank }));
    }
    let optionFileFormat;
    if (props.bfd_list_data?.fileFormat) {
      optionFileFormat = props.bfd_list_data?.fileFormat.map(item => ({
        label: item.file_name,
        value: item.id,
      }));
      setState(prev => ({ ...prev, optionFileFormat: optionFileFormat }));
    }
    if (props.bd_list_data?.bankingSetting) {
      setState(prev => ({
        ...prev,
        account_name: props.bd_list_data?.bankingSetting?.account_name,
        bsb: props.bd_list_data?.bankingSetting?.bsb,
        account_number: props.bd_list_data?.bankingSetting?.account_number,
        unique_identifying_number:
          props.bd_list_data?.bankingSetting?.unique_identifying_number,
        default_statement_description:
          props.bd_list_data?.bankingSetting?.default_statement_description,
        de_user_id: props.bd_list_data?.bankingSetting?.de_user_id,
        customer_id: props.bd_list_data?.bankingSetting?.customer_id,
        customer_name: props.bd_list_data?.bankingSetting?.customer_name,
        eft_payments_enable:
          props.bd_list_data?.bankingSetting?.eft_payments_enable,
        EFTPaymentsEnableYesBtn:
          props.bd_list_data?.bankingSetting?.eft_payments_enable == 0
            ? false
            : true,
        EFTPaymentsEnableNoBtn:
          props.bd_list_data?.bankingSetting?.eft_payments_enable == 0
            ? true
            : false,
        statement_description_as_property_reference:
          props.bd_list_data?.bankingSetting
            ?.statement_description_as_property_reference,
        statementDescriptionYesBtn:
          props.bd_list_data?.bankingSetting
            ?.statement_description_as_property_reference == 0
            ? false
            : true,
        statementDescriptionNoBtn:
          props.bd_list_data?.bankingSetting
            ?.statement_description_as_property_reference == 0
            ? true
            : false,
        tenant_direct_debitenable_enable:
          props.bd_list_data?.bankingSetting?.tenant_direct_debitenable_enable,
        TenantDebitEnableYesBtn:
          props.bd_list_data?.bankingSetting
            ?.tenant_direct_debitenable_enable == 0
            ? false
            : true,
        TenantDebitEnableNoBtn:
          props.bd_list_data?.bankingSetting
            ?.tenant_direct_debitenable_enable == 0
            ? true
            : false,
        bpay_enable: props.bd_list_data?.bankingSetting?.bpay_enable,
        BPAYEnableYesBtn:
          props.bd_list_data?.bankingSetting?.bpay_enable == 0 ? false : true,
        BPAYEnableNoBtn:
          props.bd_list_data?.bankingSetting?.bpay_enable == 0 ? true : false,
        bpay_for: props.bd_list_data?.bankingSetting?.bpay_for,
        WestpacLiveBtn:
          props.bd_list_data?.bankingSetting?.bpay_for == "WestpacLive"
            ? true
            : false,
        PaymentsPlusBtn:
          props.bd_list_data?.bankingSetting?.bpay_for == "PaymentsPlus"
            ? true
            : false,
        PaymentProcessingServiceBtn:
          props.bd_list_data?.bankingSetting?.bpay_for ==
            "PaymentProcessingService"
            ? true
            : false,
        selectedBank: {
          label: props.bd_list_data?.bankingSetting?.bank?.bank_name,
          value: props.bd_list_data?.bankingSetting?.bank?.id,
        },
        selectedFileFormat: {
          label: props.bd_list_data?.bankingSetting?.file_format?.file_name,
          value: props.bd_list_data?.bankingSetting?.file_format?.id,
        },
      }));
    }
  }, [
    props.company_data_edit_loading,
    props.bd_list_loading,
    props.bbd_list_data,
    props.bfd_list_data,
    props.bd_list_data?.bankingSetting,
    props.bde_list_loading
  ]);

  console.log(props.bd_list_data?.bankingSetting);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="ms-2 text-primary mb-4">Banking</h4>
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
                  <h4 className="ms-2 text-primary">Bank Account</h4>
                  <div
                    className="w-100 mt-2 mb-4"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>
                  <Row className="py-2">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Account name
                    </Col>
                    <Col md={9} className="">
                      <div className="w-50">
                        <input
                          className="form-control"
                          type="text"
                          name="account_name"
                          value={state.account_name}
                          placeholder="Account name"
                          onChange={stateHandler}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row className="py-2">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      BSB
                    </Col>
                    <Col md={9} className="">
                      <div className="w-50">
                        <input
                          className="form-control"
                          type="text"
                          name="bsb"
                          value={state.bsb}
                          placeholder="BSB"
                          onChange={stateHandler}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row className="py-2">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Account number
                    </Col>
                    <Col md={9} className="">
                      <div className="w-50">
                        <input
                          className="form-control"
                          type="text"
                          name="account_number"
                          value={state.account_number}
                          placeholder="Account number"
                          onChange={stateHandler}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row className="py-2">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Unique identifying number
                    </Col>
                    <Col md={9} className="">
                      <div className="w-50">
                        <input
                          className="form-control"
                          type="text"
                          name="unique_identifying_number"
                          value={state.unique_identifying_number}
                          placeholder="Unique identifying number"
                          onChange={stateHandler}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row className="py-1">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Bank
                    </Col>
                    <Col md={9} className="">
                      <div className="w-50">
                        <Select
                          value={state.selectedBank}
                          onChange={handleSelectGroupBank}
                          options={state.optionBank}
                          classNamePrefix="select2-selection"
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h4 className="ms-2 text-primary">EFT Payments</h4>
                  <div
                    className="w-100 mt-2 mb-4"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>
                  <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Enable
                    </Col>
                    <Col md={9} className="">
                      <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                          <Button
                            color={
                              state.EFTPaymentsEnableYesBtn
                                ? "secondary"
                                : "light"
                            }
                            onClick={toggleEFTPaymentsEnableYesBtn}
                          >
                            {state.EFTPaymentsEnableYesBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> Yes</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={
                              state.EFTPaymentsEnableNoBtn
                                ? "secondary"
                                : "light"
                            }
                            onClick={toggleEFTPaymentsEnableNoBtn}
                          >
                            {state.EFTPaymentsEnableNoBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> No</span>
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Default statement description
                    </Col>
                    <Col md={9} className="">
                      <div className="w-50">
                        <input
                          className="form-control"
                          type="text"
                          name="default_statement_description"
                          value={state.default_statement_description}
                          placeholder="Description"
                          onChange={stateHandler}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Statement description as property reference
                    </Col>
                    <Col md={9} className="">
                      <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                          <Button
                            color={
                              state.statementDescriptionYesBtn
                                ? "secondary"
                                : "light"
                            }
                            onClick={toggleStatementDescriptionYesBtn}
                          >
                            {state.statementDescriptionYesBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> Yes</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={
                              state.statementDescriptionNoBtn
                                ? "secondary"
                                : "light"
                            }
                            onClick={toggleStatementDescriptionNoBtn}
                          >
                            {state.statementDescriptionNoBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> No</span>
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      DE User ID
                    </Col>
                    <Col md={9} className="">
                      <div className="w-50">
                        <input
                          className="form-control"
                          type="text"
                          name="de_user_id"
                          value={state.de_user_id}
                          placeholder="ID"
                          onChange={stateHandler}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row className="py-1">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      File format
                    </Col>
                    <Col md={9} className="">
                      <div className="w-50">
                        <Select
                          value={state.selectedFileFormat}
                          onChange={handleSelectGroupFileFormat}
                          options={state.optionFileFormat}
                          classNamePrefix="select2-selection"
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h4 className="ms-2 text-primary">Tenant Direct Debit</h4>
                  <div
                    className="w-100 mt-2 mb-4"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>

                  <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Enable
                    </Col>
                    <Col md={9} className="">
                      <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                          <Button
                            color={
                              state.TenantDebitEnableYesBtn
                                ? "secondary"
                                : "light"
                            }
                            onClick={toggleTenantDebitEnableYesBtn}
                          >
                            {state.TenantDebitEnableYesBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> Yes</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={
                              state.TenantDebitEnableNoBtn
                                ? "secondary"
                                : "light"
                            }
                            onClick={toggleTenantDebitEnableNoBtn}
                          >
                            {state.TenantDebitEnableNoBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> No</span>
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h4 className="ms-2 text-primary">Deposit Clearance</h4>
                  <div
                    className="w-100 mt-2 mb-4"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>

                  <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start align-items-center ps-5">
                      Change to days to clear
                    </Col>
                    <Col md={9} className="">
                      <Button color="info" onClick={toggleDepositModal}>
                        <i className="fas fa-pen me-1" /> Deposit Clearance Days
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>



              <Card>
                <CardBody>
                  <h4 className="ms-2 text-primary">BPAY Generation</h4>
                  <div
                    className="w-100 mt-2 mb-4"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>

                  <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Enable
                    </Col>
                    <Col md={9} className="">
                      <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                          <Button
                            color={
                              state.BPAYEnableYesBtn ? "secondary" : "light"
                            }
                            onClick={toggleBPAYEnableYesBtn}
                          >
                            {state.BPAYEnableYesBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> Yes</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={
                              state.BPAYEnableNoBtn ? "secondary" : "light"
                            }
                            onClick={toggleBPAYEnableNoBtn}
                          >
                            {state.BPAYEnableNoBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> No</span>
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Customer ID
                    </Col>
                    <Col md={9} className="">
                      <div className="w-50">
                        <input
                          className="form-control"
                          type="text"
                          name="customer_id"
                          value={state.customer_id}
                          placeholder="Customer ID"
                          onChange={stateHandler}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      Customer name
                    </Col>
                    <Col md={9} className="">
                      <div className="w-50">
                        <input
                          className="form-control"
                          type="text"
                          name="customer_name"
                          value={state.customer_name}
                          placeholder="Customer name"
                          onChange={stateHandler}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="py-3">
                    <Col md={3} className="d-flex justify-content-start ps-5">
                      For
                    </Col>
                    <Col md={9} className="">
                      <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                          <Button
                            color={state.WestpacLiveBtn ? "secondary" : "light"}
                            onClick={toggleWestpacLiveBtn}
                          >
                            {state.WestpacLiveBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> Westpac Live</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={
                              state.PaymentsPlusBtn ? "secondary" : "light"
                            }
                            onClick={togglePaymentsPlusBtn}
                          >
                            {state.PaymentsPlusBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> PaymentsPlus</span>
                          </Button>
                        </div>
                        <div className="btn-group">
                          <Button
                            color={
                              state.PaymentProcessingServiceBtn
                                ? "secondary"
                                : "light"
                            }
                            onClick={togglePaymentProcessingServiceBtn}
                          >
                            {state.PaymentProcessingServiceBtn ? (
                              <i className="bx bx-comment-check"></i>
                            ) : null}
                            <span> Payment Processing Service</span>
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="d-flex justify-content-end">
                      <button
                        className="btn btn-info w-md ms-2"
                        type="submit"
                        onClick={handleSave}
                        disabled={isLoading ? true : false}
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
      {depositModal &&
        <DepositClearanceModal
          depositModal={depositModal}
          toggle={toggleDepositModal}
        />}
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const {
    bde_list_loading,
    bd_list_data,
    bd_list_loading,
    bbd_list_data,
    bbd_list_loading,
    bfd_list_data,
    bfd_list_loading,
    company_data_edit_loading,
  } = gstate.Portfolio;

  return {
    bde_list_loading,
    bd_list_data,
    bd_list_loading,
    bbd_list_data,
    bbd_list_loading,
    bfd_list_data,
    bfd_list_loading,
    company_data_edit_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    companyDataForPortfolioBankingEdit,
    companyDataForPortfolioBankingEditFresh,
    companyDataForPortfolioBanking,
    bankingFileData,
    bankingBankData,
  })(PortfolioBanking)
);
