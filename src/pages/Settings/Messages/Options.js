import moment from "moment";
import React, { useEffect, useState } from "react";
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
    FormGroup,
    FormText, Tooltip
} from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { connect } from "react-redux";
import Select from "react-select";

import {
    getMessageOptions, addMessageOptions, addMessageOptionsFresh, getMessageOptionsData
} from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";
// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import PortfolioEmailChange from "./PortfolioEmailChange";

const Options = props => {
    const [state, setState] = useState({
        leftBtn: true, middletBtn: false, rightBtn: false, value: 'Moment', smsName: 'MomentGroup',
        optionBehaviour: [
            { label: 'Reply to Portfolio', value: 'Reply to Portfolio' },
            { label: 'Reply to User', value: 'Reply to User' },
            { label: 'Custom reply to', value: 'Custom reply to' },
        ],
        emailModal: false, init: true
    });
    console.log(state);

    const emailModalToggle = () => setState({ ...state, emailModal: !state.emailModal })

    const handleSave = e => {
        e.preventDefault();
        props.addMessageOptions(state)
    };

    useEffect(() => {

        if (state.init) {
            console.log('--in---');
            props.getMessageOptions()
            props.getMessageOptionsData()
            setState({ ...state, init: false })
        }
        if (props.add_message_option_loading == 'Success') {
            toastr.success('Success')
            props.addMessageOptionsFresh();
            props.getMessageOptions()

        }
    }, [props.add_message_option_loading,]);
    console.log(props.msg_options_email_data?.data);

    useEffect(() => {
        if (props.all_settings_message?.data?.data) {
            const { email_from_name_type, sending_behaviour } = props.all_settings_message?.data?.data
            setState({
                ...state,
                leftBtn: email_from_name_type == 'User and Company Name' ? true : false,
                middletBtn: email_from_name_type == 'User Name' ? true : false,
                rightBtn: email_from_name_type == 'Company Name' ? true : false,
                selectedBehaviour: { label: sending_behaviour, value: sending_behaviour }
            })
        }
    }, [props.all_settings_message?.data?.data])

    console.log(props.all_settings_message?.data);

    const togglePositionBtn = data => {

        setState(prev => ({
            ...prev,
            leftBtn: data == '1' ? true : false, middletBtn: data == '2' ? true : false, rightBtn: data == '3' ? true : false,
            emailFromData: data == '1' ? 'User and Company' : data == '2' ? 'User' : data == '3' ? 'Company' : ''

        }))

    }
    const stateHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSelectGroupBehaviour = e => {
        setState({ ...state, selectedBehaviour: e })
    }


    return (
        <>
            <div className="page-content">
                <Card>
                    <CardBody>
                        <h4 className="ms-2 text-primary mb-4">Message Options
                        </h4>
                        <div
                            className="w-100 mt-2 mb-4"
                            style={{
                                borderBottom: "1.2px dotted #c9c7c7",
                            }}
                        ></div>
                        <Row>
                            <Col md={9}>
                                <h5 className="ms-2 text-primary mb-4">Email
                                </h5>
                                <div
                                    className="w-100 mt-2 mb-4"
                                    style={{
                                        borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                ></div>
                                <Row className="py-3">
                                    <Col md={4} className="d-flex justify-content-center align-items-top">
                                        Email from name

                                    </Col>
                                    <Col md={8} className="d-flex flex-column">
                                        <div className="btn-group btn-group-justified">
                                            <div className="btn-group">
                                                <Button
                                                    color={state.leftBtn ? "secondary" : "light"}
                                                    onClick={() => togglePositionBtn('1')}
                                                >
                                                    {state.leftBtn ? (
                                                        <i className="bx bx-comment-check"></i>
                                                    ) : null}
                                                    <span> User and Company Name</span>
                                                </Button>
                                            </div>
                                            <div className="btn-group">
                                                <Button
                                                    color={state.middletBtn ? "secondary" : "light"}
                                                    onClick={() => togglePositionBtn('2')}
                                                >
                                                    {state.middletBtn ? (
                                                        <i className="bx bx-comment-check"></i>
                                                    ) : null}
                                                    <span>User Name</span>
                                                </Button>
                                            </div>
                                            <div className="btn-group">
                                                <Button
                                                    color={state.rightBtn ? "secondary" : "light"}
                                                    onClick={() => togglePositionBtn('3')}
                                                >
                                                    {state.rightBtn ? (
                                                        <i className="bx bx-comment-check"></i>
                                                    ) : null}
                                                    <span> Company Name</span>
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-muted">Email will be sent as:</p>
                                            {/* <p>{`Lisa Qi - Moment Pty Ltd <Moment@email.propertyme.com>`}</p> */}
                                            {state.leftBtn && <p>{`${props.msg_options_email_data?.data?.userName} - ${props.msg_options_email_data?.data?.companyName} <${props.all_settings_message?.data?.data?.message_setting?.portfolio_email}@myday.biz>`}</p>}
                                            {state.middletBtn && <p>{`${props.msg_options_email_data?.data?.userName} - <${props.all_settings_message?.data?.data?.message_setting?.portfolio_email}@myday.biz>`}</p>}
                                            {state.rightBtn && <p>{`${props.msg_options_email_data?.data?.companyName} <${props.all_settings_message?.data?.data?.message_setting?.portfolio_email}@myday.biz>`}
                                            </p>}
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="py-3">
                                    <Col md={4} className="d-flex justify-content-center align-items-top">Portfolio email</Col>
                                    <Col md={8} className="d-flex justify-content-start align-items-center">
                                        <input
                                            className="form-control w-25"
                                            type="text"
                                            name="label_name"
                                            // placeholder="Enter new file name"
                                            disabled='true'
                                            value={props.all_settings_message?.data?.data?.message_setting?.portfolio_email}
                                            onChange={stateHandler}
                                        />
                                        <span className="me-4 text-muted">@myday.biz</span>
                                        <Button color="secondary" onClick={emailModalToggle}>Change</Button>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4} className="d-flex justify-content-center align-items-top">Sending behaviour</Col>
                                    <Col md={8}>
                                        <Select
                                            value={state.selectedBehaviour}
                                            onChange={e => { handleSelectGroupBehaviour(e) }}
                                            options={state.optionBehaviour}
                                            classNamePrefix="select2-selection"
                                        />
                                        <span className="text-muted">Reply emails will be sent to your Portfolio email address above.</span>
                                    </Col>
                                </Row>

                                <div className="d-flex justify-content-end my-2 mt-2">
                                    <Button color="info" onClick={handleSave}>
                                        <i className="fas fa-file-alt me-1"></i>Save</Button>
                                </div>

                                <h5 className="ms-2 text-primary my-4">SMS
                                </h5>
                                <div
                                    className="w-100 mt-2 mb-4"
                                    style={{
                                        borderBottom: "1.2px dotted #c9c7c7",
                                    }}
                                ></div>
                                <Row className="py-3">
                                    <Col md={4} className="d-flex justify-content-center align-items-top">SMS from name</Col>
                                    <Col md={8} className="d-flex justify-content-start align-items-center">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="label_name"
                                            // placeholder="Enter new file name"
                                            disabled='true'
                                            value={state.smsName}
                                            onChange={stateHandler}
                                        />
                                        <Tooltip
                                            placement="right"
                                            isOpen={state.ttright}
                                            target="TooltipRight"
                                            toggle={() =>
                                                setState({ ...state, ttright: !state.ttright })
                                            }
                                        >
                                            To update your SMS from name, have the Subscriber of your Portfolio contact our support team.

                                        </Tooltip>
                                        <div
                                            id="TooltipRight"
                                        >
                                            <i className="fas fa-info-circle ms-2" />

                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </CardBody>
                </Card>
            </div>
            <PortfolioEmailChange status={state.emailModal} toggle={emailModalToggle} msg_id={props.all_settings_message?.data?.data?.id} email={props.all_settings_message?.data?.data?.email_will_be_sent_as} />
        </>
    );
};
const mapStateToProps = gstate => {
    const { all_settings_message, add_message_option_loading, msg_options_email_data } = gstate.Document;

    return { all_settings_message, add_message_option_loading, msg_options_email_data };
};
export default connect(mapStateToProps, {
    getMessageOptions, addMessageOptions, addMessageOptionsFresh, getMessageOptionsData
})(Options);
