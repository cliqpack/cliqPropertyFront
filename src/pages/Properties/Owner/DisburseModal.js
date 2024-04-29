import moment from "moment";
import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { connect } from "react-redux";
import { storeSingleDisbursement, storeSingleDisbursementFresh, supplierDisbursement, supplierDisbursementFresh, supplierFolioInfo } from "store/actions";


import toastr from "toastr";



const DisburseModal = props => {
    const currentDate = moment().format('YYYY-MM-DD');

    const [state, setState] = useState({ date: currentDate })


    const handleSave = (e) => {
        e.preventDefault();
        if (props.supplierId) {
            props.supplierDisbursement(props.supplierId);
        } else {

            props.storeSingleDisbursement(props.ownerId);
        }
    }

    const handleClose = (e) => {
        e.preventDefault();
        props.toggle();
    }

    useEffect(() => {
        if (props.store_single_disbursement_loading === 'Success') {
            toastr.success('Disbursed');
            props.storeSingleDisbursementFresh();
            props.supplierInfoApi()
            props.tabcall();
            props.toggle();
        }
        if (props.supplier_folio_disbursement_loading === 'Success') {
            toastr.success('Disbursed');
            props.supplierDisbursementFresh();
            props.supplierFolioInfo(props.supplierId);
            props.tabcall();

            props.toggle();
        }
        if (props.supplier_folio_disbursement_loading === 'Failed') {
            toastr.error('Failed');
            props.supplierDisbursementFresh();
            // props.toggle();
        }
    }, [props.store_single_disbursement_loading, props.supplier_folio_disbursement_loading]);

    console.log(props.store_single_disbursement_loading);

    return (
        <>
            <Modal isOpen={props.state.disburseModal} toggle={props.toggle} scrollable={true}>
                <ModalHeader toggle={props.toggle}>

                    {/* <span className="text-primary">Are you sure you want to disburse Henry Rose (OWN00033) now?</span> */}
                </ModalHeader>

                <ModalBody>

                    {/* <div>
                        This disbursement will not change the Next Disbursement Date for this owner. If required, check and amend the Next Disbursement Date for this owner after processing this manual disbursement.
                    </div> */}
                    <span className="text-primary">Are you sure you want to disburse now?</span>

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
        store_single_disbursement_loading
    } = gstate.Disbursement;
    const {
        supplier_folio_disbursement_loading
    } = gstate.supplier;
    return {
        store_single_disbursement_loading, supplier_folio_disbursement_loading
    };
};

export default connect(mapStateToProps, {
    storeSingleDisbursement, storeSingleDisbursementFresh, supplierDisbursement, supplierDisbursementFresh, supplierFolioInfo
})(DisburseModal);
