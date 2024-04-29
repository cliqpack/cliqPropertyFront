
import React, { Fragment, useState, useEffect } from "react";
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Modal,
    Row,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
} from "reactstrap";

import MailLogo from "../../../assets/images/mail_realty_me_logo.png";
import { sendEmail, sendEmailFresh, getPropertyInfo, sendSMSTemp, sendSMSTempFresh } from "store/actions";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import toastr from "toastr";
import moment from "moment";

import {
    withRouter, Link, useParams,
} from "react-router-dom";
import { connect } from "react-redux";
import parse from 'html-react-parser';


const SMSTemplateModal = props => {
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const { id } = useParams();

    const [state, setState] = useState({
        id: props.data?.id,

        to: props.data?.email_to
            ? props.data?.email_to
            : "",
        subject: props.data?.subject
            ? props.data?.subject
            : "",
        body: props.data?.email_body
            ? props.data?.email_body
            : "",
    });
    // const [emailState, setEmailState] = useState({
    //     id: props.data?.property_activity_email[0]?.id,
    //     to: props.data?.property_activity_email[0]?.email_to
    //         ? props.data?.property_activity_email[0]?.email_to
    //         : "",
    //     subject: props.data?.property_activity_email[0]?.subject
    //         ? props.data?.property_activity_email[0]?.subject
    //         : "",
    //     type: props.data?.type,
    //     body: mailBody,
    // });
    const [modalState, setModalState] = useState(false);
    const [inputState, setInputState] = useState(false);
    const [dropdownBtn, setDropdownBtn] = useState(false);
    const [editModalState, setEditModalState] = useState(false);
    const [init, setInit] = useState(true);

    useEffect(() => {
        // if (init) {
        //     props.getPropertyInfo(props.mainData.property_id);
        //     setInit(false)
        // }
        // if (props.property_info_loading === false) {
        //     props.getPropertyInfo(props.mainData.property_id);

        // }

        if (props.send_sms_loading === 'Success') {
            toastr.success('SMS sent successfully');
            props.sendSMSTempFresh();

        }
    }, [props.send_sms_loading]);



    const tog_large = () => {
        setModalState(prevState => !prevState);
        removeBodyCss();
    };

    const togx_large = () => {
        setEditModalState(prevState => !prevState);
        removeBodyCss();
    };

    const removeBodyCss = () => {
        document.body.classList.add("no_padding");
    };

    let date = new Date(props.data?.created_at);
    let dt =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    const handleEdit = () => {
        tog_large();
        togx_large();
    };

    const handleState = e => {
        setState(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmitEmail = () => {
        props.sendSMSTemp(state);
        props.toggle();

    };



    return (
        <Fragment>
            <div
                className="py-2 d-flex"
                style={{
                    borderBottom: "1.2px dotted #c9c7c7",
                    alignItems: "center", justifyContent: "center"
                }}
                onClick={() => {
                    props.toggle(); props.getPropertyInfo(props.mainData.property_id);
                }}
                data-toggle="modal"
                data-target=".bs-example-modal-xl"
            >
                <div className="d-flex justify-content-center">
                    <div className="avatar-sm me-2">
                        <span className="avatar-title  bg-light text-primary font-size-18">
                            {authUser.user?.first_name.slice(0, 1)}{authUser.user?.last_name.slice(0, 1)}
                        </span>
                    </div>
                </div>
                <div
                    className="w-100"
                    style={{
                        // borderBottom: "1.2px dotted #c9c7c7",
                    }}
                >
                    <div className="ps-3">
                        <div className="d-flex justify-content-between">
                            <div>
                                {props.data?.type == "email" && (
                                    <i className="fas fa-envelope me-1"></i>
                                )}
                                {props.data?.type == "sms" && (
                                    <i className="fas fa-mobile me-1"></i>
                                )}
                                {props.data?.type == "email_letter" && (
                                    <i className="fas fa-file-signature"></i>
                                )}
                                <span className="font-size-13 ms-1 text-info">
                                    {" "}
                                    {props.data?.subject}
                                </span>
                            </div>

                            <div>
                                <i className='far fa-calendar me-1' />
                                {moment(props.data?.created_at).format('DD/MM/yyyy, h:mm a')}
                            </div>
                        </div>
                        <div className="mt-1">
                            <span className="font-size-13 ps-1">
                                To: </span>
                            <span className="ms-1">{props.data?.email_to}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                size="xl"
                isOpen={props.show}
                toggle={props.toggle}
                style={{ width: "70%" }}
            >
                <div className="modal-header">
                    <h4
                        className="modal-title mt-0 text-primary"
                        id="myExtraLargeModalLabel"
                    >
                        {props.data?.type == "email" && <i className="fas fa-envelope me-1"></i>}
                        {props.data?.type == "sms" && <i className="fas fa-mobile me-1"></i>}
                        {props.data?.type == "email" && "Email to"}
                        {props.data?.type == "sms" && "SMS to"}
                        {/* {props.data?.type == "email_letter" && " Letter to "}{" "} */}
                        {props.data?.email_to ? <span className="ms-1">{props.data?.email_to}</span> : ""}
                    </h4>

                    <button
                        onClick={props.toggle}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <Row>
                        <Col md={8}>
                            <Row className="py-2">
                                <Col md={6}>
                                    <span style={{ color: "#6e6e6e", fontWeight: "bold" }}>
                                        To:
                                    </span>
                                    <span className="text-primary ms-2">
                                        {props.data?.email_to}
                                    </span>
                                </Col>
                                <Col md={6}>
                                    <span style={{ color: "#6e6e6e", fontWeight: "bold" }}>
                                        Property:
                                    </span>{" "}
                                    <span className="text-primary ms-1">
                                        {props.property_info_data?.data?.data?.reference}
                                    </span>
                                </Col>
                            </Row>
                            <Row className="py-1">
                                <Col md={6}>
                                    {/* <span style={{ color: "#6e6e6e", fontWeight: "bold" }}>
                                        Body:
                                    </span>
                                    <span className="ms-2">
                                        {props.data?.subject}
                                    </span> */}
                                </Col>
                                <Col md={6}>

                                </Col>
                            </Row>

                        </Col>
                        <Col md={4} className="d-flex justify-content-center align-items-center">
                            <div>
                                <Button
                                    color="info"
                                    type="button"
                                    className="me-2"
                                    onClick={handleSubmitEmail}
                                >
                                    <i className="fas fa-envelope"></i> Send
                                </Button>
                            </div>
                            {/* <Dropdown
                                isOpen={dropdownBtn}
                                toggle={() => setDropdownBtn(prevState => !prevState)}
                            >
                                <DropdownToggle className="btn btn-secondary" caret>
                                    Actions <i className="mdi mdi-chevron-down"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={handleEdit}>Edit</DropdownItem>

                                </DropdownMenu>
                            </Dropdown> */}
                        </Col>
                    </Row>
                    <hr />
                    <div style={{ backgroundColor: "#f7f7f7", padding: "20px" }}>
                        <div
                            style={{
                                width: "50%",
                                margin: "auto",
                                backgroundColor: "#fff",
                                maxHeight: "600px",
                            }}
                        >
                            <div
                                style={{ height: "70px", backgroundColor: "#556ee6" }}
                                className="d-flex justify-content-end pr-3 pt-2"
                            >
                            </div>

                            <div style={{ padding: "16px" }}>

                                <p>{parse(`${props.data?.email_body}`)}</p>
                                <p>
                                    www.cliqproperty.com <br />
                                </p>
                            </div>

                            <div
                                style={{
                                    height: "70px",
                                    backgroundColor: "rgba(52,58,64,.25)",
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* <Modal
                size="xl"
                isOpen={editModalState}
                toggle={togx_large}
                style={{ width: "70%" }}
            >
                <div className="modal-header">
                    <h4
                        className="modal-title mt-0 text-primary"
                        id="myExtraLargeModalLabel"
                    >
                        <i className="fas fa-envelope"></i> New Email
                    </h4>
                    <button
                        onClick={() => setEditModalState(false)}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="input-group mb-3">
                        <Button
                            color="info"
                            type="button"
                            id="inputGroupFileAddon03"
                            className="btn-sm"
                            style={{ backgroundColor: "#f1f1f1", color: "#949494" }}
                        >
                            To
                        </Button>
                        <Input
                            type="text"
                            className="form-control-sm"
                            id="inputGroupFile03"
                            aria-describedby="inputGroupFileAddon03"
                            aria-label="Upload"
                            name="to"
                            value={state.to}
                            onChange={handleState}
                        />

                    </div>
                    {inputState && (
                        <>
                            <div className="input-group mb-3">
                                <Button
                                    color="info"
                                    type="button"
                                    id="inputGroupFileAddon03"
                                    className="btn-sm"
                                    style={{ backgroundColor: "#f1f1f1", color: "#949494" }}
                                >
                                    Cc
                                </Button>
                                <Input
                                    type="text"
                                    className="form-control-sm"
                                    id="inputGroupFile03"
                                    aria-describedby="inputGroupFileAddon03"
                                    aria-label="Upload"
                                    name="cc"
                                    value={state.cc}
                                    onChange={handleState}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <Button
                                    color="info"
                                    type="button"
                                    id="inputGroupFileAddon03"
                                    className="btn-sm"
                                    style={{ backgroundColor: "#f1f1f1", color: "#949494" }}
                                >
                                    Bcc
                                </Button>
                                <Input
                                    type="text"
                                    className="form-control-sm"
                                    id="inputGroupFile03"
                                    aria-describedby="inputGroupFileAddon03"
                                    aria-label="Upload"
                                    name="bcc"
                                    value={state.bcc}
                                    onChange={handleState}
                                />
                            </div>
                        </>
                    )}
                    <div>
                        <Input
                            type="text"
                            className="form-control-sm"
                            id="inputGroupFile03"
                            aria-describedby="inputGroupFileAddon03"
                            aria-label="Upload"
                            name="subject"
                            value={state.subject}
                            onChange={handleState}
                        />
                    </div>
                    <div
                        className="mt-4"
                        style={{ height: "300px", overflowY: "scroll" }}
                    >
                        <CKEditor
                            editor={DecoupledEditor}
                            data={`
                               
                                <p>${props.data?.email_body}</p>
                                <p>Many thanks,</p>
                                <p>
                                    ${authUser.user.first_name +
                                " " +
                                authUser.user.last_name
                                } <br />
                                    ${props.data
                                    ?.email_from
                                } <br />
                                    9999 3333 <br />
                                    ${authUser.user.email} <br />
                                    www.mytown.com <br />
                                </p>
                            `}
                            onReady={editor => {
                                console.log("Editor is ready to use!", editor);

                                // Insert the toolbar before the editable area.
                                if (editor) {
                                    editor.ui
                                        .getEditableElement()
                                        .parentElement.insertBefore(
                                            editor.ui.view.toolbar.element,
                                            editor.ui.getEditableElement()
                                        );

                                    textEditor = editor;
                                }
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log({ event, editor, data });
                                setState(prevState => {
                                    return { ...prevState, body: data };
                                });
                            }}
                            onBlur={(event, editor) => {
                                console.log("Blur.", editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log("Focus.", editor);
                            }}
                        />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button color="primary">
                            <i className="fas fa-paper-plane"></i> Send
                        </Button>
                    </div>
                </div>
            </Modal> */}
        </Fragment>
    );
};

const mapStateToProps = gstate => {
    const { send_email_data, send_email_error, send_email_loading, send_sms_data, send_sms_loading } =
        gstate.Activity;
    const { property_info_data, property_info_loading } = gstate.property;
    return {
        send_email_data,
        send_email_error,
        send_email_loading, property_info_data, property_info_loading, send_sms_data, send_sms_loading
    };
};
export default withRouter(
    connect(mapStateToProps, {
        sendEmail,
        sendEmailFresh, getPropertyInfo, sendSMSTemp, sendSMSTempFresh
    })(SMSTemplateModal)
);