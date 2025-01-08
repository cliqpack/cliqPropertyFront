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
import { ownerFolioSummaryProperties, getChartOfAccounts, OwnerFinancialAcitvityStore, OwnerFinancialAcitvityStoreFresh } from "store/actions";
import Loder from "components/Loder/Loder";
import Select from "react-select";


function AddFinancialSummary(props) {
    const { id } = useParams()
    const date = moment().format("yyyy-MM-DD");
    const [state, setState] = useState({
        date: date, summary: '', amount: '', type: '', taxChecker: 0, loader: false
    })
    const [selectedProperty, setSelectedProperty] = useState({ label: 'All Properties', value: 'All' });
    const [optionGroupProperty, setOptionGroupProperty] = useState([{ label: 'All Properties', value: 'All' }]);
    const [selectedInvoiceChart, setSelectedInvoiceChart] = useState(null);
    const [optionGroupInvoiceChart, setOptionGroupInvoiceChart] = useState([]);

    useEffect(() => {
        props.ownerFolioSummaryProperties(id)
        props.getChartOfAccounts();
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
        let optionChart;
        if (props.chartAccount_list_data) {
            optionChart = props.chartAccount_list_data?.account.map(item => ({
                label: item.account_number + ' - ' + item.account_name, value: item.id,
            }));
            setOptionGroupInvoiceChart(optionChart);
        }
    }, [props.chartAccount_list_loading])
    useEffect(() => {
        if (props.owner_financial_activity_loading == 'Success') {
            props.OwnerFinancialAcitvityStoreFresh()
            window.history.back()
        }
    }, [props.owner_financial_activity_loading])

    function ceilToTwoDecimalPlaces(number) {
        return Math.ceil(number * 100) / 100;
    }
    const dateHandler = (selectedDates, dateStr, instance) => {
        setState(prev => ({ ...prev, ['date']: dateStr }));
    }
    const handleSelectProperty = e => {
        setSelectedProperty(e);
    };
    const handleSelectInvoiceChart = e => {
        setSelectedInvoiceChart(e);
    };
    const handleState = (e) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const toggleBtnType = (value) => {
        setState(prev => ({ ...prev, type: value }))
    };
    const taxCheckHandler = e => {
        if (e.target.value) {
            setState(prev => { return { ...prev, taxChecker: prev.taxChecker === 0 ? 1 : 0 } });
        }
    }
    const handleSave = () => {
        props.OwnerFinancialAcitvityStore({ ...state, property_id: selectedProperty.value, ca_id: selectedInvoiceChart.value, ca_name: selectedInvoiceChart.label, own_id: id })
        setState(prev => ({ ...prev, loader: true }))
    }

    return <div className="page-content">
        {state.loader && <Loder status={state.loader} />}
        <Container fluid={true}>
            <h4 className="text-primary py-2">New Financial Activity</h4>
            <Row>
                <Card>
                    <CardBody>
                        <Row>
                            <Col md={2}></Col>
                            <Col md={6}>
                                <Row className="mb-3 d-flex align-items-center">
                                    <Col md={3}>
                                        <Label>
                                            Date
                                        </Label>
                                    </Col>
                                    <Col md={9}>
                                        <Flatpickr
                                            className="form-control d-block"
                                            placeholder="Pick a date..."
                                            value={state.date}
                                            options={{
                                                altInput: true,
                                                format: "d/m/Y",
                                                altFormat: "d/m/Y",
                                                onChange: dateHandler
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3 d-flex align-items-center">
                                    <Col md={3}>
                                        <Label>
                                            Property
                                        </Label>
                                    </Col>
                                    <Col md={9}>
                                        <Select
                                            value={selectedProperty}
                                            onChange={handleSelectProperty}
                                            options={optionGroupProperty}
                                            classNamePrefix="select2-selection"
                                            placeholder='Property'
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3 d-flex align-items-center">
                                    <Col md={3}>
                                        <Label>
                                            Account
                                        </Label>
                                    </Col>
                                    <Col md={9}>
                                        <Select
                                            value={selectedInvoiceChart}
                                            onChange={handleSelectInvoiceChart}
                                            options={optionGroupInvoiceChart}
                                            classNamePrefix="select2-selection"
                                            placeholder='Chart Account'
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3 d-flex align-items-center">
                                    <Col md={3}>
                                        <Label>
                                            Type
                                        </Label>
                                    </Col>
                                    <Col md={9}>
                                        <div className="btn-group btn-group-justified">
                                            <div className="btn-group">
                                                <Button
                                                    color={
                                                        state.type == 'debit'
                                                            ? "secondary"
                                                            : "light"
                                                    }
                                                    onClick={() => toggleBtnType('debit')}
                                                    className='btn w-md'
                                                >
                                                    {state.type == 'debit' ? (
                                                        <i className="bx bx-comment-check"></i>
                                                    ) : null}
                                                    <span>
                                                        {" "}
                                                        Debit
                                                    </span>
                                                </Button>
                                            </div>

                                            <div className="btn-group">
                                                <Button
                                                    color={
                                                        state.type == 'credit'
                                                            ? "secondary"
                                                            : "light"
                                                    }
                                                    onClick={() => toggleBtnType('credit')}
                                                    className='btn w-md'
                                                >
                                                    {state.type == 'credit' ? (
                                                        <i className="bx bx-comment-check"></i>
                                                    ) : null}
                                                    <span>
                                                        {" "}
                                                        Credit
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-3 d-flex align-items-center">
                                    <Col md={3}>
                                        <Label>
                                            Amount
                                        </Label>
                                    </Col>
                                    <Col md={9} className="d-flex">
                                        <span className="input-group-append">
                                            <span
                                                className="input-group-text"
                                                style={{
                                                    borderTopRightRadius: 0,
                                                    borderBottomRightRadius: 0,
                                                }}
                                            >
                                                $
                                            </span>
                                        </span>
                                        <div className="d-flex flex-column">
                                            <input
                                                className="form-control"
                                                name="amount"
                                                id="amount"
                                                type="text"
                                                placeholder="0.00"
                                                style={{
                                                    borderTopLeftRadius: 0,
                                                    borderBottomLeftRadius: 0,
                                                }}
                                                value={
                                                    state.amount
                                                }
                                                onChange={
                                                    handleState
                                                }
                                            />
                                        </div>
                                        <div className="form-check mb-3 ms-4">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="defaultCheck1"
                                                name="taxChecker"
                                                onClick={e => taxCheckHandler(e)}
                                                checked={state.taxChecker === 1 ? true : false}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="defaultCheck1"
                                            >
                                                Tax included
                                            </label>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-3 d-flex align-items-center">
                                    <Col md={3}>
                                        <Label>
                                            Summary
                                        </Label>
                                    </Col>
                                    <Col md={9}>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Enter summary of financial activity"
                                            name="summary"
                                            onChange={handleState}
                                            value={state.summary}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-3 d-flex align-items-center">
                                    <Col md={3}>
                                    </Col>
                                    <Col md={9}>
                                        <div className="d-flex justify-content-end mt-3">
                                            <button
                                                className="btn btn-danger me-2"
                                                onClick={() => { window.history.back() }}
                                            >
                                                <i className="fas fa-times"></i> Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-info"
                                                onClick={handleSave}
                                            >
                                                <i className="fas fa-file-alt me-1"></i> Save
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={2}></Col>
                        </Row>
                    </CardBody>
                </Card>
            </Row>
        </Container>
    </div>
}

const mapStateToProps = gstate => {
    const { chartAccount_list_data, chartAccount_list_loading } = gstate.Portfolio;
    const { owner_fs_properties, owner_financial_activity_loading } = gstate.AccountsTransactions;
    return {
        owner_fs_properties, chartAccount_list_data, chartAccount_list_loading, owner_financial_activity_loading
    };
};

export default withRouter(
    connect(mapStateToProps, {
        ownerFolioSummaryProperties, getChartOfAccounts, OwnerFinancialAcitvityStore, OwnerFinancialAcitvityStoreFresh
    })(AddFinancialSummary)
);