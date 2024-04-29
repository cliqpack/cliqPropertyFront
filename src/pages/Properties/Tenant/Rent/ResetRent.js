import React, { Fragment, useState, useEffect } from "react";
import { Modal, Row, Col, ErrorMessage, Label, Field, Alert, Input, Button, UncontrolledAlert } from "reactstrap";
import { getPropertyTenantInfo, RentReset, RentResetFresh, rentManagementList } from "store/actions";
import toastr from "toastr";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import moment from "moment";

const ResetRent = (props) => {
    const paid_to = moment().format("YYYY-MM-DD");
    const [state, setState] = useState({
        tenant_id: '',
        property_id: '',
        reason: '',
        paid_to,
        part_paid: '',
        rent: '',
        rent_type: '',
        button: {
            weekly: true,
            fortNightly: false,
            monthly: false,
        }
    });

    const handleFormState = (e) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSave = () => {
        props.RentReset(state)
    }

    const dateDueToHandler = (selectedDates, dateStr, instance) => {
        setState(prev => ({ ...state, ["paid_to"]: dateStr }));
    };

    const toggleButton = (type) => {
        setState(prev => ({
            ...prev,
            rent_type: type,
            button: {
                weekly: type == 'Weekly' ? true : false,
                fortNightly: type == 'FortNightly' ? true : false,
                monthly: type == 'Monthly' ? true : false,
            }
        }))
    }
    useEffect(() => {
        props.getPropertyTenantInfo(props.propertyId)
    }, [])
    useEffect(() => {
        if (props.reset_rent_loading == 'Success') {
            // props.rentManagementList(props.contactId, props.propertyId);
            toastr.success('Rent Management Reset Successful')
            props.RentResetFresh()
            props.rentManagementApi()
            props.toggle()
        }
    }, [props.reset_rent_loading])
    useEffect(() => {
        setState({
            tenant_id: props.property_tenant_info_data?.data?.folio?.tenant_contact_id,
            property_id: props.property_tenant_info_data?.data?.folio?.property_id,
            paid_to: props.property_tenant_info_data?.data?.folio?.paid_to,
            rent: props.property_tenant_info_data?.data?.folio?.rent,
            rent_type: props.property_tenant_info_data?.data?.folio?.rent_type,
            button: {
                weekly: props.property_tenant_info_data?.data?.folio?.rent_type == 'Weekly' ? true : false,
                fortNightly: props.property_tenant_info_data?.data?.folio?.rent_type == 'FortNightly' ? true : false,
                monthly: props.property_tenant_info_data?.data?.folio?.rent_type == 'Monthly' ? true : false,
            }
        })
    }, [props.property_tenant_info_data?.data])

    return (
        <Fragment>
            <Modal
                isOpen={props.resetRentState}
                toggle={props.toggle}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        Reset Rent
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
                        </UncontrolledAlert>}
                    <Alert color="info">
                        <i className="fab fa-medapps"></i> Rent Credit <br />
                        Credit the tenant an amount of rent. <br />
                        This will apply immediately and advance the tenant&apos;s paid to date. <br />
                    </Alert> */}
                    <Row className="mb-3">
                        <Col md={2}>
                            <Label
                                for="reason"
                                className="form-label text-dark"
                            >
                                Reason
                            </Label>
                        </Col>
                        <Col md={10}>
                            <input
                                name="reason"
                                id="reason"
                                type="text"
                                className="form-control"
                                value={
                                    state.reason
                                }
                                onChange={handleFormState}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={2}>
                            <Label
                                for="rent"
                                className="form-label text-dark"
                            >
                                Rent
                            </Label>
                        </Col>
                        <Col md={3}>
                            <div
                                className="d-flex"
                            >
                                <div className="d-flex flex-column">
                                    <Input
                                        placeholder="0.00৳"
                                        className="form-control "
                                        type="text"
                                        name="rent"
                                        onChange={handleFormState}
                                        style={{
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                        }}
                                        value={
                                            state.rent
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
                        <Col md={5}>
                            <div className="btn-group btn-group-justified">
                                <div className="btn-group">
                                    <Button
                                        color={
                                            state.button.weekly
                                                ? "secondary"
                                                : "light"
                                        }
                                        onClick={() => { toggleButton('Weekly') }}
                                    >
                                        <span>
                                            {" "}
                                            Weekly
                                        </span>
                                    </Button>
                                </div>
                                <div className="btn-group">
                                    <Button
                                        color={
                                            state.button.fortNightly
                                                ? "secondary"
                                                : "light"
                                        }
                                        onClick={() => { toggleButton('FortNightly') }}
                                    >
                                        <span>
                                            {" "}
                                            fortnightly
                                        </span>
                                    </Button>
                                </div>
                                <div className="btn-group">
                                    <Button
                                        color={
                                            state.button.monthly
                                                ? "secondary"
                                                : "light"
                                        }
                                        onClick={() => { toggleButton('Monthly') }}
                                    >
                                        <span>
                                            {" "}
                                            Monthly
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={2}>
                            <Label
                                for="paid_to"
                                className="form-label text-dark"
                            >
                                Paid to
                            </Label>
                        </Col>
                        <Col md={4}>
                            <Flatpickr
                                className="form-control d-block"
                                placeholder="Pick a date..."
                                value={state.paid_to}
                                options={{
                                    altInput: true,
                                    format: "d/m/Y",
                                    altFormat: "d/m/Y",
                                    onChange: dateDueToHandler,
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={2}>
                            <Label
                                for="part_paid"
                                className="form-label text-dark"
                            >
                                Part Paid
                            </Label>
                        </Col>
                        <Col md={4}>
                            <div
                                className="d-flex"
                            >
                                <div className="d-flex flex-column">
                                    <Input
                                        placeholder="0.00৳"
                                        className="form-control "
                                        type="text"
                                        name="part_paid"
                                        onChange={handleFormState}
                                        style={{
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                        }}
                                        value={
                                            state.part_paid
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

                    <div className="d-flex justify-content-end" style={{ width: '95%' }}>
                        <Button onClick={props.toggle} className="ms-2">
                            <i className="fas fa-times"></i> Cancel
                        </Button>
                        <Button color="info" className="ms-2" onClick={handleSave} disabled={!state.reason ? true : false}>
                            <i className="far fa-save"></i> Save
                        </Button>
                    </div>
                </div>
            </Modal>
        </Fragment>
    )
}

const mapStateToProps = gstate => {
    const {
        property_tenant_info_data
    } = gstate.property;
    const {
        reset_rent_loading
    } = gstate.AccountsTransactions;

    return {
        property_tenant_info_data, reset_rent_loading
    };
};

export default withRouter(
    connect(mapStateToProps, {
        getPropertyTenantInfo, RentReset, RentResetFresh, rentManagementList
    })(ResetRent)
);