import moment from "moment";
import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Col,
    Row,
    Label,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { connect } from "react-redux";
import Select from "react-select";
import toastr from "toastr";
import { withRouter } from "react-router-dom";
import {
    propertyList, invoiceChartList, FolioReceiptAction, receipt_folio_list, transactionsList, FolioReceiptActionFresh
} from "store/actions";
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import Loder from "components/Loder/Loder";
import ReactAsyncSelectComp from "components/Common/ReactAsyncSelectComp";

const FolioReceipt = props => {
    const date = moment().format("yyyy-MM-DD");
    const [seen, setSeen] = useState(false);
    const [selected, setSelected] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [state, setState] = useState({ amount: '', description: '', type: 'Deposit', invoiceDate: date, pay_type: 'eft', chequeDetails: {}, chequeDetailsState: false, note: '', noteState: false, folio_id: '', invoiceChart: '', folio_type: '', property_id: '', contact_id: '' });
    const [dataState, setDataState] = useState(true);

    const [selectedType, setSelectedType] = useState();
    const [optionGroupType, setOptionGroupType] = useState([
        {
            options: [
                { label: "Owner", value: "1" },
                { label: "Supplier", value: "2" },
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
    const handleAmount = e => {
        setState((prev) => { return { ...prev, [e.target.name]: Number(e.target.value) ? e.target.value : '' } })
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
        setSelectedType(e);
        // props.receipt_folio_list(e.value);
        setSelected(true);
        if (selectedType !== e) {
            setState(prev => ({ ...prev, contact_id: "", folio_id: "", folio_type: e.label, property_id: "" }))
            setSelectedFolio(null);
        } else setState(prev => ({ ...prev, folio_type: e.label, folio_id: '' }))
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
        } else if (state.amount < 0) {
            toastr.warning('Amount cannot be less then 0');
        } else if (state.description === '') {
            toastr.warning('Description is required');
        } else {
            setShowModal(true);
            props.FolioReceiptAction(state);
        }
    }

    useEffect(() => {
        if (props.add_folio_receipt_loading === "Success") {
            toastr.success('Folio receipt generated');
            props.transactionsList();
            props.FolioReceiptActionFresh();
            setShowModal(false);
            props.toggle();
        }
        if (!seen) {
            props.invoiceChartList();
        }

        let optionChart;
        if (props.invoice_chart_list_data) {
            optionChart = props.invoice_chart_list_data?.data.map(item => ({
                label: item.account_number + ' - ' + item.account_name, value: item.id,
            }));
            setOptionGroupInvoiceChart(optionChart);
        }
        setSeen(true);
    }, [
        props.receipt_folio_list_data,
        props.invoice_chart_list_loading,
        props.add_folio_receipt_loading,
    ]);

    const dateHandler = (selectedDates, dateStr, instance) => {
        setState({ ...state, ['invoiceDate']: dateStr });
    }

    const tenantDetails = async (e) => {
        setState(prev => ({ ...prev, contact_id: e.contact_id, folio_id: e.value, property_id: e.property_id }))
        setSelectedFolio(e);
    }

    const returnSelectObject = (item) => {
        if (selectedType.value === "1") {
            return {
                label: `${item?.owner_contacts?.reference} (${item?.folio_code})`, value: item?.id, contact_id: item?.owner_contacts?.contact_id
            }
        } else {
            return {
                label: `${item?.reference} - ${item?.supplier_details?.folio_code}`, value: item?.supplier_details?.id, contact_id: item?.contact_id
            }
        }
    }

    let asyncSelect = <ReactAsyncSelectComp
        url={`${process.env.REACT_APP_LOCALHOST}/get-all-receipt-folios/${selectedType?.value}?q=`}
        handler={tenantDetails}
        returnSelectObject={returnSelectObject}
        placeholder={selectedType?.value === '1' ? 'Owner folio' : 'Supplier folio'}
    />

    return (
        <>
            <Modal isOpen={props.showModal} toggle={() => { props.toggle(); setDataState(true) }} size="lg">
                {showModal && <Loder status={showModal} />}
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
                                            <div className="d-flex">
                                                <div className="d-flex flex-column">
                                                    <Input
                                                        name="amount"
                                                        type="text"
                                                        placeholder="0.00"
                                                        className="rounded-end form-control"
                                                        style={{
                                                            borderTopRightRadius: 0,
                                                            borderBottomRightRadius: 0,
                                                        }}
                                                        id="formrow-InputCity"
                                                        value={
                                                            state.amount
                                                        }
                                                        onChange={
                                                            handleAmount
                                                        }
                                                    />
                                                </div>
                                                <span className="input-group-append rounded-start">
                                                    <span
                                                        className="input-group-text"
                                                        style={{
                                                            borderTopLeftRadius: 0,
                                                            borderBottomLeftRadius: 0,
                                                        }}
                                                    >
                                                        ৳
                                                    </span>
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {
                                (selectedType?.value === '1' || selectedType?.value === '2') &&
                                <Row className="mb-3">
                                    <Col md={8}>
                                        <Row className="d-flex align-items-center">
                                            <Col md={2}>
                                                <b>
                                                    {
                                                        selectedType?.value === '1' ? 'Owner ' : 'Supplier '
                                                    }
                                                    Folio
                                                </b>
                                            </Col>
                                            <Col md={10}>
                                                {
                                                    selectedType?.value === '1' && asyncSelect
                                                }
                                                {
                                                    selectedType?.value === '2' && asyncSelect
                                                }
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            }


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
                                        <Col md={4}><b>Date</b></Col>
                                        <Col md={8}>
                                            {/* <input
                                                type="date"
                                                data-date={moment(
                                                    state.invoiceDate
                                                ).format(
                                                    "DD/MM/YYYY"
                                                )}
                                                id="date-format-change-to"
                                                value={
                                                    state.invoiceDate
                                                }
                                                name="invoiceDate"
                                                onChange={handleState}

                                            /> */}
                                            <Flatpickr
                                                className="form-control"
                                                placeholder="Pick a date..."
                                                value={state.invoiceDate}
                                                options={{
                                                    altInput: true,
                                                    format: "d/m/Y",
                                                    altFormat: "d/m/Y",
                                                    onChange: dateHandler
                                                }}
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
                                            {/* <Input
                                                type="text"
                                                className="form-control"
                                                id="formrow-InputCity"
                                                placeholder="$0.00"
                                                name="amount"
                                                value={state.amount}
                                                onChange={handleState}
                                            /> */}
                                            <div className="d-flex">
                                                <div className="d-flex flex-column">
                                                    <Input
                                                        name="amount"
                                                        type="text"
                                                        placeholder="0.00"
                                                        className="rounded-end form-control"
                                                        style={{
                                                            borderTopRightRadius: 0,
                                                            borderBottomRightRadius: 0,
                                                        }}
                                                        id="formrow-InputCity"
                                                        value={
                                                            state.amount
                                                        }
                                                        onChange={
                                                            handleAmount
                                                        }
                                                    />
                                                </div>
                                                <span className="input-group-append rounded-start">
                                                    <span
                                                        className="input-group-text"
                                                        style={{
                                                            borderTopLeftRadius: 0,
                                                            borderBottomLeftRadius: 0,
                                                        }}
                                                    >
                                                        ৳
                                                    </span>
                                                </span>
                                            </div>
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
                            <div className="d-flex">
                                <div className="d-flex flex-column">
                                    <Input
                                        name="amount"
                                        type="text"
                                        placeholder="0.00"
                                        className="rounded-end form-control"
                                        style={{
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                        }}
                                        id="formrow-InputCity2"
                                        value={
                                            state.amount
                                        }
                                        onChange={
                                            handleAmount
                                        }
                                    />
                                </div>
                                <span className="input-group-append rounded-start">
                                    <span
                                        className="input-group-text"
                                        style={{
                                            borderTopLeftRadius: 0,
                                            borderBottomLeftRadius: 0,
                                        }}
                                    >
                                        ৳
                                    </span>
                                </span>
                            </div>
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
                            className="btn btn-danger me-2"
                            onClick={() => { props.toggle(); setDataState(true) }}><i className="fas fa-times"></i> Close</button>
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
})(FolioReceipt));
