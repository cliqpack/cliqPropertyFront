import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { invoiceDueList, futureInvoiceBillList, paidInvoiceBillList, deleteInvoice, deleteInvoiceFresh, tenantInfoFresh } from "store/actions";
import classnames from "classnames";
import DatatableTables2 from "pages/Tables/DatatableTables2";
import DeleteModal from "components/Common/DeleteModal";
import AddDepositReceipt from "../Transactions/AddDepositReceipt";
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
} from "reactstrap";
import AddInvoiceModal from "./AddInvoiceModal";
import ShowInvoiceModal from './ShowInvoiceModal';
import toastr from "toastr";
import Loder from "components/Loder/Loder";
import AddReceipt from "../Transactions/AddReceipt";
import Breadcrumbs from "components/Common/Breadcrumb";

document.title = "Invoices";

function InvoiceList(props) {
    const [state, setState] = useState({
        activeTab: "1", loader: false
    });
    const [showDepositModal, setShowDepositModal] = useState(false);
    const history = useHistory();
    const [Id, setId] = useState(null);
    const [seen, setSeen] = useState(false);
    const [invoiceId, setInvoiceId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalInvoice, setShowModalInvoice] = useState(false);
    const [modalDataItem, setModalDataItem] = useState({});
    const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
    const [showEditInvoiceModal, setShowEditInvoiceModal] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [selectedFolio, setSelectedFolio] = useState({ label: '', value: '' });
console.log(selectedFolio);
    const [deleteState, setDeleteState] = useState(false);

    const toggleModal = () => setShowModalInvoice(prev => !prev)
    const toggleAddInvoiceModal = () => setShowAddInvoiceModal(prev => !prev)
    const toggleEditInvoiceModal = () => setShowEditInvoiceModal(prev => !prev)

    const toggle = (tab, type) => {
        if (state.activeTab !== tab) {
            setState({
                ...state,
                activeTab: tab,
            });
        }
        if (type === 'Due') {
            props.invoiceDueList();
        } else if (type === 'Upcoming') {
            props.futureInvoiceBillList();
        } else if (type === 'Paid') {
            props.paidInvoiceBillList();
        }
    };

    //Loader
    const startLoader = () => setState({ ...state, loader: true });
    const endLoader = () => setState({ ...state, loader: false });

    useEffect(() => {
        if (!seen) {
            props.invoiceDueList();
            setSeen(true);
        }

        if (props.delete_invoice_loading === 'Success') {
            toastr.warning("Invoice Deleted");
            props.invoiceDueList();
            props.futureInvoiceBillList();
            props.paidInvoiceBillList();
            props.deleteInvoiceFresh();
        }
        if (props.add_tenant_receipt_loading === 'Success') {
            if (state.activeTab === '1') {
                props.invoiceDueList();
            } else if (state.activeTab === '2') {
                props.futureInvoiceBillList();
            }
        }
        if (props.tenant_deposit_receipt_loading === 'Success') {
            if (state.activeTab === '1') {
                props.invoiceDueList();
            } else if (state.activeTab === '2') {
                props.futureInvoiceBillList();
            }
        }
    }, [props.delete_invoice_loading, props.add_tenant_receipt_loading, props.tenant_deposit_receipt_loading]);

    const idRef = (cell, row) => {
        return <span>000{row.id}</span>
    }
    const fileRef = (cell, row) => {
        return <a href={process.env.REACT_APP_IMAGE + row.file} target="_blank" rel="noreferrer noopener">{row.file?.slice(0, 15)}</a>
    }
    const detailsRef = (cell, row) => {
        return <span className="text-primary">{row.details?.slice(0, 30)}</span>
    }

    const billDetails = (e, row) => {
        setModalDataItem(row);
        setId(row.id);
        toggleModal();
    }

    const amountFormatter = (cell, row) => <span>{row.amount ? row.amount : 0}৳</span>
    const paidFormatter = (cell, row) => <span>{row.paid ? row.paid : 0}৳</span>
    const folioBalanceFormatter = (cell, row) => <span>{row?.tenant_folio?.deposit ? row?.tenant_folio?.deposit : 0}৳</span>
    const docPathFormatter = (cell, row) => {
        return <a href={process.env.REACT_APP_DOCUMENT + row.doc_path} target="_blank"
            rel="noreferrer noopener"><i className="fab fa-dochub"></i></a>
    }
    const columnData = [
        {
            dataField: "id",
            text: "Invoice #",
            formatter: idRef,
            sort: true,
            // sortFunc: (a, b, order, dataField, rowA, rowB) => {
            //     return b - a;
            // },
        },
        {
            dataField: "tenant.reference",
            text: "Tenant",
            // formatter: ref,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "property.reference",
            text: "Property",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "",
            text: "Folio Balance",
            sort: true,
            formatter: folioBalanceFormatter,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "",
            text: "",
            sort: true,
            formatter: docPathFormatter,
        },
        {
            dataField: "invoice_billing_date",
            text: "Due",
            // formatter: owner,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "chart_of_account.account_name",
            text: "Account",
            // formatter: owner,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "details",
            text: "Detail",
            formatter: detailsRef,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
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
                }
            }
        },
        {
            dataField: "paid",
            text: "Paid",
            formatter: paidFormatter,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "",
            text: "Sent",
            // formatter: owner,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
    ];

    const taxRef = (cell, row) => {
        return <span>{row.include_tax === 1 ? <i className="fas fa-check"></i> : ''}</span>
    };

    const columnFutureData = [
        {
            dataField: "id",
            text: "Invoice #",
            formatter: idRef,
            sort: true,
            // sortFunc: (a, b, order, dataField, rowA, rowB) => {
            //     return b - a;
            // },
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "tenant.reference",
            text: "Tenant",
            // formatter: ref,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "property.reference",
            text: "Property",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "",
            text: "Folio Balance",
            sort: true,
            formatter: folioBalanceFormatter,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "",
            text: "",
            sort: true,
            formatter: docPathFormatter,
        },
        {
            dataField: "invoice_billing_date",
            text: "Due",
            // formatter: owner,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "chart_of_account.account_name",
            text: "Account",
            // formatter: owner,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "details",
            text: "Detail",
            formatter: detailsRef,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "file",
            text: "Attachment",
            formatter: fileRef,
            sort: true,
        },
        {
            dataField: "",
            text: "Tax",
            formatter: taxRef,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "amount",
            text: "Amount",
            formatter: amountFormatter,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "paid",
            text: "Paid",
            formatter: paidFormatter,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "",
            text: "Sent",
            // formatter: owner,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
    ];

    const columnPaidData = [
        {
            dataField: "id",
            text: "Invoice #",
            formatter: idRef,
            sort: true,
            // sortFunc: (a, b, order, dataField, rowA, rowB) => {
            //     return b - a;
            // },
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "tenant.reference",
            text: "Tenant",
            // formatter: ref,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "property.reference",
            text: "Property",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        // {
        //     dataField: "",
        //     text: "",
        //     sort: true,
        //     formatter: docPathFormatter,
        // },
        {
            dataField: "",
            text: "Folio Balance",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "invoice_billing_date",
            text: "Due",
            // formatter: owner,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "chart_of_account.account_name",
            text: "Account",
            // formatter: owner,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "details",
            text: "Detail",
            formatter: detailsRef,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "file",
            text: "Attachment",
            formatter: fileRef,
            sort: true,
        },
        {
            dataField: "",
            text: "Tax",
            formatter: taxRef,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "amount",
            text: "Amount",
            formatter: amountFormatter,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "paid",
            text: "Paid",
            formatter: paidFormatter,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
        {
            dataField: "",
            text: "Written",
            // formatter: owner,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    billDetails(e, row);
                }
            }
        },
    ];

    const handleDeleteProject = () => {
        props.deleteInvoice(invoiceId);
        setDeleteState(false);
    };

    const pushToUploadInvoice = () => {
        history.push('/upload-invoices');
    }

    const toggleAdd = () => {

        setShowModalAdd(prev => !prev)

        props.tenantInfoFresh();
    };

    const toggleDepositModal = (from = null) => {
        if (from === 'Close') {
            props.tenantInfoFresh();
        } else {
            setShowModalAdd(prev => !prev)
        }
        setShowDepositModal(prev => !prev);
    };

    return (
        <div className="page-content">
            <Breadcrumbs title="Invoices" breadcrumbItem="Accounts" />

            <DeleteModal
                show={deleteState}
                onDeleteClick={handleDeleteProject}
                onCloseClick={() => setDeleteState(false)}
            />
            {
                showModalAdd ? <AddReceipt toggle={toggleAdd} toggleDepositModal={toggleDepositModal} showModal={showModalAdd} setShowModal={setShowModalAdd} selectedFolio={selectedFolio.value} label={selectedFolio.label} value={selectedFolio.value} /> : null
            }
            <Container fluid={true}>
                <Row>
                    <Col lg={12}>
                        <div>
                            <Row>
                                <Col md={4}>
                                    <Card>
                                        <CardBody>
                                            <h4 className="ms-2 text-info">Overview</h4>
                                            <Row>
                                                <Col className='d-flex p-1'>
                                                    <div className="d-flex align-items-center p-2" style={{ borderBottom: '1px solid #B2BEB5', borderRight: '1px solid #B2BEB5', cursor: 'pointer' }} onClick={pushToUploadInvoice}>
                                                        <i className="fas fa-align-justify font-size-20" />
                                                        <div className="d-flex flex-column justify-content-center mx-2 py-1 px-3">
                                                            <span style={{ fontSize: '22px' }}>{props.invoice_list_data?.uploaded || 0}</span>
                                                            <span>Invoices</span>
                                                        </div>
                                                        <i className="fas fa-arrow-right font-size-18" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col md={8}>
                                    <Card>
                                        <CardBody>
                                            <h4 className="ms-2 text-info">Invoices</h4>
                                            <Row style={{ height: '88px' }}>
                                                <Col md={9} className='d-flex align-items-end'>

                                                    <div className="button-items">
                                                        {showAddInvoiceModal && <AddInvoiceModal showModal={showAddInvoiceModal} toggle={toggleAddInvoiceModal} startLoader={startLoader} endLoader={endLoader} />}
                                                        {showEditInvoiceModal &&
                                                            <AddInvoiceModal showModal={showEditInvoiceModal} toggle={toggleEditInvoiceModal} data={modalDataItem} startLoader={startLoader} endLoader={endLoader} />}

                                                        <button type="button" className="btn btn-info me-1" onClick={toggleAddInvoiceModal}>
                                                            Add Invoice
                                                        </button>

                                                        <button type="button" className="btn btn-info me-1" onClick={pushToUploadInvoice}>
                                                            Upload Invoice
                                                        </button>

                                                        {/* <button type="button" disabled={true} className="btn btn-secondary">
                                                            Message
                                                            <i className="fas fas fa-chevron-down font-size-12 align-middle ms-2"></i>
                                                        </button> */}
                                                    </div>
                                                </Col>
                                                <Col md={3}>
                                                    <div>

                                                    </div>
                                                </Col>
                                            </Row>

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Card>
                                <CardBody>
                                    <Nav className="icon-tab nav-justified">
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: state.activeTab === "1",
                                                })}
                                                onClick={() => {
                                                    toggle("1", 'Due');
                                                }}
                                            >
                                                Due
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: state.activeTab === "2",
                                                })}
                                                onClick={() => {
                                                    toggle("2", 'Upcoming');
                                                }}
                                            >
                                                Upcoming
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: state.activeTab === "3",
                                                })}
                                                onClick={() => {
                                                    toggle("3", 'Paid');
                                                }}
                                            >
                                                Paid
                                            </NavLink>
                                        </NavItem>
                                    </Nav>

                                    <TabContent
                                        activeTab={state.activeTab}
                                        className="p-3 text-muted"
                                    >
                                        <TabPane tabId="1">
                                            <Row>
                                                <Col sm="12">
                                                    <CardText className="mb-0">
                                                        {props.invoice_list_data ? (
                                                            <DatatableTables2
                                                                products={props.invoice_list_data}
                                                                columnData={columnData}
                                                            // url={url}
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
                                                        {props.future_invoice_list_data ? (
                                                            <DatatableTables2
                                                                products={props.future_invoice_list_data}
                                                                columnData={columnFutureData}
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
                                                        {props.paid_invoice_list_data ? (
                                                            <DatatableTables2
                                                                products={props.paid_invoice_list_data}
                                                                columnData={columnPaidData}
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
            { showModalInvoice && <ShowInvoiceModal toggleAdd={toggleAdd} showModal={showModalInvoice} setSelectedFolio={setSelectedFolio} toggleModal={toggleModal} data={modalDataItem} toggleEditInvoiceModal={toggleEditInvoiceModal} deleteInvoiceModal={setDeleteState} setInvoiceId={setInvoiceId} startLoader={startLoader} endLoader={endLoader} /> }
            { state.loader && <Loder status={state.loader} /> }
            {
                showDepositModal &&
                <AddDepositReceipt
                    showDepositModal={showDepositModal}
                    toggleDepositModal={toggleDepositModal}
                />
            }
        </div >
    );
}

const mapStateToProps = gstate => {
    const {
        invoice_list_data,
        invoice_list_data_error,
        invoice_list_data_loading,

        future_invoice_list_data,
        future_invoice_list_data_error,
        future_invoice_list_data_loading,

        paid_invoice_list_data,
        paid_invoice_list_data_error,
        paid_invoice_list_data_loading,

        delete_invoice_loading,
    } = gstate.AccountsInvoices;
    const {
        add_tenant_receipt_loading,
        tenant_deposit_receipt_loading,
    } = gstate.AccountsTransactions;
    return {
        invoice_list_data,
        invoice_list_data_error,
        invoice_list_data_loading,

        future_invoice_list_data,
        future_invoice_list_data_error,
        future_invoice_list_data_loading,

        paid_invoice_list_data,
        paid_invoice_list_data_error,
        paid_invoice_list_data_loading,

        delete_invoice_loading,
        add_tenant_receipt_loading,

        tenant_deposit_receipt_loading,
    };
};

export default withRouter(connect(mapStateToProps, {
    invoiceDueList, futureInvoiceBillList, paidInvoiceBillList, deleteInvoice, deleteInvoiceFresh, tenantInfoFresh
})(InvoiceList));