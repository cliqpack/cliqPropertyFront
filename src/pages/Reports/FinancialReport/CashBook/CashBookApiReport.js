import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { CashBookReportApi, FilterCashBookReportApi, FilterCashBookReportApiFresh, downloadCashbookPdf, downloadCashbookPdfFresh } from "store/actions";

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
import CashBookFilter from "./CashBookFilter";

document.title = "Bills";

function CashBookApiReport(props) {
    const [loader, setLoader] = useState(false);

    const date = moment().format("yyyy-MM-DD");

    const startLoader = () => setLoader(true);
    const endLoader = () => setLoader(false);

    useEffect(() => {
        props.CashBookReportApi()
    }, [])

    useEffect(() => {
        if (props.filter_cashbook_report_loading === 'Success') {
            endLoader()
            props.FilterCashBookReportApiFresh()
        }
    }, [props.filter_cashbook_report_loading])
    
    return (
        <Fragment>
            <ReportHeader />
            <Container fluid={true}>
                <Container>
                    <CashBookFilter  FilterCashBookReportApi={props.FilterCashBookReportApi} startLoader={startLoader} downloadPdf={props.downloadCashbookPdf} />
                    {/* <FilterReport filterFunction={props.FilterBillsReport} startLoader={startLoader} downloadPdf={props.downloadBillsPdf} downloadExcel={props.downloadBillsExcel} filterValue={{ type: props.bills_report_data?.type, from: props.bills_report_data?.from_date, to: props.bills_report_data?.to_date }} /> */}
                    <Card>
                        <h4 className="m-4 mb-0 text-primary">Cash Book</h4>
                        <CardBody>
                            <CardText className="mb-0">
                                <Container className="" fluid id="printableArea">
                                    <Row>
                                        <Col>
                                            {/* <Card>
                                                <CardBody>
                                                    <div className="d-flex flex-column justify-content-end w-100 py-1 mb-2">
                                                        <center className='py-1 fw-bold'>Cash Book Report</center>
                                                        <center className='py-1 fw-bold'>{moment(month).format('MMMM')} {year} by Transaction Date</center>
                                                    </div>
                                                </CardBody>
                                            </Card> */}

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
                                                                        props.cashbook_report_data?.cashBookBalance.map((item, ind) => (
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
                                                                                                <td>{item.type === 'Withdraw' || item.type === 'Folio Withdraw' ? `${item.amount}৳` : ''}</td>
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
                                                                        props.cashbook_report_data?.bankDepositList.map((item, i) => {
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
                                                                        <td className="fw-bold">    {props.cashbook_report_data?.cashBookDebitBalance}৳ </td>
                                                                        <td className="fw-bold">{props.cashbook_report_data?.cashBookCreditBalance}৳</td>
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
        cashbook_report_data, filter_cashbook_report_loading
    } = gstate.CashBookReducer;

    return {
        cashbook_report_data, filter_cashbook_report_loading
    };
};

export default connect(mapStateToProps, {
    CashBookReportApi, FilterCashBookReportApi, FilterCashBookReportApiFresh, downloadCashbookPdf, downloadCashbookPdfFresh
})(CashBookApiReport);