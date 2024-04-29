import moment from "moment";
import React, { useEffect, useState } from "react";
import {
    Card,
    Alert,
    CardBody,
    CardTitle,
    Col,
    Container,
    Row,
    CardText,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Label,
    Input,
    Button,
    CardHeader,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    FormText,
    Table
} from "reactstrap";
import { connect } from "react-redux";

import { } from "store/actions";


import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import { tenantInformation } from "store/actions";

const ShowInvoiceModal = props => {
    let authUser = JSON.parse(localStorage.getItem("authUser"));

    const receiptHandler = () => {
        props.setSelectedFolio({ label: props.data?.tenant?.reference + '--' + props.data?.tenant_folio?.folio_code, value: props.data?.tenant_folio_id });
        props.tenantInformation(props.data?.tenant_folio_id);
        props.toggleModal();
        props.toggleAdd();
    }

    console.log(props.data);

    return (
        <>
            <Modal isOpen={props.showModal} toggle={props.toggleModal} size="lg">
                <ModalHeader toggle={props.toggleModal}>
                    <span className="text-primary">Invoice #{props.data.id} - {props.data.details}</span>
                </ModalHeader>

                <ModalBody>
                    <Row>
                        <Col md={7}>
                            <div className="button-items">
                                <button type="button" disabled={props.data.status === 'Paid' ? true : false} className="btn btn-info me-1" onClick={receiptHandler}>
                                    Receipt
                                </button>
                                {
                                    props.data?.status !== 'Paid' &&
                                    <button type="button" className="btn btn-secondary me-1" onClick={() => { props.deleteInvoiceModal(true); props.toggleModal(); props.setInvoiceId(props.data.id); }}>
                                        Delete
                                    </button>
                                }
                                <button type="button" className="btn btn-secondary me-1" disabled={(props.data.status === 'Paid' || props.data.paid > 0) ? true : false} onClick={() => { props.toggleModal(); props.toggleEditInvoiceModal(); }}>
                                    Edit & Replace
                                </button>
                                {/* <button type="button" className="btn btn-secondary">
                                    Copy
                                </button> */}
                            </div>
                        </Col>
                        <Col md={5}>
                            {/* <div className="d-flex justify-content-end align-items-center">
                                <div style={{ borderRight: '1px dotted #757575', borderBottom: '1px dotted #757575' }} className="d-flex flex-column justify-content-between align-items-center p-2">
                                    <span>Folio</span>
                                    <span>OWN00035</span>
                                </div>
                                <div style={{ borderRight: '1px dotted #757575', borderBottom: '1px dotted #757575' }} className="d-flex flex-column justify-content-between align-items-center p-2">
                                    <span>Available</span>
                                    <span>$500</span>
                                </div>
                                <div style={{ borderRight: '1px dotted #757575', borderBottom: '1px dotted #757575' }} className="d-flex flex-column justify-content-between align-items-center p-2">
                                    <span>Bills Due</span>
                                    <span>$285</span>
                                </div>
                            </div> */}

                        </Col>
                    </Row>
                    <div className="py-3">
                        <Row>
                            <Col>

                                <div className="py-2">
                                    <Row>
                                        <Col className="d-flex flex-column">
                                            <div>Created Date</div>
                                            <div>{moment(props.data?.created_at).format('YYYY-MM-DD')}</div>
                                        </Col>
                                        <Col className="d-flex flex-column">
                                            <div>Document</div>
                                            <div></div>
                                        </Col>
                                        <Col className="d-flex flex-column">
                                            <div>Issued By</div>
                                            <div>{props.data?.supplier ? props.data?.supplier.reference : props.data?.property?.owner}</div>
                                        </Col>
                                        <Col className="d-flex flex-column">
                                            <div>Journal</div>
                                            <div></div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="py-2">
                                    <Row>
                                        <Col className="d-flex flex-column">
                                            <div>Due Date</div>
                                            <div>{props.data?.invoice_billing_date}</div>
                                        </Col>
                                        <Col className="d-flex flex-column">
                                            <div>Property</div>
                                            <div>{props.data?.property?.reference}</div>
                                        </Col>
                                        <Col className="d-flex flex-column">
                                            <div></div>
                                            <div></div>
                                        </Col>
                                        <Col className="d-flex flex-column">
                                            <div></div>
                                            <div></div>
                                        </Col>
                                        <Col className="d-flex flex-column">
                                            <div>Processed by</div>
                                            <div>{authUser.user.first_name + ' ' + authUser.user.last_name}</div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="mx-1 border">
                        <div className="mb-3 ps-2 py-2 border-bottom d-flex justify-content-start align-items-center">Invoice Details</div>
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
                                        {props.data.rent_management_id && <th>Paid</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.data.rent_management_id &&
                                        <tr>
                                            <td>{props.data?.tenant?.reference}</td>
                                            <td>{props.data?.tenant?.reference}</td>
                                            <td>
                                                {/* {props.data?.chart_of_account?.account_name} */}
                                            </td>
                                            <td>Rent from {props.data.rent_management?.from_date} to {props.data.rent_management?.to_date}</td>
                                            <td><a href={process.env.REACT_APP_IMAGE + props.data.rent_management?.recurring_doc} target="_blank" rel="noreferrer noopener">{props.data.rent_management?.recurring_doc ? <i className="fas fa-paperclip" /> : ''}</a></td>
                                            <td>
                                                {/* {props.data.include_tax === 1 ? <i className="fas fa-check"></i> : ''} */}
                                            </td>
                                            <td>{props.data?.rent_management?.due}৳</td>
                                            <td>{props.data?.rent_management?.received}৳</td>
                                        </tr>
                                    }
                                    <tr>
                                        <td>{props.data?.tenant?.reference}</td>
                                        <td>{props.data?.tenant?.reference}</td>
                                        <td>{props.data?.chart_of_account?.account_name}</td>
                                        <td>{props.data.details}</td>
                                        <td><a href={process.env.REACT_APP_IMAGE + props.data?.file} target="_blank" rel="noreferrer noopener">{props.data?.file ? <i className="fas fa-paperclip" /> : ''}</a></td>
                                        <td>{props.data.include_tax === 1 ? <i className="fas fa-check"></i> : ''}</td>
                                        <td>{props.data?.amount}৳</td>
                                        {props.data.rent_management_id && <td>{props.data?.paid}৳</td>}
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="d-flex justify-content-end align-items-center py-2 pe-4 pb-4">
                            <span className="pe-5 h4">Total</span>
                            <span className="me-3 h4">{props.data?.amount}৳</span>
                        </div>
                    </div>

                    {/* <div className="d-flex justify-content-start align-items-center border py-2 ps-2 my-2">
                        No payment
                    </div> */}
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

    } = gstate.property;

    const {

    } = gstate.Bills;

    return {

    };
};

export default connect(mapStateToProps, {
    tenantInformation,
})(ShowInvoiceModal);
