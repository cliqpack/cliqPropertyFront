import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    Col,
    Row,
    Card,
    CardBody,
    CardTitle,
    Table,
} from "reactstrap";
import { useParams, withRouter } from "react-router-dom";
import {
    ownerFolioSummaryProperties, ODFolioSummaryTransaction, ODFolioSummaryTransactionFresh
} from "store/actions";
import moment from "moment";
import "../pInfo.css";
import OTHeader from "../OTHeader";
import Select from "react-select";
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import Loder from "components/Loder/Loder";
import AccountPieChart from "pages/Properties/Owner/OwnerSummaryReport/AccountPieChart";
import ODBarChart from "./ODBarChart";

const ODFinancialSummary = props => {
    const { id } = useParams();
    let currentDate = moment();
    let lastDayOfMonth = currentDate;
    let firstDayOfMonth = currentDate.clone().startOf('month');
    let formattedFirstDay = firstDayOfMonth.format('YYYY-MM-DD');
    let formattedLastDay = lastDayOfMonth.format('YYYY-MM-DD');
    const redGradient = [
        '#D21D1D', '#E12424',
        '#EA3A3A', '#F35252', '#F56E6E', '#F88A8A', '#FAA7A7',
        '#FCC4C4', '#FFD1D1', '#FFDADA', '#FFE3E3', '#FFEDED',
        '#FFF2F2', '#FFF6F6', '#FFF9F9', '#FFFDFD', '#FFEEEE',
        '#FFDDDD', '#FFC0C0', '#FFA3A3', '#FF8787', '#FF6B6B'
    ];
    const [state, setState] = useState({
        activeTab: "1",
        drp_link: false,
        transactionInfoModal: false,
        transactionInfoModalReverse: false,
        transactionInfoModalEdit: false,
        clearFundModal: false,
        dropDownReportBtn: false,
        from_date: formattedFirstDay, to_date: formattedLastDay, property_id: 'All'
    });
    const [selectedProperty, setSelectedProperty] = useState({ label: 'All Properties', value: 'All' });
    const [optionGroupProperty, setOptionGroupProperty] = useState([{ label: 'All Properties', value: 'All' }]);
    const [loader, setLoader] = useState(false);
    const [pieChartExpenseState, SetPieChartExpenseState] = useState({
        data: [], color: [], dataValue: []
    });
    const [barchartState, setBarChartState] = useState({
        barchartlabels: [], barchartincomedatasets: [], barchartexpensedatasets: []
    })
    useEffect(() => {
        props.ODFolioSummaryTransaction(id, state)
        props.ownerFolioSummaryProperties(id)
    }, [])
    useEffect(() => {
        let option;
        if (props.owner_fs_properties?.data) {
            option = props.owner_fs_properties?.data.map(item => ({
                label: item.reference, value: item.id
            }));
            setOptionGroupProperty([{ label: 'All Properties', value: 'All' }, ...option]);
        }
    }, [props.owner_fs_properties])
    useEffect(() => {
        if (props.od_fs_transaction_loading == 'Success') {
            let barchartdate = props.od_fs_transaction?.distinct_receipt_details?.data?.map(item => item.month_year)
            let incomeBarChartAmount = barchartdate.map((item, index) => {
                let data = props.od_fs_transaction?.incomeBarAccounts?.data?.map(it => item == it.month_year ? it.total_amount : 0)
                return data[index]
            })
            let expenseBarChartAmount = barchartdate.map((item, index) => {
                let matchingEntry = props.od_fs_transaction?.expenseBarAccounts?.data?.find(it => item === it.month_year);
                return matchingEntry ? -matchingEntry.total_amount : 0;
            })

            setBarChartState(prev => ({ ...prev, barchartlabels: barchartdate, barchartincomedatasets: incomeBarChartAmount, barchartexpensedatasets: expenseBarChartAmount }))
            let expensedata = props.od_fs_transaction?.expense_accounts?.data?.map(item => item.account?.account_name)
            let expensecolor = props.od_fs_transaction?.expense_accounts?.data?.map((item, index) => redGradient[index])
            let expensedataValue = props.od_fs_transaction?.expense_accounts?.data?.map(item => ({ value: item.total_amount, name: item.account?.account_name }))
            SetPieChartExpenseState(prev => ({ ...prev, data: expensedata, color: expensecolor, dataValue: expensedataValue }))
            endLoader()
            props.ODFolioSummaryTransactionFresh()
        }
    }, [props.od_fs_transaction_loading])


    const startLoader = () => setLoader(true);
    const endLoader = () => setLoader(false);
    const fromDateHandler = (selectedDates, dateStr, instance) => {
        setState(prev => ({ ...prev, ['from_date']: dateStr }));
    }
    const toDateHandler = (selectedDates, dateStr, instance) => {
        setState(prev => ({ ...prev, ['to_date']: dateStr }));
    }
    const handleSelectProperty = e => {
        setState(prev => ({ ...prev, property_id: e.value }))
        setSelectedProperty(e);
    };
    const handleSummaryTransaction = () => {
        startLoader()
        props.ODFolioSummaryTransaction(id, state)
    }

    const odBarChartData = {
        labels: barchartState.barchartlabels,
        datasets: [
            {
                label: "Money out",
                backgroundColor: 'rgba(255, 82, 82, 0.8)',
                borderColor: 'rgba(255, 82, 82, 0.8)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 82, 82, 0.9)',
                hoverBorderColor: 'rgba(255, 82, 82, 0.9)',
                data: barchartState.barchartexpensedatasets,
            },
            {
                label: "Money in",
                backgroundColor: "rgba(52, 195, 143, 0.8)",
                borderColor: "rgba(52, 195, 143, 0.8)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(52, 195, 143, 0.9)",
                hoverBorderColor: "rgba(52, 195, 143, 0.9)",
                data: barchartState.barchartincomedatasets,
            }
        ],
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

    return (
        <React.Fragment>
            {loader && <Loder status={loader} />}
            <div id="layout-wrapper">
                <OTHeader text="1" />
                <div className="main-property" style={{ marginTop: "100px" }}>
                    <div style={{ marginLeft: "280px" }}>
                        <h4 className="text-primary py-2">Financial Activity</h4>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md="4">
                                        <Select
                                            value={selectedProperty}
                                            onChange={handleSelectProperty}
                                            options={optionGroupProperty}
                                            classNamePrefix="select2-selection"
                                            placeholder='Property'
                                        />
                                    </Col>
                                    <Col md="3">
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
                                            <label htmlFor="usr">Showing activity from</label>
                                        </div>
                                    </Col>
                                    <Col md="3">
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
                                            <label htmlFor="usr">until</label>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div>
                                            <button
                                                className="btn btn-buttonColor"
                                                onClick={handleSummaryTransaction}
                                                type="button"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Row className="mb-4">
                            <Col md="7">
                                <Card>
                                    <CardBody>
                                        <ODBarChart odBarChartData={odBarChartData} />
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="5">
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4 h4">Expenses Breakdown</CardTitle>
                                        <div id="pie-chart" className="e-chart">
                                            <AccountPieChart getOption={getExpenseOption} />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <div className="table-responsive m-3">
                            <Table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th>Month</th>
                                        <th>Chart Account Name</th>
                                        <th>Tax Included</th>
                                        <th>Debit</th>
                                        <th>Credit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.od_fs_transaction?.receiptDetails?.map(item => {
                                            return <tr key={item.id}>
                                                <td>{moment(item.created_at).format('MMM YYYY')}</td>
                                                <td>{item?.account?.account_name}</td>
                                                <td>${item.taxAmount}</td>
                                                <td>{ item.pay_type == 'debit' ? `$${item.amount}` : '' }</td>
                                                <td>{ item.pay_type == 'credit' ? `$${item.amount}` : '' }</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th>Total</th>
                                        <th>${props.od_fs_transaction?.totaltax}</th>
                                        <th>${props.od_fs_transaction?.totaldebit}</th>
                                        <th>${props.od_fs_transaction?.totalcredit}</th>
                                    </tr>
                                </tfoot>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
};

const mapStateToProps = gstate => {
    const { owner_fs_properties, od_fs_transaction, od_fs_transaction_loading } = gstate.AccountsTransactions;

    return {
        owner_fs_properties, od_fs_transaction, od_fs_transaction_loading
    };
};

export default withRouter(
    connect(mapStateToProps, {
        ownerFolioSummaryProperties, ODFolioSummaryTransaction, ODFolioSummaryTransactionFresh
    })(ODFinancialSummary)
);
