import React, { Fragment, useEffect, useState } from "react";
import './propertyTenantBondDetails.css';
import { Modal, Row, Col, ErrorMessage, Label, Field } from "reactstrap";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

const TenantMoveOutDetails = (props) => {


    const toggle = () => {
        setState((prev) => !prev);
    }

    const handlePropertyFormTwoValues = e => {
        console.log(e.target.name);
        props.setState2({ ...props.state2, ['bond_notes']: e.target.value })
    }

    const dateMoveOutHandler = (selectedDates, dateStr, instance) => {
        console.log(dateStr);
        props.setState2({ ...props.state2, ["move_out"]: dateStr });
    };
    const dateBreakLeaseHandler = (selectedDates, dateStr, instance) => {
        console.log(dateStr);
        props.setState2({ ...props.state2, ["break_lease"]: dateStr });
    };
    const dateTerminationHandler = (selectedDates, dateStr, instance) => {
        console.log(dateStr);
        props.setState2({ ...props.state2, ["termination"]: dateStr });
    };

    return (
        <Fragment>
            <div
                onClick={props.toggle}
                className="text-primary hoverBondDetails"
            >
                Edit Move Out Details {" "}<i className="fas fa-pen"></i>
            </div>

            <Modal
                isOpen={props.moveOutShow}
                toggle={props.toggle}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        Edit Move Out Details
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
                    <Row>
                        <Col md={12}>
                            <Row className="mb-3">
                                <Col md={3}>
                                    <Label
                                        for="bond_required"
                                        className="form-label text-dark"
                                    >
                                        Move out
                                    </Label>
                                </Col>
                                <Col md={5}>
                                    <Flatpickr
                                        className="form-control d-block"
                                        placeholder="Pick a date..."
                                        value={
                                            props.state2.move_out
                                        }
                                        // disabled={disabledState}
                                        // onChange={() => dateHandler()}
                                        options={{
                                            altInput: true,
                                            format:
                                                "d/m/Y",
                                            altFormat:
                                                "d/m/Y",
                                            onChange:
                                                dateMoveOutHandler,
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={3}>
                                    <Label
                                        for="break_lease"
                                        className="form-label text-dark"
                                    >
                                        Break lease
                                    </Label>
                                </Col>
                                <Col md={5}>
                                    {/* <input
                                        placeholder='0.00'
                                        name="break_lease"
                                        id="break_lease"
                                        type="date"
                                        className="form-control"
                                        // className={
                                        //     "form-control" +
                                        //     (errors.bond_already_paid &&
                                        //         touched.bond_already_paid
                                        //         ? " is-invalid"
                                        //         : "")
                                        // }
                                        value={
                                            props.state2.break_lease
                                        }
                                        onChange={
                                            props.handlePropertyFormTwoValues
                                        }
                                    /> */}
                                    <Flatpickr
                                        className="form-control d-block"
                                        placeholder="Pick a date..."
                                        value={
                                            props.state2.break_lease
                                        }
                                        // disabled={disabledState}
                                        // onChange={() => dateHandler()}
                                        options={{
                                            altInput: true,
                                            format:
                                                "d/m/Y",
                                            altFormat:
                                                "d/m/Y",
                                            onChange:
                                                dateBreakLeaseHandler,
                                        }}
                                    />
                                    {/* <ErrorMessage
                                        name="bond_already_paid"
                                        component="div"
                                        className="invalid-feedback"
                                    /> */}
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={3}>
                                    <Label
                                        for="termination"
                                        className="form-label text-dark"
                                    >
                                        Termination
                                    </Label>
                                </Col>
                                <Col md={5}>
                                    {/* <input
                                        placeholder='$0.00'
                                        name="termination"
                                        id="termination"
                                        type="date"
                                        disabled={true}
                                        className="form-control"
                                        // className={
                                        //     "form-control" +
                                        //     (errors.termination &&
                                        //         touched.termination
                                        //         ? " is-invalid"
                                        //         : "")
                                        // }
                                        value={
                                            props.state2.termination
                                        }
                                        onChange={
                                            props.handlePropertyFormTwoValues
                                        }
                                    /> */}
                                    <Flatpickr
                                        className="form-control d-block"
                                        placeholder="Pick a date..."
                                        value={
                                            props.state2.termination
                                        }
                                        // disabled={disabledState}
                                        // onChange={() => dateHandler()}
                                        options={{
                                            altInput: true,
                                            format:
                                                "d/m/Y",
                                            altFormat:
                                                "d/m/Y",
                                            onChange:
                                                dateTerminationHandler,
                                        }}
                                    />
                                    {/* <ErrorMessage
                                        name="termination"
                                        component="div"
                                        className="invalid-feedback"
                                    /> */}
                                </Col>
                            </Row>



                            <Row className="mb-3">
                                <Col md={3}>
                                    <Label
                                        for="bond_notes"
                                        className="form-label text-dark"
                                    >
                                        Notes
                                    </Label>
                                </Col>
                                <Col md={7}>
                                    <textarea className="form-control" name="bond_notes" onChange={handlePropertyFormTwoValues} value={props.state2.bond_notes}></textarea>
                                    {/* <input
                                        placeholder='$0.00'
                                        name="bond_held"
                                        id="bond_held"
                                        type="number"
                                        disabled={true}
                                        className="form-control"
                                        // className={
                                        //     "form-control" +
                                        //     (errors.bond_held &&
                                        //         touched.bond_held
                                        //         ? " is-invalid"
                                        //         : "")
                                        // }
                                        value={
                                            props.state2.bond_paid
                                        }
                                        onChange={
                                            props.handlePropertyFormTwoValues
                                        }
                                    /> */}
                                    {/* <ErrorMessage
                                        name="bond_held"
                                        component="div"
                                        className="invalid-feedback"
                                    /> */}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </Fragment>
    )
}

export default TenantMoveOutDetails;