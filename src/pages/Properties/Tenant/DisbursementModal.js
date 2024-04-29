import React, { useEffect } from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { connect } from "react-redux";
import { disburseTenant, disburseTenantFresh } from "store/actions";

import toastr from "toastr";

const DisbursementModal = props => {

    const handleSave = (e) => {
        e.preventDefault();
        props.disburseTenant(props.data.id, props.data.folioId);
    }

    const handleClose = (e) => {
        e.preventDefault();
        props.toggle();
    }

    useEffect(() => {
        if (props.disburse_tenant_loading === 'EMPTY_PAYMENT_METHOD') {
            toastr.warning(props.disburse_tenant_data.message);
            props.disburseTenantFresh();
            props.toggle();
        }
        if (props.disburse_tenant_loading === 'EMPTY_TENANT_DEPOSIT') {
            toastr.warning(props.disburse_tenant_data.message);
            props.disburseTenantFresh();
            props.toggle();
        }
        if (props.disburse_tenant_loading === 'Success') {
            toastr.success(props.disburse_tenant_data.message);
            props.disburseTenantFresh();
            props.toggle();
        }
        if (props.disburse_tenant_loading === 'Failed') {
            toastr.danger('Tenant disbursed failed');
            props.disburseTenantFresh();
            props.toggle();
        }
    }, [props.disburse_tenant_loading]);

    return (
        <>
            <Modal isOpen={props.disburseModal} toggle={props.toggle} scrollable={true}>
                <ModalHeader toggle={props.toggle}>

                </ModalHeader>

                <ModalBody>
                    <span className="text-primary">Are you sure you want to disburse {props.data.reference} ({props.data.folio_code}) now?</span>
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-secondary"
                            onClick={handleClose}
                        >
                            <i className="fas fa-times me-1"></i>Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-info ms-2"
                            onClick={handleSave}
                        >
                            Ok
                        </button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    );
};
const mapStateToProps = gstate => {

    const {
        disburse_tenant_data,
        disburse_tenant_error,
        disburse_tenant_loading,
    } = gstate.AccountsTransactions;
    return {
        disburse_tenant_data,
        disburse_tenant_error,
        disburse_tenant_loading,
    };
};

export default connect(mapStateToProps, {
    disburseTenant, disburseTenantFresh
})(DisbursementModal);
