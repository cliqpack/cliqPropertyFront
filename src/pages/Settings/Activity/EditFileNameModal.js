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
    editDocumentForSettings, editDocumentForSettingsFresh, getAllDocumentsForSettings
} from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";
// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const EditFileNameModal = props => {
    const [state, setState] = useState({ label_name: props.data?.name });

    const handleSave = e => {
        e.preventDefault();
        props.editDocumentForSettings(state, props.data, props.data?.id)
    };

    useEffect(() => {
        if (props.edit_settings_doc_loading == 'Success') {
            toastr.success('Success');
            props.editDocumentForSettingsFresh()
            props.getAllDocumentsForSettings()
            // props.tabCall(props.state.activeTab == 1 ? 'Uploaded' : 'Generated')
            props.selectRowHandler()
            props.tabCall()
            props.toggle()
        }
        if (props.edit_settings_doc_loading == 'Failed') {
            toastr.error('Failed')
            props.editDocumentForSettingsFresh()

        }
    }, [props.edit_settings_doc_loading]);

    console.log(props.edit_settings_doc_loading);

    const stateHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    console.log(props.data);

    return (
        <>
            <Modal
                isOpen={props.status}
                toggle={props.toggle}
                scrollable={true}
                size="lg"
            >
                <ModalHeader className="text-info" toggle={props.toggle}>
                    <span className="text-info">Edit {props.data?.name} file name</span>
                </ModalHeader>

                <ModalBody>

                    <Row className="py-2">

                        <Col md={12} className="">
                            <div className="">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="label_name"
                                    placeholder="Enter new file name"
                                    value={state.label_name}
                                    onChange={stateHandler}
                                />
                            </div>
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={props.toggle}>
                        Cancel
                    </Button>
                    <Button disabled={state.value ? true : false} color="info" onClick={handleSave}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>

            {/* ===============Inspection modal ends here ================*/}
        </>
    );
};
const mapStateToProps = gstate => {
    const { edit_settings_doc_loading } = gstate.Document;

    return { edit_settings_doc_loading };
};
export default connect(mapStateToProps, {
    editDocumentForSettings, editDocumentForSettingsFresh, getAllDocumentsForSettings
})(EditFileNameModal);
