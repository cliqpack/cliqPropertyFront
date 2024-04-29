import React, { useEffect } from "react";
import {
    useHistory,
    useParams,
    withRouter,
} from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";


import { ReconciliationData } from "store/actions";
//Import Image
import { connect } from "react-redux";
import moment from "moment";
import InvoiceHeader from "common/Invoice/InvoiceHeader";
import jsPDF from "jspdf";


document.title = "CliqProperty";


const ReconciliationReport = (props) => {
    const { id } = useParams();

    function printDiv(divName) {
        console.log(divName);
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    }

    useEffect(() => {
        if (props.recon_loading === false) {
            props.ReconciliationData(id);

        }
    }, [props.recon_loading]);
    const data = props.recon_data?.data;
    console.log(data);

    const reconciledBankStatementBalance = parseInt(data?.bank_statement_balance) + parseInt(data?.unreconciled_deposits) - parseInt(data?.unreconciled_withdrawals) + parseInt(data?.adjustment) + parseInt(data?.cash_not_banked) - parseInt(data?.withdrawals_not_processed);
    const cashBookBalance = parseInt(data?.cashbook_amount) + parseInt(data?.new_receipts) - parseInt(data?.new_withdrawals);

    function downloadPdfDocument() {
        let pWidth = 595.28; // 595.28 is the width of a4
        let srcWidth = document.getElementById('printableArea').scrollWidth;
        let margin = 24; // narrow margin - 1.27 cm (36);
        let scale = (pWidth - margin * 2) / srcWidth;
        let pdf = new jsPDF('p', 'pt', 'a4');
        pdf.html(document.getElementById('printableArea'), {
            margin: [40, 40, 40, 40],
            html2canvas: {
                scale: scale,
            },
            callback: (pdf) => {
                pdf.save('reconciliation.pdf');
            }
        });
    }

    return (
        <React.Fragment>
            <div>
                <InvoiceHeader printDiv={printDiv} downloadPdfDocument={downloadPdfDocument} />

                <Container className="px-4" fluid id="printableArea">
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <div className="d-flex flex-column justify-content-end w-100 py-1 mb-2">
                                        <center className='py-1 fw-bold'>Reconciliation Report</center>
                                        <center className='py-1'>From {moment().format('01/MM/YYYY')} to {moment().format('DD/MM/YYYY')}</center>
                                    </div>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <div>
                                        <div>
                                            <div className="fw-bold h5">Bank Account</div>
                                            <div className="border-1 border-bottom border-secondary" />
                                        </div>
                                        <Row className="py-1 ">
                                            <Col md={6}>Bank statement balance as at <b className="ms-1">
                                                {/* {moment(data?.bank_statement_balance_date).format("dddd, MMMM Do YYYY")}</b> */}
                                                {moment().format("dddd, MMMM Do YYYY")}</b>
                                            </Col>
                                            <Col md={6} className='d-flex justify-content-end'>{data?.bank_statement_balance}৳</Col>
                                        </Row>
                                        <Row className="py-1 ps-3">
                                            <Col md={6}>Add: unreconciled deposits</Col>
                                            <Col md={6} className='d-flex justify-content-end'>{data?.unreconciled_deposits}৳</Col>
                                        </Row>
                                        <Row className="py-1 ps-3">
                                            <Col md={6}>Less: unreconciled withdrawals</Col>
                                            <Col md={6} className='d-flex justify-content-end'>{data?.unreconciled_withdrawals}৳</Col>
                                        </Row>
                                        <Row className="py-1 ps-3">
                                            <Col md={6}>Add: adjustments	</Col>
                                            <Col md={6} className='d-flex justify-content-end'>{data?.adjustment}৳</Col>
                                        </Row>
                                        <Row className="py-1 ps-3">
                                            <Col md={6}>Add: cash not banked	</Col>
                                            <Col md={6} className='d-flex justify-content-end'>{data?.cash_not_banked}৳</Col>
                                        </Row>
                                        <Row className="py-1 ps-3">
                                            <Col md={6}>Less: withdrawals not processed		</Col>
                                            <Col md={6} className='d-flex justify-content-end'><span>{data?.withdrawals_not_processed}৳</span></Col>
                                        </Row>
                                        <Row className="py-1 ps-3">
                                            <Col md={6}></Col>
                                            <Col md={6} className='d-flex justify-content-end'><span className="border-bottom border-secondary w-25"></span></Col>
                                        </Row>
                                        <Row className="py-1">
                                            <Col md={6}>
                                                Reconciled bank statement balance
                                            </Col>
                                            <Col md={6} className='d-flex justify-content-end fw-bold'> {reconciledBankStatementBalance > 0 ? reconciledBankStatementBalance : '0.00'}৳</Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <div>
                                        <div>
                                            <div className="fw-bold h5">CashBook	</div>
                                            <div className="border-1 border-bottom border-secondary" />
                                        </div>
                                        <Row className="py-1 ">
                                            <Col md={6}>Balance brought forward from: Tuesday, November 1, 2022		</Col>
                                            <Col md={6} className='d-flex justify-content-end'>{data?.cashbook_amount}৳</Col>
                                        </Row>
                                        <Row className="py-1 ps-3">
                                            <Col md={6}>Add: new receipts	</Col>
                                            <Col md={6} className='d-flex justify-content-end'>{data?.new_receipts}৳</Col>
                                        </Row>
                                        <Row className="py-1 ps-3">
                                            <Col md={6}>Less: new withdrawals	</Col>
                                            <Col md={6} className='d-flex justify-content-end'>{data?.new_withdrawals}৳</Col>
                                        </Row>
                                        <Row className="py-1 ps-3">
                                            <Col md={6}></Col>
                                            <Col md={6} className='d-flex justify-content-end'><span className="border-bottom border-secondary w-25"></span></Col>
                                        </Row>
                                        <Row className="py-1">
                                            <Col md={6}>Balance as at {moment().format('dddd, MMMM Do YYYYY')}	</Col>
                                            <Col md={6} className='d-flex justify-content-end fw-bold'>{cashBookBalance}৳</Col>
                                        </Row>

                                    </div>
                                </CardBody>
                            </Card>

                            {/* <Card>
                                <CardBody>
                                    <div>
                                        <div>
                                            <div className="fw-bold h5">Ledger Balances	</div>
                                            <div className="border-1 border-bottom border-secondary" />
                                        </div>
                                        <Row className="py-1 ps-3">
                                            <Col md={6}>Owner	</Col>
                                            <Col md={6} className='d-flex justify-content-end'>$23,210.00</Col>
                                        </Row>
                                        <Row className="py-1 ps-3">
                                            <Col md={6}>Sale</Col>
                                            <Col md={6} className='d-flex justify-content-end'>$55,500.00</Col>
                                        </Row>
                                        <Row className="py-1 ps-3">
                                            <Col md={6}>Supplier</Col>
                                            <Col md={6} className='d-flex justify-content-end'>$100.00</Col>
                                        </Row>
                                        <Row className="py-1 ps-3">
                                            <Col md={6}>Tenant</Col>
                                            <Col md={6} className='d-flex justify-content-end'>$0.00</Col>
                                        </Row>
                                        <Row className="py-1 ps-3">
                                            <Col md={6}></Col>
                                            <Col md={6} className='d-flex justify-content-end'><span className="border-bottom border-secondary w-25"></span></Col>
                                        </Row>
                                        <Row className="py-1">
                                            <Col md={6}>Ledger balances as at Sunday, November 27, 2022	</Col>
                                            <Col md={6} className='d-flex justify-content-end fw-bold'>$78,810.00</Col>
                                        </Row>


                                    </div>
                                </CardBody>
                            </Card> */}


                            {/* <Card>
                                <CardBody>
                                    <div>
                                        <Row className="py-1 ps-3">
                                            <Col md={6}></Col>
                                            <Col md={6} className='d-flex justify-content-end'>
                                                <span style={{ borderBottom: '1px solid', borderStyle: 'double', width: '150px' }}></span>
                                            </Col>
                                        </Row>
                                        <Row className="py-1 mb-5">
                                            <Col md={6} className='fw-bold'>The bank is out of balance</Col>
                                            <Col md={6} className='d-flex justify-content-end fw-bold'>($)</Col>
                                        </Row>
                                    </div>
                                    <div className="py-1 ps-5">
                                        <div><i>I verify that the Bank Account Reconciliation Statement is accurate and complete.
                                        </i></div>

                                    </div>
                                    <div className="d-flex justify-content-center py-1">
                                        <Row>
                                            <Col md={2} className='d-flex justify-content-end'>Name:</Col>
                                            <Col md={6} className="d-flex justify-content-start align-items-end">

                                                <div className="border-secondary" style={{ width: '150px', borderBottom: "1px solid gray" }}></div></Col>
                                        </Row>
                                        <Row>
                                            <Col md={2} className='d-flex justify-content-end'>Signature:</Col>
                                            <Col md={6} className="d-flex justify-content-start align-items-end">

                                                <div className="border-secondary" style={{ width: '150px', borderBottom: "1px solid gray" }}></div></Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card> */}

                        </Col>
                    </Row>


                </Container>
            </div>
        </React.Fragment >
    );
};


const mapStateToProps = gstate => {


    const {
        recon_data,
        recon_loading,
    } = gstate.Reconciliations;

    return {
        recon_data,
        recon_loading,
    };
}

export default withRouter(
    connect(mapStateToProps, {
        ReconciliationData
    })(ReconciliationReport)
);