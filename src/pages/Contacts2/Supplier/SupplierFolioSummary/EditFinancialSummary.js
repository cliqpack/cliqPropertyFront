import React, { useEffect, useState } from "react";
import { useParams, withRouter, Link, useHistory } from "react-router-dom";
import {
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col,
    TabContent,
    TabPane,
    Card,
    CardBody,
    CardText,
    CardTitle,
    Label,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Button,
} from "reactstrap";
import classnames from "classnames";
import DatatableTables2 from "pages/Tables/DatatableTables2";
import moment from "moment";
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import { connect } from "react-redux";
import {  } from "store/actions";
import Loder from "components/Loder/Loder";
import Select from "react-select";
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

function EditFinancialSummary(props) {
    const [actionArray, setActionArray] = useState([]);
    const [data, setData] = useState([
        {
            id: 1, account_name: 'Management Fees', date: '11/01/2024', summary: 'ca account summary', debit: '200', credit: '', tax: '100'
        },
        {

            id: 2, account_name: 'Rent', date: '11/01/2024', summary: 'ca account summary', debit: '200', credit: '', tax: '100'
        },
        {
            id: 3, account_name: 'Council rates', date: '11/01/2024', summary: 'ca account summary', debit: '', credit: '300', tax: '100'
        }
    ])
    const { SearchBar } = Search;
    const pageOptions = {
        sizePerPage: 10,
        totalSize: props.chartAccount_list_data?.account.length || 0, // replace later with size(customers),
        custom: true,
    };
    let node;
    const defaultSorted = [
        {
            dataField: "id",
            order: "asc",
        },
    ];
    const handleSelect = (isSelect, rows, e) => {
        if (rows) {
            setActionArray(prevArray => [...prevArray, isSelect]);
        } else {
            setActionArray(cur => cur.filter(data => data.id !== isSelect.id));
        }
    };

    const handleSelectAll = (isSelect, rows, e) => {
        if (isSelect) {
            setActionArray(rows);
        } else {
            setActionArray([]);
        }
    };

    // Select  Button operation
    const selectRow = {
        mode: "checkbox",

        onSelect: handleSelect,

        onSelectAll: handleSelectAll,
    };
    const handleRemove = () => {
        console.log(node.selectionContext.selected);
        let hasData = data.filter((item, ind) => item.id != node.selectionContext.selected[ind])
        setData(hasData)
        setActionArray([])
    };

    function ceilToTwoDecimalPlaces(number) {
        return Math.ceil(number * 100) / 100;
    }
    const amountRef = (cell, row) => {
        let amount = ceilToTwoDecimalPlaces(cell)
        return <span>${amount}</span>
    }
    const activeSummaryData = [
        {
            dataField: "date",
            text: "Date",
            sort: true,
        },
        {
            dataField: "account_name",
            text: "Chart of account",
            sort: true,
        },
        {
            dataField: "summary",
            text: "Summary",
            sort: true,
        },
        {
            dataField: "debit",
            text: "Debit",
            sort: true,
            formatter: amountRef,
        },
        {
            dataField: "credit",
            text: "Credit",
            sort: true,
            formatter: amountRef,
        },
        {
            dataField: "tax",
            text: "Tax",
            sort: true,
            formatter: amountRef,
        },
    ];

    return <div className="page-content">
        <Container fluid={true}>
            <h4 className="text-primary py-2">Edit Financial Summary</h4>
            <Row className="mb-4">
                <Col md="6">
                    <div className="d-flex justify-content-start align-items-center py-2 px-4">
                        <div className="button-items d-flex justify-content-start">
                            <Button className="btn btn-info">Add Financial Activity</Button>
                            <Button
                                className="btn btn-danger ms-2"
                                onClick={handleRemove}
                                disabled={actionArray.length > 0 ? false : true}
                            >Delete</Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Card>
                    <CardBody>
                        <PaginationProvider
                            pagination={paginationFactory(pageOptions)}
                            keyField="id"
                            columns={activeSummaryData}
                            data={data || []}
                        >
                            {({ paginationProps, paginationTableProps }) => (
                                <ToolkitProvider
                                    keyField="id"
                                    columns={activeSummaryData}
                                    data={data || []}
                                    search
                                >
                                    {toolkitProps => (
                                        <React.Fragment>
                                            <Row className="mb-2">
                                                <Col md={2}></Col>
                                                <Col md={10}></Col>
                                            </Row>

                                            <Row>
                                                <Col xl="12">
                                                    <div className="table-responsive">
                                                        <div className="d-flex justify-content-end align-items-center search-box">
                                                            <SearchBar
                                                                {...toolkitProps.searchProps}
                                                            />
                                                        </div>
                                                        <BootstrapTable
                                                            ref={n => (node = n)}
                                                            keyField={"id"}
                                                            responsive
                                                            bordered={false}
                                                            striped={false}
                                                            defaultSorted={defaultSorted}
                                                            selectRow={selectRow}
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
                                                    <div className="d-inline">
                                                        <SizePerPageDropdownStandalone
                                                            {...paginationProps}
                                                        />
                                                    </div>
                                                    <div className="text-md-right ms-auto">
                                                        <PaginationListStandalone
                                                            {...paginationProps}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </React.Fragment>
                                    )}
                                </ToolkitProvider>
                            )}
                        </PaginationProvider>
                    </CardBody>
                </Card>
            </Row>
        </Container>
    </div>
}

const mapStateToProps = gstate => {
    const {  } = gstate.AccountsTransactions;
    return {
        
    };
};

export default withRouter(
    connect(mapStateToProps, {
        
    })(EditFinancialSummary)
);