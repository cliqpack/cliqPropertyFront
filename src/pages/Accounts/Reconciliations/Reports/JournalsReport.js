import React, { useEffect } from "react";
import {
    useParams,
    withRouter,
} from "react-router-dom";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import { journalReport } from "store/actions";
import { connect } from "react-redux";
import moment from "moment";
import InvoiceHeader from "common/Invoice/InvoiceHeader";
import jsPDF from "jspdf";
document.title = "CliqProperty";
const JournalsReport = (props) => {
    const { month, year } = useParams();
    function printDiv(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    }
    function downloadPdfDocument() {
        let pWidth = 595.28;
        let srcWidth = document.getElementById('printableArea').scrollWidth;
        let margin = 24;
        let scale = (pWidth - margin * 2) / srcWidth;
        let pdf = new jsPDF('p', 'pt', 'a4');
        pdf.html(document.getElementById('printableArea'), {
            margin: [40, 40, 40, 40],
            html2canvas: {
                scale: scale,
            },
            callback: (pdf) => {
                pdf.save('journals.pdf');
            }
        });
    }
    useEffect(() => {
        if (props.jrd_loading === false) {
            props.journalReport(year, month)
        }
    }, [props.jrd_loading]);
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
                                        <center className='py-1 fw-bold'>Journals Report</center>
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
                                                    <tr className="border-bottom border-1 border-secondary">
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
                                                    {props.jrd_data?.journalBalance?.map((item, ind) => (
                                                        <>
                                                            {item?.receipt_details?.map((r_item, i) => (
                                                                <>
                                                                    {i === 0 &&
                                                                        <tr className="" key={i}>
                                                                            <td>{item.id}	</td>
                                                                            <td>{item.receipt_date}</td>
                                                                            <td>{item.ref}	</td>
                                                                            <td>{item.type}</td>
                                                                            <td>From: {r_item.folioCode} {r_item.description}</td>
                                                                            <td>{r_item.amount}৳</td>
                                                                            <td>{" "}</td>
                                                                        </tr>
                                                                    }
                                                                    {i > 0 &&
                                                                        <tr className="" key={i}>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td>to: {r_item.folioCode} {r_item.description}</td>
                                                                            <td>{" "}</td>
                                                                            <td>{r_item.amount}৳</td>
                                                                        </tr>
                                                                    }
                                                                </>
                                                            ))}
                                                        </>
                                                    ))
                                                    }
                                                    <tr className="border-2 border-top border-secondary">
                                                        <td className="fw-bold">Journals Total</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td className="fw-bold">{props.jrd_data?.journalBalanceSum}৳</td>
                                                        <td className="fw-bold">{props.jrd_data?.journalBalanceSum}৳</td>
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
    const { jrd_loading, jrd_data } = gstate.Reconciliations;
    return {
        jrd_loading, jrd_data
    }
}
export default withRouter(
    connect(mapStateToProps, {
        journalReport
    })(JournalsReport)
);