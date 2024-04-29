import React, { useEffect, useState } from "react";
// import Breadcrumbs from "components/Common/Breadcrumb";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, withRouter, useHistory, useParams } from "react-router-dom";

import classnames from "classnames";

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
import DatatableTables2 from "pages/Tables/DatatableTables2";
import Parser from "html-react-parser";
import { ContactForAllActivity, showContact } from "store/actions";


function AllActivity(props) {
    const { id } = useParams();
    const [state, setState] = useState({
        activeTab: "1",
    });
    const [init, setInit] = useState(true);
    const ref = (cell, row) => {
        return <span>
            {row.task && <span><i className="fas fa-clipboard-list"></i> Task</span>}
            {row.inspection && <span><i className="bx bx-task"></i> Inspection</span>}
            {row.listing && <span><i className="fas fa-list"></i> Listing</span>}
            {row.maintenance && <span><i className="fas fa-wrench"></i> Job</span>}
            {row.comment && <span><i className="fas fa-comment"></i> Comment</span>}
        </span>;
    };

    const summaryRef = (cell, row) => {
        return <span>
            {row.task && <Link to={`/task/show/${row.task.id}`}><span className="text-primary">{row.task.summary}</span></Link>}
            {row.inspection && <Link to={`/inspectionInfo/${row.inspection.id}`}><span className="text-primary">{row.inspection.summery}</span></Link>}
            {row.listing && <span className="text-primary">Listing</span>}
            {row.maintenance && <Link to={`/maintenanceInfo/${row.maintenance.id}`}><span className="text-primary">{row.maintenance.summary}</span></Link>}
            {row.comment && <span>{row.comment}</span>}
        </span>;
    }

    const jobSummaryRef = (cell, row) => {
        return <span>
            {row.maintenance && <Link to={`/maintenanceInfo/${row.maintenance.id}`}><span className="text-primary">{row.maintenance.summary}</span></Link>}
        </span>;
    }
    const taskSummaryRef = (cell, row) => {
        console.log(row);
        return <span>
            {row.task && <Link to={`/task/show/${row.task.id}`}><span className="text-primary">{row.task.summary}</span></Link>}
        </span>;
    }
    const inspectionSummaryRef = (cell, row) => {
        return <span>
            {row.inspection && <Link to={`/inspectionInfo/${row.inspection.id}`}><span className="text-primary">{row.inspection.summery}</span></Link>}
        </span>;
    }

    const statusRef = (cell, row) => {
        return <span>
            {row.task && <span>{row.task.status}</span>}
            {row.inspection && <span>{row.inspection.status}</span>}
            {row.listing && <span>Listing</span>}
            {row.maintenance && <span>{row.maintenance.status}</span>}
            {row.comment && <span>{row.status}</span>}
        </span>;
    }

    const jobStatusRef = (cell, row) => {
        return <span>
            {row.maintenance && <span>{row.maintenance.status}</span>}
        </span>;
    }

    const createdRef = (cell, row) => {
        let date = new Date(row.created_at).toLocaleString('en-GB', { timeZone: 'UTC' });
        return <span>{date}</span>
    }

    const columnData = [
        {
            dataField: "id",
            text: "Due",
            sort: true,
        },
        {
            dataField: "",
            text: "Type",
            formatter: ref,
            sort: true,
        },
        {
            dataField: "",
            text: "Summary",
            formatter: summaryRef,
            // events: {
            //     onClick: (e, column, columnIndex, row, rowIndex) => {
            //         summaryRefDetail(e, column, columnIndex, row, rowIndex);
            //     },
            // },
            sort: true,
        },
        {
            dataField: "",
            text: "Status",
            formatter: statusRef,
            sort: true,
        },
        {
            dataField: "completed",
            text: "Completed",
            sort: true,
        },

    ];

    const columnJobData = [
        {
            dataField: "maintenance.due_by",
            text: "Due",
            sort: true,
        },
        {
            dataField: "maintenance_id",
            text: "#Job",
            sort: true,
        },
        {
            dataField: "",
            text: "Summary",
            formatter: jobSummaryRef,
            sort: true,
        },
        {
            dataField: "",
            text: "Status",
            formatter: jobStatusRef,
            sort: true,
        },
        {
            dataField: "maintenance.completed",
            text: "Completed",
            // formatter: owner,
            sort: true,
        },

    ];

    const columnTaskData = [
        {
            dataField: "task.due_by",
            text: "Due",
            sort: true,
        },
        {
            dataField: "",
            text: "Summary",
            formatter: taskSummaryRef,
            sort: true,
        },
        {
            dataField: "task.complete_date",
            text: "Completed",
            sort: true,
        },

    ];

    const columnInspectionData = [
        {
            dataField: "task.due_by",
            text: "Due",
            sort: true,
        },
        {
            dataField: "",
            text: "Type",
            formatter: ref,
            sort: true,
        },
        {
            dataField: "",
            text: "Summary",
            formatter: inspectionSummaryRef,
            sort: true,
        },
        {
            dataField: "inspection.status",
            text: "Status",
            sort: true,
        },
        {
            dataField: "",
            text: "Completed",
            sort: true,
        },

    ];

    const columnMessageData = [
        {
            dataField: "",
            text: "Due",
            sort: true,
        },
        {
            dataField: "",
            text: "Type",
            sort: true,
        },
        {
            dataField: "",
            text: "Regarding",
            sort: true,
        },
        {
            dataField: "",
            text: "Subject",
            sort: true,
        },
        {
            dataField: "",
            text: "Status",
            sort: true,
        },
        {
            dataField: "",
            text: "Completed",
            sort: true,
        },

    ];

    const columnCommentsData = [
        {
            dataField: "",
            text: "Created",
            formatter: createdRef,
            sort: true,
        },
        {
            dataField: "comment",
            text: "Comment",
            sort: true,
        },
        {
            dataField: "",
            text: "Member",
            sort: true,
        },
    ];

    useEffect(() => {
        if (props.contact_activities_loading === false) {
            props.ContactForAllActivity(id);
            props.showContact(id)
        }
        if (init) {
            props.ContactForAllActivity(id);
            props.showContact(id);
            setInit(false)
        }
    }, [props.contact_activities_loading]);

    console.log('--276--');
    console.log(props.contact_activities?.data);


    let jobData = { data: [] }, taskData = { data: [] }, inspectionData = { data: [] }, messageData = { data: [] }, commentsData = { data: [] };
    if (props.contact_activities) {
        let data = props.contact_activities.data.contactJobActivities;
        jobData = { data }
        data = props.contact_activities.data.contactTaskActivities;
        taskData = { data }
        data = props.contact_activities.data.contactInspectionActivities;
        inspectionData = { data }
        data = props.contact_activities.data.contactMessageActivities;
        commentsData = { data }
    }



    const toggle = (tab, type) => {
        if (state.activeTab !== tab) {
            setState({
                ...state,
                activeTab: tab,
            });
        }
        props.ContactForAllActivity(id);
    };

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Row>
                    <Col lg={12}>
                        <div>
                            <Card>
                                <CardBody>
                                    <h4 className="ms-2 mb-4 text-primary">Activity for {props.contacts_show_data?.data?.reference
                                    }</h4>
                                    <div className="button-items">
                                        {/* <Link to="/contact">
                      <button type="button" className="btn btn-info">
                        <i className="bx bx-user font-size-16 align-middle me-2"></i>
                        Add Contact
                      </button>
                    </Link>

                    <Link to="/addSupplier">
                      <button type="button" className="btn btn-info">
                        <i className="bx bx-user-plus font-size-18 align-middle me-2"></i>
                        Add Supplier
                      </button>
                    </Link> */}

                                        {/* <button type="button" className="btn btn-secondary">
                      <i className="fas fas fa-paper-plane font-size-12 align-middle me-2"></i>
                      Message
                      <i className="fas fas fa-chevron-down font-size-12 align-middle ms-2"></i>
                    </button>

                    <button disable type="button" className="btn btn-secondary">
                      Actions
                      <i className="fas fas fa-chevron-down font-size-12 align-middle ms-2"></i>
                    </button> */}
                                    </div>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <div>
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
                                                    All
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
                                                    Jobs
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
                                                    Inspections
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
                                                    Tasks
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    style={{ cursor: "pointer" }}
                                                    className={classnames({
                                                        active: state.activeTab === "5",
                                                    })}
                                                    onClick={() => {
                                                        toggle("5");
                                                    }}
                                                >
                                                    Messages
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    style={{ cursor: "pointer" }}
                                                    className={classnames({
                                                        active: state.activeTab === "6",
                                                    })}
                                                    onClick={() => {
                                                        toggle("6");
                                                    }}
                                                >
                                                    Comments
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
                                                            {props.contact_activities ? (
                                                                <DatatableTables2
                                                                    products={props.contact_activities.data}
                                                                    columnData={columnData}
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
                                                            {jobData.data ? (
                                                                <DatatableTables2
                                                                    products={jobData}
                                                                    columnData={columnJobData}
                                                                />
                                                            ) : null}
                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="3">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText className="mb-0">
                                                            {inspectionData.data ? (
                                                                <DatatableTables2
                                                                    products={inspectionData}
                                                                    columnData={columnInspectionData}
                                                                // url={tenantUrl}
                                                                />
                                                            ) : null}
                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="4">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText className="mb-0">
                                                            {taskData ? (
                                                                <DatatableTables2
                                                                    products={taskData}
                                                                    columnData={columnTaskData}
                                                                // url={supplierUrl}
                                                                />
                                                            ) : null}
                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="5">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText className="mb-0">
                                                            {messageData.data ? (
                                                                <DatatableTables2
                                                                    products={messageData}
                                                                    columnData={columnMessageData}
                                                                // url={url}
                                                                />
                                                            ) : null}
                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="6">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText className="mb-0">
                                                            {commentsData.data ? (
                                                                <DatatableTables2
                                                                    products={commentsData}
                                                                    columnData={columnCommentsData}
                                                                // url={url}
                                                                />
                                                            ) : null}
                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </TabContent>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

const mapStateToProps = gstate => {
    const {
        contact_activities,
        contact_activities_error,
        contact_activities_loading,
    } = gstate.Activity;
    const { contacts_show_data } = gstate.Contacts2;
    return {
        contact_activities,
        contact_activities_error,
        contact_activities_loading, contacts_show_data
    };
};

export default withRouter(
    connect(mapStateToProps, {
        ContactForAllActivity, showContact
    })(AllActivity)
);
