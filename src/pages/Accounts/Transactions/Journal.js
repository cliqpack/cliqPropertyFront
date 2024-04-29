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
    accounts, JournalAction, receipt_folio_list, transactionsList, JournalActionFresh, receipt_folio_balance, receipt_folio_balance_fresh, receipt_folio_balance_loading_fresh
} from "store/actions";
import Loder from "components/Loder/Loder";
import ReactAsyncSelectComp from "components/Common/ReactAsyncSelectComp";

const Journal = props => {
    const [seen, setSeen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [state, setState] = useState({ amount: "", includeTax: 0, note: '', noteState: false, invoiceChart: '', from_folio_id: '', to_folio_id: '', from_folio_type: '', to_folio_type: '' });
    const [folioBalance, setFolioBalance] = useState({ status: false });

    const [fromSelectedFolio, setFromSelectedFolio] = useState();
    const [toSelectedFolio, setToSelectedFolio] = useState();

    const [selectedInvoiceChart, setSelectedInvoiceChart] = useState(null);
    const [optionGroupInvoiceChart, setOptionGroupInvoiceChart] = useState([]);

    const [selectedFromFolioType, setSelectedFromFolioType] = useState();
    const [selectedToFolioType, setSelectedToFolioType] = useState();
    const [optionGroupType, setOptionGroupType] = useState([
        {
            options: [
                { label: "Owner", value: "1" },
                { label: "Tenant", value: "3" },
                { label: "Supplier", value: "2" },
                { label: "Seller", value: "4" },
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

    const handleFromSelectFolio = e => {
        setShowModal(true);
        props.receipt_folio_balance(selectedFromFolioType?.value, e.value);
        setState(prev => { return { ...prev, from_folio_id: e.value, from_property_id: e.property_id, from_contact_id: e.contact_id } });
        setFromSelectedFolio(e);
    };
    const handleToSelectFolio = e => {
        setState(prev => { return { ...prev, to_folio_id: e.value, to_property_id: e.property_id, to_contact_id: e.contact_id } });
        setToSelectedFolio(e);
    };

    const handleSelectFromFolioType = e => {
        setSelectedFromFolioType(e);
        if (selectedFromFolioType !== e) {
            setState(prev => { return { ...prev, from_folio_type: e.label, from_folio_id: "", from_property_id: "", from_contact_id: "" } });
            setFromSelectedFolio({});
        } else setState(prev => ({ ...prev, from_folio_type: e.label, from_folio_id: '' }));
    };
    const handleSelectToFolioType = e => {
        setSelectedToFolioType(e);
        if (selectedToFolioType !== e) {
            setState(prev => { return { ...prev, to_folio_id: "", to_folio_type: e.label, to_property_id: "", to_contact_id: "" } });
            setToSelectedFolio({});
        } else setState(prev => ({ ...prev, to_folio_type: e.label, to_folio_id: '' }));
    };

    const handleSave = e => {
        e.preventDefault();
        if (state.from_folio_id === '') {
            setError(`${state.from_folio_type} from folio is required`);
        } else if (state.to_folio_id === '') {
            setError(`${state.to_folio_type} to folio is required`);
        } else if (state.from_folio_id === state.to_folio_id && state.from_folio_type === state.to_folio_type) {
            setError('Transfer cannot be done to the same folio');
        } else if (state.invoiceChart === '') {
            setError('Please select an account');
        } else if (state.amount === '') {
            setError('Amount must be greater than 0');
        } else if (state.amount < 0) {
            setError('Amount cannot be less then 0');
        } else if (state.amount > folioBalance?.balance) {
            toastr.warning(`A withdrawal of ${state.amount}৳ exceeds the cleared balance of ${folioBalance?.balance}৳`);
            return;
        } else {
            setShowModal(true);
            props.JournalAction(state);
        }
    }

    const checkTaxHandler = e => {
        if (e.target.value) {
            setState(prev => { return { ...prev, includeTax: prev.includeTax === 0 ? 1 : 0 } });
        }
    }

    useEffect(() => {
        if (props.add_journal_loading === "Success") {
            toastr.success('Folio balance transfer done');
            props.transactionsList();
            props.JournalActionFresh();
            props.receipt_folio_balance_fresh();
            setShowModal(false);
            props.toggle();
            setFolioBalance({ status: false });
        }

        if (props.add_journal_loading === "Failed") {
            toastr.error('Failed')
            props.JournalActionFresh();
            props.receipt_folio_balance_fresh();
            setShowModal(false);
            setFolioBalance({ status: false });

        }

        if (props.accounts_loading === false && !seen) {
            props.accounts();
        }

        let optionChart;
        if (props.accounts_data) {
            optionChart = props.accounts_data?.data.map(item => ({
                label: `${item.account_number} - ${item.account_name}`, value: item.id,
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
        props.accounts_loading,
        props.receipt_folio_list_data,
        props.add_journal_loading,
        props.receipt_folio_balance_data,
        props.receipt_folio_balance_loading,
    ]);

    if (error) {
        toastr.warning(error);
        setError('');
    }

    const toggleAndFresh = () => {
        props.toggle();
        props.receipt_folio_balance_fresh();
    }

    const returnFromSelectObject = (item) => {
        if (selectedFromFolioType?.value === "1") {
            return {
                label: `${item?.owner_contacts?.reference} (${item?.folio_code})`, value: item?.id, contact_id: item?.owner_contacts?.contact_id
            }
        } else if (selectedFromFolioType?.value === "2") {
            return {
                label: `${item?.reference} - SUP00${item?.supplier_details?.id}`, value: item?.supplier_details?.id, contact_id: item?.contact_id,
            }
        } else if (selectedFromFolioType?.value === "4") {
            return {
                label: `${item?.property?.reference} - ${item?.reference} - SAL00${item?.seller_folio?.id}`, value: item?.seller_folio?.id, contact_id: item?.contact_id, property_id: item?.property?.id
            }
        } else {
            return {
                label: `${item?.property?.reference} - ${item?.reference} - TEN00${item?.tenant_folio?.id}`, value: item?.tenant_folio?.id, contact_id: item?.contact_id, property_id: item?.property?.id
            }
        }
    }
    const returnToSelectObject = (item) => {
        if (selectedToFolioType?.value === "1") {
            return {
                label: `${item?.owner_contacts?.reference} (${item?.folio_code})`, value: item?.id, contact_id: item?.owner_contacts?.contact_id
            }
        } else if (selectedToFolioType?.value === "2") {
            return {
                label: `${item?.reference} - SUP00${item?.supplier_details?.id}`, value: item?.supplier_details?.id, contact_id: item?.contact_id,
            }
        } else if (selectedToFolioType?.value === "4") {
            return {
                label: `${item?.property?.reference} - ${item?.reference} - SAL00${item?.seller_folio?.id}`, value: item?.seller_folio?.id, contact_id: item?.contact_id, property_id: item?.property?.id
            }
        }

        else {
            return {
                label: `${item?.property?.reference} - ${item?.reference} - TEN00${item?.tenant_folio?.id}`, value: item?.tenant_folio?.id, contact_id: item?.contact_id, property_id: item?.property?.id
            }
        }
    }

    let asyncSelectFrom = <ReactAsyncSelectComp
        url={`${process.env.REACT_APP_LOCALHOST}/get-all-receipt-folios/${selectedFromFolioType?.value}?q=`}
        handler={handleFromSelectFolio}
        returnSelectObject={returnFromSelectObject}
        placeholder={selectedFromFolioType?.value === '1' ? 'Owner folio' : selectedFromFolioType?.value === '3' ? 'Tenant folio' : selectedFromFolioType?.value === '2' ? 'Supplier folio' : 'Seller folio'}
    />

    let asyncSelectTo = <ReactAsyncSelectComp
        url={`${process.env.REACT_APP_LOCALHOST}/get-all-receipt-folios/${selectedToFolioType?.value}?q=`}
        handler={handleToSelectFolio}
        returnSelectObject={returnToSelectObject}
        placeholder={selectedToFolioType?.value === '1' ? 'Owner folio' : selectedToFolioType?.value === '3' ? 'Tenant folio' : selectedFromFolioType?.value === '2' ? 'Supplier folio' : 'Seller folio'}
    />

    return (
        <>
            <Modal isOpen={props.showModal} toggle={toggleAndFresh} size="lg">
                {showModal && <Loder status={showModal} />}
                <ModalHeader toggle={toggleAndFresh}>
                    <span className="text-primary">Journal</span>
                </ModalHeader>
                <ModalBody>
                    <Card>
                        <CardBody>
                            <Row className="mb-3">
                                <Col md={3}>
                                    <b>Take money from</b>
                                </Col>
                                <Col md={3}>
                                    <Select
                                        value={selectedFromFolioType}
                                        onChange={handleSelectFromFolioType}
                                        options={optionGroupType}
                                        classNamePrefix="select2-selection"
                                        placeholder='Type'
                                    />
                                </Col>
                                {
                                    (selectedFromFolioType?.value === "1" || selectedFromFolioType?.value === "2" || selectedFromFolioType?.value === "3" || selectedFromFolioType?.value === "4") &&
                                    <Col md={6}>
                                        {selectedFromFolioType.value === "1" && asyncSelectFrom}
                                        {selectedFromFolioType.value === "2" && asyncSelectFrom}
                                        {selectedFromFolioType.value === "3" && asyncSelectFrom}
                                        {selectedFromFolioType.value === "4" && asyncSelectFrom}
                                    </Col>
                                }
                            </Row>
                            {
                                folioBalance.status &&
                                <Row className="my-3">
                                    <Col md={3}>

                                    </Col>
                                    <Col md={3}>

                                    </Col>
                                    <Col md={6}>
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
                                                {folioBalance?.withhold ? <>{folioBalance?.withhold}৳<br /></> : ''}
                                                <span className={`${folioBalance?.available_balance > 0 ? 'text-success' : 'text-danger'}`}>{folioBalance?.available_balance}৳</span>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            }
                            <Row className="mb-3">
                                <Col md={3}>
                                    <b>Give money to</b>
                                </Col>
                                <Col md={3}>
                                    <Select
                                        value={selectedToFolioType}
                                        onChange={handleSelectToFolioType}
                                        options={optionGroupType}
                                        classNamePrefix="select2-selection"
                                        placeholder='Type'
                                    />
                                </Col>
                                {
                                    (selectedToFolioType?.value === "1" || selectedToFolioType?.value === "2" || selectedToFolioType?.value === "3" || selectedToFolioType?.value === "4") &&
                                    <Col md={6}>
                                        {selectedToFolioType.value === "1" && asyncSelectTo}
                                        {selectedToFolioType.value === "2" && asyncSelectTo}
                                        {selectedToFolioType.value === "3" && asyncSelectTo}
                                        {selectedToFolioType.value === "4" && asyncSelectTo}
                                    </Col>
                                }
                            </Row>

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
                                <Col md={3}>
                                    <b>Details</b>
                                </Col>
                                <Col md={9}>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={state.details}
                                        name="details"
                                        onChange={handleState}
                                    />
                                </Col>
                            </Row>
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
        receipt_folio_list_data,
        receipt_folio_list_loading,
        add_journal_loading,

        receipt_folio_balance_data,
        receipt_folio_balance_error,
        receipt_folio_balance_loading,
    } = gstate.AccountsTransactions;

    const {
        accounts_data,
        accounts_loading,
    } = gstate.Bills;

    return {
        accounts_data,
        accounts_loading,

        receipt_folio_list_data,
        receipt_folio_list_loading,

        add_journal_loading,

        receipt_folio_balance_data,
        receipt_folio_balance_error,
        receipt_folio_balance_loading,
    };
};

export default withRouter(connect(mapStateToProps, {
    accounts, JournalAction, receipt_folio_list, transactionsList, JournalActionFresh, receipt_folio_balance, receipt_folio_balance_fresh, receipt_folio_balance_loading_fresh
})(Journal));
