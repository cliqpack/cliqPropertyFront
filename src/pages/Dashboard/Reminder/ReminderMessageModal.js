import moment from 'moment';
import React, { useEffect, useState } from 'react';
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
    FormGroup, FormText, Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import { connect } from "react-redux";

import {
    getMessageTemplatesForJobsBySelect, sendMailFromTemplatesInJobs, sendMailFromTemplatesInJobsFresh, jobAllActivity, searchTemplatesFromInspection, sendSMSFromTemplatesInJobs,
    sendSMSFromTemplatesInJobsFresh,
    getMessageTemplatesForRemindersBySelect, sendMailFromTemplatesInReminders, sendMailFromTemplatesInRemindersFresh
} from 'store/actions';

import Select from "react-select"

import toastr from "toastr";
import { useHistory } from 'react-router-dom';
import Loder from 'components/Loder/Loder';

const ReminderMessageModal = (props) => {
    const [dd, setDD] = useState(false)
    const [state, setState] = useState({
        selectedBtn: [
            { label: "Owner", value: "Owner" },
            { label: "Tenant", value: "Tenant" },
            { label: "Supplier", value: "Supplier" }
        ], optionBtn: [
            { label: "Owner", value: "Owner" },
            { label: "Tenant", value: "Tenant" },
            { label: "Supplier", value: "Supplier" }
        ],
        selectShowBtnData: false
    });
    const [button, setButton] = useState({
        tenancyYesBtn: true, ownerBtn: true, tenantBtn: true, supplierBtn: true
    })

    console.log(props.data);
    const [status, setStatus] = useState(false)

    const clickHandler = (id, sub) => {
        // console.log(type);
        // if (type == 'sms') {

        // } else {
        // }
        props.sendMailFromTemplatesInReminders(id, sub, props.data);
    }

    const handleSelectBtn = e => {
        setState({ ...state, selectedBtn: e, selectShowBtnData: true });
        props.getMessageTemplatesForRemindersBySelect(e, null)

    }

    const searchHandler = e => {
        setState({ ...state, ['search']: e.target.value });
        props.getMessageTemplatesForRemindersBySelect(state.selectedBtn, e.target.value)

    }

    useEffect(() => {
        if (props.smta_reminders_loading === 'Success') {
            toastr.success("Success");
            props.sendMailFromTemplatesInRemindersFresh();
            // props.jobAllActivity(props.jobId);
            props.toggle();
        }
        if (props.data) {
            props.getMessageTemplatesForRemindersBySelect(state.selectedBtn, null)
        }

    }, [props.smta_reminders_loading])
    console.log(props.gmtfrbs_data?.data?.data);


    return (
        <>
            {/* ===============Inspection modal start from here ================*/}

            <Modal isOpen={props.msgModal} toggle={props.toggle}>
                {/* <ModalHeader toggle={props.toggle}>
          Messages
        </ModalHeader> */}

                <ModalBody>
                    <div>
                        {/* <div className='bg-light rounded'> */}
                        <div className=''>
                            <div className="search-box py-2">
                                <div className="position-relative">
                                    <input
                                        type="text"
                                        className="form-control rounded bg-light border-light"
                                        placeholder="Search..."
                                        onChange={searchHandler}

                                    />
                                    <i className="mdi mdi-magnify search-icon"></i>
                                </div>
                            </div>
                            <Row className='px-2 py-3'>
                                <Col md={3} className=''>

                                </Col>
                                <Col md={9} className=''>

                                    <div>
                                        <Select
                                            value={state.selectedBtn}
                                            isMulti={true}
                                            onChange={handleSelectBtn}
                                            options={state.optionBtn}
                                            classNamePrefix="select2-selection"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div
                            style={{ borderBottom: "1.2px dotted #c9c7c7" }}
                        />
                        <Row className='mt-3'>
                            <Col sm="12">
                                <CardText className="mb-0">
                                    {/* {state.selectShowBtnData == false &&
                    <ul style={{ listStyle: 'none' }}>
                      {props.inspec_msg_temp_all_data.data.map((item, i) =>
                        <li key={i} className='py-2' style={{ cursor: 'pointer' }}>

                          <Row>
                            <Col md={2}>
                              <i className='bx bx-group font-size-16' />
                            </Col>
                            <Col md={7}><span className='text-primary' onClick={() => clickHandler(item?.id, item?.subject)}>{item?.subject}</span></Col>
                            <Col md={3}>
                              <i className='fas fa-envelope me-1' />


                            </Col>
                          </Row>
                        </li>
                      )}
                    </ul>} */}



                                    <ul style={{ listStyle: 'none' }}>
                                        {props.gmtfrbs_data?.data?.data.map((item, i) =>
                                            <li key={i} className='py-2' style={{ cursor: 'pointer' }} onClick={() => clickHandler(item?.id, item?.subject)}>
                                                <Row>
                                                    <Col md={2}>
                                                        {item.message_trigger_to == 'Owner' &&
                                                            <i className='bx bx-home-circle font-size-16' />
                                                        }
                                                        {item.message_trigger_to == 'Tenant' &&
                                                            <i className='bx bx-group font-size-16' />}
                                                        {item.message_trigger_to == 'Supplier' &&
                                                            <i className='bx bx-user-plus font-size-16' />}
                                                    </Col>
                                                    <Col md={7}><span className='text-primary' >{item?.subject}</span></Col>
                                                    <Col md={3} className='d-flex justify-content-center align-items-center'>
                                                        {item.type == 'email' && <i className='fas fa-envelope mx-1' />}
                                                        {item.type == 'sms' && <i className='fas fa-mobile-alt mx-1' />}
                                                    </Col>
                                                </Row>
                                            </li>
                                        )}
                                    </ul>
                                </CardText>
                            </Col>
                        </Row>
                    </div>
                </ModalBody>
                {/* <ModalFooter>
                    <Button color="primary"  >
                        <i className="fas fa-file-alt me-1"></i>Save
                    </Button>
                    <Button color="primary" >
                        <i className="fas fa-file-alt me-1"></i>Save & Open
                    </Button>

                </ModalFooter> */}
            </Modal>
            {status && <Loder status={status} />}

            {/* ===============Inspection modal ends here ================*/}
        </>

    )
}
const mapStateToProps = gstate => {
    const {
        gmtfjbs_data, gmtfjbs_loading, smta_jobs_data, smta_jobs_loading, send_sms_template_jobs_data,
        send_sms_template_jobs_loading
    } = gstate.Jobs;

    const {
        gmtfrbs_data
    } = gstate.Portfolio;

    return {
        gmtfjbs_data, gmtfjbs_loading, smta_jobs_data, smta_jobs_loading, send_sms_template_jobs_data,
        send_sms_template_jobs_loading,

        gmtfrbs_data


    };
};
export default connect(mapStateToProps, {
    getMessageTemplatesForJobsBySelect, sendMailFromTemplatesInJobs, sendMailFromTemplatesInJobsFresh,
    jobAllActivity, searchTemplatesFromInspection, sendSMSFromTemplatesInJobs,
    sendSMSFromTemplatesInJobsFresh,
    getMessageTemplatesForRemindersBySelect, sendMailFromTemplatesInReminders, sendMailFromTemplatesInRemindersFresh
})(ReminderMessageModal);


