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
    addReminder,
    addReminderFresh,
    SupplierList,
    getReminder,
    editReminder,
    editReminderFresh,
    addReminderProperty,
    addReminderPropertyFresh,
    getReminderProperty,
    getAllReminderProperty,
    editReminderProperty,
    editReminderPropertyFresh,
    getPropertyReminder,
    propertyList,
    getAllReminders,
    completeReminderFresh,
    completeReminder, addReminderImage, addReminderImageFresh
} from "store/actions";

import toastr from "toastr";
import { useHistory, useParams, Link } from "react-router-dom";
import Loder from "components/Loder/Loder";
import Switch from "react-switch";
// Form Editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import Flatpickr from "react-flatpickr";
import DragAndDrop from "common/DragAndDrop/DragAndDrop";

const AddReminder = (props) => {
    const { id } = useParams();
    const [state, setState] = useState({
        propertyBtn: false,
        ownerBtn: false,
        supplierBtn: false,
        monthsBtn: false,
        weekBtn: false,
        activeBtn: false,
        init: true,
    });
    console.log(state);
    console.log(props.data);
    const [status, setStatus] = useState(false)

    const [state2, setState2] = useState({ optionSupplier: [] });
    const [file, setFile] = useState('')
    // console.log(file);
    const [form1state, setForm1State] = useState({
        switch1: true,
        switch2: false,
        selectedFiles: [],
    });

    const stateHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const toggleWeekBtn = () => {
        setState({
            ...state,
            monthsBtn: false,
            weekBtn: true,
            frequency_type: state.frequency > 1 ? "months" : "month",
        });
    };
    const toggleMonthsBtn = () => {
        setState({
            ...state,
            monthsBtn: true,
            weekBtn: false,
            frequency_type: state.frequency > 1 ? "weeks" : "week",
        });
    };

    const toggleSupplierBtn = () => {
        setState({
            ...state,
            propertyBtn: false,
            ownerBtn: false,
            supplierBtn: true,
            default_contact: "supplier",
        });
    };

    const togglePropertyBtn = () => {
        setState({
            ...state,
            propertyBtn: true,
            ownerBtn: false,
            supplierBtn: false,
            default_contact: 'Property Manager'
        });
    };

    const toggleOwnerBtn = () => {
        setState({
            ...state,
            propertyBtn: false,
            ownerBtn: true,
            supplierBtn: false,
            default_contact: 'Owner'
        });
    };

    const handleSave = () => {
        setStatus(true)
        props.addReminderProperty(state, state2, id);
    };
    const handleEdit = () => {
        setStatus(true)
        props.editReminderProperty(
            state,
            state2,
            props.data?.property_id,
            props.data.id,
            file
        );
    };

    useEffect(() => {
        if (props.reminderImgAddLoading == 'Success') {
            toastr.success('Success')
            props.addReminderImageFresh()
            props.toggleTab()
            setStatus(false)

            props.toggle();

        }
        if (props.reminderImgAddLoading == 'Failed') {
            toastr.succeerrorss('Failed')
            props.addReminderImageFresh()
            setStatus(false)

        }
        if (props.complete_reminder_loading == "Success") {
            toastr.success("Success");
            props.completeReminderFresh();
            props.getPropertyReminder();
            // props.setActionArray([]);
            setStatus(false)

            props.toggle();
        }
        if (props.complete_reminder_loading == "Failed") {
            toastr.error("Failed");
            props.completeReminderFresh();
            setStatus(false)

        }
        if (props.add_reminder_property_loading == "Success") {
            toastr.success("Success");
            props.addReminderPropertyFresh();
            props.toggleTab()

            props.setActionArray([]);
            setStatus(false)

            props.toggle();
        }
        if (props.add_reminder_property_loading == "Failed") {
            toastr.error("Failed");
            props.addReminderPropertyFresh();
            setStatus(false)

            props.toggle();
        }

        if (props.edit_reminder_property_loading == "Success") {
            toastr.success("Success");
            props.editReminderPropertyFresh();
            props.toggleTab()

            setStatus(false)

            props.toggle();
            props.setActionArray([]);
        }
        if (props.edit_reminder_property_loading == "Failed") {
            toastr.error("Failed");
            props.editReminderPropertyFresh();
            setStatus(false)

        }

        if (state.init) {
            props.SupplierList();
            props.getReminderProperty();
            props.propertyList();
            setState({ ...state, init: false });
        }

        let option;
        if (props.supplier_list_data) {
            option = props.supplier_list_data?.data?.map((item) => ({
                label: item.reference,
                value: item.id,
            }));
            setState2((prev) => ({ ...prev, optionSupplier: option }));
        }

        let option1;
        if (props.reminders_property_data) {
            option1 = props.reminders_property_data?.data?.map((item) => ({
                label: item.name,
                value: item.id,
            }));
            setState2((prev) => ({ ...prev, optionReminder: option1 }));
        }

        let option2;
        if (props.property_list_data) {
            option2 = props.property_list_data?.data?.map((item) => ({
                label: item.reference,
                value: item.id,
            }));
            setState2((prev) => ({ ...prev, optionProperty: option2 }));
        }

        if (props.data?.id) {
            setState((prev) => ({
                ...prev,
                name: props.data.name,
                default_frequency: props.data.default_frequency,
                supplierBtn: props.data.contact == "supplier" ? true : false,
                ownerBtn: props.data.contact == "Owner" ? true : false,
                propertyBtn: props.data.contact == "Property Manager" ? true : false,
                frequency_type:
                    props.data.frequency_type == "weeks" ? "weeks" : "months",
                frequency: props.data.frequency,
                monthsBtn: props.data.frequency_type == "months" ? true : false,
                weekBtn: props.data.frequency_type == "weeks" ? true : false,
                activeBtn: props.data.status == "1" ? true : false,
                due: props.data.due,
                certificate_expiry: props.data.certificate_expiry,
                notes: props.data.notes,
                default_contact: props.data.contact,
                status: props.data.status,
            }));

            setState2((prev) => ({
                ...prev,
                selectedSupplier: {
                    label: props.data?.supplier?.reference,
                    value: props.data?.supplier?.id,
                },
                selectedReminder: {
                    label: props.data.name,
                    value: props.data.reminder_setting_id,
                },
            }));
        }
    }, [
        props.add_reminder_property_loading,
        props.supplier_list_data,
        props.edit_reminder_property_loading,
        props.data?.id,
        props.reminders_property_data,
        props.property_list_data,
        props.complete_reminder_loading, props.reminderImgAddLoading
    ]);
    console.log(props.complete_reminder_loading);

    const handleSelectSupplier = (e) => {
        setState2({ ...state2, selectedSupplier: e });
    };

    const handleSelectProperty = (e) => {
        setState2({ ...state2, selectedProperty: e });
    };

    const handleSelectReminder = (e) => {
        setState2({ ...state2, selectedReminder: e });
        let data = props.reminders_property_data?.data.filter(
            (item) => e.value == item.id
        );
        if (data) {

            setState((prev) => ({
                ...prev,
                frequency: data[0].default_frequency,
                weekBtn: data[0]?.frequency_type == "weeks" ? true : false,
                monthsBtn: data[0]?.frequency_type == "months" ? true : false,
                frequency_type: data[0]?.frequency_type,
                default_contact: data[0]?.default_contact,
                propertyBtn: data[0]?.default_contact == "Property Manager" ? true : false,
                ownerBtn: data[0]?.default_contact == "Owner" ? true : false,
            }));
        }
        let supplier = props.reminders_property_data?.data.find(
            (item) => e.value == item.id
        );
        if (supplier.supplier) {
            setState((prev) => ({
                ...prev,
                supplierBtn: true,
                default_contact: "supplier",
            }));
            setState2((prev) => ({
                ...prev,
                selectedSupplier: {
                    label: supplier.supplier?.reference,
                    value: supplier.supplier?.id,
                },
            }));
        } else {
            setState((prev) => ({ ...prev, supplierBtn: false }));
            setState2((prev) => ({ ...prev, selectedSupplier: {} }));
        }
    };

    const dateHandler = (selectedDates, dateStr, instance) => {
        console.log(dateStr);
        setState({ ...state, ["due"]: dateStr });
    };
    const dateHandler1 = (selectedDates, dateStr, instance) => {
        console.log(dateStr);
        setState({ ...state, ["certificate_expiry"]: dateStr });
    };



    const completeHandler = () => {
        setStatus(true)

        props.completeReminder("Closed", props.data?.id);
    };

    const handleUploadImage = e => {
        setFile(e.target.files[0])
        props.addReminderImage(e.target.files, props.data.id)
    }
    const handleDropImage = e => {
        console.log(e.dataTransfer.files);
        setFile(e.dataTransfer.files[0])
        props.addReminderImage(e.dataTransfer.files, props.data.id)
    }

    return (
        <>
            <Modal
                isOpen={props.reminderModal}
                toggle={props.toggle}
                scrollable={true}
                size="lg"
            >
                <ModalHeader
                    toggle={(e) => {
                        props.toggle();
                        setState({
                            propertyBtn: false,
                            ownerBtn: false,
                            supplierBtn: false,
                            monthsBtn: false,
                            weekBtn: false,
                            activeBtn: false,
                            init: true,
                        });
                        props.setActionArray([]);
                    }}
                >
                    {props.data?.id
                        ? `Edit Reminder for ${props.data?.property_reference
                        }`
                        : "Add Reminder"}
                </ModalHeader>

                <ModalBody>
                    <Row>
                        <Col lg={12}>
                            {props.data?.id ? (
                                ""
                            ) : (
                                <Row className="py-3">
                                    <Col
                                        md={3}
                                        className="d-flex justify-content-start align-items-center ps-5"
                                    >
                                        Property
                                    </Col>
                                    <Col md={6}>
                                        <div className="">
                                            <Select
                                                value={state2.selectedProperty}
                                                onChange={handleSelectProperty}
                                                options={state2.optionProperty}
                                                isDisabled={state2.optionProperty?.length == 0 ? true : false}
                                                classNamePrefix="select2-selection"
                                                placeholder="Property..."
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            )}
                            <Row className="py-3">
                                <Col
                                    md={3}
                                    className="d-flex justify-content-start align-items-center ps-5"
                                >
                                    Reminder
                                </Col>
                                <Col md={6}>
                                    {props.data?.id ? (
                                        state.name
                                    ) : (
                                        <div className="">
                                            <Select
                                                value={state2.selectedReminder}
                                                onChange={handleSelectReminder}
                                                options={state2.optionReminder}
                                                isDisabled={state2.optionReminder?.length == 0 ? true : false}
                                                classNamePrefix="select2-selection"
                                                placeholder="Reminder name..."
                                            />
                                        </div>
                                    )}
                                </Col>
                            </Row>
                            {/* <Row className="py-3">
                                <Col
                                    md={3}
                                    className="d-flex justify-content-start  ps-5"
                                ></Col>
                                <Col md={8} className="">
                                    <i className="fas fa-info-circle me-1" />
                                    <span>
                                        Select optional defaults for contact and frequency. You can
                                        change these for individual properties
                                    </span>
                                </Col>
                            </Row> */}

                            <Row className="py-3">
                                <Col
                                    md={3}
                                    className="d-flex justify-content-start align-items-center ps-5"
                                >
                                    Contact
                                </Col>
                                <Col md={8} className="">
                                    <div className="btn-group btn-group-justified">
                                        <div className="btn-group">
                                            <Button
                                                color={state.supplierBtn ? "secondary" : "light"}
                                                onClick={toggleSupplierBtn}
                                            >
                                                {state.supplierBtn ? (
                                                    <i className="bx bx-comment-check"></i>
                                                ) : null}
                                                <span> Supplier</span>
                                            </Button>
                                        </div>
                                        <div className="btn-group">
                                            <Button
                                                color={state.propertyBtn ? "secondary" : "light"}
                                                onClick={togglePropertyBtn}
                                            >
                                                {state.propertyBtn ? (
                                                    <i className="bx bx-comment-check"></i>
                                                ) : null}
                                                <span> Property Manager</span>
                                            </Button>
                                        </div>
                                        <div className="btn-group">
                                            <Button
                                                color={state.ownerBtn ? "secondary" : "light"}
                                                onClick={toggleOwnerBtn}
                                            >
                                                {state.ownerBtn ? (
                                                    <i className="bx bx-comment-check"></i>
                                                ) : null}
                                                <span> Owner</span>
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {state.supplierBtn == true && (
                                <Row className="py-3">
                                    <Col
                                        md={3}
                                        className="d-flex justify-content-start align-items-center ps-5"
                                    >
                                        Supplier
                                    </Col>
                                    <Col md={6}>
                                        <div className="">
                                            <Select
                                                value={state2.selectedSupplier}
                                                onChange={handleSelectSupplier}
                                                options={state2.optionSupplier}
                                                isDisabled={state2.optionSupplier?.length == 0 ? true : false}
                                                classNamePrefix="select2-selection"
                                                placeholder="Select a Supplier..."
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            )}

                            {/* <Row className="py-3">
                                <Col
                                    md={3}
                                    className="d-flex justify-content-start align-items-center ps-5"
                                >
                                    Frequency
                                </Col>
                                <Col md={1}>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="frequency"
                                        value={state.frequency}
                                        placeholder=""
                                        onChange={stateHandler}
                                    />
                                </Col>
                                <Col md={4} className="">
                                    <div className="btn-group btn-group-justified">
                                        <div className="btn-group">
                                            <Button
                                                color={state.weekBtn ? "secondary" : "light"}
                                                onClick={toggleWeekBtn}
                                            >
                                                {state.weekBtn ? (
                                                    <i className="bx bx-comment-check"></i>
                                                ) : null}
                                                <span> Weeks</span>
                                            </Button>
                                        </div>
                                        <div className="btn-group">
                                            <Button
                                                color={state.monthsBtn ? "secondary" : "light"}
                                                onClick={toggleMonthsBtn}
                                            >
                                                {state.monthsBtn ? (
                                                    <i className="bx bx-comment-check"></i>
                                                ) : null}
                                                <span> Months</span>
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row> */}

                            <Row className="py-2">
                                <Col
                                    md={3}
                                    className="d-flex justify-content-start align-items-center ps-5"
                                >
                                    Due
                                </Col>
                                <Col md={9}>
                                    <div className="w-50">
                                        <Flatpickr
                                            className="form-control d-block"
                                            placeholder="Pick a Date..."
                                            value={state.due}
                                            // onChange={() => dateHandler()}
                                            options={{
                                                altInput: true,
                                                format: "d/m/Y",
                                                altFormat: "d/m/Y",
                                                onChange: dateHandler,
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="py-2">
                                <Col
                                    md={3}
                                    className="d-flex justify-content-start align-items-center ps-5"
                                >
                                    Certificate expiry
                                </Col>
                                <Col md={9}>
                                    <div className="w-50">
                                        <Flatpickr
                                            className="form-control d-block"
                                            placeholder="Pick a Date..."
                                            value={state.certificate_expiry}
                                            // onChange={() => dateHandler()}
                                            options={{
                                                altInput: true,
                                                format: "d/m/Y",
                                                altFormat: "d/m/Y",
                                                onChange: dateHandler1,
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="py-2">
                                <Col
                                    md={3}
                                    className="d-flex justify-content-start align-items-center ps-5"
                                >
                                    Notes
                                </Col>
                                <Col md={9}>
                                    <Input
                                        name="notes"
                                        type="textarea"
                                        rows="3"
                                        className="form-control"
                                        placeholder="Add notes related to the properties"
                                        value={state.notes}
                                        onChange={(e) =>
                                            setState({ ...state, ["notes"]: e.target.value })
                                        }
                                    />
                                </Col>
                            </Row>
                            {props.data?.job_id && (
                                <Row className="py-3">
                                    <Col
                                        md={3}
                                        className="d-flex justify-content-start align-items-center ps-5"
                                    >
                                        Job
                                    </Col>
                                    <Col md={9}>
                                        <Link to={`/maintenanceInfo/${props.data?.job_id}`}>
                                            {props.data?.job_id}
                                        </Link>
                                    </Col>
                                </Row>
                            )}
                            {props.data?.id && (
                                <Row>
                                    <Col
                                        md={3}
                                        className="d-flex justify-content-start align-items-center ps-5"
                                    >
                                        Attachment
                                    </Col>
                                    <Col md={9}>
                                        {/* <div>
                                            <Input
                                                className="form-control form-control-sm"
                                                type="file"
                                                id="formFile"
                                                onChange={handleChange}
                                                multiple="false"
                                            />
                                        </div> */}
                                        <DragAndDrop text='Drag and drop here' handleUploadImage={handleUploadImage} handleDropImage={handleDropImage}>
                                            <div className={props.data?.reminder_docs.length != 0 ? `d-flex justify-content-start align-items-start` : `d-flex justify-content-center align-items-center`}
                                                style={{
                                                    height: '100px',

                                                    border: "1px dashed grey",

                                                }}>

                                                {props.data?.reminder_docs.length != 0 ? <Row className="d-flex flex-column w-100">
                                                    {
                                                        props.data?.reminder_docs.map(element =>
                                                            <div key={element.id} className="ms-3 p-1" style={{ textDecoration: 'underline' }}>
                                                                <a
                                                                    href={
                                                                        process.env.REACT_APP_IMAGE +
                                                                        element.doc_path
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer noopener"
                                                                    style={{ fontSize: "14px" }}
                                                                    download={element.name}

                                                                >
                                                                    {element.name == null
                                                                        ? element.doc_path.slice(0, 40) +
                                                                        "..."
                                                                        : element.name} {(
                                                                            Number(element.file_size) / 1024
                                                                        ).toFixed(2) +
                                                                            " " +
                                                                            "kb"}
                                                                </a>
                                                            </div>)
                                                    }
                                                </Row> : 'Drag your file here'}

                                            </div>
                                        </DragAndDrop>
                                    </Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className="d-flex justify-content-end">
                    {props.data?.id && (
                        <div>
                            <Button color="info" onClick={completeHandler}>
                                <i className="far fa-check-square me-1" />
                                Complete
                            </Button>
                        </div>
                    )}
                    <div>
                        {props.data?.id ? (
                            <Button
                                color="danger"
                                onClick={(e) => {
                                    props.toggle();
                                    props.setActionArray([]);
                                }}
                            >
                                <i className="fas fa-times me-1"></i>Cancel
                            </Button>
                        ) : (
                            <Button
                                color="danger"
                                onClick={(e) => {
                                    props.toggle();
                                    setState({
                                        propertyBtn: false,
                                        ownerBtn: false,
                                        supplierBtn: false,
                                        monthsBtn: false,
                                        weekBtn: false,
                                        activeBtn: false,
                                        init: true,
                                    });
                                    props.setActionArray([]);
                                }}
                            >
                                <i className="fas fa-times me-1"></i>Cancel
                            </Button>
                        )}

                        {props.data?.id ? (
                            <Button className="ms-1" color="info" onClick={handleEdit}>
                                <i className="fas fa-file-alt me-1"></i> Save
                            </Button>
                        ) : (
                            <Button className="ms-1" color="info" onClick={handleSave}>
                                <i className="fas fa-file-alt me-1"></i> Save
                            </Button>
                        )}
                    </div>
                </ModalFooter>
            </Modal>
            {status && <Loder status={status} />}

            {/* ===============Inspection modal ends here ================*/}
        </>
    );
};
const mapStateToProps = (gstate) => {
    const {
        add_reminder_loading,
        edit_reminder_loading,
        add_reminder_property_loading,
        reminders_property_data,
        edit_reminder_property_loading,
        complete_reminder_loading, reminderImgAddLoading
    } = gstate.Portfolio;
    const { supplier_list_loading, supplier_list_data } = gstate.Jobs;

    const { property_list_data } = gstate.property;
    return {
        supplier_list_loading,
        supplier_list_data,

        add_reminder_loading,
        edit_reminder_loading,
        add_reminder_property_loading,
        reminders_property_data,
        edit_reminder_property_loading,
        property_list_data,
        complete_reminder_loading, reminderImgAddLoading
    };
};
export default connect(mapStateToProps, {
    addReminder,
    addReminderFresh,
    SupplierList,
    getReminder,
    editReminder,
    editReminderFresh,
    addReminderProperty,
    addReminderPropertyFresh,
    getAllReminderProperty,
    getReminderProperty,
    editReminderProperty,
    editReminderPropertyFresh,
    getPropertyReminder,
    propertyList,
    getAllReminders,
    completeReminderFresh,
    completeReminder, addReminderImage, addReminderImageFresh
})(AddReminder);
