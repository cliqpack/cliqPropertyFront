import moment from "moment";
import React, { useEffect, useState } from "react";
import Select from "react-select";
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
import { connect } from "react-redux";

import {
    deletePropertyReminder, deletePropertyReminderFresh, getPropertyReminder

} from "store/actions";

import toastr from "toastr";
import { Link, useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";

import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

function RemoveReminder(props) {
    // console.log(props.state.activeTab);
    const { id } = useParams();
    const [status, setStatus] = useState(false)

    useEffect(() => {
        if (props.delete_property_reminder_loading == 'Success') {
            toastr.error('Deleted')
            props.deletePropertyReminderFresh();
            if (props.text == 'All') {
                console.log('All');
                props.toggleTab()
            } else {
                props.getPropertyReminder(id);

            }
            props.setActionArray([])
            // props.setSelected([])
            setStatus(false)

            props.toggle();
        }
        if (props.delete_property_reminder_loading == 'Failed') {
            toastr.error('Failed')
            props.deletePropertyReminderFresh()
            setStatus(false)

        }
    }, [props.delete_property_reminder_loading]);

    const deleteHandler = () => {
        setStatus(true)
        props.deletePropertyReminder(props.data)
    }

    return (
        <>
            {/* <Loder status={showModal} /> */}
            <Modal isOpen={props.status} toggle={e => { props.toggle() }}>
                <ModalHeader toggle={e => { props.toggle() }}>
                    {/* <i className="bx bx-task text-primary"></i>&nbsp; */}
                    <span >Permanently remove 1 Reminder</span>
                </ModalHeader>
                <div className="d-flex justify-content-end pe-3 pt-3">
                    <Button color="danger" className="me-1" onClick={e => { props.toggle(); props.setActionArray([]) }}>Cancel</Button>
                    <Button color="info" onClick={deleteHandler}>Ok</Button>
                </div>
                <ModalBody>

                </ModalBody>
                {/* <ModalFooter>

                </ModalFooter> */}
            </Modal>
            {status && <Loder status={status} />}

            {/* ===============Inspection modal ends here ================*/}
        </>
    );
}
const mapStateToProps = gstate => {
    const {
        delete_property_reminder_loading
    } = gstate.Portfolio;



    return {
        delete_property_reminder_loading
    };
};
export default connect(mapStateToProps, {
    deletePropertyReminder, deletePropertyReminderFresh, getPropertyReminder
})(RemoveReminder);
