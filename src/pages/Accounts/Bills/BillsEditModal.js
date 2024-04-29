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
  allBillsListDue,
  allBillsListDueFresh,
  allBillsListFutureFresh,
  allBillsListPaidFresh,
  editBillDataShow,
  editBills,
  editBillsFresh,
  uploadBillsListFresh,
  allBillsListFuture,
  allBillsListPaid,
} from "store/actions";

import toastr from "toastr";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { optionPriority } from "pages/common/common";

const BillsEditModal = props => {
  const [init, setInit] = useState(true);
  const date = moment().format("yyyy-MM-DD");

  const [state, setState] = useState({
    billsDate: date,
    taxCheck: 0,
    taxCheckInvoice: 0,
  });

  const [file, setFile] = useState();
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [optionGroupSupplier, setOptionGroupSupplier] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState();
  const [optionGroupAccount, setOptionGroupAccount] = useState([
    {
      options: [{ label: "400-Council rates", value: 1 }],
    },
  ]);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [optionGroupPriority, setOptionGroupPriority] =
    useState(optionPriority);
  const [selectedPropertyFolio, setSelectedPropertyFolio] = useState();
  const [optionGroupPropertyFolio, setOptionGroupPropertyFolio] = useState([]);
  console.log(optionGroupPropertyFolio);

  const [selectedSelectJobOrReminder, setSelectedSelectJobOrReminder] =
    useState(null);
  const [optionGroupSelectJobOrReminder, setOptionGroupSelectJobOrReminder] =
    useState();

  const [selectedInvoiceChart, setSelectedInvoiceChart] = useState(null);
  const [optionGroupInvoiceChart, setOptionGroupInvoiceChart] = useState([]);
  const [selectedTenancy, setSelectedTenancy] = useState(null);
  const [optionGroupTenancy, setOptionGroupTenancy] = useState([
    {
      options: [{ label: "200-rent", value: "200-rent" }],
    },
  ]);

  const [invoiceChecker, setInvoiceChecker] = useState(false);
  const [jobSelect, setJobSelect] = useState(true);

  const checkHandler = e => {
    if (e.target.value) {
      setState(prev => {
        return { ...prev, taxCheck: prev.taxCheck === 0 ? 1 : 0 };
      });
    }
  };

  const dateHandler = (selectedDates, dateStr, instance) => {
    setState({ ...state, ["billsDate"]: dateStr });
  };
  const handleState = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSelectSupplier = e => {
    setState({
      ...state,
      supplier: e.value,
      jobOrReminder: null,
      supplier_details_id: e.supplier_details_id,
      account: e.account,
      priority: e.prior,
    });
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

  const handleBillsSave = e => {
    e.preventDefault();

    props.editBills(props.data?.id, state, file);

    setOptionGroupSelectJobOrReminder({});

    setInit(true);
    setState({});
    // props.setShowModal(false);
    // props.setActionArray([]);
    // props.startLoader();
  };

  const handleChange = async e => {
    setFile(e.target.files[0]);
  };

  const reduxDataFresh = () => {
    props.accountsListFresh();
    props.supplierListFresh();
    props.folioListFresh();
    props.jobListFresh();
    props.invoiceChartListFresh();
    props.tenancyListFresh();
    props.allBillsListDueFresh();
    props.allBillsListFutureFresh();
    props.allBillsListPaidFresh();
    setSelectedSupplier();
    setSelectedAccount();
    setSelectedPriority();
    setSelectedPropertyFolio();
    setSelectedPropertyFolio();
    setSelectedInvoiceChart();
    setSelectedSelectJobOrReminder();
    setSelectedTenancy();
    setOptionGroupSelectJobOrReminder();
  };

  const handleModalClose = () => {
    props.setShowModal(false);
    setInit(true);
    reduxDataFresh();
    setState({});
    // props.setActionArray([]);
  };

  if (
    props.data !== undefined &&
    Object.keys(props.data).length !== 0 &&
    props.data.constructor === Object &&
    init
  ) {
    if (init) {
      setState(prev => ({
        ...prev,
        billsDate: props.data?.billing_date,
        details: props.data?.details,
        amount: props.data?.amount,
        invoiceReference: props.data?.invoice_ref,
        supplier: props.data?.supplier_contact_id,
        account: props.data?.bill_account_id,
        jobOrReminder: props.data?.maintenance?.id,
        property_Id: props.data?.property?.id,
        taxCheck: props.data?.include_tax,
        priority: props.data?.priority,
        supplier_details_id: props.data?.supplier_folio_id,
        owner_folio_id: props.data?.owner_folio_id,
      }));

      setSelectedSupplier({
        label: props.data?.supplier?.reference,
        value: props.data?.supplier_contact_id,
      });
      setSelectedAccount({
        label: props.data?.bill?.account_name,
        value: props.data?.bill?.id,
      });

      setSelectedPriority({
        label: props.data?.priority,
        value: props.data?.priority,
      });

      setSelectedPropertyFolio({
        label: props.data?.property?.reference,
        value: props.data?.property?.id,
      });

      setSelectedSelectJobOrReminder({
        label: `Job #${props.data?.maintenance?.id ? props.data?.maintenance?.id : ""
          }-${props.data?.maintenance?.summary
            ? props.data?.maintenance?.summary
            : ""
          }`,
        value: props.data?.maintenance?.id,
      });

      setInit(false);
    }
  }
  useEffect(() => {
    props.billPropertyList();
    props.supplierList();
    props.billAccountsList();
  }, []);
  useEffect(() => {
    if (props.edit_bills_loading === "Success") {
      toastr.success("Successfully Edited");
      props.editBillsFresh();
      props.uploadBillsListFresh();
      props.allBillsListDue();
      props.allBillsListFuture();
      props.allBillsListPaid();
      reduxDataFresh();
      if (props.text == 'supplier') {

        props.supplierBillApiCall()
      }
      props.setShowModal(false);
    } else if (props.edit_bills_loading === "Failed") {
      toastr.error("ERROR");
      props.editBillsFresh();
    }
  }, [props.edit_bills_loading]);
  useEffect(() => {
    if (state.property_Id && state.supplier) {
      if (jobSelect) {
        props.jobList(state.property_Id, state.supplier);
      }
      setJobSelect(false);
    }
  }, [state.property_Id, state.supplier])
  useEffect(() => {
    let optionJob;
    if (props.job_list_data?.data) {
      optionJob = props.job_list_data?.data.map(item => ({
        label: `Job #${item.id}-${item.summary}`,
        value: item.id,
      }));
      setOptionGroupSelectJobOrReminder(optionJob);
    }
  }, [props.job_list_data?.data])
  useEffect(() => {
    let optionFolio;
    if (props.bill_property_list_data?.data) {
      optionFolio = props.bill_property_list_data?.data.map(item => ({
        label: item.reference,
        value: item.id,
        owner_folio_id: item?.owner_folio?.id,
      }));
      setOptionGroupPropertyFolio(optionFolio);
    }
  }, [props.bill_property_list_data?.data])
  useEffect(() => {
    let optionSupplier;
    if (props.supplier_list_data?.data) {
      optionSupplier = props.supplier_list_data?.data.map(item => ({
        label: item.reference,
        value: item.id,
        supplier_details_id: item?.supplier_details?.id,
        account: item?.supplier_details?.supplier_account?.id,
        accountName:
          item?.supplier_details?.supplier_account?.account_number +
          "-" +
          item?.supplier_details?.supplier_account?.account_name,
        prior: item?.supplier_details?.priority,
      }));
      setOptionGroupSupplier(optionSupplier);
    }
  }, [props.supplier_list_data?.data])
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

  return (
    <>
      <Modal
        size="xl"
        isOpen={props.showModal}
        toggle={() => props.setShowModal(false)}
      >
        <ModalHeader toggle={() => props.setShowModal(false)}>
          <span className="text-primary">Edit & Replace Bill</span>
        </ModalHeader>

        <ModalBody>
          <div>
            <Card>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      {props.data ? (
                        <div style={{ height: "600px" }}>
                          <iframe
                            src={process.env.REACT_APP_IMAGE + props.data?.file}
                            width={"100%"}
                            height={"100%"}
                            style={{ overflow: "none", objectFit: "cover" }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </Col>

                  <Col md={6}>
                    {!props.data ? (
                      <div className="mb-3 row mx-1">
                        <Input
                          className="form-control"
                          type="file"
                          id="formFile"
                          onChange={handleChange}
                          multiple="false"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="mb-3 row">
                      <div className="col-md-12 d-flex align-items-center">
                        <label
                          htmlFor="customRange2"
                          className="form-label me-5"
                        >
                          Date
                        </label>
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
                      <label htmlFor="customRange1" className="form-label">
                        Select Supplier
                      </label>
                      <Select
                        value={selectedSupplier}
                        onChange={handleSelectSupplier}
                        options={optionGroupSupplier}
                        classNamePrefix="select2-selection"
                        placeholder="Supplier"
                        id="customRange1"
                        isDisabled={
                          props.data.uploaded === "Uploaded" ? false : true
                        }
                      />
                    </div>
                    <Row className="d-flex">
                      <Col md={7} className="mb-3 select2-container">
                        <label htmlFor="customRange3" className="form-label">
                          Select Account
                        </label>
                        <Select
                          value={selectedAccount}
                          onChange={handleSelectAccount}
                          options={optionGroupAccount}
                          classNamePrefix="select2-selection"
                          placeholder="Account"
                          id="customRange3"
                        />
                      </Col>
                      <Col md={5} className="mb-3 select2-container">
                        <label htmlFor="customRange4" className="form-label">
                          Priority
                        </label>
                        <Select
                          value={selectedPriority}
                          onChange={handleSelectPriority}
                          options={optionGroupPriority}
                          classNamePrefix="select2-selection"
                          placeholder="Priority"
                          id="customRange4"
                        // disabled={props.data ? true : false}
                        />
                      </Col>
                    </Row>
                    <div className="mb-3 row">
                      <div className="col-md-12">
                        <label htmlFor="customRange5" className="form-label">
                          Details
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={state.details}
                          placeholder="Details"
                          name="details"
                          onChange={handleState}
                          id="customRange5"
                        />
                      </div>
                    </div>
                    <div className="mb-3 select2-container">
                      <label htmlFor="customRange6" className="form-label">
                        Select Property
                      </label>
                      <Select
                        value={selectedPropertyFolio}
                        onChange={handleSelectPropertyFolio}
                        options={optionGroupPropertyFolio}
                        classNamePrefix="select2-selection"
                        placeholder="Property or Folio"
                        id="customRange6"
                        isDisabled={
                          props.data.uploaded === "Uploaded" ? false : true
                        }
                      />
                    </div>
                    <div className="mb-3 row">
                      <div className="col-md-12">
                        <label htmlFor="customRange7" className="form-label">
                          Invoice Reference
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Invoice reference #"
                          name="invoiceReference"
                          value={state.invoiceReference}
                          onChange={handleState}
                          id="customRange7"
                        />
                      </div>
                    </div>
                    <Row className="d-flex align-items-end">
                      <Col md={6}>
                        <div className="mb-3 row">
                          <div className="col-md-12">
                            <label
                              htmlFor="customRange8"
                              className="form-label"
                            >
                              Amount
                            </label>
                            <input
                              id="customRange8"
                              className="form-control"
                              type="text"
                              placeholder="Amount"
                              name="amount"
                              value={state.amount}
                              onChange={handleState}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="taxCheck"
                            name="taxCheck"
                            onClick={e => checkHandler(e)}
                            checked={state.taxCheck === 1 ? true : false}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                          >
                            Tax inc
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <div className="mb-3 select2-container">
                      <label htmlFor="customRange10" className="form-label">
                        Select Maintenance
                      </label>
                      <Select
                        id="customRange10"
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
              className="btn btn-info"
              onClick={handleModalClose}
            >
              <i className="fas fa-times me-1"></i> Close
            </button>
            <button
              type="submit"
              className="btn btn-info ms-2"
              onClick={handleBillsSave}
              disabled={
                state?.owner_folio_id && state?.property_Id ? false : true
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

    edit_bills_loading,

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

    edit_bills_loading,

    bill_accounts_list_data,
    bill_accounts_list_error,
    bill_accounts_list_loading,
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
  editBills,
  editBillsFresh,
  uploadBillsListFresh,
  allBillsListDue,
  allBillsListFuture,
  allBillsListPaid,
  billAccountsList,
  billAccountsListFresh,
})(BillsEditModal);
