import React, { useEffect, useState } from "react";
import Breadcrumbs from "components/Common/Breadcrumb";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, withRouter, useHistory, useParams } from "react-router-dom";

import classnames from "classnames";
import moment from "moment";

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
    Modal,
    Table,
} from "reactstrap";
import DatatableTables2 from "pages/Tables/DatatableTables2";
import Parser from "html-react-parser";

import { getJobAllData, jobForAllActivity } from "store/actions";
import MailTemplateModalAll from "pages/Properties/MailTemplate/MailTempateModalAll";

function JobAllActivity(props) {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const [mailData, setMailData] = useState();
    const { id } = useParams();
    const [state, setState] = useState({
        activeTab: "1",
        mailTemplatePopUpState: false,
    });
    const [init, setInit] = useState(true)
    const [modalState, setModalState] = useState(false);

    const tog_large = () => {
        setModalState(prevState => !prevState);
    };

    console.log(modalState);

    const [data, setData] = useState({});


    const statusRef = (cell, row) => {
        return <span>
            {row.status}
        </span>;
    }

    const createdRef = (cell, row) => {
        // return <span>{moment(row.created_at).format('DD-MM-YYYY')}</span>
        return <span>{moment(row.created_at).format('DD/MM/yyyy')}</span>
    }

    const memberRef = (cell, row) => {
        return <span>{authUser.user.first_name + ' ' + authUser.user.last_name}</span>
    }

    const commentRef = (cell, row) => <span >{row.comment}</span>

    const dateRef = (cell, row) => <span>{moment(cell).format('DD/MM/yyyy')}</span>

    // const summaryRef = (cell, row) => {
    //     return <>
    //         {row.message ? <span className="text-primary">{row.message.subject}</span> :
    //             <span> {row.comment}</span>
    //         }
    //     </>
    // }

    const allSummaryRefDetail = (e, column, columnIndex, row, rowIndex) => {
        setData(row);
        tog_large();
    };

    const completedRef = (cell, row) => {
        return <>
            {row.message ? <span className="text-primary">{row.completed}</span> :
                <span> {moment(row.created_at).format('DD/MM/yyyy')}</span>
            }

        </>
    }

    const comRef = (cell, row) => <span>{cell ? moment(cell).format('DD/MM/yyyy') : ""}</span>

    // const ref = (cell, row) => {
    //     return <>
    //         {row.comment && <span><i className="fas fa-comment"></i> Comment</span>}
    //         {row.type === 'email' && <span className="text-primary" onClick={() => emailTemplateModalHandler(row)}>
    //             <i className="fas fa-paper-plane"></i> Message</span>}
    //     </>;
    // };

    const ref = (cell, row) => {
        return <>
            {row.type == "comment" ? row.comment && <span><i className="fas fa-comment"></i> Comment</span> : row.message_many.length == 0 ?
                <span className="">

                    {row.maintenance && <span><i className="fas fa-wrench"></i> Job</span>}
                    {/* {row.comment && <span><i className="fas fa-comment"></i> Comment</span>} */}
                    {/* {row.message && <span><i className="fas fa-paper-plane"></i> Message</span>} */}
                </span>
                :

                <div className="d-flex flex-column justify-content-start">

                    {/* <span> */}
                    {row.message_many &&
                        row.message_many.map((item, i) => <span className="pb-1" key={i}><i className="fas fa-paper-plane"></i> Message</span>)
                    }


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

            {row.message_many?.length == 0 ?
                <span>

                    {row.type == 'comment' ? <span>{row.comment}</span> :
                        row.maintenance
                        && <Link to={`/maintenanceInfo/${row.maintenance?.id}`}>
                            <span className="text-primary">{row.maintenance?.summary}</span>
                        </Link>
                    }
                </span>
                :
                <div className="d-flex flex-column">
                    {row.message_many?.map((item, i) =>
                        <div className="text-primary pb-1" key={i} onClick={() => msgModalOpen(item)}>{item?.subject}</div>
                    )}

                    {row.maintenance
                        && <Link to={`/maintenanceInfo/${row.maintenance?.id}`}>
                            <span className="text-primary">{row.maintenance?.summary}</span>
                        </Link>}
                    {row.comment && <span>{row.comment}</span>}

                </div>
            }
        </>
            ;
    }

    const columnData = [
        {
            dataField: "created_at",
            text: "Due",
            formatter: dateRef,
            sort: true,
        },
        {
            dataField: "type",
            text: "Type",
            formatter: ref,
            sort: true,
        },
        {
            dataField: "",
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
            dataField: "completed",
            text: "Completed",
            formatter: comRef,

            sort: true,
        },

    ];

    const commentsDateRef = (cell, row) => <span>{moment(cell).format('DD/MM/yyyy, LT')}</span>;


    const columnCommentsData = [
        {
            dataField: "created_at",
            text: "Created",
            formatter: commentsDateRef,
            sort: true,
        },
        {
            dataField: "",
            text: "Comment",
            formatter: commentRef,
            sort: true,
        },
        {
            dataField: "",
            text: "Member",
            sort: true,
            formatter: memberRef,
        },
    ];

    useEffect(() => {
        if (init) {
            props.getJobAllData(id);
            props.jobForAllActivity(id, 'all');
            setInit(false)
        }

    }, []);

    console.log('--153---');
    console.log(props.job_for_all_activity?.data);


    const toggle = (tab, type) => {
        if (state.activeTab !== tab) {
            setState({
                ...state,
                activeTab: tab,
            });
        }
        if (tab == '1') {

            props.jobForAllActivity(id, 'all');
        }
        if (tab == '2') {
            props.jobForAllActivity(id, 'comments');

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
                                    <h4 className="ms-2 mb-4 text-primary">Activity for Job # {id}</h4>
                                    <div className="button-items">
                                        {/* 
                                            <button disable type="button" className="btn btn-secondary">
                                            Actions
                                            <i className="fas fas fa-chevron-down font-size-12 align-middle ms-2"></i>
                                            </button>
                                        */}
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
                                                            {props.job_for_all_activity?.data ? (
                                                                <DatatableTables2
                                                                    products={props.job_for_all_activity?.data}
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
                                                            {props.job_for_all_activity?.data ? (
                                                                <DatatableTables2
                                                                    products={props.job_for_all_activity?.data}
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
            {modalState && <MailTemplateModalAll data={data} modalState={modalState} tog_large={tog_large} />
            }
        </div>
    );
}

const mapStateToProps = gstate => {
    const {
        job_message_data,
        job_message_data_error,
        job_message_data_loading,

        job_all_data,
        job_all_data_error,
        job_all_data_loading, job_for_all_activity,
        job_for_all_activity_loading
    } = gstate.Activity;
    return {
        job_message_data,
        job_message_data_error,
        job_message_data_loading,

        job_all_data,
        job_all_data_error,
        job_all_data_loading, job_for_all_activity,
        job_for_all_activity_loading
    };
};

export default withRouter(
    connect(mapStateToProps, {
        getJobAllData, jobForAllActivity
    })(JobAllActivity)
);
