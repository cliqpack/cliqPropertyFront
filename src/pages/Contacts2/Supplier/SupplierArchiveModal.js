import React, { useEffect } from "react";
import { Modal, ModalHeader, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { supplierArchive, supplierArchiveFresh } from "store/actions";
import toastr from "toastr";

const SupplierArchiveModal = props => {

    const handleSave = e => {
        e.preventDefault();
        props.setState(prev => ({ ...prev, loader: true }))
        props.supplierArchive(props.id, '0');
    };

    const handleClose = e => {
        e.preventDefault();
        props.toggle();
    };

    useEffect(() => {
        if (props.archive_supplier_loading === 'Success') {
            if (props.archive_supplier_data?.staus == 0) {
                toastr.warning(props.archive_supplier_data?.message);
            } else {
                toastr.success('Success');
            }
            props.setState(prev => ({ ...prev, loader: false }))
            props.supplierArchiveFresh();
            props.toggle();
        }
    }, [props.archive_supplier_loading, props.archive_supplier_data]);

    return (
        <>
            <Modal
                size="lg"
                isOpen={props.state.archiveModal}
                toggle={props.toggle}
                scrollable={true}
            >
                <ModalHeader toggle={props.toggle}>
                    <span className="text-primary">
                        Are you sure you want to archive the folio SUP000{props.id} from all future
                        transactions?
                    </span>
                </ModalHeader>

                <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-info"
                            onClick={handleClose}
                        >
                            Cancel
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
    const { archive_supplier_data, archive_supplier_loading } =
        gstate.supplier;

    return {
        archive_supplier_data,
        archive_supplier_loading,
    };
};

export default connect(mapStateToProps, {
    supplierArchive, supplierArchiveFresh
})(SupplierArchiveModal);
