import React from 'react'
import {
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Modal,
    Row,
} from "reactstrap"

export default function CenterLoader({ status, toggle }) {
    return (
        <Modal
            isOpen={status}
            toggle={toggle}
            centered={true}
            style={{ opacity: 0.1 }}
        >
            {/* <div className="modal-header">
                <h5 className="modal-title mt-0">Center Modal</h5>
                <button
                    type="button"
                    onClick={toggle}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div> */}
            <div className="modal-body">
                <div
                    className="spinner-border text-primary m-1"
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </Modal>
    )
}
