import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteBill, deleteBillFresh, deleteBillAction, deleteBillActionFresh, billApprovalList, billApprovalListFresh, approveMultipleBill, approveMultipleBillFresh } from "store/actions";

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
import BillsInfoModal from "./BillsInfoModal";

import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    CardText,
} from "reactstrap";
import DeleteUploadBillsModal from "./DeleteUploadBillsModal";
import Breadcrumbs from "components/Common/Breadcrumb";
import Loder from "components/Loder/Loder";
document.title = "Approval Bill List";

function UploadBillsList(props) {
    const [loader, setLoader] = useState(false);
    const [state, setState] = useState({
        activeTab: "1", deleteModal: false, selected: [],
    });
    const [Id, setId] = useState(null);
    const [modalData, setModalData] = useState({});
    const [seen, setSeen] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(prev => !prev);
    const [data, setData] = useState({});
    const [actionArray, setActionArray] = useState([]);

    const startLoader = () => setLoader(true);
    const endLoader = () => setLoader(false);
    const toggleDeleteModal = () => {
        setState(prev => ({ ...prev, deleteModal: !prev.deleteModal }))
    }


    let node;
    const defaultSorted = [
        {
            dataField: "id",
            order: "asc",
        },
    ];

    const { SearchBar } = Search;
    const pageOptions = {
        sizePerPage: 10,
        totalSize: props.upload_bills_list_data?.data?.length, // replace later with size(customers),
        custom: true,
    };

    const statusRef = (cell, row) => {

        if (cell === 1) {
            return <span className=""><i className="fas fa-check" /></span>;
        } else {
            return <span className=""></span>;
        }
    };
    const handleSelect = (isSelect, rows, e) => {
        if (rows) {
            setData(isSelect);
            setActionArray(prevArray => [...prevArray, isSelect]);
            setState({ ...state, selected: [...state.selected, isSelect.id] })
        } else {
            setData({})
            setActionArray((cur) => cur.filter((data) => data.id !== isSelect.id))
            setState({ ...state, selected: state.selected.filter(data => data !== isSelect.id) })
        }
    }

    const handleSelectAll = (isSelect, rows, e) => {
        if (isSelect) {
            setActionArray(rows);
            setState({ ...state, selected: rows.map(item => item.id) })
        } else {
            setActionArray([])
            setState({ ...state, selected: [] })
        }
    }

    // Select  Button operation
    const selectRow = {
        mode: 'checkbox',
        onSelect: handleSelect,
        onSelectAll: handleSelectAll,
        selected: [...state.selected]

    };

    const fileRef = (cell, row) => (
        <a
            href={process.env.REACT_APP_IMAGE + row.file}
            target="_blank"
            rel="noreferrer noopener"
        >
            {row.file?.slice(0, 150)}
        </a>
    );
    const supplierRef = (cell, row) => (
        <span className="fw-bold">{cell?.slice(0, 12).concat("...")}</span>
    );
    const detailRef = (cell, row) => <span className="">{cell}</span>;
    const amountRef = (cell, row) => <span className="">{cell}৳</span>;
    const billDetails = (e, column, columnIndex, row, rowIndex) => {
        setId(row.id);
        setModalData(row);
        toggleModal();
    };

    const activeData = [
        // {
        //     dataField: "",
        //     text: "",
        //     sort: true
        // },
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
            formatter: supplierRef,
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
        },
        {
            dataField: "",
            text: "P",
            sort: true,
        },
        {
            dataField: "maintenance.due_by",
            text: "Due",
            sort: true,
        },
        {
            dataField: "bill.account_name",
            text: "Detail",
            formatter: detailRef,
            sort: true,
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
        },
        {
            dataField: "amount",
            text: "Amount",
            formatter: amountRef,
            sort: true,
        },
    ];

    const handleDelete = () => {
        props.deleteBillAction(node.selectionContext.selected);
        setActionArray([]);
        setState({ ...state, selected: [] });
    }

    useEffect(() => {
        props.billApprovalList()
    }, [])
    useEffect(() => {
        if (props.delete_bill_action_loading === 'Success') {
            toastr.error('Deleted')
            props.deleteBillActionFresh()
            props.billApprovalList()
            endLoader()
        }
    }, [props.delete_bill_action_loading])
    useEffect(() => {
        if (props.delete_bill_loading === 'Success') {
            props.billApprovalList()
            props.deleteBillFresh()
            endLoader()
        }
    }, [props.delete_bill_loading])
    useEffect(() => {
        if (props.approve_bill_loading === 'Success') {
            props.billApprovalList();
        }
    }, [props.approve_bill_loading]);
    useEffect(() => {
        if (props.approve_multiple_bill_loading === 'Success') {
            toastr.success('Approved');
            props.billApprovalList();
            props.approveMultipleBillFresh();
            endLoader()
        }
    }, [props.approve_multiple_bill_loading]);

    const approveHandler = () => {
        startLoader()
        props.approveMultipleBill(state.selected);
        setState(prev => ({ ...prev, selected: [] }));
    }

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Breadcrumbs title="Bills" breadcrumbItem="Accounts" />

                <Row>
                    <Col lg={12}>
                        <div>
                            <Card>
                                <CardBody>
                                    <CardText className="mb-0">
                                        <PaginationProvider
                                            pagination={paginationFactory(pageOptions)}
                                            keyField="id"
                                            columns={activeData}
                                            data={props.approval_bills_list_data?.data || []}
                                        >
                                            {({ paginationProps, paginationTableProps }) => (
                                                <ToolkitProvider
                                                    keyField="id"
                                                    columns={activeData}
                                                    data={props.approval_bills_list_data?.data || []}
                                                    search
                                                >
                                                    {toolkitProps => (
                                                        <React.Fragment>
                                                            <Row className="mb-2">

                                                            </Row>

                                                            <Row>
                                                                <Col xl="12">
                                                                    <div className="table-responsive">
                                                                        <div className="d-flex justify-content-between search-box">
                                                                            <div>
                                                                                <button type="button" className="btn btn-info me-2" onClick={approveHandler} disabled={state.selected.length > 0 ? false : true}>
                                                                                    Approve
                                                                                </button>
                                                                                <button type="button" className="btn btn-secondary" onClick={toggleDeleteModal} disabled={state.selected.length > 0 ? false : true}>
                                                                                    <i className="fas fa-trash-alt"></i> Delete
                                                                                </button>
                                                                            </div>
                                                                            <SearchBar {...toolkitProps.searchProps} />
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
                                </CardBody>
                            </Card>

                        </div>
                    </Col>
                </Row>
            </Container>

            {
                showModal &&
                <BillsInfoModal
                    showModal={showModal}
                    setEditModal={setShowModal}
                    toggleModal={toggleModal}
                    Id={Id}
                    data={modalData}
                    length={actionArray.length}
                    propertyId={null}
                    ownerId={null}
                    startLoader={startLoader}
                />
            }
            <DeleteUploadBillsModal state={state} setState={setState} toggle={toggleDeleteModal} handleDelete={handleDelete} startLoader={startLoader} />
            <Loder status={loader} />
        </div >
    );
}

const mapStateToProps = gstate => {
    const {
        delete_bill_loading, delete_bill_action_loading, approval_bills_list_data, approval_bills_list_error, approval_bills_list_loading, approve_bill_loading, approve_multiple_bill_loading
    } = gstate.Bills;

    return {
        delete_bill_loading, delete_bill_action_loading, approval_bills_list_data, approval_bills_list_error, approval_bills_list_loading, approve_bill_loading, approve_multiple_bill_loading
    };
};

export default connect(mapStateToProps, {
    deleteBill, deleteBillFresh, deleteBillAction, deleteBillActionFresh, billApprovalList, billApprovalListFresh, approveMultipleBill, approveMultipleBillFresh
})(UploadBillsList);