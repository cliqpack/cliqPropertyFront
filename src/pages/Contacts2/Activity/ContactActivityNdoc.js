import React, { useEffect, useState } from "react";
import {
    useLocation,
    withRouter,
    Link,
    useParams,
    useHistory,
} from "react-router-dom";
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
    Badge,
} from "reactstrap";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import classnames from "classnames";
import { propTypes } from "react-bootstrap-editable";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { } from "store/actions";
import Aos from "aos";
import "aos/dist/aos.css";
import moment from "moment";
import Comment from "pages/Activity/Comment";
import CommentData from "pages/Activity/CommentData";
import TooltipVisibility from "pages/Properties/Documents/TooltipVisibility";

const ContactsInfoOfOwner = (props) => {
    console.log(props);
    console.log(props.state.activeTab);
    console.log(props.toggle);
    const { id } = useParams();
    // activity modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    // activity modal

    // comment modal declare
    const [commentmodal, setCommentModal] = useState(false);
    const commentToggle = () => setCommentModal(!commentmodal);


    return (
        <React.Fragment>
            <div>

                {/* <Nav className="nav-tabs-custom justify-content-evenly">
                    <NavItem>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: props.state.activeTab === 1,
                            })}
                            onClick={() => {
                                props.toggle("1"); toggle();
                            }}
                        >
                            <span className="font-size-14">
                                <i className="fa fa-solid fa-bars me-1" />
                                Activity
                            </span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: props.state.activeTab === 2,
                            })}
                            onClick={() => {
                                props.toggle("2");
                            }}
                        >
                            <span className="font-size-14">
                                <i className="fas fa-file me-1" />
                                Documents
                            </span>
                        </NavLink>
                    </NavItem>


                    {props.state.activeTab === "1" && (
                        <div className="d-flex justify-content-end align-items-center ms-5">
                            <NavItem>
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    onClick={props.msgToggle}
                                >
                                    <div className="badge badge-soft-secondary d-flex align-items-start p-2">
                                        <i className="bx bxs-comment-detail me-1 font-size-20 text-secondary" />
                                        <i className="fas fa-angle-down font-size-14 text-secondary" />
                                    </div>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className="d-flex align-items-end"
                                >
                                    <Link to={`/all-contact-activity/${id}`}>
                                        <span className="font-size-14 text-dark">
                                            All
                                        </span>
                                    </Link>
                                </NavLink>
                            </NavItem>
                        </div>
                    )}

                    {props.state.activeTab === "2" && (
                        <div className="ms-5 ps-5">
                            <NavItem>
                                <NavLink style={{ cursor: "pointer" }}>
                                    <Link to={`/all-contact-document/${id}`}>
                                        <span className="font-size-14 text-dark">
                                            All
                                        </span>
                                    </Link>
                                </NavLink>
                            </NavItem>
                        </div>
                    )}
                </Nav> */}


                <div>
                    <TabContent
                        activeTab={props.state.activeTab}
                        className="p-3 text-muted"
                    >
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    {/* {props.msgShow && (
                                        <Comment
                                            msgToggle={props.msgToggle}
                                            msgHandlerSubmit={props.msgHandlerSubmit}
                                            setMessage={props.setMessage}
                                            contact_id={id}
                                        />
                                    )} */}


                                    <p
                                        className="fw-bold ps-2 pt-5 font-size-15"
                                        style={{
                                            borderBottom: "1.2px dotted #c9c7c7",
                                        }}
                                    >
                                        Comments
                                    </p>
                                    <CommentData data={props.msgData} />




                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <CardText className="mb-0">
                                        <div
                                            style={{
                                                maxHeight: "380px",
                                                overflowY: "auto",
                                                overflowX: "hidden",
                                            }}
                                        >
                                            <Row >
                                                {props.data?.map(
                                                    (element, idx) => {
                                                        return (
                                                            <Col md={4} key={element.id} className="">
                                                                <Card >
                                                                    <CardBody>


                                                                        <div className="d-flex flex-column justify-content-between" style={{
                                                                            minHeight: '90px'
                                                                        }}>

                                                                            <div className="d-flex align-items-center">
                                                                                {element?.owner_id || element?.tenant_id ? <i className="fas fa-home font-size-28 me-2"></i> : ''}
                                                                                {element.supplier_contact_id && <i className="bx bx-user-plus font-size-22 text-primary me-1" />}
                                                                                <a
                                                                                    href={
                                                                                        process.env.REACT_APP_IMAGE +
                                                                                        element?.doc_path
                                                                                    }
                                                                                    target="_blank"
                                                                                    rel="noreferrer noopener"
                                                                                >

                                                                                    {element?.name == null
                                                                                        ? element?.doc_path?.slice(
                                                                                            0,
                                                                                            13
                                                                                        ) + "..."
                                                                                        : element?.name?.slice(0, 25) + '...'}

                                                                                </a>

                                                                            </div>
                                                                            {element?.owner_id || element?.tenant_id ? <div className="d-flex align-items-center text-secondary py-1" style={{ cursor: 'not-allowed', fontSize: '10px' }}>
                                                                                <i className="fas fa-home me-2"></i>
                                                                                {element?.property?.reference}
                                                                            </div> : ''}
                                                                            <div>
                                                                                <i className="fas fa-file me-2"></i>
                                                                                {(
                                                                                    Number(
                                                                                        element?.file_size
                                                                                    ) / 1024
                                                                                ).toFixed(2) +
                                                                                    " " +
                                                                                    "kb"}
                                                                            </div>
                                                                            <div>
                                                                                <i className="far fa-clock me-2" />

                                                                                {moment(
                                                                                    element?.created_at
                                                                                ).format("DD-MM-YYYY")}
                                                                            </div>
                                                                        </div>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                        );
                                                    }
                                                )}
                                            </Row>
                                        </div>
                                    </CardText>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
            </div>


            {/* ================= activity modal start ===================*/}
            <Modal isOpen={props.modalShow} toggle={props.toggleActivity} size="lg" style={{ border: "5px solid #153D58 !important", borderRadius: "10px 10px 0px 0px" }}>
                <ModalHeader style={{ backgroundColor: "#153D58", height: "70px" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "760px",
                            marginTop: "10px",
                        }}
                    >
                        <div>
                            <p
                                className="fw-bold ps-2 font-size-16"
                                style={{ color: "white" }}
                            >
                                Activity
                            </p>
                        </div>
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyItems: "center",
                                    justifyContent: "flex-end",
                                    gap: "10px",
                                }}
                            >

                                {/* <div
                                    style={{
                                        cursor: "pointer",
                                        width: "50px",
                                        backgroundColor: "#3C627B",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <div className="badge badge-soft-secondary d-flex align-items-start p-2">
                                        <i className="bx bxs-comment-detail me-1 font-size-16 text-white" />
                                        <i className="fas fa-angle-down font-size-16 text-white" />
                                    </div>
                                </div> */}

                                <NavLink
                                    style={{
                                        cursor: "pointer",
                                        width: "50px",
                                        backgroundColor: "#3C627B",
                                        borderRadius: "8px",
                                    }}
                                    onClick={() => { props.msgToggle(); commentToggle() }}
                                >
                                    <div className="badge badge-soft-secondary d-flex align-items-start p-2">
                                        <i className="bx bxs-comment-detail me-1 font-size-16 text-white" />
                                        <i className="fas fa-angle-down font-size-16 text-white" />
                                    </div>
                                </NavLink>

                                <div
                                    style={{
                                        cursor: "pointer",
                                        width: "50px",
                                        backgroundColor: "#3C627B",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <Link to={`/all-contact-activity/${id}`}>

                                        <div className="badge badge-soft-secondary d-flex align-items-start px-3 py-2 font-size-16 text-white">
                                            All
                                        </div>
                                    </Link>
                                </div>
                                {/* </NavItem> */}
                                <div onClick={props.toggleActivity} style={{ cursor: "pointer" }}>
                                    <i className="mdi mdi-close-thick font-size-20 text-white"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm="12">
                            {/* {props.msgShow && (
                                <Comment
                                    msgToggle={props.msgToggle}
                                    msgHandlerSubmit={props.msgHandlerSubmit}
                                    setMessage={props.setMessage}
                                    contact_id={id}
                                />
                            )} */}


                            <p
                                className="fw-bold ps-2 pt-5 font-size-15"
                                style={{
                                    borderBottom: "1.2px dotted #c9c7c7",
                                }}
                            >
                                Comments
                            </p>
                            <CommentData data={props.msgData} />
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            {/* ================= activity modal end   ===================*/}


            {/* ================= documents modal start   ===================*/}

            <Modal isOpen={props.modalShowDoc} toggle={props.toggleDocument}>
                <ModalHeader style={{ backgroundColor: "#153D58", height: "60px" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "470px",
                            marginTop: "10px",
                        }}
                    >
                        <div>
                            <p
                                className="fw-bold ps-2 font-size-16"
                                style={{ color: "white" }}
                            >
                                Documents
                            </p>
                        </div>
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyItems: "center",
                                    justifyContent: "flex-end",
                                    gap: "10px",
                                }}
                            >
                                <div
                                    style={{
                                        cursor: "pointer",
                                        width: "50px",
                                        backgroundColor: "#3C627B",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <Link to={`/all-contact-document/${id}`}>
                                        {/* <span className="font-size-14 text-dark">
                                All
                              </span> */}
                                        <div className="badge badge-soft-secondary d-flex align-items-start px-3 py-2 font-size-16 text-white">
                                            All
                                        </div>
                                    </Link>
                                </div>
                                {/* </NavItem> */}
                                <div onClick={props.toggleDocument} style={{ cursor: "pointer" }}>
                                    <i className="mdi mdi-close-thick font-size-20 text-white"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        {/* <Col sm="12">
                            <CardText className="mb-0">
                                <div
                                    style={{
                                        maxHeight: "380px",
                                        overflowY: "auto",
                                        overflowX: "hidden",
                                    }}
                                >
                                    <Row >
                                        {props.data?.map(
                                            (element, idx) => {
                                                return (
                                                    <Col md={12} key={element.id} className="">
                                                        <Card >
                                                            <CardBody>


                                                                <div className="d-flex flex-column justify-content-between" style={{
                                                                    minHeight: '90px'
                                                                }}>

                                                                    <div className="d-flex align-items-center">
                                                                        {element?.owner_id || element?.tenant_id ? <i className="fas fa-home font-size-28 me-2"></i> : ''}
                                                                        {element.supplier_contact_id && <i className="bx bx-user-plus font-size-22 text-primary me-1" />}
                                                                        <a
                                                                            href={
                                                                                process.env.REACT_APP_IMAGE +
                                                                                element?.doc_path
                                                                            }
                                                                            target="_blank"
                                                                            rel="noreferrer noopener"
                                                                        >

                                                                            {element?.name == null
                                                                                ? element?.doc_path?.slice(
                                                                                    0,
                                                                                    13
                                                                                ) + "..."
                                                                                : element?.name?.slice(0, 25) + '...'}

                                                                        </a>

                                                                    </div>
                                                                    {element?.owner_id || element?.tenant_id ? <div className="d-flex align-items-center text-secondary py-1" style={{ cursor: 'not-allowed', fontSize: '10px' }}>
                                                                        <i className="fas fa-home me-2"></i>
                                                                        {element?.property?.reference}
                                                                    </div> : ''}
                                                                    <div>
                                                                        <i className="fas fa-file me-2"></i>
                                                                        {(
                                                                            Number(
                                                                                element?.file_size
                                                                            ) / 1024
                                                                        ).toFixed(2) +
                                                                            " " +
                                                                            "kb"}
                                                                    </div>
                                                                    <div>
                                                                        <i className="far fa-clock me-2" />

                                                                        {moment(
                                                                            element?.created_at
                                                                        ).format("DD-MM-YYYY")}
                                                                    </div>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                );
                                            }
                                        )}
                                    </Row>
                                </div>
                            </CardText>
                        </Col> */}

                        <Col sm="12">
                            <CardText className="mb-0">
                                <div
                                    style={{
                                        maxHeight: "380px",
                                        overflowY: "auto",
                                        overflowX: "hidden",
                                    }}
                                >
                                    <Row>
                                        {props.data?.map(
                                            (element, idx) => {
                                                return (
                                                    <Col md={12} key={element.id}>
                                                        <Card>
                                                            <CardBody>
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            width: "60%",
                                                                            display: "flex",
                                                                            justifyContent: "flex-start",
                                                                        }}
                                                                    >
                                                                        <div style={{ fontSize: "35px" }}>
                                                                            <i className="bx bxs-file-pdf me-2 font-size-25" />
                                                                        </div>
                                                                        <div>
                                                                            <div>
                                                                                <a
                                                                                    href={
                                                                                        process.env.REACT_APP_IMAGE +
                                                                                        element.doc_path
                                                                                    }
                                                                                    target="_blank"
                                                                                    rel="noreferrer noopener"
                                                                                    style={{ fontSize: "14px" }}
                                                                                >
                                                                                    {element.name == null
                                                                                        ? element.doc_path.slice(0, 13) +
                                                                                        "..."
                                                                                        : element.name}
                                                                                </a>
                                                                            </div>
                                                                            <div
                                                                                style={{ display: "flex", gap: "20px" }}
                                                                            >
                                                                                <div className="d-flex align-items-center">
                                                                                    <i className="far fa-clock me-2" />
                                                                                    {moment(element?.created_at).format(
                                                                                        "DD MMM YYYY"
                                                                                    )}
                                                                                </div>
                                                                                <div className="d-flex align-items-center">
                                                                                    <i className="fas fa-file me-2"></i>
                                                                                    {(
                                                                                        Number(element.file_size) / 1024
                                                                                    ).toFixed(2) +
                                                                                        " " +
                                                                                        "kb"}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {element.owner_id && (
                                                                        <TooltipVisibility
                                                                            visibility={"visible"}
                                                                            text="to owner"
                                                                            placement="right"
                                                                            direction="TooltipRight"
                                                                        />
                                                                    )}
                                                                    {element.tenant_id && (
                                                                        <TooltipVisibility
                                                                            visibility={"visible"}
                                                                            text="to tenant"
                                                                            placement="bottom"
                                                                            direction="TooltipBottom"
                                                                        />
                                                                    )}

                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                );
                                            }
                                        )}
                                    </Row>
                                </div>
                            </CardText>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            {/* ================= documents modal ends    ===================*/}


            {/* ================= comment modal start ===================*/}
            <Modal isOpen={commentmodal} toggle={commentToggle} size="lg">
                <ModalHeader
                    //toggle={commentToggle}
                    style={{ backgroundColor: "#153D58", height: "70px" }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "760px",
                            marginTop: "10px",
                        }}
                    >
                        <div>
                            <p
                                className="fw-bold ps-2 font-size-16"
                                style={{ color: "white" }}
                            >
                                Activity
                            </p>
                        </div>
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyItems: "center",
                                    justifyContent: "flex-end",
                                    gap: "10px",
                                }}
                            >
                                <div
                                    style={{
                                        cursor: "pointer", width: "50px", backgroundColor: "#3C627B",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <div
                                        className="badge badge-soft-secondary d-flex align-items-start p-2"

                                    >
                                        <i className="bx bxs-comment-detail me-1 font-size-16 text-white" />
                                        <i className="fas fa-angle-down font-size-16 text-white" />
                                    </div>
                                </div>
                                <div style={{ display: "flex" }}

                                >
                                    <div style={{
                                        cursor: "pointer", width: "50px", backgroundColor: "#3C627B",
                                        borderRadius: "8px",
                                    }}>
                                        <Link to={`/all-property-activity/${id}`}>
                                            <div
                                                className="badge badge-soft-secondary d-flex align-items-start px-3 py-2 font-size-16 text-white"

                                            >
                                                All
                                            </div>
                                        </Link>
                                    </div>
                                    <div
                                        onClick={commentToggle}
                                        style={{ cursor: "pointer", marginLeft: "15px" }}
                                    >
                                        <i className="mdi mdi-close-thick font-size-20 text-white"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col sm="12">
                            <Comment
                                msgToggle={commentToggle}
                                msgHandlerSubmit={props.msgHandlerSubmit}
                                setMessage={props.setMessage}
                                contact_id={id}
                            />
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            {/* ================= comment modal end   ===================*/}



        </React.Fragment>
    );
};

Aos.init({
    once: true,
});

const mapStateToProps = gstate => {
    const { } = gstate.Contacts2;

    const {

    } = gstate.Document;

    return {

    };
};
export default withRouter(
    connect(mapStateToProps, {
    })(ContactsInfoOfOwner)
);
