import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { connect } from "react-redux";
import Select from "react-select";

import {
  addBills,
  billAccountsList,
  billAccountsListFresh,
  accountsList,
  supplierList,
  invoiceChartList,
  billPropertyList,
  jobList,
  addBillsFresh,
  tenancyList,
  addBillsWithTenantInvoice,
  addBillsWithTenantInvoiceFresh,
  accountsListFresh,
  supplierListFresh,
  folioListFresh,
  jobListFresh,
  invoiceChartListFresh,
  tenancyListFresh,
  allBillsListDueFresh,
  allBillsListFutureFresh,
  allBillsListPaidFresh,
  editBillDataShow,
  sellerFolioList,
} from "store/actions";

import toastr from "toastr";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { optionPriority } from "pages/common/common";

const AddBillsModal = props => {
  const date = moment().format("yyyy-MM-DD");
  const [state, setState] = useState({
    billsDate: date,
    taxCheck: 0,
    taxCheckInvoice: 0,
    invoiceDate: date,
    tenantDepositAmount: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState();
  const [seen, setSeen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [optionGroupSupplier, setOptionGroupSupplier] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState();
  const [optionGroupAccount, setOptionGroupAccount] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState({ label: "Normal", value: "Normal" });
  const [optionGroupPriority, setOptionGroupPriority] = useState(optionPriority);

  const [selected, setSelected] = useState([]);

  const [optionGroup, setOptionGroup] = useState([
    { label: "Property", value: 1 },
    { label: "Seller", value: 2 },
  ]);
  const handleSelect = e => setSelected(e);
  const [selectedSellerFolio, setSelectedSellerFolio] = useState();
  const [optionSellerFolio, setOptionSellerFolio] = useState([]);
  const handleSelectSellerFolio = e => {
    setState({ ...state, property_Id: e.property_Id });
    setSelectedSellerFolio(e);
  };
  const [selectedPropertyFolio, setSelectedPropertyFolio] = useState();
  const [optionGroupPropertyFolio, setOptionGroupPropertyFolio] = useState([]);
  const [selectedSelectJobOrReminder, setSelectedSelectJobOrReminder] =
    useState(null);
  const [optionGroupSelectJobOrReminder, setOptionGroupSelectJobOrReminder] =
    useState();
  const [selectedInvoiceChart, setSelectedInvoiceChart] = useState(null);
  const [optionGroupInvoiceChart, setOptionGroupInvoiceChart] = useState([]);
  const [selectedTenancy, setSelectedTenancy] = useState(null);
  const [optionGroupTenancy, setOptionGroupTenancy] = useState([
    {
      options: [{ label: "", value: "" }],
    },
  ]);
  const [invoiceChecker, setInvoiceChecker] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [jobSelect, setJobSelect] = useState(true);
  const checkHandler = e => {
    if (e.target.value) {
      setState(prev => {
        return { ...prev, taxCheck: prev.taxCheck === 0 ? 1 : 0 };
      });
    }
  };
  const checkHandlerInvoice = e => {
    if (e.target.value) {
      setInvoiceChecker(prev => !prev);
      setState(prev => {
        return { ...prev, taxCheckInvoice: prev.taxCheckInvoice === 0 ? 1 : 0 };
      });
    }
  };
  const allocateAmount = (invAmount, allocAmount) => {
    let remaining = invAmount - allocAmount;
    return remaining;
  };

  const dateHandler = (selectedDates, dateStr, instance) => {
    setState({ ...state, ["billsDate"]: dateStr });
  };
  const invoiceDateHandler = (selectedDates, dateStr, instance) => {
    setState({ ...state, ["invoiceDate"]: dateStr });
  };
  const handleState = e => {
    if (e.target.name === "totalInvoiceAmount") {
      setState({
        ...state,
        [e.target.name]: e.target.value,
        remainingAllocatedAmount: allocateAmount(
          e.target.value,
          state?.allocatedAmount ? state?.allocatedAmount : 0
        ),
      });
    } else if (e.target.name === "allocatedAmount") {
      setState({
        ...state,
        [e.target.name]: e.target.value,
        remainingAllocatedAmount: allocateAmount(
          state?.totalInvoiceAmount ? state?.totalInvoiceAmount : 0,
          e.target.value
        ),
      });
      if (e.target.value > state?.tenantDepositAmount) {
        setErrorMessage(
          "The allocated amount cannot be more than the total invoice nor the available tenant deposit amount."
        );
      }
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };
  const handleSelectSupplier = e => {
    setState(prev => ({
      ...prev,
      supplier: e.value,
      jobOrReminder: null,
      supplier_folio_id: e.supplier_folio_id,
      account: e.account,
      priority: e.prior,
      taxCheck: e.tax,
    }));
    setSelectedPriority({ label: e.prior, value: e.prior });
    if (e.account) {
      setSelectedAccount({
        label: e.accountName,
        value: e.account,
      });
    } else {
      setSelectedAccount({
        label: "",
        value: "",
      });
    }
    setSelectedSupplier(e);
    setJobSelect(true);
  };
  const handleSelectAccount = e => {
    setState({ ...state, account: e.value });
    setSelectedAccount(e);
  };
  const handleSelectPriority = e => {
    setState({ ...state, priority: e.value });
    setSelectedPriority(e);
  };
  const handleSelectPropertyFolio = e => {
    setState({
      ...state,
      property_Id: e.value,
      jobOrReminder: null,
      owner_folio_id: e.owner_folio_id,
    });
    setSelectedPropertyFolio(e);
    setJobSelect(true);
    setSelectedSelectJobOrReminder({});
  };
  const handleSelectJobOrReminder = e => {
    setState({ ...state, jobOrReminder: e.value });
    setSelectedSelectJobOrReminder(e);
  };
  const handleSelectInvoiceChart = e => {
    setState({ ...state, invoiceChart: e.value });
    setSelectedInvoiceChart(e);
  };
  const handleSelectTenancy = e => {
    setState({
      ...state,
      tenancy: e.value,
      tenant_folio_id: e.tenant_folio_id,
    });
    setSelectedTenancy(e);
  };

  const handleBillsSave = e => {
    e.preventDefault();
    if (showInvoice) {
      props.addBills(state, file, selectedSellerFolio);
      props.addBillsWithTenantInvoice(state, file, "yes");
      setState({
        billsDate: date,
        taxCheck: 0,
        taxCheckInvoice: 0,
        invoiceDate: date,
        tenantDepositAmount: 0,
      });
      setFile();
    } else {
      props.addBills(state, file, selectedSellerFolio);
      setState({
        billsDate: date,
        taxCheck: 0,
        taxCheckInvoice: 0,
        invoiceDate: date,
        tenantDepositAmount: 0,
      });
      setFile();
    }
    setState({ billsDate: date });
    props.setShowModal(false);
    props.startLoader();
  };

  const handleChange = async e => {
    setFile(e.target.files[0]);
  };

  const reduxDataFresh = () => {
    // props.accountsListFresh();
    props.supplierListFresh();
    props.folioListFresh();
    props.jobListFresh();
    props.invoiceChartListFresh();
    props.tenancyListFresh();
    props.allBillsListDueFresh();
    props.allBillsListFutureFresh();
    props.allBillsListPaidFresh();
    setShowInvoice(false);
    setSelectedSupplier();
    setSelectedAccount();
    setSelectedPriority();
    setSelectedPropertyFolio();
    setSelectedPropertyFolio();
    setSelectedInvoiceChart();
    setSelectedSelectJobOrReminder();
    setSelectedTenancy();
    setSelected();
    setSelectedSellerFolio();
  };

  const handleModalClose = () => {
    props.toggle();
    reduxDataFresh();
  };

  useEffect(() => {
    if (showInvoice) {
      if (
        props.add_bills_loading === "Success" &&
        props.add_bills_tenant_invoice_loading === "Success"
      ) {
        toastr.success("Success");
        props.addBillsFresh();
        props.addBillsWithTenantInvoiceFresh();
        reduxDataFresh();
        props.toogleTab("1");
        props.endLoader();
      }
    } else {
      if (props.add_bills_loading === "Success") {
        toastr.success("Success");
        props.addBillsFresh();
        reduxDataFresh();
        props.toogleTab("1");
        props.endLoader();
      }
    }
    if (showInvoice) {
      if (
        props.add_bills_loading === "Failed" &&
        props.add_bills_tenant_invoice_loading === "Failed"
      ) {
        toastr.error("Something went wrong!");
        props.addBillsFresh();
        props.addBillsWithTenantInvoiceFresh();
        reduxDataFresh();
        props.toogleTab("1");
        props.endLoader();
      }
    } else {
      if (props.add_bills_loading === "Failed") {
        toastr.error("Something went wrong!");
        props.addBillsFresh();
        reduxDataFresh();
        props.toogleTab("1");
        props.endLoader();
      }
    }
  }, [
    showInvoice,
    props.add_bills_loading,
    props.add_bills_tenant_invoice_loading,
  ]);
  useEffect(() => {
    if (!seen) {
      props.billPropertyList();
      props.supplierList();
      props.billAccountsList();
      props.invoiceChartList();
      props.sellerFolioList();
      setSeen(true);
    }
  }, [seen]);
  useEffect(() => {
    let optionChart;
    if (props.invoice_chart_list_data) {
      optionChart = props.invoice_chart_list_data?.data.map(item => ({
        label: item.account_name,
        value: item.id,
      }));
      setOptionGroupInvoiceChart(optionChart);
    }
  }, [props.invoice_chart_list_data]);
  useEffect(() => {
    if (state.property_Id) {
      props.tenancyList(state.property_Id);
    }
  }, [state.property_Id]);
  useEffect(() => {
    if (state.property_Id) {
      if (props.tenancy_list_data?.data) {
        const item = props.tenancy_list_data?.data;
        setOptionGroupTenancy([
          {
            label: item.reference,
            value: item.id,
            tenant_folio_id: item?.tenant_folio?.id,
          },
        ]);
        setState(prev => ({
          ...prev,
          tenantDepositAmount:
            props.tenancy_list_data?.data?.tenant_folio?.deposit,
        }));
      }
    }
  }, [state.property_Id, props.tenancy_list_data]);
  useEffect(() => {
    if (state.property_Id || state.supplier) {
      if (jobSelect) {
        props.jobList(state.property_Id, state.supplier);
      }
      setJobSelect(false);
    }
  }, [state.property_Id, state.supplier]);
  useEffect(() => {
    let optionJob;
    if (props.job_list_data?.data) {
      optionJob = props.job_list_data?.data.map(item => ({
        label: `Job #${item.id}-${item.summary}`,
        value: item.id,
      }));
      setOptionGroupSelectJobOrReminder(optionJob);
    }
  }, [props.job_list_data?.data]);
  useEffect(() => {
    let optionAccount;
    if (props.bill_accounts_list_data?.data) {
      optionAccount = props.bill_accounts_list_data?.data.map(item => ({
        label: item.account_number + "-" + item.account_name,
        value: item.id,
      }));
      setOptionGroupAccount(optionAccount);
    }
  }, [props.bill_accounts_list_data?.data]);
  useEffect(() => {
    let optionSupplier;
    if (props.supplier_list_data?.data) {
      optionSupplier = props.supplier_list_data?.data.map(item => ({
        label: item.reference,
        value: item.id,
        supplier_folio_id: item?.supplier_details?.id,
        account: item?.supplier_details?.supplier_account?.id,
        accountName:
          item?.supplier_details?.supplier_account?.account_number +
          "-" +
          item?.supplier_details?.supplier_account?.account_name,
        prior: item?.supplier_details?.priority,
        tax: item?.supplier_details?.supplier_account?.tax,
      }));
      setOptionGroupSupplier(optionSupplier);
    }
  }, [props.supplier_list_data?.data]);
  useEffect(() => {
    let optionFolio;
    if (props.bill_property_list_data?.data) {
      optionFolio = props.bill_property_list_data?.data.map(item => ({
        label: item.reference,
        value: item.id,
        owner_folio_id: item?.current_owner_folio?.id,
      }));
      setOptionGroupPropertyFolio(optionFolio);
    }
    //conflict data
    // }, [props.property_list_data?.data])
  }, [props.bill_property_list_data?.data]);

  useEffect(() => {
    let options = [];
    if (props.seller_folio_list_data?.data) {
      options = props.seller_folio_list_data?.data.map(item => ({
        label: `${item.seller_contacts.reference} (${item.folio_code})`,
        value: item.id,
        property_Id: item.seller_contacts.property_id,
      }));

      setOptionSellerFolio(options);
    }
  }, [props.seller_folio_list_data?.data]);

  return (
    <>
      <button type="button" className="btn btn-info" onClick={props.toggle}>
        Add Bills
      </button>

      <Modal isOpen={props.showModal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>
          <i className="fas fa-dollar-sign font-size-16 me-1 text-primary"></i>
          <span className="text-primary">New Bills</span>
        </ModalHeader>

        <ModalBody>
          <div>
            <Card>
              <CardBody>
                <Row>
                  <Col md={12}>
                    <div className="mb-3">
                      <Input
                        className="form-control form-control-sm"
                        type="file"
                        id="formFile"
                        onChange={handleChange}
                        multiple="false"
                      />
                    </div>
                    <div className="mb-3 row">
                      <div className="col-md-12">
                        <Flatpickr
                          className="form-control d-block"
                          placeholder="Pick a date..."
                          value={state.billsDate}
                          options={{
                            altInput: true,
                            format: "d/m/Y",
                            altFormat: "d/m/Y",
                            onChange: dateHandler,
                          }}
                        />
                      </div>
                    </div>
                    <div className="mb-3 select2-container">
                      <Select
                        value={selectedSupplier}
                        onChange={handleSelectSupplier}
                        options={optionGroupSupplier}
                        classNamePrefix="select2-selection"
                        placeholder="Supplier"
                      />
                    </div>
                    <Row className="d-flex">
                      <Col md={7} className="mb-3 select2-container">
                        <Select
                          value={selectedAccount}
                          onChange={handleSelectAccount}
                          options={optionGroupAccount}
                          classNamePrefix="select2-selection"
                          placeholder="Account"
                        />
                      </Col>
                      <Col md={5} className="mb-3 select2-container">
                        <Select
                          value={selectedPriority}
                          onChange={handleSelectPriority}
                          options={optionGroupPriority}
                          classNamePrefix="select2-selection"
                          placeholder="Priority"
                        />
                      </Col>
                    </Row>
                    <div className="mb-3 row">
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Details"
                          name="details"
                          onChange={handleState}
                        />
                      </div>
                    </div>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Select
                          value={selected}
                          onChange={handleSelect}
                          options={optionGroup}
                          classNamePrefix="select2-selection"
                          placeholder="Select"
                        />
                      </Col>
                      <Col md={8}>
                        {selected?.value == 1 && (
                          <div className="select2-container">
                            <Select
                              value={selectedPropertyFolio}
                              onChange={handleSelectPropertyFolio}
                              options={optionGroupPropertyFolio}
                              classNamePrefix="select2-selection"
                              placeholder="Property or Folio"
                            />
                          </div>
                        )}
                        {selected?.value == 2 && (
                          <div className="select2-container">
                            <Select
                              value={selectedSellerFolio}
                              onChange={handleSelectSellerFolio}
                              options={optionSellerFolio}
                              classNamePrefix="select2-selection"
                              placeholder="Seller Folio"
                            />
                          </div>
                        )}
                      </Col>
                    </Row>
                    <div className="mb-3 row">
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Invoice reference #"
                          name="invoiceReference"
                          onChange={handleState}
                        />
                      </div>
                    </div>
                    <Row className="d-flex align-items-center">
                      {/* <Col md={6}>
                        <div className="mb-3 row">
                          <div className="col-md-12">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Amount"
                              name="amount"
                              onChange={handleState}
                            />
                          </div>
                        </div>
                      </Col> */}
                      <Col md={6} className="d-flex mb-3">
                        <div className="d-flex flex-column">
                          <input
                            className="form-control"
                            name="amount"
                            id="amount"
                            type="text"
                            placeholder="0.00"
                            style={{
                              borderTopRightRadius: 0,
                              borderBottomRightRadius: 0,
                            }}
                            value={state.amount}
                            onChange={handleState}
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
                      <Col md={6}>
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="taxCheck"
                            name="taxCheck"
                            onClick={e => checkHandler(e)}
                            checked={state?.taxCheck === 1 ? true : false}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="taxCheck"
                          >
                            Tax inc
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <div className="mb-3 select2-container">
                      <Select
                        value={selectedSelectJobOrReminder}
                        onChange={handleSelectJobOrReminder}
                        options={optionGroupSelectJobOrReminder}
                        classNamePrefix="select2-selection"
                        placeholder="Select a job or reminder to complete"
                        isDisabled={
                          optionGroupSelectJobOrReminder ? false : true
                        }
                      />
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="defaultCheck1"
                        name="tenantInvoice"
                        onClick={e => setShowInvoice(prev => !prev)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck1"
                      >
                        Create tenant invoice
                      </label>
                    </div>
                    {showInvoice === true ? (
                      <>
                        <div className="mb-3 row">
                          <div className="col-md-12">
                            <Flatpickr
                              className="form-control d-block"
                              placeholder="Pick a date..."
                              value={state.invoiceDate}
                              options={{
                                altInput: true,
                                format: "d/m/Y",
                                altFormat: "d/m/Y",
                                onChange: invoiceDateHandler,
                              }}
                            />
                          </div>
                        </div>
                        <div className="mb-3 select2-container">
                          <Select
                            value={selectedInvoiceChart}
                            onChange={handleSelectInvoiceChart}
                            options={optionGroupInvoiceChart}
                            classNamePrefix="select2-selection"
                            placeholder="Invoice Chart Account"
                          />
                        </div>
                        <div className="mb-3 select2-container">
                          <Select
                            value={selectedTenancy}
                            onChange={handleSelectTenancy}
                            options={optionGroupTenancy}
                            classNamePrefix="select2-selection"
                            placeholder="Select Tenant"
                            isDisabled={
                              props.tenancy_list_data?.data ? false : true
                            }
                          />
                        </div>
                        <div className="mb-3 row">
                          <div className="col-md-12">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Invoice Details"
                              name="invoiceDetails"
                              onChange={handleState}
                            />
                          </div>
                        </div>
                        <h4 className="card-title">Total invoice amount</h4>
                        <Row className="d-flex align-items-center">
                          <Col md={6} className="d-flex">
                            <div className="d-flex flex-column">
                              <input
                                className="form-control"
                                name="totalInvoiceAmount"
                                id="totalInvoiceAmount"
                                type="text"
                                placeholder="0.00"
                                style={{
                                  borderTopRightRadius: 0,
                                  borderBottomRightRadius: 0,
                                }}
                                value={state.totalInvoiceAmount}
                                onChange={handleState}
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
                          <Col md={6}>
                            <div className="form-check mb-3">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="defaultCheck2"
                                name="taxCheckInvoice"
                                onClick={e => checkHandlerInvoice(e)}
                                checked={invoiceChecker ? true : false}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck2"
                              >
                                Tax inc
                              </label>
                            </div>
                          </Col>
                        </Row>
                        {state.tenantDepositAmount > 0 && (
                          <>
                            <Card>
                              <CardBody className="border-3 border-start border-danger">
                                <p className="fw-bold">
                                  Available tenant funds {state.tenantDepositAmount}৳.
                                </p>
                                <p>
                                  Would you like to allocate an amount towards
                                  this invoice? If yes, please fill in the
                                  allocated amount.
                                </p>

                                <div className="mb-3 row">
                                  <div className="col-md-12">
                                    <label>Allocated amount</label>
                                    <Row>
                                      <Col md={4} className="d-flex">
                                        <div className="d-flex flex-column">
                                          <input
                                            className="form-control"
                                            name="allocatedAmount"
                                            id="allocatedAmount"
                                            type="text"
                                            placeholder="0.00"
                                            style={{
                                              borderTopRightRadius: 0,
                                              borderBottomRightRadius: 0,
                                            }}
                                            value={state.allocatedAmount}
                                            onChange={handleState}
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
                                  </div>
                                </div>
                                {errorMessage ? (
                                  <div>
                                    <p className="text-danger">
                                      * {errorMessage}
                                    </p>
                                  </div>
                                ) : (
                                  ""
                                )}
                                <p>
                                  Remaining amount payable will be{" "}
                                  <span className="fw-bold">
                                    {state.remainingAllocatedAmount}৳
                                  </span>
                                </p>
                              </CardBody>
                            </Card>
                          </>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-danger"
              onClick={handleModalClose}
            >
              <i className="fas fa-times me-1"></i> Close
            </button>
            <button
              type="submit"
              className="btn btn-info ms-2"
              onClick={handleBillsSave}
              disabled={
                (state?.property_Id && state?.owner_folio_id) || selectedSellerFolio ? false : true
              }
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
  const { property_list_data, property_list_loading } = gstate.property;
  const { seller_folio_list_data } = gstate.AccountsTransactions;
  const { bill_property_list_data, bill_property_list_loading } =
    gstate.property;

  const {
    add_bills_loading,

    accounts_list_data,
    accounts_list_loading,

    supplier_list_data,
    supplier_list_loading,

    invoice_chart_list_data,
    invoice_chart_list_loading,

    job_list_data,
    job_list_loading,

    tenancy_list_loading,
    tenancy_list_data,

    add_bills_tenant_invoice_loading,

    edit_bill_data,
    edit_bill_loading,

    bill_accounts_list_data,
    bill_accounts_list_error,
    bill_accounts_list_loading,
  } = gstate.Bills;

  return {
    add_bills_loading,

    accounts_list_data,
    accounts_list_loading,

    supplier_list_data,
    supplier_list_loading,

    invoice_chart_list_data,
    invoice_chart_list_loading,

    bill_property_list_data,
    bill_property_list_loading,

    job_list_data,
    job_list_loading,

    tenancy_list_loading,
    tenancy_list_data,

    add_bills_tenant_invoice_loading,

    edit_bill_data,
    edit_bill_loading,

    bill_accounts_list_data,
    bill_accounts_list_error,
    bill_accounts_list_loading,
    seller_folio_list_data,
  };
};

export default connect(mapStateToProps, {
  addBills,
  accountsList,
  supplierList,
  invoiceChartList,
  billPropertyList,
  jobList,
  addBillsFresh,
  tenancyList,
  addBillsWithTenantInvoice,
  addBillsWithTenantInvoiceFresh,
  accountsListFresh,
  supplierListFresh,
  folioListFresh,
  jobListFresh,
  invoiceChartListFresh,
  tenancyListFresh,
  allBillsListDueFresh,
  allBillsListFutureFresh,
  allBillsListPaidFresh,
  editBillDataShow,
  billAccountsList,
  billAccountsListFresh,
  sellerFolioList,
})(AddBillsModal);
