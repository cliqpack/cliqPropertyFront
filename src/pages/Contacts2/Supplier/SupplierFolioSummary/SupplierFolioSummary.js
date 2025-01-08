import React, { useEffect, useState } from "react";
import { useParams, withRouter, Link, useHistory } from "react-router-dom";
import {
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col,
    TabContent,
    TabPane,
    Card,
    CardBody,
    CardText,
    CardTitle,
    Label,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Button,
} from "reactstrap";
import classnames from "classnames";
import DatatableTables2 from "pages/Tables/DatatableTables2";
import moment from "moment";
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import { connect } from "react-redux";
import { ownerFolioSummaryTransaction, ownerFolioSummaryTransactionFresh, ownerFolioSummaryProperties, supplierFolioSummaryTransaction, supplierFolioSummaryTransactionFresh } from "store/actions";
import Loder from "components/Loder/Loder";
import TransactionsInfoModal from "pages/Accounts/Transactions/TransactionsInfoModal";
import TransactionsInfoModalEdit from "pages/Accounts/Transactions/TransactionsInfoModalEdit";
import TransactionsInfoModalReverse from "pages/Accounts/Transactions/TransactionsInfoModalReverse";
import ClearFundModal from "pages/Accounts/Transactions/clearFundModal";
import AccountPieChart from "pages/Properties/Owner/OwnerSummaryReport/AccountPieChart";
import Select from "react-select";

function SupplierFolioSummary(props) {
    const history = useHistory();
    let currentDate = moment();
    let lastDayOfMonth = currentDate;
    let firstDayOfMonth = currentDate.clone().startOf('month');
    let formattedFirstDay = firstDayOfMonth.format('YYYY-MM-DD');
    let formattedLastDay = lastDayOfMonth.format('YYYY-MM-DD');

    const { id } = useParams();
    const [state, setState] = useState({
        activeTab: "1",
        drp_link: false,
        transactionInfoModal: false,
        transactionInfoModalReverse: false,
        transactionInfoModalEdit: false,
        clearFundModal: false,
        dropDownReportBtn: false,
        from_date: formattedFirstDay, to_date: formattedLastDay
    });
    const [pieChartIncomeState, SetPieChartIncomeState] = useState({
        data: [], color: [], dataValue: []
    });
    const [pieChartExpenseState, SetPieChartExpenseState] = useState({
        data: [], color: [], dataValue: []
    });

    const [loader, setLoader] = useState(false);
    const startLoader = () => setLoader(true);
    const endLoader = () => setLoader(false);
    const toggle = tab => {
        if (state.activeTab !== tab) {
            setState({
                ...state,
                activeTab: tab,
            });
        };
    };

    const fromDateHandler = (selectedDates, dateStr, instance) => {
        setState(prev => ({ ...prev, ['from_date']: dateStr }));
    }
    const toDateHandler = (selectedDates, dateStr, instance) => {
        setState(prev => ({ ...prev, ['to_date']: dateStr }));
    }
    const handleSummaryTransaction = () => {
        startLoader()
        props.supplierFolioSummaryTransaction(id, state)
    }
    const toggleModalTransactions = () => {
        setState(prev => ({ ...prev, transactionInfoModal: !prev.transactionInfoModal }));
        // props.transactionsInfoListFresh();
    };
    const toggleModalTransactionsReverse = (id) => {
        setState(prev => ({ ...prev, transactionInfoModalReverse: !prev.transactionInfoModalReverse, receipt_id: id }));
    };
    const toggleModalTransactionsEdit = () => {
        setState(prev => ({ ...prev, transactionInfoModalEdit: !prev.transactionInfoModalEdit }));
    };
    const toggleClearFund = () => {
        setState(prev => ({ ...prev, clearFundModal: !prev.clearFundModal }));
    };
    const transactionsDetails = (e, column, columnIndex, row, rowIndex) => {
        setState({ ...state, transactionId: row.id, transactionsDetails: row })
        toggleModalTransactions();
    };
    const accountRef = (cell, row) => {
        return <span>{row?.account?.account_name}</span>
    }
    const amountRef = (cell, row) => {
        let amount = ceilToTwoDecimalPlaces(cell)
        return <span>${amount}</span>
    }
    const summaryIncomeAmountRef = (cell, row) => {
        let amount = ceilToTwoDecimalPlaces(cell)
        if (row?.account?.type == 'Income') {
            return <span>${amount}</span>
        } else return <span></span>
    }
    const summaryExpenseAmountRef = (cell, row) => {
        let amount = ceilToTwoDecimalPlaces(cell)
        if (row?.account?.type == 'Expense') {
            return <span>${amount}</span>
        } else return <span></span>
    }
    const typeFormatter = (cell, row) => {
        return <span>
            {cell} {row.reversed === 1 ? <i className="fas fa-undo"></i> : ''}
        </span>
    }
    const getIncomeOption = () => {
        return {
            toolbox: {
                show: false,
            },
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)",
            },
            legend: {
                orient: "vertical",
                left: "left",
                data: pieChartIncomeState.data,
                textStyle: {
                    color: ["#74788d"],
                },
            },
            color: pieChartIncomeState.color,
            series: [
                {
                    name: "Total sales",
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "60%"],
                    data: pieChartIncomeState.dataValue,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        }
    }
    const getExpenseOption = () => {
        return {
            toolbox: {
                show: false,
            },
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)",
            },
            legend: {
                orient: "vertical",
                left: "left",
                data: pieChartExpenseState.data,
                textStyle: {
                    color: ["#74788d"],
                },
            },
            color: pieChartExpenseState.color,
            series: [
                {
                    name: "Total sales",
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "60%"],
                    data: pieChartExpenseState.dataValue,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        }
    }
    const colors = [
        '#3357FF', '#F1C40F', '#9B59B6', '#3498DB',
        '#1ABC9C', '#E67E22', '#E74C3C', '#2ECC71', '#D35400', '#2980B9',
        '#8E44AD', '#C0392B', '#16A085', '#27AE60', '#F39C12', '#BDC3C7',
        '#7F8C8D', '#F4D03F', '#58D68D', '#5DADE2', '#AF7AC5', '#EC7063',
        '#45B39D', '#52BE80', '#F5B041', '#85929E', '#2C3E50', '#AAB7B8',
        '#D5DBDB', '#76448A', '#F0B27A', '#1F618D', '#641E16', '#2E86C1',
        '#7D6608', '#9A7D0A', '#7B241C', '#196F3D', '#839192', '#784212',
        '#A3E4D7', '#7FB3D5', '#BB8FCE', '#F7DC6F', '#ABEBC6', '#D98880',
        '#5499C7', '#FAD7A0', '#FF5733', '#33FF57'
    ];
    const redGradient = [
        '#D21D1D', '#E12424',
        '#EA3A3A', '#F35252', '#F56E6E', '#F88A8A', '#FAA7A7',
        '#FCC4C4', '#FFD1D1', '#FFDADA', '#FFE3E3', '#FFEDED',
        '#FFF2F2', '#FFF6F6', '#FFF9F9', '#FFFDFD', '#FFEEEE',
        '#FFDDDD', '#FFC0C0', '#FFA3A3', '#FF8787', '#FF6B6B'
    ];

    const greenGradient = [
        '#5A9B11', '#6AA628',
        '#7AB23E', '#8ABD54', '#9BC86A', '#ADD480', '#BFDF96',
        '#CBE9AA', '#D5EEB9', '#DFF4CA', '#E9F8DA', '#F3FCEB',
        '#F4FFE9', '#EFFFDF', '#E8FFD2', '#E1FFC5', '#DBFFB9',
        '#D6FFAD', '#D0FFA2', '#C9FF95', '#C3FF88', '#BCFF7B'
    ];

    function ceilToTwoDecimalPlaces(number) {
        return Math.ceil(number * 100) / 100;
    }
    function handleFinancialSummary () {
        history.push(`/edit/supplier/financial/summary/${id}`)
    }

    const activeData = [
        {
            dataField: "id",
            text: "Audit",
            sort: true,
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
            formatter: typeFormatter,
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
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    transactionsDetails(e, column, columnIndex, row, rowIndex);
                },
            },
        },
        {
            dataField: "amount",
            text: "Amount",
            sort: true,
            formatter: amountRef,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    transactionsDetails(e, column, columnIndex, row, rowIndex);
                },
            },
        },
    ];
    const activeSummaryData = [
        {
            dataField: "account_id",
            text: "Account",
            sort: true,
            formatter: accountRef,
        },
        {
            dataField: "total_tax_amount",
            text: "Inc. Tax",
            sort: true,
            formatter: amountRef,
        },
        {
            dataField: "total_amount",
            text: "Debit",
            sort: true,
            formatter: summaryExpenseAmountRef,
        },
        {
            dataField: "total_amount",
            text: "Credit",
            sort: true,
            formatter: summaryIncomeAmountRef,
        },
    ];
    useEffect(() => {
        props.supplierFolioSummaryTransaction(id, state)
    }, [])

    useEffect(() => {
        if (props.supplier_fs_transaction_loading == 'Success') {
            let incomedata = props.supplier_fs_transaction?.income_accounts?.data?.map(item => item.account?.account_name)
            let incomecolor = props.supplier_fs_transaction?.income_accounts?.data?.map((item, index) => greenGradient[index])
            let incomedataValue = props.supplier_fs_transaction?.income_accounts?.data?.map(item => ({ value: item.total_amount, name: item.account?.account_name }))
            SetPieChartIncomeState(prev => ({ ...prev, data: incomedata, color: incomecolor, dataValue: incomedataValue }))
            let expensedata = props.supplier_fs_transaction?.expense_accounts?.data?.map(item => item.account?.account_name)
            let expensecolor = props.supplier_fs_transaction?.expense_accounts?.data?.map((item, index) => redGradient[index])
            let expensedataValue = props.supplier_fs_transaction?.expense_accounts?.data?.map(item => ({ value: item.total_amount, name: item.account?.account_name }))
            SetPieChartExpenseState(prev => ({ ...prev, data: expensedata, color: expensecolor, dataValue: expensedataValue }))
            endLoader()
            props.supplierFolioSummaryTransactionFresh()
        }
    }, [props.supplier_fs_transaction_loading])


    return <div className="page-content">
        {loader && <Loder status={loader} />}
        <Container fluid={true}>
            <h4 className="text-primary py-2">Folio Summary</h4>
            <Row className="mb-4">
                <Col md="6">
                    <div className="d-flex justify-content-start align-items-center py-2 px-4">
                        <div>
                        </div>
                        <div className="button-items d-flex justify-content-start">
                            <Button className="btn btn-info" onClick={handleFinancialSummary}>Edit Financial Summary</Button>
                            <Dropdown
                                isOpen={state.dropDownReportBtn}
                                toggle={() =>
                                    setState(prev => {
                                        return {
                                            ...prev,
                                            dropDownReportBtn: !prev.dropDownReportBtn,
                                        };
                                    })
                                }
                                className="mt-4 mt-sm-0 me-2 ms-2"
                            >
                                <DropdownToggle
                                    className="btn btn-info btn-md"
                                    caret
                                >
                                    Reports <i className="mdi mdi-chevron-down"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link style={{ color: 'black' }} to={`/supplier/summary/bydate/${id}/${state.from_date}/${state.to_date}`} target='blank'>By Date</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link style={{ color: 'black' }} to={`/supplier/summary/monthinfo/${id}/${state.from_date}/${state.to_date}`} target='blank'>By Date with Monthly Info</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link style={{ color: 'black' }} to={`/supplier/summary/bystatement/${id}/${state.from_date}/${state.to_date}`} target='blank'>By Statements</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link style={{ color: 'black' }} to={`/supplier/summary/groupby/${id}/${state.from_date}/${state.to_date}`} target='blank'>Group by Statements</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md="4">
                    <Card>
                        <CardBody>
                            <CardTitle className="mb-4 h4">Expenses</CardTitle>
                            <div id="pie-chart" className="e-chart">
                                <AccountPieChart getOption={getExpenseOption} />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card>
                        <CardBody>
                            <CardTitle className="mb-4 h4">Income</CardTitle>
                            <div id="pie-chart" className="e-chart">
                                <AccountPieChart getOption={getIncomeOption} />
                            </div>
                        </CardBody>
                    </Card></Col>
                <Col md="4">
                    <div className="form-group-new">
                        <Flatpickr
                            className="form-control d-block"
                            placeholder="Pick a Date..."
                            value={state.from_date}
                            options={{
                                altInput: true,
                                format: "d/m/Y",
                                altFormat: "d/m/Y",
                                onChange: fromDateHandler
                            }}
                        />
                        <label htmlFor="usr">Period Start</label>
                    </div>
                    <div className="form-group-new">
                        <Flatpickr
                            className="form-control d-block"
                            placeholder="Pick a Date..."
                            value={state.to_date}
                            options={{
                                altInput: true,
                                format: "d/m/Y",
                                altFormat: "d/m/Y",
                                onChange: toDateHandler
                            }}
                        />
                        <label htmlFor="usr">Period End</label>
                    </div>
                    <div className="mb-2">
                        <button
                            className="btn btn-buttonColor"
                            onClick={handleSummaryTransaction}
                            type="button"
                        >
                            Apply
                        </button>
                    </div>
                    <hr />
                    <Row>
                        <Col md="4"></Col>
                        <Col md="4"><h5 className="text-primary py-2">Include Tax</h5></Col>
                        <Col md="4"><h5 className="text-primary py-2">Total</h5></Col>
                    </Row>
                    <Row>
                        <Col md="4"><span className="text-primary py-2">Credits</span></Col>
                        <Col md="4">${ceilToTwoDecimalPlaces(props.supplier_fs_transaction?.total_credit_tax_sum)}</Col>
                        <Col md="4">${ceilToTwoDecimalPlaces(props.supplier_fs_transaction?.total_credit_amount_sum)}</Col>
                    </Row>
                    <Row>
                        <Col md="4"><span className="text-primary py-2">Debits</span></Col>
                        <Col md="4">${ceilToTwoDecimalPlaces(props.supplier_fs_transaction?.total_debit_tax_sum)}</Col>
                        <Col md="4">${ceilToTwoDecimalPlaces(props.supplier_fs_transaction?.total_debit_amount_sum)}</Col>
                    </Row>
                </Col>
            </Row>
            <Row>
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
                                    Summary
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
                                    Transactions
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
                                            {props.supplier_fs_transaction?.distinct_receipt_details ? (
                                                <DatatableTables2
                                                    products={props.supplier_fs_transaction?.distinct_receipt_details}
                                                    columnData={activeSummaryData}
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
                                            {props.supplier_fs_transaction ? (
                                                <DatatableTables2
                                                    products={props.supplier_fs_transaction}
                                                    columnData={activeData}
                                                />
                                            ) : null}
                                        </CardText>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </CardBody>
                </Card>
            </Row>
        </Container>
        {
            state.transactionInfoModal &&
            <TransactionsInfoModal receipt={state.transactionsDetails} state={state} setState={setState} toggle={toggleModalTransactions} toggleReverse={toggleModalTransactionsReverse} toggleEdit={toggleModalTransactionsEdit} toggleClearFund={toggleClearFund} />
        }
        {/* {state.transactionInfoModal ? <TransactionsInfoModal state={state} setState={setState} toggle={toggleModalTransactions} toggleReverse={toggleModalTransactionsReverse} toggleEdit={toggleModalTransactionsEdit} /> : null} */}
        <TransactionsInfoModalReverse state={state} setState={setState} toggle={toggleModalTransactionsReverse} toggleinfo={toggleModalTransactions} />
        <TransactionsInfoModalEdit state={state} setState={setState} toggle={toggleModalTransactionsEdit} />
        <ClearFundModal state={state} setState={setState} toggle={toggleClearFund} />
    </div>
}

const mapStateToProps = gstate => {
    const { supplier_fs_transaction, supplier_fs_transaction_loading } = gstate.AccountsTransactions;
    return {
        supplier_fs_transaction, supplier_fs_transaction_loading
    };
};

export default withRouter(
    connect(mapStateToProps, {
        ownerFolioSummaryTransaction, ownerFolioSummaryTransactionFresh, ownerFolioSummaryProperties, supplierFolioSummaryTransaction, supplierFolioSummaryTransactionFresh
    })(SupplierFolioSummary)
);