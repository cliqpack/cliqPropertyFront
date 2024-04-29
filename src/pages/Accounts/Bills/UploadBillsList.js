import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { allBillsListDue, allBillsListFuture, allBillsListPaid, addBills, addBillsFresh, uploadBillsList, uploadBillsListFresh, deleteBill, deleteBillFresh, deleteBillAction, deleteBillActionFresh } from "store/actions";
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


import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    CardText,
} from "reactstrap";
import moment from "moment";
import BillsEditModal from "./BillsEditModal";
import DeleteModal from "components/Common/DeleteModal";
import DeleteUploadBillsModal from "./DeleteUploadBillsModal";
import Breadcrumbs from "components/Common/Breadcrumb";
import Loder from "components/Loder/Loder";

document.title = "Upload Bills";



function UploadBillsList(props) {
    const [loader, setLoader] = useState(false);
    const [state, setState] = useState({
        activeTab: "1", deleteModal: false, selected: [],
    });
    const inputRef = useRef(null);

    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(prev => !prev);
    const [data, setData] = useState({});

    const date = moment().format("yyyy-MM-DD");
    const [deleteState, setDeleteState] = useState(false);
    const [actionArray, setActionArray] = useState([]);
    const [uploadBillState, setUploadBillState] = useState({ uploaded: 'Uploaded', billsDate: date })

    const toggleDeleteModal = () => {
        setState(prev => ({ ...prev, deleteModal: !prev.deleteModal }))
    }
    const startLoader = () => setLoader(true);
    const endLoader = () => setLoader(false);

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

    const deleteDetails = (e, column, columnIndex, row, rowIndex) => {
        setData(row);

    };

    const deleteHandler = () => {
        props.deleteBill(data.id)
        props.allBillsListDue(); props.allBillsListFuture(); props.allBillsListPaid()
        props.uploadBillsListFresh();
        setDeleteState(false);
    }

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
        console.log(isSelect, rows);
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

    const uploadBillDetails = (row) => {
        setData(row);
        toggleModal();
    };

    const editRef = (cell, row) => (<span onClick={() => uploadBillDetails(row)} className="badge rounded-pill badge-soft-primary font-size-12">Edit</span>)

    const delRef = (cell, row) => (<span className="badge rounded-pill badge-soft-danger font-size-12" onClick={() => setDeleteState(prev => !prev)}>Delete</span>);

    const fileRef = (cell, row) => {
        return <a href={process.env.REACT_APP_IMAGE + row.file} target="_blank" rel="noreferrer noopener">{row.file?.slice(0, 150)}</a>
    }

    const activeData = [
        {
            dataField: "billing_date",
            text: "Date",
            sort: true,
        },
        {
            dataField: "file",
            text: "File name",
            formatter: fileRef,
            sort: true
        },
        {
            dataField: "status",
            text: "Status",
            sort: true
        },
        {
            dataField: "",
            text: "Edit",
            sort: true,
            formatter: editRef,
        },
        {
            dataField: "",
            text: "Actions",
            sort: true,
            formatter: delRef,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    deleteDetails(e, column, columnIndex, row, rowIndex);
                },
            },
        },
    ];

    const handleSubmitUploadBill = (e) => {
        e.preventDefault();
        props.addBills(uploadBillState, e.target.files[0]);
        props.uploadBillsListFresh();
    }

    const handleDelete = () => {
        props.deleteBillAction(node.selectionContext.selected);
        setActionArray([]);
        setState({ ...state, selected: [] });
    }

    useEffect(() => {
        props.uploadBillsList()
    }, [])
    useEffect(() => {
        if (props.upload_bills_list_loading === false) {
            props.uploadBillsList();
            props.deleteBillFresh();
        }
    }, [props.upload_bills_list_loading])
    useEffect(() => {
        if (props.add_bills_loading === 'Success') {
            toastr.success('Success');
            props.addBillsFresh();
            setActionArray([]);
            setState(prev => ({ ...prev, selected: [] }))
            props.uploadBillsList();
        }
    }, [props.add_bills_loading])
    useEffect(() => {
        if (props.delete_bill_loading === 'Success') {
            toastr.error('Deleted');
            props.deleteBillFresh();
            props.uploadBillsList();
        }
    }, [props.delete_bill_loading])
    useEffect(() => {
        if (props.delete_bill_action_loading === 'Success') {
            toastr.error('Deleted');
            props.deleteBillActionFresh();
            props.uploadBillsList();
            endLoader()
        }
    }, [props.delete_bill_action_loading]);

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Breadcrumbs title="Upload Bills" breadcrumbItem="Accounts" />

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
                                                            <span style={{ fontSize: '22px' }}>{props.upload_bills_list_data?.data?.length || 0}</span>
                                                            <span>Upload Bills</span>
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
                                            <h4 className="ms-2 text-info">Upload Bills</h4>
                                            <Row style={{ height: '88px' }}>
                                                <Col md={9} className='d-flex align-items-end'>

                                                    <div className="button-items">



                                                        <button type="button" className="btn btn-info me-1" onClick={() => inputRef.current.click()}>
                                                            <i className="fas fa-upload"></i>{" "}
                                                            Upload Bills
                                                        </button>
                                                        <input
                                                            ref={inputRef}
                                                            type="file"
                                                            onChange={handleSubmitUploadBill}
                                                            style={{ display: "none" }}
                                                        />
                                                        <button type="button" className="btn btn-info me-1" disabled={actionArray.length === 0 ? true : false} onClick={toggleDeleteModal}>
                                                            <i className="fas fa-trash-alt me-1" />  Delete
                                                        </button>

                                                        {/* <button type="button" disabled={true} className="btn btn-secondary">
                                                            Process
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
                                    <CardText className="mb-0">
                                        <PaginationProvider
                                            pagination={paginationFactory(pageOptions)}
                                            keyField="id"
                                            columns={activeData}
                                            data={props.upload_bills_list_data?.data || []}
                                        >
                                            {({ paginationProps, paginationTableProps }) => (
                                                <ToolkitProvider
                                                    keyField="id"
                                                    columns={activeData}
                                                    data={props.upload_bills_list_data?.data || []}
                                                    search
                                                >
                                                    {toolkitProps => (
                                                        <React.Fragment>
                                                            <Row className="mb-2">

                                                            </Row>

                                                            <Row>
                                                                <Col xl="12">
                                                                    <div className="table-responsive">
                                                                        <div className="d-flex justify-content-end search-box">
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

            <DeleteModal
                show={deleteState}
                onDeleteClick={deleteHandler}
                onCloseClick={() => setDeleteState(prev => !prev)}
            />

            <BillsEditModal data={data} showModal={showModal} setShowModal={setShowModal} toggle={toggleModal} />
            <DeleteUploadBillsModal state={state} setState={setState} toggle={toggleDeleteModal} handleDelete={handleDelete} startLoader={startLoader} />
            <Loder status={loader} />
        </div >
    );
}

const mapStateToProps = gstate => {

    const {
        bills_list_data, bills_list_loading, bills_list_future_data, bills_list_future_loading, bills_list_paid_data, bills_list_paid_loading, add_bills_loading, upload_bills_list_data, upload_bills_list_loading, delete_bill_loading, delete_bill_action_loading
    } = gstate.Bills;

    return {
        bills_list_data, bills_list_loading, bills_list_future_data, bills_list_future_loading, bills_list_paid_data, bills_list_paid_loading, add_bills_loading, upload_bills_list_data, upload_bills_list_loading, delete_bill_loading, delete_bill_action_loading
    };
};

export default connect(mapStateToProps, {
    allBillsListDue, allBillsListFuture, allBillsListPaid, addBills, addBillsFresh, uploadBillsList, uploadBillsListFresh, deleteBill, deleteBillFresh, deleteBillAction, deleteBillActionFresh
})(UploadBillsList);