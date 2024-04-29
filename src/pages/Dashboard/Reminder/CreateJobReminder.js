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
    createJobReminder, createJobReminderFresh, getJobPropertyAccess, addJobModal, addJobModalFresh, getAllReminders


} from "store/actions";

import toastr from "toastr";
import { Link, useHistory, useParams } from "react-router-dom";
import Loder from "components/Loder/Loder";

import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"


function CreateJobReminder(props) {
    console.log(props.data);
    console.log(props.data[0]?.property_id);

    const [state, setState] = useState({
        selectBtn: false, reminderBtn: true,
    })
    console.log(state);
    const [status, setStatus] = useState(false)

    const authUser = JSON.parse(localStorage.getItem("authUser"));
    console.log(authUser?.user?.id);


    const [report, setReport] = useState({
        reportBtn: "",
        accessBtn: "",
    });
    console.log(state);
    console.log(report);

    const [contactIds, setContactIds] = useState({});
    const [contactIdState, setContactIdState] = useState(true);
    const [init, setInit] = useState(true)

    useEffect(() => {
        if (props.job_modal_add_loading === "Success") {
            toastr.success("Job Added Successfully");
            props.addJobModalFresh();
            // props.tab('1')
            props.toggleTab()

            // props.setTable([])
            props.setSelected([])
            props.setActionArray([])
            setStatus(false)

            props.toggle()
        }
        if (props.job_modal_add_loading === "Failed") {
            toastr.error("Failed");
            props.addJobModalFresh();
            // props.toggle()            setStatus(false)

        }
        if (init) {
            props.getJobPropertyAccess(props.data[0]?.property_id);
            setInit(false)
        }

        if (props.create_job_reminder_loading == 'Success') {
            toastr.success('Success');
            props.createJobReminderFresh();
            props.setActionArray([])
            props.setSelected([])

            setStatus(false)

        }

        if (props.data) {
            setState({
                ...state, summary: props.data[0]?.name,
                due: props.data[0]?.due,
                property: props.data[0]?.property_id,
                // manager_id: props.data[0]?.property?.manager_id,
                manager_id: authUser?.user?.id,
                reminder_id: props.data[0]?.id

            })
        }
        if (
            props.job_property_access_data?.data?.owner[0] !== undefined &&
            props.job_property_access_data?.data?.tenant[0] === undefined
        ) {
            setReport({ reportBtn: "Owner", accessBtn: "Owner" });


        }
        if (
            props.job_property_access_data?.data?.tenant[0] !== undefined &&
            props.job_property_access_data?.data?.owner[0] !== undefined) {
            setReport({ reportBtn: "Tenant", accessBtn: "Tenant" });

        }
        if (
            props.job_property_access_data?.data?.owner[0] === undefined &&
            props.job_property_access_data?.data?.tenant[0] !== undefined
        ) {
            setReport({ reportBtn: "Tenant", accessBtn: "Tenant" });

            console.log('Tenant 2');

        }
        if (props.job_property_access_data && props.job_property_access_data.message === 'Successfull' && contactIdState) {
            setContactIdState(false);
            setContactIds({
                owner_id: props.job_property_access_data.data?.owner[0]?.id ? props.job_property_access_data.data?.owner[0]?.id : null,
                tenant_id: props.job_property_access_data?.data?.tenant[0]?.id ? props.job_property_access_data?.data?.tenant[0]?.id : null,
                tenant_email: props.job_property_access_data?.data?.tenant[0]?.email ? props.job_property_access_data?.data?.tenant[0]?.email : null,
                owner_email: props.job_property_access_data?.data?.owner[0]?.email ? props.job_property_access_data?.data?.owner[0]?.email : null,
            });
        }
    }, [props.data, props.create_job_reminder_loading, props.job_property_access_data, props.job_modal_add_loading]);

    const toggleSelectBtn = () => { setState({ ...state, selectBtn: true, reminderBtn: false }) }
    const toggleReminderBtn = () => { setState({ ...state, reminderBtn: true, selectBtn: false }) }

    const dateHandler = (selectedDates, dateStr, instance) => {
        console.log(dateStr);
        setState({ ...state, ['due_by']: dateStr });
    }

    const selectHandler = e => { setState({ ...state, [e.target.name]: e.target.value }) }

    const handler = () => {
        setStatus(true)
        props.addJobModal(state, report, contactIds);
    }

    const selectHandlerForReminderDue = e => {
        let date = moment(state.due).add(e.target.value, 'days').format('DD/MM/yyyy');
        console.log(date);
        setState({ ...state, due_by: date })
    }

    return (
        <>
            {/* <Loder status={showModal} /> */}
            <Modal isOpen={props.status} toggle={e => { props.toggle() }} >
                <ModalHeader toggle={e => { props.toggle() }}>
                    {/* <i className="bx bx-task text-primary"></i>&nbsp; */}
                    <span >Create Job for Reminder</span>
                </ModalHeader>

                <ModalBody>

                    <Row className="pb-2">
                        <Col md={4} className="d-flex justify-content-start align-items-center ps-5">Due date</Col>
                        <Col md={8}>
                            <div className="btn-group btn-group-justified">
                                <div className="btn-group">
                                    <Button
                                        color={state.selectBtn ? "secondary" : "light"}
                                        onClick={toggleSelectBtn}
                                    >
                                        {state.selectBtn ? (
                                            <i className="bx bx-comment-check"></i>
                                        ) : null}
                                        <span> Select date</span>
                                    </Button>
                                </div>
                                <div className="btn-group">
                                    <Button
                                        color={state.reminderBtn ? "secondary" : "light"}
                                        onClick={toggleReminderBtn}
                                    >
                                        {state.reminderBtn ? (
                                            <i className="bx bx-comment-check"></i>
                                        ) : null}
                                        <span> Reminder</span>
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="py-3">
                        <Col className="d-flex justify-content-start align-items-center ps-5" md={4}>Due by</Col>
                        {state.selectBtn ?
                            <Col md={8}>
                                <div className="w-50">
                                    <Flatpickr
                                        className="form-control d-block"
                                        placeholder="Pick a Date..."
                                        value={state.due_by}
                                        // onChange={() => dateHandler()}
                                        options={{
                                            altInput: true,
                                            format: "d/m/Y",
                                            altFormat: "d/m/Y",
                                            onChange: dateHandler
                                        }}
                                    />
                                </div>
                            </Col>
                            :
                            <Col md={8}>
                                <Row>
                                    <Col className="d-flex align-items-center" md={6}>Reminder due date +</Col>
                                    <Col className="d-flex align-items-center" md={3}>
                                        <div className="">
                                            <Input
                                                name="reminder_due"
                                                type="text"
                                                placeholder=""
                                                className="form-control"
                                                value={state.reminder_due}
                                                onChange={selectHandlerForReminderDue}
                                            />
                                        </div>
                                    </Col>
                                    <Col className="d-flex align-items-center" md={3}>days</Col>
                                </Row>
                            </Col>}
                    </Row>

                    <Row className="py-2">
                        <Col className="d-flex justify-content-start align-items-center ps-5" md={4}>Summary</Col>
                        <Col md={8}>
                            <div className="">
                                <Input
                                    name="summary"
                                    type="text"
                                    placeholder="Summary"
                                    className="form-control"
                                    value={state.summary}
                                    onChange={selectHandler}
                                />
                            </div>
                        </Col>
                    </Row>

                    <Row className="py-2">
                        <Col className="d-flex justify-content-start align-items-center ps-5" md={4}>Description</Col>
                        <Col md={8}>
                            <div className="">
                                <Input
                                    name="description"
                                    type="textarea"
                                    rows="5"
                                    className="form-control"
                                    placeholder="Description"
                                    value={state.description}
                                    onChange={selectHandler}
                                />
                            </div>
                        </Col>
                    </Row>

                    <Row className="py-2">
                        <Col className="d-flex justify-content-start align-items-center ps-5" md={4}>Work order notes
                        </Col>
                        <Col md={8}>
                            <div className="">
                                <Input
                                    name="notes"
                                    type="textarea"
                                    rows="3"
                                    className="form-control"
                                    placeholder="Supplier instructions"
                                    value={state.notes}
                                    onChange={selectHandler}
                                />
                            </div>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={e => { props.toggle(); props.setActionArray([]) }}>Cancel</Button>
                    <Button color="info" onClick={handler}>Save</Button>
                </ModalFooter>
            </Modal>
            {status && <Loder status={status} />}

            {/* ===============Inspection modal ends here ================*/}
        </>
    );
}
const mapStateToProps = gstate => {
    const {
        create_job_reminder_loading
    } = gstate.Portfolio;

    const {
        job_modal_add_loading,
        job_modal_add_id,

        job_property_access_data,
    } = gstate.Jobs;

    return {
        create_job_reminder_loading,
        job_modal_add_loading,
        job_modal_add_id,

        job_property_access_data,
    };
};
export default connect(mapStateToProps, {
    createJobReminder, createJobReminderFresh, getJobPropertyAccess, addJobModal, addJobModalFresh, getAllReminders
})(CreateJobReminder);
