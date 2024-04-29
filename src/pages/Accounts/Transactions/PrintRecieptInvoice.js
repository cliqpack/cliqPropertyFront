import React, { useEffect, useRef, useState, createRef } from "react";
import {
    Link,
    useHistory,
    useLocation,
    useParams,
    withRouter,
} from "react-router-dom";
import { Card, CardBody, Col, Container, Row, Table, CardImg } from "reactstrap";
import { isEmpty, map } from "lodash";
import logo from "../../../assets/images/Asset4.png";


import { transactionsInfoList } from "store/actions";
//Import Image
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import toastr from "toastr";
import InvoiceHeader from "common/Invoice/InvoiceHeader";
// import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
// import Pdf from "react-to-pdf";
import jsPDF from "jspdf";

document.title = "CliqProperty";

const PrintRecieptInvoice = (props) => {
    const { id } = useParams();
    const history = useHistory();
    const [init, setInit] = useState(true)

    const ref = createRef();

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
                pdf.save('receipt.pdf');
            }
        });
    }

    useEffect(() => {
        props.transactionsInfoList(id)
    }, []);
    const data = props.transaction_list_info_data?.data ? props.transaction_list_info_data?.data : "";
    const totalAmount = data?.receipt_details?.reduce((acc, item) => acc + parseInt(item.amount), 0);

    return (

        <React.Fragment>
            <div className="">
                <InvoiceHeader printDiv={printDiv} downloadPdfDocument={downloadPdfDocument} />
                <Container className="pt-4" id="printableArea" >
                    <Row>
                        <Col lg={12}>
                            <Row>
                                <Col sm="6" className="mt-3">
                                    <img src={logo} alt="logo" height="50" />
                                </Col>
                                <Col sm="6" className="mt-3 text-sm-end">
                                    <address>
                                        <strong>(w) 1111 2222</strong>
                                        <br />
                                        <div>
                                            www.CliqProperty.com
                                        </div>
                                        <div>
                                            reply@CliqProperty.com
                                        </div>
                                        <div>
                                            46 Hall St <br />
                                            Bondi Beach NSW 2026 <br />
                                        </div>
                                        <div>
                                            ABN:
                                        </div>
                                        <div>
                                            Licence:
                                        </div>
                                    </address>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div className="">
                        <div className="py-2 mt-3">
                            <h3 className="font-weight-bold">
                                Trust Account Receipt

                            </h3>
                        </div>
                        <Row className="ps-5 pb-5">
                            <Col md={6} className="mt-3">
                                <Row className="py-1">
                                    <Col md={3} className='d-flex justify-content-start'>For property:</Col>
                                    <Col md={8} className='d-flex justify-content-start'>
                                        {`${data?.property?.reference}`}
                                    </Col>
                                </Row>
                                <Row className="py-1">
                                    <Col md={3} className='d-flex justify-content-start'>Receipt number:</Col>
                                    <Col md={8} className='d-flex justify-content-start'>{data?.id}</Col>
                                </Row>
                                <Row className="py-1">
                                    <Col md={3} className='d-flex justify-content-start'>Date received:</Col>
                                    <Col md={8} className='d-flex justify-content-start'>{data?.receipt_date}</Col>
                                </Row>
                                <Row className="py-1">
                                    <Col md={3} className='d-flex justify-content-start'>On behalf of:</Col>
                                    <Col md={8} className='d-flex justify-content-start'> Tenant_2 Saddam hossain - nothing - (TEN00057)</Col>
                                </Row>
                                <Row className="py-1">
                                    <Col md={3} className='d-flex justify-content-start'>Owner:</Col>
                                    <Col md={8} className='d-flex justify-content-start'> owner_2 Saddam hossain - Marvel - (OWN00056)</Col>
                                </Row>
                            </Col>

                            <Col md={6} className="mt-3">
                                <Row className="py-1 d-flex justify-content-end">
                                    <Col md={8} className='d-flex justify-content-end'>Payment method: </Col>
                                    <Col md={4} className='d-flex justify-content-start'>{data?.payment_method?.toUpperCase()} </Col>
                                </Row>
                            </Col>


                        </Row>
                        <div className="table-responsive">
                            <Table className="table mb-0">
                                <thead>
                                    <tr className="border-secondary">
                                        <th>Description	</th>
                                        <th>Included Tax</th>
                                        <th>Amount</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.receipt_details?.map((item, i) => (
                                        <tr key={i}>
                                            <td className="col-md-7">{item.allocation}</td>
                                            <td className="col-md-2 border-secondary">0.00৳</td>
                                            <td className="col-md-2 border-secondary">{item.amount}৳</td>
                                        </tr>
                                    ))
                                    }

                                    <tr className="border-secondary">
                                        <td className="col-md-7">Total</td>
                                        <td className="col-md-2">0.00৳</td>
                                        <td className="col-md-2">{totalAmount}৳</td>
                                    </tr>

                                </tbody>
                            </Table>


                        </div>
                        {/* <Row className="ps-5 py-5">


                            <Col sm="6" className="mt-3">
                                <Row className="py-1">
                                    <Col md={3} className='d-flex justify-content-start'>Payment method:</Col>
                                    <Col md={8} className='d-flex justify-content-start'>EFT </Col>
                                </Row>
                                <Row className="py-1">
                                    <Col md={3} className='d-flex justify-content-start'>Principal:</Col>
                                    <Col md={8} className='d-flex justify-content-start'> Dave Agent</Col>
                                </Row>
                                <Row className="py-1">
                                    <Col md={3} className='d-flex justify-content-start'>Company: </Col>
                                    <Col md={8} className='d-flex justify-content-start'> Mytown Properties</Col>
                                </Row>
                                <Row className="py-1">
                                    <Col md={3} className='d-flex justify-content-start'>Receipted by: </Col>
                                    <Col md={8} className='d-flex justify-content-start'> Abhijit Das</Col>
                                </Row>
                                <Row className="py-1">
                                    <Col md={3} className='d-flex justify-content-start'>Date processed:</Col>
                                    <Col md={8} className='d-flex justify-content-start'>1/12/2022 </Col>
                                </Row>
                            </Col>

                            <Col sm="6" className="mt-3 text-sm-end">

                            </Col>
                        </Row> */}
                    </div>
                </Container>
            </div>
        </React.Fragment>

    );
};


const mapStateToProps = gstate => {
    const {
        transaction_list_info_loading, transaction_list_info_data
    } = gstate.AccountsTransactions;

    return {
        transaction_list_info_loading, transaction_list_info_data
    };
}

export default withRouter(
    connect(mapStateToProps, {
        transactionsInfoList
    })(PrintRecieptInvoice)
);