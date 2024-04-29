import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Modal,
    Row,
} from "reactstrap"
import { generateRentInvoice, generateRentInvoiceFresh } from 'store/actions'
import toastr from "toastr";


export default function GenerantRentModal({ status, toggle, data, rentManagementApi }) {
    const dispatch = useDispatch()
    const { generate_rent_invoice_loading } = useSelector(state => state.AccountsTransactions);
    console.log(generate_rent_invoice_loading);
    useEffect(() => {
        if (generate_rent_invoice_loading == 'Success') {
            toastr.success('Success');
            dispatch(generateRentInvoiceFresh());
            rentManagementApi()
            toggle()
        }
        if (generate_rent_invoice_loading == 'Failed') {
            toastr.error('Failed');
            dispatch(generateRentInvoiceFresh())
        }
    }, [generate_rent_invoice_loading])


    const submitHandler = () => {
        dispatch(generateRentInvoice(data))
    }

    return (
        <Modal
            size="lg"
            isOpen={status}
            toggle={toggle}
        >

            <div className="modal-body">
                <p>Generating new rent invoices may also create recurring invoice line items for this tenancy.
                </p>

            </div>
            <div className="modal-footer">
                <button
                    type="button"
                    onClick={toggle}
                    className="btn btn-secondary"
                    data-dismiss="modal"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="btn btn-info"
                    onClick={submitHandler}
                >
                    Ok
                </button>
            </div>
        </Modal>
    )
}
