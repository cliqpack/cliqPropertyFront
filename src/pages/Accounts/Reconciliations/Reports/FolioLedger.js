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

import { folioLedgerReport } from "store/actions";
//Import Image
import { connect } from "react-redux";
import moment from "moment";
import InvoiceHeader from "common/Invoice/InvoiceHeader";
import jsPDF from "jspdf";

document.title = "CliqProperty";

const FolioLedger = props => {
  const { year, month, day } = useParams();

  function printDiv(divName) {
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
    console.log(scale);
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(document.getElementById('printableArea'), {
      margin: [40, 40, 40, 40],
      html2canvas: {
        scale: scale,
      },
      callback: (pdf) => {
        pdf.save('folioLedger.pdf');
      }
    });
  }

  const dateHandler = date => moment(date).format("YYYY/MM/DD");
  const thisMonth = moment().format('MM');
  const thisYear = moment().format('YYYY');
  const endOfMonth = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
  let toDate = undefined;
  if ((thisYear > year) || (thisMonth > month)) {
    toDate = `${endOfMonth}/${month}/${year}`;
  } else {
    toDate = moment().format('DD/MM/YYYY');
  }

  useEffect(() => {
    if (props.fl_loading === false) {
      props.folioLedgerReport(year, month);
    }
  }, [props.fl_loading]);

  console.log(props?.fl_data);

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
                    <center className="py-1 fw-bold">Folio Ledger</center>
                    <center className="py-1">
                      From {`1/${month}/${year}`} to {toDate}
                    </center>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  {/* Owner Folio */}
                  <div>
                    <div className="pb-2">
                      <div className="fw-bold font-size-18 ms-3">
                        Owner folios
                      </div>
                      {/* <div className="border border-bottom border-secondary" /> */}
                    </div>

                    <div className="table-responsive">
                      <Table className="table mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Audit </th>
                            <th>Date</th>
                            <th>Ref</th>
                            <th>Type</th>
                            <th>Details</th>
                            <th></th>
                            <th>Debit</th>
                            <th>Credit</th>

                            <th>Balance</th>
                          </tr>
                        </thead>

                        <tbody>
                          {props?.fl_data?.data.map((item, index) => {
                            return (
                              <>
                                {
                                  item.folio_ledger?.length > 0 &&
                                  <tr key={index}>
                                    <td colSpan="12">
                                      <span className="fw-bold font-size-16">
                                        {item?.owner_contacts?.reference} -{" "}
                                        {item?.folio_code}
                                      </span>
                                    </td>
                                  </tr>
                                }
                                {item?.folio_ledger.map((item2, index2) => {
                                  let balance = parseInt(item2?.opening_balance ? item2?.opening_balance : 0);
                                  let creditTotal;
                                  let debitTotal;
                                  return (
                                    <>
                                      <tr key={index2 + 1}>
                                        <td
                                          colSpan="6"
                                          className="text-end fw-bold me-5"
                                        >
                                          Opening Balance :
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td
                                          // colSpan="3"
                                          className="fw-bold"
                                        >
                                          {item2?.opening_balance ? item2?.opening_balance : 0}৳
                                        </td>
                                      </tr>

                                      {item2?.ledger_details_daily?.map(
                                        (item3, index3) => {
                                          // { console.log(item2.ledger_details_daily.filter((item) => item.type == 'credit')) }
                                          creditTotal =
                                            item2?.ledger_details_daily
                                              .filter(
                                                item => item.type == "credit"
                                              )
                                              .reduce(
                                                (acc, item) =>
                                                  acc + parseInt(item.amount),
                                                0
                                              );
                                          debitTotal =
                                            item2?.ledger_details_daily
                                              .filter(
                                                item => item.type == "debit"
                                              )
                                              .reduce(
                                                (acc, item) =>
                                                  acc + parseInt(item.amount),
                                                0
                                              );
                                          return (
                                            <>
                                              <tr key={index3 + 2}>
                                                <td>{index3 + 1}</td>
                                                <td>
                                                  {dateHandler(item3.date)}
                                                </td>
                                                <td></td>
                                                <td>{item3.ledger_type}</td>
                                                <td>{item3.details}</td>
                                                <td></td>
                                                <td
                                                  className={
                                                    item2?.ledger_details_daily
                                                      .length -
                                                      1 ==
                                                      index3
                                                      ? "border-bottom border-secondary"
                                                      : ""
                                                  }
                                                >
                                                  {item3.type == "debit"
                                                    ? item3.amount
                                                    : 0}৳
                                                </td>
                                                <td
                                                  className={
                                                    item2?.ledger_details_daily
                                                      .length -
                                                      1 ==
                                                      index3
                                                      ? "border-bottom border-secondary"
                                                      : ""
                                                  }
                                                >
                                                  {item3.type == "credit"
                                                    ? item3.amount
                                                    : 0}৳
                                                </td>
                                                <td
                                                  className={
                                                    item2?.ledger_details_daily
                                                      .length -
                                                      1 ==
                                                      index3
                                                      ? "border-bottom border-secondary"
                                                      : ""
                                                  }
                                                >
                                                  {item3.type == "credit"
                                                    ? (balance =
                                                      parseInt(item3.amount) +
                                                      parseInt(balance))
                                                    : (balance =
                                                      balance > 0
                                                        ? balance -
                                                        parseInt(
                                                          item3.amount
                                                        )
                                                        : 0)}৳
                                                </td>
                                              </tr>
                                            </>
                                          );
                                        }
                                      )}

                                      <tr className="pb-2" key={index2}>
                                        <th> </th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>Closing Balance:</th>
                                        <th>{debitTotal ? debitTotal : 0}৳</th>
                                        <th>{creditTotal ? creditTotal : 0}৳</th>

                                        <th>{item2?.closing_balance ? item2?.closing_balance : 0}৳</th>
                                      </tr>
                                    </>
                                  );
                                })}
                              </>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </div>

                  {/* Tenant Folio */}
                  <div className="my-5 py-2">
                    <div className="pb-2">
                      <div className="fw-bold font-size-18 ms-3">
                        Tenant folios
                      </div>
                      {/* <div className="border-1 border-bottom border-secondary" /> */}
                    </div>

                    <div className="table-responsive">
                      <Table className="table mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Audit </th>
                            <th>Date</th>
                            <th>Ref</th>
                            <th>Type</th>
                            <th>Details</th>
                            <th></th>
                            <th>Dedit</th>
                            <th>Credit</th>

                            <th>Balance</th>
                          </tr>
                        </thead>

                        <tbody>
                          {props?.fl_data?.tenant.map((item, index) => {
                            return (
                              <>
                                {
                                  item.folio_ledger?.length > 0 &&
                                  <tr key={index}>
                                    <td colSpan="12">
                                      <span className="fw-bold font-size-16">
                                        {item?.tenant_properties?.reference} -{" "}
                                        {item?.folio_code ? item?.folio_code : ""}
                                      </span>
                                    </td>
                                  </tr>
                                }

                                {item.folio_ledger.map((item2, index2) => {
                                  let balance = parseInt(item2.opening_balance);

                                  let creditTotal;
                                  let debitTotal;
                                  return (
                                    <>
                                      <tr key={index2 + 1}>
                                        <td
                                          colSpan="6"
                                          className="text-end fw-bold me-5"
                                        >
                                          Opening Balance :
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td className="fw-bold">
                                          {item2.opening_balance ? item2.opening_balance : 0}৳
                                        </td>
                                      </tr>

                                      {item2.ledger_details_daily.map(
                                        (item3, index3) => {
                                          creditTotal =
                                            item2.ledger_details_daily
                                              .filter(
                                                item => item.type == "credit"
                                              )
                                              .reduce(
                                                (acc, item) =>
                                                  acc + parseInt(item.amount),
                                                0
                                              );
                                          debitTotal =
                                            item2.ledger_details_daily
                                              .filter(
                                                item => item.type == "debit"
                                              )
                                              .reduce(
                                                (acc, item) =>
                                                  acc + parseInt(item.amount),
                                                0
                                              );
                                          return (
                                            <>
                                              <tr key={index3 + 2}>
                                                <td>{index3 + 1}</td>
                                                <td>{item3.date}</td>
                                                <td></td>
                                                <td>{item3.ledger_type}</td>
                                                <td>{item3.details}</td>
                                                <td>{ }</td>
                                                <td
                                                  className={
                                                    item2.ledger_details_daily
                                                      .length -
                                                      1 ==
                                                      index3
                                                      ? "border-bottom border-secondary"
                                                      : ""
                                                  }
                                                >
                                                  {item3.type == "debit"
                                                    ? item3.amount
                                                    : 0}৳
                                                </td>
                                                <td
                                                  className={
                                                    item2.ledger_details_daily
                                                      .length -
                                                      1 ==
                                                      index3
                                                      ? "border-bottom border-secondary"
                                                      : ""
                                                  }
                                                >
                                                  {item3.type == "credit"
                                                    ? item3.amount
                                                    : 0}৳
                                                </td>
                                                <td
                                                  className={
                                                    item2.ledger_details_daily
                                                      .length -
                                                      1 ==
                                                      index3
                                                      ? "border-bottom border-secondary"
                                                      : ""
                                                  }
                                                >
                                                  {item3.type == "credit"
                                                    ? (balance =
                                                      parseInt(item3.amount) +
                                                      parseInt(balance))
                                                    : (balance =
                                                      balance > 0
                                                        ? balance -
                                                        parseInt(
                                                          item3.amount
                                                        )
                                                        : 0)}৳
                                                </td>
                                              </tr>
                                            </>
                                          );
                                        }
                                      )}

                                      <tr key={index2}>
                                        {/* <td colSpan="2" className="text-end fw-bold me-5">Closing Balance : {item2.closing_balance}</td> */}

                                        <th> </th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>Closing Balance</th>
                                        <th>{debitTotal ? debitTotal : 0}৳</th>
                                        <th>{creditTotal ? creditTotal : 0}৳</th>

                                        <th>{item2.closing_balance ? item2.closing_balance : 0}৳</th>
                                      </tr>
                                    </>
                                  );
                                })}
                              </>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </div>

                  {/* Supplier Folio */}
                  <div className="my-5 py-2">
                    <div className="pb-2">
                      <div className="fw-bold font-size-18 ms-3">
                        Supplier folios
                      </div>
                      {/* <div className="border-1 border-bottom border-secondary" /> */}
                    </div>

                    <div className="table-responsive">
                      <Table className="table mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Audit </th>
                            <th>Date</th>
                            <th>Ref</th>
                            <th>Type</th>
                            <th>Details</th>
                            <th></th>
                            <th>Dedit</th>
                            <th>Credit</th>

                            <th>Balance</th>
                          </tr>
                        </thead>

                        <tbody>
                          {props?.fl_data?.supplier.map((item, index) => {
                            return (
                              <>
                                {
                                  item.folio_ledger?.length > 0 &&
                                  <tr key={index}>
                                    <td colSpan="12">
                                      <span className="fw-bold font-size-16">
                                        {item?.supplier_contact?.reference} -{" "}
                                        {item?.folio_code ? item?.folio_code : ""}
                                      </span>
                                    </td>
                                  </tr>
                                }
                                {item.folio_ledger.map((item2, index2) => {
                                  let balance = parseInt(item2.opening_balance);

                                  let creditTotal;
                                  let debitTotal;
                                  return (
                                    <>
                                      <tr key={index2 + 1}>
                                        <td
                                          colSpan="6"
                                          className="text-end fw-bold me-5"
                                        >
                                          Opening Balance :
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td className="fw-bold">
                                          {item2?.opening_balance ? item2?.opening_balance : 0}৳
                                        </td>
                                      </tr>

                                      {item2?.ledger_details_daily?.map(
                                        (item3, index3) => {
                                          creditTotal =
                                            item2?.ledger_details_daily
                                              .filter(
                                                item => item.type == "credit"
                                              )
                                              .reduce(
                                                (acc, item) =>
                                                  acc + parseInt(item.amount),
                                                0
                                              );
                                          debitTotal =
                                            item2?.ledger_details_daily
                                              .filter(
                                                item => item.type == "debit"
                                              )
                                              .reduce(
                                                (acc, item) =>
                                                  acc + parseInt(item.amount),
                                                0
                                              );
                                          return (
                                            <>
                                              <tr key={index3 + 2}>
                                                <td>{index3 + 1}</td>
                                                <td>{item3.date}</td>
                                                <td></td>
                                                <td>{item3.ledger_type}</td>
                                                <td>{item3.details}</td>
                                                <td>{ }</td>
                                                <td
                                                  className={
                                                    item2?.ledger_details_daily
                                                      .length -
                                                      1 ==
                                                      index3
                                                      ? "border-bottom border-secondary"
                                                      : ""
                                                  }
                                                >
                                                  {item3.type == "debit"
                                                    ? item3.amount
                                                    : 0}৳
                                                </td>
                                                <td
                                                  className={
                                                    item2.ledger_details_daily
                                                      .length -
                                                      1 ==
                                                      index3
                                                      ? "border-bottom border-secondary"
                                                      : ""
                                                  }
                                                >
                                                  {item3.type == "credit"
                                                    ? item3.amount
                                                    : 0}৳
                                                </td>
                                                <td
                                                  className={
                                                    item2.ledger_details_daily
                                                      .length -
                                                      1 ==
                                                      index3
                                                      ? "border-bottom border-secondary"
                                                      : ""
                                                  }
                                                >
                                                  {item3.type == "credit"
                                                    ? (balance =
                                                      parseInt(item3.amount) +
                                                      parseInt(balance))
                                                    : (balance =
                                                      balance > 0
                                                        ? balance -
                                                        parseInt(
                                                          item3.amount
                                                        )
                                                        : 0)}৳
                                                </td>
                                              </tr>
                                            </>
                                          );
                                        }
                                      )}

                                      <tr key={index2}>
                                        {/* <td colSpan="2" className="text-end fw-bold me-5">Closing Balance : {item2.closing_balance}</td> */}

                                        <th> </th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>Closing Balance</th>
                                        <th>{debitTotal ? debitTotal : 0}৳</th>
                                        <th>{creditTotal ? creditTotal : 0}৳</th>

                                        <th>{item2.closing_balance ? item2.closing_balance : 0}৳</th>
                                      </tr>
                                    </>
                                  );
                                })}
                              </>
                            );
                          })}
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
  const { fl_data, fl_loading } = gstate.Reconciliations;
  return {
    fl_data,
    fl_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    folioLedgerReport,
  })(FolioLedger)
);
