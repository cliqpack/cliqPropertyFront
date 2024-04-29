import moment from "moment";
import React, { useEffect } from "react";
import {
    Col,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    Table,
    Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { ApprovedReconciliation, ApprovedReconciliationFresh } from "store/actions";
const TransactionsInfoModal = props => {
    let sumAmount = 0;
    const history = useHistory();
    const pushToContact = (id) => {
        history.push(`contactsInfo/${id}`);
    }
    let reconDate = moment(props?.receipt?.receipt_date);
    reconDate = reconDate.format('YYYY-MM');
    useEffect(() => {
        props.ApprovedReconciliation(reconDate)
    }, [])
    console.log(props.approved_reconciliation_status);
    return (
        <>
            <Modal isOpen={props.state.transactionInfoModal} toggle={props.toggle} size="lg">
                <ModalHeader toggle={props.toggle}>
                    <span className="text-primary">
                        {props?.receipt?.type == 'Reversal' ? `Reversal of transaction (audit# ${props?.receipt?.id})` : ''}
                        {props?.receipt?.type == 'Journal' ? `${props?.receipt?.type} ${props.receipt?.summary || ''}` : ''}
                        {props?.receipt?.type == 'Folio Withdraw' ? `Withdrawal- ${props.receipt?.ref || ''} Withdrawal to ` : ''}
                    </span>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={12}>
                            <div className="button-items">
                                {
                                    props.approved_reconciliation_status === true &&
                                    <Alert color="danger">
                                        <i className="fas fa-exclamation-circle"></i> Period is locked, the attempted transaction date {props?.receipt?.receipt_date} is within a locked audit period
                                    </Alert>
                                }
                                {
                                    (props?.receipt?.type == 'Tenant Receipt' ||
                                        props?.receipt?.type == 'Folio Receipt' ||
                                        props?.receipt?.type == 'Folio Withdraw' ||
                                        props?.receipt?.type == 'Journal') &&
                                        props?.receipt?.reversed === 0 &&
                                        props?.receipt?.disbursed === 0 &&
                                        props.approved_reconciliation_status === false
                                        ?
                                        <button type="button" className="btn btn-info" onClick={() => props.toggleReverse(props?.receipt?.id)}>
                                            <i className="fas fa-undo me-1" />Reverse
                                        </button> : ''}
                                {props?.receipt?.doc_path ?
                                    // <button type="button" className="btn btn-info">
                                    //     <Link style={{ color: 'white' }} target='_blank' to={`${process.env.REACT_APP_DOCUMENT}${props?.receipt?.doc_path}`}><i className="fas fa-file-alt me-1" /> Print reciept</Link>
                                    // </button>
                                    <button type="button" className="btn btn-info">
                                        <a style={{ color: 'white' }} href={`${process.env.REACT_APP_DOCUMENT}${props?.receipt?.doc_path}`} target="_blank"
                                    rel="noreferrer noopener">Print reciept</a>
                                    </button>
                                    // <div><a href={`${process.env.REACT_APP_DOCUMENT}${props?.receipt?.doc_path}`} target="_blank"
                                    // rel="noreferrer noopener">Print reciept</a></div>
                                    : '' }
                                {/* {props?.receipt?.type == 'Journal' ?
                                    <button type="button" className="btn btn-info" onClick={props.toggleEdit}>
                                        <i className="fas fa-pen me-1" /> Edit
                                    </button> : ''} */}
                            </div>
                            <div className="my-2">
                                <div className="py-2">
                                    <Row>
                                        <Col className="d-flex flex-column" md={4}>
                                            <div className="fw-bold">Created Date</div>
                                            <div>{moment(props?.receipt?.created_at).format('YYYY-MM-DD')}</div>
                                            {/* <div>{moment(billData.created_at).format('YYYY-MM-DD')}</div> */}
                                        </Col>
                                        {
                                            (props?.receipt?.type !== 'Reversal' && props?.receipt?.reversed === 0) &&
                                            <Col className="d-flex flex-column" md={6}>
                                                <div className="fw-bold">Cleared Date</div>
                                                <div className={`${props.receipt?.cleared_date ? 'text-success' : 'text-danger'}`}>{props.receipt?.cleared_date ? props.receipt?.cleared_date : 'Waiting for banking'}</div>
                                            </Col>
                                        }
                                        {
                                            props?.receipt?.reversed === 1 &&
                                            <Col className="d-flex flex-column" md={6}>
                                                <div className="fw-bold">Reversed Date</div>
                                                <div>{props.receipt?.reversed_date}</div>
                                            </Col>
                                        }
                                        {
                                            props?.receipt?.type !== 'Reversal' &&
                                            <Col className="d-flex flex-column" md={2}>
                                                <div className="fw-bold">Paid by</div>
                                                <div>{props.receipt?.payment_method?.toUpperCase()}</div>
                                            </Col>
                                        }
                                    </Row>
                                </div>
                                <div className="py-2">
                                    <Row>
                                        <Col className="d-flex flex-column" md={4}>
                                            <div className="fw-bold">Transaction Date</div>
                                            <div>{props?.receipt?.receipt_date}</div>

                                            {/* <div>{moment(billData.created_at).format('YYYY-MM-DD')}</div> */}
                                        </Col>
                                        <Col className="d-flex flex-column" md={6}>
                                            <div className="fw-bold">Property</div>
                                            <div>{props?.receipt?.property?.reference}</div>
                                        </Col>
                                        <Col className="d-flex flex-column" md={2}>
                                            <div className="fw-bold">Processed by</div>
                                            <div>{props?.receipt?.created_by}</div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div className="mx-1 mt-2 border">
                                <div className="mb-3 ps-2 py-2 border-bottom fw-bold d-flex justify-content-start align-items-center">Transaction Details</div>
                                <div className="table-responsive">
                                    <Table className="table mb-2">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Contact</th>
                                                <th>Folio</th>
                                                <th>Chart Account</th>
                                                <th>Allocation</th>
                                                <th>Detail</th>
                                                <th>Tax</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                props?.receipt?.receipt_details?.map((item, index) => {
                                                    sumAmount += parseInt(item.amount)
                                                    return (
                                                        <tr key={item.id}>
                                                            <td onClick={() => pushToContact(item?.contact_reference?.contact_id)}><span className="text-primary">{item?.contact_reference?.reference}</span></td>
                                                            <td>{item.folioCode}</td>
                                                            <td>{item?.account?.account_name}</td>
                                                            <td>{item.allocation}</td>
                                                            <td>{item.description}</td>
                                                            <td>{item.tax === 1 ? <i className="fas fa-check"></i> : ''}</td>
                                                            <td>{item.pay_type === 'debit' ? '-' : ''}{item.amount}৳</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="d-flex justify-content-end align-items-center py-2 pe-4 pb-4">
                                    <span className="pe-5 h4">Total</span>
                                    <span className="me-3 h4">{props?.receipt?.amount}৳</span>
                                </div>
                                {
                                    props?.receipt?.note &&
                                    // <Alert color="secondary" role="alert">
                                    <div className="m-1 p-1"> Note: {props?.receipt?.note}</div>
                                    // </Alert>
                                }
                            </div>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </>
    );
};



const mapStateToProps = gstate => {


    const {
        approved_reconciliation_status,
        approved_reconciliation_loading,
    } = gstate.Reconciliations;

    return {
        approved_reconciliation_status,
        approved_reconciliation_loading,
    };
};

export default connect(mapStateToProps, {
    ApprovedReconciliation, ApprovedReconciliationFresh
})(TransactionsInfoModal);

