import React, { useEffect, useState } from "react";
import {
    Col,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { connect } from "react-redux";
import { reverseReceipt, reverseReceiptFresh, transactionsList } from "store/actions";
import toastr from "toastr";
const TransactionsInfoModalReverse = props => {
    const [state, setState] = useState({});
    const handleValues = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };
    const handleSubmit = () => {
        props.reverseReceipt(state, props.state.receipt_id, props.state?.transactionsDetails?.type);
    }
    useEffect(() => {
        if (props.reverse_receipt_loading === "Success") {
            toastr.success("Reversed successfully");
            props.reverseReceiptFresh();
            props.transactionsList();
            props.toggleinfo();
            props.toggle();
        }
        if (props.reverse_receipt_loading === "INSUFFICIENT_BALANCE") {
            toastr.error(props.reverse_receipt_data.message);
            props.reverseReceiptFresh();
            props.transactionsList();
            props.toggleinfo();
            props.toggle();
        }
        if (props.reverse_receipt_loading === "Failed") {
            toastr.error('Failed!');
            props.reverseReceiptFresh();
            props.toggleinfo();
            props.toggle();
        }
    }, [props.reverse_receipt_loading]);
    return (
        <>
            <Modal isOpen={props.state.transactionInfoModalReverse} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>
                    <span className="text-primary">
                        Reverse Transactions
                    </span>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={12}>
                            <div className="mb-3 w-100">
                                <Row className="d-flex align-items-center">
                                    <label>Please confirm to proceed with reversal and provide a reason:</label>
                                    <Col md={12}>
                                        <input
                                            name="reason"
                                            type="text"
                                            placeholder="Reason for reversal"
                                            onChange={handleValues}
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-danger"
                            onClick={props.toggle}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-info ms-2"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    );
};
const mapStateToProps = gstate => {
    const {
        reverse_receipt_data,
        reverse_receipt_error,
        reverse_receipt_loading,
    } = gstate.AccountsTransactions;
    return {
        reverse_receipt_data,
        reverse_receipt_error,
        reverse_receipt_loading,
    };
};
export default connect(mapStateToProps, {
    reverseReceipt, reverseReceiptFresh, transactionsList,
})(TransactionsInfoModalReverse);