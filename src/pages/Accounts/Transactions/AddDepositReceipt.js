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
    Table
} from "reactstrap";

import { transactionsList, tenantDepositReceipt, tenantDepositReceiptFresh } from "store/actions";

import { connect } from "react-redux";
import toastr from "toastr";
import "flatpickr/dist/themes/material_blue.css"
import Loder from "components/Loder/Loder";


const AddDepositReceipt = (props) => {
    const [state, setState] = useState({ "method": "eft", total_allocated_amount: '', rent_amount: '', selectedFolio: '', loader: false });

    const amountCalculation = (name, value) => {
        let total = state.total_amount, bond = state.bond_amount ? state.bond_amount : 0, rent = state.rent_amount ? state.rent_amount : 0, invoices = state.invoices ? state.invoices : [], r, total_allocated_amount = state.total_allocated_amount ? +state.total_allocated_amount : 0;
        let totalInvoiceAmount = 0;
        invoices.forEach(element => {
            totalInvoiceAmount += +element.value;
        });
        let obj = { bond, rent, invoices, total_allocated_amount };
        if (name === 'rent_amount') {
            obj = {
                ...obj,
                rent: +value,
                total_allocated_amount: +value + bond + totalInvoiceAmount,
            }
        } else if (name === 'bond_amount') {
            if (+value > 0) {
                r = +total - (+value + +totalInvoiceAmount);
                obj = { ...obj, bond: +value, rent: r <= 0 ? '' : r, total_allocated_amount: +value + rent + totalInvoiceAmount };
            } else {
                r = +total - (+totalInvoiceAmount + +deposit + +supplier)
                obj = { ...obj, bond: '', rent: r <= 0 ? '' : r };
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
            totalAlloc = +totalInvoiceAmount + +rent_amount + +bond;
        } else {
            totalAlloc = +bond + rent_amount;
        }
        return { rent, totalAlloc };
    }

    const handleInputChange = (e) => {
        let val = {};
        if (e.target.name === 'bond_amount') {
            if (Number(e.target.value) || e.target.value === '') {
                val = amountCalculation(e.target.name, e.target.value);
                setState(prev => ({ ...prev, [e.target.name]: val.bond, total_allocated_amount: val.total_allocated_amount }));
            } else { setState(prev => ({ ...prev, [e.target.name]: '' })); }
        } else if (e.target.name === 'rent_amount') {
            val = amountCalculation(e.target.name, e.target.value);
            setState(prev => ({ ...prev, [e.target.name]: val.rent ? val.rent : '', total_allocated_amount: val.total_allocated_amount }));
        } else {
            setState(prev => ({ ...prev, [e.target.name]: Number(e.target.value) ? e.target.value : '' }));
        }
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
            invoices[matchedIndex] = { "index": index, "value": e.target.value, "details": details, 'chart_of_account_id': chart_of_account_id, 'taxAmount':taxAmount };
            const val = amountCalculationWithInvoices(invoices);
            total = val.totalAlloc;
        }
        else {
            invoices.push({ "index": index, "value": e.target.value, "details": details, 'chart_of_account_id': chart_of_account_id, 'taxAmount':taxAmount });
            const val = amountCalculationWithInvoices(invoices);
            total = val.totalAlloc;
        }
        await setState(prev => ({ ...prev, "invoices": invoices, total_allocated_amount: total }));
    }

    let date1 = new Date(props.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.paid_to);
    var date2 = new Date();

    var Difference_In_Time = date2.getTime() - date1.getTime();

    var Difference_In_Days = parseInt(Difference_In_Time / (1000 * 3600 * 24));

    const startLoader = () => setState({ ...state, loader: true });
    const endLoader = () => setState({ ...state, loader: false });

    useEffect(() => {
        if (props.tenant_deposit_receipt_loading === 'Success') {
            toastr.success('Success');
            props.transactionsList("this_month");
            props.tenantDepositReceiptFresh();
            endLoader();
            props.toggleDepositModal('Close');
        }
        if (props.tenant_deposit_receipt_loading === 'Failed') {
            toastr.error('Something went wrong !');
            props.tenantDepositReceiptFresh();
            endLoader();
            props.toggleDepositModal('Close');
        }

        setState({
            ...state,
            "deposit_description": props.tenant_info_data ? props.tenant_info_data.tenantContact.reference : null,
            selectedFolio: props?.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.id,
        })

    }, [props.tenant_info_data, props.tenant_deposit_receipt_loading]);

    const saveReceiptData = async () => {
        await setState({ ...state, "details": props?.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.rent + " " + props?.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.rent_type, loader: true })
        props.tenantDepositReceipt(state);
    }

    return (
        <>
            { state.loader && <Loder status={state.loader} /> }
            <Modal isOpen={props.showDepositModal} scrollable={true} size="lg">
                <ModalHeader >
                    <i className="fas fa-dollar-sign font-size-16 me-1 text-primary"></i>
                    <span className="text-primary">Transfer Deposit</span>
                </ModalHeader>
                <ModalBody>
                    <div>
                        <Card>
                            <CardBody>
                                <Row >
                                    <Col md="6" >
                                        <Row className="pb-3 border-bottom border-2">
                                            <Col sm={4}>Tenant</Col>
                                            <Col sm={8}>{props.tenant_info_data.tenantContact.tenant_one.reference} ({props.tenant_info_data.tenantContact.tenant_one.tenant_folio.folio_code})</Col>
                                        </Row>

                                        <Row className="pb-3 border-bottom border-2">
                                            <label className="col-sm-4">Owner</label>
                                            <div className="col-sm-8"><p>{props.tenant_info_data ? props.tenant_info_data.tenantContact.owner[0]?.reference : null}</p></div>
                                        </Row>

                                        <Row className="pb-3 border-bottom border-2">
                                            <label className="col-sm-4">Property</label>
                                            <div className="col-sm-8"><p>{props.tenant_info_data ? props.tenant_info_data.tenantContact.reference : null}</p></div>
                                        </Row>
                                        <Row className="pb-3 border-bottom border-2">
                                            <label className="col-sm-4">Details</label>
                                            <div className="col-sm-8"><p>{props?.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.rent}৳ {props?.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.rent_type}</p></div>
                                        </Row>
                                    </Col>
                                    <Col md="6">
                                        <Row className="pb-3">
                                            <Col md={6}></Col>
                                            <Col md={6}><b>Deposit balance {props.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.deposit}৳</b></Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row >
                                    <Table className="table mb-2">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Allocation</th>
                                                <th>Due</th>
                                                <th>Description</th>
                                                <th>Amount Due</th>
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
                                                                    <td>Invoice-ID:{item.id}</td>
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
                                                        <td> <Input
                                                            className="form-control "
                                                            type="text"
                                                            name="deposit_description"
                                                            value={state.deposit_description}
                                                            onChange={e => handleInputChange(e)}
                                                            disabled={true}
                                                        /></td>
                                                        <td></td>
                                                        <td>
                                                            <div
                                                                className="d-flex"
                                                            >
                                                                <div className="d-flex flex-column">
                                                                    <Input
                                                                        className="form-control "
                                                                        type="text"
                                                                        style={{
                                                                            borderTopRightRadius: 0,
                                                                            borderBottomRightRadius: 0,
                                                                        }}
                                                                        value={props.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.deposit}
                                                                        disabled={true}
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
                                                </tbody>
                                                :
                                                null
                                        }
                                    </Table>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-danger"
                            onClick={() => props.toggleDepositModal('Close')}
                        >
                            <i className="fas fa-times me-1"></i> Close
                        </button>
                        <button
                            type="submit"
                            className={`btn ${(+state.total_allocated_amount > 0 && +state.total_allocated_amount <= props?.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.deposit) ? 'btn-info' : 'btn-danger'} ms-2`}
                            onClick={saveReceiptData}
                            disabled={(+state.total_allocated_amount > 0 && +state.total_allocated_amount <= props?.tenant_info_data?.tenantContact?.tenant_one?.tenant_folio?.deposit) ? false : true}

                        >
                            <i className="fas fa-file-alt me-1"></i> Save
                        </button>
                    </div>

                </ModalFooter>
            </Modal>

        </>

    );
}


const mapStateToProps = gstate => {
    const {
        tenant_info_data,

        tenant_deposit_receipt_data,
        tenant_deposit_receipt_loading,
    } = gstate.AccountsTransactions;

    return {
        tenant_info_data,

        tenant_deposit_receipt_data,
        tenant_deposit_receipt_loading,
    };
};


export default connect(mapStateToProps, {
    transactionsList,
    tenantDepositReceipt,
    tenantDepositReceiptFresh,
})(AddDepositReceipt);