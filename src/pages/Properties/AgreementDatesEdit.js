import React, { Fragment, useState } from "react";
import { Modal, Row, Col, Label, Button } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

const AgreementDatesEdit = (props) => {
    const [state, setState] = useState(false);
    const toggle = () => {
        setState((prev) => !prev);
    };

    const dateAgreementStartHandler = (selectedDates, dateStr) => {
        props.setState2({ ...props.state2, agreement_start: dateStr });
    };

    const dateAgreementEndHandler = (selectedDates, dateStr) => {
        props.setState2({ ...props.state2, agreement_end: dateStr });
    };

    const handleSave = () => {
        props.handleBondDetails(); 
        props.toggleAgreementDates(); // Close modal after saving
    };

    return (
        <Fragment>
            <Modal
                isOpen={props.toggleAgreementDates} // Using the boolean state here
                toggle={props.toggleAgreementDates} // Close the modal on toggle
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        Edit Agreement Dates
                    </h5>
                    <button
                        type="button"
                        onClick={props.toggleAgreementDates}
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
                                    <Label for="agreement_start" className="form-label text-dark">
                                        Agreement Start
                                    </Label>
                                </Col>
                                <Col md={5}>
                                    <Flatpickr
                                        className="form-control d-block"
                                        placeholder="Pick a date..."
                                        value={props.state2.agreement_start}
                                        options={{
                                            altInput: true,
                                            dateFormat: "Y-m-d",
                                            onChange: dateAgreementStartHandler,
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={3}>
                                    <Label for="agreement_end" className="form-label text-dark">
                                        Agreement End
                                    </Label>
                                </Col>
                                <Col md={5}>
                                    <Flatpickr
                                        className="form-control d-block"
                                        placeholder="Pick a date..."
                                        value={props.state2.agreement_end}
                                        options={{
                                            altInput: true,
                                            dateFormat: "Y-m-d",
                                            onChange: dateAgreementEndHandler,
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className="modal-footer">
                    <Button onClick={props.toggleAgreementDates} color="secondary">
                        Close
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </div>
            </Modal>
        </Fragment>
    );
};

export default AgreementDatesEdit;
