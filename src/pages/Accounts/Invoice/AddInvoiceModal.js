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
    invoiceChartList, invPropertyList, addBillsWithTenantInvoice, addBillsWithTenantInvoiceFresh, supplierList, invoiceTenant, tenancyList,
    invoiceDueList, futureInvoiceBillList, paidInvoiceBillList, tenancyListFresh, editBillsWithTenantInvoice, editBillsWithTenantInvoiceFresh,
} from "store/actions";

import iframeImage from '../../../assets/images/dummy-image-iframe.jpg';
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"


const AddInvoiceModal = props => {
    const [dummyImage, setDummyImage] = useState(iframeImage);

    const [seen, setSeen] = useState(false);
    const date = moment().format("yyyy-MM-DD");
    const [errorMessage, setErrorMessage] = useState('');
    const [state, setState] = useState({ invoiceDate: date, taxCheckInvoice: 0, tenantDepositAmount: 0, remainingAllocatedAmount: '0.00' });
    const [dataState, setDataState] = useState(true);

    const [selectedProperty, setSelectedProperty] = useState();
    const [optionGroupProperty, setOptionGroupProperty] = useState([]);
    const [optionTenant, setOptionTenant] = useState([]);

    const [selectedInvoiceChart, setSelectedInvoiceChart] = useState(null);
    const [optionGroupInvoiceChart, setOptionGroupInvoiceChart] = useState([]);
    const [invoiceChecker, setInvoiceChecker] = useState(false);
    const [includeBtn, setIncludeBtn] = useState(true);
    const [excludeBtn, setExcludeBtn] = useState(false);

    const [file, setFile] = useState();

    const [showSupplier, setShowSupplier] = useState(false);

    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [tenantState, setTenantState] = useState(true);
    const [optionGroupSupplier, setOptionGroupSupplier] = useState([
        {
            options: [
                { label: "Mytown Properties", value: "Mytown Properties" },
            ],
        },
    ]);

    if (props.data !== undefined && Object.keys(props.data).length !== 0 && props.data.constructor === Object && dataState) {
        setDataState(false);
        setState(prev => ({
            ...prev,
            invoiceDate: props.data?.invoice_billing_date,
            supplier: props.data?.supplier_contact_id,
            invoiceChart: props.data?.chart_of_account_id,
            property_Id: props.data?.property_id,
            tenancy: props.data?.tenant_contact_id,
            invoiceDetails: props.data?.details,
            totalInvoiceAmount: props.data?.amount,
            taxCheckInvoice: props.data?.include_tax,
            supplier_folio_id: props.data?.supplier_folio_id,
            owner_folio_id: props.data?.owner_folio_id,
        }));
        setDummyImage(props.data?.file ? props.data?.file : iframeImage);
        setSelectedSupplier({ label: props.data?.supplier?.reference, value: props.data?.supplier_contact_id });
        setSelectedInvoiceChart({ label: props.data?.chart_of_account?.account_name, value: props.data?.chart_of_account_id });
        setSelectedProperty({ label: props.data?.property?.reference, value: props.data?.property_id });
        setInvoiceChecker(props.data?.include_tax === 1 ? true : false);
    }

    const supplierToggle = () => setShowSupplier(prev => !prev)

    const handleSelectSupplier = e => {
        setState({ ...state, supplier: e.value, supplier_folio_id: e.supplier_folio_id })
        setSelectedSupplier(e);
    };
    const allocateAmount = (invAmount, allocAmount) => {
        let remaining = invAmount - allocAmount;
        remaining = remaining > 0 ? remaining : '0.00';
        return remaining;
    }

    const dateHandler = (selectedDates, dateStr, instance) => {
        setState({ ...state, ['invoiceDate']: dateStr });
    }
    const handleState = e => {
        if (e.target.name === 'totalInvoiceAmount') {
            setState({
                ...state,
                [e.target.name]: Number(e.target.value) ? e.target.value : '',
                remainingAllocatedAmount: allocateAmount(Number(e.target.value) ? e.target.value : 0, state?.allocatedAmount ? state?.allocatedAmount : 0)
            })
        } else if (e.target.name === 'allocatedAmount') {
            setState({
                ...state,
                [e.target.name]: Number(e.target.value) ? e.target.value : '',
                remainingAllocatedAmount: allocateAmount(state?.totalInvoiceAmount ? state?.totalInvoiceAmount : 0, Number(e.target.value) ? e.target.value : 0)
            })
            if (e.target.value > state?.tenantDepositAmount) {
                setErrorMessage('The allocated amount cannot be more than the total invoice nor the available tenant deposit amount.');
            }
        } else {
            setState({ ...state, [e.target.name]: e.target.value })
        }
    }
    const handleSelectInvoiceChart = e => {

        setState({ ...state, invoiceChart: e.value })
        setSelectedInvoiceChart(e);
    };

    const handleSelectProperty = e => {
        setState(prev => ({ ...prev, property_Id: e.value, owner_folio_id: e.owner_folio_id, tenancy: undefined }))
        setSelectedProperty(e);
        setTenantState(true);
    };

    const checkHandlerInvoice = e => {
        if (e.target.value) {
            setState(prev => { return { ...prev, taxCheckInvoice: prev.taxCheckInvoice === 0 ? 1 : 0 } });
            setInvoiceChecker(prev => !prev);
        }
    }

    const toggleIncludeBtn = () => {
        if (!includeBtn) {
            supplierToggle();
            setIncludeBtn(true);
            setExcludeBtn(false);
        }

    };

    const toggleExcludeBtn = () => {
        if (!excludeBtn) {
            supplierToggle();
            setExcludeBtn(true);
            setIncludeBtn(false);
        }
    };

    const handleChange = async (e) => {
        setFile(e.target.files[0])
        setDummyImage(URL.createObjectURL(e.target.files[0]));
    }
    const handleSave = e => {
        e.preventDefault();
        if (!state?.totalInvoiceAmount) {
            toastr.error('Invoice amount required');
        } else if ((state?.allocatedAmount > 0) && (state?.totalInvoiceAmount > 0) && (state?.allocatedAmount > state?.tenantDepositAmount)) {
            setErrorMessage('The allocated amount cannot be more than the total invoice nor the available tenant deposit amount.');
        } else if ((state?.allocatedAmount > 0) && (state?.totalInvoiceAmount > 0) && (state?.allocatedAmount > state?.totalInvoiceAmount)) {
            setErrorMessage('The allocated amount cannot be more than the total invoice nor the available tenant deposit amount.');
        } else {
            props.startLoader();
            if (props.data) {
                props.editBillsWithTenantInvoice(state, file, props.data.id);
                // props.toggle();
            } else {
                props.addBillsWithTenantInvoice(state, file);
                setState({ invoiceDate: date, taxCheckInvoice: 0, tenantDepositAmount: 0, remainingAllocatedAmount: '0.00', totalInvoiceAmount: '', });
                setErrorMessage('');
                // props.toggle();
            }
        }
    }
    const freshState = () => {
        setState({ invoiceDate: date, taxCheckInvoice: 0, tenantDepositAmount: 0, remainingAllocatedAmount: '0.00' });
        setSelectedSupplier(null);
        setSelectedInvoiceChart(null);
        setSelectedProperty(null);
        setOptionTenant([]);
        setInvoiceChecker(false);
        setDummyImage(iframeImage);
        setErrorMessage('');
        setShowSupplier(false);
        setFile();
    }
    useEffect(() => {
        if (!seen) {
            props.invPropertyList()
            props.invoiceChartList()
            props.supplierList()
        }
        setSeen(true)
    }, [seen])
    useEffect(() => {
        let option;
        if (props.inv_property_list_data?.data) {
            option = props.inv_property_list_data?.data.map(item => ({
                label: item.reference, value: item.id, owner_folio_id: item?.current_owner_folio?.id
            }));
            setOptionGroupProperty(option);
        }
    }, [props.inv_property_list_data])
    useEffect(() => {
        let optionTen;
        if (props.tenancy_list_data?.data) {
            optionTen = {
                label: props.tenancy_list_data?.data.reference, value: props.tenancy_list_data?.data.id,
            };
            setOptionTenant([optionTen]);
        }
    }, [state.tenancy])
    useEffect(() => {
        let optionChart;
        if (props.invoice_chart_list_data) {
            optionChart = props.invoice_chart_list_data?.data.map(item => ({
                label: item.account_number + ' - ' + item.account_name, value: item.id,
            }));
            setOptionGroupInvoiceChart(optionChart);
        }
    }, [props.invoice_chart_list_loading])
    useEffect(() => {
        let optionSupplier;
        if (props.supplier_list_data?.data) {
            optionSupplier = props.supplier_list_data?.data.map(item => ({
                label: item.reference, value: item.id, supplier_folio_id: item.supplier_details?.id
            }));
            setOptionGroupSupplier(optionSupplier);
        }
    }, [props.supplier_list_loading])
    useEffect(() => {
        if (props.invoice_tenant_data_loading === false) {
            props.invoiceTenant();
        }
    }, [props.invoice_tenant_data_loading])
    useEffect(() => {
        if (props.tenancy_list_loading === 'Success') {
            props.tenancyListFresh();
            setState(prev => ({ ...prev, tenancy: props.tenancy_list_data?.data?.id, tenant_folio_id: props.tenancy_list_data?.data?.tenant_folio.id, tenantDepositAmount: props.tenancy_list_data?.data?.tenant_folio?.deposit ? props.tenancy_list_data?.data?.tenant_folio?.deposit : 0 }));
        }
    }, [props.tenancy_list_loading])
    useEffect(() => {
        if (state.property_Id && tenantState) {
            props.tenancyList(state.property_Id)
            setTenantState(false)
        }
    }, [state.property_Id])
    console.log(state.property_Id);
    useEffect(() => {
        if (props.add_bills_tenant_invoice_loading === 'Success' && !props.data) {
            toastr.success("Invoice added");
            props.addBillsWithTenantInvoiceFresh();
            props.invoiceDueList();
            props.futureInvoiceBillList();
            props.paidInvoiceBillList();
            freshState();
            if (props.text == 'supplier') {

                props.supplierBillApiCall()
            }
            props.endLoader();
            props.toggle();
        }
        if (props.add_bills_tenant_invoice_loading === 'Failed' && !props.data) {
            toastr.error("Something went wrong!");
            props.addBillsWithTenantInvoiceFresh();
            props.invoiceDueList();
            props.futureInvoiceBillList();
            props.paidInvoiceBillList();
            freshState();
            props.endLoader();
            props.toggle()
        }
    }, [props.add_bills_tenant_invoice_loading])
    useEffect(() => {
        if (props.edit_invoice_loading === 'Success') {
            toastr.success("Invoice updated");
            props.editBillsWithTenantInvoiceFresh();
            props.invoiceDueList();
            props.futureInvoiceBillList();
            props.paidInvoiceBillList();
            freshState();
            if (props.text == 'supplier') {

                props.supplierBillApiCall()
            }
            props.endLoader();
            props.toggle();
        }
        if (props.edit_invoice_loading === 'Failed') {
            toastr.error("Something went wrong!");
            props.editBillsWithTenantInvoiceFresh();
            props.invoiceDueList();
            props.futureInvoiceBillList();
            props.paidInvoiceBillList();
            freshState();
            props.endLoader();
            props.toggle();
        }
    }, [props.edit_invoice_loading]);
    console.log(state.tenancy);

    return (
        <>
            <Modal
                size="xl"
                isOpen={props.showModal} toggle={() => { props.toggle(); setDataState(true); freshState(); }}>
                <ModalHeader toggle={() => { props.toggle(); setDataState(true); freshState(); }}>
                    <span className="text-primary">{props.data ? 'Edit Invoice' : 'New Invoice'}</span>
                </ModalHeader>
                <ModalBody>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col sm={6} md={6}>
                                    {
                                        props.data ?
                                            <div style={{ height: '100%' }}>
                                                <iframe src={process.env.REACT_APP_IMAGE + props.data?.file || dummyImage} height="100%" style={{ width: "100%", height: "100%", repeat: 'no-repeat', objectFit: "contain", overflow: "auto", position: 'center' }} />
                                            </div>
                                            :
                                            <div style={{ height: '100%' }}>
                                                <iframe src={dummyImage} height="100%" style={{ width: "100%", height: "100%", objectFit: "contain", overflow: "auto", repeat: 'no-repeat', position: 'center' }} />
                                            </div>
                                        // <iframe name="main" style={{width:'100%',height:'90%',background:`url(${dummyImage}) no-repeat center center`, backgroundSize: 'cover'}}> </iframe>
                                    }
                                </Col>

                                <Col sm={6} md={6}>
                                    {
                                        props.data?.uploaded !== "Uploaded" &&
                                        < div className="mb-3 mt-3">
                                            <Input
                                                className="form-control"
                                                type="file"
                                                id="formFile"
                                                onChange={handleChange}
                                                multiple='false'
                                            />
                                        </div>
                                    }
                                    <Row className="mb-3 d-flex align-items-center">
                                        <Col md={4}>
                                            <Label>
                                                From
                                            </Label>
                                        </Col>
                                        <Col md={6}>
                                            <div className="btn-group btn-group-justified">
                                                <div className="btn-group">
                                                    <Button
                                                        color={
                                                            includeBtn
                                                                ? "secondary"
                                                                : "light"
                                                        }
                                                        onClick={
                                                            toggleIncludeBtn
                                                        }
                                                        className='btn w-md'
                                                    >
                                                        {includeBtn ? (
                                                            <i className="bx bx-comment-check"></i>
                                                        ) : null}
                                                        <span>
                                                            {" "}
                                                            Owner
                                                        </span>
                                                    </Button>
                                                </div>

                                                <div className="btn-group">
                                                    <Button
                                                        color={
                                                            excludeBtn
                                                                ? "secondary"
                                                                : "light"
                                                        }
                                                        onClick={
                                                            toggleExcludeBtn
                                                        }
                                                        className='btn w-md'
                                                    >
                                                        {excludeBtn ? (
                                                            <i className="bx bx-comment-check"></i>
                                                        ) : null}
                                                        <span>
                                                            {" "}
                                                            Supplier
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="mb-3 row">
                                        <div className="col-md-12">
                                            <Flatpickr
                                                className="form-control d-block"
                                                placeholder="Pick a date..."
                                                value={state.invoiceDate}
                                                options={{
                                                    altInput: true,
                                                    format: "d/m/Y",
                                                    altFormat: "d/m/Y",
                                                    onChange: dateHandler
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {showSupplier &&
                                        <div className="mb-3 select2-container">
                                            <Label>Select Supplier</Label>
                                            <Select
                                                value={selectedSupplier}
                                                onChange={handleSelectSupplier}
                                                options={optionGroupSupplier}
                                                classNamePrefix="select2-selection"
                                                placeholder='Supplier'
                                            />
                                        </div>}
                                    <div className="mb-3 select2-container">
                                        <Label>Select Account</Label>
                                        <Select
                                            value={selectedInvoiceChart}
                                            onChange={handleSelectInvoiceChart}
                                            options={optionGroupInvoiceChart}
                                            classNamePrefix="select2-selection"
                                            placeholder='Invoice Chart Account'
                                        />
                                    </div>
                                    <div className="mb-3 select2-container">
                                        <Label>Select Property</Label>
                                        <Select
                                            value={selectedProperty}
                                            onChange={handleSelectProperty}
                                            options={optionGroupProperty}
                                            classNamePrefix="select2-selection"
                                            placeholder='Property'
                                        />
                                    </div>
                                    {state.tenancy &&
                                        <div className="mb-3 select2-container">
                                            <Label>Select Tenant</Label>
                                            <Select
                                                value={optionTenant[0]}
                                                options={optionTenant}
                                                classNamePrefix="select2-selection"
                                            // selected={}
                                            />
                                        </div>}
                                    <div className="mb-3 row">
                                        <div className="col-md-12">
                                            <label>Details</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Details"
                                                name="invoiceDetails"
                                                onChange={handleState}
                                                value={state.invoiceDetails}
                                            />
                                        </div>
                                    </div>
                                    <h4 className="card-title">Total invoice amount</h4>
                                    <Row className="d-flex align-items-center">
                                        <Col md={6} className="d-flex">
                                            <div className="d-flex flex-column">
                                                <input
                                                    className="form-control"
                                                    name="totalInvoiceAmount"
                                                    id="totalInvoiceAmount"
                                                    type="text"
                                                    placeholder="0.00"
                                                    style={{
                                                        borderTopRightRadius: 0,
                                                        borderBottomRightRadius: 0,
                                                    }}
                                                    value={
                                                        state.totalInvoiceAmount
                                                    }
                                                    onChange={
                                                        handleState
                                                    }
                                                />
                                            </div>
                                            <span className="input-group-append">
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
                                        <Col md={6} >
                                            <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="defaultCheck1"
                                                    name="taxCheckInvoice"
                                                    onClick={e => checkHandlerInvoice(e)}
                                                    checked={invoiceChecker === true ? true : false}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="defaultCheck1"
                                                >
                                                    Tax inc
                                                </label>
                                            </div>
                                        </Col>
                                    </Row>

                                    {state.tenantDepositAmount > 0 && <>
                                        <Card>
                                            <CardBody className="border-3 border-start border-danger">
                                                <p className="fw-bold">Available tenant funds {state.tenantDepositAmount}৳.</p>
                                                <p>Would you like to allocate an amount towards this invoice? If yes, please fill in the allocated amount.</p>

                                                <div className="mb-3 row">
                                                    <div className="col-md-12">
                                                        <label>Allocated amount</label>
                                                        <Row className="d-flex align-items-center">
                                                            <Col md={4} className="d-flex">
                                                                <div className="d-flex flex-column">
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        name="allocatedAmount"
                                                                        placeholder="0.00৳"
                                                                        value={state.allocatedAmount}
                                                                        onChange={handleState}
                                                                        style={{
                                                                            borderTopRightRadius: 0,
                                                                            borderBottomRightRadius: 0,
                                                                        }}
                                                                    />
                                                                </div>
                                                                <span className="input-group-append">
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
                                                    </div>
                                                </div>
                                                {
                                                    errorMessage ?
                                                        <div>
                                                            <p className="text-danger">* {errorMessage}</p>
                                                        </div> : ''
                                                }
                                                <p>Remaining amount payable will be <span className="fw-bold">{state.remainingAllocatedAmount}৳</span></p>
                                            </CardBody>
                                        </Card>
                                    </>}

                                </Col>

                            </Row>
                        </CardBody>
                    </Card>

                </ModalBody>
                <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-danger me-2"
                            onClick={() => { props.toggle(); setDataState(true); freshState() }}><i className="fas fa-times"></i> Close</button>
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
        inv_property_list_data,
        inv_property_list_loading,
    } = gstate.property;
    const {
        edit_invoice_loading
    } = gstate.AccountsInvoices;

    const {
        invoice_chart_list_data,
        invoice_chart_list_loading,

        add_bills_tenant_invoice_loading,

        supplier_list_data,
        supplier_list_loading,

        invoice_tenant_data,
        invoice_tenant_data_loading,

        tenancy_list_data,
        tenancy_list_loading,

    } = gstate.Bills;

    return {
        invoice_chart_list_data,
        invoice_chart_list_loading,

        inv_property_list_data,
        inv_property_list_loading,

        add_bills_tenant_invoice_loading,

        supplier_list_data,
        supplier_list_loading,

        invoice_tenant_data,
        invoice_tenant_data_loading,

        tenancy_list_data,
        tenancy_list_loading,

        edit_invoice_loading,
    };
};

export default withRouter(connect(mapStateToProps, {
    invoiceChartList, invPropertyList, addBillsWithTenantInvoice, addBillsWithTenantInvoiceFresh, supplierList, invoiceTenant, tenancyList,
    invoiceDueList, futureInvoiceBillList, paidInvoiceBillList, tenancyListFresh, editBillsWithTenantInvoice, editBillsWithTenantInvoiceFresh,
})(AddInvoiceModal));