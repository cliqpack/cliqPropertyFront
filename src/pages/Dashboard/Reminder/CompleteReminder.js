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
    deletePropertyReminder, deletePropertyReminderFresh, getPropertyReminder, completeReminderFresh, completeReminder, getAllReminders

} from "store/actions";

import toastr from "toastr";
import { Link, useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";

import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

function CompleteReminder(props) {
    console.log(props.data);

    useEffect(() => {
        if (props.complete_reminder_loading == 'Success') {
            toastr.success('Success');
            props.completeReminderFresh();
            // props.tab(props.state.activeTab)
            // props.setState({ ...props.state, activeTab: "1", completeReminder: false })
            props.toggleTab()
            props.setActionArray([])
            props.toggle()
            // props.getAllReminders('due')
        }
    }, [props.complete_reminder_loading]);

    const handler = () => {
        props.completeReminder('Closed', props.data)
    }

    return (
        <>
            {/* <Loder status={showModal} /> */}
            <Modal isOpen={props.status} toggle={e => { props.toggle(); props.setActionArray([]) }}>
                <ModalHeader toggle={e => { props.toggle(); props.setActionArray([]) }}>
                    {/* <i className="bx bx-task text-primary"></i>&nbsp; */}
                    <span >Mark {props.data?.length} Reminder Complete</span>
                </ModalHeader>
                <div className="d-flex justify-content-end pe-3 pt-3">
                    <Button color="secondary" className="me-1" onClick={e => { props.toggle(); props.setActionArray([]) }}>Cancel</Button>
                    <Button color="info" onClick={handler}>Ok</Button>
                </div>
                <ModalBody>

                </ModalBody>
                {/* <ModalFooter>

                </ModalFooter> */}
            </Modal>

            {/* ===============Inspection modal ends here ================*/}
        </>
    );
}
const mapStateToProps = gstate => {
    const {
        delete_property_reminder_loading, complete_reminder_loading
    } = gstate.Portfolio;



    return {
        delete_property_reminder_loading, complete_reminder_loading
    };
};
export default connect(mapStateToProps, {
    deletePropertyReminder, deletePropertyReminderFresh, getPropertyReminder, completeReminderFresh, completeReminder, getAllReminders
})(CompleteReminder);
