import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { UnpaidBillsReport, FilterUnpaidBillsReport, FilterUnpaidBillsReportFresh, downloadUnpaidBillsPdf, downloadUnpaidBillsExcel, downloadUnpaidBillsPdfFresh, downloadUnpaidBillsExcelFresh } from "store/actions";
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    CardText,
} from "reactstrap";
import moment from "moment";
import Loder from "components/Loder/Loder";
import ReportHeader from "../ReportHeader";
import FilterReport from "../FilterReport";

document.title = "Bills - Unpaid";

function UnpaidBills(props) {
    const [loader, setLoader] = useState(false);

    const date = moment().format("yyyy-MM-DD");

    const startLoader = () => setLoader(true);
    const endLoader = () => setLoader(false);

    const defaultSorted = [
        {
            dataField: "id",
            order: "asc",
        },
    ];

    const pageOptions = {
        sizePerPage: props.unpaid_bills_report_data?.data?.length,
        totalSize: props.unpaid_bills_report_data?.data?.length, // replace later with size(customers),
        custom: true,
    };

    const attachmentRef = (cell, row) => {
        if (cell) {
            return <i className="fas fa-check"></i>
        } else return ''
    }
    const taxRef = (cell, row) => {
        if (cell === 1) {
            return <i className="fas fa-check"></i>
        } else return ''
    }
    const statusRef = (cell, row) => {
        if (cell === 'Paid') {
            return <i className="fas fa-check"></i>
        } else return ''
    }
    const amountRef = (cell, row) => {
        return <span>{cell}৳</span>
    }

    const activeData = [
        {
            dataField: "id",
            text: "Number",
            sort: true,
        },
        {
            dataField: "supplier.reference",
            text: "Supplier",
            sort: true,
        },
        {
            dataField: "property.reference",
            text: "Property",
            sort: true,
        },
        {
            dataField: "",
            text: "From",
            sort: true,
        },
        {
            dataField: "owner.reference",
            text: "To",
            sort: true,
        },
        {
            dataField: "billing_date",
            text: "Due",
            sort: true,
        },
        {
            dataField: "bill.account_name",
            text: "Account",
            sort: true
        },
        {
            dataField: "details",
            text: "Details",
            sort: true
        },
        {
            dataField: "file",
            text: "Attachment",
            formatter: attachmentRef,
            sort: true
        },
        {
            dataField: "include_tax",
            text: "Tax",
            formatter: taxRef,
            sort: true
        },
        {
            dataField: "amount",
            text: "Amount",
            formatter: amountRef,
            sort: true
        },
        {
            dataField: "status",
            text: "Paid",
            formatter: statusRef,
            sort: true,
        },
        {
            dataField: "invoice_ref",
            text: "Invoice Reference Number",
            sort: true,
        },
    ];

    useEffect(() => {
        props.UnpaidBillsReport()
    }, [])
    useEffect(() => {
        if (props.unpaid_bills_report_data_loading === 'Success') {
            endLoader()
            props.FilterUnpaidBillsReportFresh()
        }
    }, [props.unpaid_bills_report_data_loading])
    useEffect(() => {
        if (props.download_unpaid_bills_pdf_loading === 'Success') {
            endLoader()
            props.downloadUnpaidBillsPdfFresh()
        }
    }, [props.download_unpaid_bills_pdf_loading])
    useEffect(() => {
        if (props.download_unpaid_bills_excel_loading === 'Success') {
            endLoader()
            props.downloadUnpaidBillsExcelFresh()
        }
    }, [props.download_unpaid_bills_excel_loading])

    return (
        <Fragment>
            <ReportHeader />
            <Container fluid={true}>
                <Container>
                    <FilterReport filterFunction={props.FilterUnpaidBillsReport} startLoader={startLoader} downloadPdf={props.downloadUnpaidBillsPdf} downloadExcel={props.downloadUnpaidBillsExcel} filterValue={{ type: props.unpaid_bills_report_data?.type, from: props.unpaid_bills_report_data?.from_date, to: props.unpaid_bills_report_data?.to_date }} />
                    <Card>
                        <h4 className="m-4 mb-0 text-primary">Bills - Unpaid</h4>
                        <CardBody>
                            <CardText className="mb-0">
                                <PaginationProvider
                                    pagination={paginationFactory(pageOptions)}
                                    keyField="id"
                                    columns={activeData}
                                    data={props.unpaid_bills_report_data?.data || []}
                                >
                                    {({ paginationProps, paginationTableProps }) => (
                                        <ToolkitProvider
                                            keyField="id"
                                            columns={activeData}
                                            data={props.unpaid_bills_report_data?.data || []}
                                            search
                                        >
                                            {toolkitProps => (
                                                <React.Fragment>
                                                    <Row className="mb-2">

                                                    </Row>

                                                    <Row>
                                                        <Col xl="12">
                                                            <div className="table-responsive">
                                                                <BootstrapTable
                                                                    keyField={"id"}
                                                                    responsive
                                                                    bordered={false}
                                                                    striped={false}
                                                                    defaultSorted={defaultSorted}
                                                                    tabIndexCell
                                                                    classes={
                                                                        "table align-middle table-nowrap"
                                                                    }
                                                                    headerWrapperClasses={"thead-light"}
                                                                    {...toolkitProps.baseProps}
                                                                    {...paginationTableProps}
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row className="align-items-md-center mt-30">
                                                        <Col className="inner-custom-pagination d-flex">
                                                            {/* <div className="d-inline">
                                                                <SizePerPageDropdownStandalone
                                                                    {...paginationProps}
                                                                />
                                                            </div> */}
                                                            {/* <div className="text-md-right ms-auto">
                                                                <PaginationListStandalone
                                                                    {...paginationProps}
                                                                />
                                                            </div> */}
                                                        </Col>
                                                    </Row>
                                                </React.Fragment>
                                            )}
                                        </ToolkitProvider>
                                    )}
                                </PaginationProvider>
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
        unpaid_bills_report_data, unpaid_bills_report_data_loading, download_unpaid_bills_pdf_loading, download_unpaid_bills_excel_loading
    } = gstate.BillReportReducer;

    return {
        unpaid_bills_report_data, unpaid_bills_report_data_loading, download_unpaid_bills_pdf_loading, download_unpaid_bills_excel_loading
    };
};

export default connect(mapStateToProps, {
    UnpaidBillsReport, FilterUnpaidBillsReport, FilterUnpaidBillsReportFresh, downloadUnpaidBillsPdf, downloadUnpaidBillsExcel, downloadUnpaidBillsPdfFresh, downloadUnpaidBillsExcelFresh
})(UnpaidBills);