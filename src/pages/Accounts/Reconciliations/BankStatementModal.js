import moment from "moment";
import React, { useEffect, useState } from "react";
import {
    Col,
    Row,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { connect } from "react-redux";
import { editBankStatementModel, editBankStatementModelFresh, ReconciliationDataFresh, ReconciliationData } from "store/actions";
import toastr from "toastr";
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
const BankStatementModal = props => {
    const [seen, setSeen] = useState(false);
    const currentDate = moment().format("yyyy-MM-DD");
    const [state, setState] = useState({ date: currentDate });

    const handleValues = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };


    const handleSave = () => {
        props.editBankStatementModel(state, props.id);
        props.toggle();
    }

    useEffect(() => {
        if (props) {
            setState({ date: props.date ? props.date : currentDate, balance: props.balance ? props.balance : '' })
        }
        if (props.bank_statement_edit_loading === 'Success') {
            toastr.success('Success')
            props.editBankStatementModelFresh();
            props.ReconciliationData(props.reconciliation_id);
            props.ReconciliationDataFresh();
        }
    }, [props.bank_statement_edit_loading, props.date, props.balance])

    const dateHandler = (selectedDates, dateStr, instance) => {
        setState({ ...state, ['date']: dateStr });
    }
    const handleRecon = () => {
        return;
    }
    return (
        <>
            <div className="text-primary"
                style={{ cursor: 'pointer' }}
                onClick={ (props?.reconciliation_status === 'approved' || props?.reconciliation_status === 'closed') ? handleRecon : props.toggle }

                aria-disabled={ (props?.reconciliation_status === 'approved' || props?.reconciliation_status === 'closed') ? 'true' : 'false' }
            >
                Bank Statement Balance as at:
            </div>
            <Modal isOpen={props.state.showModal} toggle={props.toggle} scrollable={true}>
                <ModalHeader toggle={props.toggle}>
                    {/* <i className="fas fa-dollar-sign font-size-16 me-1 text-primary"></i> */}
                    <span className="text-primary">Bank Statement Balance</span>
                </ModalHeader>
                <ModalBody>
                    <div>
                        <div className="mb-3 w-75">
                            <Row className="d-flex align-items-center">
                                <Col md={5}>
                                    <Label for="refernce" className="form-label">
                                        Date
                                    </Label>
                                </Col>
                                <Col md={6}>
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
                        </div>
                        <div className="mb-3 w-75">
                            <Row className="d-flex align-items-center">
                                <Col md={5}>
                                    <Label for="refernce" className="form-label">
                                        Bank balance
                                    </Label>
                                </Col>
                                <Col md={5}>
                                    <div
                                        className="d-flex"
                                    >
                                        <div className="d-flex flex-column">
                                            <Input
                                                className="form-control "
                                                type="text"
                                                placeholder="0.00"
                                                name="balance"
                                                onChange={handleValues}
                                                value={state.balance}
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
                                </Col>
                            </Row>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-info"
                            onClick={props.toggle}
                        >
                            <i className="fas fa-times me-1"></i> Close
                        </button>
                        <button
                            type="submit"
                            className="btn btn-info ms-2"
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
        bank_statement_edit_loading, bank_statement_edit_data
    } = gstate.Reconciliations;
    return {
        bank_statement_edit_loading, bank_statement_edit_data
    };
};
export default connect(mapStateToProps, {
    editBankStatementModel, editBankStatementModelFresh, ReconciliationDataFresh, ReconciliationData
})(BankStatementModal);
