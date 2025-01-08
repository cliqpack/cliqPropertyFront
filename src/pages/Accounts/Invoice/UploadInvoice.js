import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { uploadedInvoiceBillList, addBillsWithTenantInvoice, addBillsWithTenantInvoiceFresh, editBillsWithTenantInvoiceFresh, deleteInvoices, deleteInvoicesFresh, invoiceDueList, futureInvoiceBillList } from "store/actions";
import classnames from "classnames";
import DatatableTables2 from "pages/Tables/DatatableTables2";
import DeleteModal from "components/Common/DeleteModal";
import moment from "moment";

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

import toastr from "toastr";

import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import Loder from "components/Loder/Loder";

document.title = "Upload Invoices";

function UploadInvoice(props) {
    const date = moment().format("yyyy-MM-DD");
    const [state, setState] = useState({ invoiceDate: date, uploaded: 'Uploaded', loader: false });
    const inputRef = useRef(null);
    const history = useHistory();
    const [Id, setId] = useState(null);
    const [invoiceIds, setInvoiceIds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalDataItem, setModalDataItem] = useState({});
    const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
    const [showEditInvoiceModal, setShowEditInvoiceModal] = useState(false);

    const [deleteState, setDeleteState] = useState(false);

    const toggleEditInvoiceModal = () => setShowEditInvoiceModal(prev => !prev)

    //Loader
    const startLoader = () => setState({ ...state, loader: true });
    const endLoader = () => setState({ ...state, loader: false });

    useEffect(() => {
        if (props.edit_invoice_loading === 'Success') {
            toastr.success("Invoice added");
            props.editBillsWithTenantInvoiceFresh();
            props.uploadedInvoiceBillList();
            props.invoiceDueList();
            props.futureInvoiceBillList();
            endLoader();
        }
        if (props.uploaded_invoice_list_data_loading === false) {
            props.uploadedInvoiceBillList();
        }
        if (props.add_bills_tenant_invoice_loading === 'Success') {
            props.addBillsWithTenantInvoiceFresh();
            props.uploadedInvoiceBillList();
            endLoader();
        }
        if (props.delete_invoices_loading === 'Success') {
            toastr.warning("Invoice Deleted");
            props.uploadedInvoiceBillList();
            props.deleteInvoicesFresh();
            endLoader();
        }
    }, [props.uploaded_invoice_list_data_loading, props.add_bills_tenant_invoice_loading, props.edit_invoice_loading, props.delete_invoices_loading]);

    const fileRef = (cell, row) => {
        return <a href={process.env.REACT_APP_IMAGE + row.file} target="_blank" rel="noreferrer noopener">{row.file?.slice(0, 150)}</a>
    }

    const formatRef = (cell, row) => {
        return <button type="button" className="btn btn-sm btn-secondary" onClick={() => billDetails(row)}>
            Process{" "}
            <i className="fas fa-arrow-right"></i>
        </button>
    }

    const columnData = [
        {
            dataField: "invoice_billing_date",
            text: "Date",
            sort: true,
        },
        {
            dataField: "file",
            text: "File Name",
            sort: true,
            formatter: fileRef,
        },
        {
            dataField: "",
            text: "",
            sort: true,
            formatter: formatRef,
        },
    ];

    let node;
    const defaultSorted = [
        {
            dataField: "id",
            order: "asc",
        },
    ];

    const pageOptions = {
        sizePerPage: 10,
        totalSize: props.uploaded_invoice_list_data?.data?.length, // replace later with size(customers),
        custom: true,
    };

    // Select All Button operation
    const selectRow = {
        mode: "checkbox",
        onSelect: (row, isSelect, rowIndex, e) => {
            let value = [...invoiceIds];
            if (isSelect) {
                value.push(row);
                setInvoiceIds(value);
            } else {
                let index = value.indexOf(row);
                value.splice(index, 1);
                setInvoiceIds(value);
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                setInvoiceIds(rows);
            } else setInvoiceIds([]);
        }
    };

    const { SearchBar } = Search;

    const handleDeleteProject = () => {
        props.deleteInvoices(invoiceIds);
        setDeleteState(false);
        startLoader();
        setInvoiceIds([]);
    };

    const handleSubmitInvoice = (e) => {
        props.addBillsWithTenantInvoice(state, e.target.files[0]);
        startLoader();
    }

    const billDetails = (row) => {
        setModalDataItem(row);
        setShowEditInvoiceModal(true);
    }

    return (
        <div className="page-content">
            <DeleteModal
                show={deleteState}
                onDeleteClick={handleDeleteProject}
                onCloseClick={() => setDeleteState(false)}
            />
            {showEditInvoiceModal &&
                <AddInvoiceModal showModal={showEditInvoiceModal} toggle={toggleEditInvoiceModal} data={modalDataItem} startLoader={startLoader} endLoader={endLoader} />}
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
                                                    <div className="d-flex align-items-center p-2" style={{ borderBottom: '1px solid #B2BEB5', borderRight: '1px solid #B2BEB5' }}>
                                                        <i className="fas fa-align-justify font-size-20" />
                                                        <div className="d-flex flex-column justify-content-center mx-2 py-1 px-3">
                                                            <span style={{ fontSize: '22px' }}>{props.uploaded_invoice_list_data?.data?.length}</span>
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
                                            <h4 className="ms-2 text-info">Upload Invoices</h4>
                                            <Row style={{ height: '88px' }}>
                                                <Col md={9} className='d-flex align-items-end'>

                                                    <div className="button-items">
                                                        {/* <AddInvoiceModal showModal={showAddInvoiceModal} toggle={toggleAddInvoiceModal} />
                                                        {showEditInvoiceModal &&
                                                            <AddInvoiceModal showModal={showEditInvoiceModal} toggle={toggleEditInvoiceModal} data={modalDataItem} />} */}

                                                        <button type="button" className="btn btn-info me-1" onClick={() => inputRef.current.click()}>
                                                            <i className="fas fa-upload"></i>{" "}
                                                            Upload Invoice
                                                        </button>
                                                        <input
                                                            ref={inputRef}
                                                            type="file"
                                                            onChange={handleSubmitInvoice}
                                                            style={{ display: "none" }}
                                                        />
                                                        {/* <button type="button" className="btn btn-info me-1">
                                                            <i className="fas fa-trash-alt"></i>{" "}Delete
                                                        </button> */}
                                                        {/* <button type="button" className="btn btn-secondary">
                                                            Process{" "}
                                                            <i className="fas fa-arrow-right"></i>
                                                        </button> */}
                                                        <button type="button" disabled={invoiceIds.length > 0 ? false : true} className="btn btn-secondary me-1" onClick={() => { setDeleteState(true) }}>
                                                            <i className="fas fa-trash-alt"></i>{" "}Delete
                                                        </button>
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
                                    <Row>
                                        <Col sm="12">
                                            <CardText className="mb-0">
                                                {/* {props.uploaded_invoice_list_data ? (
                                                    <DatatableTables2
                                                        products={props.uploaded_invoice_list_data}
                                                        columnData={columnData}
                                                    // url={url}
                                                    />
                                                ) : null} */}


                                                <PaginationProvider
                                                    pagination={paginationFactory(pageOptions)}
                                                    keyField="id"
                                                    columns={columnData}
                                                    data={props.uploaded_invoice_list_data ? props.uploaded_invoice_list_data.data : []}
                                                >
                                                    {({ paginationProps, paginationTableProps }) => (
                                                        <ToolkitProvider
                                                            keyField="id"
                                                            columns={columnData}
                                                            data={props.uploaded_invoice_list_data ? props.uploaded_invoice_list_data.data : []}
                                                            search
                                                        >
                                                            {toolkitProps => (
                                                                <React.Fragment>
                                                                    <Row>
                                                                        <Col xl="12">
                                                                            <div className="table-responsive">
                                                                                <div className="d-flex justify-content-end">
                                                                                    <div className="search-box">
                                                                                        <SearchBar {...toolkitProps.searchProps} />
                                                                                    </div>
                                                                                </div>
                                                                                <BootstrapTable
                                                                                    ref={n => node = n}
                                                                                    keyField={"id"}
                                                                                    responsive
                                                                                    bordered={false}
                                                                                    striped={false}
                                                                                    defaultSorted={defaultSorted}
                                                                                    selectRow={selectRow}
                                                                                    tabIndexCell
                                                                                    classes={
                                                                                        "table align-middle table-nowrap"
                                                                                    }
                                                                                    headerWrapperClasses={"thead-light"}
                                                                                    {...toolkitProps.baseProps}
                                                                                    {...paginationTableProps}
                                                                                />
                                                                            </div>
                                                                        </Col>
                                                                    </Row>

                                                                    <Row className="align-items-md-center mt-30">
                                                                        <Col className="inner-custom-pagination d-flex">
                                                                            <div className="d-inline">
                                                                                <SizePerPageDropdownStandalone
                                                                                    {...paginationProps}
                                                                                />
                                                                            </div>
                                                                            <div className="text-md-right ms-auto">
                                                                                <PaginationListStandalone
                                                                                    {...paginationProps}
                                                                                />
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </React.Fragment>
                                                            )}
                                                        </ToolkitProvider>
                                                    )}
                                                </PaginationProvider>
                                            </CardText>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                        </div>
                    </Col>
                </Row>
            </Container>
            {/* <ShowInvoiceModal showModal={showModal} toggleModal={toggleModal} data={modalDataItem} toggleEditInvoiceModal={toggleEditInvoiceModal} deleteInvoiceModal={setDeleteState} setInvoiceId={setInvoiceId} /> */}
            <Loder status={state.loader} />

        </div >
    );
}

const mapStateToProps = gstate => {
    const {
        uploaded_invoice_list_data,
        uploaded_invoice_list_data_loading,

        edit_invoice_loading,

        delete_invoices_loading,
    } = gstate.AccountsInvoices;

    const {
        add_bills_tenant_invoice_loading,
    } = gstate.Bills;
    return {
        uploaded_invoice_list_data,
        uploaded_invoice_list_data_loading,

        add_bills_tenant_invoice_loading,

        edit_invoice_loading,

        delete_invoices_loading,
    };
};

export default withRouter(connect(mapStateToProps, {
    uploadedInvoiceBillList, addBillsWithTenantInvoice, addBillsWithTenantInvoiceFresh, editBillsWithTenantInvoiceFresh, deleteInvoices, deleteInvoicesFresh, invoiceDueList, futureInvoiceBillList
})(UploadInvoice));