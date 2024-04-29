import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { newWithdrawals } from "store/actions";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    CardText,
    Table
} from "reactstrap";
import moment from "moment";
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
function Withdrawals(props) {
    const { month, year } = useParams();
    const [state, setState] = useState({
        activeTab: "1", showReverse: true
    });
    const inputRef = useRef(null);
    const [data, setData] = useState({});
    const history = useHistory();
    const date = moment().format("yyyy-MM-DD");
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
        return <span>{cell}৳</span>
    }
    const uploadBillDetails = (row) => {

    };
    const editRef = (cell, row) => (<span onClick={() => uploadBillDetails(row)} className="text-primary">Edit</span>)
    const delRef = (cell, row) => (<span className="text-danger" onClick={() => setDeleteState(prev => !prev)}>Delete</span>);
    const fileRef = (cell, row) => {
        return <a href={process.env.REACT_APP_IMAGE + row.file} target="_blank" rel="noreferrer noopener">{row.file?.slice(0, 150)}</a>
    };
    const { SearchBar } = Search;
    const pageOptions = {
        sizePerPage: 10,
        totalSize: props.new_withdrawals_data?.data.length || '', // replace later with size(customers),
        custom: true,
    };
    const handleReverse = () => setState(prev => ({ ...prev, showReverse: !prev.showReverse }))
    const expandRow = {
        renderer: row => (
            <Card>
                <CardBody>
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
                                <th>
                                    {row?.owner_folio?.owner_contacts?.reference}
                                    {row?.tenant_folio?.tenant_contact?.reference}
                                    {row?.supplier_folio?.supplier_contact?.reference}
                                </th>
                                <td>
                                    {row?.owner_folio?.folio_code}
                                    {row?.tenant_folio?.folio_code}
                                    {row?.supplier_folio?.folio_code}
                                </td>
                                <td>Withdrawal by {row?.payment_method?.toUpperCase()} to {row?.folio_type} {" "}
                                    {row?.owner_folio?.owner_contacts?.reference}
                                    {row?.tenant_folio?.tenant_contact?.reference}
                                    {row?.supplier_folio?.supplier_contact?.reference}
                                </td>
                                <td></td>
                                <td>{row?.amount}৳</td>
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

                </CardBody>
            </Card>
        ),
        showExpandColumn: true
    };
    const idFormatter = (cell, row) => {
        return <span>00{cell}</span>
    }
    const summaryFormat = (cell, row) => {
        return <span>Withdrawal by {row?.payment_method?.toUpperCase()} to {row?.folio_type} {" "}
            {row?.owner_folio?.owner_contacts?.reference}
            {row?.tenant_folio?.tenant_contact?.reference}
            {row?.supplier_folio?.supplier_contact?.reference}
        </span>
    }
    const activeData = [
        {
            dataField: "id",
            text: "Audit",
            formatter: idFormatter,
            sort: true
        },
        {
            dataField: "receipt_date",
            text: "Date",
            sort: true
        },
        {
            dataField: "customer_reference",
            text: "Reference",
            sort: true
        },
        {
            dataField: "",
            text: "Summary",
            formatter: summaryFormat,
            sort: true
        },
        {
            dataField: "amount",
            text: "Amount",
            formatter: amountRef,
            sort: true,
        },
    ];
    useEffect(() => {
        if (props.new_withdrawals_loading === false) {
            props.newWithdrawals(month, year);
        }
    }, [props.new_withdrawals_loading]);
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
                                            <h4 className="ms-2 text-primary border-bottom border-2">{moment(date).format('MMMM').toString()} {moment(date).format('YYYY').toString()} Withdrawals</h4>
                                            <Row className="py-2">
                                                <Col md={9} className='d-flex align-items-center'>

                                                    <div className="button-items">
                                                        <Link to={`/newWithDrawalsReport/${month}/${year}`}>
                                                            <button type="button" className="btn btn-info me-1">
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
                                                        data={props.new_withdrawals_data?.data || []}
                                                    >
                                                        {({ paginationProps, paginationTableProps }) => (
                                                            <ToolkitProvider
                                                                keyField="id"
                                                                columns={activeData}
                                                                data={props.new_withdrawals_data?.data || []}
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
        new_withdrawals_data, new_withdrawals_loading
    } = gstate.Reconciliations;

    return {
        new_withdrawals_data, new_withdrawals_loading
    };
};
export default connect(mapStateToProps, {
    newWithdrawals
})(Withdrawals);