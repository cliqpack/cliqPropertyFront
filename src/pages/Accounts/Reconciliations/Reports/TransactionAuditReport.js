import React, { useEffect } from "react";
import {
  useParams,
  withRouter,
} from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
import jsPDF from "jspdf";

import { transactionsAuditReport } from "store/actions";
//Import Image
import { connect } from "react-redux";
import moment from "moment";
import InvoiceHeader from "common/Invoice/InvoiceHeader";

document.title = "CliqProperty";

const TransactionAuditReport = props => {
  const { month, year } = useParams();

  const goBack = () => window.close();

  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };

  function printDiv(divName) {
    console.log(divName);
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }
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
        pdf.save('transactionaudit.pdf');
      }
    });
  }

  useEffect(() => {
    if (props.tard_loading === false) {
      props.transactionsAuditReport(year, month);
    }
  }, [props.tard_loading]);

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
                    <center className="py-1 fw-bold">
                      Transaction Audit Report
                    </center>
                    <center className="py-1 fw-bold">
                      {moment(month).format("MMMM")} {year} by Transaction Date
                    </center>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div>
                    <div className="table-responsive">
                      <Table className="table mb-0">
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
                          {props.tard_data?.transactionAudit.map((receipt_item, ind) => (
                            <>
                              {
                                (receipt_item.new_type === 'Payment' || receipt_item.new_type === "Journal") &&
                                receipt_item?.receipt_details?.map((item, i) => (
                                  <tr
                                    key={i}
                                  >
                                    <td>{receipt_item.id}</td>
                                    <td>{receipt_item.receipt_date}</td>
                                    <td>{receipt_item.ref}</td>
                                    <td>{receipt_item.new_type}</td>
                                    {i === 0 && (
                                      <>
                                        <td>
                                          From: {item.folioCode}{" - "}
                                          {item.description}
                                        </td>
                                        <td>
                                          {item.amount}৳
                                        </td>
                                        <td></td>
                                      </>
                                    )}
                                    {i === 1 && (
                                      <>
                                        <td>
                                          to: {item.folioCode} - {item.description}
                                        </td>
                                        <td> </td>
                                        <td>
                                          {item.amount}৳
                                        </td>
                                      </>
                                    )}
                                  </tr>
                                ))
                              }
                              {
                                receipt_item.new_type === "Withdrawal" &&
                                receipt_item?.receipt_details?.map((item, i) => (
                                  <>
                                    <tr
                                      key={i}
                                    >
                                      <td>{receipt_item.id}</td>
                                      <td>{receipt_item.receipt_date}</td>
                                      <td>{receipt_item.ref}</td>
                                      <td>{receipt_item.new_type}</td>
                                      <td>
                                        From: {item.folioCode}{" - "}
                                        {item.description}
                                      </td>
                                      <td>
                                        {item.amount}৳
                                      </td>
                                      <td> </td>
                                    </tr>
                                    <tr
                                      key={i}
                                    >
                                      <td>{receipt_item.id}</td>
                                      <td>{receipt_item.receipt_date}</td>
                                      <td>{receipt_item.ref}</td>
                                      <td>{receipt_item.new_type}</td>
                                      <td>
                                        to: {item?.contact_reference?.reference}
                                      </td>
                                      <td> </td>
                                      <td>
                                      </td>
                                    </tr>
                                  </>
                                ))
                              }
                              {
                                receipt_item.new_type === "Receipt" &&
                                <>
                                  <tr
                                    key={ind}
                                  >
                                    <td>{receipt_item.id}</td>
                                    <td>{receipt_item.receipt_date}</td>
                                    <td>{receipt_item.ref}</td>
                                    <td>{receipt_item.new_type}</td>
                                    <td>
                                      From:{" "}
                                      {
                                        receipt_item.folio_type === 'Tenant' && `${receipt_item?.tenant_folio?.tenant_contact?.reference}`
                                      }
                                      {
                                        receipt_item.folio_type === 'Owner' && `${receipt_item?.owner_folio?.owner_contacts?.reference}`
                                      }
                                      {
                                        receipt_item.folio_type === 'Supplier' && `${receipt_item?.supplier_folio?.supplier_contact?.reference}`
                                      }
                                    </td>
                                    <td>
                                    </td>
                                    <td> </td>
                                  </tr>
                                  {receipt_item?.receipt_details?.map((item, i) => (
                                    <tr
                                      key={i}
                                    >
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td>to: {item?.folioCode} - {item?.description}</td>
                                      <td></td>
                                      <td>{item.amount}৳</td>
                                    </tr>
                                  ))}
                                </>
                              }
                            </>
                          ))}
                          <tr className="border-secondary border-1">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td><b>Cashbook Total</b></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{props.tard_data?.debit}৳</td>
                            <td>{props.tard_data?.credit}৳</td>
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
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const { tard_data, tard_loading } = gstate.Reconciliations;
  return {
    tard_data,
    tard_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    transactionsAuditReport,
  })(TransactionAuditReport)
);
