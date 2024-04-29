import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, useHistory, useParams } from "react-router-dom";
import { OutstandingList, DepositOutstanding, DepositOutstandingFresh, BankList, DepositOutstandingShow } from "store/actions";
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
import toastr from "toastr";
import moment from 'moment';

document.title = "Banking";

function BankingReceiptList(props) {
    let date = moment().format("dddd, DD");
    let node;
    const { month, year } = useParams();
    const [seen, setSeen] = useState(false);
    const [data, setData] = useState(
        [
            { id: 1, receipt: '100', property: 'Bent st 01', type: 'Cash', date: '22-11-2022', cash: 500, cheque: '', card: '', },
            { id: 2, receipt: '100', property: 'Bent st 01', type: 'Card', date: '22-11-2022', cash: '', cheque: '', card: 300, },
            { id: 3, receipt: '100', property: 'Bent st 01', type: 'Cheque', date: '22-11-2022', cash: '', cheque: 200, card: '', },
            { id: 4, receipt: '100', property: 'Bent st 01', type: 'Card', date: '22-11-2022', cash: '', cheque: '', card: 300, },
            { id: 5, receipt: '100', property: 'Bent st 01', type: 'Card', date: '22-11-2022', cash: '', cheque: '', card: 300, },
            { id: 6, receipt: '100', property: 'Bent st 01', type: 'Cash', date: '22-11-2022', cash: 500, cheque: '', card: '', },
            { id: 7, receipt: '100', property: 'Bent st 01', type: 'Cash', date: '22-11-2022', cash: 500, cheque: '', card: '', },
            { id: 8, receipt: '100', property: 'Bent st 01', type: 'Cash', date: '22-11-2022', cash: 500, cheque: '', card: '', },
            { id: 9, receipt: '100', property: 'Bent st 01', type: 'Cash', date: '22-11-2022', cash: 500, cheque: '', card: '', },
            { id: 10, receipt: '100', property: 'Bent st 01', type: 'Cash', date: '22-11-2022', cash: 500, cheque: '', card: '', },
            { id: 11, receipt: '100', property: 'Bent st 01', type: 'Cash', date: '22-11-2022', cash: 500, cheque: '', card: '', },
            { id: 12, receipt: '100', property: 'Bent st 01', type: 'Cash', date: '22-11-2022', cash: 500, cheque: '', card: '', },
            { id: 13, receipt: '100', property: 'Bent st 01', type: 'Cash', date: '22-11-2022', cash: 500, cheque: '', card: '', },
        ]
    );
    const [state, setState] = useState({
        page: 1,
        sizePerPage: 10,
    });
    const defaultSorted = [
        {
            dataField: "id",
            order: "asc",
        },
    ];

    const pageOptions = {
        sizePerPage: 10,
        totalSize: props.outstanding_list ? props.outstanding_list?.data?.length : 0, // replace later with size(customers),
        custom: true,
    };

    // Select All Button operation
    const selectRow = {
        mode: "checkbox",
    };

    const { SearchBar } = Search;
    const history = useHistory();

    useEffect(() => {
        if (!seen) {
            props.OutstandingList(month, year);
        }
        if (props.deposit_outstanding_loading === 'Success') {
            props.DepositOutstandingFresh();
            props.DepositOutstandingShow();
            props.BankList();
            history.push('/banking-list');
        }
        setSeen(true);
    }, [props.outstanding_list_loading, props.deposit_outstanding_loading]);
    console.log(props.outstanding_list);

    const idRef = (cell, row) => {
        return <span>#{row?.id}</span>
    }

    const handleGetSelectedData = () => {
        if (node.selectionContext.selected.length === 0) {
            toastr.error('Select data first');
        } else {
            props.DepositOutstanding(node.selectionContext.selected);
        }
    }

    const cashRef = (cell, row) => {
        return <span>{row?.receipt?.payment_method === 'cash' ? <>{row?.receipt?.amount}৳</> : ''}</span>
    }
    const cardRef = (cell, row) => {
        return <span>{row?.receipt?.payment_method === 'card' ? <>{row?.receipt?.amount}৳</> : ''}</span>
    }
    const chequeRef = (cell, row) => {
        return <span>{row?.receipt?.payment_method === 'cheque' ? <>{row?.receipt?.amount}৳</> : ''}</span>
    }

    const pushToProperty = (id) => {
        history.push(`/propertyInfo/${id}`);
    }
    const propertyRef = (cell, row) => {
        return <span className="text-primary" onClick={() => pushToProperty(row?.receipt?.property?.id)}>{row?.receipt?.property?.reference}</span>
    }
    const paymentMethodRef = (cell, row) => {
        if (row?.receipt?.payment_method === 'Cash') {
            return <span><i className="fas fa-money-bill-alt"></i> {row?.receipt?.payment_method}</span>
        } else if (row?.receipt?.payment_method === 'Card') {
            return <span><i className="far fa-credit-card"></i> {row?.receipt?.payment_method}</span>
        } else {
            return <span><i className="fas fa-file-invoice-dollar"></i> {row?.receipt?.payment_method}</span>
        }
    }

    const columnData = [
        {
            dataField: "id",
            text: "Id #",
            formatter: idRef,
            sort: true,
        },
        {
            dataField: "receipt.receipt_date",
            text: "Date",
            sort: true,
        },
        {
            dataField: "receipt.id",
            text: "Receipt",
            sort: true,
        },
        {
            dataField: "receipt.property.reference",
            text: "Property",
            formatter: propertyRef,
            sort: true,
        },
        {
            dataField: "receipt.payment_method",
            text: "Type",
            formatter: paymentMethodRef,
            sort: true,
        },
        {
            dataField: "card",
            text: "Card Amount",
            formatter: cardRef,
            sort: true,
        },
        {
            dataField: "cash",
            text: "Cash Amount",
            formatter: cashRef,
            sort: true,
        },
        {
            dataField: "cheque",
            text: "Cheque Amount",
            formatter: chequeRef,
            sort: true,
        },
    ];
    let cash = 0, card = 0, cheque = 0, total = 0;
    props.outstanding_list?.data.forEach(element => {
        if (element?.payment_method === "cash") {
            cash += +element?.amount;
        } else if (element?.payment_method === "card") {
            card += +element?.amount;
        } else {
            cheque += +element?.amount;
        }
        total += +element?.amount;
    })

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Row>
                    <Col lg={12}>
                        <div>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <h3 className="text-primary mb-3">Banking - Receipts for {moment().month(month - 1).format('MMMM')} {year}</h3>
                                        <Col md={4} className='d-flex align-items-center'>
                                            <div>
                                                <h3 className="text-primary"><i className="fas fa-file-invoice-dollar me-1"></i>{" "} {moment().month(month - 1).format('MMMM')} {year}</h3>
                                                <span>(up to {date} {moment().month(month - 1).format('MMMM')} {year})</span>
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <div className="bg-light p-3 d-flex mb-3 rounded">
                                                <div className="flex-grow-1">
                                                    <h5 className="font-size-15 mb-2">
                                                        <span className="badge badge-soft-success">
                                                            <b>
                                                            {cash}৳
                                                            </b>
                                                        </span>
                                                    </h5>
                                                    <p className="mb-0 text-muted">
                                                        <i className="fas fa-money-bill-alt"></i> Cash
                                                    </p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <div className="bg-light p-3 d-flex mb-3 rounded">
                                                <div className="flex-grow-1">
                                                    <h5 className="font-size-15 mb-2">
                                                        <span className="badge badge-soft-success"><b>{cheque}৳</b></span>
                                                    </h5>
                                                    <p className="mb-0 text-muted">
                                                        <i className="fas fa-file-invoice-dollar"></i> Cheque
                                                    </p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <div className="bg-light p-3 d-flex mb-3 rounded">
                                                <div className="flex-grow-1">
                                                    <h5 className="font-size-15 mb-2">
                                                        <span className="badge badge-soft-success"><b>{card}৳</b></span>
                                                    </h5>
                                                    <p className="mb-0 text-muted">
                                                        <i className="far fa-credit-card"></i> Card
                                                    </p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <div className="bg-light p-3 d-flex mb-3 rounded">
                                                <div className="flex-grow-1">
                                                    <h5 className="font-size-15 mb-2">
                                                        <span className="badge badge-soft-success"><b>{total}৳</b></span>
                                                    </h5>
                                                    <p className="mb-0 text-muted">
                                                        Total
                                                    </p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <button type="button" className="btn btn-sm btn-info" onClick={handleGetSelectedData}>
                                        Deposit selected transaction
                                    </button>
                                    {
                                        props.outstanding_list ?
                                            <PaginationProvider
                                                pagination={paginationFactory(pageOptions)}
                                                keyField="id"
                                                columns={columnData}
                                                data={props.outstanding_list.data}
                                            >
                                                {({ paginationProps, paginationTableProps }) => (
                                                    <ToolkitProvider
                                                        keyField="id"
                                                        columns={columnData}
                                                        data={props.outstanding_list.data}
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
                                            </PaginationProvider> : ''
                                    }
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
        outstanding_list,
        outstanding_list_error,
        outstanding_list_loading,

        deposit_outstanding_loading,
    } = gstate.Banking;
    return {
        outstanding_list,
        outstanding_list_error,
        outstanding_list_loading,

        deposit_outstanding_loading,
    };
};

export default withRouter(connect(mapStateToProps, {
    OutstandingList, DepositOutstanding, DepositOutstandingFresh, BankList, DepositOutstandingShow
})(BankingReceiptList));
