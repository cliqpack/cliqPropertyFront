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
    deleteReminderFresh, deleteReminder, getReminder
} from "store/actions";

import toastr from "toastr";
import { Link, useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";

import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import SingleButton from "common/Button/SingleButton";

function RemoveReminderSettings(props) {
    console.log(props.data);
    const [status, setStatus] = useState(false)

    useEffect(() => {
        if (props.delete_reminder_loading == 'Success') {
            toastr.success('Success');
            props.deleteReminderFresh()
            props.getReminder();
            setStatus(false)

            props.toggle()
        }
        if (props.delete_reminder_loading == 'Failed') {
            toastr.error('Failed')
            props.deleteReminderFresh()
            setStatus(false)


        }
    }, [props.delete_reminder_loading]);

    const deleteHandler = () => {
        setStatus(true)
        props.deleteReminder(props.data)
    }

    return (
        <>
            {/* <Loder status={showModal} /> */}
            <Modal isOpen={props.status} toggle={e => { props.toggle(); props.setActionArray([]) }}>
                <ModalHeader toggle={e => { props.toggle(); props.setActionArray([]) }}>
                    {/* <i className="bx bx-task text-primary"></i>&nbsp; */}
                    <span >Permanently remove 1 Reminder</span>
                </ModalHeader>
                <div className="d-flex justify-content-end pe-3 pt-3">
                    {/* <Button color="secondary" className="me-1" onClick={props.toggle}>Cancel</Button> */}
                    <SingleButton color="danger" handler={e => { props.toggle(); props.setActionArray([]) }} text='Cancel' marginEndIcon='me-2' marginEnd='me-1'
                    />


                    {/* <Button color="info" onClick={deleteHandler}>Ok</Button> */}
                    <SingleButton color="info" handler={deleteHandler} text='Ok' marginStart='ms-1' />
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
    const { delete_reminder_loading
    } = gstate.Portfolio;



    return {
        delete_reminder_loading
    };
};
export default connect(mapStateToProps, {
    deleteReminderFresh, deleteReminder, getReminder
})(RemoveReminderSettings);
