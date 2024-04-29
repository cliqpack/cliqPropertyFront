import React, { useEffect } from "react";
import {
    useParams,
    withRouter,
} from "react-router-dom";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";

import { trialBalanceReport } from "store/actions";
//Import Image
import { connect } from "react-redux";
import InvoiceHeader from "common/Invoice/InvoiceHeader";
import jsPDF from "jspdf";

document.title = "CliqProperty";

const UnreconcileItems = (props) => {
    const { year, month, day } = useParams();

    // const goBack = () => history.push(`/maintenanceInfo/${id}`)

    function printDiv(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    };

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
                pdf.save('TrialBalance.pdf');
            }
        });

    }

    useEffect(() => {
        if (props.trial_loading === false) {
            props.trialBalanceReport(year, month)
        }
    }, [props.trial_loading]);
    let totalDebit, totalCredit;
    let totalDebit2, totalCredit2;
    let totalDebit3, totalCredit3;
    return (
        <React.Fragment>
            <div>
                <InvoiceHeader printDiv={printDiv} downloadPdfDocument={downloadPdfDocument} />

                <Container className="" fluid id="printableArea">

                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <div className="d-flex flex-column justify-content-end w-100 py-1 mb-2">
                                        <center className='py-1 fw-bold'>Trial Balance</center>
                                        <center className='py-1'>From {`1/${month}/${year}`} to {`${day}/${month}/${year}`}</center>
                                    </div>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <div>


                                        <div className="table-responsive mt-5">
                                            <Table className="table mb-0">

                                                <thead className="table-light">
                                                    <tr className="border-bottom border-1 border-dark">
                                                        <th>Owner folios</th>
                                                        <th>Opening</th>
                                                        <th>Debit</th>
                                                        <th>Credit</th>
                                                        <th>Closing</th>
                                                    </tr>
                                                </thead>
                                                <tbody>


                                                    {
                                                        props.trial_data?.owner.map((item, i) => {
                                                            totalDebit = props.trial_data?.owner.reduce((acc, item) => acc + parseInt(item?.amount_debit), 0);
                                                            totalCredit = props.trial_data?.owner.reduce((acc, item) => acc + parseInt(item?.amount_credit), 0);
                                                            return (
                                                                <tr key={i} className={props.trial_data?.owner.length - 1 === i ? `border-bottom border-1 border-secondary` : ``}>

                                                                    <td className="col-md-8">{item?.owner_folio?.owner_contacts?.reference}	</td>
                                                                    <td className="col-md-1">{item?.opening_balance}৳</td>
                                                                    <td className="col-md-1">{item?.amount_debit}৳	</td>
                                                                    <td className="col-md-1">{item?.amount_credit}৳		</td>
                                                                    <td className="col-md-1">{item?.closing_balance}৳</td>

                                                                </tr>
                                                            )
                                                        })
                                                    }

                                                    <tr className="">
                                                        <td className="col-md-8 fw-bold">Total Owner folios Funds		</td>
                                                        <td className="col-md-1 fw-bold">{props.trial_data?.ownerOpening}৳	</td>
                                                        <td className="col-md-1 fw-bold">{totalDebit}৳	</td>
                                                        <td className="col-md-1 fw-bold">{totalCredit}৳		</td>
                                                        <td className="col-md-1 fw-bold">{props.trial_data?.ownerClosing}৳</td>

                                                    </tr>

                                                </tbody>
                                            </Table>
                                        </div>


                                        <div className="table-responsive mt-5">
                                            <Table className="table mb-0">

                                                <thead className="table-light">
                                                    <tr className="border-bottom border-1 border-dark">
                                                        <th>Tenant folios	</th>
                                                        <th>Opening</th>
                                                        <th>Debit</th>
                                                        <th>Credit</th>
                                                        <th>Closing</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {props.trial_data?.tenant.map((item, i) => {
                                                        totalDebit2 = props.trial_data?.tenant.reduce((acc, item) => acc + parseInt(item.amount_debit), 0);
                                                        totalCredit2 = props.trial_data?.tenant.reduce((acc, item) => acc + parseInt(item.amount_credit), 0);
                                                        return (
                                                            <tr key={i} className={props.trial_data?.tenant.length - 1 === i ? `border-bottom border-1 border-secondary` : ``}>
                                                                <td className="col-md-8">{item?.tenant_folio?.tenant_contact?.reference}	</td>
                                                                <td className="col-md-1">{item?.opening_balance}৳	</td>
                                                                <td className="col-md-1">{item?.amount_debit}৳	</td>
                                                                <td className="col-md-1">{item?.amount_credit}৳		</td>
                                                                <td className="col-md-1">{item?.closing_balance}৳</td>

                                                            </tr>
                                                        )
                                                    }
                                                    )}

                                                    <tr className="border-bottom border-0">
                                                        <td className="col-md-8 fw-bold">Total Tenant folios Funds	</td>
                                                        <td className="col-md-1 fw-bold">{props.trial_data?.tenantOpening}৳	</td>
                                                        <td className="col-md-1 fw-bold">{totalDebit2}৳	</td>
                                                        <td className="col-md-1 fw-bold">{totalCredit2}৳		</td>
                                                        <td className="col-md-1 fw-bold">{props.trial_data?.tenantClosing}৳</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>

                                        <div className="table-responsive mt-5">
                                            <Table className="table mb-0">

                                                <thead className="table-light">
                                                    <tr className="border-bottom border-1 border-dark">
                                                        <th>Supplier folios	</th>
                                                        <th>Opening</th>
                                                        <th>Debit</th>
                                                        <th>Credit</th>
                                                        <th>Closing</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {props.trial_data?.supplier.map((item, i) => {
                                                        totalDebit3 = props.trial_data?.supplier.reduce((acc, item) => acc + parseInt(item.amount_debit), 0);
                                                        totalCredit3 = props.trial_data?.supplier.reduce((acc, item) => acc + parseInt(item.amount_credit), 0);
                                                        return (
                                                            <tr key={i} className={props.trial_data?.supplier.length - 1 === i ? `border-bottom border-1 border-secondary` : ``}>
                                                                <td className="col-md-8">{item?.supplier_details?.supplier_contact?.reference}	</td>
                                                                <td className="col-md-1">{item?.opening_balance}৳	</td>
                                                                <td className="col-md-1">{item?.amount_debit}৳	</td>
                                                                <td className="col-md-1">{item?.amount_credit}৳		</td>
                                                                <td className="col-md-1">{item?.closing_balance}৳</td>

                                                            </tr>
                                                        )
                                                    }
                                                    )}


                                                    <tr className="border-bottom border-0">
                                                        <td className="col-md-8 fw-bold">Total Supplier folios Funds	</td>
                                                        <td className="col-md-1 fw-bold">{props.trial_data?.supplierOpening}৳	</td>
                                                        <td className="col-md-1 fw-bold">{totalDebit3}৳	</td>
                                                        <td className="col-md-1 fw-bold">{totalCredit3}৳		</td>
                                                        <td className="col-md-1 fw-bold">{props.trial_data?.supplierClosing}৳</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>

                                    </div>
                                </CardBody>
                            </Card>


                        </Col>
                    </Row>


                </Container>
            </div>
        </React.Fragment >
    );
};


const mapStateToProps = gstate => {


    const {
        trial_data, trial_loading
    } = gstate.Reconciliations;
    return {
        trial_data, trial_loading
    }
}

export default withRouter(
    connect(mapStateToProps, {
        trialBalanceReport
    })(UnreconcileItems)
);