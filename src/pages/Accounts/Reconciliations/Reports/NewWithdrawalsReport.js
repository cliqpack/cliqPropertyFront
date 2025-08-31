import React, { useEffect } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";

import { newWithDrawalsReport } from "store/actions";
//Import Image
import InvoiceHeader from "common/Invoice/InvoiceHeader";
import moment from "moment";
import { connect } from "react-redux";
document.title = "CliqProperty";

const NewWithDrawalsReport = props => {
  const { month, year } = useParams();
  const history = useHistory();
  const dateHandler = date => moment(date).format("YYYY/MM/DD");
  const thisMonth = moment().format("MM");
  const thisYear = moment().format("YYYY");

  const monthInt = parseInt(month);
  const yearInt = parseInt(year);
  const startDate = `1/${month}/${year}`;
  const endDate = `30/${month}/${year}`;
  // const goBack = () => history.push(`/maintenanceInfo/${id}`)
  //   const goBack = () => window.close();
  const goBack = () => history.goBack();

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

  useEffect(() => {
    if (props.nwrd_loading === false) {
      props.newWithDrawalsReport(month, year);
    }
  }, [props.nwrd_loading]);
  console.log(props.nwrd_loading, props.nwrd_data);

  return (
    <React.Fragment>
      <div>
        <InvoiceHeader printDiv={printDiv} />

        <Container className="" fluid id="printableArea">
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <div className="d-flex flex-column justify-content-end w-100 py-1 mb-2">
                    <center className="py-1 fw-bold">
                      Cash Book Report - Receipts
                    </center>
                    <center className="py-1">
                      From {startDate} to {endDate} by Transaction Date
                    </center>
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
                          {props.nwrd_data?.data.map((item, i) => (
                            <tr
                              key={i}
                              className={
                                props.nwrd_data?.data.length - 1 === i
                                  ? `border-bottom border-secondary border-1`
                                  : ``
                              }
                            >
                              <td>{item.id}</td>
                              <td>{item.receipt_date}</td>
                              <td>{item.ref}</td>
                              <td>{item.type}</td>
                              <td colSpan={6}>
                                {item?.receipt_details?.map((item, i) => (
                                  <tr className="col-md-12 row" key={i}>
                                    {console.log(item)}

                                    {i === 0 && (
                                      <td className="col-md-5">
                                        From: {item.folioCode}{" "}
                                        {item.description}
                                      </td>
                                    )}
                                    {i === 0 && <td className="col-md-3"> </td>}
                                    {i === 0 && (
                                      <td className="col-md-3">
                                        ${item.amount}
                                      </td>
                                    )}
                                    {i === 1 && (
                                      <td className="col-md-6">
                                        to: {item.folioCode} {item.description}
                                      </td>
                                    )}
                                    {i === 1 && <td className="col-md-3"> </td>}
                                    {i === 1 && <td className="col-md-3"> </td>}
                                    {i === 1 && (
                                      <td className="col-md-3">
                                        ${item.amount}
                                      </td>
                                    )}
                                  </tr>
                                ))}
                              </td>
                            </tr>
                          ))}

                          <tr className="">
                            <td className="fw-bold">Cashbook Total </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td></td>
                            <td className="fw-bold"> </td>
                            <td className="fw-bold">
                              ${props.nwrd_data?.totalAmount}
                            </td>
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
  const { nwrd_data, nwrd_loading } = gstate.Reconciliations;
  return {
    nwrd_data,
    nwrd_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    newWithDrawalsReport,
  })(NewWithDrawalsReport)
);
