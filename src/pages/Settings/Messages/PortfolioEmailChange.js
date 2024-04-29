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
    FormText,
} from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { connect } from "react-redux";
import Select from "react-select";

import {
    changeEmailSettings, changeEmailSettingsFresh, getMessageOptions

} from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";
// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const PortfolioEmailChange = props => {
    const [state, setState] = useState({ checked: false });

    const checkToggle = () => setState({ ...state, checked: !state.checked })

    const handleSave = e => {
        e.preventDefault();
        props.changeEmailSettings(props.msg_id, state)

    };

    useEffect(() => {
        if (props.change_email_settings_loading == 'Success') {
            toastr.success('Success')
            props.changeEmailSettingsFresh();
            props.getMessageOptions();
            props.toggle()
        }
        if (props.change_email_settings_loading == 'Failed') {
            toastr.error('Failed! Enter Unique Email address')
            props.changeEmailSettingsFresh();
        }

    }, [props.change_email_settings_loading]);
    const stateHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };


    return (
        <>
            <Modal
                isOpen={props.status}
                toggle={props.toggle}
                scrollable={true}
                size="lg"
            >
                <ModalHeader toggle={props.toggle} ><span className="text-info"><i className="fas fa-cog me-1" /> <span className="font-size-18">Change Email</span></span>

                </ModalHeader>


                <ModalBody>
                    <Row>
                        <Col md={12} className="px-4">
                            <p className="text-muted">To continue you must unregister the current email:</p>
                            <p className="fw-bold font-size-18">{props.email}@myday.biz </p>
                            <p className="text-muted">You will no longer receive email sent to this address and unreceived messages may bounce.</p>
                            {/* <div className="form-check my-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="exampleRadios"
                                    id="exampleRadios1"
                                    value="option1"
                                    // defaultChecked
                                    checked={state.checked}
                                    onClick={checkToggle}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="exampleRadios1"
                                >
                                    Unregister Moment@email.propertyme.com
                                </label>
                            </div> */}
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="defaultCheck1"
                                    checked={state.checked}
                                    onChange={checkToggle}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="defaultCheck1"
                                >
                                    Unregister {props.email}@myday.biz

                                </label>
                            </div>
                            {state.checked &&
                                <Row className="my-3">
                                    <Col md={3} className="d-flex justify-content-center">
                                        New Email
                                    </Col>
                                    <Col md={9} className="d-flex justify-content-start align-items-center">
                                        <div className="w-50 d-flex">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="email"
                                                // placeholder="Enter new file name"
                                                value={state.email}
                                                onChange={stateHandler}
                                            />
                                        </div>
                                        <div>
                                            @myday.biz
                                        </div>
                                    </Col>
                                </Row>}
                        </Col>

                    </Row>
                </ModalBody>

                <ModalFooter>
                    <Button color="info" onClick={props.toggle}>
                        Cancel
                    </Button>
                    <Button color="info" onClick={handleSave} disabled={state.email ? false : true}>
                        Change
                    </Button>
                </ModalFooter>
            </Modal>

            {/* ===============Inspection modal ends here ================*/}
        </>
    );
};
const mapStateToProps = gstate => {
    const { change_email_settings_loading } = gstate.Document;

    return { change_email_settings_loading };
};
export default connect(mapStateToProps, {
    changeEmailSettings, changeEmailSettingsFresh, getMessageOptions
})(PortfolioEmailChange);
