import React, { useEffect } from "react";
import {
    useParams,
    withRouter,
} from "react-router-dom";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";


import { cashBookReport } from "store/actions";
//Import Image
import { connect } from "react-redux";
import moment from "moment";
import InvoiceHeader from "common/Invoice/InvoiceHeader";
import jsPDF from "jspdf";


document.title = "CliqProperty";


const CashBookReport = (props) => {
    const { month, year } = useParams();

    function printDiv(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    }

    useEffect(() => {
        if (props.crd_loading === false) {
            props.cashBookReport(year, month)
        }
    }, [props.crd_loading]);

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
                pdf.save('cashbook.pdf');
            }
        });
    }

    return (
        <React.Fragment>
            <div >
                <InvoiceHeader printDiv={printDiv} downloadPdfDocument={downloadPdfDocument} />

                <Container className="" fluid id="printableArea">
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <div className="d-flex flex-column justify-content-end w-100 py-1 mb-2">
                                        <center className='py-1 fw-bold'>Cash Book Report</center>
                                        <center className='py-1 fw-bold'>{moment(month).format('MMMM')} {year} by Transaction Date</center>
                                    </div>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <div>
                                        <div className="table-responsive">
                                            <Table className="table table-borderless mb-0">
                                                <thead>
                                                    <tr className="border-bottom border-1 border-dark">
                                                        <th>Audit</th>
                                                        <th>Date</th>
                                                        <th>Ref</th>
                                                        <th>Type</th>
                                                        <th>Details</th>
                                                        <th>Debit</th>
                                                        <th>Credit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        props.crd_data?.cashBookBalance.map((item, ind) => (
                                                            <>
                                                                {item?.receipt_details?.map((r_item, i) => (
                                                                    <>
                                                                        {i === 0 &&
                                                                            <tr key={ind}>
                                                                                <td>{item.id}</td>
                                                                                <td>{item.receipt_date}</td>
                                                                                <td>{item.ref}</td>
                                                                                <td>{item.type}</td>
                                                                                <td>From:
                                                                                    {
                                                                                        item.folio_type === 'Tenant' &&
                                                                                        `${item?.tenant_folio?.tenant_contact?.reference} (${item?.tenant_folio?.folio_code}) ${(item.type === 'Withdraw' || item.type === 'Folio Withdraw') ? r_item.description && r_item.description : ''}`
                                                                                    }
                                                                                    {
                                                                                        item.folio_type === 'Owner' &&
                                                                                        `${item?.owner_folio?.owner_contacts?.reference} (${item?.owner_folio?.folio_code}) ${(item.type === 'Withdraw' || item.type === 'Folio Withdraw') ? r_item.description && r_item.description : ''}`
                                                                                    }
                                                                                    {
                                                                                        item.folio_type === 'Supplier' &&
                                                                                        `${item?.supplier_folio?.supplier_contact?.reference} (${item?.supplier_folio?.folio_code}) ${(item.type === 'Withdraw' || item.type === 'Folio Withdraw') ? r_item.description && r_item.description : ''}`
                                                                                    }
                                                                                </td>
                                                                                <td>{item.type === 'Withdraw' || item.type === 'Folio Withdraw' ? `${item.amount} ৳` : ''}</td>
                                                                                <td>{" "}</td>
                                                                            </tr>
                                                                        }
                                                                        {
                                                                            (item.type !== 'Withdraw' && item.type !== 'Folio Withdraw') &&
                                                                            <tr key={i}>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td>to: {`${r_item.contact_reference.reference} (${r_item.folioCode})`}{r_item.description && `-${r_item.description}`}</td>
                                                                                <td>{" "}</td>
                                                                                <td>{r_item.amount}৳</td>
                                                                            </tr>
                                                                        }
                                                                        {
                                                                            (item.type === 'Withdraw' || item.type === 'Folio Withdraw') &&
                                                                            <tr key={i}>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td>to: {`${r_item.contact_reference.reference} (${r_item.folioCode})`}</td>
                                                                                <td>{" "}</td>
                                                                                <td></td>
                                                                            </tr>
                                                                        }
                                                                    </>
                                                                ))}
                                                            </>
                                                        ))
                                                    }
                                                    {
                                                        props.crd_data?.bankDepositList.map((item, i) => {
                                                            return <tr key={i}>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td className="fw-bold">A banking for {item.total}৳ was completed on {item.deposit_date}</td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                                <tfoot>
                                                    <tr className="border-top border-secondary border-1">
                                                        <td className="fw-bold">Cashbook Total	</td>
                                                        <td >		</td>
                                                        <td >	</td>
                                                        <td >		</td>
                                                        <td >		</td>
                                                        <td className="fw-bold">    {props.crd_data?.cashBookDebitBalance}৳</td>
                                                        <td className="fw-bold">{props.crd_data?.cashBookCreditBalance}৳</td>
                                                    </tr>
                                                </tfoot>
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
    const { crd_data, crd_loading } = gstate.Reconciliations;
    return {
        crd_data, crd_loading
    }
}

export default withRouter(
    connect(mapStateToProps, {
        cashBookReport
    })(CashBookReport)
);