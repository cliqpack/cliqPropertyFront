import moment from "moment";
import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Col,
    Row,
    Input,
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
    billAccountsList, FolioWithdrawAction, receipt_folio_list, receipt_folio_balance, FolioWithdrawActionFresh, transactionsList, receipt_folio_balance_fresh, receipt_folio_balance_loading_fresh
} from "store/actions";
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr";
import Loder from "components/Loder/Loder";
import ReactAsyncSelectComp from "components/Common/ReactAsyncSelectComp";

const FolioWithdraw = props => {
    const date = moment().format("yyyy-MM-DD");
    const [showModal, setShowModal] = useState(false);
    const [seen, setSeen] = useState(false);
    const [state, setState] = useState({ amount: "", includeTax: 0, withdrawDate: date, transferred: false, note: '', noteState: false, invoiceChart: '', folio_id: '', folio_type: '', property_id: '', contact_id: '' });
    const [selected, setSelected] = useState(false);

    const [folioBalance, setFolioBalance] = useState({ status: false });

    const [selectedInvoiceChart, setSelectedInvoiceChart] = useState(null);
    const [optionGroupInvoiceChart, setOptionGroupInvoiceChart] = useState([]);

    const [selectedFolio, setSelectedFolio] = useState(null);
    const [optionGroupFolio, setOptionGroupFolio] = useState([]);

    const [selectedType, setSelectedType] = useState();
    const [optionGroupType, setOptionGroupType] = useState([
        {
            options: [
                { label: "Owner", value: "1" },
                { label: "Tenant", value: "3" },
                { label: "Supplier", value: "2" },
            ],
        },
    ]);

    const handleState = e => {
        setState((prev) => { return { ...prev, [e.target.name]: e.target.value } })
    }
    const handleAmount = e => {
        setState((prev) => { return { ...prev, [e.target.name]: Number(e.target.value) ? e.target.value : '' } })
    }
    const handleSelectInvoiceChart = e => {
        setState({ ...state, invoiceChart: e.value })
        setSelectedInvoiceChart(e);
    };
    const handleSelectType = e => {
        setSelectedType(e);
        // props.receipt_folio_list(e.value);
        setSelected(true);
        if (selectedType !== e) {
            setSelectedFolio(null);
            setState(prev => ({ ...prev, folio_id: "", folio_type: e.label, contact_id: "", property_id: "" }));
            setFolioBalance({ status: false });
            props.receipt_folio_balance_fresh();
        } else setState(prev => ({ ...prev, folio_type: e.label, folio_id: '' }));
    };

    const handleSave = e => {
        e.preventDefault();
        if (state.folio_id === '') {
            toastr.warning(`Select a ${state.folio_type} Folio first`);
            return;
        } else if (state.invoiceChart === '') {
            toastr.warning('Account is required');
            return;
        } else if (state.amount === '') {
            toastr.warning('Amount must be greater than 0');
            return;
        } else if (state.amount < 0) {
            toastr.warning('Amount cannot be less then 0');
        } else if (state.amount > folioBalance?.balance) {
            toastr.warning(`A withdrawal of ${state.amount}৳ exceeds the cleared balance of ${folioBalance?.balance}৳`);
            return;
        } else {
            setShowModal(true);
            props.FolioWithdrawAction(state);
        }
    }

    const checkTaxHandler = e => {
        if (e.target.value) {
            setState(prev => { return { ...prev, includeTax: prev.includeTax === 0 ? 1 : 0 } });
        }
    }
    const checkTransferredHandler = e => {
        if (e.target.value) {
            setState(prev => { return { ...prev, transferred: prev.transferred === false ? true : false } });
        }
    }

    const handleSelectFolio = e => {
        setShowModal(true);
        props.receipt_folio_balance(selectedType?.value, e.value);
        setState(prev => ({ ...prev, folio_id: e.value, contact_id: e.contact_id, property_id: e.property_id }));
        setSelectedFolio(e);
    };

    useEffect(() => {
        if (props.add_folio_withdraw_loading === "Success") {
            toastr.success('Folio withdrawn');
            props.transactionsList();
            props.FolioWithdrawActionFresh();
            props.receipt_folio_balance_fresh();
            clearState();
            setShowModal(false);
            props.toggle();
        }
        if (props.property_list_loading === false && !seen) {
            props.propertyList();
        }
        if (props.bill_accounts_list_loading === false && !seen) {
            props.billAccountsList();
        }
        let option;
        if (props.receipt_folio_list_data && selected) {
            option = props.receipt_folio_list_data?.data.map(item => {
                if (selectedType.value === "1") {
                    return {
                        label: `${item?.property?.reference} - ${item?.reference} - OWN00${item?.owner_folio?.id}`, value: item?.owner_folio?.id, contact_id: item?.contact_id, property_id: item?.property?.id
                    }
                } else if (selectedType.value === "3") {
                    return {
                        label: `${item?.property?.reference} - ${item?.reference} - TEN00${item?.tenant_folio?.id}`, value: item?.tenant_folio?.id, contact_id: item?.contact_id, property_id: item?.property?.id
                    }
                } else {
                    return {
                        label: `${item?.reference} - SUP00${item?.supplier_details?.id}`, value: item?.supplier_details?.id, contact_id: item?.contact_id
                    }
                }
            });
            setOptionGroupFolio(option);
        }

        let optionChart;
        if (props.bill_accounts_list_data) {
            optionChart = props.bill_accounts_list_data?.data.map(item => ({
                label: item.account_number + ' - ' + item.account_name, value: item.id,
            }));
            setOptionGroupInvoiceChart(optionChart);
        }

        if (props.receipt_folio_balance_data) {
            setFolioBalance({
                available_balance: props.receipt_folio_balance_data?.available_balance,
                balance: props.receipt_folio_balance_data?.balance,
                outstanding_bill: props.receipt_folio_balance_data?.outstanding_bill,
                withhold: props.receipt_folio_balance_data?.withhold,
                status: true,
            })
        }
        if (props.receipt_folio_balance_loading === 'Success') {
            setShowModal(false);
            props.receipt_folio_balance_loading_fresh();
        }

        setSeen(true);

    }, [
        props.bill_accounts_list_loading,
        props.receipt_folio_list_data,
        props.add_folio_withdraw_loading,
        props.receipt_folio_balance_data,
        props.receipt_folio_balance_loading,
    ]);

    const dateHandler = (selectedDates, dateStr, instance) => {
        setState({ ...state, ['withdrawDate']: dateStr });
    }

    const clearState = () => {
        setFolioBalance({ status: false });
        setSelectedType();
        setSelectedFolio();
        setSelectedInvoiceChart();
        setState({ amount: "", includeTax: 0, withdrawDate: date, transferred: false, note: '', noteState: false, invoiceChart: '', folio_id: '', folio_type: '', property_id: '', contact_id: '' });
    }
    const toggleAndFresh = () => {
        props.toggle();
        props.receipt_folio_balance_fresh();
    }
    const tenantDetails = async (e) => {
        setShowModal(true);
        props.receipt_folio_balance(selectedType?.value, e.value);
        setState(prev => ({ ...prev, folio_id: e.value, contact_id: e.contact_id, property_id: e.property_id }));
        setSelectedFolio(e);
    }

    const returnSelectObject = (item) => {
        if (selectedType.value === "1") {
            return {
                label: `${item?.owner_contacts?.reference} (${item?.folio_code})`, value: item?.id, contact_id: item?.owner_contacts?.contact_id
            }
        } else if (selectedType.value === "3") {
            return {
                label: `${item?.property?.reference} - ${item?.reference} - TEN00${item?.tenant_folio?.id}`, value: item?.tenant_folio?.id, contact_id: item?.contact_id, property_id: item?.property?.id
            }
        } else {
            return {
                label: `${item?.reference} - SUP00${item?.supplier_details?.id}`, value: item?.supplier_details?.id, contact_id: item?.contact_id
            }
        }
    }

    let asyncSelect = <ReactAsyncSelectComp
        url={`${process.env.REACT_APP_LOCALHOST}/get-all-receipt-folios/${selectedType?.value}?q=`}
        handler={tenantDetails}
        returnSelectObject={returnSelectObject}
        placeholder={
            selectedType?.value === '1' ? 'Owner folio' :
                selectedType?.value === '2' ? 'Supplier folio' : 'Tenant folio'
        }
    />

    return (
        <>
            <Modal isOpen={props.showModal} toggle={toggleAndFresh}>
                {showModal && <Loder status={showModal} />}
                <ModalHeader toggle={toggleAndFresh}>
                    <span className="text-primary">Folio Withdraw</span>
                </ModalHeader>
                <ModalBody>
                    <Card>
                        <CardBody>
                            <Row className="mb-3">
                                <Col md={3}>
                                    <b>Type</b>
                                </Col>
                                <Col md={9}>
                                    <Select
                                        value={selectedType}
                                        onChange={handleSelectType}
                                        options={optionGroupType}
                                        classNamePrefix="select2-selection"
                                        placeholder='Type'
                                    />
                                </Col>
                            </Row>
                            {
                                (selectedType?.value === '1' || selectedType?.value === '2' || selectedType?.value === '3') &&
                                <Row className="mb-3">
                                    <Col md={3}>
                                        <b>Withdraw from</b>
                                    </Col>
                                    <Col md={9}>
                                        {
                                            selectedType?.value === '1' && asyncSelect
                                        }
                                        {
                                            selectedType?.value === '2' && asyncSelect
                                        }
                                        {
                                            selectedType?.value === '3' && asyncSelect
                                        }
                                    </Col>
                                </Row>
                            }
                            {
                                folioBalance.status &&
                                <Row className="my-3">
                                    <Col md={3}>

                                    </Col>
                                    <Col md={9}>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                Balance <br />
                                                Outstanding bills <br />
                                                {folioBalance?.withhold ? <>Withhold<br /></> : ''}
                                                <span className={`${folioBalance?.available_balance > 0 ? 'text-success' : 'text-danger'}`}>Available balance</span>
                                            </div>
                                            <div>
                                                {folioBalance?.balance}৳ <br />
                                                {folioBalance?.outstanding_bill}৳ <br />
                                                {folioBalance?.withhold ? <>{folioBalance?.withhold}৳ <br /></> : ''}
                                                <span className={`${folioBalance?.available_balance > 0 ? 'text-success' : 'text-danger'}`}>{folioBalance?.available_balance}৳</span>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            }

                            <Row className="mb-3 d-flex align-items-center">
                                <Col md={3}>
                                    <b>Account</b>
                                </Col>
                                <Col md={9}>
                                    <Select
                                        value={selectedInvoiceChart}
                                        onChange={handleSelectInvoiceChart}
                                        options={optionGroupInvoiceChart}
                                        classNamePrefix="select2-selection"
                                        placeholder='Account'
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3 d-flex align-items-center">
                                <Col md={3}><b>Date</b></Col>
                                <Col md={9}>
                                    <Flatpickr
                                        className="form-control"
                                        placeholder="Pick a date..."
                                        value={state.withdrawDate}
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
                                    <b>Payee</b>
                                </Col>
                                <Col md={9}>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.payee}
                                        name="payee"
                                        onChange={handleState}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="defaultCheck3"
                                            name="taxCheckInvoice"
                                            onClick={e => checkTransferredHandler(e)}
                                            checked={state.transferred === true ? true : false}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="defaultCheck3"
                                        >
                                            Transferred
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                            {
                                !state.transferred ?
                                    <Row className="d-flex align-items-center mb-3">
                                        <Col md={3}>
                                            <b>Cheque number</b>
                                        </Col>
                                        <Col md={9}>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                id="formrow-InputCity"
                                                name="check_number"
                                                onChange={handleState}
                                            />
                                        </Col>
                                    </Row>
                                    : ''
                            }
                            <Row className="d-flex align-items-center mb-3">
                                <Col md={3}><b>Amount</b></Col>
                                <Col md={5}>
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
                                                value={
                                                    state.amount
                                                }
                                                onChange={
                                                    handleAmount
                                                }
                                            />
                                        </div>
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
                                <Col md={4}>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="defaultCheck1"
                                            name="taxCheckInvoice"
                                            onClick={e => checkTaxHandler(e)}
                                            checked={state.includeTax === 1 ? true : false}
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
                            <Row>
                                <Col md={3}>
                                    <div className="form-check mb-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="defaultCheck2"
                                            name="taxCheckInvoice"
                                            onClick={() => setState(prev => ({ ...prev, noteState: !prev.noteState }))}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="defaultCheck2"
                                        >
                                            Add note
                                        </label>
                                    </div>
                                </Col>
                                <Col md={9}>
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
                        </CardBody>
                    </Card>

                </ModalBody>
                <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-danger me-2"
                            onClick={toggleAndFresh}><i className="fas fa-times"></i> Close</button>
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
        bill_accounts_list_data,
        bill_accounts_list_loading,
    } = gstate.Bills;

    const {
        receipt_folio_list_data,
        receipt_folio_list_loading,

        add_folio_withdraw_loading,

        receipt_folio_balance_data,
        receipt_folio_balance_error,
        receipt_folio_balance_loading,
    } = gstate.AccountsTransactions;

    return {
        receipt_folio_list_data,
        receipt_folio_list_loading,

        bill_accounts_list_data,
        bill_accounts_list_loading,

        add_folio_withdraw_loading,

        receipt_folio_balance_data,
        receipt_folio_balance_error,
        receipt_folio_balance_loading,
    };
};

export default withRouter(connect(mapStateToProps, {
    billAccountsList, FolioWithdrawAction, receipt_folio_list, receipt_folio_balance, FolioWithdrawActionFresh, transactionsList, receipt_folio_balance_fresh, receipt_folio_balance_loading_fresh
})(FolioWithdraw));
