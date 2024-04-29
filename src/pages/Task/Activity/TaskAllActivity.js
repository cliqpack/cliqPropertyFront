import React, { useEffect, useState } from "react";
import Breadcrumbs from "components/Common/Breadcrumb";
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

import { taskAllActivity } from "store/actions";
import moment from "moment";
import MailTemplateModalAll from "pages/Properties/MailTemplate/MailTempateModalAll";

function TaskAllActivity(props) {
    const { id } = useParams();
    const [state, setState] = useState({
        activeTab: "1",
    });
    const [init, setInit] = useState(true);
    const [modalState, setModalState] = useState(false);

    const tog_large = () => {
        setModalState(prevState => !prevState);
    };


    const [data, setData] = useState({});
    const createdRef = (cell, row) => {
        return <span>{moment(row.created_at).format('DD/MM/YYYY')}</span>
    }

    const typeRef = (cell, row) => {
        return <>
            {row.type == 'email' ? <span className="text-primary"><i className="fas fa-paper-plane me-1" />{row.type == 'email' && <span>Message</span>}</span> : <span><i className="far fa-comment me-1" />Comment</span>}
        </>
    }

    // const summaryRef = (cell, row) => {
    //     return <>
    //         {row.message ? <span className="text-primary">{row.message.subject}</span> : <span>{row.comment}</span>}
    //     </>
    // }

    const allSummaryRefDetail = (e, column, columnIndex, row, rowIndex) => {
        setData(row);
        tog_large();
    };

    const dueRef = (cell, row) => {
        return <>
            {row.message_many?.length > 0 ? <span>{row.created_at ? moment(row.created_at).format('DD/MM/yyyy') : ''}</span> :
                <>
                    {row.message_many?.length > 0 ? <><span>{moment(row.created_at).format('DD/MM/yyyy')}</span></> :
                        <>

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

                    {/* {row.comment && <span><i className="fas fa-comment"></i> Comment</span>} */}
                    {/* {row.message && <span><i className="fas fa-paper-plane"></i> Message</span>} */}
                </span>
                :

                <div className="d-flex flex-column justify-content-start">

                    {/* <span> */}
                    {row.message_many?.length > 0 &&
                        row.message_many?.map((item, i) => <span className="pb-1" key={i}><i className="fas fa-paper-plane"></i> Message</span>)
                    }

                    {row.task && <span><i className="fas fa-clipboard-list"></i> Task</span>}

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
                            <div className="text-primary pb-1" key={i} onClick={() => msgModalOpen(item)}>{item?.subject}</div>
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

    const allData = [
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
            dataField: "summery",
            text: "Summary",
            formatter: summaryRef,
            sort: true,
            // events: {
            //     onClick: (e, column, columnIndex, row, rowIndex) => {
            //         allSummaryRefDetail(e, column, columnIndex, row, rowIndex);
            //     },
            // },
        },
        {
            dataField: "status",
            text: "Status",
            // formatter: statusRef,
            sort: true,
        },
        {
            dataField: "updated_at",
            text: "Completed",
            formatter: createdRef,
            sort: true,
        },

    ];

    var authUser = JSON.parse(localStorage.getItem("authUser"));

    const commentRef = (cell, row) => <span title={row.comment}>{row.comment.slice(0, 80)}{row.comment.length > 80 ? '...' : ''}</span>
    const memberRef = (cell, row) => {
        return <span>{authUser.user.first_name + ' ' + authUser.user.last_name}</span>
    }
    const commentsDateRef = (cell, row) => <span>{moment(cell).format('DD/MM/yyyy, LT')}</span>;

    const columnCommentsData = [
        {
            dataField: "",
            text: "Created",
            formatter: commentsDateRef,

            sort: true,
        },
        {
            dataField: "comment",
            text: "Comment",
            formatter: commentRef,
            sort: true,
        },
        {
            dataField: "",
            text: "Member",
            formatter: memberRef,
            sort: true,
        },
    ];

    useEffect(() => {
        if (init) {
            props.taskAllActivity(id, 'all');
            setInit(false)
        }
    }, []);

    console.log(props.task_activities?.data);


    const toggle = (tab, type) => {
        if (state.activeTab !== tab) {
            setState({
                ...state,
                activeTab: tab,
            });
        }
        if (tab == '1') {

            props.taskAllActivity(id, 'all')
        }
        if (tab == '2') {
            props.taskAllActivity(id, 'comments')

        }
    };

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Row>
                    <Col lg={12}>
                        <div>
                            <Card>
                                <CardBody>
                                    <h4 className="ms-2 mb-4 text-primary">Activity for Task</h4>
                                    {/* <div className="button-items">
                                        <button disable type="button" className="btn btn-secondary">
                                            Actions
                                            <i className="fas fas fa-chevron-down font-size-12 align-middle ms-2"></i>
                                        </button>
                                    </div> */}
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
                                                            {props.task_activities?.data ? (
                                                                <DatatableTables2
                                                                    products={props.task_activities?.data}
                                                                    columnData={allData}
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
                                                            {props.task_activities?.data ? (
                                                                <DatatableTables2
                                                                    products={props.task_activities?.data}
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
            {modalState && <MailTemplateModalAll data={data} modalState={modalState} tog_large={tog_large} />}

        </div>
    );
}

const mapStateToProps = gstate => {
    const {
        task_activities,
        task_activities_error,
        task_activities_loading,
    } = gstate.Activity;
    return {
        task_activities,
        task_activities_error,
        task_activities_loading,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        taskAllActivity
    })(TaskAllActivity)
);
