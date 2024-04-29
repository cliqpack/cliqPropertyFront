import React, { useEffect, useState } from "react";
import Breadcrumbs from "components/Common/Breadcrumb";
import { connect } from "react-redux";
import { Link, withRouter, useHistory, useParams } from "react-router-dom";

import classnames from "classnames";
import DatatableTables2 from "pages/Tables/DatatableTables2";
import AddDepositReceipt from "pages/Accounts/Transactions/AddDepositReceipt";

import {
  transactionsListByIdForOwnerFolio,
  PendingBillsForOwner,
  PaidBillsForOwner,
  PendingInvoicesForOwner,
  getPropertyOwnerInfo,
  deleteInvoice,
  deleteInvoiceFresh,
  tenantInfoFresh,
  storeSingleDisbursementFresh,
  ownerArchive,
  ownerArchiveFresh,
} from "store/actions";
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
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import DisburseModal from "./DisburseModal";
import ReverseModal from "./ReverseModal";
import OwnerArchiveModal from "./OwnerArchiveModal";
import TransactionsInfoModal from "pages/Accounts/Transactions/TransactionsInfoModal";
import TransactionsInfoModalReverse from "pages/Accounts/Transactions/TransactionsInfoModalReverse";
import TransactionsInfoModalEdit from "pages/Accounts/Transactions/TransactionsInfoModalEdit";
import ClearFundModal from "pages/Accounts/Transactions/clearFundModal";
import BillsInfoModal from "pages/Accounts/Bills/BillsInfoModal";
import BillsEditModal from "pages/Accounts/Bills/BillsEditModal";
import ShowInvoiceModal from "pages/Accounts/Invoice/ShowInvoiceModal";
import AddInvoiceModal from "pages/Accounts/Invoice/AddInvoiceModal";
import DeleteModal from "components/Common/DeleteModal";
import toastr from "toastr";
import AddReceipt from "pages/Accounts/Transactions/AddReceipt";
import Loder from "components/Loder/Loder";
import moment from "moment";

document.title = "CliqProperty";

function OwnerFolio(props) {
  const { propertyId, fId } = useParams();
  const { location } = useHistory();
  const history = useHistory();
  const [init, setInit] = useState(true);
  const [seen, setSeen] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [selectedFolio, setSelectedFolio] = useState({ label: "", value: "" });
  const [state, setState] = useState({
    activeTab: "1",
    dropDownBtn: false,
    dropDownBtn1: false,
    transactionInfoModal: false,
    transactionInfoModalReverse: false,
    transactionInfoModalEdit: false,
    clearFundModal: false,
    archiveModal: false,
    disburseModal: false,
    reverseModal: false,
    archiveModal: false,
    transactionInfoModal: false,
    transactionInfoModalReverse: false,
    clearFundModal: false,
    loader: false,
  });

  const toggle = (tab, type = null) => {
    if (state.activeTab !== tab) {
      setState({
        ...state,
        activeTab: tab,
      });
    }
    if (tab == "1") {
      props.transactionsListByIdForOwnerFolio(
        "this_month",
        propertyId,
        ownerInfoData?.data?.id,
        fId
      );
    } else if (tab == "2") {
      props.transactionsListByIdForOwnerFolio(
        "all",
        propertyId,
        ownerInfoData?.data?.id,
        fId
      );
    } else if (tab == "3") {
      props.PendingBillsForOwner(propertyId, fId);
    } else if (tab == "4") {
      props.PaidBillsForOwner(propertyId, fId);
    } else if (tab === "5") {
      props.PendingInvoicesForOwner(propertyId, fId);
    }
  };

  const [modalDataItem, setModalDataItem] = useState({});
  const [showEditInvoiceModal, setShowEditInvoiceModal] = useState(false);
  const [showModalInvoice, setShowModalInvoice] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);

  const toggleEditInvoiceModal = () => setShowEditInvoiceModal(prev => !prev);

  const [deleteState, setDeleteState] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);
  //Loader
  const startLoader = () => setState({ ...state, loader: true });
  const endLoader = () => setState({ ...state, loader: false });

  const [data, setData] = useState({});
  const [Id, setId] = useState(null);

  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);

  const toggleAddInvoiceModal = () => {
    setShowAddInvoiceModal(prev => !prev);
  };

  const toggleDepositModal = (from = null) => {
    if (from === "Close") {
      props.tenantInfoFresh();
    } else {
      setShowModalAdd(prev => !prev);
    }
    setShowDepositModal(prev => !prev);
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(prev => !prev);
  const toggleModalInvoice = () => setShowModalInvoice(prev => !prev);

  const [billEditModal, setBillEditModal] = useState(false);

  const billEditModalToggle = () => {
    setShowModal(false);
    setBillEditModal(true);
  };

  const toggleDisburse = () => {
    setState(prev => ({
      ...prev,
      disburseModal: !prev.disburseModal,
    }));
  };

  const toggleReverse = () => {
    setState(prev => ({
      ...prev,
      reverseModal: !prev.reverseModal,
    }));
  };

  const toggleArchive = () => {
    setState(prev => ({
      ...prev,
      archiveModal: !prev.archiveModal,
    }));
  };

  const toggleModalTransactions = () => {
    setState(prev => ({
      ...prev,
      transactionInfoModal: !prev.transactionInfoModal,
    }));
  };

  const toggleModalTransactionsReverse = id => {
    setState(prev => ({
      ...prev,
      transactionInfoModalReverse: !prev.transactionInfoModalReverse,
      receipt_id: id,
    }));
  };

  const toggleModalTransactionsEdit = () => {
    setState(prev => ({
      ...prev,
      transactionInfoModalEdit: !prev.transactionInfoModalEdit,
    }));
  };

  const toggleClearFund = () => {
    setState(prev => ({ ...prev, clearFundModal: !prev.clearFundModal }));
  };

  const transactionsDetails = (e, column, columnIndex, row, rowIndex) => {
    setState({ ...state, transactionId: row.id, transactionsDetails: row });
    toggleModalTransactions();
  };

  const checkingRefDebit = (cell, row) => (
    <span>
      {" "}
      {/* {row?.type == "Bill" && `$${cell}`}
      {row?.type == "Payment" && `$${cell}`} */}
      {cell && `${cell}৳`}
    </span>
  );
  const checkingRefCredit = (cell, row) => (
    <span>
      {" "}
      {/* {row?.type == "Tenant Receipt" && `$${cell}`}
      {row?.type == "Folio Receipt" && `$${cell}`} */}
      {cell && `${cell}৳`}
    </span>
  );
  const statusRef = (row, cell) => {
    if (cell.include_tax === 1) {
      return (
        <span className="">
          <i className="fas fa-check" />
        </span>
      );
    } else {
      return <span className=""></span>;
    }
  };

  const detailRef = (cell, row) => <span>{cell?.split("-")[1]}</span>;
  const fileRef = (cell, row) => (
    <a
      href={process.env.REACT_APP_IMAGE + row.file}
      target="_blank"
      rel="noreferrer noopener"
    >
      {row.file?.slice(0, 150)}
    </a>
  );

  const activeData = [
    {
      dataField: "id",
      text: "Audit",
      sort: true,
      // sortFunc: (a, b, order, dataField, rowA, rowB) => {
      //   return b - a;
      // },
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          transactionsDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "receipt_date",
      text: "Date",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          transactionsDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "ref",
      text: "Ref",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          transactionsDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "new_type",
      text: "Type",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          transactionsDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "property.reference",
      text: "Property",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          transactionsDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },

    {
      dataField: "summary",
      text: "Summary",
      sort: true,
    },

    {
      dataField: "debit_receipt_details_sum_amount",
      text: "Debit",
      sort: true,
      formatter: checkingRefDebit,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          transactionsDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "credit_receipt_details_sum_amount",
      text: "Credit",
      sort: true,
      formatter: checkingRefCredit,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          transactionsDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
  ];

  const billDetails = (e, column, columnIndex, row, rowIndex) => {
    setId(row.id);
    setData(row);
    toggleModal();
  };

  const amountFormatter = (cell, row) => {
    let balance =
      +row?.owner?.owner_folio?.money_in +
      (row?.owner?.owner_folio?.opening_balance
        ? +row?.owner?.owner_folio?.opening_balance
        : 0) -
      (+row?.owner?.owner_folio?.money_out +
        +row?.owner?.owner_folio?.uncleared);
    let amount = (
      <span
        className={`badge rounded-pill p-1 ${balance >= cell ? "bg-success" : "bg-danger"
          }`}
      >
        {cell}৳
      </span>
    );
    return amount;
  };
  const invAmountFormatter = (cell, row) => {
    let amount = <span>{cell}৳</span>;
    return amount;
  };

  const pendingBillData = [
    {
      dataField: "id",
      text: "Bill #",
      sort: true,
      // sortFunc: (a, b, order, dataField, rowA, rowB) => {
      //   return b - a;
      // },
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "supplier.reference",
      text: "Supplier",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "property.reference",
      text: "Property",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "invoice_ref",
      text: "Ref",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "",
      text: "P",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "maintenance.due_by",
      text: "Due",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "bill.account_name",
      text: "Account",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "bill.account_name",
      text: "Detail",
      formatter: detailRef,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "file",
      text: "",
      formatter: fileRef,
      sort: true,
    },
    {
      dataField: "include_tax",
      text: "Tax",
      sort: true,
      formatter: statusRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, row);
        },
      },
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      formatter: amountFormatter,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, row);
        },
      },
    },
  ];

  const paidBillData = [
    {
      dataField: "id",
      text: "Bill #",
      sort: true,
      // sortFunc: (a, b, order, dataField, rowA, rowB) => {
      //   return b - a;
      // },
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "supplier.reference",
      text: "Supplier",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "property.reference",
      text: "Property",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "invoice_ref",
      text: "Ref",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "",
      text: "P",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "billing_date",
      text: "Due",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "bill.account_name",
      text: "Account",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "bill.account_name",
      text: "Detail",
      formatter: detailRef,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "file",
      text: "",
      formatter: fileRef,
      sort: true,
    },
    {
      dataField: "include_tax",
      text: "Tax",
      sort: true,
      formatter: statusRef,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, row);
        },
      },
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      formatter: amountFormatter,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, row);
        },
      },
    },
  ];

  const invoiceDetails = (e, row) => {
    setModalDataItem(row);
    setId(row.id);
    toggleModalInvoice();
  };

  const folioBalanceFormatter = (cell, row) => (
    <span>{row?.tenant_folio?.deposit ? row?.tenant_folio?.deposit : 0}৳</span>
  );
  const paidFormatter = (cell, row) => <span>{row.paid ? row.paid : 0}৳</span>;

  const pendingInvoiceData = [
    {
      dataField: "id",
      text: "Invoice #",
      sort: true,
      // sortFunc: (a, b, order, dataField, rowA, rowB) => {
      //   return b - a;
      // },
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          invoiceDetails(e, row);
        },
      },
    },
    {
      dataField: "tenant.reference",
      text: "Tenant",
      // formatter: ref,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          invoiceDetails(e, row);
        },
      },
    },
    {
      dataField: "property.reference",
      text: "Property",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          invoiceDetails(e, row);
        },
      },
    },
    {
      dataField: "",
      text: "Folio Balance",
      formatter: folioBalanceFormatter,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          invoiceDetails(e, row);
        },
      },
    },
    {
      dataField: "invoice_billing_date",
      text: "Due",
      // formatter: owner,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          invoiceDetails(e, row);
        },
      },
    },
    {
      dataField: "chart_of_account.account_name",
      text: "Account",
      // formatter: owner,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          invoiceDetails(e, row);
        },
      },
    },
    {
      dataField: "details",
      text: "Detail",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          invoiceDetails(e, row);
        },
      },
    },
    {
      dataField: "file",
      text: "Attachment",
      formatter: fileRef,
      sort: true,
    },
    {
      dataField: "amount",
      text: "Amount",
      formatter: invAmountFormatter,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          invoiceDetails(e, row);
        },
      },
    },
    {
      dataField: "",
      text: "Paid",
      formatter: paidFormatter,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          invoiceDetails(e, row);
        },
      },
    },
    {
      dataField: "",
      text: "Sent",
      // formatter: owner,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          invoiceDetails(e, row);
        },
      },
    },
  ];

  const ownerEditHandler = (id, tabId, fId) => {
    history.push({ pathname: `/owner/edit/${id}/${fId}/${tabId}`, state: { proId: propertyId } });
  };

  const ownerInfoData = props.property_owner_info_data?.data;

  const handleDeleteProject = () => {
    props.deleteInvoice(Id);
    setDeleteState(false);
  };

  useEffect(() => {
    if (!seen) {
      props.transactionsListByIdForOwnerFolio(
        "this_month",
        propertyId,
        ownerInfoData?.data?.id,
        fId
      );
      props.getPropertyOwnerInfo(propertyId);
    }

    if (props.property_owner_info_loading === false) {
      props.getPropertyOwnerInfo(propertyId);
    }

    if (props.delete_invoice_loading === "Success") {
      toastr.error("Invoice Deleted");
      props.deleteInvoiceFresh();
      props.PendingInvoicesForOwner(propertyId, fId);
      toggle("5");
    }
    if (props.add_tenant_receipt_loading === "Success") {
      if (state.activeTab === "1") {
        props.transactionsListByIdForOwnerFolio(
          "this_month",
          propertyId,
          ownerInfoData?.data?.id,
          fId
        );
      } else if (state.activeTab === "2") {
        props.transactionsListByIdForOwnerFolio(
          "all",
          propertyId,
          ownerInfoData?.data?.id,
          fId
        );
      } else if (state.activeTab === "5") {
        props.PendingInvoicesForOwner(propertyId, fId);
      }
    }
    if (props.tenant_deposit_receipt_loading === "Success") {
      props.PendingInvoicesForOwner(propertyId, fId);
    }
    if (props.pay_bill_loading === "Success") {
      props.getPropertyOwnerInfo(propertyId);
    }
    if (props.delete_bill_loading === "Success") {
      props.getPropertyOwnerInfo(propertyId);
      endLoader();
    }
    if (props.edit_bills_loading === "Success") {
      props.PendingBillsForOwner(propertyId, fId);
    }
    if (props.edit_invoice_loading === "Success") {
      if (state.activeTab === "5") {
        props.PendingInvoicesForOwner(propertyId, fId);
      }
    }
    if (props.edit_invoice_loading === "Failed") {
      if (state.activeTab === "5") {
        props.PendingInvoicesForOwner(propertyId, fId);
      }
    }
    if (props.store_single_disbursement_loading === "Success") {
      props.getPropertyOwnerInfo(propertyId);
      if (state.activeTab === "1") {
        props.transactionsListByIdForOwnerFolio(
          "this_month",
          propertyId,
          ownerInfoData?.data?.id,
          fId
        );
      } else if (state.activeTab === "2") {
        props.transactionsListByIdForOwnerFolio(
          "all",
          propertyId,
          ownerInfoData?.data?.id,
          fId
        );
      } else if (state.activeTab === "3") {
        props.PendingBillsForOwner(propertyId, fId);
      } else if (state.activeTab === "4") {
        props.PaidBillsForOwner(propertyId, fId);
      }
      // props.storeSingleDisbursementFresh();
    }
    if (props.archive_owner_loading == "Success") {
      if (props.archive_owner_data?.status == 1) {
        console.log("archive done");
        toastr.success("Success");
      }
      props.getPropertyOwnerInfo(propertyId);
      props.ownerArchiveFresh();
    }
    setSeen(true);
  }, [
    props.transaction_list_id_owner_folio_loading,
    props.property_owner_info_loading,
    props.delete_invoice_loading,
    props.add_tenant_receipt_loading,
    props.pay_bill_loading,
    props.delete_bill_loading,
    props.edit_bills_loading,
    props.edit_invoice_loading,
    props.tenant_deposit_receipt_loading,
    props.store_single_disbursement_loading,
    props.archive_owner_loading,
    props.archive_owner_data,
    props.property_owner_info_data,
  ]);

  let moneyIn =
    (ownerInfoData?.folio?.money_in ? ownerInfoData?.folio?.money_in : 0) +
    (ownerInfoData?.folio?.opening_balance
      ? +ownerInfoData?.folio?.opening_balance
      : 0);
  let moneyOut =
    (ownerInfoData?.folio?.money_out ? ownerInfoData?.folio?.money_out : 0) +
    // (ownerInfoData?.folio?.uncleared ? ownerInfoData?.folio?.uncleared : 0) +
    (ownerInfoData?.ownerPendingBill?.total_bills_amount_sum_amount
      ? +ownerInfoData?.ownerPendingBill?.total_bills_amount_sum_amount
      : 0);
  let totalBalance = moneyIn - moneyOut;

  const toggleAdd = () => {
    setShowModalAdd(prev => !prev);

    props.tenantInfoFresh();
  };

  const handleUndoArchive = () => {
    props.ownerArchive(fId, "1");
  };

  return (
    <div className="page-content">
      {state.loader && <Loder status={state.loader} />}
      {showModalAdd ? (
        <AddReceipt
          toggle={toggleAdd}
          toggleDepositModal={toggleDepositModal}
          showModal={showModalAdd}
          setShowModal={setShowModalAdd}
          selectedFolio={selectedFolio.value}
          label={selectedFolio.label}
          value={selectedFolio.value}
        />
      ) : null}
      {showDepositModal && (
        <AddDepositReceipt
          showDepositModal={showDepositModal}
          toggleDepositModal={toggleDepositModal}
        />
      )}
      <Container fluid={true}>
        <h4 className="text-primary py-2">Owner Folio</h4>
        <Row>
          <Col md={2}>
            <div>
              <Card style={{ borderRadius: "14px" }}>
                <CardBody>
                  <Row>
                    <Col md={12} className="d-flex flex-column">
                      <div className="mb-3">
                        <h4
                          className="ms-2 text-primary"
                          style={{ fontSize: "14px" }}
                        >
                          {ownerInfoData?.data?.reference} Owner Folio{" "}
                          {location.state?.folioCode
                            ? `${location.state?.folioCode}`
                            : ""}
                        </h4>
                      </div>
                      <div className="d-flex justify-content-center">
                        {props.property_owner_info_data?.data?.data?.status ==
                          "1" && (
                            <Dropdown
                              isOpen={state.dropDownBtn}
                              toggle={() =>
                                setState(prev => {
                                  return {
                                    ...prev,
                                    dropDownBtn: !prev.dropDownBtn,
                                  };
                                })
                              }
                              className="mt-4 mt-sm-0 me-2"
                            >
                              <DropdownToggle
                                className="btn btn-info btn-md"
                                caret
                              >
                                Actions <i className="mdi mdi-chevron-down"></i>
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem
                                  onClick={() =>
                                    ownerEditHandler(location.state.oId, 2, fId)
                                  }
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem onClick={toggleDisburse}>
                                  Disburse
                                </DropdownItem>
                                {/* <DropdownItem onClick={toggleReverse}>
                              Reverse Last Disbursement
                            </DropdownItem> */}
                                <DropdownItem onClick={toggleArchive}>
                                  Archive
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          )}
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              {props.property_owner_info_data?.data?.data?.status == "1" && (
                <Card style={{ borderRadius: "14px" }}>
                  <CardBody>
                    <Row>
                      <Col md={12}>
                        <Row className="p-1 d-flex flex-column gap-3">
                          <Col
                            className="d-flex flex-column justify-content-center"
                            style={{
                              borderStyle: "dotted",
                              borderWidth: "thin",
                              borderColor: "#DCDCDC",
                              backgroundColor: "#F0FFFF",
                              height: "70px",
                              padding: "10px",
                              borderRadius: "10px",
                              textAlign: "center",
                            }}
                          >
                            <span className="text-muted fw-bold">Opening</span>
                            <span className="text-muted">
                              {ownerInfoData?.folio?.opening_balance || "0.00"}৳
                            </span>
                          </Col>
                          <Col
                            className="d-flex flex-column justify-content-center"
                            style={{
                              borderStyle: "dotted",
                              borderWidth: "thin",
                              borderColor: "#DCDCDC",
                              backgroundColor: "#F0FFFF",
                              padding: "10px",
                              borderRadius: "10px",
                              textAlign: "center",
                            }}
                          >
                            <span className="text-muted fw-bold">Money in</span>
                            <span className="text-muted">
                              {ownerInfoData?.folio?.money_in || "0.00"}৳
                            </span>
                          </Col>
                          <Col
                            className="d-flex flex-column justify-content-center"
                            style={{
                              borderStyle: "dotted",
                              borderWidth: "thin",
                              borderColor: "#DCDCDC",
                              backgroundColor: "#F0FFFF",
                              padding: "10px",
                              borderRadius: "10px",
                              textAlign: "center",
                            }}
                          >
                            <span className="text-muted fw-bold">
                              Money out
                            </span>
                            <span className="text-muted">
                              {ownerInfoData?.folio?.money_out || "0.00"}৳
                            </span>
                          </Col>
                          <Col
                            className="d-flex flex-column justify-content-center"
                            style={{
                              borderStyle: "dotted",
                              borderWidth: "thin",
                              borderColor: "#DCDCDC",
                              backgroundColor: "#F0FFFF",
                              padding: "10px",
                              borderRadius: "10px",
                              textAlign: "center",
                            }}
                          >
                            <span className="text-muted fw-bold">
                              Uncleared
                            </span>
                            <span className="text-muted">
                              {ownerInfoData?.folio?.uncleared || "0.00"}৳
                            </span>
                          </Col>
                          <Col
                            className="d-flex flex-column justify-content-center"
                            style={{
                              borderStyle: "dotted",
                              borderWidth: "thin",
                              borderColor: "#DCDCDC",
                              backgroundColor: "#F0FFFF",
                              padding: "10px",
                              borderRadius: "10px",
                              textAlign: "center",
                            }}
                          >
                            <span className="text-muted fw-bold">
                              Bills pending
                            </span>
                            <span className="text-muted">
                              {ownerInfoData?.ownerPendingBill
                                ?.total_bills_amount_sum_amount
                                ? ownerInfoData?.ownerPendingBill
                                  ?.total_bills_amount_sum_amount
                                : "0.00"}৳
                            </span>
                          </Col>
                          <Col
                            className="d-flex flex-column justify-content-center"
                            style={{
                              borderStyle: "dotted",
                              borderWidth: "thin",
                              borderColor: "#DCDCDC",
                              backgroundColor: "#F0FFFF",
                              padding: "10px",
                              borderRadius: "10px",
                              textAlign: "center",
                            }}
                          >
                            <span className="text-muted fw-bold">
                              Invoices pending
                            </span>
                            <span className="text-muted">
                              {ownerInfoData?.pending_invoice_bill
                                ? ownerInfoData?.pending_invoice_bill
                                : "0.00"}৳
                            </span>
                          </Col>
                          <Col
                            className="d-flex flex-column justify-content-center"
                            style={{
                              borderStyle: "dotted",
                              borderWidth: "thin",
                              borderColor: "#DCDCDC",
                              backgroundColor: "#F0FFFF",
                              padding: "10px",
                              borderRadius: "10px",
                              textAlign: "center",
                            }}
                          >
                            <span className="text-muted fw-bold">Withhold</span>
                            <span className="text-muted">
                              {ownerInfoData?.folio?.withhold_amount
                                ? ownerInfoData?.folio?.withhold_amount
                                : "0.00"}৳
                            </span>
                          </Col>
                          <Col
                            className="d-flex flex-column justify-content-center"
                            style={{
                              borderStyle: "dotted",
                              borderWidth: "thin",
                              borderColor: "#DCDCDC",
                              backgroundColor: "#F0FFFF",
                              padding: "10px",
                              borderRadius: "10px",
                              textAlign: "center",
                            }}
                          >
                            <span className="text-muted fw-bold">Balance</span>
                            <span className="text-muted">
                              {totalBalance > 0 ? totalBalance : "0.00"}৳
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              )}
            </div>
          </Col>

          <Col md={10} style={{ padding: "0px" }}>
            <div>
              <Card style={{ borderRadius: "14px" }}>
                <CardBody>
                  {ownerInfoData?.data?.status == "0" && (
                    <Alert color="info">
                      <div className="d-flex justify-content-between">
                        <span className="font-size-20">
                          <i className="fas fa-archive"></i> Archived on{" "}
                          {moment(ownerInfoData?.data?.updated_at).format(
                            "DD MMM YYYY"
                          )}
                        </span>
                        <Button
                          color="info"
                          className="btn btn-sm"
                          onClick={handleUndoArchive}
                        >
                          <i className="fas fa-undo-alt"></i> Restore
                        </Button>
                      </div>
                    </Alert>
                  )}
                  <Row>
                    <Col sm={9}>
                      <Nav
                        className="icon-tab"
                        style={{
                          marginBottom: "-54px",
                          position: "relative",
                          height: "38px",
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "0px",
                        }}
                      >
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "1",
                            })}
                            onClick={() => {
                              toggle("1");
                            }}
                          >
                            Current Transactions
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "2",
                            })}
                            onClick={() => {
                              toggle("2");
                            }}
                          >
                            All Transactions
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "3",
                            })}
                            onClick={() => {
                              toggle("3");
                            }}
                          >
                            Pending Bills
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "4",
                            })}
                            onClick={() => {
                              toggle("4");
                            }}
                          >
                            Paid Bills
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "5",
                            })}
                            onClick={() => {
                              toggle("5");
                            }}
                          >
                            Pending Invoices
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </Col>
                  </Row>

                  <TabContent
                    activeTab={state.activeTab}
                    className="p-3 text-muted"
                  >
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            {props.transaction_list_id_owner_folio_data !=
                              null ? (
                              <DatatableTables2
                                products={
                                  props.transaction_list_id_owner_folio_data ||
                                  []
                                }
                                columnData={activeData}
                              />
                            ) : (
                              []
                            )}
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            {props.transaction_list_id_owner_folio_data !=
                              null ? (
                              <DatatableTables2
                                products={
                                  props.transaction_list_id_owner_folio_data ||
                                  []
                                }
                                columnData={activeData}
                              />
                            ) : (
                              []
                            )}
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            {props.pending_bills_owner_folio_data ? (
                              <DatatableTables2
                                products={
                                  props.pending_bills_owner_folio_data || []
                                }
                                columnData={pendingBillData}
                              // url={url}
                              />
                            ) : (
                              []
                            )}
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="4">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            {props.paid_bills_owner_folio_data ? (
                              <DatatableTables2
                                products={
                                  props.paid_bills_owner_folio_data || []
                                }
                                columnData={paidBillData}
                              />
                            ) : (
                              []
                            )}
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="5">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            {props.pending_invoices_owner_folio_data ? (
                              <DatatableTables2
                                products={
                                  props.pending_invoices_owner_folio_data || []
                                }
                                columnData={pendingInvoiceData}
                              />
                            ) : (
                              []
                            )}
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      {state.disburseModal && (
        <DisburseModal toggle={toggleDisburse} state={state} ownerId={fId} />
      )}
      <ReverseModal toggle={toggleReverse} state={state} />
      {state.archiveModal && (
        <OwnerArchiveModal toggle={toggleArchive} state={state} id={fId} />
      )}

      <TransactionsInfoModal
        state={state}
        setState={setState}
        toggle={toggleModalTransactions}
        receipt={state.transactionsDetails}
        toggleReverse={toggleModalTransactionsReverse}
        toggleEdit={toggleModalTransactionsEdit}
        toggleClearFund={toggleClearFund}
      />
      <TransactionsInfoModalReverse
        state={state}
        setState={setState}
        toggle={toggleModalTransactionsReverse}
        toggleinfo={toggleModalTransactions}
      />
      <TransactionsInfoModalEdit
        state={state}
        setState={setState}
        toggle={toggleModalTransactionsEdit}
      />
      {state.clearFundModal && (
        <ClearFundModal
          state={state}
          setState={setState}
          toggle={toggleClearFund}
        />
      )}

      {showModal && (
        <BillsInfoModal
          showModal={showModal}
          setEditModal={setShowModal}
          toggleModal={toggleModal}
          Id={Id}
          data={data}
          billEditModalToggle={billEditModalToggle}
          propertyId={propertyId}
          ownerId={ownerInfoData?.data?.id}
          startLoader={startLoader}
        />
      )}
      {billEditModal && (
        <BillsEditModal
          data={data}
          showModal={billEditModal}
          setShowModal={setBillEditModal}
          toggle={billEditModalToggle}
          toogleTab={toggle}
          startLoader={startLoader}
          endLoader={endLoader}
        />
      )}
      {showModalInvoice && (
        <ShowInvoiceModal
          toggleAdd={toggleAdd}
          showModal={showModalInvoice}
          toggleModal={toggleModalInvoice}
          data={modalDataItem}
          toggleEditInvoiceModal={toggleAddInvoiceModal}
          deleteInvoiceModal={setDeleteState}
          setInvoiceId={setInvoiceId}
          startLoader={startLoader}
          endLoader={endLoader}
          setSelectedFolio={setSelectedFolio}
        />
      )}
      {showAddInvoiceModal && (
        <AddInvoiceModal
          showModal={showAddInvoiceModal}
          toggle={toggleAddInvoiceModal}
          data={modalDataItem}
          startLoader={startLoader}
          endLoader={endLoader}
        />
      )}
      {deleteState && (
        <DeleteModal
          show={deleteState}
          onDeleteClick={handleDeleteProject}
          onCloseClick={() => setDeleteState(false)}
        />
      )}
    </div>
  );
}

const mapStateToProps = gstate => {
  const {
    transaction_list_id_owner_folio_data,
    transaction_list_id_owner_folio_loading,
    pending_bills_owner_folio_data,
    pending_bills_owner_folio_loading,
    paid_bills_owner_folio_data,
    paid_bills_owner_folio_loading,
    pending_invoices_owner_folio_data,
    pending_invoices_owner_folio_loading,
    add_tenant_receipt_loading,
    tenant_deposit_receipt_loading,
    archive_owner_loading,
    archive_owner_data,
  } = gstate.AccountsTransactions;

  const { pay_bill_loading, delete_bill_loading, edit_bills_loading } =
    gstate.Bills;

  const { store_single_disbursement_loading } = gstate.Disbursement;

  const { delete_invoice_loading, edit_invoice_loading } =
    gstate.AccountsInvoices;

  const { property_owner_info_data, property_owner_info_loading } =
    gstate.property;

  return {
    transaction_list_id_owner_folio_data,
    transaction_list_id_owner_folio_loading,
    pending_bills_owner_folio_data,
    pending_bills_owner_folio_loading,
    paid_bills_owner_folio_data,
    paid_bills_owner_folio_loading,
    pending_invoices_owner_folio_data,
    pending_invoices_owner_folio_loading,
    property_owner_info_data,
    property_owner_info_loading,
    delete_invoice_loading,
    add_tenant_receipt_loading,
    pay_bill_loading,
    delete_bill_loading,
    edit_bills_loading,
    edit_invoice_loading,
    tenant_deposit_receipt_loading,
    store_single_disbursement_loading,
    archive_owner_loading,
    archive_owner_data,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    transactionsListByIdForOwnerFolio,
    PendingBillsForOwner,
    PaidBillsForOwner,
    PendingInvoicesForOwner,
    getPropertyOwnerInfo,
    deleteInvoice,
    deleteInvoiceFresh,
    tenantInfoFresh,
    storeSingleDisbursementFresh,
    ownerArchive,
    ownerArchiveFresh,
  })(OwnerFolio)
);
