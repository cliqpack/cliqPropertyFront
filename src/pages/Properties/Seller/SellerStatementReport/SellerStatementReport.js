import React, { useEffect } from "react";
import {
    useParams,
    withRouter,
    useHistory,
} from "react-router-dom";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Table,
} from "reactstrap";

import { connect } from "react-redux";
import moment from "moment";
// import InvoiceHeader from "common/Invoice/InvoiceHeader";
import InvoiceHeader from "common/Invoice/InvoiceHeader";
import mydaylogo from '../../../../assets/images/Asset5.png'
import './transactiontable.css'
import { SummaryTransactionByDate, SummaryTransactionByDateFresh } from "store/actions";
document.title = "CliqProperty";

const SellerStatementReport = props => {
    const { id, fromdate, todate } = useParams();
    const history = useHistory()
    useEffect(() => {
        props.SummaryTransactionByDate(id, { fromdate, todate })
    }, [])

    function printDiv(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    }

    function downloadPdfDocument() {
        const element = document.getElementById('printableArea');

        // Configuration for html2pdf
        const opt = {
            margin: 0.2, // margins around the content
            filename: 'folioLedger.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        // Call the html2pdf library with the element and options
        html2pdf().set(opt).from(element).save();
    }

    function sendDocumentInEmail() {
        const element = document.getElementById('printableArea');
        const opt = {
            margin: [1, 0.5, 1, 0.5],
            filename: 'folioLedger.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1.5 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).toPdf().get('pdf').then((pdf) => {
            const pdfBlob = pdf.output('blob');
            const formData = new FormData();
            formData.append('image[]', pdfBlob, 'folioLedger.pdf');
            props.storeAttachmentForSendInEmail(formData);
        });
        history.push('/messages', { uploaded: true });
    }
    function ceilToTwoDecimalPlaces(number) {
        return Math.ceil(number * 100) / 100;
    }
    console.log(props.summary_transaction_by_date);

    return (
        <React.Fragment>
            <div style={{ backgroundColor: 'lightgrey', minHeight: '1000px' }}>
               

                <Container fluid id="printableArea" className="p-3" style={{ height: '100%' }}>
                <InvoiceHeader printDiv={printDiv} downloadPdfDocument={downloadPdfDocument} sendDocumentInEmail={sendDocumentInEmail} style={{ paddingTop: '30em' }}/>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <img src={mydaylogo} height="60px" width="200px" style={{ margin: '40px' }} />
                                <div className="p-4">
                                    <p>(w) 9999 3333</p>
                                    <p>demo@myday.com</p>
                                    <p>Licence: 123123</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div style={{ paddingLeft: '80px', paddingTop: '40px' }}>
                                    <p>{props.summary_transaction_by_date?.ownerfolio?.owner_contacts?.reference}</p>
                                    <p>{props.summary_transaction_by_date?.ownerfolio?.owner_contacts?.owner_address?.number} {props.summary_transaction_by_date?.ownerfolio?.owner_contacts?.owner_address?.street}</p>
                                    <p>{props.summary_transaction_by_date?.ownerfolio?.owner_contacts?.owner_address?.suburb} {props.summary_transaction_by_date?.ownerfolio?.owner_contacts?.owner_address?.state} {props.summary_transaction_by_date?.ownerfolio?.owner_contacts?.owner_address?.postcode}</p>
                                </div>
                                <div style={{ paddingRight: '30px' }}>
                                    <h3>Folio Summary</h3>
                                    <p>Folio: {props.summary_transaction_by_date?.ownerfolio?.folio_code}</p>
                                    <p>From: {moment(fromdate).format('DD/MM/YYYY')}</p>
                                    <p>To: {moment(todate).format('DD/MM/YYYY')}</p>
                                    <p>Created: {moment().format('DD/MM/YYYY')}</p>
                                </div>
                            </div>
                            <div>
                                <table className="transactable">
                                    <tr>
                                        <th>Money In</th>
                                        <th>Money Out</th>
                                        <th>Balance</th>
                                    </tr>
                                    <tr>
                                        <td>${ceilToTwoDecimalPlaces(props.summary_transaction_by_date?.totalMoneyin)}</td>
                                        <td>${ceilToTwoDecimalPlaces(props.summary_transaction_by_date?.totalMoneyOut)}</td>
                                        <td>${ceilToTwoDecimalPlaces(props.summary_transaction_by_date?.totalBalance)}</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="d-flex justify-content-between mt-4 p-4 pb-0">
                                <h5>Account</h5>
                                <div className="d-flex justify-content-between" style={{ minWidth: '360px', marginLeft: '20px' }}>
                                    <div style={{ minWidth: '120px' }}>Included Tax</div>
                                    <div style={{ minWidth: '120px' }}>Money Out</div>
                                    <div style={{ minWidth: '120px' }}>Money In</div>
                                </div>
                            </div>
                            <hr style={{ margin: 0, marginBottom: '10px', border: '1px solid black', borderRadius: '5px' }} />
                            <h5>{ props.summary_transaction_by_date?.ownerfolio?.owner_properties?.property_address?.number } { props.summary_transaction_by_date?.ownerfolio?.owner_properties?.property_address?.street }, { props.summary_transaction_by_date?.ownerfolio?.owner_properties?.property_address?.suburb } { props.summary_transaction_by_date?.ownerfolio?.owner_properties?.property_address?.state }</h5><br />
                            {
                                props.summary_transaction_by_date?.data?.map(item => {
                                    return <div className="d-flex justify-content-between" key={item.id}>
                                        <p key={item.id}>{item?.account?.account_name}</p>
                                        <div className="d-flex justify-content-between" style={{ minWidth: '360px' }} key={item.id}>
                                            <div style={{ minWidth: '120px' }} key={item.id}>${ ceilToTwoDecimalPlaces(item?.total_tax_amount) }</div>
                                            <div style={{ minWidth: '120px' }} key={item.id}>${ item?.account?.type == 'Expense' ? ceilToTwoDecimalPlaces(item?.total_amount) : 0}</div>
                                            <div style={{ minWidth: '120px' }} key={item.id}>${ item?.account?.type == 'Income' ? ceilToTwoDecimalPlaces(item?.total_amount) : 0}</div>
                                        </div>
                                    </div>
                                })
                            }
                            <div className="d-flex justify-content-between">
                                <p><b>Subtotal</b></p>
                                <div className="d-flex justify-content-between" style={{ minWidth: '240px' }}>
                                    <div style={{ minWidth: '120px' }}><b>${ceilToTwoDecimalPlaces(props.summary_transaction_by_date?.subtotalMoneyOut)}</b></div>
                                    <div style={{ minWidth: '120px' }}><b>${ceilToTwoDecimalPlaces(props.summary_transaction_by_date?.subtotalMoneyin)}</b></div>
                                </div>
                            </div>
                            <hr style={{ margin: 0, marginBottom: '10px', border: '1px solid black', borderRadius: '5px' }} />
                            <h5>Account Transactions</h5><br />
                            {
                                props.summary_transaction_by_date?.accountTransaction?.map(item => {
                                    return <div className="d-flex justify-content-between" key={item.id}>
                                        <p key={item.id}>{item?.account?.account_name}</p>
                                        <div className="d-flex justify-content-between" style={{ minWidth: '360px' }} key={item.id}>
                                            <div style={{ minWidth: '120px' }}>${ceilToTwoDecimalPlaces(item?.total_tax_amount)}</div>
                                            <div style={{ minWidth: '120px' }}>${ceilToTwoDecimalPlaces(item?.total_amount)}</div>
                                            <div style={{ minWidth: '120px' }}></div>
                                        </div>
                                    </div>
                                })
                            }
                            <div className="d-flex justify-content-between">
                                <p>Subtotal</p>
                                <div className="d-flex justify-content-between" style={{ minWidth: '240px' }}>
                                    <div style={{ minWidth: '120px' }}><b>${ceilToTwoDecimalPlaces(props.summary_transaction_by_date?.totalaccountTransactionAmount)}</b></div>
                                    <div style={{ minWidth: '120px' }}></div>
                                </div>
                            </div>
                            <hr style={{ margin: 0, marginBottom: '10px', border: '1px solid black', borderRadius: '5px' }} />
                            <div className="d-flex justify-content-between">
                                <p>Total</p>
                                <div className="d-flex justify-content-between" style={{ minWidth: '240px' }}>
                                    <div style={{ minWidth: '120px' }}><b>${ceilToTwoDecimalPlaces(props.summary_transaction_by_date?.totalMoneyin)}</b></div>
                                    <div style={{ minWidth: '120px' }}><b>${ceilToTwoDecimalPlaces(props.summary_transaction_by_date?.totalMoneyOut)}</b></div>
                                </div>
                            </div>
                            <p>Total Tax on Money Out: ${ceilToTwoDecimalPlaces(props.summary_transaction_by_date?.totalTaxAmount)}</p>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = gstate => {
    const { summary_transaction_by_date, summary_transaction_by_date_loading } = gstate.AccountsTransactions;
    return { summary_transaction_by_date, summary_transaction_by_date_loading };
};

export default withRouter(
    connect(mapStateToProps, {
        SummaryTransactionByDate, SummaryTransactionByDateFresh
    })(SellerStatementReport)
);