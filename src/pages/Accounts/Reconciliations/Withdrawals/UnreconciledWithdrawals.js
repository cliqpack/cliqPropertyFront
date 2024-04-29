import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";
import { } from "store/actions";
import classnames from "classnames";
import DatatableTables2 from '../../../Tables/DatatableTables2';

import {
    Card,
    Alert,
    CardBody,
    CardTitle,
    Col,
    Container,
    Row,
    CardText,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Label,
    Input,
    Button,
    CardHeader,
} from "reactstrap";

import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import EditChequeModal from "./EditChequeModal";

document.title = "Reconciliations";



function AllWithdrawalsList
    (props) {
    const [state, setState] = useState({ activeTab: "1", checkModal: false, });
    const chequeToggle = () => setState(prev => ({ checkModal: !prev.checkModal }))

    const toggle = tab => {
        if (state.activeTab !== tab) {
            setState({
                ...state,
                activeTab: tab,
            });
        };
    };

    const dataNow = [
        { id: 1, created: '11/25/2022', cheque: '520', payee: 'Alif', amount: '100', completed: '' },
        { id: 2, created: '11/25/2022', cheque: '520', payee: 'Alif', amount: '100', completed: '' },
    ];

    const dataTable = { data: dataNow }


    let node;
    const defaultSorted = [
        {
            dataField: "id",
            order: "asc",
        },
    ];

    const handleAllOwnerSelectedData = () => {
        console.log(node.selectionContext.selected);
    }

    const pageOptions = {
        sizePerPage: 10,
        totalSize: dataNow.length, // replace later with size(customers),
        custom: true,
    };

    // Select All Button operation
    const selectRow = {
        mode: "checkbox",
        onSelect: (row, isSelect, rowIndex, e) => {
            console.log(row);
        }
    };

    const { SearchBar } = Search;


    const activeData = [
        {
            dataField: "created",
            text: "Created",
            sort: true
        },
        {
            dataField: "cheque",
            text: "Cheque",
            sort: true
        },
        {
            dataField: "payee",
            text: "Payee",
            sort: true
        },
        {
            dataField: "amount",
            text: "Amount",
            sort: true,
        },
        {
            dataField: "",
            text: "Completed",
            sort: true,
        },

    ];






    useEffect(() => {

    }, []);


    return (
        <>
            <div className="page-content">
                <Container fluid={true}>
                    <Row>
                        <Col lg={12}>
                            <div>
                                <Card>
                                    <CardBody>
                                        <h4 className="text-primary">Withdrawals</h4>
                                        <Row className=" px-1 py-2">
                                            <Col md={6}>
                                                <div className="button-items">
                                                    <button type="button" className="btn btn-secondary">
                                                        <i className="fas fa-arrow-left me-2" />Back
                                                    </button>
                                                    {state.activeTab === '1' && <>
                                                        <button type="button" className="btn btn-info">
                                                            <i className="fas fa-cloud-download-alt me-2" />Create ABA bank file
                                                        </button>
                                                        <button type="button" className="btn btn-info">
                                                            <i className="fas fa-file me-2" />Last ABA file report
                                                        </button>
                                                    </>}
                                                    {state.activeTab === '2' && <>
                                                        <button type="button" className="btn btn-info">
                                                            <i className="fas fa-check-square me-2" />Complete Cheque
                                                        </button>
                                                        <EditChequeModal state={state} setState={setState} toggle={chequeToggle} />

                                                    </>}
                                                    {state.activeTab === '3' &&
                                                        <>
                                                            <button type="button" className="btn btn-info">
                                                                <i className="fas fa-check-square me-2" />Create BPay file
                                                            </button>
                                                            <button type="button" className="btn btn-info">
                                                                <i className="fas fa-pen me-2" />Edit BPay CRN
                                                            </button>
                                                        </>
                                                    }
                                                </div>
                                            </Col>
                                            <Col md={6}></Col>
                                        </Row>
                                    </CardBody>
                                </Card>





                                <Card>
                                    <CardBody>
                                        <Nav className="icon-tab nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{ cursor: "pointer" }}
                                                    className={classnames({
                                                        active: state.activeTab === "1",
                                                    })}
                                                    onClick={() => {
                                                        toggle("1");
                                                    }}
                                                >
                                                    EFT
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    style={{ cursor: "pointer" }}
                                                    className={classnames({
                                                        active: state.activeTab === "2",
                                                    })}
                                                    onClick={() => {
                                                        toggle("2");
                                                    }}
                                                >
                                                    Cheques
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    style={{ cursor: "pointer" }}
                                                    className={classnames({
                                                        active: state.activeTab === "3",
                                                    })}
                                                    onClick={() => {
                                                        toggle("3");
                                                    }}
                                                >
                                                    BPay
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    style={{ cursor: "pointer" }}
                                                    className={classnames({
                                                        active: state.activeTab === "4",
                                                    })}
                                                    onClick={() => {
                                                        toggle("4");
                                                    }}
                                                >
                                                    Generated Batches
                                                </NavLink>
                                            </NavItem>
                                        </Nav>

                                        <TabContent
                                            activeTab={state.activeTab}
                                            className="p-3 text-muted"
                                        >
                                            <TabPane tabId="1">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText className="mb-0">
                                                            {dataTable ? (
                                                                <DatatableTables2
                                                                    products={dataTable}
                                                                    columnData={activeData}
                                                                    selectRow={selectRow}
                                                                />
                                                            ) : null}

                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText className="mb-0">

                                                            <PaginationProvider
                                                                pagination={paginationFactory(pageOptions)}
                                                                keyField="id"
                                                                columns={activeData}
                                                                data={state.productData}
                                                            >
                                                                {({ paginationProps, paginationTableProps }) => (
                                                                    <ToolkitProvider
                                                                        keyField="id"
                                                                        columns={activeData}
                                                                        data={dataNow}
                                                                        search
                                                                    >
                                                                        {toolkitProps => (
                                                                            <React.Fragment>
                                                                                <Row className="mb-2">

                                                                                </Row>

                                                                                <Row>
                                                                                    <Col xl="12">
                                                                                        <div className="table-responsive">
                                                                                            <div className="d-flex justify-content-end search-box">
                                                                                                <SearchBar {...toolkitProps.searchProps} />
                                                                                            </div>
                                                                                            <BootstrapTable
                                                                                                ref={n => node = n}
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
                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="3">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText className="mb-0">

                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="4">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText className="mb-0">

                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </TabPane>

                                        </TabContent>
                                    </CardBody>
                                </Card>

                            </div>
                        </Col>
                    </Row>
                </Container>
                <EditChequeModal state={state} setState={setState} toggle={chequeToggle} />
            </div >
        </>
    );
}

const mapStateToProps = gstate => {
    const {



    } = gstate.property;

    const {
    } = gstate.Bills;

    return {
    };
};

export default connect(mapStateToProps, {
})(AllWithdrawalsList
);
