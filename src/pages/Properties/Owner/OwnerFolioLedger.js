import React, { useEffect, useState } from "react";
import {
    useParams,
    withRouter,
    useHistory
} from "react-router-dom";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Table,
} from "reactstrap";

import { ownerFolioLedgerReport, storeAttachmentForSendInEmail, FilterOwnerFolioLedgerReportApi, FilterOwnerFolioLedgerReportApiFresh } from "store/actions";
import { connect } from "react-redux";
import moment from "moment";
import InvoiceHeader from "common/Invoice/InvoiceHeader";
import OwnerFolioLedgerFilter from "./OwnerFolioLedger/OwnerFolioLedgerFilter";
import Loder from "components/Loder/Loder";

document.title = "CliqProperty";

const OwnerFolioLedger = props => {
    const { id } = useParams();
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const startLoader = () => setLoader(true);
    const endLoader = () => setLoader(false);
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

    const thisMonth = moment().format('MM');
    const thisYear = moment().format('YYYY');
    const endOfMonth = moment(`${thisYear}-${thisMonth}`, "YYYY-MM").daysInMonth();
    let toDate = undefined;
    const dateHandler = date => moment(date).format("YYYY/MM/DD");

    useEffect(() => {
        props.ownerFolioLedgerReport(id);
    }, []);
    useEffect(() => {
        if (props.owner_fl_data_loading === 'Success') {
            endLoader()
            props.FilterOwnerFolioLedgerReportApiFresh()
        }
    }, [props.owner_fl_data_loading])

    return (
        <React.Fragment>
            <div>
                <InvoiceHeader printDiv={printDiv} downloadPdfDocument={downloadPdfDocument} sendDocumentInEmail={sendDocumentInEmail} />
                <OwnerFolioLedgerFilter startLoader={startLoader} id={id}
                    FilterOwnerFolioLedgerReportApi={props.FilterOwnerFolioLedgerReportApi}
                />
                <Container className="" fluid id="printableArea">
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <div>
                                        <div className="pb-2">
                                            <div className="fw-bold font-size-18 ms-3">
                                                Owner folios
                                            </div>
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
                                                    {
                                                        props.owner_fl_data?.data?.folio_ledger?.length > 0 &&
                                                        <tr>
                                                            <td colSpan="12">
                                                                <span className="fw-bold font-size-16">
                                                                    {props.owner_fl_data?.data?.owner_contacts?.reference} -{" "}
                                                                    {props.owner_fl_data?.data?.folio_code}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    }
                                                    {props.owner_fl_data?.data?.folio_ledger.map((item2, index2) => {
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
                                                                        className="fw-bold"
                                                                    >
                                                                        ${item2?.opening_balance ? item2?.opening_balance : 0}
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
                                                                                        ${item3.type == "debit"
                                                                                            ? item3.amount
                                                                                            : 0}
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
                                                                                        ${item3.type == "credit"
                                                                                            ? item3.amount
                                                                                            : 0}
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
                                                                                        ${item3.type == "credit"
                                                                                            ? (balance =
                                                                                                parseInt(item3.amount) +
                                                                                                parseInt(balance))
                                                                                            : (balance =
                                                                                                balance > 0
                                                                                                    ? balance -
                                                                                                    parseInt(
                                                                                                        item3.amount
                                                                                                    )
                                                                                                    : 0)}
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
                                                                    <th>${debitTotal ? debitTotal : 0}</th>
                                                                    <th>${creditTotal ? creditTotal : 0}</th>
                                                                    <th>${item2?.closing_balance ? item2?.closing_balance : 0}</th>
                                                                </tr>
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
            {loader && <Loder status={loader} />}
        </React.Fragment>
    );
};

const mapStateToProps = gstate => {
    const { owner_fl_data, owner_fl_data_loading } = gstate.AccountsTransactions;
    const { mail_attachment_data } = gstate.Message;
    return {
        owner_fl_data, owner_fl_data_loading, mail_attachment_data
    };
};

export default withRouter(
    connect(mapStateToProps, {
        ownerFolioLedgerReport, storeAttachmentForSendInEmail, FilterOwnerFolioLedgerReportApi, FilterOwnerFolioLedgerReportApiFresh
    })(OwnerFolioLedger)
);
