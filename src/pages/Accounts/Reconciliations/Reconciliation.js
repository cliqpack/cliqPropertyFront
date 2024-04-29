import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation, useHistory, useParams } from "react-router-dom";
import { ReconciliationData, ApproveReconciliation, ApproveReconciliationFresh, RevokeReconciliation, RevokeReconciliationFresh, Reconcile, ReconcileFresh, ReconciliationDataFresh, ReceiptListFresh, UnreconciledDepositsDataFresh, adjustmentsDataFresh } from "store/actions";

import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";

import moment from "moment";
import BankStatementModal from "./BankStatementModal";
import Breadcrumbs from "components/Common/Breadcrumb";
import toastr from "toastr";

document.title = "Reconciliations";

function Reconciliation(props) {
    const { location } = useHistory();
    const params = useParams();
    const [seen, setSeen] = useState(false);

    // const recon = new URLSearchParams(search).get('recon');

    const [state, setState] = useState({
        dOpen: false,
        showModal: false,
        showRevokeBtn: false,
        month: location?.state?.date.slice(5, 7),
        year: location?.state?.date.slice(0, 4),
        day: location?.state?.date.slice(8, 11),
        date: location?.state?.date,
        id: location?.state?.id,
    })

    const toggleModal = () => setState(prev => ({ ...prev, showModal: !prev.showModal }));

    const approveHandler = () => {
        props.ApproveReconciliation(params.id);
    };
    const revokeHandler = () => {
        props.RevokeReconciliation(params.id);
    };

    useEffect(() => {
        if (!seen) {
            props.Reconcile(params.id);
            props.ReconciliationData(state?.id);
            props.ReconciliationDataFresh();
            props.ReceiptListFresh();
            props.UnreconciledDepositsDataFresh();
            props.adjustmentsDataFresh();
        }
        if (props.reconcile_store_loading === 'Success') {
            props.ReconciliationData(state?.id);
            props.ReconcileFresh();
            props.ReconciliationDataFresh();
        }
        if (props.approve_reconciliation_loading === 'Success') {
            toastr.success('Approved');
            props.ReconciliationData(state?.id);
            props.ApproveReconciliationFresh();
        }
        if (props.approve_reconciliation_loading === 'Failed') {
            toastr.error('Approve reconciliation failed');
            props.ReconciliationData(state?.id);
            props.ApproveReconciliationFresh();
        }
        if (props.revoke_reconciliation_loading === 'Success') {
            toastr.warning('Reconciliation revoked');
            props.ReconciliationData(state?.id);
            props.RevokeReconciliationFresh();
        }
        if (props.revoke_reconciliation_loading === 'Failed') {
            toastr.error('Revoke reconciliation failed');
            props.ReconciliationData(state?.id);
            props.RevokeReconciliationFresh();
        }
        setSeen(true);
    }, [props.bank_statement_edit_loading, props.reconcile_store_loading, props.approve_reconciliation_loading, props.revoke_reconciliation_loading]);

    const data = props.recon_data?.data;

    const reconciledBankStatementBalance = data?.net_bank_balance;
    const cashBookBalance = data?.journal_balance;
    const folioBalance = props.recon_data?.ledgerBalance;
    return (
        <div className="page-content">
            <Container fluid={true}>
                <Breadcrumbs title="Reconciliation" breadcrumbItem="Accounts" />

                <Row>
                    <Col lg={12}>
                        <div>
                            <Row>

                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col md={12}>
                                                <h4 className="text-primary">  {moment(state?.date).format('MMMM YYYY')} Reconciliation {moment(state?.date).format('MMMM').toString() === moment().format('MMMM').toString()
                                                    && <>(current)</>}</h4>
                                            </Col>
                                        </Row>
                                        <Row className="py-2">
                                            <Col md={6}>
                                                <div className="button-items d-flex">
                                                    {/* {moment(location.state.date).format('MMMM').toString() === moment().format('MMMM').toString() && */}
                                                    <Dropdown
                                                        isOpen={state.dOpen}
                                                        toggle={() => setState(prev => ({ ...prev, dOpen: !prev.dOpen }))}
                                                    >
                                                        <DropdownToggle className="btn btn-secondary me-1" caret>
                                                            Reports{" "}
                                                            <i className="mdi mdi-chevron-down"></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem>
                                                                <Link style={{ color: 'black' }} to={`/reconciliationReport/${state?.id}`} target='blank'>Reconciliation</Link>
                                                            </DropdownItem>
                                                            <DropdownItem> <Link style={{ color: 'black' }} to={`/unreconcileItems/${state?.date}/${state?.id}`} target='blank'>Unreconciled Items</Link>
                                                            </DropdownItem>
                                                            <DropdownItem><Link style={{ color: 'black' }} to={`/folioLedger/${state?.year}/${state?.month}/${state?.day}`} target='blank'>Folio Ledger</Link>
                                                            </DropdownItem>
                                                            <DropdownItem><Link style={{ color: 'black' }} to={`/trialBalance/${state?.year}/${state?.month}/${state?.day}`} target='blank'>Trial Balance</Link>
                                                            </DropdownItem>
                                                            <DropdownItem><Link style={{ color: 'black' }} to={`/transactionAuditReport/${state?.year}/${state?.month}`} target='blank'>Transaction audit</Link>
                                                            </DropdownItem>
                                                            <DropdownItem><Link style={{ color: 'black' }} to={`/cashBookReport/${state?.year}/${state?.month}`} target='blank'>Cash Book</Link>
                                                            </DropdownItem>
                                                            <DropdownItem><Link style={{ color: 'black' }} to={`/journalsReport/${state?.year}/${state?.month}`} target='blank'>Journals</Link>
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                    {/* } */}
                                                    {((reconciledBankStatementBalance === cashBookBalance) && (reconciledBankStatementBalance === folioBalance) && data?.reconcilliation_month?.reconciliation_status === 'approve') ?
                                                        <button type="button" className="btn btn-info" onClick={approveHandler}>
                                                            <i className="fas fa-check me-1" />  Approve
                                                        </button>
                                                        :
                                                        ''
                                                    }

                                                    {
                                                        data?.reconcilliation_month?.reconciliation_status === 'approved' &&
                                                        <button type="button" className="btn btn-danger" onClick={revokeHandler}>
                                                            <i className="fas fa-times me-1"></i> Revoke Approval
                                                        </button>
                                                    }
                                                </div>
                                            </Col>

                                            <Col md={6} className='d-flex justify-content-end align-items-end text-white'>
                                                {(reconciledBankStatementBalance === cashBookBalance) && (reconciledBankStatementBalance === folioBalance) &&
                                                    <div className="bg-success px-5 py-3">
                                                        <i className="fas fa-balance-scale me-2 font-size-20" /> Reconciled
                                                    </div>
                                                }
                                                {/* <div className="bg-warning px-5 py-3">
                                                    <i className="fas fa-balance-scale-right me-2 font-size-20" /> Bank out
                                                </div> */}
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Row>

                            <Card>
                                <CardBody>
                                    <div>
                                        <h4 className="text-primary"> Bank Reconciliation Report</h4>
                                    </div>

                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <div><h4 className="text-primary">Bank Account</h4></div>
                                    <Row className="py-1">
                                        <Col md={6}>
                                            <div className="d-flex"><BankStatementModal state={state} setState={setState} toggle={toggleModal} id={props.recon_data?.data?.r_month_id} balance={data?.bank_statement_balance} date={data?.bank_statement_balance_date} reconciliation_id={state?.id} reconciliation_status={data?.reconcilliation_month?.reconciliation_status} />
                                                {/* <b className="ms-1">{moment(data?.bank_statement_balance_date).format("dddd, MMMM Do YYYY")}</b> */}
                                                <b className="ms-1">{moment().format("dddd, MMMM Do YYYY")}</b>
                                            </div>
                                        </Col>
                                        <Col md={6} className='d-flex justify-content-end'>
                                            <div><b>{data?.bank_statement_balance}৳</b></div>
                                        </Col>
                                    </Row>
                                    <Row className="py-1">
                                        <Col md={6}>
                                            {/* <div>Add:<Link to={`/unreconciledDeposits/${location.state.date}`} className='nav-link disabled'>unreconciled deposits</Link></div> */}
                                            <div>Add: <Link
                                                style={{
                                                    pointerEvents: (data?.reconcilliation_month?.reconciliation_status === 'approved' || data?.reconcilliation_month?.reconciliation_status === 'closed') ? 'none' : '',
                                                    color: (data?.reconcilliation_month?.reconciliation_status === 'approved' || data?.reconcilliation_month?.reconciliation_status === 'closed') ? '#74788d' : '#159b9c'
                                                }}
                                                to={`/unreconciledDeposits/${state?.date}`}
                                            >unreconciled deposits</Link></div>

                                        </Col>
                                        <Col md={6} className='d-flex justify-content-end'>
                                            <Row className="w-100 fw-bold">
                                                <Col md={6} className='d-flex justify-content-end font-size-18'>+</Col >
                                                <Col md={6} className='d-flex justify-content-end'>{data?.unreconciled_deposits}৳</Col >
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="py-1">
                                        <Col md={6}>
                                            <div>Less: <Link
                                                to={`/unreconciledWithdrawals/${state?.year}/${state?.month}`}
                                                style={{
                                                    pointerEvents: (data?.reconcilliation_month?.reconciliation_status === 'approved' || data?.reconcilliation_month?.reconciliation_status === 'closed') ? 'none' : '',
                                                    color: (data?.reconcilliation_month?.reconciliation_status === 'approved' || data?.reconcilliation_month?.reconciliation_status === 'closed') ? '#74788d' : '#159b9c'
                                                }}
                                            >unreconciled withdrawals</Link></div>
                                        </Col>
                                        <Col md={6} className='d-flex justify-content-end'>
                                            <Row className="w-100 fw-bold">
                                                <Col md={6} className='d-flex justify-content-end font-size-18'>-</Col >
                                                <Col md={6} className='d-flex justify-content-end'>{data?.unreconciled_withdrawals}৳</Col >
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="py-1">
                                        <Col md={6}>
                                            <div>Add: <Link
                                                to={`/adjustments/${state?.id}/${state?.year}/${state?.month}`}
                                                style={{
                                                    pointerEvents: (data?.reconcilliation_month?.reconciliation_status === 'approved' || data?.reconcilliation_month?.reconciliation_status === 'closed') ? 'none' : '',
                                                    color: (data?.reconcilliation_month?.reconciliation_status === 'approved' || data?.reconcilliation_month?.reconciliation_status === 'closed') ? '#74788d' : '#159b9c'
                                                }}
                                            >adjustments</Link></div>
                                        </Col>
                                        <Col md={6} className='d-flex justify-content-end'>
                                            <Row className="w-100 fw-bold">
                                                <Col md={6} className='d-flex justify-content-end font-size-18'>+</Col >
                                                <Col md={6} className='d-flex justify-content-end'>{data?.adjustment}৳</Col >
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="py-1">
                                        <Col md={6}>
                                            <div>Add: <Link
                                                to={`/banking-list`}
                                                style={{
                                                    pointerEvents: (data?.reconcilliation_month?.reconciliation_status === 'approved' || data?.reconcilliation_month?.reconciliation_status === 'closed') ? 'none' : '',
                                                    color: (data?.reconcilliation_month?.reconciliation_status === 'approved' || data?.reconcilliation_month?.reconciliation_status === 'closed') ? '#74788d' : '#159b9c'
                                                }}
                                            >cash not banked</Link></div>
                                        </Col>
                                        <Col md={6} className='d-flex justify-content-end'>
                                            <Row className="w-100 fw-bold">
                                                <Col md={6} className='d-flex justify-content-end font-size-18'>+</Col>
                                                <Col md={6} className='d-flex justify-content-end'>{data?.cash_not_banked}৳</Col >
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="py-1">
                                        <Col md={6}>
                                            <div>Less: <Link
                                                to={`/withdrawalsList/${state?.month}/${state?.year}`}
                                                style={{
                                                    pointerEvents: (data?.reconcilliation_month?.reconciliation_status === 'approved' || data?.reconcilliation_month?.reconciliation_status === 'closed') ? 'none' : '',
                                                    color: (data?.reconcilliation_month?.reconciliation_status === 'approved' || data?.reconcilliation_month?.reconciliation_status === 'closed') ? '#74788d' : '#159b9c'
                                                }}
                                            >withdrawals not processed</Link></div>
                                        </Col>
                                        <Col md={6} className='d-flex justify-content-end'>
                                            <Row className="w-100 fw-bold">
                                                <Col md={6} className='d-flex justify-content-end font-size-18'>-</Col >
                                                <Col md={6} className='d-flex justify-content-end border-bottom border-secondary'>{data?.withdrawals_not_processed}৳</Col >
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="py-1">
                                        <Col md={6}>
                                            <div>Reconciled bank statement balance</div>
                                        </Col>
                                        <Col md={6} className='d-flex justify-content-end'>
                                            <div className="fw-bold">{reconciledBankStatementBalance > 0 ? `${reconciledBankStatementBalance}৳` : '0.00৳'}</div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <div><h4 className="text-primary">Cashbook	</h4></div>

                                    <Row className="py-1">
                                        <Col md={6}>Balance brought forward from: <b>{moment().format('01, MMMM YYYY')}</b>	</Col>
                                        <Col md={6} className='d-flex justify-content-end align-items-center fw-bold'>{data?.cashbook_amount}৳</Col>
                                    </Row>
                                    <Row className="py-1">
                                        <Col md={6}>Add: <Link to={`/receiptsList/${state?.date}`}>new receipts</Link></Col>
                                        <Col md={6} className='d-flex justify-content-end'>
                                            <Row className="w-100 fw-bold">
                                                <Col md={6} className='d-flex justify-content-end font-size-18'>+</Col>
                                                <Col md={6} className='d-flex justify-content-end'>{data?.new_receipts}৳</Col >
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="py-1">
                                        <Col md={6}>Less: <Link to={`/withDrawals/{state?.month}/${state?.year}`}>new withdrawals</Link></Col>
                                        <Col md={6} className='d-flex justify-content-end'>
                                            <Row className="w-100 fw-bold">
                                                <Col md={6} className='d-flex justify-content-end font-size-18'>-</Col>
                                                <Col md={6} className='d-flex justify-content-end border-bottom border-secondary'>{data?.new_withdrawals}৳</Col >
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="py-1">
                                        <Col md={6}>
                                            {/* <div>Balance as at 1 {moment(location.state.date).subtract(1, 'months').format("MMMM")} {year}	</div> */}
                                            <div>Balance as at 1 {moment().format('DD, MMMM YYYY')}	</div>
                                        </Col>
                                        <Col md={6} className='d-flex justify-content-end'>
                                            <div className="fw-bold">{cashBookBalance > 0 ? cashBookBalance : "0.00"}৳</div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <div><h4 className="text-primary">Folio Balances</h4></div>
                                    <Row className="py-1">
                                        <Col md={6}>Folio balances as at <b>{moment().format('DD, MMMM YYYY')}</b></Col>
                                        <Col md={6} className='d-flex justify-content-end'>
                                            <div className="fw-bold">{folioBalance > 0 ? folioBalance : "0.00"}৳</div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

const mapStateToProps = gstate => {

    const {
        recon_data,
        recon_loading,
        bank_statement_edit_loading,
        reconcile_store_loading,
        approve_reconciliation_loading,
        revoke_reconciliation_loading,
    } = gstate.Reconciliations;

    return {
        recon_data,
        recon_loading,
        bank_statement_edit_loading,
        reconcile_store_loading,
        approve_reconciliation_loading,
        revoke_reconciliation_loading,
    };
};

export default connect(mapStateToProps, {
    ReconciliationData, ReconcileFresh, ApproveReconciliation, ApproveReconciliationFresh, RevokeReconciliation, RevokeReconciliationFresh, ReconciliationDataFresh, Reconcile, ReceiptListFresh, UnreconciledDepositsDataFresh, adjustmentsDataFresh
})(Reconciliation);