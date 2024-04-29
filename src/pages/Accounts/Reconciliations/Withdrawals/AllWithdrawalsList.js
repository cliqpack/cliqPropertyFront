import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { withdrawalsNotProcessed, eftBpayWithdraw, onlyBpayWithdraw, eftBpayWithdrawFresh, chequeWithdraw, chequeWithdrawFresh, withdrawalsNotProcessedDataPost, withdrawalsNotProcessedDataPostFresh, withdrawalsNotProcessedFresh } from "store/actions";
import classnames from "classnames";
import DatatableTables2 from '../../../Tables/DatatableTables2';

import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    CardText,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from "reactstrap";

import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import toastr from "toastr";
import Breadcrumbs from "components/Common/Breadcrumb";
import Loder from "components/Loder/Loder";

document.title = "Reconciliations";

function AllWithdrawalsList(props) {
    const { month, year } = useParams();
    let history = useHistory();
    const [loader, setLoader] = useState(false);
    const [seen, setSeen] = useState(false);

    const [state, setState] = useState({ activeTab: "1", checkModal: false, CRNModal: false, withDrawData: [], chequeWithDrawData: [], bPayWithDrawData: [], EFTselected: [], CHEQUEselected: [], BPAYselected: [] });
    const [bpay, setBpay] = useState(false);

    const toggle = tab => {
        if (state.activeTab !== tab) {
            setState({
                ...state,
                activeTab: tab,
                EFTselected: tab === '1' ? [...state.EFTselected] : [],
                CHEQUEselected: tab === '2' ? [...state.CHEQUEselected] : [],
                BPAYselected: tab === '3' ? [...state.BPAYselected] : [],
            });
        };
        if (tab === '1') {
            props.withdrawalsNotProcessed(year, month, 'EFT')
        } else if (tab === '2') {
            props.withdrawalsNotProcessed(year, month, 'CHEQUE')
        } else if (tab === '3') {
            props.withdrawalsNotProcessed(year, month, 'BPAY')
        } else if (tab === '4') {
            props.withdrawalsNotProcessed(year, month, 'GENERATED_BATCH')
        }
    };

    const startLoader = () => setLoader(true);
    const endLoader = () => setLoader(false);

    let node, node2, node3;
    const defaultSorted = [
        {
            dataField: "id",
            order: "asc",
        },
    ];

    const pageOptions = {
        sizePerPage: 10,
        totalSize: props.unp_data?.data?.length, // replace later with size(customers),
        custom: true,
    };

    // Select  Button operation
    const selectRow = {
        mode: 'checkbox',
        onSelect: (row, isSelect, rowIndex, e) => {
            let value = [...state.withDrawData];
            if (isSelect) {
                value.push(row);
                setState({ ...state, withDrawData: value, EFTselected: [...state.EFTselected, row.id] })
            } else {
                let index = value.indexOf(row);
                value.splice(index, 1);
                setState({ ...state, withDrawData: value, EFTselected: state.EFTselected.filter(data => data !== row.id) })
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                setState({ ...state, withDrawData: rows, EFTselected: rows.map(item => item.id) });
            } else setState({ ...state, withDrawData: [], EFTselected: [] });
        },
        selected: [...state.EFTselected]
    };
    const selectRow2 = {
        mode: 'checkbox',
        onSelect: (row, isSelect, rowIndex, e) => {
            let value = [...state.chequeWithDrawData];
            if (isSelect) {
                value.push(row);
                setState({ ...state, chequeWithDrawData: value, CHEQUEselected: [...state.CHEQUEselected, row.id] })
            } else {
                let index = value.indexOf(row);
                value.splice(index, 1);
                setState({ ...state, chequeWithDrawData: value, CHEQUEselected: state.CHEQUEselected.filter(data => data !== row.id) })
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                setState({ ...state, chequeWithDrawData: rows, CHEQUEselected: rows.map(item => item.id) })
            } else setState({ ...state, chequeWithDrawData: [], CHEQUEselected: [] });
        }
    };
    const selectRow3 = {
        mode: 'checkbox',
        onSelect: (row, isSelect, rowIndex, e) => {
            let value = [...state.bPayWithDrawData];
            if (isSelect) {
                value.push(row);
                setState({ ...state, bPayWithDrawData: value, BPAYselected: [...state.BPAYselected, row.id] })
            } else {
                let index = value.indexOf(row);
                value.splice(index, 1);
                setState({ ...state, bPayWithDrawData: value, BPAYselected: state.BPAYselected.filter(data => data !== row.id) })

            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                setState({ ...state, bPayWithDrawData: rows, BPAYselected: rows.map(item => item.id) })
            } else setState({ ...state, bPayWithDrawData: [], BPAYselected: [] });
        }
    };

    const { SearchBar } = Search;

    const payeeRef = (cell, row) => {
        return <span>
            {row.owner_payment && row.owner_payment?.payee}
            {row.supplier_payment && row.supplier_payment?.payee}
            {row.tenant_payment && row.tenant_payment?.payee}
            {row.seller_payment && row.seller_payment?.payee}
        </span>
    }

    const bsbRef = (cell, row) => {
        return <span>
            {row.owner_payment && row.owner_payment?.bsb}
            {row.supplier_payment && row.supplier_payment?.bsb}
            {row.tenant_payment && row.tenant_payment?.bsb}
            {row.seller_payment && row.seller_payment?.bsb}
        </span>
    }
    const accountRef = (cell, row) => {
        return <span>
            {row.owner_payment && row.owner_payment.account}
            {row.supplier_payment && row.supplier_payment.account_no}
            {row.tenant_payment && row.tenant_payment?.account}
            {row.seller_payment && row.seller_payment?.account}
        </span>
    }
    const amountRef = (cell, row) => {
        return <span>
            {row.amount}৳
        </span>
    }

    const EFTData = [
        {
            dataField: "id",
            text: "ID",
            sort: true
        },
        {
            dataField: "create_date",
            text: "Created",
            sort: true
        },
        {
            dataField: "",
            text: "Payee",
            formatter: payeeRef,
            sort: true
        },
        {
            dataField: "",
            text: "BSB",
            formatter: bsbRef,
            sort: true,
        },
        {
            dataField: "",
            text: "Account#",
            formatter: accountRef,
            sort: true,
        },
        {
            dataField: "amount",
            text: "Amount",
            formatter: amountRef,
            sort: true,
        },
        {
            dataField: "complete_date",
            text: "Completed",
            sort: true,
        },

    ];

    const ChequeData = [
        {
            dataField: "id",
            text: "ID",
            sort: true
        },
        {
            dataField: "create_date",
            text: "Created",
            sort: true
        },
        {
            dataField: "cheque_number",
            text: "Cheque",
            sort: true
        },
        {
            dataField: "",
            text: "Payee",
            formatter: payeeRef,
            sort: true
        },
        {
            dataField: "amount",
            text: "Amount",
            formatter: amountRef,
            sort: true,
        },
        {
            dataField: "complete_date",
            text: "Completed",
            sort: true,
        },

    ];

    const bPayData = [
        {
            dataField: "id",
            text: "ID",
            sort: true
        },
        {
            dataField: "create_date",
            text: "Created",
            sort: true
        },
        {
            dataField: "property.reference",
            text: "Property",
            sort: true
        },
        {
            dataField: "supplier_payment.supplier_contact.reference",
            text: "Supplier",
            sort: true
        },
        {
            dataField: "supplier_payment.biller_code",
            text: "Biller Code",
            sort: true
        },
        {
            dataField: "customer_reference",
            text: "Customer Reference",
            sort: true
        },
        {
            dataField: "amount",
            text: "Amount",
            formatter: amountRef,
            sort: true
        },
        {
            dataField: "statement",
            text: "Statement",
            sort: true,
        },
        {
            dataField: "complete_date",
            text: "Completed",
            sort: true,
        },

    ];

    const docPathFormatter = (cell, row) => {
        return <a href={process.env.REACT_APP_DOCUMENT + row.doc_path} target="_blank"
            rel="noreferrer noopener"><i className="fab fa-dochub"></i></a>
    }
    const generatedBatchData = [
        {
            dataField: "create_date",
            text: "Created",
            sort: true
        },
        {
            dataField: "payment_type",
            text: "Type",
            sort: true
        },
        {
            dataField: "batch",
            text: "Batch",
            sort: true
        },
        {
            dataField: "",
            text: "Amount",
            formatter: amountRef,
            sort: true
        },
        {
            dataField: "total_withdrawals",
            text: "Total withdrawals",
            sort: true,
        },
        {
            dataField: "",
            text: "Statement",
            formatter: docPathFormatter,
            sort: true,
        },
        // {
        //     dataField: "",
        //     text: "Cancelled",
        //     formatter: cancelledRef,
        //     sort: true,
        // },

    ];



    const handleDueOwnerSelectedData = () => {
        props.withdrawalsNotProcessedDataPost(state.withDrawData)
    }

    useEffect(() => {
        if (props.cheque_withdrawal_data_loading === 'Success') {
            toastr.success("Cheque withdrawn");
            setState({ ...state, chequeWithDrawData: [], CHEQUEselected: [] })
            props.withdrawalsNotProcessed(year, month, 'CHEQUE')
            props.chequeWithdrawFresh();
        }
    }, [props.cheque_withdrawal_data_loading]);
    useEffect(() => {
        props.withdrawalsNotProcessed(year, month, 'EFT')
    }, [])
    useEffect(() => {
        if (props.unp_post_loading === 'Success') {
            toastr.success("Success");
            props.withdrawalsNotProcessedDataPostFresh();
            props.withdrawalsNotProcessedFresh();
        }
    }, [props.unp_post_loading])
    useEffect(() => {
        if (props.eft_withdrawal_data_loading === 'Success') {
            setState({ ...state, withDrawData: [], EFTselected: [], });
            function CreateTextFile() {
                if (!bpay) {
                    var blob = new Blob([
                        props.eft_withdrawal_data.data
                    ], {
                        type: "text/plain;charset=utf-8",
                    });
                    saveAs(blob, `ABA-${Math.random()}.aba`);
                } else {

                    if (props.eft_withdrawal_data.bank == 'wbc') {
                        var csvFile = '';
                        for (var i = 0; i < props.eft_withdrawal_data.data.length; i++) {
                            csvFile += processRow(props.eft_withdrawal_data.data[i]);
                        }
                        var blob = new Blob([csvFile], {
                            type: "text/csv;charset=utf-8",
                        });
                        saveAs(blob, `WBC-${Math.random()}.csv`);
                        setBpay(false);
                    } else if (props.eft_withdrawal_data.bank == 'nba') {
                        var blob = new Blob([
                            props.eft_withdrawal_data.data
                        ], {
                            type: "text/plain;charset=utf-8",
                        });
                        saveAs(blob, `NBA-${Math.random()}.txt`);
                        setBpay(false);

                    }

                }

            }
            CreateTextFile();

            if (state.activeTab === '1') {
                props.withdrawalsNotProcessed(year, month, 'EFT')
            } else props.withdrawalsNotProcessed(year, month, 'BPay')
            props.eftBpayWithdrawFresh();
            endLoader()
        } else if (props.eft_withdrawal_data_loading === 'Failed') {
            setState({ ...state, withDrawData: [], EFTselected: [], });
            toastr.error('Withdraw failed')
            props.eftBpayWithdrawFresh();
            endLoader()
        } else if (props.eft_withdrawal_data_loading === 'BANK_DATA_NOT_FOUND') {
            setState({ ...state, withDrawData: [], EFTselected: [], });
            toastr.error('Please complete banking settings first')
            props.eftBpayWithdrawFresh();
            endLoader()
        }  else if (props.eft_withdrawal_data_loading === 'Please_enable_BPay') {
            setState({ ...state, withDrawData: [], EFTselected: [], });
            toastr.error('Please enable BPay from Setting')
            props.eftBpayWithdrawFresh();
            endLoader()
        }
    }, [props.eft_withdrawal_data_loading])

    const EFTWithdrawHandler = () => {
        if (state.withDrawData.length > 0) {
            props.eftBpayWithdraw(state.withDrawData, 'EFT');
        }
        startLoader()
    }
    const BPayHandler = () => {
        if (state.bPayWithDrawData.length > 0) {
            props.onlyBpayWithdraw(state.bPayWithDrawData, 'BPay');
            setBpay(true);
        }
    }
    const ChequeHandler = () => {
        if (state.chequeWithDrawData.length > 0) {
            props.chequeWithdraw(state.chequeWithDrawData);
        }
    }

    const processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Withdrawals" breadcrumbItem="Accounts" />

                    <Row>
                        <Col lg={12}>
                            <div>
                                <Card>
                                    <CardBody>
                                        {/* <h4 className="text-primary">Withdrawals</h4> */}
                                        <Row className=" px-1 py-2">
                                            <Col>
                                                <div className="button-items">
                                                    <button type="button" className="btn btn-sm btn-secondary" onClick={() => history.goBack()}>
                                                        <i className="fas fa-arrow-left me-2" />Back
                                                    </button> {" "}
                                                    {state.activeTab === '1' && <>
                                                        <button type="button" className="btn btn-sm btn-info" onClick={EFTWithdrawHandler}>
                                                            <i className="fas fa-cloud-download-alt me-2" />Create ABA bank file
                                                        </button> {" "}
                                                        {/* <button type="button" className="btn btn-sm btn-info">
                                                            <i className="fas fa-file me-2" />Last ABA file report
                                                        </button> */}
                                                    </>}
                                                    {state.activeTab === '2' && <>
                                                        <button type="button" className="btn btn-sm btn-info" onClick={ChequeHandler}>
                                                            <i className="far fa-check-circle me-2" />Complete Cheque
                                                        </button>  {" "}
                                                        {/* <EditChequeModal state={state} setState={setState} /> */}

                                                    </>}
                                                    {state.activeTab === '3' &&
                                                        <>
                                                            <button type="button" className="btn btn-sm btn-info" onClick={BPayHandler}>
                                                                <i className="fas fa-cloud-download-alt me-2" />Create BPay file
                                                            </button>  {" "}
                                                            {/* <button type="button" className="btn btn-sm btn-info">
                                                                <i className="fas fa-cloud-download-alt me-2" />Last BPay file report
                                                            </button>

                                                            <EditBPayCRNModal state={state} setState={setState} /> */}
                                                        </>
                                                    }
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>

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
                                                        toggle("1");
                                                    }}
                                                >
                                                    EFT
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
                                                    Cheques
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
                                                    BPay
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
                                                    Generated Batches
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

                                                            <PaginationProvider
                                                                pagination={paginationFactory(pageOptions)}
                                                                keyField="id"
                                                                columns={EFTData}
                                                                data={props.unp_data?.data || []}
                                                            >
                                                                {({ paginationProps, paginationTableProps }) => (
                                                                    <ToolkitProvider
                                                                        keyField="id"
                                                                        columns={EFTData}
                                                                        data={props.unp_data?.data || []}
                                                                        search
                                                                    >
                                                                        {toolkitProps => (
                                                                            <React.Fragment>
                                                                                <Row className="mb-2">

                                                                                </Row>

                                                                                <Row>
                                                                                    <Col xl="12">
                                                                                        <div className="table-responsive">
                                                                                            <div className="d-flex justify-content-end search-box" style={{ marginTop: "60px" }}>
                                                                                                {/* <div>
                                                                                                    <button type="button" className="btn btn-sm btn-info" onClick={handleDueOwnerSelectedData}>
                                                                                                        Withdraw
                                                                                                    </button>
                                                                                                </div> */}
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
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText className="mb-0">

                                                            <PaginationProvider
                                                                pagination={paginationFactory(pageOptions)}
                                                                keyField="id"
                                                                columns={ChequeData}
                                                                data={props.unp_data?.data || []}
                                                            >
                                                                {({ paginationProps, paginationTableProps }) => (
                                                                    <ToolkitProvider
                                                                        keyField="id"
                                                                        columns={ChequeData}
                                                                        data={props.unp_data?.data || []}
                                                                        search
                                                                    >
                                                                        {toolkitProps => (
                                                                            <React.Fragment>
                                                                                <Row className="mb-2">

                                                                                </Row>

                                                                                <Row>
                                                                                    <Col xl="12">
                                                                                        <div className="table-responsive">
                                                                                            <div className="d-flex justify-content-end search-box" style={{ marginTop: "60px" }}>
                                                                                                <SearchBar {...toolkitProps.searchProps} />
                                                                                            </div>
                                                                                            <BootstrapTable
                                                                                                ref={n => node2 = n}
                                                                                                keyField={"id"}
                                                                                                responsive
                                                                                                bordered={false}
                                                                                                striped={false}
                                                                                                defaultSorted={defaultSorted}
                                                                                                selectRow={selectRow2}
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
                                            </TabPane>
                                            <TabPane tabId="3">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText className="mb-0">

                                                            <PaginationProvider
                                                                pagination={paginationFactory(pageOptions)}
                                                                keyField="id"
                                                                columns={bPayData}
                                                                data={props.unp_data?.data || []}
                                                            >
                                                                {({ paginationProps, paginationTableProps }) => (
                                                                    <ToolkitProvider
                                                                        keyField="id"
                                                                        columns={bPayData}
                                                                        data={props.unp_data?.data || []}
                                                                        search
                                                                    >
                                                                        {toolkitProps => (
                                                                            <React.Fragment>
                                                                                <Row className="mb-2">

                                                                                </Row>

                                                                                <Row>
                                                                                    <Col xl="12">
                                                                                        <div className="table-responsive">
                                                                                            <div className="d-flex justify-content-end search-box" style={{ marginTop: "60px" }}>

                                                                                                <SearchBar {...toolkitProps.searchProps} />
                                                                                            </div>
                                                                                            <BootstrapTable
                                                                                                ref={n => node3 = n}
                                                                                                keyField={"id"}
                                                                                                responsive
                                                                                                bordered={false}
                                                                                                striped={false}
                                                                                                defaultSorted={defaultSorted}
                                                                                                selectRow={selectRow3}
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
                                            </TabPane>
                                            <TabPane tabId="4">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText className="mb-0">
                                                            {props.unp_data ? (
                                                                <DatatableTables2
                                                                    products={props.unp_data}
                                                                    columnData={generatedBatchData}
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
            </div >
            {loader && <Loder status={loader} />}
        </>
    );
}

const mapStateToProps = gstate => {
    const {

        unp_data, unp_loading, unp_post_loading

    } = gstate.Reconciliations;
    const {

        eft_withdrawal_data,
        eft_withdrawal_data_error,
        eft_withdrawal_data_loading,

        cheque_withdrawal_data,
        cheque_withdrawal_data_error,
        cheque_withdrawal_data_loading,

    } = gstate.Withdrawal;


    return {
        unp_data, unp_loading, unp_post_loading,
        eft_withdrawal_data,
        eft_withdrawal_data_error,
        eft_withdrawal_data_loading,

        cheque_withdrawal_data,
        cheque_withdrawal_data_error,
        cheque_withdrawal_data_loading,
    };
};

export default connect(mapStateToProps, {
    withdrawalsNotProcessed, eftBpayWithdraw, onlyBpayWithdraw, eftBpayWithdrawFresh, chequeWithdraw, chequeWithdrawFresh, withdrawalsNotProcessedDataPost, withdrawalsNotProcessedDataPostFresh, withdrawalsNotProcessedFresh
})(AllWithdrawalsList);
