import moment from 'moment';
import React, { useEffect, useState } from 'react';
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
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup, FormText
} from "reactstrap";
import { connect } from "react-redux";

import { sendSMS, sendSMSFresh } from 'store/actions';


import toastr from "toastr";
import { useHistory } from 'react-router-dom';
import Loder from 'components/Loder/Loder';

const OutboxMailModal = (props) => {
    const history = useHistory();
    const [state, setState] = useState({})

    useEffect(() => {
        if (props.sms_add_loading === 'Succcess') {
            toastr.success('Success')
            props.sendSMSFresh();
            props.toggle();
        }
        if (props.data) {
            setState({
                ...state,
                to: props.data.to,
            })
        }
    }, [props.data, props.sms_add_loading]);

    const sendHandler = () => {
        props.sendSMS(state, props.data.body)

    }
    return (
        <>
            <Modal
                isOpen={state.mailBodyModal2}
                role="dialog"
                autoFocus={true}
                centered={true}
                className="exampleModal"
                tabIndex="-1"
                // toggle={this.togglemodal}
                size="xl"

            >
                <ModalBody style={{ overflow: "scroll" }}>
                    <div>
                        <div style={{ display: "flex", gap: "10px", justifyContent: 'space-between' }}>
                            <div style={{ display: "flex", gap: "10px" }}> <i
                                className="bx bx-envelope ms-2"
                                style={{ fontSize: "30px" }}
                            ></i>{" "}
                                <h3>Email</h3></div>
                            <button
                                type="button"
                                className="btn-close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => toggleMailBodyModalWithouttext2()}
                            >
                            </button>
                        </div>
                        <hr />
                        <div style={{ display: "flex", gap: "10px" }}>
                            <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                                From:
                            </p>
                            {state.from}
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                                Subject:
                            </p>
                            {state.subject}
                        </div>
                    </div>

                    <div
                        style={{
                            backgroundColor: "rgba(52,58,64,.25)",
                            width: "90%",
                            margin: "auto",
                        }}
                    >
                        <div
                            style={{
                                margin: "auto",
                                backgroundColor: " #fff",
                                maxHeight: "600px",
                            }}
                        >
                            <div
                                style={{ height: "70px", backgroundColor: "#159B9C" }}
                                className="d-flex justify-content-start pr-3 pt-2"
                            >
                                <img
                                    src={MailLogo}
                                    height="90%"
                                    width="170px"
                                    style={{ marginLeft: "20px" }}
                                />
                            </div>
                            <div style={{ padding: "16px" }}>
                                <p>Dear Concern,</p>

                                <p>{parse(`${state.mailBodyModalText}`)}</p>

                                <p>Many thanks,</p>
                                <p>
                                    {x.user.first_name + " " + x.user.last_name} <br />
                                    {state.to} <br />
                                    {x.user.mobile_phone}
                                </p>
                            </div>

                            <div
                                style={{
                                    height: "70px",
                                    backgroundColor: "rgba(52,58,64,.25)",
                                    marginTop: sendReply ? "80px" : "10px",
                                }}
                            ></div>

                            {/* =============== showing reply mail start ============= */}


                            {/* <ReplyCard item={state.reply} /> */}

                            {/* =============== showing reply mail ends ============= */}




                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <div
                        className="d-flex justify-content-between align-items-top"
                    // style={{
                    //   display: "flex",
                    //   justifyContent: "right",
                    //   gap: "10px",
                    //   marginTop: "20px",
                    // }}
                    >
                        <div
                        //  style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}
                        >
                            <Button onClick={handleReply}
                            //  style={{ marginBottom: "10px" }}
                            >{sendReply ? "Close Reply" : "Reply"}</Button>
                        </div>
                        <Button
                            type="button"
                            color="danger"
                            className="mx-2"
                            onClick={() => toggleMailBodyModalWithouttext2()}
                        >
                            Close
                        </Button>{" "}
                        {state.id ? (
                            <Button
                                type="button"
                                color="primary"
                                //onClick={handleSubmitMail}
                                onClick={sendReply ? handleReplyMail : handleSubmitMail}
                                className="ms-1"
                            >
                                {sendReply ? "Reply" : "Send"} <i className="fab fa-telegram-plane ms-1"></i>
                            </Button>
                        ) : null}
                    </div>
                </ModalFooter>
            </Modal>


        </>

    )
}
const mapStateToProps = gstate => {
    const {
        sms_add_loading
    } = gstate.Message;



    return {
        sms_add_loading
    };
};
export default connect(mapStateToProps, {
    sendSMS, sendSMSFresh
})(OutboxMailModal);


