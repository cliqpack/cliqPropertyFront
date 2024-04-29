import React, { Fragment, useState } from "react";
import './propertyTenantBondDetails.css';
import { Modal, Row, Col, ErrorMessage, Label, Field } from "reactstrap";

const TenantBondDetails = (props) => {

    const [state, setState] = useState(false);

    const toggle = () => {
        setState((prev) => !prev);
    }

    return (
        <Fragment>
            <div
                onClick={toggle}
                className="text-primary hoverBondDetails"
            >
                Edit bond details {" "}<i className="fas fa-pen"></i>
            </div>

            <Modal
                isOpen={state}
                toggle={toggle}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        Bond Details
                    </h5>
                    <button
                        type="button"
                        onClick={() =>
                            setState((prev) => !prev)
                        }
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
                                        Bond required
                                    </Label>
                                </Col>
                                <Col md={3}>
                                    <input
                                        placeholder='0.00৳'
                                        name="bond_required"
                                        id="bond_required"
                                        type="number"
                                        className="form-control"
                                        // className={
                                        //     "form-control" +
                                        //     (errors.bond_required &&
                                        //         touched.bond_required
                                        //         ? " is-invalid"
                                        //         : "")
                                        // }
                                        value={
                                            props.state2.bond_required
                                        }
                                        onChange={
                                            props.handlePropertyFormTwoValues
                                        }
                                    />
                                    {/* <ErrorMessage
                                        name="bond_required"
                                        component="div"
                                        className="invalid-feedback"
                                    /> */}
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={3}>
                                    <Label
                                        for="bond_paid"
                                        className="form-label text-dark"
                                    >
                                        Bond already paid
                                    </Label>
                                </Col>
                                <Col md={3}>
                                    <input
                                        placeholder='0.00৳'
                                        name="bond_paid"
                                        id="bond_paid"
                                        type="number"
                                        className="form-control"
                                        // className={
                                        //     "form-control" +
                                        //     (errors.bond_already_paid &&
                                        //         touched.bond_already_paid
                                        //         ? " is-invalid"
                                        //         : "")
                                        // }
                                        value={
                                            props.state2.bond_paid
                                        }
                                        onChange={
                                            props.handlePropertyFormBond
                                        }
                                    />
                                    {/* <ErrorMessage
                                        name="bond_already_paid"
                                        component="div"
                                        className="invalid-feedback"
                                    /> */}
                                </Col>
                                <Col>
                                    <p className="text-muted">
                                        Bond money already paid to the bond authority
                                    </p>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={3}>
                                    <Label
                                        for="bond_receipted"
                                        className="form-label text-dark"
                                    >
                                        Bond receipted
                                    </Label>
                                </Col>
                                <Col md={3}>
                                    <input
                                        placeholder='0.00৳'
                                        name="bond_receipted"
                                        id="bond_receipted"
                                        type="number"
                                        disabled={true}
                                        className="form-control"
                                        // className={
                                        //     "form-control" +
                                        //     (errors.bond_receipted &&
                                        //         touched.bond_receipted
                                        //         ? " is-invalid"
                                        //         : "")
                                        // }
                                        value={
                                            props.state2.bond_receipted
                                        }
                                        onChange={
                                            props.handlePropertyFormTwoValues
                                        }
                                    />
                                    {/* <ErrorMessage
                                        name="bond_receipted"
                                        component="div"
                                        className="invalid-feedback"
                                    /> */}
                                </Col>
                            </Row>



                            <Row className="mb-3">
                                <Col md={3}>
                                    <Label
                                        for="bond_held"
                                        className="form-label text-dark"
                                    >
                                        Bond held
                                    </Label>
                                </Col>
                                <Col md={3}>
                                    <input
                                        placeholder='0.00৳'
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
                                    />
                                    {/* <ErrorMessage
                                        name="bond_held"
                                        component="div"
                                        className="invalid-feedback"
                                    /> */}
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={3}>
                                    <Label
                                        for="bond_held"
                                        className="form-label text-dark"
                                    >
                                        Bond arrears
                                    </Label>
                                </Col>
                                <Col md={3}>
                                    <input
                                        placeholder='0.00৳'
                                        name="bond_arrears"
                                        id="bond_arrears"
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
                                            props.state2.bond_arrears
                                        }
                                        onChange={
                                            props.handlePropertyFormTwoValues
                                        }
                                    />
                                    {/* <ErrorMessage
                                        name="bond_held"
                                        component="div"
                                        className="invalid-feedback"
                                    /> */}
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={3}>
                                    <Label
                                        for="bond_reference"
                                        className="form-label text-dark"
                                    >
                                        Bond reference
                                    </Label>
                                </Col>
                                <Col md={7}>
                                    <input
                                        name="bond_reference"
                                        id="bond_reference"
                                        type="text"
                                        className="form-control"
                                        // className={
                                        //     "form-control" +
                                        //     (errors.bond_reference &&
                                        //         touched.bond_reference
                                        //         ? " is-invalid"
                                        //         : "")
                                        // }
                                        value={
                                            props.state2.bond_reference
                                        }
                                        onChange={
                                            props.handlePropertyFormTwoValues
                                        }
                                    />
                                    {/* <ErrorMessage
                                        name="bond_reference"
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

export default TenantBondDetails;