import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { BankList, DepositOutstanding, DepositOutstandingShow, DepositOutstandingList, DepositOutstandingShowFresh, DepositOutstandingListFresh } from "store/actions";
import DatatableTables2 from "pages/Tables/DatatableTables2";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import toastr from "toastr";
import moment from 'moment';
import CancelDepositModal from "./CancelDepositModal";
import Breadcrumbs from "components/Common/Breadcrumb";

document.title = "Banking";

function BankingList(props) {
    let date = moment().format("YYYY");
    const history = useHistory();

    const [seen, setSeen] = useState(false);
    const [data, setData] = useState({
        data: [
            { month: 'November 2022', date: '22-11-2022', cash: 500, cheques: 200, card: 300, },
            { month: 'November 2022', date: '22-11-2022', cash: 500, cheques: 200, card: 300, },
            { month: 'November 2022', date: '22-11-2022', cash: 500, cheques: 200, card: 300, },
            { month: 'November 2022', date: '22-11-2022', cash: 500, cheques: 200, card: 300, },
            { month: 'November 2022', date: '22-11-2022', cash: 500, cheques: 200, card: 300, },
            { month: 'November 2022', date: '22-11-2022', cash: 500, cheques: 200, card: 300, },
            { month: 'November 2022', date: '22-11-2022', cash: 500, cheques: 200, card: 300, },
            { month: 'November 2022', date: '22-11-2022', cash: 500, cheques: 200, card: 300, },
            { month: 'November 2022', date: '22-11-2022', cash: 500, cheques: 200, card: 300, },
            { month: 'November 2022', date: '22-11-2022', cash: 500, cheques: 200, card: 300, },
            { month: 'November 2022', date: '22-11-2022', cash: 500, cheques: 200, card: 300, },
            { month: 'November 2022', date: '22-11-2022', cash: 500, cheques: 200, card: 300, },
            { month: 'November 2022', date: '22-11-2022', cash: 500, cheques: 200, card: 300, },
        ]
    });
    const [outstandingList, setOutstandingList] = useState({
        data: [
            { month: 'November 2022', date: '22-11-2022', amount: 100, type: 'Cash' },
            { month: 'November 2022', date: '22-11-2022', amount: 200, type: 'Card' },
            { month: 'November 2022', date: '22-11-2022', amount: 50, type: 'Cash' },
            { month: 'November 2022', date: '22-11-2022', amount: 60, type: 'Card' },
            { month: 'November 2022', date: '22-11-2022', amount: 203, type: 'Cheque' },
            { month: 'November 2022', date: '22-11-2022', amount: 90, type: 'Cheque' },
        ]
    });
    const [state, setState] = useState({
        drp_link: false,
        deopsitModal: false,
    });
    const toggledeopsitModal = () => {
        setState(prev => ({ ...prev, drp_link: !prev.drp_link }));
    }
    const toggleCancelModal = () => {
        setState(prev => ({ ...prev, deopsitModal: !prev.deopsitModal }));
    }
    useEffect(() => {
        if (!seen) {
            props.DepositOutstandingShow();
            props.BankList();
        }
        if (props.deposit_outstanding_list_loading === 'Success') {
            toastr.success('All outstanding list deposited successfully');
            props.BankList();
            props.DepositOutstandingShow();
            props.DepositOutstandingListFresh();
            props.DepositOutstandingShowFresh();

        }
        setSeen(true);
    }, [props.deposit_outstanding_show_loading, props.deposit_outstanding_list_loading, props.banking_list_loading, props.cancel_deposit_data_loading]);

    const pushToBankDepositedList = (id) => {
        history.push(`/banking-list-data/${id}`);
    }

    const totalRef = (cell, row) => {
        return <span>{row.total}৳</span>
    }

    const monthRef = (cell, row) => {
        return <span className="text-primary" onClick={() => pushToBankDepositedList(row.id)}>{moment(row.deposit_date).format("MMMM YYYY")}</span>
    }
    const cashRef = (cell, row) => {
        return <span>{row.cash}৳</span>
    }
    const cardRef = (cell, row) => {
        return <span>{row.card}৳</span>
    }
    const chequeRef = (cell, row) => {
        return <span>{row.cheque}৳</span>
    }

    const columnData = [
        {
            dataField: "",
            text: "Month",
            formatter: monthRef,
            sort: true,
        },
        {
            dataField: "deposit_date",
            text: "Date",
            sort: true,
        },
        {
            dataField: "cash",
            text: "Cash",
            formatter: cashRef,
            sort: true,
        },
        {
            dataField: "cheque",
            text: "Cheque",
            formatter: chequeRef,
            sort: true,
        },
        {
            dataField: "card",
            text: "Card",
            formatter: cardRef,
            sort: true,
        },
        {
            dataField: "total",
            text: "Total",
            formatter: totalRef,
            sort: true,
        },
    ];

    // const taxRef = (cell, row) => {
    //     return <span>{row.include_tax === 1 ? <i className="fas fa-check"></i> : ''}</span>
    // };

    const pushToBankReceiptList = (month, year) => {
        console.log(month, year);
        // return
        let monthref = month?.toString()?.length > 1 ? month : `0${month}`;
        history.push(`/banking/receipt/list/${monthref}/${year}`);
    }

    let totalCash = 0;
    outstandingList.data.filter((item, idx) => {
        return item.type === 'Cash' ? totalCash += item.amount : '';
    });
    let totalCard = 0;
    outstandingList.data.filter((item, idx) => {
        return item.type === 'Card' ? totalCard += item.amount : '';
    });
    let totalCheque = 0;
    outstandingList.data.filter((item, idx) => {
        return item.type === 'Cheque' ? totalCheque += item.amount : '';
    });
    let total = 0;
    outstandingList.data.map((item, idx) => {
        return total += item.amount;
    });

    const handleDepositAllOutstanding = () => {
        props.DepositOutstandingList();
        props.DepositOutstandingShowFresh();
    }

    const showDepositOutstanding =
        <Card>
            <CardBody>
                <Row>
                    {/* <h3 className="ms-2 text-primary mb-3">Banking</h3> */}
                    {/* <Col md={3} className='d-flex align-items-center'>
                    <div>
                        <h3 className="text-primary"><i className="fas fa-file-invoice-dollar me-1"></i>{" "} {date}</h3>
                        <span className="font-size-12">(up to {date} November 2022)</span>
                    </div>
                </Col> */}
                    {props.deposit_outstanding_show?.data?.map((item) => (
                        <>
                            {
                                item.payment_method === "cash" &&
                                <Col key={item.id} md={3} onClick={() => pushToBankReceiptList(item.month, item.year)} style={{ cursor: 'pointer' }}>
                                    <div className="bg-light p-3 d-flex mb-3 rounded">
                                        <div className="flex-grow-1">
                                            <h5 className="font-size-18 mb-2">
                                                <span className="badge bg-primary">
                                                    <b>{moment().month(item.month - 1).format('MMMM')} {item.year}</b>
                                                </span>
                                            </h5>
                                            <h5 className="font-size-15 mb-2">
                                                <span className="badge badge-soft-success">
                                                    <b>{item.amount}৳</b>
                                                </span>
                                            </h5>
                                            <p className="mb-0 text-muted">
                                                <i className="fas fa-money-bill-alt"></i> Cash
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            }
                            {
                                item.payment_method === "cheque" &&
                                <Col key={item.id} md={3} onClick={() => pushToBankReceiptList(item.month, item.year)} style={{ cursor: 'pointer' }}>
                                    <div className="bg-light p-3 d-flex mb-3 rounded">
                                        <div className="flex-grow-1">
                                            <h5 className="font-size-18 mb-2">
                                                <span className="badge bg-primary">
                                                    <b>{moment().month(item.month - 1).format('MMMM')} {item.year}</b>
                                                </span>
                                            </h5>
                                            <h5 className="font-size-15 mb-2">
                                                <span className="badge badge-soft-success"><b>{item.amount}৳</b></span>
                                            </h5>
                                            <p className="mb-0 text-muted">
                                                <i className="fas fa-file-invoice-dollar"></i> Cheque
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            }
                            {
                                item.payment_method === "card" &&
                                <Col key={item.id} md={3} onClick={() => pushToBankReceiptList(item.month, item.year)} style={{ cursor: 'pointer' }}>
                                    <div className="bg-light p-3 d-flex mb-3 rounded">
                                        <div className="flex-grow-1">
                                            <h5 className="font-size-18 mb-2">
                                                <span className="badge bg-primary">
                                                    <b>{moment().month(item.month - 1).format('MMMM')} {item.year}</b>
                                                </span>
                                            </h5>
                                            <h5 className="font-size-15 mb-2">
                                                <span className="badge badge-soft-success"><b>{item.amount}৳</b></span>
                                            </h5>
                                            <p className="mb-0 text-muted">
                                                <i className="far fa-credit-card"></i> Card
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            }
                        </>
                    ))}

                    <Row>
                        <Col>
                            <div className="button-items">
                                <Button color="info" className="btn" onClick={handleDepositAllOutstanding} disabled={props.deposit_outstanding_show?.data?.length > 0 ? false : true}>
                                    Deposit All Outstanding
                                </Button>
                                <ButtonDropdown
                                    isOpen={state.drp_link}
                                    toggle={toggledeopsitModal} >
                                    <DropdownToggle caret color="secondary" disabled={props.banking_list?.data?.length > 0 ? false : true}>
                                        Actions <i className="mdi mdi-chevron-down"></i>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={toggleCancelModal}>Cancel last deposit</DropdownItem>

                                    </DropdownMenu>
                                </ButtonDropdown>
                            </div>
                        </Col>
                    </Row>


                    {/* <Col md={2}>
                    <div className="bg-light p-3 d-flex mb-3 rounded">
                        <div className="flex-grow-1">
                            <h5 className="font-size-15 mb-2">
                                <span className="badge badge-soft-success"><b>{total}</b></span>
                            </h5>
                            <p className="mb-0 text-muted">
                                <b>Total</b>
                            </p>
                        </div>
                    </div>
                </Col> */}
                    {/* <Col md={1} className='d-flex align-items-center'>
                    <Button color="info" className="btn btn-sm">
                        <i className="fas fa-arrow-right"></i>
                    </Button>
                </Col> */}
                </Row>
            </CardBody>
        </Card>

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Breadcrumbs title="Banking" breadcrumbItem="Accounts" />

                <Row>
                    <Col lg={12}>
                        <div>
                            {showDepositOutstanding}

                            <Card>
                                <CardBody>
                                    {props.banking_list ? (
                                        <DatatableTables2
                                            products={props.banking_list}
                                            columnData={columnData}
                                        />
                                    ) : null}
                                </CardBody>
                            </Card>

                        </div>
                    </Col>
                </Row>
            </Container>
            {state.deopsitModal && <CancelDepositModal state={state} setState={setState} toggle={toggleCancelModal} />}
        </div >
    );
}

const mapStateToProps = gstate => {
    const {
        banking_list,
        banking_list_error,
        banking_list_loading,

        outstanding_list,
        outstanding_list_error,
        outstanding_list_loading,

        deposit_outstanding_loading,

        deposit_outstanding_show,
        deposit_outstanding_show_error,
        deposit_outstanding_show_loading,

        deposit_outstanding_list_loading,
    } = gstate.Banking;
    return {
        banking_list,
        banking_list_error,
        banking_list_loading,

        outstanding_list,
        outstanding_list_error,
        outstanding_list_loading,

        deposit_outstanding_loading,

        deposit_outstanding_show,
        deposit_outstanding_show_error,
        deposit_outstanding_show_loading,

        deposit_outstanding_list_loading,
    };
};

export default withRouter(connect(mapStateToProps, {
    BankList, DepositOutstanding, DepositOutstandingShow, DepositOutstandingList, DepositOutstandingShowFresh, DepositOutstandingListFresh
})(BankingList));
