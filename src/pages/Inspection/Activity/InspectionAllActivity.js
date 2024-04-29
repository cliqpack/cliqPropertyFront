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

import { getMessageInspection, InspectionInfoData, inspectionForAllActivity } from "store/actions";
import moment from "moment";
import MailTemplateModalAll from "pages/Properties/MailTemplate/MailTempateModalAll";

function InspectionAllActivity(props) {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const { id } = useParams();
    const [state, setState] = useState({
        activeTab: "1",
    });
    const [init, setInit] = useState(true);

    const [msgData, setMsgData] = useState();
    const [tableData, setTableData] = useState([]);



    const [modalState, setModalState] = useState(false);

    const tog_large = () => {
        setModalState(prevState => !prevState);
    };


    const [data, setData] = useState({});

    const createdRef = (cell, row) => {
        return <span>{moment(row.created_at).format('DD/MM/YYYY')}</span>
    }

    const memberRef = (cell, row) => {
        return <span>{authUser.user.first_name + ' ' + authUser.user.last_name}</span>
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
                        row.inspection && <Link to={`/inspectionInfo/${row.inspection?.id}`}><span className="text-primary">{row.inspection?.summery}</span></Link>
                    }
                </span>
                :
                <div className="d-flex flex-column">
                    {row.message_many?.map((item, i) =>
                        <div className="text-primary pb-1" key={i} onClick={() => msgModalOpen(item)}>{item?.subject}</div>
                    )}

                    {row.inspection && <Link to={`/inspectionInfo/${row.inspection?.id}`}><span className="text-primary">{row.inspection?.summery}</span></Link>}
                    {row.comment && <span>{row.comment}</span>}

                </div>
            }
        </>
            ;
    }

    const allSummaryRefDetail = (e, column, columnIndex, row, rowIndex) => {
        // console.log(e, column, columnIndex, row, rowIndex);
        // setMsgData(row.message_many);
        // tog_large();
    };

    const ref = (cell, row) => {
        return <>

            {row.message_many?.length === 0 ?
                <span className="">

                    {row.type == 'comment' ? <span><i className="fas fa-comment"></i> Comment</span> :
                        row.inspection && <span><i className="bx bx-task"></i> Inspection</span>}
                    {/* {row.message && <span><i className="fas fa-paper-plane"></i> Message</span>} */}
                </span>
                :

                <div className="d-flex flex-column justify-content-start">

                    {/* <span> */}


                    {row.message_many &&
                        row.message_many.map((item, i) => <span className="pb-1" key={i}><i className="fas fa-paper-plane"></i> Message</span>)
                    }

                    {row.inspection && <span><i className="bx bx-task py-1"></i> Inspection</span>}
                    {row.comment && <span><i className="fas fa-comment"></i> Comment</span>}
                    {/* </span> */}

                    {/* <hr className="bg-secondary" /> */}


                </div>
            }
        </>;
    };
    const comRef = (cell, row) => <span>{cell ? moment(cell).format('DD/MM/yyyy') : ""}</span>
    const allData = [
        {
            dataField: "created_at",
            text: "Due",
            formatter: createdRef,
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
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    allSummaryRefDetail(e, column, columnIndex, row, rowIndex);
                },
            },
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
    const commentRef = (cell, row) => <span>{row.comment}</span>

    const columnCommentsData = [
        {
            dataField: "created_at",
            text: "Created",
            formatter: commentsDateRef,
            sort: true,
        },
        {
            dataField: "comment",
            text: "Comment",
            // formatter: commentRef,
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
            props.inspectionForAllActivity(id, 'all')
            props.InspectionInfoData(id);
            setInit(false)
        }

    }, []);

    console.log('---219---');
    console.log(props.inspection_for_all_activity?.data);



    const toggle = (tab, type) => {
        if (state.activeTab !== tab) {
            setState({
                ...state,
                activeTab: tab,
            });
        }
        if (tab == '1') {
            props.inspectionForAllActivity(id, 'all');
        }
        if (tab == '2') {
            props.inspectionForAllActivity(id, 'comments');

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
                                    <h4 className="ms-2 mb-4 text-primary">Activity for Inspection {props.inspection_info_data?.data?.data?.property?.reference}</h4>
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
                                                            {props.inspection_for_all_activity?.data ? (
                                                                <DatatableTables2
                                                                    products={props.inspection_for_all_activity?.data}
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
                                                            {props.inspection_for_all_activity?.data ? (
                                                                <DatatableTables2
                                                                    products={props.inspection_for_all_activity?.data}
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
        inspection_info_data,

    } = gstate.Inspections;
    const {
        inspection_message_data,
        inspection_message_data_error,
        inspection_message_data_loading, inspection_for_all_activity, inspection_for_all_activity_loading
    } = gstate.Activity;
    return {
        inspection_info_data,

        inspection_message_data,
        inspection_message_data_error,
        inspection_message_data_loading, inspection_for_all_activity, inspection_for_all_activity_loading
    };
};

export default withRouter(
    connect(mapStateToProps, {
        getMessageInspection, InspectionInfoData, inspectionForAllActivity
    })(InspectionAllActivity)
);
