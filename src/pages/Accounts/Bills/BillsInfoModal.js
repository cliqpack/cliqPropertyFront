import moment from "moment";
import React, { useEffect, useState } from "react";
import {
    Col,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    Table
} from "reactstrap";
import { connect } from "react-redux";

import { payBill, payBillFresh, deleteBill, deleteBillFresh, allBillsListDue, allBillsListFuture, allBillsListPaid, deleteBillAction, deleteBillActionFresh, PendingBillsForOwner, receipt_folio_balance, receipt_folio_balance_fresh, approveBill, approveBillFresh } from "store/actions";


import toastr from "toastr";
import { Link } from "react-router-dom";
import DeleteModal from "components/Common/DeleteModal";
import Loder from "components/Loder/Loder";

const BillsInfoModal = props => {
    const [loader, setLoader] = useState(false);
    const [deleteState, setDeleteState] = useState(false);
    const [seen, setSeen] = useState(false);
    const [folioBalance, setFolioBalance] = useState({ status: false });

    const billData = props.data;
    console.log(billData);
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const fullName = `${authUser?.user?.first_name} ${authUser?.user?.last_name}`
    const payHandler = () => {
        setLoader(true)
        props.payBill(billData?.id);
        props.allBillsListDue(); props.allBillsListFuture(); props.allBillsListPaid(); props.PendingBillsForOwner(props.propertyId ? props.propertyId : '', billData.owner_folio_id ? billData.owner_folio_id : '')
    }
    const deleteHandler = () => {
        props.deleteBill(billData?.id)
        props.allBillsListDue(); props.allBillsListFuture(); props.allBillsListPaid()
        setDeleteState(false);
        props.startLoader()
    }
    const approveHandler = () => {
        setLoader(true)
        props.approveBill(props.data.id);
    }

    useEffect(() => {
        if (!seen) {
            let type = '', folio_id = '';
            if (billData?.owner_folio_id != null) {
                type = '1';
                folio_id = billData?.owner_folio_id;
            } else {
                type = '4';
                folio_id = billData?.seller_folio_id;
            }
            props.receipt_folio_balance(type, folio_id);
        }
        if (props.pay_bill_loading === 'Success') {
            setLoader(false)
            toastr.success('Success');
            props.setEditModal(false);
            props.payBillFresh();
            if (props?.text == 'supplier') {

                props.supplierBillApiCall()
            }
        }
        if (props.delete_bill_loading === 'Success') {
            toastr.error('Deleted');
            props.setEditModal(false);
            props.deleteBillFresh();
            if (props.text == 'supplier') {

                props.supplierBillApiCall()
            }
        }
        if (props.receipt_folio_balance_data) {
            setFolioBalance({
                available_balance: props.receipt_folio_balance_data?.available_balance,
                balance: props.receipt_folio_balance_data?.balance,
                outstanding_bill: props.receipt_folio_balance_data?.outstanding_bill,
                withhold: props.receipt_folio_balance_data?.withhold,
                status: true,
            })
        }
        if (props.approve_bill_loading === 'Success') {
            setLoader(false)
            toastr.success('Approved');
            props.approveBillFresh();
            props.setEditModal(false);
            if (props.text == 'supplier') {

                props.supplierBillApiCall()
            }
        }
        setSeen(true);
    }, [props.pay_bill_loading, props.delete_bill_loading, props.receipt_folio_balance_data, props.approve_bill_loading]);

    return (
        <>
            { loader && <Loder status={loader} /> }
            <Modal isOpen={props.showModal} toggle={props.toggleModal} size="lg">
                <ModalHeader toggle={props.toggleModal}>
                    <span className="text-primary">Bill #{billData?.id || ''} - {billData?.invoice_ref}</span>
                </ModalHeader>

                <ModalBody>
                    <Row>
                        <Col md={7}>
                            <div className="button-items">
                                {(props.data?.status === 'Unpaid' && props.data?.approved === 1) &&
                                    <button type="button" className="btn btn-info me-1" onClick={payHandler} disabled={folioBalance?.balance >= billData?.amount ? false : true}>
                                        Pay
                                    </button>}
                                {(props.data?.approved === 0) &&
                                    <button type="button" className="btn btn-info me-1" onClick={approveHandler}>
                                        Approve
                                    </button>}
                                {props.data?.status === 'Unpaid' &&
                                    <button type="button" className="btn btn-secondary me-1" onClick={() => setDeleteState(prev => !prev)}>
                                        <i className="fas fa-trash-alt"></i> Delete
                                    </button>}

                                <DeleteModal
                                    show={deleteState}
                                    onDeleteClick={deleteHandler}
                                    onCloseClick={() => setDeleteState(false)}
                                />
                                {
                                    props.data?.approved === 1 &&
                                    <button type="button" className="btn btn-info me-1" onClick={props.billEditModalToggle}>
                                        Edit & Replace
                                    </button>
                                }

                                {/* <button type="button" className="btn btn-secondary">
                                    Copy
                                </button> */}
                            </div>
                        </Col>
                        <Col md={5}>
                            <div className="d-flex justify-content-end align-items-center">
                                <div style={{ borderRight: '1px dotted #757575', borderBottom: '1px dotted #757575' }} className="d-flex flex-column justify-content-between align-items-center p-2">
                                    <span>Folio</span>
                                    <span>{billData?.owner_folio_id != null ? billData?.owner?.owner_folio?.folio_code : billData?.sellers?.folio_code}</span>
                                </div>
                                <div style={{ borderRight: '1px dotted #757575', borderBottom: '1px dotted #757575' }} className={`d-flex flex-column justify-content-between align-items-center p-2 ${folioBalance?.balance >= billData?.amount ? 'text-success' : 'text-danger'}`}>
                                    <span>Available</span>
                                    <span>{folioBalance?.balance}৳</span>
                                </div>
                                <div style={{ borderRight: '1px dotted #757575', borderBottom: '1px dotted #757575' }} className="d-flex flex-column justify-content-between align-items-center p-2">
                                    <span>Bills Due</span>
                                    <span>{folioBalance?.outstanding_bill}৳</span>
                                </div>
                            </div>

                        </Col>
                    </Row>
                    <div className="py-3">
                        <Row>
                            <Col>

                                <div className="py-2">
                                    <Row>
                                        <Col className="d-flex flex-column">
                                            <div className="fw-bold">Created Date</div>
                                            <div>{moment(billData?.created_at).format('YYYY-MM-DD')}</div>
                                        </Col>
                                        <Col className="d-flex flex-column">
                                            <div className="fw-bold">Reference</div>
                                            <div>{billData?.invoice_ref}</div>
                                        </Col>
                                        <Col className="d-flex flex-column">
                                            <div className="fw-bold">Supplier</div>
                                            <div><Link to={`contactsInfo/${billData?.supplier?.contact_id}`}>{billData?.supplier?.reference}</Link></div>
                                        </Col>
                                        {/* <Col className="d-flex flex-column">
                                            <div className="fw-bold">Linked Job</div>
                                            <div></div>
                                        </Col> */}
                                        <Col className="d-flex flex-column">
                                            <div className="fw-bold">Payment</div>
                                            <div>{billData?.receipt_id && `#${billData?.receipt_id}`} </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="py-2">
                                    <Row>
                                        <Col className="d-flex flex-column">
                                            <div className="fw-bold">Due Date</div>
                                            <div>{moment(billData?.billing_date).format('YYYY-MM-DD')}</div>
                                        </Col>
                                        <Col className="d-flex flex-column">
                                            <div className="fw-bold">Property</div>
                                            <div>{billData?.property?.reference}</div>
                                        </Col>
                                        <Col className="d-flex flex-column">
                                            <div className="fw-bold">Priority</div>
                                            <div>{billData?.priority ? billData?.priority : ''}</div>
                                        </Col>
                                        {
                                            billData?.doc_path &&
                                            <Col className="d-flex flex-column">
                                                <div className="fw-bold">Attachment</div>
                                                <div><a href={process.env.REACT_APP_DOCUMENT + billData?.doc_path} target="_blank"
                                                    rel="noreferrer noopener"><i className="fas fa-file-alt"></i></a></div>
                                            </Col>
                                        }
                                        <Col className="d-flex flex-column">
                                            <div className="fw-bold"></div>
                                            <div></div>
                                        </Col>
                                        <Col className="d-flex flex-column">
                                            <div className="fw-bold">Processed by</div>
                                            <div>{fullName}</div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="mx-1 mt-2 border">
                        <div className="mb-3 ps-2 py-2 border-bottom fw-bold d-flex justify-content-start align-items-center">Bill Details</div>
                        <div className="table-responsive">
                            <Table className="table mb-2">
                                <thead className="table-light">
                                    <tr>
                                        <th>Contact</th>
                                        <th>Last Name</th>
                                        <th>Chart Account</th>
                                        <th>Detail</th>
                                        <th><i className="fas fa-paperclip" /></th>
                                        <th>Tax</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{billData?.owner?.reference}</td>
                                        <td>{billData?.owner_folio_id != null ? billData?.owner?.owner_folio?.folio_code : billData?.sellers?.folio_code}</td>
                                        <td>{billData?.bill?.account_name}</td>
                                        <td>{billData?.details}</td>
                                        <td>{billData?.file && <a href={`${process.env.REACT_APP_IMAGE}${billData?.file}`} rel="noreferrer" target="_blank"><i className="fas fa-paperclip" /></a>}</td>
                                        <td>{billData?.include_tax === 1 ? <i className="fas fa-check" /> : ""}</td>
                                        <td>${billData?.amount}</td>
                                    </tr>

                                </tbody>
                            </Table>
                        </div>
                        <div className="d-flex justify-content-end align-items-center py-2 pe-4 pb-4">
                            <span className="pe-5 h4">Total</span>
                            <span className="me-3 h4">{billData?.amount}৳</span>
                        </div>
                    </div>
                    {
                        billData?.receipt_id ?
                            <div className="mx-1 mt-2 border">
                                <div className="mb-3 ps-2 py-2 border-bottom fw-bold d-flex justify-content-start align-items-center">Payment Transactions</div>
                                <div className="table-responsive">
                                    <Table className="table mb-2">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Contact</th>
                                                <th>Folio</th>
                                                <th>Chart Account</th>
                                                <th>Detail</th>
                                                <th>Tax</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{billData?.receipt?.receipt_details?.[1]?.contact_reference?.reference}</td>
                                                <td>{billData?.receipt?.receipt_details?.[1]?.folioCode}</td>
                                                <td>{billData?.receipt?.receipt_details?.[1]?.account?.account_name}</td>
                                                <td>{billData?.receipt?.receipt_details?.[1]?.description}</td>
                                                <td>{billData?.receipt?.receipt_details?.[1]?.tax === 1 ? <i className="fas fa-check" /> : ""}</td>
                                                <td>{billData?.amount}</td>
                                            </tr>

                                        </tbody>
                                    </Table>
                                </div>
                                <div className="d-flex justify-content-end align-items-center py-2 pe-4 pb-4">
                                    <span className="pe-5 h4">Total</span>
                                    <span className="me-3 h4">{billData?.amount}৳</span>
                                </div>
                            </div> :
                            <div className="d-flex justify-content-start align-items-center border py-2 ps-2 my-2 mx-1">
                                No payment
                            </div>
                    }
                </ModalBody>
                {/* <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            className="btn btn-info"
                            onClick={handleModalClose}
                        >
                            <i className="fas fa-times me-1"></i> Close
                        </button>
                        <button
                            type="submit"
                            className="btn btn-info ms-2"
                            onClick={handleBillsSave}
                            disabled={state.jobOrReminder && state.taxCheck ? false : true}
                        >
                            <i className="fas fa-file-alt me-1"></i> Save
                        </button>
                    </div>

                </ModalFooter> */}
            </Modal>
        </>
    );
};



const mapStateToProps = gstate => {

    const {
        receipt_folio_balance_data,
        receipt_folio_balance_error,
        receipt_folio_balance_loading,
    } = gstate.AccountsTransactions;

    const {
        pay_bill_loading, delete_bill_loading, approve_bill_loading
    } = gstate.Bills;

    return {
        pay_bill_loading, delete_bill_loading,

        receipt_folio_balance_data,
        receipt_folio_balance_error,
        receipt_folio_balance_loading,

        approve_bill_loading,
    };
};

export default connect(mapStateToProps, {
    payBill, payBillFresh, deleteBill, deleteBillFresh, allBillsListDue, allBillsListFuture, allBillsListPaid, deleteBillAction, deleteBillActionFresh, PendingBillsForOwner, receipt_folio_balance, receipt_folio_balance_fresh, approveBill, approveBillFresh
})(BillsInfoModal);

