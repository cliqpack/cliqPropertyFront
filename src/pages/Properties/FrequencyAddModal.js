import React, { Fragment, useEffect, useState } from "react"
import {
    Col,
    Row,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap"
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import Select from "react-select"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom/cjs/react-router-dom"
import { getPlanSchedule, getPlanScheduleFresh } from "store/actions"

/**
 * THIS FUNCTION IS USED TO SHOW A MODAL THAT UPLIFT PLAN FREQUENCY DATA TO OWNERADD FORM
 * @param {*} props 
 * IT ACCEPTS FREQUENCYTYPE STATE, PLAN DATA FROM OWNERADD FUNCTION
 * @returns 
 */
const FrequencyAddModal = (props) => {
    const [seen, setSeen] = useState(false);
    const [error, setError] = useState({
        fortNightlyDate: '', month: '', weekName: '', day: '',
    });
    const errorFresh = () => {
        setError({ fortNightlyDate: '', month: '', weekName: '', day: '' })
    }
    const dateHandler = (selectedDates, dateStr, instance) => {
        props.setFrequencyState(prev => ({ ...prev, ['fortNightlyDate']: dateStr }));
    }
    const handleSelectWeekName = e => {
        errorFresh();
        props.setFrequencyState(prev => ({ ...prev, selectedWeekName: e }));
    };
    const handleSelectDate = e => {
        errorFresh();
        props.setFrequencyState(prev => ({ ...prev, selectedDate: e }));
    };
    const handleSelectMonth = e => {
        errorFresh();
        props.setFrequencyState(prev => ({ ...prev, selectedMonth: e }));
    };
    const handleRecurringTime = e => {
        errorFresh();
        props.setFrequencyState(prev => ({ ...prev, time: e.target.value }));
    };
    const handleSave = () => {
        let status = true;
        if (JSON.stringify(props.frequencyState.selectedWeekName) === '{}' && props.data.planFrequency === 'Weekly') {
            setError(prev => ({
                ...prev,
                weekName: 'Please select a day of the year for frequency.',
            }))
            status = false
        }
        if (props.frequencyState.fortNightlyDate === '' && props.data.planFrequency === 'FortNightly') {
            setError(prev => ({
                ...prev,
                fortNightlyDate: 'Please enter a date.',
            }))
            status = false
        }
        if (JSON.stringify(props.frequencyState.selectedDate) === '{}' && (props.data.planFrequency === 'Monthly' || props.data.planFrequency === 'Yearly')) {
            setError(prev => ({
                ...prev,
                day: 'Please select a day of the year for frequency.',
            }))
            status = false
        }
        if (JSON.stringify(props.frequencyState.selectedMonth) === '{}' && props.data.planFrequency === 'Yearly') {
            setError(prev => ({
                ...prev,
                month: 'Please select a day of the year for frequency.',
            }))
            status = false
        }
        if (status) {
            props.setEnteredStateTab3(true)
            props.toggleFrequencyModal()
        }
    }
    useEffect(() => {
        props.setFrequencyState(prev => ({ ...prev, frequencyType: props.data.planFrequency }));
        if (props?.edit === true && !seen) {
            props.getPlanSchedule(props?.ownerContactId, props?.planID, props.proId)
        }
        setSeen(true)
        if (props.get_plan_schedule_loading === 'Success') {
            if (props.get_plan_schedule_data.data) {
                let text = props.get_plan_schedule_data?.data.untriggered_owner_plan_details.yearly
                if (props.get_plan_schedule_data?.data?.untriggered_owner_plan_details?.frequency_type === 'Yearly') {
                    text = text.split('/')
                }
                props.setFrequencyState(prev => ({
                    ...prev,
                    time: props.get_plan_schedule_data?.data.untriggered_owner_plan_details.trigger_time,
                    fortNightlyDate: props.get_plan_schedule_data?.data.untriggered_owner_plan_details.fortnightly,
                    selectedMonth: props.get_plan_schedule_data?.data.untriggered_owner_plan_details.frequency_type === 'Yearly' ? props?.getMonth(text['1']) : {},
                    selectedWeekName: props.get_plan_schedule_data?.data.untriggered_owner_plan_details.frequency_type === 'Weekly' ? { label: props.get_plan_schedule_data?.data.untriggered_owner_plan_details.weekly, value: props.get_plan_schedule_data?.data.untriggered_owner_plan_details.weekly } : {},
                    selectedDate: (props.get_plan_schedule_data?.data.untriggered_owner_plan_details.frequency_type === 'Monthly' || props.get_plan_schedule_data?.data.untriggered_owner_plan_details.frequency_type === 'Yearly') ?
                        props.get_plan_schedule_data?.data.untriggered_owner_plan_details.frequency_type === 'Monthly' ? props?.getDate(props.get_plan_schedule_data?.data.untriggered_owner_plan_details?.monthly) : props?.getDate(Number(text['0'])) : {},
                    frequencyType: props.get_plan_schedule_data?.data.untriggered_owner_plan_details.frequency_type,
                }))
            }
            props.getPlanScheduleFresh()
        }
    }, [props.get_plan_schedule_loading])
    let dayOfWeek = <Row className="py-1 mb-2">
        <Col md={4} className="d-flex justify-content-start ps-5">
            Day of week
        </Col>
        <Col md={8} className="">
            <div>
                <Select
                    value={props.frequencyState.selectedWeekName}
                    onChange={handleSelectWeekName}
                    options={props.frequencyState.optionWeekName}
                    classNamePrefix="select2-selection"
                    placeholder="Select a day of week"
                />
            </div>
            {
                error.weekName !== '' &&
                <div className="text-danger">
                    {error.weekName}
                </div>
            }
        </Col>
    </Row>
    let day = <Row className="py-1 mb-2">
        <Col md={4} className="d-flex justify-content-start ps-5">
            Day
        </Col>
        <Col md={8} className="">
            <div>
                <Select
                    value={props.frequencyState.selectedDate}
                    onChange={handleSelectDate}
                    options={props.frequencyState.optionDate}
                    classNamePrefix="select2-selection"
                    placeholder="Select a day"
                />
            </div>
            {
                error.day !== '' &&
                <div className="text-danger">
                    {error.day}
                </div>
            }
        </Col>
    </Row>
    console.log(props.frequencyState);
    return <Fragment>
        <Modal
            isOpen={props.frequencyModalState}
            toggle={props.toggleFrequencyModal}
            size="lg"
            style={{ width: '600px' }}
        >
            <ModalHeader toggle={props.toggleFrequencyModal}>Set Plan Schedule</ModalHeader>
            <ModalBody>
                <Row>
                    <Col lg={12}>
                        {
                            props.data.planFrequency === 'Weekly' && dayOfWeek
                        }
                        {
                            props.data.planFrequency === 'FortNightly' &&
                            <Row className="py-2">
                                <Col md={4} className="d-flex justify-content-start ps-5">
                                    Date
                                </Col>
                                <Col md={8} className="">
                                    <div>
                                        <Flatpickr
                                            className="form-control"
                                            placeholder="Pick a date..."
                                            value={props.frequencyState.fortNightlyDate}
                                            options={{
                                                altInput: true,
                                                format: "d/m/Y",
                                                altFormat: "d/m/Y",
                                                onChange: dateHandler
                                            }}
                                        />
                                    </div>
                                    {
                                        error.fortNightlyDate !== '' &&
                                        <div className="text-danger">
                                            {error.fortNightlyDate}
                                        </div>
                                    }
                                </Col>
                            </Row>
                        }
                        {
                            props.data.planFrequency === 'Monthly' && day
                        }
                        {
                            props.data.planFrequency === 'Yearly' &&
                            <>
                                <Row>
                                    <Col md={4} className="d-flex justify-content-start ps-5">
                                        Month
                                    </Col>
                                    <Col md={8} className="">
                                        <div>
                                            <Select
                                                value={props.frequencyState.selectedMonth}
                                                onChange={handleSelectMonth}
                                                options={props.frequencyState.optionMonth}
                                                classNamePrefix="select2-selection"
                                                placeholder="Select a month"
                                            />
                                        </div>
                                        {
                                            error.month !== '' &&
                                            <div className="text-danger">
                                                {error.month}
                                            </div>
                                        }
                                    </Col>
                                </Row>
                                {day}
                            </>
                        }
                        <Row className="py-1 mb-2">
                            <Col md={4} className="d-flex justify-content-start ps-5">
                                Time
                            </Col>
                            <Col md={8} className="">
                                <div>
                                    <input
                                        className="form-control"
                                        type="time"
                                        value={props.frequencyState.time}
                                        defaultValue="06:00:00"
                                        id="example-time-input"
                                        onChange={handleRecurringTime}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={props.toggleFrequencyModal}>
                    <i className="fas fa-times me-1"></i>Cancel
                </Button>
                <Button color="info" onClick={handleSave}>
                    <i className="fas fa-file-alt me-1"></i> Save
                </Button>
            </ModalFooter>
        </Modal>
    </Fragment>
}

const mapStateToProps = gstate => {
    const {
        get_plan_schedule_data,
        get_plan_schedule_error,
        get_plan_schedule_loading,
    } = gstate.Plan;
    return {
        get_plan_schedule_data,
        get_plan_schedule_error,
        get_plan_schedule_loading,
    };
};
export default withRouter(connect(mapStateToProps, { getPlanSchedule, getPlanScheduleFresh })(FrequencyAddModal))
