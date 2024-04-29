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
import { cancelRent, cancelRentFresh } from 'store/actions'
import toastr from "toastr";

export default function CancelRentModal({ status, toggle, data, rentManagementApi }) {
    const dispatch = useDispatch()
    const { cancel_rent_loading } = useSelector(state => state.AccountsTransactions);
    console.log(cancel_rent_loading);
    useEffect(() => {
        if (cancel_rent_loading == 'Success') {
            toastr.success('Success');
            dispatch(cancelRentFresh());
            rentManagementApi()
            toggle()
        }
        if (cancel_rent_loading == 'Failed') {
            toastr.error('Failed');
            dispatch(cancelRentFresh())
        }
    }, [cancel_rent_loading])


    const submitHandler = () => {
        dispatch(cancelRent(data))
    }

    return (
        <Modal
            size="lg"
            isOpen={status}
            toggle={toggle}
        >

            <div className="modal-body">
                <p>Do you want to cancel the invoices for the selected period? These invoices will be generated again overnight.</p>

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
