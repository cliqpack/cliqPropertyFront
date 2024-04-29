import moment from "moment";
import React, { useEffect, useState } from "react";
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
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    FormText,
} from "reactstrap";
import { connect } from "react-redux";
import Select from "react-select";
import toastr from "toastr";
import { Link, useHistory, withRouter } from "react-router-dom";
import {
    propertyList, invoiceChartList, FolioReceiptAction, receipt_folio_list, transactionsList, FolioReceiptActionFresh
} from "store/actions";



const SaleReceiptModal = props => {
    const date = moment().format("yyyy-MM-DD");
    const [seen, setSeen] = useState(false);
    const [selected, setSelected] = useState(false);

    const [state, setState] = useState({ amount: '', description: '', type: 'Deposit', invoiceDate: date, pay_type: 'eft', chequeDetails: {}, chequeDetailsState: false, note: '', noteState: false, folio_id: '', invoiceChart: '', folio_type: '', property_id: '', contact_id: '' });
    console.log(state);
    const [dataState, setDataState] = useState(true);

    const [selectedType, setSelectedType] = useState();
    const [optionGroupType, setOptionGroupType] = useState([
        {
            options: [
                { label: "Owner", value: "1" },
                { label: "Supplier", value: "2" },
                // { label: "3", value: "Owner" },
            ],
        },
    ]);

    const [selectedInvoiceChart, setSelectedInvoiceChart] = useState(null);
    const [optionGroupInvoiceChart, setOptionGroupInvoiceChart] = useState([]);

    const [selectedFolio, setSelectedFolio] = useState(null);
    const [optionGroupFolio, setOptionGroupFolio] = useState([]);

    const handleState = e => {
        setState((prev) => { return { ...prev, [e.target.name]: e.target.value } })
    }
    const handleChequeDetails = e => {
        setState((prev) => { return { ...prev, chequeDetails: { ...prev.chequeDetails, [e.target.name]: e.target.value } } })
    }
    const handleSelectInvoiceChart = e => {
        setState(prev => ({ ...prev, invoiceChart: e.value }))
        setSelectedInvoiceChart(e);
    };

    const handleSelectFolio = e => {
        setState(prev => ({ ...prev, contact_id: e.contact_id, folio_id: e.value, property_id: e.property_id }))
        setSelectedFolio(e);
    };

    const handleSelectType = e => {
        setState(prev => ({ ...prev, folio_type: e.label, folio_id: '' }))
        setSelectedType(e);
        props.receipt_folio_list(e.value);
        setSelected(true);
    };

    const toggleBtn = (type) => {
        if (type === 'cheque') {
            setState(prev => { return { ...prev, pay_type: type, chequeDetailsState: true } });
        } else {
            setState(prev => { return { ...prev, pay_type: type, chequeDetailsState: false } });
        }
    }

    const handleSave = e => {
        e.preventDefault();
        if (state.folio_id === '') {
            toastr.warning(`Please select a ${state.folio_type} Folio first`);
        } else if (state.invoiceChart === '') {
            toastr.warning('Account is required');
        } else if (state.amount === '') {
            toastr.warning('Amount must be greater than 0');
        } else if (state.description === '') {
            toastr.warning('Description is required');
        } else {
            props.FolioReceiptAction(state);
        }
    }

    useEffect(() => {
        if (props.add_folio_receipt_loading === "Success") {
            toastr.success('Folio receipt generated');
            props.transactionsList();
            props.FolioReceiptActionFresh();
            props.toggle();
        }
        if (!seen) {
            props.invoiceChartList();
        }

        let option;
        if (props.receipt_folio_list_data && selected) {
            option = props.receipt_folio_list_data?.data.map(item => {
                if (selectedType.value === "1") {
                    return {
                        label: `${item.property.reference} - ${item.reference} - OWN00${item.owner_folio.id}`, value: item.owner_folio.id, contact_id: item.contact_id, property_id: item.property.id
                    }
                } else {
                    return {
                        label: `${item.reference} - SUP00${item.supplier_details.id}`, value: item.supplier_details.id, contact_id: item.contact_id
                    }
                }
            });
            setOptionGroupFolio(option);
        }
        let optionChart;
        if (props.invoice_chart_list_data) {
            optionChart = props.invoice_chart_list_data?.data.map(item => ({
                label: item.account_name, value: item.id,
            }));
            setOptionGroupInvoiceChart(optionChart);
        }
        setSeen(true);
    }, [
        props.receipt_folio_list_data,
        props.invoice_chart_list_loading,
        props.add_folio_receipt_loading,
    ]);

    return (
        <>
            <Modal isOpen={props.showModal} toggle={() => { props.toggle(); setDataState(true) }} size="lg">
                <ModalHeader toggle={() => { props.toggle(); setDataState(true) }}>
                    <span className="text-primary">New Folio Receipt</span>
                </ModalHeader>
                <ModalBody>
                    <Card>
                        <CardBody>
                            <Row className="mb-3">
                                <Col md={8}>
                                    <Row className="d-flex align-items-center">
                                        <Col md={2}>
                                            <b>Type</b>
                                        </Col>
                                        <Col md={10}>
                                            <Select
                                                value={selectedType}
                                                onChange={handleSelectType}
                                                options={optionGroupType}
                                                classNamePrefix="select2-selection"
                                                placeholder='Type'
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={4}>
                                    <Row className="d-flex align-items-center">
                                        <Col md={5}><b>Amount</b></Col>
                                        <Col md={7}>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="0.00৳"
                                                name="amount"
                                                onChange={handleState}
                                                value={state.amount}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={8}>
                                    <Row className="d-flex align-items-center">
                                        <Col md={2}>
                                            <b>Folio</b>
                                        </Col>
                                        <Col md={10}>
                                            <Select
                                                value={selectedFolio}
                                                onChange={handleSelectFolio}
                                                options={optionGroupFolio}
                                                classNamePrefix="select2-selection"
                                                placeholder='Folio'
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={8}>
                                    <Row className="d-flex align-items-center">
                                        <Col md={2}>
                                            <b>Account</b>
                                        </Col>
                                        <Col md={10}>
                                            <Select
                                                value={selectedInvoiceChart}
                                                onChange={handleSelectInvoiceChart}
                                                options={optionGroupInvoiceChart}
                                                classNamePrefix="select2-selection"
                                                placeholder='Account'
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={4}>
                                    <Row className="d-flex align-items-center">
                                        <Col md={5}><b>Date</b></Col>
                                        <Col md={7}>
                                            <input
                                                className="form-control"
                                                type="date"
                                                value={state.invoiceDate}
                                                id="example-date-input"
                                                name="invoiceDate"
                                                onChange={handleState}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={8}>
                                    <Row className="d-flex align-items-center">
                                        <Col md={2}>
                                            <b>From</b>
                                        </Col>
                                        <Col md={10}>
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={state.money_from}
                                                name="money_from"
                                                onChange={handleState}
                                                placeholder="Enter who this money come from?"
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={4}>
                                    <Row className="d-flex align-items-center">
                                        <div className="btn-group btn-group-justified">
                                            <Button
                                                color={
                                                    state.pay_type === 'cash'
                                                        ? "secondary"
                                                        : "light"
                                                }
                                                onClick={
                                                    () => toggleBtn('cash')
                                                }
                                                className='btn'
                                            >
                                                <span>
                                                    Cash
                                                </span>
                                            </Button>
                                            <Button
                                                color={
                                                    state.pay_type === 'cheque'
                                                        ? "secondary"
                                                        : "light"
                                                }
                                                onClick={
                                                    () => toggleBtn('cheque')
                                                }
                                                className='btn'
                                            >
                                                <span>
                                                    Cheque
                                                </span>
                                            </Button>
                                            <Button
                                                color={
                                                    state.pay_type === 'card'
                                                        ? "secondary"
                                                        : "light"
                                                }
                                                onClick={
                                                    () => toggleBtn('card')
                                                }
                                                className='btn'
                                            >
                                                <span>
                                                    Card
                                                </span>
                                            </Button>
                                            <Button
                                                color={
                                                    state.pay_type === 'eft'
                                                        ? "secondary"
                                                        : "light"
                                                }
                                                onClick={
                                                    () => toggleBtn('eft')
                                                }
                                                className='btn'
                                            >
                                                <span>
                                                    EFT
                                                </span>
                                            </Button>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    {
                        state.chequeDetailsState ?
                            <>
                                <ModalHeader>
                                    <span className="text-primary">Cheque Details</span>
                                </ModalHeader>
                                <Row>
                                    <Col lg={3}>
                                        <div className="mb-3">
                                            <Label htmlFor="formrow-InputCity">Drawer</Label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="formrow-InputCity"
                                                placeholder="Drawer"
                                                name="drawer"
                                                onChange={handleChequeDetails}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <div className="mb-3">
                                            <Label htmlFor="formrow-InputCity">Bank</Label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="formrow-InputCity"
                                                placeholder="Bank"
                                                name="bank"
                                                onChange={handleChequeDetails}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <div className="mb-3">
                                            <Label htmlFor="formrow-InputCity">Branch</Label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="formrow-InputCity"
                                                placeholder="Branch"
                                                name="branch"
                                                onChange={handleChequeDetails}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <div className="mb-3">
                                            <Label htmlFor="formrow-InputCity">Amount</Label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="formrow-InputCity"
                                                placeholder="0.00৳"
                                                name="amount"
                                                value={state.amount}
                                                onChange={handleState}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </>
                            : ''
                    }
                    <Row>
                        <Col md={3}><b>Allocate</b></Col>
                        <Col md={6}><b>Description</b></Col>
                        <Col md={3}>Amount</Col>
                    </Row>
                    <hr />
                    <Row className="d-flex align-items-center mb-3">
                        <Col md={3}>{state.type}</Col>
                        <Col md={6}>
                            <Input
                                type="text"
                                className="form-control"
                                id="formrow-InputCity"
                                name="description"
                                onChange={handleState}
                            />
                        </Col>
                        <Col md={3}>
                            <Input
                                type="text"
                                className="form-control"
                                id="formrow-InputCity"
                                placeholder="0.00৳"
                                name="amount"
                                value={state.amount}
                                onChange={handleState}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="defaultCheck1"
                                    name="taxCheckInvoice"
                                    onClick={() => setState(prev => ({ ...prev, noteState: !prev.noteState }))}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="defaultCheck1"
                                >
                                    Add note
                                </label>
                            </div>
                        </Col>
                        <Col md={6}>
                            {
                                state.noteState ?
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="formrow-InputCity"
                                        name="note"
                                        onChange={handleState}
                                    /> : ''
                            }
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-info me-2"
                            onClick={() => { props.toggle(); setDataState(true) }}>Close</button>
                        <button
                            type="submit"
                            className="btn btn-info"
                            onClick={handleSave}
                        >
                            <i className="fas fa-file-alt me-1"></i> Save
                        </button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    );
};

const mapStateToProps = gstate => {
    const {
        invoice_chart_list_data,
        invoice_chart_list_loading,
    } = gstate.Bills;

    const {
        receipt_folio_list_data,
        receipt_folio_list_loading,

        add_folio_receipt_loading,
    } = gstate.AccountsTransactions;

    return {
        add_folio_receipt_loading,

        invoice_chart_list_data,
        invoice_chart_list_loading,

        receipt_folio_list_data,
        receipt_folio_list_loading,
    };
};

export default withRouter(connect(mapStateToProps, {
    propertyList, invoiceChartList, FolioReceiptAction, receipt_folio_list, transactionsList, FolioReceiptActionFresh
})(SaleReceiptModal));
