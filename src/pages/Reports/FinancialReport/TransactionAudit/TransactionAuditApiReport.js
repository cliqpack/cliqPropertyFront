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
import TransactionAuditFilter from "./TransactionAuditFilter";

document.title = "Bills";

function TransactionAuditApiReport(props) {
    const [loader, setLoader] = useState(false);

    const date = moment().format("yyyy-MM-DD");

    const startLoader = () => setLoader(true);
    const endLoader = () => setLoader(false);

    useEffect(() => {
        // props.CashBookReportApi()
    }, [])

    useEffect(() => {
        if (props.filter_cashbook_report_loading === 'Success') {
            endLoader()
            // props.FilterCashBookReportApiFresh()
        }
    }, [props.filter_cashbook_report_loading])
    
    return (
        <Fragment>
            <ReportHeader />
            <Container fluid={true}>
                <Container>
                    {/* <CashBookFilter  FilterCashBookReportApi={props.FilterCashBookReportApi} startLoader={startLoader} downloadPdf={props.downloadCashbookPdf} /> */}
                    <TransactionAuditFilter FilterCashBookReportApi={props.FilterCashBookReportApi} startLoader={startLoader} downloadPdf={props.downloadCashbookPdf} />
                    <Card>
                        <h4 className="m-4 mb-0 text-primary">Transaction Audit Report</h4>
                        <CardBody>
                            <CardText className="mb-0">
                                <Container className="" fluid id="printableArea">
                                    <Row>
                                        <Col>
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
                                                                    
                                                                </tbody>
                                                                <tfoot>
                                                                    <tr className="border-top border-secondary border-1">
                                                                        
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
})(TransactionAuditApiReport);