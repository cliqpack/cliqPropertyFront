import React, { Fragment, useState, useEffect } from "react";
import { Modal, Row, Col, ErrorMessage, Label, Field, Alert, Input, Button, UncontrolledAlert } from "reactstrap";
import { RentActionStore, RentActionStoreFresh, RentActionList, RentActionListFresh, getPropertyTenantInfo, DeleteRentAction, DeleteRentActionFresh } from "store/actions";
import toastr from "toastr";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const CreditRent = (props) => {

    const [state, setState] = useState({
        amount: props.data ? props.data?.amount : '',
        comment: props.data ? props.data?.details : '',
        error: '',
    });

    const handleFormState = (e) => {
        setState({ ...state, [e.target.name]: e.target.value, error: '' });
    }

    const handleSave = () => {
        if (state.amount <= 0) {
            setState({ ...state, error: 'Amount must be greater than 0' });
        } else if (state.comment === '') {
            setState({ ...state, error: 'Comment cannot be empty' });
        } else {
            props.RentActionStore(state, props.folioId);
        }
    }
    const deleteHandler = () => {
        props.DeleteRentAction(props.data);
    }

    useEffect(() => {
        if (props.rent_action_store_loading === 'Success') {
            toastr.success('Rent credited successfully');
            props.RentActionStoreFresh();
            props.RentActionList(props.folioId);
            props.getPropertyTenantInfo(props.propertyId);
            props.toggle();
        }
        if (props.delete_rent_action_loading === 'Success') {
            toastr.error('Rent credit deleted');
            props.DeleteRentActionFresh();
            props.RentActionList(props.folioId);
            props.getPropertyTenantInfo(props.propertyId);
            props.toggle();
        }
    }, [props.rent_action_store_loading, props.delete_rent_action_loading]);

    return (
        <Fragment>
            <Modal
                isOpen={props.creditRent}
                toggle={props.toggle}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        Credit Rent
                    </h5>
                    <button
                        type="button"
                        onClick={props.toggle}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {state.error &&
                        <UncontrolledAlert
                            color="danger"
                            className="alert-dismissible fade show mb-3"
                            role="alert"
                        >
                            <i className="mdi mdi-block-helper me-2"></i>{state.error}
                        </UncontrolledAlert>}
                    <Alert color="info">
                        <i className="fab fa-medapps"></i> Rent Credit <br />
                        Credit the tenant an amount of rent. <br />
                        This will apply immediately and advance the tenant&apos;s paid to date. <br />
                    </Alert>
                    <Row className="mb-3">
                        <Col md={4}>
                            <Label
                                for="bond_required"
                                className="form-label text-dark"
                            >
                                Credit amount
                            </Label>
                        </Col>
                        <Col md={4}>
                            <div
                                className="d-flex"
                            >
                                <div className="d-flex flex-column">
                                    <Input
                                        disabled={props.data ? true : false}
                                        placeholder="0.00৳"
                                        className="form-control "
                                        type="text"
                                        name="amount"
                                        onChange={handleFormState}
                                        style={{
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                        }}
                                        value={
                                            state.amount
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
                    <Row className="mb-3">
                        <Col md={4}>
                            <Label
                                for="comment"
                                className="form-label text-dark"
                            >
                                Comment
                            </Label>
                        </Col>
                        <Col md={7}>
                            <input
                                disabled={props.data ? true : false}
                                name="comment"
                                id="comment"
                                type="text"
                                className="form-control"
                                value={
                                    state.comment
                                }
                                onChange={handleFormState}
                            />
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end" style={{ width: '95%' }}>
                        <Button onClick={props.toggle} className="ms-2">
                            <i className="fas fa-times"></i> Cancel
                        </Button>
                        {
                            props.data &&
                            <Button color="danger" onClick={deleteHandler} className="ms-2" disabled={props.data?.status === 0 ? true : false}>
                                <i className="fas fa-trash-alt"></i> Delete
                            </Button>
                        }
                        {
                            !props.data &&
                            <Button color="info" className="ms-2" onClick={handleSave} disabled={props.data ? true : false}>
                                <i className="far fa-save"></i> Save
                            </Button>
                        }
                    </div>
                </div>
            </Modal>
        </Fragment>
    )
}

const mapStateToProps = gstate => {
    const {
        rent_action_store_loading,
        delete_rent_action_loading,
    } = gstate.AccountsTransactions;

    return {
        rent_action_store_loading,
        delete_rent_action_loading,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        RentActionStore,
        RentActionStoreFresh,
        RentActionList,
        RentActionListFresh,
        getPropertyTenantInfo,
        DeleteRentAction,
        DeleteRentActionFresh,
    })(CreditRent)
);