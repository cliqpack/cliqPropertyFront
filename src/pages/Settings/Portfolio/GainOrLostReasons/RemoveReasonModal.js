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
    removeReason, reomveReasonFresh, getReasons

} from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";
// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const RemoveReasonModal = props => {
    const [state, setState] = useState({});

    const handleSave = e => {
        e.preventDefault();
        props.removeReason(data)
    };

    useEffect(() => {
        if (props.remove_reason_loading == 'Success') {
            toastr.success('Success');
            props.reomveReasonFresh();
            props.getReasons()
            props.toggle()
        }
    }, [props.remove_reason_loading]);

    console.log(props.data);

    const data = props.data.map(item => item.id);
    console.log(data);

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


                <ModalBody>
                    <Row>
                        <Col lg={12} className="text-warning">

                        </Col>

                    </Row>
                </ModalBody>

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
    const { remove_reason_loading } = gstate.Portfolio;

    return { remove_reason_loading };
};
export default connect(mapStateToProps, {
    removeReason, reomveReasonFresh, getReasons
})(RemoveReasonModal);
