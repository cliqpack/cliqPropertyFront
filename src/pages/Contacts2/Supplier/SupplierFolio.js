import React, { useEffect, useState } from "react";
import Breadcrumbs from "components/Common/Breadcrumb";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, withRouter, useHistory, useParams } from "react-router-dom";
import {
    supplierFolioForTransaction, supplierFolioForBill, supplierFolioForInvoice, supplierFolioInfo, transactionsListByIdForSupplierFolio, transactionsListByIdForSupplierFolioFresh, PendingBillsForSupplier, PendingBillsForSupplierFresh, paidBillsForSupplier, paidBillsForSupplierFresh,
    PendingInvoicesForSupplier, PendingInvoicesForSupplierFresh, deleteInvoice,
    deleteInvoiceFresh,
} from 'store/actions'

import classnames from "classnames";
import DatatableTables2 from "pages/Tables/DatatableTables2";

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
import toastr from "toastr";
import moment from "moment";
import TransactionsInfoModal from "pages/Accounts/Transactions/TransactionsInfoModal";
import DisburseModal from "pages/Properties/Owner/DisburseModal";
import BillsInfoModal from "pages/Accounts/Bills/BillsInfoModal";
import ShowInvoiceModal from "pages/Accounts/Invoice/ShowInvoiceModal";
import { billData, invoiceData, transactionsMainData } from "./Data";
import TransactionsInfoModalReverse from "pages/Accounts/Transactions/TransactionsInfoModalReverse";
import TransactionsInfoModalEdit from "pages/Accounts/Transactions/TransactionsInfoModalEdit";
import ClearFundModal from "pages/Accounts/Transactions/clearFundModal";
import BillsEditModal from "pages/Accounts/Bills/BillsEditModal";
import AddInvoiceModal from "pages/Accounts/Invoice/AddInvoiceModal";
import DeleteModal from "components/Common/DeleteModal";
import AddReceipt from "pages/Accounts/Transactions/AddReceipt";
import AddDepositReceipt from "pages/Accounts/Transactions/AddDepositReceipt";

export default function SupplierFolio() {
    const { folio_id } = useParams();
    const { location } = useHistory();

    // console.log(location?.state?.id);

    const dispatch = useDispatch()
    const { supplier_folio_transactions_data, supplier_folio_bill_data, supplier_folio_invoice_data, add_tenant_receipt_loading } = useSelector(state => state.AccountsTransactions)
    const { delete_invoice_loading } = useSelector(state => state.AccountsInvoices)
    const { supplier_folio_info_data, supplier_folio_info_error, supplier_folio_info_loading, transaction_list_id_supplier_folio_data, transaction_list_id_supplier_folio_error, transaction_list_id_supplier_folio_loading, pending_bills_supplier_folio_data,
        pending_bills_supplier_folio_error, pending_bills_supplier_folio_loading, paid_bills_supplier_folio_data,
        paid_bills_supplier_folio_error, paid_bills_supplier_folio_loading, pending_invoices_supplier_folio_data,
        pending_invoices_supplier_folio_error, pending_invoices_supplier_folio_loading } = useSelector(state => state.supplier);

    console.log(supplier_folio_info_data?.data);

    const [state, setState] = useState({
        activeTab: "1",
        dropDownBtn: false,
        dropDownBtn1: false,

        transactionInfoModalReverse: false,
        transactionInfoModalEdit: false,
        clearFundModal: false,
        disburseModal: false,
        reverseModal: false,
        archiveModal: false,
        transactionInfoModal: false,
        transactionInfoModalReverse: false,
        clearFundModal: false,
        loader: false,
    });

    // console.log(state.activeTab);

    const ownerInfoData = '';

    const [data, setData] = useState({});
    // console.log(data);
    const [Id, setId] = useState(null);
    const [modalDataItem, setModalDataItem] = useState({});
    const [showModalInvoice, setShowModalInvoice] = useState(false);

    const toggleModalInvoice = () => setShowModalInvoice(prev => !prev);

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(prev => !prev);
    const [billEditModal, setBillEditModal] = useState(false);
    const startLoader = () => setState({ ...state, loader: true });
    const endLoader = () => setState({ ...state, loader: false });
    const billEditModalToggle = () => {
        setShowModal(false);
        setBillEditModal(true);
    };

    const toggle = (tab) => {
        if (state.activeTab !== tab) {
            setState({
                ...state,
                activeTab: tab,
            });
        }
        if (tab == 1) {
            dispatch(transactionsListByIdForSupplierFolio(
                "this_month",
                folio_id

            ));
        } else if (tab == 2) {
            dispatch(transactionsListByIdForSupplierFolio(
                "all",
                folio_id

            ));
        } else if (tab == 3) {
            dispatch(PendingBillsForSupplier(folio_id))
        } else if (tab == 4) {
            dispatch(paidBillsForSupplier(folio_id))
        } else if (tab == 5) {
            dispatch(PendingInvoicesForSupplier(folio_id))
        }
        setData({})
    };

    const supplierBillApiCall = () => {
        // if (state.activeTab == 3) {
        //     dispatch(PendingBillsForSupplier(folio_id))

        // } else {
        //     dispatch(paidBillsForSupplier(folio_id))

        // }
        setData({})
        toggle(state.activeTab)
    }


    const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);

    const toggleAddInvoiceModal = () => {
        setShowAddInvoiceModal(prev => !prev);
    };
    const [deleteState, setDeleteState] = useState(false);
    const [invoiceId, setInvoiceId] = useState(null);
    const [selectedFolio, setSelectedFolio] = useState({ label: "", value: "" });

    const [showModalAdd, setShowModalAdd] = useState(false);

    const toggleAdd = () => {
        setShowModalAdd(prev => !prev);

        // props.tenantInfoFresh();
    };


    const [showDepositModal, setShowDepositModal] = useState(false);


    const toggleDepositModal = (from = null) => {
        if (from === "Close") {
            props.tenantInfoFresh();
        } else {
            setShowModalAdd(prev => !prev);
        }
        setShowDepositModal(prev => !prev);
    };

    useEffect(() => {
        // dispatch(supplierFolioForTransaction());
        //  dispatch(supplierFolioForBill());
        //   dispatch(supplierFolioForInvoice())
        dispatch(supplierFolioInfo(folio_id))
        dispatch(transactionsListByIdForSupplierFolio(
            "this_month",
            folio_id

        ));
    }, [])


    useEffect(() => {
        if (delete_invoice_loading === "Success") {
            toastr.error("Invoice Deleted");
            dispatch(deleteInvoiceFresh());

            toggle(state.activeTab);
        }


        if (add_tenant_receipt_loading === "Success") {
            toastr.success('Success')
            dispatch(deleteInvoiceFresh())
            toggle(state.activeTab)
        }
    }, [delete_invoice_loading, add_tenant_receipt_loading])

    const toggleModalTransactions = () => {
        setState(prev => ({
            ...prev,
            transactionInfoModal: !prev.transactionInfoModal,
        }));
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
            {cell && `$${cell}`}
        </span>
    );

    const checkingRefCredit = (cell, row) => (
        <span>
            {" "}
            {/* {row?.type == "Tenant Receipt" && `$${cell}`}
          {row?.type == "Folio Receipt" && `$${cell}`} */}
            {cell && `$${cell}`}
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

    const activeData = [
        {
            dataField: "id",
            text: "Audit",
            sort: true,
            sortFunc: (a, b, order, dataField, rowA, rowB) => {
                return b - a;
            },
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
                ${cell}
            </span>
        );
        return amount;
    };


    const folioBalanceFormatter = (cell, row) => (
        <span>${row?.tenant_folio?.deposit ? row?.tenant_folio?.deposit : 0}</span>
    );
    const paidFormatter = (cell, row) => <span>${row.paid ? row.paid : 0}</span>;


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

    const invAmountFormatter = (cell, row) => {
        let amount = <span>${cell}</span>;
        return amount;
    };


    const invoiceDetails = (e, row) => {
        setModalDataItem(row);
        setId(row.id);
        toggleModalInvoice();
    };

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

    const supplierEditHandler = (id, tabId) => {
        // history.push({ pathname: `/supplier/edit/${id}/${fId}/${tabId}`, state: { proId: propertyId } });
        // history.push({ pathname: `/supplier/edit/${id}/${2}` });
        history.push('/supplier/edit/' + id + '/' + 2)
    };

    const toggleDisburse = () => {
        setState(prev => ({
            ...prev,
            disburseModal: !prev.disburseModal,
        }));
    };

    const toggleArchive = () => {
        setState(prev => ({
            ...prev,
            archiveModal: !prev.archiveModal,
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

    let moneyIn =
        (supplier_folio_info_data?.data?.money_in ? supplier_folio_info_data?.data?.money_in : 0) +
        (supplier_folio_info_data?.data?.opening_balance
            ? +supplier_folio_info_data?.data?.opening_balance
            : 0);
    let moneyOut =
        (supplier_folio_info_data?.data?.money_out ? supplier_folio_info_data?.data?.money_out : 0) +
        // (ownerInfoData?.folio?.uncleared ? ownerInfoData?.folio?.uncleared : 0) +
        (supplier_folio_info_data?.data?.total_bills_pending_sum_amount

            ? +supplier_folio_info_data?.data?.total_bills_pending_sum_amount

            : 0);
    let totalBalance = moneyIn - moneyOut;


    const handleDeleteProject = () => {
        dispatch(deleteInvoice(Id));
        setDeleteState(false);
    };

    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    <h4 className="text-primary py-2">Supplier Folio</h4>
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
                                                        {supplier_folio_info_data?.data?.supplier_contact?.reference} Supplier Folio{" "}
                                                        {supplier_folio_info_data?.data?.folio_code
                                                            ? `${supplier_folio_info_data?.data?.folio_code}`
                                                            : ""}
                                                    </h4>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    {/* {props.property_owner_info_data?.data?.data?.status ==
                                                        "1" && ( */}
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
                                                            // onClick={() =>
                                                            //     supplierEditHandler(location.state.id, 2)
                                                            // }
                                                            >
                                                                <Link to={`/supplier/edit/${location?.state?.id}/2`}>
                                                                    Edit
                                                                </Link>

                                                            </DropdownItem>
                                                            <DropdownItem
                                                                onClick={toggleDisburse}
                                                            >
                                                                Disburse
                                                            </DropdownItem>

                                                            {/* <DropdownItem
                                                                onClick={toggleArchive}
                                                            >
                                                                Archive
                                                            </DropdownItem> */}
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                    {/* )} */}
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>

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
                                                            ${supplier_folio_info_data?.data?.opening || "0.00"}
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
                                                            ${supplier_folio_info_data?.data?.money_in || "0.00"}
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
                                                            {console.log(supplier_folio_info_data?.data?.money_out, '----')}
                                                            ${supplier_folio_info_data?.data?.money_out || "0.00"}
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
                                                            ${supplier_folio_info_data?.data?.uncleared || "0.00"}
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
                                                            Payments pending
                                                        </span>
                                                        <span className="text-muted">
                                                            $
                                                            {supplier_folio_info_data?.data
                                                                ?.total_bills_amount_sum_amount
                                                                ? supplier_folio_info_data?.data
                                                                    ?.total_bills_amount_sum_amount
                                                                : "0.00"}
                                                        </span>
                                                    </Col>
                                                    {/* <Col
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
                                                            $
                                                            {supplier_folio_info_data?.data?.pending_invoice_bill
                                                                ? supplier_folio_info_data?.data?.pending_invoice_bill
                                                                : "0.00"}
                                                        </span>
                                                    </Col> */}
                                                    {/* <Col
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
                                                            $
                                                            {supplier_folio_info_data?.data?.withhold_amount
                                                                ? supplier_folio_info_data?.data?.withhold_amount
                                                                : "0.00"}
                                                        </span>
                                                    </Col> */}
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
                                                            ${supplier_folio_info_data?.data?.balance > 0 ? supplier_folio_info_data?.data?.balance : "0.00"}
                                                        </span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                {/* )} */}
                            </div>
                        </Col>

                        <Col md={10} style={{ padding: "0px" }}>
                            <div>
                                <Card style={{ borderRadius: "14px" }}>
                                    <CardBody>
                                        {/* {ownerInfoData?.data?.status == "0" && (
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
                                        )} */}
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

                                                            {transaction_list_id_supplier_folio_data?.data !=
                                                                null ? (
                                                                <DatatableTables2
                                                                    products={
                                                                        transaction_list_id_supplier_folio_data
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

                                                            {transaction_list_id_supplier_folio_data?.data !=
                                                                null ? (
                                                                <DatatableTables2
                                                                    products={
                                                                        transaction_list_id_supplier_folio_data
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

                                                            {pending_bills_supplier_folio_data?.data ? (
                                                                <DatatableTables2
                                                                    products={
                                                                        pending_bills_supplier_folio_data
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
                                                            {/* {supplier_folio_bill_data ? (
                                                                <DatatableTables2
                                                                    products={
                                                                        supplier_folio_bill_data || []
                                                                    }
                                                                    columnData={paidBillData}
                                                                />
                                                            ) : (
                                                                []
                                                            )} */}
                                                            {paid_bills_supplier_folio_data?.data ? (
                                                                <DatatableTables2
                                                                    products={
                                                                        paid_bills_supplier_folio_data
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
                                                            {/* {supplier_folio_invoice_data ? (
                                                                <DatatableTables2
                                                                    products={
                                                                        supplier_folio_invoice_data || []
                                                                    }
                                                                    columnData={pendingInvoiceData}
                                                                />
                                                            ) : (
                                                                []
                                                            )} */}
                                                            {pending_invoices_supplier_folio_data?.data ? (
                                                                <DatatableTables2
                                                                    products={
                                                                        pending_invoices_supplier_folio_data
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

            </div>
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
            {/* 
            {state.clearFundModal && (
                <ClearFundModal
                    state={state}
                    setState={setState}
                    toggle={toggleClearFund}
                />
            )} */}

            {billEditModal && (
                <BillsEditModal
                    data={data}
                    showModal={billEditModal}
                    setShowModal={setBillEditModal}
                    toggle={billEditModalToggle}
                    toogleTab={toggle}
                    startLoader={startLoader}
                    endLoader={endLoader}
                    text={'supplier'}
                    supplierBillApiCall={supplierBillApiCall}
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
                    propertyId={data.property_id
                    }
                    ownerId={data.owner_folio_id
                    }
                    supplierFolioId={folio_id}
                    startLoader={startLoader}
                    text={'supplier'}
                    supplierBillApiCall={supplierBillApiCall}
                />
            )}

            {state.disburseModal && (
                <DisburseModal toggle={toggleDisburse} state={state} supplierId={folio_id} supplierInfoApi={() => dispatch(supplierFolioInfo(folio_id))} tabcall={() => toggle('1')} />
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
                    text={'supplier'}
                    supplierBillApiCall={supplierBillApiCall}
                />
            )}

            {showAddInvoiceModal && (
                <AddInvoiceModal
                    showModal={showAddInvoiceModal}
                    toggle={toggleAddInvoiceModal}
                    data={modalDataItem}
                    startLoader={startLoader}
                    endLoader={endLoader}
                    text={'supplier'}
                    supplierBillApiCall={supplierBillApiCall}
                />
            )}

            {deleteState && (
                <DeleteModal
                    show={deleteState}
                    onDeleteClick={handleDeleteProject}
                    onCloseClick={() => setDeleteState(false)}
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
            {showDepositModal && (
                <AddDepositReceipt
                    showDepositModal={showDepositModal}
                    toggleDepositModal={toggleDepositModal}
                />
            )}
        </>
    )
}
