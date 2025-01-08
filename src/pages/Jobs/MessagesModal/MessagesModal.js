import React, { useEffect, useState } from 'react';
import {
    Col,
    Row,
    CardText,
    Modal,
    ModalBody,
} from "reactstrap";
import { connect } from "react-redux";
import {
    getMessageTemplatesForJobsBySelect, sendMailFromTemplatesInJobs, sendMailFromTemplatesInJobsFresh, jobAllActivity, searchTemplatesFromInspection, sendSMSFromTemplatesInJobs,
    sendSMSFromTemplatesInJobsFresh
} from 'store/actions';
import Select from "react-select"
import toastr from "toastr";

const MessagesModal = (props) => {
    const [dd, setDD] = useState(false)
    const [state, setState] = useState({
        selectedBtn: [
            { label: "Owner", value: "Owner" },
            { label: "Tenant", value: "Tenant" },
            { label: "Supplier", value: "Supplier" },
            { label: "Agent", value: "Agent" }
        ], optionBtn: [
            { label: "Owner", value: "Owner" },
            { label: "Tenant", value: "Tenant" },
            { label: "Supplier", value: "Supplier" },
            { label: "Agent", value: "Agent" }
        ],
        selectShowBtnData: false
    });
    const [button, setButton] = useState({
        tenancyYesBtn: true, ownerBtn: true, tenantBtn: true, supplierBtn: true
    })

    const clickHandler = (id, sub) => {
        props.sendMailFromTemplatesInJobs(id, sub, props.jobId);
    }

    const handleSelectBtn = e => {
        setState({ ...state, selectedBtn: e, selectShowBtnData: true });
        props.getMessageTemplatesForJobsBySelect(e, null)

    }

    const searchHandler = e => {
        setState({ ...state, ['search']: e.target.value });
        props.getMessageTemplatesForJobsBySelect(state.selectedBtn, e.target.value)
    }

    useEffect(() => {
        if (props.smta_jobs_loading === 'Success') {
            toastr.success("Success");
            props.sendMailFromTemplatesInJobsFresh();
            props.jobAllActivity(props.jobId);
            props.toggle();
        }
        if (props.msgModal) {
            props.getMessageTemplatesForJobsBySelect(state.selectedBtn, null)
        }
    }, [props.smta_jobs_loading])


    return (
        <>
            <Modal isOpen={props.msgModal} toggle={props.toggle} centered>
                <ModalBody style={{ backgroundColor: "#F2F6FA" }}>
                    <div>
                        <div className=''>
                            <div className="d-flex" style={{ justifyContent: "center", alignItems: "center" }}>
                                <form className="app-search d-flex">
                                    <input
                                        type="text"
                                        id="header-search"
                                        placeholder="Search"
                                        name="s"
                                        className='placeHolderColor'
                                        onKeyUp={searchHandler}
                                        style={{ width: "370px", textAlign: "center", backgroundColor: "#E4E4E4", borderRadius: "8px 0px 0px 8px", padding: "8px", border: "none", borderRight: "0px", color: "#686868" }}
                                    />
                                    <button type="submit" style={{ textAlign: "center", backgroundColor: "#CECECE", borderRadius: "0px 8px 8px 0px", padding: "8px", border: "none", color: "#686868", width: "60px" }}><i className="bx bx-search-alt font-size-20" ></i></button>
                                </form>
                            </div>
                            <Row style={{ paddingTop: "20px", justifyContent: "center", alignItems: "center" }}>
                                <Col md={11} className=''>
                                    <div className="form-group-new">
                                        <Select
                                            value={state.selectedBtn}
                                            isMulti={true}
                                            onChange={handleSelectBtn}
                                            options={state.optionBtn}
                                            classNamePrefix="select2-selection"
                                        />
                                        <label htmlFor="usr" style={{ marginTop: "-5px" }}>Select</label>
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
                                    <ul style={{ listStyle: 'none' }}>
                                        {props.gmtfjbs_data?.data?.data.map((item, i) =>
                                            <li key={i} className='py-2' style={{ cursor: 'pointer' }} onClick={() => clickHandler(item?.id, item?.subject)}>
                                                <Row>
                                                    <Col md={1}>
                                                        {item.message_trigger_to == 'Owner' &&
                                                            <i className='bx bx-home-circle font-size-16' />
                                                        }
                                                        {item.message_trigger_to == 'Tenant' &&
                                                            <i className='bx bx-group font-size-16' />
                                                        }
                                                        {item.message_trigger_to == 'Supplier' &&
                                                            <i className='bx bx-user-plus font-size-16' />
                                                        }
                                                        {item.message_trigger_to == 'Agent' &&
                                                            <i className='bx bx-user-check font-size-16' />
                                                        }
                                                    </Col>
                                                    <Col md={8}><span className='text-primary' >{item?.subject}</span></Col>
                                                    <Col md={3} className='d-flex justify-content-center align-items-center'>
                                                        {item.type == 'email' && <i className='fas fa-envelope mx-1' />}
                                                        {item.type == 'sms' && <i className='fas fa-mobile-alt mx-1' />}
                                                        {item.type == 'letter' && <i className='fas fa-print mx-1' />}
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
            </Modal>

            {/* ===============Inspection modal ends here ================*/}
        </>

    )
}
const mapStateToProps = gstate => {
    const {
        gmtfjbs_data, gmtfjbs_loading, smta_jobs_data, smta_jobs_loading, send_sms_template_jobs_data,
        send_sms_template_jobs_loading
    } = gstate.Jobs;

    return {
        gmtfjbs_data, gmtfjbs_loading, smta_jobs_data, smta_jobs_loading, send_sms_template_jobs_data,
        send_sms_template_jobs_loading


    };
};
export default connect(mapStateToProps, {
    getMessageTemplatesForJobsBySelect, sendMailFromTemplatesInJobs, sendMailFromTemplatesInJobsFresh,
    jobAllActivity, searchTemplatesFromInspection, sendSMSFromTemplatesInJobs,
    sendSMSFromTemplatesInJobsFresh
})(MessagesModal);


