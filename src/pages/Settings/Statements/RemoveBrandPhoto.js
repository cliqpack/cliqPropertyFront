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
    removeBrandImage, removeBrandImageFresh

} from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";
// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const RemoveBrandPhoto = props => {
    const [state, setState] = useState({});

    const handleSave = e => {
        e.preventDefault();
        props.removeBrandImage()
    };

    useEffect(() => {

    }, []);

    return (
        <>
            <Modal
                isOpen={props.status}
                toggle={props.toggle}
                scrollable={true}
                size="lg"
            >
                <ModalHeader toggle={props.toggle}></ModalHeader>

                <ModalBody>
                    <Row>
                        <Col lg={12}>Are you sure you want to delete this logo image?</Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={props.toggle}>
                        Cancel
                    </Button>
                    <Button color="info" onClick={props.handler}>
                        Ok
                    </Button>
                </ModalFooter>
            </Modal>

            {/* ===============Inspection modal ends here ================*/}
        </>
    );
};
const mapStateToProps = gstate => {
    const { rmv_brand_img_loading } = gstate.Portfolio;

    return { rmv_brand_img_loading };
};
export default connect(mapStateToProps, {
    removeBrandImage, removeBrandImageFresh
})(RemoveBrandPhoto);
