import React, { useEffect, useState } from "react";

import classnames from "classnames";

import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    CardText,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from "reactstrap";
import ReportList from "./ReportList";
import { Link } from "react-router-dom";

function MainReport(props) {
    const [state, setState] = useState({ activeTab: "1" });
    const toggle = (tab) => {
        if (state.activeTab !== tab) {
            setState({ activeTab: tab });
        }
    };
    return (
        <div className="page-content">
            <h4 className="ms-2 text-primary">All Reports</h4>
            <Container fluid={true}>
                <Row>
                    <Col md={12} style={{ padding: "0px" }}>
                        <Card style={{ borderRadius: "15px" }}>
                            <CardBody>
                                <div>
                                    <Row>
                                        <Col
                                            sm={12} md={12} lg={9}
                                        // className="d-flex"
                                        >
                                            <Nav className="icon-tab nav-justified">
                                                {/* =========== test ================= */}
                                                <NavItem>
                                                    <NavLink
                                                        style={{ cursor: "pointer" }}
                                                        className={classnames({
                                                            active: state.activeTab === "1",
                                                        })}
                                                        onClick={() => {
                                                            toggle("1", "active");
                                                        }}
                                                    >
                                                        Standard
                                                    </NavLink>
                                                </NavItem>

                                                <NavItem>
                                                    <NavLink
                                                        style={{ cursor: "pointer" }}
                                                        className={classnames({
                                                            active: state.activeTab === "2",
                                                        })}
                                                        onClick={() => {
                                                            toggle("2", "due");
                                                        }}
                                                    >
                                                        Custom
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </Col>
                                    </Row>
                                    <TabContent
                                        activeTab={state.activeTab}
                                        className="p-3 text-muted"
                                    >
                                        <TabPane tabId="1">
                                            <Row>
                                                <Col sm="4">
                                                    <ReportList title={'Financial Report'}>
                                                        <tr>
                                                            <td>
                                                                <div>
                                                                    <Link to='/reports/bills' target='blank'>Bills</Link>
                                                                </div><br />
                                                                <div>
                                                                    <Link to='/reports/letting/fee' target='blank'>Bills - Letting Fee</Link>
                                                                </div><br />
                                                                <div>
                                                                    <Link to='/reports/letting/fee/last-month' target='blank'>Bills - Letting Fee Last Month</Link>
                                                                </div><br />
                                                                <div>
                                                                    <Link to='/reports/letting/fee/this-month' target='blank'>Bills - Letting Fee This Month</Link>
                                                                </div><br />
                                                                <div>
                                                                    <Link to='/reports/unpaid-bills' target='blank'>Bills - Unpaid</Link>
                                                                </div>
                                                                <div><br />
                                                                    <Link to='/reports/cashbook' target='blank'>Cash Book</Link>
                                                                </div>
                                                                <div><br />
                                                                    <Link to='/reports/folioledger' target='blank'>Folio Ledger</Link>
                                                                </div>
                                                                <div><br />
                                                                    <Link to='/reports/transactionaudit' target='blank'>Transaction Audit</Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </ReportList>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <Row>
                                                <Col sm="12">
                                                    <CardText className="mb-0">

                                                    </CardText>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default MainReport;
