import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, withRouter, useHistory, useParams } from "react-router-dom";
import { ReceiptList, ReconciliationDataFresh } from "store/actions";
import classnames from "classnames";
import DatatableTables2 from "pages/Tables/DatatableTables2";
import toastr from "toastr";


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
    Table
} from "reactstrap";

import { setDefaultLocale } from "react-datepicker";
import moment from "moment";
import { logDOM } from "@testing-library/react";
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";


document.title = "Reconciliations";



function ReceiptsList(props) {
    const [state, setState] = useState({
        activeTab: "1", showReverse: true
    });
    const { date } = useParams();
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);
    const [seen, setSeen] = useState(false);
    console.log(month, year);


    const inputRef = useRef(null);

    const [data, setData] = useState({});

    const history = useHistory();

    // const date = moment().format("yyyy-MM-DD");




    let node;
    const defaultSorted = [
        {
            dataField: "id",
            order: "asc",
        },
    ];


    const deleteDetails = (e, column, columnIndex, row, rowIndex) => {
        setData(row);

    };

    const deleteHandler = () => {
        e.preventDefault();

    }

    const statusRef = (cell, row) => {

        if (cell === 1) {
            return <span className=""><i className="fas fa-check" /></span>;
        } else {
            return <span className=""></span>;
        }
    };



    const amountRef = (cell, row) => {
        return <span>{row.amount}৳</span>
    }

    const uploadBillDetails = (row) => {

    };

    const editRef = (cell, row) => (<span onClick={() => uploadBillDetails(row)} className="text-primary">Edit</span>)

    const delRef = (cell, row) => (<span className="text-danger" onClick={() => setDeleteState(prev => !prev)}>Delete</span>);



    // const fileRef = (cell, row) => {
    //     return <a href={process.env.REACT_APP_IMAGE + row.file} target="_blank" rel="noreferrer noopener">{row.file?.slice(0, 150)}</a>
    // };

    const { SearchBar } = Search;

    const dataNow = [
        { id: 1, date: '11/25/2022', audit: '004861', reference: '1234', method: 'EFT', property: '12th street', summary: 'Paid to 2/11/2022 (from 26/10/2022)', file: '', amount: '100' },
        { id: 2, date: '11/25/2022', audit: '004862', reference: '1234', method: 'EFT', property: '', summary: 'Paid to 2/11/2022 (from 26/10/2022)', file: '', amount: '100' },
    ];



    const dateRef = (cell, row) => <span className="text-primary">{moment(cell).format('YYYY-MM-DD')}</span>
    const fileRef = (cell, row) => <i className="fas fa-file-alt font-size-20 text-info" />

    const activeData = [


        {
            dataField: "id",
            text: "Audit",
            sort: true
        },
        {
            dataField: "created_at",
            text: "Date",
            formatter: dateRef,
            sort: true
        },
        {
            dataField: "ref",
            text: "Reference",
            sort: true
        },
        {
            dataField: "payment_method",
            text: "Method",
            sort: true
        },

        {
            dataField: "property.reference",
            text: "Property",
            sort: true,
        },
        {
            dataField: "summary",
            text: "Summary",
            sort: true,
        },
        // {
        //     dataField: "",
        //     text: "file",
        //     formatter: fileRef,
        //     sort: true,
        // },
        {
            dataField: "amount",
            text: "Amount",
            formatter: amountRef,
            sort: true,
        },

    ];




    const handleSubmitUploadBill = (e) => {

    }

    useEffect(() => {
        if (!seen) {
            props.ReceiptList(month, year)
            setSeen(true);
        }
        if (props.receipt_list_loading === false) {
            props.ReceiptList(month, year);
            props.ReconciliationDataFresh();
        }
    }, []);
    // console.log(props.receipt_list_loading, props.receipt_list_data?.data);

    const pageOptions = {
        sizePerPage: 10,
        totalSize: props.receipt_list_data?.data?.length, // replace later with size(customers),
        custom: true,
    };


    const handleReverse = () => setState(prev => ({ ...prev, showReverse: !prev.showReverse }))


    const expandRow = {
        renderer: row => (


            <Card>
                <CardBody>
                    <div>
                        <div>
                            <Row className="ps-4">
                                <Col md={6} className='d-flex justify-content-between px-1 py-1'>
                                    <div>00{row.id}</div>
                                    <div>{moment(row.created_at).format('YYYY-MM-DD')}</div>
                                    <div>Receipt {row.ref}</div>
                                    <div>{row.manager}</div>
                                </Col>
                                <Col md={6}></Col>
                            </Row>
                        </div>
                        <Table className="table mb-0">
                            <thead>
                                <tr>
                                    <th className="col-md-4">Contact</th>
                                    <th className="col-md-4">Folio</th>
                                    <th className="col-md-2">Detail</th>
                                    <th className="col-md-1">Tax</th>
                                    <th className="col-md-1">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>{row.contact?.reference}</th>
                                    <td>00{row.folio_id}</td>
                                    <td>{row.summary}</td>
                                    <td>{ }</td>
                                    <td>{row.amount}</td>
                                </tr>
                            </tbody>
                        </Table>

                        {/* {state.showReverse &&
                            <Row className="d-flex align-items-center mt-2">

                                <Col md={3}>

                                    <Button onClick={handleReverse}>
                                        <i className="fas fa-undo me-1" />
                                        Reverse
                                    </Button>
                                </Col>
                            </Row>}
                        {state.showReverse === false &&
                            <Row className="d-flex align-items-center mt-2">
                                <Col md={4}>
                                    <input
                                        name="reason"
                                        type="text"
                                        className="form-control"
                                        placeholder="Optional reason for reversal"
                                    />

                                </Col>
                                <Col md={6}>


                                    <div className="d-flex">
                                        <Button>
                                            <i className="fas fa-undo me-1" />
                                            Confirm
                                        </Button>
                                        <Button color="secondary" outline className="ms-1" onClick={handleReverse}>
                                            Cancel
                                        </Button>
                                    </div>

                                </Col>
                            </Row>} */}
                    </div>
                </CardBody>
            </Card>

        ),
        showExpandColumn: true,
        expandByColumnOnly: true
    };
    return (
        <div className="page-content">
            <Container fluid={true}>
                <Row>
                    <Col lg={12}>
                        <div>
                            <Row>
                                <Col md={12}>
                                    <Card>
                                        <CardBody>
                                            <h4 className="ms-2 text-primary border-bottom border-2">{moment(date).format('MMMM').toString()} {moment(date).format('YYYY').toString()} Receipts</h4>


                                            <Row className="py-2">
                                                <Col md={9} className='d-flex align-items-center'>

                                                    <div className="button-items">



                                                        <Link to={`/cashBookReportReceipt/${month}/${year}`}>
                                                            <button type="button" disabled={false} className="btn btn-info me-1">
                                                                <i className="fas fa-file-alt me-2" /> Reports
                                                            </button>
                                                        </Link>


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
                                        <Row>
                                            <Col sm="12">
                                                <CardText className="mb-0">

                                                    <PaginationProvider
                                                        pagination={paginationFactory(pageOptions)}
                                                        keyField="id"
                                                        columns={activeData}
                                                        data={props.receipt_list_data?.data || []}
                                                    >
                                                        {({ paginationProps, paginationTableProps }) => (
                                                            <ToolkitProvider
                                                                keyField="id"
                                                                columns={activeData}
                                                                data={props.receipt_list_data?.data || []}
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
                                                                                        // selectRow={selectRow}
                                                                                        expandRow={expandRow}
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
                                                    {/* {props.receipt_list_data ? (
                                                        <DatatableTables2
                                                            products={props.receipt_list_data}
                                                            columnData={activeData}
                                                            expandRow={expandRow}
                                                        // url={url}
                                                        />
                                                    ) : null} */}
                                                </CardText>
                                            </Col>
                                        </Row>
                                    </CardText>
                                </CardBody>
                            </Card>

                        </div>
                    </Col>
                </Row>
            </Container>



        </div >
    );
}

const mapStateToProps = gstate => {
    const {



    } = gstate.property;

    const {
        receipt_list_data, receipt_list_loading,
    } = gstate.Reconciliations;



    return {
        receipt_list_data, receipt_list_loading,
    };
};

export default connect(mapStateToProps, {
    ReceiptList, ReconciliationDataFresh
})(ReceiptsList);