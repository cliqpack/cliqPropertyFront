import React, { useEffect } from "react";
import {
    Modal,
    ModalHeader,
    ModalFooter,
} from "reactstrap";

const DeleteUploadBillsModal = props => {

    const handleSubmit = () => {
        props.handleDelete()
        props.toggle()
        props.startLoader()
    }

    return (
        <>
            <Modal
                isOpen={props.state.deleteModal}
                toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>
                    Are you sure you want to delete the selected bill?
                </ModalHeader>
                <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-info"
                            onClick={props.toggle}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-info ms-2"
                            onClick={handleSubmit}
                        >
                            Yes
                        </button>
                    </div>

                </ModalFooter>
            </Modal>
        </>
    );
};

export default DeleteUploadBillsModal;

