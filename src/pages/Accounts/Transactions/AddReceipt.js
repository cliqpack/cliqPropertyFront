import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Col,
    Row,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Table,
    Alert
} from "reactstrap";
import { invoiceChartList, tenantInformation, addInvoices, addTenantReceiptFresh, transactionsList, transactionsListFresh, receipt_folio_list, reconcileBankFile } from "store/actions";
import { connect } from "react-redux";
import Select from "react-select"
import toastr from "toastr";
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import Loder from "components/Loder/Loder";
import ReactAsyncSelectComp from "components/Common/ReactAsyncSelectComp";
const AddReceipt = (props) => {
    const [state, setState] = useState({ "method": "eft", total_amount: props.amount ? props.amount : '', total_allocated_amount: props.amount ? props.amount : '', rent_amount: props.amount ? props.amount : '', selectedFolio: props.selectedFolio ? props.selectedFolio : '', bank_data_id: props.bank_data_id ? props.bank_data_id : '', loader: false, deposit_description: '', bond_amount: '', deposit_amount: '', supplier_receipt: {}, invoices: [] });
    const [checkboxState, setCheckboxState] = useState({
        supplier_receipt: false,
        supplier_state: true,
        rent_credit_state: false,
        print_invoice: false,
        receipt_note_state: false,
    });
    const [selectedFolio, setSelectedFolio] = useState(null);
    const [tenantSelectedFolio, setTenantSelectedFolio] = useState({ label: props.label ? props.label : '', value: props.value ? props.value : '' });
    const [optionGroupFolio, setOptionGroupFolio] = useState([]);
    const [selectedInvoiceChart, setSelectedInvoiceChart] = useState(null);
    const [optionGroupInvoiceChart, setOptionGroupInvoiceChart] = useState([]);
    const tenantDetails = async (e) => {
        props.tenantInformation(e.value);
        setTenantSelectedFolio({ label: e.label, value: e.value });
        await setState(prev => ({ ...prev, "selectedFolio": e.value }))
    }
    const [cashBtn, setCashBtn] = useState(false);
    const [cardBtn, setCardBtn] = useState(false);
    const [eftBtn, setEftBtn] = useState(true);
    const [chequeBtn, setChequeBth] = useState(false);
    const handleSelectFolio = e => {
        setState(prev => ({ ...prev, supplier_receipt: { ...prev.supplier_receipt, supplier_folio: e.value } }));
        setSelectedFolio(e);
    };
    const handleSelectInvoiceChart = e => {
        setState(prev => ({ ...prev, supplier_receipt: { ...prev.supplier_receipt, supplier_account: e.value } }));
        setSelectedInvoiceChart(e);
    };
    const toggleCashBtn = () => {
        setCashBtn(true);
        setCardBtn(false);
        setEftBtn(false);
        setChequeBth(false);
        setState(prev => ({ ...prev, "method": "cash" }));
    };
    const toggleCardBtn = () => {
        setCardBtn(true);
        setCashBtn(false);
        setEftBtn(false);
        setChequeBth(false);
        setState(prev => ({ ...prev, "method": "card" }));
    };
    const toggleEftBtn = () => {
        setEftBtn(true);
        setCardBtn(false);
        setCashBtn(false);
        setChequeBth(false);
        setState(prev => ({ ...prev, "method": "eft" }));
    };
    const toggleChequeBtn = () => {
        setEftBtn(false);
        setCardBtn(false);
        setCashBtn(false);
        setChequeBth(true);
        setState(prev => ({ ...prev, "method": "cheque" }));
    };
    const amountCalculation = (name, value) => {
        let total = state.total_amount, bond = state.bond_amount ? state.bond_amount : 0, rent = state.rent_amount ? state.rent_amount : 0, invoices = state.invoices ? state.invoices : [], deposit = state.deposit_amount ? state.deposit_amount : 0, supplier = state.supplier_receipt?.supplier_amount ? state.supplier_receipt?.supplier_amount : 0, r, total_allocated_amount = state.total_allocated_amount ? +state.total_allocated_amount : 0;
        let totalInvoiceAmount = 0;
        invoices.forEach(element => {
            totalInvoiceAmount += +element.value;
        });
        let obj = { bond, rent, invoices, deposit, supplier, total_allocated_amount };
        if (name === 'rent_amount') {
            obj = {
                ...obj,
                rent: +value,
                total_allocated_amount: (obj.total_allocated_amount + +value) - rent,
            }
        } else if (name === 'bond_amount') {
            if (+value > 0) {
                r = +total - (+value + +totalInvoiceAmount + +deposit + +supplier);
                obj = { ...obj, bond: +value, rent: r <= 0 ? '' : r, total_allocated_amount: (r <= 0 ? 0 : +r) + +value + +totalInvoiceAmount + +deposit + +supplier };
            } else {
                r = +total - (+totalInvoiceAmount + +deposit + +supplier)
                obj = { ...obj, bond: '', rent: r <= 0 ? '' : r };
            }
        } else if (name === 'deposit_amount') {
            if (+value > 0) {
                r = +total - (+value + +totalInvoiceAmount + +bond + +supplier);
                obj = { ...obj, deposit: +value, rent: r <= 0 ? '' : r, total_allocated_amount: (r <= 0 ? 0 : +r) + +value + +totalInvoiceAmount + +bond + +supplier };
            } else {
                r = +total - (+totalInvoiceAmount + +bond + +supplier);
                obj = { ...obj, deposit: '', rent: r <= 0 ? '' : r };
            }
        } else if (name === 'supplier_amount') {
            if (+value > 0) {
                r = +total - (+value + +totalInvoiceAmount + +bond + +deposit);
                obj = { ...obj, rent: r <= 0 ? '' : r, total_allocated_amount: (r <= 0 ? 0 : +r) + +value + +totalInvoiceAmount + +bond + +deposit };
            } else {
                r = +total - (+totalInvoiceAmount + +bond + +deposit);
                obj = { ...obj, supplier: '', rent: r <= 0 ? '' : r };
            }
        }
        return obj;
    }
    const amountCalculationWithInvoices = (invoices) => {
        let total = state.total_amount, rent_amount = state.rent_amount ? state.rent_amount : 0, bond = state.bond_amount ? state.bond_amount : 0, deposit = state.deposit_amount ? state.deposit_amount : 0, rent, supplier = state.supplier_receipt?.supplier_amount ? state.supplier_receipt?.supplier_amount : 0, total_allocated_amount = state.total_allocated_amount ? +state.total_allocated_amount : 0, totalAlloc;
        let totalInvoiceAmount = 0;
        invoices.forEach(element => {
            totalInvoiceAmount += +element.value;
        });
        if (+totalInvoiceAmount > 0) {
            if (+totalInvoiceAmount > +rent_amount && +rent_amount > 0) {
                rent = '';
                totalAlloc = +totalInvoiceAmount + +deposit + +bond + +supplier;
            } else {
                rent = +total - (+totalInvoiceAmount + +deposit + +bond + +supplier);
                rent = rent > 0 ? rent : '';
                totalAlloc = +totalInvoiceAmount + +deposit + +bond + +supplier + (rent > 0 ? +rent : 0);
            }
        } else {
            rent = +total - (+deposit + +bond + +supplier);
            rent = rent > 0 ? rent : '';
            totalAlloc = +deposit + +bond + +supplier + (rent > 0 ? +rent : 0);
        }
        return { rent, totalAlloc };
    }
    const handleDepositDescription = (e) => {
        setState(prev => ({ ...prev, deposit_description: e.target.value }))
    }
    const handleInputChange = (e) => {
        let val = {};
        if (e.target.name === 'total_amount') {
            let data = state
            let supplier_receipt = {}
            let invoices = [];
            if (data.supplier_receipt?.supplier_amount) {
                supplier_receipt = { ...data.supplier_receipt, supplier_amount: '' }
            }
            if (data.invoices.length > 0) {
                invoices = data.invoices.map(item => {
                    return {
                        ...item,
                        value: ''
                    }
                })
            }
            setState(prev => ({ ...prev, [e.target.name]: Number(e.target.value) ? e.target.value : '', rent_amount: Number(e.target.value) ? e.target.value : '', cheque_amount: Number(e.target.value) ? e.target.value : '', total_allocated_amount: Number(e.target.value) ? e.target.value : '', bond_amount: '', deposit_amount: '', supplier_receipt, invoices }));
        } else if (e.target.name === 'bond_amount') {
            // if (Number(e.target.value) || e.target.value === '') {
            val = amountCalculation(e.target.name, e.target.value);
            setState(prev => ({ ...prev, [e.target.name]: val.bond, rent_amount: val.rent, total_allocated_amount: val.total_allocated_amount }));
            // } else { setState(prev => ({ ...prev, [e.target.name]: '' })); }
        } else if (e.target.name === 'deposit_amount') {
            val = amountCalculation(e.target.name, e.target.value);
            setState(prev => ({ ...prev, [e.target.name]: val.deposit, rent_amount: val.rent, total_allocated_amount: val.total_allocated_amount }));
        } else if (e.target.name === 'rent_amount') {
            val = amountCalculation(e.target.name, e.target.value);
            setState(prev => ({ ...prev, [e.target.name]: val.rent ? val.rent : '', total_allocated_amount: val.total_allocated_amount }));
        } else {
            setState(prev => ({ ...prev, [e.target.name]: Number(e.target.value) ? e.target.value : '' }));
        }
    }
    const dateHandler = (selectedDates, dateStr, instance) => {
        setState(prev => ({ ...prev, ['receipt_date']: dateStr }));
    }
    const handleSupplierData = (e) => {
        let val = amountCalculation(e.target.name, e.target.value);
        setState(prev => ({ ...prev, rent_amount: val.rent, supplier_receipt: { ...prev.supplier_receipt, [e.target.name]: e.target.value } }));
    }
    const handleInputChangeInvoices = async (e, index, details, chart_of_account_id, taxAmount) => {
        let invoices = state.invoices ? state.invoices : [];
        let matchedIndex = undefined;
        let rent, total;
        await invoices.map((item, index2) => {
            if (item.index == index) {
                matchedIndex = index2;
            }
        })
        if (matchedIndex != undefined) {
            invoices[matchedIndex] = { "index": index, "value": e.target.value, "details": details, 'chart_of_account_id': chart_of_account_id, 'taxAmount': taxAmount };
            const val = amountCalculationWithInvoices(invoices);
            rent = val.rent;
            total = val.totalAlloc;
        }
        else {
            invoices.push({ "index": index, "value": e.target.value, "details": details, 'chart_of_account_id': chart_of_account_id, 'taxAmount': taxAmount });
            const val = amountCalculationWithInvoices(invoices);
            rent = val.rent;
            total = val.totalAlloc;
        }
        await setState(prev => ({ ...prev, "invoices": invoices, rent_amount: rent, total_allocated_amount: total }));
    }
    const returnSelectObject = (item) => ({
        label: item.tenant_contact?.reference + ` (${item.tenant_contact?.tenant_folio?.folio_code})` + "--" + item.tenant_contact?.property?.reference, value: item.id,
    });
    let date1 = new Date(props.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.paid_to);
    var date2 = new Date();
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
    var Difference_In_Days = parseInt(Difference_In_Time / (1000 * 3600 * 24));
    const endLoader = () => setState(prev => ({ ...prev, loader: false }));
    useEffect(() => {
        if (props.add_tenant_receipt_loading === 'Success') {
            toastr.success('Success');
            props.transactionsList("this_month");
            props.transactionsListFresh();
            if (checkboxState.print_invoice) {
                const win = window.open(`/printRecieptTransaction/${props.add_tenant_receipt_data?.receipt_id}`, "_blank");
                win.focus();
                // history.push(`/printRecieptTransaction/${props.add_tenant_receipt_data?.receipt_id}`);
            }
            props.addTenantReceiptFresh();
            if (props.bank_data_id) {
                props.reconcileBankFile();
            }
            endLoader();
            props.toggle();
        }
        if (props.add_tenant_receipt_loading === 'Failed') {
            toastr.warning('Something went wrong !');
            props.transactionsListFresh();
            props.addTenantReceiptFresh();
            endLoader();
            props.toggle();
        }
        setState(prev => ({ ...prev, "deposit_description": props.tenant_info_data ? props.tenant_info_data.tenantContact.reference : null }))
        if (checkboxState.supplier_receipt && checkboxState.supplier_state) {
            props.receipt_folio_list(2);
            props.invoiceChartList();
        }
        let optionSupplier;
        if (props.receipt_folio_list_data && checkboxState.supplier_state) {
            optionSupplier = props.receipt_folio_list_data?.data.map(item => {
                return {
                    label: `${item.reference} - ${item.supplier_details?.folio_code}`, value: item.supplier_details?.id, contact_id: item.contact_id
                }
            });
            setOptionGroupFolio(optionSupplier);
            setCheckboxState(prev => ({ ...prev, supplier_state: false }));
        }
        let optionChart;
        if (props.invoice_chart_list_data) {
            optionChart = props.invoice_chart_list_data?.data.map(item => ({
                label: `${item.account_number} - ${item.account_name}`, value: item.id,
            }));
            setOptionGroupInvoiceChart(optionChart);
        }
    }, [props.tenant_info_data, props.add_tenant_receipt_loading, checkboxState.supplier_receipt, props.receipt_folio_list_data, props.invoice_chart_list_data]);
    const saveReceiptData = async () => {
        await setState(prev => ({ ...prev, "details": props?.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.rent + " " + props?.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.rent_type, loader: true }))
        props.addInvoices(state);
    }

    const handleSupplierReceipt = () => {
        let rent_amount = +state.rent_amount + (state.supplier_receipt?.supplier_amount ? +state.supplier_receipt?.supplier_amount : 0);
        setState(prev => ({ ...prev, supplier_receipt: {}, rent_amount: rent_amount }));
        setCheckboxState(prev => ({ ...prev, supplier_receipt: !prev.supplier_receipt, supplier_state: true }))
    }
    return (
        <>
            {state.loader && <Loder status={state.loader} />}
            <Modal isOpen={props.showModal} scrollable={true} size="xl">
                <ModalHeader >
                    <i className="fas fa-dollar-sign font-size-16 me-1 text-primary"></i>
                    <span className="text-primary">New Receipt</span>
                </ModalHeader>
                <ModalBody>
                    <div>
                        <Card>
                            <CardBody>
                                <Row >
                                    <Col md="6" >
                                        <Row className="pb-3 border-bottom border-2">
                                            <label className="col-sm-4">Folio</label>
                                            <div className="col-sm-8">
                                                <ReactAsyncSelectComp
                                                    url={`${process.env.REACT_APP_LOCALHOST}/account/tenant-folio-list?q=`}
                                                    handler={tenantDetails}
                                                    returnSelectObject={returnSelectObject}
                                                    placeholder='Tenant folio'
                                                />
                                            </div>
                                        </Row>
                                        <Row className="pb-3 border-bottom border-2">
                                            <label className="col-sm-4">Owner</label>
                                            <div className="col-sm-8"><p>{props.tenant_info_data ? props.tenant_info_data.tenantContact?.current_owner?.reference : null}</p></div>
                                        </Row>
                                        <Row className="pb-3 border-bottom border-2">
                                            <label className="col-sm-4">Property</label>
                                            <div className="col-sm-8"><p>{props.tenant_info_data ? props.tenant_info_data.tenantContact.reference : null}</p></div>
                                        </Row>
                                        <Row className="pb-3 border-bottom border-2">
                                            <label className="col-sm-4">Details</label>
                                            <div className="col-sm-8"><p>{props?.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.rent}৳ {props?.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.rent_type}</p></div>
                                        </Row>
                                        {
                                            (!props.bank_data_id && props?.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.deposit) &&
                                            <Row className="pb-3 border-bottom border-2 mt-1">
                                                <label className="col-sm-4">Deposited</label>
                                                <div className="col-sm-3"><p>{props?.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.deposit ? props?.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.deposit : '0.00'}৳</p></div>
                                                <div className="col-sm-5">
                                                    <Button className="btn btn-sm" color="secondary" onClick={props.toggleDepositModal}>
                                                        Transfer Deposit <i className="fas fa-arrow-right"></i>
                                                    </Button>
                                                </div>
                                            </Row>
                                        }
                                    </Col>
                                    <Col md="6">
                                        <Row className="pb-3">
                                            <label className="col-sm-4">Amount</label>
                                            <Col
                                                md={6}
                                                className="d-flex"
                                            >
                                                <div className="d-flex flex-column">
                                                    <Input
                                                        value={state.total_amount}
                                                        onChange={handleInputChange}
                                                        name="total_amount"
                                                        className="form-control"
                                                        classNamePrefix="select2-selection"
                                                        placeholder='0.00৳'
                                                        disabled={props.amount ? true : false}
                                                        style={{
                                                            borderTopRightRadius: 0,
                                                            borderBottomRightRadius: 0,
                                                        }}
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
                                            </Col>
                                        </Row>
                                        <Row className="pb-3">
                                            <label className="col-sm-4">Date</label>
                                            <div className="col-sm-6">
                                                <Flatpickr
                                                    className="form-control d-block"
                                                    placeholder="Pick a date..."
                                                    value={state.receipt_date}
                                                    options={{
                                                        altInput: true,
                                                        format: "d/m/Y",
                                                        altFormat: "d/m/Y",
                                                        onChange: dateHandler
                                                    }}
                                                />
                                            </div>
                                        </Row>
                                        <Row className="pb-3">
                                            <label className="col-sm-4">Method</label>
                                            <div className="btn-group btn-group-justified col-sm-8">
                                                <div className="btn-group">
                                                    <Button
                                                        className="btn btn-sm"
                                                        color={
                                                            cashBtn
                                                                ? "secondary"
                                                                : "light"
                                                        }
                                                        onClick={(e) => {
                                                            toggleCashBtn(e)

                                                        }}
                                                    >
                                                        {cashBtn ? (
                                                            <i className="bx bx-comment-check"></i>
                                                        ) : null}


                                                        <span>
                                                            {" "}
                                                            Cash
                                                        </span>
                                                    </Button>
                                                </div>
                                                <div className="btn-group">
                                                    <Button
                                                        className="btn btn-sm"
                                                        color={
                                                            cardBtn
                                                                ? "secondary"
                                                                : "light"
                                                        }
                                                        onClick={(e) => {
                                                            toggleCardBtn(e)

                                                        }}
                                                    >
                                                        {cardBtn ? (
                                                            <i className="bx bx-comment-check"></i>
                                                        ) : null}
                                                        <span>
                                                            {" "}
                                                            Card
                                                        </span>
                                                    </Button>
                                                </div>
                                                <div className="btn-group">
                                                    <Button
                                                        className="btn btn-sm"
                                                        color={
                                                            chequeBtn
                                                                ? "secondary"
                                                                : "light"
                                                        }
                                                        onClick={(e) => {
                                                            toggleChequeBtn(e)

                                                        }}
                                                    >
                                                        {chequeBtn ? (
                                                            <i className="bx bx-comment-check"></i>
                                                        ) : null}
                                                        <span>
                                                            {" "}
                                                            Cheque
                                                        </span>
                                                    </Button>
                                                </div>
                                                <div className="btn-group">
                                                    <Button
                                                        className="btn btn-sm"
                                                        color={
                                                            eftBtn
                                                                ? "secondary"
                                                                : "light"
                                                        }
                                                        onClick={(e) => {
                                                            toggleEftBtn(e)

                                                        }}
                                                    >
                                                        {eftBtn ? (
                                                            <i className="bx bx-comment-check"></i>
                                                        ) : null}
                                                        <span>
                                                            {" "}
                                                            EFT
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </Row>
                                    </Col>
                                    {
                                        props?.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.receipt_warning &&
                                        <Col md="12">
                                            <Alert color="warning">
                                                <i className="fas fa-exclamation-triangle"></i> {props?.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.receipt_warning}
                                            </Alert>
                                        </Col>
                                    }
                                    {
                                        props.tenant_info_data?.rentManagement?.rent_adjustment?.rent_amount &&
                                        <Col md="12">
                                            <Alert color="info">
                                                <i className="fas fa-exclamation-circle"></i> Rent increases to {props.tenant_info_data?.rentManagement?.rent_adjustment?.rent_amount}৳ on {props.tenant_info_data?.rentManagement?.rent_adjustment?.active_date}
                                            </Alert>
                                        </Col>
                                    }
                                    {
                                        props.tenant_info_data?.rentManagement?.rent_discount?.discount_amount > 0 &&
                                        <Col md="12">
                                            <Alert color="info">
                                                <i className="fas fa-exclamation-circle"></i> Rent discount of {props.tenant_info_data?.rentManagement?.rent_discount?.discount_amount}৳ will be applied from {props.tenant_info_data?.rentManagement?.from_date}
                                            </Alert>
                                        </Col>
                                    }
                                </Row>
                                {
                                    chequeBtn ? <Row className="mt-3 mb-3">
                                        <h3>Cheque Details</h3>
                                        <Col md="3" >
                                            <Input
                                                onChange={handleInputChange}
                                                name="cheque_drawer"
                                                className="col-sm-8 "
                                                classNamePrefix="select2-selection"
                                                placeholder='Drawer'
                                            />
                                        </Col>
                                        <Col md="3" >
                                            <Input
                                                onChange={handleInputChange}
                                                name="cheque_bank"
                                                className="col-sm-8 "
                                                classNamePrefix="select2-selection"
                                                placeholder='Bank'
                                            />
                                        </Col>
                                        <Col md="3" >
                                            <Input
                                                onChange={handleInputChange}
                                                name="cheque_branch"
                                                className="col-sm-8 "
                                                classNamePrefix="select2-selection"
                                                placeholder='Branch'
                                            />
                                        </Col>
                                        <Col md="3" >
                                            <div
                                                className="d-flex"
                                            >
                                                <div className="d-flex flex-column">
                                                    <Input
                                                        className="form-control "
                                                        type="text"
                                                        name="cheque_amount"
                                                        onChange={handleInputChange}
                                                        value={state.cheque_amount}
                                                        style={{
                                                            borderTopRightRadius: 0,
                                                            borderBottomRightRadius: 0,
                                                        }}
                                                        placeholder='0.00'
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
                                    </Row> :
                                        null
                                }
                                <Row >
                                    <Table className="table mb-2">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Allocation</th>
                                                <th>Due</th>
                                                <th>Description</th>
                                                <th >Amount Due</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        {
                                            props.tenant_info_data ?
                                                <tbody>
                                                    <tr>
                                                        <td>Rent
                                                        </td>
                                                        <td>{props.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.paid_to}</td>
                                                        <td>{props.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.part_paid_description}</td>
                                                        <td>{Difference_In_Days > 0 && Difference_In_Days + ' Days'}</td>
                                                        <td>
                                                            <div
                                                                className="d-flex"
                                                            >
                                                                <div className="d-flex flex-column">
                                                                    <Input
                                                                        className="form-control "
                                                                        type="text"
                                                                        name="rent_amount"
                                                                        onChange={e => handleInputChange(e)}
                                                                        value={state.rent_amount}
                                                                        style={{
                                                                            borderTopRightRadius: 0,
                                                                            borderBottomRightRadius: 0,
                                                                        }}
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
                                                        </td>
                                                    </tr>
                                                    {
                                                        checkboxState.rent_credit_state &&
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td>Rent credit</td>
                                                            <td>
                                                                <div className="form-check mb-3">
                                                                    {/* <label
                                                                        className="form-check-label"
                                                                        htmlFor="defaultCheck5"
                                                                    >
                                                                        include in owner fees
                                                                    </label>
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        id="defaultCheck5"
                                                                        name="rent_credit"
                                                                    /> */}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div
                                                                    className="d-flex"
                                                                >
                                                                    <div className="d-flex flex-column">
                                                                        <Input
                                                                            className="form-control "
                                                                            type="text"
                                                                            name="rent_credit"
                                                                            value={state.rent_credit}
                                                                            onChange={e => handleInputChange(e)}
                                                                            style={{
                                                                                borderTopRightRadius: 0,
                                                                                borderBottomRightRadius: 0,
                                                                            }}
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
                                                            </td>
                                                        </tr>
                                                    }
                                                    {
                                                        !props.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.bond_cleared_date &&
                                                        <tr>
                                                            <td>Bond</td>
                                                            <td>{props.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.bond_due_date}</td>
                                                            <td>{props.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.bond_part_paid_description}</td>
                                                            <td>{props.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.bond_required - (props.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.bond_held ? props.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.bond_held : 0)}৳</td>
                                                            <td>
                                                                <div
                                                                    className="d-flex"
                                                                >
                                                                    <div className="d-flex flex-column">
                                                                        <Input
                                                                            className="form-control "
                                                                            type="text"
                                                                            value={state.bond_amount}
                                                                            name="bond_amount"
                                                                            onChange={e => handleInputChange(e)}
                                                                            style={{
                                                                                borderTopRightRadius: 0,
                                                                                borderBottomRightRadius: 0,
                                                                            }}
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
                                                            </td>
                                                        </tr>
                                                    }
                                                    {
                                                        props.tenant_info_data.tenantContact.invoices.map((item, index) => {
                                                            return (
                                                                <tr key={item.id}>
                                                                    <td>Invoices</td>
                                                                    <td>{item.invoice_billing_date}</td>
                                                                    <td>{item.details}</td>
                                                                    <td>{item.paid === 0 ? item.amount : item.amount - item.paid}৳</td>
                                                                    <td>
                                                                        <div
                                                                            className="d-flex"
                                                                        >
                                                                            <div className="d-flex flex-column">
                                                                                <Input
                                                                                    className="form-control "
                                                                                    type="text"
                                                                                    name="invoices_amount"
                                                                                    // value={ state.invoices[index]?.value }
                                                                                    onChange={e => handleInputChangeInvoices(e, item.id, item.details, item.chart_of_account_id, item.taxAmount)}
                                                                                    style={{
                                                                                        borderTopRightRadius: 0,
                                                                                        borderBottomRightRadius: 0,
                                                                                    }}
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
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    <tr>
                                                        <td>Deposit</td>
                                                        <td></td>
                                                        <td>
                                                            <Input
                                                                className="form-control w-75"
                                                                type="text"
                                                                name="deposit_description"
                                                                value={state.deposit_description}
                                                                onChange={handleDepositDescription}

                                                            />
                                                        </td>
                                                        <td></td>
                                                        <td>
                                                            <div
                                                                className="d-flex"
                                                            >
                                                                <div className="d-flex flex-column">
                                                                    <Input
                                                                        className="form-control "
                                                                        type="text"
                                                                        name="deposit_amount"
                                                                        value={state.deposit_amount}
                                                                        onChange={e => handleInputChange(e)}
                                                                        style={{
                                                                            borderTopRightRadius: 0,
                                                                            borderBottomRightRadius: 0,
                                                                        }}
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
                                                        </td>
                                                    </tr>
                                                    {
                                                        checkboxState.supplier_receipt &&
                                                        <tr>
                                                            <td colSpan={2}>
                                                                <Select
                                                                    value={selectedFolio}
                                                                    onChange={handleSelectFolio}
                                                                    options={optionGroupFolio}
                                                                    classNamePrefix="select2-selection"
                                                                    placeholder='Supplier folio'
                                                                />
                                                            </td>
                                                            <td>
                                                                <Input
                                                                    name="description"
                                                                    // onChange={handleInputChange}
                                                                    type="text"
                                                                    className="form-control w-75"
                                                                    placeholder='Description'
                                                                    onChange={handleSupplierData}
                                                                />
                                                            </td>
                                                            <td>
                                                                <div style={{ width: '200px' }}>
                                                                    <Select
                                                                        value={selectedInvoiceChart}
                                                                        onChange={handleSelectInvoiceChart}
                                                                        options={optionGroupInvoiceChart}
                                                                        classNamePrefix="select2-selection"
                                                                        placeholder='Account'
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div
                                                                    className="d-flex"
                                                                >
                                                                    <div className="d-flex flex-column">
                                                                        <Input
                                                                            className="form-control "
                                                                            type="text"
                                                                            value={state?.supplier_receipt?.supplier_amount}
                                                                            name="supplier_amount"
                                                                            onChange={handleSupplierData}
                                                                            style={{
                                                                                borderTopRightRadius: 0,
                                                                                borderBottomRightRadius: 0,
                                                                            }}
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
                                                            </td>
                                                        </tr>
                                                    }
                                                </tbody>
                                                :
                                                null
                                        }
                                    </Table>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                    <Row>
                        <Col>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="defaultCheck4"
                                    name="rent_credit"
                                    onClick={() => setCheckboxState(prev => ({ ...prev, rent_credit_state: !prev.rent_credit_state }))}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="defaultCheck4"
                                >
                                    Add rent credit
                                </label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="defaultCheck3"
                                    name="print_receipt"
                                    onClick={() => setCheckboxState(prev => ({ ...prev, print_invoice: !prev.print_invoice }))}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="defaultCheck3"
                                >
                                    Print receipt
                                </label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="defaultCheck2"
                                    name="supplier_receipt"
                                    onClick={handleSupplierReceipt}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="defaultCheck2"
                                >
                                    Receipt to supplier
                                </label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="defaultCheck1"
                                    name="taxCheckInvoice"
                                    onClick={() => setCheckboxState(prev => ({ ...prev, receipt_note_state: !prev.receipt_note_state }))}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="defaultCheck1"
                                >
                                    Add note
                                </label>
                            </div>
                        </Col>
                    </Row>
                    {
                        checkboxState.receipt_note_state &&
                        <Row>
                            <Col>
                                <Input
                                    name="receipt_note"
                                    type="text"
                                    className="form-control"
                                    placeholder='Note'
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                    }
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-danger"
                            onClick={props.toggle}
                        >
                            <i className="fas fa-times me-1"></i> Close
                        </button>
                        <button
                            type="submit"
                            className={`btn ${((+state.total_allocated_amount === +state.total_amount) && +state.total_allocated_amount > 0) ? 'btn-info' : 'btn-danger'} ms-2`}
                            onClick={saveReceiptData}
                            disabled={((+state.total_allocated_amount === +state.total_amount) && +state.total_allocated_amount > 0) ? false : true}

                        >
                            <i className="fas fa-file-alt me-1"></i> {+state.total_allocated_amount > 0 ? +state.total_allocated_amount : '0.00'}৳
                        </button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    );
}
const mapStateToProps = gstate => {
    const {
        invoice_chart_list_data,
    } = gstate.Bills;
    const {
        tenant_info_data,
        add_tenant_receipt_data,
        add_tenant_receipt_loading,
        receipt_folio_list_data,
    } = gstate.AccountsTransactions;

    return {
        tenant_info_data,
        add_tenant_receipt_data,
        add_tenant_receipt_loading,
        receipt_folio_list_data,
        invoice_chart_list_data,
    };
};


export default connect(mapStateToProps, {
    tenantInformation,
    addInvoices,
    addTenantReceiptFresh,
    transactionsList,
    transactionsListFresh,
    receipt_folio_list,
    invoiceChartList,
    reconcileBankFile,
})(AddReceipt);