import React, { Fragment, useState, useEffect } from "react";
import { Modal, Row, Col, ErrorMessage, Label, Field, Alert, Input, Button, UncontrolledAlert } from "reactstrap";
import { } from "store/actions";
import toastr from "toastr";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import moment from "moment";

const ProRata = (props) => {
    const due_to = moment().format("YYYY-MM-DD");
    const [state, setState] = useState({
        due_to
    });

    const handleFormState = (e) => {
        setState();
    }

    const handleSave = () => {

    }
    const deleteHandler = () => {

    }

    const dateDueToHandler = (selectedDates, dateStr, instance) => {
        setState({ ...state, ["due_to"]: dateStr });
    };

    useEffect(() => {

    }, []);

    return (
        <Fragment>
            <Modal
                isOpen={props.proRataState}
                toggle={props.toggle}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        Pro-rata Rent Period
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
                    {/* {state.error &&
                        <UncontrolledAlert
                            color="danger"
                            className="alert-dismissible fade show mb-3"
                            role="alert"
                        >
                            <i className="mdi mdi-block-helper me-2"></i>{state.error}
                        </UncontrolledAlert>} */}
                    {/* <Alert color="info">
                        <i className="fab fa-medapps"></i> Rent Credit <br />
                        Credit the tenant an amount of rent. <br />
                        This will apply immediately and advance the tenant&apos;s paid to date. <br />
                    </Alert> */}
                    <Row className="mb-3">
                        <Col md={4}>
                            <Label
                                for="bond_required"
                                className="form-label text-dark"
                            >
                                Pro-rata to
                            </Label>
                        </Col>
                        <Col md={4}>
                            <Flatpickr
                                className="form-control d-block"
                                placeholder="Pick a date..."
                                value={state.due_to}
                                options={{
                                    altInput: true,
                                    format: "d/m/Y",
                                    altFormat: "d/m/Y",
                                    onChange: dateDueToHandler,
                                }}
                            />
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end" style={{ width: '95%' }}>
                        <Button onClick={props.toggle} className="ms-2">
                            <i className="fas fa-times"></i> Cancel
                        </Button>
                        {/* {
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
                        } */}
                    </div>
                </div>
            </Modal>
        </Fragment>
    )
}

const mapStateToProps = gstate => {
    const {

    } = gstate.AccountsTransactions;

    return {

    };
};

export default withRouter(
    connect(mapStateToProps, {

    })(ProRata)
);