import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { FolioLedgerReportApi, FilterFolioLedgerReportApi, FilterFolioLedgerReportApiFresh, downloadFolioLedgerPdf, downloadFolioLedgerPdfFresh } from "store/actions";

import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    CardText,
    Table
} from "reactstrap";
import moment from "moment";
import Loder from "components/Loder/Loder";
import ReportHeader from "../../ReportHeader";

document.title = "Bills";
import FolioLedgerFilter from "./FolioLedgerFilter";

function FolioLedgerApiReport(props) {
    const [loader, setLoader] = useState(false);

    const date = moment().format("yyyy-MM-DD");

    const startLoader = () => setLoader(true);
    const endLoader = () => setLoader(false);

    useEffect(() => {
        props.FolioLedgerReportApi()
    }, [])

    useEffect(() => {
        if (props.filter_folio_ledger_report_loading === 'Success') {
            endLoader()
            props.FilterFolioLedgerReportApiFresh()
        }
    }, [props.filter_folio_ledger_report_loading])

    return (
        <Fragment>
            <ReportHeader />
            <Container fluid={true}>
                <Container>
                    <FolioLedgerFilter startLoader={startLoader} FilterFolioLedgerReportApi={props.FilterFolioLedgerReportApi} downloadPdf={props.downloadFolioLedgerPdf} />
                    <Card>
                        {/* <h4 className="m-4 mb-0 text-primary">Folio Ledger</h4> */}
                        <CardBody>
                            <CardText className="mb-0">
                                <Container className="" fluid id="printableArea">
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
                                                    {props?.folio_ledger_report_data?.data.map((item, index) => {
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
                                                    {props?.folio_ledger_report_data?.tenant.map((item, index) => {
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
                                                    {props?.folio_ledger_report_data?.supplier.map((item, index) => {
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
                                </Container>
                            </CardText>
                        </CardBody>
                    </Card>
                </Container>
            </Container>
            {loader && <Loder status={loader} />}
        </Fragment>
    );
}

const mapStateToProps = gstate => {
    const {
        folio_ledger_report_data, filter_folio_ledger_report_loading
    } = gstate.FolioLedgerReducer;

    return {
        folio_ledger_report_data, filter_folio_ledger_report_loading
    };
};

export default connect(mapStateToProps, {
    FolioLedgerReportApi, FilterFolioLedgerReportApi, FilterFolioLedgerReportApiFresh, downloadFolioLedgerPdf, downloadFolioLedgerPdfFresh
})(FolioLedgerApiReport);