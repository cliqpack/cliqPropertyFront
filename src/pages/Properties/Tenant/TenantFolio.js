import React, { useEffect, useState } from "react";
import Breadcrumbs from "components/Common/Breadcrumb";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, withRouter, useHistory, useParams } from "react-router-dom";

import classnames from "classnames";
import Loder from "components/Loder/Loder";
import moment from "moment";

import {
  transactionsListById,
  tenantArchive,
  tenantArchiveFresh,
  invoiceuUnpaidListById,
  invoiceUnpaidListFreshById,
  invoicePaidListById,
  invoicePaidListFreshById,
  getPropertyTenantInfo,
  transactionsInfoListFresh,
  deleteInvoice,
  deleteInvoiceFresh,
  RentActionList,
  RentActionListFresh,
  tenantInfoFresh,
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
import DatatableTables2 from "pages/Tables/DatatableTables2";
import ImageModal from "pages/Image/ImageModal";
import TransactionsInfoModal from "pages/Accounts/Transactions/TransactionsInfoModal";
import TenantArchiveModal from "./TenantArchiveModal";
import TransactionsInfoModalEdit from "pages/Accounts/Transactions/TransactionsInfoModalEdit";
import ClearFundModal from "pages/Accounts/Transactions/clearFundModal";
import ShowInvoiceModal from "pages/Accounts/Invoice/ShowInvoiceModal";
import TransactionsInfoModalReverse from "pages/Accounts/Transactions/TransactionsInfoModalReverse";
import AddInvoiceModal from "pages/Accounts/Invoice/AddInvoiceModal";
import DeleteModal from "pages/Calendar/DeleteModal";
import CreditRent from "./Rent/CreditRent";
import AddReceipt from "pages/Accounts/Transactions/AddReceipt";
import toastr from "toastr";
import AddDepositReceipt from "pages/Accounts/Transactions/AddDepositReceipt";
import DisbursementModal from "./DisbursementModal";
import TenantAdjustRent from "../TenantAdjustRent";
import RentDiscount from "./RentDiscount";

document.title = "CliqProperty";

function TenantFolio(props) {
  const { propertyId, contactId, id, folioId } = useParams();
  const [seen, setSeen] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [init, setInit] = useState(true);
  const [state, setState] = useState({
    activeTab: "1",
    dropDownBtn: false,
    dropDownBtn1: false,
    transactionInfoModal: false,
    transactionInfoModalReverse: false,
    transactionInfoModalEdit: false,
    clearFundModal: false,
    archiveModal: false,
  });
  const [state2, setState2] = useState();

  const [modalState, setModalState] = useState({
    creditRent: false,
    disburseModal: false,
  });

  const [selectedFolio, setSelectedFolio] = useState({ label: "", value: "" });
  const [showModalInvoice, setShowModalInvoice] = useState(false);
  const toggleModalInvoice = () => setShowModalInvoice(prev => !prev);

  const [modalDataItem, setModalDataItem] = useState({});
  const [Id, setId] = useState(null);

  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);
  const [rentActData, setRentActData] = useState();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const [rentDiscountState, setRentDiscountState] = useState(false);

  //adjust rent toggle
  const toggleAdjustRent = () => {
    setToggleState(prev => !prev);
  };
  // rent discount
  const toggleDiscountRent = () => {
    setRentDiscountState(prev => !prev);
  };

  const toggleAddInvoiceModal = () => setShowAddInvoiceModal(prev => !prev);

  const toggle = (tab, type = null) => {
    if (state.activeTab !== tab) {
      setState({
        ...state,
        activeTab: tab,
      });
    }
    if (tab == "1") {
      props.transactionsListById("this_month", propertyId, contactId, folioId);
    } else if (tab == "2") {
      props.transactionsListById("All", propertyId, contactId, folioId);
    } else if (tab == "3") {
      props.invoiceuUnpaidListById(propertyId, id);
    } else if (tab == "4") {
      props.invoicePaidListById(propertyId, id);
    } else if (tab == "5") {
      props.RentActionList(folioId);
    }
  };

  const toggleCreditRentModal = () => {
    setModalState(prev => ({ ...prev, creditRent: !prev.creditRent }));
  };
  const toggleDisburseModal = () => {
    setModalState(prev => ({ ...prev, disburseModal: !prev.disburseModal }));
  };
  const toggleDepositModal = (from = null) => {
    if (from === "Close") {
      props.tenantInfoFresh();
    } else {
      setShowModalAdd(prev => !prev);
    }
    setShowDepositModal(prev => !prev);
  };

  const history = useHistory();

  //Loader
  const startLoader = () => setState({ ...state, loader: true });
  const endLoader = () => setState({ ...state, loader: false });

  const toggleModalTransactions = () => {
    setState(prev => ({
      ...prev,
      transactionInfoModal: !prev.transactionInfoModal,
    }));
    // props.transactionsInfoListFresh();
  };
  const toggleModalTransactionsReverse = id => {
    setState(prev => ({
      ...prev,
      transactionInfoModalReverse: !prev.transactionInfoModalReverse,
      receipt_id: id,
    }));
  };

  const toggleClearFund = () => {
    setState(prev => ({ ...prev, clearFundModal: !prev.clearFundModal }));
  };
  const toggleArchive = () => {
    setState(prev => ({ ...prev, archiveModal: !prev.archiveModal }));
  };

  const toggleModalTransactionsEdit = () => {
    setState(prev => ({
      ...prev,
      transactionInfoModalEdit: !prev.transactionInfoModalEdit,
    }));
  };

  const transactionsDetails = (e, column, columnIndex, row, rowIndex) => {
    setState({ ...state, transactionId: row.id, transactionsDetails: row });
    toggleModalTransactions();
  };

  const tenantEditHandler = (id, tabId) => {
    history.push("/tenant/edit/" + id + "/" + tabId);
  };

  const advanceRentHandler = (tenant_id, property_id) => {
    history.push("/rent-management/" + property_id + "/" + tenant_id);
  };

  const amountRef = (cell, row) => {
    return <span>{row.amount}৳</span>;
  };

  const amountC = (cell, row) => {
    if (row.type == "Tenant Receipt") {
      return <span>{row.amount}৳</span>;
    }
    if (row.type == "Reversal") {
      return <span>{row.amount}৳</span>;
    }
    if (row.type == "Journal") {
      return <span>{row.amount}৳</span>;
    }
  };
  const amountD = (cell, row) => {
    if (row.type == "Folio Withdraw") {
      return <span>{row.amount}৳</span>;
    }
    if (row.type == "Withdraw") {
      return <span>{row.amount}৳</span>;
    }
    if (row.type == "Journal") {
      return <span>{row.amount}৳</span>;
    }
  };

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
      dataField: "",
      text: "Summary",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          transactionsDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "amount",
      text: "Debit",
      sort: true,
      formatter: amountD,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          transactionsDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "amount",
      text: "Credit",
      sort: true,
      formatter: amountC,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          transactionsDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    // {
    //   dataField: "amount",
    //   text: "Amount",
    //   sort: true,
    //   formatter: amountRef,
    //   events: {
    //     onClick: (e, column, columnIndex, row, rowIndex) => {
    //       transactionsDetails(e, column, columnIndex, row, rowIndex);
    //     },
    //   },
    // },
  ];

  const actionHandler = data => {
    toggleCreditRentModal();
    setRentActData(data);
  };
  const actionRef = (cell, row) => {
    return (
      <span onClick={() => actionHandler(row)} className="text-primary">
        {row.action}
      </span>
    );
  };

  const rentActionData = [
    {
      dataField: "action",
      text: "Action",
      sort: true,
      formatter: actionRef,
    },
    {
      dataField: "details",
      text: "Details",
      sort: true,
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      formatter: amountRef,
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
    },
  ];

  const idRef = (cell, row) => {
    return <span>000{row.id}</span>;
  };
  const fileRef = (cell, row) => {
    return (
      <a
        href={process.env.REACT_APP_IMAGE + row.file}
        target="_blank"
        rel="noreferrer noopener"
      >
        {row.file?.slice(0, 15)}
      </a>
    );
  };
  const detailsRef = (cell, row) => {
    return <span className="text-primary">{row.details?.slice(0, 30)}</span>;
  };

  const billDetails = (e, row) => {
    setId(row.id);
    toggleModal();
    setState({ ...state, transactionsDetails: row });
  };

  const amountFormatter = (cell, row) => {
    return <span>{row.amount}৳</span>;
  };

  const taxRef = (cell, row) => {
    return (
      <span>
        {row.include_tax === 1 ? <i className="fas fa-check"></i> : ""}
      </span>
    );
  };

  const t_name = (cell, row) => {
    return (
      <span>
        {cell.first_name} {cell.last_name}
      </span>
    );
  };
  const folioBalanceFormatter = (cell, row) => {
    return (
      <span>
        {row?.tenant_folio?.deposit ? row?.tenant_folio?.deposit : 0}৳
      </span>
    );
  };
  const pendingInvoiceData = [
    {
      dataField: "id",
      text: "Invoice #",
      formatter: idRef,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
    {
      dataField: "tenant",
      text: "Tenant",
      formatter: t_name,
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
          billDetails(e, row);
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
          billDetails(e, row);
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
          billDetails(e, row);
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
          billDetails(e, row);
        },
      },
    },
    {
      dataField: "details",
      text: "Detail",
      formatter: detailsRef,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, row);
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
      formatter: amountFormatter,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, row);
        },
      },
    },
    {
      dataField: "",
      text: "Paid",
      // formatter: owner,
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          billDetails(e, row);
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

  const paidFormatter = (cell, row) => <span>{row.paid ? row.paid : 0}৳</span>;

  const invoicePendingdData = [
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
      formatter: amountFormatter,
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

  const columnData = [
    {
      dataField: "id",
      text: "Invoice #",
      sort: true,
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
      formatter: amountFormatter,
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
      // formatter: owner,
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

  if (init) {
    props.transactionsListById("this_month", propertyId, contactId, folioId);
    setInit(false);
  }

  let tenantInfoData = undefined;
  let paidToData = undefined;
  if (
    props.property_tenant_info_data &&
    props.property_tenant_info_data?.status !== false
  ) {
    tenantInfoData = props.property_tenant_info_data.data;
    if (tenantInfoData?.folio?.paid_to) {
      paidToData = new Date(tenantInfoData?.folio.paid_to);
      paidToData = paidToData.toLocaleDateString("en-us", {
        day: "numeric",
        month: "short",
      });
    }
  }

  const toggleAdd = () => {
    setShowModalAdd(prev => !prev);

    props.tenantInfoFresh();
  };

  const handleDeleteProject = () => {
    props.deleteInvoice(Id);
    setDeleteState(false);
  };

  useEffect(() => {
    if (!seen) {
      props.transactionsListById("this_month", propertyId, contactId, folioId);
      props.getPropertyTenantInfo(propertyId);
    }
    if (props.property_tenant_info_loading === "Success") {
      setState(prev => ({
        ...prev,
        reference: props.property_tenant_info_data?.data?.data?.reference,
        first_name: props.property_tenant_info_data?.data?.data?.first_name,
        last_name: props.property_tenant_info_data?.data?.data?.last_name,
        salutation: props.property_tenant_info_data?.data?.data?.salutation,
        company_name: props.property_tenant_info_data?.data?.data?.company_name,

        email: props.property_tenant_info_data?.data?.data?.email,
        abn: props.property_tenant_info_data?.data?.data?.abn,
        notes: props.property_tenant_info_data?.data?.data?.notes,
      }));

      setState2({
        rent: props.property_tenant_info_data?.data?.folio?.rent,
        rent_type: props.property_tenant_info_data?.data?.folio?.rent_type,
        bond_required:
          props.property_tenant_info_data?.data?.folio?.bond_required,
        rentTax:
          props.property_tenant_info_data?.data?.folio?.rent_includes_tax,
        periodic_tenancy:
          props.property_tenant_info_data?.data?.folio?.periodic_tenancy,
        bond_held: props.property_tenant_info_data?.data?.folio?.bond_held,
        move_in: props.property_tenant_info_data?.data?.folio?.move_in,
        move_out: props.property_tenant_info_data?.data?.folio?.move_out,
        agreement_start:
          props.property_tenant_info_data?.data?.folio?.agreement_start,
        agreement_end:
          props.property_tenant_info_data?.data?.folio?.agreement_end,
        paid_to: props.property_tenant_info_data?.data?.folio?.paid_to,
        part_paid: props.property_tenant_info_data?.data?.folio?.part_paid,
        invoice_days_in_advance:
          props.property_tenant_info_data?.data?.folio?.invoice_days_in_advance,
        rent_review_frequency:
          props.property_tenant_info_data?.data?.folio?.rent_review_frequency,
        next_rent_review:
          props.property_tenant_info_data?.data?.folio?.next_rent_review,
        bank_reterence:
          props.property_tenant_info_data?.data?.folio?.bank_reterence,
        receipt_warning:
          props.property_tenant_info_data?.data?.folio?.receipt_warning,
        bond_paid:
          props.property_tenant_info_data?.data?.folio?.bond_already_paid,
        bond_arrears: props.property_tenant_info_data?.data?.folio?.bond_arreas,
        bond_receipted:
          props.property_tenant_info_data?.data?.folio?.bond_receipted,
        bond_reference:
          props.property_tenant_info_data?.data?.folio?.bond_reference,
        break_lease: props.property_tenant_info_data?.data?.folio?.break_lease,
        bond_notes: props.property_tenant_info_data?.data?.folio?.notes,
        termination: props.property_tenant_info_data?.data?.folio?.termination,
      });
    }
    if (props.delete_invoice_loading === "Success") {
      toastr.warning("Invoice Deleted");
      props.deleteInvoiceFresh();
      props.invoiceuUnpaidListById(propertyId, id);
    }
    if (props.add_tenant_receipt_loading === "Success") {
      if (state.activeTab === "3") {
        props.invoiceuUnpaidListById(propertyId, id);
      }
    }
    if (props.edit_invoice_loading === "Success") {
      if (state.activeTab === "3") {
        props.invoiceuUnpaidListById(propertyId, id);
      }
    }
    if (props.edit_invoice_loading === "Failed") {
      if (state.activeTab === "3") {
        props.invoiceuUnpaidListById(propertyId, id);
      }
    }
    if (props.tenant_deposit_receipt_loading === "Success") {
      props.invoiceuUnpaidListById(propertyId, id);
    }
    if (props.disburse_tenant_loading === "Success") {
      if (state.activeTab == "1") {
        props.transactionsListById(
          "this_month",
          propertyId,
          contactId,
          folioId
        );
      } else if (state.activeTab == "2") {
        props.transactionsListById("All", propertyId, contactId, folioId);
      }
      props.getPropertyTenantInfo(propertyId);
    }
    if (props.archive_tenant_loading === "Success") {
      toastr.success("Success");
      props.getPropertyTenantInfo(propertyId);
      props.tenantArchiveFresh();
    }
    setSeen(true);
  }, [
    props.transaction_list_id_loading,
    props.delete_invoice_loading,
    props.property_tenant_info_loading,
    props.add_tenant_receipt_loading,
    props.edit_invoice_loading,
    props.tenant_deposit_receipt_loading,
    props.disburse_tenant_loading,
    props.archive_tenant_loading,
  ]);

  const handleUndoArchive = () => {
    props.tenantArchive(id, "true");
  };
  return (
    <div className="page-content">
      {modalState.creditRent && (
        <CreditRent
          folioId={folioId}
          propertyId={propertyId}
          creditRent={modalState.creditRent}
          toggle={toggleCreditRentModal}
          data={rentActData}
        />
      )}
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
      {state.loader && <Loder status={state.loader} />}
      {showDepositModal && (
        <AddDepositReceipt
          showDepositModal={showDepositModal}
          toggleDepositModal={toggleDepositModal}
        />
      )}
      {modalState.disburseModal && (
        <DisbursementModal
          disburseModal={modalState.disburseModal}
          toggle={toggleDisburseModal}
          data={{
            reference: tenantInfoData?.data?.reference,
            folio_code: tenantInfoData?.folio?.folio_code,
            id,
            folioId,
          }}
        />
      )}

      <Container fluid={true}>
        <h4 className="text-primary py-2">Tenant Folio</h4>
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
                          Tenant Folio -{" "}
                          {tenantInfoData?.data?.reference.split("-")[0]}{" "}
                          {tenantInfoData?.folio?.folio_code}
                        </h4>
                      </div>
                      <div className="d-flex justify-content-center">
                        {tenantInfoData?.data?.status != "false" && (
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
                                onClick={() => tenantEditHandler(id, 2)}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem disabled={true}>
                                Transfer Deposit
                              </DropdownItem>
                              <DropdownItem onClick={toggleDisburseModal}>
                                Disburse
                              </DropdownItem>
                              <DropdownItem divider />

                              <DropdownItem onClick={toggleAdjustRent}>
                                Adjust Rent
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  toggleCreditRentModal();
                                  setRentActData("");
                                }}
                              >
                                Credit Rent
                              </DropdownItem>
                              <DropdownItem onClick={toggleDiscountRent}>
                                Discount Rent
                              </DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem disabled={true}>
                                Removed Selected Entries
                              </DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem onClick={toggleArchive}>
                                Archive
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  advanceRentHandler(id, propertyId)
                                }
                              >
                                Advanced Rent Management
                              </DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem disabled={true}>
                                Send Client Access Invite
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        )}

                        {/* <Dropdown
                          isOpen={state.dropDownBtn1}
                          toggle={() =>
                            setState(prev => {
                              return {
                                ...prev,
                                dropDownBtn1: !prev.dropDownBtn1,
                              };
                            })
                          }
                          className="mt-4 mt-sm-0"
                        >
                          <DropdownToggle className="btn btn-info btn-md" caret>
                            <i className="fas fa-file-alt me-1" /> Reports{" "}
                            <i className="mdi mdi-chevron-down"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem>Tenant History</DropdownItem>
                            <DropdownItem>Tenant Activity</DropdownItem>
                            <DropdownItem>Folio Ledger</DropdownItem>
                          </DropdownMenu>
                        </Dropdown> */}
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              {tenantInfoData?.data?.status != "false" && (
                <Card style={{ borderRadius: "14px" }}>
                  <CardBody>
                    <Row>
                      <Col md={12}>
                        <Row className="p-1 d-flex flex-column gap-3">
                          <Col
                            className="d-flex flex-column justify-content-center"
                            style={{
                              border: "1px solid gray",
                              borderWidth: "thin",
                              borderColor: "#DCDCDC",
                              backgroundColor: "#F0FFFF",
                              height: "70px",
                              padding: "10px",
                              borderRadius: "10px",
                              textAlign: "center",
                            }}
                          >
                            <span className="text-muted fw-bold">Paid to</span>
                            <span className="text-muted">
                              {" "}
                              {paidToData ? paidToData : "0.00"}
                            </span>
                          </Col>
                          <Col
                            className="d-flex flex-column justify-content-center"
                            style={{
                              border: "1px solid gray",
                              borderWidth: "thin",
                              borderColor: "#DCDCDC",
                              backgroundColor: "#F0FFFF",
                              padding: "10px",
                              borderRadius: "10px",
                              textAlign: "center",
                            }}
                          >
                            <span className="text-muted fw-bold">
                              Part Paid
                            </span>
                            <span className="text-muted">
                              {tenantInfoData?.folio?.part_paid
                                ? tenantInfoData?.folio?.part_paid
                                : "0.00"}৳
                            </span>
                          </Col>
                          <Col
                            className="d-flex flex-column justify-content-center"
                            style={{
                              border: "1px solid gray",
                              borderWidth: "thin",
                              borderColor: "#DCDCDC",
                              backgroundColor: "#F0FFFF",
                              padding: "10px",
                              borderRadius: "10px",
                              textAlign: "center",
                            }}
                          >
                            <span className="text-muted fw-bold">Deposits</span>
                            <span className="text-muted">
                              {tenantInfoData?.folio?.deposit
                                ? tenantInfoData?.folio?.deposit
                                : "0.00"}৳
                            </span>
                          </Col>
                          <Col
                            className="d-flex flex-column justify-content-center"
                            style={{
                              border: "1px solid gray",
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
                              {tenantInfoData?.folio?.uncleared
                                ? tenantInfoData?.folio?.uncleared
                                : "0.00"}৳
                            </span>
                          </Col>
                          <Col
                            className="d-flex flex-column justify-content-center"
                            style={{
                              border: "1px solid gray",
                              borderWidth: "thin",
                              borderColor: "#DCDCDC",
                              backgroundColor: "#F0FFFF",
                              padding: "10px",
                              borderRadius: "10px",
                              textAlign: "center",
                            }}
                          >
                            <span className="text-muted fw-bold">
                              Bond held
                            </span>
                            <span className="text-muted">
                              {tenantInfoData?.folio?.bond_held
                                ? tenantInfoData?.folio?.bond_held
                                : "0.00"}৳
                            </span>
                          </Col>

                          {/* <Col
                          className="d-flex flex-column justify-content-center"
                          style={{
                            borderTop: "dotted",
                            borderWidth: "thin",
                            borderColor: "#DCDCDC",
                            padding: "10px",
                            borderRadius: "10px",
                            textAlign: "center"
                          }}
                        ></Col> */}
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
              <Card style={{ borderRadius: "15px" }}>
                <CardBody>
                  {tenantInfoData?.data?.status === "false" && (
                    <Alert color="info">
                      <div className="d-flex justify-content-between">
                        <span className="font-size-20">
                          <i className="fas fa-archive"></i> Archived on{" "}
                          {moment(tenantInfoData?.data?.updated_at).format(
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
                    <Col sm={12} md={12} lg={9}>

                      <Nav
                        className="icon-tab nav-justified"
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
                            Current Month
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "2",
                            })}
                            onClick={() => {
                              toggle("2", "Active");
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
                              toggle("3", "Rentals");
                            }}
                          >
                            Pending Invoices
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
                            Paid Invoices
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
                            Rent Actions
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
                            {props.transaction_list_id_data?.data != null ? (
                              <DatatableTables2
                                products={props.transaction_list_id_data || []}
                                columnData={activeData}
                              />
                            ) : null}
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            {props.transaction_list_id_data?.data != null ? (
                              <DatatableTables2
                                products={props.transaction_list_id_data || []}
                                columnData={activeData}
                              />
                            ) : null}
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            {props.invoice_unpaid_list_id_data ? (
                              <DatatableTables2
                                products={
                                  props.invoice_unpaid_list_id_data || []
                                }
                                columnData={invoicePendingdData}
                              // url={url}
                              />
                            ) : null}
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="4">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            {props.invoice_paid_list_id_data ? (
                              <DatatableTables2
                                products={props.invoice_paid_list_id_data || []}
                                columnData={invoicePendingdData}
                              />
                            ) : null}
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="5">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            {props.rent_action_data?.data != null ? (
                              <DatatableTables2
                                products={props.rent_action_data || []}
                                columnData={rentActionData}
                              />
                            ) : null}
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
      {state.transactionInfoModal && (
        <TransactionsInfoModal
          state={state}
          setState={setState}
          toggle={toggleModalTransactions}
          toggleReverse={toggleModalTransactionsReverse}
          toggleEdit={toggleModalTransactionsEdit}
          toggleClearFund={toggleClearFund}
          receipt={state.transactionsDetails}
        />
      )}
      {state.archiveModal && (
        <TenantArchiveModal
          state={state}
          setState={setState}
          toggle={toggleArchive}
          id={id}
        />
      )}
      {state.transactionInfoModalEdit && (
        <TransactionsInfoModalEdit
          state={state}
          setState={setState}
          toggle={toggleModalTransactionsEdit}
        />
      )}
      {state.transactionInfoModalReverse && (
        <TransactionsInfoModalReverse
          state={state}
          setState={setState}
          toggle={toggleModalTransactionsReverse}
          toggleinfo={toggleModalTransactions}
        />
      )}

      {/* <TransactionsInfoModalEdit
        state={state}
        setState={setState}
        toggle={toggleModalTransactionsEdit}
      /> */}
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
      <DeleteModal
        show={deleteState}
        onDeleteClick={handleDeleteProject}
        onCloseClick={() => setDeleteState(false)}
      />
      {toggleState && (
        <TenantAdjustRent
          cid={id}
          conid={contactId}
          propID={propertyId}
          toggleState={toggleState}
          toggleAdjustRent={toggleAdjustRent}
          state={state}
          state2={state2}
        ></TenantAdjustRent>
      )}
      {rentDiscountState && (
        <RentDiscount
          cid={id}
          conid={contactId}
          propID={propertyId}
          rentDiscountState={rentDiscountState}
          toggleDiscountRent={toggleDiscountRent}
          state2={state2}
        ></RentDiscount>
      )}
    </div>
  );
}

const mapStateToProps = gstate => {
  const {
    transaction_list_id_data,
    transaction_list_id_loading,

    archive_tenant_data,
    archive_tenant_loading,

    invoice_unpaid_list_id_data,
    invoice_unpaid_list_id_error,
    invoice_unpaid_list_id_loading,

    invoice_paid_list_id_data,
    invoice_paid_list_id_error,
    invoice_paid_list_id_loading,

    rent_action_data,
    rent_action_error,
    rent_action_loading,
    rent_action_store_loading,

    add_tenant_receipt_loading,

    tenant_deposit_receipt_loading,

    disburse_tenant_loading,
  } = gstate.AccountsTransactions;

  const { property_tenant_info_data, property_tenant_info_loading } =
    gstate.property;
  const { delete_invoice_loading, edit_invoice_loading } =
    gstate.AccountsInvoices;

  return {
    transaction_list_id_data,
    transaction_list_id_loading,

    archive_tenant_data,
    archive_tenant_loading,

    invoice_unpaid_list_id_data,
    invoice_unpaid_list_id_error,
    invoice_unpaid_list_id_loading,

    invoice_paid_list_id_data,
    invoice_paid_list_id_error,
    invoice_paid_list_id_loading,
    property_tenant_info_data,
    property_tenant_info_loading,
    delete_invoice_loading,

    rent_action_data,
    rent_action_error,
    rent_action_loading,

    rent_action_store_loading,

    add_tenant_receipt_loading,
    edit_invoice_loading,

    tenant_deposit_receipt_loading,

    disburse_tenant_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    transactionsListById,
    tenantArchive,
    tenantArchiveFresh,
    invoiceuUnpaidListById,
    invoiceUnpaidListFreshById,
    invoicePaidListById,
    invoicePaidListFreshById,
    getPropertyTenantInfo,
    transactionsInfoListFresh,
    deleteInvoice,
    RentActionList,
    RentActionListFresh,
    tenantInfoFresh,
    deleteInvoiceFresh,
  })(TenantFolio)
);
