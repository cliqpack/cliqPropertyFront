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
    removeDocumentsForSettings, removeDocumentsForSettingsFresh

} from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";
// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const RemoveDocModal = props => {
    const [state, setState] = useState({});


    const handleSave = e => {
        e.preventDefault();
        props.removeDocumentsForSettings(props.data)
    };

    useEffect(() => {
        if (props.remove_settings_doc_loading == 'Success') {
            toastr.success('Success');
            props.removeDocumentsForSettingsFresh();
            // props.tabCall(props.state.activeTab == 1 ? 'Uploaded' : 'Generated')
            props.tabCall()
            props.selectRowHandler()
            props.toggle()
        }
        if (props.remove_settings_doc_loading == 'Failed') {
            toastr.error('Failed');
            props.removeDocumentsForSettingsFresh();
        }
    }, [props.remove_settings_doc_loading]);

    console.log(props.data);
    const data = props.data.map(item => item.id);
    console.log(props.data.map(item => item.name));

    return (
        <>
            <Modal
                isOpen={props.status}
                toggle={props.toggle}
                scrollable={true}
                size="lg"
            >
                <ModalHeader toggle={props.toggle}>Are you sure you want to delete the selected document?
                </ModalHeader>

                {props.tab == '2' &&
                    <ModalBody>
                        <Row>
                            <Col lg={12} className="text-warning">
                                Are you sure you want to delete {`${props.data?.length} ${props.data?.length > 2 ? 'doc' : 'docs'}`}? This document will no longer be available via Client Access and any link to it from a merge email will not longer work.
                            </Col>

                        </Row>
                    </ModalBody>
                }
                <ModalFooter>
                    <Button color="info" onClick={props.toggle}>
                        Cancel
                    </Button>
                    <Button color="info" onClick={handleSave}>
                        Ok
                    </Button>
                </ModalFooter>
            </Modal>

            {/* ===============Inspection modal ends here ================*/}
        </>
    );
};
const mapStateToProps = gstate => {
    const { remove_settings_doc_loading } = gstate.Document;

    return { remove_settings_doc_loading };
};
export default connect(mapStateToProps, {
    removeDocumentsForSettings, removeDocumentsForSettingsFresh
})(RemoveDocModal);
