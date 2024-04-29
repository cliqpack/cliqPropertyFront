import React, { Fragment, useEffect, useState } from "react";
import {
    Col,
    Row,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import moment from "moment";
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import { chargeOwnerManualFee, chargeOwnerManualFeeFresh } from "store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import toastr from "toastr";

const ChargeManualFeeModal = (props) => {
    const date = moment().format("yyyy-MM-DD");
    const [error, setError] = useState({
        description: '',
        price: '',
    });
    const [state, setState] = useState({
        manual_id: props.data.id,
        description: props.data.description,
        price: '',
        date: date,
        property_id: props.data.property_id,
        owner_folio_id: props.data.owner_folio_id
    });

    const stateHandler = (e) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const dateHandler = (selectedDates, dateStr, instance) => {
        setState(prev => ({ ...prev, ['date']: dateStr }));
    }

    const handleSave = (e) => {
        e.preventDefault();
        if (state.price === '') {
            setError(prev => ({
                ...prev,
                price: 'Please enter amount',
            }));
        }
        if (state.price !== '') {
            props.chargeOwnerManualFee(state);
        }
    };

    useEffect(()=>{
        if (props.charge_manual_fee_data_loading === 'Success') {
            toastr.success(props.charge_manual_fee_data.message);
            props.chargeOwnerManualFeeFresh();
            props.toggle();
        }
    }, [props.charge_manual_fee_data_loading]);

    return <Fragment>
        <Modal
            isOpen={props.modalState}
            toggle={props.toggle}
            size="lg"
            style={{ width: '600px' }}
        >
            <ModalHeader toggle={props.toggle}>Charge Manual Fee</ModalHeader>
            <ModalBody>
                <Row>
                    <Col lg={12}>
                        <Row className="py-2">
                            <Col md={4} className="d-flex justify-content-start ps-5">
                                Fee
                            </Col>
                            <Col md={8} className="">
                                <div>
                                    {props.data.description}
                                </div>
                            </Col>
                        </Row>
                        <Row className="py-2">
                            <Col md={4} className="d-flex justify-content-start ps-5">
                                Notes
                            </Col>
                            <Col md={8} className="">
                                <div>
                                    {props.data.notes}
                                </div>
                            </Col>
                        </Row>
                        <Row className="py-2">
                            <Col md={4} className="d-flex justify-content-start ps-5">
                                Date
                            </Col>
                            <Col md={3} className="">
                                <div>
                                    <Flatpickr
                                        className="form-control"
                                        placeholder="Pick a date..."
                                        value={state.date}
                                        options={{
                                            altInput: true,
                                            format: "d/m/Y",
                                            altFormat: "d/m/Y",
                                            onChange: dateHandler
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className="py-2">
                            <Col md={4} className="d-flex justify-content-start ps-5">
                                Description
                            </Col>
                            <Col md={8} className="">
                                <div>
                                    <input
                                        className="form-control px-2"
                                        type="text"
                                        name="description"
                                        placeholder="Description"
                                        onChange={stateHandler}
                                        value={state.description}
                                    />
                                </div>
                                {
                                    error.description !== '' &&
                                    <div className="text-danger">
                                        {error.description}
                                    </div>
                                }
                            </Col>
                        </Row>
                        <Row className="py-2">
                            <Col md={4} className="d-flex justify-content-start ps-5">
                                Amount
                            </Col>
                            <Col md={3} className="">
                                <Row className="d-flex align-items-center">
                                    <Col
                                        md={12}
                                        className="d-flex mb-3"
                                    >
                                        <span className="input-group-append">
                                            <span
                                                className="input-group-text"
                                                style={{
                                                    borderTopRightRadius: 0,
                                                    borderBottomRightRadius: 0,
                                                }}
                                            >
                                                ৳
                                            </span>
                                        </span>
                                        <div className="d-flex flex-column">
                                            <input
                                                className="form-control"
                                                name="price"
                                                id="amount"
                                                type="text"
                                                placeholder="0.00"
                                                style={{
                                                    borderTopLeftRadius: 0,
                                                    borderBottomLeftRadius: 0,
                                                    borderTopRightRadius: 5,
                                                    borderBottomRightRadius: 5,
                                                }}
                                                value={state.price}
                                                onChange={stateHandler}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                {
                                    error.price !== '' &&
                                    <div className="text-danger">
                                        {error.price}
                                    </div>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={props.toggle}>
                    <i className="fas fa-times me-1"></i>Cancel
                </Button>
                <Button color="info" onClick={handleSave}>
                    <i className="fas fa-file-alt me-1"></i> Save
                </Button>
            </ModalFooter>
        </Modal>
    </Fragment>
}

const mapStateToProps = gstate => {
    const {
        charge_manual_fee_data,
        charge_manual_fee_data_loading,
    } = gstate.property;
    return {
        charge_manual_fee_data,
        charge_manual_fee_data_loading,
    };
};


export default withRouter(
    connect(mapStateToProps, {
        chargeOwnerManualFee, chargeOwnerManualFeeFresh
    })(ChargeManualFeeModal)
);