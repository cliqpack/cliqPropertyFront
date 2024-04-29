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

import { UnreconciledItemsReports } from "store/actions";
//Import Image
import { connect } from "react-redux";
import moment from "moment";
import InvoiceHeader from "common/Invoice/InvoiceHeader";
import jsPDF from "jspdf";

document.title = "CliqProperty";

const UnreconcileItems = props => {
  const { date, id } = useParams();

  const month = date.slice(5, 7);
  const year = date.slice(0, 4);

  function printDiv(divName) {
    console.log(divName);
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

  useEffect(() => {
    if (props.uir_list_loading === false) {
      props.UnreconciledItemsReports(month, year, id);
    }
  }, [props.uir_list_loading]);
  const depositTotal = props.uir_list_data?.receipt.reduce(
    (prev, acc) => prev + parseInt(acc.amount),
    0
  );
  const adjustmentTotal = props.uir_list_data?.adjustmentList.reduce(
    (prev, acc) => prev + parseInt(acc.amount),
    0
  );
  const rmvAdjustmentTotal = props.uir_list_data?.removedAdjustmentList.reduce(
    (prev, acc) => prev + parseInt(acc.amount),
    0
  );

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
        pdf.save('unreconcile-item.pdf');
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
                    <center className="py-1 fw-bold">Unreconciled Items</center>
                    <center className="py-1">
                      From {moment().format('01/MM/YYYY')} to {moment().format('DD/MM/YYYY')}
                    </center>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div>
                    <div>
                      <div className="fw-bold h5">Deposits</div>
                      <div className="border-1 border-bottom border-secondary" />
                    </div>

                    <div className="table-responsive">
                      <Table className="table mb-0">
                        <thead>
                          <tr>
                            <th>Deposited </th>
                            <th>Type</th>
                            <th>Reference</th>
                            <th>Comments</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.uir_list_data?.receipt.map((item, i) => (
                            <tr key={i}>
                              <td className="col-md-2">{item.receipt_date} </td>
                              <td className="col-md-2">{item.status}</td>
                              <td className="col-md-2">{ }</td>
                              <td className="col-md-5">{ } </td>
                              <td className="col-md-1">{item.amount}৳ </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    <Row className="px-3 pt-1">
                      <Col md={6}>Total</Col>
                      <Col
                        md={6}
                        className="d-flex justify-content-end pe-4 fw-bold"
                      >
                        {depositTotal}৳
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div>
                    <div>
                      <div className="fw-bold h5">Withdrawals</div>
                      <div className="border-1 border-bottom border-secondary" />
                    </div>

                    <div className="table-responsive">
                      <Table className="table mb-0">
                        <thead>
                          <tr>
                            <th>Issued </th>
                            <th>Reference</th>
                            <th>Comments</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            props.uir_list_data?.unreconcilliedWithdrawl?.map((item) => {
                              return <tr key={item.id}>
                                <td className="col-md-2">{moment(item.create_date).format('DD/MM/YYYY')}</td>
                                <td className="col-md-2"></td>
                                <td className="col-md-7">
                                  {item.statement}
                                </td>
                                <td className="col-md-1">{item.amount}৳</td>
                              </tr>
                            })
                          }
                        </tbody>
                      </Table>
                    </div>
                    <Row className="px-3 pt-1">
                      <Col md={6}>Total</Col>
                      <Col
                        md={6}
                        className="d-flex justify-content-end pe-4 fw-bold"
                      >
                        {props.uir_list_data?.unreconcilliedWithdrawlAmount}৳
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div>
                    <div>
                      <div className="fw-bold h5">Ongoing Adjustments</div>
                      <div className="border-1 border-bottom border-secondary" />
                    </div>

                    <div className="table-responsive">
                      <Table className="table mb-0">
                        <thead>
                          <tr>
                            <th>Date </th>
                            <th>Reason</th>

                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.uir_list_data?.adjustmentList.map(
                            (item, i) => (
                              <tr key={i}>
                                <td className="col-md-2">
                                  {item.adjustment_date}
                                </td>
                                <td className="col-md-9">{item.reason}</td>

                                <td className="col-md-1">{item.amount}৳</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </Table>
                    </div>
                    <Row className="px-3 pt-1">
                      <Col md={6}>Total</Col>
                      <Col
                        md={6}
                        className="d-flex justify-content-end pe-4 fw-bold"
                      >
                        {adjustmentTotal}৳
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div>
                    <div>
                      <div className="fw-bold h5">Removed Adjustments</div>
                      <div className="border-1 border-bottom border-secondary" />
                    </div>

                    <div className="table-responsive">
                      <Table className="table mb-0">
                        <thead>
                          <tr>
                            <th>Date </th>
                            <th>Reason</th>

                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.uir_list_data?.removedAdjustmentList.map(
                            (item, i) => (
                              <tr key={i}>
                                <td className="col-md-2">
                                  {item.adjustment_date}
                                </td>
                                <td className="col-md-9">
                                  {item.removed_reason}
                                </td>

                                <td className="col-md-1"> {item.amount}৳ </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </Table>
                    </div>
                    <Row className="px-3 pt-1">
                      <Col md={6}>Total</Col>
                      <Col
                        md={6}
                        className="d-flex justify-content-end pe-4 fw-bold"
                      >
                        {rmvAdjustmentTotal}৳
                      </Col>
                    </Row>
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
  const { uir_list_data, uir_list_loading } = gstate.Reconciliations;
  return {
    uir_list_data,
    uir_list_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    UnreconciledItemsReports,
  })(UnreconcileItems)
);
