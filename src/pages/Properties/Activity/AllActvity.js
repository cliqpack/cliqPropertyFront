import React, { useEffect, useState } from "react";
import Breadcrumbs from "components/Common/Breadcrumb";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, withRouter, useHistory, useParams } from "react-router-dom";
import moment from 'moment'


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
import toastr from "toastr";


import { PropertyActivities, getPropertyInfo, AllActivityFresh, sendEmailFresh } from "store/actions";
import MailTemplateModalAll from "../MailTemplate/MailTempateModalAll";

function AllActivity(props) {
    const { id } = useParams();
    const [init, setInit] = useState(true)
    const [ownerStateData, setOwnerStateData] = useState([]);
    const [ownerState, setOwnerState] = useState(true);
    let history = useHistory();
    const [state, setState] = useState({
        activeTab: "1",
    });
    const [allActivity, setAllActivity] = useState();

    const toggle = (tab, type) => {
        if (state.activeTab !== tab) {
            setState({
                ...state,
                activeTab: tab,
            });
        }
        if (tab == '1') {
            props.PropertyActivities(id, 'all')
        }
        if (tab == '2') {
            props.PropertyActivities(id, 'jobs')

        }
        if (tab == '3') {
            props.PropertyActivities(id, 'inspections')

        }
        if (tab == '4') {
            props.PropertyActivities(id, 'tasks')

        }
        if (tab == '5') {
            props.PropertyActivities(id, 'listings')

        }
        if (tab == '6') {
            props.PropertyActivities(id, 'messages')

        }
        if (tab == '7') {
            props.PropertyActivities(id, 'comments')

        }
        if (tab == '8') {
            props.PropertyActivities(id, 'reminders')

        }
    };



    const [modalState, setModalState] = useState(false);

    const tog_large = () => {
        setModalState(prevState => !prevState);
    };

    console.log(modalState);

    const [data, setData] = useState({});






    const jobSummaryRef = (cell, row) => {
        return <span>
            {row.maintenance && <Link to={`/maintenanceInfo/${row.maintenance.id}`}><span className="text-primary">{row.maintenance.summary}</span></Link>}
        </span>;
    }
    const taskSummaryRef = (cell, row) => {
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
            {/* {row.task && <span>{row.status}</span>}
            {row.inspection && <span>{row.status}</span>}
            {row.listing && <span>Listing</span>}
            {row.maintenance && <span>{row.status}</span>}
            {row.comment && <span>{row.status}</span>} */}
            {row.status && <span>{row.status}</span>}
        </span>;
    }

    const jobStatusRef = (cell, row) => {
        return <span className="text-secondary">
            {row.status && <span>{row.status}</span>}
        </span>;
    }

    const createdRef = (cell, row) => {
        // let date = new Date(row.created_at).toLocaleString('en-GB', { timeZone: 'UTC' });
        // return <span>{moment(row.created_at).format('DD/MM/yyyy, LT')}</span>
        return <span>{moment(cell).format('DD/MM/yyyy, LT')}</span>
        // return <span>{moment(row.created_at).format('LLL')}</span>
    }

    const allSummaryRefDetail = (e, column, columnIndex, row, rowIndex) => {
        setData(row);
        tog_large();
    };

    // const dateRef = (cell, row) => <span>{moment(cell).format('DD/MM/yyyy')}</span>
    const dateRef = (cell, row) => <span className="text-secondary">{cell ? moment(cell).format('DD/MM/yyyy') : ''}</span>

    const completedRef = (cell, row) => <span>{row.completed ? moment(row.completed).format('DD/MM/yyyy') : ""}</span>
    const dueRef = (cell, row) => {
        return <>
            {row.message_many?.length > 0 ? <span>{row.created_at ? moment(row.created_at).format('DD/MM/yyyy') : ''}</span> :
                <>
                    {row.message_many?.length > 0 ? <><span>{moment(row.created_at).format('DD/MM/yyyy')}</span></> :
                        <>
                            {row.listing && <span>{moment(row.listing.advert_from).format('DD/MM/yyyy')}</span>}
                            {row.maintenance && <span>{moment(row.maintenance.due_by).format('DD/MM/yyyy')}</span>}
                            {row.inspection
                                && <span>{moment(row.inspection.inspection_date).format('DD/MM/yyyy')}</span>}
                            {row.task
                                && <span>{moment(row.due_by).format('DD/MM/yyyy')}</span>}
                            {row.comment && <span>{moment(row.created_at).format('DD/MM/yyyy')}</span>}
                        </>}

                </>
            }
        </>
    }

    const ref = (cell, row) => {
        return <>
            {row.type == "comment" ? row.comment && <span><i className="fas fa-comment"></i> Comment</span> : row.message_many?.length == 0 ?
                <span className="">
                    {row.task && <span><i className="fas fa-clipboard-list"></i> Task</span>}
                    {row.inspection && <span><i className="bx bx-task"></i> Inspection</span>}
                    {row.listing && <span><i className="fas fa-list"></i> Listing</span>}
                    {row.maintenance && <span><i className="fas fa-wrench"></i> Job</span>}
                    {/* {row.comment && <span><i className="fas fa-comment"></i> Comment</span>} */}
                    {/* {row.message && <span><i className="fas fa-paper-plane"></i> Message</span>} */}
                </span>
                :

                <div className="d-flex flex-column justify-content-start">

                    {/* <span> */}
                    {row.message_many?.length > 0 &&
                        row.message_many.map((item, i) => <span className="pb-1" key={i}><i className="fas fa-paper-plane"></i> Message</span>)
                    }

                    {row.task && <span><i className="fas fa-clipboard-list"></i> Task</span>}
                    {row.inspection && <span><i className="bx bx-task"></i> Inspection</span>}
                    {row.listing && <span><i className="fas fa-list"></i> Listing</span>}
                    {row.maintenance && <span><i className="fas fa-wrench"></i> Job</span>}
                    {/* {row.comment && <span><i className="fas fa-comment"></i> Comment</span>} */}
                    {/* </span> */}

                    {/* <hr className="bg-secondary" /> */}


                </div>
            }
        </>;
    };

    const msgModalOpen = data => {
        console.log(data);
        setData(data);
        tog_large();

    }
    const summaryRef = (cell, row) => {
        return <>

            {row.type == 'comment' ? row.comment && <span>{row.comment}</span> :
                row.message_many?.length == 0 ?
                    <span>
                        {row.task && <Link to={`/task/show/${row.task?.id}`}><span className="text-primary">{row.task?.summary}</span></Link>}
                        {row.inspection && <Link to={`/inspectionInfo/${row.inspection?.id}`}><span className="text-primary">{row.inspection?.summery}</span></Link>}
                        {row.listing && <span className="text-primary"><Link to={`/listingInfo/${row.listing.id}`}>{row.listing.summary}</Link></span>}
                        {row.maintenance && <Link to={`/maintenanceInfo/${row.maintenance?.id}`}><span className="text-primary">{row.maintenance?.summary}</span></Link>}
                        {/* {row.comment && <span>{row.comment}</span>} */}
                    </span>
                    :
                    <div className="d-flex flex-column">
                        {/* <span className="text-primary py-2">{row.message?.subject}</span> */}
                        {/* <hr className="bg-secondary" /> */}
                        {row.message_many?.map((item, i) =>
                            <div className="text-primary pb-1" key={i} onClick={() => msgModalOpen(item)}>{item.subject}</div>
                        )}
                        {row.task && <Link to={`/task/show/${row.task?.id}`}><span className="text-primary">{row.task?.summary}</span></Link>}
                        {row.inspection && <Link to={`/inspectionInfo/${row.inspection.id}`}><span className="text-primary">{row.inspection?.summery}</span></Link>}
                        {row.listing && <span className="text-primary"><Link to={`/listingInfo/${row.listing.id}`}>{row.listing.summary}</Link></span>}
                        {row.maintenance && <Link to={`/maintenanceInfo/${row.maintenance?.id}`}><span className="text-primary">{row.maintenance?.summary}</span></Link>}
                        {/* {row.comment && <span>{row.comment}</span>} */}

                    </div>
            }
        </>
            ;
    }

    const columnData = [
        {
            dataField: "created_at",
            text: "Due",
            formatter: dueRef,
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
            //         allSummaryRefDetail(e, column, columnIndex, row, rowIndex);
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
            formatter: completedRef,
            sort: true,
        },

    ];



    const columnJobData = [
        {
            dataField: "maintenance.due_by",
            text: "Due",
            formatter: dateRef,
            sort: true,
        },
        {
            dataField: "maintenance_id",
            text: "#Job",
            sort: true,
        },
        {
            dataField: "maintenance.summary",
            text: "Summary",
            formatter: jobSummaryRef,
            sort: true,
        },
        {
            dataField: "status",
            text: "Status",
            formatter: jobStatusRef,
            sort: true,
        },
        {
            dataField: "maintenance.completed",
            text: "Completed",
            formatter: dateRef,

            sort: true,
        },

    ];

    const columnTaskData = [
        {
            dataField: "task.due_by",
            text: "Due",
            formatter: dateRef,

            sort: true,
        },
        {
            dataField: "task.summary",
            text: "Summary",
            formatter: taskSummaryRef,
            sort: true,
        },

        {
            dataField: "completed",
            text: "Completed",
            sort: true,
        },

    ];

    const inpecDueRef = (cell, row) => <span className="text-secondary">{moment(cell).format('DD/MM/yyyy')}</span>

    const columnInspectionData = [
        {
            dataField: "inspection.created_at",
            text: "Due",
            formatter: dateRef,
            sort: true,
        },
        {
            dataField: "inspection.inspection_type",
            text: "Type",
            // formatter: ref,
            sort: true,
        },
        {
            dataField: "inspection.summery",
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
            dataField: "inspection_completed",
            text: "Completed",
            sort: true,
        },

    ];

    const columnListingData = [
        {
            dataField: "listing.type",
            text: "Type",
            sort: true,
        },
        {
            dataField: "listing.status",
            text: "Status",
            sort: true,
        },
        {
            dataField: "listing.summary",
            text: "Headline",
            sort: true,
        },
        // {
        //     dataField: "",
        //     text: "Advert From",
        //     sort: true,
        // },
        {
            dataField: "listing.updated_at",
            text: "Completed",
            formatter: dateRef,
            sort: true,
        },

    ];

    const msgSubRef = (cell, row) => <span className="text-primary">{cell}</span>;

    const messageDetails = (e, column, columnIndex, row, rowIndex) => {
        setData(row.message);
        tog_large();
    };

    const columnMessageData = [
        {
            dataField: "message.created_at",
            text: "Due",
            sort: true,
        },
        {
            dataField: "type",
            text: "Type",
            sort: true,
        },
        {
            dataField: "message.to",
            text: "Regarding",
            sort: true,
        },
        {
            dataField: "message.subject",
            text: "Subject",
            formatter: msgSubRef,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    messageDetails(e, column, columnIndex, row, rowIndex);
                },
            },
        },
        {
            dataField: "message.status",
            text: "Status",
            sort: true,
        },
        {
            dataField: "message.updated_at",
            text: "Completed",
            sort: true,
        },

    ];
    var authUser = JSON.parse(localStorage.getItem("authUser"));

    const memberRef = (cell, row) => {
        return <span>{authUser.user.first_name + ' ' + authUser.user.last_name}</span>
    }

    const columnCommentsData = [
        {
            dataField: "created_at",
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
            formatter: memberRef,

            sort: true,
        },
    ];

    const columnReminderData = [
        // {
        //     dataField: "",
        //     text: "Reminder",
        //     sort: true,
        // },
        // {
        //     dataField: "",
        //     text: "Managed By",
        //     sort: true,
        // },
        // {
        //     dataField: "",
        //     text: "Status",
        //     sort: true,
        // },
        // {
        //     dataField: "",
        //     text: "Due",
        //     sort: true,
        // },
        // {
        //     dataField: "",
        //     text: "Expiry",
        //     sort: true,
        // },
        // {
        //     dataField: "",
        //     text: "Previous Due",
        //     sort: true,
        // },
        // {
        //     dataField: "",
        //     text: "Notes",
        //     sort: true,
        // },

    ];

    useEffect(() => {

        if (props.send_email_loading === "Success") {
            toastr.success("Email sent successfully");
            props.sendEmailFresh();
            tog_large();
        }

        if (props.property_activities_loading === "Success") {
            const all = props.property_activities?.data?.data;
            setAllActivity({ ...allActivity, data: all });

        }
        if (init) {
            props.PropertyActivities(id, 'all')
            props.getPropertyInfo(id);

            setInit(false)
        }
        // if (props.property_activities_loading === "Success") {
        //     props.AllActivityFresh()
        // }

    }, [props.property_activities_loading, props.send_email_loading]);

    console.log('---347---');
    // console.log(props.property_activities?.data);
    console.log(allActivity);

    // let jobData = { data: [] }
    // if (props.property_activities) {
    //     let data = [];
    //     data = props.property_activities.data.data.filter((item, idx) => item.maintenance_id !== null)
    //     jobData = { data: [...data] };
    // }

    // let taskData = { data: [] }
    // if (props.property_activities) {
    //     let data = [];
    //     data = props.property_activities.data.data.filter((item, idx) => item.task_id !== null)
    //     taskData = { data: [...data] };
    // }
    // let inspectionData = { data: [] }
    // if (props.property_activities) {
    //     let data = [];
    //     data = props.property_activities.data.data.filter((item, idx) => item.inspection_id !== null)
    //     inspectionData = { data: [...data] };
    // }
    // let listingData = { data: [] }
    // if (props.property_activities) {
    //     let data = [];
    //     data = props.property_activities.data.data.filter((item, idx) => item.listing_id !== null)
    //     listingData = { data: [...data] };
    // }

    // let commentsData = { data: [] }
    // if (props.property_activities) {
    //     let data = [];
    //     data = props.property_activities.data.data.filter((item, idx) => item.comment !== null)
    //     commentsData = { data: [...data] };
    // }
    // let messageData = { data: [] }
    // if (props.property_activities) {
    //     let data = [];
    //     data = props.property_activities.data.data.filter((item, idx) => item.message !== null)
    //     messageData = { data: [...data] };
    // }

    // let remindersData = { data: [] }


    console.log('---595---')
    console.log(props.property_activities?.data?.data)



    return (
        <div className="page-content">
            <Container fluid={true}>
                <Breadcrumbs title="All Activity" breadcrumbItem="Properties" />

                <Row>
                    <Col lg={12}>
                        <div>
                            <Card>
                                <CardBody>
                                    <h4 className="ms-2 mb-4 text-primary">Activity for {props.property_info_data?.data?.data?.reference}</h4>
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
                                                    Listings
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
                                                    Messages
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    style={{ cursor: "pointer" }}
                                                    className={classnames({
                                                        active: state.activeTab === "7",
                                                    })}
                                                    onClick={() => {
                                                        toggle("7");
                                                    }}
                                                >
                                                    Comments
                                                </NavLink>
                                            </NavItem>
                                            {/* <NavItem>
                                                <NavLink
                                                    style={{ cursor: "pointer" }}
                                                    className={classnames({
                                                        active: state.activeTab === "8",
                                                    })}
                                                    onClick={() => {
                                                        toggle("8");
                                                    }}
                                                >
                                                    Reminders
                                                </NavLink>
                                            </NavItem> */}
                                        </Nav>

                                        <TabContent
                                            activeTab={state.activeTab}
                                            className="p-3 text-muted"
                                        >
                                            <TabPane tabId="1">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText className="mb-0">

                                                            {/* {allActivity ? (
                                                                <DatatableTables2
                                                                    products={allActivity}
                                                                    columnData={columnData}
                                                                />
                                                            ) : null} */}
                                                            {props.property_activities?.data?.data ? (
                                                                <DatatableTables2
                                                                    products={props.property_activities?.data}
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
                                                            {props.property_activities?.data?.data ? (
                                                                <DatatableTables2
                                                                    products={props.property_activities?.data}
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
                                                            {props.property_activities?.data?.data ? (
                                                                <DatatableTables2
                                                                    products={props.property_activities?.data}
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
                                                            {props.property_activities?.data?.data ? (
                                                                <DatatableTables2
                                                                    products={props.property_activities?.data}
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
                                                            {props.property_activities?.data?.data ? (
                                                                <DatatableTables2
                                                                    products={props.property_activities?.data}
                                                                    columnData={columnListingData}
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
                                                            {props.property_activities?.data?.data ? (
                                                                <DatatableTables2
                                                                    products={props.property_activities?.data}
                                                                    columnData={columnMessageData}
                                                                // url={url}
                                                                />
                                                            ) : null}
                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="7">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText className="mb-0">
                                                            {props.property_activities?.data?.data ? (
                                                                <DatatableTables2
                                                                    products={props.property_activities?.data}
                                                                    columnData={columnCommentsData}
                                                                // url={url}
                                                                />
                                                            ) : null}
                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="8">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText className="mb-0">
                                                            {/* {props.property_activities_reminders ? (
                                                                <DatatableTables2
                                                                    products={props.property_activities_reminders}
                                                                    columnData={columnReminderData}
                                                                // url={url}
                                                                />
                                                            ) : null} */}
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
            {modalState && <MailTemplateModalAll data={data} modalState={modalState} tog_large={tog_large} />
            }
        </div>
    );
}

const mapStateToProps = gstate => {
    const {
        property_activities,
        property_activities_error,
        property_activities_loading, send_email_loading
    } = gstate.Activity;
    const {
        property_info_data,
        property_info_loading,
    } = gstate.property;

    return {
        property_activities,
        property_activities_error,
        property_activities_loading,
        property_info_data,
        property_info_loading, send_email_loading
    };
};

export default withRouter(
    connect(mapStateToProps, {
        PropertyActivities, getPropertyInfo, AllActivityFresh, sendEmailFresh

    })(AllActivity)
);
